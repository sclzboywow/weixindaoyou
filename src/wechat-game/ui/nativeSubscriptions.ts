import type { NativeDaoyouApi } from '../core/nativeClient';
import type { WechatGameApi, WxTouchEvent } from '../platform/wechat';

type Context = {
  api: NativeDaoyouApi;
  notify(message: string): void;
  update(value: unknown): void;
};
export interface NativeSubscriptions {
  request(context: Context, payload: unknown): void;
  offer(context: Context, prompt: (accept: () => void) => boolean): void;
}

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object'
    ? (value as Record<string, unknown>)
    : {};
}
function ability(payload: unknown) {
  const root = record(payload);
  return record(record(record(root.data ?? root).subscription).qiFull);
}

// Lives in the startup package; the nearly-full core bundle only passes callbacks.
export function createNativeSubscriptions(
  wx: WechatGameApi,
): NativeSubscriptions {
  let offered = false;
  let requesting = false;
  let pending: (() => void) | undefined;
  let touchStart: { x: number; y: number } | undefined;
  const point = (event: WxTouchEvent) => {
    const touch = event.changedTouches?.[0] ?? event.touches?.[0];
    return touch
      ? {
          x: touch.clientX ?? touch.pageX ?? touch.x ?? NaN,
          y: touch.clientY ?? touch.pageY ?? touch.y ?? NaN,
        }
      : undefined;
  };
  const cancel = () => {
    pending = undefined;
    touchStart = undefined;
  };
  const moved = (event: WxTouchEvent) => {
    const end = point(event);
    return (
      !touchStart ||
      !end ||
      !Number.isFinite(end.x + end.y + touchStart.x + touchStart.y) ||
      Math.hypot(end.x - touchStart.x, end.y - touchStart.y) > 6
    );
  };
  // Registered by startup before Canvas button handlers. Never defer authorization
  // to a timer/promise or to an unrelated later tap.
  wx.onTouchStart((event) => {
    cancel();
    if (event.touches.length <= 1) touchStart = point(event);
  });
  wx.onTouchMove?.((event) => {
    if (moved(event)) cancel();
  });
  wx.onTouchCancel?.(cancel);
  wx.onHide?.(cancel);
  wx.onTouchEnd?.((event) => {
    const authorize = !moved(event) ? pending : undefined;
    cancel();
    authorize?.();
  });
  const tools: NativeSubscriptions = {
    request(context, payload) {
      if (requesting || pending) return;
      if (!wx.onTouchEnd || !touchStart) {
        context.notify('请点击订阅按钮并松开手指后授权');
        return;
      }
      const qi = ability(payload);
      const templateId = typeof qi.templateId === 'string' ? qi.templateId : '';
      if (!wx.requestSubscribeMessage || !templateId || qi.enabled !== true) {
        context.notify('灵气充盈提醒暂不可用，请确认微信身份与模板配置');
        return;
      }
      if (Number(qi.currentQi) >= Number(qi.maxQi)) {
        context.notify('当前天地灵气已经充盈，无需设置提醒');
        return;
      }
      if (qi.pending) {
        context.notify('已订阅本次灵气充盈提醒，无需重复授权');
        return;
      }
      pending = () => {
        requesting = true;
        // Synchronous call inside the original gesture's wx.onTouchEnd callback.
        try {
          wx.requestSubscribeMessage!({
            tmplIds: [templateId],
            success: (result) => {
              if (result[templateId] !== 'accept') {
                requesting = false;
                context.notify('未订阅本次提醒，不影响继续游戏');
                return;
              }
              void context.api
                .subscribeQiFull(templateId)
                .then(async () => {
                  context.notify('已订阅，天地灵气充盈后提醒一次');
                  context.update(await context.api.wechatOpenAbilities());
                })
                .catch(() =>
                  context.notify('提醒记录未确认，请到设置中刷新后重试'),
                )
                .finally(() => {
                  requesting = false;
                });
            },
            fail: (error) => {
              requesting = false;
              context.notify(
                error.errMsg?.includes('require user interaction')
                  ? '本次未订阅，请重新点击订阅按钮并松开手指'
                  : '微信订阅授权未完成，请稍后重试；不影响继续游戏',
              );
            },
          });
        } catch {
          requesting = false;
          context.notify('微信订阅授权未完成，请稍后重试');
        }
      };
    },
    offer(context, prompt) {
      if (offered || !wx.requestSubscribeMessage) return;
      offered = true;
      void context.api
        .wechatOpenAbilities()
        .then((payload) => {
          context.update(payload);
          const qi = ability(payload);
          if (
            qi.enabled !== true ||
            qi.pending ||
            Number(qi.currentQi) >= Number(qi.maxQi)
          )
            return;
          const key = 'daoyou:subscription-prompt-at';
          let last = 0;
          try {
            last = Number(wx.getStorageSync(key)) || 0;
          } catch {
            /* storage optional */
          }
          if (Date.now() - last < 24 * 60 * 60_000) return;
          if (prompt(() => tools.request(context, payload))) {
            try {
              wx.setStorageSync(key, Date.now());
            } catch {
              /* no persistence available */
            }
          }
        })
        .catch(() => undefined); // Optional reminders never block login.
    },
  };
  return tools;
}
