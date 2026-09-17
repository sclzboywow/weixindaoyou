import { describe, expect, it } from 'vitest';
import { wrapNativeMailLines } from './nativeMailLines';

describe('wrapNativeMailLines', () => {
  it('preserves ranking reward paragraph breaks', () => {
    const content = [
      '本周天骄榜已结算。',
      '道友位列第一名，可领取声望。',
      '请查收附件。',
    ].join('\n');

    expect(wrapNativeMailLines(content, 30, 4)).toEqual([
      '本周天骄榜已结算。',
      '道友位列第一名，可领取声望。',
      '请查收附件。',
    ]);
  });

  it('wraps auction sale notifications instead of leaving one long line', () => {
    const content =
      '道友寄售的【玄铁剑】成交一件，扣除手续费后获得灵石，请收取附件。';
    const lines = wrapNativeMailLines(content, 16, 4);

    expect(lines.length).toBeGreaterThan(1);
    expect(lines.join('')).toBe(content);
  });
});
