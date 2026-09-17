import { getWx } from '../platform/wechat';

type MeritTier =
  | 'faint_light'
  | 'fellow_traveler'
  | 'night_guardian'
  | 'immortality_witness';

const files: Record<MeritTier, string> = {
  faint_light: 'yidengweiguang.png',
  fellow_traveler: 'shanshuitongcheng.png',
  night_guardian: 'changyehudao.png',
  immortality_witness: 'gongzhengchangsheng.png',
};
const images: Partial<Record<MeritTier, CanvasImageSource>> = {};
const loading = new Set<MeritTier>();
const wx = getWx();

const asRecord = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;

const fetchPublic = async (api: {
  get(path: string): Promise<unknown>;
}): Promise<unknown> => {
  const pageSize = 50;
  const first = asRecord(
    await api.get(`/api/sponsorship/public?page=1&pageSize=${pageSize}`),
  );
  const data = asRecord(first?.data) ?? first;
  const items = Array.isArray(data?.items) ? data.items : [];
  const total = Math.max(0, Number(data?.total) || items.length);
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages === 1) return first;
  const remaining = await Promise.all(
    Array.from({ length: pages - 1 }, (_, index) =>
      api.get(`/api/sponsorship/public?page=${index + 2}&pageSize=${pageSize}`),
    ),
  );
  return {
    ...data,
    items: items.concat(
      ...remaining.map((page) => {
        const value = asRecord(asRecord(page)?.data) ?? asRecord(page);
        return Array.isArray(value?.items) ? value.items : [];
      }),
    ),
    total,
    page: 1,
    pageSize,
  };
};

const redraw = () => {
  const app = (
    globalThis as typeof globalThis & {
      __daoyouQaApp?: { render(): void };
    }
  ).__daoyouQaApp;
  app?.render();
};

const draw = (
  ctx: CanvasRenderingContext2D,
  tier: MeritTier,
  x: number,
  y: number,
  size: number,
) => {
  const loaded = images[tier];
  if (loaded) {
    ctx.drawImage(loaded, x, y, size, size);
    return;
  }
  if (loading.has(tier)) return;
  const image = wx.createImage?.();
  if (!image) return;
  loading.add(tier);
  image.onload = () => {
    loading.delete(tier);
    images[tier] = image as unknown as CanvasImageSource;
    redraw();
  };
  image.onerror = () => loading.delete(tier);
  image.src = `merit-assets/assets/sponsors/${files[tier]}`;
};

(
  globalThis as typeof globalThis & {
    __daoyouMeritStamps?: { draw: typeof draw; fetchPublic: typeof fetchPublic };
  }
).__daoyouMeritStamps = { draw, fetchPublic };
