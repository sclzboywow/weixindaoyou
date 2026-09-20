import { takeWechatStartupBridge } from './startupBridge';
import { NativeDaoyouApp } from './ui/nativeApp';

declare const GameGlobal:
  | { __daoyouQaApp?: NativeDaoyouApp }
  | undefined;
declare const wx: { __daoyouQaApp?: NativeDaoyouApp } | undefined;

const startup = takeWechatStartupBridge();
const startCore = () => {
  const host = globalThis as typeof globalThis & {
    __daoyouCoreStarted?: boolean;
  };
  if (host.__daoyouCoreStarted) return;
  host.__daoyouCoreStarted = true;
  const app = new NativeDaoyouApp(
    startup?.canvas,
    {
      paper: startup?.getShellAsset('paper'),
      logo: startup?.getShellAsset('logo'),
      bodyFont: startup?.getShellFont('body'),
      headingFont: startup?.getShellFont('heading'),
    },
    startup?.celebrate,
    startup?.subscriptions,
    startup?.mailBody,
    startup?.alchemy,
    startup?.connection,
    startup?.hudInfo,
  );
  const qaHost = globalThis as typeof globalThis & {
    __daoyouQaApp?: NativeDaoyouApp;
    GameGlobal?: { __daoyouQaApp?: NativeDaoyouApp };
    wx?: { __daoyouQaApp?: NativeDaoyouApp };
  };
  qaHost.__daoyouQaApp = app;
  if (typeof GameGlobal !== 'undefined') GameGlobal.__daoyouQaApp = app;
  if (typeof wx !== 'undefined') wx.__daoyouQaApp = app;
  app.start();
};

if (startup) startup.handoff(startCore);
else startCore();
