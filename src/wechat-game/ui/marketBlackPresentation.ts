import {
  getMarketNodeSwitchOptions,
  resolveMarketSwitchLayer,
} from '../../shared/lib/game/marketConfig';
import { normalizeBlackMarketPlayerBody } from '../../shared/lib/blackMarketMessages';
import type {
  BlackMarketInspectionKind,
  BlackMarketNpcStatus,
  BlackMarketRevealRating,
} from '../../shared/types/blackMarket';
import type { MarketLayer } from '../../shared/types/market';
import { resolveNativeMaterialTypeInfo } from './materialPresentation';

export const NATIVE_MARKET_LAYER_TABS: ReadonlyArray<{
  value: Extract<MarketLayer, 'common' | 'treasure' | 'heaven'>;
  label: string;
}> = [
  { value: 'common', label: '凡市' },
  { value: 'treasure', label: '珍宝阁' },
  { value: 'heaven', label: '天宝殿' },
];

export const NATIVE_BLACK_MARKET_OPENING_STEPS = [
  '你掀帘走近摊位……',
  '摊主揭开遮布一角……',
  '你从形制与损伤处开始观察……',
] as const;

export const NATIVE_BLACK_MARKET_QUICK_MESSAGES = [
  '仔细观察货物外观',
  '凝神感知货物灵气',
  '检查货物破损痕迹',
  '再凑近看看这物件的细节',
  '问问这货的来历',
  '问问他为何急着出手',
] as const;

export const NATIVE_BLACK_MARKET_OBSERVATION_LABELS: Record<
  BlackMarketInspectionKind,
  string
> = {
  appearance: '外观',
  aura: '气息',
  damage: '痕迹',
  origin: '来历',
  sale_reason: '出手缘由',
};

export const NATIVE_BLACK_MARKET_REVEAL_RATING_COLORS: Record<
  BlackMarketRevealRating,
  string
> = {
  血亏: '#c1121f',
  小亏: '#c1121f',
  公允: '#2c1810',
  小赚: '#2c1810',
  捡漏: '#b88900',
  天降横财: '#b88900',
};

export function nativeMarketLayerLabel(layer: string): string {
  return NATIVE_MARKET_LAYER_TABS.find((item) => item.value === layer)?.label ?? '凡市';
}

export function nativeMarketSwitchRows(activeLayer: MarketLayer) {
  return getMarketNodeSwitchOptions().map((option) => ({
    ...option,
    targetLayer: resolveMarketSwitchLayer(option.id, activeLayer),
    materialTypeLabels: option.dominantMaterialTypes
      .map((type) => resolveNativeMaterialTypeInfo(type).label)
      .join('、'),
  }));
}

export function nativeBlackMarketNpcStatus(status: BlackMarketNpcStatus): {
  label: string;
  tone: 'active' | 'attention' | 'muted';
} {
  if (status === 'completed') return { label: '今日已成交', tone: 'muted' };
  if (status === 'in_progress') return { label: '交谈未完', tone: 'attention' };
  if (status === 'granted') return { label: '入场凭证已留', tone: 'attention' };
  return { label: '货物尚在', tone: 'active' };
}

export function nativeBlackMarketEntryActionLabel(status: BlackMarketNpcStatus): string {
  if (status === 'completed') return '查看成交结果';
  if (status === 'in_progress') return '继续交谈';
  if (status === 'granted') return '重新靠近';
  return '走近摊位';
}

export function nativeBlackMarketPlayerMessage(body: string): string {
  return `你：${normalizeBlackMarketPlayerBody(body)}`;
}
