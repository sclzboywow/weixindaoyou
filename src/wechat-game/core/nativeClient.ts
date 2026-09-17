import type { WechatGameBootstrapResponse } from '../../shared/contracts/wechatBootstrap';
import { getWx, type WxRequestMethod } from '../platform/wechat';
import { llmByokHeaders } from './llmConfig';
import { createUtf8StreamDecoder } from './utf8StreamDecoder';
import { describeWechatNetworkFailure } from './wechatNetworkError';

const TOKEN_STORAGE_KEY = 'daoyou.wechat.session-token.v1';

export class SessionTokenStore {
  read(): string {
    const value = getWx().getStorageSync(TOKEN_STORAGE_KEY);
    return typeof value === 'string' ? value.trim() : '';
  }

  write(token: string): void {
    const normalized = token.trim();
    if (normalized) getWx().setStorageSync(TOKEN_STORAGE_KEY, normalized);
    else this.clear();
  }

  clear(): void {
    getWx().removeStorageSync(TOKEN_STORAGE_KEY);
  }
}

export class NativeHttpError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
    readonly body: unknown,
  ) {
    super(message);
    this.name = 'NativeHttpError';
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object'
    ? (value as Record<string, unknown>)
    : null;
}

function errorMessage(body: unknown, fallback: string): string {
  const record = asRecord(body);
  const value = record?.message ?? record?.error;
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function responseHeader(headers: unknown, name: string): string {
  if (!headers || typeof headers !== 'object') return '';
  const wanted = name.toLowerCase();
  for (const [key, value] of Object.entries(
    headers as Record<string, unknown>,
  )) {
    if (key.toLowerCase() === wanted && typeof value === 'string') return value;
  }
  return '';
}

function parseSsePayload(text: string): unknown[] {
  const events: unknown[] = [];
  for (const line of text.split(/\r?\n/)) {
    if (!line.startsWith('data:')) continue;
    const payload = line.slice(5).trim();
    if (!payload) continue;
    try {
      events.push(JSON.parse(payload));
    } catch {
      events.push({ type: 'chunk', text: payload });
    }
  }
  return events;
}

function emitSseFrames(
  text: string,
  final: boolean,
  emit: (event: unknown) => void,
): string {
  const normalized = text.replace(/\r\n/g, '\n');
  const frames = normalized.split('\n\n');
  const rest = final ? '' : (frames.pop() ?? '');
  if (final && frames.length === 1 && frames[0] === normalized) {
    frames.length = 0;
    if (normalized.trim()) frames.push(normalized);
  }
  for (const frame of frames) {
    const payload = frame
      .split('\n')
      .filter((line) => line.startsWith('data:'))
      .map((line) => line.slice(5).trimStart())
      .join('\n');
    if (!payload || payload === '[DONE]') continue;
    try {
      emit(JSON.parse(payload));
    } catch {
      emit({ type: 'chunk', text: payload });
    }
  }
  return rest;
}

export class NativeHttpClient {
  constructor(
    private readonly getBaseUrl: () => string,
    private readonly tokens: SessionTokenStore,
  ) {}

  request<T>(
    path: string,
    options: {
      method?: WxRequestMethod;
      data?: unknown;
      authenticated?: boolean;
      timeout?: number;
      headers?: Record<string, string>;
    } = {},
  ): Promise<T> {
    const token = this.tokens.read();
    const authenticated = options.authenticated !== false;
    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...(options.data === undefined
        ? {}
        : { 'Content-Type': 'application/json' }),
      ...(authenticated && token ? { Authorization: `Bearer ${token}` } : {}),
      ...llmByokHeaders(),
      ...(options.headers ?? {}),
    };
    const base = this.getBaseUrl().replace(/\/+$/, '');
    const url = `${base}/${path.replace(/^\/+/, '')}`;

    return new Promise<T>((resolve, reject) => {
      getWx().request<T>({
        url,
        method: options.method ?? 'GET',
        data: options.data,
        header: headers,
        timeout: options.timeout ?? 15_000,
        success: (response) => {
          const refreshedToken = responseHeader(
            response.header,
            'set-auth-token',
          );
          if (refreshedToken) this.tokens.write(refreshedToken);
          if (response.statusCode < 200 || response.statusCode >= 300) {
            reject(
              new NativeHttpError(
                errorMessage(response.data, `HTTP ${response.statusCode}`),
                response.statusCode,
                response.data,
              ),
            );
            return;
          }
          resolve(response.data);
        },
        fail: (error) =>
          reject(new Error(describeWechatNetworkFailure(error.errMsg, url))),
      });
    });
  }

  requestSse(
    path: string,
    options: {
      method?: WxRequestMethod;
      data?: unknown;
      authenticated?: boolean;
      timeout?: number;
      headers?: Record<string, string>;
      onEvent?: (event: unknown) => void;
    } = {},
  ): Promise<unknown[]> {
    const token = this.tokens.read();
    const authenticated = options.authenticated !== false;
    const headers: Record<string, string> = {
      Accept: 'text/event-stream',
      ...(options.data === undefined
        ? {}
        : { 'Content-Type': 'application/json' }),
      ...(authenticated && token ? { Authorization: `Bearer ${token}` } : {}),
      ...llmByokHeaders(),
      ...(options.headers ?? {}),
    };
    const base = this.getBaseUrl().replace(/\/+$/, '');
    const url = `${base}/${path.replace(/^\/+/, '')}`;

    return new Promise<unknown[]>((resolve, reject) => {
      const events: unknown[] = [];
      const decoder = createUtf8StreamDecoder();
      let buffer = '';
      let receivedChunk = false;
      const emit = (event: unknown) => {
        events.push(event);
        options.onEvent?.(event);
      };
      const task = getWx().request<string | ArrayBuffer>({
        url,
        method: options.method ?? 'POST',
        data: options.data,
        header: headers,
        timeout: options.timeout ?? 60_000,
        enableChunked: true,
        responseType: 'arraybuffer',
        success: (response) => {
          const refreshedToken = responseHeader(
            response.header,
            'set-auth-token',
          );
          if (refreshedToken) this.tokens.write(refreshedToken);
          if (response.statusCode < 200 || response.statusCode >= 300) {
            let body: unknown = response.data;
            if (body instanceof ArrayBuffer) {
              const text = decoder.decode(body);
              try {
                body = JSON.parse(text);
              } catch {
                body = text;
              }
            }
            reject(
              new NativeHttpError(
                errorMessage(body, `HTTP ${response.statusCode}`),
                response.statusCode,
                body,
              ),
            );
            return;
          }
          if (!receivedChunk) {
            const text =
              response.data instanceof ArrayBuffer
                ? decoder.decode(response.data)
                : String(response.data ?? '');
            buffer += text;
          } else {
            buffer += decoder.decode();
          }
          emitSseFrames(buffer, true, emit);
          resolve(events);
        },
        fail: (error) =>
          reject(new Error(describeWechatNetworkFailure(error.errMsg, url))),
      });
      task.onChunkReceived?.(({ data }) => {
        receivedChunk = true;
        buffer += decoder.decode(data, { stream: true });
        buffer = emitSseFrames(buffer, false, emit);
      });
    });
  }
}

export interface NativeUser {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: boolean;
  createdAt?: string | Date;
}

export type WechatUserTextContext =
  | 'character'
  | 'chat'
  | 'mail'
  | 'title'
  | 'craft'
  | 'identity'
  | 'taunt'
  | 'showcase'
  | 'black_market'
  | 'feedback';

export class NativeDaoyouApi {
  constructor(
    private readonly http: NativeHttpClient,
    private readonly tokens: SessionTokenStore,
  ) {}

  signInWechat(code: string): Promise<{ token: string; user: NativeUser }> {
    return this.http
      .request<{ token: string; user: NativeUser }>(
        '/api/auth/sign-in/wechat-mini-game',
        {
          method: 'POST',
          data: { code },
          authenticated: false,
        },
      )
      .then((result) => {
        this.tokens.write(result.token);
        return result;
      });
  }

  session(): Promise<{ session?: unknown; user?: NativeUser | null } | null> {
    return this.http.request('/api/auth/get-session');
  }

  health(): Promise<unknown> {
    return this.http.request('/api/health-check', { authenticated: false });
  }

  get(path: string, authenticated = true): Promise<unknown> {
    return this.http.request(path, { authenticated });
  }

  post(
    path: string,
    data: unknown = {},
    headers?: Record<string, string>,
    timeout?: number,
  ): Promise<unknown> {
    return this.http.request(path, { method: 'POST', data, headers, timeout });
  }

  postSse(path: string, data: unknown = {}): Promise<unknown[]> {
    return this.http
      .request<string>(path, {
        method: 'POST',
        data,
        timeout: 60_000,
        headers: { Accept: 'text/event-stream' },
      })
      .then((value) => parseSsePayload(String(value)));
  }

  checkUserText(
    context: WechatUserTextContext,
    content: string,
  ): Promise<unknown> {
    return this.http.request('/api/content-safety/text', {
      method: 'POST',
      data: { context, content },
      timeout: 15_000,
    });
  }

  put(
    path: string,
    data: unknown = {},
    headers?: Record<string, string>,
  ): Promise<unknown> {
    return this.http.request(path, { method: 'PUT', data, headers });
  }

  patch(path: string, data: unknown = {}): Promise<unknown> {
    return this.http.request(path, { method: 'PATCH', data });
  }

  delete(path: string, data?: unknown): Promise<unknown> {
    return this.http.request(path, { method: 'DELETE', data });
  }

  resources(
    requestedKeys: readonly string[] = [
      'session',
      'profile',
      'condition',
      'progress',
      'currency',
      'loadout',
      'mail-summary',
      'task-summary',
    ],
  ): Promise<unknown> {
    const keys = requestedKeys.join(',');
    return this.http.request(
      `/api/player/resources?keys=${encodeURIComponent(keys)}`,
    );
  }

  divineFortune(): Promise<unknown> {
    return this.http.request('/api/divine-fortune');
  }

  generateCharacter(userInput: string): Promise<unknown> {
    return this.http.request('/api/generate-character', {
      method: 'POST',
      data: { userInput },
      timeout: 60_000,
    });
  }

  generateFates(tempId: string): Promise<unknown> {
    return this.http.request('/api/generate-fates', {
      method: 'POST',
      data: { tempId },
      timeout: 60_000,
    });
  }

  saveCharacter(
    tempCultivatorId: string,
    selectedFateIndices: number[],
  ): Promise<unknown> {
    return this.http.request('/api/save-character', {
      method: 'POST',
      data: { tempCultivatorId, selectedFateIndices },
      timeout: 30_000,
    });
  }

  retreat(
    action: 'cultivate' | 'breakthrough',
    years = 1,
    onEvent?: (event: unknown) => void,
  ): Promise<unknown[]> {
    return this.http.requestSse('/api/cultivator/retreat', {
      method: 'POST',
      data: { action, years },
      timeout: 60_000,
      onEvent,
    });
  }

  yieldResources(onEvent?: (event: unknown) => void): Promise<unknown[]> {
    return this.http.requestSse('/api/cultivator/yield', {
      method: 'POST',
      data: {},
      timeout: 60_000,
      onEvent,
    });
  }

  bootstrap(): Promise<WechatGameBootstrapResponse> {
    return this.http.request('/api/player/bootstrap');
  }

  sendEmailSignInOtp(email: string, wechatCode: string): Promise<unknown> {
    return this.http.request('/api/auth/email-otp/send-verification-otp', {
      method: 'POST',
      data: { email: email.trim().toLowerCase(), type: 'sign-in' },
      authenticated: false,
      headers: { 'x-wechat-login-code': wechatCode },
    });
  }

  verifyEmailSignInOtp(
    email: string,
    otp: string,
    name?: string,
  ): Promise<{ token: string; user: NativeUser }> {
    return this.http
      .request<{ token: string; user: NativeUser }>(
        '/api/auth/sign-in/email-otp',
        {
          method: 'POST',
          data: {
            email: email.trim().toLowerCase(),
            otp: otp.trim(),
            ...(name?.trim() ? { name: name.trim() } : {}),
          },
          authenticated: false,
        },
      )
      .then((result) => {
        this.tokens.write(result.token);
        return result;
      });
  }

  recoverAtInn(): Promise<unknown> {
    return this.http.request('/api/cultivator/inn-recovery', {
      method: 'POST',
      data: {},
    });
  }

  previewLowTierRecycle(
    itemType: 'material' | 'artifact' | 'consumable',
  ): Promise<unknown> {
    return this.http.request('/api/market/sell', {
      method: 'POST',
      data: { phase: 'preview', itemType, selection: 'low-tier-all' },
      timeout: 30_000,
    });
  }

  confirmRecycle(sessionId: string): Promise<unknown> {
    return this.http.request('/api/market/sell', {
      method: 'POST',
      data: { phase: 'confirm', sessionId },
      timeout: 30_000,
    });
  }

  inventory(
    type: 'artifacts' | 'materials' | 'consumables',
    options: {
      page?: number;
      pageSize?: number;
      materialRank?: string;
      materialType?: string;
      materialElement?: string;
      materialRanks?: string[];
      materialTypes?: string[];
      materialElements?: string[];
      materialSortBy?: string;
      materialSortOrder?: 'asc' | 'desc';
      consumableKind?: 'pill';
    } = {},
  ): Promise<unknown> {
    const query = [
      `type=${encodeURIComponent(type)}`,
      `page=${Math.max(1, Math.trunc(options.page ?? 1))}`,
      `pageSize=${Math.min(100, Math.max(1, Math.trunc(options.pageSize ?? 20)))}`,
    ];
    if (type === 'materials') {
      const materialRanks = options.materialRanks?.length
        ? options.materialRanks
        : options.materialRank
          ? [options.materialRank]
          : [];
      const materialTypes = options.materialTypes?.length
        ? options.materialTypes
        : options.materialType
          ? [options.materialType]
          : [];
      const materialElements = options.materialElements?.length
        ? options.materialElements
        : options.materialElement
          ? [options.materialElement]
          : [];
      if (materialRanks.length)
        query.push(
          `materialRanks=${encodeURIComponent(materialRanks.join(','))}`,
        );
      if (materialTypes.length)
        query.push(
          `materialTypes=${encodeURIComponent(materialTypes.join(','))}`,
        );
      if (materialElements.length)
        query.push(
          `materialElements=${encodeURIComponent(materialElements.join(','))}`,
        );
      if (options.materialSortBy)
        query.push(
          `materialSortBy=${encodeURIComponent(options.materialSortBy)}`,
        );
      if (options.materialSortOrder)
        query.push(`materialSortOrder=${options.materialSortOrder}`);
    }
    if (type === 'consumables' && options.consumableKind) {
      query.push(
        `consumableKind=${encodeURIComponent(options.consumableKind)}`,
      );
    }
    return this.http.request(`/api/cultivator/inventory?${query.join('&')}`);
  }

  previewRecycleItem(
    itemType: 'material' | 'artifact' | 'consumable',
    itemId: string,
    quantity = 1,
  ): Promise<unknown> {
    return this.http.request('/api/market/sell', {
      method: 'POST',
      data: {
        phase: 'preview',
        itemType,
        ...(itemType === 'consumable'
          ? { items: [{ id: itemId, quantity }] }
          : { itemIds: [itemId] }),
      },
      timeout: 30_000,
    });
  }

  tasks(status?: 'active' | 'completed'): Promise<unknown> {
    const suffix = status ? `?status=${status}` : '';
    return this.http.request(`/api/tasks${suffix}`);
  }

  claimTask(taskId: string): Promise<unknown> {
    return this.http.request(
      `/api/tasks/${encodeURIComponent(taskId)}/claim-reward`,
      { method: 'POST', data: {} },
    );
  }

  worldChat(
    channel: 'system' | 'world' = 'world',
    page = 1,
    pageSize = 20,
  ): Promise<unknown> {
    return this.http.request(
      `/api/world-chat/messages?channel=${channel}&page=${page}&pageSize=${pageSize}`,
      { authenticated: false },
    );
  }

  sectChat(page = 1, pageSize = 20): Promise<unknown> {
    return this.http.request(
      `/api/sects/current/chat/messages?page=${page}&pageSize=${pageSize}`,
    );
  }

  sendWorldChat(
    text: string,
    channel: 'world' | 'sect' = 'world',
  ): Promise<unknown> {
    return this.http.request(
      channel === 'sect'
        ? '/api/sects/current/chat/messages'
        : '/api/world-chat/messages',
      {
        method: 'POST',
        data: { messageType: 'text', textContent: text, payload: { text } },
      },
    );
  }

  sendWorldChatShowcase(
    itemType: 'artifact' | 'material' | 'consumable',
    itemId: string,
    textContent: string | undefined,
    channel: 'world' | 'sect' = 'world',
  ): Promise<unknown> {
    return this.http.request(
      channel === 'sect'
        ? '/api/sects/current/chat/messages'
        : '/api/world-chat/messages',
      {
        method: 'POST',
        data: {
          messageType: 'item_showcase',
          itemType,
          itemId,
          ...(textContent ? { textContent } : {}),
        },
      },
    );
  }

  mail(page = 1, pageSize = 20): Promise<unknown> {
    return this.http.request(
      `/api/cultivator/mail?page=${Math.max(1, Math.trunc(page))}&pageSize=${Math.min(100, Math.max(1, Math.trunc(pageSize)))}`,
    );
  }

  friends(): Promise<unknown> {
    return this.http.request('/api/friends');
  }

  wechatOpenAbilities(): Promise<unknown> {
    return this.http.request('/api/wechat/open-abilities');
  }

  subscribeQiFull(templateId: string): Promise<unknown> {
    return this.http.request('/api/wechat/subscriptions/qi-full', {
      method: 'POST',
      data: { templateId },
    });
  }

  createWechatShareGift(): Promise<unknown> {
    return this.http.request('/api/wechat/share-gifts', {
      method: 'POST',
      data: {},
    });
  }

  wechatShareGiftPreview(giftId: string): Promise<unknown> {
    return this.http.request(
      `/api/wechat/share-gifts/${encodeURIComponent(giftId)}`,
    );
  }

  claimWechatShareGift(giftId: string): Promise<unknown> {
    return this.http.request(
      `/api/wechat/share-gifts/${encodeURIComponent(giftId)}/claim`,
      { method: 'POST', data: {} },
    );
  }

  sendMail(recipientCultivatorId: string, content: string): Promise<unknown> {
    return this.http.request('/api/cultivator/mail/send', {
      method: 'POST',
      data: { recipientCultivatorId, content },
    });
  }

  rankings(): Promise<unknown> {
    return this.http.request('/api/rankings?page=1&pageSize=20', {
      authenticated: false,
    });
  }

  sect(): Promise<unknown> {
    return this.http.request('/api/sects/current/context');
  }
}

export function requestWechatCode(): Promise<string> {
  return new Promise((resolve, reject) => {
    getWx().login({
      timeout: 10_000,
      success: (result) => resolve(result.code),
      fail: (error) => reject(new Error(error.errMsg || 'wx.login 失败')),
    });
  });
}
