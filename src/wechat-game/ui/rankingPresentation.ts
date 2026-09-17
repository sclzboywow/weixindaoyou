import { RANKING_REWARDS, type RealmType } from '../../shared/types/constants';

export type NativeRankingTab =
  'battle' | 'wealth' | 'artifact' | 'technique' | 'skill' | 'elixir';

export interface NativeRankingPresentation {
  id: string;
  rank: number;
  name: string;
  title: string;
  primaryMeta: string;
  secondaryMeta: string;
  description: string;
  spiritStones: number;
  score: number;
  quantity: number;
  itemType: 'artifact' | 'technique' | 'skill' | 'elixir' | '';
  source: Record<string, unknown>;
}

export const NATIVE_RANKING_TABS: readonly {
  value: NativeRankingTab;
  label: string;
}[] = [
  { value: 'battle', label: '天骄榜' },
  { value: 'wealth', label: '财富榜' },
  { value: 'artifact', label: '法宝榜' },
  { value: 'technique', label: '功法榜' },
  { value: 'skill', label: '神通榜' },
  { value: 'elixir', label: '丹药榜' },
];

function text(record: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (typeof value === 'number' && Number.isFinite(value))
      return String(value);
  }
  return '';
}

function number(record: Record<string, unknown>, ...keys: string[]): number {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string' && value.trim()) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return 0;
}

export function rankingDescription(tab: NativeRankingTab): string {
  if (tab === 'battle') return '择敌、查探、挑战，一切夺位都从榜前决断。';
  if (tab === 'wealth') return '灵石聚散自有痕迹，榜上只看当前身家。';
  return '诸般名器留影于榜，观其品阶、评分与持有者。';
}

export function rankingSectionTitles(
  tab: NativeRankingTab,
): readonly [string, string] {
  if (tab === 'battle') return ['榜首三席', '榜单名录'];
  if (tab === 'wealth') return ['富甲三席', '财富名录'];
  return ['镇榜之物', '珍宝名录'];
}

export function expectedRankingReputation(rank: number | null): number | null {
  if (!rank) return null;
  if (rank === 1) return RANKING_REWARDS[1];
  if (rank <= 10) return RANKING_REWARDS['2-10'];
  if (rank <= 50) return RANKING_REWARDS['11-50'];
  if (rank <= 100) return RANKING_REWARDS['51-100'];
  return null;
}

export function presentRankingRecord(
  tab: NativeRankingTab,
  record: Record<string, unknown>,
  index: number,
): NativeRankingPresentation {
  const rank = number(record, 'rank') || index + 1;
  const name = text(record, 'name', 'cultivatorName') || `第 ${rank} 名`;
  const title = text(record, 'title');

  if (tab === 'battle') {
    const realm = [
      text(record, 'realm'),
      text(record, 'realm_stage', 'realmStage'),
    ]
      .filter(Boolean)
      .join(' · ');
    const age = number(record, 'age');
    const affiliation = text(record, 'sectAffiliation', 'origin') || '散修';
    return {
      id: text(record, 'id', 'cultivatorId'),
      rank,
      name,
      title,
      primaryMeta: realm,
      secondaryMeta: [age ? `${age} 岁` : '', affiliation]
        .filter(Boolean)
        .join(' · '),
      description: '',
      spiritStones: 0,
      score: 0,
      quantity: 1,
      itemType: '',
      source: record,
    };
  }

  if (tab === 'wealth') {
    const realm = [
      text(record, 'realm'),
      text(record, 'realm_stage', 'realmStage'),
    ]
      .filter(Boolean)
      .join(' · ');
    const age = number(record, 'age');
    const origin = text(record, 'origin') || '散修';
    return {
      id: text(record, 'id', 'cultivatorId'),
      rank,
      name,
      title,
      primaryMeta: realm,
      secondaryMeta: [age ? `${age} 岁` : '', origin]
        .filter(Boolean)
        .join(' · '),
      description: '',
      spiritStones: number(record, 'spiritStones', 'wealth'),
      score: 0,
      quantity: 1,
      itemType: '',
      source: record,
    };
  }

  return {
    id: text(record, 'id'),
    rank,
    name,
    title,
    primaryMeta: [text(record, 'quality'), text(record, 'type')]
      .filter(Boolean)
      .join(' · '),
    secondaryMeta: `持有者：${text(record, 'ownerName') || '无名道友'}`,
    description: text(record, 'description'),
    spiritStones: 0,
    score: number(record, 'score'),
    quantity: Math.max(1, number(record, 'quantity')),
    itemType: tab,
    source: record,
  };
}

export function rankingEmptyText(
  tab: NativeRankingTab,
  realm: RealmType,
  ownRealm: boolean,
): string {
  if (tab === 'wealth') return '财富榜暂无记录，静待灵石入库。';
  if (tab !== 'battle') return '此榜单暂无记录，静待宝物出世。';
  return ownRealm
    ? `${realm}天骄榜暂无记录。`
    : `${realm}天骄榜暂无记录。越境榜单不可直接上榜。`;
}
