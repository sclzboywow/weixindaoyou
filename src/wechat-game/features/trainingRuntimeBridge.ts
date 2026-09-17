import type { CultivatorCombatInput } from '../../shared/engine/battle-v5/adapters/CultivatorCombatAdapter';
import type { TrainingRoomDraft } from '../../shared/lib/training-room/config';

export interface WechatTrainingRuntimeBridge {
  simulate(
    player: CultivatorCombatInput,
    opponent: CultivatorCombatInput,
    draft: TrainingRoomDraft,
  ): unknown;
}

const BRIDGE_KEY = '__daoyouWechatTrainingRuntime';

export function installWechatTrainingRuntimeBridge(
  bridge: WechatTrainingRuntimeBridge,
): void {
  (globalThis as Record<string, unknown>)[BRIDGE_KEY] = bridge;
}

export function getWechatTrainingRuntimeBridge(): WechatTrainingRuntimeBridge | null {
  return (
    ((globalThis as Record<string, unknown>)[BRIDGE_KEY] as
      | WechatTrainingRuntimeBridge
      | undefined) ?? null
  );
}
