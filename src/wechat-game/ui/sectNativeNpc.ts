import type { OfficialSceneKey } from './officialScenes';
import type { SectTasksData } from '../../shared/contracts/sect';
import {
  miningActivityMessage,
  resolveMiningActivityMode,
} from '../../react-app/routes/game/sect/spirit-vein/mining/miningActivityState';
import {
  sweepActivityMessage,
  resolveSweepActivityMode,
} from '../../react-app/routes/game/sect/gate/sweep/sweepActivityState';
import {
  describeSectPromotionStatus,
  SECT_RANK_LABELS,
  type SectAffairsTaskKind,
  type SectDiscipleRank,
} from '../../shared/engine/sect';

export interface NativeSectRoomActor {
  id: string;
  roleKey: string;
  sigil: string;
  name: string;
  identity: string;
  responsibility: string;
  greeting: string;
  appearance: 'person' | 'facility';
  conversationRenderer: string;
  conversationParameters?: Record<string, unknown>;
}

export interface NativeSectRoom {
  description: string;
  actors: NativeSectRoomActor[];
}

/** 官方 scene key → shared presentation room key */
export const OFFICIAL_SCENE_PRESENTATION_KEY: Partial<Record<OfficialSceneKey, string>> = {
  'sect-hall': 'hall',
  'sect-affairs': 'affairs',
  'sect-treasury': 'treasury',
  'sect-industries': 'industries',
  'sect-archive': 'archive',
  'sect-enlightenment-cliff': 'paths',
  'sect-abilities': 'arena',
  'sect-arena': 'arena',
  'sect-cultivation-room': 'cultivation',
  'sect-alchemy': 'alchemy',
  'sect-refinery': 'refinery',
  'sect-spirit-vein': 'spiritVein',
  'sect-herb-garden': 'herbGarden',
  'sect-gate': 'gate',
  'sect-cave': 'cave',
};

export function nativeSectSceneCopy(
  presentation: { scenes: Record<string, { title: string; description: string }> } | undefined,
  sceneKey: string,
): { title: string; description: string } {
  const scene = presentation?.scenes[sceneKey];
  return {
    title: scene?.title ?? '',
    description: scene?.description ?? '',
  };
}

export const OFFICIAL_SCENE_ROOM_KEY = OFFICIAL_SCENE_PRESENTATION_KEY;

const AFFAIRS_ROLE_KIND: Record<string, SectAffairsTaskKind> = {
  daily: 'daily',
  weekly: 'weekly',
  promotion: 'promotion',
};

const STATE_ORDER: Record<string, number> = {
  claimable: 0,
  active: 1,
  offered: 2,
  claimed: 3,
  locked: 4,
};

export function resolveAffairsTaskKind(
  actor: NativeSectRoomActor,
): SectAffairsTaskKind | undefined {
  const fromParams = actor.conversationParameters?.kind;
  if (fromParams === 'daily' || fromParams === 'weekly' || fromParams === 'promotion') {
    return fromParams;
  }
  return AFFAIRS_ROLE_KIND[actor.roleKey];
}

export function sectTaskRecordKey(task: Record<string, unknown>): string {
  return `${stringField(task, 'periodKey')}:${stringField(task, 'definitionId')}`;
}

export function sortSectTaskRecords(
  tasks: readonly Record<string, unknown>[],
): Record<string, unknown>[] {
  return tasks
    .map((task, index) => ({ task, index }))
    .sort(
      (left, right) =>
        (STATE_ORDER[stringField(left.task, 'state')] ?? 99) -
          (STATE_ORDER[stringField(right.task, 'state')] ?? 99) || left.index - right.index,
    )
    .map(({ task }) => task);
}

export function visibleSectTaskRecords(
  tasks: readonly Record<string, unknown>[],
): Record<string, unknown>[] {
  return tasks.filter((task) => stringField(task, 'state') !== 'locked');
}

function taskTitles(tasks: readonly Record<string, unknown>[]): string {
  return tasks
    .map((task) => `「${stringField(asTaskPresentation(task), 'title') || '委托'}」`)
    .join('、');
}

function asTaskPresentation(task: Record<string, unknown>): Record<string, unknown> {
  return asRecord(task.presentation) ?? {};
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function stringField(record: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) return value;
  }
  return '';
}

export function buildAffairsNpcOpening(
  npc: NativeSectRoomActor,
  tasks: readonly Record<string, unknown>[],
  guidance?: string,
): string {
  const visible = visibleSectTaskRecords(tasks);
  const clauses = [
    visible.some((task) => stringField(task, 'state') === 'offered')
      ? `眼下可接的有${taskTitles(visible.filter((task) => stringField(task, 'state') === 'offered'))}`
      : undefined,
    visible.some((task) => stringField(task, 'state') === 'active')
      ? `${taskTitles(visible.filter((task) => stringField(task, 'state') === 'active'))}还在你名下`
      : undefined,
    visible.some((task) => stringField(task, 'state') === 'claimable')
      ? `${taskTitles(visible.filter((task) => stringField(task, 'state') === 'claimable'))}已经可以交回`
      : undefined,
  ].filter((clause): clause is string => Boolean(clause));

  const taskStatus =
    clauses.length > 0
      ? `${clauses.join('；')}。`
      : visible.some((task) => stringField(task, 'state') === 'claimed')
        ? '本期差事都已结清，若要查账便问我。'
        : '眼下没有需要你经办的事务。';
  return [npc.greeting, taskStatus, guidance].filter(Boolean).join(' ');
}

export function buildAffairsTaskReply(task: Record<string, unknown>): string {
  const dialogue = asRecord(asTaskPresentation(task).dialogue) ?? {};
  const state = stringField(task, 'state');
  if (state === 'offered') return stringField(dialogue, 'offeredReply') || '领取委托';
  if (state === 'active') return stringField(dialogue, 'activeReply') || '继续委托';
  if (state === 'claimable') return stringField(dialogue, 'claimableReply') || '交回结清';
  return stringField(dialogue, 'claimedReply') || '查看回执';
}

export function buildAffairsPromotionGuidance(promotion: Record<string, unknown> | null): string | undefined {
  if (!promotion) return undefined;
  const nextRank = promotion.nextRank as SectDiscipleRank | null | undefined;
  if (!nextRank) return undefined;
  const missing = Array.isArray(promotion.missing) ? promotion.missing.map(String).filter(Boolean) : [];
  return describeSectPromotionStatus({
    nextRank,
    missingRequirements: missing,
  });
}

export function formatAffairsPromotionRank(nextRank: SectDiscipleRank): string {
  return SECT_RANK_LABELS[nextRank] ?? nextRank;
}

export function instructionSegmentText(segments: unknown): string {
  if (!Array.isArray(segments)) return '';
  return segments
    .map((segment) => {
      const record = asRecord(segment);
      return record ? String(record.text ?? '') : '';
    })
    .filter(Boolean)
    .join('');
}

export const SWEEP_TASK_ID = 'gate_sweep';
export const MINING_TASK_ID = 'spirit_mining';

export function findSweepTask(
  tasks: readonly Record<string, unknown>[],
): Record<string, unknown> | undefined {
  return tasks.find((task) => stringField(task, 'definitionId') === SWEEP_TASK_ID);
}

export function findMiningTask(
  tasks: readonly Record<string, unknown>[],
): Record<string, unknown> | undefined {
  return tasks.find((task) => stringField(task, 'definitionId') === MINING_TASK_ID);
}

export function resolveSweepActivityMessage(
  tasks: readonly Record<string, unknown>[],
): { reward: boolean; message: string } {
  const mode = resolveSweepActivityMode(toSectTasksData(tasks));
  return { reward: mode.kind === 'reward', message: sweepActivityMessage(mode) };
}

export function resolveMiningActivityMessage(
  tasks: readonly Record<string, unknown>[],
): { reward: boolean; message: string } {
  const mode = resolveMiningActivityMode(toSectTasksData(tasks));
  return { reward: mode.kind === 'reward', message: miningActivityMessage(mode) };
}

function toSectTasksData(tasks: readonly Record<string, unknown>[]): SectTasksData {
  return {
    items: tasks as unknown as SectTasksData['items'],
    dateKey: '',
    weekKey: '',
  };
}

/**
 * 官网 SectNpcConversationRegistry 当前生产 renderer 集合。
 * 微信端若不能处理其中任意一项，宗门页就不能标记为完整迁移。
 */
export const SUPPORTED_NATIVE_SECT_NPC_RENDERERS = new Set([
  'sect.affairs.tasks',
  'sect.alchemy.craft',
  'sect.archive.methods',
  'sect.arena.loadout',
  'sect.arena.marshal',
  'sect.arena.tournament',
  'sect.cultivation.retreat',
  'sect.formation.status',
  'sect.gate.news',
  'sect.gate.sweep',
  'sect.hall.registry',
  'sect.hall.stipend',
  'sect.herb-garden.caretaker',
  'sect.herb-garden.status',
  'sect.industries.construction',
  'sect.industries.donation',
  'sect.paths.guidance',
  'sect.refinery.craft',
  'sect.spirit-vein.mining',
  'sect.spirit-vein.patrol',
  'sect.treasury.shop',
] as const);
