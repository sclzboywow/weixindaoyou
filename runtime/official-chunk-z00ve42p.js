"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ff = exports.Ef = exports.Df = exports.Cf = exports.Bf = exports.xf = exports.wf = exports.vf = exports.uf = exports.tf = exports.sf = exports.rf = exports.qf = exports.pf = exports.of = exports.nf = exports.mf = exports.lf = exports.kf = exports.hf = exports.gf = exports.ff = exports.ef = exports.df = exports.cf = exports.bf = exports.af = exports.$e = exports._e = exports.Ze = exports.Ye = exports.Xe = exports.We = exports.Ve = exports.Ue = exports.Te = exports.Se = exports.Re = exports.Qe = exports.Pe = exports.Oe = exports.Ne = exports.Je = exports.Ie = exports.He = exports.Ge = exports.Fe = exports.Ee = exports.De = exports.Ce = void 0;
exports.Lf = exports.Kf = exports.Jf = exports.If = exports.Hf = exports.Gf = void 0;
exports.Ke = A2;
exports.Le = h2;
exports.Me = F0;
exports.if = zb;
exports.jf = P;
exports.yf = Nb;
exports.zf = n2;
exports.Af = P1;
exports.Mf = a8;
var J1 = Object.create;
var { getPrototypeOf: Q1, defineProperty: Ob, getOwnPropertyNames: Y1 } = Object;
var V1 = Object.prototype.hasOwnProperty;
function X1(b) { return this[b]; }
var U1, G1, q2 = (b, v, L) => { var W = b != null && typeof b === "object"; if (W) {
    var j = v ? U1 !== null && U1 !== void 0 ? U1 : (U1 = new WeakMap) : G1 !== null && G1 !== void 0 ? G1 : (G1 = new WeakMap), B = j.get(b);
    if (B)
        return B;
} L = b != null ? J1(Q1(b)) : {}; let $ = v || !b || !b.__esModule ? Ob(L, "default", { value: b, enumerable: !0 }) : L; for (let Z of Y1(b))
    if (!V1.call($, Z))
        Ob($, Z, { get: X1.bind(b, Z), enumerable: !0 }); if (W)
    j.set(b, $); return $; };
exports.Ce = q2;
var O2 = (b, v) => () => (v || b((v = { exports: {} }).exports, v), v.exports);
exports.De = O2;
var T = { bgpaper: "#f8f3e6", paper: "#f8f3e6", "paper-2": "#f1ead8", ink: "#2c1810", "ink-secondary": "#5a4a42", crimson: "#c1121f", primary: "#c1121f", teal: "#4a7c59", wood: "#8b4513", gold: "#efbf04", muted: "rgba(44, 24, 16, 0.06)", "paper-dark": "rgba(44, 24, 16, 0.04)", "ink-border": "rgba(44, 24, 16, 0.18)", "ink-muted": "rgba(44, 24, 16, 0.6)", "battle-rule": "rgba(44, 24, 16, 0.16)", "battle-rule-strong": "rgba(44, 24, 16, 0.3)", "battle-muted": "rgba(44, 24, 16, 0.48)", "battle-faint": "rgba(44, 24, 16, 0.08)", "battle-surface": "rgba(248, 243, 230, 0.74)", "battle-crimson-soft": "rgba(193, 18, 31, 0.08)", "battle-teal-soft": "rgba(74, 124, 89, 0.08)", "battle-gold-soft": "rgba(239, 191, 4, 0.58)", "resource-hp": "#c1121f", "resource-mp": "#1685a9", "resource-shield": "#936100", "resource-shield-soft": "rgba(239, 191, 4, 0.58)", "battle-log-ability": "#8f2433", "battle-log-damage-generic": "#9f2f3f", "battle-log-damage-physical": "#b4232f", "battle-log-damage-magical": "#12657f", "battle-log-damage-true": "#9200ff", "battle-log-damage-dot": "#8a4b18", "battle-log-positive": "#2f6f4e", "battle-log-negative": "#9f2f3f", "battle-log-shield": "var(--color-resource-shield)", "battle-log-resource": "#765200", "battle-log-buff": "#2f6f4e", "battle-log-debuff": "#9f2f3f", "battle-log-control": "#5a4a42", "battle-log-mechanic": "#765200", "battle-log-defense": "#376a63", "battle-log-critical": "#7a1020", "battle-log-fatal": "#7a1020", "tier-fan": "#758a99", "tier-ling": "#16a951", "tier-xuan": "#1685a9", "tier-zhen": "#b35c44", "tier-di": "#003472", "tier-tian": "#efbf04", "tier-xian": "#801dae", "tier-shen": "#c1121f", background: "var(--color-bgpaper)", foreground: "var(--color-ink)" };
exports.Ee = T;
class q1 {
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
    text(b, v = 14, L = 24, W = T.ink, j = !1) { let B = this.u.lines(b, this.width, v); this.block(B.length * L, ($, Z) => B.forEach((J, Q) => this.u.text(J, $, Z + Q * L + L / 2, v, W, this.u.bodyFont, j))); }
    rule() { this.block(1, (b, v) => this.u.rect(b, v, this.width, 1, "rgba(44,24,16,.15)")); }
}
exports.Fe = q1;
var _b = wx, C2 = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (b) => { let v = Math.floor(Math.random() * 16); return (b === "x" ? v : v & 3 | 8).toString(16); }), K2 = (b, v) => new Promise((L) => _b.showModal({ title: b, content: v, success: (W) => L(!!W.confirm), fail: () => L(!1) })), R2 = (b) => _b.showToast({ title: b, icon: "none", duration: 2500 });
exports.Ge = _b;
exports.He = C2;
exports.Ie = K2;
exports.Je = R2;
function A2(b, v, L) { var _a, _c, _d, _f, _g, _h, _j; b.beginModal(); let W = v.style === "modal", j = W ? Math.min((_a = v.maxWidth) !== null && _a !== void 0 ? _a : 448, b.width - 24) : b.width, B = (b.width - j) / 2, $ = j - (W ? 34 : 32), Z = v.rows.map((N) => { var _a, _c, _d, _f; return ((_a = N.before) !== null && _a !== void 0 ? _a : 0) + ((_c = N.after) !== null && _c !== void 0 ? _c : 0) + ((_d = N.height) !== null && _d !== void 0 ? _d : (N.field ? 64 : N.heading ? 36 : N.label ? 36 : b.lines((_f = N.text) !== null && _f !== void 0 ? _f : "", $, 14).length * 24 + 12)); }), J = (_d = (_c = v.content) === null || _c === void 0 ? void 0 : _c.height) !== null && _d !== void 0 ? _d : Z.reduce((N, S) => N + S, 0), Q = v.footer ? v.footer.height + 29 : ((_f = v.actions) === null || _f === void 0 ? void 0 : _f.length) ? W ? 61.32 : 60 : 0, G = !W && v.description ? 8 + b.lines(v.description, $, 14).length * 24 : 0, M = W ? v.title ? 61.4 : 17 : 74.32 + G, V = W ? Math.min(J, b.height * 0.6) : J, q = Math.min((_g = v.maxHeight) !== null && _g !== void 0 ? _g : (W ? b.height - b.top - b.bottom - 32 : b.height * 0.88), M + V + Q + (W ? 17 : Math.max(16, b.bottom))), U = W ? Math.max(b.top + 16, (b.height - q) / 2) : b.height - q; if (b.hit(0, 0, b.width, b.height, L), b.rect(B, U, j, q, T.paper), b.hit(B, U, j, q, () => { }), W) {
    if (b.ctx.strokeStyle = "rgba(44,24,16,.2)", b.ctx.strokeRect(B + 0.5, U + 0.5, j - 1, q - 1), v.title)
        b.text(v.title, B + (j - b.measure(v.title, 21.6, b.headingFont)) / 2, U + 33.2, 21.6, T.ink, b.headingFont);
}
else {
    if (b.text(v.title, B + 16, U + 29.16, W ? 20 : 18, T.ink, W ? b.headingFont : b.bodyFont, !0), b.button((_h = v.closeLabel) !== null && _h !== void 0 ? _h : (W ? "关闭" : "收起"), B + j - 16 - b.buttonWidth((_j = v.closeLabel) !== null && _j !== void 0 ? _j : (W ? "关闭" : "收起")), U + 10, L, T["ink-secondary"]), v.description)
        b.paragraph(v.description, B + 16, U + 52.32, $, 14, 24, T["ink-secondary"]);
    b.line(B, U + 57 + G, j, T["ink-border"]);
} if (W && Q)
    b.line(B + 17, U + q - 17 - Q + 16, $, "rgba(44,24,16,.15)"); let _ = U + M, h = U + q - Q - (W ? 16 : Math.max(16, b.bottom)), m = _ - b.modalScroll; if (b.clip(B + (W ? 17 : 16), _, $, h - _, () => { if (v.content) {
    v.content.paint(B + (W ? 17 : 16), m);
    return;
} v.rows.forEach((N, S) => { var _a, _c, _d, _f, _g, _h; if (m += (_a = N.before) !== null && _a !== void 0 ? _a : 0, N.heading)
    b.text(N.heading, B + 16, m + 10, 14, T.ink, b.bodyFont, !0);
else if (N.field)
    b.rect(B + 16, m, $, 40, "rgba(255,255,255,.5)"), b.line(B + 16, m + 40, $, T["ink-border"]), b.text(N.field.value || N.field.placeholder, B + 26, m + 20, 14, N.field.value ? T.ink : T["battle-muted"]), b.hit(B + 16, m, $, 44, N.field.edit);
else if (N.label) {
    b.text(N.label, B + 16, m + 18, 14, T["ink-secondary"]);
    let n = (_c = N.value) !== null && _c !== void 0 ? _c : "";
    b.text(n, B + j - 16 - b.measure(n, 14, "monospace"), m + 18, 14, (_d = N.color) !== null && _d !== void 0 ? _d : T.ink, "monospace");
}
else
    b.paragraph((_f = N.text) !== null && _f !== void 0 ? _f : "", B + 16, m, $, 14, 24, (_g = N.color) !== null && _g !== void 0 ? _g : T["ink-secondary"]); m += Z[S] - ((_h = N.before) !== null && _h !== void 0 ? _h : 0); }); }), b.modalMax = Math.max(0, J - (h - _)), v.footer)
    v.footer.paint(B + 17, U + q - 17 - v.footer.height); if (v.actions) {
    let N = B + j - 16;
    [...v.actions].reverse().forEach((S) => { let n = b.buttonWidth(S.label, S.primary); N -= n, b.ctx.globalAlpha = S.disabled ? 0.4 : 1, b.button(S.label, S.align === "start" ? B + 17 : N, W ? U + q - 17 - 32.32 : U + q - Q + 12, S.disabled ? () => { } : S.run, S.primary ? T.crimson : T.ink), b.ctx.globalAlpha = 1, N -= 12; });
} }
var Pb = new Map([["beast-fusion-cauldron", "/assets/icons/beast-fusion-cauldron.png"], ["earthfire-furnace", "/assets/icons/earthfire-furnace-ink.png"], ["xuanfire-furnace", "/assets/icons/xuanfire-furnace-ink.png"], ["map-wild", "/assets/icons/map-wild.webp"], ["map-dungeon", "/assets/icons/map-dungeon.webp"], ["map-market", "/assets/icons/map-market.webp"], ["map-sect", "/assets/icons/map-sect.webp"], ["map-landmark", "/assets/icons/map-landmark.webp"], ["cultivator-male-avatar", "/assets/icons/cultivator-male-avatar.png"], ["cultivator-female-avatar", "/assets/icons/cultivator-female-avatar.png"], ["beast-fire-crow", "/assets/icons/beast-fire-crow.webp"], ["beast-mimi", "/assets/icons/beast-mimi.webp"], ["beast-nether-tiger", "/assets/icons/beast-nether-tiger.webp"], ["beast-lantern-butterfly", "/assets/icons/beast-ghost-lantern-butterfly.webp"], ["beast-ink-jiao", "/assets/icons/beast-ink-jiao.webp"], ["beast-moon-marten", "/assets/icons/beast-moon-marten.webp"], ["beast-silverwing-mantis", "/assets/icons/beast-silverwing-mantis.webp"], ["beast-six-eyed-ape", "/assets/icons/beast-six-eyed-ape.webp"], ["beast-snow-crane", "/assets/icons/beast-snow-crane.webp"], ["beast-thunder-peng", "/assets/icons/beast-thunder-peng.webp"], ["beast-zheng", "/assets/icons/beast-zheng.webp"], ["beast-snake-neck-turtle", "/assets/icons/beast-snake-neck-turtle.webp"], ["beast-golden-toad", "/assets/icons/beast-three-legged-golden-toad.webp"]]);
function h2(b, v, L, W, j, B, $ = Math.min(j, B)) { let Z = v.startsWith("icon:") ? Pb.get(v.slice(5)) : void 0; if (Z)
    b.imageContain(v === "icon:xuanfire-furnace" ? "craft-alchemy/furnace.png" : v === "icon:earthfire-furnace" ? "craft-forging/furnace.png" : Z.replace(/^\//, ""), L, W, j, B, !1);
else
    b.text(v.startsWith("icon:") ? "" : v, L + (j - b.measure(v.startsWith("icon:") ? "❔" : v, $)) / 2, W + B / 2, $); }
var m2 = ["金", "木", "水", "火", "土", "风", "雷", "冰"];
exports.kf = m2;
var d2 = ["weapon", "armor", "accessory"], T2 = ["丹药", "符箓", "灵果"], E2 = ["男", "女"], y2 = ["人族", "妖族", "鬼魂", "魔族", "古兽", "灵族"], X0 = ["炼气", "筑基", "金丹", "元婴", "化神", "炼虚", "合体", "大乘", "渡劫"], Z0 = ["初期", "中期", "后期", "圆满"];
exports.lf = d2;
exports.mf = T2;
exports.nf = E2;
exports.of = y2;
exports.pf = X0;
exports.qf = Z0;
var o2 = ["天灵根", "真灵根", "伪灵根", "变异灵根"];
exports.rf = o2;
var r2 = ["凡品", "灵品", "玄品", "真品", "地品", "天品", "仙品", "神品"], a2 = { 凡品: 0, 灵品: 1, 玄品: 2, 真品: 3, 地品: 4, 天品: 5, 仙品: 6, 神品: 7 }, p2 = { 炼气: 0, 筑基: 1, 金丹: 2, 元婴: 3, 化神: 4, 炼虚: 5, 合体: 6, 大乘: 7, 渡劫: 8 }, f2 = ["seed", "herb", "ore", "monster", "tcdb", "aux", "gongfa_manual", "skill_manual"];
exports.sf = r2;
exports.tf = a2;
exports.uf = p2;
exports.vf = f2;
var k2 = { 1: 100, "2-10": 50, "11-50": 25, "51-100": 15 };
exports.wf = k2;
var O1 = 10, _1 = 6, x2 = O1 * _1, Fb = 5;
exports.xf = Fb;
function Nb(b, v) { return (P1(b, v) + 1) * Fb; }
function n2(b) { let v = Math.min(X0.length * Z0.length - 1, Math.max(0, Math.ceil(b / Fb) - 1)), L = X0[Math.floor(v / Z0.length)], W = Z0[v % Z0.length]; return { realm: L, stage: W, label: `${L}${W}` }; }
function P1(b, v) { let L = X0.indexOf(b), W = Z0.indexOf(v); return Math.max(0, L) * Z0.length + Math.max(0, W); }
function F0(b) { let v = new Map, L = (W) => { if (W === null || typeof W !== "object") {
    if (typeof W === "function" || typeof W === "symbol")
        throw TypeError("Content DTO contains a non-cloneable value");
    return W;
} if (v.has(W))
    return v.get(W); let j = Object.getPrototypeOf(W); if (!Array.isArray(W) && j !== Object.prototype && j !== null)
    throw TypeError("Content DTO must contain only plain records and arrays"); let B = Array.isArray(W) ? Array(W.length) : {}; v.set(W, B); for (let $ of Object.keys(W))
    Object.defineProperty(B, $, { value: L(W[$]), writable: !0, enumerable: !0, configurable: !0 }); return B; }; return L(b); }
function y(b, v, L) { var _a; return (_a = v.skillOverrides[L]) !== null && _a !== void 0 ? _a : b.get(L); }
function Cb(b) { if (!(b === null || b === void 0 ? void 0 : b.length))
    return {}; let v = {}; for (let L of b)
    v[L.id] = L; return v; }
function o(b, v) { return v.passives.flatMap((L) => { var _a; let W = y(b, v, L); return W && !((_a = W.conflicts) === null || _a === void 0 ? void 0 : _a.some((j) => v.passives.includes(j) || v.skills.includes(j))) ? [W] : []; }); }
var v0 = 1, s = 1, T0 = 1, Kb = 100, Rb = 1, Hb = 1, p = 1;
var N0 = { Attack: "attack" }, c0 = ["hp", "maxHp", "mp", "maxMp", "physicalAtk", "physicalDef", "magicAtk", "magicDef", "healPower", "speed", "hit", "dodge", "critRate", "spellCritRate", "physicalFuryRate", "sealHit", "sealResist", "attackCultivate", "defenseCultivate", "spellCultivate", "resistSpellCultivate"];
exports.Ne = N0;
exports.Oe = c0;
var U0 = { A: 0, B: 1 }, Db = { Player: "player", Pet: "pet", Npc: "npc" };
exports.Pe = Db;
var O = { Physical: "physical", Spell: "spell", Fixed: "fixed" }, w = { ActionDirect: "action-direct", HookDerived: "hook-derived", Status: "status" }, G0 = { Attack: "attack", Skill: "skill", Defend: "defend", Protect: "protect", Item: "item", Summon: "summon", Recall: "recall", Catch: "catch", Flee: "flee", Auto: "auto" }, W0 = { Physical: "physical", Spell: "spell", Seal: "seal", Support: "support", Passive: "passive", Art: "art" }, d = { Enemy: "enemy", Ally: "ally", Self: "self", Any: "any" }, i = { Explicit: "explicit", Fill: "fill", All: "all", Random: "random", LowestHp: "lowestHp", LowestDef: "lowestDef" }, e0 = { None: "none", Random: "random", RandomAttackTarget: "randomAttackTarget", RandomNormalAttackTarget: "randomNormalAttackTarget", StoredAttack: "storedAttack" }, A = { Buff: "buff", Debuff: "debuff", Control: "control", Dot: "dot" }, C = { BeforeAction: "beforeAction", OnHitCalc: "onHitCalc", OnDefenseIgnoreCalc: "onDefenseIgnoreCalc", OnBeHit: "onBeHit", AfterHit: "afterHit", AfterStrike: "afterStrike", OnFatal: "onFatal", OnStatusRemoved: "onStatusRemoved", OnDeath: "onDeath", OnRoundStart: "onRoundStart", OnRoundEnd: "onRoundEnd", OnTargetLost: "onTargetLost", AfterAction: "afterAction", OnCritRoll: "onCritRoll", OnHitRoll: "onHitRoll", OnHealCalc: "onHealCalc", OnBarrierCalc: "onBarrierCalc", OnWoundCalc: "onWoundCalc" }, g = { Self: "self", HookTarget: "hookTarget", HookSource: "hookSource", Others: "others" };
exports.Qe = O;
exports.Re = w;
exports.Se = G0;
exports.Te = W0;
exports.Ue = d;
exports.Ve = i;
exports.We = e0;
exports.Xe = A;
exports.Ye = C;
exports.Ze = g;
var Ab = { Downed: "downed", Dead: "dead" };
exports._e = Ab;
var t = { NoTarget: "no-target", Sealed: "sealed", Rooted: "rooted", InsufficientMp: "insufficient-mp", HpRequirement: "hp-requirement", RevivedThisRound: "revived-this-round", ResourceRequirement: "resource-requirement", SkillNotKnown: "skill-not-known", PassiveNotCastable: "passive-not-castable", FleeFailed: "flee-failed", CaptureFailed: "capture-failed", ReviveBlocked: "revive-blocked", SummonInvalid: "summon-invalid", SummonDead: "summon-dead", SummonAlreadyOut: "summon-already-out", UnknownSkill: "unknown-skill", UnknownStatus: "unknown-status", Unsupported: "unsupported" }, u = { Expired: "expired", Damage: "damage", Dispel: "dispel", Replaced: "replaced", Downed: "downed", Consumed: "consumed", Recalled: "recalled" }, j0 = { Always: "always", Seal: "seal" }, l = { Physical: "physical", Spell: "spell", Dragon: "dragon", Judge: "judge", Fixed: "fixed" }, X = { Repeat: "repeat", ModifyFact: "modifyFact", ModifyStatusDuration: "modifyStatusDuration", RandomBranch: "randomBranch", PhysicalHit: "physicalHit", SpellHit: "spellHit", FixedHit: "fixedHit", Heal: "heal", RestoreHp: "restoreHp", RestoreMp: "restoreMp", Revive: "revive", ApplyStatus: "applyStatus", RemoveStatus: "removeStatus", CopyStatus: "copyStatus", EmitMechanic: "emitMechanic", Dispel: "dispel", SkipNextAction: "skipNextAction", DamageMp: "damageMp", Wound: "wound", RemoveWound: "removeWound", ApplyBarrier: "applyBarrier", ModifyStrike: "modifyStrike", ModifyDefenseIgnore: "modifyDefenseIgnore", ModifyHeal: "modifyHeal", ModifyBarrier: "modifyBarrier", ModifyWound: "modifyWound", SetCrit: "setCrit", ModifyResource: "modifyResource", ModifyChance: "modifyChance", ModifyCooldown: "modifyCooldown", LoseHp: "loseHp", ClearSkipNextAction: "clearSkipNextAction" }, F = { BattleStart: "battleStart", RoundStart: "roundStart", CommandAccepted: "commandAccepted", CommandDefaulted: "commandDefaulted", TurnOrder: "turnOrder", ActionSkip: "actionSkip", ActionStart: "actionStart", Retarget: "retarget", Miss: "miss", Hit: "hit", ProtectTrigger: "protectTrigger", Damage: "damage", Heal: "heal", MpCost: "mpCost", HpCost: "hpCost", MpDamage: "mpDamage", Wound: "wound", WoundChanged: "woundChanged", BarrierChanged: "barrierChanged", StatusApplied: "statusApplied", StatusRemoved: "statusRemoved", MechanicTriggered: "mechanicTriggered", ChanceResolved: "chanceResolved", UnitDowned: "unitDowned", UnitDead: "unitDead", UnitRevived: "unitRevived", UnitEscaped: "unitEscaped", PetSummoned: "petSummoned", PetRecalled: "petRecalled", UnitCaptured: "unitCaptured", MpRestore: "mpRestore", ResourceChanged: "resourceChanged", ActionFailed: "actionFailed", RoundEnd: "roundEnd", BattleEnd: "battleEnd" }, E0 = { RoundEnd: "roundEnd" }, y0 = { Dot: "dot" }, C0 = { BlocksAction: "blocksAction", BlocksSpell: "blocksSpell", BlocksPhysical: "blocksPhysical", BlocksRevive: "blocksRevive", ActFirst: "actFirst", Untargetable: "untargetable", RevealStealth: "revealStealth", PersistWhenDowned: "persistWhenDowned" };
exports.$e = j0;
exports.af = l;
exports.bf = X;
exports.cf = E0;
exports.df = y0;
exports.ef = C0;
var c = { SkillLevel: "skillLevel", Targets: "targets", Damage: "damage", HpDamage: "hpDamage", ImpactDamage: "impactDamage", TargetStatusStacks: "targetStatusStacks", Level: "level", Source: "source", Target: "target" }, q0 = { Floor: "floor", Min: "min", Max: "max", If: "if" };
exports.ff = c;
exports.gf = q0;
function o0(b) { return b === U0.A ? U0.B : U0.A; }
function K0(b, v) { return `${b}:${v}`; }
function F1(b, v, L) { return Math.min(v, Math.max(b, L)); }
function r0(b) { if (!Number.isFinite(b))
    return 0; return F1(0, 1, b); }
function f(b, v) { return Math.max(b, v); }
function k(b, v) { return Math.max(b, Math.floor(v)); }
function M0(b, v) { return Number.isFinite(b) ? b : v; }
var Sb = { hp: 0, maxHp: 0, mp: 0, maxMp: 0, physicalAtk: 0, physicalDef: 0, magicAtk: 0, magicDef: 0, healPower: 0, speed: 0, hit: Kb, dodge: 0, critRate: 0, spellCritRate: 0, physicalFuryRate: 0, sealHit: 0, sealResist: 0, attackCultivate: 0, defenseCultivate: 0, spellCultivate: 0, resistSpellCultivate: 0 };
exports.hf = Sb;
function zb(b, v) { var _a, _c, _d, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s; let L = Math.max(s, Math.floor(M0(b.attrs.hp, s))), W = Math.max(0, Math.floor(M0((_a = b.attrs.mp) !== null && _a !== void 0 ? _a : 0, 0))), j = { ...Sb, ...b.attrs, hp: L, maxHp: Math.max(T0, Math.floor(M0((_c = b.attrs.maxHp) !== null && _c !== void 0 ? _c : L, L))), mp: W, maxMp: Math.max(0, Math.floor(M0((_d = b.attrs.maxMp) !== null && _d !== void 0 ? _d : W, W))), critRate: r0((_f = b.attrs.critRate) !== null && _f !== void 0 ? _f : 0), spellCritRate: r0((_g = b.attrs.spellCritRate) !== null && _g !== void 0 ? _g : 0), physicalFuryRate: r0((_h = b.attrs.physicalFuryRate) !== null && _h !== void 0 ? _h : 0) }; return { id: (_j = b.id) !== null && _j !== void 0 ? _j : `u${b.side}_${(_k = b.slot) !== null && _k !== void 0 ? _k : v}`, name: b.name, side: b.side, kind: b.kind, slot: (_l = b.slot) !== null && _l !== void 0 ? _l : v, level: Math.max(0, Math.floor(M0((_m = b.level) !== null && _m !== void 0 ? _m : 0, 0))), ownerId: b.ownerId, attrs: j, wound: 0, skills: [...(_o = b.skills) !== null && _o !== void 0 ? _o : []], passives: [...(_p = b.passives) !== null && _p !== void 0 ? _p : []], skillLevels: { ...(_q = b.skillLevels) !== null && _q !== void 0 ? _q : {} }, skillOverrides: Cb(b.skillOverrides), tags: [...(_r = b.tags) !== null && _r !== void 0 ? _r : []], combatFacts: { ...b.combatFacts }, skillUses: {}, cooldowns: {}, resources: N1(b.resources), barriers: [], marks: [], statuses: [], flags: { defending: !1, auto: !1, skipNextAction: !1, downed: !1, dead: !1, escaped: !1, benched: (_s = b.benched) !== null && _s !== void 0 ? _s : !1 } }; }
function K(b) { return !b.flags.dead && !b.flags.downed && !b.flags.escaped && !b.flags.benched; }
function N1(b) { let v = new Set, L = []; for (let W of b !== null && b !== void 0 ? b : []) {
    if (!W.id || v.has(W.id))
        continue;
    v.add(W.id);
    let j = W.max === null ? null : Math.max(0, Math.floor(M0(W.max, 0))), B = Math.min(j !== null && j !== void 0 ? j : Number.MAX_SAFE_INTEGER, Math.max(0, Math.floor(M0(W.current, 0))));
    L.push({ id: W.id, name: W.name, current: B, max: j });
} return L; }
function L0(b, v) { return b.resources.find((L) => L.id === v); }
function e(b) { return Math.max(s, b.attrs.maxHp - Math.max(0, Math.floor(b.wound))); }
function x(b) { let v = { ...b.attrs }; for (let L of b.statuses) {
    v.speed += L.speedMod;
    for (let [W, j] of Object.entries(L.attrMods))
        if (W !== "maxHp")
            v[W] += j;
} return v; }
function wb(b, v) { if (v === O.Fixed)
    return p; let L = p; for (let W of b.statuses)
    L *= v === O.Physical ? W.damageTakenPhysical : W.damageTakenSpell; return L; }
function a0(b) { var _a; let v = p, L = new Map; for (let W of b.statuses)
    L.set(W.kind, Math.min((_a = L.get(W.kind)) !== null && _a !== void 0 ? _a : W.healTaken, W.healTaken)); for (let W of L.values())
    v *= W; return v; }
function hb(b) { let v = p; for (let L of b.statuses)
    v *= L.healDealt; return v; }
function P(b, v) { if (b === void 0)
    return 0; if (typeof b === "number")
    return b; let L = C1(b), W = new mb(L, v), j = W.parseExpr(); if (W.expectEnd(), !Number.isFinite(j))
    return 0; return j; }
function R0(b, v) { var _a; return (_a = b.skillLevels[v]) !== null && _a !== void 0 ? _a : b.level; }
function Ib(b) { let v = { level: b.level }; for (let L of c0)
    v[L] = b.attrs[L]; return v; }
function C1(b) { let v = b.replace(/\s+/g, ""), L = [], W = 0; while (W < v.length) {
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
class mb {
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
    lookup(b) { var _a, _c, _d, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22; if (b.startsWith("hasStatus."))
        return this.env.source.statuses.some((W) => W.id === b.slice(10)) ? 1 : 0; if (b === "enemyCount")
        return (_c = (_a = this.env.state) === null || _a === void 0 ? void 0 : _a.units.filter((W) => W.side !== this.env.source.side && !W.flags.dead && !W.flags.downed && !W.flags.escaped && !W.flags.benched).length) !== null && _c !== void 0 ? _c : 0; if (b === "actionKillsTarget")
        return this.env.target && ((_d = this.env.killedTargetIds) === null || _d === void 0 ? void 0 : _d.includes(this.env.target.id)) ? 1 : 0; if (b === "normalTarget")
        return this.env.target && ((_f = this.env.normalTargetIds) === null || _f === void 0 ? void 0 : _f.includes(this.env.target.id)) ? 1 : 0; if (b === "enemyPlayers")
        return (_h = (_g = this.env.state) === null || _g === void 0 ? void 0 : _g.units.filter((W) => W.side !== this.env.source.side && W.kind === "player").length) !== null && _h !== void 0 ? _h : 0; if (b === "targetIsPet")
        return ((_j = this.env.target) === null || _j === void 0 ? void 0 : _j.kind) === "pet" ? 1 : 0; if (b.startsWith("targetKnown."))
        return this.env.target && [...this.env.target.skills, ...this.env.target.passives].includes(b.slice(12)) ? 1 : 0; if (b.startsWith("targetEffective."))
        return this.env.target ? (_k = x(this.env.target)[b.slice(16)]) !== null && _k !== void 0 ? _k : 0 : 0; if (b.startsWith("effective."))
        return (_l = x(this.env.source)[b.slice(10)]) !== null && _l !== void 0 ? _l : 0; if (b.startsWith("allyTagCount."))
        return (_o = (_m = this.env.state) === null || _m === void 0 ? void 0 : _m.units.filter((W) => W.side === this.env.source.side && W.kind === "player" && W.tags.includes(b.slice(13))).length) !== null && _o !== void 0 ? _o : 0; if (b.startsWith("known."))
        return [...this.env.source.skills, ...this.env.source.passives].includes(b.slice(6)) ? 1 : 0; if (b.startsWith("statusRounds."))
        return (_q = (_p = this.env.source.statuses.find((W) => W.kind === b.slice(13))) === null || _p === void 0 ? void 0 : _p.remainingRounds) !== null && _q !== void 0 ? _q : 0; if (b.startsWith("targetStatusRounds."))
        return (_t = (_s = (_r = this.env.target) === null || _r === void 0 ? void 0 : _r.statuses.find((W) => W.kind === b.slice(19))) === null || _s === void 0 ? void 0 : _s.remainingRounds) !== null && _t !== void 0 ? _t : 0; if (b.startsWith("ownedTargetStatus."))
        return ((_u = this.env.target) === null || _u === void 0 ? void 0 : _u.statuses.some((W) => W.kind === b.slice(18) && W.sourceId === this.env.source.id)) ? 1 : 0; if (b === "allyDownedPlayers")
        return (_w = (_v = this.env.state) === null || _v === void 0 ? void 0 : _v.units.filter((W) => W.side === this.env.source.side && W.kind === "player" && W.flags.downed && !W.flags.escaped).length) !== null && _w !== void 0 ? _w : 0; if (b === "allyMaxMagicAtk")
        return Math.max(0, ...(_y = (_x = this.env.state) === null || _x === void 0 ? void 0 : _x.units.filter((W) => W.side === this.env.source.side && W.id !== this.env.source.id && W.kind === "player").map((W) => W.attrs.magicAtk)) !== null && _y !== void 0 ? _y : []); if (b === "targetDeployedPets")
        return (_2 = (_z = this.env.state) === null || _z === void 0 ? void 0 : _z.units.filter((W) => { var _a; return W.kind === "pet" && W.ownerId === ((_a = this.env.target) === null || _a === void 0 ? void 0 : _a.id) && W.marks.includes("battle:deployed"); }).length) !== null && _2 !== void 0 ? _2 : 0; if (b === "round")
        return (_4 = (_3 = this.env.state) === null || _3 === void 0 ? void 0 : _3.round) !== null && _4 !== void 0 ? _4 : 0; if (b === "enemyDownedPlayers")
        return (_6 = (_5 = this.env.state) === null || _5 === void 0 ? void 0 : _5.units.filter((W) => W.side !== this.env.source.side && W.kind === "player" && W.flags.downed && !W.flags.escaped).length) !== null && _6 !== void 0 ? _6 : 0; if (b.startsWith("enemyStatus.") || b.startsWith("allyStatus.")) {
        let W = b.startsWith("enemyStatus."), j = b.slice(W ? 12 : 11);
        return (_8 = (_7 = this.env.state) === null || _7 === void 0 ? void 0 : _7.units.filter((B) => B.side !== this.env.source.side === W && !B.flags.dead && !B.flags.escaped && !B.flags.benched && (!W || !B.flags.downed) && B.statuses.some(($) => $.kind === j)).length) !== null && _8 !== void 0 ? _8 : 0;
    } if (b === "originalResourceCost")
        return (_9 = this.env.originalResourceCost) !== null && _9 !== void 0 ? _9 : 0; if (b.startsWith("resource."))
        return (_11 = (_10 = this.env.source.resources.find((W) => W.id === b.slice(9))) === null || _10 === void 0 ? void 0 : _10.current) !== null && _11 !== void 0 ? _11 : 0; if (b.startsWith("fact."))
        return (_13 = (_12 = this.env.source.combatFacts) === null || _12 === void 0 ? void 0 : _12[b.slice(5)]) !== null && _13 !== void 0 ? _13 : 0; if (b.startsWith("uses."))
        return (_15 = (_14 = this.env.source.skillUses) === null || _14 === void 0 ? void 0 : _14[b.slice(5)]) !== null && _15 !== void 0 ? _15 : 0; if (b === c.SkillLevel)
        return this.env.skillLevel; if (b === c.Targets)
        return this.env.targets; if (b === c.Damage)
        return (_16 = this.env.damage) !== null && _16 !== void 0 ? _16 : 0; if (b === c.HpDamage)
        return (_17 = this.env.hpDamage) !== null && _17 !== void 0 ? _17 : 0; if (b === "roundHpDamage") {
        let W = this.env.source.hpDamageThisRound;
        return W && W.round === ((_18 = this.env.state) === null || _18 === void 0 ? void 0 : _18.round) ? W.amount : 0;
    } if (b === c.ImpactDamage)
        return (_19 = this.env.impactDamage) !== null && _19 !== void 0 ? _19 : 0; if (b === c.TargetStatusStacks)
        return (_20 = this.env.targetStatusStacks) !== null && _20 !== void 0 ? _20 : 0; if (b === c.Level)
        return this.env.source.level; let v = b.split("."); if (v.length === 2) {
        let W = v[0] === c.Source ? this.env.source : v[0] === c.Target ? this.env.target : void 0;
        if (!W)
            return 0;
        return (_21 = Ib(W)[v[1]]) !== null && _21 !== void 0 ? _21 : 0;
    } return (_22 = Ib(this.env.source)[b]) !== null && _22 !== void 0 ? _22 : 0; }
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
function K1(b, v, L) { if (!b.markKey)
    return; if (L.oncePerBattle)
    return `battle:${b.markKey}`; if (L.oncePerRound)
    return `round:${v}:${b.markKey}`; return; }
function J0(b, v, L) { var _a, _c, _d, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15; if (!v)
    return !0; if (v.expression !== void 0 && !P(v.expression, { source: L.source, target: L.target, skillLevel: (_c = L.source.skillLevels[(_a = L.skillId) !== null && _a !== void 0 ? _a : ""]) !== null && _c !== void 0 ? _c : L.source.level, targets: 1, state: { ...b.state, units: (_d = b.state.units) !== null && _d !== void 0 ? _d : [] } }))
    return !1; let W = (_f = b.state.units) !== null && _f !== void 0 ? _f : []; if (v.removedStatusKind && L.removedStatusKind !== v.removedStatusKind)
    return !1; if (v.statusRemoveReason && L.statusRemoveReason !== v.statusRemoveReason)
    return !1; if (v.originalResourceCostMax !== void 0 && (L.originalResourceCost === void 0 || L.originalResourceCost > v.originalResourceCostMax))
    return !1; if (v.targetDowned !== void 0 && ((_g = L.target) === null || _g === void 0 ? void 0 : _g.flags.downed) !== v.targetDowned)
    return !1; if (v.targetDead !== void 0 && ((_h = L.target) === null || _h === void 0 ? void 0 : _h.flags.dead) !== v.targetDead)
    return !1; if (v.excludeFoeKinds && (!L.target || v.excludeFoeKinds.includes(L.target.kind)))
    return !1; if (v.targetOwnedStatus && !((_j = L.target) === null || _j === void 0 ? void 0 : _j.statuses.some((M) => M.kind === v.targetOwnedStatus.kind && M.sourceId === L.source.id && (!v.targetOwnedStatus.appliedThisRound || M.appliedRound === b.state.round))))
    return !1; if (v.enemyStatusCount && W.filter((M) => M.side !== L.source.side && K(M) && M.statuses.some((V) => V.kind === v.enemyStatusCount.kind)).length < v.enemyStatusCount.min)
    return !1; if (v.oncePerActionTarget && (!b.currentAction || ((_k = b.currentAction.triggeredTargets) === null || _k === void 0 ? void 0 : _k.includes(`${L.markKey}:${(_l = L.target) === null || _l === void 0 ? void 0 : _l.id}`))))
    return !1; if (v.pvp !== void 0 && W.some((M) => M.side !== L.source.side && M.kind === "player") !== v.pvp)
    return !1; if (v.teamUniqueTag && W.filter((M) => M.side === L.source.side && M.kind === "player" && M.tags.includes(v.teamUniqueTag)).length !== 1)
    return !1; if (v.targetEnemy && (!L.target || L.target.side === L.source.side))
    return !1; if (v.targetHasStandingPet !== void 0 && (!L.target || W.some((M) => M.kind === "pet" && M.ownerId === L.target.id && K(M)) !== v.targetHasStandingPet))
    return !1; if (v.actionSucceeded && (!b.currentAction || b.currentAction.failed))
    return !1; if (v.actionKilledTarget !== void 0 && Boolean(L.target && ((_o = (_m = b.currentAction) === null || _m === void 0 ? void 0 : _m.killedTargetIds) === null || _o === void 0 ? void 0 : _o.includes(L.target.id))) !== v.actionKilledTarget)
    return !1; if (v.sourceInitialHpRatioMin !== void 0 && ((_q = (_p = b.currentAction) === null || _p === void 0 ? void 0 : _p.initialHpRatio) !== null && _q !== void 0 ? _q : H0(L.source)) < v.sourceInitialHpRatioMin)
    return !1; let j = (_t = (_r = L.skillId) !== null && _r !== void 0 ? _r : (_s = L.skill) === null || _s === void 0 ? void 0 : _s.id) !== null && _t !== void 0 ? _t : (_u = b.currentAction) === null || _u === void 0 ? void 0 : _u.skillId, B = L.skill; if ((_v = v.excludeSkillTags) === null || _v === void 0 ? void 0 : _v.some((M) => B === null || B === void 0 ? void 0 : B.tags.includes(M)))
    return !1; if (v.excludePercentageDamage && L.percentageDamage)
    return !1; let $ = L.source.attrs.mp / Math.max(1, L.source.attrs.maxMp); if (v.sourceMpRatioBelow !== void 0 && $ >= v.sourceMpRatioBelow)
    return !1; if (v.sourceMpRatioAbove !== void 0 && $ <= v.sourceMpRatioAbove)
    return !1; if (v.sourceHasBarrier !== void 0 && L.source.barriers.some((M) => M.current > 0) !== v.sourceHasBarrier)
    return !1; if (v.targetHasBarrier !== void 0 && (!L.target || L.target.barriers.some((M) => M.current > 0) !== v.targetHasBarrier))
    return !1; if (v.sourceStatusCategories && !t0(b, L.source, v.sourceStatusCategories))
    return !1; if (v.sourceRemovableControl && !L.source.statuses.some((M) => { let V = b.statusDefs.get(M.id); return (V === null || V === void 0 ? void 0 : V.category) === "control" && V.dispellable !== !1 && !V.blocksRevive; }))
    return !1; let Z = (_w = L.isPrimary) !== null && _w !== void 0 ? _w : (L.target !== void 0 && L.target.id === ((_x = b.currentAction) === null || _x === void 0 ? void 0 : _x.primaryTargetId)); if (v.skillIds && (!j || !v.skillIds.includes(j)))
    return !1; if ((_y = v.skillTags) === null || _y === void 0 ? void 0 : _y.length) {
    if (!B)
        return !1;
    if (!v.skillTags.some((M) => B.tags.includes(M)))
        return !1;
} if (v.requireKind && v.requireKind !== L.kind)
    return !1; if (v.requireStatusIds && !p0(L.source, v.requireStatusIds))
    return !1; if (v.requireStatusKinds && !f0(L.source, v.requireStatusKinds))
    return !1; if (v.requireAbsentStatusIds && p0(L.source, v.requireAbsentStatusIds))
    return !1; if (v.requireAbsentStatusKinds && f0(L.source, v.requireAbsentStatusKinds))
    return !1; if (v.sourceHpRatioBelow !== void 0 && H0(L.source) >= v.sourceHpRatioBelow)
    return !1; if (v.sourceHpRatioAbove !== void 0 && H0(L.source) <= v.sourceHpRatioAbove)
    return !1; if (((_z = v.sourceTags) === null || _z === void 0 ? void 0 : _z.length) && !v.sourceTags.every((M) => L.source.tags.includes(M)))
    return !1; if (v.sourceDefending !== void 0 && L.source.flags.defending !== v.sourceDefending)
    return !1; if (v.sourceStanding !== void 0 && K(L.source) !== v.sourceStanding)
    return !1; if (((_2 = v.damageOrigins) === null || _2 === void 0 ? void 0 : _2.length) && (!L.origin || !v.damageOrigins.includes(L.origin)))
    return !1; if (v.sourceResource) {
    let M = L0(L.source, v.sourceResource.id);
    if (!M)
        return !1;
    if (v.sourceResource.min !== void 0 && M.current < v.sourceResource.min)
        return !1;
    if (v.sourceResource.max !== void 0 && M.current > v.sourceResource.max)
        return !1;
} let J = L.target; if (v.targetWithoutDelayedRevival && J && b.skills && o(b.skills, J).some((M) => { var _a; return (_a = M.innate) === null || _a === void 0 ? void 0 : _a.delayedRevivalRounds; }))
    return !1; if (v.targetAbsentSkillIds && J && v.targetAbsentSkillIds.some((M) => J.passives.includes(M) || J.skills.includes(M)))
    return !1; if (v.targetSkillIds && (!J || !v.targetSkillIds.some((M) => J.passives.includes(M) || J.skills.includes(M))))
    return !1; if (v.targetSlot === "primary" && !Z)
    return !1; if (v.targetSlot === "secondary" && (Z || !L.target))
    return !1; if (v.targetSlot === "normal" && (!L.target || !((_4 = (_3 = b.currentAction) === null || _3 === void 0 ? void 0 : _3.normalTargetIds) === null || _4 === void 0 ? void 0 : _4.includes(L.target.id))))
    return !1; if (v.initialTargetOwnedStatus && (!L.target || !((_7 = (_6 = (_5 = b.currentAction) === null || _5 === void 0 ? void 0 : _5.initialOwnedStatusKindsByTarget) === null || _6 === void 0 ? void 0 : _6[L.target.id]) === null || _7 === void 0 ? void 0 : _7.includes(v.initialTargetOwnedStatus))))
    return !1; if (v.foeKind && (J === null || J === void 0 ? void 0 : J.kind) !== v.foeKind)
    return !1; if (v.targetStatusIds && (!J || !p0(J, v.targetStatusIds)))
    return !1; if (v.targetStatusKinds && (!J || !f0(J, v.targetStatusKinds)))
    return !1; if (v.targetAbsentStatusIds && J && p0(J, v.targetAbsentStatusIds))
    return !1; if (v.targetAbsentStatusKinds && J && f0(J, v.targetAbsentStatusKinds))
    return !1; if (v.targetStatusCategories && (!J || !t0(b, J, v.targetStatusCategories)))
    return !1; if (v.targetAbsentStatusCategories && J && t0(b, J, v.targetAbsentStatusCategories))
    return !1; if (v.targetStatusStack) {
    let M = D0(b, v, J);
    if (v.targetStatusStack.min !== void 0 && M < v.targetStatusStack.min)
        return !1;
    if (v.targetStatusStack.max !== void 0 && M > v.targetStatusStack.max)
        return !1;
} if (v.sourceInitialStatusIds && !v.sourceInitialStatusIds.some((M) => { var _a, _c; return (_c = (_a = b.currentAction) === null || _a === void 0 ? void 0 : _a.initialSourceStatusIds) === null || _c === void 0 ? void 0 : _c.includes(M); }))
    return !1; if (v.initialTargetStatusKinds && !v.initialTargetStatusKinds.some((M) => { var _a, _c; return L.target && ((_c = (_a = b.currentAction) === null || _a === void 0 ? void 0 : _a.initialStatusKindsByTarget[L.target.id]) === null || _c === void 0 ? void 0 : _c.includes(M)); }))
    return !1; let Q = (_8 = b.currentAction) === null || _8 === void 0 ? void 0 : _8.primaryTargetId; if ((_9 = v.primaryTargetStatusIds) === null || _9 === void 0 ? void 0 : _9.length) {
    let M = Q ? (_11 = (_10 = b.currentAction) === null || _10 === void 0 ? void 0 : _10.initialStatusIdsByTarget[Q]) !== null && _11 !== void 0 ? _11 : [] : [];
    if (!v.primaryTargetStatusIds.some((V) => M.includes(V)))
        return !1;
} if ((_12 = v.primaryTargetStatusKinds) === null || _12 === void 0 ? void 0 : _12.length) {
    let M = Q ? (_14 = (_13 = b.currentAction) === null || _13 === void 0 ? void 0 : _13.initialStatusKindsByTarget[Q]) !== null && _14 !== void 0 ? _14 : [] : [];
    if (!v.primaryTargetStatusKinds.some((V) => M.includes(V)))
        return !1;
} if ((_15 = v.foeTags) === null || _15 === void 0 ? void 0 : _15.length) {
    if (!J || !v.foeTags.every((M) => J.tags.includes(M)))
        return !1;
} if (v.targetHpRatioBelow !== void 0) {
    if (!J || H0(J) >= v.targetHpRatioBelow)
        return !1;
} if (v.targetHpRatioAbove !== void 0) {
    if (!J || H0(J) <= v.targetHpRatioAbove)
        return !1;
} let G = K1(L, b.state.round, v); if (G && L.source.marks.includes(G))
    return !1; return !0; }
function r(b, v, L = {}) { var _a, _c, _d, _f; let W = [], j = new Set; for (let B of b.state.units) {
    if (B.side !== v.side)
        continue;
    for (let $ of [...o(b.skills, B), ...B.skills.flatMap((Z) => { let J = y(b.skills, B, Z); return J ? [J] : []; })])
        for (let Z of (_a = $.modifiers) !== null && _a !== void 0 ? _a : []) {
            if (B.id !== v.id && !Z.teamAura)
                continue;
            if (Z.teamAura && (!K(B) || j.has(Z.teamAura)))
                continue;
            if (!J0(b, Z.when, { ...L, source: v }))
                continue;
            if (Z.teamAura)
                j.add(Z.teamAura);
            W.push(Z);
        }
} for (let B of v.statuses)
    for (let $ of (_f = (_c = B.snapshotModifiers) !== null && _c !== void 0 ? _c : (_d = b.statusDefs.get(B.id)) === null || _d === void 0 ? void 0 : _d.modifiers) !== null && _f !== void 0 ? _f : [])
        if (J0(b, $.when, { ...L, source: v }))
            W.push($); return W; }
function I(b, v, L, W, j, B) { return b.reduce(($, Z) => { var _a; let J = Z[v]; return $ + (typeof J === "number" || typeof J === "string" ? P(J, { state: B === null || B === void 0 ? void 0 : B.state, source: L, target: W, skillLevel: j ? (_a = L.skillLevels[j.id]) !== null && _a !== void 0 ? _a : L.level : L.level, targets: 1 }) : 0); }, 0); }
function A0(b, v) { return !r(b, v).some((L) => L.ignoreReviveBlock) && v.statuses.some((L) => { var _a; return (_a = b.statusDefs.get(L.id)) === null || _a === void 0 ? void 0 : _a.blocksRevive; }); }
function db(b, v, L = []) { return [...o(b.skills, v).map((j) => { var _a, _c; return (_c = (_a = j.innate) === null || _a === void 0 ? void 0 : _a.sealHitTakenFactor) !== null && _c !== void 0 ? _c : 1; }), ...v.statuses.filter((j) => !L.includes(j.kind)).map((j) => { var _a, _c; return (_c = (_a = b.statusDefs.get(j.id)) === null || _a === void 0 ? void 0 : _a.sealHitTakenFactor) !== null && _c !== void 0 ? _c : 1; })].reduce((j, B) => j * B, 1); }
function bb(b, v, L, W) { if (!K(L))
    return; let j = f(0, Math.floor(W.amount)), B = k(1, W.duration); if (j <= 0)
    return; let $ = L.barriers.find((Z) => Z.kind === W.kind); if ($) {
    let Z = $.current;
    $.current = Math.max($.current, j), $.remainingRounds = B, $.untilBattleEnd = W.untilBattleEnd, $.sourceId = v.id, $.appliedRound = b.state.round, b.emit({ type: F.BarrierChanged, sourceId: v.id, unitId: L.id, barrierId: $.id, before: Z, after: $.current, reason: "refreshed" });
    return;
} L.barriers.push({ id: W.id, kind: W.kind, name: W.name, current: j, remainingRounds: B, ...W.untilBattleEnd ? { untilBattleEnd: !0 } : {}, sourceId: v.id, appliedRound: b.state.round }), b.emit({ type: F.BarrierChanged, sourceId: v.id, unitId: L.id, barrierId: W.id, before: 0, after: j, reason: "applied" }); }
function k0(b, v, L, W = 1) { let j = f(0, Math.floor(L)), B = Math.max(1, W), $ = v.barriers.filter((Z) => Z.current > 0).sort((Z, J) => Z.appliedRound - J.appliedRound || Z.id.localeCompare(J.id)); for (let Z of $) {
    if (j <= 0)
        break;
    let J = Z.current, Q = Math.min(J, Math.floor(j * B));
    Z.current -= Q, j -= Q / B, b.emit({ type: F.BarrierChanged, sourceId: Z.sourceId, unitId: v.id, barrierId: Z.id, before: J, after: Z.current, reason: "absorbed" });
} return v.barriers = v.barriers.filter((Z) => Z.current > 0), Math.max(0, Math.floor(j)); }
function S0(b, v) { return b.statusDefs.get(v); }
function vb(b, v, L, W, j, B = {}) { var _a, _c, _d, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _2; let $ = S0(b, L); if (!$) {
    b.emit({ type: F.ActionFailed, unitId: j, reason: K0(t.UnknownStatus, L) });
    return;
} if (yb(b, v, $, (_c = (_a = B.env) === null || _a === void 0 ? void 0 : _a.source) !== null && _c !== void 0 ? _c : b.state.units.find((U) => U.id === j)))
    return; if ($.priority !== void 0) {
    let U = v.statuses.find((h) => h.kind === $.kind), _ = U && S0(b, U.id);
    if (U && (_ === null || _ === void 0 ? void 0 : _.priority) !== void 0 && (_.priority > $.priority || _.priority === $.priority && (_.untilBattleEnd || !$.untilBattleEnd && U.remainingRounds >= W)))
        return;
} if ($.category === A.Buff && $.extendable !== !1 && !$.untargetable && !$.blocksRevive && !$.ticks && !$.blocksAction && !$.blocksSpell && !$.blocksPhysical && !$.actFirst)
    for (let U of v.passives) {
        let _ = (_f = (_d = y(b.skills, v, U)) === null || _d === void 0 ? void 0 : _d.innate) === null || _f === void 0 ? void 0 : _f.buffDuration;
        if (_) {
            W += Math.min(_.maxExtra, Math.floor(W * (_.factor - 1)));
            break;
        }
    } let Z = (_g = B.env) !== null && _g !== void 0 ? _g : { skillLevel: 0, targets: 1, source: (_h = b.state.units.find((U) => U.id === j)) !== null && _h !== void 0 ? _h : v, target: v }, J = { ...v, statuses: v.statuses.filter((U) => U.kind !== $.kind) }, Q = { ...v, attrs: x(J) }, G = { ...Z, state: b.state, normalTargetIds: (_j = b.currentAction) === null || _j === void 0 ? void 0 : _j.normalTargetIds, target: ((_k = Z.target) === null || _k === void 0 ? void 0 : _k.id) === v.id ? Q : Z.target, source: Z.source.id === v.id ? Q : Z.source }, M = {}; for (let [U, _] of Object.entries((_l = $.attrMods) !== null && _l !== void 0 ? _l : {}))
    M[U] = P(_, G); let V = $.maxStacks && $.maxStacks > 1 ? $.maxStacks : 1, q = V > 1 ? v.statuses.find((U) => U.kind === $.kind) : void 0; if (q) {
    let U = Math.min(V, q.stacks + 1);
    if (q.stacks = U, q.remainingRounds = W, q.sourceId = j, q.appliedRound = b.state.round, $.healingPerRound !== void 0 || ((_m = $.onTick) === null || _m === void 0 ? void 0 : _m.hpCap) !== void 0 || ((_o = $.onTick) === null || _o === void 0 ? void 0 : _o.mpCap) !== void 0)
        q.tickSkillLevel = G.skillLevel;
    let _ = (_p = $.healTaken) !== null && _p !== void 0 ? _p : p, h = (_q = $.healDealt) !== null && _q !== void 0 ? _q : p;
    q.healTaken = _ ** U, q.healDealt = h ** U, q.damageTakenPhysical = ((_r = $.damageTakenPhysical) !== null && _r !== void 0 ? _r : p) ** U, q.damageTakenSpell = ((_s = $.damageTakenSpell) !== null && _s !== void 0 ? _s : p) ** U, b.emit({ type: F.StatusApplied, unitId: v.id, statusId: $.id, duration: W });
    return;
} for (let U of v.statuses.filter((_) => _.kind === $.kind && (!$.sourceBound || _.sourceId === j)))
    $0(b, v, U.id, u.Replaced, $.sourceBound ? j : void 0); if (v.statuses.push({ ...$.snapshotModifiers ? { snapshotModifiers: (_t = $.modifiers) === null || _t === void 0 ? void 0 : _t.map((U) => Object.fromEntries(Object.entries(U).map(([_, h]) => [_, typeof h === "string" && _ !== "teamAura" || typeof h === "number" ? P(h, { ...G, state: b.state }) : F0(h)]))) } : {}, id: $.id, kind: $.kind, remainingRounds: W, sourceId: j, appliedRound: b.state.round, speedMod: P((_u = $.speedMod) !== null && _u !== void 0 ? _u : 0, G), attrMods: M, storedTargetId: B.storedTargetId, ...$.onExpire ? { transitionSkillLevel: G.skillLevel } : {}, ...$.healingPerRound !== void 0 || ((_v = $.onTick) === null || _v === void 0 ? void 0 : _v.hpCap) !== void 0 || ((_w = $.onTick) === null || _w === void 0 ? void 0 : _w.mpCap) !== void 0 ? { tickSkillLevel: G.skillLevel } : {}, damageTakenPhysical: (_x = $.damageTakenPhysical) !== null && _x !== void 0 ? _x : p, damageTakenSpell: (_y = $.damageTakenSpell) !== null && _y !== void 0 ? _y : p, healTaken: (_z = $.healTaken) !== null && _z !== void 0 ? _z : p, healDealt: (_2 = $.healDealt) !== null && _2 !== void 0 ? _2 : p, stacks: 1 }), M.maxHp)
    v.attrs.maxHp += M.maxHp; b.emit({ type: F.StatusApplied, unitId: v.id, statusId: $.id, duration: W }); }
function $0(b, v, L, W, j) { let B = v.statuses.find(($) => $.id === L && (!j || $.sourceId === j)); if (!B)
    return; if (B.attrMods.maxHp) {
    if (v.attrs.maxHp = Math.max(T0, v.attrs.maxHp - B.attrMods.maxHp), v.wound = Math.min(v.wound, v.attrs.maxHp - 1), v.attrs.hp > e(v))
        v.attrs.hp = e(v);
} v.statuses = v.statuses.filter(($) => $.id !== L || j !== void 0 && $.sourceId !== j), b.emit({ type: F.StatusRemoved, unitId: v.id, statusId: L, reason: W }), b.hooks.emit(C.OnStatusRemoved, { source: b.state.units.find(($) => $.id === B.sourceId), target: v, removedStatusKind: B.kind, statusRemoveReason: W }); }
function Tb(b, v, L, W, j = 0) { let B = S0(b, W.id); if (!B || yb(b, L, B))
    return; for (let Z of [...L.statuses].filter((J) => J.kind === W.kind && (!B.sourceBound || J.sourceId === v.id)))
    $0(b, L, Z.id, u.Replaced, B.sourceBound ? v.id : void 0); let $ = { ...F0(W), sourceId: v.id, appliedRound: b.state.round, remainingRounds: Math.max(1, Math.floor(W.remainingRounds + j)) }; if (L.statuses.push($), $.attrMods.maxHp)
    L.attrs.maxHp += $.attrMods.maxHp; b.emit({ type: F.StatusApplied, unitId: L.id, statusId: $.id, duration: $.remainingRounds }); }
function Eb(b, v) { let L = v.statuses.filter((W) => { var _a; return (_a = S0(b, W.id)) === null || _a === void 0 ? void 0 : _a.breakOnDamage; }); for (let W of L)
    $0(b, v, W.id, u.Damage); }
function Wb(b, v) { var _a; for (let L of [...v.statuses]) {
    if ((_a = S0(b, L.id)) === null || _a === void 0 ? void 0 : _a.persistWhenDowned)
        continue;
    $0(b, v, L.id, u.Downed);
} }
function yb(b, v, L, W) { var _a, _c; if (((_c = (_a = v.flags.statusImmunityThroughRound) === null || _a === void 0 ? void 0 : _a[L.kind]) !== null && _c !== void 0 ? _c : -1) >= b.state.round)
    return !0; let j = o(b.skills, v); if (L.category === A.Buff && j.some((B) => { var _a; return (_a = B.innate) === null || _a === void 0 ? void 0 : _a.rejectBuffs; }))
    return !0; return !L.blocksRevive && L.dispellable !== !1 && j.some((B) => { var _a, _c; if (W && r(b, W).some((Z) => { var _a; return ((_a = Z.bypassImmunity) === null || _a === void 0 ? void 0 : _a.statusKinds.includes(L.kind)) && Z.bypassImmunity.passiveIds.includes(B.id); }))
    return !1; let $ = B.innate; return ((_a = $ === null || $ === void 0 ? void 0 : $.immuneStatusKinds) === null || _a === void 0 ? void 0 : _a.includes(L.kind)) || Boolean(L.category && ((_c = $ === null || $ === void 0 ? void 0 : $.immuneStatusCategories) === null || _c === void 0 ? void 0 : _c.includes(L.category))); }); }
function jb(b, v, L) { if (H1(b, v))
    return !1; return L.statuses.some((W) => { var _a; return (_a = b.statusDefs.get(W.id)) === null || _a === void 0 ? void 0 : _a.untargetable; }); }
function H1(b, v) { var _a, _c; if (v.statuses.some((L) => { var _a; return (_a = b.statusDefs.get(L.id)) === null || _a === void 0 ? void 0 : _a.revealStealth; }))
    return !0; for (let L of v.passives)
    if ((_c = (_a = y(b.skills, v, L)) === null || _a === void 0 ? void 0 : _a.innate) === null || _c === void 0 ? void 0 : _c.revealStealth)
        return !0; return !1; }
function ob(b, v, L, W) { var _a, _c; if (W.targeting.excludeSelf && v.id === L.id)
    return !1; if (W.targeting.requireKind && L.kind !== W.targeting.requireKind)
    return !1; if (L.flags.capturedBy || L.flags.benched)
    return !1; if (W.targeting.requireRevivable && (A0(b, L) || o(b.skills, L).some((B) => { var _a; return (_a = B.innate) === null || _a === void 0 ? void 0 : _a.rejectHpRecovery; })))
    return !1; if (W.targeting.onlyDowned && !L.flags.downed && !L.flags.dead)
    return !1; if (W.capture && (W.capture.targetMpCosts[L.id] === void 0 || b.state.units.filter((B) => B.flags.capturedBy === v.id).length >= W.capture.capacity))
    return !1; if (L.flags.escaped)
    return !1; if (L.flags.dead && !W.targeting.includeDead)
    return !1; if (L.flags.downed && !W.targeting.includeDowned)
    return !1; if (!L.flags.downed && !L.flags.dead && !K(L) && !W.targeting.includeDowned)
    return !1; let j = W.targeting.side; if (j === d.Self)
    return L.id === v.id; if (j === d.Enemy && L.side === v.side)
    return !1; if (j === d.Ally && L.side !== v.side)
    return !1; if (jb(b, v, L))
    return !1; if (((_a = W.targeting.requireStatusIds) === null || _a === void 0 ? void 0 : _a.length) && !W.targeting.requireStatusIds.some((B) => L.statuses.some(($) => $.id === B)))
    return !1; if (((_c = W.targeting.requireStatusKinds) === null || _c === void 0 ? void 0 : _c.length) && !W.targeting.requireStatusKinds.some((B) => L.statuses.some(($) => $.kind === B)))
    return !1; return !0; }
function rb(b, v, L) { let W = L.targeting.side, j; if (W === d.Self)
    j = [v];
else if (W === d.Enemy)
    j = w0(b.state, v);
else if (W === d.Ally)
    j = h0(b.state, v);
else
    j = b.state.units.filter((B) => !B.flags.escaped); if (L.targeting.includeDowned) {
    let B = b.state.units.filter(($) => { if ($.flags.escaped)
        return !1; if (W === d.Enemy && $.side === v.side)
        return !1; if (W === d.Ally && $.side !== v.side)
        return !1; if (W === d.Self)
        return $.id === v.id; return $.flags.downed || $.flags.dead; });
    j = [...j, ...B.filter(($) => !j.includes($))];
} return j.filter((B) => ob(b, v, B, L)).sort((B, $) => B.slot - $.slot); }
function ab(b, v, L, W) { var _a, _c, _d; let j = (_c = (_a = v.targeting.countByResource) === null || _a === void 0 ? void 0 : _a.filter((Z) => { var _a, _c; return ((_c = (_a = L0(b, Z.resourceId)) === null || _a === void 0 ? void 0 : _a.current) !== null && _c !== void 0 ? _c : 0) >= Z.min; }).slice(-1)[0]) === null || _c === void 0 ? void 0 : _c.count, B = P((_d = j !== null && j !== void 0 ? j : v.targeting.count) !== null && _d !== void 0 ? _d : Rb, { state: W === null || W === void 0 ? void 0 : W.state, skillLevel: R0(b, v.id), targets: L, source: b }), $ = W ? I(r(W, b, { skill: v, skillId: v.id }), "targetCountAdd", b, void 0, v) : 0; return Math.max(1, Math.floor(B + $)); }
function g0(b, v, L, W, j, B) { var _a, _c; let $ = (_a = L.targeting.mode) !== null && _a !== void 0 ? _a : i.Explicit; if (L.targeting.side === d.Self)
    return [v]; let Z = ab(v, L, W.length || 1, b), J = rb(b, v, L); if ($ === i.All) {
    let M = L.targeting.count === void 0 ? J : J.slice(0, Z);
    return O0(b, v, L, M, J, B);
} if ($ === i.Random)
    return O0(b, v, L, D1(b, J, Z), J, B); if ($ === i.LowestHp)
    return O0(b, v, L, J.slice().sort((M, V) => M.attrs.hp / Math.max(1, M.attrs.maxHp) - V.attrs.hp / Math.max(1, V.attrs.maxHp) || M.slot - V.slot).slice(0, Z), J, B); if ($ === i.LowestDef)
    return O0(b, v, L, J.slice().sort((M, V) => M.attrs.physicalDef - V.attrs.physicalDef || M.slot - V.slot).slice(0, Z), J, B); let Q = [], G = new Set; if (j) {
    let M = b.state.units.find((V) => V.id === j);
    if (M && M.id !== v.id && K(M) && (!L.targeting.requireKind || M.kind === L.targeting.requireKind))
        Q.push(M), G.add(M.id);
} for (let M of W.slice(0, (_c = L.targeting.maxSelected) !== null && _c !== void 0 ? _c : W.length)) {
    if (Q.length >= Z)
        break;
    let V = b.state.units.find((q) => q.id === M);
    if (!V || G.has(V.id))
        continue;
    if (!ob(b, v, V, L))
        continue;
    if (Q.push(V), G.add(V.id), Q.length >= Z)
        break;
} if ($ === i.Explicit)
    return O0(b, v, L, Q, J, B); for (let M of J) {
    if (Q.length >= Z)
        break;
    if (G.has(M.id))
        continue;
    if (Q.push(M), G.add(M.id), Q.length >= Z)
        break;
} return O0(b, v, L, Q, J, B); }
function O0(b, v, L, W, j, B) { B === null || B === void 0 ? void 0 : B.push(...W.map((V) => V.id)); let $ = L.targeting.extraCount; if (W.length && L.targeting.includeOwnedStatusKind)
    W = [...W, ...j.filter((V) => !W.includes(V) && V.statuses.some((q) => q.kind === L.targeting.includeOwnedStatusKind && q.sourceId === v.id))]; let Z = L.targeting.extraChance; if ($ === void 0 && Z === void 0)
    return W; let J = { skillLevel: R0(v, L.id), targets: W.length, source: v }; if (Z !== void 0 && !b.rng.chance(P(Z, J)))
    return W; let Q = $ === void 0 ? 0 : Math.max(0, Math.floor(P($, J))); if (Q <= 0)
    return W; let G = new Set(W.map((V) => V.id)), M = []; for (let V of j) {
    if (G.has(V.id))
        continue;
    if (M.push(V), G.add(V.id), M.length >= Q)
        break;
} return [...W, ...M]; }
function D1(b, v, L) { let W = v.slice(); for (let j = W.length - 1; j > 0; j--) {
    let B = Math.floor(b.rng.next() * (j + 1)), $ = W[j];
    W[j] = W[B], W[B] = $;
} return W.slice(0, L); }
function kb(b, v) { return b.units.find((L) => L.id === v); }
function z0(b, v) { return b.units.filter((L) => K(L) && (v === void 0 || L.side === v)); }
function w0(b, v) { return z0(b, o0(v.side)).sort((L, W) => L.slot - W.slot); }
function h0(b, v) { return z0(b, v.side).sort((L, W) => L.slot - W.slot); }
function Mb(b, v) { var _a, _c, _d, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y; var _z; let { source: L, target: W } = v, j = x(L), B = x(W), $ = (_a = v.origin) !== null && _a !== void 0 ? _a : (b.suppressHooks > 0 ? w.HookDerived : w.ActionDirect), Z = $ !== w.ActionDirect || b.suppressHooks > 0, J = (_c = v.skillId) !== null && _c !== void 0 ? _c : (_d = b.currentAction) === null || _d === void 0 ? void 0 : _d.skillId, Q = J ? y(b.skills, L, J) : void 0, G = r(b, L, { target: W, skill: Q, skillId: J, kind: v.kind, origin: $ }); j.hit += I(G, "hitAdd", L, W, Q, b), j.physicalAtk += I(G, "physicalAttackAdd", L, W, Q, b); let M = v.kind === O.Physical && !G.some((z) => z.ignoreProtection) ? S1(b, W) : void 0; if (M)
    b.emit({ type: F.ProtectTrigger, protectorId: M.id, originalTargetId: W.id }); if (!v.cannotMiss && v.kind !== O.Fixed && !z1(b, L, W, j, B, v.kind))
    return; let V = v.kind === O.Physical && b.rng.chance(j.physicalFuryRate + I(G, "physicalFuryChanceAdd", L, W, Q, b)), q = (_f = v.isPrimary) !== null && _f !== void 0 ? _f : (((_g = b.currentAction) === null || _g === void 0 ? void 0 : _g.primaryTargetId) !== void 0 && W.id === b.currentAction.primaryTargetId), U = v.kind === O.Fixed ? 0 : v.kind === O.Physical ? j.critRate : j.spellCritRate, _ = b.hooks.emit(C.OnCritRoll, { source: L, target: W, kind: v.kind, skillId: J, isPrimary: q, chance: U + I(G, "critChanceAdd", L, W, Q, b), origin: $ }), h = v.kind === O.Fixed ? !1 : (_h = _.crit) !== null && _h !== void 0 ? _h : b.rng.chance(Math.min(1, Math.max(0, (_j = _.chance) !== null && _j !== void 0 ? _j : U))), m = b.hooks.emit(C.OnDefenseIgnoreCalc, { source: L, target: W, kind: v.kind, skillId: J, isPrimary: q, defenseIgnore: ((_k = v.defenseIgnore) !== null && _k !== void 0 ? _k : 0) + I(G, "defenseIgnoreAdd", L, W, Q, b) + (v.kind === O.Physical ? L.statuses.reduce((z, E) => { var _a, _c; return z + ((_c = (_a = b.statusDefs.get(E.id)) === null || _a === void 0 ? void 0 : _a.physicalDefenseIgnore) !== null && _c !== void 0 ? _c : 0); }, 0) : 0), origin: $ }), N = { ...v, defenseIgnore: m.defenseIgnore }, S = h1(b, L, W, j, B, N, V); if (S = h ? Math.floor(S * (b.rules.formulas.critMultiplier + I(G, "critMultiplierAdd", L, W, Q, b))) : S, v.kind !== O.Fixed)
    S = I1(b, S, v.kind, L); S = m1(b, W, v.kind, S), S = k(v0, S * wb(W, v.kind)); let n = b.hooks.emit(C.OnHitCalc, { percentageDamage: v.percentageDamage, source: L, target: W, damage: S, kind: v.kind, skillId: J, isPrimary: q, origin: $ }), n0 = v.kind === O.Spell && ((_l = b.currentAction) === null || _l === void 0 ? void 0 : _l.sourceId) === L.id ? (_m = b.currentAction.spellRepeatFactor) !== null && _m !== void 0 ? _m : 1 : 1, i0 = 1; if (v.kind === O.Physical || v.kind === O.Spell) {
    let z = o(b.skills, L), E = o(b.skills, W);
    if (E.some((a) => { var _a; return (_a = a.innate) === null || _a === void 0 ? void 0 : _a.delayedRevivalRounds; }))
        for (let a of z)
            i0 *= (_p = (_o = a.innate) === null || _o === void 0 ? void 0 : _o.damageToDelayedRevival) !== null && _p !== void 0 ? _p : 1;
    if (z.some((a) => { var _a; return (_a = a.innate) === null || _a === void 0 ? void 0 : _a.delayedRevivalRounds; }))
        for (let a of E)
            i0 *= (_r = (_q = a.innate) === null || _q === void 0 ? void 0 : _q.damageFromDelayedRevival) !== null && _r !== void 0 ? _r : 1;
} let Ub = 1; if (v.kind !== O.Fixed)
    for (let z of L.statuses) {
        let E = b.statusDefs.get(z.id);
        Ub *= (_s = (v.kind === O.Physical ? E === null || E === void 0 ? void 0 : E.damageDealtPhysical : E === null || E === void 0 ? void 0 : E.damageDealtSpell)) !== null && _s !== void 0 ? _s : 1;
    } let L1 = W.statuses.reduce((z, E) => { var _a, _c; return z * (E.sourceId === L.id ? (_c = (_a = b.statusDefs.get(E.id)) === null || _a === void 0 ? void 0 : _a.damageTakenFromSource) !== null && _c !== void 0 ? _c : 1 : 1); }, 1), Gb = r(b, W, { target: L, skill: Q, skillId: J, kind: v.kind, origin: $ }), $1 = Math.max(0, 1 + I(Gb, "damageTakenBonus", W, L, Q, b)), B1 = I(Gb, "damageTakenAdd", W, L, Q, b), V0 = k(v0, (((_t = n.damage) !== null && _t !== void 0 ? _t : S) * (1 + I(G, "damageBonus", L, W, Q, b)) + I(G, "damageAdd", L, W, Q, b)) * n0 * i0 * Ub * L1 * ((_u = v.resultFactor) !== null && _u !== void 0 ? _u : 1) * $1 + B1); b.emit({ type: F.Hit, sourceId: L.id, targetId: W.id, kind: v.kind, crit: h, fury: V }); let qb = V0; if (M) {
    let z = (_v = b.rules.protectionTargetRatio) !== null && _v !== void 0 ? _v : 0;
    Q0(b, L, M, Math.floor(V0 * (1 - z)), v.kind, Z, $, v.cannotKill), qb = Math.floor(V0 * z * (1 + I(G, "protectedDamageBonus", L, W, Q, b)));
} let j1 = 1 + I(G, "barrierDamageBonus", L, W, Q, b), m0 = Q0(b, L, W, qb, v.kind, Z, $, v.cannotKill, j1); if (!Z)
    for (let z of G) {
        if (z.splash) {
            let E = b.state.units.filter((B0) => B0.side !== L.side && B0.id !== W.id && K(B0)), a = Math.max(0, Math.floor(P(z.splash.count, { source: L, target: W, targets: E.length, skillLevel: L.level }))), s0 = `${W.id}:${z.splash.factor}:${a}`, d0 = ((_w = b.currentAction) === null || _w === void 0 ? void 0 : _w.sourceId) === L.id ? (_x = (_z = b.currentAction).splashTargetIds) !== null && _x !== void 0 ? _x : (_z.splashTargetIds = {}) : void 0, u0 = (_y = d0 === null || d0 === void 0 ? void 0 : d0[s0]) !== null && _y !== void 0 ? _y : [];
            if (!(d0 === null || d0 === void 0 ? void 0 : d0[s0])) {
                for (let B0 = 0; B0 < a && E.length; B0++)
                    u0.push(E.splice(Math.floor(b.rng.next() * E.length), 1)[0].id);
                if (d0)
                    d0[s0] = u0;
            }
            for (let B0 of u0) {
                let M1 = b.state.units.find((Z1) => Z1.id === B0);
                Q0(b, L, M1, Math.floor(V0 * z.splash.factor), v.kind, !0, w.HookDerived);
            }
        }
        if (z.mirrorToTargetPet && W.kind === "player")
            for (let E of b.state.units.filter((a) => a.ownerId === W.id && a.kind === "pet" && K(a)))
                Q0(b, L, E, V0, v.kind, !0, w.HookDerived);
    } if (v.mpDamageRatio !== void 0 && m0 > 0) {
    let z = Math.min(W.attrs.mp, Math.max(0, Math.floor(m0 * v.mpDamageRatio)));
    if (z > 0)
        W.attrs.mp -= z, b.emit({ type: F.MpDamage, sourceId: L.id, targetId: W.id, amount: z, mpAfter: W.attrs.mp });
} if (!Z) {
    let z = { source: L, target: W, damage: V0, hpDamage: m0, kind: v.kind, skillId: J, isPrimary: q, origin: $ };
    if (b.hooks.emit(C.AfterStrike, { ...z }), m0 > 0)
        b.hooks.emit(C.AfterHit, z);
} }
function S1(b, v) { if (!K(v))
    return; return h0(b.state, v).find((L) => (L.flags.protecting === v.id || v.statuses.some((W) => { var _a; return W.sourceId === L.id && ((_a = b.statusDefs.get(W.id)) === null || _a === void 0 ? void 0 : _a.protectsTarget); })) && K(L) && L.id !== v.id); }
function Y0(b, v) { return { ...b, attrs: v }; }
function z1(b, v, L, W, j, B) { var _a; let $ = b.rules.formulas, Z = B === O.Physical ? $.physicalHitChance(Y0(v, W), Y0(L, j)) : $.spellHitChance(Y0(v, W), Y0(L, j)), J = b.hooks.emit(C.OnHitRoll, { source: v, target: L, kind: B, skillId: w1(b), chance: Z, origin: b.suppressHooks > 0 ? w.HookDerived : w.ActionDirect }); if (b.rng.chance(Math.min(1, Math.max(0, (_a = J.chance) !== null && _a !== void 0 ? _a : Z))))
    return !0; return b.emit({ type: F.Miss, sourceId: v.id, targetId: L.id, kind: B }), !1; }
function w1(b) { var _a; return (_a = b.currentAction) === null || _a === void 0 ? void 0 : _a.skillId; }
function h1(b, v, L, W, j, B, $) { var _a, _c, _d, _f; let Z = (_a = B.formula) !== null && _a !== void 0 ? _a : (B.trueDamage ? l.Fixed : B.kind === O.Physical ? l.Physical : l.Spell), J = Math.min(1, Math.max(0, (_c = B.defenseIgnore) !== null && _c !== void 0 ? _c : 0)), Q = (B.kind === O.Physical || B.kind === O.Spell) && J > 0 ? Y0(L, { ...j, physicalDef: B.kind === O.Physical ? Math.floor(j.physicalDef * (1 - J)) : j.physicalDef, magicDef: B.kind === O.Spell ? Math.floor(j.magicDef * (1 - J)) : j.magicDef }) : Y0(L, j); return b.rules.formulas.baseDamage({ family: Z, kind: B.kind, source: Y0(v, W), target: Q, coeff: B.coeff, power: B.power, fury: $, furyMultiplier: b.rules.formulas.furyAtkMultiplier, skillLevel: (_d = B.skillLevel) !== null && _d !== void 0 ? _d : 0, targetCount: (_f = B.targetCount) !== null && _f !== void 0 ? _f : 1, schoolTerm: B.schoolTerm, splash: B.splash, defenseIgnore: J }); }
function I1(b, v, L, W) { var _a, _c; if (L === O.Spell)
    for (let Z of W.passives) {
        let J = (_c = (_a = y(b.skills, W, Z)) === null || _a === void 0 ? void 0 : _a.innate) === null || _c === void 0 ? void 0 : _c.spellFluctuation;
        if (J)
            return k(v0, v * b.rng.range(J.min, J.max));
    } let j = b.rules.formulas, B = L === O.Physical ? j.physicalFluctuationMin : j.fluctuationMin, $ = L === O.Physical ? j.physicalFluctuationMax : j.fluctuationMax; return k(v0, v * b.rng.range(B, $)); }
function m1(b, v, L, W) { if (L !== O.Physical || !v.flags.defending)
    return W; return k(v0, W * b.rules.formulas.defendPhysicalFactor); }
function Q0(b, v, L, W, j, B = !1, $ = B ? w.HookDerived : w.ActionDirect, Z = !1, J = 1) { var _a, _c, _d, _f, _g, _h, _j, _k, _l; if (!K(L) || L.flags.downed)
    return 0; let Q = ((_a = b.currentAction) === null || _a === void 0 ? void 0 : _a.skillId) ? y(b.skills, v, b.currentAction.skillId) : void 0, G = r(b, L, { target: v, skill: Q, skillId: Q === null || Q === void 0 ? void 0 : Q.id, kind: j, origin: $ }), M = Math.max(0, Math.floor(W * Math.max(0, 1 + I(G, "allDamageTakenBonus", L, v, Q, b)))), V = d1(b, v, L, M, j, $), q = $ === w.Status ? V : k0(b, L, V, J), U = V - q, _ = Z ? Math.min(q, Math.max(0, L.attrs.hp - s)) : q; if (b.lastStrikeDamage = q, $ === w.ActionDirect && ((_c = b.currentAction) === null || _c === void 0 ? void 0 : _c.sourceId) === v.id && j !== O.Fixed && (U > 0 || _ > 0))
    b.currentAction.hasPhysicalOrSpellImpact = !0; if ($ === w.ActionDirect && ((_d = b.currentAction) === null || _d === void 0 ? void 0 : _d.sourceId) === v.id && U > 0)
    b.currentAction.impactDamageByTarget[L.id] = ((_f = b.currentAction.impactDamageByTarget[L.id]) !== null && _f !== void 0 ? _f : 0) + U; if (_ <= 0)
    return 0; let h = L.attrs.hp, m = f(0, L.attrs.hp - _), N = h - m; if ($ === w.ActionDirect && ((_g = b.currentAction) === null || _g === void 0 ? void 0 : _g.sourceId) === v.id)
    b.currentAction.impactDamageByTarget[L.id] = ((_h = b.currentAction.impactDamageByTarget[L.id]) !== null && _h !== void 0 ? _h : 0) + N; if (L.attrs.hp = m, gb(b, L, N), b.emit({ type: F.Damage, sourceId: v.id, targetId: L.id, amount: q, hpAfter: m, kind: j }), !B)
    b.hooks.emit(C.OnBeHit, { source: v, target: L, damage: q, hpDamage: N, kind: j, skillId: (_j = b.currentAction) === null || _j === void 0 ? void 0 : _j.skillId, isPrimary: ((_k = b.currentAction) === null || _k === void 0 ? void 0 : _k.primaryTargetId) === L.id, origin: $ }); if (Eb(b, L), m <= 0)
    b.applyHpZero(L, v, (_l = b.currentAction) === null || _l === void 0 ? void 0 : _l.skillId, j, $); return N; }
function gb(b, v, L) { let W = v.hpDamageThisRound; v.hpDamageThisRound = { round: b.state.round, amount: ((W === null || W === void 0 ? void 0 : W.round) === b.state.round ? W.amount : 0) + L }; }
function d1(b, v, L, W, j, B) { var _a, _c; let $ = L.statuses.find((M) => { var _a; return (_a = b.statusDefs.get(M.id)) === null || _a === void 0 ? void 0 : _a.redirectTaken; }), Z = $ ? (_a = b.statusDefs.get($.id)) === null || _a === void 0 ? void 0 : _a.redirectTaken : void 0; if (!$ || !Z)
    return W; let J = kb(b.state, $.sourceId), Q = f(0, Math.floor(W * Z.keep)), G = f(0, Math.floor(W * Z.toCaster)); if (J && K(J) && J.id !== L.id && G > 0) {
    let M = B === w.Status ? G : k0(b, J, G);
    if (M <= 0)
        return Q;
    let V = f(0, J.attrs.hp - M);
    if (gb(b, J, J.attrs.hp - V), J.attrs.hp = V, b.emit({ type: F.Damage, sourceId: v.id, targetId: J.id, amount: M, hpAfter: V, kind: j }), V <= 0)
        b.applyHpZero(J, v, (_c = b.currentAction) === null || _c === void 0 ? void 0 : _c.skillId);
} return Q; }
function Lb(b, v, L, W, j = !1, B = !1, $ = !0) { var _a, _c, _d; if (L.flags.dead || L.flags.escaped || L.flags.downed)
    return; if (o(b.skills, L).some((U) => { var _a; return (_a = U.innate) === null || _a === void 0 ? void 0 : _a.rejectHpRecovery; }))
    return; if (j) {
    let U = k(v0, W + v.attrs.healPower);
    L.attrs.maxHp += U, b.emit({ type: F.Heal, sourceId: v.id, targetId: L.id, amount: U, hpAfter: L.attrs.hp });
    return;
} let Z = k(v0, W + (B || !$ ? 0 : x(v).healPower)), J = ((_a = b.currentAction) === null || _a === void 0 ? void 0 : _a.primaryTargetId) !== void 0 && L.id === b.currentAction.primaryTargetId, Q = a0(L) * (B ? 1 : hb(v)), G = b.hooks.emit(C.OnHealCalc, { origin: b.suppressHooks > 0 ? w.HookDerived : w.ActionDirect, source: v, target: L, heal: Z * Q, skillId: (_c = b.currentAction) === null || _c === void 0 ? void 0 : _c.skillId, isPrimary: J }), M = k(0, B ? Z * Q : (_d = G.heal) !== null && _d !== void 0 ? _d : Z * Q), V = Math.min(e(L), L.attrs.hp + M), q = V - L.attrs.hp; if (L.attrs.hp = V, q > 0)
    b.emit({ type: F.Heal, sourceId: v.id, targetId: L.id, amount: q, hpAfter: V }); }
function Zb(b, v, L, W, j = !1) { if (L.flags.escaped)
    return !1; if (!j && o(b.skills, L).some((Z) => { var _a; return (_a = Z.innate) === null || _a === void 0 ? void 0 : _a.rejectHpRecovery; }))
    return !1; if (!(L.flags.downed || L.flags.dead || L.attrs.hp <= 0))
    return !1; if (A0(b, L))
    return b.emit({ type: F.ActionFailed, unitId: v.id, reason: t.ReviveBlocked }), !1; let $ = Math.max(s, Math.min(e(L), Math.floor(W))); return L.attrs.hp = $, L.flags.downed = !1, L.flags.dead = !1, L.flags.revivedRound = b.state.round, b.emit({ type: F.UnitRevived, unitId: L.id, hp: $ }), b.emit({ type: F.Heal, sourceId: v.id, targetId: L.id, amount: $, hpAfter: $ }), !0; }
function lb(b, v, L, W, j = {}) { if (L.flags.escaped)
    return 0; if (o(b.skills, L).some(($) => { var _a; return (_a = $.innate) === null || _a === void 0 ? void 0 : _a.rejectHpRecovery; }))
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
function Jb(b, v, L, W) { l0(b, v, L, W); }
function l0(b, v, L, W) { if (L.flags.dead || L.flags.escaped)
    return; let j = L.wound; if (L.wound = Math.max(0, Math.min(L.attrs.maxHp - s, j + Math.floor(W))), L.wound === j)
    return; L.attrs.hp = Math.min(L.attrs.hp, e(L)), b.emit({ type: F.WoundChanged, sourceId: v.id, targetId: L.id, before: j, after: L.wound, hpAfter: L.attrs.hp, recoverableHpAfter: e(L) }); }
var P4 = new Set([G0.Item, G0.Catch]);
var T1 = { [X.Repeat]: (b, v, L, W, j, B) => { let $ = W.min + Math.floor(b.rng.next() * (W.max - W.min + 1)); for (let Z = 0; Z < $ && K(v) && !b.state.result; Z++)
        xb(b, v, L, W.effects, j, B, !0); }, [X.ModifyFact]: (b, v, L, W, j, B) => { var _a; ((_a = v.combatFacts) !== null && _a !== void 0 ? _a : (v.combatFacts = {}))[W.key] = P(W.value, { ...B, state: b.state }); }, [X.ModifyStatusDuration]: (b, v, L, W, j, B) => { for (let $ of j) {
        let Z = $.statuses.filter((J) => { var _a, _c; let Q = b.statusDefs.get(J.id); return (!W.ownedOnly || J.sourceId === v.id) && (((_a = W.kinds) === null || _a === void 0 ? void 0 : _a.includes(J.kind)) || (Q === null || Q === void 0 ? void 0 : Q.dispellable) !== !1 && (Q === null || Q === void 0 ? void 0 : Q.category) && ((_c = W.categories) === null || _c === void 0 ? void 0 : _c.includes(Q.category))); });
        if (W.random)
            for (let J = Z.length - 1; J > 0; J--) {
                let Q = Math.floor(b.rng.next() * (J + 1));
                [Z[J], Z[Q]] = [Z[Q], Z[J]];
            }
        for (let J of Z.slice(0, W.maxCount))
            if (J.remainingRounds += Math.floor(P(W.amount, { ...B, target: $, state: b.state })), J.remainingRounds <= 0)
                $0(b, $, J.id, u.Consumed, J.sourceId);
    } }, [X.ModifyCooldown]: (b, v, L, W, j, B) => { var _a; let $ = (_a = v.cooldowns) === null || _a === void 0 ? void 0 : _a[W.skillId]; if ($ !== void 0 && $ > b.state.round)
        v.cooldowns[W.skillId] = Math.max(b.state.round, $ + Math.floor(P(W.amount, { ...B, state: b.state }))); }, [X.LoseHp]: (b, v, L, W, j, B) => { for (let $ of j)
        Q0(b, v, $, Math.max(0, Math.floor(P(W.power, { ...B, target: $ }))), O.Fixed, !0, w.Status); }, [X.RandomBranch]: E1, [X.SkipNextAction]: (b, v) => { v.flags.skipNextAction = !0; }, [X.ApplyStatus]: p1, [X.RemoveStatus]: o1, [X.CopyStatus]: r1, [X.EmitMechanic]: (b, v, L, W, j) => { var _a; b.emit({ type: F.MechanicTriggered, mechanicId: W.mechanicId, name: W.name, sourceId: v.id, targetId: (_a = j[0]) === null || _a === void 0 ? void 0 : _a.id }); }, [X.Dispel]: f1, [X.Heal]: (b, v, L, W, j, B) => { for (let $ of j)
        Lb(b, v, $, P(W.power, { ...B, target: $ }), W.healMaxHp, W.fixedBase, W.includeHealPower); }, [X.RestoreHp]: y1, [X.RestoreMp]: k1, [X.Revive]: g1, [X.DamageMp]: (b, v, L, W, j, B) => { let $ = P(W.power, B); for (let Z of j)
        $b(b, v, Z, $); }, [X.Wound]: (b, v, L, W, j, B) => { let $ = P(W.power, B); for (let Z of j)
        Jb(b, v, Z, $); }, [X.RemoveWound]: (b, v, L, W, j, B) => { var _a, _c; for (let $ of j) {
        let Z = Math.max(0, P(W.power, { ...B, target: $ })), J = b.hooks.emit("onWoundCalc", { source: v, target: $, wound: Z, skillId: (_a = b.currentAction) === null || _a === void 0 ? void 0 : _a.skillId });
        l0(b, v, $, -Math.max(0, Math.floor((_c = J.wound) !== null && _c !== void 0 ? _c : Z)));
    } }, [X.ApplyBarrier]: (b, v, L, W, j, B) => { var _a, _c; for (let $ of j)
        bb(b, v, $, { id: W.id, kind: W.kind, name: W.name, amount: (_c = b.hooks.emit("onBarrierCalc", { origin: b.suppressHooks > 0 ? w.HookDerived : w.ActionDirect, source: v, target: $, barrier: P(W.power, { ...B, target: $ }), skillId: (_a = b.currentAction) === null || _a === void 0 ? void 0 : _a.skillId }).barrier) !== null && _c !== void 0 ? _c : 0, duration: P(W.duration, { ...B, target: $ }), untilBattleEnd: W.untilBattleEnd }); }, [X.PhysicalHit]: Qb, [X.SpellHit]: Qb, [X.FixedHit]: Qb, [X.ModifyStrike]: () => { return; }, [X.ModifyDefenseIgnore]: () => { return; }, [X.ModifyHeal]: () => { return; }, [X.ModifyBarrier]: () => { return; }, [X.ModifyWound]: () => { return; }, [X.SetCrit]: () => { return; }, [X.ModifyResource]: a1, [X.ModifyChance]: () => { return; }, [X.ClearSkipNextAction]: (b, v) => { v.flags.skipNextAction = !1; } };
function E1(b, v, L, W, j, B) { var _a; let $ = Math.min(1, Math.max(0, P(W.chance, B))), Z = b.rng.chance($); b.emit({ type: F.ChanceResolved, branchId: W.branchId, sourceId: v.id, targetId: (_a = j[0]) === null || _a === void 0 ? void 0 : _a.id, chance: $, success: Z }); let J = Z ? W.successEffects : W.failureEffects; xb(b, v, L, J, j, B); }
function xb(b, v, L, W, j, B, $ = !1) { var _a, _c; for (let Z of W) {
    if ($ && (!K(v) || b.state.result))
        break;
    let J = Z.targeting ? g0(b, v, { ...L, targeting: Z.targeting }, j.map((M) => M.id)) : j, Q = Z.when ? J.filter((M) => J0(b, Z.when, { source: v, target: M, skill: L, skillId: L.id })) : J;
    if (J.length > 0 && Q.length === 0)
        continue;
    let G = { ...B, target: (_a = Q[0]) !== null && _a !== void 0 ? _a : B.target, targetStatusStacks: D0(b, Z.when, (_c = Q[0]) !== null && _c !== void 0 ? _c : B.target) };
    Yb(b, v, L, Z, Q, G);
} }
function y1(b, v, L, W, j, B) { var _a, _c; let $ = f(0, Math.floor(P(W.power, B))), Z = b.currentAction, J = `${v.id}:${L.id}`; if (W.maxGainPerAction !== void 0 && Z) {
    let Q = f(0, Math.floor(P(W.maxGainPerAction, B)));
    $ = Math.min($, Math.max(0, Q - ((_a = Z.hpRestoreGains[J]) !== null && _a !== void 0 ? _a : 0)));
} for (let Q of j) {
    let G = lb(b, v, Q, $, { revive: W.revive, allowFatal: W.allowFatal, clearStatuses: W.clearStatuses });
    if (Z && G > 0)
        Z.hpRestoreGains[J] = ((_c = Z.hpRestoreGains[J]) !== null && _c !== void 0 ? _c : 0) + G;
} }
function Yb(b, v, L, W, j, B) { var _a, _c; if (B = { ...B, state: b.state, normalTargetIds: (_a = b.currentAction) === null || _a === void 0 ? void 0 : _a.normalTargetIds, killedTargetIds: (_c = b.currentAction) === null || _c === void 0 ? void 0 : _c.killedTargetIds }, W.type !== X.SkipNextAction && W.type !== X.RandomBranch && W.type !== X.Repeat && W.type !== X.ApplyStatus && W.type !== X.RemoveStatus && W.type !== X.CopyStatus && W.type !== X.EmitMechanic && W.type !== X.Dispel && W.type !== X.ModifyStrike && W.type !== X.ModifyDefenseIgnore && W.type !== X.ModifyHeal && W.type !== X.SetCrit && W.type !== X.ModifyResource && W.type !== X.ModifyFact && W.type !== X.ModifyChance && W.type !== X.ClearSkipNextAction) {
    if (j.length === 0) {
        b.emit({ type: F.ActionFailed, unitId: v.id, reason: t.NoTarget });
        return;
    }
} let $ = T1[W.type]; $(b, v, L, W, j, B); }
function nb(b, v) { return b.statuses.filter((L) => { var _a, _c; return ((_a = v.statusIds) === null || _a === void 0 ? void 0 : _a.includes(L.id)) || ((_c = v.kinds) === null || _c === void 0 ? void 0 : _c.includes(L.kind)); }).sort((L, W) => L.appliedRound - W.appliedRound || L.id.localeCompare(W.id)); }
function o1(b, v, L, W, j, B) { for (let $ of j) {
    let Z = W.maxCount === void 0 ? Number.POSITIVE_INFINITY : Math.max(0, Math.floor(P(W.maxCount, { ...B, target: $ })));
    for (let J of nb($, W).filter((Q) => !W.ownedOnly || Q.sourceId === v.id).slice(0, Z))
        $0(b, $, J.id, u.Consumed, W.ownedOnly ? v.id : void 0);
} }
function r1(b, v, L, W, j, B) { var _a, _c; let $ = (_a = b.currentAction) === null || _a === void 0 ? void 0 : _a.primaryTargetId, Z = $ ? b.state.units.find((M) => M.id === $) : void 0; if (!Z)
    return; let J = W.maxCount === void 0 ? Number.POSITIVE_INFINITY : Math.max(0, Math.floor(P(W.maxCount, B))), Q = nb(Z, W).slice(0, J), G = Math.floor(P((_c = W.durationAdd) !== null && _c !== void 0 ? _c : 0, B)); for (let M of j) {
    if (M.id === Z.id)
        continue;
    for (let V of Q)
        Tb(b, v, M, V, G);
} }
function a1(b, v, L, W, j, B) { var _a, _c, _d; let $ = W.affectTarget ? j[0] : v; if (!$)
    return; let Z = L0($, W.resourceId); if (!Z)
    return; let J = Z.current, Q = Math.floor(P(W.amount, B)), G = b.currentAction, M = `${$.id}:${Z.id}`; if (W.mode !== "set" && Q > 0 && W.maxGainPerAction !== void 0 && G) {
    let q = Math.max(0, Math.floor(P(W.maxGainPerAction, B)));
    Q = Math.min(Q, Math.max(0, q - ((_a = G.resourceGains[M]) !== null && _a !== void 0 ? _a : 0)));
} let V = W.mode === "set" ? Q : J + Q; if (Z.current = Math.min((_c = Z.max) !== null && _c !== void 0 ? _c : Number.MAX_SAFE_INTEGER, Math.max(0, V)), Z.current === J)
    return; if (W.mode !== "set" && Z.current > J && G)
    G.resourceGains[M] = ((_d = G.resourceGains[M]) !== null && _d !== void 0 ? _d : 0) + Z.current - J; b.emit({ type: F.ResourceChanged, sourceId: v.id, unitId: $.id, resourceId: Z.id, before: J, after: Z.current }); }
function p1(b, v, L, W, j, B) { var _a, _c, _d, _f, _g, _h, _j; let $ = W.self ? [v] : j, Z = k(1, P(W.duration, B)); for (let J of $) {
    if ((J.flags.downed || J.flags.dead) && !((_c = (_a = W.targeting) === null || _a === void 0 ? void 0 : _a.includeDowned) !== null && _c !== void 0 ? _c : L.targeting.includeDowned))
        continue;
    let Q = r(b, v, { target: J, skill: L, skillId: L.id }), G = Q.reduce((U, _) => { var _a; return U + (((_a = _.statusDurationAdd) === null || _a === void 0 ? void 0 : _a.statusId) === W.statusId ? P(_.statusDurationAdd.amount, { ...B, target: J, state: b.state }) : 0); }, 0), M = b.statusDefs.get(W.statusId), V = ((_d = b.currentAction) === null || _d === void 0 ? void 0 : _d.sourceId) === v.id ? (_f = v.skillOverrides[b.currentAction.skillId]) !== null && _f !== void 0 ? _f : b.skills.get(b.currentAction.skillId) : void 0;
    if (v.side !== J.side && (M === null || M === void 0 ? void 0 : M.category) && M.category !== A.Buff && ((V !== null && V !== void 0 ? V : L).tags.includes("spell") || (V !== null && V !== void 0 ? V : L).tags.includes("seal"))) {
        let U = Math.min(0.25, J.passives.reduce((_, h) => { var _a, _c, _d, _f; return _ + ((_f = (_d = (_c = ((_a = J.skillOverrides[h]) !== null && _a !== void 0 ? _a : b.skills.get(h))) === null || _c === void 0 ? void 0 : _c.innate) === null || _d === void 0 ? void 0 : _d.negativeSpellResistance) !== null && _f !== void 0 ? _f : 0); }, 0));
        if (U > 0 && b.rng.chance(U)) {
            b.emit({ type: F.Miss, sourceId: v.id, targetId: J.id, kind: j0.Seal });
            continue;
        }
    }
    if (((_g = W.hit) !== null && _g !== void 0 ? _g : j0.Always) === j0.Seal) {
        let U = r(b, J, { target: v, skill: L, skillId: L.id }), _ = I(Q, "sealChanceAdd", v, J, L, b) - I(U, "sealResistanceAdd", J, v, L, b), h = b.rules.formulas.sealHitChance({ ...v, attrs: x(v) }, { ...J, attrs: x(J) }, B.skillLevel, L.sealBase, _), m = Q.reduce((n, n0) => { var _a; return n * P((_a = n0.sealChanceFactor) !== null && _a !== void 0 ? _a : 1, B); }, 1), N = db(b, J, Q.flatMap((n) => { var _a; return (_a = n.ignoreSealStatusKinds) !== null && _a !== void 0 ? _a : []; })), S = Math.min((_h = b.rules.formulas.sealChanceCeil) !== null && _h !== void 0 ? _h : 1, Math.max(0, h * m * N));
        if (J.statuses.some((n) => { var _a; return (_a = b.statusDefs.get(n.id)) === null || _a === void 0 ? void 0 : _a.immuneToSeal; }) || !b.rng.chance(S)) {
            b.emit({ type: F.Miss, sourceId: v.id, targetId: J.id, kind: j0.Seal });
            continue;
        }
    }
    vb(b, J, W.statusId, Math.max(1, Math.floor(Z + G)), v.id, { storedTargetId: W.storeTarget ? J.id === v.id ? (_j = B.target) === null || _j === void 0 ? void 0 : _j.id : J.id : void 0, env: { ...B, target: J } });
} }
function f1(b, v, L, W, j) { var _a, _c, _d, _f, _g, _h; var _j; let B = j.length ? j : [v]; for (let $ of B) {
    let Z = (_a = W.categoryPriority) !== null && _a !== void 0 ? _a : [A.Control, A.Debuff, A.Dot, A.Buff], J = W.maxCount === void 0 ? Number.POSITIVE_INFINITY : Math.max(0, Math.floor(P(W.maxCount, { skillLevel: 0, targets: 1, source: v, target: $ }))), Q = $.statuses.filter((G) => { var _a, _c, _d, _f, _g; let M = b.statusDefs.get(G.id); if ((M === null || M === void 0 ? void 0 : M.dispellable) === !1)
        return !1; if (W.schoolOnly && !(M === null || M === void 0 ? void 0 : M.school))
        return !1; if (((_a = W.includeStatusFlags) === null || _a === void 0 ? void 0 : _a.length) && !W.includeStatusFlags.some((V) => Boolean(M === null || M === void 0 ? void 0 : M[V])))
        return !1; if ((_c = W.excludeStatusFlags) === null || _c === void 0 ? void 0 : _c.some((V) => Boolean(M === null || M === void 0 ? void 0 : M[V])))
        return !1; return ((_d = W.statusIds) === null || _d === void 0 ? void 0 : _d.includes(G.id)) === !0 || ((_f = W.kinds) === null || _f === void 0 ? void 0 : _f.includes(G.kind)) === !0 || (M === null || M === void 0 ? void 0 : M.category) !== void 0 && ((_g = W.categories) === null || _g === void 0 ? void 0 : _g.includes(M.category)) === !0; }).sort((G, M) => { var _a, _c; let V = (_a = b.statusDefs.get(G.id)) === null || _a === void 0 ? void 0 : _a.category, q = (_c = b.statusDefs.get(M.id)) === null || _c === void 0 ? void 0 : _c.category, U = V === void 0 ? Z.length : Z.indexOf(V), _ = q === void 0 ? Z.length : Z.indexOf(q); return U - _ || G.appliedRound - M.appliedRound || G.id.localeCompare(M.id); });
    if (W.random)
        for (let G = Q.length - 1; G > 0; G--) {
            let M = Math.floor(b.rng.next() * (G + 1));
            [Q[G], Q[M]] = [Q[M], Q[G]];
        }
    for (let G of Q.slice(0, J)) {
        let M = (_c = b.statusDefs.get(G.id)) === null || _c === void 0 ? void 0 : _c.dispelClass, V = (_f = (M ? (_d = W.chanceByClass) === null || _d === void 0 ? void 0 : _d[M] : void 0)) !== null && _f !== void 0 ? _f : W.chance;
        if (V !== void 0) {
            let q = b.rng.chance(V);
            if (b.emit({ type: F.ChanceResolved, branchId: `${L.id}.dispel.${G.id}`, sourceId: v.id, targetId: $.id, chance: V, success: q }), !q)
                continue;
        }
        if ($0(b, $, G.id, u.Dispel), W.preventReapplyThisRound || W.immunityRounds)
            ((_g = (_j = $.flags).statusImmunityThroughRound) !== null && _g !== void 0 ? _g : (_j.statusImmunityThroughRound = {}))[G.kind] = b.state.round + ((_h = W.immunityRounds) !== null && _h !== void 0 ? _h : 0);
    }
} }
function k1(b, v, L, W, j, B) { for (let $ of j) {
    let Z = f(0, Math.floor(P(W.power, { ...B, target: $ }))), J = Math.min($.attrs.maxMp, $.attrs.mp + Z), Q = J - $.attrs.mp;
    if ($.attrs.mp = J, Q > 0)
        b.emit({ type: F.MpRestore, unitId: $.id, amount: Q, mpAfter: $.attrs.mp });
} }
function g1(b, v, L, W, j, B) { for (let $ of j) {
    let Z = W.hpRatio !== void 0 ? $.attrs.maxHp * P(W.hpRatio, { ...B, target: $ }) : P(W.hp, { ...B, target: $ });
    Zb(b, v, $, W.respectHealTaken ? Math.floor(Z) * a0($) : Z);
} }
function Qb(b, v, L, W, j, B) { var _a, _c, _d, _f, _g, _h, _j, _k, _l; let $ = r(b, v, { skill: L, skillId: L.id }), Z = k(1, P((_a = W.hits) !== null && _a !== void 0 ? _a : Hb, B) + (W.type === X.PhysicalHit ? I($, "physicalHitsAdd", v, j[0], L) : 0)), J = W.coeff, Q = Array.isArray(J) ? J : Array.from({ length: Z }, () => J !== null && J !== void 0 ? J : 1), G = (_c = W.formula) !== null && _c !== void 0 ? _c : L.formula, M = W.type === X.FixedHit ? !0 : W.trueDamage, q = W.type === X.FixedHit || M === !0 || G === l.Fixed || G === l.Judge ? O.Fixed : W.type === X.PhysicalHit ? O.Physical : O.Spell; for (let U of j) {
    if (((_d = W.when) === null || _d === void 0 ? void 0 : _d.targetSlot) === "primary" && ((_f = b.currentAction) === null || _f === void 0 ? void 0 : _f.primaryTargetId) !== U.id)
        continue;
    for (let _ = 0; _ < Z; _++) {
        if (!K(v) || !K(U) || b.state.result)
            break;
        Mb(b, { percentageDamage: W.type === X.FixedHit ? W.percentageDamage : void 0, source: v, target: U, kind: q, coeff: (_h = (_g = Q[_]) !== null && _g !== void 0 ? _g : Q[Q.length - 1]) !== null && _h !== void 0 ? _h : 1, resultFactor: (_j = W.resultFactors) === null || _j === void 0 ? void 0 : _j[_], mpDamageRatio: W.type === X.PhysicalHit ? W.mpDamageRatio : void 0, power: P(W.power, { ...B, target: U }), trueDamage: M, defenseIgnore: W.type === X.PhysicalHit || W.type === X.SpellHit ? P((_k = W.defenseIgnore) !== null && _k !== void 0 ? _k : 0, B) : 0, cannotMiss: W.type === X.PhysicalHit ? W.cannotMiss : q === O.Fixed, cannotKill: W.cannotKill, formula: G, skillLevel: B.skillLevel, targetCount: B.targets, schoolTerm: L.schoolTerm, splash: L.splash, skillId: L.id, isPrimary: ((_l = b.currentAction) === null || _l === void 0 ? void 0 : _l.primaryTargetId) === U.id, origin: W.type === X.FixedHit ? W.origin : void 0 });
    }
} }
var eb = { $schema: "./progression.schema.json", formatVersion: 1, contentRevision: 3, pointsPerLevel: 5, experience: { base: 100, perLevel: 20, victoryPerEnemyLevel: 10, perLevelSquared: 0.5 }, lifespan: { deathLoss: 50, deployMinimum: 50, restRecoveryPerStone: 10 }, capture: { mpBase: 10, mpPerCarryLevel: 1, minChance: 0.1, maxChance: 0.85, baseChance: 0.35, missingHpFactor: 0.4, levelDifferenceFactor: 0.01 }, panel: { naturalBase: 10, naturalPerLevel: 1, health: { aptitudeCoefficient: 0.002895, attributeCoefficient: 7 }, mana: { aptitudeCoefficient: 0.002085, attributeCoefficient: 5 }, physicalAtk: { aptitudeCoefficient: 0.0025, attributeCoefficient: 1.6 }, physicalDef: { aptitudeCoefficient: 0.003345, attributeCoefficient: 2.4 }, magicAtk: { aptitudeCoefficient: 0.000845, attributeCoefficient: 1.3 }, speed: { aptitudeCoefficient: 0.002087, attributeCoefficient: 1.6 }, magicDef: { aptitudeCoefficient: 0.000611, attributeCoefficients: { constitution: 0.3, magic: 0.8, strength: 0.48, endurance: 0.16 } } } };
var tb = { $schema: "./skills.schema.json", formatVersion: 1, contentRevision: 16, skills: [{ id: "beast.spirit-flame", name: "灵火", book: !0, advanced: !1, effect: { type: "spellHit", costMp: 10, coefficient: 1, powerBase: 10, powerPerLevel: 1 }, icon: "🔥", flavorText: "以灵火攻击一个目标，造成法术伤害。" }, { id: "beast.combo", name: "连击", book: !0, advanced: !1, effect: { type: "combo", chance: 0.45, coefficient: 1, physicalFactor: 0.75 }, icon: "⚔️", flavorText: "普通攻击命中后有机会追加一击，但自身造成的物理伤害会降低。" }, { id: "beast.advanced-combo", name: "高级连击", book: !0, advanced: !0, effect: { type: "combo", chance: 0.55, coefficient: 1, physicalFactor: 0.8 }, icon: "⚔️", flavorText: "普通攻击命中后有机会追加一击，但自身造成的物理伤害会降低。" }, { id: "beast.counter", name: "反击", book: !0, advanced: !1, effect: { type: "counter", chance: 0.3, coefficient: 0.5 }, icon: "↩️", flavorText: "受到物理攻击并损失气血时，有机会反击攻击者。" }, { id: "beast.advanced-counter", name: "高级反击", book: !0, advanced: !0, effect: { type: "counter", chance: 0.3, coefficient: 1 }, icon: "↩️", flavorText: "受到物理攻击并损失气血时，有机会反击攻击者。" }, { id: "beast.critical", name: "必杀", book: !0, advanced: !1, effect: { type: "critical", kind: "physical", chance: 0.1 }, icon: "💥", flavorText: "物理攻击更容易打出暴击。" }, { id: "beast.advanced-critical", name: "高级必杀", book: !0, advanced: !0, effect: { type: "critical", kind: "physical", chance: 0.2 }, icon: "💥", flavorText: "物理攻击更容易打出暴击。" }, { id: "beast.spell-critical", name: "灵法会心", book: !0, advanced: !1, effect: { type: "critical", kind: "spell", chance: 0.1 }, icon: "✨", flavorText: "法术攻击更容易打出暴击。" }, { id: "beast.advanced-spell-critical", name: "高级灵法会心", book: !0, advanced: !0, effect: { type: "critical", kind: "spell", chance: 0.15 }, icon: "✨", flavorText: "法术攻击更容易打出暴击。" }, { id: "beast.regeneration", name: "自愈", book: !0, advanced: !1, effect: { type: "regeneration", resource: "hp", levelDivisor: 2 }, icon: "🌱", flavorText: "每回合结束时恢复自身气血。" }, { id: "beast.advanced-regeneration", name: "高级自愈", book: !0, advanced: !0, effect: { type: "regeneration", resource: "hp", levelDivisor: 1 }, icon: "🌱", flavorText: "每回合结束时恢复自身气血。" }, { id: "beast.meditation", name: "回灵", book: !0, advanced: !1, effect: { type: "regeneration", resource: "mp", levelDivisor: 4 }, icon: "🧘", flavorText: "每回合结束时恢复自身法力。" }, { id: "beast.advanced-meditation", name: "高级回灵", book: !0, advanced: !0, effect: { type: "regeneration", resource: "mp", levelDivisor: 3 }, icon: "🧘", flavorText: "每回合结束时恢复自身法力。" }, { id: "beast.agility", name: "迅捷", book: !0, advanced: !1, effect: { type: "speed", factor: 1.1 }, icon: "💨", flavorText: "提高自身速度。" }, { id: "beast.advanced-agility", name: "高级迅捷", book: !0, advanced: !0, effect: { type: "speed", factor: 1.2 }, icon: "💨", flavorText: "提高自身速度。" }, { id: "beast.spell-mastery", name: "灵法精通", book: !0, advanced: !1, effect: { type: "spellBoost", factor: 1.1 }, icon: "🔮", flavorText: "提高自身造成的法术伤害。" }, { id: "beast.advanced-spell-mastery", name: "高级灵法精通", book: !0, advanced: !0, effect: { type: "spellBoost", factor: 1.2 }, icon: "🔮", flavorText: "提高自身造成的法术伤害。" }, { id: "beast.sluggish", name: "迟钝", book: !0, advanced: !1, effect: { type: "speed", factor: 0.8 }, icon: "🐢", flavorText: "降低自身速度。" }, { id: "beast.thunder", name: "雷击", book: !0, advanced: !1, effect: { type: "spellHit", costMp: 10, coefficient: 1, powerBase: 10, powerPerLevel: 1 }, icon: "⚡", flavorText: "以雷光攻击一个目标，造成法术伤害。" }, { id: "beast.falling-rock", name: "落岩", book: !0, advanced: !1, effect: { type: "spellHit", costMp: 10, coefficient: 1, powerBase: 10, powerPerLevel: 1 }, icon: "🪨", flavorText: "以落岩攻击一个目标，造成法术伤害。" }, { id: "beast.water-attack", name: "水击", book: !0, advanced: !1, effect: { type: "spellHit", costMp: 10, coefficient: 1, powerBase: 10, powerPerLevel: 1 }, icon: "💧", flavorText: "以水流攻击一个目标，造成法术伤害。" }, { id: "beast.lifesteal", name: "噬血", book: !0, advanced: !1, effect: { type: "lifesteal", ratio: 0.25 }, icon: "🩸", flavorText: "物理攻击使目标损失气血时，按伤害量恢复自身气血。" }, { id: "beast.advanced-lifesteal", name: "高级噬血", book: !0, advanced: !0, effect: { type: "lifesteal", ratio: 0.3 }, icon: "🩸", flavorText: "物理攻击使目标损失气血时，按伤害量恢复自身气血。" }, { id: "beast.reflection", name: "反震", book: !0, advanced: !1, effect: { type: "reflection", kind: "physical", chance: 0.3, ratio: 0.25 }, icon: "🪞", flavorText: "受到物理攻击并损失气血时，有机会将部分伤害反震给攻击者。" }, { id: "beast.advanced-reflection", name: "高级反震", book: !0, advanced: !0, effect: { type: "reflection", kind: "physical", chance: 0.3, ratio: 0.5 }, icon: "🪞", flavorText: "受到物理攻击并损失气血时，有机会将部分伤害反震给攻击者。" }, { id: "beast.divine-revival", name: "涅槃重生", book: !0, advanced: !1, effect: { type: "divineRevival", chance: 0.2, hpRatio: 0.6 }, icon: "🪷", flavorText: "受到致命伤害时，有机会复生并恢复气血。" }, { id: "beast.advanced-divine-revival", name: "高级涅槃重生", book: !0, advanced: !0, effect: { type: "divineRevival", chance: 0.3, hpRatio: 1 }, icon: "🪷", flavorText: "受到致命伤害时，有机会复生并恢复气血。" }, { id: "beast.spell-reflection", name: "灵法反震", book: !0, advanced: !1, effect: { type: "reflection", kind: "spell", chance: 0.3, ratio: 0.25 }, icon: "🔷", flavorText: "受到法术攻击并损失气血时，有机会将部分伤害反震给施术者。" }, { id: "beast.advanced-spell-reflection", name: "高级灵法反震", book: !0, advanced: !0, effect: { type: "reflection", kind: "spell", chance: 0.3, ratio: 0.5 }, icon: "🔷", flavorText: "受到法术攻击并损失气血时，有机会将部分伤害反震给施术者。" }, { id: "beast.wisdom", name: "慧根", book: !0, advanced: !1, effect: { type: "wisdom", factor: 0.75 }, icon: "💡", flavorText: "施展法术消耗的法力减少。" }, { id: "beast.advanced-wisdom", name: "高级慧根", book: !0, advanced: !0, effect: { type: "wisdom", factor: 0.5 }, icon: "💡", flavorText: "施展法术消耗的法力减少。" }, { id: "beast.sneak-attack", name: "偷袭", book: !0, advanced: !1, effect: { type: "sneakAttack", factor: 1.05 }, icon: "🥷", flavorText: "提高自身物理伤害，物理攻击不会触发目标的反击或反震。" }, { id: "beast.advanced-sneak-attack", name: "高级偷袭", book: !0, advanced: !0, effect: { type: "sneakAttack", factor: 1.1 }, icon: "🥷", flavorText: "提高自身物理伤害，物理攻击不会触发目标的反击或反震。" }, { id: "beast.spell-resistance", name: "御法", book: !0, advanced: !1, effect: { type: "spellResistance", takenFactor: 0.95, physicalFactor: 0.9 }, icon: "🔰", flavorText: "降低所受法术伤害，但自身造成的物理伤害也会降低。" }, { id: "beast.advanced-spell-resistance", name: "高级御法", book: !0, advanced: !0, effect: { type: "spellResistance", takenFactor: 0.9, physicalFactor: 0.9 }, icon: "🔰", flavorText: "降低所受法术伤害，但自身造成的物理伤害也会降低。" }, { id: "beast.parry", name: "招架", book: !0, advanced: !1, effect: { type: "parry", factor: 0.9 }, icon: "🤺", flavorText: "每回合首次被物理攻击命中时，减轻该次伤害。" }, { id: "beast.advanced-parry", name: "高级招架", book: !0, advanced: !0, effect: { type: "parry", factor: 0.8 }, icon: "🤺", flavorText: "每回合首次被物理攻击命中时，减轻该次伤害。" }, { id: "beast.defense", name: "铁骨", book: !0, advanced: !1, effect: { type: "defenseTraining", perLevel: 0.6, spellFactor: 0.9 }, icon: "🛡️", flavorText: "物理防御随等级提高，但自身造成的法术伤害降低。" }, { id: "beast.advanced-defense", name: "高级铁骨", book: !0, advanced: !0, effect: { type: "defenseTraining", perLevel: 0.8, spellFactor: 0.95 }, icon: "🛡️", flavorText: "物理防御随等级提高，但自身造成的法术伤害降低。" }, { id: "beast.strength", name: "蛮力", book: !0, advanced: !1, effect: { type: "strengthTraining", perLevel: 0.4, versusDefenseFactor: 0.8 }, icon: "💪", flavorText: "物理攻击随等级提高，能够破开招架。" }, { id: "beast.advanced-strength", name: "高级蛮力", book: !0, advanced: !0, effect: { type: "strengthTraining", perLevel: 0.55, versusDefenseFactor: 0.8 }, icon: "💪", flavorText: "物理攻击随等级提高，能够破开招架。" }, { id: "beast.thunderstorm", name: "九霄神雷", book: !0, advanced: !0, effect: { type: "groupSpell", costMp: 20, coefficient: 0.8, powerBase: 10, powerPerLevel: 1, levelsPerTarget: 30, maxTargets: 3 }, icon: "🌩️", flavorText: "雷光扫过敌方，造成法术伤害；等级越高，可攻击的目标越多。" }, { id: "beast.mountain-crush", name: "山崩地裂", book: !0, advanced: !0, effect: { type: "groupSpell", costMp: 20, coefficient: 0.8, powerBase: 10, powerPerLevel: 1, levelsPerTarget: 30, maxTargets: 3 }, icon: "⛰️", flavorText: "山石砸向敌方，造成法术伤害；等级越高，可攻击的目标越多。" }, { id: "beast.flood", name: "翻江倒海", book: !0, advanced: !0, effect: { type: "groupSpell", costMp: 20, coefficient: 0.8, powerBase: 10, powerPerLevel: 1, levelsPerTarget: 30, maxTargets: 3 }, icon: "🌊", flavorText: "巨浪冲向敌方，造成法术伤害；等级越高，可攻击的目标越多。" }, { id: "beast.wildfire", name: "红莲业火", book: !0, advanced: !0, effect: { type: "groupSpell", costMp: 20, coefficient: 0.8, powerBase: 10, powerPerLevel: 1, levelsPerTarget: 30, maxTargets: 3 }, icon: "🌋", flavorText: "烈焰席卷敌方，造成法术伤害；等级越高，可攻击的目标越多。" }, { id: "beast.spell-combo", name: "灵法连击", book: !0, advanced: !1, effect: { type: "spellRepeat", chance: 0.2, factor: 0.5 }, icon: "🌀", flavorText: "施放伤害法术后，有机会对原目标再施放一次同一法术。" }, { id: "beast.advanced-spell-combo", name: "高级灵法连击", book: !0, advanced: !0, effect: { type: "spellRepeat", chance: 0.3, factor: 0.5 }, icon: "🌀", flavorText: "施放伤害法术后，有机会对原目标再施放一次同一法术。" }, { id: "beast.spell-fluctuation", name: "法威无常", book: !0, advanced: !1, effect: { type: "spellFluctuation", min: 0.8, max: 1.25, suppressReflection: !1 }, icon: "🎲", flavorText: "法术伤害忽高忽低。" }, { id: "beast.advanced-spell-fluctuation", name: "高级法威无常", book: !0, advanced: !0, effect: { type: "spellFluctuation", min: 0.5, max: 1.6, suppressReflection: !0 }, icon: "🎲", flavorText: "法术伤害起伏更大，法术攻击也不会触发灵法反震。" }, { id: "beast.stealth", name: "隐身", book: !0, advanced: !1, effect: { type: "stealth", minDuration: 2, maxDuration: 3, physicalFactor: 0.8 }, icon: "🌫️", flavorText: "首次出战时隐身数回合，期间不能施法，造成的物理伤害降低。" }, { id: "beast.advanced-stealth", name: "高级隐身", book: !0, advanced: !0, effect: { type: "stealth", minDuration: 3, maxDuration: 5, physicalFactor: 0.85 }, icon: "🌫️", flavorText: "首次出战时隐身数回合，期间不能施法，造成的物理伤害降低。" }, { id: "beast.perception", name: "灵觉", book: !0, advanced: !1, effect: { type: "perception", dodgeBonus: 0 }, icon: "👁️", flavorText: "能看破隐身，攻击隐身目标。" }, { id: "beast.advanced-perception", name: "高级灵觉", book: !0, advanced: !0, effect: { type: "perception", dodgeBonus: 10 }, icon: "👁️", flavorText: "能看破隐身并攻击隐身目标，自身躲避也会提高。" }, { id: "beast.poison", name: "毒性", book: !0, advanced: !1, effect: { type: "poison", chance: 0.15, duration: 3, hpRatio: 0.02, mpRatio: 0.01, immune: !1 }, icon: "☠️", flavorText: "普攻伤到目标后，有机会使其中毒，持续损失气血和法力。" }, { id: "beast.advanced-poison", name: "高级毒性", book: !0, advanced: !0, effect: { type: "poison", chance: 0.2, duration: 3, hpRatio: 0.02, mpRatio: 0.01, immune: !0 }, icon: "☠️", flavorText: "普攻伤到目标后，有机会使其中毒，持续损失气血和法力；自身免疫此毒。" }, { id: "beast.miracle", name: "解厄", book: !0, advanced: !1, effect: { type: "miracle", immune: !1 }, icon: "🌟", flavorText: "每回合结束时解除自身可驱散的控制、减益和持续伤害。" }, { id: "beast.advanced-miracle", name: "高级避厄", book: !0, advanced: !0, effect: { type: "miracle", immune: !0 }, icon: "🌟", flavorText: "免疫可驱散的控制、减益和持续伤害。" }, { id: "beast.concentration", name: "定神", book: !0, advanced: !1, effect: { type: "concentration", physicalFactor: 0.8, dodgeBonus: 0 }, icon: "🧠", flavorText: "免疫可驱散的控制，但自身造成的物理伤害降低。" }, { id: "beast.advanced-concentration", name: "高级定神", book: !0, advanced: !0, effect: { type: "concentration", physicalFactor: 0.8, dodgeBonus: 10 }, icon: "🧠", flavorText: "免疫可驱散的控制，提高自身躲避，但造成的物理伤害降低。" }, { id: "beast.eternity", name: "灵效绵长", book: !0, advanced: !1, effect: { type: "eternity", factor: 1.5, maxExtra: 3 }, icon: "⏳", flavorText: "自身获得的部分增益持续更久。" }, { id: "beast.advanced-eternity", name: "高级灵效绵长", book: !0, advanced: !0, effect: { type: "eternity", factor: 2, maxExtra: 6 }, icon: "⏳", flavorText: "自身获得的部分增益持续更久。" }, { id: "beast.ghost", name: "灵魂体", book: !0, advanced: !1, effect: { type: "ghost", delay: 5 }, icon: "👻", flavorText: "死亡后等待数回合复起，但无法接受普通气血恢复。" }, { id: "beast.advanced-ghost", name: "高级灵魂体", book: !0, advanced: !0, effect: { type: "ghost", delay: 5 }, icon: "👻", flavorText: "死亡后等待数回合复起，但无法接受普通气血恢复。" }, { id: "beast.exorcism", name: "镇魂", book: !0, advanced: !1, effect: { type: "exorcism", factor: 1.5 }, icon: "🧿", flavorText: "攻击灵魂体目标时伤害提高，击杀后阻止其复起。" }, { id: "beast.advanced-exorcism", name: "高级镇魂", book: !0, advanced: !0, effect: { type: "exorcism", factor: 2 }, icon: "🧿", flavorText: "攻击灵魂体目标时伤害提高，击杀后阻止其复起。" }, { id: "beast.denial", name: "绝灵", book: !0, advanced: !1, effect: { type: "denial", ghostDamageFactor: 1.2, spellFactor: 1 }, icon: "🚫", flavorText: "免疫控制、减益和持续伤害，无法获得增益；更怕灵魂体攻击。" }, { id: "beast.advanced-denial", name: "高级绝灵", book: !0, advanced: !0, effect: { type: "denial", ghostDamageFactor: 1.2, spellFactor: 0.8 }, icon: "🚫", flavorText: "免疫控制、减益和持续伤害，无法获得增益；减轻法术伤害，却更怕灵魂体攻击。" }], families: [{ normal: "beast.combo", advanced: "beast.advanced-combo" }, { normal: "beast.counter", advanced: "beast.advanced-counter" }, { normal: "beast.critical", advanced: "beast.advanced-critical" }, { normal: "beast.spell-critical", advanced: "beast.advanced-spell-critical" }, { normal: "beast.regeneration", advanced: "beast.advanced-regeneration" }, { normal: "beast.meditation", advanced: "beast.advanced-meditation" }, { normal: "beast.agility", advanced: "beast.advanced-agility" }, { normal: "beast.spell-mastery", advanced: "beast.advanced-spell-mastery" }, { normal: "beast.lifesteal", advanced: "beast.advanced-lifesteal" }, { normal: "beast.reflection", advanced: "beast.advanced-reflection" }, { normal: "beast.divine-revival", advanced: "beast.advanced-divine-revival" }, { normal: "beast.spell-reflection", advanced: "beast.advanced-spell-reflection" }, { normal: "beast.wisdom", advanced: "beast.advanced-wisdom" }, { normal: "beast.sneak-attack", advanced: "beast.advanced-sneak-attack" }, { normal: "beast.spell-resistance", advanced: "beast.advanced-spell-resistance" }, { normal: "beast.parry", advanced: "beast.advanced-parry" }, { normal: "beast.defense", advanced: "beast.advanced-defense" }, { normal: "beast.strength", advanced: "beast.advanced-strength" }, { normal: "beast.spell-combo", advanced: "beast.advanced-spell-combo" }, { normal: "beast.spell-fluctuation", advanced: "beast.advanced-spell-fluctuation" }, { normal: "beast.stealth", advanced: "beast.advanced-stealth" }, { normal: "beast.perception", advanced: "beast.advanced-perception" }, { normal: "beast.poison", advanced: "beast.advanced-poison" }, { normal: "beast.miracle", advanced: "beast.advanced-miracle" }, { normal: "beast.concentration", advanced: "beast.advanced-concentration" }, { normal: "beast.eternity", advanced: "beast.advanced-eternity" }, { normal: "beast.ghost", advanced: "beast.advanced-ghost" }, { normal: "beast.exorcism", advanced: "beast.advanced-exorcism" }, { normal: "beast.denial", advanced: "beast.advanced-denial" }] };
var b1 = { $schema: "./species.schema.json", formatVersion: 2, contentRevision: 11, species: [{ id: "combat.wild.species.spirit-fox", name: "烛尾狐", realm: "炼气", icon: "🦊", description: "灰白小狐，尾端长毛聚起灵火时宛如烛芯；夜间常蹲在灵泉旁，将蓬尾绕至身前，以尾尖火光映脸。", carryLevel: 5, starter: !0, aptitudes: { attack: { min: 672, max: 840 }, defense: { min: 864, max: 1080 }, health: { min: 2880, max: 3600 }, mana: { min: 1536, max: 1920 }, speed: { min: 864, max: 1080 } }, growthMilli: { min: 982, max: 1030 }, birthSkills: { core: ["beast.spirit-flame"], candidates: ["beast.wisdom", "beast.meditation"] } }, { id: "combat.wild.species.rock-boar", name: "钢背猪", realm: "炼气", icon: "🐗", description: "身躯矮壮，肩背高耸，钢灰硬皮自颈后连至臀部；性情暴躁，稍受惊扰便喷鼻冲撞，受击时立即转身顶向来敌。", carryLevel: 5, starter: !0, aptitudes: { attack: { min: 816, max: 1020 }, defense: { min: 1180, max: 1440 }, health: { min: 3960, max: 4950 }, mana: { min: 1536, max: 1920 }, speed: { min: 576, max: 720 } }, growthMilli: { min: 1012, max: 1060 }, birthSkills: { core: ["beast.defense"], candidates: ["beast.counter", "beast.sluggish", "beast.strength"] } }, { id: "combat.wild.species.wind-wolf", name: "精灵狼", realm: "炼气", icon: "🐺", description: "身形轻瘦，灰银细毛，耳尖与尾缘泛着淡青光泽；警觉时隐去身形，潜伏于幽林，待猎物走近才突然扑出。", carryLevel: 5, starter: !0, aptitudes: { attack: { min: 1104, max: 1380 }, defense: { min: 624, max: 780 }, health: { min: 2160, max: 2700 }, mana: { min: 960, max: 1200 }, speed: { min: 864, max: 1080 } }, growthMilli: { min: 952, max: 1000 }, birthSkills: { core: ["beast.stealth"], candidates: ["beast.sneak-attack", "beast.agility"] } }, { id: "combat.wild.species.mimi", name: "咪咪", realm: "炼气", icon: "icon:beast-mimi", description: "银灰虎斑的小灵猫，圆脸短足，胸腹雪白，四爪如穿白袜。常将前爪拢在胸前伏成一团，长尾绕身；灵息稍有异动，便竖耳抬头，以黄绿圆眼凝望来处。", carryLevel: 5, starter: !0, aptitudes: { attack: { min: 780, max: 1050 }, defense: { min: 820, max: 1090 }, health: { min: 3300, max: 4300 }, mana: { min: 1320, max: 1800 }, speed: { min: 720, max: 990 } }, growthMilli: { min: 990, max: 1060 }, birthSkills: { core: [], candidates: ["beast.perception", "beast.parry", "beast.regeneration"] } }, { id: "combat.wild.species.fire-crow", name: "火鸦", realm: "筑基", icon: "icon:beast-fire-crow", description: "黑羽赤喉，翼下藏有暗红火羽，振翅时散出火星；常衔焦枝，在地火裂隙旁筑巢。", carryLevel: 25, starter: !1, aptitudes: { attack: { min: 720, max: 980 }, defense: { min: 700, max: 940 }, health: { min: 2700, max: 3500 }, mana: { min: 1800, max: 2300 }, speed: { min: 950, max: 1280 } }, growthMilli: { min: 1020, max: 1090 }, birthSkills: { core: ["beast.wildfire"], candidates: ["beast.meditation", "beast.spell-fluctuation"] } }, { id: "combat.wild.species.red-tail-scorpion", name: "双尾蝎", realm: "筑基", icon: "🦂", description: "沙褐甲壳，腹后生着两条暗红毒尾，静伏时交叠于背，受惊后分别扬起；白日藏石缝，夜间循震动捕猎。", carryLevel: 25, starter: !1, aptitudes: { attack: { min: 1050, max: 1390 }, defense: { min: 1040, max: 1320 }, health: { min: 2500, max: 3300 }, mana: { min: 900, max: 1250 }, speed: { min: 780, max: 1150 } }, growthMilli: { min: 1010, max: 1080 }, birthSkills: { core: ["beast.poison"], candidates: ["beast.sneak-attack", "beast.defense"] } }, { id: "combat.wild.species.stoneback-bear", name: "抱月熊", realm: "筑基", icon: "🐻", description: "深褐长毛，胸腹有浅金圆斑，常坐倚老树，前掌拢腹如抱满月；受伤后蜷身长眠，受逼近时骤起反扑。", carryLevel: 25, starter: !1, aptitudes: { attack: { min: 1100, max: 1420 }, defense: { min: 980, max: 1260 }, health: { min: 4100, max: 5300 }, mana: { min: 1100, max: 1500 }, speed: { min: 600, max: 830 } }, growthMilli: { min: 1035, max: 1100 }, birthSkills: { core: [], candidates: ["beast.counter", "beast.regeneration", "beast.strength", "beast.sluggish"] } }, { id: "combat.wild.species.snow-crane", name: "琉璃鹤", realm: "金丹", icon: "icon:beast-snow-crane", description: "身形修长，喙足淡青，羽毛有半透明玉质光泽；背光近乎雪白，迎光展翼透出青碧淡金，常静立于高山灵池。", carryLevel: 45, starter: !1, aptitudes: { attack: { min: 780, max: 1060 }, defense: { min: 950, max: 1230 }, health: { min: 3400, max: 4500 }, mana: { min: 2200, max: 2800 }, speed: { min: 1120, max: 1450 } }, growthMilli: { min: 1070, max: 1145 }, birthSkills: { core: [], candidates: ["beast.miracle", "beast.water-attack", "beast.wisdom", "beast.agility"] } }, { id: "combat.wild.species.moon-marten", name: "无影貂", realm: "金丹", icon: "icon:beast-moon-marten", description: "深灰细毛，腹部银白，长尾蓬松；警觉时从尾端开始隐去身形，疾行转折间偶尔露出一道银白腹影。", carryLevel: 45, starter: !1, aptitudes: { attack: { min: 1050, max: 1460 }, defense: { min: 780, max: 1040 }, health: { min: 2700, max: 3600 }, mana: { min: 1500, max: 2150 }, speed: { min: 1380, max: 1660 } }, growthMilli: { min: 1055, max: 1130 }, birthSkills: { core: ["beast.stealth"], candidates: ["beast.sneak-attack", "beast.agility", "beast.perception"] } }, { id: "combat.wild.species.dark-shell-turtle", name: "蛇颈玄龟", realm: "金丹", icon: "icon:beast-snake-neck-turtle", description: "黑青厚甲低伏宽展，甲缝附着水苔，甲下藏着蛇一般的长颈；沉居深潭，探颈观察四周，受扰便收颈伏底。", carryLevel: 45, starter: !1, aptitudes: { attack: { min: 980, max: 1260 }, defense: { min: 1450, max: 1680 }, health: { min: 4400, max: 5600 }, mana: { min: 1900, max: 2500 }, speed: { min: 480, max: 680 } }, growthMilli: { min: 1090, max: 1160 }, birthSkills: { core: ["beast.advanced-defense"], candidates: ["beast.sluggish", "beast.water-attack", "beast.regeneration"] } }, { id: "combat.wild.species.ink-jiao", name: "墨蛟", realm: "元婴", icon: "icon:beast-ink-jiao", description: "墨鳞短角，颈侧生须，盘踞地下暗河，唾液含毒，出水时带起浊浪。", carryLevel: 65, starter: !1, aptitudes: { attack: { min: 1230, max: 1580 }, defense: { min: 1120, max: 1450 }, health: { min: 4400, max: 5800 }, mana: { min: 2350, max: 3000 }, speed: { min: 850, max: 1170 } }, growthMilli: { min: 1125, max: 1200 }, birthSkills: { core: ["beast.advanced-poison", "beast.flood"], candidates: ["beast.strength", "beast.meditation", "beast.spell-resistance"] } }, { id: "combat.wild.species.silverwing-mantis", name: "银翅螳螂", realm: "元婴", icon: "icon:beast-silverwing-mantis", description: "银灰甲壳，前肢如弯刃，薄翅收拢时近乎透明，展开时泛起银光；常静伏许久，出击时连续挥斩。", carryLevel: 65, starter: !1, aptitudes: { attack: { min: 1450, max: 1750 }, defense: { min: 1000, max: 1280 }, health: { min: 2850, max: 3850 }, mana: { min: 1200, max: 1680 }, speed: { min: 1420, max: 1720 } }, growthMilli: { min: 1100, max: 1185 }, birthSkills: { core: ["beast.advanced-combo"], candidates: ["beast.agility", "beast.parry", "beast.critical"] } }, { id: "combat.wild.species.rock-horn-rhino", name: "狰", realm: "元婴", icon: "icon:beast-zheng", description: "形如健壮山豹，赤褐短毛，额生后弯黑角，五尾分展如扇；独居灵脉石岭，以垂尾感知气流与震动，转身卸力后回爪反击。", carryLevel: 65, starter: !1, aptitudes: { attack: { min: 1320, max: 1660 }, defense: { min: 1200, max: 1530 }, health: { min: 4300, max: 5700 }, mana: { min: 1100, max: 1570 }, speed: { min: 1080, max: 1440 } }, growthMilli: { min: 1125, max: 1205 }, birthSkills: { core: ["beast.advanced-counter"], candidates: ["beast.parry", "beast.strength", "beast.perception"] } }, { id: "combat.wild.species.three-legged-golden-toad", name: "三足金蟾", realm: "元婴", icon: "icon:beast-golden-toad", description: "身躯浑圆，三足粗壮，暗金背疣间透着朱红细纹；腹内火囊蓄纳地火灵息，施法时喉腹鼓起，红纹如炭，张口吐出大片烈焰。", carryLevel: 65, starter: !1, aptitudes: { attack: { min: 850, max: 1180 }, defense: { min: 1080, max: 1420 }, health: { min: 4600, max: 6100 }, mana: { min: 2500, max: 3150 }, speed: { min: 600, max: 880 } }, growthMilli: { min: 1120, max: 1205 }, birthSkills: { core: ["beast.wildfire"], candidates: ["beast.wisdom", "beast.meditation", "beast.spell-critical", "beast.sluggish"] } }, { id: "combat.wild.species.thunder-peng", name: "雷鹏", realm: "化神", icon: "icon:beast-thunder-peng", description: "苍青巨翼，颈覆银羽，翼尖深紫，常在云海雷区活动，羽翼能积蓄雷息。", carryLevel: 85, starter: !1, aptitudes: { attack: { min: 1250, max: 1600 }, defense: { min: 1080, max: 1390 }, health: { min: 3900, max: 5100 }, mana: { min: 2700, max: 3400 }, speed: { min: 1490, max: 1800 } }, growthMilli: { min: 1175, max: 1250 }, birthSkills: { core: ["beast.thunderstorm", "beast.advanced-spell-fluctuation"], candidates: ["beast.agility", "beast.meditation"] } }, { id: "combat.wild.species.six-eyed-ape", name: "六目灵猿", realm: "化神", icon: "icon:beast-six-eyed-ape", description: "灰白长毛，眉侧各生两枚小灵目，攀行古林，遇敌时灵目逐次睁开。", carryLevel: 85, starter: !1, aptitudes: { attack: { min: 1430, max: 1770 }, defense: { min: 1320, max: 1640 }, health: { min: 4500, max: 5900 }, mana: { min: 1800, max: 2500 }, speed: { min: 1120, max: 1510 } }, growthMilli: { min: 1185, max: 1260 }, birthSkills: { core: ["beast.advanced-perception"], candidates: ["beast.counter", "beast.strength", "beast.parry", "beast.agility"] } }, { id: "combat.wild.species.ghost-lantern-butterfly", name: "冥灯蝶", realm: "化神", icon: "icon:beast-lantern-butterfly", description: "墨蓝双翼的翅脉泛出幽绿微光，在古老地穴缓缓飞行，如一盏游移的幽灯；躯壳死寂后仍能保住本命灵息。", carryLevel: 85, starter: !1, aptitudes: { attack: { min: 650, max: 950 }, defense: { min: 820, max: 1120 }, health: { min: 2600, max: 3600 }, mana: { min: 2850, max: 3600 }, speed: { min: 1050, max: 1620 } }, growthMilli: { min: 1200, max: 1280 }, birthSkills: { core: ["beast.ghost"], candidates: ["beast.meditation", "beast.spell-fluctuation", "beast.perception", "beast.agility", "beast.water-attack"] } }, { id: "combat.wild.species.nether-tiger", name: "幽冥虎", realm: "化神", icon: "icon:beast-nether-tiger", description: "墨黑虎躯，肩背厚重，幽蓝虎纹隐现，背脊与尾端浮起鬼火。久居阴灵汇聚的古老地穴，常压低头颅缓步巡视，吐出的幽焰与扑击皆能震慑灵魂体。", carryLevel: 85, starter: !1, aptitudes: { attack: { min: 1500, max: 1810 }, defense: { min: 1080, max: 1400 }, health: { min: 4800, max: 6200 }, mana: { min: 2250, max: 2950 }, speed: { min: 900, max: 1250 } }, growthMilli: { min: 1165, max: 1245 }, birthSkills: { core: ["beast.advanced-exorcism", "beast.spirit-flame"], candidates: ["beast.strength", "beast.perception"] } }], generation: { starterLevel: 10, lifespan: 1000, minBirthSkills: 0, maxBirthSkills: 6 } };
const zod_1 = require("./zod.js");
var Xb = { $schema: zod_1.z.string().optional(), formatVersion: zod_1.z.literal(1), contentRevision: zod_1.z.number().int().positive() }, x0 = zod_1.z.string().trim().min(1).max(40), P0 = zod_1.z.string().regex(/^beast\.[a-z][a-z0-9-]*$/), R = zod_1.z.number().int().min(0).max(1e5), H = zod_1.z.number().min(0).max(1e5).multipleOf(0.000001), D = H.max(1), I0 = zod_1.z.strictObject({ min: R, max: R }), Q2 = zod_1.z.strictObject({ ...Xb, formatVersion: zod_1.z.literal(2), species: zod_1.z.array(zod_1.z.strictObject({ id: zod_1.z.string().regex(/^combat\.wild\.species\.[a-z][a-z0-9-]*$/), name: x0, carryLevel: zod_1.z.number().int().min(0).max(180), realm: zod_1.z.enum(X0), icon: zod_1.z.string().min(1).max(32), description: zod_1.z.string().min(1).max(300), starter: zod_1.z.boolean(), birthSkills: zod_1.z.strictObject({ core: zod_1.z.array(P0).max(2), candidates: zod_1.z.array(P0).max(6) }), aptitudes: zod_1.z.strictObject({ attack: I0, defense: I0, health: I0, mana: I0, speed: I0 }), growthMilli: zod_1.z.strictObject({ min: R.min(100).max(3000), max: R.min(100).max(3000) }) })).min(1), generation: zod_1.z.strictObject({ starterLevel: zod_1.z.number().int().min(0).max(180), lifespan: R, minBirthSkills: zod_1.z.number().int().min(0).max(6), maxBirthSkills: zod_1.z.number().int().min(0).max(6) }) }), Y2 = zod_1.z.strictObject({ ...Xb, skills: zod_1.z.array(zod_1.z.strictObject({ id: P0, name: x0, book: zod_1.z.boolean(), advanced: zod_1.z.boolean(), flavorText: zod_1.z.string().trim().min(1).max(200), icon: zod_1.z.string().trim().min(1).max(32), effect: zod_1.z.discriminatedUnion("type", [zod_1.z.strictObject({ type: zod_1.z.literal("groupSpell"), costMp: R, coefficient: H.positive(), powerBase: R, powerPerLevel: H, levelsPerTarget: R.min(1), maxTargets: R.min(1).max(10) }), zod_1.z.strictObject({ type: zod_1.z.literal("spellHit"), costMp: R, coefficient: H.positive(), powerBase: R, powerPerLevel: H }), zod_1.z.strictObject({ type: zod_1.z.literal("barrier"), costMp: R, barrierId: P0, kind: x0, name: x0, powerBase: R, powerPerLevel: H, duration: R.min(1).max(99) }), zod_1.z.strictObject({ type: zod_1.z.literal("physicalHit"), costMp: R, coefficient: H.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("combo"), chance: D, coefficient: H.positive(), physicalFactor: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("counter"), chance: D, coefficient: H.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("regeneration"), resource: zod_1.z.enum(["hp", "mp"]), levelDivisor: R.min(1) }), zod_1.z.strictObject({ type: zod_1.z.literal("critical"), kind: zod_1.z.enum(["physical", "spell"]), chance: D }), zod_1.z.strictObject({ type: zod_1.z.literal("spellBoost"), factor: H.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("speed"), factor: H.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("ghost"), delay: R.min(1).max(99) }), zod_1.z.strictObject({ type: zod_1.z.literal("exorcism"), factor: H.min(1) }), zod_1.z.strictObject({ type: zod_1.z.literal("denial"), ghostDamageFactor: H.min(1), spellFactor: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("poison"), chance: D, duration: R.min(1).max(99), hpRatio: D, mpRatio: D, immune: zod_1.z.boolean() }), zod_1.z.strictObject({ type: zod_1.z.literal("miracle"), immune: zod_1.z.boolean() }), zod_1.z.strictObject({ type: zod_1.z.literal("concentration"), physicalFactor: D.positive(), dodgeBonus: R }), zod_1.z.strictObject({ type: zod_1.z.literal("eternity"), factor: H.min(1), maxExtra: R.max(99) }), zod_1.z.strictObject({ type: zod_1.z.literal("stealth"), minDuration: R.min(1).max(99), maxDuration: R.min(1).max(99), physicalFactor: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("perception"), dodgeBonus: R }), zod_1.z.strictObject({ type: zod_1.z.literal("spellRepeat"), chance: D, factor: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("spellFluctuation"), min: H.positive(), max: H.positive(), suppressReflection: zod_1.z.boolean() }), zod_1.z.strictObject({ type: zod_1.z.literal("parry"), factor: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("defenseTraining"), perLevel: H, spellFactor: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("strengthTraining"), perLevel: H, versusDefenseFactor: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("wisdom"), factor: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("sneakAttack"), factor: H.min(1) }), zod_1.z.strictObject({ type: zod_1.z.literal("spellResistance"), takenFactor: D.positive(), physicalFactor: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("lifesteal"), ratio: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("reflection"), kind: zod_1.z.enum(["physical", "spell"]), chance: D, ratio: D.positive() }), zod_1.z.strictObject({ type: zod_1.z.literal("divineRevival"), chance: D, hpRatio: D.positive() })]) })).min(1), families: zod_1.z.array(zod_1.z.strictObject({ normal: P0, advanced: P0 })) }), _0 = zod_1.z.strictObject({ aptitudeCoefficient: H, attributeCoefficient: H }), V2 = zod_1.z.strictObject({ ...Xb, pointsPerLevel: R.min(1).max(100), experience: zod_1.z.strictObject({ base: R.min(1), perLevel: R, perLevelSquared: H, victoryPerEnemyLevel: R }), lifespan: zod_1.z.strictObject({ deathLoss: R, deployMinimum: R, restRecoveryPerStone: R.min(1) }), capture: zod_1.z.strictObject({ mpBase: R, mpPerCarryLevel: H, minChance: D, maxChance: D, baseChance: D, missingHpFactor: D, levelDifferenceFactor: D }), panel: zod_1.z.strictObject({ naturalBase: H, naturalPerLevel: H, health: _0, mana: _0, physicalAtk: _0, physicalDef: _0, magicAtk: _0, magicDef: zod_1.z.strictObject({ aptitudeCoefficient: H, attributeCoefficients: zod_1.z.strictObject({ constitution: H, magic: H, strength: H, endurance: H }) }), speed: _0 }) });
function Vb(b, v, L) {
    let W = b.safeParse(v);
    if (W.success)
        return W.data;
    throw Error(W.error.issues.map((j) => { let B = v; for (let Z of j.path.slice(0, 2))
        B = B && typeof B === "object" ? Reflect.get(B, Z) : void 0; let $ = B && typeof B === "object" && "id" in B ? ` [${String(B.id)}]` : ""; return `${L}${$} ${j.path.join(".")}: ${j.message}`; }).join(`
`));
}
function v1(b, v, L) {
    let W = Vb(Q2, b, "species.json"), j = Vb(Y2, v, "skills.json"), B = Vb(V2, L, "progression.json"), $ = [], Z = (M, V, q) => $.push(`${M} ${V}: ${q}`);
    for (let [M, V] of [["species.json", W.species], ["skills.json", j.skills]]) {
        let q = new Set;
        V.forEach((U, _) => { if (q.has(U.id))
            Z(M, `[${U.id}].${_}.id`, "ID 重复"); q.add(U.id); });
    }
    for (let M of j.skills) {
        if (M.effect.type === "stealth" && M.effect.minDuration > M.effect.maxDuration)
            Z("skills.json", `[${M.id}].effect`, "持续时间下界不得超过上界");
        if (M.effect.type === "spellFluctuation" && M.effect.min > M.effect.max)
            Z("skills.json", `[${M.id}].effect`, "波动下界不得超过上界");
    }
    let J = new Set(j.skills.map((M) => M.id));
    if (W.generation.minBirthSkills > W.generation.maxBirthSkills)
        Z("species.json", "generation", "技能格下界不得超过上界");
    W.species.forEach((M) => { if (M.carryLevel !== Nb(M.realm, "初期"))
        Z("species.json", `[${M.id}].carryLevel`, "携带等级须对应开放境界初期"); let { core: V, candidates: q } = M.birthSkills, U = [...V, ...q]; if (U.length < 3 || U.length > 6)
        Z("species.json", `[${M.id}].birthSkills`, "天生技能全集须为3至6项"); if (V.length < W.generation.minBirthSkills || U.length > W.generation.maxBirthSkills)
        Z("species.json", `[${M.id}].birthSkills`, "技能数量超出出生格数范围"); if (new Set(U).size !== U.length)
        Z("species.json", `[${M.id}].birthSkills`, "技能池重复"); for (let _ of U)
        if (!J.has(_))
            Z("species.json", `[${M.id}].birthSkills`, `初始技能不存在：${_}`); for (let _ of j.families)
        if (U.includes(_.normal) && U.includes(_.advanced))
            Z("species.json", `[${M.id}].birthSkills`, "技能池不得同时包含同族普通与高级技能"); if (M.starter && M.carryLevel > W.generation.starterLevel)
        Z("species.json", `[${M.id}].starter`, "初始伙伴携带等级高于出生等级"); }), W.species.forEach((M) => { for (let [V, q] of Object.entries(M.aptitudes))
        if (q.min > q.max)
            Z("species.json", `[${M.id}].aptitudes.${V}`, "下界不得超过上界"); if (M.growthMilli.min > M.growthMilli.max)
        Z("species.json", `[${M.id}].growthMilli`, "下界不得超过上界"); });
    let Q = new Set;
    if (j.families.forEach((M, V) => { for (let q of ["normal", "advanced"]) {
        if (!J.has(M[q]))
            Z("skills.json", `families.${V}.${q}`, `技能不存在：${M[q]}`);
        let U = j.skills.find((_) => _.id === M[q]);
        if (U && U.advanced !== (q === "advanced"))
            Z("skills.json", `families.${V}.${q}`, `技能品级与配对不符：${M[q]}`);
        if (Q.has(M[q]))
            Z("skills.json", `families.${V}.${q}`, `同系技能不得重复或交叉：${M[q]}`);
        Q.add(M[q]);
    } }), B.capture.minChance > B.capture.maxChance)
        Z("progression.json", "capture.minChance", "捕捉下限不得超过上限");
    if (B.experience.base + 179 * B.experience.perLevel + Math.floor(32041 * B.experience.perLevelSquared) > 1e5)
        Z("progression.json", "experience", "升级所需修为超出个体修为存储上限");
    let G = B.panel.naturalBase + 180 * (B.panel.naturalPerLevel + B.pointsPerLevel);
    if (Math.floor(B.panel.naturalBase * 0.1 * B.panel.health.attributeCoefficient) < 1)
        Z("progression.json", "panel.health", "零级最低成长个体的气血必须至少为 1");
    for (let M of ["health", "mana", "physicalAtk", "physicalDef", "magicAtk", "magicDef", "speed"]) {
        let V = B.panel[M], q = M === "magicDef" ? Object.values(B.panel.magicDef.attributeCoefficients).reduce((U, _) => U + _, 0) : B.panel[M].attributeCoefficient;
        if (!Number.isSafeInteger(Math.floor(18000000 * V.aptitudeCoefficient + G * 3 * q)))
            Z("progression.json", `panel.${M}`, "合法个体的投影可能超出安全整数范围");
    }
    if ($.length)
        throw Error($.join(`
`));
    return { species: W, skills: j, progression: B };
}
function W1(b) { let { effect: v } = b, L = { id: b.id, name: b.name }, W = { ...L, ...["ghost", "divineRevival", "miracle", "concentration"].includes(v.type) ? { conflicts: ["beast.denial", "beast.advanced-denial", ...v.type === "divineRevival" ? ["beast.ghost", "beast.advanced-ghost"] : []] } : {}, tags: [W0.Passive], targeting: { side: d.Self }, effects: [] }; switch (v.type) {
    case "ghost": return { ...W, innate: { delayedRevivalRounds: v.delay, rejectHpRecovery: !0, immuneStatusCategories: [A.Control, A.Debuff, A.Dot] } };
    case "exorcism": return { ...W, innate: { preventDelayedRevival: !0, damageToDelayedRevival: v.factor } };
    case "denial": return { ...W, innate: { rejectBuffs: !0, damageFromDelayedRevival: v.ghostDamageFactor, immuneStatusCategories: [A.Control, A.Debuff, A.Dot] }, hooks: [{ on: C.OnHitCalc, targetIsSelf: !0, requireKind: O.Spell, effects: [{ type: X.ModifyStrike, factor: v.spellFactor }] }] };
    case "poison": return { ...W, innate: v.immune ? { immuneStatusKinds: ["beast.poison", "youdu.poison"] } : void 0, hooks: [{ on: C.AfterHit, sourceIsSelf: !0, requireKind: O.Physical, when: { skillIds: [N0.Attack], targetHpRatioAbove: 0 }, chance: v.chance, aim: g.HookTarget, effects: [{ type: X.ApplyStatus, statusId: `${b.id}.status`, duration: v.duration }] }] };
    case "miracle": return v.immune ? { ...W, innate: { immuneStatusCategories: [A.Control, A.Debuff, A.Dot] } } : { ...W, hooks: [{ on: C.OnRoundEnd, aim: g.Self, effects: [{ type: X.Dispel, categories: [A.Control, A.Debuff, A.Dot], excludeStatusFlags: [C0.BlocksRevive] }] }] };
    case "concentration": return { ...W, innate: { immuneStatusCategories: [A.Control] }, hooks: [{ on: C.OnHitCalc, sourceIsSelf: !0, requireKind: O.Physical, effects: [{ type: X.ModifyStrike, factor: v.physicalFactor }] }] };
    case "eternity": return { ...W, innate: { buffDuration: { factor: v.factor, maxExtra: v.maxExtra } } };
    case "stealth": return { ...W, innate: { entryStatus: { statusId: `${b.id}.status`, minDuration: v.minDuration, maxDuration: v.maxDuration } }, hooks: [{ on: C.OnHitCalc, sourceIsSelf: !0, requireKind: O.Physical, when: { requireStatusIds: [`${b.id}.status`] }, effects: [{ type: X.ModifyStrike, factor: v.physicalFactor }] }] };
    case "perception": return { ...W, innate: { revealStealth: !0 } };
    case "spellRepeat": return { ...W, innate: { spellRepeat: { chance: v.chance, factor: v.factor } } };
    case "spellFluctuation": return { ...W, innate: { spellFluctuation: { min: v.min, max: v.max }, suppressSpellRetaliation: v.suppressReflection } };
    case "parry": return { ...W, hooks: [{ on: C.OnHitCalc, targetIsSelf: !0, requireKind: O.Physical, parry: !0, when: { oncePerRound: !0 }, effects: [{ type: X.ModifyStrike, factor: v.factor }] }] };
    case "defenseTraining": return { ...W, hooks: [{ on: C.OnHitCalc, sourceIsSelf: !0, requireKind: O.Spell, effects: [{ type: X.ModifyStrike, factor: v.spellFactor }] }] };
    case "strengthTraining": return { ...W, innate: { ignoreParry: !0 }, hooks: [{ on: C.OnHitCalc, sourceIsSelf: !0, requireKind: O.Physical, when: { targetSkillIds: ["beast.defense", "beast.advanced-defense"] }, effects: [{ type: X.ModifyStrike, factor: v.versusDefenseFactor }] }] };
    case "wisdom": return { ...W, innate: { spellMpCostFactor: v.factor } };
    case "sneakAttack": return { ...W, innate: { suppressPhysicalRetaliation: !0 }, hooks: [{ on: C.OnHitCalc, sourceIsSelf: !0, requireKind: O.Physical, effects: [{ type: X.ModifyStrike, factor: v.factor }] }] };
    case "spellResistance": return { ...W, hooks: [{ on: C.OnHitCalc, targetIsSelf: !0, requireKind: O.Spell, effects: [{ type: X.ModifyStrike, factor: v.takenFactor }] }, { on: C.OnHitCalc, sourceIsSelf: !0, requireKind: O.Physical, effects: [{ type: X.ModifyStrike, factor: v.physicalFactor }] }] };
    case "lifesteal": return { ...W, hooks: [{ on: C.AfterHit, sourceIsSelf: !0, requireKind: O.Physical, when: { targetWithoutDelayedRevival: !0 }, aim: g.Self, effects: [{ type: X.RestoreHp, power: `floor(hpDamage * ${v.ratio})` }] }] };
    case "reflection": return { ...W, hooks: [{ on: C.OnBeHit, retaliation: !0, targetIsSelf: !0, requireKind: v.kind, chance: v.chance, aim: g.HookSource, effects: [{ type: X.FixedHit, power: `floor(hpDamage * ${v.ratio})` }] }] };
    case "divineRevival": return { ...W, hooks: [{ on: C.OnFatal, targetIsSelf: !0, chance: v.chance, aim: g.Self, effects: [{ type: X.Revive, hpRatio: v.hpRatio }] }] };
    case "speed": return W;
    case "critical": return { ...W, hooks: [{ on: C.OnCritRoll, sourceIsSelf: !0, requireKind: v.kind, aim: g.Self, effects: [{ type: X.ModifyChance, add: v.chance }] }] };
    case "spellBoost": return { ...W, hooks: [{ on: C.OnHitCalc, sourceIsSelf: !0, requireKind: O.Spell, aim: g.Self, effects: [{ type: X.ModifyStrike, factor: v.factor }] }] };
    case "regeneration": return { ...W, hooks: [{ on: C.OnRoundEnd, aim: g.Self, effects: [{ type: v.resource === "hp" ? X.RestoreHp : X.RestoreMp, power: `floor(source.level / ${v.levelDivisor})` }] }] };
    case "counter": return { ...W, hooks: [{ on: C.OnBeHit, retaliation: !0, targetIsSelf: !0, requireKind: O.Physical, chance: v.chance, aim: g.HookSource, effects: [{ type: X.PhysicalHit, coeff: v.coefficient }] }] };
    case "groupSpell":
    case "spellHit": return { ...L, costMp: v.costMp, tags: [W0.Spell], formula: l.Spell, targeting: v.type === "groupSpell" ? { side: d.Enemy, mode: i.Fill, count: `min(${v.maxTargets}, floor(skillLevel / ${v.levelsPerTarget}) + 1)` } : { side: d.Enemy, count: 1 }, effects: [{ type: X.SpellHit, coeff: v.coefficient, power: v.powerPerLevel === 1 ? `${v.powerBase} + skillLevel` : `${v.powerBase} + skillLevel * ${v.powerPerLevel}` }] };
    case "barrier": return { ...L, costMp: v.costMp, tags: [W0.Spell], targeting: { side: d.Self, count: 1 }, effects: [{ type: X.ApplyBarrier, id: v.barrierId, kind: v.kind, name: v.name, power: `${v.powerBase} + skillLevel * ${v.powerPerLevel}`, duration: v.duration }] };
    case "physicalHit": return { ...L, costMp: v.costMp, tags: [W0.Physical], formula: l.Physical, targeting: { side: d.Enemy, count: 1 }, effects: [{ type: X.PhysicalHit, coeff: v.coefficient }] };
    case "combo": return { ...L, tags: [W0.Passive], targeting: { side: d.Enemy }, effects: [], hooks: [{ on: C.OnHitCalc, sourceIsSelf: !0, requireKind: O.Physical, effects: [{ type: X.ModifyStrike, factor: v.physicalFactor }] }, { on: C.AfterHit, sourceIsSelf: !0, when: { skillIds: [N0.Attack], targetAbsentSkillIds: ["beast.reflection", "beast.advanced-reflection"] }, requireKind: O.Physical, chance: v.chance, aim: g.HookTarget, effects: [{ type: X.PhysicalHit, coeff: v.coefficient }] }] };
} }
var b0 = v1(b1, tb, eb), z8 = b0.species.contentRevision, X2 = b0.species.species, w8 = X2.filter((b) => b.starter), U2 = b0.skills.skills, h8 = b0.species.generation, I8 = b0.skills.skills.map(W1), m8 = b0.skills.families, G2 = b0.skills.skills.filter((b) => b.book), d8 = new Set(U2.filter((b) => b.advanced).map((b) => b.id)), T8 = new Set(G2.filter((b) => b.advanced).map((b) => b.id)), E8 = b0.skills.skills.filter((b) => b.effect.type === "combo").map((b) => b.id), y8 = b0.progression, o8 = b0.skills.skills.flatMap((b) => b.effect.type === "stealth" ? [{ id: `${b.id}.status`, name: b.name, kind: "beast.stealth", category: A.Buff, untargetable: !0, blocksSpell: !0, expireSameRound: !0 }] : b.effect.type === "poison" ? [{ id: `${b.id}.status`, name: "中毒", kind: "beast.poison", category: A.Dot, ticks: E0.RoundEnd, onTick: { type: y0.Dot, ratioOfMaxHp: b.effect.hpRatio, ratioOfMaxMp: b.effect.mpRatio } }] : []);
exports.Bf = X2;
exports.Cf = w8;
exports.Df = U2;
exports.Ef = h8;
exports.Ff = I8;
exports.Gf = m8;
exports.Hf = G2;
exports.If = d8;
exports.Jf = T8;
exports.Kf = E8;
exports.Lf = y8;
function a8(b, v, L) {
    return L.map((W) => { let j = new Set, B = v; for (let J of [...W.path, void 0]) {
        if (B === null || typeof B !== "object")
            break;
        let Q = B;
        if (typeof Q.id === "string")
            j.add(Q.id);
        else if (typeof Q.rewardId === "string")
            j.add(Q.rewardId);
        else if (typeof Q.realm === "string")
            j.add(Q.realm);
        else if (typeof Q.floor === "number")
            j.add(`floor:${Q.floor}`);
        if (J === void 0)
            break;
        B = Q[J];
    } let $ = j.size ? ` [${[...j].join(" / ")}]` : "", Z = W.path.map(String).join(".") || "$"; return `${b}: ${Z}${$}: ${W.message}`; }).join(`
`);
}
