import { DaoyouApi, type WorldChatMessageView } from '../core/api';
import { CookieJar } from '../core/cookieJar';
import { WechatHttpClient } from '../core/http';
import { DaoyouRealtimeClient, type RealtimeStatus } from '../core/realtime';
import { WechatStorage } from '../platform/storage';
import { getWx, type WxCanvas, type WxTouchEvent } from '../platform/wechat';
import { normalizeNativeCanvasText } from './nativeEmoji';

const API_STORAGE_KEY = 'daoyou.wechat.api-base.v1';
const DEFAULT_API_BASE = 'https://yzdoc.cn';

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ActionButton {
  id: string;
  label: string;
  rect: Rect;
  action: () => void;
}

interface SessionView {
  label: string;
  authenticated: boolean;
}

function compact(text: string, maxLength: number): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (Array.from(normalized).length <= maxLength) return normalized;
  return `${Array.from(normalized)
    .slice(0, maxLength - 1)
    .join('')}…`;
}

function pointInRect(x: number, y: number, rect: Rect): boolean {
  return (
    x >= rect.x &&
    x <= rect.x + rect.width &&
    y >= rect.y &&
    y <= rect.y + rect.height
  );
}

function formatUnknownError(error: unknown): string {
  return error instanceof Error ? error.message : '未知错误';
}

export class WechatPocApp {
  private readonly wx = getWx();
  private readonly storage = new WechatStorage();
  private readonly cookieJar = new CookieJar(this.storage);
  private readonly canvas: WxCanvas;
  private readonly context: CanvasRenderingContext2D;
  private readonly width: number;
  private readonly height: number;
  private readonly pixelRatio: number;
  private readonly api: DaoyouApi;
  private readonly realtime: DaoyouRealtimeClient;
  private buttons: ActionButton[] = [];
  private apiBaseUrl: string;
  private healthLabel = '后端：等待检查';
  private session: SessionView = {
    label: '会话：未检查',
    authenticated: false,
  };
  private wechatLoginLabel = 'wx.login：未调用';
  private realtimeLabel = '实时：未连接';
  private networkLabel = '网络：未知';
  private messages: WorldChatMessageView[] = [];
  private notice = '这是原生微信小游戏 POC，不是 WebView 套壳。';

  constructor() {
    const info = this.wx.getWindowInfo();
    this.width = info.windowWidth;
    this.height = info.windowHeight;
    this.pixelRatio = Math.max(1, info.pixelRatio || 1);
    this.canvas = this.wx.createCanvas();
    this.canvas.width = Math.floor(this.width * this.pixelRatio);
    this.canvas.height = Math.floor(this.height * this.pixelRatio);
    this.context = this.canvas.getContext('2d');
    this.context.scale(this.pixelRatio, this.pixelRatio);

    this.apiBaseUrl = this.storage.get(API_STORAGE_KEY, DEFAULT_API_BASE);
    const http = new WechatHttpClient(() => this.apiBaseUrl, this.cookieJar);
    this.api = new DaoyouApi(http);
    this.realtime = new DaoyouRealtimeClient(
      () => this.apiBaseUrl,
      this.cookieJar,
      {
        onStatus: (status, detail) => this.handleRealtimeStatus(status, detail),
        onEvent: (event) => this.handleRealtimeEvent(event),
      },
    );
  }

  start(): void {
    this.wx.onTouchStart((event) => this.handleTouch(event));
    this.wx.onNetworkStatusChange((result) => {
      this.networkLabel = `网络：${result.isConnected ? result.networkType : '断开'}`;
      this.render();
    });
    this.render();
    void this.refreshHealth();
    void this.refreshWorldChat();
  }

  private setNotice(message: string): void {
    this.notice = compact(message, 64);
    this.render();
  }

  private async refreshHealth(): Promise<void> {
    this.healthLabel = '后端：检查中…';
    this.render();
    try {
      const result = await this.api.health();
      this.healthLabel = result.success
        ? `后端：OK · Redis ${result.redis ?? '-'} · NATS ${result.nats ?? '-'}`
        : `后端：${result.error || '异常'}`;
    } catch (error) {
      this.healthLabel = `后端：失败 · ${compact(formatUnknownError(error), 28)}`;
    }
    this.render();
  }

  private async refreshSession(): Promise<void> {
    this.session = { label: '会话：检查中…', authenticated: false };
    this.render();
    try {
      const result = await this.api.session();
      const user = result.user;
      if (user?.id) {
        const display = user.name || user.email || user.id;
        this.session = {
          label: `会话：已登录 · ${compact(display || '玩家', 24)}`,
          authenticated: true,
        };
        this.setNotice('Better Auth 会话可用，可继续接入角色/背包/修炼接口。');
      } else {
        this.session = { label: '会话：未登录', authenticated: false };
        this.setNotice(
          '先在 Web 端登录，再把 API 请求中的 Cookie 导入小游戏。',
        );
      }
    } catch (error) {
      this.session = {
        label: `会话：失败 · ${compact(formatUnknownError(error), 24)}`,
        authenticated: false,
      };
    }
    this.render();
  }

  private async refreshWorldChat(): Promise<void> {
    this.setNotice('正在读取官方 /api/world-chat/messages…');
    try {
      this.messages = await this.api.latestWorldChat(6);
      this.setNotice(`世界聊天读取成功，共 ${this.messages.length} 条。`);
    } catch (error) {
      this.setNotice(`世界聊天失败：${formatUnknownError(error)}`);
    }
    this.render();
  }

  private openTextInput(options: {
    label: string;
    initialValue: string;
    maxLength: number;
    sensitive?: boolean;
    onCommit: (value: string) => void;
  }): void {
    let settled = false;
    let draft = options.initialValue;

    const onInput = (result: { value: string }) => {
      draft = result.value;
      this.setNotice(
        options.sensitive
          ? `${options.label}：已输入 ${Array.from(draft).length} 个字符，点击键盘“完成”保存。`
          : `${options.label}：${compact(draft, 46)}`,
      );
    };
    const cleanup = () => {
      this.wx.offKeyboardInput(onInput);
      this.wx.offKeyboardConfirm(onConfirm);
      this.wx.offKeyboardComplete(onComplete);
    };
    const commit = (value: string) => {
      if (settled) return;
      settled = true;
      cleanup();
      options.onCommit(value);
    };
    const onConfirm = (result: { value: string }) => {
      commit(result.value);
      this.wx.hideKeyboard();
    };
    const onComplete = (result: { value: string }) => {
      if (!settled) commit(result.value || draft);
    };

    this.wx.onKeyboardInput(onInput);
    this.wx.onKeyboardConfirm(onConfirm);
    this.wx.onKeyboardComplete(onComplete);
    this.setNotice(`${options.label}：输入后点击键盘“完成”保存。`);
    this.wx.showKeyboard({
      defaultValue: options.initialValue,
      maxLength: options.maxLength,
      multiple: false,
      confirmHold: false,
      confirmType: 'done',
      fail: (error) => {
        cleanup();
        this.setNotice(
          `${options.label}输入框打开失败：${error.errMsg || 'unknown'}`,
        );
      },
    });
  }

  private editApiBase(): void {
    this.openTextInput({
      label: 'API 地址',
      initialValue: this.apiBaseUrl,
      maxLength: 256,
      onCommit: (raw) => {
        const value = raw.trim();
        if (!value || !/^https?:\/\//i.test(value)) {
          this.wx.showToast({
            title: '地址需以 http(s):// 开头',
            icon: 'none',
          });
          return;
        }
        this.apiBaseUrl = value.replace(/\/+$/, '');
        this.storage.set(API_STORAGE_KEY, this.apiBaseUrl);
        this.setNotice(`API 已切换：${this.apiBaseUrl}`);
        void this.refreshHealth();
      },
    });
  }

  private importCookie(): void {
    this.openTextInput({
      label: 'Session Cookie',
      initialValue: this.cookieJar.readHeader(),
      maxLength: 4096,
      sensitive: true,
      onCommit: (raw) => {
        this.cookieJar.replace(raw.trim());
        this.setNotice(
          this.cookieJar.hasCookies()
            ? 'Cookie 已保存在微信本地 Storage，仅用于本机调试。'
            : 'Cookie 已清空。',
        );
        void this.refreshSession();
      },
    });
  }

  private requestWechatLoginCode(): void {
    this.wechatLoginLabel = 'wx.login：请求中…';
    this.render();
    this.wx.login({
      timeout: 10_000,
      success: (result) => {
        this.wechatLoginLabel = `wx.login：成功 · ${compact(result.code, 16)}`;
        this.setNotice(
          '微信 code 已获取。当前补丁不把 code 发给服务端，正式版需新增微信身份绑定。',
        );
      },
      fail: (error) => {
        this.wechatLoginLabel = `wx.login：失败 · ${compact(error.errMsg || '', 18)}`;
        this.render();
      },
    });
  }

  private toggleRealtime(): void {
    if (this.realtime.isConnected()) {
      this.realtime.close();
      return;
    }
    if (!this.cookieJar.hasCookies()) {
      this.setNotice('实时接口需要 Better Auth 会话，请先导入 Cookie。');
      return;
    }
    this.realtime.connect();
  }

  private clearDebugState(): void {
    this.cookieJar.clear();
    this.storage.remove(API_STORAGE_KEY);
    this.apiBaseUrl = DEFAULT_API_BASE;
    this.session = { label: '会话：未检查', authenticated: false };
    this.realtime.close();
    this.setNotice('本地调试状态已清理。');
  }

  private handleRealtimeStatus(status: RealtimeStatus, detail?: string): void {
    const labels: Record<RealtimeStatus, string> = {
      idle: '未连接',
      connecting: '连接中…',
      open: '已连接',
      closed: '已关闭',
      error: '错误',
    };
    this.realtimeLabel = `实时：${labels[status]}${detail ? ` · ${compact(detail, 20)}` : ''}`;
    this.render();
  }

  private handleRealtimeEvent(event: unknown): void {
    if (!event || typeof event !== 'object') return;
    const record = event as Record<string, unknown>;
    const type = typeof record.type === 'string' ? record.type : 'event';
    this.setNotice(`实时事件：${type}`);
    if (type === 'world-chat.message') {
      void this.refreshWorldChat();
    }
  }

  private handleTouch(event: WxTouchEvent): void {
    const touch = event.changedTouches[0] ?? event.touches[0];
    if (!touch) return;
    const button = this.buttons.find((candidate) =>
      pointInRect(touch.clientX, touch.clientY, candidate.rect),
    );
    button?.action();
  }

  private drawText(
    text: string,
    x: number,
    y: number,
    size: number,
    options: { bold?: boolean; align?: CanvasTextAlign } = {},
  ): void {
    const context = this.context;
    context.fillStyle = '#24221f';
    context.textAlign = options.align ?? 'left';
    context.textBaseline = 'alphabetic';
    context.font = `${options.bold ? '600 ' : ''}${size}px sans-serif`;
    context.fillText(normalizeNativeCanvasText(text), x, y);
  }

  private roundedRectPath(rect: Rect, radius: number): void {
    const context = this.context;
    const r = Math.min(radius, rect.width / 2, rect.height / 2);
    const right = rect.x + rect.width;
    const bottom = rect.y + rect.height;
    context.beginPath();
    context.moveTo(rect.x + r, rect.y);
    context.lineTo(right - r, rect.y);
    context.quadraticCurveTo(right, rect.y, right, rect.y + r);
    context.lineTo(right, bottom - r);
    context.quadraticCurveTo(right, bottom, right - r, bottom);
    context.lineTo(rect.x + r, bottom);
    context.quadraticCurveTo(rect.x, bottom, rect.x, bottom - r);
    context.lineTo(rect.x, rect.y + r);
    context.quadraticCurveTo(rect.x, rect.y, rect.x + r, rect.y);
    context.closePath();
  }

  private drawPanel(rect: Rect): void {
    const context = this.context;
    context.fillStyle = 'rgba(250, 248, 241, 0.94)';
    context.strokeStyle = 'rgba(55, 50, 42, 0.25)';
    context.lineWidth = 1;
    this.roundedRectPath(rect, 12);
    context.fill();
    context.stroke();
  }

  private drawButton(button: ActionButton): void {
    const { rect } = button;
    this.drawText(
      `[ ${button.label} ]`,
      rect.x + rect.width / 2,
      rect.y + rect.height / 2 + 5,
      14,
      { align: 'center', bold: true },
    );
  }

  private render(): void {
    const context = this.context;
    context.clearRect(0, 0, this.width, this.height);
    context.fillStyle = '#f4f0e6';
    context.fillRect(0, 0, this.width, this.height);

    context.fillStyle = 'rgba(30, 28, 24, 0.05)';
    for (let y = 0; y < this.height; y += 24) {
      context.fillRect(0, y, this.width, 1);
    }

    this.drawText('万界道友', 18, 38, 25, { bold: true });
    this.drawText('微信小游戏 POC · 官方 master 适配', 18, 60, 12);

    const statusRect: Rect = {
      x: 14,
      y: 76,
      width: this.width - 28,
      height: 112,
    };
    this.drawPanel(statusRect);
    this.drawText(`API：${compact(this.apiBaseUrl, 38)}`, 26, 100, 12);
    this.drawText(this.healthLabel, 26, 121, 12);
    this.drawText(this.session.label, 26, 142, 12);
    this.drawText(this.wechatLoginLabel, 26, 163, 12);
    this.drawText(`${this.realtimeLabel} · ${this.networkLabel}`, 26, 182, 11);

    const gap = 8;
    const side = 14;
    const buttonWidth = (this.width - side * 2 - gap) / 2;
    const buttonHeight = 38;
    const firstY = 202;
    const definitions: Array<[string, string, () => void]> = [
      ['api', '设置 API', () => this.editApiBase()],
      ['wx-login', '调用 wx.login', () => this.requestWechatLoginCode()],
      ['cookie', '导入 Session Cookie', () => this.importCookie()],
      ['session', '检查登录会话', () => void this.refreshSession()],
      ['chat', '刷新世界聊天', () => void this.refreshWorldChat()],
      [
        'realtime',
        this.realtime.isConnected() ? '断开实时通道' : '连接实时通道',
        () => this.toggleRealtime(),
      ],
      ['health', '检查后端', () => void this.refreshHealth()],
      ['clear', '清理调试状态', () => this.clearDebugState()],
    ];

    this.buttons = definitions.map(([id, label, action], index) => ({
      id,
      label,
      action,
      rect: {
        x: side + (index % 2) * (buttonWidth + gap),
        y: firstY + Math.floor(index / 2) * (buttonHeight + gap),
        width: buttonWidth,
        height: buttonHeight,
      },
    }));
    for (const button of this.buttons) this.drawButton(button);

    const chatY = firstY + 4 * (buttonHeight + gap) + 10;
    const chatHeight = Math.max(130, this.height - chatY - 48);
    const chatRect: Rect = {
      x: 14,
      y: chatY,
      width: this.width - 28,
      height: chatHeight,
    };
    this.drawPanel(chatRect);
    this.drawText('世界频道 · 最新消息', 26, chatY + 24, 14, { bold: true });
    if (this.messages.length === 0) {
      this.drawText('暂无消息或尚未加载。', 26, chatY + 48, 12);
    } else {
      this.messages.slice(0, 6).forEach((message, index) => {
        const line = `${message.sender}：${message.text}`;
        this.drawText(compact(line, 38), 26, chatY + 50 + index * 21, 12);
      });
    }

    const noticeY = Math.min(this.height - 16, chatY + chatHeight + 20);
    this.drawText(compact(this.notice, 48), 18, noticeY, 11);
  }
}
