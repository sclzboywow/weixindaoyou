import { getWx, type WxSocketTask } from '../platform/wechat';

export interface NativeBattleSession {
  protocolVersion: 2;
  matchId: string;
  playerId: string;
  connectTicket: string;
  websocketUrl: string;
}

export interface NativeLiveBattleState {
  status: 'idle' | 'connecting' | 'connected' | 'closed' | 'error';
  view: Record<string, unknown> | null;
  error: string;
}

function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (token) => {
    const value = Math.floor(Math.random() * 16);
    return (token === 'x' ? value : (value & 0x3) | 0x8).toString(16);
  });
}

function ticketUrl(session: NativeBattleSession): string {
  const separator = session.websocketUrl.includes('?') ? '&' : '?';
  return `${session.websocketUrl}${separator}ticket=${encodeURIComponent(session.connectTicket)}`;
}

/** WeChat-game implementation of the official protocol-v2 battle socket. */
export class NativeLiveBattleClient {
  private socket: WxSocketTask | null = null;
  private pingTimer: ReturnType<typeof setInterval> | null = null;
  private lastEventSeq = -1;
  private deliberateClose = false;

  constructor(
    private readonly session: NativeBattleSession,
    private readonly update: (state: NativeLiveBattleState) => void,
  ) {}

  connect(): void {
    this.close();
    this.deliberateClose = false;
    this.update({ status: 'connecting', view: null, error: '' });
    const socket = getWx().connectSocket({ url: ticketUrl(this.session), timeout: 10_000 });
    this.socket = socket;
    socket.onOpen(() => {
      this.update({ status: 'connected', view: null, error: '' });
      this.send({
        protocolVersion: 2,
        type: 'battle.resume',
        requestId: uuid(),
        matchId: this.session.matchId,
        lastEventSeq: this.lastEventSeq,
      });
      this.ping();
      this.pingTimer = setInterval(() => this.ping(), 10_000);
    });
    socket.onMessage((event) => {
      if (typeof event.data !== 'string') return;
      let message: Record<string, unknown> | null;
      try {
        const parsed = JSON.parse(event.data) as unknown;
        message = parsed && typeof parsed === 'object' ? parsed as Record<string, unknown> : null;
      } catch {
        this.update({ status: 'error', view: null, error: '战斗服务协议响应无效' });
        return;
      }
      if (!message) return;
      const payload = message.payload && typeof message.payload === 'object'
        ? message.payload as Record<string, unknown>
        : null;
      if (message.type === 'battle.snapshot' && payload) {
        const eventSeq = Number(payload.clientEventSeq);
        if (Number.isFinite(eventSeq)) this.lastEventSeq = eventSeq;
        this.update({ status: 'connected', view: payload, error: '' });
      } else if (message.type === 'battle.error') {
        this.update({ status: 'connected', view: null, error: String(payload?.message ?? '战斗指令未被接受') });
      } else if (message.type === 'command.ack' && payload?.status === 'rejected') {
        this.update({ status: 'connected', view: null, error: String(payload.reason ?? '战斗指令被拒绝') });
      }
    });
    socket.onError((error) => {
      this.update({ status: 'error', view: null, error: error.errMsg || '战斗连接中断' });
    });
    socket.onClose(() => {
      if (this.socket === socket) this.socket = null;
      this.clearPing();
      if (!this.deliberateClose) this.update({ status: 'closed', view: null, error: '战斗连接已断开' });
    });
  }

  commit(
    round: number,
    checkpointRevision: number,
    intents: Record<string, Record<string, unknown>>,
  ): void {
    this.send({
      protocolVersion: 2,
      type: 'round.submit',
      requestId: uuid(),
      matchId: this.session.matchId,
      round,
      checkpointRevision,
      intents,
    });
  }

  presentationReady(round: number, resultId: string): void {
    this.send({
      protocolVersion: 2,
      type: 'presentation.ready',
      requestId: uuid(),
      matchId: this.session.matchId,
      round,
      resultId,
    });
  }

  close(): void {
    this.deliberateClose = true;
    this.clearPing();
    this.socket?.close({ code: 1000, reason: 'client stopped' });
    this.socket = null;
  }

  private ping(): void {
    if (!this.socket) return;
    this.send({ protocolVersion: 2, type: 'time.ping', requestId: uuid(), clientSentAt: Date.now() });
  }

  private send(message: Record<string, unknown>): void {
    if (!this.socket) throw new Error('战斗连接尚未建立');
    this.socket.send({
      data: JSON.stringify(message),
      fail: (error) => this.update({ status: 'error', view: null, error: error.errMsg || '战斗指令发送失败' }),
    });
  }

  private clearPing(): void {
    if (this.pingTimer) clearInterval(this.pingTimer);
    this.pingTimer = null;
  }
}
