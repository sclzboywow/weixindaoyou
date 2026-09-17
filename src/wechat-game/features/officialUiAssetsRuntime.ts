import { getWx } from '../platform/wechat';
import { installWechatOfficialUiAssetsBridge } from './officialUiAssetsBridge';

const wx = getWx();
const loaded = new Map<string, CanvasImageSource>();
const pending = new Map<string, Promise<CanvasImageSource>>();
// Keep every icon path literal and live in this subpackage entry. WeChat's
// real-device dependency analyzer can otherwise omit dynamically addressed
// files even though desktop DevTools can still resolve them.
const bundledEmojiAssetPaths = [
  'assets/emoji/1f4b0.png',
  'assets/emoji/1f4e6.png',
  'assets/emoji/1f315.png',
  'assets/emoji/1f4dc.png',
  'assets/emoji/1f381.png',
  'assets/emoji/1f525.png',
  'assets/emoji/1f9d8.png',
  'assets/emoji/1f5e1.png',
  'assets/emoji/26a1.png',
  'assets/emoji/1f4d6.png',
  'assets/emoji/1f331.png',
  'assets/emoji/2611.png',
  'assets/emoji/2694.png',
  'assets/emoji/1f3f5.png',
  'assets/emoji/262f.png',
  'assets/emoji/1f4a7.png',
  'assets/emoji/1fae7.png',
  'assets/emoji/1f464.png',
  'assets/emoji/26f0.png',
  'assets/emoji/1f4d8.png',
  'assets/emoji/1f33f.png',
  'assets/emoji/1f441.png',
  'assets/emoji/1f4a1.png',
  'assets/emoji/1f48a.png',
  'assets/emoji/1f343.png',
  'assets/emoji/1f31e.png',
  'assets/emoji/1f5fa.png',
  'assets/emoji/1f4da.png',
  'assets/emoji/1f44a.png',
  'assets/emoji/1f6d6.png',
  'assets/emoji/1fa9e.png',
  'assets/emoji/1f528.png',
  'assets/emoji/1f3ee.png',
  'assets/emoji/23f3.png',
  'assets/emoji/1fab6.png',
  'assets/emoji/2620.png',
  'assets/emoji/1f4ab.png',
  'assets/emoji/1f4e2.png',
  'assets/emoji/1faa8.png',
  'assets/emoji/1f311.png',
  'assets/emoji/2728.png',
  'assets/emoji/1f3d4.png',
  'assets/emoji/26a0.png',
  'assets/emoji/1f3c3.png',
  'assets/emoji/1f941.png',
  'assets/emoji/1f52e.png',
  'assets/emoji/1f4ac.png',
  'assets/emoji/2696.png',
  'assets/emoji/1f3c6.png',
  'assets/emoji/1f514.png',
  'assets/emoji/1f305.png',
  'assets/emoji/2601.png',
  'assets/emoji/1f5c2.png',
  'assets/emoji/1f465.png',
  'assets/emoji/1f4dd.png',
  'assets/emoji/2699.png',
  'assets/emoji/2764.png',
  'assets/emoji/1fa78.png',
  'assets/emoji/1f56f.png',
  'assets/emoji/1f630.png',
  'assets/emoji/1f4a5.png',
  'assets/emoji/1f4aa.png',
  'assets/emoji/1f9b4.png',
  'assets/emoji/1f9b6.png',
  'assets/emoji/1f409.png',
  'assets/emoji/1f48e.png',
  'assets/emoji/1f32a.png',
  'assets/emoji/2744.png',
  'assets/emoji/1f6e1.png',
  'assets/emoji/1f48d.png',
  'assets/emoji/1f4a8.png',
  'assets/emoji/1f3af.png',
  'assets/emoji/1f49a.png',
  'assets/emoji/1f300.png',
  'assets/emoji/1f608.png',
  'assets/emoji/1f31f.png',
  'assets/emoji/1f910.png',
  'assets/emoji/1f512.png',
  'assets/emoji/1f494.png',
  'assets/emoji/1fa79.png',
  'assets/emoji/1faa2.png',
  'assets/emoji/1fab7.png',
  'assets/emoji/1f321.png',
  'assets/emoji/26d3.png',
  'assets/emoji/2754.png',
  'assets/emoji/1f351.png',
] as const;
const bundledEmojiAssetPathSet = new Set<string>(bundledEmojiAssetPaths);

const normalizeAssetPath = (relativePath: string): string => {
  const normalized = relativePath.replace(/^\/+/, '');
  if (!normalized.startsWith('assets/')) {
    throw new Error(`非法官方界面资源路径：${relativePath}`);
  }
  if (
    normalized.startsWith('assets/emoji/') &&
    !bundledEmojiAssetPathSet.has(normalized)
  ) {
    throw new Error(`官方图标未列入真机分包清单：${relativePath}`);
  }
  return normalized;
};

const loadImage = (relativePath: string): Promise<CanvasImageSource> => {
  const path = normalizeAssetPath(relativePath);
  const cached = loaded.get(path);
  if (cached) return Promise.resolve(cached);
  const inflight = pending.get(path);
  if (inflight) return inflight;
  const task = new Promise<CanvasImageSource>((resolve, reject) => {
    const image = wx.createImage?.();
    if (!image) {
      reject(new Error('当前环境无法创建官方图标'));
      return;
    }
    image.onload = () => {
      pending.delete(path);
      const source = image as unknown as CanvasImageSource;
      loaded.set(path, source);
      resolve(source);
    };
    image.onerror = (error) => {
      pending.delete(path);
      reject(
        new Error(`${image.src || path}: ${error?.errMsg || '图标解码失败'}`),
      );
    };
    image.src = `official-ui/${path}`;
  });
  pending.set(path, task);
  return task;
};

const loadFont = (relativePath: string): string | null => {
  const path = normalizeAssetPath(relativePath);
  return wx.loadFont?.(`official-ui/${path}`) ?? null;
};

installWechatOfficialUiAssetsBridge({ loadImage, loadFont });
