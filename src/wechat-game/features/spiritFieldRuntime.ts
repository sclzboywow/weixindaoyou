type Row = Record<string, unknown>;
type Rect = { x: number; y: number; width: number; height: number };

// 对齐官网移动端：正文约 14px、辅助文字约 12px、主要名称约 16px。
// NativeApp 会在窄屏上再应用 1px 的可读性补偿。
const FIELD_FONT = {
  meta: 13,
  small: 11,
  body: 13,
  item: 14,
} as const;
const PLOT_HEIGHT = 112;
const PLOT_STEP = 122;
type Host = {
  ctx: CanvasRenderingContext2D;
  width: number;
  busy: boolean;
  notice: string;
  sceneScroll: number;
  officialSceneKey: string | null;
  officialSceneData: Record<string, unknown>;
  officialSceneErrors: Record<string, string>;
  buttons: Array<{ id: string; label: string; rect: Rect; action(): void }>;
  api: {
    get(path: string): Promise<unknown>;
    post(path: string, body: unknown): Promise<unknown>;
  };
  render(): void;
  run(task: () => Promise<void>): Promise<void>;
  loadOfficialScene(): Promise<void>;
  drawOfficialSubpageHeader(
    left: number,
    width: number,
    y: number,
    title: string,
    description: string,
  ): number;
  drawText(
    text: string,
    x: number,
    y: number,
    size: number,
    options?: Row,
  ): void;
  drawWrappedText(
    text: string,
    x: number,
    y: number,
    width: number,
    lineHeight: number,
    maxLines: number,
    size: number,
    options?: Row,
  ): number;
  addButton(
    id: string,
    label: string,
    rect: Rect,
    action: () => void,
    primary?: boolean,
    enabled?: boolean,
  ): void;
  drawAuctionChoiceField(
    id: string,
    label: string,
    value: string,
    rect: Rect,
    options: Array<{ value: string; label: string }>,
    selectedValue: string,
    onSelect: (value: string) => void,
  ): void;
  openConfirm(options: {
    title: string;
    lines: string[];
    confirmLabel: string;
    cancelLabel: string;
    onConfirm(): void;
  }): void;
  finishSceneScroll(top: number, bottom: number, contentEndY: number): void;
};

const rows = (value: unknown): Row[] =>
  Array.isArray(value)
    ? value.filter((item): item is Row =>
        Boolean(item && typeof item === 'object'),
      )
    : [];
const row = (value: unknown): Row | null =>
  value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Row)
    : null;
const text = (value: unknown, fallback = '') =>
  typeof value === 'string' ? value : fallback;
const num = (value: unknown, fallback = 0) =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback;
const bool = (value: unknown) => value === true;
const strings = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
const stageNames: Row = {
  germination: '萌芽期',
  nourishing: '蕴灵期',
  forming: '成型期',
};
const statusNames: Row = {
  empty: '空田',
  awaiting_cultivation: '静候施为',
  growing: '生长中',
  ready_to_harvest: '待摘取',
};
const affinityNames: Row = {
  excellent: '天性相合',
  good: '灵机相契',
  neutral: '平稳承纳',
  strained: '灵机滞涩',
};
const itemKinds = new Set(['herb', 'ore', 'monster', 'tcdb', 'aux', 'pill']);
const qualityColors: Row = {
  凡品: '#5a4a42',
  灵品: '#078675',
  玄品: '#1684a5',
  地品: '#8550aa',
  天品: '#c18b00',
  仙品: '#c1121f',
};
const state = {
  selected: 0,
  resources: {} as Record<string, string>,
  host: null as Host | null,
  timer: null as ReturnType<typeof setInterval> | null,
  ticks: 0,
};

function duration(ms: number) {
  const minutes = Math.max(1, Math.ceil(ms / 60_000));
  return minutes < 60
    ? `约 ${minutes} 分钟`
    : `约 ${Math.floor(minutes / 60)} 小时${minutes % 60 ? ` ${minutes % 60} 分钟` : ''}`;
}

function requestId(prefix: string) {
  return `${prefix}:${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

function unwrap(value: unknown): Row | null {
  const outer = row(value);
  return row(outer?.data) ?? outer;
}

function card(host: Host, rect: Rect, active = false) {
  host.ctx.fillStyle = active
    ? 'rgba(193,18,31,.045)'
    : 'rgba(248,243,230,.72)';
  host.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  host.ctx.save();
  host.ctx.strokeStyle = active ? 'rgba(193,18,31,.55)' : 'rgba(44,24,16,.16)';
  host.ctx.setLineDash([4, 4]);
  host.ctx.strokeRect(
    rect.x + 0.5,
    rect.y + 0.5,
    rect.width - 1,
    rect.height - 1,
  );
  host.ctx.restore();
}

function liveTiming(plot: Row) {
  const started = Date.parse(text(plot.stageStartedAt));
  const ends = Date.parse(text(plot.stageEndsAt));
  if (Number.isFinite(started) && Number.isFinite(ends) && ends > started) {
    return {
      remaining: Math.max(0, ends - Date.now()),
      progress: Math.max(
        0,
        Math.min(1, (Date.now() - started) / (ends - started)),
      ),
    };
  }
  return { remaining: num(plot.remainingMs), progress: num(plot.progress) };
}

async function refresh(host: Host) {
  host.officialSceneData.snapshot = await host.api.get('/api/spirit-field');
  host.render();
}

function action(
  host: Host,
  path: string,
  body: unknown,
  message: string,
  resultKind = '',
) {
  if (host.busy) return;
  void host.run(async () => {
    const response =
      path === '/api/spirit-field/starter'
        ? await host.api.post('/api/spirit-field/starter', body)
        : path === '/api/spirit-field/sow'
          ? await host.api.post('/api/spirit-field/sow', body)
          : path === '/api/spirit-field/cultivate'
            ? await host.api.post('/api/spirit-field/cultivate', body)
            : await host.api.post('/api/spirit-field/harvest', body);
    const result = unwrap(response) ?? {};
    await refresh(host);
    host.notice = message;
    if (resultKind === 'cultivate') {
      host.openConfirm({
        title: `${text(result.methodName, '培育完成')} · ${text(affinityNames[text(result.affinity)], '灵机已动')}`,
        lines: [
          text(result.feedback, '灵田中的气机已经改变。'),
          `本阶段预计需要${duration(num(result.durationMs))}。阶段结束前无需重复操作。`,
        ],
        confirmLabel: '记下变化',
        cancelLabel: '关闭',
        onConfirm() {},
      });
    } else if (resultKind === 'harvest') {
      host.openConfirm({
        title: `${text(result.name, '造化产物')} · ${text(result.quality)}`,
        lines: [
          text(result.description, '三度造化已成。'),
          `收获 ×${num(result.quantity, 1)}${bool(result.mutated) ? '，造化升品' : bool(result.degraded) ? '，灵韵稍退' : ''}`,
        ],
        confirmLabel: '收入囊中',
        cancelLabel: '关闭',
        onConfirm() {},
      });
    }
  });
}

function ensureTimer(host: Host) {
  state.host = host;
  if (state.timer) return;
  state.timer = setInterval(() => {
    const current = state.host;
    if (!current || current.officialSceneKey !== 'spirit-field') {
      if (state.timer) clearInterval(state.timer);
      state.timer = null;
      return;
    }
    state.ticks += 1;
    if (state.ticks % 15 === 0 && !current.busy) void refresh(current);
    else current.render();
  }, 1_000);
}

function render(hostValue: unknown, top: number, bottom: number): boolean {
  const host = hostValue as Host;
  if (host.officialSceneKey !== 'spirit-field') return false;
  ensureTimer(host);
  const snapshot = unwrap(host.officialSceneData.snapshot);
  const left = 20;
  const width = host.width - 40;
  let y = top - host.sceneScroll;
  host.ctx.save();
  host.ctx.beginPath();
  host.ctx.rect(12, top, host.width - 24, bottom - top);
  host.ctx.clip();
  y = host.drawOfficialSubpageHeader(
    left,
    width,
    y,
    '灵田',
    '播种、观察、养护与采收都在这片个人药圃中完成。',
  );
  if (!snapshot) {
    const error = text(
      host.officialSceneErrors.snapshot,
      '正推开洞府药圃的竹门……',
    );
    host.drawText(error, left, y + 24, FIELD_FONT.body, {
      color: '#8b302d',
      sans: true,
    });
    host.addButton(
      'spirit-field-retry',
      '再看看',
      { x: left, y: y + 44, width, height: 40 },
      () => void host.run(() => refresh(host)),
      true,
      !host.busy,
    );
    y += 98;
    host.ctx.restore();
    host.finishSceneScroll(top, bottom, y);
    return true;
  }
  const player = row(snapshot.player) ?? {};
  const profile = row(snapshot.profile) ?? {};
  host.drawText(
    `境界：${text(player.realm)} · 天地灵气：${num(player.qi)}/${num(player.qiMax)}`,
    left,
    y + 17,
    FIELD_FONT.meta,
    { color: '#5a4a42', sans: true },
  );
  host.drawText(
    `法力：${num(player.mp)}/${num(player.mpMax)} · 成功收获：${num(profile.successfulHarvestCount)}`,
    left,
    y + 38,
    FIELD_FONT.meta,
    { color: '#5a4a42', sans: true },
  );
  y += 52;
  const plots = rows(snapshot.plots);
  const gap = 8;
  const plotWidth = (width - gap) / 2;
  plots.forEach((plot, index) => {
    const col = index % 2,
      line = Math.floor(index / 2);
    const x = left + col * (plotWidth + gap),
      py = y + line * PLOT_STEP;
    const active = num(plot.index, index) === state.selected;
    card(host, { x, y: py, width: plotWidth, height: PLOT_HEIGHT }, active);
    host.drawText(
      `第 ${num(plot.index, index) + 1} 畦`,
      x + 10,
      py + 23,
      FIELD_FONT.small,
      {
        color: '#5a4a42',
        sans: true,
      },
    );
    host.drawText(
      text(statusNames[text(plot.status)], text(plot.status)),
      x + plotWidth - 10,
      py + 23,
      FIELD_FONT.small,
      { align: 'right', color: active ? '#c1121f' : '#5a4a42', sans: true },
    );
    const plant = row(plot.plant);
    host.drawText(
      text(plant?.seedName, '空田'),
      x + 10,
      py + 53,
      FIELD_FONT.item,
      {
        bold: true,
        sans: true,
      },
    );
    const stage = text(plot.stage);
    if (stage) {
      const timing = liveTiming(plot);
      host.drawText(
        `${text(stageNames[stage], stage)}${text(plot.status) === 'growing' ? ` · ${duration(timing.remaining)}` : ''}`,
        x + 10,
        py + 78,
        FIELD_FONT.small,
        { color: '#5a4a42', sans: true },
      );
      if (text(plot.status) === 'growing') {
        host.ctx.fillStyle = 'rgba(44,24,16,.1)';
        host.ctx.fillRect(x + 10, py + 96, plotWidth - 20, 5);
        host.ctx.fillStyle = '#c1121f';
        host.ctx.fillRect(
          x + 10,
          py + 96,
          (plotWidth - 20) * timing.progress,
          5,
        );
      }
    }
    host.buttons.push({
      id: `spirit-plot-${index}`,
      label: `第 ${index + 1} 畦`,
      rect: { x, y: py, width: plotWidth, height: PLOT_HEIGHT },
      action: () => {
        state.selected = num(plot.index, index);
        host.sceneScroll = 0;
        host.render();
      },
    });
  });
  y += Math.ceil(plots.length / 2) * PLOT_STEP + 10;
  const selected =
    plots.find((plot) => num(plot.index) === state.selected) ?? plots[0];
  if (selected) {
    state.selected = num(selected.index);
    card(host, { x: left, y, width, height: 68 }, false);
    host.drawText(
      `第 ${state.selected + 1} 畦 · ${text(statusNames[text(selected.status)], text(selected.status))}`,
      left + 12,
      y + 27,
      FIELD_FONT.item,
      { bold: true, sans: true },
    );
    host.drawText(
      text(row(selected.plant)?.seedName, '尚未播种'),
      left + 12,
      y + 52,
      FIELD_FONT.small,
      { color: '#5a4a42', sans: true },
    );
    y += 80;
    const plant = row(selected.plant);
    if (!plant) {
      host.drawText(
        '选择一枚灵种播下。种子的隐秘习性不会直接公开。',
        left,
        y + 16,
        FIELD_FONT.body,
        { color: '#5a4a42', sans: true },
      );
      y += 34;
      const seeds = rows(snapshot.seeds).filter(
        (seed) => num(seed.quantity) > 0,
      );
      if (!seeds.length) {
        host.drawText('暂无可播种灵种。', left, y + 20, FIELD_FONT.body, {
          color: '#5a4a42',
          sans: true,
        });
        y += 46;
      }
      seeds.forEach((seed, index) => {
        const h = 106;
        const seedRect = { x: left, y, width, height: h };
        const canPlant = bool(seed.canPlant);
        const seedName = text(seed.name, '未知灵种');
        const minRealm = text(seed.minRealm, '更高境界');
        const sowSeed = () =>
          action(
            host,
            '/api/spirit-field/sow',
            {
              plotIndex: state.selected,
              seedMaterialId: text(seed.materialId),
            },
            '灵种已经落土',
          );
        card(host, seedRect);
        host.drawText(
          `${seedName} · ×${num(seed.quantity)}`,
          left + 10,
          y + 22,
          FIELD_FONT.item,
          { bold: true, sans: true },
        );
        host.drawText(
          `${text(seed.quality)} · ${text(seed.element, '无相')} · ${canPlant ? '可播种' : `需${minRealm}`}`,
          left + 10,
          y + 43,
          FIELD_FONT.small,
          {
            color: text(qualityColors[text(seed.quality)], '#5a4a42'),
            sans: true,
          },
        );
        host.drawWrappedText(
          strings(seed.clues).join('；'),
          left + 10,
          y + 62,
          width - 118,
          18,
          2,
          FIELD_FONT.small,
          { color: '#5a4a42', sans: true },
        );
        const cardHitTop = Math.max(seedRect.y, top);
        const cardHitBottom = Math.min(seedRect.y + seedRect.height, bottom);
        if (cardHitBottom > cardHitTop) {
          host.buttons.push({
            id: `spirit-seed-card-${index}`,
            label: seedName,
            rect: {
              x: seedRect.x,
              y: cardHitTop,
              width: seedRect.width,
              height: cardHitBottom - cardHitTop,
            },
            action: canPlant
              ? sowSeed
              : () => {
                  host.notice = `当前境界为${text(player.realm, '未知')}，需达到${minRealm}方可播种【${seedName}】`;
                  host.render();
                },
          });
        }
        host.addButton(
          `spirit-sow-${index}`,
          canPlant ? '播下' : '境界不足',
          { x: left + width - 98, y: y + 56, width: 88, height: 40 },
          sowSeed,
          true,
          !host.busy && canPlant,
        );
        y += h + 8;
      });
    } else {
      host.drawText(
        `${text(plant.seedName)} · ${text(plant.quality)} · ${text(plant.element)}`,
        left,
        y + 20,
        FIELD_FONT.item,
        {
          bold: true,
          color: text(qualityColors[text(plant.quality)], '#2c1810'),
          sans: true,
        },
      );
      const descriptionLines = host.drawWrappedText(
        text(plant.seedDescription),
        left,
        y + 45,
        width,
        21,
        3,
        FIELD_FONT.body,
        { color: '#5a4a42', sans: true },
      );
      y += 48 + descriptionLines * 21;
      const clues = Array.isArray(plant.clues)
        ? plant.clues.map(String).join('；')
        : '';
      if (clues) {
        const lines = host.drawWrappedText(
          clues,
          left,
          y + 12,
          width,
          19,
          2,
          FIELD_FONT.small,
          { color: '#5a4a42', sans: true },
        );
        y += 18 + lines * 19;
      }
      rows(selected.history).forEach((entry) => {
        host.drawText(
          `${text(stageNames[text(entry.stage)], text(entry.stage))} · ${text(affinityNames[text(entry.affinity)], '灵机已动')}`,
          left,
          y + 17,
          FIELD_FONT.small,
          { color: '#c1121f', sans: true },
        );
        const lines = host.drawWrappedText(
          text(entry.feedback),
          left,
          y + 38,
          width,
          20,
          2,
          FIELD_FONT.small,
          { color: '#5a4a42', sans: true },
        );
        y += 46 + lines * 20;
      });
      if (text(selected.status) === 'awaiting_cultivation') {
        host.drawWrappedText(
          `灵机已停在${text(stageNames[text(selected.stage)], '当前阶段')}，选定一次培育方式后才会继续生长。`,
          left,
          y + 16,
          width,
          20,
          2,
          FIELD_FONT.body,
          { color: '#5a4a42', sans: true },
        );
        y += 54;
        rows(selected.methods).forEach((method, index) => {
          const kind = text(method.resourceKind),
            cost = row(method.cost) ?? {};
          const needsItem = itemKinds.has(kind);
          const candidates = rows(snapshot.resources).filter(
            (resource) => text(resource.kind) === kind,
          );
          const selectedResource = state.resources[text(method.id)] ?? '';
          const h = needsItem ? 178 : 130;
          card(host, { x: left, y, width, height: h });
          host.drawText(text(method.name), left + 10, y + 24, FIELD_FONT.item, {
            bold: true,
            sans: true,
          });
          host.drawWrappedText(
            text(method.description),
            left + 10,
            y + 44,
            width - 20,
            19,
            2,
            FIELD_FONT.small,
            { color: '#5a4a42', sans: true },
          );
          if (needsItem) {
            const options = [
              { value: '', label: '选择投入物' },
              ...candidates.map((resource) => ({
                value: text(resource.id),
                label: `${text(resource.name)} · ${text(resource.quality)} ×${num(resource.quantity)}`,
              })),
            ];
            const selectedLabel =
              options.find((option) => option.value === selectedResource)
                ?.label ?? '选择投入物';
            host.drawAuctionChoiceField(
              `spirit-resource-${text(method.id)}`,
              '投入物',
              selectedLabel,
              { x: left + 10, y: y + 72, width: width - 20, height: 58 },
              options,
              selectedResource,
              (value) => {
                state.resources[text(method.id)] = value;
                host.render();
              },
            );
          }
          const costText =
            kind === 'none'
              ? '无需额外资源'
              : kind === 'qi'
                ? `天地灵气 ${num(cost.amount)}`
                : kind === 'mp'
                  ? `法力 ${num(cost.amount)}`
                  : kind === 'spirit_stones'
                    ? `灵石 ${num(cost.amount)}`
                    : `${num(cost.amount)} 份所选物品${num(cost.spiritStones) ? ` + 灵石 ${num(cost.spiritStones)}` : ''}`;
          host.addButton(
            `spirit-cultivate-${index}`,
            `确认施为 · ${costText}`,
            { x: left + 10, y: y + h - 46, width: width - 20, height: 38 },
            () =>
              action(
                host,
                '/api/spirit-field/cultivate',
                {
                  plotIndex: state.selected,
                  method: text(method.id),
                  resourceId: selectedResource || undefined,
                  requestId: requestId('cultivate'),
                },
                '培育已完成，灵植开始生长',
                'cultivate',
              ),
            true,
            !host.busy && (!needsItem || Boolean(selectedResource)),
          );
          y += h + 9;
        });
      } else if (text(selected.status) === 'growing') {
        host.drawWrappedText(
          '这一阶段正在自行生长，无需反复照料。待倒计时结束后再回来决定下一步。',
          left,
          y + 18,
          width,
          21,
          3,
          FIELD_FONT.body,
          { color: '#5a4a42', sans: true },
        );
        y += 76;
      } else if (text(selected.status) === 'ready_to_harvest') {
        host.drawWrappedText(
          '三度造化已定，最终形态不可逆转。采摘后才会揭晓它成为灵草、天材地宝还是灵果。',
          left,
          y + 18,
          width,
          21,
          3,
          FIELD_FONT.body,
          { color: '#5a4a42', sans: true },
        );
        y += 72;
        host.addButton(
          'spirit-harvest',
          '采摘造化产物',
          { x: left, y, width, height: 42 },
          () =>
            action(
              host,
              '/api/spirit-field/harvest',
              { plotIndex: state.selected, requestId: requestId('harvest') },
              '造化产物已经收入储物袋',
              'harvest',
            ),
          true,
          !host.busy,
        );
        y += 54;
      }
    }
  }
  y += 8;
  host.drawWrappedText(
    '储物袋中的灵种只显露些许天性，真正形态要等三度造化走完才会揭晓。',
    left,
    y + 16,
    width,
    20,
    2,
    FIELD_FONT.small,
    { color: '#5a4a42', sans: true },
  );
  y += 52;
  if (!bool(profile.starterClaimed)) {
    host.addButton(
      'spirit-starter',
      '领取初始灵种',
      { x: left, y, width, height: 42 },
      () =>
        action(host, '/api/spirit-field/starter', {}, '初始灵种已经收入储物袋'),
      true,
      !host.busy,
    );
    y += 54;
  } else {
    const seeds = rows(snapshot.seeds).filter((seed) => num(seed.quantity) > 0);
    if (!seeds.length) {
      host.drawText('暂无灵种。', left, y + 18, FIELD_FONT.body, {
        color: '#5a4a42',
        sans: true,
      });
      y += 42;
    }
    seeds.forEach((seed) => {
      host.drawText(
        `${text(seed.name)} · ${text(seed.quality)}`,
        left,
        y + 18,
        FIELD_FONT.body,
        { sans: true },
      );
      host.drawText(
        `×${num(seed.quantity)}`,
        left + width,
        y + 18,
        FIELD_FONT.body,
        {
          align: 'right',
          color: '#5a4a42',
          sans: true,
        },
      );
      y += 31;
    });
  }
  host.ctx.restore();
  host.finishSceneScroll(top, bottom, y + 10);
  return true;
}

(
  globalThis as typeof globalThis & {
    __daoyouSpiritFieldRuntime?: {
      render(host: unknown, top: number, bottom: number): boolean;
    };
  }
).__daoyouSpiritFieldRuntime = { render };
