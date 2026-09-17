import type { SectMapHotspot } from '../../shared/engine/sect/core/presentation/sectPresentation';
import type { NarrativePerformanceScript } from '../../shared/types/narrative';
import type { NativeSectRoom } from './sectNativeNpc';

export interface NativeSectHotspot {
  id: string;
  label: string;
  note: string;
  route?: string;
  permission?: string;
  facility?: string;
  locked?: boolean;
  visitor?: { description: string };
  position: [number, number];
}

export interface NativeSectPresentation {
  name: string;
  mapTitle: string;
  mapDescription: string;
  announcement: string;
  aspectRatio: number;
  onboarding?: {
    summary: string;
    traits: readonly [string, string, string];
    script: NarrativePerformanceScript;
  };
  facilityLabels: Record<string, string>;
  hotspots: NativeSectHotspot[];
  rooms: Record<string, NativeSectRoom>;
  scenes: Record<string, { title: string; description: string }>;
  methods: Array<{
    id: string;
    name: string;
    description: string;
    primary?: boolean;
  }>;
  paths: Array<{
    id: string;
    name: string;
    description: string;
    tactics: Array<{ id: string; name: string; description: string }>;
    nodes: Array<{
      id: string;
      layerId: string;
      name: string;
      description: string;
    }>;
  }>;
  abilities: Array<{
    id: string;
    name: string;
    description: string;
    methodId: string;
    methodName: string;
    unlockRequirement: string;
    level: number;
  }>;
}

const HOTSPOT_SCENE_KEYS: Record<string, string> = {
  hall: 'hall',
  affairs: 'affairs',
  archive: 'archive',
  cliff: 'paths',
  arena: 'arena',
  treasury: 'treasury',
  industries: 'industries',
  cultivation: 'cultivation',
  alchemy: 'alchemy',
  refinery: 'refinery',
  vein: 'spiritVein',
  garden: 'herbGarden',
  gate: 'gate',
  cave: 'cave',
};

export function toNativeSectMapHotspot(
  spot: NativeSectHotspot,
): SectMapHotspot {
  return {
    id: spot.id,
    label: spot.label,
    route: spot.route,
    facility: spot.facility,
    permission: spot.permission as SectMapHotspot['permission'],
    left: `${spot.position[0]}%`,
    top: `${spot.position[1]}%`,
    note: spot.note,
    locked: spot.locked,
    visitor: spot.visitor,
  };
}

export function resolveNativeSectHotspotDescription(
  presentation: NativeSectPresentation,
  spot: NativeSectHotspot,
  reason?: string,
): string {
  if (reason?.trim()) {
    return reason;
  }
  const sceneKey = HOTSPOT_SCENE_KEYS[spot.id];
  return (
    (sceneKey ? presentation.rooms[sceneKey]?.description : undefined) ??
    (sceneKey ? presentation.scenes[sceneKey]?.description : undefined) ??
    spot.note
  );
}
