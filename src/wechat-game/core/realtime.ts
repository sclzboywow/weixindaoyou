import { getWx, type WxSocketTask } from '../platform/wechat';
import type { CookieJar } from './cookieJar';

export type RealtimeStatus =
  | 'idle'
  | 'connecting'
  | 'open'
  | 'closed'
  | 'error';

export interface RealtimeCallbacks {
  onStatus(status: RealtimeStatus, detail?: string): void;
  onEvent(event: unknown): void;
}

function toWebSocketBase(apiBaseUrl: string): string {
  const value = apiBaseUrl.replace(/\/+$/, '');
  if (value.startsWith('https://')) return `wss://${value.slice(8)}`;
  if (value.startsWith('http://')) return `ws://${value.slice(7)}`;
  throw new Error('API 地址必须以 http:// 或 https:// 开头');
}

export class DaoyouRealtimeClient {
  private socket: WxSocketTask | null = null;

  constructor(
    private readonly getApiBaseUrl: () => string,
    private readonly cookieJar: CookieJar,
    private readonly callbacks: RealtimeCallbacks,
  ) {}

  connect(): void {
    this.close();
    this.callbacks.onStatus('connecting');
    const cookie = this.cookieJar.readHeader();
    const url = `${toWebSocketBase(this.getApiBaseUrl())}/api/realtime?channels=world-chat,player-state`;
    const socket = getWx().connectSocket({
      url,
      header: cookie ? { Cookie: cookie } : undefined,
      timeout: 10_000,
    });
    this.socket = socket;

    socket.onOpen(() => {
      this.callbacks.onStatus('open');
    });
    socket.onMessage((message) => {
      if (typeof message.data !== 'string') return;
      let event: unknown = message.data;
      try {
        event = JSON.parse(message.data) as unknown;
      } catch {
        // Keep raw string for diagnostics.
      }
      this.callbacks.onEvent(event);
      if (
        event &&
        typeof event === 'object' &&
        (event as Record<string, unknown>).type === 'ping'
      ) {
        socket.send({ data: 'pong' });
      }
    });
    socket.onError((error) => {
      this.callbacks.onStatus('error', error.errMsg || 'WebSocket error');
    });
    socket.onClose((event) => {
      if (this.socket === socket) this.socket = null;
      this.callbacks.onStatus(
        'closed',
        `${event.code ?? ''} ${event.reason ?? ''}`.trim(),
      );
    });
  }

  close(): void {
    const socket = this.socket;
    this.socket = null;
    if (socket) {
      socket.close({ code: 1000, reason: 'manual close' });
    }
  }

  isConnected(): boolean {
    return this.socket !== null;
  }
}
