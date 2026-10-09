"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ff = exports.Ef = exports.Df = exports.Cf = exports.Bf = exports.xf = exports.wf = exports.vf = exports.uf = exports.tf = exports.sf = exports.rf = exports.qf = exports.pf = exports.of = exports.nf = exports.mf = exports.lf = exports.kf = exports.hf = exports.gf = exports.ff = exports.ef = exports.df = exports.cf = exports.bf = exports.af = exports.$e = exports._e = exports.Ze = exports.Ye = exports.Xe = exports.We = exports.Ve = exports.Ue = exports.Te = exports.Se = exports.Re = exports.Qe = exports.Pe = exports.Oe = exports.Ne = exports.Je = exports.Ie = exports.He = exports.Ge = exports.Fe = exports.Ee = exports.De = exports.Ce = void 0;
exports.Lf = exports.Kf = exports.Jf = exports.If = exports.Hf = exports.Gf = void 0;
exports.Ke = S2;
exports.Le = I2;
exports.Me = F0;
exports.if = wb;
exports.jf = P;
exports.yf = Cb;
exports.zf = i2;
exports.Af = F1;
exports.Mf = p8;
var Q1 = Object.create;
var { getPrototypeOf: Y1, defineProperty: _b, getOwnPropertyNames: V1 } = Object;
var X1 = Object.prototype.hasOwnProperty;
function U1(b) { return this[b]; }
var G1, q1, O2 = (b, v, L) => { var W = b != null && typeof b === "object"; if (W) {
    var j = v ? G1 !== null && G1 !== void 0 ? G1 : (G1 = new WeakMap) : q1 !== null && q1 !== void 0 ? q1 : (q1 = new WeakMap), B = j.get(b);
    if (B)
        return B;
} L = b != null ? Q1(Y1(b)) : {}; let $ = v || !b || !b.__esModule ? _b(L, "default", { value: b, enumerable: !0 }) : L; for (let M of V1(b))
    if (!X1.call($, M))
        _b($, M, { get: U1.bind(b, M), enumerable: !0 }); if (W)
    j.set(b, $); return $; };
exports.Ce = O2;
var _2 = (b, v) => () => (v || b((v = { exports: {} }).exports, v), v.exports);
exports.De = _2;
var E = { bgpaper: "#f8f3e6", paper: "#f8f3e6", "paper-2": "#f1ead8", ink: "#2c1810", "ink-secondary": "#5a4a42", crimson: "#c1121f", primary: "#c1121f", teal: "#4a7c59", wood: "#8b4513", gold: "#efbf04", muted: "rgba(44, 24, 16, 0.06)", "paper-dark": "rgba(44, 24, 16, 0.04)", "ink-border": "rgba(44, 24, 16, 0.18)", "ink-muted": "rgba(44, 24, 16, 0.6)", "battle-rule": "rgba(44, 24, 16, 0.16)", "battle-rule-strong": "rgba(44, 24, 16, 0.3)", "battle-muted": "rgba(44, 24, 16, 0.48)", "battle-faint": "rgba(44, 24, 16, 0.08)", "battle-surface": "rgba(248, 243, 230, 0.74)", "battle-crimson-soft": "rgba(193, 18, 31, 0.08)", "battle-teal-soft": "rgba(74, 124, 89, 0.08)", "battle-gold-soft": "rgba(239, 191, 4, 0.58)", "resource-hp": "#c1121f", "resource-mp": "#1685a9", "resource-shield": "#936100", "resource-shield-soft": "rgba(239, 191, 4, 0.58)", "battle-log-ability": "#8f2433", "battle-log-damage-generic": "#9f2f3f", "battle-log-damage-physical": "#b4232f", "battle-log-damage-magical": "#12657f", "battle-log-damage-true": "#9200ff", "battle-log-damage-dot": "#8a4b18", "battle-log-positive": "#2f6f4e", "battle-log-negative": "#9f2f3f", "battle-log-shield": "var(--color-resource-shield)", "battle-log-resource": "#765200", "battle-log-buff": "#2f6f4e", "battle-log-debuff": "#9f2f3f", "battle-log-control": "#5a4a42", "battle-log-mechanic": "#765200", "battle-log-defense": "#376a63", "battle-log-critical": "#7a1020", "battle-log-fatal": "#7a1020", "tier-fan": "#758a99", "tier-ling": "#16a951", "tier-xuan": "#1685a9", "tier-zhen": "#b35c44", "tier-di": "#003472", "tier-tian": "#efbf04", "tier-xian": "#801dae", "tier-shen": "#c1121f", background: "var(--color-bgpaper)", foreground: "var(--color-ink)" };
exports.Ee = E;
class O1 {
    constructor(b, v) {
        this.height = 0;
        this.commands = [];
        this.paint = (b, v) => { for (let L of this.commands)
            L(b, v); };
        this.u = b;
        this.width = v;
    }
    gap(b) { this.height += b; }
    block(b, v) { let L = this.height; this.commands.push((W, j) => v(W, j + L)), this.height += b; }
    text(b, v = 14, L = 24, W = E.ink, j = !1) { let B = this.u.lines(b, this.width, v); this.block(B.length * L, ($, M) => B.forEach((Z, Y) => this.u.text(Z, $, M + Y * L + L / 2, v, W, this.u.bodyFont, j))); }
    rule() { this.block(1, (b, v) => this.u.rect(b, v, this.width, 1, "rgba(44,24,16,.15)")); }
}
exports.Fe = O1;
var Pb = wx, K2 = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (b) => { let v = Math.floor(Math.random() * 16); return (b === "x" ? v : v & 3 | 8).toString(16); }), R2 = (b, v) => new Promise((L) => Pb.showModal({ title: b, content: v, success: (W) => L(!!W.confirm), fail: () => L(!1) })), H2 = (b) => Pb.showToast({ title: b, icon: "none", duration: 2500 });
exports.Ge = Pb;
exports.He = K2;
exports.Ie = R2;
exports.Je = H2;
function S2(b, v, L) { var _a, _c, _d, _f, _g, _h, _j; b.beginModal(); let W = v.style === "modal", j = W ? Math.min((_a = v.maxWidth) !== null && _a !== void 0 ? _a : 448, b.width - 24) : b.width, B = (b.width - j) / 2, $ = j - (W ? 34 : 32), M = v.rows.map((N) => { var _a, _c, _d, _f; return ((_a = N.before) !== null && _a !== void 0 ? _a : 0) + ((_c = N.after) !== null && _c !== void 0 ? _c : 0) + ((_d = N.height) !== null && _d !== void 0 ? _d : (N.field ? 64 : N.heading ? 36 : N.label ? 36 : b.lines((_f = N.text) !== null && _f !== void 0 ? _f : "", $, 14).length * 24 + 12)); }), Z = (_d = (_c = v.content) === null || _c === void 0 ? void 0 : _c.height) !== null && _d !== void 0 ? _d : M.reduce((N, S) => N + S, 0), Y = v.footer ? v.footer.height + 29 : ((_f = v.actions) === null || _f === void 0 ? void 0 : _f.length) ? W ? 61.32 : 60 : 0, q = !W && v.description ? 8 + b.lines(v.description, $, 14).length * 24 : 0, J = W ? v.title ? 61.4 : 17 : 74.32 + q, V = W ? Math.min(Z, b.height * 0.6) : Z, X = Math.min((_g = v.maxHeight) !== null && _g !== void 0 ? _g : (W ? b.height - b.top - b.bottom - 32 : b.height * 0.88), J + V + Y + (W ? 17 : Math.max(16, b.bottom))), G = W ? Math.max(b.top + 16, (b.height - X) / 2) : b.height - X; if (b.hit(0, 0, b.width, b.height, L), b.rect(B, G, j, X, E.paper), b.hit(B, G, j, X, () => { }), W) {
    if (b.ctx.strokeStyle = "rgba(44,24,16,.2)", b.ctx.strokeRect(B + 0.5, G + 0.5, j - 1, X - 1), v.title)
        b.text(v.title, B + (j - b.measure(v.title, 21.6, b.headingFont)) / 2, G + 33.2, 21.6, E.ink, b.headingFont);
}
else {
    if (b.text(v.title, B + 16, G + 29.16, W ? 20 : 18, E.ink, W ? b.headingFont : b.bodyFont, !0), b.button((_h = v.closeLabel) !== null && _h !== void 0 ? _h : (W ? "关闭" : "收起"), B + j - 16 - b.buttonWidth((_j = v.closeLabel) !== null && _j !== void 0 ? _j : (W ? "关闭" : "收起")), G + 10, L, E["ink-secondary"]), v.description)
        b.paragraph(v.description, B + 16, G + 52.32, $, 14, 24, E["ink-secondary"]);
    b.line(B, G + 57 + q, j, E["ink-border"]);
} if (W && Y)
    b.line(B + 17, G + X - 17 - Y + 16, $, "rgba(44,24,16,.15)"); let _ = G + J, h = G + X - Y - (W ? 16 : Math.max(16, b.bottom)), m = _ - b.modalScroll; if (b.clip(B + (W ? 17 : 16), _, $, h - _, () => { if (v.content) {
    v.content.paint(B + (W ? 17 : 16), m);
    return;
} v.rows.forEach((N, S) => { var _a, _c, _d, _f, _g, _h; if (m += (_a = N.before) !== null && _a !== void 0 ? _a : 0, N.heading)
    b.text(N.heading, B + 16, m + 10, 14, E.ink, b.bodyFont, !0);
else if (N.field)
    b.rect(B + 16, m, $, 40, "rgba(255,255,255,.5)"), b.line(B + 16, m + 40, $, E["ink-border"]), b.text(N.field.value || N.field.placeholder, B + 26, m + 20, 14, N.field.value ? E.ink : E["battle-muted"]), b.hit(B + 16, m, $, 44, N.field.edit);
else if (N.label) {
    b.text(N.label, B + 16, m + 18, 14, E["ink-secondary"]);
    let i = (_c = N.value) !== null && _c !== void 0 ? _c : "";
    b.text(i, B + j - 16 - b.measure(i, 14, "monospace"), m + 18, 14, (_d = N.color) !== null && _d !== void 0 ? _d : E.ink, "monospace");
}
else
    b.paragraph((_f = N.text) !== null && _f !== void 0 ? _f : "", B + 16, m, $, 14, 24, (_g = N.color) !== null && _g !== void 0 ? _g : E["ink-secondary"]); m += M[S] - ((_h = N.before) !== null && _h !== void 0 ? _h : 0); }); }), b.modalMax = Math.max(0, Z - (h - _)), v.footer)
    v.footer.paint(B + 17, G + X - 17 - v.footer.height); if (v.actions) {
    let N = B + j - 16;
    [...v.actions].reverse().forEach((S) => { let i = b.buttonWidth(S.label, S.primary); N -= i, b.ctx.globalAlpha = S.disabled ? 0.4 : 1, b.button(S.label, S.align === "start" ? B + 17 : N, W ? G + X - 17 - 32.32 : G + X - Y + 12, S.disabled ? () => { } : S.run, S.primary ? E.crimson : E.ink), b.ctx.globalAlpha = 1, N -= 12; });
} }
var Fb = new Map([["beast-fusion-cauldron", "/assets/icons/beast-fusion-cauldron.png"], ["earthfire-furnace", "/assets/icons/earthfire-furnace-ink.png"], ["xuanfire-furnace", "/assets/icons/xuanfire-furnace-ink.png"], ["map-wild", "/assets/icons/map-wild.webp"], ["map-dungeon", "/assets/icons/map-dungeon.webp"], ["map-market", "/assets/icons/map-market.webp"], ["map-sect", "/assets/icons/map-sect.webp"], ["map-landmark", "/assets/icons/map-landmark.webp"], ["cultivator-male-avatar", "/assets/icons/cultivator-male-avatar.png"], ["cultivator-female-avatar", "/assets/icons/cultivator-female-avatar.png"], ["beast-fire-crow", "/assets/icons/beast-fire-crow.webp"], ["beast-mimi", "/assets/icons/beast-mimi.webp"], ["beast-nether-tiger", "/assets/icons/beast-nether-tiger.webp"], ["beast-lantern-butterfly", "/assets/icons/beast-ghost-lantern-butterfly.webp"], ["beast-ink-jiao", "/assets/icons/beast-ink-jiao.webp"], ["beast-moon-marten", "/assets/icons/beast-moon-marten.webp"], ["beast-silverwing-mantis", "/assets/icons/beast-silverwing-mantis.webp"], ["beast-six-eyed-ape", "/assets/icons/beast-six-eyed-ape.webp"], ["beast-snow-crane", "/assets/icons/beast-snow-crane.webp"], ["beast-thunder-peng", "/assets/icons/beast-thunder-peng.webp"], ["beast-zheng", "/assets/icons/beast-zheng.webp"], ["beast-snake-neck-turtle", "/assets/icons/beast-snake-neck-turtle.webp"], ["beast-golden-toad", "/assets/icons/beast-three-legged-golden-toad.webp"]]);
function I2(b, v, L, W, j, B, $ = Math.min(j, B)) { let M = v.startsWith("icon:") ? Fb.get(v.slice(5)) : void 0; if (M)
    b.imageContain(v === "icon:xuanfire-furnace" ? "craft-alchemy/furnace.png" : v === "icon:earthfire-furnace" ? "craft-forging/furnace.png" : M.replace(/^\//, ""), L, W, j, B, !1);
else
    b.text(v.startsWith("icon:") ? "" : v, L + (j - b.measure(v.startsWith("icon:") ? "❔" : v, $)) / 2, W + B / 2, $); }
var d2 = ["金", "木", "水", "火", "土", "风", "雷", "冰"];
exports.kf = d2;
var T2 = ["weapon", "armor", "accessory"], E2 = ["丹药", "符箓", "灵果"], y2 = ["男", "女"], o2 = ["人族", "妖族", "鬼魂", "魔族", "古兽", "灵族"], X0 = ["炼气", "筑基", "金丹", "元婴", "化神", "炼虚", "合体", "大乘", "渡劫"], Z0 = ["初期", "中期", "后期", "圆满"];
exports.lf = T2;
exports.mf = E2;
exports.nf = y2;
exports.of = o2;
exports.pf = X0;
exports.qf = Z0;
var r2 = ["天灵根", "真灵根", "伪灵根", "变异灵根"];
exports.rf = r2;
var a2 = ["凡品", "灵品", "玄品", "真品", "地品", "天品", "仙品", "神品"], p2 = { 凡品: 0, 灵品: 1, 玄品: 2, 真品: 3, 地品: 4, 天品: 5, 仙品: 6, 神品: 7 }, f2 = { 炼气: 0, 筑基: 1, 金丹: 2, 元婴: 3, 化神: 4, 炼虚: 5, 合体: 6, 大乘: 7, 渡劫: 8 }, k2 = ["seed", "herb", "ore", "monster", "tcdb", "aux", "gongfa_manual", "skill_manual"];
exports.sf = a2;
exports.tf = p2;
exports.uf = f2;
exports.vf = k2;
var g2 = { 1: 100, "2-10": 50, "11-50": 25, "51-100": 15 };
exports.wf = g2;
var _1 = 10, P1 = 6, n2 = _1 * P1, Nb = 5;
exports.xf = Nb;
function Cb(b, v) { return (F1(b, v) + 1) * Nb; }
function i2(b) { let v = Math.min(X0.length * Z0.length - 1, Math.max(0, Math.ceil(b / Nb) - 1)), L = X0[Math.floor(v / Z0.length)], W = Z0[v % Z0.length]; return { realm: L, stage: W, label: `${L}${W}` }; }
function F1(b, v) { let L = X0.indexOf(b), W = Z0.indexOf(v); return Math.max(0, L) * Z0.length + Math.max(0, W); }
function F0(b) { let v = new Map, L = (W) => { if (W === null || typeof W !== "object") {
    if (typeof W === "function" || typeof W === "symbol")
        throw TypeError("Content DTO contains a non-cloneable value");
    return W;
} if (v.has(W))
    return v.get(W); let j = Object.getPrototypeOf(W); if (!Array.isArray(W) && j !== Object.prototype && j !== null)
    throw TypeError("Content DTO must contain only plain records and arrays"); let B = Array.isArray(W) ? Array(W.length) : {}; v.set(W, B); for (let $ of Object.keys(W))
    Object.defineProperty(B, $, { value: L(W[$]), writable: !0, enumerable: !0, configurable: !0 }); return B; }; return L(b); }
function o(b, v, L) { var _a; return (_a = v.skillOverrides[L]) !== null && _a !== void 0 ? _a : b.get(L); }
function Kb(b) { if (!(b === null || b === void 0 ? void 0 : b.length))
    return {}; let v = {}; for (let L of b)
    v[L.id] = L; return v; }
function r(b, v) { return v.passives.flatMap((L) => { var _a; let W = o(b, v, L); return W && !((_a = W.conflicts) === null || _a === void 0 ? void 0 : _a.some((j) => v.passives.includes(j) || v.skills.includes(j))) ? [W] : []; }); }
var v0 = 1, s = 1, T0 = 1, Rb = 100, Hb = 1, Db = 1, f = 1;
var N0 = { Attack: "attack" }, c0 = ["hp", "maxHp", "mp", "maxMp", "physicalAtk", "physicalDef", "magicAtk", "magicDef", "healPower", "speed", "hit", "dodge", "critRate", "spellCritRate", "physicalFuryRate", "sealHit", "sealResist", "attackCultivate", "defenseCultivate", "spellCultivate", "resistSpellCultivate"];
exports.Ne = N0;
exports.Oe = c0;
var U0 = { A: 0, B: 1 }, Ab = { Player: "player", Pet: "pet", Npc: "npc" };
exports.Pe = Ab;
var O = { Physical: "physical", Spell: "spell", Fixed: "fixed" }, w = { ActionDirect: "action-direct", HookDerived: "hook-derived", Status: "status" }, G0 = { Attack: "attack", Skill: "skill", Defend: "defend", Protect: "protect", Item: "item", Summon: "summon", Recall: "recall", Catch: "catch", Flee: "flee", Auto: "auto" }, W0 = { Physical: "physical", Spell: "spell", Seal: "seal", Support: "support", Passive: "passive", Art: "art" }, d = { Enemy: "enemy", Ally: "ally", Self: "self", Any: "any" }, T = { Explicit: "explicit", Fill: "fill", All: "all", Random: "random", LowestHp: "lowestHp", LowestDef: "lowestDef" }, e0 = { None: "none", Random: "random", RandomAttackTarget: "randomAttackTarget", RandomNormalAttackTarget: "randomNormalAttackTarget", StoredAttack: "storedAttack" }, A = { Buff: "buff", Debuff: "debuff", Control: "control", Dot: "dot" }, C = { BeforeAction: "beforeAction", OnHitCalc: "onHitCalc", OnDefenseIgnoreCalc: "onDefenseIgnoreCalc", OnBeHit: "onBeHit", AfterHit: "afterHit", AfterStrike: "afterStrike", OnFatal: "onFatal", OnStatusRemoved: "onStatusRemoved", OnDeath: "onDeath", OnRoundStart: "onRoundStart", OnRoundEnd: "onRoundEnd", OnTargetLost: "onTargetLost", AfterAction: "afterAction", OnCritRoll: "onCritRoll", OnHitRoll: "onHitRoll", OnHealCalc: "onHealCalc", OnBarrierCalc: "onBarrierCalc", OnWoundCalc: "onWoundCalc" }, l = { Self: "self", HookTarget: "hookTarget", HookSource: "hookSource", Others: "others" };
exports.Qe = O;
exports.Re = w;
exports.Se = G0;
exports.Te = W0;
exports.Ue = d;
exports.Ve = T;
exports.We = e0;
exports.Xe = A;
exports.Ye = C;
exports.Ze = l;
var Sb = { Downed: "downed", Dead: "dead" };
exports._e = Sb;
var t = { NoTarget: "no-target", Sealed: "sealed", Rooted: "rooted", InsufficientMp: "insufficient-mp", HpRequirement: "hp-requirement", RevivedThisRound: "revived-this-round", ResourceRequirement: "resource-requirement", SkillNotKnown: "skill-not-known", PassiveNotCastable: "passive-not-castable", FleeFailed: "flee-failed", CaptureFailed: "capture-failed", ReviveBlocked: "revive-blocked", SummonInvalid: "summon-invalid", SummonDead: "summon-dead", SummonAlreadyOut: "summon-already-out", UnknownSkill: "unknown-skill", UnknownStatus: "unknown-status", Unsupported: "unsupported" }, u = { Expired: "expired", Damage: "damage", Dispel: "dispel", Replaced: "replaced", Downed: "downed", Consumed: "consumed", Recalled: "recalled" }, j0 = { Always: "always", Seal: "seal" }, x = { Physical: "physical", Spell: "spell", Dragon: "dragon", Judge: "judge", Fixed: "fixed" }, U = { Repeat: "repeat", ModifyFact: "modifyFact", ModifyStatusDuration: "modifyStatusDuration", RandomBranch: "randomBranch", PhysicalHit: "physicalHit", SpellHit: "spellHit", FixedHit: "fixedHit", Heal: "heal", RestoreHp: "restoreHp", RestoreMp: "restoreMp", Revive: "revive", ApplyStatus: "applyStatus", RemoveStatus: "removeStatus", CopyStatus: "copyStatus", EmitMechanic: "emitMechanic", Dispel: "dispel", SkipNextAction: "skipNextAction", DamageMp: "damageMp", Wound: "wound", RemoveWound: "removeWound", ApplyBarrier: "applyBarrier", ModifyStrike: "modifyStrike", ModifyDefenseIgnore: "modifyDefenseIgnore", ModifyHeal: "modifyHeal", ModifyBarrier: "modifyBarrier", ModifyWound: "modifyWound", SetCrit: "setCrit", ModifyResource: "modifyResource", ModifyChance: "modifyChance", ModifyCooldown: "modifyCooldown", LoseHp: "loseHp", ClearSkipNextAction: "clearSkipNextAction" }, F = { BattleStart: "battleStart", RoundStart: "roundStart", CommandAccepted: "commandAccepted", CommandDefaulted: "commandDefaulted", TurnOrder: "turnOrder", ActionSkip: "actionSkip", ActionStart: "actionStart", Retarget: "retarget", Miss: "miss", Hit: "hit", ProtectTrigger: "protectTrigger", Damage: "damage", Heal: "heal", MpCost: "mpCost", HpCost: "hpCost", MpDamage: "mpDamage", Wound: "wound", WoundChanged: "woundChanged", BarrierChanged: "barrierChanged", StatusApplied: "statusApplied", StatusRemoved: "statusRemoved", MechanicTriggered: "mechanicTriggered", ChanceResolved: "chanceResolved", UnitDowned: "unitDowned", UnitDead: "unitDead", UnitRevived: "unitRevived", UnitEscaped: "unitEscaped", PetSummoned: "petSummoned", PetRecalled: "petRecalled", UnitCaptured: "unitCaptured", MpRestore: "mpRestore", ResourceChanged: "resourceChanged", ActionFailed: "actionFailed", RoundEnd: "roundEnd", BattleEnd: "battleEnd" }, E0 = { RoundEnd: "roundEnd" }, y0 = { Dot: "dot" }, C0 = { BlocksAction: "blocksAction", BlocksSpell: "blocksSpell", BlocksPhysical: "blocksPhysical", BlocksRevive: "blocksRevive", ActFirst: "actFirst", Untargetable: "untargetable", RevealStealth: "revealStealth", PersistWhenDowned: "persistWhenDowned" };
exports.$e = j0;
exports.af = x;
exports.bf = U;
exports.cf = E0;
exports.df = y0;
exports.ef = C0;
var c = { SkillLevel: "skillLevel", Targets: "targets", Damage: "damage", HpDamage: "hpDamage", ImpactDamage: "impactDamage", TargetStatusStacks: "targetStatusStacks", Level: "level", Source: "source", Target: "target" }, q0 = { Floor: "floor", Min: "min", Max: "max", If: "if" };
exports.ff = c;
exports.gf = q0;
function o0(b) { return b === U0.A ? U0.B : U0.A; }
function K0(b, v) { return `${b}:${v}`; }
function N1(b, v, L) { return Math.min(v, Math.max(b, L)); }
function r0(b) { if (!Number.isFinite(b))
    return 0; return N1(0, 1, b); }
function k(b, v) { return Math.max(b, v); }
function g(b, v) { return Math.max(b, Math.floor(v)); }
function M0(b, v) { return Number.isFinite(b) ? b : v; }
var zb = { hp: 0, maxHp: 0, mp: 0, maxMp: 0, physicalAtk: 0, physicalDef: 0, magicAtk: 0, magicDef: 0, healPower: 0, speed: 0, hit: Rb, dodge: 0, critRate: 0, spellCritRate: 0, physicalFuryRate: 0, sealHit: 0, sealResist: 0, attackCultivate: 0, defenseCultivate: 0, spellCultivate: 0, resistSpellCultivate: 0 };
exports.hf = zb;
function wb(b, v) { var _a, _c, _d, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s; let L = Math.max(s, Math.floor(M0(b.attrs.hp, s))), W = Math.max(0, Math.floor(M0((_a = b.attrs.mp) !== null && _a !== void 0 ? _a : 0, 0))), j = { ...zb, ...b.attrs, hp: L, maxHp: Math.max(T0, Math.floor(M0((_c = b.attrs.maxHp) !== null && _c !== void 0 ? _c : L, L))), mp: W, maxMp: Math.max(0, Math.floor(M0((_d = b.attrs.maxMp) !== null && _d !== void 0 ? _d : W, W))), critRate: r0((_f = b.attrs.critRate) !== null && _f !== void 0 ? _f : 0), spellCritRate: r0((_g = b.attrs.spellCritRate) !== null && _g !== void 0 ? _g : 0), physicalFuryRate: r0((_h = b.attrs.physicalFuryRate) !== null && _h !== void 0 ? _h : 0) }; return { id: (_j = b.id) !== null && _j !== void 0 ? _j : `u${b.side}_${(_k = b.slot) !== null && _k !== void 0 ? _k : v}`, name: b.name, side: b.side, kind: b.kind, slot: (_l = b.slot) !== null && _l !== void 0 ? _l : v, level: Math.max(0, Math.floor(M0((_m = b.level) !== null && _m !== void 0 ? _m : 0, 0))), ownerId: b.ownerId, attrs: j, wound: 0, skills: [...(_o = b.skills) !== null && _o !== void 0 ? _o : []], passives: [...(_p = b.passives) !== null && _p !== void 0 ? _p : []], skillLevels: { ...(_q = b.skillLevels) !== null && _q !== void 0 ? _q : {} }, skillOverrides: Kb(b.skillOverrides), tags: [...(_r = b.tags) !== null && _r !== void 0 ? _r : []], combatFacts: { ...b.combatFacts }, skillUses: {}, cooldowns: {}, resources: C1(b.resources), barriers: [], marks: [], statuses: [], flags: { defending: !1, auto: !1, skipNextAction: !1, downed: !1, dead: !1, escaped: !1, benched: (_s = b.benched) !== null && _s !== void 0 ? _s : !1 } }; }
function K(b) { return !b.flags.dead && !b.flags.downed && !b.flags.escaped && !b.flags.benched; }
function C1(b) { let v = new Set, L = []; for (let W of b !== null && b !== void 0 ? b : []) {
    if (!W.id || v.has(W.id))
        continue;
    v.add(W.id);
    let j = W.max === null ? null : Math.max(0, Math.floor(M0(W.max, 0))), B = Math.min(j !== null && j !== void 0 ? j : Number.MAX_SAFE_INTEGER, Math.max(0, Math.floor(M0(W.current, 0))));
    L.push({ id: W.id, name: W.name, current: B, max: j });
} return L; }
function L0(b, v) { return b.resources.find((L) => L.id === v); }
function e(b) { return Math.max(s, b.attrs.maxHp - Math.max(0, Math.floor(b.wound))); }
function n(b) { let v = { ...b.attrs }; for (let L of b.statuses) {
    v.speed += L.speedMod;
    for (let [W, j] of Object.entries(L.attrMods))
        if (W !== "maxHp")
            v[W] += j;
} return v; }
function hb(b, v) { if (v === O.Fixed)
    return f; let L = f; for (let W of b.statuses)
    L *= v === O.Physical ? W.damageTakenPhysical : W.damageTakenSpell; return L; }
function a0(b) { var _a; let v = f, L = new Map; for (let W of b.statuses)
    L.set(W.kind, Math.min((_a = L.get(W.kind)) !== null && _a !== void 0 ? _a : W.healTaken, W.healTaken)); for (let W of L.values())
    v *= W; return v; }
function Ib(b) { let v = f; for (let L of b.statuses)
    v *= L.healDealt; return v; }
function P(b, v) { if (b === void 0)
    return 0; if (typeof b === "number")
    return b; let L = K1(b), W = new db(L, v), j = W.parseExpr(); if (W.expectEnd(), !Number.isFinite(j))
    return 0; return j; }
function R0(b, v) { var _a; return (_a = b.skillLevels[v]) !== null && _a !== void 0 ? _a : b.level; }
function mb(b) { let v = { level: b.level }; for (let L of c0)
    v[L] = b.attrs[L]; return v; }
function K1(b) { let v = b.replace(/\s+/g, ""), L = [], W = 0; while (W < v.length) {
    let j = v[W];
    if (j >= "0" && j <= "9") {
        let B = W;
        while (B < v.length && (v[B] >= "0" && v[B] <= "9" || v[B] === "."))
            B++;
        L.push({ kind: "num", value: Number(v.slice(W, B)) }), W = B;
        continue;
    }
    if (j >= "a" && j <= "z" || j >= "A" && j <= "Z" || j === "_") {
        let B = W;
        while (B < v.length && /[A-Za-z0-9_.]/.test(v[B]))
            B++;
        L.push({ kind: "id", value: v.slice(W, B) }), W = B;
        continue;
    }
    if (v.startsWith(">=", W) || v.startsWith("<=", W) || v.startsWith("==", W)) {
        L.push({ kind: "op", value: v.slice(W, W + 2) }), W += 2;
        continue;
    }
    if ("+-*/(),><".includes(j)) {
        L.push({ kind: "op", value: j }), W++;
        continue;
    }
    throw Error(`bad expr token "${j}" in "${b}"`);
} return L; }
class db {
    constructor(b, v) {
        this.i = 0;
        this.tokens = b;
        this.env = v;
    }
    parseExpr() { return this.parseCompare(); }
    parseCompare() { let b = this.parseAdd(), v = this.op(); if (v === ">" || v === "<" || v === ">=" || v === "<=" || v === "==") {
        this.bumpOp();
        let L = this.parseAdd();
        if (v === ">")
            return b > L ? 1 : 0;
        if (v === "<")
            return b < L ? 1 : 0;
        if (v === ">=")
            return b >= L ? 1 : 0;
        if (v === "<=")
            return b <= L ? 1 : 0;
        return b === L ? 1 : 0;
    } return b; }
    expectEnd() { if (this.i < this.tokens.length)
        throw Error("unexpected trailing tokens in expr"); }
    parseAdd() { let b = this.parseMul(); while (this.op() === "+" || this.op() === "-") {
        let v = this.bumpOp(), L = this.parseMul();
        b = v === "+" ? b + L : b - L;
    } return b; }
    parseMul() { let b = this.parseUnary(); while (this.op() === "*" || this.op() === "/") {
        let v = this.bumpOp(), L = this.parseUnary();
        b = v === "*" ? b * L : L === 0 ? 0 : b / L;
    } return b; }
    parseUnary() { if (this.op() === "-")
        return this.bumpOp(), -this.parseUnary(); if (this.op() === "+")
        return this.bumpOp(), this.parseUnary(); return this.parsePrimary(); }
    parsePrimary() { let b = this.peek(); if (!b)
        throw Error("unexpected end of expr"); if (b.kind === "num")
        return this.i++, b.value; if (b.kind === "id") {
        if (this.i++, this.op() === "(")
            return this.callFn(b.value);
        return this.lookup(b.value);
    } if (b.kind === "op" && b.value === "(") {
        this.i++;
        let v = this.parseExpr();
        if (this.op() !== ")")
            throw Error("missing )");
        return this.i++, v;
    } throw Error(`unexpected token ${JSON.stringify(b)}`); }
    callFn(b) { var _a, _c, _d, _f; if (this.op() !== "(")
        throw Error(`expected ( after ${b}`); this.i++; let v = []; if (this.op() !== ")") {
        v.push(this.parseExpr());
        while (this.op() === ",")
            this.i++, v.push(this.parseExpr());
    } if (this.op() !== ")")
        throw Error(`missing ) after ${b}`); if (this.i++, b === q0.Floor)
        return Math.floor((_a = v[0]) !== null && _a !== void 0 ? _a : 0); if (b === q0.Min)
        return Math.min(...v); if (b === q0.Max)
        return Math.max(...v); if (b === q0.If)
        return ((_c = v[0]) !== null && _c !== void 0 ? _c : 0) !== 0 ? (_d = v[1]) !== null && _d !== void 0 ? _d : 0 : (_f = v[2]) !== null && _f !== void 0 ? _f : 0; throw Error(`unknown function ${b}`); }
    lookup(b) { var _a, _c, _d, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23; if (b.startsWith("hasStatus."))
        return this.env.source.statuses.some((W) => W.id === b.slice(10)) ? 1 : 0; if (b === "enemyCount")
        return (_c = (_a = this.env.state) === null || _a === void 0 ? void 0 : _a.units.filter((W) => W.side !== this.env.source.side && !W.flags.dead && !W.flags.downed && !W.flags.escaped && !W.flags.benched).length) !== null && _c !== void 0 ? _c : 0; if (b === "actionKillsTarget")
        return this.env.target && ((_d = this.env.killedTargetIds) === null || _d === void 0 ? void 0 : _d.includes(this.env.target.id)) ? 1 : 0; if (b === "normalTarget")
        return this.env.target && ((_f = this.env.normalTargetIds) === null || _f === void 0 ? void 0 : _f.includes(this.env.target.id)) ? 1 : 0; if (b === "enemyPlayers")
        return (_h = (_g = this.env.state) === null || _g === void 0 ? void 0 : _g.units.filter((W) => W.side !== this.env.source.side && W.kind === "player").length) !== null && _h !== void 0 ? _h : 0; if (b === "targetIsPet")
        return ((_j = this.env.target) === null || _j === void 0 ? void 0 : _j.kind) === "pet" ? 1 : 0; if (b.startsWith("targetKnown."))
        return this.env.target && [...this.env.target.skills, ...this.env.target.passives].includes(b.slice(12)) ? 1 : 0; if (b.startsWith("targetEffective."))
        return this.env.target ? (_k = n(this.env.target)[b.slice(16)]) !== null && _k !== void 0 ? _k : 0 : 0; if (b.startsWith("effective."))
        return (_l = n(this.env.source)[b.slice(10)]) !== null && _l !== void 0 ? _l : 0; if (b.startsWith("allyTagCount."))
        return (_o = (_m = this.env.state) === null || _m === void 0 ? void 0 : _m.units.filter((W) => W.side === this.env.source.side && W.kind === "player" && W.tags.includes(b.slice(13))).length) !== null && _o !== void 0 ? _o : 0; if (b.startsWith("known."))
        return [...this.env.source.skills, ...this.env.source.passives].includes(b.slice(6)) ? 1 : 0; if (b.startsWith("statusRounds."))
        return (_q = (_p = this.env.source.statuses.find((W) => W.kind === b.slice(13))) === null || _p === void 0 ? void 0 : _p.remainingRounds) !== null && _q !== void 0 ? _q : 0; if (b.startsWith("targetStatusRounds."))
        return (_t = (_s = (_r = this.env.target) === null || _r === void 0 ? void 0 : _r.statuses.find((W) => W.kind === b.slice(19))) === null || _s === void 0 ? void 0 : _s.remainingRounds) !== null && _t !== void 0 ? _t : 0; if (b.startsWith("ownedTargetStatus."))
        return ((_u = this.env.target) === null || _u === void 0 ? void 0 : _u.statuses.some((W) => W.kind === b.slice(18) && W.sourceId === this.env.source.id)) ? 1 : 0; if (b === "allyDownedPlayers")
        return (_w = (_v = this.env.state) === null || _v === void 0 ? void 0 : _v.units.filter((W) => W.side === this.env.source.side && W.kind === "player" && W.flags.downed && !W.flags.escaped).length) !== null && _w !== void 0 ? _w : 0; if (b === "allyMaxMagicAtk")
        return Math.max(0, ...(_y = (_x = this.env.state) === null || _x === void 0 ? void 0 : _x.units.filter((W) => W.side === this.env.source.side && W.id !== this.env.source.id && W.kind === "player").map((W) => W.attrs.magicAtk)) !== null && _y !== void 0 ? _y : []); if (b === "targetDeployedPets")
        return (_3 = (_z = this.env.state) === null || _z === void 0 ? void 0 : _z.units.filter((W) => { var _a; return W.kind === "pet" && W.ownerId === ((_a = this.env.target) === null || _a === void 0 ? void 0 : _a.id) && W.marks.includes("battle:deployed"); }).length) !== null && _3 !== void 0 ? _3 : 0; if (b === "round")
        return (_5 = (_4 = this.env.state) === null || _4 === void 0 ? void 0 : _4.round) !== null && _5 !== void 0 ? _5 : 0; if (b === "enemyDownedPlayers")
        return (_7 = (_6 = this.env.state) === null || _6 === void 0 ? void 0 : _6.units.filter((W) => W.side !== this.env.source.side && W.kind === "player" && W.flags.downed && !W.flags.escaped).length) !== null && _7 !== void 0 ? _7 : 0; if (b.startsWith("enemyStatus.") || b.startsWith("allyStatus.")) {
        let W = b.startsWith("enemyStatus."), j = b.slice(W ? 12 : 11);
        return (_9 = (_8 = this.env.state) === null || _8 === void 0 ? void 0 : _8.units.filter((B) => B.side !== this.env.source.side === W && !B.flags.dead && !B.flags.escaped && !B.flags.benched && (!W || !B.flags.downed) && B.statuses.some(($) => $.kind === j)).length) !== null && _9 !== void 0 ? _9 : 0;
    } if (b === "originalResourceCost")
        return (_10 = this.env.originalResourceCost) !== null && _10 !== void 0 ? _10 : 0; if (b.startsWith("resource."))
        return (_12 = (_11 = this.env.source.resources.find((W) => W.id === b.slice(9))) === null || _11 === void 0 ? void 0 : _11.current) !== null && _12 !== void 0 ? _12 : 0; if (b.startsWith("fact."))
        return (_14 = (_13 = this.env.source.combatFacts) === null || _13 === void 0 ? void 0 : _13[b.slice(5)]) !== null && _14 !== void 0 ? _14 : 0; if (b.startsWith("uses."))
        return (_16 = (_15 = this.env.source.skillUses) === null || _15 === void 0 ? void 0 : _15[b.slice(5)]) !== null && _16 !== void 0 ? _16 : 0; if (b === c.SkillLevel)
        return this.env.skillLevel; if (b === c.Targets)
        return this.env.targets; if (b === c.Damage)
        return (_17 = this.env.damage) !== null && _17 !== void 0 ? _17 : 0; if (b === c.HpDamage)
        return (_18 = this.env.hpDamage) !== null && _18 !== void 0 ? _18 : 0; if (b === "roundHpDamage") {
        let W = this.env.source.hpDamageThisRound;
        return W && W.round === ((_19 = this.env.state) === null || _19 === void 0 ? void 0 : _19.round) ? W.amount : 0;
    } if (b === c.ImpactDamage)
        return (_20 = this.env.impactDamage) !== null && _20 !== void 0 ? _20 : 0; if (b === c.TargetStatusStacks)
        return (_21 = this.env.targetStatusStacks) !== null && _21 !== void 0 ? _21 : 0; if (b === c.Level)
        return this.env.source.level; let v = b.split("."); if (v.length === 2) {
        let W = v[0] === c.Source ? this.env.source : v[0] === c.Target ? this.env.target : void 0;
        if (!W)
            return 0;
        return (_22 = mb(W)[v[1]]) !== null && _22 !== void 0 ? _22 : 0;
    } return (_23 = mb(this.env.source)[b]) !== null && _23 !== void 0 ? _23 : 0; }
    peek() { return this.tokens[this.i]; }
    op() { let b = this.peek(); return (b === null || b === void 0 ? void 0 : b.kind) === "op" ? b.value : void 0; }
    bumpOp() { let b = this.peek(); if (!b || b.kind !== "op")
        throw Error("expected operator"); return this.i++, b.value; }
}
function H0(b) { return b.attrs.hp / Math.max(1, b.attrs.maxHp); }
function p0(b, v) { return v.some((L) => b.statuses.some((W) => W.id === L)); }
function f0(b, v) { return v.some((L) => b.statuses.some((W) => W.kind === L)); }
function t0(b, v, L) { return v.statuses.some((W) => { var _a; let j = (_a = b.statusDefs.get(W.id)) === null || _a === void 0 ? void 0 : _a.category; return j !== void 0 && L.includes(j); }); }
function D0(b, v, L) { let W = v === null || v === void 0 ? void 0 : v.targetStatusStack; if (!W || !L)
    return 0; return L.statuses.filter((j) => (W.statusId === void 0 || j.id === W.statusId) && (W.kind === void 0 || j.kind === W.kind)).reduce((j, B) => j + B.stacks, 0); }
function R1(b, v, L) { if (!b.markKey)
    return; if (L.oncePerBattle)
    return `battle:${b.markKey}`; if (L.oncePerRound)
    return `round:${v}:${b.markKey}`; return; }
function J0(b, v, L) { var _a, _c, _d, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16; if (!v)
    return !0; if (v.expression !== void 0 && !P(v.expression, { source: L.source, target: L.target, skillLevel: (_c = L.source.skillLevels[(_a = L.skillId) !== null && _a !== void 0 ? _a : ""]) !== null && _c !== void 0 ? _c : L.source.level, targets: 1, state: { ...b.state, units: (_d = b.state.units) !== null && _d !== void 0 ? _d : [] } }))
    return !1; let W = (_f = b.state.units) !== null && _f !== void 0 ? _f : []; if (v.removedStatusKind && L.removedStatusKind !== v.removedStatusKind)
    return !1; if (v.statusRemoveReason && L.statusRemoveReason !== v.statusRemoveReason)
    return !1; if (v.originalResourceCostMax !== void 0 && (L.originalResourceCost === void 0 || L.originalResourceCost > v.originalResourceCostMax))
    return !1; if (v.targetDowned !== void 0 && ((_g = L.target) === null || _g === void 0 ? void 0 : _g.flags.downed) !== v.targetDowned)
    return !1; if (v.targetDead !== void 0 && ((_h = L.target) === null || _h === void 0 ? void 0 : _h.flags.dead) !== v.targetDead)
    return !1; if (v.excludeFoeKinds && (!L.target || v.excludeFoeKinds.includes(L.target.kind)))
    return !1; if (v.targetOwnedStatus && !((_j = L.target) === null || _j === void 0 ? void 0 : _j.statuses.some((J) => J.kind === v.targetOwnedStatus.kind && J.sourceId === L.source.id && (!v.targetOwnedStatus.appliedThisRound || J.appliedRound === b.state.round))))
    return !1; if (v.enemyStatusCount && W.filter((J) => J.side !== L.source.side && K(J) && J.statuses.some((V) => V.kind === v.enemyStatusCount.kind)).length < v.enemyStatusCount.min)
    return !1; if (v.oncePerActionTarget && (!b.currentAction || ((_k = b.currentAction.triggeredTargets) === null || _k === void 0 ? void 0 : _k.includes(`${L.markKey}:${(_l = L.target) === null || _l === void 0 ? void 0 : _l.id}`))))
    return !1; if (v.pvp !== void 0 && W.some((J) => J.side !== L.source.side && J.kind === "player") !== v.pvp)
    return !1; if (v.teamUniqueTag && W.filter((J) => J.side === L.source.side && J.kind === "player" && J.tags.includes(v.teamUniqueTag)).length !== 1)
    return !1; if (v.targetEnemy && (!L.target || L.target.side === L.source.side))
    return !1; if (v.targetHasStandingPet !== void 0 && (!L.target || W.some((J) => J.kind === "pet" && J.ownerId === L.target.id && K(J)) !== v.targetHasStandingPet))
    return !1; if (v.actionSucceeded && (!b.currentAction || b.currentAction.failed))
    return !1; if (v.actionKilledTarget !== void 0 && Boolean(L.target && ((_o = (_m = b.currentAction) === null || _m === void 0 ? void 0 : _m.killedTargetIds) === null || _o === void 0 ? void 0 : _o.includes(L.target.id))) !== v.actionKilledTarget)
    return !1; if (v.sourceInitialHpRatioMin !== void 0 && ((_q = (_p = b.currentAction) === null || _p === void 0 ? void 0 : _p.initialHpRatio) !== null && _q !== void 0 ? _q : H0(L.source)) < v.sourceInitialHpRatioMin)
    return !1; let j = (_t = (_r = L.skillId) !== null && _r !== void 0 ? _r : (_s = L.skill) === null || _s === void 0 ? void 0 : _s.id) !== null && _t !== void 0 ? _t : (_u = b.currentAction) === null || _u === void 0 ? void 0 : _u.skillId, B = L.skill; if ((_v = v.excludeSkillTags) === null || _v === void 0 ? void 0 : _v.some((J) => B === null || B === void 0 ? void 0 : B.tags.includes(J)))
    return !1; if (v.excludePercentageDamage && L.percentageDamage)
    return !1; let $ = L.source.attrs.mp / Math.max(1, L.source.attrs.maxMp); if (v.sourceMpRatioBelow !== void 0 && $ >= v.sourceMpRatioBelow)
    return !1; if (v.sourceMpRatioAbove !== void 0 && $ <= v.sourceMpRatioAbove)
    return !1; if (v.sourceHasBarrier !== void 0 && L.source.barriers.some((J) => J.current > 0) !== v.sourceHasBarrier)
    return !1; if (v.targetHasBarrier !== void 0 && (!L.target || L.target.barriers.some((J) => J.current > 0) !== v.targetHasBarrier))
    return !1; if (v.sourceStatusCategories && !t0(b, L.source, v.sourceStatusCategories))
    return !1; if (v.sourceRemovableControl && !L.source.statuses.some((J) => { let V = b.statusDefs.get(J.id); return (V === null || V === void 0 ? void 0 : V.category) === "control" && V.dispellable !== !1 && !V.blocksRevive; }))
    return !1; let M = (_w = L.isPrimary) !== null && _w !== void 0 ? _w : (L.target !== void 0 && L.target.id === ((_x = b.currentAction) === null || _x === void 0 ? void 0 : _x.primaryTargetId)); if (v.skillIds && (!j || !v.skillIds.includes(j)))
    return !1; if ((_y = v.skillTags) === null || _y === void 0 ? void 0 : _y.length) {
    if (!B)
        return !1;
    if (!v.skillTags.some((J) => B.tags.includes(J)))
        return !1;
} if (v.requireKind && v.requireKind !== L.kind)
    return !1; if (v.requireStatusIds && !p0(L.source, v.requireStatusIds))
    return !1; if (v.requireStatusKinds && !f0(L.source, v.requireStatusKinds))
    return !1; if (v.requireAbsentStatusIds && p0(L.source, v.requireAbsentStatusIds))
    return !1; if (v.requireAbsentStatusKinds && f0(L.source, v.requireAbsentStatusKinds))
    return !1; if (v.sourceHpRatioBelow !== void 0 && H0(L.source) >= v.sourceHpRatioBelow)
    return !1; if (v.sourceHpRatioAbove !== void 0 && H0(L.source) <= v.sourceHpRatioAbove)
    return !1; if (((_z = v.sourceTags) === null || _z === void 0 ? void 0 : _z.length) && !v.sourceTags.every((J) => L.source.tags.includes(J)))
    return !1; if (v.sourceDefending !== void 0 && L.source.flags.defending !== v.sourceDefending)
    return !1; if (v.sourceStanding !== void 0 && K(L.source) !== v.sourceStanding)
    return !1; if (((_3 = v.damageOrigins) === null || _3 === void 0 ? void 0 : _3.length) && (!L.origin || !v.damageOrigins.includes(L.origin)))
    return !1; if (v.sourceResource) {
    let J = L0(L.source, v.sourceResource.id);
    if (!J)
        return !1;
    if (v.sourceResource.min !== void 0 && J.current < v.sourceResource.min)
        return !1;
    if (v.sourceResource.max !== void 0 && J.current > v.sourceResource.max)
        return !1;
} let Z = L.target; if (v.targetWithoutDelayedRevival && Z && b.skills && r(b.skills, Z).some((J) => { var _a; return (_a = J.innate) === null || _a === void 0 ? void 0 : _a.delayedRevivalRounds; }))
    return !1; if (v.targetAbsentSkillIds && Z && v.targetAbsentSkillIds.some((J) => Z.passives.includes(J) || Z.skills.includes(J)))
    return !1; if (v.targetSkillIds && (!Z || !v.targetSkillIds.some((J) => Z.passives.includes(J) || Z.skills.includes(J))))
    return !1; if (v.targetSlot === "primary" && !M)
    return !1; if (v.targetSlot === "secondary" && (M || !L.target))
    return !1; if (v.targetSlot === "normal" && (!L.target || !((_5 = (_4 = b.currentAction) === null || _4 === void 0 ? void 0 : _4.normalTargetIds) === null || _5 === void 0 ? void 0 : _5.includes(L.target.id))))
    return !1; if (v.initialTargetOwnedStatus && (!L.target || !((_8 = (_7 = (_6 = b.currentAction) === null || _6 === void 0 ? void 0 : _6.initialOwnedStatusKindsByTarget) === null || _7 === void 0 ? void 0 : _7[L.target.id]) === null || _8 === void 0 ? void 0 : _8.includes(v.initialTargetOwnedStatus))))
    return !1; if (v.foeKind && (Z === null || Z === void 0 ? void 0 : Z.kind) !== v.foeKind)
    return !1; if (v.targetStatusIds && (!Z || !p0(Z, v.targetStatusIds)))
    return !1; if (v.targetStatusKinds && (!Z || !f0(Z, v.targetStatusKinds)))
    return !1; if (v.targetAbsentStatusIds && Z && p0(Z, v.targetAbsentStatusIds))
    return !1; if (v.targetAbsentStatusKinds && Z && f0(Z, v.targetAbsentStatusKinds))
    return !1; if (v.targetStatusCategories && (!Z || !t0(b, Z, v.targetStatusCategories)))
    return !1; if (v.targetAbsentStatusCategories && Z && t0(b, Z, v.targetAbsentStatusCategories))
    return !1; if (v.targetStatusStack) {
    let J = D0(b, v, Z);
    if (v.targetStatusStack.min !== void 0 && J < v.targetStatusStack.min)
        return !1;
    if (v.targetStatusStack.max !== void 0 && J > v.targetStatusStack.max)
        return !1;
} if (v.sourceInitialStatusIds && !v.sourceInitialStatusIds.some((J) => { var _a, _c; return (_c = (_a = b.currentAction) === null || _a === void 0 ? void 0 : _a.initialSourceStatusIds) === null || _c === void 0 ? void 0 : _c.includes(J); }))
    return !1; if (v.initialTargetStatusKinds && !v.initialTargetStatusKinds.some((J) => { var _a, _c; return L.target && ((_c = (_a = b.currentAction) === null || _a === void 0 ? void 0 : _a.initialStatusKindsByTarget[L.target.id]) === null || _c === void 0 ? void 0 : _c.includes(J)); }))
    return !1; let Y = (_9 = b.currentAction) === null || _9 === void 0 ? void 0 : _9.primaryTargetId; if ((_10 = v.primaryTargetStatusIds) === null || _10 === void 0 ? void 0 : _10.length) {
    let J = Y ? (_12 = (_11 = b.currentAction) === null || _11 === void 0 ? void 0 : _11.initialStatusIdsByTarget[Y]) !== null && _12 !== void 0 ? _12 : [] : [];
    if (!v.primaryTargetStatusIds.some((V) => J.includes(V)))
        return !1;
} if ((_13 = v.primaryTargetStatusKinds) === null || _13 === void 0 ? void 0 : _13.length) {
    let J = Y ? (_15 = (_14 = b.currentAction) === null || _14 === void 0 ? void 0 : _14.initialStatusKindsByTarget[Y]) !== null && _15 !== void 0 ? _15 : [] : [];
    if (!v.primaryTargetStatusKinds.some((V) => J.includes(V)))
        return !1;
} if ((_16 = v.foeTags) === null || _16 === void 0 ? void 0 : _16.length) {
    if (!Z || !v.foeTags.every((J) => Z.tags.includes(J)))
        return !1;
} if (v.targetHpRatioBelow !== void 0) {
    if (!Z || H0(Z) >= v.targetHpRatioBelow)
        return !1;
} if (v.targetHpRatioAbove !== void 0) {
    if (!Z || H0(Z) <= v.targetHpRatioAbove)
        return !1;
} let q = R1(L, b.state.round, v); if (q && L.source.marks.includes(q))
    return !1; return !0; }
function a(b, v, L = {}) { var _a, _c, _d, _f; let W = [], j = new Set; for (let B of b.state.units) {
    if (B.side !== v.side)
        continue;
    for (let $ of [...r(b.skills, B), ...B.skills.flatMap((M) => { let Z = o(b.skills, B, M); return Z ? [Z] : []; })])
        for (let M of (_a = $.modifiers) !== null && _a !== void 0 ? _a : []) {
            if (B.id !== v.id && !M.teamAura)
                continue;
            if (M.teamAura && (!K(B) || j.has(M.teamAura)))
                continue;
            if (!J0(b, M.when, { ...L, source: v }))
                continue;
            if (M.teamAura)
                j.add(M.teamAura);
            W.push(M);
        }
} for (let B of v.statuses)
    for (let $ of (_f = (_c = B.snapshotModifiers) !== null && _c !== void 0 ? _c : (_d = b.statusDefs.get(B.id)) === null || _d === void 0 ? void 0 : _d.modifiers) !== null && _f !== void 0 ? _f : [])
        if (J0(b, $.when, { ...L, source: v }))
            W.push($); return W; }
function I(b, v, L, W, j, B) { return b.reduce(($, M) => { var _a; let Z = M[v]; return $ + (typeof Z === "number" || typeof Z === "string" ? P(Z, { state: B === null || B === void 0 ? void 0 : B.state, source: L, target: W, skillLevel: j ? (_a = L.skillLevels[j.id]) !== null && _a !== void 0 ? _a : L.level : L.level, targets: 1 }) : 0); }, 0); }
function A0(b, v) { return !a(b, v).some((L) => L.ignoreReviveBlock) && v.statuses.some((L) => { var _a; return (_a = b.statusDefs.get(L.id)) === null || _a === void 0 ? void 0 : _a.blocksRevive; }); }
function Tb(b, v, L = []) { return [...r(b.skills, v).map((j) => { var _a, _c; return (_c = (_a = j.innate) === null || _a === void 0 ? void 0 : _a.sealHitTakenFactor) !== null && _c !== void 0 ? _c : 1; }), ...v.statuses.filter((j) => !L.includes(j.kind)).map((j) => { var _a, _c; return (_c = (_a = b.statusDefs.get(j.id)) === null || _a === void 0 ? void 0 : _a.sealHitTakenFactor) !== null && _c !== void 0 ? _c : 1; })].reduce((j, B) => j * B, 1); }
function bb(b, v, L, W) { if (!K(L))
    return; let j = k(0, Math.floor(W.amount)), B = g(1, W.duration); if (j <= 0)
    return; let $ = L.barriers.find((M) => M.kind === W.kind); if ($) {
    let M = $.current;
    $.current = Math.max($.current, j), $.remainingRounds = B, $.untilBattleEnd = W.untilBattleEnd, $.sourceId = v.id, $.appliedRound = b.state.round, b.emit({ type: F.BarrierChanged, sourceId: v.id, unitId: L.id, barrierId: $.id, before: M, after: $.current, reason: "refreshed" });
    return;
} L.barriers.push({ id: W.id, kind: W.kind, name: W.name, current: j, remainingRounds: B, ...W.untilBattleEnd ? { untilBattleEnd: !0 } : {}, sourceId: v.id, appliedRound: b.state.round }), b.emit({ type: F.BarrierChanged, sourceId: v.id, unitId: L.id, barrierId: W.id, before: 0, after: j, reason: "applied" }); }
function k0(b, v, L, W = 1) { let j = k(0, Math.floor(L)), B = Math.max(1, W), $ = v.barriers.filter((M) => M.current > 0).sort((M, Z) => M.appliedRound - Z.appliedRound || M.id.localeCompare(Z.id)); for (let M of $) {
    if (j <= 0)
        break;
    let Z = M.current, Y = Math.min(Z, Math.floor(j * B));
    M.current -= Y, j -= Y / B, b.emit({ type: F.BarrierChanged, sourceId: M.sourceId, unitId: v.id, barrierId: M.id, before: Z, after: M.current, reason: "absorbed" });
} return v.barriers = v.barriers.filter((M) => M.current > 0), Math.max(0, Math.floor(j)); }
function S0(b, v) { return b.statusDefs.get(v); }
function vb(b, v, L, W, j, B = {}) { var _a, _c, _d, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _3; let $ = S0(b, L); if (!$) {
    b.emit({ type: F.ActionFailed, unitId: j, reason: K0(t.UnknownStatus, L) });
    return;
} if (ob(b, v, $, (_c = (_a = B.env) === null || _a === void 0 ? void 0 : _a.source) !== null && _c !== void 0 ? _c : b.state.units.find((G) => G.id === j)))
    return; if ($.priority !== void 0) {
    let G = v.statuses.find((h) => h.kind === $.kind), _ = G && S0(b, G.id);
    if (G && (_ === null || _ === void 0 ? void 0 : _.priority) !== void 0 && (_.priority > $.priority || _.priority === $.priority && (_.untilBattleEnd || !$.untilBattleEnd && G.remainingRounds >= W)))
        return;
} if ($.category === A.Buff && $.extendable !== !1 && !$.untargetable && !$.blocksRevive && !$.ticks && !$.blocksAction && !$.blocksSpell && !$.blocksPhysical && !$.actFirst)
    for (let G of v.passives) {
        let _ = (_f = (_d = o(b.skills, v, G)) === null || _d === void 0 ? void 0 : _d.innate) === null || _f === void 0 ? void 0 : _f.buffDuration;
        if (_) {
            W += Math.min(_.maxExtra, Math.floor(W * (_.factor - 1)));
            break;
        }
    } let M = (_g = B.env) !== null && _g !== void 0 ? _g : { skillLevel: 0, targets: 1, source: (_h = b.state.units.find((G) => G.id === j)) !== null && _h !== void 0 ? _h : v, target: v }, Z = { ...v, statuses: v.statuses.filter((G) => G.kind !== $.kind) }, Y = { ...v, attrs: n(Z) }, q = { ...M, state: b.state, normalTargetIds: (_j = b.currentAction) === null || _j === void 0 ? void 0 : _j.normalTargetIds, target: ((_k = M.target) === null || _k === void 0 ? void 0 : _k.id) === v.id ? Y : M.target, source: M.source.id === v.id ? Y : M.source }, J = {}; for (let [G, _] of Object.entries((_l = $.attrMods) !== null && _l !== void 0 ? _l : {}))
    J[G] = P(_, q); let V = $.maxStacks && $.maxStacks > 1 ? $.maxStacks : 1, X = V > 1 ? v.statuses.find((G) => G.kind === $.kind) : void 0; if (X) {
    let G = Math.min(V, X.stacks + 1);
    if (X.stacks = G, X.remainingRounds = W, X.sourceId = j, X.appliedRound = b.state.round, $.healingPerRound !== void 0 || ((_m = $.onTick) === null || _m === void 0 ? void 0 : _m.hpCap) !== void 0 || ((_o = $.onTick) === null || _o === void 0 ? void 0 : _o.mpCap) !== void 0)
        X.tickSkillLevel = q.skillLevel;
    let _ = (_p = $.healTaken) !== null && _p !== void 0 ? _p : f, h = (_q = $.healDealt) !== null && _q !== void 0 ? _q : f;
    X.healTaken = _ ** G, X.healDealt = h ** G, X.damageTakenPhysical = ((_r = $.damageTakenPhysical) !== null && _r !== void 0 ? _r : f) ** G, X.damageTakenSpell = ((_s = $.damageTakenSpell) !== null && _s !== void 0 ? _s : f) ** G, b.emit({ type: F.StatusApplied, unitId: v.id, statusId: $.id, duration: W });
    return;
} for (let G of v.statuses.filter((_) => _.kind === $.kind && (!$.sourceBound || _.sourceId === j)))
    $0(b, v, G.id, u.Replaced, $.sourceBound ? j : void 0); if (v.statuses.push({ ...$.snapshotModifiers ? { snapshotModifiers: (_t = $.modifiers) === null || _t === void 0 ? void 0 : _t.map((G) => Object.fromEntries(Object.entries(G).map(([_, h]) => [_, typeof h === "string" && _ !== "teamAura" || typeof h === "number" ? P(h, { ...q, state: b.state }) : F0(h)]))) } : {}, id: $.id, kind: $.kind, remainingRounds: W, sourceId: j, appliedRound: b.state.round, speedMod: P((_u = $.speedMod) !== null && _u !== void 0 ? _u : 0, q), attrMods: J, storedTargetId: B.storedTargetId, ...$.onExpire ? { transitionSkillLevel: q.skillLevel } : {}, ...$.healingPerRound !== void 0 || ((_v = $.onTick) === null || _v === void 0 ? void 0 : _v.hpCap) !== void 0 || ((_w = $.onTick) === null || _w === void 0 ? void 0 : _w.mpCap) !== void 0 ? { tickSkillLevel: q.skillLevel } : {}, damageTakenPhysical: (_x = $.damageTakenPhysical) !== null && _x !== void 0 ? _x : f, damageTakenSpell: (_y = $.damageTakenSpell) !== null && _y !== void 0 ? _y : f, healTaken: (_z = $.healTaken) !== null && _z !== void 0 ? _z : f, healDealt: (_3 = $.healDealt) !== null && _3 !== void 0 ? _3 : f, stacks: 1 }), J.maxHp)
    v.attrs.maxHp += J.maxHp; b.emit({ type: F.StatusApplied, unitId: v.id, statusId: $.id, duration: W }); }
function $0(b, v, L, W, j) { let B = v.statuses.find(($) => $.id === L && (!j || $.sourceId === j)); if (!B)
    return; if (B.attrMods.maxHp) {
    if (v.attrs.maxHp = Math.max(T0, v.attrs.maxHp - B.attrMods.maxHp), v.wound = Math.min(v.wound, v.attrs.maxHp - 1), v.attrs.hp > e(v))
        v.attrs.hp = e(v);
} v.statuses = v.statuses.filter(($) => $.id !== L || j !== void 0 && $.sourceId !== j), b.emit({ type: F.StatusRemoved, unitId: v.id, statusId: L, reason: W }), b.hooks.emit(C.OnStatusRemoved, { source: b.state.units.find(($) => $.id === B.sourceId), target: v, removedStatusKind: B.kind, statusRemoveReason: W }); }
function Eb(b, v, L, W, j = 0) { let B = S0(b, W.id); if (!B || ob(b, L, B))
    return; for (let M of [...L.statuses].filter((Z) => Z.kind === W.kind && (!B.sourceBound || Z.sourceId === v.id)))
    $0(b, L, M.id, u.Replaced, B.sourceBound ? v.id : void 0); let $ = { ...F0(W), sourceId: v.id, appliedRound: b.state.round, remainingRounds: Math.max(1, Math.floor(W.remainingRounds + j)) }; if (L.statuses.push($), $.attrMods.maxHp)
    L.attrs.maxHp += $.attrMods.maxHp; b.emit({ type: F.StatusApplied, unitId: L.id, statusId: $.id, duration: $.remainingRounds }); }
function yb(b, v) { let L = v.statuses.filter((W) => { var _a; return (_a = S0(b, W.id)) === null || _a === void 0 ? void 0 : _a.breakOnDamage; }); for (let W of L)
    $0(b, v, W.id, u.Damage); }
function Wb(b, v) { var _a; for (let L of [...v.statuses]) {
    if ((_a = S0(b, L.id)) === null || _a === void 0 ? void 0 : _a.persistWhenDowned)
        continue;
    $0(b, v, L.id, u.Downed);
} }
function ob(b, v, L, W) { var _a, _c; if (((_c = (_a = v.flags.statusImmunityThroughRound) === null || _a === void 0 ? void 0 : _a[L.kind]) !== null && _c !== void 0 ? _c : -1) >= b.state.round)
    return !0; let j = r(b.skills, v); if (L.category === A.Buff && j.some((B) => { var _a; return (_a = B.innate) === null || _a === void 0 ? void 0 : _a.rejectBuffs; }))
    return !0; return !L.blocksRevive && L.dispellable !== !1 && j.some((B) => { var _a, _c; if (W && a(b, W).some((M) => { var _a; return ((_a = M.bypassImmunity) === null || _a === void 0 ? void 0 : _a.statusKinds.includes(L.kind)) && M.bypassImmunity.passiveIds.includes(B.id); }))
    return !1; let $ = B.innate; return ((_a = $ === null || $ === void 0 ? void 0 : $.immuneStatusKinds) === null || _a === void 0 ? void 0 : _a.includes(L.kind)) || Boolean(L.category && ((_c = $ === null || $ === void 0 ? void 0 : $.immuneStatusCategories) === null || _c === void 0 ? void 0 : _c.includes(L.category))); }); }
function jb(b, v, L, W) { if (W)
    return !1; if (D1(b, v))
    return !1; return L.statuses.some((j) => { var _a; return (_a = b.statusDefs.get(j.id)) === null || _a === void 0 ? void 0 : _a.untargetable; }); }
function D1(b, v) { var _a, _c; if (v.statuses.some((L) => { var _a; return (_a = b.statusDefs.get(L.id)) === null || _a === void 0 ? void 0 : _a.revealStealth; }))
    return !0; for (let L of v.passives)
    if ((_c = (_a = o(b.skills, v, L)) === null || _a === void 0 ? void 0 : _a.innate) === null || _c === void 0 ? void 0 : _c.revealStealth)
        return !0; return !1; }
function rb(b, v, L, W, j) { var _a, _c; if (W.targeting.excludeSelf && v.id === L.id)
    return !1; if (W.targeting.requireKind && L.kind !== W.targeting.requireKind)
    return !1; if (L.flags.capturedBy || L.flags.benched)
    return !1; if (W.targeting.requireRevivable && (A0(b, L) || r(b.skills, L).some(($) => { var _a; return (_a = $.innate) === null || _a === void 0 ? void 0 : _a.rejectHpRecovery; })))
    return !1; if (W.targeting.onlyDowned && !L.flags.downed && !L.flags.dead)
    return !1; if (W.capture && (W.capture.targetMpCosts[L.id] === void 0 || b.state.units.filter(($) => $.flags.capturedBy === v.id).length >= W.capture.capacity))
    return !1; if (L.flags.escaped)
    return !1; if (L.flags.dead && !W.targeting.includeDead)
    return !1; if (L.flags.downed && !W.targeting.includeDowned)
    return !1; if (!L.flags.downed && !L.flags.dead && !K(L) && !W.targeting.includeDowned)
    return !1; let B = W.targeting.side; if (B === d.Self)
    return L.id === v.id; if (B === d.Enemy && L.side === v.side)
    return !1; if (B === d.Ally && L.side !== v.side)
    return !1; if (jb(b, v, L, j))
    return !1; if (((_a = W.targeting.requireStatusIds) === null || _a === void 0 ? void 0 : _a.length) && !W.targeting.requireStatusIds.some(($) => L.statuses.some((M) => M.id === $)))
    return !1; if (((_c = W.targeting.requireStatusKinds) === null || _c === void 0 ? void 0 : _c.length) && !W.targeting.requireStatusKinds.some(($) => L.statuses.some((M) => M.kind === $)))
    return !1; return !0; }
function ab(b, v, L) { let W = L.targeting.side, j; if (W === d.Self)
    j = [v];
else if (W === d.Enemy)
    j = w0(b.state, v);
else if (W === d.Ally)
    j = h0(b.state, v);
else
    j = b.state.units.filter((M) => !M.flags.escaped); if (L.targeting.includeDowned) {
    let M = b.state.units.filter((Z) => { if (Z.flags.escaped)
        return !1; if (W === d.Enemy && Z.side === v.side)
        return !1; if (W === d.Ally && Z.side !== v.side)
        return !1; if (W === d.Self)
        return Z.id === v.id; return Z.flags.downed || Z.flags.dead; });
    j = [...j, ...M.filter((Z) => !j.includes(Z))];
} let B = Mb(v, L, 1, b), $ = pb(L, B); return j.filter((M) => rb(b, v, M, L, $)).sort((M, Z) => M.slot - Z.slot); }
function Mb(b, v, L, W) { var _a, _c, _d; let j = (_c = (_a = v.targeting.countByResource) === null || _a === void 0 ? void 0 : _a.filter((M) => { var _a, _c; return ((_c = (_a = L0(b, M.resourceId)) === null || _a === void 0 ? void 0 : _a.current) !== null && _c !== void 0 ? _c : 0) >= M.min; }).slice(-1)[0]) === null || _c === void 0 ? void 0 : _c.count, B = P((_d = j !== null && j !== void 0 ? j : v.targeting.count) !== null && _d !== void 0 ? _d : Hb, { state: W === null || W === void 0 ? void 0 : W.state, skillLevel: R0(b, v.id), targets: L, source: b }), $ = W ? I(a(W, b, { skill: v, skillId: v.id }), "targetCountAdd", b, void 0, v) : 0; return Math.max(1, Math.floor(B + $)); }
function pb(b, v) { var _a; let L = (_a = b.targeting.mode) !== null && _a !== void 0 ? _a : T.Explicit; if (L === T.All || L === T.Random || L === T.Fill || L === T.LowestHp || L === T.LowestDef)
    return v > 1 || L === T.All; return v > 1; }
function g0(b, v, L, W, j, B) { var _a, _c; let $ = (_a = L.targeting.mode) !== null && _a !== void 0 ? _a : T.Explicit; if (L.targeting.side === d.Self)
    return [v]; let M = Mb(v, L, W.length || 1, b), Z = ab(b, v, L), Y = pb(L, M); if ($ === T.All) {
    let V = L.targeting.count === void 0 ? Z : Z.slice(0, M);
    return O0(b, v, L, V, Z, B);
} if ($ === T.Random)
    return O0(b, v, L, A1(b, Z, M), Z, B); if ($ === T.LowestHp)
    return O0(b, v, L, Z.slice().sort((V, X) => V.attrs.hp / Math.max(1, V.attrs.maxHp) - X.attrs.hp / Math.max(1, X.attrs.maxHp) || V.slot - X.slot).slice(0, M), Z, B); if ($ === T.LowestDef)
    return O0(b, v, L, Z.slice().sort((V, X) => V.attrs.physicalDef - X.attrs.physicalDef || V.slot - X.slot).slice(0, M), Z, B); let q = [], J = new Set; if (j) {
    let V = b.state.units.find((X) => X.id === j);
    if (V && V.id !== v.id && K(V) && (!L.targeting.requireKind || V.kind === L.targeting.requireKind))
        q.push(V), J.add(V.id);
} for (let V of W.slice(0, (_c = L.targeting.maxSelected) !== null && _c !== void 0 ? _c : W.length)) {
    if (q.length >= M)
        break;
    let X = b.state.units.find((G) => G.id === V);
    if (!X || J.has(X.id))
        continue;
    if (!rb(b, v, X, L, Y))
        continue;
    if (q.push(X), J.add(X.id), q.length >= M)
        break;
} if ($ === T.Explicit)
    return O0(b, v, L, q, Z, B); for (let V of Z) {
    if (q.length >= M)
        break;
    if (J.has(V.id))
        continue;
    if (q.push(V), J.add(V.id), q.length >= M)
        break;
} return O0(b, v, L, q, Z, B); }
function O0(b, v, L, W, j, B) { B === null || B === void 0 ? void 0 : B.push(...W.map((V) => V.id)); let $ = L.targeting.extraCount; if (W.length && L.targeting.includeOwnedStatusKind)
    W = [...W, ...j.filter((V) => !W.includes(V) && V.statuses.some((X) => X.kind === L.targeting.includeOwnedStatusKind && X.sourceId === v.id))]; let M = L.targeting.extraChance; if ($ === void 0 && M === void 0)
    return W; let Z = { skillLevel: R0(v, L.id), targets: W.length, source: v }; if (M !== void 0 && !b.rng.chance(P(M, Z)))
    return W; let Y = $ === void 0 ? 0 : Math.max(0, Math.floor(P($, Z))); if (Y <= 0)
    return W; let q = new Set(W.map((V) => V.id)), J = []; for (let V of j) {
    if (q.has(V.id))
        continue;
    if (J.push(V), q.add(V.id), J.length >= Y)
        break;
} return [...W, ...J]; }
function A1(b, v, L) { let W = v.slice(); for (let j = W.length - 1; j > 0; j--) {
    let B = Math.floor(b.rng.next() * (j + 1)), $ = W[j];
    W[j] = W[B], W[B] = $;
} return W.slice(0, L); }
function gb(b, v) { return b.units.find((L) => L.id === v); }
function z0(b, v) { return b.units.filter((L) => K(L) && (v === void 0 || L.side === v)); }
function w0(b, v) { return z0(b, o0(v.side)).sort((L, W) => L.slot - W.slot); }
function h0(b, v) { return z0(b, v.side).sort((L, W) => L.slot - W.slot); }
function Zb(b, v) { var _a, _c, _d, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y; var _z; let { source: L, target: W } = v, j = n(L), B = n(W), $ = (_a = v.origin) !== null && _a !== void 0 ? _a : (b.suppressHooks > 0 ? w.HookDerived : w.ActionDirect), M = $ !== w.ActionDirect || b.suppressHooks > 0, Z = (_c = v.skillId) !== null && _c !== void 0 ? _c : (_d = b.currentAction) === null || _d === void 0 ? void 0 : _d.skillId, Y = Z ? o(b.skills, L, Z) : void 0, q = a(b, L, { target: W, skill: Y, skillId: Z, kind: v.kind, origin: $ }); j.hit += I(q, "hitAdd", L, W, Y, b), j.physicalAtk += I(q, "physicalAttackAdd", L, W, Y, b); let J = v.kind === O.Physical && !q.some((z) => z.ignoreProtection) ? z1(b, W) : void 0; if (J)
    b.emit({ type: F.ProtectTrigger, protectorId: J.id, originalTargetId: W.id }); if (!v.cannotMiss && v.kind !== O.Fixed && !w1(b, L, W, j, B, v.kind))
    return; let V = v.kind === O.Physical && b.rng.chance(j.physicalFuryRate + I(q, "physicalFuryChanceAdd", L, W, Y, b)), X = (_f = v.isPrimary) !== null && _f !== void 0 ? _f : (((_g = b.currentAction) === null || _g === void 0 ? void 0 : _g.primaryTargetId) !== void 0 && W.id === b.currentAction.primaryTargetId), G = v.kind === O.Fixed ? 0 : v.kind === O.Physical ? j.critRate : j.spellCritRate, _ = b.hooks.emit(C.OnCritRoll, { source: L, target: W, kind: v.kind, skillId: Z, isPrimary: X, chance: G + I(q, "critChanceAdd", L, W, Y, b), origin: $ }), h = v.kind === O.Fixed ? !1 : (_h = _.crit) !== null && _h !== void 0 ? _h : b.rng.chance(Math.min(1, Math.max(0, (_j = _.chance) !== null && _j !== void 0 ? _j : G))), m = b.hooks.emit(C.OnDefenseIgnoreCalc, { source: L, target: W, kind: v.kind, skillId: Z, isPrimary: X, defenseIgnore: ((_k = v.defenseIgnore) !== null && _k !== void 0 ? _k : 0) + I(q, "defenseIgnoreAdd", L, W, Y, b) + (v.kind === O.Physical ? L.statuses.reduce((z, y) => { var _a, _c; return z + ((_c = (_a = b.statusDefs.get(y.id)) === null || _a === void 0 ? void 0 : _a.physicalDefenseIgnore) !== null && _c !== void 0 ? _c : 0); }, 0) : 0), origin: $ }), N = { ...v, defenseIgnore: m.defenseIgnore }, S = I1(b, L, W, j, B, N, V); if (S = h ? Math.floor(S * (b.rules.formulas.critMultiplier + I(q, "critMultiplierAdd", L, W, Y, b))) : S, v.kind !== O.Fixed)
    S = m1(b, S, v.kind, L); S = d1(b, W, v.kind, S), S = g(v0, S * hb(W, v.kind)); let i = b.hooks.emit(C.OnHitCalc, { percentageDamage: v.percentageDamage, source: L, target: W, damage: S, kind: v.kind, skillId: Z, isPrimary: X, origin: $ }), n0 = v.kind === O.Spell && ((_l = b.currentAction) === null || _l === void 0 ? void 0 : _l.sourceId) === L.id ? (_m = b.currentAction.spellRepeatFactor) !== null && _m !== void 0 ? _m : 1 : 1, i0 = 1; if (v.kind === O.Physical || v.kind === O.Spell) {
    let z = r(b.skills, L), y = r(b.skills, W);
    if (y.some((p) => { var _a; return (_a = p.innate) === null || _a === void 0 ? void 0 : _a.delayedRevivalRounds; }))
        for (let p of z)
            i0 *= (_p = (_o = p.innate) === null || _o === void 0 ? void 0 : _o.damageToDelayedRevival) !== null && _p !== void 0 ? _p : 1;
    if (z.some((p) => { var _a; return (_a = p.innate) === null || _a === void 0 ? void 0 : _a.delayedRevivalRounds; }))
        for (let p of y)
            i0 *= (_r = (_q = p.innate) === null || _q === void 0 ? void 0 : _q.damageFromDelayedRevival) !== null && _r !== void 0 ? _r : 1;
} let Gb = 1; if (v.kind !== O.Fixed)
    for (let z of L.statuses) {
        let y = b.statusDefs.get(z.id);
        Gb *= (_s = (v.kind === O.Physical ? y === null || y === void 0 ? void 0 : y.damageDealtPhysical : y === null || y === void 0 ? void 0 : y.damageDealtSpell)) !== null && _s !== void 0 ? _s : 1;
    } let $1 = W.statuses.reduce((z, y) => { var _a, _c; return z * (y.sourceId === L.id ? (_c = (_a = b.statusDefs.get(y.id)) === null || _a === void 0 ? void 0 : _a.damageTakenFromSource) !== null && _c !== void 0 ? _c : 1 : 1); }, 1), qb = a(b, W, { target: L, skill: Y, skillId: Z, kind: v.kind, origin: $ }), B1 = Math.max(0, 1 + I(qb, "damageTakenBonus", W, L, Y, b)), j1 = I(qb, "damageTakenAdd", W, L, Y, b), V0 = g(v0, (((_t = i.damage) !== null && _t !== void 0 ? _t : S) * (1 + I(q, "damageBonus", L, W, Y, b)) + I(q, "damageAdd", L, W, Y, b)) * n0 * i0 * Gb * $1 * ((_u = v.resultFactor) !== null && _u !== void 0 ? _u : 1) * B1 + j1); b.emit({ type: F.Hit, sourceId: L.id, targetId: W.id, kind: v.kind, crit: h, fury: V }); let Ob = V0; if (J) {
    let z = (_v = b.rules.protectionTargetRatio) !== null && _v !== void 0 ? _v : 0;
    Q0(b, L, J, Math.floor(V0 * (1 - z)), v.kind, M, $, v.cannotKill), Ob = Math.floor(V0 * z * (1 + I(q, "protectedDamageBonus", L, W, Y, b)));
} let M1 = 1 + I(q, "barrierDamageBonus", L, W, Y, b), m0 = Q0(b, L, W, Ob, v.kind, M, $, v.cannotKill, M1); if (!M)
    for (let z of q) {
        if (z.splash) {
            let y = b.state.units.filter((B0) => B0.side !== L.side && B0.id !== W.id && K(B0)), p = Math.max(0, Math.floor(P(z.splash.count, { source: L, target: W, targets: y.length, skillLevel: L.level }))), s0 = `${W.id}:${z.splash.factor}:${p}`, d0 = ((_w = b.currentAction) === null || _w === void 0 ? void 0 : _w.sourceId) === L.id ? (_x = (_z = b.currentAction).splashTargetIds) !== null && _x !== void 0 ? _x : (_z.splashTargetIds = {}) : void 0, u0 = (_y = d0 === null || d0 === void 0 ? void 0 : d0[s0]) !== null && _y !== void 0 ? _y : [];
            if (!(d0 === null || d0 === void 0 ? void 0 : d0[s0])) {
                for (let B0 = 0; B0 < p && y.length; B0++)
                    u0.push(y.splice(Math.floor(b.rng.next() * y.length), 1)[0].id);
                if (d0)
                    d0[s0] = u0;
            }
            for (let B0 of u0) {
                let Z1 = b.state.units.find((J1) => J1.id === B0);
                Q0(b, L, Z1, Math.floor(V0 * z.splash.factor), v.kind, !0, w.HookDerived);
            }
        }
        if (z.mirrorToTargetPet && W.kind === "player")
            for (let y of b.state.units.filter((p) => p.ownerId === W.id && p.kind === "pet" && K(p)))
                Q0(b, L, y, V0, v.kind, !0, w.HookDerived);
    } if (v.mpDamageRatio !== void 0 && m0 > 0) {
    let z = Math.min(W.attrs.mp, Math.max(0, Math.floor(m0 * v.mpDamageRatio)));
    if (z > 0)
        W.attrs.mp -= z, b.emit({ type: F.MpDamage, sourceId: L.id, targetId: W.id, amount: z, mpAfter: W.attrs.mp });
} if (!M) {
    let z = { source: L, target: W, damage: V0, hpDamage: m0, kind: v.kind, skillId: Z, isPrimary: X, origin: $ };
    if (b.hooks.emit(C.AfterStrike, { ...z }), m0 > 0)
        b.hooks.emit(C.AfterHit, z);
} }
function z1(b, v) { if (!K(v))
    return; return h0(b.state, v).find((L) => (L.flags.protecting === v.id || v.statuses.some((W) => { var _a; return W.sourceId === L.id && ((_a = b.statusDefs.get(W.id)) === null || _a === void 0 ? void 0 : _a.protectsTarget); })) && K(L) && L.id !== v.id); }
function Y0(b, v) { return { ...b, attrs: v }; }
function w1(b, v, L, W, j, B) { var _a; let $ = b.rules.formulas, M = B === O.Physical ? $.physicalHitChance(Y0(v, W), Y0(L, j)) : $.spellHitChance(Y0(v, W), Y0(L, j)), Z = b.hooks.emit(C.OnHitRoll, { source: v, target: L, kind: B, skillId: h1(b), chance: M, origin: b.suppressHooks > 0 ? w.HookDerived : w.ActionDirect }); if (b.rng.chance(Math.min(1, Math.max(0, (_a = Z.chance) !== null && _a !== void 0 ? _a : M))))
    return !0; return b.emit({ type: F.Miss, sourceId: v.id, targetId: L.id, kind: B }), !1; }
function h1(b) { var _a; return (_a = b.currentAction) === null || _a === void 0 ? void 0 : _a.skillId; }
function I1(b, v, L, W, j, B, $) { var _a, _c, _d, _f; let M = (_a = B.formula) !== null && _a !== void 0 ? _a : (B.trueDamage ? x.Fixed : B.kind === O.Physical ? x.Physical : x.Spell), Z = Math.min(1, Math.max(0, (_c = B.defenseIgnore) !== null && _c !== void 0 ? _c : 0)), Y = (B.kind === O.Physical || B.kind === O.Spell) && Z > 0 ? Y0(L, { ...j, physicalDef: B.kind === O.Physical ? Math.floor(j.physicalDef * (1 - Z)) : j.physicalDef, magicDef: B.kind === O.Spell ? Math.floor(j.magicDef * (1 - Z)) : j.magicDef }) : Y0(L, j); return b.rules.formulas.baseDamage({ family: M, kind: B.kind, source: Y0(v, W), target: Y, coeff: B.coeff, power: B.power, fury: $, furyMultiplier: b.rules.formulas.furyAtkMultiplier, skillLevel: (_d = B.skillLevel) !== null && _d !== void 0 ? _d : 0, targetCount: (_f = B.targetCount) !== null && _f !== void 0 ? _f : 1, schoolTerm: B.schoolTerm, splash: B.splash, defenseIgnore: Z }); }
function m1(b, v, L, W) { var _a, _c; if (L === O.Spell)
    for (let M of W.passives) {
        let Z = (_c = (_a = o(b.skills, W, M)) === null || _a === void 0 ? void 0 : _a.innate) === null || _c === void 0 ? void 0 : _c.spellFluctuation;
        if (Z)
            return g(v0, v * b.rng.range(Z.min, Z.max));
    } let j = b.rules.formulas, B = L === O.Physical ? j.physicalFluctuationMin : j.fluctuationMin, $ = L === O.Physical ? j.physicalFluctuationMax : j.fluctuationMax; return g(v0, v * b.rng.range(B, $)); }
function d1(b, v, L, W) { if (L !== O.Physical || !v.flags.defending)
    return W; return g(v0, W * b.rules.formulas.defendPhysicalFactor); }
function Q0(b, v, L, W, j, B = !1, $ = B ? w.HookDerived : w.ActionDirect, M = !1, Z = 1) { var _a, _c, _d, _f, _g, _h, _j, _k, _l; if (!K(L) || L.flags.downed)
    return 0; let Y = ((_a = b.currentAction) === null || _a === void 0 ? void 0 : _a.skillId) ? o(b.skills, v, b.currentAction.skillId) : void 0, q = a(b, L, { target: v, skill: Y, skillId: Y === null || Y === void 0 ? void 0 : Y.id, kind: j, origin: $ }), J = Math.max(0, Math.floor(W * Math.max(0, 1 + I(q, "allDamageTakenBonus", L, v, Y, b)))), V = T1(b, v, L, J, j, $), X = $ === w.Status ? V : k0(b, L, V, Z), G = V - X, _ = M ? Math.min(X, Math.max(0, L.attrs.hp - s)) : X; if (b.lastStrikeDamage = X, $ === w.ActionDirect && ((_c = b.currentAction) === null || _c === void 0 ? void 0 : _c.sourceId) === v.id && j !== O.Fixed && (G > 0 || _ > 0))
    b.currentAction.hasPhysicalOrSpellImpact = !0; if ($ === w.ActionDirect && ((_d = b.currentAction) === null || _d === void 0 ? void 0 : _d.sourceId) === v.id && G > 0)
    b.currentAction.impactDamageByTarget[L.id] = ((_f = b.currentAction.impactDamageByTarget[L.id]) !== null && _f !== void 0 ? _f : 0) + G; if (_ <= 0)
    return 0; let h = L.attrs.hp, m = k(0, L.attrs.hp - _), N = h - m; if ($ === w.ActionDirect && ((_g = b.currentAction) === null || _g === void 0 ? void 0 : _g.sourceId) === v.id)
    b.currentAction.impactDamageByTarget[L.id] = ((_h = b.currentAction.impactDamageByTarget[L.id]) !== null && _h !== void 0 ? _h : 0) + N; if (L.attrs.hp = m, lb(b, L, N), b.emit({ type: F.Damage, sourceId: v.id, targetId: L.id, amount: X, hpAfter: m, kind: j }), !B)
    b.hooks.emit(C.OnBeHit, { source: v, target: L, damage: X, hpDamage: N, kind: j, skillId: (_j = b.currentAction) === null || _j === void 0 ? void 0 : _j.skillId, isPrimary: ((_k = b.currentAction) === null || _k === void 0 ? void 0 : _k.primaryTargetId) === L.id, origin: $ }); if (yb(b, L), m <= 0)
    b.applyHpZero(L, v, (_l = b.currentAction) === null || _l === void 0 ? void 0 : _l.skillId, j, $); return N; }
function lb(b, v, L) { let W = v.hpDamageThisRound; v.hpDamageThisRound = { round: b.state.round, amount: ((W === null || W === void 0 ? void 0 : W.round) === b.state.round ? W.amount : 0) + L }; }
function T1(b, v, L, W, j, B) { var _a, _c; let $ = L.statuses.find((J) => { var _a; return (_a = b.statusDefs.get(J.id)) === null || _a === void 0 ? void 0 : _a.redirectTaken; }), M = $ ? (_a = b.statusDefs.get($.id)) === null || _a === void 0 ? void 0 : _a.redirectTaken : void 0; if (!$ || !M)
    return W; let Z = gb(b.state, $.sourceId), Y = k(0, Math.floor(W * M.keep)), q = k(0, Math.floor(W * M.toCaster)); if (Z && K(Z) && Z.id !== L.id && q > 0) {
    let J = B === w.Status ? q : k0(b, Z, q);
    if (J <= 0)
        return Y;
    let V = k(0, Z.attrs.hp - J);
    if (lb(b, Z, Z.attrs.hp - V), Z.attrs.hp = V, b.emit({ type: F.Damage, sourceId: v.id, targetId: Z.id, amount: J, hpAfter: V, kind: j }), V <= 0)
        b.applyHpZero(Z, v, (_c = b.currentAction) === null || _c === void 0 ? void 0 : _c.skillId);
} return Y; }
function Lb(b, v, L, W, j = !1, B = !1, $ = !0) { var _a, _c, _d; if (L.flags.dead || L.flags.escaped || L.flags.downed)
    return; if (r(b.skills, L).some((G) => { var _a; return (_a = G.innate) === null || _a === void 0 ? void 0 : _a.rejectHpRecovery; }))
    return; if (j) {
    let G = g(v0, W + v.attrs.healPower);
    L.attrs.maxHp += G, b.emit({ type: F.Heal, sourceId: v.id, targetId: L.id, amount: G, hpAfter: L.attrs.hp });
    return;
} let M = g(v0, W + (B || !$ ? 0 : n(v).healPower)), Z = ((_a = b.currentAction) === null || _a === void 0 ? void 0 : _a.primaryTargetId) !== void 0 && L.id === b.currentAction.primaryTargetId, Y = a0(L) * (B ? 1 : Ib(v)), q = b.hooks.emit(C.OnHealCalc, { origin: b.suppressHooks > 0 ? w.HookDerived : w.ActionDirect, source: v, target: L, heal: M * Y, skillId: (_c = b.currentAction) === null || _c === void 0 ? void 0 : _c.skillId, isPrimary: Z }), J = g(0, B ? M * Y : (_d = q.heal) !== null && _d !== void 0 ? _d : M * Y), V = Math.min(e(L), L.attrs.hp + J), X = V - L.attrs.hp; if (L.attrs.hp = V, X > 0)
    b.emit({ type: F.Heal, sourceId: v.id, targetId: L.id, amount: X, hpAfter: V }); }
function Jb(b, v, L, W, j = !1) { if (L.flags.escaped)
    return !1; if (!j && r(b.skills, L).some((M) => { var _a; return (_a = M.innate) === null || _a === void 0 ? void 0 : _a.rejectHpRecovery; }))
    return !1; if (!(L.flags.downed || L.flags.dead || L.attrs.hp <= 0))
    return !1; if (A0(b, L))
    return b.emit({ type: F.ActionFailed, unitId: v.id, reason: t.ReviveBlocked }), !1; let $ = Math.max(s, Math.min(e(L), Math.floor(W))); return L.attrs.hp = $, L.flags.downed = !1, L.flags.dead = !1, L.flags.revivedRound = b.state.round, b.emit({ type: F.UnitRevived, unitId: L.id, hp: $ }), b.emit({ type: F.Heal, sourceId: v.id, targetId: L.id, amount: $, hpAfter: $ }), !0; }
function xb(b, v, L, W, j = {}) { if (L.flags.escaped)
    return 0; if (r(b.skills, L).some(($) => { var _a; return (_a = $.innate) === null || _a === void 0 ? void 0 : _a.rejectHpRecovery; }))
    return 0; if (j.revive && L.attrs.hp <= 0) {
    if (A0(b, L))
        return b.emit({ type: F.ActionFailed, unitId: v.id, reason: t.ReviveBlocked }), 0;
    if (j.clearStatuses)
        Wb(b, L);
    let $ = Math.max(s, Math.min(e(L), Math.floor(W)));
    return L.attrs.hp = $, L.flags.downed = !1, L.flags.dead = !1, L.flags.revivedRound = b.state.round, b.emit({ type: F.UnitRevived, unitId: L.id, hp: $ }), b.emit({ type: F.Heal, sourceId: v.id, targetId: L.id, amount: $, hpAfter: $ }), $;
} if (!K(L) && !(j.allowFatal && L.attrs.hp <= 0 && !L.flags.downed && !L.flags.dead && !L.flags.benched))
    return 0; let B = Math.max(0, Math.min(e(L) - L.attrs.hp, Math.floor(W))); if (B <= 0)
    return 0; return L.attrs.hp += B, b.emit({ type: F.Heal, sourceId: v.id, targetId: L.id, amount: B, hpAfter: L.attrs.hp }), B; }
function $b(b, v, L, W) { if (!K(L))
    return; let j = Math.max(0, Math.min(L.attrs.mp, Math.floor(W))); if (L.attrs.mp -= j, j > 0)
    b.emit({ type: F.MpDamage, sourceId: v.id, targetId: L.id, amount: j, mpAfter: L.attrs.mp }); }
function Qb(b, v, L, W) { l0(b, v, L, W); }
function l0(b, v, L, W) { if (L.flags.dead || L.flags.escaped)
    return; let j = L.wound; if (L.wound = Math.max(0, Math.min(L.attrs.maxHp - s, j + Math.floor(W))), L.wound === j)
    return; L.attrs.hp = Math.min(L.attrs.hp, e(L)), b.emit({ type: F.WoundChanged, sourceId: v.id, targetId: L.id, before: j, after: L.wound, hpAfter: L.attrs.hp, recoverableHpAfter: e(L) }); }
var F4 = new Set([G0.Item, G0.Catch]);
var E1 = { [U.Repeat]: (b, v, L, W, j, B) => { let $ = W.min + Math.floor(b.rng.next() * (W.max - W.min + 1)); for (let M = 0; M < $ && K(v) && !b.state.result; M++)
        nb(b, v, L, W.effects, j, B, !0); }, [U.ModifyFact]: (b, v, L, W, j, B) => { var _a; ((_a = v.combatFacts) !== null && _a !== void 0 ? _a : (v.combatFacts = {}))[W.key] = P(W.value, { ...B, state: b.state }); }, [U.ModifyStatusDuration]: (b, v, L, W, j, B) => { for (let $ of j) {
        let M = $.statuses.filter((Z) => { var _a, _c; let Y = b.statusDefs.get(Z.id); return (!W.ownedOnly || Z.sourceId === v.id) && (((_a = W.kinds) === null || _a === void 0 ? void 0 : _a.includes(Z.kind)) || (Y === null || Y === void 0 ? void 0 : Y.dispellable) !== !1 && (Y === null || Y === void 0 ? void 0 : Y.category) && ((_c = W.categories) === null || _c === void 0 ? void 0 : _c.includes(Y.category))); });
        if (W.random)
            for (let Z = M.length - 1; Z > 0; Z--) {
                let Y = Math.floor(b.rng.next() * (Z + 1));
                [M[Z], M[Y]] = [M[Y], M[Z]];
            }
        for (let Z of M.slice(0, W.maxCount))
            if (Z.remainingRounds += Math.floor(P(W.amount, { ...B, target: $, state: b.state })), Z.remainingRounds <= 0)
                $0(b, $, Z.id, u.Consumed, Z.sourceId);
    } }, [U.ModifyCooldown]: (b, v, L, W, j, B) => { var _a; let $ = (_a = v.cooldowns) === null || _a === void 0 ? void 0 : _a[W.skillId]; if ($ !== void 0 && $ > b.state.round)
        v.cooldowns[W.skillId] = Math.max(b.state.round, $ + Math.floor(P(W.amount, { ...B, state: b.state }))); }, [U.LoseHp]: (b, v, L, W, j, B) => { for (let $ of j)
        Q0(b, v, $, Math.max(0, Math.floor(P(W.power, { ...B, target: $ }))), O.Fixed, !0, w.Status); }, [U.RandomBranch]: y1, [U.SkipNextAction]: (b, v) => { v.flags.skipNextAction = !0; }, [U.ApplyStatus]: f1, [U.RemoveStatus]: r1, [U.CopyStatus]: a1, [U.EmitMechanic]: (b, v, L, W, j) => { var _a; b.emit({ type: F.MechanicTriggered, mechanicId: W.mechanicId, name: W.name, sourceId: v.id, targetId: (_a = j[0]) === null || _a === void 0 ? void 0 : _a.id }); }, [U.Dispel]: k1, [U.Heal]: (b, v, L, W, j, B) => { for (let $ of j)
        Lb(b, v, $, P(W.power, { ...B, target: $ }), W.healMaxHp, W.fixedBase, W.includeHealPower); }, [U.RestoreHp]: o1, [U.RestoreMp]: g1, [U.Revive]: l1, [U.DamageMp]: (b, v, L, W, j, B) => { let $ = P(W.power, B); for (let M of j)
        $b(b, v, M, $); }, [U.Wound]: (b, v, L, W, j, B) => { let $ = P(W.power, B); for (let M of j)
        Qb(b, v, M, $); }, [U.RemoveWound]: (b, v, L, W, j, B) => { var _a, _c; for (let $ of j) {
        let M = Math.max(0, P(W.power, { ...B, target: $ })), Z = b.hooks.emit("onWoundCalc", { source: v, target: $, wound: M, skillId: (_a = b.currentAction) === null || _a === void 0 ? void 0 : _a.skillId });
        l0(b, v, $, -Math.max(0, Math.floor((_c = Z.wound) !== null && _c !== void 0 ? _c : M)));
    } }, [U.ApplyBarrier]: (b, v, L, W, j, B) => { var _a, _c; for (let $ of j)
        bb(b, v, $, { id: W.id, kind: W.kind, name: W.name, amount: (_c = b.hooks.emit("onBarrierCalc", { origin: b.suppressHooks > 0 ? w.HookDerived : w.ActionDirect, source: v, target: $, barrier: P(W.power, { ...B, target: $ }), skillId: (_a = b.currentAction) === null || _a === void 0 ? void 0 : _a.skillId }).barrier) !== null && _c !== void 0 ? _c : 0, duration: P(W.duration, { ...B, target: $ }), untilBattleEnd: W.untilBattleEnd }); }, [U.PhysicalHit]: Yb, [U.SpellHit]: Yb, [U.FixedHit]: Yb, [U.ModifyStrike]: () => { return; }, [U.ModifyDefenseIgnore]: () => { return; }, [U.ModifyHeal]: () => { return; }, [U.ModifyBarrier]: () => { return; }, [U.ModifyWound]: () => { return; }, [U.SetCrit]: () => { return; }, [U.ModifyResource]: p1, [U.ModifyChance]: () => { return; }, [U.ClearSkipNextAction]: (b, v) => { v.flags.skipNextAction = !1; } };
function y1(b, v, L, W, j, B) { var _a; let $ = Math.min(1, Math.max(0, P(W.chance, B))), M = b.rng.chance($); b.emit({ type: F.ChanceResolved, branchId: W.branchId, sourceId: v.id, targetId: (_a = j[0]) === null || _a === void 0 ? void 0 : _a.id, chance: $, success: M }); let Z = M ? W.successEffects : W.failureEffects; nb(b, v, L, Z, j, B); }
function nb(b, v, L, W, j, B, $ = !1) { var _a, _c; for (let M of W) {
    if ($ && (!K(v) || b.state.result))
        break;
    let Z = M.targeting ? g0(b, v, { ...L, targeting: M.targeting }, j.map((J) => J.id)) : j, Y = M.when ? Z.filter((J) => J0(b, M.when, { source: v, target: J, skill: L, skillId: L.id })) : Z;
    if (Z.length > 0 && Y.length === 0)
        continue;
    let q = { ...B, target: (_a = Y[0]) !== null && _a !== void 0 ? _a : B.target, targetStatusStacks: D0(b, M.when, (_c = Y[0]) !== null && _c !== void 0 ? _c : B.target) };
    Vb(b, v, L, M, Y, q);
} }
function o1(b, v, L, W, j, B) { var _a, _c; let $ = k(0, Math.floor(P(W.power, B))), M = b.currentAction, Z = `${v.id}:${L.id}`; if (W.maxGainPerAction !== void 0 && M) {
    let Y = k(0, Math.floor(P(W.maxGainPerAction, B)));
    $ = Math.min($, Math.max(0, Y - ((_a = M.hpRestoreGains[Z]) !== null && _a !== void 0 ? _a : 0)));
} for (let Y of j) {
    let q = xb(b, v, Y, $, { revive: W.revive, allowFatal: W.allowFatal, clearStatuses: W.clearStatuses });
    if (M && q > 0)
        M.hpRestoreGains[Z] = ((_c = M.hpRestoreGains[Z]) !== null && _c !== void 0 ? _c : 0) + q;
} }
function Vb(b, v, L, W, j, B) { var _a, _c; if (B = { ...B, state: b.state, normalTargetIds: (_a = b.currentAction) === null || _a === void 0 ? void 0 : _a.normalTargetIds, killedTargetIds: (_c = b.currentAction) === null || _c === void 0 ? void 0 : _c.killedTargetIds }, W.type !== U.SkipNextAction && W.type !== U.RandomBranch && W.type !== U.Repeat && W.type !== U.ApplyStatus && W.type !== U.RemoveStatus && W.type !== U.CopyStatus && W.type !== U.EmitMechanic && W.type !== U.Dispel && W.type !== U.ModifyStrike && W.type !== U.ModifyDefenseIgnore && W.type !== U.ModifyHeal && W.type !== U.SetCrit && W.type !== U.ModifyResource && W.type !== U.ModifyFact && W.type !== U.ModifyChance && W.type !== U.ClearSkipNextAction) {
    if (j.length === 0) {
        b.emit({ type: F.ActionFailed, unitId: v.id, reason: t.NoTarget });
        return;
    }
} let $ = E1[W.type]; $(b, v, L, W, j, B); }
function ib(b, v) { return b.statuses.filter((L) => { var _a, _c; return ((_a = v.statusIds) === null || _a === void 0 ? void 0 : _a.includes(L.id)) || ((_c = v.kinds) === null || _c === void 0 ? void 0 : _c.includes(L.kind)); }).sort((L, W) => L.appliedRound - W.appliedRound || L.id.localeCompare(W.id)); }
function r1(b, v, L, W, j, B) { for (let $ of j) {
    let M = W.maxCount === void 0 ? Number.POSITIVE_INFINITY : Math.max(0, Math.floor(P(W.maxCount, { ...B, target: $ })));
    for (let Z of ib($, W).filter((Y) => !W.ownedOnly || Y.sourceId === v.id).slice(0, M))
        $0(b, $, Z.id, u.Consumed, W.ownedOnly ? v.id : void 0);
} }
function a1(b, v, L, W, j, B) { var _a, _c; let $ = (_a = b.currentAction) === null || _a === void 0 ? void 0 : _a.primaryTargetId, M = $ ? b.state.units.find((J) => J.id === $) : void 0; if (!M)
    return; let Z = W.maxCount === void 0 ? Number.POSITIVE_INFINITY : Math.max(0, Math.floor(P(W.maxCount, B))), Y = ib(M, W).slice(0, Z), q = Math.floor(P((_c = W.durationAdd) !== null && _c !== void 0 ? _c : 0, B)); for (let J of j) {
    if (J.id === M.id)
        continue;
    for (let V of Y)
        Eb(b, v, J, V, q);
} }
function p1(b, v, L, W, j, B) { var _a, _c, _d; let $ = W.affectTarget ? j[0] : v; if (!$)
    return; let M = L0($, W.resourceId); if (!M)
    return; let Z = M.current, Y = Math.floor(P(W.amount, B)), q = b.currentAction, J = `${$.id}:${M.id}`; if (W.mode !== "set" && Y > 0 && W.maxGainPerAction !== void 0 && q) {
    let X = Math.max(0, Math.floor(P(W.maxGainPerAction, B)));
    Y = Math.min(Y, Math.max(0, X - ((_a = q.resourceGains[J]) !== null && _a !== void 0 ? _a : 0)));
} let V = W.mode === "set" ? Y : Z + Y; if (M.current = Math.min((_c = M.max) !== null && _c !== void 0 ? _c : Number.MAX_SAFE_INTEGER, Math.max(0, V)), M.current === Z)
    return; if (W.mode !== "set" && M.current > Z && q)
    q.resourceGains[J] = ((_d = q.resourceGains[J]) !== null && _d !== void 0 ? _d : 0) + M.current - Z; b.emit({ type: F.ResourceChanged, sourceId: v.id, unitId: $.id, resourceId: M.id, before: Z, after: M.current }); }
function f1(b, v, L, W, j, B) { var _a, _c, _d, _f, _g, _h, _j; let $ = W.self ? [v] : j, M = g(1, P(W.duration, B)); for (let Z of $) {
    if ((Z.flags.downed || Z.flags.dead) && !((_c = (_a = W.targeting) === null || _a === void 0 ? void 0 : _a.includeDowned) !== null && _c !== void 0 ? _c : L.targeting.includeDowned))
        continue;
    let Y = a(b, v, { target: Z, skill: L, skillId: L.id }), q = Y.reduce((G, _) => { var _a; return G + (((_a = _.statusDurationAdd) === null || _a === void 0 ? void 0 : _a.statusId) === W.statusId ? P(_.statusDurationAdd.amount, { ...B, target: Z, state: b.state }) : 0); }, 0), J = b.statusDefs.get(W.statusId), V = ((_d = b.currentAction) === null || _d === void 0 ? void 0 : _d.sourceId) === v.id ? (_f = v.skillOverrides[b.currentAction.skillId]) !== null && _f !== void 0 ? _f : b.skills.get(b.currentAction.skillId) : void 0;
    if (v.side !== Z.side && (J === null || J === void 0 ? void 0 : J.category) && J.category !== A.Buff && ((V !== null && V !== void 0 ? V : L).tags.includes("spell") || (V !== null && V !== void 0 ? V : L).tags.includes("seal"))) {
        let G = Math.min(0.25, Z.passives.reduce((_, h) => { var _a, _c, _d, _f; return _ + ((_f = (_d = (_c = ((_a = Z.skillOverrides[h]) !== null && _a !== void 0 ? _a : b.skills.get(h))) === null || _c === void 0 ? void 0 : _c.innate) === null || _d === void 0 ? void 0 : _d.negativeSpellResistance) !== null && _f !== void 0 ? _f : 0); }, 0));
        if (G > 0 && b.rng.chance(G)) {
            b.emit({ type: F.Miss, sourceId: v.id, targetId: Z.id, kind: j0.Seal });
            continue;
        }
    }
    if (((_g = W.hit) !== null && _g !== void 0 ? _g : j0.Always) === j0.Seal) {
        let G = a(b, Z, { target: v, skill: L, skillId: L.id }), _ = I(Y, "sealChanceAdd", v, Z, L, b) - I(G, "sealResistanceAdd", Z, v, L, b), h = b.rules.formulas.sealHitChance({ ...v, attrs: n(v) }, { ...Z, attrs: n(Z) }, B.skillLevel, L.sealBase, _), m = Y.reduce((i, n0) => { var _a; return i * P((_a = n0.sealChanceFactor) !== null && _a !== void 0 ? _a : 1, B); }, 1), N = Tb(b, Z, Y.flatMap((i) => { var _a; return (_a = i.ignoreSealStatusKinds) !== null && _a !== void 0 ? _a : []; })), S = Math.min((_h = b.rules.formulas.sealChanceCeil) !== null && _h !== void 0 ? _h : 1, Math.max(0, h * m * N));
        if (Z.statuses.some((i) => { var _a; return (_a = b.statusDefs.get(i.id)) === null || _a === void 0 ? void 0 : _a.immuneToSeal; }) || !b.rng.chance(S)) {
            b.emit({ type: F.Miss, sourceId: v.id, targetId: Z.id, kind: j0.Seal });
            continue;
        }
    }
    vb(b, Z, W.statusId, Math.max(1, Math.floor(M + q)), v.id, { storedTargetId: W.storeTarget ? Z.id === v.id ? (_j = B.target) === null || _j === void 0 ? void 0 : _j.id : Z.id : void 0, env: { ...B, target: Z } });
} }
function k1(b, v, L, W, j) { var _a, _c, _d, _f, _g, _h; var _j; let B = j.length ? j : [v]; for (let $ of B) {
    let M = (_a = W.categoryPriority) !== null && _a !== void 0 ? _a : [A.Control, A.Debuff, A.Dot, A.Buff], Z = W.maxCount === void 0 ? Number.POSITIVE_INFINITY : Math.max(0, Math.floor(P(W.maxCount, { skillLevel: 0, targets: 1, source: v, target: $ }))), Y = $.statuses.filter((q) => { var _a, _c, _d, _f, _g; let J = b.statusDefs.get(q.id); if ((J === null || J === void 0 ? void 0 : J.dispellable) === !1)
        return !1; if (W.schoolOnly && !(J === null || J === void 0 ? void 0 : J.school))
        return !1; if (((_a = W.includeStatusFlags) === null || _a === void 0 ? void 0 : _a.length) && !W.includeStatusFlags.some((V) => Boolean(J === null || J === void 0 ? void 0 : J[V])))
        return !1; if ((_c = W.excludeStatusFlags) === null || _c === void 0 ? void 0 : _c.some((V) => Boolean(J === null || J === void 0 ? void 0 : J[V])))
        return !1; return ((_d = W.statusIds) === null || _d === void 0 ? void 0 : _d.includes(q.id)) === !0 || ((_f = W.kinds) === null || _f === void 0 ? void 0 : _f.includes(q.kind)) === !0 || (J === null || J === void 0 ? void 0 : J.category) !== void 0 && ((_g = W.categories) === null || _g === void 0 ? void 0 : _g.includes(J.category)) === !0; }).sort((q, J) => { var _a, _c; let V = (_a = b.statusDefs.get(q.id)) === null || _a === void 0 ? void 0 : _a.category, X = (_c = b.statusDefs.get(J.id)) === null || _c === void 0 ? void 0 : _c.category, G = V === void 0 ? M.length : M.indexOf(V), _ = X === void 0 ? M.length : M.indexOf(X); return G - _ || q.appliedRound - J.appliedRound || q.id.localeCompare(J.id); });
    if (W.random)
        for (let q = Y.length - 1; q > 0; q--) {
            let J = Math.floor(b.rng.next() * (q + 1));
            [Y[q], Y[J]] = [Y[J], Y[q]];
        }
    for (let q of Y.slice(0, Z)) {
        let J = (_c = b.statusDefs.get(q.id)) === null || _c === void 0 ? void 0 : _c.dispelClass, V = (_f = (J ? (_d = W.chanceByClass) === null || _d === void 0 ? void 0 : _d[J] : void 0)) !== null && _f !== void 0 ? _f : W.chance;
        if (V !== void 0) {
            let X = b.rng.chance(V);
            if (b.emit({ type: F.ChanceResolved, branchId: `${L.id}.dispel.${q.id}`, sourceId: v.id, targetId: $.id, chance: V, success: X }), !X)
                continue;
        }
        if ($0(b, $, q.id, u.Dispel), W.preventReapplyThisRound || W.immunityRounds)
            ((_g = (_j = $.flags).statusImmunityThroughRound) !== null && _g !== void 0 ? _g : (_j.statusImmunityThroughRound = {}))[q.kind] = b.state.round + ((_h = W.immunityRounds) !== null && _h !== void 0 ? _h : 0);
    }
} }
function g1(b, v, L, W, j, B) { for (let $ of j) {
    let M = k(0, Math.floor(P(W.power, { ...B, target: $ }))), Z = Math.min($.attrs.maxMp, $.attrs.mp + M), Y = Z - $.attrs.mp;
    if ($.attrs.mp = Z, Y > 0)
        b.emit({ type: F.MpRestore, unitId: $.id, amount: Y, mpAfter: $.attrs.mp });
} }
function l1(b, v, L, W, j, B) { for (let $ of j) {
    let M = W.hpRatio !== void 0 ? $.attrs.maxHp * P(W.hpRatio, { ...B, target: $ }) : P(W.hp, { ...B, target: $ });
    Jb(b, v, $, W.respectHealTaken ? Math.floor(M) * a0($) : M);
} }
function Yb(b, v, L, W, j, B) { var _a, _c, _d, _f, _g, _h, _j, _k, _l; let $ = a(b, v, { skill: L, skillId: L.id }), M = g(1, P((_a = W.hits) !== null && _a !== void 0 ? _a : Db, B) + (W.type === U.PhysicalHit ? I($, "physicalHitsAdd", v, j[0], L) : 0)), Z = W.coeff, Y = Array.isArray(Z) ? Z : Array.from({ length: M }, () => Z !== null && Z !== void 0 ? Z : 1), q = (_c = W.formula) !== null && _c !== void 0 ? _c : L.formula, J = W.type === U.FixedHit ? !0 : W.trueDamage, X = W.type === U.FixedHit || J === !0 || q === x.Fixed || q === x.Judge ? O.Fixed : W.type === U.PhysicalHit ? O.Physical : O.Spell; for (let G of j) {
    if (((_d = W.when) === null || _d === void 0 ? void 0 : _d.targetSlot) === "primary" && ((_f = b.currentAction) === null || _f === void 0 ? void 0 : _f.primaryTargetId) !== G.id)
        continue;
    for (let _ = 0; _ < M; _++) {
        if (!K(v) || !K(G) || b.state.result)
            break;
        Zb(b, { percentageDamage: W.type === U.FixedHit ? W.percentageDamage : void 0, source: v, target: G, kind: X, coeff: (_h = (_g = Y[_]) !== null && _g !== void 0 ? _g : Y[Y.length - 1]) !== null && _h !== void 0 ? _h : 1, resultFactor: (_j = W.resultFactors) === null || _j === void 0 ? void 0 : _j[_], mpDamageRatio: W.type === U.PhysicalHit ? W.mpDamageRatio : void 0, power: P(W.power, { ...B, target: G }), trueDamage: J, defenseIgnore: W.type === U.PhysicalHit || W.type === U.SpellHit ? P((_k = W.defenseIgnore) !== null && _k !== void 0 ? _k : 0, B) : 0, cannotMiss: W.type === U.PhysicalHit ? W.cannotMiss : X === O.Fixed, cannotKill: W.cannotKill, formula: q, skillLevel: B.skillLevel, targetCount: B.targets, schoolTerm: L.schoolTerm, splash: L.splash, skillId: L.id, isPrimary: ((_l = b.currentAction) === null || _l === void 0 ? void 0 : _l.primaryTargetId) === G.id, origin: W.type === U.FixedHit ? W.origin : void 0 });
    }
} }
var tb = { $schema: "./progression.schema.json", formatVersion: 1, contentRevision: 3, pointsPerLevel: 5, experience: { base: 100, perLevel: 20, victoryPerEnemyLevel: 10, perLevelSquared: 0.5 }, lifespan: { deathLoss: 50, deployMinimum: 50, restRecoveryPerStone: 10 }, capture: { mpBase: 10, mpPerCarryLevel: 1, minChance: 0.1, maxChance: 0.85, baseChance: 0.35, missingHpFactor: 0.4, levelDifferenceFactor: 0.01 }, panel: { naturalBase: 10, naturalPerLevel: 1, health: { aptitudeCoefficient: 0.002895, attributeCoefficient: 7 }, mana: { aptitudeCoefficient: 0.002085, attributeCoefficient: 5 }, physicalAtk: { aptitudeCoefficient: 0.0025, attributeCoefficient: 1.6 }, physicalDef: { aptitudeCoefficient: 0.003345, attributeCoefficient: 2.4 }, magicAtk: { aptitudeCoefficient: 0.000845, attributeCoefficient: 1.3 }, speed: { aptitudeCoefficient: 0.002087, attributeCoefficient: 1.6 }, magicDef: { aptitudeCoefficient: 0.000611, attributeCoefficients: { constitution: 0.3, magic: 0.8, strength: 0.48, endurance: 0.16 } } } };
var b1 = { $schema: "./skills.schema.json", formatVersion: 1, contentRevision: 16, skills: [{ id: "beast.spirit-flame", name: "灵火", book: !0, advanced: !1, effect: { type: "spellHit", costMp: 10, coefficient: 1, powerBase: 10, powerPerLevel: 1 }, icon: "🔥", flavorText: "以灵火攻击一个目标，造成法术伤害。" }, { id: "beast.combo", name: "连击", book: !0, advanced: !1, effect: { type: "combo", chance: 0.45, coefficient: 1, physicalFactor: 0.75 }, icon: "⚔️", flavorText: "普通攻击命中后有机会追加一击，但自身造成的物理伤害会降低。" }, { id: "beast.advanced-combo", name: "高级连击", book: !0, advanced: !0, effect: { type: "combo", chance: 0.55, coefficient: 1, physicalFactor: 0.8 }, icon: "⚔️", flavorText: "普通攻击命中后有机会追加一击，但自身造成的物理伤害会降低。" }, { id: "beast.counter", name: "反击", book: !0, advanced: !1, effect: { type: "counter", chance: 0.3, coefficient: 0.5 }, icon: "↩️", flavorText: "受到物理攻击并损失气血时，有机会反击攻击者。" }, { id: "beast.advanced-counter", name: "高级反击", book: !0, advanced: !0, effect: { type: "counter", chance: 0.3, coefficient: 1 }, icon: "↩️", flavorText: "受到物理攻击并损失气血时，有机会反击攻击者。" }, { id: "beast.critical", name: "必杀", book: !0, advanced: !1, effect: { type: "critical", kind: "physical", chance: 0.1 }, icon: "💥", flavorText: "物理攻击更容易打出暴击。" }, { id: "beast.advanced-critical", name: "高级必杀", book: !0, advanced: !0, effect: { type: "critical", kind: "physical", chance: 0.2 }, icon: "💥", flavorText: "物理攻击更容易打出暴击。" }, { id: "beast.spell-critical", name: "灵法会心", book: !0, advanced: !1, effect: { type: "critical", kind: "spell", chance: 0.1 }, icon: "✨", flavorText: "法术攻击更容易打出暴击。" }, { id: "beast.advanced-spell-critical", name: "高级灵法会心", book: !0, advanced: !0, effect: { type: "critical", kind: "spell", chance: 0.15 }, icon: "✨", flavorText: "法术攻击更容易打出暴击。" }, { id: "beast.regeneration", name: "自愈", book: !0, advanced: !1, effect: { type: "regeneration", resource: "hp", levelDivisor: 2 }, icon: "🌱", flavorText: "每回合结束时恢复自身气血。" }, { id: "beast.advanced-regeneration", name: "高级自愈", book: !0, advanced: !0, effect: { type: "regeneration", resource: "hp", levelDivisor: 1 }, icon: "🌱", flavorText: "每回合结束时恢复自身气血。" }, { id: "beast.meditation", name: "回灵", book: !0, advanced: !1, effect: { type: "regeneration", resource: "mp", levelDivisor: 4 }, icon: "🧘", flavorText: "每回合结束时恢复自身法力。" }, { id: "beast.advanced-meditation", name: "高级回灵", book: !0, advanced: !0, effect: { type: "regeneration", resource: "mp", levelDivisor: 3 }, icon: "🧘", flavorText: "每回合结束时恢复自身法力。" }, { id: "beast.agility", name: "迅捷", book: !0, advanced: !1, effect: { type: "speed", factor: 1.1 }, icon: "💨", flavorText: "提高自身速度。" }, { id: "beast.advanced-agility", name: "高级迅捷", book: !0, advanced: !0, effect: { type: "speed", factor: 1.2 }, icon: "💨", flavorText: "提高自身速度。" }, { id: "beast.spell-mastery", name: "灵法精通", book: !0, advanced: !1, effect: { type: "spellBoost", factor: 1.1 }, icon: "🔮", flavorText: "提高自身造成的法术伤害。" }, { id: "beast.advanced-spell-mastery", name: "高级灵法精通", book: !0, advanced: !0, effect: { type: "spellBoost", factor: 1.2 }, icon: "🔮", flavorText: "提高自身造成的法术伤害。" }, { id: "beast.sluggish", name: "迟钝", book: !0, advanced: !1, effect: { type: "speed", factor: 0.8 }, icon: "🐢", flavorText: "降低自身速度。" }, { id: "beast.thunder", name: "雷击", book: !0, advanced: !1, effect: { type: "spellHit", costMp: 10, coefficient: 1, powerBase: 10, powerPerLevel: 1 }, icon: "⚡", flavorText: "以雷光攻击一个目标，造成法术伤害。" }, { id: "beast.falling-rock", name: "落岩", book: !0, advanced: !1, effect: { type: "spellHit", costMp: 10, coefficient: 1, powerBase: 10, powerPerLevel: 1 }, icon: "🪨", flavorText: "以落岩攻击一个目标，造成法术伤害。" }, { id: "beast.water-attack", name: "水击", book: !0, advanced: !1, effect: { type: "spellHit", costMp: 10, coefficient: 1, powerBase: 10, powerPerLevel: 1 }, icon: "💧", flavorText: "以水流攻击一个目标，造成法术伤害。" }, { id: "beast.lifesteal", name: "噬血", book: !0, advanced: !1, effect: { type: "lifesteal", ratio: 0.25 }, icon: "🩸", flavorText: "物理攻击使目标损失气血时，按伤害量恢复自身气血。" }, { id: "beast.advanced-lifesteal", name: "高级噬血", book: !0, advanced: !0, effect: { type: "lifesteal", ratio: 0.3 }, icon: "🩸", flavorText: "物理攻击使目标损失气血时，按伤害量恢复自身气血。" }, { id: "beast.reflection", name: "反震", book: !0, advanced: !1, effect: { type: "reflection", kind: "physical", chance: 0.3, ratio: 0.25 }, icon: "🪞", flavorText: "受到物理攻击并损失气血时，有机会将部分伤害反震给攻击者。" }, { id: "beast.advanced-reflection", name: "高级反震", book: !0, advanced: !0, effect: { type: "reflection", kind: "physical", chance: 0.3, ratio: 0.5 }, icon: "🪞", flavorText: "受到物理攻击并损失气血时，有机会将部分伤害反震给攻击者。" }, { id: "beast.divine-revival", name: "涅槃重生", book: !0, advanced: !1, effect: { type: "divineRevival", chance: 0.2, hpRatio: 0.6 }, icon: "🪷", flavorText: "受到致命伤害时，有机会复生并恢复气血。" }, { id: "beast.advanced-divine-revival", name: "高级涅槃重生", book: !0, advanced: !0, effect: { type: "divineRevival", chance: 0.3, hpRatio: 1 }, icon: "🪷", flavorText: "受到致命伤害时，有机会复生并恢复气血。" }, { id: "beast.spell-reflection", name: "灵法反震", book: !0, advanced: !1, effect: { type: "reflection", kind: "spell", chance: 0.3, ratio: 0.25 }, icon: "🔷", flavorText: "受到法术攻击并损失气血时，有机会将部分伤害反震给施术者。" }, { id: "beast.advanced-spell-reflection", name: "高级灵法反震", book: !0, advanced: !0, effect: { type: "reflection", kind: "spell", chance: 0.3, ratio: 0.5 }, icon: "🔷", flavorText: "受到法术攻击并损失气血时，有机会将部分伤害反震给施术者。" }, { id: "beast.wisdom", name: "慧根", book: !0, advanced: !1, effect: { type: "wisdom", factor: 0.75 }, icon: "💡", flavorText: "施展法术消耗的法力减少。" }, { id: "beast.advanced-wisdom", name: "高级慧根", book: !0, advanced: !0, effect: { type: "wisdom", factor: 0.5 }, icon: "💡", flavorText: "施展法术消耗的法力减少。" }, { id: "beast.sneak-attack", name: "偷袭", book: !0, advanced: !1, effect: { type: "sneakAttack", factor: 1.05 }, icon: "🥷", flavorText: "提高自身物理伤害，物理攻击不会触发目标的反击或反震。" }, { id: "beast.advanced-sneak-attack", name: "高级偷袭", book: !0, advanced: !0, effect: { type: "sneakAttack", factor: 1.1 }, icon: "🥷", flavorText: "提高自身物理伤害，物理攻击不会触发目标的反击或反震。" }, { id: "beast.spell-resistance", name: "御法", book: !0, advanced: !1, effect: { type: "spellResistance", takenFactor: 0.95, physicalFactor: 0.9 }, icon: "🔰", flavorText: "降低所受法术伤害，但自身造成的物理伤害也会降低。" }, { id: "beast.advanced-spell-resistance", name: "高级御法", book: !0, advanced: !0, effect: { type: "spellResistance", takenFactor: 0.9, physicalFactor: 0.9 }, icon: "🔰", flavorText: "降低所受法术伤害，但自身造成的物理伤害也会降低。" }, { id: "beast.parry", name: "招架", book: !0, advanced: !1, effect: { type: "parry", factor: 0.9 }, icon: "🤺", flavorText: "每回合首次被物理攻击命中时，减轻该次伤害。" }, { id: "beast.advanced-parry", name: "高级招架", book: !0, advanced: !0, effect: { type: "parry", factor: 0.8 }, icon: "🤺", flavorText: "每回合首次被物理攻击命中时，减轻该次伤害。" }, { id: "beast.defense", name: "铁骨", book: !0, advanced: !1, effect: { type: "defenseTraining", perLevel: 0.6, spellFactor: 0.9 }, icon: "🛡️", flavorText: "物理防御随等级提高，但自身造成的法术伤害降低。" }, { id: "beast.advanced-defense", name: "高级铁骨", book: !0, advanced: !0, effect: { type: "defenseTraining", perLevel: 0.8, spellFactor: 0.95 }, icon: "🛡️", flavorText: "物理防御随等级提高，但自身造成的法术伤害降低。" }, { id: "beast.strength", name: "蛮力", book: !0, advanced: !1, effect: { type: "strengthTraining", perLevel: 0.4, versusDefenseFactor: 0.8 }, icon: "💪", flavorText: "物理攻击随等级提高，能够破开招架。" }, { id: "beast.advanced-strength", name: "高级蛮力", book: !0, advanced: !0, effect: { type: "strengthTraining", perLevel: 0.55, versusDefenseFactor: 0.8 }, icon: "💪", flavorText: "物理攻击随等级提高，能够破开招架。" }, { id: "beast.thunderstorm", name: "九霄神雷", book: !0, advanced: !0, effect: { type: "groupSpell", costMp: 20, coefficient: 0.8, powerBase: 10, powerPerLevel: 1, levelsPerTarget: 30, maxTargets: 3 }, icon: "🌩️", flavorText: "雷光扫过敌方，造成法术伤害；等级越高，可攻击的目标越多。" }, { id: "beast.mountain-crush", name: "山崩地裂", book: !0, advanced: !0, effect: { type: "groupSpell", costMp: 20, coefficient: 0.8, powerBase: 10, powerPerLevel: 1, levelsPerTarget: 30, maxTargets: 3 }, icon: "⛰️", flavorText: "山石砸向敌方，造成法术伤害；等级越高，可攻击的目标越多。" }, { id: "beast.flood", name: "翻江倒海", book: !0, advanced: !0, effect: { type: "groupSpell", costMp: 20, coefficient: 0.8, powerBase: 10, powerPerLevel: 1, levelsPerTarget: 30, maxTargets: 3 }, icon: "🌊", flavorText: "巨浪冲向敌方，造成法术伤害；等级越高，可攻击的目标越多。" }, { id: "beast.wildfire", name: "红莲业火", book: !0, advanced: !0, effect: { type: "groupSpell", costMp: 20, coefficient: 0.8, powerBase: 10, powerPerLevel: 1, levelsPerTarget: 30, maxTargets: 3 }, icon: "🌋", flavorText: "烈焰席卷敌方，造成法术伤害；等级越高，可攻击的目标越多。" }, { id: "beast.spell-combo", name: "灵法连击", book: !0, advanced: !1, effect: { type: "spellRepeat", chance: 0.2, factor: 0.5 }, icon: "🌀", flavorText: "施放伤害法术后，有机会对原目标再施放一次同一法术。" }, { id: "beast.advanced-spell-combo", name: "高级灵法连击", book: !0, advanced: !0, effect: { type: "spellRepeat", chance: 0.3, factor: 0.5 }, icon: "🌀", flavorText: "施放伤害法术后，有机会对原目标再施放一次同一法术。" }, { id: "beast.spell-fluctuation", name: "法威无常", book: !0, advanced: !1, effect: { type: "spellFluctuation", min: 0.8, max: 1.25, suppressReflection: !1 }, icon: "🎲", flavorText: "法术伤害忽高忽低。" }, { id: "beast.advanced-spell-fluctuation", name: "高级法威无常", book: !0, advanced: !0, effect: { type: "spellFluctuation", min: 0.5, max: 1.6, suppressReflection: !0 }, icon: "🎲", flavorText: "法术伤害起伏更大，法术攻击也不会触发灵法反震。" }, { id: "beast.stealth", name: "隐身", book: !0, advanced: !1, effect: { type: "stealth", minDuration: 2, maxDuration: 3, physicalFactor: 0.8 }, icon: "🌫️", flavorText: "首次出战时隐身数回合，期间不能施法，造成的物理伤害降低。" }, { id: "beast.advanced-stealth", name: "高级隐身", book: !0, advanced: !0, effect: { type: "stealth", minDuration: 3, maxDuration: 5, physicalFactor: 0.85 }, icon: "🌫️", flavorText: "首次出战时隐身数回合，期间不能施法，造成的物理伤害降低。" }, { id: "beast.perception", name: "灵觉", book: !0, advanced: !1, effect: { type: "perception", dodgeBonus: 0 }, icon: "👁️", flavorText: "能看破隐身，攻击隐身目标。" }, { id: "beast.advanced-perception", name: "高级灵觉", book: !0, advanced: !0, effect: { type: "perception", dodgeBonus: 10 }, icon: "👁️", flavorText: "能看破隐身并攻击隐身目标，自身躲避也会提高。" }, { id: "beast.poison", name: "毒性", book: !0, advanced: !1, effect: { type: "poison", chance: 0.15, duration: 3, hpRatio: 0.02, mpRatio: 0.01, immune: !1 }, icon: "☠️", flavorText: "普攻伤到目标后，有机会使其中毒，持续损失气血和法力。" }, { id: "beast.advanced-poison", name: "高级毒性", book: !0, advanced: !0, effect: { type: "poison", chance: 0.2, duration: 3, hpRatio: 0.02, mpRatio: 0.01, immune: !0 }, icon: "☠️", flavorText: "普攻伤到目标后，有机会使其中毒，持续损失气血和法力；自身免疫此毒。" }, { id: "beast.miracle", name: "解厄", book: !0, advanced: !1, effect: { type: "miracle", immune: !1 }, icon: "🌟", flavorText: "每回合结束时解除自身可驱散的控制、减益和持续伤害。" }, { id: "beast.advanced-miracle", name: "高级避厄", book: !0, advanced: !0, effect: { type: "miracle", immune: !0 }, icon: "🌟", flavorText: "免疫可驱散的控制、减益和持续伤害。" }, { id: "beast.concentration", name: "定神", book: !0, advanced: !1, effect: { type: "concentration", physicalFactor: 0.8, dodgeBonus: 0 }, icon: "🧠", flavorText: "免疫可驱散的控制，但自身造成的物理伤害降低。" }, { id: "beast.advanced-concentration", name: "高级定神", book: !0, advanced: !0, effect: { type: "concentration", physicalFactor: 0.8, dodgeBonus: 10 }, icon: "🧠", flavorText: "免疫可驱散的控制，提高自身躲避，但造成的物理伤害降低。" }, { id: "beast.eternity", name: "灵效绵长", book: !0, advanced: !1, effect: { type: "eternity", factor: 1.5, maxExtra: 3 }, icon: "⏳", flavorText: "自身获得的部分增益持续更久。" }, { id: "beast.advanced-eternity", name: "高级灵效绵长", book: !0, advanced: !0, effect: { type: "eternity", factor: 2, maxExtra: 6 }, icon: "⏳", flavorText: "自身获得的部分增益持续更久。" }, { id: "beast.ghost", name: "灵魂体", book: !0, advanced: !1, effect: { type: "ghost", delay: 5 }, icon: "👻", flavorText: "死亡后等待数回合复起，但无法接受普通气血恢复。" }, { id: "beast.advanced-ghost", name: "高级灵魂体", book: !0, advanced: !0, effect: { type: "ghost", delay: 5 }, icon: "👻", flavorText: "死亡后等待数回合复起，但无法接受普通气血恢复。" }, { id: "beast.exorcism", name: "镇魂", book: !0, advanced: !1, effect: { type: "exorcism", factor: 1.5 }, icon: "🧿", flavorText: "攻击灵魂体目标时伤害提高，击杀后阻止其复起。" }, { id: "beast.advanced-exorcism", name: "高级镇魂", book: !0, advanced: !0, effect: { type: "exorcism", factor: 2 }, icon: "🧿", flavorText: "攻击灵魂体目标时伤害提高，击杀后阻止其复起。" }, { id: "beast.denial", name: "绝灵", book: !0, advanced: !1, effect: { type: "denial", ghostDamageFactor: 1.2, spellFactor: 1 }, icon: "🚫", flavorText: "免疫控制、减益和持续伤害，无法获得增益；更怕灵魂体攻击。" }, { id: "beast.advanced-denial", name: "高级绝灵", book: !0, advanced: !0, effect: { type: "denial", ghostDamageFactor: 1.2, spellFactor: 0.8 }, icon: "🚫", flavorText: "免疫控制、减益和持续伤害，无法获得增益；减轻法术伤害，却更怕灵魂体攻击。" }], families: [{ normal: "beast.combo", advanced: "beast.advanced-combo" }, { normal: "beast.counter", advanced: "beast.advanced-counter" }, { normal: "beast.critical", advanced: "beast.advanced-critical" }, { normal: "beast.spell-critical", advanced: "beast.advanced-spell-critical" }, { normal: "beast.regeneration", advanced: "beast.advanced-regeneration" }, { normal: "beast.meditation", advanced: "beast.advanced-meditation" }, { normal: "beast.agility", advanced: "beast.advanced-agility" }, { normal: "beast.spell-mastery", advanced: "beast.advanced-spell-mastery" }, { normal: "beast.lifesteal", advanced: "beast.advanced-lifesteal" }, { normal: "beast.reflection", advanced: "beast.advanced-reflection" }, { normal: "beast.divine-revival", advanced: "beast.advanced-divine-revival" }, { normal: "beast.spell-reflection", advanced: "beast.advanced-spell-reflection" }, { normal: "beast.wisdom", advanced: "beast.advanced-wisdom" }, { normal: "beast.sneak-attack", advanced: "beast.advanced-sneak-attack" }, { normal: "beast.spell-resistance", advanced: "beast.advanced-spell-resistance" }, { normal: "beast.parry", advanced: "beast.advanced-parry" }, { normal: "beast.defense", advanced: "beast.advanced-defense" }, { normal: "beast.strength", advanced: "beast.advanced-strength" }, { normal: "beast.spell-combo", advanced: "beast.advanced-spell-combo" }, { normal: "beast.spell-fluctuation", advanced: "beast.advanced-spell-fluctuation" }, { normal: "beast.stealth", advanced: "beast.advanced-stealth" }, { normal: "beast.perception", advanced: "beast.advanced-perception" }, { normal: "beast.poison", advanced: "beast.advanced-poison" }, { normal: "beast.miracle", advanced: "beast.advanced-miracle" }, { normal: "beast.concentration", advanced: "beast.advanced-concentration" }, { normal: "beast.eternity", advanced: "beast.advanced-eternity" }, { normal: "beast.ghost", advanced: "beast.advanced-ghost" }, { normal: "beast.exorcism", advanced: "beast.advanced-exorcism" }, { normal: "beast.denial", advanced: "beast.advanced-denial" }] };
var v1 = { $schema: "./species.schema.json", formatVersion: 2, contentRevision: 11, species: [{ id: "combat.wild.species.spirit-fox", name: "烛尾狐", realm: "炼气", icon: "🦊", description: "灰白小狐，尾端长毛聚起灵火时宛如烛芯；夜间常蹲在灵泉旁，将蓬尾绕至身前，以尾尖火光映脸。", carryLevel: 5, starter: !0, aptitudes: { attack: { min: 672, max: 840 }, defense: { min: 864, max: 1080 }, health: { min: 2880, max: 3600 }, mana: { min: 1536, max: 1920 }, speed: { min: 864, max: 1080 } }, growthMilli: { min: 982, max: 1030 }, birthSkills: { core: ["beast.spirit-flame"], candidates: ["beast.wisdom", "beast.meditation"] } }, { id: "combat.wild.species.rock-boar", name: "钢背猪", realm: "炼气", icon: "🐗", description: "身躯矮壮，肩背高耸，钢灰硬皮自颈后连至臀部；性情暴躁，稍受惊扰便喷鼻冲撞，受击时立即转身顶向来敌。", carryLevel: 5, starter: !0, aptitudes: { attack: { min: 816, max: 1020 }, defense: { min: 1180, max: 1440 }, health: { min: 3960, max: 4950 }, mana: { min: 1536, max: 1920 }, speed: { min: 576, max: 720 } }, growthMilli: { min: 1012, max: 1060 }, birthSkills: { core: ["beast.defense"], candidates: ["beast.counter", "beast.sluggish", "beast.strength"] } }, { id: "combat.wild.species.wind-wolf", name: "精灵狼", realm: "炼气", icon: "🐺", description: "身形轻瘦，灰银细毛，耳尖与尾缘泛着淡青光泽；警觉时隐去身形，潜伏于幽林，待猎物走近才突然扑出。", carryLevel: 5, starter: !0, aptitudes: { attack: { min: 1104, max: 1380 }, defense: { min: 624, max: 780 }, health: { min: 2160, max: 2700 }, mana: { min: 960, max: 1200 }, speed: { min: 864, max: 1080 } }, growthMilli: { min: 952, max: 1000 }, birthSkills: { core: ["beast.stealth"], candidates: ["beast.sneak-attack", "beast.agility"] } }, { id: "combat.wild.species.mimi", name: "咪咪", realm: "炼气", icon: "icon:beast-mimi", description: "银灰虎斑的小灵猫，圆脸短足，胸腹雪白，四爪如穿白袜。常将前爪拢在胸前伏成一团，长尾绕身；灵息稍有异动，便竖耳抬头，以黄绿圆眼凝望来处。", carryLevel: 5, starter: !0, aptitudes: { attack: { min: 780, max: 1050 }, defense: { min: 820, max: 1090 }, health: { min: 3300, max: 4300 }, mana: { min: 1320, max: 1800 }, speed: { min: 720, max: 990 } }, growthMilli: { min: 990, max: 1060 }, birthSkills: { core: [], candidates: ["beast.perception", "beast.parry", "beast.regeneration"] } }, { id: "combat.wild.species.fire-crow", name: "火鸦", realm: "筑基", icon: "icon:beast-fire-crow", description: "黑羽赤喉，翼下藏有暗红火羽，振翅时散出火星；常衔焦枝，在地火裂隙旁筑巢。", carryLevel: 25, starter: !1, aptitudes: { attack: { min: 720, max: 980 }, defense: { min: 700, max: 940 }, health: { min: 2700, max: 3500 }, mana: { min: 1800, max: 2300 }, speed: { min: 950, max: 1280 } }, growthMilli: { min: 1020, max: 1090 }, birthSkills: { core: ["beast.wildfire"], candidates: ["beast.meditation", "beast.spell-fluctuation"] } }, { id: "combat.wild.species.red-tail-scorpion", name: "双尾蝎", realm: "筑基", icon: "🦂", description: "沙褐甲壳，腹后生着两条暗红毒尾，静伏时交叠于背，受惊后分别扬起；白日藏石缝，夜间循震动捕猎。", carryLevel: 25, starter: !1, aptitudes: { attack: { min: 1050, max: 1390 }, defense: { min: 1040, max: 1320 }, health: { min: 2500, max: 3300 }, mana: { min: 900, max: 1250 }, speed: { min: 780, max: 1150 } }, growthMilli: { min: 1010, max: 1080 }, birthSkills: { core: ["beast.poison"], candidates: ["beast.sneak-attack", "beast.defense"] } }, { id: "combat.wild.species.stoneback-bear", name: "抱月熊", realm: "筑基", icon: "🐻", description: "深褐长毛，胸腹有浅金圆斑，常坐倚老树，前掌拢腹如抱满月；受伤后蜷身长眠，受逼近时骤起反扑。", carryLevel: 25, starter: !1, aptitudes: { attack: { min: 1100, max: 1420 }, defense: { min: 980, max: 1260 }, health: { min: 4100, max: 5300 }, mana: { min: 1100, max: 1500 }, speed: { min: 600, max: 830 } }, growthMilli: { min: 1035, max: 1100 }, birthSkills: { core: [], candidates: ["beast.counter", "beast.regeneration", "beast.strength", "beast.sluggish"] } }, { id: "combat.wild.species.snow-crane", name: "琉璃鹤", realm: "金丹", icon: "icon:beast-snow-crane", description: "身形修长，喙足淡青，羽毛有半透明玉质光泽；背光近乎雪白，迎光展翼透出青碧淡金，常静立于高山灵池。", carryLevel: 45, starter: !1, aptitudes: { attack: { min: 780, max: 1060 }, defense: { min: 950, max: 1230 }, health: { min: 3400, max: 4500 }, mana: { min: 2200, max: 2800 }, speed: { min: 1120, max: 1450 } }, growthMilli: { min: 1070, max: 1145 }, birthSkills: { core: [], candidates: ["beast.miracle", "beast.water-attack", "beast.wisdom", "beast.agility"] } }, { id: "combat.wild.species.moon-marten", name: "无影貂", realm: "金丹", icon: "icon:beast-moon-marten", description: "深灰细毛，腹部银白，长尾蓬松；警觉时从尾端开始隐去身形，疾行转折间偶尔露出一道银白腹影。", carryLevel: 45, starter: !1, aptitudes: { attack: { min: 1050, max: 1460 }, defense: { min: 780, max: 1040 }, health: { min: 2700, max: 3600 }, mana: { min: 1500, max: 2150 }, speed: { min: 1380, max: 1660 } }, growthMilli: { min: 1055, max: 1130 }, birthSkills: { core: ["beast.stealth"], candidates: ["beast.sneak-attack", "beast.agility", "beast.perception"] } }, { id: "combat.wild.species.dark-shell-turtle", name: "蛇颈玄龟", realm: "金丹", icon: "icon:beast-snake-neck-turtle", description: "黑青厚甲低伏宽展，甲缝附着水苔，甲下藏着蛇一般的长颈；沉居深潭，探颈观察四周，受扰便收颈伏底。", carryLevel: 45, starter: !1, aptitudes: { attack: { min: 980, max: 1260 }, defense: { min: 1450, max: 1680 }, health: { min: 4400, max: 5600 }, mana: { min: 1900, max: 2500 }, speed: { min: 480, max: 680 } }, growthMilli: { min: 1090, max: 1160 }, birthSkills: { core: ["beast.advanced-defense"], candidates: ["beast.sluggish", "beast.water-attack", "beast.regeneration"] } }, { id: "combat.wild.species.ink-jiao", name: "墨蛟", realm: "元婴", icon: "icon:beast-ink-jiao", description: "墨鳞短角，颈侧生须，盘踞地下暗河，唾液含毒，出水时带起浊浪。", carryLevel: 65, starter: !1, aptitudes: { attack: { min: 1230, max: 1580 }, defense: { min: 1120, max: 1450 }, health: { min: 4400, max: 5800 }, mana: { min: 2350, max: 3000 }, speed: { min: 850, max: 1170 } }, growthMilli: { min: 1125, max: 1200 }, birthSkills: { core: ["beast.advanced-poison", "beast.flood"], candidates: ["beast.strength", "beast.meditation", "beast.spell-resistance"] } }, { id: "combat.wild.species.silverwing-mantis", name: "银翅螳螂", realm: "元婴", icon: "icon:beast-silverwing-mantis", description: "银灰甲壳，前肢如弯刃，薄翅收拢时近乎透明，展开时泛起银光；常静伏许久，出击时连续挥斩。", carryLevel: 65, starter: !1, aptitudes: { attack: { min: 1450, max: 1750 }, defense: { min: 1000, max: 1280 }, health: { min: 2850, max: 3850 }, mana: { min: 1200, max: 1680 }, speed: { min: 1420, max: 1720 } }, growthMilli: { min: 1100, max: 1185 }, birthSkills: { core: ["beast.advanced-combo"], candidates: ["beast.agility", "beast.parry", "beast.critical"] } }, { id: "combat.wild.species.rock-horn-rhino", name: "狰", realm: "元婴", icon: "icon:beast-zheng", description: "形如健壮山豹，赤褐短毛，额生后弯黑角，五尾分展如扇；独居灵脉石岭，以垂尾感知气流与震动，转身卸力后回爪反击。", carryLevel: 65, starter: !1, aptitudes: { attack: { min: 1320, max: 1660 }, defense: { min: 1200, max: 1530 }, health: { min: 4300, max: 5700 }, mana: { min: 1100, max: 1570 }, speed: { min: 1080, max: 1440 } }, growthMilli: { min: 1125, max: 1205 }, birthSkills: { core: ["beast.advanced-counter"], candidates: ["beast.parry", "beast.strength", "beast.perception"] } }, { id: "combat.wild.species.three-legged-golden-toad", name: "三足金蟾", realm: "元婴", icon: "icon:beast-golden-toad", description: "身躯浑圆，三足粗壮，暗金背疣间透着朱红细纹；腹内火囊蓄纳地火灵息，施法时喉腹鼓起，红纹如炭，张口吐出大片烈焰。", carryLevel: 65, starter: !1, aptitudes: { attack: { min: 850, max: 1180 }, defense: { min: 1080, max: 1420 }, health: { min: 4600, max: 6100 }, mana: { min: 2500, max: 3150 }, speed: { min: 600, max: 880 } }, growthMilli: { min: 1120, max: 1205 }, birthSkills: { core: ["beast.wildfire"], candidates: ["beast.wisdom", "beast.meditation", "beast.spell-critical", "beast.sluggish"] } }, { id: "combat.wild.species.thunder-peng", name: "雷鹏", realm: "化神", icon: "icon:beast-thunder-peng", description: "苍青巨翼，颈覆银羽，翼尖深紫，常在云海雷区活动，羽翼能积蓄雷息。", carryLevel: 85, starter: !1, aptitudes: { attack: { min: 1250, max: 1600 }, defense: { min: 1080, max: 1390 }, health: { min: 3900, max: 5100 }, mana: { min: 2700, max: 3400 }, speed: { min: 1490, max: 1800 } }, growthMilli: { min: 1175, max: 1250 }, birthSkills: { core: ["beast.thunderstorm", "beast.advanced-spell-fluctuation"], candidates: ["beast.agility", "beast.meditation"] } }, { id: "combat.wild.species.six-eyed-ape", name: "六目灵猿", realm: "化神", icon: "icon:beast-six-eyed-ape", description: "灰白长毛，眉侧各生两枚小灵目，攀行古林，遇敌时灵目逐次睁开。", carryLevel: 85, starter: !1, aptitudes: { attack: { min: 1430, max: 1770 }, defense: { min: 1320, max: 1640 }, health: { min: 4500, max: 5900 }, mana: { min: 1800, max: 2500 }, speed: { min: 1120, max: 1510 } }, growthMilli: { min: 1185, max: 1260 }, birthSkills: { core: ["beast.advanced-perception"], candidates: ["beast.counter", "beast.strength", "beast.parry", "beast.agility"] } }, { id: "combat.wild.species.ghost-lantern-butterfly", name: "冥灯蝶", realm: "化神", icon: "icon:beast-lantern-butterfly", description: "墨蓝双翼的翅脉泛出幽绿微光，在古老地穴缓缓飞行，如一盏游移的幽灯；躯壳死寂后仍能保住本命灵息。", carryLevel: 85, starter: !1, aptitudes: { attack: { min: 650, max: 950 }, defense: { min: 820, max: 1120 }, health: { min: 2600, max: 3600 }, mana: { min: 2850, max: 3600 }, speed: { min: 1050, max: 1620 } }, growthMilli: { min: 1200, max: 1280 }, birthSkills: { core: ["beast.ghost"], candidates: ["beast.meditation", "beast.spell-fluctuation", "beast.perception", "beast.agility", "beast.water-attack"] } }, { id: "combat.wild.species.nether-tiger", name: "幽冥虎", realm: "化神", icon: "icon:beast-nether-tiger", description: "墨黑虎躯，肩背厚重，幽蓝虎纹隐现，背脊与尾端浮起鬼火。久居阴灵汇聚的古老地穴，常压低头颅缓步巡视，吐出的幽焰与扑击皆能震慑灵魂体。", carryLevel: 85, starter: !1, aptitudes: { attack: { min: 1500, max: 1810 }, defense: { min: 1080, max: 1400 }, health: { min: 4800, max: 6200 }, mana: { min: 2250, max: 2950 }, speed: { min: 900, max: 1250 } }, growthMilli: { min: 1165, max: 1245 }, birthSkills: { core: ["beast.advanced-exorcism", "beast.spirit-flame"], candidates: ["beast.strength", "beast.perception"] } }], generation: { starterLevel: 10, lifespan: 1000, minBirthSkills: 0, maxBirthSkills: 6 } };
const zod_1 = require("./zod.js");
var Ub = { $schema: zod_1.z.string().optional(), formatVersion: zod_1.z.literal(1), contentRevision: zod_1.z.number().int().positive() }, x0 = zod_1.z.string().trim().min(1).max(40), P0 = zod_1.z.string().regex(/^beast\.[a-z][a-z0-9-]*$/), R = zod_1.z.number().int().min(0).max(1e5), H = zod_1.z.number().min(0).max(1e5).multipleOf(0.000001), D = H.max(1), I0 = zod_1.z.strictObject({ min: R, max: R }), Y2 = zod_1.z.strictObject({ ...Ub, formatVersion: zod_1.z.literal(2), species: zod_1.z.array(zod_1.z.strictObject({ id: zod_1.z.string().regex(/^combat\.wild\.species\.[a-z][a-z0-9-]*$/), name: x0, carryLevel: zod_1.z.number().int().min(0).max(180), realm: zod_1.z.enum(X0), icon: zod_1.z.string().min(1).max(32), description: zod_1.z.string().min(1).max(300), starter: zod_1.z.boolean(), birthSkills: zod_1.z.strictObject({ core: zod_1.z.array(P0).max(2), candidates: zod_1.z.array(P0).max(6) }), aptitudes: zod_1.z.strictObject({ attack: I0, defense: I0, health: I0, mana: I0, speed: I0 }), growthMilli: zod_1.z.strictObject({ min: R.min(100).max(3000), max: R.min(100).max(3000) }) })).min(1), generation: zod_1.z.strictObject({ starterLevel: zod_1.z.number().int().min(0).max(180), lifespan: R, minBirthSkills: zod_1.z.number().int().min(0).max(6), maxBirthSkills: zod_1.z.number().int().min(0).max(6) }) }), V2 = zod_1.z.strictObject({ ...Ub, skills: zod_1.z.array(zod_1.z.strictObject({ id: P0, name: x0, book: zod_1.z.boolean(), advanced: zod_1.z.boolean(), flavorText: zod_1.z.string().trim().min(1).max(200), icon: zod_1.z.string().trim().min(1).max(32), effect: zod_1.z.discriminatedUnion("type", [zod_1.z.strictObject({ type: zod_1.z.literal("groupSpell"), costMp: R, coefficient: H.positive(), powerBase: R, powerPerLevel: H, levelsPerTarget: R.min(1), maxTargets: R.min(1).max(10) }), zod_1.z.strictObject({ type: zod_1.z.literal("spellHit"), costMp: R, coefficient: H.positive(), powerBase: R, powerPerLevel: H }), zod_1.z.strictObject({ type: zod_1.z.literal("barrier"), costMp: R, barrierId: P0, kind: x0, name: x0, powerBase: R, powerPerLevel: H, duration: R.min(1).max(99) }), zod_1.z.strictObject({ type: zod_1.z.literal("physicalHit"), costMp: R, coefficient: H.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("combo"), chance: D, coefficient: H.positive(), physicalFactor: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("counter"), chance: D, coefficient: H.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("regeneration"), resource: zod_1.z.enum(["hp", "mp"]), levelDivisor: R.min(1) }), zod_1.z.strictObject({ type: zod_1.z.literal("critical"), kind: zod_1.z.enum(["physical", "spell"]), chance: D }), zod_1.z.strictObject({ type: zod_1.z.literal("spellBoost"), factor: H.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("speed"), factor: H.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("ghost"), delay: R.min(1).max(99) }), zod_1.z.strictObject({ type: zod_1.z.literal("exorcism"), factor: H.min(1) }), zod_1.z.strictObject({ type: zod_1.z.literal("denial"), ghostDamageFactor: H.min(1), spellFactor: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("poison"), chance: D, duration: R.min(1).max(99), hpRatio: D, mpRatio: D, immune: zod_1.z.boolean() }), zod_1.z.strictObject({ type: zod_1.z.literal("miracle"), immune: zod_1.z.boolean() }), zod_1.z.strictObject({ type: zod_1.z.literal("concentration"), physicalFactor: D.positive(), dodgeBonus: R }), zod_1.z.strictObject({ type: zod_1.z.literal("eternity"), factor: H.min(1), maxExtra: R.max(99) }), zod_1.z.strictObject({ type: zod_1.z.literal("stealth"), minDuration: R.min(1).max(99), maxDuration: R.min(1).max(99), physicalFactor: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("perception"), dodgeBonus: R }), zod_1.z.strictObject({ type: zod_1.z.literal("spellRepeat"), chance: D, factor: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("spellFluctuation"), min: H.positive(), max: H.positive(), suppressReflection: zod_1.z.boolean() }), zod_1.z.strictObject({ type: zod_1.z.literal("parry"), factor: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("defenseTraining"), perLevel: H, spellFactor: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("strengthTraining"), perLevel: H, versusDefenseFactor: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("wisdom"), factor: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("sneakAttack"), factor: H.min(1) }), zod_1.z.strictObject({ type: zod_1.z.literal("spellResistance"), takenFactor: D.positive(), physicalFactor: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("lifesteal"), ratio: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("reflection"), kind: zod_1.z.enum(["physical", "spell"]), chance: D, ratio: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("divineRevival"), chance: D, hpRatio: D.positive() })]) })).min(1), families: zod_1.z.array(zod_1.z.strictObject({ normal: P0, advanced: P0 })) }), _0 = zod_1.z.strictObject({ aptitudeCoefficient: H, attributeCoefficient: H }), X2 = zod_1.z.strictObject({ ...Ub, pointsPerLevel: R.min(1).max(100), experience: zod_1.z.strictObject({ base: R.min(1), perLevel: R, perLevelSquared: H, victoryPerEnemyLevel: R }), lifespan: zod_1.z.strictObject({ deathLoss: R, deployMinimum: R, restRecoveryPerStone: R.min(1) }), capture: zod_1.z.strictObject({ mpBase: R, mpPerCarryLevel: H, minChance: D, maxChance: D, baseChance: D, missingHpFactor: D, levelDifferenceFactor: D }), panel: zod_1.z.strictObject({ naturalBase: H, naturalPerLevel: H, health: _0, mana: _0, physicalAtk: _0, physicalDef: _0, magicAtk: _0, magicDef: zod_1.z.strictObject({ aptitudeCoefficient: H, attributeCoefficients: zod_1.z.strictObject({ constitution: H, magic: H, strength: H, endurance: H }) }), speed: _0 }) });
function Xb(b, v, L) {
    let W = b.safeParse(v);
    if (W.success)
        return W.data;
    throw Error(W.error.issues.map((j) => { let B = v; for (let M of j.path.slice(0, 2))
        B = B && typeof B === "object" ? Reflect.get(B, M) : void 0; let $ = B && typeof B === "object" && "id" in B ? ` [${String(B.id)}]` : ""; return `${L}${$} ${j.path.join(".")}: ${j.message}`; }).join(`
`));
}
function W1(b, v, L) {
    let W = Xb(Y2, b, "species.json"), j = Xb(V2, v, "skills.json"), B = Xb(X2, L, "progression.json"), $ = [], M = (J, V, X) => $.push(`${J} ${V}: ${X}`);
    for (let [J, V] of [["species.json", W.species], ["skills.json", j.skills]]) {
        let X = new Set;
        V.forEach((G, _) => { if (X.has(G.id))
            M(J, `[${G.id}].${_}.id`, "ID 重复"); X.add(G.id); });
    }
    for (let J of j.skills) {
        if (J.effect.type === "stealth" && J.effect.minDuration > J.effect.maxDuration)
            M("skills.json", `[${J.id}].effect`, "持续时间下界不得超过上界");
        if (J.effect.type === "spellFluctuation" && J.effect.min > J.effect.max)
            M("skills.json", `[${J.id}].effect`, "波动下界不得超过上界");
    }
    let Z = new Set(j.skills.map((J) => J.id));
    if (W.generation.minBirthSkills > W.generation.maxBirthSkills)
        M("species.json", "generation", "技能格下界不得超过上界");
    W.species.forEach((J) => { if (J.carryLevel !== Cb(J.realm, "初期"))
        M("species.json", `[${J.id}].carryLevel`, "携带等级须对应开放境界初期"); let { core: V, candidates: X } = J.birthSkills, G = [...V, ...X]; if (G.length < 3 || G.length > 6)
        M("species.json", `[${J.id}].birthSkills`, "天生技能全集须为3至6项"); if (V.length < W.generation.minBirthSkills || G.length > W.generation.maxBirthSkills)
        M("species.json", `[${J.id}].birthSkills`, "技能数量超出出生格数范围"); if (new Set(G).size !== G.length)
        M("species.json", `[${J.id}].birthSkills`, "技能池重复"); for (let _ of G)
        if (!Z.has(_))
            M("species.json", `[${J.id}].birthSkills`, `初始技能不存在：${_}`); for (let _ of j.families)
        if (G.includes(_.normal) && G.includes(_.advanced))
            M("species.json", `[${J.id}].birthSkills`, "技能池不得同时包含同族普通与高级技能"); if (J.starter && J.carryLevel > W.generation.starterLevel)
        M("species.json", `[${J.id}].starter`, "初始伙伴携带等级高于出生等级"); }), W.species.forEach((J) => { for (let [V, X] of Object.entries(J.aptitudes))
        if (X.min > X.max)
            M("species.json", `[${J.id}].aptitudes.${V}`, "下界不得超过上界"); if (J.growthMilli.min > J.growthMilli.max)
        M("species.json", `[${J.id}].growthMilli`, "下界不得超过上界"); });
    let Y = new Set;
    if (j.families.forEach((J, V) => { for (let X of ["normal", "advanced"]) {
        if (!Z.has(J[X]))
            M("skills.json", `families.${V}.${X}`, `技能不存在：${J[X]}`);
        let G = j.skills.find((_) => _.id === J[X]);
        if (G && G.advanced !== (X === "advanced"))
            M("skills.json", `families.${V}.${X}`, `技能品级与配对不符：${J[X]}`);
        if (Y.has(J[X]))
            M("skills.json", `families.${V}.${X}`, `同系技能不得重复或交叉：${J[X]}`);
        Y.add(J[X]);
    } }), B.capture.minChance > B.capture.maxChance)
        M("progression.json", "capture.minChance", "捕捉下限不得超过上限");
    if (B.experience.base + 179 * B.experience.perLevel + Math.floor(32041 * B.experience.perLevelSquared) > 1e5)
        M("progression.json", "experience", "升级所需修为超出个体修为存储上限");
    let q = B.panel.naturalBase + 180 * (B.panel.naturalPerLevel + B.pointsPerLevel);
    if (Math.floor(B.panel.naturalBase * 0.1 * B.panel.health.attributeCoefficient) < 1)
        M("progression.json", "panel.health", "零级最低成长个体的气血必须至少为 1");
    for (let J of ["health", "mana", "physicalAtk", "physicalDef", "magicAtk", "magicDef", "speed"]) {
        let V = B.panel[J], X = J === "magicDef" ? Object.values(B.panel.magicDef.attributeCoefficients).reduce((G, _) => G + _, 0) : B.panel[J].attributeCoefficient;
        if (!Number.isSafeInteger(Math.floor(18000000 * V.aptitudeCoefficient + q * 3 * X)))
            M("progression.json", `panel.${J}`, "合法个体的投影可能超出安全整数范围");
    }
    if ($.length)
        throw Error($.join(`
`));
    return { species: W, skills: j, progression: B };
}
function L1(b) { let { effect: v } = b, L = { id: b.id, name: b.name }, W = { ...L, ...["ghost", "divineRevival", "miracle", "concentration"].includes(v.type) ? { conflicts: ["beast.denial", "beast.advanced-denial", ...v.type === "divineRevival" ? ["beast.ghost", "beast.advanced-ghost"] : []] } : {}, tags: [W0.Passive], targeting: { side: d.Self }, effects: [] }; switch (v.type) {
    case "ghost": return { ...W, innate: { delayedRevivalRounds: v.delay, rejectHpRecovery: !0, immuneStatusCategories: [A.Control, A.Debuff, A.Dot] } };
    case "exorcism": return { ...W, innate: { preventDelayedRevival: !0, damageToDelayedRevival: v.factor } };
    case "denial": return { ...W, innate: { rejectBuffs: !0, damageFromDelayedRevival: v.ghostDamageFactor, immuneStatusCategories: [A.Control, A.Debuff, A.Dot] }, hooks: [{ on: C.OnHitCalc, targetIsSelf: !0, requireKind: O.Spell, effects: [{ type: U.ModifyStrike, factor: v.spellFactor }] }] };
    case "poison": return { ...W, innate: v.immune ? { immuneStatusKinds: ["beast.poison", "youdu.poison"] } : void 0, hooks: [{ on: C.AfterHit, sourceIsSelf: !0, requireKind: O.Physical, when: { skillIds: [N0.Attack], targetHpRatioAbove: 0 }, chance: v.chance, aim: l.HookTarget, effects: [{ type: U.ApplyStatus, statusId: `${b.id}.status`, duration: v.duration }] }] };
    case "miracle": return v.immune ? { ...W, innate: { immuneStatusCategories: [A.Control, A.Debuff, A.Dot] } } : { ...W, hooks: [{ on: C.OnRoundEnd, aim: l.Self, effects: [{ type: U.Dispel, categories: [A.Control, A.Debuff, A.Dot], excludeStatusFlags: [C0.BlocksRevive] }] }] };
    case "concentration": return { ...W, innate: { immuneStatusCategories: [A.Control] }, hooks: [{ on: C.OnHitCalc, sourceIsSelf: !0, requireKind: O.Physical, effects: [{ type: U.ModifyStrike, factor: v.physicalFactor }] }] };
    case "eternity": return { ...W, innate: { buffDuration: { factor: v.factor, maxExtra: v.maxExtra } } };
    case "stealth": return { ...W, innate: { entryStatus: { statusId: `${b.id}.status`, minDuration: v.minDuration, maxDuration: v.maxDuration } }, hooks: [{ on: C.OnHitCalc, sourceIsSelf: !0, requireKind: O.Physical, when: { requireStatusIds: [`${b.id}.status`] }, effects: [{ type: U.ModifyStrike, factor: v.physicalFactor }] }] };
    case "perception": return { ...W, innate: { revealStealth: !0 } };
    case "spellRepeat": return { ...W, innate: { spellRepeat: { chance: v.chance, factor: v.factor } } };
    case "spellFluctuation": return { ...W, innate: { spellFluctuation: { min: v.min, max: v.max }, suppressSpellRetaliation: v.suppressReflection } };
    case "parry": return { ...W, hooks: [{ on: C.OnHitCalc, targetIsSelf: !0, requireKind: O.Physical, parry: !0, when: { oncePerRound: !0 }, effects: [{ type: U.ModifyStrike, factor: v.factor }] }] };
    case "defenseTraining": return { ...W, hooks: [{ on: C.OnHitCalc, sourceIsSelf: !0, requireKind: O.Spell, effects: [{ type: U.ModifyStrike, factor: v.spellFactor }] }] };
    case "strengthTraining": return { ...W, innate: { ignoreParry: !0 }, hooks: [{ on: C.OnHitCalc, sourceIsSelf: !0, requireKind: O.Physical, when: { targetSkillIds: ["beast.defense", "beast.advanced-defense"] }, effects: [{ type: U.ModifyStrike, factor: v.versusDefenseFactor }] }] };
    case "wisdom": return { ...W, innate: { spellMpCostFactor: v.factor } };
    case "sneakAttack": return { ...W, innate: { suppressPhysicalRetaliation: !0 }, hooks: [{ on: C.OnHitCalc, sourceIsSelf: !0, requireKind: O.Physical, effects: [{ type: U.ModifyStrike, factor: v.factor }] }] };
    case "spellResistance": return { ...W, hooks: [{ on: C.OnHitCalc, targetIsSelf: !0, requireKind: O.Spell, effects: [{ type: U.ModifyStrike, factor: v.takenFactor }] }, { on: C.OnHitCalc, sourceIsSelf: !0, requireKind: O.Physical, effects: [{ type: U.ModifyStrike, factor: v.physicalFactor }] }] };
    case "lifesteal": return { ...W, hooks: [{ on: C.AfterHit, sourceIsSelf: !0, requireKind: O.Physical, when: { targetWithoutDelayedRevival: !0 }, aim: l.Self, effects: [{ type: U.RestoreHp, power: `floor(hpDamage * ${v.ratio})` }] }] };
    case "reflection": return { ...W, hooks: [{ on: C.OnBeHit, retaliation: !0, targetIsSelf: !0, requireKind: v.kind, chance: v.chance, aim: l.HookSource, effects: [{ type: U.FixedHit, power: `floor(hpDamage * ${v.ratio})` }] }] };
    case "divineRevival": return { ...W, hooks: [{ on: C.OnFatal, targetIsSelf: !0, chance: v.chance, aim: l.Self, effects: [{ type: U.Revive, hpRatio: v.hpRatio }] }] };
    case "speed": return W;
    case "critical": return { ...W, hooks: [{ on: C.OnCritRoll, sourceIsSelf: !0, requireKind: v.kind, aim: l.Self, effects: [{ type: U.ModifyChance, add: v.chance }] }] };
    case "spellBoost": return { ...W, hooks: [{ on: C.OnHitCalc, sourceIsSelf: !0, requireKind: O.Spell, aim: l.Self, effects: [{ type: U.ModifyStrike, factor: v.factor }] }] };
    case "regeneration": return { ...W, hooks: [{ on: C.OnRoundEnd, aim: l.Self, effects: [{ type: v.resource === "hp" ? U.RestoreHp : U.RestoreMp, power: `floor(source.level / ${v.levelDivisor})` }] }] };
    case "counter": return { ...W, hooks: [{ on: C.OnBeHit, retaliation: !0, targetIsSelf: !0, requireKind: O.Physical, chance: v.chance, aim: l.HookSource, effects: [{ type: U.PhysicalHit, coeff: v.coefficient }] }] };
    case "groupSpell":
    case "spellHit": return { ...L, costMp: v.costMp, tags: [W0.Spell], formula: x.Spell, targeting: v.type === "groupSpell" ? { side: d.Enemy, mode: T.Fill, count: `min(${v.maxTargets}, floor(skillLevel / ${v.levelsPerTarget}) + 1)` } : { side: d.Enemy, count: 1 }, effects: [{ type: U.SpellHit, coeff: v.coefficient, power: v.powerPerLevel === 1 ? `${v.powerBase} + skillLevel` : `${v.powerBase} + skillLevel * ${v.powerPerLevel}` }] };
    case "barrier": return { ...L, costMp: v.costMp, tags: [W0.Spell], targeting: { side: d.Self, count: 1 }, effects: [{ type: U.ApplyBarrier, id: v.barrierId, kind: v.kind, name: v.name, power: `${v.powerBase} + skillLevel * ${v.powerPerLevel}`, duration: v.duration }] };
    case "physicalHit": return { ...L, costMp: v.costMp, tags: [W0.Physical], formula: x.Physical, targeting: { side: d.Enemy, count: 1 }, effects: [{ type: U.PhysicalHit, coeff: v.coefficient }] };
    case "combo": return { ...L, tags: [W0.Passive], targeting: { side: d.Enemy }, effects: [], hooks: [{ on: C.OnHitCalc, sourceIsSelf: !0, requireKind: O.Physical, effects: [{ type: U.ModifyStrike, factor: v.physicalFactor }] }, { on: C.AfterHit, sourceIsSelf: !0, when: { skillIds: [N0.Attack], targetAbsentSkillIds: ["beast.reflection", "beast.advanced-reflection"] }, requireKind: O.Physical, chance: v.chance, aim: l.HookTarget, effects: [{ type: U.PhysicalHit, coeff: v.coefficient }] }] };
} }
var b0 = W1(v1, b1, tb), w8 = b0.species.contentRevision, U2 = b0.species.species, h8 = U2.filter((b) => b.starter), G2 = b0.skills.skills, I8 = b0.species.generation, m8 = b0.skills.skills.map(L1), d8 = b0.skills.families, q2 = b0.skills.skills.filter((b) => b.book), T8 = new Set(G2.filter((b) => b.advanced).map((b) => b.id)), E8 = new Set(q2.filter((b) => b.advanced).map((b) => b.id)), y8 = b0.skills.skills.filter((b) => b.effect.type === "combo").map((b) => b.id), o8 = b0.progression, r8 = b0.skills.skills.flatMap((b) => b.effect.type === "stealth" ? [{ id: `${b.id}.status`, name: b.name, kind: "beast.stealth", category: A.Buff, untargetable: !0, blocksSpell: !0, expireSameRound: !0 }] : b.effect.type === "poison" ? [{ id: `${b.id}.status`, name: "中毒", kind: "beast.poison", category: A.Dot, ticks: E0.RoundEnd, onTick: { type: y0.Dot, ratioOfMaxHp: b.effect.hpRatio, ratioOfMaxMp: b.effect.mpRatio } }] : []);
exports.Bf = U2;
exports.Cf = h8;
exports.Df = G2;
exports.Ef = I8;
exports.Ff = m8;
exports.Gf = d8;
exports.Hf = q2;
exports.If = T8;
exports.Jf = E8;
exports.Kf = y8;
exports.Lf = o8;
function p8(b, v, L) {
    return L.map((W) => { let j = new Set, B = v; for (let Z of [...W.path, void 0]) {
        if (B === null || typeof B !== "object")
            break;
        let Y = B;
        if (typeof Y.id === "string")
            j.add(Y.id);
        else if (typeof Y.rewardId === "string")
            j.add(Y.rewardId);
        else if (typeof Y.realm === "string")
            j.add(Y.realm);
        else if (typeof Y.floor === "number")
            j.add(`floor:${Y.floor}`);
        if (Z === void 0)
            break;
        B = Y[Z];
    } let $ = j.size ? ` [${[...j].join(" / ")}]` : "", M = W.path.map(String).join(".") || "$"; return `${b}: ${M}${$}: ${W.message}`; }).join(`
`);
}
