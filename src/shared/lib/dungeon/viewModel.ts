import type { ResourceOperation } from '@shared/engine/resource/types';
import type {
  DungeonRound,
  DungeonSettlement,
  DungeonState,
} from './types';

/**
 * 副本页面的跨端视图状态。
 *
 * 这是 Web 与微信小游戏共同的状态判定真源。平台层只能负责渲染，
 * 不应再次手写 WAITING_BATTLE / LOOTING / FINISHED 等分支规则。
 */
export type DungeonViewState =
  | { type: 'loading' }
  | { type: 'not_authenticated' }
  | {
      type: 'map_selection';
      preSelectedNodeId: string | null;
    }
  | { type: 'exploring'; state: DungeonState; lastRound: DungeonRound }
  | { type: 'battle_preparation'; state: DungeonState }
  | {
      type: 'in_battle';
      battleId: string;
      opponentName: string;
      state: DungeonState;
    }
  | { type: 'looting'; state: DungeonState }
  | { type: 'recoverable_error'; state: DungeonState }
  | {
      type: 'settlement';
      settlement?: DungeonSettlement;
      realGains?: ResourceOperation[];
    };

export interface ResolveDungeonViewStateInput {
  stateLoading: boolean;
  hasCultivator: boolean;
  state: DungeonState | null;
  activeBattleId?: string;
  opponentName?: string;
  preSelectedNodeId: string | null;
}

export function deriveDungeonLastRound(
  state: DungeonState | null,
): DungeonRound | null {
  if (!state || state.isFinished || state.history.length === 0) {
    return null;
  }

  const latest = state.history[state.history.length - 1];
  if (!latest) return null;

  return {
    scene_description: latest.scene,
    interaction: {
      options: state.currentOptions || [],
    },
    acquired_items: state.currentRoundItems || [],
    status_update: {
      is_final_round: state.currentRound >= state.maxRounds,
      internal_danger_score: state.dangerScore,
    },
  };
}

export function resolveDungeonViewState({
  stateLoading,
  hasCultivator,
  state,
  activeBattleId,
  opponentName = '神秘敌手',
  preSelectedNodeId,
}: ResolveDungeonViewStateInput): DungeonViewState {
  if (stateLoading) {
    return { type: 'loading' };
  }

  if (!hasCultivator) {
    return { type: 'not_authenticated' };
  }

  if (activeBattleId && state) {
    return {
      type: 'in_battle',
      battleId: activeBattleId,
      opponentName,
      state,
    };
  }

  const shouldShowBattlePrep =
    !activeBattleId &&
    state?.status === 'WAITING_BATTLE' &&
    state.activeBattleId &&
    !state.isFinished;

  if (shouldShowBattlePrep && state) {
    return { type: 'battle_preparation', state };
  }

  if (state?.isFinished) {
    return {
      type: 'settlement',
      settlement: state.settlement,
      realGains: state.realGains,
    };
  }

  if (state?.status === 'LOOTING') {
    return { type: 'looting', state };
  }

  if (state?.status === 'RECOVERABLE_ERROR') {
    return { type: 'recoverable_error', state };
  }

  const lastRound = deriveDungeonLastRound(state);
  if (state && lastRound) {
    return { type: 'exploring', state, lastRound };
  }

  return {
    type: 'map_selection',
    preSelectedNodeId,
  };
}

export type DungeonMutationResolution =
  | { type: 'none' }
  | { type: 'refresh' }
  | { type: 'state'; state: DungeonState }
  | {
      type: 'settlement';
      settlement?: DungeonSettlement;
      realGains?: ResourceOperation[];
    }
  | { type: 'clear' };

export function resolveDungeonMutationResult(
  data:
    | {
        conflict?: boolean;
        state?: DungeonState;
        isFinished?: boolean;
        settlement?: DungeonSettlement;
        realGains?: ResourceOperation[];
        success?: boolean;
      }
    | null
    | undefined,
): DungeonMutationResolution {
  if (!data) return { type: 'none' };
  if (data.conflict) return { type: 'refresh' };
  if (data.isFinished) {
    return {
      type: 'settlement',
      settlement: data.settlement,
      realGains: data.realGains,
    };
  }
  if (data.state) return { type: 'state', state: data.state };
  if (data.success) return { type: 'clear' };
  return { type: 'none' };
}

export function shouldRefreshCultivatorAfterDungeonMutation(
  resolution: DungeonMutationResolution,
) {
  void resolution;
  return false;
}
