import type { WxCanvas, WxImage } from './platform/wechat';
import type { NativeSubscriptions } from './ui/nativeSubscriptions';

export interface WechatStartupBridge {
  canvas: WxCanvas;
  getShellAsset(name: 'paper' | 'logo'): WxImage | null;
  getShellFont(name: 'body' | 'heading'): string;
  handoff(startCore: () => void): void;
  celebrate?(redraw: () => boolean): void;
  subscriptions?: NativeSubscriptions;
  mailBody?: typeof import('./ui/nativeMailBody').drawNativeMailBody;
  alchemy?: typeof import('./ui/nativeAlchemyWorkspace').drawNativeAlchemyWorkspace;
  connection?: typeof import('./ui/nativeConnectionStatus').NativeConnectionStatus;
  hudInfo?: typeof import('./ui/nativeHudInfo').buildNativeHudInfo;
}

type StartupGlobal = typeof globalThis & {
  __daoyouStartupBridge?: WechatStartupBridge;
};

export function installWechatStartupBridge(bridge: WechatStartupBridge): void {
  (globalThis as StartupGlobal).__daoyouStartupBridge = bridge;
}

export function takeWechatStartupBridge(): WechatStartupBridge | null {
  const host = globalThis as StartupGlobal;
  const bridge = host.__daoyouStartupBridge ?? null;
  delete host.__daoyouStartupBridge;
  return bridge;
}
