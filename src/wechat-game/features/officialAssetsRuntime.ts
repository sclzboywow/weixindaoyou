import { getWx } from '../platform/wechat';
import { installWechatOfficialAssetsBridge } from './officialAssetsBridge';

const wx = getWx();
const loaded = new Map<string, CanvasImageSource>();
const pending = new Map<string, Promise<CanvasImageSource>>();
// Keep every path literal and live in this subpackage entry. WeChat's preview
// dependency analyzer otherwise removes assets referenced only by dynamic paths.
const bundledAssetPaths = [
  'assets/world-map.webp',
  'assets/game-controls/virtual-joystick-base.webp',
  'assets/game-controls/virtual-joystick-thumb.webp',
  'assets/sect/jiujie-map.webp',
  'assets/sect/lingxiao-map.webp',
  'assets/sect/tianyan-map.webp',
  'assets/sect/wuxiang-map.webp',
  'assets/sect/youdu-map.webp',
  'assets/sect/mining/copper-ore.webp',
  'assets/sect/mining/dark-iron.webp',
  'assets/sect/mining/earth-essence.webp',
  'assets/sect/mining/explosive-barrel.webp',
  'assets/sect/mining/rope-cultivator.webp',
  'assets/sect/mining/spirit-crystal.webp',
  'assets/sect/mining/spirit-hook.webp',
  'assets/sect/mining/spirit-vein-cavern.webp',
  'assets/sect/onboarding/jiujie.webp',
  'assets/sect/onboarding/lingxiao.webp',
  'assets/sect/onboarding/tianyan.webp',
  'assets/sect/onboarding/wuxiang.webp',
  'assets/sect/onboarding/youdu.webp',
  'assets/sect/sweep/cloud-stair-courtyard.webp',
  'assets/sect/sweep/sweep-atlas.webp',
  'assets/sect/sweep/sweep-obstacles.webp',
] as const;
const bundledAssetPathSet = new Set<string>(bundledAssetPaths);

const resolveBundledImagePath = (path: string): string => {
  switch (path) {
    case 'assets/world-map.webp': return 'assets/world-map.png';
    case 'assets/game-controls/virtual-joystick-base.webp': return 'assets/game-controls/virtual-joystick-base.png';
    case 'assets/game-controls/virtual-joystick-thumb.webp': return 'assets/game-controls/virtual-joystick-thumb.png';
    case 'assets/sect/jiujie-map.webp': return 'assets/sect/jiujie-map.png';
    case 'assets/sect/lingxiao-map.webp': return 'assets/sect/lingxiao-map.png';
    case 'assets/sect/tianyan-map.webp': return 'assets/sect/tianyan-map.png';
    case 'assets/sect/wuxiang-map.webp': return 'assets/sect/wuxiang-map.png';
    case 'assets/sect/youdu-map.webp': return 'assets/sect/youdu-map.png';
    case 'assets/sect/mining/copper-ore.webp': return 'assets/sect/mining/copper-ore.png';
    case 'assets/sect/mining/dark-iron.webp': return 'assets/sect/mining/dark-iron.png';
    case 'assets/sect/mining/earth-essence.webp': return 'assets/sect/mining/earth-essence.png';
    case 'assets/sect/mining/explosive-barrel.webp': return 'assets/sect/mining/explosive-barrel.png';
    case 'assets/sect/mining/rope-cultivator.webp': return 'assets/sect/mining/rope-cultivator.png';
    case 'assets/sect/mining/spirit-crystal.webp': return 'assets/sect/mining/spirit-crystal.png';
    case 'assets/sect/mining/spirit-hook.webp': return 'assets/sect/mining/spirit-hook.png';
    case 'assets/sect/mining/spirit-vein-cavern.webp': return 'assets/sect/mining/spirit-vein-cavern.jpg';
    case 'assets/sect/onboarding/jiujie.webp': return 'assets/sect/onboarding/jiujie.jpg';
    case 'assets/sect/onboarding/lingxiao.webp': return 'assets/sect/onboarding/lingxiao.jpg';
    case 'assets/sect/onboarding/tianyan.webp': return 'assets/sect/onboarding/tianyan.jpg';
    case 'assets/sect/onboarding/wuxiang.webp': return 'assets/sect/onboarding/wuxiang.jpg';
    case 'assets/sect/onboarding/youdu.webp': return 'assets/sect/onboarding/youdu.jpg';
    case 'assets/sect/sweep/cloud-stair-courtyard.webp': return 'assets/sect/sweep/cloud-stair-courtyard.jpg';
    case 'assets/sect/sweep/sweep-atlas.webp': return 'assets/sect/sweep/sweep-atlas.png';
    case 'assets/sect/sweep/sweep-obstacles.webp': return 'assets/sect/sweep/sweep-obstacles.png';
    default: throw new Error(`官方资源未列入真机分包清单：${path}`);
  }
};

const normalizeAssetPath = (relativePath: string): string => {
  const normalized = relativePath.replace(/^\/+/, '');
  if (!normalized.startsWith('assets/')) {
    throw new Error(`非法官方资源路径：${relativePath}`);
  }
  if (!bundledAssetPathSet.has(normalized)) {
    throw new Error(`官方资源未列入真机分包清单：${relativePath}`);
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
      reject(new Error('当前环境无法创建官方资源图像'));
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
      reject(new Error(`${image.src || path}: ${error?.errMsg || '图片解码失败'}`));
    };
    image.src = `official-assets/${resolveBundledImagePath(path)}`;
  });
  pending.set(path, task);
  return task;
};

installWechatOfficialAssetsBridge({ loadImage });
