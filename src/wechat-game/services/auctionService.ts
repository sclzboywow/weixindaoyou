import type { NativeDaoyouApi } from '../core/nativeClient';
import { parseInventoryPagination } from '../ui/inventoryPagination';
import { AUCTION_MIN_QUALITY } from '../../shared/config/auctionConfig';
import { QUALITY_ORDER, QUALITY_VALUES } from '../../shared/types/constants';

export type AuctionListItemType = 'material' | 'artifact' | 'consumable';

const AUCTION_ALLOWED_QUALITIES = QUALITY_VALUES.filter(
  (quality) => QUALITY_ORDER[quality] >= QUALITY_ORDER[AUCTION_MIN_QUALITY],
);

function toInventoryPlural(type: AuctionListItemType): 'materials' | 'artifacts' | 'consumables' {
  if (type === 'material') return 'materials';
  if (type === 'artifact') return 'artifacts';
  return 'consumables';
}

export type AuctionListingInventoryFilters = {
  materialRank?: string;
  materialType?: string;
  materialElement?: string;
  materialSortBy?: string;
  materialSortOrder?: 'asc' | 'desc';
};

export type AuctionListingInventoryResult = {
  inventory: unknown;
  friends: unknown;
  page: number;
};

export async function fetchAuctionListingInventory(
  api: NativeDaoyouApi,
  type: AuctionListItemType,
  page: number,
  filters: AuctionListingInventoryFilters = {},
): Promise<AuctionListingInventoryResult> {
  const inventoryType = toInventoryPlural(type);
  const [inventory, friends] = await Promise.all([
    api.inventory(inventoryType, {
      page: Math.max(1, page),
      pageSize: 20,
      ...(type === 'material'
        ? {
            materialRanks: filters.materialRank
              ? [filters.materialRank]
              : [...AUCTION_ALLOWED_QUALITIES],
            materialTypes: filters.materialType ? [filters.materialType] : undefined,
            materialElements: filters.materialElement
              ? [filters.materialElement]
              : undefined,
            materialSortBy: filters.materialSortBy ?? 'createdAt',
            materialSortOrder: filters.materialSortOrder ?? 'desc',
          }
        : {}),
      ...(type === 'consumable' ? { consumableKind: 'pill' as const } : {}),
    }),
    api.friends().catch(() => ({ friends: [] })),
  ]);
  return {
    inventory,
    friends,
    page: parseInventoryPagination(inventory).page,
  };
}
