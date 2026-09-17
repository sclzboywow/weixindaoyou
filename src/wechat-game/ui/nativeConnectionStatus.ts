import {
  REALTIME_CHANNEL_META,
  REALTIME_STATE_LABEL,
  describeRealtimeStatus,
} from '../../react-app/components/game-shell/realtimeStatusView';
import {
  RealtimeClient,
  type RealtimeSocket,
} from '../../react-app/lib/realtime/realtimeClientCore';
import {
  REALTIME_CHANNELS,
  type RealtimeServerEvent,
} from '../../shared/contracts/realtime';
import type { WechatGameApi } from '../platform/wechat';
import { normalizeNativeCanvasText } from './nativeEmoji';

const INK = '#2c1810';
const SECONDARY = '#5a4a42';
const MUTED = 'rgba(44,24,16,.48)';
const CRIMSON = '#c1121f';
const DOT_COLORS = {
  idle: 'rgba(44,24,16,.3)',
  connecting: '#8b4513',
  online: '#4a7c59',
  reconnecting: '#8b4513',
  offline: CRIMSON,
  blocked: CRIMSON,
};

function formatTime(value: number | null): string {
  if (!value) return '—';
  return new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(value));
}

/** Official realtime state machine and settings content, with a wx transport. */
export class NativeConnectionStatus {
  readonly client: RealtimeClient;
  private foreground = true;
  private online = true;
  private redraw: (() => void) | null = null;
  private redrawTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(wx: WechatGameApi, baseUrl: string, token: () => string) {
    this.client = new RealtimeClient({
      isOnline: () => this.foreground && this.online,
      open: (channels) => {
        const task = wx.connectSocket({
          url: `${baseUrl.replace(/^http/, 'ws').replace(/\/+$/, '')}/api/realtime?channels=${encodeURIComponent(channels.join(','))}`,
          header: { Authorization: `Bearer ${token()}` },
          timeout: 10_000,
        });
        const socket: RealtimeSocket = {
          readyState: 0,
          onopen: null,
          onmessage: null,
          onerror: null,
          onclose: null,
          send: (data) => task.send({ data }),
          close: () => {
            socket.readyState = 2;
            task.close({ code: 1000, reason: 'client disconnect' });
          },
        };
        task.onOpen(() => {
          socket.readyState = 1;
          socket.onopen?.();
        });
        task.onMessage((event) => socket.onmessage?.(event));
        task.onError(() => socket.onerror?.());
        task.onClose((event) => {
          socket.readyState = 3;
          socket.onclose?.(event);
        });
        return socket;
      },
    });
    wx.onHide?.(() => {
      this.foreground = false;
      this.client.disconnect();
    });
    wx.onShow?.(() => {
      this.foreground = true;
      this.client.connect();
    });
    wx.onNetworkStatusChange?.(({ isConnected }) => {
      this.online = isConnected;
      if (isConnected && this.foreground) this.client.connect();
      else this.client.disconnect();
    });
  }

  start(
    redraw: () => void,
    onEvent: (event: RealtimeServerEvent) => void,
  ): void {
    if (this.redraw) return;
    this.redraw = redraw;
    this.client.subscribeStatus(() => {
      // Channel changes may happen during Canvas rendering; never recurse into it.
      if (this.redrawTimer) return;
      this.redrawTimer = setTimeout(() => {
        this.redrawTimer = null;
        this.redraw?.();
      }, 0);
    });
    this.client.subscribe('world-chat.message', onEvent);
    this.client.subscribe('player-state.events', onEvent);
    this.client.subscribe('arena-room.changed', onEvent);
  }

  sync(identity: string | null, arena: boolean): void {
    if (!identity) this.client.setIdentityKey(null);
    for (const channel of REALTIME_CHANNELS) {
      if (identity && (channel !== 'arena-room' || arena))
        this.client.enableChannel(channel);
      else this.client.disableChannel(channel);
    }
    if (identity) this.client.setIdentityKey(identity);
  }

  draw(
    ctx: CanvasRenderingContext2D,
    font: string,
    left: number,
    width: number,
    y: number,
  ): number {
    const host = {
      ctx,
      drawText(
        text: string,
        x: number,
        baseline: number,
        size: number,
        options: { color?: string; bold?: boolean } = {},
      ) {
        text = normalizeNativeCanvasText(text);
        ctx.font = `${options.bold ? '600' : '400'} ${size}px ${font}`;
        ctx.fillStyle = options.color ?? INK;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        if (size === 11.52) {
          for (const char of text) {
            ctx.fillText(char, x, baseline);
            x += ctx.measureText(char).width + size * 0.18;
          }
        } else ctx.fillText(text, x, baseline);
      },
      drawWrappedText(
        text: string,
        x: number,
        baseline: number,
        maxWidth: number,
        lineHeight: number,
        _maxLines: number,
        size: number,
        options: { color?: string } = {},
      ) {
        ctx.font = `400 ${size}px ${font}`;
        let line = '';
        for (const char of text) {
          if (line && ctx.measureText(line + char).width > maxWidth) {
            this.drawText(line, x, baseline, size, options);
            baseline += lineHeight;
            line = '';
          }
          line += char;
        }
        if (line) this.drawText(line, x, baseline, size, options);
        return baseline + lineHeight - size;
      },
    };
    host.drawText('连接状态', left, y + 12, 11.52, { color: MUTED });
    y += 20;
    y =
      host.drawWrappedText(
        '当前微信客户端与聊天、游戏实时服务器的连接情况。',
        left,
        y + 14,
        width,
        24,
        10,
        14,
        { color: SECONDARY },
      ) + 16;
    const status = this.client.getStatus();
    REALTIME_CHANNELS.forEach((channel, index) => {
      const item = status.channels[channel];
      y += 16;
      host.ctx.fillStyle = DOT_COLORS[item.state];
      host.ctx.beginPath();
      host.ctx.arc(left + 4, y + 10, 4, 0, Math.PI * 2);
      host.ctx.fill();
      host.drawText(
        REALTIME_CHANNEL_META[channel].label,
        left + 16,
        y + 15,
        14,
        { bold: true },
      );
      y += 32;
      host.drawText(REALTIME_STATE_LABEL[item.state], left, y + 15, 14, {
        color: CRIMSON,
        bold: true,
      });
      const detail = item.enabled ? describeRealtimeStatus(item) : '未启用';
      if (detail !== REALTIME_STATE_LABEL[item.state]) {
        const labelWidth =
          host.ctx.measureText(REALTIME_STATE_LABEL[item.state]).width + 16;
        if (labelWidth + host.ctx.measureText(detail).width <= width) {
          host.drawText(detail, left + labelWidth, y + 15, 14, {
            color: SECONDARY,
          });
          y += 20;
        } else {
          y = host.drawWrappedText(detail, left, y + 39, width, 20, 100, 14, {
            color: SECONDARY,
          });
        }
      } else y += 20;
      y += 12;
      for (const [label, value] of [
        ['最近连接', formatTime(item.lastConnectedAt)],
        ['最近断开', formatTime(item.lastDisconnectedAt)],
        ['重连次数', String(item.reconnectAttempt)],
      ]) {
        host.drawText(label, left, y + 12, 11.52, { color: MUTED });
        host.drawText(value, left, y + 36, 14, { color: INK });
        y += 48.44;
      }
      if (item.lastError) {
        y =
          host.drawWrappedText(
            item.lastError,
            left,
            y + 18,
            width,
            24,
            100,
            14,
            { color: SECONDARY },
          ) + 12;
      }
      y += 8;
      if (index < REALTIME_CHANNELS.length - 1) {
        host.ctx.save();
        host.ctx.strokeStyle = 'rgba(44,24,16,.15)';
        host.ctx.setLineDash([3, 3]);
        host.ctx.beginPath();
        host.ctx.moveTo(left, y);
        host.ctx.lineTo(left + width, y);
        host.ctx.stroke();
        host.ctx.restore();
        y += 1;
      }
    });
    return y;
  }
}
