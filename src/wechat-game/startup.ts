import {
  getWx,
  type WxCanvas,
  type WxImage,
  type WxTouchEvent,
} from './platform/wechat';
import { installWechatStartupBridge } from './startupBridge';
import { drawNativeAlchemyWorkspace } from './ui/nativeAlchemyWorkspace';
import { createNativeCelebration } from './ui/nativeCelebration';
import { NativeConnectionStatus } from './ui/nativeConnectionStatus';
import { buildNativeHudInfo } from './ui/nativeHudInfo';
import { drawNativeMailBody } from './ui/nativeMailBody';
import { createNativeSubscriptions } from './ui/nativeSubscriptions';

const PAPER = '#f8f3e6';
const INK = '#2c1810';
const INK_SECONDARY = '#5a4a42';
const CRIMSON = '#c1121f';
const MAX_CORE_ENTRY_ATTEMPTS = 3;

function normalizeStartupCanvasText(text: string): string {
  return String(text ?? '').replace(/[\ufe0e\ufe0f]/g, '');
}

class WechatStartupShell {
  private readonly wx = getWx();
  readonly canvas: WxCanvas;
  private readonly ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private ratio: number;
  private paper: WxImage | null = null;
  private logo: WxImage | null = null;
  private retryRect: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null = null;
  private progress = 0;
  private status = '灵气汇聚，万界将启';
  private error = '';
  private tick = 0;
  private active = true;
  private timer: ReturnType<typeof setInterval> | null = null;
  private loadWatchdog: ReturnType<typeof setTimeout> | null = null;
  private loading = false;
  private packageLoaded = false;
  private coreStart: (() => void) | null = null;
  private launchTimer: ReturnType<typeof setTimeout> | null = null;
  private coreEntryFallbackTimer: ReturnType<typeof setTimeout> | null = null;
  private coreEntryAttempts = 0;
  private shellAssetsPending = 0;
  private bodyFont = '"Kaiti SC", "KaiTi", serif';
  private headingFont = '"STKaiti", "KaiTi", serif';

  constructor() {
    const info = this.wx.getWindowInfo();
    this.width = info.windowWidth;
    this.height = info.windowHeight;
    this.ratio = Math.max(1, info.pixelRatio || 1);
    this.canvas = this.wx.createCanvas();
    this.canvas.width = Math.floor(this.width * this.ratio);
    this.canvas.height = Math.floor(this.height * this.ratio);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(this.ratio, this.ratio);
  }

  private readonly startupTouchHandler = (event: WxTouchEvent): void => {
    if (!this.active || !this.error || !this.retryRect) return;
    const touch = event.changedTouches[0] ?? event.touches[0];
    if (!touch) return;
    const x = touch.clientX ?? touch.pageX ?? touch.x ?? 0;
    const y = touch.clientY ?? touch.pageY ?? touch.y ?? 0;
    const rect = this.retryRect;
    if (
      x < rect.x ||
      x > rect.x + rect.width ||
      y < rect.y ||
      y > rect.y + rect.height
    )
      return;
    this.loadCore();
  };

  start(): void {
    this.loadStartupFonts();
    this.installSystemShare();
    const celebration = createNativeCelebration(this.canvas);
    this.wx.onHide?.(celebration.stop);
    installWechatStartupBridge({
      canvas: this.canvas,
      celebrate: celebration.play,
      subscriptions: createNativeSubscriptions(this.wx),
      mailBody: drawNativeMailBody,
      alchemy: drawNativeAlchemyWorkspace,
      connection: NativeConnectionStatus,
      hudInfo: buildNativeHudInfo,
      getShellAsset: (name) => (name === 'paper' ? this.paper : this.logo),
      getShellFont: (name) =>
        name === 'body' ? this.bodyFont : this.headingFont,
      handoff: (startCore) => {
        this.coreStart = startCore;
        this.scheduleCoreLaunch();
      },
    });
    this.loadShellImage('assets/paper.png', (image) => {
      this.paper = image;
    });
    this.loadShellImage('assets/daoyou_logo.png', (image) => {
      this.logo = image;
    });
    this.wx.onTouchStart(this.startupTouchHandler);
    this.timer = setInterval(() => {
      if (!this.active) return;
      this.tick += 1;
      this.render();
    }, 120);
    this.render();
    this.loadCore();
  }

  private loadStartupFonts(): void {
    const body = this.wx.loadFont?.('assets/fonts/LXGWWenKaiLite-Startup.ttf');
    const heading = this.wx.loadFont?.('assets/fonts/MaShanZheng-Startup.ttf');
    if (body) this.bodyFont = `"${body}", "Kaiti SC", "KaiTi", serif`;
    if (heading) this.headingFont = `"${heading}", "STKaiti", "KaiTi", serif`;
  }

  private installSystemShare(): void {
    const sharePayload = () => ({
      title: '万界道友｜一念入万界，修行不止',
      imageUrl: 'https://yzdoc.cn/wechat-share-card.png',
      query: 'from=menu_share',
    });
    this.wx.onShareAppMessage?.(sharePayload);
    this.wx.onShareTimeline?.(() => ({
      ...sharePayload(),
      imagePreviewUrl: 'https://yzdoc.cn/wechat-share-card.png',
    }));
    this.wx.showShareMenu?.({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
      fail: (error) => {
        console.warn('[wechat-startup] system share menu unavailable', error);
      },
    });
  }

  private loadShellImage(path: string, apply: (image: WxImage) => void): void {
    const image = this.wx.createImage?.();
    if (!image) return;
    this.shellAssetsPending += 1;
    let settled = false;
    const timeout = setTimeout(() => finish(), 3_000);
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      this.shellAssetsPending = Math.max(0, this.shellAssetsPending - 1);
      this.scheduleCoreLaunch();
    };
    image.onload = () => {
      apply(image);
      finish();
      this.render();
    };
    image.onerror = (error) => {
      console.error(`[wechat-startup] shell asset failed: ${path}`, error);
      finish();
    };
    image.src = path;
  }

  private loadCore(): void {
    if (this.loading || !this.active) return;
    if (!this.wx.loadSubpackage) {
      this.error = '当前微信版本无法载入道途，请升级微信后重试';
      this.render();
      return;
    }
    this.packageLoaded = false;
    this.coreEntryAttempts = 0;
    this.retryRect = null;
    this.loading = true;
    this.error = '';
    this.progress = 1;
    this.status = '正在启封洞府卷宗';
    this.render();
    const packageNames = ['game-core', 'game-sect-runtime'] as const;
    const progress = new Map<string, number>();
    let pending = packageNames.length;
    let failed = false;
    for (const name of packageNames) {
      progress.set(name, 0);
      const task = this.wx.loadSubpackage({
        name,
        success: () => {
          if (failed) return;
          progress.set(name, 100);
          pending -= 1;
          if (pending > 0) return;
          this.clearLoadWatchdog();
          this.packageLoaded = true;
          this.progress = 100;
          this.status = '道途已启';
          this.render();
          this.scheduleCoreLaunch();
        },
        fail: (error) => {
          if (failed) return;
          failed = true;
          this.clearLoadWatchdog();
          this.loading = false;
          this.error = error.errMsg || '道途载入失败，请点击重试';
          this.status = '灵气暂歇';
          this.render();
        },
      });
      task.onProgressUpdate?.(({ progress: value }) => {
        if (!this.active || failed) return;
        progress.set(name, value);
        const total = packageNames.reduce(
          (sum, packageName) => sum + (progress.get(packageName) ?? 0),
          0,
        );
        this.progress = Math.max(
          this.progress,
          Math.min(99, Math.floor(total / packageNames.length)),
        );
        this.status =
          this.progress < 45
            ? '正在启封洞府卷宗'
            : this.progress < 85
              ? '正在汇聚万界灵气'
              : '正在落定今世道身';
        this.render();
      });
    }
    this.loadWatchdog = setTimeout(() => {
      if (!this.active || !this.loading) return;
      failed = true;
      this.loading = false;
      this.error = '核心卷宗初始化超时，请点击重试';
      this.status = '灵气暂歇';
      this.render();
    }, 20_000);
  }

  private scheduleCoreLaunch(): void {
    if (!this.packageLoaded || this.launchTimer || this.shellAssetsPending > 0)
      return;
    // Some WeChat DevTools/runtime versions finish downloading a subpackage
    // without evaluating its game.js entry immediately. Give the normal
    // handoff a brief opportunity, then explicitly require the core entry.
    if (!this.coreStart) {
      if (this.coreEntryAttempts >= MAX_CORE_ENTRY_ATTEMPTS) {
        this.loading = false;
        this.error = '核心入口载入失败，请点击重试';
        this.status = '道途未启';
        this.render();
        return;
      }
      if (!this.coreEntryFallbackTimer) {
        this.coreEntryFallbackTimer = setTimeout(() => {
          this.coreEntryFallbackTimer = null;
          if (!this.active || !this.packageLoaded || this.coreStart) return;
          const runtime = globalThis as typeof globalThis & {
            require?: (path: string) => unknown;
          };
          this.coreEntryAttempts += 1;
          try {
            runtime.require?.('game-core/game.js');
          } catch (error) {
            console.error('[wechat-startup] core entry require failed', error);
          }
          this.scheduleCoreLaunch();
        }, 120);
      }
      return;
    }
    this.launchTimer = setTimeout(() => {
      const startCore = this.coreStart;
      this.launchTimer = null;
      try {
        startCore?.();
        this.coreStart = null;
        this.handoff();
      } catch (error) {
        this.loading = false;
        const detail = error instanceof Error ? error.message : String(error);
        this.error = `核心卷宗启封失败：${detail || '未知异常'}，请点击重试`;
        this.status = '道途未启';
        console.error('[wechat-startup] core launch failed', error);
        this.render();
      }
    }, 180);
  }

  private handoff(): void {
    this.active = false;
    this.clearLoadWatchdog();
    if (this.launchTimer) clearTimeout(this.launchTimer);
    this.launchTimer = null;
    if (this.coreEntryFallbackTimer) clearTimeout(this.coreEntryFallbackTimer);
    this.coreEntryFallbackTimer = null;
    if (this.timer) clearInterval(this.timer);
    this.wx.offTouchStart?.(this.startupTouchHandler);
    this.timer = null;
    this.retryRect = null;
  }

  private clearLoadWatchdog(): void {
    if (this.loadWatchdog) clearTimeout(this.loadWatchdog);
    this.loadWatchdog = null;
  }

  private drawTrackedText(
    text: string,
    centerX: number,
    y: number,
    size: number,
  ): void {
    this.ctx.font = `600 ${size}px ${this.headingFont}`;
    this.ctx.fillStyle = INK;
    this.ctx.textAlign = 'left';
    const chars = Array.from(normalizeStartupCanvasText(text));
    const tracking = size * 0.28;
    const widths = chars.map((char) => this.ctx.measureText(char).width);
    const total =
      widths.reduce((sum, width) => sum + width, 0) +
      tracking * Math.max(0, chars.length - 1);
    let x = centerX - total / 2;
    chars.forEach((char, index) => {
      this.ctx.fillText(char, x, y);
      x += widths[index] + tracking;
    });
  }

  private render(): void {
    if (!this.active) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
    ctx.fillStyle = PAPER;
    ctx.fillRect(0, 0, this.width, this.height);
    if (this.paper) {
      ctx.globalAlpha = 0.62;
      ctx.drawImage(
        this.paper as unknown as CanvasImageSource,
        0,
        0,
        this.width,
        this.height,
      );
      ctx.globalAlpha = 1;
    }

    const centerX = this.width / 2;
    const menu = this.wx.getMenuButtonBoundingClientRect?.();
    const bannerTop = Math.max(16, Math.ceil((menu?.bottom ?? 50) + 8));
    const banner = {
      x: 10,
      y: bannerTop,
      width: this.width - 20,
      height: 42,
    };
    ctx.fillStyle = 'rgba(248,243,230,.76)';
    ctx.fillRect(banner.x, banner.y, banner.width, banner.height);
    ctx.strokeStyle = 'rgba(44,24,16,.15)';
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(banner.x, banner.y, banner.width, banner.height);
    ctx.setLineDash([]);
    ctx.fillStyle = INK_SECONDARY;
    ctx.textAlign = 'left';
    ctx.font = `12px ${this.bodyFont}`;
    ctx.fillText('◖  万界传音', banner.x + 12, banner.y + 26);
    ctx.textAlign = 'right';
    ctx.fillText('道途载入中', banner.x + banner.width - 12, banner.y + 26);

    const contentTop = banner.y + banner.height;
    const viewportBottom = this.height - 18;
    const availableHeight = Math.max(540, viewportBottom - contentTop);
    const scale = Math.max(
      0.72,
      Math.min(1.08, this.width / 390, availableHeight / 725),
    );
    const y = (offset: number) => contentTop + offset * scale;
    const medallionRadius = 76 * scale;
    const medallionCenterY = y(145);

    ctx.strokeStyle = 'rgba(142,111,76,.38)';
    ctx.beginPath();
    ctx.moveTo(centerX - 112 * scale, y(52));
    ctx.lineTo(centerX - 52 * scale, y(52));
    ctx.moveTo(centerX + 52 * scale, y(52));
    ctx.lineTo(centerX + 112 * scale, y(52));
    ctx.stroke();
    ctx.fillStyle = 'rgba(90,74,66,.78)';
    ctx.textAlign = 'center';
    ctx.font = `${12 * scale}px sans-serif`;
    ctx.fillText('WANJIE DAOYOU', centerX, y(55));

    ctx.fillStyle = 'rgba(229,218,196,.34)';
    ctx.strokeStyle = 'rgba(142,111,76,.46)';
    ctx.setLineDash([4 * scale, 4 * scale]);
    ctx.beginPath();
    ctx.arc(centerX, medallionCenterY, medallionRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]);
    const logoSize = medallionRadius * 1.38;
    if (this.logo) {
      ctx.drawImage(
        this.logo as unknown as CanvasImageSource,
        centerX - logoSize / 2,
        medallionCenterY - logoSize / 2,
        logoSize,
        logoSize,
      );
    } else {
      ctx.fillStyle = INK;
      ctx.textAlign = 'center';
      ctx.font = `${52 * scale}px ${this.headingFont}`;
      ctx.fillText('鼎', centerX, medallionCenterY + 18 * scale);
    }

    this.drawTrackedText('万界道友', centerX, y(263), 38 * scale);
    ctx.fillStyle = 'rgba(170,35,28,.92)';
    ctx.fillRect(centerX + 113 * scale, y(235), 18 * scale, 30 * scale);
    ctx.fillStyle = '#f8f0df';
    ctx.textAlign = 'center';
    ctx.font = `${8 * scale}px ${this.bodyFont}`;
    ctx.fillText('策', centerX + 122 * scale, y(248));
    ctx.fillText('源', centerX + 122 * scale, y(260));
    ctx.fillStyle = INK_SECONDARY;
    ctx.font = `${15 * scale}px ${this.bodyFont}`;
    ctx.fillText('一入万界，修行不止。', centerX, y(303));
    ctx.font = `${11 * scale}px ${this.bodyFont}`;
    ctx.fillText('在纸墨之间落下道号，自此入界修行、', centerX, y(341));
    ctx.fillText('历练、炼造与论道。', centerX, y(365));
    ctx.fillStyle = INK_SECONDARY;
    ctx.font = `${12 * scale}px ${this.bodyFont}`;
    ctx.fillText('正在准备你的道途', centerX, y(420));

    const dots = '·'.repeat((this.tick % 3) + 1);
    const progressText = normalizeStartupCanvasText(
      this.error || `${this.status}${dots}`,
    );
    const barWidth = Math.min(286 * scale, this.width - 52);
    const barX = centerX - barWidth / 2;
    const barY = y(458);
    ctx.fillStyle = 'rgba(44,24,16,.10)';
    ctx.fillRect(barX, barY, barWidth, 2);
    ctx.fillStyle = CRIMSON;
    ctx.fillRect(barX, barY, barWidth * (this.progress / 100), 2);
    ctx.fillStyle = this.error ? CRIMSON : INK_SECONDARY;
    ctx.font = `${11 * scale}px ${this.bodyFont}`;
    ctx.fillText(
      this.error
        ? `${progressText} 【点击重试】`
        : `${progressText} ${Math.round(this.progress)}%`,
      centerX,
      barY + 24 * scale,
    );
    this.retryRect = this.error
      ? {
          x: barX,
          y: barY + 4 * scale,
          width: barWidth,
          height: 40 * scale,
        }
      : null;

    const footerY = Math.max(y(540), viewportBottom - 18);
    ctx.globalAlpha = 0.16;
    ctx.fillStyle = '#76604b';
    ctx.beginPath();
    ctx.moveTo(0, viewportBottom);
    ctx.lineTo(0, footerY - 20 * scale);
    ctx.quadraticCurveTo(
      this.width * 0.14,
      footerY - 52 * scale,
      this.width * 0.31,
      footerY - 17 * scale,
    );
    ctx.quadraticCurveTo(
      this.width * 0.5,
      footerY - 45 * scale,
      this.width * 0.68,
      footerY - 15 * scale,
    );
    ctx.quadraticCurveTo(
      this.width * 0.86,
      footerY - 48 * scale,
      this.width,
      footerY - 18 * scale,
    );
    ctx.lineTo(this.width, viewportBottom);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(90,74,66,.58)';
    ctx.font = `${11 * scale}px ${this.bodyFont}`;
    ctx.fillText('一念入界，自此皆是修行。', centerX, footerY);
    ctx.restore();
  }
}

new WechatStartupShell().start();
