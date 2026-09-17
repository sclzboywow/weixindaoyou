import {
  getCultivatorDisplayAttributes,
  getCultivatorDisplaySnapshot,
} from '../../shared/engine/battle-v5/adapters/CultivatorDisplayAdapter';
import { productionSectRuntime } from '../../shared/engine/sect/content';
import type { SectDiscipleRank } from '../../shared/engine/sect/core/domain/organization';
import { resolveSectBenefitSnapshot } from '../../shared/engine/sect/core/organization/sectBenefits';
import generatedSectPresentations from '../generated/sectPresentations.json';
import type { NativeSectPresentation } from '../ui/sectNativeContent';
import { installWechatSectRuntimeBridge } from './sectRuntimeBridge';

installWechatSectRuntimeBridge({
  presentations: generatedSectPresentations as unknown as Record<
    string,
    NativeSectPresentation
  >,
  getCultivatorDisplayAttributes,
  getCultivatorDisplaySnapshot,
  resolveFacilityEffect(sectId, rank, facilities, effectKey) {
    const module = productionSectRuntime.registry.require(sectId);
    const levels = new Map(
      facilities.map((facility) => [facility.key, facility.level]),
    );
    return resolveSectBenefitSnapshot(
      module.organization,
      rank as SectDiscipleRank,
      levels,
    ).facilityEffects[effectKey];
  },
});
