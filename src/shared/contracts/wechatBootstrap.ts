import type { PlayerResourcesData } from './player';
import type { BattleRecordV3Summary } from '../types/battle';
import type { TaskInstance } from '../types/task';
import type { WorldChatMessageDTO } from '../types/world-chat';

export interface WechatBootstrapUser {
  id: string;
  name?: string | null;
  email?: string | null;
}

export interface WechatGameBootstrapData {
  user: WechatBootstrapUser;
  resources: PlayerResourcesData;
  activeTasks: TaskInstance[];
  worldChatPreview: WorldChatMessageDTO | null;
  recentBattles: BattleRecordV3Summary[];
}

export interface WechatGameBootstrapResponse {
  success: true;
  data: WechatGameBootstrapData;
}
