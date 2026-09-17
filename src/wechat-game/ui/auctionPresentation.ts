import {
  AUCTION_MAX_PURCHASE_QUANTITY,
  AUCTION_MIN_QUALITY,
  getAuctionUnitPriceCap,
  isAuctionListableQuality,
} from '../../shared/config/auctionConfig';
import {
  CONSUMABLE_TYPE_DISPLAY_MAP,
  getEquipmentSlotInfo,
} from '../../shared/lib/gameConceptDisplay';
import {
  CONSUMABLE_TYPE_VALUES,
  EQUIPMENT_SLOT_VALUES,
  MATERIAL_TYPE_VALUES,
  QUALITY_ORDER,
  QUALITY_VALUES,
  type Quality,
} from '../../shared/types/constants';
import type { Consumable } from '../../shared/types/cultivator';
import { isPillConsumable } from '../../shared/lib/consumables';
import { resolveNativeMaterialTypeInfo } from './materialPresentation';

export type NativeAuctionItemType = 'material' | 'artifact' | 'consumable';
export type NativeAuctionTypeFilter = NativeAuctionItemType | 'all';
export type NativeAuctionSearchMode = 'itemName' | 'sellerName';
export type NativeAuctionSortBy = 'latest' | 'price_asc' | 'price_desc';

export const NATIVE_AUCTION_PAGE_SIZE = 10;
export const NATIVE_AUCTION_MAX_MY_LISTINGS = 5;
export const NATIVE_AUCTION_HIGH_VALUE_CONFIRM_THRESHOLD = 100_000;

export const NATIVE_AUCTION_ALLOWED_QUALITIES = QUALITY_VALUES.filter(
  (quality) => QUALITY_ORDER[quality] >= QUALITY_ORDER[AUCTION_MIN_QUALITY],
);

export const NATIVE_AUCTION_VIEW_TABS = [
  { value: 'all', label: '浏览拍卖' },
  { value: 'mine', label: '我的寄售' },
] as const;

export const NATIVE_AUCTION_TYPE_TABS = [
  { value: 'all', label: '全部' },
  { value: 'material', label: '材料' },
  { value: 'artifact', label: '法宝' },
  { value: 'consumable', label: '丹药' },
] as const;

export const NATIVE_AUCTION_SEARCH_MODE_LABELS: Record<
  NativeAuctionSearchMode,
  string
> = {
  itemName: '物品名',
  sellerName: '卖家名',
};

function qualityOf(value: unknown): Quality {
  return QUALITY_VALUES.includes(value as Quality) ? (value as Quality) : '凡品';
}

export function nativeAuctionItemQuality(
  itemType: NativeAuctionItemType,
  item: Record<string, unknown>,
): Quality {
  return itemType === 'material'
    ? qualityOf(item.rank)
    : qualityOf(item.quality);
}

export function nativeAuctionItemQuantity(
  itemType: NativeAuctionItemType,
  item: Record<string, unknown>,
): number {
  if (itemType === 'artifact') return 1;
  const quantity = Number(item.quantity);
  return Number.isFinite(quantity) ? Math.max(0, Math.floor(quantity)) : 0;
}

export function nativeAuctionUnsupportedReason(
  itemType: NativeAuctionItemType,
  item: Record<string, unknown>,
): string | null {
  if (
    itemType === 'consumable' &&
    !isPillConsumable(item as unknown as Consumable)
  ) {
    return '当前仅支持丹药寄售';
  }
  return null;
}

export function nativeAuctionListableReason(
  itemType: NativeAuctionItemType,
  item: Record<string, unknown>,
): string | null {
  const unsupported = nativeAuctionUnsupportedReason(itemType, item);
  if (unsupported) return unsupported;
  const quality = nativeAuctionItemQuality(itemType, item);
  if (!isAuctionListableQuality(quality)) {
    return `仅${AUCTION_MIN_QUALITY}及以上物品可寄售，当前为${quality}`;
  }
  return null;
}

export function nativeAuctionUnitPriceCap(
  itemType: NativeAuctionItemType,
  item: Record<string, unknown>,
): number {
  return getAuctionUnitPriceCap(nativeAuctionItemQuality(itemType, item));
}

export function nativeAuctionMaxListingQuantity(
  itemType: NativeAuctionItemType,
  item: Record<string, unknown>,
): number {
  return itemType === 'artifact'
    ? 1
    : Math.max(
        1,
        Math.min(
          nativeAuctionItemQuantity(itemType, item),
          AUCTION_MAX_PURCHASE_QUANTITY,
        ),
      );
}

export function nativeAuctionCategoryOptions(
  itemType: NativeAuctionTypeFilter,
): Array<{ value: string; label: string }> {
  if (itemType === 'material') {
    return MATERIAL_TYPE_VALUES.map((value) => ({
      value,
      label: resolveNativeMaterialTypeInfo(value).label,
    }));
  }
  if (itemType === 'artifact') {
    return EQUIPMENT_SLOT_VALUES.map((value) => ({
      value,
      label: getEquipmentSlotInfo(value).label,
    }));
  }
  if (itemType === 'consumable') {
    return CONSUMABLE_TYPE_VALUES.map((value) => ({
      value,
      label: CONSUMABLE_TYPE_DISPLAY_MAP[value].label,
    }));
  }
  return [];
}

export function nativeAuctionQualityLabel(value: string): string {
  return QUALITY_VALUES.includes(value as Quality) ? value : '全部品级';
}

export function nativeAuctionSortLabel(value: NativeAuctionSortBy): string {
  if (value === 'price_asc') return '价格从低到高';
  if (value === 'price_desc') return '价格从高到低';
  return '最新上架';
}

export function nativeAuctionRemainingText(expiresAt: unknown, now = Date.now()): string {
  const expires = new Date(String(expiresAt ?? '')).getTime();
  if (!Number.isFinite(expires)) return '—';
  const diff = expires - now;
  if (diff <= 0) return '已过期';
  const hours = Math.floor(diff / 3_600_000);
  const minutes = Math.floor((diff / 60_000) % 60);
  return `${hours}时${minutes}分`;
}

export interface NativeAuctionLayoutRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * 微信端拍卖检索区复用官网窄屏的两列网格：
 * 1. “全部”页签：品级/排序
 * 2. 搜索模式/精确值
 * 3. 搜索/清除在右下角单独成行
 *
 * 指定物品类型时会多出“子类”，官网的第一组网格自然换行：
 * 子类/品级、排序；搜索表单仍从下一行开始。
 */
export function nativeAuctionBrowseFilterLayout(
  left: number,
  top: number,
  width: number,
  itemType: NativeAuctionTypeFilter,
): {
  category?: NativeAuctionLayoutRect;
  quality: NativeAuctionLayoutRect;
  sort: NativeAuctionLayoutRect;
  searchMode: NativeAuctionLayoutRect;
  searchInput: NativeAuctionLayoutRect;
  searchButton: NativeAuctionLayoutRect;
  clearButton: NativeAuctionLayoutRect;
  bottom: number;
} {
  const inset = 10;
  const gap = 8;
  const contentLeft = left + inset;
  const contentWidth = width - inset * 2;
  const fieldWidth = (contentWidth - gap) / 2;
  const fieldHeight = 58;
  const rowStep = 68;
  const firstRowTop = top;
  const hasCategory = itemType !== 'all';
  const searchRowTop = top + rowStep * (hasCategory ? 2 : 1);
  const actionRowTop = searchRowTop + rowStep;
  const buttonWidth = 58;
  const buttonGap = 8;

  return {
    ...(itemType === 'all'
      ? {}
      : {
          category: {
            x: contentLeft,
            y: firstRowTop,
            width: fieldWidth,
            height: fieldHeight,
          },
        }),
    quality: {
      x: hasCategory ? contentLeft + fieldWidth + gap : contentLeft,
      y: firstRowTop,
      width: fieldWidth,
      height: fieldHeight,
    },
    sort: {
      x: hasCategory ? contentLeft : contentLeft + fieldWidth + gap,
      y: hasCategory ? firstRowTop + rowStep : firstRowTop,
      width: fieldWidth,
      height: fieldHeight,
    },
    searchMode: {
      x: contentLeft,
      y: searchRowTop,
      width: fieldWidth,
      height: fieldHeight,
    },
    searchInput: {
      x: contentLeft + fieldWidth + gap,
      y: searchRowTop + 18,
      width: fieldWidth,
      height: 40,
    },
    searchButton: {
      x: left + width - inset - buttonWidth * 2 - buttonGap,
      y: actionRowTop,
      width: buttonWidth,
      height: 34,
    },
    clearButton: {
      x: left + width - inset - buttonWidth,
      y: actionRowTop,
      width: buttonWidth,
      height: 34,
    },
    bottom: actionRowTop + 44,
  };
}

/**
 * 堆叠货单按官网窄屏压成一行：剩余时间 / 数量 / 买全部 / 购买。
 * “详情”不再占据这一行，物品正文区域本身作为详情点击热区。
 */
export function nativeAuctionStackPurchaseLayout(
  left: number,
  top: number,
  width: number,
): {
  time: NativeAuctionLayoutRect;
  quantity: NativeAuctionLayoutRect;
  buyAll: NativeAuctionLayoutRect;
  buy: NativeAuctionLayoutRect;
} {
  const quantityX = left + Math.round(width * 0.285);
  const buyAllX = left + Math.round(width * 0.555);
  const buyX = left + Math.round(width * 0.79);
  const right = left + width;
  return {
    time: { x: left + 4, y: top, width: Math.max(80, quantityX - left - 8), height: 32 },
    quantity: { x: quantityX, y: top, width: Math.max(82, buyAllX - quantityX - 4), height: 32 },
    buyAll: { x: buyAllX, y: top, width: Math.max(68, buyX - buyAllX - 4), height: 32 },
    buy: { x: buyX, y: top, width: Math.max(58, right - buyX - 2), height: 32 },
  };
}
