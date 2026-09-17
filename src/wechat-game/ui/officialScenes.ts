export type OfficialSceneKey =
  | 'reincarnate'
  | 'identity-reshape'
  | 'sect-transfer'
  | 'sect-onboarding'
  | 'cultivator-attributes'
  | 'body-cultivation'
  | 'body-cultivation-breakthrough'
  | 'marrow-wash'
  | 'spirit-field'
  | 'alchemy'
  | 'market'
  | 'black-market'
  | 'tower'
  | 'skills'
  | 'sect'
  | 'sect-abilities'
  | 'sect-hall'
  | 'sect-affairs'
  | 'sect-archive'
  | 'sect-archive-methods'
  | 'sect-archive-paths'
  | 'sect-archive-abilities'
  | 'sect-enlightenment-cliff'
  | 'sect-arena'
  | 'sect-treasury'
  | 'sect-industries'
  | 'sect-cultivation-room'
  | 'sect-workshop'
  | 'sect-alchemy'
  | 'sect-refinery'
  | 'sect-spirit-vein'
  | 'sect-herb-garden'
  | 'sect-cave'
  | 'sect-gate'
  | 'techniques'
  | 'craft'
  | 'refine'
  | 'enlightenment'
  | 'gongfa-enlightenment'
  | 'manual-draw'
  | 'enlightenment-replace'
  | 'skill-enlightenment'
  | 'fate-reshape'
  | 'market-recycle'
  | 'tianjiao-vault'
  | 'auction'
  | 'battle-history'
  | 'rankings'
  | 'bet-battle'
  | 'arena-sparring'
  | 'dungeon-history'
  | 'activities'
  | 'world-chat'
  | 'community'
  | 'redeem'
  | 'merit-ledger'
  | 'settings'
  | 'feedback'
  | 'sect-gate-sweep'
  | 'sect-spirit-vein-mining'
  | 'battle-challenge'
  | 'battle-live-lobby'
  | 'battle-live-match'
  | 'battle-replay'
  | 'tower-battle'
  | 'bet-battle-challenge'
  | 'training-room'
  | 'task-challenge'
  | 'sect-task-battle'
  | 'map'
  | 'sect-visit'
  | 'sect-foreign-gate'
  | 'dungeon';

import {
  SCENE_IMPLEMENTATION_STATUS,
  type SceneImplementationStatus,
} from './sceneImplementationStatus';

export type { SceneImplementationStatus };

export interface OfficialSceneLoader {
  id: string;
  label: string;
  path: string;
  authenticated?: boolean;
}

export interface OfficialSceneAction {
  id: string;
  label: string;
  target?: OfficialSceneKey;
  primary?: boolean;
}

export interface OfficialSceneDefinition {
  key: OfficialSceneKey;
  sceneId: string;
  route: string;
  title: string;
  summary: string;
  intro: readonly string[];
  loaders?: readonly OfficialSceneLoader[];
  actions?: readonly OfficialSceneAction[];
  emptyText?: string;
  implementationStatus?: SceneImplementationStatus;
  knownGaps?: readonly string[];
  webRouteRefs?: readonly string[];
}

const scene = (
  definition: OfficialSceneDefinition,
): OfficialSceneDefinition => ({
  ...definition,
  implementationStatus:
    definition.implementationStatus ??
    SCENE_IMPLEMENTATION_STATUS[definition.key] ??
    'partial',
});

export const OFFICIAL_SCENES: Record<
  OfficialSceneKey,
  OfficialSceneDefinition
> = {
  reincarnate: scene({
    key: 'reincarnate',
    sceneId: 'cave',
    route: '/game/reincarnate',
    title: '转世重修',
    summary: '',
    intro: ['【前世余音】', '读取上一世道身归档，并以旧缘作为再入世的起点。'],
    loaders: [
      {
        id: 'context',
        label: '前世余音',
        path: '/api/cultivators/reincarnate-context',
      },
    ],
  }),
  'identity-reshape': scene({
    key: 'identity-reshape',
    sceneId: 'identity-reshape',
    route: '/game/identity-reshape',
    title: '改天换地',
    summary: '',
    intro: [
      '太乙司命 · 一符一世',
      '旧日姓名与身世在玉牒中照见，落笔之前仍可回看。',
    ],
    loaders: [
      {
        id: 'session',
        label: '当前玉牒',
        path: '/api/identity-reshape/session',
      },
    ],
  }),
  'sect-transfer': scene({
    key: 'sect-transfer',
    sceneId: 'sect-transfer',
    route: '/game/sect/transfer',
    title: '欺天台 · 转宗',
    summary: '欺天符可无损转入另一宗门，确认成功后方消耗符箓。',
    intro: [
      '先预览心法与流派保留，再确认落印。',
      '转宗后需重新选择流派节点与宗门神通；原宗门职务不保留。',
    ],
    loaders: [
      { id: 'context', label: '宗门身份', path: '/api/sects/current/context' },
    ],
  }),
  'sect-onboarding': scene({
    key: 'sect-onboarding',
    sceneId: 'sect-onboarding',
    route: '/game/sect/onboarding',
    title: '诸宗山门',
    summary: '',
    intro: ['诸宗山门', '先看宗门根基、传承与入门要求，再决定玉牒落向何处。'],
    loaders: [],
  }),
  'cultivator-attributes': scene({
    key: 'cultivator-attributes',
    sceneId: 'cultivator-attributes',
    route: '/game/cultivator/attributes',
    title: '根基属性',
    summary: '六维根基、次级属性与可分配点在此处归档。',
    intro: ['六维根基会随境界自然增长，额外获得的可分配点可在此处落定。'],
    loaders: [
      {
        id: 'resources',
        label: '属性归档',
        path: '/api/player/resources?keys=profile,condition,progress,currency',
      },
    ],
  }),
  'body-cultivation': scene({
    key: 'body-cultivation',
    sceneId: 'body-cultivation',
    route: '/game/body-cultivation',
    title: '肉身炼体',
    summary: '五轨炼体等级、当前收益与进阶准备归于此处。',
    intro: ['服用炼体丹提升皮肤、筋骨、脏腑、气血与元神五条轨道。'],
    loaders: [
      {
        id: 'state',
        label: '炼体总览',
        path: '/api/cultivator/body-cultivation/breakthrough',
      },
    ],
    actions: [
      {
        id: 'body-breakthrough',
        label: '肉身破限',
        target: 'body-cultivation-breakthrough',
        primary: true,
      },
    ],
  }),
  'body-cultivation-breakthrough': scene({
    key: 'body-cultivation-breakthrough',
    sceneId: 'body-cultivation',
    route: '/game/body-cultivation/breakthrough',
    title: '肉身破限',
    summary: '五轨炼体等级、当前收益与进阶准备归于此处。',
    intro: ['选取破限资材', '先核对火候与所需资材，再决定是否真正破限。'],
    loaders: [
      {
        id: 'state',
        label: '肉身状态',
        path: '/api/cultivator/body-cultivation/breakthrough',
      },
      {
        id: 'eligible',
        label: '可用资材',
        path: '/api/cultivator/body-cultivation/breakthrough/eligible?materialPage=1&consumablePage=1&pageSize=20',
      },
    ],
  }),
  'marrow-wash': scene({
    key: 'marrow-wash',
    sceneId: 'marrow-wash',
    route: '/game/marrow-wash',
    title: '洗髓池',
    summary: '洗髓进度、自由属性点与后天灵根加成归于此处。',
    intro: ['服用洗髓丹推动洗髓进度。洗髓升级会沉淀为自由属性点。'],
    loaders: [
      {
        id: 'resources',
        label: '洗髓总览',
        path: '/api/player/resources?keys=profile,condition,progress',
      },
    ],
  }),
  'spirit-field': scene({
    key: 'spirit-field',
    sceneId: 'spirit-field',
    route: '/game/spirit-field',
    title: '灵田',
    loaders: [
      {
        id: 'snapshot',
        path: '/api/spirit-field',
      } as OfficialSceneLoader,
    ],
  } as unknown as OfficialSceneDefinition),
  alchemy: scene({
    key: 'alchemy',
    sceneId: 'alchemy',
    route: '/game/craft/alchemy',
    title: '【炼丹房】',
    summary: '看药材、控炉候、炼丹息身。',
    intro: [
      '草木灵药调性，求疗伤、破境与炼体诸丹。',
      '即兴炼制与已得丹方均沿用官方造物规则。',
    ],
    loaders: [
      {
        id: 'materials',
        label: '药材',
        path: '/api/cultivator/inventory?type=materials&page=1&pageSize=16&materialTypes=herb,ore,monster,tcdb,aux&materialSortBy=quantity&materialSortOrder=desc',
      },
      {
        id: 'formulas',
        label: '丹方',
        path: '/api/alchemy/formulas?page=1&pageSize=5',
      },
    ],
  }),
  market: scene({
    key: 'market',
    sceneId: 'market',
    route: '/game/market',
    title: '修仙坊市',
    summary: '买卖流转与鉴宝收材皆由此起。',
    intro: [
      '凡市、珍宝阁、天宝殿依地图节点与坊市层级开放。',
      '先选坊市位置，再进入对应货架。',
    ],
    loaders: [
      {
        id: 'listings',
        label: '坊市货架',
        path: '/api/market/:nodeId?layer=:layer',
      },
    ],
    actions: [
      { id: 'market-map', label: '选择坊市', target: 'map', primary: true },
      { id: 'market-recycle', label: '鉴宝回收', target: 'market-recycle' },
      { id: 'auction', label: '拍卖行', target: 'auction' },
    ],
  }),
  'black-market': scene({
    key: 'black-market',
    sceneId: 'black-market',
    route: '/game/black-market',
    title: '暗巷黑市',
    summary: '辨货、问价，在有限线索里决定是否落子。',
    intro: [
      '黑市由地图节点进入。摊主报价、线索、交互与最终成交均由服务端会话裁定。',
    ],
    loaders: [
      { id: 'overview', label: '暗巷摊位', path: '/api/black-market/:nodeId' },
    ],
    actions: [
      {
        id: 'black-market-map',
        label: '前往地图寻黑市',
        target: 'map',
        primary: true,
      },
    ],
  }),
  tower: scene({
    key: 'tower',
    sceneId: 'tower',
    route: '/game/tower',
    title: '蜃楼幻境',
    summary: '蜃气每周聚作一境。先应眼前幻影，再看名号能留到第几重。',
    intro: ['境内气血与法力独立记账，踏入前可先查看层数与本周状态。'],
    loaders: [
      { id: 'state', label: '境内状态', path: '/api/tower/state' },
      {
        id: 'leaderboard',
        label: '留名榜',
        path: '/api/tower/leaderboard?realm=:realm&limit=30',
      },
    ],
    actions: [
      { id: 'tower-start', label: '踏入蜃楼', primary: true },
      { id: 'tower-reset', label: '重置幻境' },
    ],
  }),
  skills: scene({
    key: 'skills',
    sceneId: 'skills',
    route: '/game/skills',
    title: '【所修神通】',
    summary: '攻伐、辅助与身法诸术都在这里归卷。',
    intro: ['神通卷轴徐徐展开……'],
    loaders: [
      {
        id: 'skills',
        label: '神通卷轴',
        path: '/api/v2/products?type=skill&page=1&pageSize=100',
      },
    ],
  }),
  sect: scene({
    key: 'sect',
    sceneId: 'sect',
    route: '/game/sect',
    title: '宗门',
    summary: '拜访诸宗、研习心法、选择流派并承接宗门委托。',
    intro: ['宗门身份、传承、事务、设施与同门关系均以当前宗门上下文为准。'],
    loaders: [
      { id: 'context', label: '宗门总览', path: '/api/sects/current/context' },
      {
        id: 'infrastructure',
        label: '宗门设施',
        path: '/api/sects/current/infrastructure',
      },
      { id: 'tasks', label: '宗门委托', path: '/api/sects/current/tasks' },
    ],
    actions: [
      { id: 'sect-hall', label: '宗门大殿', target: 'sect-hall' },
      { id: 'sect-affairs', label: '宗门事务', target: 'sect-affairs' },
      { id: 'sect-archive', label: '宗门传承', target: 'sect-archive' },
      { id: 'sect-treasury', label: '宗门宝库', target: 'sect-treasury' },
      { id: 'sect-industries', label: '宗门建设', target: 'sect-industries' },
      { id: 'sect-gate', label: '宗门山门', target: 'sect-gate' },
    ],
  }),
  'sect-abilities': scene({
    key: 'sect-abilities',
    sceneId: 'sect-abilities',
    route: '/game/sect/abilities',
    title: '宗门演武',
    summary: '旧宗门神通入口将迁往宗门演武场。',
    intro: ['演武场承接宗门神通装配与当前流派战术。'],
    loaders: [
      { id: 'context', label: '宗门身份', path: '/api/sects/current/context' },
      {
        id: 'progression',
        label: '演武配置',
        path: '/api/sects/current/progression',
      },
    ],
  }),
  'sect-hall': scene({
    key: 'sect-hall',
    sceneId: 'sect-hall',
    route: '/game/sect/hall',
    title: '宗门大殿',
    summary: '身份、晋升、周俸与同门名录归于宗门大殿。',
    intro: ['身份玉牒 · 俸册名录'],
    loaders: [
      { id: 'context', label: '身份玉牒', path: '/api/sects/current/context' },
      { id: 'stipend', label: '周俸', path: '/api/sects/current/stipend' },
      {
        id: 'members',
        label: '同门名录',
        path: '/api/sects/current/members?page=1&pageSize=20',
      },
      {
        id: 'ranking',
        label: '贡献榜',
        path: '/api/sects/current/contribution-ranking',
      },
      {
        id: 'promotion',
        label: '晋升查验',
        path: '/api/sects/current/promotion-evaluation',
      },
    ],
  }),
  'sect-affairs': scene({
    key: 'sect-affairs',
    sceneId: 'sect-affairs',
    route: '/game/sect/affairs',
    title: '宗门事务',
    summary: '宗门日常、周常、悬赏和晋升试炼由事务场所统一发放。',
    intro: ['事务堂将当前可接、进行中与可交付的委托归在一处。'],
    loaders: [
      { id: 'tasks', label: '宗门委托', path: '/api/sects/current/tasks' },
      {
        id: 'promotion',
        label: '晋升查验',
        path: '/api/sects/current/promotion-evaluation',
      },
    ],
  }),
  'sect-archive': scene({
    key: 'sect-archive',
    sceneId: 'sect-archive',
    route: '/game/sect/archive',
    title: '宗门传承',
    summary: '宗门心法依次归档，研习受境界、职阶与设施等级共同约束。',
    intro: ['传承经卷 · 研习次第'],
    loaders: [
      { id: 'context', label: '宗门身份', path: '/api/sects/current/context' },
      {
        id: 'infrastructure',
        label: '传承阁设施',
        path: '/api/sects/current/infrastructure',
      },
      {
        id: 'progression',
        label: '传承经卷',
        path: '/api/sects/current/progression',
      },
    ],
    actions: [
      {
        id: 'archive-methods',
        label: '心法研习',
        target: 'sect-archive-methods',
        primary: true,
      },
      { id: 'archive-paths', label: '流派参悟', target: 'sect-archive-paths' },
      {
        id: 'archive-abilities',
        label: '神通演武',
        target: 'sect-archive-abilities',
      },
    ],
  }),
  'sect-archive-methods': scene({
    key: 'sect-archive-methods',
    sceneId: 'sect-archive',
    route: '/game/sect/archive/methods',
    title: '宗门心法',
    summary: '旧心法入口将归入宗门传承场所。',
    intro: ['逐卷查看宗门心法与当前研习上限。'],
    loaders: [
      { id: 'context', label: '心法经卷', path: '/api/sects/current/context' },
    ],
  }),
  'sect-archive-paths': scene({
    key: 'sect-archive-paths',
    sceneId: 'sect-enlightenment-cliff',
    route: '/game/sect/archive/paths',
    title: '宗门流派',
    summary: '旧流派入口将迁往宗门悟道场所。',
    intro: ['道痕分流 · 参悟留痕'],
    loaders: [
      { id: 'context', label: '流派道痕', path: '/api/sects/current/context' },
    ],
    actions: [
      {
        id: 'path-cliff',
        label: '前往悟道崖',
        target: 'sect-enlightenment-cliff',
        primary: true,
      },
    ],
  }),
  'sect-archive-abilities': scene({
    key: 'sect-archive-abilities',
    sceneId: 'sect-abilities',
    route: '/game/sect/archive/abilities',
    title: '宗门神通',
    summary: '旧神通入口将迁往宗门演武场。',
    intro: ['神通经卷归档后，由演武场完成装配与战术设置。'],
    actions: [
      {
        id: 'abilities-arena',
        label: '前往演武场',
        target: 'sect-abilities',
        primary: true,
      },
    ],
  }),
  'sect-enlightenment-cliff': scene({
    key: 'sect-enlightenment-cliff',
    sceneId: 'sect-enlightenment-cliff',
    route: '/game/sect/enlightenment-cliff',
    title: '宗门悟道',
    summary: '选择流派、配置参悟节点并检视构筑变化。',
    intro: ['道痕分流 · 参悟留痕'],
    loaders: [
      { id: 'context', label: '宗门身份', path: '/api/sects/current/context' },
      {
        id: 'progression',
        label: '悟道构筑',
        path: '/api/sects/current/progression',
      },
    ],
  }),
  'sect-arena': scene({
    key: 'sect-arena',
    sceneId: 'sect-abilities',
    route: '/game/sect/arena',
    title: '宗门演武',
    summary: '配置宗门神通与自动战术。',
    intro: ['演武场内可核对能力栏位、流派战术与教习配置。'],
    loaders: [
      { id: 'context', label: '宗门身份', path: '/api/sects/current/context' },
      {
        id: 'progression',
        label: '演武构筑',
        path: '/api/sects/current/progression',
      },
      { id: 'tasks', label: '演武事务', path: '/api/sects/current/tasks' },
    ],
  }),
  'sect-treasury': scene({
    key: 'sect-treasury',
    sceneId: 'sect-treasury',
    route: '/game/sect/treasury',
    title: '宗门宝库',
    summary: '按弟子职阶使用贡献兑换常驻与每周轮换物资。',
    intro: ['贡献支取 · 库藏封签'],
    loaders: [
      { id: 'shop', label: '本周库单', path: '/api/sects/current/shop' },
    ],
  }),
  'sect-industries': scene({
    key: 'sect-industries',
    sceneId: 'sect-industries',
    route: '/game/sect/industries',
    title: '宗门建设',
    summary: '全宗设施、公共工程与建设捐献记录在此归档。',
    intro: ['宗门设施 · 常态建设'],
    loaders: [
      {
        id: 'infrastructure',
        label: '设施总览',
        path: '/api/sects/current/infrastructure',
      },
      {
        id: 'member',
        label: '个人建设记录',
        path: '/api/sects/current/construction-member',
      },
    ],
  }),
  'sect-cultivation-room': scene({
    key: 'sect-cultivation-room',
    sceneId: 'sect-cultivation-room',
    route: '/game/sect/cultivation-room',
    title: '宗门修炼室',
    summary: '宗门聚灵阵为现有闭关结算提供修为加成。',
    intro: ['聚灵阵枢 · 闭关名册'],
    loaders: [
      { id: 'context', label: '宗门身份', path: '/api/sects/current/context' },
      {
        id: 'infrastructure',
        label: '聚灵阵效',
        path: '/api/sects/current/infrastructure',
      },
    ],
  }),
  'sect-workshop': scene({
    key: 'sect-workshop',
    sceneId: 'sect',
    route: '/game/sect/workshop',
    title: '宗门丹器坊',
    summary: '旧丹器坊入口将返回宗门总视图。',
    intro: ['丹房与器坊已分列独立场所。'],
    actions: [
      {
        id: 'sect-alchemy',
        label: '宗门丹房',
        target: 'sect-alchemy',
        primary: true,
      },
      { id: 'sect-refinery', label: '宗门器坊', target: 'sect-refinery' },
    ],
  }),
  'sect-alchemy': scene({
    key: 'sect-alchemy',
    sceneId: 'sect-alchemy',
    route: '/game/sect/alchemy',
    title: '宗门丹房',
    summary: '借宗门丹火完成即兴炼丹与丹方炼制。',
    intro: ['丹炉火候 · 药柜封签'],
    loaders: [
      { id: 'context', label: '宗门丹火', path: '/api/sects/current/context' },
      {
        id: 'infrastructure',
        label: '丹房设施',
        path: '/api/sects/current/infrastructure',
      },
      {
        id: 'materials',
        label: '药材',
        path: '/api/cultivator/inventory?type=materials&page=1&pageSize=16&materialTypes=herb,ore,monster,tcdb,aux&materialSortBy=quantity&materialSortOrder=desc',
      },
      {
        id: 'formulas',
        label: '丹方',
        path: '/api/alchemy/formulas?page=1&pageSize=5',
      },
    ],
  }),
  'sect-refinery': scene({
    key: 'sect-refinery',
    sceneId: 'sect-refinery',
    route: '/game/sect/refinery',
    title: '宗门器坊',
    summary: '借宗门地火锻造法宝。',
    intro: ['地火炉道 · 锻台封签'],
    loaders: [
      { id: 'context', label: '宗门地火', path: '/api/sects/current/context' },
      {
        id: 'infrastructure',
        label: '器坊设施',
        path: '/api/sects/current/infrastructure',
      },
      {
        id: 'materials',
        label: '锻造材料',
        path: '/api/cultivator/inventory?type=materials&page=1&pageSize=20',
      },
    ],
  }),
  'sect-spirit-vein': scene({
    key: 'sect-spirit-vein',
    sceneId: 'sect-spirit-vein',
    route: '/game/sect/spirit-vein',
    title: '宗门灵脉',
    summary: '查看灵脉设施等级与灵石俸禄加成。',
    intro: ['矿场井口 · 脉息封签'],
    loaders: [
      { id: 'context', label: '宗门身份', path: '/api/sects/current/context' },
      {
        id: 'infrastructure',
        label: '灵脉设施',
        path: '/api/sects/current/infrastructure',
      },
      { id: 'tasks', label: '采掘勤务', path: '/api/sects/current/tasks' },
    ],
    actions: [
      {
        id: 'spirit-mining',
        label: '进入灵矿采掘',
        target: 'sect-spirit-vein-mining',
        primary: true,
      },
    ],
  }),
  'sect-herb-garden': scene({
    key: 'sect-herb-garden',
    sceneId: 'sect-herb-garden',
    route: '/game/sect/herb-garden',
    title: '宗门药田',
    summary: '查看药田等级、每周灵草产出与灵植长势。',
    intro: ['药畦晨露 · 草木值录'],
    loaders: [
      { id: 'context', label: '宗门身份', path: '/api/sects/current/context' },
      {
        id: 'infrastructure',
        label: '药田值录',
        path: '/api/sects/current/infrastructure',
      },
    ],
  }),
  'sect-cave': scene({
    key: 'sect-cave',
    sceneId: 'sect-cave',
    route: '/game/sect/cave',
    title: '弟子居所',
    summary: '查看弟子在宗门中的个人居所资格。',
    intro: ['宗门居所依身份与设施开放。'],
    loaders: [
      { id: 'context', label: '弟子居所', path: '/api/sects/current/context' },
    ],
  }),
  'sect-gate': scene({
    key: 'sect-gate',
    sceneId: 'sect-gate',
    route: '/game/sect/gate',
    title: '宗门山门',
    summary: '宗门动态与未来拜师入口归于山门。',
    intro: ['山门值录 · 当日勤务'],
    loaders: [
      { id: 'context', label: '宗门身份', path: '/api/sects/current/context' },
      {
        id: 'infrastructure',
        label: '山门动态',
        path: '/api/sects/current/infrastructure',
      },
      { id: 'tasks', label: '今日勤务', path: '/api/sects/current/tasks' },
    ],
    actions: [
      {
        id: 'gate-sweep',
        label: '开始今日清扫',
        target: 'sect-gate-sweep',
        primary: true,
      },
    ],
  }),
  techniques: scene({
    key: 'techniques',
    sceneId: 'techniques',
    route: '/game/techniques',
    title: '【所修功法】',
    summary: '根基所系的功法都在此归档。',
    intro: ['功法卷轴徐徐展开……'],
    loaders: [
      {
        id: 'techniques',
        label: '功法卷轴',
        path: '/api/v2/products?type=gongfa&page=1&pageSize=100',
      },
    ],
  }),
  craft: scene({
    key: 'craft',
    sceneId: 'craft',
    route: '/game/craft',
    title: '【造物仙炉】',
    summary: '分清炼器与炼丹，再携灵材入炉。',
    intro: [],
    actions: [
      {
        id: 'craft-alchemy',
        label: '炼丹调息',
        target: 'alchemy',
        primary: true,
      },
      { id: 'craft-refine', label: '炼器成兵', target: 'refine' },
    ],
  }),
  refine: scene({
    key: 'refine',
    sceneId: 'refine',
    route: '/game/craft/refine',
    title: '【炼器室】',
    summary: '铸器成兵，先校料再落锤火。',
    intro: [],
    loaders: [
      {
        id: 'materials',
        label: '锻造材料',
        path: '/api/cultivator/inventory?type=materials&page=1&pageSize=20',
      },
    ],
  }),
  enlightenment: scene({
    key: 'enlightenment',
    sceneId: 'enlightenment',
    route: '/game/enlightenment',
    title: '【悟道室】',
    summary: '推演、求卷与取舍都归书案。',
    intro: [],
    loaders: [
      {
        id: 'pendingGongfa',
        label: '待处理功法',
        path: '/api/craft/pending?type=create_gongfa',
      },
      {
        id: 'pendingSkill',
        label: '待处理神通',
        path: '/api/craft/pending?type=create_skill',
      },
    ],
    actions: [
      {
        id: 'enlightenment-skill',
        label: '开始推演',
        target: 'skill-enlightenment',
        primary: true,
      },
      {
        id: 'enlightenment-gongfa',
        label: '开始参悟',
        target: 'gongfa-enlightenment',
        primary: true,
      },
    ],
  }),
  'gongfa-enlightenment': scene({
    key: 'gongfa-enlightenment',
    sceneId: 'gongfa-enlightenment',
    route: '/game/enlightenment/gongfa',
    title: '【功法参悟】',
    summary: '衡量悟性与投入，细推功法脉络。',
    intro: [],
    loaders: [
      {
        id: 'materials',
        label: '参悟材料',
        path: '/api/cultivator/inventory?type=materials&page=1&pageSize=20',
      },
      {
        id: 'pending',
        label: '待处理法门',
        path: '/api/craft/pending?type=create_gongfa',
      },
    ],
  }),
  'manual-draw': scene({
    key: 'manual-draw',
    sceneId: 'manual-draw',
    route: '/game/enlightenment/manual-draw',
    title: '问法寻卷',
    summary: '请符求卷，补足今日所缺法门。',
    intro: [],
    loaders: [
      { id: 'status', label: '今日演法', path: '/api/manual-draw/status' },
    ],
    actions: [
      { id: 'manual-draw-gongfa-1', label: '功法一卷', primary: true },
      { id: 'manual-draw-gongfa-5', label: '功法五卷' },
      { id: 'manual-draw-skill-1', label: '神通一卷', primary: true },
      { id: 'manual-draw-skill-5', label: '神通五卷' },
    ],
  }),
  'enlightenment-replace': scene({
    key: 'enlightenment-replace',
    sceneId: 'enlightenment-replace',
    route: '/game/enlightenment/replace',
    title: '参悟抉择',
    summary: '新旧法门只在此处做一次取舍。',
    intro: ['取舍摘要', '新法已显，确认前先看清需要舍弃的旧法门。'],
    loaders: [
      {
        id: 'pending',
        label: '待纳入新法',
        path: '/api/craft/pending?type=:type',
      },
      {
        id: 'gongfa',
        label: '所修功法',
        path: '/api/v2/products?type=gongfa&page=1&pageSize=100',
      },
      {
        id: 'skills',
        label: '所修神通',
        path: '/api/v2/products?type=skill&page=1&pageSize=100',
      },
    ],
  }),
  'skill-enlightenment': scene({
    key: 'skill-enlightenment',
    sceneId: 'skill-enlightenment',
    route: '/game/enlightenment/skill',
    title: '【神通推演】',
    summary: '排定材料与悟性，推演一门神通。',
    intro: [],
    loaders: [
      {
        id: 'materials',
        label: '推演材料',
        path: '/api/cultivator/inventory?type=materials&page=1&pageSize=20',
      },
      {
        id: 'pending',
        label: '待处理神通',
        path: '/api/craft/pending?type=create_skill',
      },
    ],
  }),
  'fate-reshape': scene({
    key: 'fate-reshape',
    sceneId: 'fate-reshape',
    route: '/game/fate-reshape',
    title: '重塑命格',
    summary: '拨动命数之前，先看当下格局。',
    intro: [
      '【命格重塑】',
      '命格天机由独立会话保存，候选、重抽、确认与放弃都以服务端状态为准。',
    ],
    loaders: [
      { id: 'session', label: '命格天机', path: '/api/fate-reshape/session' },
    ],
  }),
  'market-recycle': scene({
    key: 'market-recycle',
    sceneId: 'market-recycle',
    route: '/game/market/recycle',
    title: '鉴宝回收',
    summary: '识别去留，批量回收冗余之物。',
    intro: ['法宝鉴评、废丹与废料均先预览估价，再二次确认回收。'],
    actions: [],
  }),
  'tianjiao-vault': scene({
    key: 'tianjiao-vault',
    sceneId: 'tianjiao-vault',
    route: '/game/tianjiao-vault',
    title: '天骄宝阁',
    summary: '凭声望换取宝阁珍藏。',
    intro: ['榜上扬名、幻境破关所得声望，皆可在此换取珍藏。'],
    loaders: [{ id: 'shop', label: '宝阁珍藏', path: '/api/reputation-shop' }],
  }),
  auction: scene({
    key: 'auction',
    sceneId: 'auction',
    route: '/game/auction',
    title: '拍卖行',
    summary: '观市、寄售与竞拍合为一案。',
    intro: ['浏览拍卖与我的寄售分栏呈现；物品、卖家、品级与数量均可筛选。'],
    loaders: [
      {
        id: 'listings',
        label: '浏览拍卖',
        path: '/api/auction/listings?scope=all&page=1&limit=10&sortBy=latest',
      },
    ],
  }),
  'battle-history': scene({
    key: 'battle-history',
    sceneId: 'battle-history',
    route: '/game/battle/history',
    title: '全部战绩',
    summary: '斗法卷宗与旧战回放在此归档。',
    intro: ['筛选全部、我的挑战与我被挑战，再按卷宗进入回放。'],
    loaders: [
      {
        id: 'records',
        label: '战绩卷宗',
        path: '/api/battle-records/v3?page=1&pageSize=5',
      },
    ],
  }),
  rankings: scene({
    key: 'rankings',
    sceneId: 'rankings',
    route: '/game/rankings',
    title: '天骄榜',
    summary: '看榜、领赏、择敌挑战。',
    intro: ['境界榜、财富榜与物品榜按官方页签展开；挑战仍以榜单目标为入口。'],
    loaders: [
      {
        id: 'realm',
        label: '当前境界榜',
        path: '/api/rankings?realm=:realm&page=1&pageSize=20',
      },
      {
        id: 'wealth',
        label: '财富榜',
        path: '/api/rankings/wealth?page=1&pageSize=20',
      },
    ],
    actions: [
      { id: 'battle-history', label: '全部战绩', target: 'battle-history' },
    ],
  }),
  'bet-battle': scene({
    key: 'bet-battle',
    sceneId: 'bet-battle',
    route: '/game/bet-battle',
    title: '赌战台',
    summary: '设注、应战与结算皆在赌战台。',
    intro: ['待应战、进行中、已结算与已取消的赌战均按服务端状态展示。'],
    loaders: [
      {
        id: 'listings',
        label: '公开赌战',
        path: '/api/bet-battles/listings?page=1&limit=20',
      },
      {
        id: 'mine',
        label: '我的赌战',
        path: '/api/bet-battles/my?page=1&limit=20',
      },
    ],
  }),
  'arena-sparring': scene({
    key: 'arena-sparring',
    sceneId: 'arena-sparring',
    route: '/game/arena',
    title: '擂台切磋',
    summary: '创建房间或凭邀请码入场，自动分队后进行无消耗切磋。',
    intro: ['青石擂台立在场中。双方到齐并准备后，由房主开始切磋。'],
    loaders: [{ id: 'room', label: '我的房间', path: '/api/arena/room' }],
  }),
  'dungeon-history': scene({
    key: 'dungeon-history',
    sceneId: 'dungeon-history',
    route: '/game/dungeon/history',
    title: '探险札记',
    summary: '一路遭逢与所得在此翻卷。',
    intro: ['已经发生过的探险过程、结果与奖励品阶在此归档。'],
    loaders: [
      {
        id: 'history',
        label: '旧事札记',
        path: '/api/dungeon/history?page=1&pageSize=10',
      },
    ],
  }),
  activities: scene({
    key: 'activities',
    sceneId: 'activities',
    route: '/game/activities',
    title: '仙盟活动',
    summary: '查看当前公告与可领取的登录奖励。',
    intro: ['活动奖励领取后会通过传音玉简送达。'],
    loaders: [
      { id: 'activities', label: '当前活动', path: '/api/activities' },
    ],
    emptyText: '当前暂无进行中的活动。',
  }),
  'world-chat': scene({
    key: 'world-chat',
    sceneId: 'world-chat',
    route: '/game/world-chat',
    title: '世界传音',
    summary: '诸界闲谈与即时传音都在此处。',
    intro: ['世界与系统消息按官方频道读取，发送仍受冷却与内容校验。'],
  }),
  community: scene({
    key: 'community',
    sceneId: 'community',
    route: '/game/community',
    title: '玩家交流群',
    summary: '外部群聊入口与同道集散之处。',
    intro: ['与道友同修，共论仙途。复制群号后前往 QQ 搜索并申请加群。'],
    loaders: [
      {
        id: 'qq',
        label: '交流群',
        path: '/api/community/qq-group',
        authenticated: false,
      },
    ],
  }),
  redeem: scene({
    key: 'redeem',
    sceneId: 'redeem',
    route: '/game/redeem',
    title: '兑换码',
    summary: '持契兑缘，所得会经玉简投递。',
    intro: ['奖励不直接落袋，而是经由传音玉简投递。'],
    actions: [{ id: 'redeem-submit', label: '输入兑换码', primary: true }],
  }),
  'merit-ledger': scene({
    key: 'merit-ledger',
    sceneId: 'merit-ledger',
    route: '/game/merit-ledger',
    title: '功德簿',
    summary: '记同行之缘，不录金额与次数。',
    intro: [
      '不记灵石多寡，只录同行之缘。每笔支持留下一页功德与一封无附件谢信。',
    ],
    loaders: [
      { id: 'me', label: '我的功德', path: '/api/sponsorship/me' },
      {
        id: 'public',
        label: '天下功德',
        path: '/api/sponsorship/public?page=1&pageSize=20',
        authenticated: false,
      },
      {
        id: 'config',
        label: '功德设置',
        path: '/api/sponsorship/config',
        authenticated: false,
      },
    ],
  }),
  settings: scene({
    key: 'settings',
    sceneId: 'settings',
    route: '/game/settings',
    title: '系统设置',
    summary: '管理角色、账号与模型配置。',
    intro: ['游戏设置、天地灵气、账号管理、模型配置与连接状态集中于此。'],
    loaders: [
      {
        id: 'resources',
        label: '当前角色',
        path: '/api/player/resources?keys=profile,currency,progress',
      },
      {
        id: 'qi',
        label: '灵气记录',
        path: '/api/cultivator/qi/logs?page=1&pageSize=20',
      },
      {
        id: 'wechatAbilities',
        label: '微信提醒',
        path: '/api/wechat/open-abilities',
      },
    ],
    actions: [{ id: 'feedback', label: '意见反馈', target: 'feedback' }],
  }),
  feedback: scene({
    key: 'feedback',
    sceneId: 'feedback',
    route: '/game/settings/feedback',
    title: '意见反馈',
    summary: '把平衡与体验问题留在此处。',
    intro: ['Bug 反馈、功能建议、游戏平衡与其他意见均使用同一反馈表单。'],
    actions: [
      { id: 'feedback-bug', label: 'Bug 反馈', primary: true },
      { id: 'feedback-feature', label: '功能建议' },
      { id: 'feedback-balance', label: '游戏平衡' },
      { id: 'feedback-other', label: '其他意见' },
    ],
  }),
  'sect-gate-sweep': scene({
    key: 'sect-gate-sweep',
    sceneId: 'sect-gate-sweep',
    route: '/game/sect/gate/sweep',
    title: '清扫山门',
    summary: '',
    intro: ['落叶、步数与路线验收由宗门任务服务端结算。'],
    loaders: [
      { id: 'tasks', label: '今日委托', path: '/api/sects/current/tasks' },
    ],
  }),
  'sect-spirit-vein-mining': scene({
    key: 'sect-spirit-vein-mining',
    sceneId: 'sect-spirit-vein-mining',
    route: '/game/sect/spirit-vein/mining',
    title: '灵矿采掘',
    summary: '',
    intro: ['小型灵晶、赤铜灵矿、玄铁矿团与地脉灵髓依采掘表现出现。'],
    loaders: [
      { id: 'tasks', label: '采掘委托', path: '/api/sects/current/tasks' },
    ],
  }),
  'battle-challenge': scene({
    key: 'battle-challenge',
    sceneId: 'battle-challenge',
    route: '/game/battle/challenge',
    title: '挑战天骄',
    summary: '',
    intro: ['挑战战报推演中……'],
  }),
  'battle-live-lobby': scene({
    key: 'battle-live-lobby',
    sceneId: 'battle-live-lobby',
    route: '/game/battle/live',
    title: '多人战斗邀请',
    summary: '',
    intro: ['接受并入阵'],
    loaders: [
      {
        id: 'invitations',
        label: '战斗邀请',
        path: '/api/battle-matches/invitations',
      },
    ],
  }),
  'battle-live-match': scene({
    key: 'battle-live-match',
    sceneId: 'battle-live-match',
    route: '/game/battle/live/:matchId',
    title: '实时多人战局',
    summary: '',
    intro: ['普通攻击、技能与自动目标均服从服务端回合状态。'],
  }),
  'battle-replay': scene({
    key: 'battle-replay',
    sceneId: 'battle-replay',
    route: '/game/battle/:id',
    title: '战斗回放',
    summary: '',
    intro: ['回溯战斗回放……'],
  }),
  'tower-battle': scene({
    key: 'tower-battle',
    sceneId: 'tower-battle',
    route: '/game/tower/battle',
    title: '蜃楼战局',
    summary: '',
    intro: ['幻影正在显形。'],
    loaders: [{ id: 'state', label: '幻境状态', path: '/api/tower/state' }],
  }),
  'bet-battle-challenge': scene({
    key: 'bet-battle-challenge',
    sceneId: 'bet-battle-challenge',
    route: '/game/bet-battle/challenge',
    title: '赌战挑战',
    summary: '胜负将直接决定这场赌战的结果。',
    intro: ['赌战战报推演中……'],
  }),
  'training-room': scene({
    key: 'training-room',
    sceneId: 'training-room',
    route: '/game/training-room',
    title: '练功房',
    summary: '直接和木桩切磋；需要时再展开自定义设置。',
    intro: [
      '直接增加、按比例增加、按倍数调整、设为最终值与直接指定等试招工具均在此。',
    ],
    loaders: [
      {
        id: 'resources',
        label: '当前战法',
        path: '/api/player/resources?keys=profile,condition,loadout',
      },
    ],
  }),
  'task-challenge': scene({
    key: 'task-challenge',
    sceneId: 'task-challenge',
    route: '/game/tasks/:taskId/challenge',
    title: '破境试炼',
    summary: '以斗法验道心，以胜负问前路。',
    intro: ['试炼结果回写任务卷宗，成功后再回静室继续推进破境。'],
  }),
  'sect-task-battle': scene({
    key: 'sect-task-battle',
    sceneId: 'sect-task-battle',
    route: '/game/sect/tasks/:taskId/battle',
    title: '宗门战局',
    summary: '',
    intro: ['宗门战局推演中……'],
  }),
  map: scene({
    key: 'map',
    sceneId: 'map',
    route: '/game/map',
    title: '修仙界地图',
    summary: '',
    intro: ['大世界节点与可进入场所均复用官方共享地图配置。'],
    loaders: [
      {
        id: 'resources',
        label: '当前道身',
        path: '/api/player/resources?keys=profile,condition,currency',
      },
      { id: 'dungeonLimit', label: '今日云游', path: '/api/dungeon/limit' },
    ],
    actions: [
      {
        id: 'map-dungeon',
        label: '云游探秘',
        target: 'dungeon',
        primary: true,
      },
      { id: 'map-market', label: '修仙坊市', target: 'market' },
      { id: 'map-sect', label: '诸宗山门', target: 'sect' },
    ],
  }),
  'sect-visit': scene({
    key: 'sect-visit',
    sceneId: 'sect-visit',
    route: '/game/sect/:sectId/visit',
    title: '访宗舆图',
    summary: '',
    intro: ['返回大世界', '前往山门查探悬赏目标。'],
    loaders: [
      { id: 'tasks', label: '悬赏卷宗', path: '/api/sects/current/tasks' },
    ],
  }),
  'sect-foreign-gate': scene({
    key: 'sect-foreign-gate',
    sceneId: 'sect-foreign-gate',
    route: '/game/sect/:sectId/gate',
    title: '外宗山门',
    summary: '',
    intro: ['正在核对悬赏令与山门来客……'],
    loaders: [
      { id: 'tasks', label: '悬赏卷宗', path: '/api/sects/current/tasks' },
    ],
  }),
  dungeon: scene({
    key: 'dungeon',
    sceneId: 'dungeon',
    route: '/game/dungeon',
    title: '云游探秘',
    summary: '',
    intro: ['副本流程保持沉浸式：选图、探索、战斗、拾取、结算各有独立阶段。'],
    loaders: [
      { id: 'state', label: '当前探险', path: '/api/dungeon/state' },
      { id: 'limit', label: '今日次数', path: '/api/dungeon/limit' },
      { id: 'tasks', label: '当前任务', path: '/api/tasks' },
    ],
    actions: [
      { id: 'dungeon-history', label: '探险札记', target: 'dungeon-history' },
    ],
  }),
};

export const OFFICIAL_NAV_SCENE_BY_ID: Partial<
  Record<string, OfficialSceneKey>
> = {
  'cultivator-attributes': 'cultivator-attributes',
  'body-cultivation': 'body-cultivation',
  'marrow-wash': 'marrow-wash',
  retreat: undefined,
  inn: undefined,
  'spirit-field': 'spirit-field',
  enlightenment: 'enlightenment',
  techniques: 'techniques',
  skills: 'skills',
  'sect-abilities': 'sect-abilities',
  sect: 'sect',
  'training-room': 'training-room',
  'battle-history': 'battle-history',
  'dungeon-history': 'dungeon-history',
  dungeon: 'dungeon',
  tower: 'tower',
  craft: 'craft',
  'fate-reshape': 'fate-reshape',
  tasks: undefined,
  'manual-draw': 'manual-draw',
  alchemy: 'alchemy',
  refine: 'refine',
  market: 'market',
  'black-market': 'black-market',
  'market-recycle': 'market-recycle',
  'tianjiao-vault': 'tianjiao-vault',
  auction: 'auction',
  'world-chat': 'world-chat',
  rankings: 'rankings',
  'bet-battle': 'bet-battle',
  'arena-sparring': 'arena-sparring',
  redeem: 'redeem',
  'merit-ledger': 'merit-ledger',
  community: 'community',
  feedback: 'feedback',
  settings: 'settings',
};

export function officialSceneForNavigationId(
  id: string,
): OfficialSceneKey | null {
  const value = OFFICIAL_NAV_SCENE_BY_ID[id];
  return value ?? null;
}
