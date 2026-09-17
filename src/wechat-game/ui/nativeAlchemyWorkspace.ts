import {
  describeAppearanceTendency,
  describeBatchOmen,
  describeEssenceState,
  describeFireState,
  describeFormulaObservation,
} from '../../react-app/components/feature/alchemy/alchemyPresentation';
import { ALCHEMY_INTENT_SUGGESTIONS } from '../../react-app/lib/alchemy/alchemyIntentSuggestions';
import {
  ALCHEMY_MAX_DOSE,
  CREATION_INPUT_CONSTRAINTS,
} from '../../shared/engine/creation-v2/config/CreationBalance';
import { formatAlchemyPropertyVector } from '../../shared/lib/alchemyProperties';
import { getPillAppearanceLabel } from '../../shared/lib/pillAppearance';
import type {
  FormulaAnalysisResult,
  PillAppearanceGrade,
  WeightedAlchemyProperty,
} from '../../shared/types/consumable';
import { normalizeNativeCanvasText } from './nativeEmoji';

type Data = Record<string, unknown>;
type Rect = { x: number; y: number; width: number; height: number };
const record = (value: unknown): Data =>
  value && typeof value === 'object' ? (value as Data) : {};
const list = (value: unknown): Data[] =>
  Array.isArray(value) ? value.map(record) : [];
const str = (value: unknown) => (typeof value === 'string' ? value : '');
const num = (value: unknown) =>
  typeof value === 'number' && Number.isFinite(value) ? value : 0;
const INK = '#2c1810',
  MUTED = '#5a4a42',
  RED = '#c1121f',
  RULE = 'rgba(44,24,16,.15)';
const families: Record<string, string> = {
  healing: '疗伤',
  mana: '回元',
  detox: '解毒',
  cultivation: '修为',
  insight: '感悟',
  breakthrough: '破境',
  tempering: '炼体',
  marrow_wash: '洗髓',
  longevity: '延寿',
  hybrid: '复合',
};

export interface NativeAlchemyView {
  mode: string;
  busy: boolean;
  firing: number;
  prompt: string;
  formulaId: string;
  selectedFormula: Data | null;
  formulas: Data[];
  pagination: Data;
  picker: boolean;
  search: string;
  family: string;
  doses: Record<string, number>;
  materials: Data[];
  preview: Data | null;
  analysis: Data | null;
  result: Data | null;
}
export interface NativeAlchemyDrawing {
  font: string;
  qualityColor(quality: string): string;
  text(
    value: string,
    x: number,
    y: number,
    size: number,
    color?: string,
    align?: CanvasTextAlign,
  ): void;
  paragraph(
    value: string,
    x: number,
    y: number,
    width: number,
    size: number,
    color?: string,
  ): number;
  button(
    id: string,
    label: string,
    rect: Rect,
    action: () => void,
    primary: boolean,
    enabled: boolean,
  ): void;
  hit(id: string, rect: Rect, action: () => void): void;
  select(
    rect: Rect,
    value: string,
    options: Array<{ value: string; label: string }>,
    onSelect: (value: string) => void,
  ): void;
  action(name: string, value?: string): void;
  materialInfo(material: Data): { icon: string; label: string };
  pill(item: Data): {
    primaryEffect: string;
    keywordLabels: string[];
    flavorText: string;
    appearance?: { label: string };
  } | null;
}

/** Canvas counterpart of the official FurnaceWorkspace; economics stay in /api/craft. */
export function drawNativeAlchemyWorkspace(
  ctx: CanvasRenderingContext2D,
  rect: Rect,
  state: NativeAlchemyView,
  ui: NativeAlchemyDrawing,
): number {
  const { x, width } = rect;
  let y = rect.y;
  const text = ui.text;
  const paragraph = (value: string, color = MUTED, size = 13, inset = 16) => {
    y +=
      ui.paragraph(value, x + inset, y + 20, width - inset * 2, size, color) +
      12;
  };
  const rule = () => {
    ctx.strokeStyle = RULE;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.stroke();
  };
  const button = (
    name: string,
    label: string,
    bx = x,
    bw = width,
    primary = false,
    enabled = true,
    value?: string,
  ) =>
    ui.button(
      `alchemy-${name}-${value ?? ''}`,
      label,
      { x: bx, y, width: bw, height: 42 },
      () => ui.action(name, value),
      primary,
      enabled && !state.busy && !state.firing,
    );
  const heading = (value: string) => {
    text(value, x, y + 22, 16, INK);
    y += 42;
  };
  const formula =
    state.formulas.find((item) => item.id === state.formulaId) ??
    state.selectedFormula;
  const doses = Object.values(state.doses).reduce(
    (sum, value) => sum + value,
    0,
  );
  const count = Object.keys(state.doses).length;
  const cost = record(state.preview?.cost);
  const validation = record(state.preview?.validation);
  const canFire =
    state.preview?.canAfford !== false && validation.valid !== false;

  if (state.picker) {
    ctx.fillStyle = '#f8f3e6';
    ctx.fillRect(x - 8, y - 8, width + 16, Math.max(rect.height, 600));
    text('选择本炉丹方', x + width / 2, y + 26, 20, INK, 'center');
    y += 48;
    paragraph('查看丹药用途、材料要求和熟练度，点击一行即可选择。');
    button('formula-search', state.search || '搜索丹方名称', x, width * 0.57);
    ui.select(
      { x: x + width * 0.6, y, width: width * 0.4, height: 42 },
      state.family,
      [
        { value: 'all', label: '全部用途' },
        ...Object.entries(families).map(([value, label]) => ({ value, label })),
      ],
      (value) => ui.action('family', value),
    );
    y += 58;
    if (!state.formulas.length) paragraph('暂无符合条件的丹方。');
    for (const item of state.formulas) {
      const start = y;
      const pattern = record(item.pattern),
        mastery = record(item.mastery);
      heading(str(item.name));
      paragraph(families[str(item.family)] || '丹方', RED);
      paragraph(str(item.description));
      paragraph(
        `材料数量 ${num(pattern.slotCount)} 味 · 最低品质 ${str(pattern.minQuality) || '不限'} · 熟练度 Lv.${num(mastery.level)}`,
      );
      if (pattern.dominantElement)
        paragraph(`主要属性：${str(pattern.dominantElement)}`);
      if (Array.isArray(pattern.targetPropertyVector))
        paragraph(
          `药效方向：${formatAlchemyPropertyVector(pattern.targetPropertyVector as WeightedAlchemyProperty[])}`,
        );
      ui.button(
        `alchemy-select-${item.id}`,
        state.formulaId === item.id ? '当前选择' : '选择此方',
        { x, y, width, height: 40 },
        () => ui.action('select', str(item.id)),
        state.formulaId === item.id,
        !state.busy,
      );
      y += 54;
      if (!state.busy)
        ui.hit(
          `alchemy-formula-row-${item.id}`,
          { x, y: start, width, height: y - start - 10 },
          () => ui.action('select', str(item.id)),
        );
      ctx.strokeStyle = RULE;
      ctx.strokeRect(x, start, width, y - start - 10);
    }
    const page = num(state.pagination.page) || 1,
      pages = num(state.pagination.totalPages) || 1;
    button(
      'formula-page',
      '上一页',
      x,
      width / 3,
      false,
      page > 1,
      String(page - 1),
    );
    text(`${page} / ${pages}`, x + width / 2, y + 27, 12, MUTED, 'center');
    button(
      'formula-page',
      '下一页',
      x + (width * 2) / 3,
      width / 3,
      false,
      page < pages,
      String(page + 1),
    );
    y += 54;
    return y + 12;
  }

  text(
    '[← 玄火丹炉]',
    x + 8,
    y + 35,
    16,
    state.busy || state.firing ? '#a89e91' : MUTED,
  );
  if (!state.busy && !state.firing)
    ui.hit('alchemy-back', { x, y, width: width * 0.45, height: 52 }, () =>
      ui.action('back'),
    );
  text(
    state.result
      ? '查看炼制结果'
      : state.mode === 'formula'
        ? '按照丹方炼制'
        : '随心炼丹',
    x + width,
    y + 35,
    16,
    INK,
    'right',
  );
  y += 74;
  rule();
  y += 24;

  if (state.firing) {
    const elapsed = Math.max(0, Date.now() - state.firing);
    const scale = Math.min(1.3, width / 340);
    y += 18 * (scale - 1);
    const height = 496 * scale;
    const cx = x + width / 2,
      cy = y + 160 * scale;
    ctx.save();
    const glow = ctx.createRadialGradient(
      cx,
      y + height * 0.65,
      0,
      cx,
      y + height * 0.65,
      width * 0.65,
    );
    glow.addColorStop(0, 'rgba(145,36,36,.16)');
    glow.addColorStop(1, 'rgba(145,36,36,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(x, y, width, height);
    ctx.strokeStyle = 'rgba(193,18,31,.25)';
    ctx.setLineDash([]);
    ctx.strokeRect(x, y, width, height);
    [104, 84, 56].forEach((radius, index) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((elapsed / (index === 0 ? 12000 : -8000)) * Math.PI * 2);
      ctx.setLineDash(index === 0 ? [2, 3] : []);
      ctx.strokeStyle =
        index === 1 ? 'rgba(44,24,16,.12)' : 'rgba(193,18,31,.4)';
      ctx.beginPath();
      ctx.arc(0, 0, radius * scale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    });
    text('鼎', cx, cy + 18 * scale, 48 * scale, RED, 'center');
    text(
      '地 火 回 环 · 药 蕴 聚 合',
      cx,
      y + 310 * scale,
      12 * scale,
      RED,
      'center',
    );
    text('正在炼制，请稍候', cx, y + 348 * scale, 20 * scale, INK, 'center');
    const statuses =
      state.mode === 'formula'
        ? [
            '炉门闭合，地火正沿丹方阵纹攀升……',
            '炉腹轰鸣，杂气正按既定火路逐层煅去……',
            '药蕴回旋，丹药正在不同火层中凝形……',
          ]
        : [
            '炉门闭合，陌生药气正在火中交汇……',
            '炉腹轰鸣，材料正在火中发生未知变化……',
            '炉火渐稳，最终结果仍要等开鼎才能知晓……',
          ];
    ui.paragraph(
      statuses[elapsed < 700 ? 0 : elapsed < 1500 ? 1 : 2]!,
      x + 24,
      y + 387 * scale,
      width - 48,
      14 * scale,
      MUTED,
    );
    ['处理材料', '汇聚药力', '凝结丹药', '完成炼制'].forEach((label, index) =>
      text(
        label,
        x + (width * (index + 0.5)) / 4,
        y + height - 58 * scale,
        11 * scale,
        index === 1 ? RED : MUTED,
        'center',
      ),
    );
    ctx.restore();
    return y + height + 20;
  }

  if (state.result) {
    const result = state.result,
      profile = record(result.yieldProfile);
    const items = list(
      result.craftedConsumables ??
        result.consumables ??
        (result.consumable ? [result.consumable] : []),
    );
    const total = items.reduce((sum, item) => sum + num(item.quantity), 0);
    ctx.fillStyle = 'rgba(136,97,45,.075)';
    ctx.fillRect(x, y, width, 130);
    text('炼制完成', x + width / 2, y + 27, 12, '#88612d', 'center');
    ['成丹总数', '丹品批次', '主丹品阶'].forEach((label, index) => {
      const cx = x + (width * (index + 0.5)) / 3;
      text(label, cx, y + 65, 11, MUTED, 'center');
      text(
        [
          `${total} 枚`,
          `${items.length} 批`,
          str(profile.primaryQuality ?? items[0]?.quality) || '未定',
        ][index]!,
        cx,
        y + 99,
        18,
        '#88612d',
        'center',
      );
    });
    y += 154;
    heading('成丹清单');
    paragraph(`本炉所得，一览于此 · 共 ${items.length} 批，合计 ${total} 枚`);
    for (const [index, item] of items.entries()) {
      const start = y,
        pill = ui.pill(item),
        spec = record(item.spec);
      ctx.fillStyle =
        index === 0 ? 'rgba(136,97,45,.07)' : 'rgba(248,243,230,.45)';
      // Content height is measured before painting the backing, so no text is clipped.
      const paint = () => {
        text(
          index === 0 ? '主' : `副${index}`,
          x + 36,
          y + 34,
          14,
          '#88612d',
          'center',
        );
        ctx.strokeStyle = RULE;
        ctx.beginPath();
        ctx.arc(x + 36, y + 29, 22, 0, Math.PI * 2);
        ctx.stroke();
        y += 68;
        paragraph(str(item.name), INK, 16);
        paragraph(
          [
            pill?.appearance?.label,
            families[str(spec.family)],
            str(item.quality),
          ]
            .filter(Boolean)
            .join(' · '),
          ui.qualityColor(str(item.quality)),
          12,
        );
        if (pill) {
          paragraph(`主要药效：${pill.primaryEffect}`, INK);
          if (pill.keywordLabels.length)
            paragraph(pill.keywordLabels.join(' · '), '#18766b', 12);
          if (pill.flavorText) paragraph(pill.flavorText, MUTED, 12);
        } else paragraph(str(item.description));
        y += 6;
        rule();
        text('本批所得', x + 16, y + 32, 12, MUTED);
        text(
          `×${num(item.quantity)}`,
          x + width - 16,
          y + 36,
          24,
          '#88612d',
          'right',
        );
        y += 54;
      };
      paint();
      ctx.strokeStyle = RULE;
      ctx.strokeRect(x, start, width, y - start);
      y += 16;
    }
    if (result.yieldProfile) {
      heading('药蕴损耗');
      paragraph(`${Math.round(num(profile.essenceLossRatio) * 100)}%`);
      heading('各品相所得');
      paragraph(
        list(profile.lots)
          .map(
            (lot) =>
              `${str(lot.quality)}·${getPillAppearanceLabel(lot.appearance as PillAppearanceGrade)} ×${num(lot.quantity)}`,
          )
          .join('、'),
      );
    }
    const progress = record(result.formulaProgress);
    if (result.formulaProgress)
      paragraph(
        `丹方熟练 +${num(progress.gainedExp)}，当前 Lv.${num(progress.level)}。`,
        '#18766b',
      );
    if (result.formulaDiscovery) {
      const discovery = record(result.formulaDiscovery);
      heading('发现新丹方');
      paragraph(str(discovery.name), INK, 16);
      paragraph(str(discovery.description));
      paragraph(str(discovery.discoveryRemark));
      paragraph('保存后，今后便可按照这份丹方推演材料并重复炼制。');
      button('discovery', '不保存', x, width * 0.4, false, true, 'no');
      button(
        'discovery',
        '保存到丹方玉简',
        x + width * 0.42,
        width * 0.58,
        true,
        true,
        'yes',
      );
      y += 58;
    }
    button('room', '返回炼丹房', x, width * 0.48);
    button('again', '再炼一炉', x + width * 0.52, width * 0.48, true);
    return y + 60;
  }

  if (state.analysis) {
    const analysis = state.analysis as unknown as FormulaAnalysisResult;
    const batch = analysis.batchProfile ?? null;
    const fire = describeFireState({
      preview: batch,
      blockingReason: str(validation.blockingReason),
      canAfford: state.preview?.canAfford !== false,
    });
    const essence = describeEssenceState(batch),
      omen = describeBatchOmen(batch);
    ctx.strokeStyle = RULE;
    ctx.strokeRect(x, y, width, 285);
    ctx.beginPath();
    ctx.arc(x + width / 2, y + 90, 64, 0, Math.PI * 2);
    ctx.stroke();
    text('火', x + width / 2, y + 105, 36, RED, 'center');
    text('炼制预览', x + width / 2, y + 184, 12, RED, 'center');
    text(fire.label, x + width / 2, y + 218, 20, INK, 'center');
    ui.paragraph(fire.description, x + 20, y + 248, width - 40, 13, MUTED);
    y += 307;
    for (const [label, value, detail] of [
      ['药蕴', essence.label, essence.description],
      [
        '主丹征兆',
        batch
          ? `${batch.primaryQualityRange.min}—${batch.primaryQualityRange.max}`
          : '未显',
        omen.primary,
      ],
      [
        '同炉副丹',
        batch && batch.possibleQualities.length > 1 ? '已有分流' : '尚未分流',
        omen.secondary,
      ],
      [
        '品相倾向',
        batch ? '丹纹初现' : '未显',
        describeAppearanceTendency(batch?.appearanceHints),
      ],
    ]) {
      const start = y;
      paragraph(label!, MUTED, 12);
      paragraph(value!, INK, 18);
      paragraph(detail!);
      ctx.strokeStyle = RULE;
      ctx.strokeRect(x, start, width, y - start);
      y += 12;
    }
    const observation = describeFormulaObservation(analysis);
    if (observation) paragraph(observation);
    if (analysis.materialJudgments?.length) {
      heading('材料判断');
      for (const judgment of analysis.materialJudgments) {
        paragraph(judgment.materialName, INK);
        paragraph(judgment.reason);
        rule();
      }
    }
    for (const warning of analysis.warnings ?? []) paragraph(warning, RED);
    if (!canFire)
      paragraph(str(validation.blockingReason) || '灵石不足，无法开炉。', RED);
    heading('炼制前确认');
    for (const [label, value] of [
      ['炼法', `依方 · ${str(formula?.name) || '未定丹方'}`],
      ['材料', `${count} 味 · 共 ${doses} 份`],
      ['灵石', `${num(cost.spiritStones)} 枚`],
      ['天地灵气', `${num(cost.qi)} 点`],
      [
        '预计成丹',
        batch
          ? `${batch.totalQuantityRange.min}—${batch.totalQuantityRange.max} 枚`
          : '征兆未显',
      ],
    ]) {
      paragraph(`${label}：${value}`);
      rule();
    }
    y += 20;
    button('edit', '返回修改', x, width * 0.48);
    button('submit', '确认炼制', x + width * 0.52, width * 0.48, true, canFire);
    return y + 60;
  }

  // Preparation has its own quiet controls, not the global underlined action buttons.
  // Reference is 426 px of usable content; all spacing shares the same scale.
  const s = width / 426;
  const font = (size: number, italic = false) =>
    `${italic ? 'italic ' : ''}${size * s}px ${ui.font}`;
  const ink = (
    value: string,
    px: number,
    py: number,
    size = 18,
    color = INK,
    align: CanvasTextAlign = 'left',
    italic = false,
  ) => {
    ctx.save();
    ctx.font = font(size, italic);
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(normalizeNativeCanvasText(value), px, py);
    ctx.restore();
  };
  const lines = (value: string, available: number, size: number) => {
    ctx.save();
    ctx.font = font(size);
    const rows: string[] = [];
    for (const paragraph of value.split(/\r\n?|\n/)) {
      let row = '';
      for (const char of Array.from(paragraph)) {
        if (row && ctx.measureText(row + char).width > available) {
          // Keep closing punctuation with the preceding character.
          if (/^[，。！？；：、）》」』]$/.test(char)) {
            const tail = Array.from(row).pop()!;
            rows.push(row.slice(0, -tail.length));
            row = tail + char;
          } else {
            rows.push(row);
            row = char;
          }
        } else row += char;
      }
      rows.push(row);
    }
    ctx.restore();
    return rows;
  };
  const copy = (
    value: string,
    px: number,
    py: number,
    available: number,
    size = 18,
    color = MUTED,
    lineHeight = 30,
    center = false,
    italic = false,
  ) => {
    const rows = lines(value, available, size);
    rows.forEach((line, index) =>
      ink(
        line,
        center ? px + available / 2 : px,
        py + index * lineHeight * s,
        size,
        color,
        center ? 'center' : 'left',
        italic,
      ),
    );
    return rows.length * lineHeight * s;
  };
  const plain = (
    id: string,
    label: string,
    box: Rect,
    action: () => void,
    enabled = true,
    color = MUTED,
    size = 18,
  ) => {
    const active = enabled && !state.busy;
    ink(
      label,
      box.x + box.width / 2,
      box.y + box.height / 2 + size * s * 0.34,
      size,
      active ? color : '#b2a99a',
      'center',
    );
    if (active) ui.hit(id, box, action);
  };
  const border = (box: Rect, color = RULE, dashed = false) => {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.setLineDash(dashed ? [3 * s, 3 * s] : []);
    ctx.strokeRect(box.x + 0.5, box.y + 0.5, box.width - 1, box.height - 1);
    ctx.restore();
  };
  ink('炼 制 方 式', x, y + 20 * s, 15, MUTED);
  y += 40 * s;
  for (const [mode, label, detail] of [
    [
      'improvised',
      '随心炼丹',
      '填写炼制目标并直接尝试，结果要等开鼎后才能知晓。',
    ],
    ['formula', '依方炼制', '选择已有丹方，预览时分析本炉材料是否符合要求。'],
  ]) {
    const box = { x, y, width, height: 147 * s };
    const active = state.mode === mode;
    if (active) {
      ctx.fillStyle = 'rgba(193,18,31,.05)';
      ctx.fillRect(x, y, width, box.height);
    }
    border(box, active ? '#ff0000' : RULE);
    ink(label!, x + 21 * s, y + 46 * s, 23);
    copy(detail!, x + 21 * s, y + 87 * s, width - 42 * s);
    if (!state.busy)
      ui.hit(`alchemy-mode-${mode}`, box, () => ui.action('mode', mode));
    y += 162 * s;
  }
  y += 20 * s;
  if (state.mode === 'improvised') {
    ink('炼 制 目 标', x, y + 20 * s, 15, MUTED);
    y += 42 * s;
    const box = { x, y, width, height: 140 * s };
    border(box, RULE, true);
    const prompt = state.prompt || '例如：以温养经脉、缓复气血为主，不求猛烈。';
    ctx.save();
    ctx.beginPath();
    ctx.rect(x + 1, y + 1, width - 2, box.height - 2);
    ctx.clip();
    copy(
      prompt,
      x + 16 * s,
      y + 40 * s,
      width - 32 * s,
      20,
      state.prompt ? INK : '#a59b8c',
      32,
    );
    ctx.restore();
    if (!state.busy) ui.hit('alchemy-intent', box, () => ui.action('prompt'));
    y += box.height + 24 * s;
    ink('丹 灵 建 议', x, y + 22 * s, 15, MUTED);
    y += 40 * s;
    const suggestionGap = 12 * s;
    const suggestionWidth = (width - suggestionGap) / 2;
    ALCHEMY_INTENT_SUGGESTIONS.slice(0, 4).forEach((item, index) => {
      const column = index % 2;
      const row = Math.floor(index / 2);
      plain(
        `alchemy-suggestion-${index}`,
        `[${item.label}]`,
        {
          x: x + column * (suggestionWidth + suggestionGap),
          y: y + row * 44 * s,
          width: suggestionWidth,
          height: 38 * s,
        },
        () => ui.action('suggestion', item.prompt),
      );
    });
    y += 88 * s;
    plain(
      'alchemy-suggestions',
      '[更多建议]',
      { x, y, width: 112 * s, height: 38 * s },
      () =>
        ui.action(
          'suggestions',
          JSON.stringify(
            ALCHEMY_INTENT_SUGGESTIONS.slice(4).map((item) => ({
              value: item.prompt,
              label: item.label,
            })),
          ),
        ),
      true,
      MUTED,
      16,
    );
    ink(
      `${state.prompt.length} / 300`,
      x + width,
      y + 25 * s,
      15,
      MUTED,
      'right',
    );
    y += 44 * s;
    y +=
      copy(
        '没有丹方可供参照。丹药效果、品阶与数量都将在开鼎后揭晓。',
        x,
        y + 28 * s,
        width,
        19,
        '#a94d13',
        30,
        true,
        true,
      ) +
      20 * s;
  } else {
    const box = { x, y, width, height: 130 * s };
    border(box);
    ink('本 炉 丹 方', x + 16 * s, y + 27 * s, 15, MUTED);
    copy(
      str(formula?.name) || '尚未选择',
      x + 16 * s,
      y + 64 * s,
      width - 155 * s,
      21,
      INK,
      25,
    );
    if (formula)
      ink(
        `熟练 Lv.${num(record(formula.mastery).level)}`,
        x + 16 * s,
        y + 105 * s,
        15,
        MUTED,
      );
    plain(
      'alchemy-picker',
      formula ? '[更换丹方]' : '[选择丹方]',
      { x: x + width - 130 * s, y: y + 46 * s, width: 118 * s, height: 44 * s },
      () => ui.action('picker'),
    );
    y += 150 * s;
  }
  ink('已 选 材 料', x, y + 34 * s, 15, MUTED);
  ink(
    `${count} / ${CREATION_INPUT_CONSTRAINTS.maxMaterialKinds} 味 · 共 ${doses} 份`,
    x,
    y + 62 * s,
    18,
  );
  plain(
    'alchemy-materials',
    '[添加材料]',
    { x: x + width - 115 * s, y: y + 25 * s, width: 115 * s, height: 44 * s },
    () => ui.action('materials'),
  );
  y += 84 * s;
  if (!count) {
    border({ x, y, width, height: 92 * s }, RULE, true);
    copy(
      '炉膛尚空，请先从灵材匣中挑选本炉药材。',
      x + 16 * s,
      y + 37 * s,
      width - 32 * s,
      17,
      MUTED,
      27,
      true,
    );
    y += 108 * s;
  }
  for (const id of Object.keys(state.doses)) {
    const item = state.materials.find((material) => material.id === id);
    const dose = state.doses[id] ?? 1;
    rule();
    if (!item) {
      ink('正在辨认灵材……', x, y + 30 * s, 17, MUTED);
      plain(
        `alchemy-remove-${id}`,
        '移除',
        { x: x + width - 52 * s, y, width: 52 * s, height: 44 * s },
        () => ui.action('remove', id),
      );
      y += 66 * s;
      continue;
    }
    const info = ui.materialInfo(item),
      rank = str(item.rank ?? item.quality);
    const max = Math.min(ALCHEMY_MAX_DOSE, num(item.quantity));
    ui.text(info.icon, x + 3 * s, y + 28 * s, 18 * s);
    let name = str(item.name);
    ctx.save();
    ctx.font = font(20);
    while (name.length > 1 && ctx.measureText(name).width > width - 145 * s)
      name = name.slice(0, -1);
    const displayName = name === item.name ? name : name + '…';
    const nameWidth = ctx.measureText(displayName).width;
    ctx.restore();
    ink(displayName, x + 29 * s, y + 29 * s, 20);
    ink(rank, x + 39 * s + nameWidth, y + 29 * s, 14, ui.qualityColor(rank));
    plain(
      `alchemy-remove-${id}`,
      '移除',
      { x: x + width - 52 * s, y: y + 3 * s, width: 52 * s, height: 36 * s },
      () => ui.action('remove', id),
      true,
      MUTED,
      14,
    );
    ink(
      `${info.label} · ${str(item.element) || '无属'} · 余 ${num(item.quantity)} 份`,
      x,
      y + 54 * s,
      15,
      MUTED,
    );
    const cy = y + 70 * s,
      gx = x + 74 * s;
    ink('入炉份量', x, cy + 30 * s, 14, MUTED);
    border({ x: gx, y: cy, width: 170 * s, height: 50 * s });
    ctx.fillStyle = 'rgba(136,97,45,.035)';
    ctx.fillRect(gx + 50 * s, cy, 70 * s, 50 * s);
    for (const offset of [50, 120]) {
      ctx.strokeStyle = RULE;
      ctx.beginPath();
      ctx.moveTo(gx + offset * s, cy);
      ctx.lineTo(gx + offset * s, cy + 50 * s);
      ctx.stroke();
    }
    plain(
      `alchemy-minus-${id}`,
      '−',
      { x: gx, y: cy, width: 50 * s, height: 50 * s },
      () => ui.action('dose', `${id}:${dose - 1}`),
      dose > 1,
      INK,
      20,
    );
    plain(
      `alchemy-dose-${id}`,
      `${dose} 份`,
      { x: gx + 50 * s, y: cy, width: 70 * s, height: 50 * s },
      () => ui.action('dose-input', id),
      true,
      INK,
      17,
    );
    plain(
      `alchemy-plus-${id}`,
      '＋',
      { x: gx + 120 * s, y: cy, width: 50 * s, height: 50 * s },
      () => ui.action('dose', `${id}:${dose + 1}`),
      dose < max,
      INK,
      20,
    );
    plain(
      `alchemy-all-${id}`,
      '全部投入',
      { x: x + width - 85 * s, y: cy, width: 85 * s, height: 50 * s },
      () => ui.action('dose', `${id}:${max}`),
      dose < max,
      RED,
      14,
    );
    y += 138 * s;
  }
  if (count) {
    rule();
    y += 18 * s;
  }
  if (!canFire)
    paragraph(str(validation.blockingReason) || '灵石不足，无法开炉。', RED);
  button(
    state.mode === 'formula' ? 'analyze' : 'submit',
    state.busy
      ? '正在检查……'
      : state.mode === 'formula'
        ? '查看炼制预览'
        : '尝试炼制',
    x,
    width,
    true,
    Boolean(
      count &&
      canFire &&
      (state.mode === 'formula' ? state.formulaId : state.prompt.trim()),
    ),
  );
  return y + 60;
}

/** Same confirmation copy as useQiActionConfirm + the official alchemy session. */
drawNativeAlchemyWorkspace.confirmation = (
  mode: string,
  target: string,
  count: number,
  doses: number,
  stones: number,
  qi: number,
) => ({
  title: '天地灵气消耗',
  lines: [
    `本次${mode === 'formula' ? '依方炼制' : '随心炼制'}将消耗 ${qi} 天地灵气。`,
    `炼制方式：${mode === 'formula' ? '依方炼制' : '随心炼制'}`,
    `${mode === 'formula' ? '丹方' : '炼制目标'}：${target}`,
    `材料投入：${count} 味 · 共 ${doses} 份`,
    `灵石消耗：${stones} 枚`,
    `天地灵气：${qi} 点`,
    ...(mode === 'formula'
      ? []
      : [
          '结果说明：随心炼制无法预知丹药效果、品阶与数量，结果将在开鼎后揭晓。',
        ]),
  ],
  confirmLabel: mode === 'formula' ? '确认炼制' : '确认尝试',
  cancelLabel: '再想想',
});
