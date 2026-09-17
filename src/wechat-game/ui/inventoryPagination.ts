function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function numberValue(record: Record<string, unknown> | null, ...keys: string[]): number {
  if (!record) return 0;
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

export type InventoryPagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
};

export function parseInventoryPagination(source: unknown): InventoryPagination {
  const root = asRecord(source);
  const data = asRecord(root?.data) ?? root;
  const pagination = asRecord(data?.pagination) ?? asRecord(root?.pagination) ?? data;
  const page = Math.max(1, numberValue(pagination, 'page') || 1);
  const pageSize = Math.max(1, numberValue(pagination, 'pageSize') || 20);
  const total = Math.max(0, numberValue(pagination, 'total'));
  const totalPages = Math.max(
    1,
    numberValue(pagination, 'totalPages') || Math.ceil(total / pageSize) || 1,
  );
  const hasMore = Boolean(pagination?.hasMore) || page < totalPages;
  return { page, pageSize, total, totalPages, hasMore };
}
