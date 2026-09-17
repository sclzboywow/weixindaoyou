import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import {
  PRODUCTION_SECTS,
  PRODUCTION_SECT_PRESENTATIONS,
} from '../src/shared/engine/sect/content';
import {
  isListedSectAbility,
  sectAbilityMethodId,
  sectAbilityUnlockLevel,
} from '../src/shared/engine/sect/core';

const outputPath = resolve(
  process.cwd(),
  'src/wechat-game/generated/sectPresentations.json',
);

const data = Object.fromEntries(
  PRODUCTION_SECTS.map(({ module }) => {
    const definition = module.definition;
    const presentation = PRODUCTION_SECT_PRESENTATIONS[definition.id];
    return [
      definition.id,
      {
        name: definition.name,
        mapTitle: presentation.scenes.map.title,
        mapDescription: presentation.scenes.map.description,
        announcement: presentation.announcement,
        aspectRatio: presentation.map.aspectRatio,
        onboarding: presentation.onboarding,
        facilityLabels: { ...presentation.facilityLabels },
        rooms: Object.fromEntries(
          Object.entries(presentation.rooms ?? {}).map(([key, room]) => [
            key,
            {
              description: room.description,
              actors: room.actors.map((actor) => ({
                id: actor.id,
                roleKey: actor.roleKey,
                sigil: actor.sigil,
                name: actor.name,
                identity: actor.identity,
                responsibility: actor.responsibility,
                greeting: actor.greeting,
                appearance: actor.appearance,
                conversationRenderer: actor.conversation.renderer,
                ...(actor.conversation.parameters
                  ? {
                      conversationParameters: {
                        ...actor.conversation.parameters,
                      },
                    }
                  : {}),
              })),
            },
          ]),
        ),
        scenes: Object.fromEntries(
          Object.entries(presentation.scenes ?? {}).map(([key, scene]) => [
            key,
            { title: scene.title, description: scene.description },
          ]),
        ),
        hotspots: presentation.map.hotspots.map((hotspot) => ({
          id: hotspot.id,
          label: hotspot.label,
          note: hotspot.note,
          route: hotspot.route,
          permission: hotspot.permission,
          facility: hotspot.facility,
          locked: hotspot.locked,
          visitor: hotspot.visitor,
          position: [
            Number.parseFloat(hotspot.left),
            Number.parseFloat(hotspot.top),
          ],
        })),
        methods: definition.methods.map((method) => ({
          id: method.id,
          name: method.name,
          description: method.description,
          primary: method.isPrimary,
        })),
        paths: definition.paths.map((sectPath) => ({
          id: sectPath.id,
          name: sectPath.name,
          description: sectPath.description,
          tactics: sectPath.tactics.map((tactic) => ({
            id: tactic.id,
            name: tactic.name,
            description: tactic.description,
          })),
          nodes: sectPath.nodes.map((node) => ({
            id: node.id,
            layerId: node.layerId,
            name: node.name,
            description: node.description,
          })),
        })),
        abilities: definition.abilities
          .filter(
            (ability) =>
              ability.kind === 'active' && isListedSectAbility(ability),
          )
          .map((ability) => {
            const methodId = sectAbilityMethodId(ability) ?? '';
            const level = sectAbilityUnlockLevel(ability);
            const method = definition.methods.find(
              (entry) => entry.id === methodId,
            );
            return {
              id: ability.id,
              name: ability.baseName,
              description: ability.description,
              methodId,
              methodName: method?.name ?? methodId,
              unlockRequirement: methodId
                ? `${method?.name ?? methodId}${level}级`
                : '入宗即得',
              level,
            };
          }),
      },
    ];
  }),
);

await mkdir(dirname(outputPath), { recursive: true });
await Bun.write(outputPath, `${JSON.stringify(data, null, 2)}\n`);
console.info(`[wechat-sect-data] generated ${outputPath}`);
