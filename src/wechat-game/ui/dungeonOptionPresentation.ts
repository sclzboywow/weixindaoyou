import type { DungeonOption, DungeonOptionCost } from '../../shared/lib/dungeon/types';
import type { MaterialType } from '../../shared/types/constants';
import {
  getMaterialTypeLabel,
  getResourceDisplayName,
  getResourceIcon,
  getResourceTypeLabel,
} from '../../shared/lib/gameConceptDisplay';

export type NativeDungeonRiskTone = 'good' | 'info' | 'bad';

export interface NativeDungeonCostPresentation {
  icon: string;
  name: string;
  value: string;
  bodyFeedback?: string;
}

export interface NativeDungeonOptionPresentation {
  id: number;
  text: string;
  riskLabel: '稳健' | '莫测' | '凶险';
  riskTone: NativeDungeonRiskTone;
  costs: NativeDungeonCostPresentation[];
}

function formatMaterialCostName(cost: DungeonOptionCost): string {
  if (cost.name) return cost.name;
  const typeLabel = cost.required_type
    ? getMaterialTypeLabel(cost.required_type as MaterialType)
    : getResourceTypeLabel('material');
  const qualityLabel = cost.required_quality ? `${cost.required_quality}以上` : '';
  return `${qualityLabel}${typeLabel}`;
}

/** 与官网 formatDungeonCostName 保持一致。 */
export function formatNativeDungeonCostName(cost: DungeonOptionCost): string {
  if (cost.type === 'battle') {
    const metadata = cost.metadata;
    return metadata
      ? `遭遇 ${String(metadata.realm_stage ?? '')}${String(metadata.race ?? '')}${metadata.enemy_name ? `·${String(metadata.enemy_name)}` : ''}`
      : '遭遇战';
  }
  if (cost.type === 'material') return formatMaterialCostName(cost);
  return cost.desc || getResourceDisplayName(cost.type);
}

/** 与官网 formatDungeonCostValue 保持一致。 */
export function formatNativeDungeonCostValue(cost: DungeonOptionCost): string {
  if (cost.type === 'hp_loss' || cost.type === 'mp_loss') {
    return `-${Math.round(cost.value * 100)}%`;
  }
  if (cost.type === 'battle') return `危险 ${cost.value}`;
  return `-${cost.value}`;
}

export function formatNativeDungeonBodyFeedback(
  cost: DungeonOptionCost,
): string | undefined {
  const metadata = cost.metadata as
    | { bodyCultivation?: { preventedLoss?: unknown; triggerText?: unknown } }
    | undefined;
  const feedback = metadata?.bodyCultivation;
  if (!feedback) return undefined;
  if (typeof feedback.triggerText === 'string' && feedback.triggerText.trim()) {
    return feedback.triggerText;
  }
  const prevented = Number(feedback.preventedLoss);
  return Number.isFinite(prevented) && prevented > 0
    ? `肉身炼体生效：已抵消 ${Math.round(prevented)} 点损耗`
    : undefined;
}

export function presentNativeDungeonOption(
  option: DungeonOption,
): NativeDungeonOptionPresentation {
  const costs = option.costPreview ?? option.costs ?? [];
  const riskLabel =
    option.risk_level === 'high'
      ? '凶险'
      : option.risk_level === 'medium'
        ? '莫测'
        : '稳健';
  const riskTone: NativeDungeonRiskTone =
    option.risk_level === 'high'
      ? 'bad'
      : option.risk_level === 'medium'
        ? 'info'
        : 'good';
  return {
    id: option.id,
    text: option.text,
    riskLabel,
    riskTone,
    costs: costs.map((cost) => ({
      icon: getResourceIcon(cost.type),
      name: formatNativeDungeonCostName(cost),
      value: formatNativeDungeonCostValue(cost),
      bodyFeedback: formatNativeDungeonBodyFeedback(cost),
    })),
  };
}
