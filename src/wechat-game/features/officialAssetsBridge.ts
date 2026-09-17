export interface WechatOfficialAssetsBridge {
  loadImage(relativePath: string): Promise<CanvasImageSource>;
}

type OfficialAssetsGlobal = typeof globalThis & {
  __daoyouOfficialAssets?: WechatOfficialAssetsBridge;
};

export function installWechatOfficialAssetsBridge(
  bridge: WechatOfficialAssetsBridge,
): void {
  (globalThis as OfficialAssetsGlobal).__daoyouOfficialAssets = bridge;
}

export function getWechatOfficialAssetsBridge(): WechatOfficialAssetsBridge | null {
  return (
    (globalThis as OfficialAssetsGlobal).__daoyouOfficialAssets ?? null
  );
}
