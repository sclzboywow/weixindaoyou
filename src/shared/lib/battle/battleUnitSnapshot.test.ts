import { describe, expect, it } from 'vitest';
import { normalizeBattleUnitSnapshot } from './battleUnitSnapshot';

describe('battleUnitSnapshot', () => {
  it('fills missing hp/mp for partial unit patches', () => {
    const normalized = normalizeBattleUnitSnapshot({
      id: 'player',
      name: '雷慎行',
      alive: true,
      hp: { current: 630, max: 630, percent: 100 },
    } as never);

    expect(normalized?.mp).toEqual({ current: 0, max: 0, percent: 0 });
    expect(normalized?.hp.current).toBe(630);
  });
});
