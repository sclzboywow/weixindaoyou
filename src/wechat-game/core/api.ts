import type { WechatHttpClient } from './http';

export interface HealthResponse {
  success: boolean;
  message?: string;
  redis?: string;
  nats?: string;
  messaging?: string;
  error?: string;
}

export interface AuthSessionResponse {
  session?: { id?: string; expiresAt?: string } | null;
  user?: { id?: string; name?: string | null; email?: string | null } | null;
}

export interface WorldChatMessageView {
  id: string;
  sender: string;
  text: string;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object'
    ? (value as Record<string, unknown>)
    : null;
}

function readString(record: Record<string, unknown> | null, keys: string[]): string {
  if (!record) return '';
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

function toWorldChatMessage(value: unknown, index: number): WorldChatMessageView {
  const item = asRecord(value);
  const payload = asRecord(item?.payload);
  const sender =
    readString(item, [
      'cultivatorName',
      'senderName',
      'characterName',
      'displayName',
      'name',
    ]) || '道友';
  const text =
    readString(item, ['textContent', 'content', 'text', 'message']) ||
    readString(payload, ['text', 'content']) ||
    '[非文本消息]';
  const id = readString(item, ['id']) || `chat-${index}`;
  return { id, sender, text };
}

export class DaoyouApi {
  constructor(private readonly http: WechatHttpClient) {}

  health(): Promise<HealthResponse> {
    return this.http.request<HealthResponse>('/api/health-check');
  }

  session(): Promise<AuthSessionResponse> {
    return this.http.request<AuthSessionResponse>('/api/auth/get-session');
  }

  async latestWorldChat(limit = 8): Promise<WorldChatMessageView[]> {
    const result = await this.http.request<unknown>(
      `/api/world-chat/messages?channel=world&limit=${limit}`,
    );
    const root = asRecord(result);
    const data = root?.data;
    if (!Array.isArray(data)) return [];
    return data.map(toWorldChatMessage);
  }
}
