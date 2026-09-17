import { isPillConsumable } from '../../shared/lib/consumables';
import { calculatePillScore } from '../../shared/lib/pillScore';
import type { CultivatorCondition } from '../../shared/types/condition';
import type { RealmType } from '../../shared/types/constants';
import type { Consumable } from '../../shared/types/cultivator';
import { toPillDisplayModel } from '../../react-app/components/feature/consumables/pillDisplayModel';

export interface NativePillListPresentation {
  appearance?: {
    grade: 'low' | 'middle' | 'high' | 'perfect';
    label: string;
  };
  score?: number;
  keywordLabels: string[];
  summary: string;
}

/**
 * 微信储物袋丹药列表的唯一展示入口。
 *
 * 官网 ConsumableListCard 同样以 toPillDisplayModel 为事实来源：
 * - PillKeywordLine <- keywordLabels
 * - 列表说明 <- effectSummary
 * - 丹品 <- appearance
 * - 评分 <- calculatePillScore
 *
 * 将这四项在一次模型计算中一起取出，避免微信端分别计算后发生字段漂移。
 */
export function buildNativePillListPresentation(
  consumable: Consumable | undefined,
  options?: {
    realm?: RealmType;
    condition?: CultivatorCondition;
  },
): NativePillListPresentation | null {
  if (!isPillConsumable(consumable)) return null;

  const model = toPillDisplayModel(consumable, options);
  const score = calculatePillScore(consumable);

  return {
    appearance: model.appearance?.grade
      ? {
          grade: model.appearance.grade,
          label: model.appearance.label,
        }
      : undefined,
    score: score === null ? undefined : score,
    keywordLabels: [...model.keywordLabels],
    summary: model.effectSummary,
  };
}
