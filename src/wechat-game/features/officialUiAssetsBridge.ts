export interface WechatOfficialUiAssetsBridge {
  loadImage(relativePath: string): Promise<CanvasImageSource>;
  loadFont(relativePath: string): string | null;
}

type OfficialUiAssetsGlobal = typeof globalThis & {
  __daoyouOfficialUiAssets?: WechatOfficialUiAssetsBridge;
};

export function installWechatOfficialUiAssetsBridge(
  bridge: WechatOfficialUiAssetsBridge,
): void {
  (globalThis as OfficialUiAssetsGlobal).__daoyouOfficialUiAssets = bridge;
}

export function getWechatOfficialUiAssetsBridge(): WechatOfficialUiAssetsBridge | null {
  return (
    (globalThis as OfficialUiAssetsGlobal).__daoyouOfficialUiAssets ?? null
  );
}
