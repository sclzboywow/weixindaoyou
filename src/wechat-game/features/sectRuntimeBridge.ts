import type {
  CultivatorDisplayAttributes,
  CultivatorDisplayInput,
  CultivatorDisplaySnapshot,
} from '../../shared/engine/battle-v5/adapters/CultivatorDisplayAdapter';
import type { NativeSectPresentation } from '../ui/sectNativeContent';

export interface WechatSectRuntimeBridge {
  presentations: Readonly<Record<string, NativeSectPresentation>>;
  getCultivatorDisplayAttributes(
    cultivator: CultivatorDisplayInput,
  ): CultivatorDisplayAttributes;
  getCultivatorDisplaySnapshot(
    cultivator: CultivatorDisplayInput,
  ): CultivatorDisplaySnapshot;
  resolveFacilityEffect(
    sectId: string,
    rank: string,
    facilities: Array<{ key: string; level: number }>,
    effectKey: string,
  ): unknown;
}

type SectRuntimeGlobal = typeof globalThis & {
  __daoyouSectRuntime?: WechatSectRuntimeBridge;
};

export function installWechatSectRuntimeBridge(
  bridge: WechatSectRuntimeBridge,
): void {
  (globalThis as SectRuntimeGlobal).__daoyouSectRuntime = bridge;
}

export function getWechatSectRuntimeBridge(): WechatSectRuntimeBridge | null {
  return (globalThis as SectRuntimeGlobal).__daoyouSectRuntime ?? null;
}
