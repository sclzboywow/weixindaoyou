import { getWx, type WxRewardedVideoAd } from '../platform/wechat';

export type RewardedAdSlot = 'battle-heal' | 'yield-double';

const AD_UNITS: Record<RewardedAdSlot, string> = {
  'battle-heal': 'adunit-8620460ebe1846cd',
  'yield-double': 'adunit-dd9c75755666cd7f',
};

const PENDING_KEY = 'daoyou.rewarded-ad.pending.v1';

export type PendingRewardedClaim =
  | { kind: 'battle-heal'; runId: string; idempotencyKey: string }
  | { kind: 'yield-double'; idempotencyKey: string };

export type RewardedVideoOutcome = 'completed' | 'dismissed' | 'unavailable';

const ads = new Map<string, WxRewardedVideoAd>();

function isPendingClaim(value: unknown): value is PendingRewardedClaim {
  if (!value || typeof value !== 'object') return false;
  const record = value as Record<string, unknown>;
  if (record.kind === 'battle-heal') {
    return (
      typeof record.runId === 'string' &&
      record.runId.length > 0 &&
      typeof record.idempotencyKey === 'string' &&
      record.idempotencyKey.length > 0
    );
  }
  return (
    record.kind === 'yield-double' &&
    typeof record.idempotencyKey === 'string' &&
    record.idempotencyKey.length > 0
  );
}

export function readPendingRewardedClaim(): PendingRewardedClaim | null {
  try {
    const raw = getWx().getStorageSync(PENDING_KEY);
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return isPendingClaim(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writePendingRewardedClaim(claim: PendingRewardedClaim): void {
  getWx().setStorageSync(PENDING_KEY, claim);
}

export function clearPendingRewardedClaim(): void {
  try {
    getWx().removeStorageSync(PENDING_KEY);
  } catch {
    getWx().setStorageSync(PENDING_KEY, '');
  }
}

function rewardedVideoAd(slot: RewardedAdSlot): WxRewardedVideoAd | null {
  const createRewardedVideoAd = getWx().createRewardedVideoAd;
  if (!createRewardedVideoAd) return null;
  const adUnitId = AD_UNITS[slot];
  const cached = ads.get(adUnitId);
  if (cached) return cached;
  const created = createRewardedVideoAd({ adUnitId });
  ads.set(adUnitId, created);
  return created;
}

export function showRewardedVideo(
  slot: RewardedAdSlot,
): Promise<RewardedVideoOutcome> {
  const ad = rewardedVideoAd(slot);
  if (!ad) return Promise.resolve('unavailable');
  return new Promise((resolve) => {
    let settled = false;
    const finish = (outcome: RewardedVideoOutcome) => {
      if (settled) return;
      settled = true;
      ad.offClose?.(onClose);
      ad.offError?.(onError);
      resolve(outcome);
    };
    const onClose = (result?: { isEnded?: boolean }) => {
      finish(result?.isEnded === true ? 'completed' : 'dismissed');
    };
    const onError = () => finish('unavailable');
    ad.onClose(onClose);
    ad.onError(onError);
    ad.show().catch(() =>
      ad
        .load()
        .then(() => ad.show())
        .catch(() => finish('unavailable')),
    );
  });
}
