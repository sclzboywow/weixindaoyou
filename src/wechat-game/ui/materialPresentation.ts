import {
  getMaterialTypeInfo,
  type MaterialTypeDisplayInfo,
} from '../../shared/lib/gameConceptDisplay';
import {
  MATERIAL_TYPE_VALUES,
  type MaterialType,
} from '../../shared/types/constants';

/**
 * 微信端材料展示兼容层。
 *
 * 官方通用 MaterialType 暂未包含灵田独立材料类型 `seed`。服务端若返回
 * 灵种，不能把内部枚举值直接暴露给玩家，也不能因为官方 fallback 的空
 * icon 导致列表首列塌掉。
 *
 * 这里仅处理“展示”，不把 seed 注入 MATERIAL_TYPE_VALUES，避免通用材料
 * 生成器、炼丹/炼器材料筛选、市场等系统误把灵种当普通材料。
 */
const NATIVE_MATERIAL_DISPLAY_EXTENSIONS: Readonly<
  Record<string, MaterialTypeDisplayInfo>
> = {
  seed: { label: '灵种', icon: '🌱' },
};

function normalizeMaterialType(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function resolveNativeMaterialTypeInfo(
  rawType: unknown,
): MaterialTypeDisplayInfo {
  const type = normalizeMaterialType(rawType);
  const extension = NATIVE_MATERIAL_DISPLAY_EXTENSIONS[type];
  if (extension) return extension;

  if (MATERIAL_TYPE_VALUES.includes(type as MaterialType)) {
    return getMaterialTypeInfo(type as MaterialType);
  }

  // 未知内部枚举绝不能直接展示给玩家；保留通用材料语义和稳定图标。
  return { label: '材料', icon: '📦' };
}

export function resolveNativeMaterialTypeLabel(rawType: unknown): string {
  return resolveNativeMaterialTypeInfo(rawType).label;
}
