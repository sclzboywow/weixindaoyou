import {
  applyRewardedBattleHeal,
  scaleYieldValue,
  yieldRewardMultiplier,
} from './rewardedAd';

describe('rewardedAd', () => {
  it('疗伤按上限的一半回补，并且不超过上限', () => {
    expect(applyRewardedBattleHeal(0, 100)).toBe(50);
    expect(applyRewardedBattleHeal(40, 100)).toBe(90);
    expect(applyRewardedBattleHeal(80, 100)).toBe(100);
    expect(applyRewardedBattleHeal(3, 7)).toBe(6);
    expect(applyRewardedBattleHeal(200, 1200)).toBe(800);
  });

  it('没有有效上限时不额外回补', () => {
    expect(applyRewardedBattleHeal(10, 0)).toBe(10);
    expect(applyRewardedBattleHeal(Number.NaN, 80)).toBe(40);
  });

  it('历练倍率只放大收益，缺省仍是一倍', () => {
    expect(yieldRewardMultiplier(undefined)).toBe(1);
    expect(yieldRewardMultiplier('normal')).toBe(1);
    expect(yieldRewardMultiplier('rewarded_double')).toBe(2);
    expect(scaleYieldValue(5, 1)).toBe(5);
    expect(scaleYieldValue(5, 2)).toBe(10);
    expect(scaleYieldValue(0, 2)).toBe(0);
  });
});
