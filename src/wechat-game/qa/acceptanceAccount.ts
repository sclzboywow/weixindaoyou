import type { NativeDaoyouApi } from '../core/nativeClient';
import { FRIEND_MAIL_TALISMAN_SCENARIO } from '../../shared/config/socialConfig';
import { parseInventoryPagination } from '../ui/inventoryPagination';

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function numberValue(record: Record<string, unknown> | null, ...keys: string[]): number {
  if (!record) return 0;
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'number' && Number.isFinite(value)) return value;
  }
  return 0;
}

function firstArray(value: unknown): unknown[] {
  const root = asRecord(value);
  if (!root) return [];
  const data = asRecord(root.data) ?? root;
  for (const key of ['items', 'list', 'data', 'friends', 'members']) {
    const arr = data?.[key];
    if (Array.isArray(arr)) return arr;
  }
  if (Array.isArray(data)) return data;
  if (Array.isArray(root)) return root;
  return [];
}

function countTalismanScenario(items: unknown[], scenario: string): number {
  return items.reduce<number>((sum, entry) => {
    const row = asRecord(entry);
    const item = asRecord(row?.item) ?? row;
    const spec = asRecord(item?.spec);
    if (spec?.kind !== 'talisman' || spec.scenario !== scenario) return sum;
    return sum + Math.max(0, numberValue(item, 'quantity') || 1);
  }, 0);
}

export type AcceptanceAuditResult = {
  cultivatorName: string;
  gaps: string[];
  ready: string[];
  notes: string[];
  counts: {
    spiritStones: number;
    reputation: number;
    mailTalisman: number;
    materials: number;
    consumables: number;
    artifacts: number;
    hpRatio: number;
  };
};

export async function auditWechatAcceptanceAccount(
  api: NativeDaoyouApi,
  resources: unknown,
): Promise<AcceptanceAuditResult> {
  const gaps: string[] = [];
  const ready: string[] = [];

  const profile = asRecord(asRecord(resources)?.profile);
  const cultivator = asRecord(profile?.cultivator);
  const currency = asRecord(asRecord(resources)?.currency);
  const condition = asRecord(asRecord(resources)?.condition);
  const hp = asRecord(condition?.hp);
  const hpCurrent = numberValue(hp, 'current');
  const hpMax = Math.max(1, numberValue(hp, 'max') || hpCurrent || 1);
  const hpRatio = hpCurrent / hpMax;

  const spiritStones = numberValue(currency, 'spiritStones', 'spirit_stones');
  const reputation = numberValue(currency, 'reputation');

  const [materialsRes, consumablesRes, artifactsRes] = await Promise.all([
    api.inventory('materials', { page: 1, pageSize: 20 }),
    api.inventory('consumables', { page: 1, pageSize: 20 }),
    api.inventory('artifacts', { page: 1, pageSize: 20 }),
  ]);

  const materials = parseInventoryPagination(materialsRes).total;
  const consumables = parseInventoryPagination(consumablesRes).total;
  const artifacts = parseInventoryPagination(artifactsRes).total;
  const mailTalisman = countTalismanScenario(
    firstArray(consumablesRes),
    FRIEND_MAIL_TALISMAN_SCENARIO,
  );

  if (mailTalisman < 1) {
    gaps.push('6.5 传音发出：缺少空白传音符（scenario=friend_mail_send）');
  } else {
    ready.push(`空白传音符 ×${mailTalisman}`);
  }

  if (materials < 21) {
    gaps.push(`3.2/3.4/5.4 库存翻页：材料总数 ${materials}/21`);
  } else {
    ready.push(`材料分页：${materials} 项`);
  }

  if (consumables < 21) {
    gaps.push(`5.1 药柜翻页：丹药/消耗品总数 ${consumables}/21（或分开备足）`);
  }

  if (hpRatio >= 1) {
    gaps.push('1.5 灵泉：角色满血，需先受伤或调低气血');
  } else {
    ready.push(`灵泉前置：气血 ${hpCurrent}/${hpMax}`);
  }

  if (spiritStones < 5000) {
    gaps.push(`经济类：灵石偏少（当前 ${spiritStones}，建议 ≥5000）`);
  } else {
    ready.push(`灵石 ${spiritStones}`);
  }

  if (reputation < 50) {
    gaps.push(`天骄宝阁：声望 ${reputation}（买传音符/贵宾符建议 ≥50）`);
  } else {
    ready.push(`声望 ${reputation}`);
  }

  const notes = [
    '2.1 破境试炼、4.1 晋升、4.5 转宗、5.2 丹方、6.2 战谱等见 wechat-acceptance-account-kit.md 第四节',
    '挑战天骄若报 BattleRecordV3 dead unit，先装备功法/神通再试',
  ];

  return {
    cultivatorName: String(cultivator?.name ?? '未命名'),
    gaps,
    ready,
    notes,
    counts: {
      spiritStones,
      reputation,
      mailTalisman,
      materials,
      consumables,
      artifacts,
      hpRatio,
    },
  };
}

export const ACCEPTANCE_REDEEM_TEMPLATE = {
  mailTitle: '微信验收试炼礼包',
  mailContent:
    '内含传音符、灵石、声望与分页测试用材料。领取后请在开发者工具控制台执行 __daoyouQaApp.qaAudit() 核对缺口。',
  totalLimit: null as number | null,
  rewardSelections: [
    { type: 'spirit_stones' as const, quantity: 50000 },
    { type: 'reputation' as const, quantity: 500 },
    {
      type: 'item_library' as const,
      itemId: 'REPLACE_FRIEND_MAIL_TALISMAN',
      quantity: 20,
    },
    {
      type: 'item_library' as const,
      itemId: 'REPLACE_AUCTION_VIP_TALISMAN',
      quantity: 10,
    },
    {
      type: 'item_library' as const,
      itemId: 'REPLACE_QITIANFU',
      quantity: 3,
    },
    {
      type: 'item_library' as const,
      itemId: 'REPLACE_MATERIAL_STACK',
      quantity: 25,
    },
  ],
};

export function printAcceptanceKitHelp(): string {
  return [
    '微信验收备号：',
    '1. 管理后台 → 兑换码 → 按 docs/wechat-acceptance-account-kit.md 创建礼包',
    '2. 小游戏 → 设置/社区 → 兑换码 → 领取',
    '3. 控制台：__daoyouQaApp.qaAudit() 查看缺口',
    '4. 控制台：__daoyouQaApp.qaClaim("CODE") 领取兑换码',
    '',
    '挑战天骄若报 BattleRecordV3 dead unit，多为战报引擎问题或角色战斗投影不完整，',
    '请先确保已装备功法/神通后再试；仍失败请记 FAIL 并附对手道号。',
  ].join('\n');
}
