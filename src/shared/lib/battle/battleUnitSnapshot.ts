import type { PublicBattleUnitSnapshotV1 } from '@shared/types/battle';

export function normalizeBattleResource(
  value:
    | {
        current?: number;
        max?: number;
        percent?: number;
      }
    | undefined,
  fallbackMax = 0,
) {
  const current = Number(value?.current ?? 0);
  const max = Number(value?.max ?? fallbackMax);
  const percent =
    typeof value?.percent === 'number'
      ? value.percent
      : max > 0
        ? (current / max) * 100
        : 0;
  return { current, max, percent };
}

export function normalizeBattleUnitSnapshot(
  unit: PublicBattleUnitSnapshotV1 | undefined,
): PublicBattleUnitSnapshotV1 | undefined {
  if (!unit) {
    return undefined;
  }

  return {
    ...unit,
    id: unit.id,
    name: unit.name || '未知',
    alive: unit.alive ?? true,
    hp: normalizeBattleResource(unit.hp),
    mp: normalizeBattleResource(unit.mp),
    shield: Number(unit.shield ?? 0),
    actionStates: (unit.actionStates ?? []).filter(Boolean),
    buffs: (unit.buffs ?? []).filter(Boolean),
    combatResources: unit.combatResources ?? [],
    cooldowns: unit.cooldowns ?? [],
  };
}
