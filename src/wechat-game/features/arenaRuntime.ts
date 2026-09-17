type Actor = {
  roleKey: string;
  sigil: string;
  name: string;
  identity: string;
  responsibility: string;
  appearance: 'person' | 'facility';
};

type ArenaHost = {
  ctx: CanvasRenderingContext2D;
  arenaActor: '' | 'wang-hu' | 'ring';
  sceneScroll: number;
  buttons: Array<{
    id: string;
    rect: { x: number; y: number; width: number; height: number };
    action(): void;
  }>;
  render(): void;
  drawText(
    text: string,
    x: number,
    y: number,
    size: number,
    options?: Record<string, unknown>,
  ): void;
  drawWrappedText(
    text: string,
    x: number,
    y: number,
    width: number,
    lineHeight: number,
    maxLines: number,
    size: number,
    options?: Record<string, unknown>,
  ): number;
  addButton(
    id: string,
    label: string,
    rect: { x: number; y: number; width: number; height: number },
    action: () => void,
    primary?: boolean,
    enabled?: boolean,
  ): void;
  drawSectRoomIntro(
    left: number,
    width: number,
    y: number,
    room: { description: string; prompt?: string; promptDetail?: string; actors: Actor[] },
    eyebrow?: string,
  ): number;
  drawSectRoomActorGrid(
    left: number,
    width: number,
    y: number,
    room: { description: string; prompt?: string; promptDetail?: string; actors: Actor[] },
    prefix: string,
    onSelect: (roleKey: string) => void,
  ): number;
};

type Seat = Record<string, unknown>;
const text = (record: Seat, key: string) =>
  typeof record[key] === 'string' ? (record[key] as string) : '';

const drawEntrance = (
  hostValue: unknown,
  left: number,
  width: number,
  y: number,
  hasRoom: boolean,
) => {
  const host = hostValue as ArenaHost;
  const room = {
    description: '青石擂台立在场中，来客可创建房间或凭邀请码入场切磋。',
    prompt: '点击擂台入场；若想了解细则，可问王虎',
    promptDetail: '双方到齐并准备后即可开始。',
    actors: [
      {
        roleKey: 'wang-hu',
        sigil: '虎',
        name: '王虎',
        identity: '擂台切磋主持人',
        responsibility: '简要说明切磋规则。',
        appearance: 'person',
      },
      {
        roleKey: 'ring',
        sigil: '🥁',
        name: '擂台',
        identity: '切磋设施',
        responsibility: hasRoom ? '已有候场房间' : '创建房间或凭邀请码加入',
        appearance: 'facility',
      },
    ] as Actor[],
  };
  const gridTop = host.drawSectRoomIntro(left, width, y, room, '擂台场');
  return host.drawSectRoomActorGrid(
    left,
    width,
    gridTop,
    room,
    'arena-',
    (roleKey) => {
      host.arenaActor = roleKey as 'wang-hu' | 'ring';
      host.sceneScroll = 0;
      host.render();
    },
  );
};

const drawTeams = (
  hostValue: unknown,
  left: number,
  width: number,
  y: number,
  alpha: Seat[],
  beta: Seat[],
) => {
  const host = hostValue as ArenaHost;
  const gap = 10;
  const panelWidth = (width - gap) / 2;
  const panelHeight = 64 + Math.max(1, alpha.length, beta.length) * 48;
  ([['青方', alpha], ['赤方', beta]] as const).forEach(
    ([label, seats], teamIndex) => {
      const x = left + teamIndex * (panelWidth + gap);
      host.ctx.strokeStyle = 'rgba(44,24,16,.15)';
      host.ctx.strokeRect(x, y, panelWidth, panelHeight);
      host.drawText(label, x + 12, y + 25, 10, { color: '#5a4a42' });
      host.drawText(`${seats.length} / 4`, x + panelWidth - 12, y + 25, 9, {
        align: 'right',
        color: '#5a4a42',
      });
      seats.forEach((seat, index) => {
        const seatY = y + 42 + index * 48;
        host.ctx.fillStyle = 'rgba(44,24,16,.025)';
        host.ctx.fillRect(x + 8, seatY, panelWidth - 16, 40);
        host.drawText(text(seat, 'displayName'), x + 16, seatY + 16, 10);
        host.drawText(
          `${text(seat, 'realm')} ${text(seat, 'realmStage')}`,
          x + 16,
          seatY + 33,
          8,
          { color: '#5a4a42' },
        );
        const ready = Boolean(seat.ready);
        host.drawText(ready ? '已准备' : '未准备', x + panelWidth - 15, seatY + 25, 8, {
          align: 'right',
          color: ready ? '#18766b' : '#5a4a42',
        });
      });
      if (!seats.length)
        host.drawText('暂无参战者', x + panelWidth / 2, y + 80, 9, {
          align: 'center',
          color: '#5a4a42',
        });
    },
  );
  return y + panelHeight + 14;
};

type BetHeaderOptions = {
  tab: 'hall' | 'mine' | 'create';
  spiritStones: number;
  canCreate: boolean;
  onMail(): void;
  onCreate(): void;
  onTab(tab: 'hall' | 'mine'): void;
};

const drawBetHeader = (
  hostValue: unknown,
  left: number,
  width: number,
  y: number,
  options: BetHeaderOptions,
) => {
  const host = hostValue as ArenaHost;
  const top = y;
  host.ctx.fillStyle = 'rgba(248,243,230,.88)';
  host.ctx.fillRect(left, top, width, 212);
  host.ctx.save();
  host.ctx.strokeStyle = 'rgba(44,24,16,.24)';
  host.ctx.setLineDash([4, 4]);
  host.ctx.strokeRect(left + .5, top + .5, width - 1, 211);
  host.ctx.restore();
  host.drawText('竞技大厅', left + 14, top + 23, 8, {
    color: '#7d6b60',
    sans: true,
  });
  host.drawText('赌战大厅', left + 14, top + 54, 20, { bold: true });
  host.drawWrappedText(
    '以灵石或器物为筹，邀天下道友一战分高下。胜者得赌注，败者留名于台。',
    left + 14,
    top + 80,
    width - 28,
    19,
    2,
    10,
    { color: '#5a4a42', sans: true },
  );
  host.drawText(`当前灵石：${options.spiritStones}`, left + 14, top + 124, 9, {
    color: '#7d6b60',
    sans: true,
  });
  const actionWidth = (width - 34) / 2;
  host.addButton(
    'bet-mail',
    '查看邮件',
    { x: left + 12, y: top + 137, width: actionWidth, height: 32 },
    options.onMail,
  );
  host.addButton(
    'bet-open-create',
    options.canCreate ? '发起赌战' : '已有待战',
    {
      x: left + 22 + actionWidth,
      y: top + 137,
      width: actionWidth,
      height: 32,
    },
    options.onCreate,
    true,
    options.canCreate,
  );
  const tabWidth = (width - 24) / 2;
  (['hall', 'mine'] as const).forEach((tab, index) =>
    host.addButton(
      `bet-${tab}`,
      tab === 'hall' ? '赌战大厅' : '我的赌战',
      {
        x: left + 8 + index * (tabWidth + 8),
        y: top + 176,
        width: tabWidth,
        height: 32,
      },
      () => options.onTab(tab),
      options.tab === tab,
    ),
  );
  return top + 226;
};

type BetCardOptions = {
  id: string;
  creatorName: string;
  realm: string;
  realmStage: string;
  status: string;
  stake: string;
  taunt: string;
  minRealm: string;
  maxRealm: string;
  remain: string;
  isMine: boolean;
  actions: Array<{
    id: string;
    label: string;
    primary?: boolean;
    enabled?: boolean;
    action(): void;
  }>;
};

const drawBetCard = (
  hostValue: unknown,
  left: number,
  width: number,
  y: number,
  card: BetCardOptions,
) => {
  const host = hostValue as ArenaHost;
  const height = 158;
  host.ctx.fillStyle = 'rgba(248,243,230,.72)';
  host.ctx.fillRect(left, y, width, height);
  host.ctx.save();
  host.ctx.strokeStyle = 'rgba(44,24,16,.2)';
  host.ctx.setLineDash([4, 4]);
  host.ctx.strokeRect(left + .5, y + .5, width - 1, height - 1);
  host.ctx.restore();
  host.drawText(
    `发起人：${card.creatorName}${card.isMine ? '（我）' : ''}`,
    left + 12,
    y + 25,
    11,
    { bold: true },
  );
  host.drawText(card.status, left + width - 12, y + 25, 9, {
    align: 'right',
    color: card.status === '待应战' || card.status === '进行中' ? '#b5121b' : '#7d6b60',
  });
  host.drawText(
    [card.realm, card.realmStage].filter(Boolean).join(' '),
    left + 12,
    y + 48,
    9,
    { color: '#5a4a42' },
  );
  host.drawText(`押注物品：${card.stake}`, left + 12, y + 71, 9, {
    color: '#5a4a42',
  });
  host.drawWrappedText(
    `狠话：「${card.taunt || '暂无'}」`,
    left + 12,
    y + 92,
    width - 24,
    17,
    1,
    9,
    { color: '#5a4a42' },
  );
  host.drawText(
    `规则：限制境界 ${card.minRealm}-${card.maxRealm}`,
    left + 12,
    y + 119,
    8,
    { color: '#7d6b60' },
  );
  host.drawText(card.remain, left + width - 12, y + 119, 8, {
    align: 'right',
    color: card.remain.includes('0时') ? '#b5121b' : '#7d6b60',
  });
  const actionWidth = Math.min(68, (width - 24) / Math.max(1, card.actions.length));
  const startX = left + width - 10 - card.actions.length * (actionWidth + 6) + 6;
  card.actions.forEach((item, index) =>
    host.addButton(
      item.id,
      item.label,
      { x: startX + index * (actionWidth + 6), y: y + 126, width: actionWidth, height: 27 },
      item.action,
      item.primary,
      item.enabled,
    ),
  );
  return y + height + 10;
};

(
  globalThis as typeof globalThis & {
    __daoyouArenaRuntime?: {
      drawEntrance: typeof drawEntrance;
      drawTeams: typeof drawTeams;
      drawBetHeader: typeof drawBetHeader;
      drawBetCard: typeof drawBetCard;
    };
  }
).__daoyouArenaRuntime = { drawEntrance, drawTeams, drawBetHeader, drawBetCard };
