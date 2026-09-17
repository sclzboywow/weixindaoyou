import type {
  CombatSequenceV3,
  PresentedLogLineV3,
  PresentedLogPartV3,
  PresentedLogToneV3,
} from '@shared/engine/battle-v5/v3';
import { CombatPresenterV3 } from '@shared/engine/battle-v5/v3';
import type { BattlePlaybackRecordV3 } from '@shared/types/battle';

export interface BattleLogEntry {
  sequenceIndex: number;
  heading?: string;
  lines: BattleLogLine[];
  isCurrent: boolean;
}

export interface BattleLogLine {
  text: string;
  color: string;
  bold: boolean;
  role: PresentedLogLineV3['role'];
  level: 'sequence' | 'attribution' | 'result';
  depth: number;
  connected: boolean;
  parts?: PresentedLogPartV3[];
}

const TONE_COLORS: Record<PresentedLogToneV3, string> = {
  neutral: '#2c1810',
  secondary: '#5a4a42',
  ability: '#8f2433',
  damage: '#9f2f3f',
  damage_physical: '#b4232f',
  damage_magical: '#12657f',
  damage_true: '#9200ff',
  damage_dot: '#8a4b18',
  positive: '#2f6f4e',
  negative: '#9f2f3f',
  shield: '#936100',
  resource: '#765200',
  buff: '#2f6f4e',
  debuff: '#9f2f3f',
  control: '#5a4a42',
  mechanic: '#765200',
  defense: '#376a63',
  fatal: '#7a1020',
};

const BATTLE_MUTED = 'rgba(44,24,16,.48)';

export function combatLogPartColor(
  part: PresentedLogPartV3,
  fallbackColor = TONE_COLORS.neutral,
): string {
  const fallbackTone: PresentedLogToneV3 | undefined =
    part.kind === 'unit'
      ? 'neutral'
      : part.kind === 'ability'
        ? 'ability'
        : part.kind === 'resource'
          ? 'resource'
          : part.kind === 'status'
            ? 'control'
            : undefined;
  const tone = part.tone ?? fallbackTone;
  return tone ? TONE_COLORS[tone] : fallbackColor;
}

export function combatLogLineColor(
  line: BattleLogLine,
  isActive: boolean,
): string {
  if (
    line.level === 'attribution' ||
    line.role === 'secondary' ||
    line.role === 'resource' ||
    line.role === 'state'
  ) {
    return TONE_COLORS.secondary;
  }
  if (line.level === 'sequence' && line.role === 'system') {
    return BATTLE_MUTED;
  }
  return isActive ? TONE_COLORS.neutral : BATTLE_MUTED;
}

export function presentedLineColor(parts: PresentedLogPartV3[]): string {
  for (const part of parts) {
    if (part.tone === 'fatal' || part.tone === 'damage') {
      return TONE_COLORS.damage;
    }
    if (
      part.tone === 'negative' ||
      part.tone === 'debuff' ||
      part.tone === 'control'
    ) {
      return TONE_COLORS.negative;
    }
    if (part.tone === 'positive' || part.tone === 'buff') {
      return TONE_COLORS.positive;
    }
  }
  const firstTone = parts.find((part) => part.tone)?.tone;
  return firstTone ? TONE_COLORS[firstTone] : TONE_COLORS.secondary;
}

export function formatPresentedLine(
  line: PresentedLogLineV3 | undefined,
): string {
  if (!line?.parts?.length) {
    return '';
  }
  return line.parts
    .filter((part): part is PresentedLogPartV3 => Boolean(part))
    .map((part) => part.text ?? '')
    .join('');
}

export type NativeBattleLogMode = 'concise' | 'detailed';

export function buildBattleLogEntries(
  record: BattlePlaybackRecordV3,
  currentIndex: number,
  mode: NativeBattleLogMode = 'concise',
): BattleLogEntry[] {
  const presenter = new CombatPresenterV3(mode);
  const sequences = record.sequences;
  const entries: BattleLogEntry[] = [];

  sequences.forEach((sequence, sequenceIndex) => {
    if (sequenceIndex > currentIndex) {
      return;
    }
    let presentation;
    try {
      presentation = presenter.present(sequence as CombatSequenceV3);
    } catch {
      return;
    }
    const lines: BattleLogLine[] = [];
    const pushLine = (
      line: PresentedLogLineV3,
      options: {
        level?: BattleLogLine['level'];
        depth?: number;
        connected?: boolean;
        bold?: boolean;
      } = {},
    ) => {
      const parts = line.parts.filter((part): part is PresentedLogPartV3 =>
        Boolean(part),
      );
      lines.push({
        text: formatPresentedLine(line),
        color: presentedLineColor(parts),
        bold:
          options.bold ??
          (line.role === 'primary' || options.level === 'attribution'),
        role: line.role,
        level: options.level ?? 'result',
        depth: options.depth ?? 0,
        connected: options.connected ?? false,
        parts,
      });
    };
    const nested = Boolean(presentation.heading);
    if (presentation.heading) {
      pushLine(presentation.heading, { level: 'sequence', bold: true });
    }
    for (const group of presentation.groups) {
      if (group.layout === 'inline') {
        pushLine(group.line, {
          depth: nested ? 1 : 0,
          connected: nested,
        });
        continue;
      }
      if (group.layout === 'branch' && group.heading) {
        pushLine(group.heading, {
          level: nested ? 'attribution' : 'result',
          depth: nested ? 1 : 0,
          connected: nested,
          bold: true,
        });
      }
      const groupLines = group.lines;
      for (const line of groupLines) {
        pushLine(line, {
          depth: group.layout === 'branch' ? (nested ? 2 : 1) : nested ? 1 : 0,
          connected: nested || group.layout === 'branch',
        });
      }
    }
    if (lines.length === 0) {
      return;
    }
    entries.push({
      sequenceIndex,
      lines,
      isCurrent: sequenceIndex === currentIndex,
    });
  });

  return entries;
}
