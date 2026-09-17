import { prepareStandardFullBattle } from '../../shared/engine/battle-v5/setup/BattleStateStrategy';
import { simulateBattleV5 } from '../../shared/lib/battle/simulateBattleV5';
import { buildTrainingBattleInitConfig } from '../../shared/lib/training-room/config';
import {
  installWechatTrainingRuntimeBridge,
  type WechatTrainingRuntimeBridge,
} from './trainingRuntimeBridge';

const bridge: WechatTrainingRuntimeBridge = {
  simulate(player, opponent, draft) {
    const config = {
      player,
      opponent,
      strategyId: 'training_custom',
      ...buildTrainingBattleInitConfig(draft),
    } as Parameters<typeof prepareStandardFullBattle>[0];
    return simulateBattleV5(prepareStandardFullBattle(config));
  },
};

installWechatTrainingRuntimeBridge(bridge);
