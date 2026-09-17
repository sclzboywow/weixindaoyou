import type {
  BattlePlaybackRecordV3,
  PublicBattleUnitSnapshotV1,
} from '@shared/types/battle';
import { normalizeBattleUnitSnapshot } from './battleUnitSnapshot';

export type BattlePlaybackState = {
  record: BattlePlaybackRecordV3 | undefined;
  currentIndex: number;
  isPlaying: boolean;
};

export interface BattlePlaybackSnapshot {
  currentIndex: number;
  totalActions: number;
  progress: number;
  isPlaying: boolean;
  playbackSpeed: number;
  isPlaybackFinished: boolean;
  currentPlayerFrame: PublicBattleUnitSnapshotV1 | undefined;
  currentOpponentFrame: PublicBattleUnitSnapshotV1 | undefined;
  playerName: string;
  opponentName: string;
  unitSnapshots: Record<string, PublicBattleUnitSnapshotV1>;
}

export function resolvePlaybackStateForRecord(
  playbackState: BattlePlaybackState,
  record: BattlePlaybackRecordV3 | undefined,
): BattlePlaybackState {
  return playbackState.record === record
    ? playbackState
    : { record, currentIndex: -1, isPlaying: false };
}

export function resolveBattleUnitName(
  record: BattlePlaybackRecordV3 | undefined,
  unitId: string | undefined,
  fallbackName: string,
): string {
  if (!record || !unitId) {
    return fallbackName;
  }

  if (record.outcome.winner.id === unitId) {
    return record.outcome.winner.name;
  }

  if (record.outcome.loser.id === unitId) {
    return record.outcome.loser.name;
  }

  return fallbackName;
}

export function resolveBattlePlaybackNames(
  record: BattlePlaybackRecordV3 | undefined,
) {
  return {
    playerName: resolveBattleUnitName(
      record,
      record?.participants.player.id,
      '加载中',
    ),
    opponentName: resolveBattleUnitName(
      record,
      record?.participants.opponent.id,
      '神秘对手',
    ),
  };
}

export function resolveUnitSnapshotsForIndex(
  record: BattlePlaybackRecordV3 | undefined,
  sequences: BattlePlaybackRecordV3['sequences'],
  currentIndex: number,
): Record<string, PublicBattleUnitSnapshotV1> {
  const latestUnitsBySequenceId = new Map<
    string,
    Record<string, PublicBattleUnitSnapshotV1>
  >();
  for (const frame of record?.stateTimeline.frames ?? []) {
    if (frame.sourceSequenceId) {
      latestUnitsBySequenceId.set(frame.sourceSequenceId, frame.units);
    }
  }

  const initialUnits = record?.stateTimeline.frames[0]?.units;
  if (!record || !initialUnits) {
    return {};
  }

  let snapshots = Object.fromEntries(
    Object.entries(initialUnits).flatMap(([unitId, unit]) => {
      const normalized = normalizeBattleUnitSnapshot(unit);
      return normalized ? [[unitId, normalized] as const] : [];
    }),
  );
  for (let i = 0; i <= currentIndex; i++) {
    const sequence = sequences[i];
    if (!sequence) {
      continue;
    }

    const latestUnits = latestUnitsBySequenceId.get(sequence.id);
    if (latestUnits) {
      const next: Record<string, PublicBattleUnitSnapshotV1> = { ...snapshots };
      for (const [unitId, patch] of Object.entries(latestUnits)) {
        const previous = next[unitId];
        const merged = normalizeBattleUnitSnapshot({
          ...previous,
          ...patch,
          hp: patch.hp ?? previous?.hp,
          mp: patch.mp ?? previous?.mp,
        });
        if (merged) {
          next[unitId] = merged;
        }
      }
      snapshots = next;
    }
  }

  return snapshots;
}

export function isBattlePlaybackRecord(
  value: Record<string, unknown> | null | undefined,
): value is Record<string, unknown> & BattlePlaybackRecordV3 {
  if (!value) {
    return false;
  }
  return Array.isArray(value.sequences) && Boolean(value.stateTimeline);
}

/**
 * 纯 TS 战报播放状态机，对齐 Web `useCombatPlayer` / `useBattlePlaybackState`。
 */
export class BattlePlaybackEngine {
  private playbackState: BattlePlaybackState;
  private playbackSpeed = 1;

  constructor(record: BattlePlaybackRecordV3 | undefined) {
    this.playbackState = {
      record,
      currentIndex: -1,
      isPlaying: false,
    };
  }

  setRecord(record: BattlePlaybackRecordV3 | undefined): void {
    this.playbackState = {
      record,
      currentIndex: -1,
      isPlaying: false,
    };
  }

  getSnapshot(): BattlePlaybackSnapshot {
    const record = this.playbackState.record;
    const sequences = record?.sequences ?? [];
    const totalActions = sequences.length;
    const currentIndex = this.playbackState.currentIndex;
    const isEnded = currentIndex >= totalActions - 1 && totalActions > 0;
    const isPlaying =
      this.playbackState.isPlaying && totalActions > 0 && !isEnded;
    const unitSnapshots = resolveUnitSnapshotsForIndex(
      record,
      sequences,
      currentIndex,
    );
    const { playerName, opponentName } = resolveBattlePlaybackNames(record);
    const playerId = record?.participants.player.id;
    const opponentId = record?.participants.opponent.id;

    return {
      currentIndex,
      totalActions,
      progress: totalActions > 0 ? ((currentIndex + 1) / totalActions) * 100 : 0,
      isPlaying,
      playbackSpeed: this.playbackSpeed,
      isPlaybackFinished: totalActions > 0 && currentIndex >= totalActions - 1,
      currentPlayerFrame: normalizeBattleUnitSnapshot(
        playerId ? unitSnapshots[playerId] : undefined,
      ),
      currentOpponentFrame: normalizeBattleUnitSnapshot(
        opponentId ? unitSnapshots[opponentId] : undefined,
      ),
      playerName,
      opponentName,
      unitSnapshots,
    };
  }

  shouldAutoStart(): boolean {
    const snapshot = this.getSnapshot();
    return (
      Boolean(this.playbackState.record) &&
      snapshot.totalActions > 0 &&
      snapshot.currentIndex === -1 &&
      !snapshot.isPlaying
    );
  }

  play(): void {
    const record = this.playbackState.record;
    const totalActions = record?.sequences.length ?? 0;
    if (totalActions <= 0) {
      return;
    }

    const baseState = resolvePlaybackStateForRecord(
      this.playbackState,
      record,
    );
    this.playbackState = {
      record,
      currentIndex:
        baseState.currentIndex >= totalActions - 1 ? -1 : baseState.currentIndex,
      isPlaying: true,
    };
  }

  pause(): void {
    this.playbackState = {
      ...resolvePlaybackStateForRecord(this.playbackState, this.playbackState.record),
      isPlaying: false,
    };
  }

  reset(): void {
    this.playbackState = {
      record: this.playbackState.record,
      currentIndex: -1,
      isPlaying: false,
    };
  }

  toggle(): void {
    const snapshot = this.getSnapshot();
    if (snapshot.isPlaybackFinished) {
      this.reset();
      return;
    }
    if (snapshot.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  setPlaybackSpeed(speed: number): void {
    this.playbackSpeed = speed;
  }

  advance(): void {
    const record = this.playbackState.record;
    const totalActions = record?.sequences.length ?? 0;
    if (totalActions <= 0) {
      return;
    }

    const baseState = resolvePlaybackStateForRecord(
      this.playbackState,
      record,
    );
    this.playbackState = {
      record,
      currentIndex: Math.min(baseState.currentIndex + 1, totalActions - 1),
      isPlaying: baseState.isPlaying,
    };
  }

  getAdvanceDelayMs(): number | null {
    const snapshot = this.getSnapshot();
    if (!snapshot.isPlaying || snapshot.isPlaybackFinished) {
      return null;
    }
    return 1000 / this.playbackSpeed;
  }
}
