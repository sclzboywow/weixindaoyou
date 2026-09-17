import { describe, expect, it } from 'vitest';
import type { BattlePlaybackRecordV3 } from '@shared/types/battle';
import {
  BattlePlaybackEngine,
  resolveUnitSnapshotsForIndex,
} from './battlePlaybackEngine';

function createMinimalRecord(): BattlePlaybackRecordV3 {
  const playerId = 'player-1';
  const opponentId = 'opponent-1';
  return {
    participants: {
      player: { id: playerId, name: '甲' },
      opponent: { id: opponentId, name: '乙' },
    },
    outcome: {
      turns: 1,
      winner: { id: playerId, name: '甲' },
      loser: { id: opponentId, name: '乙' },
    },
    sequences: [
      {
        id: 'seq-1',
        turn: 1,
        actor: { id: playerId, name: '甲' },
        ability: { id: 'basic', name: '普攻' },
        facts: [],
      },
      {
        id: 'seq-2',
        turn: 1,
        actor: { id: opponentId, name: '乙' },
        ability: { id: 'basic', name: '普攻' },
        facts: [],
      },
    ],
    stateTimeline: {
      unitIds: [playerId, opponentId],
      unitNames: { [playerId]: '甲', [opponentId]: '乙' },
      frames: [
        {
          phase: 'battle_init',
          units: {
            [playerId]: {
              id: playerId,
              name: '甲',
              alive: true,
              hp: { current: 100, max: 100, percent: 100 },
              mp: { current: 50, max: 50, percent: 100 },
              shield: 0,
              cooldowns: [],
              buffs: [],
              combatResources: [],
            },
            [opponentId]: {
              id: opponentId,
              name: '乙',
              alive: true,
              hp: { current: 100, max: 100, percent: 100 },
              mp: { current: 50, max: 50, percent: 100 },
              shield: 0,
              cooldowns: [],
              buffs: [],
              combatResources: [],
            },
          },
        },
        {
          phase: 'action_post',
          sourceSequenceId: 'seq-1',
          units: {
            [playerId]: {
              id: playerId,
              name: '甲',
              alive: true,
              hp: { current: 100, max: 100, percent: 100 },
              mp: { current: 45, max: 50, percent: 90 },
              shield: 0,
              cooldowns: [],
              buffs: [],
              combatResources: [],
            },
            [opponentId]: {
              id: opponentId,
              name: '乙',
              alive: true,
              hp: { current: 80, max: 100, percent: 80 },
              mp: { current: 50, max: 50, percent: 100 },
              shield: 0,
              cooldowns: [],
              buffs: [],
              combatResources: [],
            },
          },
        },
        {
          phase: 'action_post',
          sourceSequenceId: 'seq-2',
          units: {
            [playerId]: {
              id: playerId,
              name: '甲',
              alive: true,
              hp: { current: 90, max: 100, percent: 90 },
              mp: { current: 45, max: 50, percent: 90 },
              shield: 0,
              cooldowns: [],
              buffs: [],
              combatResources: [],
            },
            [opponentId]: {
              id: opponentId,
              name: '乙',
              alive: false,
              hp: { current: 0, max: 100, percent: 0 },
              mp: { current: 50, max: 50, percent: 100 },
              shield: 0,
              cooldowns: [],
              buffs: [],
              combatResources: [],
            },
          },
        },
      ],
    },
    finalSnapshots: {
      winner: {
        id: playerId,
        name: '甲',
        hp: { current: 90, max: 100, percent: 90 },
      },
      loser: {
        id: opponentId,
        name: '乙',
        hp: { current: 0, max: 100, percent: 0 },
      },
    },
  } as BattlePlaybackRecordV3;
}

describe('battlePlaybackEngine', () => {
  it('advances snapshots with sequence index', () => {
    const record = createMinimalRecord();
    const initial = resolveUnitSnapshotsForIndex(record, record.sequences, -1);
    expect(initial[record.participants.opponent.id].hp.current).toBe(100);

    const afterFirst = resolveUnitSnapshotsForIndex(record, record.sequences, 0);
    expect(afterFirst[record.participants.opponent.id].hp.current).toBe(80);

    const afterSecond = resolveUnitSnapshotsForIndex(record, record.sequences, 1);
    expect(afterSecond[record.participants.player.id].hp.current).toBe(90);
    expect(afterSecond[record.participants.opponent.id].alive).toBe(false);
  });

  it('auto-starts and finishes playback', () => {
    const engine = new BattlePlaybackEngine(createMinimalRecord());
    expect(engine.shouldAutoStart()).toBe(true);
    engine.play();
    engine.advance();
    expect(engine.getSnapshot().currentIndex).toBe(0);
    engine.advance();
    const finished = engine.getSnapshot();
    expect(finished.isPlaybackFinished).toBe(true);
    expect(finished.isPlaying).toBe(false);
  });
});
