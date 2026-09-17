import { toPillDisplayModel } from '../../react-app/components/feature/consumables/pillDisplayModel';
import { buildTalismanDetailText } from '../../react-app/components/feature/consumables/talismanDisplay';
import {
  formatTargetPolicyValue,
  toProductDisplayModel,
  type ProductRecordLike,
} from '../../react-app/components/feature/products/abilityDisplay';
import {
  isPillConsumable,
  isTalismanConsumable,
} from '../../shared/lib/consumables';
import {
  CONSUMABLE_TYPE_DISPLAY_MAP,
  getEquipmentSlotInfo,
  getGameConceptInfo,
} from '../../shared/lib/gameConceptDisplay';
import { calculatePillScore } from '../../shared/lib/pillScore';
import type { CultivatorCondition } from '../../shared/types/condition';
import type { RealmType } from '../../shared/types/constants';
import type {
  Artifact,
  Consumable,
  Material,
} from '../../shared/types/cultivator';
import { resolveNativeMaterialTypeInfo } from './materialPresentation';

export type NativeItemShowcaseKind =
  'artifact' | 'material' | 'consumable' | 'skill' | 'gongfa';

export interface NativeItemBadge {
  label: string;
  quality?: string;
  tone?: 'default' | 'warning';
}

export interface NativeItemInfoRow {
  label: string;
  value: string;
}

export interface NativeItemDetailSection {
  key: string;
  title: string;
  lines: string[];
  tones?: string[];
  tone?: 'normal' | 'attention';
}

export interface NativeItemShowcaseModel {
  kind: NativeItemShowcaseKind;
  icon: string;
  name: string;
  quality?: string;
  nameMark?: string;
  score?: number;
  badges: NativeItemBadge[];
  rows: NativeItemInfoRow[];
  sections: NativeItemDetailSection[];
  description?: string;
  descriptionTitle: string;
  equipped?: boolean;
}

export interface NativeItemShowcaseContext {
  quantity?: number;
  viewerRealm?: RealmType;
  viewerCondition?: CultivatorCondition;
  equipped?: boolean;
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function toSectionsFromLines(
  prefix: string,
  source: string,
): NativeItemDetailSection[] {
  const lines = source
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.map((line, index) => {
    const separatorIndex = line.indexOf('：');
    const hasLabel = separatorIndex > 0;
    return {
      key: `${prefix}-${index}`,
      title: hasLabel ? line.slice(0, separatorIndex) : '符箓记述',
      lines: [hasLabel ? line.slice(separatorIndex + 1) : line],
    };
  });
}

function artifactShowcase(
  artifact: Artifact,
  context: NativeItemShowcaseContext,
): NativeItemShowcaseModel {
  const product = toProductDisplayModel({
    ...(artifact as unknown as ProductRecordLike),
    productType: 'artifact',
  });
  const slotInfo = getEquipmentSlotInfo(artifact.slot ?? 'weapon');
  const rows: NativeItemInfoRow[] = [];
  const rawModel = asRecord(product.rawModel);
  const metadata = asRecord(rawModel?.metadata);
  const anchorRealm = text(metadata?.anchorRealm);
  const creatorName = text(metadata?.creatorName);
  if (anchorRealm) {
    rows.push({
      label: '境界要求（境界若低，效果将减弱）',
      value: anchorRealm,
    });
  }
  if (creatorName) rows.push({ label: '打造者', value: creatorName });

  const projection = product.projection;
  if (
    projection?.projectionKind === 'active_skill' &&
    projection.targetPolicy
  ) {
    rows.push({
      label: '目标策略',
      value: formatTargetPolicyValue(projection.targetPolicy),
    });
  }
  if (
    projection?.projectionKind === 'active_skill' &&
    projection.mpCost !== undefined
  ) {
    rows.push({ label: '真元消耗', value: String(projection.mpCost) });
  }
  if (
    projection?.projectionKind === 'active_skill' &&
    projection.cooldown !== undefined
  ) {
    rows.push({ label: '冷却回合', value: String(projection.cooldown) });
  }

  if (context.equipped) rows.unshift({ label: '当前状态', value: '已装备' });

  const sections: NativeItemDetailSection[] = [];
  if (product.affixes.length) {
    sections.push({
      key: 'affixes',
      title: '词缀',
      lines: product.affixes.map(
        (affix) =>
          `${affix.isPerfect ? '【极】' : ''}${affix.name}：${affix.bodyText}`,
      ),
      tones: product.affixes.map((affix) => affix.rarityTone),
    });
  }

  return {
    kind: 'artifact',
    icon: slotInfo.icon,
    name: product.name,
    quality: product.quality,
    score: product.score > 0 ? product.score : undefined,
    badges: [
      { label: getGameConceptInfo('artifact').label, quality: product.quality },
      ...(product.element
        ? [{ label: product.element, tone: 'default' as const }]
        : []),
      { label: slotInfo.label, tone: 'default' },
    ],
    rows,
    sections,
    description: product.description,
    descriptionTitle: '法宝说明',
    equipped: context.equipped,
  };
}

function creationProductShowcase(
  kind: 'skill' | 'gongfa',
  item: Record<string, unknown>,
): NativeItemShowcaseModel {
  const product = toProductDisplayModel({
    ...(item as ProductRecordLike),
    productModel: item.productModel ?? item.product_model,
    productType: kind,
  });
  const rows: NativeItemInfoRow[] = [];
  if (
    product.projection?.projectionKind === 'active_skill' &&
    product.projection.targetPolicy
  ) {
    rows.push({
      label: '目标策略',
      value: formatTargetPolicyValue(product.projection.targetPolicy),
    });
  }
  if (
    product.projection?.projectionKind === 'active_skill' &&
    product.projection.mpCost !== undefined
  ) {
    rows.push({ label: '真元消耗', value: String(product.projection.mpCost) });
  }
  if (
    product.projection?.projectionKind === 'active_skill' &&
    product.projection.cooldown !== undefined
  ) {
    rows.push({
      label: '冷却回合',
      value: String(product.projection.cooldown),
    });
  }

  return {
    kind,
    icon: getGameConceptInfo(kind).icon,
    name: product.name,
    quality: product.quality,
    score: product.score > 0 ? product.score : undefined,
    badges: [
      {
        label: getGameConceptInfo(kind).label,
        quality: product.quality,
      },
      ...(product.element
        ? [{ label: product.element, tone: 'default' as const }]
        : []),
    ],
    rows,
    sections: product.affixes.length
      ? [
          {
            key: 'affixes',
            title: '词缀',
            lines: product.affixes.map(
              (affix) =>
                `${affix.isPerfect ? '【极】' : ''}${affix.name}：${affix.bodyText}`,
            ),
            tones: product.affixes.map((affix) => affix.rarityTone),
          },
        ]
      : [],
    description: product.description,
    descriptionTitle: kind === 'skill' ? '神通详述' : '功法详述',
  };
}

function materialShowcase(
  material: Material,
  context: NativeItemShowcaseContext,
): NativeItemShowcaseModel {
  const typeInfo = resolveNativeMaterialTypeInfo(material.type);
  const details = asRecord(material.details);
  const mystery = Boolean(
    details && Object.prototype.hasOwnProperty.call(details, 'mystery'),
  );
  const quantity = context.quantity ?? material.quantity ?? 0;
  const sections: NativeItemDetailSection[] = mystery
    ? [
        {
          key: 'mystery',
          title: '鉴定状态',
          lines: ['此物气机隐晦，尚待鉴定。'],
          tone: 'attention',
        },
      ]
    : [];

  return {
    kind: 'material',
    icon: typeInfo.icon,
    name: material.name,
    quality: material.rank,
    badges: [
      { label: typeInfo.label, quality: material.rank },
      ...(material.element
        ? [{ label: material.element, tone: 'default' as const }]
        : []),
      ...(mystery ? [{ label: '待鉴定', tone: 'warning' as const }] : []),
    ],
    rows: [{ label: '持有数量', value: String(quantity) }],
    sections,
    description: material.description,
    descriptionTitle: '物品说明',
  };
}

function consumableShowcase(
  consumable: Consumable,
  context: NativeItemShowcaseContext,
): NativeItemShowcaseModel {
  const typeInfo = CONSUMABLE_TYPE_DISPLAY_MAP[consumable.type] ?? {
    icon: '◇',
    label: consumable.type || '消耗品',
  };
  const quantity = context.quantity ?? consumable.quantity ?? 0;
  const badge: NativeItemBadge = consumable.quality
    ? { label: typeInfo.label, quality: consumable.quality }
    : { label: typeInfo.label, tone: 'default' };

  if (isPillConsumable(consumable)) {
    const model = toPillDisplayModel(consumable, {
      realm: context.viewerRealm,
      condition: context.viewerCondition,
    });
    const score = calculatePillScore(consumable);
    return {
      kind: 'consumable',
      icon: typeInfo.icon,
      name: consumable.name,
      quality: consumable.quality,
      nameMark: model.appearance?.label,
      score: score ?? undefined,
      badges: [badge],
      rows: [{ label: '持有数量', value: String(quantity) }],
      sections: model.detailGroups
        .filter((group) => group.lines.length > 0)
        .map((group) => ({
          key: group.key,
          title: group.title,
          lines: [...group.lines],
        })),
      description: model.flavorText,
      descriptionTitle: '丹成评述',
    };
  }

  if (isTalismanConsumable(consumable)) {
    const detailText = buildTalismanDetailText(consumable);
    return {
      kind: 'consumable',
      icon: typeInfo.icon,
      name: consumable.name,
      quality: consumable.quality,
      score:
        typeof consumable.score === 'number' ? consumable.score : undefined,
      badges: [badge],
      rows: [{ label: '持有数量', value: String(quantity) }],
      sections: toSectionsFromLines('talisman', detailText),
      descriptionTitle: '物品说明',
    };
  }

  return {
    kind: 'consumable',
    icon: typeInfo.icon,
    name: consumable.name,
    quality: consumable.quality,
    score: typeof consumable.score === 'number' ? consumable.score : undefined,
    badges: [badge],
    rows: [{ label: '持有数量', value: String(quantity) }],
    sections: [],
    description: consumable.description,
    descriptionTitle: '物品说明',
  };
}

export function buildNativeItemShowcase(
  kind: NativeItemShowcaseKind,
  item: Record<string, unknown>,
  context: NativeItemShowcaseContext = {},
): NativeItemShowcaseModel {
  try {
    if (kind === 'skill' || kind === 'gongfa') {
      return creationProductShowcase(kind, item);
    }
    if (kind === 'artifact') {
      return artifactShowcase(item as unknown as Artifact, context);
    }
    if (kind === 'material') {
      return materialShowcase(item as unknown as Material, context);
    }
    return consumableShowcase(item as unknown as Consumable, context);
  } catch {
    const name = text(item.name) ?? '未知物品';
    const quality = text(item.quality) ?? text(item.rank);
    const quantity = (context.quantity ?? Number(item.quantity ?? 0)) || 0;
    const description = text(item.description);
    return {
      kind,
      icon:
        kind === 'skill' || kind === 'gongfa'
          ? getGameConceptInfo(kind).icon
          : kind === 'artifact'
            ? '◇'
            : kind === 'material'
              ? '◆'
              : '○',
      name,
      quality,
      badges: quality
        ? [
            {
              label:
                kind === 'skill'
                  ? '神通'
                  : kind === 'gongfa'
                    ? '功法'
                    : kind === 'artifact'
                      ? '法宝'
                      : kind === 'material'
                        ? '材料'
                        : '消耗品',
              quality,
            },
          ]
        : [],
      rows:
        quantity > 0 ? [{ label: '持有数量', value: String(quantity) }] : [],
      sections: [],
      description,
      descriptionTitle:
        kind === 'skill'
          ? '神通详述'
          : kind === 'gongfa'
            ? '功法详述'
            : kind === 'artifact'
              ? '法宝说明'
              : '物品说明',
      equipped: context.equipped,
    };
  }
}
