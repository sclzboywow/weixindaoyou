import type { NativeDaoyouApi } from '../core/nativeClient';
import { parseInventoryPagination, type InventoryPagination } from '../ui/inventoryPagination';

export type InventoryPlural = 'materials' | 'artifacts' | 'consumables';

export type InventoryPageResult = {
  inventory: unknown;
  pagination: InventoryPagination;
};

export async function fetchInventoryPage(
  api: NativeDaoyouApi,
  type: InventoryPlural,
  page: number,
  pageSize = 20,
): Promise<InventoryPageResult> {
  const inventory = await api.inventory(type, {
    page: Math.max(1, page),
    pageSize,
  });
  return { inventory, pagination: parseInventoryPagination(inventory) };
}
