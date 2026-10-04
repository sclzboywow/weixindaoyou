"use strict";
var _a, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bd = exports.Ad = exports.zd = exports.vd = exports.ud = exports.td = exports.sd = exports.rd = exports.qd = exports.pd = exports.nd = exports.gd = exports.dd = exports.cd = exports.bd = exports.$c = exports.Xc = exports.Lc = exports.Kc = exports.Ic = exports.Hc = exports.Dc = exports.Cc = exports.Bc = exports.Ac = exports.zc = exports.yc = exports.xc = exports.sc = exports.rc = exports.qc = exports.pc = exports.oc = exports.jc = exports.ic = exports.hc = exports.gc = exports.fc = exports.ec = exports.dc = exports.cc = exports.bc = exports.ac = exports.Ub = exports.Nb = exports.Kb = exports.Jb = exports.Ib = exports.Hb = exports.Gb = void 0;
exports.ye = exports.xe = exports.we = exports.te = exports.ne = exports.me = exports.ke = exports.je = exports.ie = exports.he = exports.ge = exports.fe = exports.Zd = exports.Yd = exports.Wd = exports.Vd = exports.Ud = exports.Td = exports.Pd = exports.Od = exports.Md = exports.Ld = exports.Hd = exports.Gd = exports.Fd = exports.Ed = exports.Cd = void 0;
exports.Lb = ze;
exports.Mb = wp;
exports.Ob = W0;
exports.Pb = pe;
exports.Qb = p_;
exports.Rb = q_;
exports.Sb = P_;
exports.Tb = g_;
exports.Vb = R_;
exports.Wb = D_;
exports.Xb = $_;
exports.Yb = O_;
exports.Zb = y;
exports._b = Fe;
exports.$b = La;
exports.kc = X0;
exports.lc = Ga;
exports.mc = ld;
exports.nc = yi;
exports.tc = mn;
exports.uc = a1;
exports.vc = i1;
exports.wc = t1;
exports.Ec = N1;
exports.Fc = qn;
exports.Gc = M1;
exports.Jc = Ll;
exports.Mc = kr;
exports.Nc = n_;
exports.Oc = K0;
exports.Pc = l_;
exports.Qc = Ie;
exports.Rc = b0;
exports.Sc = Q_;
exports.Tc = Ud;
exports.Uc = Ea;
exports.Vc = y_;
exports.Wc = Y_;
exports.Yc = C0;
exports.Zc = F0;
exports._c = w_;
exports.ad = Ld;
exports.ed = Td;
exports.fd = zd;
exports.hd = S_;
exports.id = Jr;
exports.jd = _m;
exports.kd = Gm;
exports.ld = Zm;
exports.md = Qm;
exports.od = U1;
exports.wd = Ve;
exports.xd = Kt;
exports.yd = re;
exports.Dd = Et;
exports.Id = Qe;
exports.Jd = Or;
exports.Kd = g0;
exports.Nd = j0;
exports.Qd = Ir;
exports.Rd = O0;
exports.Sd = Oa;
exports.Xd = H0;
exports._d = nl;
exports.$d = _d;
exports.ae = G0;
exports.be = gl;
exports.ce = ya;
exports.de = qd;
exports.ee = Pd;
exports.le = Vu;
exports.oe = Cu;
exports.pe = Fu;
exports.qe = Iu;
exports.re = Uu;
exports.se = cu;
exports.ue = Om;
exports.ve = Lp;
const official_chunk_wje6zqc2_js_1 = require("./official-chunk-wje6zqc2.js");
const zod_1 = require("./zod.js");
var Am = { baby: "宝宝", pseudo_baby: "假宝宝", wild: "纯野生" };
function yi(r) { return r.isMutant ? "变异宝宝" : Am[r.originKind]; }
function nn(r) { return official_chunk_wje6zqc2_js_1.If.panel.naturalBase * (r.isMutant ? 2 : 1); }
function Kr(r) { return r.level * official_chunk_wje6zqc2_js_1.If.pointsPerLevel + (r.originKind === "baby" ? 50 : 0) - (r.originKind === "wild" ? 2 * Math.min(r.level, r.initialLevel) : 0); }
const zod_2 = require("./zod.js");
var r0 = "summoned_beast_v3", I = zod_2.z.number().int().min(0).max(1e5), Rr = zod_2.z.object({ id: zod_2.z.uuid(), ownerCultivatorId: zod_2.z.uuid(), speciesId: zod_2.z.string(), isMutant: zod_2.z.boolean().optional(), originKind: zod_2.z.enum(["baby", "pseudo_baby", "wild"]), initialLevel: zod_2.z.number().int().min(0).max(180), name: zod_2.z.string().min(1).max(40), level: zod_2.z.number().int().min(0).max(180), exp: I, growth: zod_2.z.number().min(0.1).max(3), aptitudes: zod_2.z.object({ attack: I, defense: I, health: I, mana: I, speed: I }).strict(), allocatedAttributes: zod_2.z.object({ constitution: I, strength: I, magic: I, endurance: I, agility: I }).strict(), unallocatedPoints: I, skillSlotCapacity: zod_2.z.number().int().min(0).max(official_chunk_wje6zqc2_js_1.Cf.length), skills: zod_2.z.array(zod_2.z.string()).max(official_chunk_wje6zqc2_js_1.Cf.length), currentLifespan: I, maxLifespan: I, generationVersion: zod_2.z.enum([r0, "summoned_beast_fusion_v1"]), generationContentRevision: zod_2.z.number().int().positive().optional(), generationSeed: zod_2.z.number().int(), revision: I }).strict().superRefine((r, e) => {
    if (!official_chunk_wje6zqc2_js_1.yf.some((n) => n.id === r.speciesId) || r.skills.length !== r.skillSlotCapacity || new Set(r.skills).size !== r.skills.length || r.skills.some((n) => !official_chunk_wje6zqc2_js_1.Cf.some((d) => d.id === n)) || r.currentLifespan > r.maxLifespan || r.originKind === "wild" && r.initialLevel < 1 || !!r.isMutant && r.originKind !== "baby")
        e.addIssue({ code: "custom", message: "召唤兽个体事实不完整" });
}), Vm = Rr.refine((r) => Object.values(r.allocatedAttributes).reduce((e, n) => e + n, 0) + r.unallocatedPoints === Kr(r), { path: ["unallocatedPoints"], message: "灵兽属性点总额不符合生成规则" }), dn = zod_2.z.object({ carriedBeastIds: zod_2.z.array(zod_2.z.uuid()).max(6), leadBeastId: zod_2.z.uuid().optional(), revision: I }).strict().superRefine((r, e) => {
    if (new Set(r.carriedBeastIds).size !== r.carriedBeastIds.length || r.leadBeastId && !r.carriedBeastIds.includes(r.leadBeastId))
        e.addIssue({ code: "custom", message: "携带编组或首发无效" });
});
exports.oc = Rr;
const zod_3 = require("./zod.js");
var n1 = 24, d1 = "beast.capture", m1 = { constitution: "体质", strength: "力量", magic: "魔力", endurance: "耐力", agility: "敏捷" }, Xm = zod_3.z.object({ constitution: zod_3.z.number().int().min(0).max(50 + 180 * official_chunk_wje6zqc2_js_1.If.pointsPerLevel), strength: zod_3.z.number().int().min(0).max(50 + 180 * official_chunk_wje6zqc2_js_1.If.pointsPerLevel), magic: zod_3.z.number().int().min(0).max(50 + 180 * official_chunk_wje6zqc2_js_1.If.pointsPerLevel), endurance: zod_3.z.number().int().min(0).max(50 + 180 * official_chunk_wje6zqc2_js_1.If.pointsPerLevel), agility: zod_3.z.number().int().min(0).max(50 + 180 * official_chunk_wje6zqc2_js_1.If.pointsPerLevel) }).strict();
exports.pc = n1;
exports.qc = d1;
exports.rc = m1;
exports.sc = Xm;
function mn(r) { return official_chunk_wje6zqc2_js_1.If.experience.base + official_chunk_wje6zqc2_js_1.If.experience.perLevel * r + Math.floor(official_chunk_wje6zqc2_js_1.If.experience.perLevelSquared * r ** 2); }
function a1(r) { return Math.ceil((r.maxLifespan - r.currentLifespan) / official_chunk_wje6zqc2_js_1.If.lifespan.restRecoveryPerStone); }
function i1(r, e, n) {
    if (!Number.isSafeInteger(e) || e < 0 || !Number.isInteger(n) || n < 0)
        throw Error("灵兽修为输入无效");
    let d = Math.min(180, n);
    if (!e || r.level >= d)
        return r;
    let m = r.level, a = r.exp + e;
    while (m < d && a >= mn(m))
        a -= mn(m), m++;
    return Rr.parse({ ...r, level: m, exp: m === d ? 0 : a, unallocatedPoints: r.unallocatedPoints + Kr({ ...r, level: m }) - Kr(r), revision: r.revision + 1 });
}
function t1(r, e, n) {
    let d = Xm.parse(e), m = Object.values(d).reduce((a, i) => a + i, 0);
    if (r.level > n || m <= 0 || m > r.unallocatedPoints)
        throw Error("等级或可分配点数不足");
    return Rr.parse({ ...r, allocatedAttributes: Object.fromEntries(Object.entries(d).map(([a, i]) => [a, r.allocatedAttributes[a] + i])), unallocatedPoints: r.unallocatedPoints - m, revision: r.revision + 1 });
}
function n0(r) { return r.skills.filter((e) => { var _a, _f; return !((_f = (_a = official_chunk_wje6zqc2_js_1.Cf.find((n) => n.id === e)) === null || _a === void 0 ? void 0 : _a.conflicts) === null || _f === void 0 ? void 0 : _f.some((n) => r.skills.includes(n))) && !official_chunk_wje6zqc2_js_1.Df.some((n) => e === n.normal && r.skills.includes(n.advanced)); }); }
function Gm(r) { let e = official_chunk_wje6zqc2_js_1.If.panel, n = nn(r) + r.level * e.naturalPerLevel; return Object.fromEntries(Object.entries(r.allocatedAttributes).map(([d, m]) => [d, n + m])); }
function Zm(r) {
    let e = Rr.parse(r), n = official_chunk_wje6zqc2_js_1.If.panel, d = Gm(e), m = (P, j, g) => Math.floor(e.level * e.aptitudes[j] * g.aptitudeCoefficient + P * e.growth * g.attributeCoefficient), a = m(d.constitution, "health", n.health), i = m(d.magic, "mana", n.mana), t = Object.entries(n.magicDef.attributeCoefficients).reduce((P, [j, g]) => P + d[j] * g, 0), o = n0(e).reduce((P, j) => { let g = official_chunk_wje6zqc2_js_1.Af.find((s) => s.id === j).effect; return g.type === "speed" ? P * g.factor : P; }, 1), h = { physicalAtk: 0, physicalDef: 0, dodge: 0 };
    for (let P of n0(e)) {
        let j = official_chunk_wje6zqc2_js_1.Af.find((g) => g.id === P).effect;
        if (j.type === "perception" || j.type === "concentration")
            h.dodge += j.dodgeBonus;
        if (j.type === "strengthTraining")
            h.physicalAtk += Math.floor(e.level * j.perLevel);
        if (j.type === "defenseTraining")
            h.physicalDef += Math.floor(e.level * j.perLevel);
    }
    return { ...official_chunk_wje6zqc2_js_1.ef, hit: 80 + d.agility, dodge: h.dodge, hp: a, maxHp: a, mp: i, maxMp: i, physicalAtk: m(d.strength, "attack", n.physicalAtk) + h.physicalAtk, physicalDef: m(d.endurance, "defense", n.physicalDef) + h.physicalDef, magicAtk: m(d.magic, "mana", n.magicAtk), magicDef: Math.floor(e.level * e.aptitudes.mana * n.magicDef.aptitudeCoefficient + t * e.growth), speed: Math.floor(m(d.agility, "speed", n.speed) * o) };
}
function Qm(r, e) { return r.currentLifespan >= official_chunk_wje6zqc2_js_1.If.lifespan.deployMinimum && r.level <= e && official_chunk_wje6zqc2_js_1.yf.some((n) => n.id === r.speciesId && n.carryLevel <= e); }
const zod_4 = require("./zod.js");
const zod_5 = require("./zod.js");
var hn = ["healing", "mana", "detox", "cultivation", "beast_cultivation", "insight", "breakthrough", "tempering", "marrow_wash", "longevity", "hybrid"], on = ["none", "long_term", "cultivation", "longevity"];
exports.xc = hn;
exports.yc = on;
var G1 = ["low", "middle", "high", "perfect"], Z1 = ["restore_hp", "heal_wounds", "restore_mp", "detox", "cultivation", "beast_cultivation", "insight", "clear_mind_support", "protect_meridians_support", "breakthrough_support", "extend_lifespan", "body_skin", "body_sinew_bone", "body_organs", "body_qi_blood", "body_primordial_spirit", "marrow_wash"];
exports.zc = G1;
exports.Ac = Z1;
var Q1 = ["single", "balanced", "synergy", "conflict"];
exports.Bc = Q1;
var y1 = ["aligned", "degraded", "poor"];
exports.Cc = y1;
var ln = ["lock_on_enter_settle_on_exit", "consume_on_action"];
exports.Dc = ln;
var fr = zod_5.z.number().finite().nonnegative().max(2147483647), _n = zod_5.z.enum(["weakness", "minor_wound", "major_wound", "near_death", "breakthrough_focus", "protect_meridians", "clear_mind", "cultivation_boost"]), ym = zod_5.z.discriminatedUnion("type", [zod_5.z.object({ type: zod_5.z.literal("restore_resource"), resource: zod_5.z.enum(["hp", "mp"]), mode: zod_5.z.enum(["flat", "percent"]), value: fr }).refine((r) => r.mode !== "percent" || r.value <= 1), zod_5.z.object({ type: zod_5.z.literal("change_gauge"), gauge: zod_5.z.literal("pillToxicity"), delta: zod_5.z.number().finite().min(-2147483647).max(2147483647) }), zod_5.z.object({ type: zod_5.z.literal("remove_status"), status: _n, removeAll: zod_5.z.boolean().optional() }), zod_5.z.object({ type: zod_5.z.literal("add_status"), status: _n, stacks: zod_5.z.number().int().positive().optional(), duration: zod_5.z.union([zod_5.z.object({ kind: zod_5.z.literal("until_removed") }), zod_5.z.object({ kind: zod_5.z.literal("time"), expiresAt: zod_5.z.iso.datetime({ offset: !0 }) })]).optional(), usesRemaining: zod_5.z.number().int().nonnegative().optional(), payload: zod_5.z.record(zod_5.z.string(), zod_5.z.union([zod_5.z.string(), zod_5.z.number().finite(), zod_5.z.boolean()])).optional() }), zod_5.z.object({ type: zod_5.z.literal("advance_track"), track: zod_5.z.enum(["body.skin", "body.sinew_bone", "body.organs", "body.qi_blood", "body.primordial_spirit", "tempering.vitality", "tempering.spirit", "tempering.wisdom", "tempering.speed", "tempering.willpower", "marrow_wash"]), value: fr }), zod_5.z.object({ type: zod_5.z.literal("gain_progress"), target: zod_5.z.enum(["cultivation_exp", "comprehension_insight"]), value: fr }), zod_5.z.object({ type: zod_5.z.literal("increase_lifespan"), value: fr }), zod_5.z.object({ type: zod_5.z.literal("gain_beast_cultivation"), value: fr })]), un = { family: zod_5.z.enum(hn), operations: zod_5.z.array(ym).min(1).max(30), consumeRules: zod_5.z.object({ scene: zod_5.z.literal("out_of_battle_only"), quotaCategory: zod_5.z.enum(on) }) }, Ym = zod_5.z.discriminatedUnion("kind", [zod_5.z.object({ kind: zod_5.z.literal("pill"), ...un, alchemyMeta: zod_5.z.object({ source: zod_5.z.enum(["improvised", "formula"]), sourceMaterials: zod_5.z.array(zod_5.z.string()), stability: zod_5.z.number().finite(), toxicityRating: zod_5.z.number().finite(), tags: zod_5.z.array(zod_5.z.string()) }).passthrough() }), zod_5.z.object({ kind: zod_5.z.literal("spirit_fruit"), ...un, source: zod_5.z.object({ kind: zod_5.z.literal("spirit_field"), version: zod_5.z.literal(1) }) }), zod_5.z.object({ kind: zod_5.z.literal("talisman"), scenario: zod_5.z.string().min(1), sessionMode: zod_5.z.enum(ln), notes: zod_5.z.string().optional() })]);
function pn(r) { return Ym.parse(r); }
function Jm(r) { return !!r && typeof r === "object" && !Array.isArray(r); }
function N1(r) { return !!r && r.kind === "pill"; }
function Km(r) { return !!r && r.kind === "talisman"; }
function Zr(r) { return !!r && Km(r.spec); }
function qn(r) { return pn(r); }
function d0(r) {
    if (Array.isArray(r))
        return r.map(d0);
    if (Jm(r))
        return Object.keys(r).sort().reduce((e, n) => { return e[n] = d0(r[n]), e; }, {});
    return r;
}
function M1(r) { return JSON.stringify(d0(r)); }
var gn = { id: "consumable.v1", name: "消耗品", kind: "consumable", stackLimit: 999 }, wr = zod_4.z.object({ name: zod_4.z.string().min(1), type: zod_4.z.enum(official_chunk_wje6zqc2_js_1.jf), quality: zod_4.z.enum(official_chunk_wje6zqc2_js_1.pf), description: zod_4.z.string().default(""), prompt: zod_4.z.string().default(""), score: zod_4.z.number().finite().default(0), spec: zod_4.z.unknown().transform((r, e) => {
        try {
            return qn(r);
        }
        catch (_a) {
            return e.addIssue({ code: "custom", message: "消耗品药效协议无效" }), zod_4.z.NEVER;
        }
    }) }).strict();
exports.nd = wr;
function U1(r) { var _a, _f, _g, _h; return wr.parse({ name: r.name, type: r.type, quality: (_a = r.quality) !== null && _a !== void 0 ? _a : "凡品", description: (_f = r.description) !== null && _f !== void 0 ? _f : "", prompt: (_g = r.prompt) !== null && _g !== void 0 ? _g : "", score: (_h = r.score) !== null && _h !== void 0 ? _h : 0, spec: r.spec }); }
const zod_6 = require("./zod.js");
var Wm = ["ore", "tcdb", "aux", "monster"], jn = { herb: "草药", ore: "矿石", tcdb: "天材地宝", aux: "辅助材料", monster: "妖兽材料", gongfa_manual: "功法典籍", skill_manual: "神通秘术" }, wm = ["herb", ...Wm, "gongfa_manual", "skill_manual"], vn = { id: "material.v1", name: "材料", kind: "material", stackLimit: 999 }, Sr = zod_6.z.object({ name: zod_6.z.string().trim().min(1).max(100), type: zod_6.z.enum(wm), rank: zod_6.z.enum(official_chunk_wje6zqc2_js_1.pf), element: zod_6.z.enum(official_chunk_wje6zqc2_js_1.hf).nullable().default(null), description: zod_6.z.string().max(4000).default("") }).strict();
exports.pd = Wm;
exports.qd = jn;
exports.rd = wm;
exports.sd = vn;
exports.td = Sr;
const zod_7 = require("./zod.js");
var q = { MATERIAL: { ROOT: "Material", TYPE: "Material.Type", TYPE_SEED: "Material.Type.Seed", TYPE_HERB: "Material.Type.Herb", TYPE_ORE: "Material.Type.Ore", TYPE_MONSTER: "Material.Type.Monster", TYPE_MANUAL: "Material.Type.Manual", TYPE_GONGFA_MANUAL: "Material.Type.Manual.GongFa", TYPE_SKILL_MANUAL: "Material.Type.Manual.Skill", TYPE_SPECIAL: "Material.Type.Special", TYPE_AUXILIARY: "Material.Type.Auxiliary", QUALITY: "Material.Quality", ELEMENT: "Material.Element", SEMANTIC: "Material.Semantic", SEMANTIC_FLAME: "Material.Semantic.Flame", SEMANTIC_FREEZE: "Material.Semantic.Freeze", SEMANTIC_THUNDER: "Material.Semantic.Thunder", SEMANTIC_WIND: "Material.Semantic.Wind", SEMANTIC_BLADE: "Material.Semantic.Blade", SEMANTIC_GUARD: "Material.Semantic.Guard", SEMANTIC_BURST: "Material.Semantic.Burst", SEMANTIC_SUSTAIN: "Material.Semantic.Sustain", SEMANTIC_MANUAL: "Material.Semantic.Manual", SEMANTIC_SPIRIT: "Material.Semantic.Spirit", SEMANTIC_EARTH: "Material.Semantic.Earth", SEMANTIC_METAL: "Material.Semantic.Metal", SEMANTIC_WATER: "Material.Semantic.Water", SEMANTIC_WOOD: "Material.Semantic.Wood", SEMANTIC_POISON: "Material.Semantic.Poison", SEMANTIC_DIVINE: "Material.Semantic.Divine", SEMANTIC_SPACE: "Material.Semantic.Space", SEMANTIC_TIME: "Material.Semantic.Time", SEMANTIC_LIFE: "Material.Semantic.Life", SEMANTIC_ALCHEMY: "Material.Semantic.Alchemy", SEMANTIC_REFINING: "Material.Semantic.Refining", SEMANTIC_BEAST: "Material.Semantic.Beast", SEMANTIC_BLOOD: "Material.Semantic.Blood", SEMANTIC_BONE: "Material.Semantic.Bone", SEMANTIC_FORMATION: "Material.Semantic.Formation", SEMANTIC_ILLUSION: "Material.Semantic.Illusion", SEMANTIC_QI: "Material.Semantic.Qi", RECIPE: "Material.Recipe" }, INTENT: { ROOT: "Intent", PRODUCT: "Intent.Product", PRODUCT_SKILL: "Intent.Product.Skill", PRODUCT_ARTIFACT: "Intent.Product.Artifact", PRODUCT_GONGFA: "Intent.Product.GongFa", OUTCOME: "Intent.Outcome", OUTCOME_ACTIVE: "Intent.Outcome.ActiveSkill", OUTCOME_PASSIVE: "Intent.Outcome.PassiveAbility" }, RECIPE: { ROOT: "Recipe", PRODUCT_BIAS: "Recipe.ProductBias", PRODUCT_BIAS_SKILL: "Recipe.ProductBias.Skill", PRODUCT_BIAS_ARTIFACT: "Recipe.ProductBias.Artifact", PRODUCT_BIAS_GONGFA: "Recipe.ProductBias.GongFa", PRODUCT_BIAS_UTILITY: "Recipe.ProductBias.Utility", INTENT: "Recipe.Intent", MATCHED: "Recipe.Matched", GATED: "Recipe.Gated", UNLOCKED: "Recipe.Unlocked" }, ENERGY: { ROOT: "Energy", BASE: "Energy.Base", BONUS: "Energy.Bonus", RESERVED: "Energy.Reserved" }, AFFIX: { ROOT: "Affix", PREFIX: "Affix.Prefix", SUFFIX: "Affix.Suffix", CORE: "Affix.Core", SIGNATURE: "Affix.Signature", RESONANCE: "Affix.Resonance", SYNERGY: "Affix.Synergy", MYTHIC: "Affix.Mythic" }, OUTCOME: { ROOT: "Outcome", ACTIVE_SKILL: "Outcome.ActiveSkill", PASSIVE_ABILITY: "Outcome.PassiveAbility", ARTIFACT: "Outcome.Artifact", GONGFA: "Outcome.GongFa" } }, m0 = [q.MATERIAL.SEMANTIC_FLAME, q.MATERIAL.SEMANTIC_FREEZE, q.MATERIAL.SEMANTIC_THUNDER, q.MATERIAL.SEMANTIC_WIND, q.MATERIAL.SEMANTIC_BLADE, q.MATERIAL.SEMANTIC_GUARD, q.MATERIAL.SEMANTIC_BURST, q.MATERIAL.SEMANTIC_SUSTAIN, q.MATERIAL.SEMANTIC_MANUAL, q.MATERIAL.SEMANTIC_SPIRIT, q.MATERIAL.SEMANTIC_EARTH, q.MATERIAL.SEMANTIC_METAL, q.MATERIAL.SEMANTIC_WATER, q.MATERIAL.SEMANTIC_WOOD, q.MATERIAL.SEMANTIC_POISON, q.MATERIAL.SEMANTIC_DIVINE, q.MATERIAL.SEMANTIC_SPACE, q.MATERIAL.SEMANTIC_TIME, q.MATERIAL.SEMANTIC_LIFE, q.MATERIAL.SEMANTIC_ALCHEMY, q.MATERIAL.SEMANTIC_REFINING, q.MATERIAL.SEMANTIC_BEAST, q.MATERIAL.SEMANTIC_BLOOD, q.MATERIAL.SEMANTIC_BONE, q.MATERIAL.SEMANTIC_FORMATION, q.MATERIAL.SEMANTIC_ILLUSION, q.MATERIAL.SEMANTIC_QI];
var dr = { UNIT: { ROOT: "Unit", TYPE: { ROOT: "Unit.Type", PLAYER: "Unit.Type.Player", ENEMY: "Unit.Type.Enemy", COMBATANT: "Unit.Type.Combatant" } }, STATUS: { ROOT: "Status", IMMUNE: { ROOT: "Status.Immune", CONTROL: "Status.Immune.Control", DEBUFF: "Status.Immune.Debuff", FIRE: "Status.Immune.Fire" }, STATE: { POISONED: "Status.Poisoned", BURNED: "Status.Burned", FROZEN: "Status.Frozen", BLEEDING: "Status.Bleeding", CHILLED: "Status.Chilled", SHOCKED: "Status.Shocked", BODY_ORGANS_SKILL_REFUNDED: "Status.BodyCultivation.OrgansSkillRefunded" }, SECT: { ROOT: "Status.Sect", state: (r, e) => `Status.Sect.${r}.${e}` }, CATEGORY: { BUFF: "Status.Buff", DEBUFF: "Status.Debuff", DOT: "Status.DOT", DEF_DEBUFF: "Status.DefDebuff", MYTHIC: "Status.Mythic", COMBO: "Status.Combo", MANA_EFF: "Status.ManaEff" }, CONTROL: { ROOT: "Status.Control", STUNNED: "Status.Control.Stunned", NO_ACTION: "Status.Control.NoAction", NO_SKILL: "Status.Control.NoSkill", NO_BASIC: "Status.Control.NoBasic" } }, ABILITY: { ROOT: "Ability", FUNCTION: { ROOT: "Ability.Function", DAMAGE: "Ability.Function.Damage", CONTROL: "Ability.Function.Control", HEAL: "Ability.Function.Heal", BUFF: "Ability.Function.Buff", DEBUFF: "Ability.Function.Debuff" }, CHANNEL: { ROOT: "Ability.Channel", MAGIC: "Ability.Channel.Magic", PHYSICAL: "Ability.Channel.Physical", TRUE: "Ability.Channel.True" }, MECHANIC: { ROOT: "Ability.Mechanic", IGNORE_SPIRITUAL_ROOT_MISMATCH: "Ability.Mechanic.IgnoreSpiritualRootMismatch" }, KIND: { ROOT: "Ability.Kind", SKILL: "Ability.Kind.Skill", PASSIVE: "Ability.Kind.Passive", ARTIFACT: "Ability.Kind.Artifact", GONGFA: "Ability.Kind.GongFa", SECT: "Ability.Kind.Sect", BASIC: "Ability.Kind.Basic" }, SECT: { ROOT: "Ability.Sect", namespace: (r) => `Ability.Sect.${r}`, path: (r, e) => `Ability.Sect.${r}.Path.${e}`, ability: (r, e) => `Ability.Sect.${r}.Ability.${e}`, mechanic: (r, e) => `Ability.Sect.${r}.Mechanic.${e}`, GENERATOR: "Ability.Sect.Role.Generator", COMBO: "Ability.Sect.Role.Combo", FINISHER: "Ability.Sect.Role.Finisher", DEFENSIVE: "Ability.Sect.Role.Defensive", UTILITY: "Ability.Sect.Role.Utility" }, ELEMENT: { ROOT: "Ability.Element", FIRE: "Ability.Element.Fire", WATER: "Ability.Element.Water", WOOD: "Ability.Element.Wood", EARTH: "Ability.Element.Earth", METAL: "Ability.Element.Metal", WIND: "Ability.Element.Wind", ICE: "Ability.Element.Ice", THUNDER: "Ability.Element.Thunder" }, TARGET: { ROOT: "Ability.Target", SINGLE: "Ability.Target.Single", AOE: "Ability.Target.AoE" } }, BUFF: { ROOT: "Buff", TYPE: { ROOT: "Buff.Type", BUFF: "Buff.Type.Buff", DEBUFF: "Buff.Type.Debuff", CONTROL: "Buff.Type.Control" }, DOT: { ROOT: "Buff.Dot", POISON: "Buff.Dot.Poison", BURN: "Buff.Dot.Burn", FREEZE: "Buff.Dot.Freeze", BLEED: "Buff.Dot.Bleed" }, ELEMENT: { ROOT: "Buff.Element", FIRE: "Buff.Element.Fire", WATER: "Buff.Element.Water", WOOD: "Buff.Element.Wood", EARTH: "Buff.Element.Earth", METAL: "Buff.Element.Metal", WIND: "Buff.Element.Wind", ICE: "Buff.Element.Ice", THUNDER: "Buff.Element.Thunder", POISON: "Buff.Element.Poison" }, SECT: { ROOT: "Buff.Sect", namespace: (r, e) => `Buff.Sect.${r}.${e}` } }, TRAIT: { ROOT: "Trait", EXECUTE: "Trait.Execute", REFLECT: "Trait.Reflect", LIFESTEAL: "Trait.Lifesteal", MANA_THIEF: "Trait.ManaThief", SHIELD_MASTER: "Trait.Shield", BERSERKER: "Trait.Berserker", COOLDOWN: "Trait.Cooldown" }, CONDITION: { ROOT: "Condition", LOW_HP: "Condition.LowHP", HIGH_HP: "Condition.HighHP", CRIT_READY: "Condition.CritReady", TARGET: { ROOT: "Condition.Target", LOW_HP: "Condition.Target.LowHP" }, CASTER: { ROOT: "Condition.Caster", LOW_HP: "Condition.Caster.LowHP" } }, EVENT: { ACTION_PRE: "ActionPreEvent", ACTION_POST: "ActionPostEvent", DAMAGE_TAKEN: "DamageSegmentAppliedEvent", DAMAGE_REQUEST: "DamageSegmentRequestedEvent", DAMAGE: "DamageSegmentRequestedEvent", SHIELD_BREAK: "ShieldBreakEvent", ROUND_PRE: "RoundPreEvent", ROUND_POST: "RoundPostEvent", ROUND_START: "RoundStartEvent", SKILL_PRE_CAST: "SkillPreCastEvent", SKILL_CAST: "SkillCastEvent", HIT_CHECK: "HitCheckEvent", DODGE: "DodgeEvent", BUFF_ADD: "BuffAddEvent", BUFF_APPLIED: "BuffAppliedEvent", BUFF_REMOVED: "BuffRemovedEvent", BUFF_IMMUNE: "BuffImmuneEvent", BUFF_LAYER_CHANGED: "BuffLayerChangedEvent", CONTROL_RESIST: "ControlResistEvent", DEATH_PREVENT: "DeathPreventEvent", CONTROLLED_SKIP: "ControlledSkipEvent", COMBAT_RESOURCE_CHANGE: "CombatResourceChangeEvent", ABILITY_COST_PAID: "AbilityCostPaidEvent", HP_CHANGED: "HpChangedEvent" }, SCOPE: { OWNER_AS_TARGET: "owner_as_target", OWNER_AS_ACTOR: "owner_as_actor", OWNER_AS_CASTER: "owner_as_caster", GLOBAL: "global" } }, Mm = { 金: dr.ABILITY.ELEMENT.METAL, 木: dr.ABILITY.ELEMENT.WOOD, 水: dr.ABILITY.ELEMENT.WATER, 火: dr.ABILITY.ELEMENT.FIRE, 土: dr.ABILITY.ELEMENT.EARTH, 风: dr.ABILITY.ELEMENT.WIND, 雷: dr.ABILITY.ELEMENT.THUNDER, 冰: dr.ABILITY.ELEMENT.ICE }, bm = [dr.ABILITY.CHANNEL.MAGIC, dr.ABILITY.CHANNEL.PHYSICAL, dr.ABILITY.CHANNEL.TRUE];
var Cm = { [q.MATERIAL.SEMANTIC_FLAME]: { name: "火焰", description: "与火、炎、灼烧、赤炎相关的材料", examples: "赤炎石、火蟒鳞、烈焰花、焚天晶" }, [q.MATERIAL.SEMANTIC_FREEZE]: { name: "冰寒", description: "与冰、寒、霜、冻结相关的材料", examples: "寒冰髓、霜纹铁、冰魄草、玄冰石" }, [q.MATERIAL.SEMANTIC_THUNDER]: { name: "雷霆", description: "与雷、电、霆、闪电相关的材料", examples: "雷灵珠、霆锤碎片、紫电石、引雷铁" }, [q.MATERIAL.SEMANTIC_WIND]: { name: "风行", description: "与风、气流、岚、轻灵敏捷相关的材料", examples: "风灵羽、岚石、旋风叶、飘渺纱" }, [q.MATERIAL.SEMANTIC_BLADE]: { name: "锋刃", description: "与锋利、刃器、攻伐、杀伤力相关的材料", examples: "锐金砂、蛟龙爪、破阵枪头、斩灵铁" }, [q.MATERIAL.SEMANTIC_GUARD]: { name: "防护", description: "与防御、护盾、坚壁、守护相关的材料", examples: "玄铁甲片、龟壳碎片、护心石、金刚木" }, [q.MATERIAL.SEMANTIC_BURST]: { name: "爆发", description: "与爆裂、暴烈、瞬间高威力、激发相关的材料", examples: "暴怒丹、爆裂矿、烈性精华、狂化血" }, [q.MATERIAL.SEMANTIC_SUSTAIN]: { name: "恢复", description: "与持续回复、疗愈、滋养、维持相关的材料", examples: "生息草、回春露、养元丹、疗伤药" }, [q.MATERIAL.SEMANTIC_MANUAL]: { name: "典籍", description: "与经书、秘卷、传承知识、功法心得相关的材料", examples: "破壁残卷、古法拓本、仙人手札、心法碎片" }, [q.MATERIAL.SEMANTIC_SPIRIT]: { name: "灵识", description: "与灵魂、神魂、灵力本源、法术能量相关的材料", examples: "灵魂碎片、魄石、灵力结晶、聚灵珠" }, [q.MATERIAL.SEMANTIC_EARTH]: { name: "土脉", description: "与土、石、山岩、大地、厚重相关的材料", examples: "厚土精、山岩石、岳灵砂、坤元土" }, [q.MATERIAL.SEMANTIC_METAL]: { name: "金铁", description: "与金属、铸炼、钢铁、锐利矿物相关的材料", examples: "寒铁锭、精钢、秘银矿、百炼金精" }, [q.MATERIAL.SEMANTIC_WATER]: { name: "水流", description: "与水、潮汐、泉源、流动柔和相关的材料", examples: "灵泉水、潮汐石、碧波珠、净水露" }, [q.MATERIAL.SEMANTIC_WOOD]: { name: "草木", description: "与木、林、植物生长、藤蔓、根系相关的材料", examples: "古木芯、灵藤、万年根须、青木精" }, [q.MATERIAL.SEMANTIC_POISON]: { name: "毒瘴", description: "与毒素、腐蚀、瘴气、蛊虫相关的材料", examples: "蝎尾毒腺、毒雾草、腐蚀液、瘴气精华" }, [q.MATERIAL.SEMANTIC_DIVINE]: { name: "神圣", description: "与神力、天授、圣光、纯净之力相关的材料", examples: "圣光石、天赐玉、神木枝、祈灵珠" }, [q.MATERIAL.SEMANTIC_SPACE]: { name: "空间", description: "与空间折叠、界域、虚空、位移相关的材料", examples: "虚空碎片、空间裂隙石、折界珠、次元晶" }, [q.MATERIAL.SEMANTIC_TIME]: { name: "时间", description: "与时光、岁月、轮转、瞬移加速相关的材料", examples: "岁月沙、时光碎片、刻痕石、轮回木" }, [q.MATERIAL.SEMANTIC_LIFE]: { name: "生机", description: "与生命力、复苏、萌芽、生生不息相关的材料", examples: "生命之种、复苏花、万灵草、不死根" }, [q.MATERIAL.SEMANTIC_ALCHEMY]: { name: "丹道", description: "与炼丹、药性、丹炉、药材调配相关的材料", examples: "炉中丹火、药引草、丹砂、灵药粉" }, [q.MATERIAL.SEMANTIC_REFINING]: { name: "器道", description: "与炼器、锻造、器胚、熔炼铸造相关的材料", examples: "器胚铁、熔炉碎片、锻造石、铸魂金" }, [q.MATERIAL.SEMANTIC_BEAST]: { name: "妖兽", description: "与妖、兽、蛟龙、野性力量相关的材料", examples: "蛟龙鳞、虎骨、妖兽内丹、凶兽角" }, [q.MATERIAL.SEMANTIC_BLOOD]: { name: "血煞", description: "与血液、气血、煞气、精血相关的材料", examples: "精血石、血煞珠、龙血精、血髓" }, [q.MATERIAL.SEMANTIC_BONE]: { name: "骨甲", description: "与骨骼、甲壳、角刺、坚硬骨质相关的材料", examples: "龙骨、妖兽甲壳、鹿角碎片、骨刺" }, [q.MATERIAL.SEMANTIC_FORMATION]: { name: "阵纹", description: "与阵法、禁制、符文、阵图相关的材料", examples: "阵图碎片、符文石、禁制令牌、刻纹玉" }, [q.MATERIAL.SEMANTIC_ILLUSION]: { name: "幻术", description: "与幻象、迷惑、蜃楼、精神干扰相关的材料", examples: "蜃气珠、幻灵花、迷神香、梦境沙" }, [q.MATERIAL.SEMANTIC_QI]: { name: "灵气", description: "与灵气浓度、元气、法力、灵压相关的材料", examples: "聚灵阵石、灵息草、元炁珠、灵压晶" }, [q.MATERIAL.TYPE_HERB]: { name: "药材", description: "草药、花果、灵植类材料", examples: "灵芝、千年参、回春草、朱果" }, [q.MATERIAL.TYPE_ORE]: { name: "矿石", description: "矿石、金属矿、晶石类材料", examples: "寒铁矿、灵晶石、精金矿、玄石" }, [q.MATERIAL.TYPE_MONSTER]: { name: "妖兽材料", description: "妖兽掉落物：鳞片、骨角、内丹等", examples: "蛟龙鳞、妖兽内丹、凤尾羽、虎骨" }, [q.MATERIAL.TYPE_MANUAL]: { name: "典籍", description: "功法秘籍、神通手札、经书残卷", examples: "太初经残卷、道德真经、秘术手札" }, [q.MATERIAL.TYPE_GONGFA_MANUAL]: { name: "功法典籍", description: "专门记载功法修炼之法的典籍", examples: "紫阳心经、玄天功法、太虚炼体诀" }, [q.MATERIAL.TYPE_SKILL_MANUAL]: { name: "神通典籍", description: "专门记载神通秘术的典籍", examples: "落雷诀残卷、火龙术心得、冰封千里秘录" }, [q.MATERIAL.TYPE_SPECIAL]: { name: "天材地宝", description: "罕见珍稀的天然宝物，通常用于高级造物", examples: "万年灵芝、天外陨铁、龙涎珠、凤血石" }, [q.MATERIAL.TYPE_AUXILIARY]: { name: "辅料", description: "辅助性材料，用于调和、催化或增益", examples: "灵泥、催化粉、调和液、增益符" } };
var a0 = ["seasonal_nurture", "qi_sprout", "stone_soil", "sun_wake", "shade_dew", "ore_soil", "aux_formation", "rest_nurture", "intrinsic_infusion", "qi_growth", "herb_companion", "monster_blood", "pill_nourish", "tcdb_return", "aux_gather", "leaf_medicine", "flower_fruit", "return_treasure", "natural_form"];
var xn = ["herb", "flower", "vine", "shrub", "tree", "fungus", "aquatic", "root"], sn = ["leaf", "flower", "fruit", "root", "rhizome", "whole", "spore", "seedpod"], i0 = ["mountain", "valley", "forest", "cave", "wetland", "waterside", "rocky", "volcanic", "cold", "warm", "shaded", "sunny"], Rn = ["slow-rooting", "quick-sprouting", "qi-sensitive", "stone-loving", "companion-loving", "blood-fed", "sun-seeking", "dew-seeking"], Dn = ["alchemy", "beast-nurturing", "healing", "qi-restoration", "spirit-nourishing", "body-tempering", "marrow-wash", "longevity", "breakthrough", "detox", "meridian", "formation"], $n = ["herb", "tcdb", "spirit_fruit"];
function $e(r) { return Boolean(r && typeof r === "object" && !Array.isArray(r)); }
function Mr(r, e) { return typeof r === "string" && e.includes(r); }
function Dr(r, e, n) {
    if (!Array.isArray(r) || r.some((d) => !Mr(d, e)))
        return null;
    return [...new Set(r)].slice(0, n);
}
function Fm(r) {
    let e = (m) => {
        if (Array.isArray(m))
            return m.map(e);
        if (m && typeof m === "object")
            return Object.keys(m).sort().reduce((a, i) => { return a[i] = e(m[i]), a; }, {});
        return m;
    }, n = JSON.stringify(e(r)), d = 2166136261;
    for (let m = 0; m < n.length; m += 1)
        d ^= n.charCodeAt(m), d = Math.imul(d, 16777619);
    return `seed-v1-${(d >>> 0).toString(16).padStart(8, "0")}`;
}
function On(r) {
    if (!$e(r) || !$e(r.seedSpec) || r.seedSpec.version !== 1 || !$e(r.seedSpec.plant))
        return null;
    let e = r.seedSpec, n = e.plant, d = n.stageDurationMs, m = [d === null || d === void 0 ? void 0 : d.germination, d === null || d === void 0 ? void 0 : d.nourishing, d === null || d === void 0 ? void 0 : d.forming], a = Dr(n.preferredMethods, a0, 6), i = Dr(n.avoidedMethods, a0, 4), t = Dr(n.preferredHabitats, i0, 3), o = Dr(n.avoidedHabitats, i0, 2), h = Dr(n.growthTraits, Rn, 4), P = Dr(n.useTags, Dn, 4), j = Dr(n.outcomeBiases, $n, 3), g = Dr(n.creationTags, m0, 5);
    if (typeof e.fingerprint !== "string" || typeof n.id !== "string" || typeof n.seedName !== "string" || typeof n.seedDescription !== "string" || !Array.isArray(n.clueTexts) || n.clueTexts.some((V) => typeof V !== "string") || !Mr(n.quality, official_chunk_wje6zqc2_js_1.pf) || !Mr(n.element, official_chunk_wje6zqc2_js_1.hf) || !Mr(n.minRealm, official_chunk_wje6zqc2_js_1.mf) || !Mr(n.growthForm, xn) || !Mr(n.harvestPart, sn) || !$e(n.stageDurationMs) || m.some((V) => typeof V !== "number" || !Number.isFinite(V) || V < 60000) || typeof n.baseYieldMin !== "number" || !Number.isFinite(n.baseYieldMin) || n.baseYieldMin < 1 || typeof n.baseYieldMax !== "number" || !Number.isFinite(n.baseYieldMax) || n.baseYieldMax < n.baseYieldMin || !a || !i || !t || !o || !h || !P || !j || !g)
        return null;
    let s = { id: n.id, seedName: n.seedName, seedDescription: n.seedDescription, clueTexts: n.clueTexts.slice(0, 3), quality: n.quality, element: n.element, minRealm: n.minRealm, growthForm: n.growthForm, harvestPart: n.harvestPart, preferredMethods: a, avoidedMethods: i, preferredHabitats: t, avoidedHabitats: o, growthTraits: h, useTags: P, outcomeBiases: j, creationTags: g, stageDurationMs: { germination: Math.max(60000, Math.floor(Number(d.germination))), nourishing: Math.max(60000, Math.floor(Number(d.nourishing))), forming: Math.max(60000, Math.floor(Number(d.forming))) }, baseYieldMin: Math.max(1, Math.floor(n.baseYieldMin)), baseYieldMax: Math.max(1, Math.floor(n.baseYieldMax)) };
    if (e.fingerprint !== Fm(s))
        return null;
    return { version: 1, fingerprint: e.fingerprint, plant: s };
}
var An = { id: "seed.v1", name: "灵种", kind: "seed", stackLimit: 999 }, Tr = zod_7.z.object({ name: zod_7.z.string().optional(), seedSpec: zod_7.z.unknown().transform((r, e) => {
        let n = On({ seedSpec: r });
        if (!n)
            return e.addIssue({ code: "custom", message: "灵种生长事实无效，无法取出或播种" }), zod_7.z.NEVER;
        return n;
    }) }).strict().transform((r) => ({ ...r, name: r.seedSpec.plant.seedName })), Vn = zod_7.z.object({ seedPreview: zod_7.z.object({ quality: zod_7.z.enum(official_chunk_wje6zqc2_js_1.pf), element: zod_7.z.enum(official_chunk_wje6zqc2_js_1.hf), minRealm: zod_7.z.enum(official_chunk_wje6zqc2_js_1.mf), seedDescription: zod_7.z.string(), clueTexts: zod_7.z.array(zod_7.z.string()) }).strict() }).strict();
exports.ud = Tr;
const zod_8 = require("./zod.js");
var Bn = { $schema: "./refinement.schema.json", formatVersion: 1, contentRevision: 2, resetLevel: 0, resetExperience: 0, restoreLifespan: !0, items: [{ id: "beast.refinement.origin-dew", name: "归元灵露", icon: "origin-dew", description: "涤去后天积累，使灵兽重归初生，重新孕育资质、成长与天生技能。适用于炼气、筑基、金丹物种。", allowedRealms: ["炼气", "筑基", "金丹"], consumeQuantity: 1, stackLimit: 99, color: "jade" }, { id: "beast.refinement.superior-origin-dew", name: "上品归元灵露", icon: "origin-dew", description: "灵息充沛的归元灵露，可使高阶灵兽重归初生。元婴及以上物种须用此露；不会提高资质、成长或多技能概率。", allowedRealms: ["炼气", "筑基", "金丹", "元婴", "化神", "炼虚", "合体", "大乘", "渡劫"], consumeQuantity: 1, stackLimit: 99, color: "gold" }] };
var Um = zod_8.z.strictObject({ $schema: zod_8.z.string().optional(), formatVersion: zod_8.z.literal(1), contentRevision: zod_8.z.number().int().positive(), resetLevel: zod_8.z.literal(0), resetExperience: zod_8.z.literal(0), restoreLifespan: zod_8.z.boolean(), items: zod_8.z.array(zod_8.z.strictObject({ id: zod_8.z.string().regex(/^beast\.refinement\.[a-z-]+$/), name: zod_8.z.string().min(1).max(40), icon: zod_8.z.literal("origin-dew"), color: zod_8.z.enum(["jade", "gold"]), description: zod_8.z.string().min(1).max(300), allowedRealms: zod_8.z.array(zod_8.z.enum(official_chunk_wje6zqc2_js_1.mf)).min(1), consumeQuantity: zod_8.z.number().int().min(1).max(99), stackLimit: zod_8.z.number().int().min(1).max(99) })).min(1) });
function cm(r) {
    let e = Um.parse(r);
    if (new Set(e.items.map((n) => n.id)).size !== e.items.length)
        throw Error("refinement.json：道具ID重复");
    for (let n of e.items)
        if (n.consumeQuantity > n.stackLimit || new Set(n.allowedRealms).size !== n.allowedRealms.length)
            throw Error(`refinement.json：${n.id} 消耗数量或适用境界配置无效`);
    return e;
}
var Oe = cm(Bn);
exports.vd = Oe;
var t0 = official_chunk_wje6zqc2_js_1.Ef.map((r) => ({ id: `book.${r.id}`, name: r.name, kind: "beast_book", skillId: r.id, stackLimit: 99 }));
var Ae = { id: "beast.rejuvenation.huasheng-fruit", name: "化生果", kind: "beast_rejuvenation", stackLimit: 99, description: "使灵兽回到幼年，等级与属性点重新养成。" };
var Xn = { id: "equipment.v6", name: "道装", kind: "equipment", stackLimit: 1 };
function Ve(r) { let { realm: e } = (0, official_chunk_wje6zqc2_js_1.wf)(r); return { realm: e, requiredLevel: (0, official_chunk_wje6zqc2_js_1.vf)(e, "初期") }; }
var zr = [10, 30, 50, 70, 90, 110, 130, 150, 170];
function Kt(r) { return zr.some((e) => e === r); }
var h0 = [10, 30, 50, 70, 90];
function re(r) { return h0.some((e) => e === r); }
var br = "dao_equipment_generator_v1", Be = "dao_equipment_generator_v2", o0 = "dao_equipment_generator_v3", ee = "dao_equipment_generator_v4", ne = "dao_equipment_generator_v5", F = ["weapon", "head", "armor", "necklace", "belt", "footwear"];
exports.hc = F;
var $r = { weapon: "法兵", head: "法冠", armor: "法衣", necklace: "灵佩", belt: "腰封", footwear: "云履" }, Zn = F.flatMap((r) => zr.map((e) => { return { id: `blueprint.${r}.${e}`, name: `${(0, official_chunk_wje6zqc2_js_1.wf)(e).realm}期${$r[r]}`, kind: "blueprint", stackLimit: 99, slot: r, level: e }; }));
exports.zd = $r;
exports.Ad = Zn;
var Qn = { $schema: "./manual-pack.schema.json", version: 3, progressions: { standard: { maxLevel: 9, bottlenecks: [3, 6], costsByRealm: { 炼气: [{ experience: 40, insight: 4 }, { experience: 80, insight: 6 }, { experience: 120, insight: 8 }, { experience: 160, insight: 10 }, { experience: 200, insight: 12 }, { experience: 240, insight: 14 }, { experience: 280, insight: 16 }, { experience: 320, insight: 18 }], 筑基: [{ experience: 200, insight: 6 }, { experience: 400, insight: 9 }, { experience: 600, insight: 12 }, { experience: 800, insight: 15 }, { experience: 1000, insight: 18 }, { experience: 1200, insight: 21 }, { experience: 1400, insight: 24 }, { experience: 1600, insight: 27 }], 金丹: [{ experience: 1000, insight: 8 }, { experience: 2000, insight: 12 }, { experience: 3000, insight: 16 }, { experience: 4000, insight: 20 }, { experience: 5000, insight: 24 }, { experience: 6000, insight: 28 }, { experience: 7000, insight: 32 }, { experience: 8000, insight: 36 }], 元婴: [{ experience: 4000, insight: 10 }, { experience: 8000, insight: 15 }, { experience: 12000, insight: 20 }, { experience: 16000, insight: 25 }, { experience: 20000, insight: 30 }, { experience: 24000, insight: 35 }, { experience: 28000, insight: 40 }, { experience: 32000, insight: 45 }] } } }, manuals: [{ id: "character_manual.changchun", name: "长春功", realm: "炼气", description: "生机绵长，温养自身。", progressionId: "standard", effects: [{ attribute: "vitality", valuePerLevel: 2, valueAt1: 12 }], mechanism: { type: "restoreHp", condition: "selfHpBelow50", valueAt1: 0.0025, valueAt9: 0.0075 } }, { id: "character_manual.gengjin", name: "庚金诀", realm: "炼气", description: "金气锐利，先破敌锋。", progressionId: "standard", effects: [{ attribute: "strength", valuePerLevel: 2, valueAt1: 12 }], mechanism: { type: "damage", condition: "targetHpAbove70", valueAt1: 0.01, valueAt9: 0.03, kinds: ["physical"] } }, { id: "character_manual.qingmu", name: "青木养元诀", realm: "炼气", description: "木气滋生，扶伤续命。", progressionId: "standard", effects: [{ attribute: "willpower", valuePerLevel: 2, valueAt1: 12 }], mechanism: { type: "heal", condition: "targetHpBelow50", valueAt1: 0.03, valueAt9: 0.09 } }, { id: "character_manual.qingquan", name: "清泉诀", realm: "炼气", description: "涓流回补，法力不竭。", progressionId: "standard", effects: [{ attribute: "spirit", valuePerLevel: 2, valueAt1: 12 }], mechanism: { type: "restoreMp", condition: "selfMpBelow50", valueAt1: 0.0025, valueAt9: 0.0075 } }, { id: "character_manual.chiyan", name: "赤炎诀", realm: "炼气", description: "精气充盈，火势方盛。", progressionId: "standard", effects: [{ attribute: "spirit", valuePerLevel: 2, valueAt1: 12 }], mechanism: { type: "damage", condition: "selfHpAbove70", valueAt1: 0.01, valueAt9: 0.03, kinds: ["spell"] } }, { id: "character_manual.houtu_jue", name: "厚土诀", realm: "炼气", description: "厚土承压，守势稳固。", progressionId: "standard", effects: [{ attribute: "endurance", valuePerLevel: 2, valueAt1: 12 }], mechanism: { type: "mitigation", condition: "defending", valueAt1: 0.03, valueAt9: 0.09, kinds: ["physical"] } }, { id: "character_manual.guiyuan", name: "归元功", realm: "筑基", description: "真元归一，凝甲护身。", progressionId: "standard", effects: [{ attribute: "endurance", valuePerLevel: 2, valueAt1: 18 }], mechanism: { type: "mitigation", condition: "selfBarrier", valueAt1: 0.02, valueAt9: 0.06, kinds: ["physical", "spell"] } }, { id: "character_manual.huanling", name: "幻灵诀", realm: "筑基", description: "幻影扰目，难辨真身。", progressionId: "standard", effects: [{ attribute: "speed", valuePerLevel: 2, valueAt1: 18 }], mechanism: { type: "evasion", condition: "always", valueAt1: 0.01, valueAt9: 0.03 } }, { id: "character_manual.qingyuan", name: "青元剑诀", realm: "筑基", description: "真元养剑，气盛剑锐。", progressionId: "standard", effects: [{ attribute: "strength", valuePerLevel: 2, valueAt1: 18 }], mechanism: { type: "damage", condition: "selfHpAbove70", valueAt1: 0.02, valueAt9: 0.04, kinds: ["physical"] } }, { id: "character_manual.dayan", name: "大衍诀", realm: "筑基", description: "壮大神识，分神守心。", progressionId: "standard", effects: [{ attribute: "willpower", valuePerLevel: 2, valueAt1: 18 }], mechanism: { type: "sealResist", condition: "always", valueAt1: 0.01, valueAt9: 0.03 } }, { id: "character_manual.sanzhuan", name: "三转重元功", realm: "筑基", description: "真元重炼，压缩精纯。", progressionId: "standard", effects: [{ attribute: "spirit", valuePerLevel: 2, valueAt1: 18 }], mechanism: { type: "damage", condition: "selfMpAbove70", valueAt1: 0.02, valueAt9: 0.04, kinds: ["spell"] } }, { id: "character_manual.shayao", name: "煞妖诀", realm: "筑基", description: "血煞催身，险中争胜。", progressionId: "standard", effects: [{ attribute: "vitality", valuePerLevel: 2, valueAt1: 18 }], mechanism: { type: "damage", condition: "selfHpBelow35", valueAt1: 0.02, valueAt9: 0.04, kinds: ["physical", "spell", "fixed"] } }, { id: "character_manual.taibai", name: "太白剑诀", realm: "金丹", description: "剑气破障，锋芒穿护。", progressionId: "standard", effects: [{ attribute: "strength", valuePerLevel: 4, valueAt1: 24 }], mechanism: { type: "damage", condition: "targetBarrier", valueAt1: 0.03, valueAt9: 0.06, kinds: ["physical"] } }, { id: "character_manual.taiyang", name: "泰阳诀", realm: "金丹", description: "精纯火力，盛阳外放。", progressionId: "standard", effects: [{ attribute: "spirit", valuePerLevel: 4, valueAt1: 24 }], mechanism: { type: "damage", condition: "selfHpAbove70", valueAt1: 0.03, valueAt9: 0.06, kinds: ["spell"] } }, { id: "character_manual.xuanyin", name: "玄阴大法", realm: "金丹", description: "阴魂蚀体，阴气乘隙。", progressionId: "standard", effects: [{ attribute: "spirit", valuePerLevel: 4, valueAt1: 24 }], mechanism: { type: "damage", condition: "targetDot", valueAt1: 0.03, valueAt9: 0.06, kinds: ["spell", "fixed"] } }, { id: "character_manual.yudan", name: "玉丹功", realm: "金丹", description: "玉润丹养，扶危固本。", progressionId: "standard", effects: [{ attribute: "willpower", valuePerLevel: 4, valueAt1: 24 }], mechanism: { type: "heal", condition: "targetHpBelow50", valueAt1: 0.04, valueAt9: 0.12 } }, { id: "character_manual.tianluo", name: "天罗真功", realm: "金丹", description: "儒门正气，护佑危局。", progressionId: "standard", effects: [{ attribute: "willpower", valuePerLevel: 4, valueAt1: 24 }], mechanism: { type: "barrier", condition: "targetHpBelow50", valueAt1: 0.05, valueAt9: 0.15 } }, { id: "character_manual.liuji", name: "六极真魔功", realm: "金丹", description: "真魔法体，受压显威。", progressionId: "standard", effects: [{ attribute: "strength", valuePerLevel: 4, valueAt1: 24 }], mechanism: { type: "damage", condition: "selfHpBelow35", valueAt1: 0.03, valueAt9: 0.06, kinds: ["physical", "spell"] } }, { id: "character_manual.tuotian", name: "托天魔功", realm: "元婴", description: "肉身强横，重压不折。", progressionId: "standard", effects: [{ attribute: "endurance", valuePerLevel: 4, valueAt1: 36 }], mechanism: { type: "mitigation", condition: "selfHpBelow50", valueAt1: 0.03, valueAt9: 0.07, kinds: ["physical"] } }, { id: "character_manual.mingwang", name: "明王诀", realm: "元婴", description: "法体坚固，受制不溃。", progressionId: "standard", effects: [{ attribute: "vitality", valuePerLevel: 4, valueAt1: 36 }], mechanism: { type: "mitigation", condition: "selfControl", valueAt1: 0.04, valueAt9: 0.1, kinds: ["physical", "spell"] } }, { id: "character_manual.yuanci", name: "元磁神光", realm: "元婴", description: "元磁牵制，护持周身。", progressionId: "standard", effects: [{ attribute: "spirit", valuePerLevel: 4, valueAt1: 36 }], mechanism: { type: "mitigation", condition: "selfMpAbove50", valueAt1: 0.03, valueAt9: 0.07, kinds: ["spell"] } }, { id: "character_manual.haoran", name: "浩然正气诀", realm: "元婴", description: "邪扰不侵，正气护神。", progressionId: "standard", effects: [{ attribute: "willpower", valuePerLevel: 4, valueAt1: 36 }], mechanism: { type: "mitigation", condition: "selfDebuff", valueAt1: 0.04, valueAt9: 0.1, kinds: ["spell"] } }, { id: "character_manual.qianlang", name: "千浪诀", realm: "元婴", description: "身随浪走，危中脱身。", progressionId: "standard", effects: [{ attribute: "speed", valuePerLevel: 4, valueAt1: 36 }], mechanism: { type: "evasion", condition: "selfHpBelow50", valueAt1: 0.02, valueAt9: 0.06 } }, { id: "character_manual.yousha", name: "幽杀诀", realm: "元婴", description: "杀意逼迫，追索残敌。", progressionId: "standard", effects: [{ attribute: "strength", valuePerLevel: 4, valueAt1: 36 }], mechanism: { type: "damage", condition: "targetHpBelow35", valueAt1: 0.03, valueAt9: 0.06, kinds: ["physical", "spell", "fixed"] } }] };
const zod_9 = require("./zod.js");
var u0 = ["炼气", "筑基", "金丹", "元婴"], km = ["vitality", "strength", "spirit", "endurance", "speed", "willpower"], Em = zod_9.z.number().int().positive().max(1e9), fm = zod_9.z.strictObject({ experience: Em, insight: zod_9.z.number().int().min(1).max(100) }), l0 = { valueAt1: zod_9.z.number().positive().max(0.2), valueAt9: zod_9.z.number().positive().max(0.2) }, _0 = zod_9.z.enum(["always", "selfHpBelow50", "selfHpBelow35", "selfHpAbove70", "targetHpBelow50", "targetHpBelow35", "targetHpAbove70", "selfMpBelow50", "selfMpAbove50", "selfMpAbove70", "defending", "selfBarrier", "targetBarrier", "targetDot", "selfControl", "selfDebuff"]), Sm = zod_9.z.discriminatedUnion("type", [zod_9.z.strictObject({ type: zod_9.z.literal("damage"), condition: _0, kinds: zod_9.z.array(zod_9.z.enum(["physical", "spell", "fixed"])).min(1).max(3), ...l0 }), zod_9.z.strictObject({ type: zod_9.z.literal("mitigation"), condition: _0, kinds: zod_9.z.array(zod_9.z.enum(["physical", "spell"])).min(1).max(2), ...l0 }), zod_9.z.strictObject({ type: zod_9.z.enum(["heal", "barrier", "evasion", "sealResist", "restoreHp", "restoreMp"]), condition: _0, ...l0 })]), Tm = zod_9.z.strictObject({ $schema: zod_9.z.string().optional(), version: zod_9.z.literal(3), progressions: zod_9.z.record(zod_9.z.string().min(1), zod_9.z.strictObject({ maxLevel: zod_9.z.number().int().min(2).max(99), bottlenecks: zod_9.z.array(zod_9.z.number().int().positive()), costsByRealm: zod_9.z.record(zod_9.z.enum(u0), zod_9.z.array(fm)) })), manuals: zod_9.z.array(zod_9.z.strictObject({ id: zod_9.z.string().regex(/^character_manual\.[a-z][a-z0-9_-]*$/), name: zod_9.z.string().min(1), realm: zod_9.z.enum(u0), description: zod_9.z.string().min(1), progressionId: zod_9.z.string().min(1), effects: zod_9.z.array(zod_9.z.strictObject({ attribute: zod_9.z.enum(km), valueAt1: zod_9.z.number().int().min(1).max(1000), valuePerLevel: zod_9.z.number().int().min(1).max(100) })).min(1).max(1), mechanism: Sm })).min(1) }), zm = Tm.superRefine((r, e) => {
    let n = (m, a) => e.addIssue({ code: "custom", path: m, message: a }), d = new Set;
    r.manuals.forEach((m, a) => {
        if (d.has(m.id))
            n(["manuals", a, "id"], "功法 ID 重复");
        d.add(m.id);
        let i = m.mechanism;
        if (i.valueAt9 <= i.valueAt1)
            n(["manuals", a, "mechanism"], "机制必须随层数增强");
        if ("kinds" in i && new Set(i.kinds).size !== i.kinds.length)
            n(["manuals", a, "mechanism"], "伤害类型重复");
        if (["mitigation", "evasion", "restoreHp", "restoreMp"].includes(i.type) && i.condition.startsWith("target"))
            n(["manuals", a, "mechanism"], "防护与回合恢复仅支持自身条件");
        if (i.type === "sealResist" && i.condition !== "always")
            n(["manuals", a, "mechanism"], "封印抵抗为常驻能力");
        if (!r.progressions[m.progressionId])
            n(["manuals", a, "progressionId"], "培养规则不存在");
        if (new Set(m.effects.map((t) => t.attribute)).size !== m.effects.length)
            n(["manuals", a, "effects"], "属性不能重复");
    });
    for (let [m, a] of Object.entries(r.progressions)) {
        if (a.bottlenecks.some((i, t) => i >= a.maxLevel || t > 0 && i <= a.bottlenecks[t - 1]))
            n(["progressions", m, "bottlenecks"], "瓶颈必须递增且低于满层");
        for (let i of u0)
            if (a.costsByRealm[i].length !== a.maxLevel - 1)
                n(["progressions", m, "costsByRealm", i], "必须逐层配置二层至满层的费用");
    }
});
exports.Bd = u0;
function yn(r) { return zm.parse(r); }
var Yn = yn(Qn), He = Yn.manuals.map((r) => ({ ...r, skill: { id: `${r.id}.passive`, name: r.name, tags: [official_chunk_wje6zqc2_js_1.Qe.Passive], targeting: { side: official_chunk_wje6zqc2_js_1.Re.Self }, effects: [] } }));
exports.Cd = He;
function Et(r) { return Yn.progressions[r.progressionId]; }
var Jn = He.map((r) => ({ id: `jade.${r.id}`, name: r.name, kind: "manual_jade", manualId: r.id, stackLimit: 99 }));
var Kn = { $schema: "./equipment-base.schema.json", formatVersion: 1, contentRevision: 3, templates: [{ id: "dao_equipment.standard.weapon.v1", name: "法兵", slot: "weapon", baseStats: [{ attr: "physicalAtk", ranges: [{ level: 10, normal: [116, 149], enhanced: [127, 164] }, { level: 30, normal: [233, 299], enhanced: [256, 328] }, { level: 50, normal: [350, 450], enhanced: [385, 495] }, { level: 70, normal: [466, 599], enhanced: [512, 658] }, { level: 90, normal: [583, 749], enhanced: [641, 823] }] }, { attr: "magicAtk", ranges: [{ level: 10, normal: [25, 33], enhanced: [28, 36] }, { level: 30, normal: [52, 67], enhanced: [57, 73] }, { level: 50, normal: [78, 100], enhanced: [85, 110] }, { level: 70, normal: [105, 135], enhanced: [115, 148] }, { level: 90, normal: [130, 168], enhanced: [143, 184] }] }, { attr: "healPower", ranges: [{ level: 10, normal: [30, 54], enhanced: [33, 59] }, { level: 30, normal: [60, 108], enhanced: [66, 118] }, { level: 50, normal: [90, 162], enhanced: [99, 178] }, { level: 70, normal: [120, 216], enhanced: [132, 237] }, { level: 90, normal: [150, 270], enhanced: [165, 297] }] }] }, { id: "dao_equipment.standard.head.v1", name: "法冠", slot: "head", baseStats: [{ attr: "maxMp", ranges: [{ level: 10, normal: [116, 149], enhanced: [127, 164] }, { level: 30, normal: [233, 299], enhanced: [256, 328] }, { level: 50, normal: [350, 450], enhanced: [385, 495] }, { level: 70, normal: [466, 599], enhanced: [512, 658] }, { level: 90, normal: [583, 749], enhanced: [641, 823] }] }, { attr: "physicalDef", ranges: [{ level: 10, normal: [17, 22], enhanced: [19, 24] }, { level: 30, normal: [35, 45], enhanced: [38, 49] }, { level: 50, normal: [52, 67], enhanced: [57, 73] }, { level: 70, normal: [70, 90], enhanced: [77, 99] }, { level: 90, normal: [87, 112], enhanced: [95, 123] }] }] }, { id: "dao_equipment.standard.armor.v1", name: "法衣", slot: "armor", baseStats: [{ attr: "maxHp", ranges: [{ level: 10, normal: [93, 119], enhanced: [102, 131] }, { level: 30, normal: [186, 239], enhanced: [205, 263] }, { level: 50, normal: [280, 360], enhanced: [308, 396] }, { level: 70, normal: [373, 479], enhanced: [410, 526] }, { level: 90, normal: [466, 599], enhanced: [512, 658] }] }, { attr: "physicalDef", ranges: [{ level: 10, normal: [29, 37], enhanced: [31, 41] }, { level: 30, normal: [58, 74], enhanced: [63, 81] }, { level: 50, normal: [87, 112], enhanced: [95, 123] }, { level: 70, normal: [116, 149], enhanced: [127, 163] }, { level: 90, normal: [145, 187], enhanced: [159, 205] }] }] }, { id: "dao_equipment.standard.necklace.v1", name: "灵佩", slot: "necklace", baseStats: [{ attr: "magicAtk", ranges: [{ level: 10, normal: [32, 41], enhanced: [35, 45] }, { level: 30, normal: [64, 82], enhanced: [70, 90] }, { level: 50, normal: [95, 123], enhanced: [104, 135] }, { level: 70, normal: [128, 164], enhanced: [140, 180] }, { level: 90, normal: [160, 206], enhanced: [176, 226] }] }, { attr: "magicDef", ranges: [{ level: 10, normal: [17, 22], enhanced: [19, 24] }, { level: 30, normal: [35, 45], enhanced: [38, 49] }, { level: 50, normal: [52, 67], enhanced: [57, 73] }, { level: 70, normal: [70, 90], enhanced: [77, 99] }, { level: 90, normal: [87, 112], enhanced: [95, 123] }] }] }, { id: "dao_equipment.standard.belt.v1", name: "腰封", slot: "belt", baseStats: [{ attr: "maxHp", ranges: [{ level: 10, normal: [140, 180], enhanced: [154, 198] }, { level: 30, normal: [280, 360], enhanced: [308, 396] }, { level: 50, normal: [420, 540], enhanced: [462, 594] }, { level: 70, normal: [560, 720], enhanced: [616, 792] }, { level: 90, normal: [700, 900], enhanced: [770, 990] }] }, { attr: "physicalDef", ranges: [{ level: 10, normal: [11, 15], enhanced: [12, 16] }, { level: 30, normal: [23, 30], enhanced: [25, 33] }, { level: 50, normal: [35, 45], enhanced: [38, 49] }, { level: 70, normal: [46, 59], enhanced: [50, 64] }, { level: 90, normal: [58, 74], enhanced: [63, 81] }] }] }, { id: "dao_equipment.standard.footwear.v1", name: "云履", slot: "footwear", baseStats: [{ attr: "magicDef", ranges: [{ level: 10, normal: [17, 22], enhanced: [19, 24] }, { level: 30, normal: [35, 45], enhanced: [38, 49] }, { level: 50, normal: [52, 67], enhanced: [57, 73] }, { level: 70, normal: [70, 90], enhanced: [77, 99] }, { level: 90, normal: [87, 112], enhanced: [95, 123] }] }, { attr: "speed", ranges: [{ level: 10, normal: [13, 23], enhanced: [14, 25] }, { level: 30, normal: [26, 47], enhanced: [29, 52] }, { level: 50, normal: [40, 72], enhanced: [44, 79] }, { level: 70, normal: [53, 95], enhanced: [58, 104] }, { level: 90, normal: [66, 119], enhanced: [72, 130] }] }] }], inscriptions: [{ id: "dao_inscription.xuanfeng", name: "玄锋阵纹", attr: "physicalAtk", valuePerLevel: 6, allowedSlots: ["weapon", "head"] }, { id: "dao_inscription.lingyao", name: "灵曜阵纹", attr: "magicAtk", valuePerLevel: 4, allowedSlots: ["weapon", "necklace"] }, { id: "dao_inscription.jingang", name: "金刚阵纹", attr: "physicalDef", valuePerLevel: 8, allowedSlots: ["head", "armor"] }, { id: "dao_inscription.xuanjia", name: "玄甲阵纹", attr: "magicDef", valuePerLevel: 6, allowedSlots: ["armor", "necklace"] }, { id: "dao_inscription.changsheng", name: "长生阵纹", attr: "maxHp", valuePerLevel: 40, allowedSlots: ["armor", "belt"] }, { id: "dao_inscription.jifeng", name: "疾风阵纹", attr: "speed", valuePerLevel: 4, allowedSlots: ["belt", "footwear"] }, { id: "dao_inscription.dongming", name: "洞明阵纹", attr: "sealHit", valuePerLevel: 1, allowedSlots: ["weapon"] }, { id: "dao_inscription.liuyun", name: "定神阵纹", attr: "sealResist", valuePerLevel: 1, allowedSlots: ["belt", "footwear"] }, { id: "dao_inscription.huichun", name: "回春阵纹", attr: "healPower", valuePerLevel: 6, allowedSlots: ["weapon", "armor"] }], generation: { bonusCountProbabilities: [0.5, 0.4, 0.1], bonusRanges: [{ level: 10, min: 4, max: 7 }, { level: 30, min: 7, max: 14 }, { level: 50, min: 11, max: 22 }, { level: 70, min: 15, max: 29 }, { level: 90, min: 18, max: 36 }] } };
const zod_10 = require("./zod.js");
var Wn = zod_10.z.enum(["physicalAtk", "physicalDef", "magicAtk", "magicDef", "maxHp", "maxMp", "healPower", "speed", "hit", "dodge", "critRate", "spellCritRate", "physicalFuryRate", "sealHit", "sealResist"]), wn = zod_10.z.tuple([zod_10.z.number().int().nonnegative().max(1e6), zod_10.z.number().int().nonnegative().max(1e6)]), Nn = zod_10.z.union([zod_10.z.literal(10), zod_10.z.literal(30), zod_10.z.literal(50), zod_10.z.literal(70), zod_10.z.literal(90)]), ea = zod_10.z.strictObject({ level: Nn, normal: wn, enhanced: wn }), p0 = zod_10.z.number().min(0).max(1), na = zod_10.z.strictObject({ $schema: zod_10.z.string().optional(), formatVersion: zod_10.z.literal(1), contentRevision: zod_10.z.number().int().positive(), templates: zod_10.z.array(zod_10.z.strictObject({ id: zod_10.z.string().regex(/^dao_equipment\.standard\.[a-z]+\.v1$/), name: zod_10.z.string().trim().min(1), slot: zod_10.z.enum(F), baseStats: zod_10.z.array(zod_10.z.strictObject({ attr: Wn, ranges: zod_10.z.array(ea).length(5) })).min(1) })).length(F.length), inscriptions: zod_10.z.array(zod_10.z.strictObject({ id: zod_10.z.string().regex(/^dao_inscription\.[a-z][a-z0-9_]*$/), name: zod_10.z.string().trim().min(1), attr: Wn, valuePerLevel: zod_10.z.number().positive(), allowedSlots: zod_10.z.array(zod_10.z.enum(F)).min(1) })).min(1), generation: zod_10.z.strictObject({ bonusCountProbabilities: zod_10.z.tuple([p0, p0, p0]), bonusRanges: zod_10.z.array(zod_10.z.strictObject({ level: Nn, min: zod_10.z.number().int().positive(), max: zod_10.z.number().int().positive() })).length(5) }) }), da = na.superRefine((r, e) => {
    let n = (a, i) => e.addIssue({ code: "custom", path: a, message: i }), d = (a, i) => {
        a.forEach((t, o) => {
            if (a.indexOf(t) !== o)
                n([...i, o], "不得重复");
        });
    };
    d(r.templates.map((a) => a.id), ["templates"]), d(r.templates.map((a) => a.slot), ["templates"]), r.templates.forEach((a, i) => {
        if (a.id !== `dao_equipment.standard.${a.slot}.v1`)
            n(["templates", i, "id"], "模板 ID 必须匹配标准部位 ID，供图纸和生成入口引用");
        d(a.baseStats.map((t) => t.attr), ["templates", i, "baseStats"]), a.baseStats.forEach((t, o) => {
            let h = ["templates", i, "baseStats", o, "ranges"];
            d(t.ranges.map((P) => String(P.level)), h), t.ranges.forEach((P, j) => {
                if (P.normal[0] > P.normal[1] || P.enhanced[0] > P.enhanced[1])
                    n([...h, j], "上界不得小于下界");
                if (P.enhanced.some((g, s) => g < P.normal[s]))
                    n([...h, j, "enhanced"], "高品阶范围不得低于普通范围");
            });
        });
    }), d(r.inscriptions.map((a) => a.id), ["inscriptions"]), r.inscriptions.forEach((a, i) => { d(a.allowedSlots, ["inscriptions", i, "allowedSlots"]); });
    let m = r.generation.bonusCountProbabilities.reduce((a, i) => a + i, 0);
    if (Math.abs(m - 1) > 0.000000000001)
        n(["generation", "bonusCountProbabilities"], "0／1／2 条概率之和必须为 1");
    d(r.generation.bonusRanges.map((a) => String(a.level)), ["generation", "bonusRanges"]), r.generation.bonusRanges.forEach((a, i) => {
        if (a.min > a.max)
            n(["generation", "bonusRanges", i], "上界不得小于下界");
    });
});
function Mn(r, e = "equipment-base.json") {
    let n = da.safeParse(r);
    if (n.success)
        return n.data;
    let d = n.error.issues.map((m) => {
        let a = r;
        for (let t of m.path.slice(0, 2))
            a = a && typeof a === "object" ? Reflect.get(a, t) : void 0;
        let i = a && typeof a === "object" && "id" in a ? ` [${String(a.id)}]` : "";
        return `${e}${i} ${m.path.join(".")}: ${m.message}`;
    });
    throw Error(d.join(`
`));
}
var Xe = ["axe", "blade", "spear", "staff", "sword", "fan", "bell", "brush", "banner"], de = { axe: { name: "斧", physicalAtk: 1.15, magicAtk: 0.85 }, blade: { name: "刀", physicalAtk: 1.12, magicAtk: 0.88 }, spear: { name: "枪", physicalAtk: 1.09, magicAtk: 0.91 }, staff: { name: "棍", physicalAtk: 1.03, magicAtk: 0.97 }, sword: { name: "剑", physicalAtk: 1, magicAtk: 1 }, fan: { name: "扇", physicalAtk: 0.94, magicAtk: 1.06 }, bell: { name: "铃", physicalAtk: 0.91, magicAtk: 1.09 }, brush: { name: "笔", physicalAtk: 0.88, magicAtk: 1.12 }, banner: { name: "幡", physicalAtk: 0.85, magicAtk: 1.15 } };
exports.Ed = Xe;
exports.Fd = de;
function me(r) { var _a; return r.slot === "weapon" ? (_a = r.weaponType) !== null && _a !== void 0 ? _a : "sword" : void 0; }
function Ge(r) {
    let { slot: e, weaponType: n, generatorVersion: d } = r;
    if (e !== "weapon")
        return n === void 0 ? void 0 : "只有法兵可以指定器形";
    if (n !== void 0 && (typeof n !== "string" || !Xe.includes(n)))
        return "法兵器形无效";
    if (d === "dao_equipment_generator_v5")
        return n === void 0 ? "新版法兵必须指定器形" : void 0;
    if (n !== void 0 && n !== "sword")
        return "旧版法兵仅兼容剑";
}
var q0 = Mn(Kn), bn = q0.templates, Cn = q0.generation;
function P0(r) {
    let e = Cn.bonusRanges.find((n) => n.level === r);
    if (!e)
        throw Error("该境界道装尚未开放");
    return { min: e.min, max: e.max };
}
var ma = { Xuanfeng: "dao_inscription.xuanfeng", Lingyao: "dao_inscription.lingyao", Jingang: "dao_inscription.jingang", Xuanjia: "dao_inscription.xuanjia", Changsheng: "dao_inscription.changsheng", Jifeng: "dao_inscription.jifeng", Dongming: "dao_inscription.dongming", Liuyun: "dao_inscription.liuyun", Huichun: "dao_inscription.huichun" }, Ze = q0.inscriptions;
exports.Gd = ma;
exports.Hd = Ze;
function Qe(r) { return bn.find((e) => e.id === r); }
function Or(r) { return Ze.find((e) => e.id === r); }
function g0(r, e, n = 0, d) {
    let m = r.ranges.find((o) => o.level === e);
    if (!m)
        throw Error("该境界道装尚未开放");
    let a = d && (r.attr === "physicalAtk" || r.attr === "magicAtk") ? de[d][r.attr] : 1, i = Math.round(m.normal[0] + n * (m.enhanced[0] - m.normal[0])), t = Math.round(m.normal[1] + n * (m.enhanced[1] - m.normal[1]));
    return { min: Math.round(i * a), max: Math.round(t * a) };
}
var aa = 11, ia = (r, e) => `inscription.${r}.${e}`, Fn = Ze.flatMap((r) => Array.from({ length: aa }, (e, n) => ({ id: ia(r.id, n + 1), name: r.name, kind: "inscription", patternId: r.id, level: n + 1, stackLimit: 99 })));
exports.Ld = aa;
exports.Md = ia;
var ta = [...t0, ...Oe.items.map((r) => ({ ...r, kind: "beast_refinement" })), Ae, ...Zn, Xn, vn, An, gn, ...Jn, ...Fn], ha = new Map(ta.map((r) => [r.id, r]));
function j0(r) { return ha.get(r); }
const zod_11 = require("./zod.js");
var In = { $schema: "./equipment-forging.schema.json", formatVersion: 1, contentRevision: 5, generation: { essenceCountProbabilities: [0.82, 0.16, 0.02], artChance: 0.08, essencePool: ["dao_equipment.essence.cangfeng", "dao_equipment.essence.ningshen", "dao_equipment.essence.pojin", "dao_equipment.essence.dinghun", "dao_equipment.essence.qingling", "dao_equipment.essence.jiangang", "dao_equipment.essence.guiyuan", "dao_equipment.essence.zhenyue", "dao_equipment.essence.shouxin", "dao_equipment.essence.pojia", "dao_equipment.essence.chuanxuan", "dao_equipment.essence.chengnian", "dao_equipment.essence.huichun", "dao_equipment.essence.huming"], artPool: ["dao_equipment.art.huiyuan", "dao_equipment.art.yangyuan", "dao_equipment.art.xuming", "dao_equipment.art.baoyuan", "dao_equipment.art.guizhen", "dao_equipment.art.huanhun", "dao_equipment.art.qingxin", "dao_equipment.art.dichen", "dao_equipment.art.taiqing", "dao_equipment.art.chengtian", "dao_equipment.art.cuozhi", "dao_equipment.art.hanyue", "dao_equipment.art.hanyueyin", "dao_equipment.art.huti", "dao_equipment.art.hutiyin", "dao_equipment.art.lianfeng", "dao_equipment.art.lianfengyin", "dao_equipment.art.liejia", "dao_equipment.art.liejiayin", "dao_equipment.art.xuanling", "dao_equipment.art.xuantian", "dao_equipment.art.fuying", "dao_equipment.art.fuyingyin", "dao_equipment.art.yufeng", "dao_equipment.art.yufengyin", "dao_equipment.art.lingyan", "dao_equipment.art.jifa", "dao_equipment.art.kurong", "dao_equipment.art.diefeng", "dao_equipment.art.sandie", "dao_equipment.art.juling", "dao_equipment.art.wanxiang", "dao_equipment.art.zebei", "dao_equipment.art.niming", "dao_equipment.art.due", "dao_equipment.art.dongxu", "dao_equipment.art.cuiling", "dao_equipment.art.dangchen"] }, forging: { boostPerMaterial: 0.018, costs: [{ level: 10, spiritStones: 100, qi: 7, quantity: 1, rank: "凡品" }, { level: 30, spiritStones: 900, qi: 11, quantity: 1, rank: "凡品" }, { level: 50, spiritStones: 2500, qi: 15, quantity: 2, rank: "灵品" }, { level: 70, spiritStones: 4900, qi: 19, quantity: 2, rank: "灵品" }, { level: 90, spiritStones: 8100, qi: 23, quantity: 3, rank: "玄品" }, { level: 110, spiritStones: 12100, qi: 27, quantity: 3, rank: "玄品" }, { level: 130, spiritStones: 16900, qi: 31, quantity: 4, rank: "真品" }, { level: 150, spiritStones: 22500, qi: 35, quantity: 4, rank: "真品" }, { level: 170, spiritStones: 28900, qi: 39, quantity: 5, rank: "地品" }] } };
const zod_12 = require("./zod.js");
var ye = zod_12.z.number().min(0).max(1), la = zod_12.z.strictObject({ $schema: zod_12.z.string().optional(), formatVersion: zod_12.z.literal(1), contentRevision: zod_12.z.number().int().positive(), generation: zod_12.z.strictObject({ essenceCountProbabilities: zod_12.z.tuple([ye, ye, ye]), artChance: ye, essencePool: zod_12.z.array(zod_12.z.string().min(1)).min(1), artPool: zod_12.z.array(zod_12.z.string().min(1)).min(1) }), forging: zod_12.z.strictObject({ boostPerMaterial: zod_12.z.number().min(0).max(0.2).multipleOf(0.000001), costs: zod_12.z.array(zod_12.z.strictObject({ level: zod_12.z.union(zr.map((r) => zod_12.z.literal(r))), spiritStones: zod_12.z.number().int().nonnegative().max(1e8), qi: zod_12.z.number().int().nonnegative().max(1e6), quantity: zod_12.z.number().int().min(1).max(5), rank: zod_12.z.enum(official_chunk_wje6zqc2_js_1.pf) })).length(9) }) });
function Un(r, e) {
    let d = la.superRefine((m, a) => {
        let i = (h, P) => a.addIssue({ code: "custom", path: h, message: P }), t = m.generation.essenceCountProbabilities.reduce((h, P) => h + P, 0);
        if (Math.abs(t - 1) > 0.000000000001)
            i(["generation", "essenceCountProbabilities"], "概率之和必须为 1");
        for (let [h, P] of [["essencePool", e.essences], ["artPool", e.arts]]) {
            let j = m.generation[h];
            j.forEach((s, V) => {
                if (j.indexOf(s) !== V)
                    i(["generation", h, V], `ID 重复：${s}`);
                if (!P.some((or) => or.id === s))
                    i(["generation", h, V], `引用不存在：${s}`);
            });
            let g = h === "artPool" ? m.generation.artChance > 0 ? 1 : 0 : m.generation.essenceCountProbabilities[2] > 0 ? 2 : m.generation.essenceCountProbabilities[1] > 0 ? 1 : 0;
            for (let s of F)
                if (P.filter((V) => j.includes(V.id) && (!V.allowedSlots || V.allowedSlots.includes(s))).length < g)
                    i(["generation", h], `${s} 可用内容不足 ${g} 个，无法满足配置概率`);
        }
        let o = new Set;
        m.forging.costs.forEach((h, P) => {
            if (o.has(h.level))
                i(["forging", "costs", P, "level"], `器阶重复：${h.level}`);
            o.add(h.level);
        });
    }).safeParse(r);
    if (d.success)
        return d.data;
    throw Error(d.error.issues.map((m) => `equipment-forging.json ${m.path.join(".")}: ${m.message}`).join(`
`));
}
var cn = { $schema: "./equipment-special.schema.json", formatVersion: 1, contentRevision: 6, essences: [{ id: "dao_equipment.essence.cangfeng", name: "藏锋", stackPolicy: "stack", effect: { type: "panelAdd", attribute: "critRate", value: 0.01 }, description: "器中锋芒凝聚，物理暴击概率提高{valuePercent}%。" }, { id: "dao_equipment.essence.ningshen", name: "凝神", stackPolicy: "stack", effect: { type: "panelAdd", attribute: "spellCritRate", value: 0.01 }, description: "器中锋芒凝聚，法术暴击概率提高{valuePercent}%。" }, { id: "dao_equipment.essence.pojin", name: "破禁", stackPolicy: "stack", effect: { type: "sealChance", side: "hit", value: 0.01 }, description: "器蕴护持神识，封禁命中概率提高{valuePercent}%。" }, { id: "dao_equipment.essence.dinghun", name: "定魂", stackPolicy: "stack", effect: { type: "sealChance", side: "resist", value: 0.01 }, description: "器蕴护持神识，受到封禁时命中概率降低{valuePercent}%。" }, { id: "dao_equipment.essence.qingling", name: "轻灵", stackPolicy: "unique", effect: { type: "requiredStageOffset", value: -1 }, description: "法宝灵性通明，御使此宝可提前{valueAbs}个小境界，最低为炼气初期；不改变炼制门槛。" }, { id: "dao_equipment.essence.jiangang", name: "激昂", stackPolicy: "highest", effect: { type: "rageGain", factor: 1.25 }, allowedSlots: ["belt"], description: "受创时器灵激荡，所得战意提升至原来的{factorPercent}%。" }, { id: "dao_equipment.essence.guiyuan", name: "归元", stackPolicy: "highest", effect: { type: "rageCost", factor: 0.8 }, allowedSlots: ["belt"], description: "器中灵机归一，施展器诀仅需原本{factorPercent}%的战意。" }, { id: "dao_equipment.essence.zhenyue", name: "镇岳", description: "器蕴如山镇身，受到物理攻击时暴击概率降低{valuePercent}%。", stackPolicy: "stack", effect: { type: "antiCrit", kind: "physical", value: 0.01 } }, { id: "dao_equipment.essence.shouxin", name: "守心", description: "器灵守护心神，受到法术攻击时暴击概率降低{valuePercent}%。", stackPolicy: "stack", effect: { type: "antiCrit", kind: "spell", value: 0.01 } }, { id: "dao_equipment.essence.pojia", name: "破甲", description: "锋芒穿透护体之力，物理攻击忽视目标{valuePercent}%物防。", stackPolicy: "stack", effect: { type: "defenseIgnore", kind: "physical", value: 0.02 } }, { id: "dao_equipment.essence.chuanxuan", name: "穿玄", description: "灵机洞穿玄障，法术攻击忽视目标{valuePercent}%法防。", stackPolicy: "stack", effect: { type: "defenseIgnore", kind: "spell", value: 0.02 } }, { id: "dao_equipment.essence.chengnian", name: "澄念", description: "器灵澄澈念头，施法时有{chancePercent}%概率免耗本次法力；仍须满足施法所需法力。", stackPolicy: "unique", effect: { type: "mpWaiver", chance: 0.15 }, allowedSlots: ["necklace"] }, { id: "dao_equipment.essence.huichun", name: "回春", description: "器中生机温养道身，每回合结束恢复境界映射等级×{levelRatio}的气血，向下取整；倒地无效，同名不叠加。", stackPolicy: "unique", effect: { type: "regeneration", levelRatio: 0.5 } }, { id: "dao_equipment.essence.huming", name: "护命", description: "命火将熄时，器灵有{chancePercent}%概率护主复起，恢复气血上限的{hpRatioPercent}%；受禁复活之法压制时无效。", stackPolicy: "unique", effect: { type: "revival", chance: 0.2, hpRatio: 0.3 }, allowedSlots: ["weapon"] }], arts: [{ id: "dao_equipment.art.huiyuan", name: "回元诀", skillId: "dao_equipment.skill.huiyuan", rageCost: 30, target: "ally", effect: { type: "heal", ratio: 0.2 }, description: "法宝温养生机，为己方单体恢复最大气血的{ratioPercent}%；受减疗与伤势上限约束，不修复伤势。" }, { id: "dao_equipment.art.yangyuan", name: "养元诀", skillId: "dao_equipment.skill.yangyuan", rageCost: 60, target: "ally", effect: { type: "heal", ratio: 0.3 }, description: "法宝温养生机，为己方单体恢复最大气血的{ratioPercent}%；受减疗与伤势上限约束，不修复伤势。" }, { id: "dao_equipment.art.xuming", name: "续命诀", skillId: "dao_equipment.skill.xuming", rageCost: 90, target: "ally", effect: { type: "heal", ratio: 0.4 }, description: "法宝温养生机，为己方单体恢复最大气血的{ratioPercent}%；受减疗与伤势上限约束，不修复伤势。" }, { id: "dao_equipment.art.baoyuan", name: "抱元诀", skillId: "dao_equipment.skill.baoyuan", rageCost: 60, target: "self", effect: { type: "heal", ratio: 0.4 }, description: "法宝温养生机，为自身恢复最大气血的{ratioPercent}%；受减疗与伤势上限约束，不修复伤势。" }, { id: "dao_equipment.art.guizhen", name: "归真诀", skillId: "dao_equipment.skill.guizhen", rageCost: 130, target: "self", effect: { type: "heal", ratio: 0.6 }, description: "法宝温养生机，为自身恢复最大气血的{ratioPercent}%；受减疗与伤势上限约束，不修复伤势。" }, { id: "dao_equipment.art.huanhun", name: "还魂诀", skillId: "dao_equipment.skill.huanhun", rageCost: 80, target: "ally", effect: { type: "revive", hpRatio: 0.2 }, description: "引命火归身，复起己方单体并恢复最大气血的{hpRatioPercent}%；受禁复活、减疗与伤势上限约束。" }, { id: "dao_equipment.art.qingxin", name: "清心诀", skillId: "dao_equipment.skill.qingxin", rageCost: 50, target: "ally", effect: { type: "cleanse", kinds: ["lingxiao.confuse", "jiujie.control.suppress", "jiujie.control.confuse", "jiujie.control.million_weapons", "tianyan.status.seal", "combat.training.status.control"], healRatio: 0 }, description: "澄明灵台，解除己方单体的可解除控制，不解除反噬休息、毒、减益或禁复活。" }, { id: "dao_equipment.art.dichen", name: "涤尘诀", skillId: "dao_equipment.skill.dichen", rageCost: 100, target: "ally", effect: { type: "cleanse", kinds: ["lingxiao.confuse", "jiujie.control.suppress", "jiujie.control.confuse", "jiujie.control.million_weapons", "tianyan.status.seal", "combat.training.status.control"], healRatio: 0.25 }, description: "澄明灵台，解除己方单体的可解除控制，不解除反噬休息、毒、减益或禁复活。随后恢复最大气血的{healRatioPercent}%，受减疗与伤势上限约束。" }, { id: "dao_equipment.art.taiqing", name: "太清诀", skillId: "dao_equipment.skill.taiqing", rageCost: 125, target: "allies", effect: { type: "cleanse", kinds: ["lingxiao.confuse", "jiujie.control.suppress", "jiujie.control.confuse", "jiujie.control.million_weapons", "tianyan.status.seal", "combat.training.status.control"], healRatio: 0 }, description: "澄明灵台，解除己方全体在场单位的可解除控制，不解除反噬休息、毒、减益或禁复活。" }, { id: "dao_equipment.art.chengtian", name: "澄天诀", skillId: "dao_equipment.skill.chengtian", rageCost: 150, target: "allies", effect: { type: "cleanse", kinds: ["lingxiao.confuse", "jiujie.control.suppress", "jiujie.control.confuse", "jiujie.control.million_weapons", "tianyan.status.seal", "combat.training.status.control"], healRatio: 0.15 }, description: "澄明灵台，解除己方全体在场单位的可解除控制，不解除反噬休息、毒、减益或禁复活。随后恢复最大气血的{healRatioPercent}%，受减疗与伤势上限约束。" }, { id: "dao_equipment.art.cuozhi", name: "一念成空", skillId: "dao_equipment.skill.cuozhi", rageCost: 40, target: "enemy", effect: { type: "rageDamage", amount: 70 }, description: "器意摄心，削减敌方单体{amount}点战意，最低降至0。" }, { id: "dao_equipment.art.hanyue", name: "巨力术", skillId: "dao_equipment.skill.hanyue", rageCost: 40, target: "ally", effect: { type: "status", statusId: "dao_equipment.status.hanyue", group: "dao_equipment.art.physical_up", modifier: "physicalDealt", ratio: 0.15, duration: "battle" }, description: "法宝结印，使己方单体造成的物理伤害结果提高{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.hanyueyin", name: "天罡助威", skillId: "dao_equipment.skill.hanyueyin", rageCost: 60, target: "allies", effect: { type: "status", statusId: "dao_equipment.status.hanyueyin", group: "dao_equipment.art.physical_up", modifier: "physicalDealt", ratio: 0.1, duration: "battle" }, description: "法宝结印，使己方全体在场单位造成的物理伤害结果提高{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.huti", name: "金甲术", skillId: "dao_equipment.skill.huti", rageCost: 40, target: "ally", effect: { type: "status", statusId: "dao_equipment.status.huti", group: "dao_equipment.art.physical_guard", modifier: "physicalTaken", ratio: -0.12, duration: "battle" }, description: "法宝结印，使己方单体受到的物理伤害结果降低{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.hutiyin", name: "金鳞护阵", skillId: "dao_equipment.skill.hutiyin", rageCost: 60, target: "allies", effect: { type: "status", statusId: "dao_equipment.status.hutiyin", group: "dao_equipment.art.physical_guard", modifier: "physicalTaken", ratio: -0.08, duration: "battle" }, description: "法宝结印，使己方全体在场单位受到的物理伤害结果降低{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.lianfeng", name: "镇岳印", skillId: "dao_equipment.skill.lianfeng", rageCost: 30, target: "enemy", effect: { type: "status", statusId: "dao_equipment.status.lianfeng", group: "dao_equipment.art.physical_down", modifier: "physicalDealt", ratio: -0.15, duration: "battle" }, description: "法宝结印，使敌方单体造成的物理伤害结果降低{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.lianfengyin", name: "消兵化锋", skillId: "dao_equipment.skill.lianfengyin", rageCost: 60, target: "enemies", effect: { type: "status", statusId: "dao_equipment.status.lianfengyin", group: "dao_equipment.art.physical_down", modifier: "physicalDealt", ratio: -0.1, duration: "battle" }, description: "法宝结印，使敌方全体在场单位造成的物理伤害结果降低{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.liejia", name: "裂甲诀", skillId: "dao_equipment.skill.liejia", rageCost: 35, target: "enemy", effect: { type: "status", statusId: "dao_equipment.status.liejia", group: "dao_equipment.art.physical_vulnerable", modifier: "physicalTaken", ratio: 0.12, duration: "battle" }, description: "法宝结印，使敌方单体受到的物理伤害结果提高{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.liejiayin", name: "裂甲术", skillId: "dao_equipment.skill.liejiayin", rageCost: 60, target: "enemies", effect: { type: "status", statusId: "dao_equipment.status.liejiayin", group: "dao_equipment.art.physical_vulnerable", modifier: "physicalTaken", ratio: 0.08, duration: "battle" }, description: "法宝结印，使敌方全体在场单位受到的物理伤害结果提高{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.xuanling", name: "两仪化法", skillId: "dao_equipment.skill.xuanling", rageCost: 60, target: "ally", effect: { type: "status", statusId: "dao_equipment.status.xuanling", group: "dao_equipment.art.spell_guard", modifier: "spellTaken", ratio: -0.5, duration: 5 }, description: "法宝结印，使己方单体受到的法术伤害结果降低{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.xuantian", name: "青莲庇世", skillId: "dao_equipment.skill.xuantian", rageCost: 150, target: "allies", effect: { type: "status", statusId: "dao_equipment.status.xuantian", group: "dao_equipment.art.spell_guard", modifier: "spellTaken", ratio: -0.5, duration: 3 }, description: "法宝结印，使己方全体在场单位受到的法术伤害结果降低{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.fuying", name: "凝滞术", skillId: "dao_equipment.skill.fuying", rageCost: 40, target: "enemy", effect: { type: "status", statusId: "dao_equipment.status.fuying", group: "dao_equipment.art.speed_down", modifier: "speed", ratio: -0.1, duration: "battle" }, description: "法宝结印，使敌方单体速度降低{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.fuyingyin", name: "元磁重域", skillId: "dao_equipment.skill.fuyingyin", rageCost: 60, target: "enemies", effect: { type: "status", statusId: "dao_equipment.status.fuyingyin", group: "dao_equipment.art.speed_down", modifier: "speed", ratio: -0.05, duration: "battle" }, description: "法宝结印，使敌方全体在场单位速度降低{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.yufeng", name: "御风诀", skillId: "dao_equipment.skill.yufeng", rageCost: 40, target: "ally", effect: { type: "status", statusId: "dao_equipment.status.yufeng", group: "dao_equipment.art.speed_up", modifier: "speed", ratio: 0.1, duration: "battle" }, description: "法宝结印，使己方单体速度提高{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.yufengyin", name: "御风术", skillId: "dao_equipment.skill.yufengyin", rageCost: 60, target: "allies", effect: { type: "status", statusId: "dao_equipment.status.yufengyin", group: "dao_equipment.art.speed_up", modifier: "speed", ratio: 0.05, duration: "battle" }, description: "法宝结印，使己方全体在场单位速度提高{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.lingyan", name: "青冥一气", skillId: "dao_equipment.skill.lingyan", rageCost: 40, target: "ally", effect: { type: "status", statusId: "dao_equipment.status.lingyan", group: "dao_equipment.art.spell_up", modifier: "spellDealt", ratio: 0.1, duration: "battle" }, description: "法宝结印，使己方单体造成的法术伤害结果提高{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.jifa", name: "抑灵咒", skillId: "dao_equipment.skill.jifa", rageCost: 30, target: "enemy", effect: { type: "status", statusId: "dao_equipment.status.jifa", group: "dao_equipment.art.spell_down", modifier: "spellDealt", ratio: -0.1, duration: "battle" }, description: "法宝结印，使敌方单体造成的法术伤害结果降低{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.kurong", name: "蚀灵咒", skillId: "dao_equipment.skill.kurong", rageCost: 125, target: "enemies", effect: { type: "status", statusId: "dao_equipment.status.kurong", group: "dao_equipment.art.healing_down", modifier: "healTaken", ratio: -0.5, duration: 3 }, description: "法宝结印，使敌方全体在场单位受到的治疗降低{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.diefeng", name: "双剑合璧", skillId: "dao_equipment.skill.diefeng", rageCost: 80, target: "enemy", effect: { type: "attack", kind: "physical", resultFactors: [1, 1] }, description: "器锋叠起，对敌方单体连续{hits}次物理攻击，每段伤害结果依次为{segments}；目标倒地则停止，不转移目标。" }, { id: "dao_equipment.art.sandie", name: "三叠仙音", skillId: "dao_equipment.skill.sandie", rageCost: 60, target: "enemy", effect: { type: "attack", kind: "spell", resultFactors: [0.3, 0.5, 1] }, description: "法宝鸣动三叠仙音，对敌方单体连续{hits}次法术攻击，每段伤害结果依次为{segments}；目标倒地则停止，不转移目标。" }, { id: "dao_equipment.art.juling", name: "聚灵诀", skillId: "dao_equipment.skill.juling", rageCost: 60, target: "self", effect: { type: "restoreMp", ratio: 0.1, casterLevelFactor: 3 }, description: "法宝聚拢灵息，为自身恢复最大法力的{ratioPercent}%加自身境界映射等级×{casterLevelFactor}点法力，不超过法力上限。" }, { id: "dao_equipment.art.wanxiang", name: "万象归灵", skillId: "dao_equipment.skill.wanxiang", rageCost: 150, target: "allies", effect: { type: "restoreMp", ratio: 0.1, casterLevelFactor: 1, capPerLevel: 10 }, description: "灵息遍照己方全体在场单位，每位恢复其最大法力的{ratioPercent}%加施法者境界映射等级×{casterLevelFactor}点法力；每位至多恢复其境界映射等级×{capPerLevel}点。" }, { id: "dao_equipment.art.zebei", name: "玉露回春", skillId: "dao_equipment.skill.zebei", rageCost: 135, target: "allies", effect: { type: "heal", ratio: 0.25, capPerLevel: 12 }, description: "生机泽被己方全体在场单位，每位恢复最大气血的{ratioPercent}%，基础回复不超过目标境界映射等级×{capPerLevel}；受减疗、禁止回复与伤势上限约束，不修复伤势。" }, { id: "dao_equipment.art.niming", name: "逆命诀", skillId: "dao_equipment.skill.niming", rageCost: 120, target: "ally", effect: { type: "revive", hpRatio: 0.5, capPerLevel: 20 }, description: "牵引命火，复起己方单体并恢复最大气血的{hpRatioPercent}%，基础回复不超过目标境界映射等级×{capPerLevel}；受禁复活、禁止回复、减疗与伤势上限约束。" }, { id: "dao_equipment.art.due", name: "渡厄归生", skillId: "dao_equipment.skill.due", rageCost: 150, target: "allies", effect: { type: "massRevive", hpRatio: 1, remainingHpRatio: 0.1, remainingMpRatio: 0 }, description: "复起己方全部在场倒地单位，按最大气血的{hpRatioPercent}%恢复，受减疗与伤势上限约束；跳过禁复活或禁止回复者，不治疗存活队友。自身气血须高于上限的{remainingHpRatioPercent}%，发动后降至该比例，法力降至上限的{remainingMpRatioPercent}%。无可复活目标时不发动，不扣战意或自损。" }, { id: "dao_equipment.art.dongxu", name: "洞金指", skillId: "dao_equipment.skill.dongxu", rageCost: 50, target: "enemy", effect: { type: "attack", kind: "physical", resultFactors: [1], defenseIgnore: 0.3 }, description: "洞穿护体，对敌方单体进行{hits}次物理攻击，忽视目标{defenseIgnorePercent}%物防。不附加重伤。" }, { id: "dao_equipment.art.cuiling", name: "摧灵斩", skillId: "dao_equipment.skill.cuiling", rageCost: 80, target: "enemy", effect: { type: "attack", kind: "physical", resultFactors: [1], mpDamageRatio: 1 }, description: "器锋摧灵，对敌方单体进行{hits}次物理攻击，并按本次实际气血损失的{mpDamageRatioPercent}%削减其法力；护盾吸收与溢出伤害不计，法力最低降至0。" }, { id: "dao_equipment.art.dangchen", name: "荡尘咒", skillId: "dao_equipment.skill.dangchen", rageCost: 125, target: "enemies", effect: { type: "dispelBuff", chance: 0.8, artChance: 0.2 }, description: "涤荡敌方全体在场单位的可驱散增益，每条独立判定：普通增益{chancePercent}%概率、器诀增益{artChancePercent}%概率移除。不影响被动与不可驱散状态。" }], rageResource: { name: "战意", initial: 0, maximum: 150 }, rageGain: { damagePercentScale: 100 } };
var Ln = { spellFluctuationMin: 0.95, spellFluctuationMax: 1.05, physicalFluctuationMin: 0.9, physicalFluctuationMax: 1.1, critMultiplier: 2, physicalFuryAtkMultiplier: 1.5, defendPhysicalFactor: 0.5, physicalCoefficient: 1.3, playerSpellAttackScale: 1.7, unbrokenDefRatio: 0.9, unbrokenAtkRatio: 0.1, cultivateRate: 0.02, cultivateFlat: 5, damageCultivateDiffMin: -20, damageCultivateDiffMax: 20, hitChanceFloor: 0.45, hitChanceCeil: 1, hitChanceBase: 0.5, hitChanceScale: 200, physicalHitBaselineGap: 80, physicalHitScalePerLevel: 4, sealChanceFloor: 0.2, sealChanceCeil: 0.95, sealChanceBase: 0.55, sealSoftFloorStart: 30, sealSoftCeilStart: 75, sealLevelWeight: 1, sealCultivateWeight: 18, sealCultivateScale: 15, sealPointScalePerLevel: 4, fleeChanceFloor: 0.1, fleeChanceCeil: 0.9, fleeChanceBase: 0.4, minDamage: 1, maxRounds: 150 };
exports.fc = Ln;
var k = "combat.resource.rage";
exports.gc = k;
var Ye = { Base: "dao_equipment.passive.rage_gain", Excited: "dao_equipment.passive.rage_gain_excited" };
function kn(r) {
    let { effect: e, ...n } = r, d = {};
    for (let [i, t] of Object.entries(e)) {
        if (typeof t !== "number")
            continue;
        d[i] = t, d[`${i}Abs`] = Math.abs(t), d[`${i}Percent`] = Number((t * 100).toFixed(6));
    }
    let m = { ...n, description: r.description.replace(/\{(\w+)\}/g, (i, t) => {
            if (!(t in d))
                throw Error(`${r.id}: 未知文案参数 ${t}`);
            return String(d[t]);
        }) }, a = { id: `${r.id}.passive`, name: r.name, tags: [official_chunk_wje6zqc2_js_1.Qe.Passive], targeting: { side: official_chunk_wje6zqc2_js_1.Re.Self }, effects: [] };
    switch (e.type) {
        case "panelAdd": return { ...m, panel: [{ attr: e.attribute, mode: "add", value: e.value }] };
        case "requiredStageOffset": return { ...m, requiredStageOffset: e.value };
        case "sealChance": return { ...m, panel: [{ attr: e.side === "hit" ? "sealHit" : "sealResist", mode: "add", value: e.value * Ln.hitChanceScale }] };
        case "antiCrit":
        case "defenseIgnore": return { ...m, passive: { ...a, hooks: [{ on: e.type === "antiCrit" ? official_chunk_wje6zqc2_js_1.Ve.OnCritRoll : official_chunk_wje6zqc2_js_1.Ve.OnDefenseIgnoreCalc, ...e.type === "antiCrit" ? { targetIsSelf: !0 } : { sourceIsSelf: !0 }, requireKind: e.kind === "physical" ? official_chunk_wje6zqc2_js_1.Ne.Physical : official_chunk_wje6zqc2_js_1.Ne.Spell, effects: [{ type: e.type === "antiCrit" ? official_chunk_wje6zqc2_js_1._e.ModifyChance : official_chunk_wje6zqc2_js_1._e.ModifyDefenseIgnore, add: e.type === "antiCrit" ? -e.value : e.value }] }] } };
        case "mpWaiver": return { ...m, passive: { ...a, innate: { mpCostWaiverChance: e.chance } } };
        case "regeneration": return { ...m, passive: { ...a, hooks: [{ on: official_chunk_wje6zqc2_js_1.Ve.OnRoundEnd, aim: official_chunk_wje6zqc2_js_1.We.Self, when: { sourceStanding: !0 }, effects: [{ type: official_chunk_wje6zqc2_js_1._e.RestoreHp, power: `floor(source.level * ${e.levelRatio})` }] }] } };
        case "revival": return { ...m, passive: { ...a, hooks: [{ on: official_chunk_wje6zqc2_js_1.Ve.OnFatal, targetIsSelf: !0, aim: official_chunk_wje6zqc2_js_1.We.Self, when: { sourceHpRatioBelow: 0.000001 }, chance: e.chance, effects: [{ type: official_chunk_wje6zqc2_js_1._e.Revive, hpRatio: e.hpRatio }] }] } };
        case "rageGain": return { ...m, resourceGainFactors: { [k]: e.factor } };
        case "rageCost": return { ...m, resourceCostFactors: { [k]: e.factor } };
    }
}
function En(r) {
    let { effect: e } = r, n = {};
    for (let [o, h] of Object.entries(e))
        if (typeof h === "number")
            n[o] = h, n[`${o}Percent`] = Number((Math.abs(h) * 100).toFixed(6));
    if (e.type === "attack")
        n.hits = e.resultFactors.length;
    if (e.type === "attack")
        n.segments = e.resultFactors.map((o) => `${Number((o * 100).toFixed(6))}%`).join("、");
    if (e.type === "status")
        n.term = e.duration === "battle" ? "持续至战斗结束，倒地清除" : `持续${e.duration}回合（含施放回合）`;
    let d = r.description.replace(/\{(\w+)\}/g, (o, h) => {
        if (!(h in n))
            throw Error(`${r.id}: 未知文案参数 ${h}`);
        return String(n[h]);
    }), m = r.target === "self" ? official_chunk_wje6zqc2_js_1.Re.Self : ["ally", "allies"].includes(r.target) ? official_chunk_wje6zqc2_js_1.Re.Ally : official_chunk_wje6zqc2_js_1.Re.Enemy, a = { id: r.skillId, name: r.name, resourceCosts: [{ resourceId: k, amount: r.rageCost }], tags: [official_chunk_wje6zqc2_js_1.Qe.Art, official_chunk_wje6zqc2_js_1.Qe.Support], targeting: { side: m, ...["allies", "enemies"].includes(r.target) ? { mode: official_chunk_wje6zqc2_js_1.Se.All } : { count: 1 } }, effects: [] }, i, t = (o, h) => h === void 0 ? o : `min(${o}, target.level * ${h})`;
    switch (e.type) {
        case "heal":
            a.effects = [{ type: official_chunk_wje6zqc2_js_1._e.Heal, power: t(`target.maxHp * ${e.ratio}`, e.capPerLevel), fixedBase: !0 }];
            break;
        case "revive":
            a.targeting.includeDowned = !0, a.targeting.includeDead = !0, a.targeting.onlyDowned = !0, a.effects = [{ type: official_chunk_wje6zqc2_js_1._e.Revive, ...e.capPerLevel === void 0 ? { hpRatio: e.hpRatio } : { hp: t(`target.maxHp * ${e.hpRatio}`, e.capPerLevel) }, respectHealTaken: !0 }];
            break;
        case "restoreMp":
            a.effects = [{ type: official_chunk_wje6zqc2_js_1._e.RestoreMp, power: t(`target.maxMp * ${e.ratio} + source.level * ${e.casterLevelFactor}`, e.capPerLevel) }];
            break;
        case "massRevive":
            a.targeting = { ...a.targeting, includeDowned: !0, includeDead: !0, onlyDowned: !0, requireRevivable: !0 }, a.requireHpAboveRatio = e.remainingHpRatio, a.effects = [{ type: official_chunk_wje6zqc2_js_1._e.Revive, hpRatio: e.hpRatio, respectHealTaken: !0 }], a.successCostHp = `source.hp - floor(source.maxHp * ${e.remainingHpRatio})`, a.successCostMp = `source.mp - floor(source.maxMp * ${e.remainingMpRatio})`;
            break;
        case "dispelBuff":
            a.effects = [{ type: official_chunk_wje6zqc2_js_1._e.Dispel, categories: [official_chunk_wje6zqc2_js_1.Ue.Buff], chance: e.chance, chanceByClass: { art: e.artChance } }];
            break;
        case "cleanse":
            if (a.effects = [{ type: official_chunk_wje6zqc2_js_1._e.Dispel, kinds: e.kinds, excludeStatusFlags: ["blocksRevive"] }], e.healRatio > 0)
                a.effects.push({ type: official_chunk_wje6zqc2_js_1._e.Heal, power: `target.maxHp * ${e.healRatio}`, fixedBase: !0 });
            break;
        case "rageDamage":
            a.effects = [{ type: official_chunk_wje6zqc2_js_1._e.ModifyResource, resourceId: k, amount: -e.amount, affectTarget: !0 }];
            break;
        case "status": {
            let o = {}, h = Number((1 + e.ratio).toFixed(6));
            switch (e.modifier) {
                case "physicalDealt":
                    o.damageDealtPhysical = h;
                    break;
                case "spellDealt":
                    o.damageDealtSpell = h;
                    break;
                case "physicalTaken":
                    o.damageTakenPhysical = h;
                    break;
                case "spellTaken":
                    o.damageTakenSpell = h;
                    break;
                case "healTaken":
                    o.healTaken = h;
                    break;
                case "speed":
                    o.speedMod = `floor(target.speed * ${e.ratio})`;
                    break;
            }
            i = [{ id: e.statusId, name: r.name, kind: e.group, category: m === official_chunk_wje6zqc2_js_1.Re.Enemy ? official_chunk_wje6zqc2_js_1.Ue.Debuff : official_chunk_wje6zqc2_js_1.Ue.Buff, dispelClass: "art", priority: Math.abs(e.ratio), untilBattleEnd: e.duration === "battle", expireSameRound: !0, extendable: !1, ...o }], a.effects = [{ type: official_chunk_wje6zqc2_js_1._e.ApplyStatus, statusId: e.statusId, duration: e.duration === "battle" ? 1 : e.duration }];
            break;
        }
        case "attack":
            a.tags = [official_chunk_wje6zqc2_js_1.Qe.Art, e.kind === "physical" ? official_chunk_wje6zqc2_js_1.Qe.Physical : official_chunk_wje6zqc2_js_1.Qe.Spell], a.effects = [{ type: e.kind === "physical" ? official_chunk_wje6zqc2_js_1._e.PhysicalHit : official_chunk_wje6zqc2_js_1._e.SpellHit, hits: e.resultFactors.length, resultFactors: e.resultFactors, ...e.defenseIgnore === void 0 ? {} : { defenseIgnore: e.defenseIgnore }, ...e.kind === "physical" && e.mpDamageRatio !== void 0 ? { mpDamageRatio: e.mpDamageRatio } : {} }];
            break;
    }
    return { id: r.id, name: r.name, description: d, ...r.allowedSlots ? { allowedSlots: r.allowedSlots } : {}, rageCost: r.rageCost, skill: a, ...i ? { statusDefs: i } : {} };
}
function fn(r, e) { let n = r > 1; return { id: n ? Ye.Excited : Ye.Base, name: n ? "激昂战意" : "战意积蓄", tags: [official_chunk_wje6zqc2_js_1.Qe.Passive], targeting: { side: official_chunk_wje6zqc2_js_1.Re.Self }, effects: [], hooks: [{ on: official_chunk_wje6zqc2_js_1.Ve.OnBeHit, targetIsSelf: !0, aim: official_chunk_wje6zqc2_js_1.We.Self, effects: [{ type: official_chunk_wje6zqc2_js_1._e.ModifyResource, resourceId: k, amount: `min(100, floor(floor(hpDamage / target.maxHp * ${e.damagePercentScale}) * ${r}))` }] }] }; }
const zod_13 = require("./zod.js");
var w = zod_13.z.number().min(0).max(1).multipleOf(0.000001), Ar = zod_13.z.number().positive().max(1e6).multipleOf(0.000001), Vr = zod_13.z.string().trim().min(1), Sn = zod_13.z.array(zod_13.z.enum(F)).min(1).optional(), ua = zod_13.z.discriminatedUnion("type", [zod_13.z.strictObject({ type: zod_13.z.literal("panelAdd"), attribute: zod_13.z.enum(["physicalAtk", "physicalDef", "magicAtk", "magicDef", "maxHp", "maxMp", "healPower", "speed", "hit", "dodge", "critRate", "spellCritRate", "physicalFuryRate", "sealHit", "sealResist"]), value: zod_13.z.number().min(-1e6).max(1e6) }), zod_13.z.strictObject({ type: zod_13.z.literal("requiredStageOffset"), value: zod_13.z.number().int().min(-1).max(0) }), zod_13.z.strictObject({ type: zod_13.z.literal("rageGain"), factor: zod_13.z.number().min(1).max(100).multipleOf(0.000001) }), zod_13.z.strictObject({ type: zod_13.z.literal("rageCost"), factor: w.positive() }), zod_13.z.strictObject({ type: zod_13.z.literal("sealChance"), side: zod_13.z.enum(["hit", "resist"]), value: w }), zod_13.z.strictObject({ type: zod_13.z.literal("antiCrit"), kind: zod_13.z.enum(["physical", "spell"]), value: w }), zod_13.z.strictObject({ type: zod_13.z.literal("defenseIgnore"), kind: zod_13.z.enum(["physical", "spell"]), value: w }), zod_13.z.strictObject({ type: zod_13.z.literal("mpWaiver"), chance: w }), zod_13.z.strictObject({ type: zod_13.z.literal("regeneration"), levelRatio: w }), zod_13.z.strictObject({ type: zod_13.z.literal("revival"), chance: w, hpRatio: w.positive() })]), pa = zod_13.z.discriminatedUnion("type", [zod_13.z.strictObject({ type: zod_13.z.literal("heal"), ratio: w, capPerLevel: Ar.optional() }), zod_13.z.strictObject({ type: zod_13.z.literal("revive"), hpRatio: w.positive(), capPerLevel: Ar.optional() }), zod_13.z.strictObject({ type: zod_13.z.literal("cleanse"), kinds: zod_13.z.array(Vr).min(1), healRatio: w }), zod_13.z.strictObject({ type: zod_13.z.literal("rageDamage"), amount: Ar.int() }), zod_13.z.strictObject({ type: zod_13.z.literal("status"), statusId: zod_13.z.string().regex(/^dao_equipment\.status\.[a-z][a-z0-9_]*$/), group: Vr, modifier: zod_13.z.enum(["physicalDealt", "spellDealt", "physicalTaken", "spellTaken", "speed", "healTaken"]), ratio: zod_13.z.number().min(-1).max(1).multipleOf(0.000001), duration: zod_13.z.union([zod_13.z.literal("battle"), zod_13.z.number().int().min(1).max(99)]) }), zod_13.z.strictObject({ type: zod_13.z.literal("restoreMp"), ratio: w, casterLevelFactor: Ar, capPerLevel: Ar.optional() }), zod_13.z.strictObject({ type: zod_13.z.literal("massRevive"), hpRatio: w.positive(), remainingHpRatio: w.positive(), remainingMpRatio: w }), zod_13.z.strictObject({ type: zod_13.z.literal("dispelBuff"), chance: w, artChance: w }), zod_13.z.strictObject({ type: zod_13.z.literal("attack"), kind: zod_13.z.enum(["physical", "spell"]), resultFactors: zod_13.z.array(w.positive()).min(1).max(10), defenseIgnore: w.optional(), mpDamageRatio: Ar.optional() })]), qa = zod_13.z.strictObject({ $schema: zod_13.z.string().optional(), formatVersion: zod_13.z.literal(1), contentRevision: zod_13.z.number().int().positive(), essences: zod_13.z.array(zod_13.z.strictObject({ id: zod_13.z.string().regex(/^dao_equipment\.essence\.[a-z][a-z0-9_]*$/), name: Vr, description: Vr, allowedSlots: Sn, stackPolicy: zod_13.z.enum(["stack", "unique", "highest"]), conflictGroup: Vr.optional(), effect: ua })).min(1), arts: zod_13.z.array(zod_13.z.strictObject({ id: zod_13.z.string().regex(/^dao_equipment\.art\.[a-z][a-z0-9_]*$/), name: Vr, allowedSlots: Sn, skillId: zod_13.z.string().regex(/^dao_equipment\.skill\.[a-z][a-z0-9_]*$/), description: Vr, target: zod_13.z.enum(["self", "ally", "allies", "enemy", "enemies"]), rageCost: zod_13.z.number().int().min(0).max(1e6), effect: pa })).min(1), rageResource: zod_13.z.strictObject({ name: Vr, initial: zod_13.z.number().int().nonnegative(), maximum: Ar.int() }), rageGain: zod_13.z.strictObject({ damagePercentScale: Ar }) }), Pa = qa.superRefine((r, e) => {
    let n = new Set, d = (m, a) => {
        if (n.has(m))
            e.addIssue({ code: "custom", path: a, message: `ID 重复：${m}` });
        n.add(m);
    };
    for (let m of ["essences", "arts"])
        r[m].forEach((a, i) => {
            if (d(a.id, [m, i, "id"]), a.allowedSlots && new Set(a.allowedSlots).size !== a.allowedSlots.length)
                e.addIssue({ code: "custom", path: [m, i, "allowedSlots"], message: "部位不得重复" });
        });
    if (r.arts.forEach((m, a) => {
        if (d(m.skillId, ["arts", a, "skillId"]), m.effect.type === "status")
            d(m.effect.statusId, ["arts", a, "effect", "statusId"]);
        if (m.effect.type === "cleanse" && new Set(m.effect.kinds).size !== m.effect.kinds.length)
            e.addIssue({ code: "custom", path: ["arts", a, "effect", "kinds"], message: "解控类别不得重复" });
        let i = ["self", "ally", "allies"].includes(m.target);
        if (["heal", "revive", "cleanse", "restoreMp", "massRevive"].includes(m.effect.type) && !i || ["rageDamage", "attack"].includes(m.effect.type) && m.target !== "enemy" || m.effect.type === "revive" && m.target !== "ally" || m.effect.type === "massRevive" && m.target !== "allies" || m.effect.type === "dispelBuff" && m.target !== "enemies" || m.effect.type === "attack" && m.effect.mpDamageRatio !== void 0 && m.effect.kind !== "physical")
            e.addIssue({ code: "custom", path: ["arts", a, "target"], message: "效果与目标范围不匹配" });
    }), r.rageResource.initial > r.rageResource.maximum)
        e.addIssue({ code: "custom", path: ["rageResource", "initial"], message: "初始战意不得超过上限" });
});
function Tn(r) {
    let e = Pa.safeParse(r);
    if (e.success)
        return e.data;
    throw Error(e.error.issues.map((n) => {
        let d = r;
        for (let a of n.path.slice(0, 2))
            d = d && typeof d === "object" ? Reflect.get(d, a) : void 0;
        return `equipment-special.json${d && typeof d === "object" && "id" in d ? ` [${String(d.id)}]` : ""} ${n.path.join(".")}: ${n.message}`;
    }).join(`
`));
}
var Fr = Tn(cn), bh = { id: k, name: Fr.rageResource.name, current: Fr.rageResource.initial, max: Fr.rageResource.maximum }, Br = Fr.essences.map(kn), xr = Fr.arts.map(En);
exports.ic = bh;
exports.jc = xr;
function x0(r) { return fn(r, Fr.rageGain); }
var zn = Un(In, { essences: Br, arts: xr }), s0 = zn.generation, Lh = zn.forging;
exports.Od = Lh;
function ga(r) {
    let [e, n] = s0.essenceCountProbabilities;
    if (r < e)
        return 0;
    if (r < e + n)
        return 1;
    return 2;
}
var ja = { essenceCount: ga, artChance: s0.artChance };
const zod_14 = require("./zod.js");
var R0 = 60, ao = zod_14.z.string().trim().max(R0 * 2).refine((r) => Array.from(r).length <= R0, `铸器心念不能超过${R0}字`), D0 = zod_14.z.string().regex(/^(?:[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B[\uDFE2\uDFE3\uDFF0-\uDFF6]|[\uD840-\uD868\uD86A-\uD86D\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD88C][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86E[\uDC00-\uDC1E\uDC20-\uDFFF]|\uD873[\uDC00-\uDEAD\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD88D[\uDC00-\uDC79]){2,8}$/, "器名须为2至8个汉字").refine((r) => r.trim() === r, "器名不能含首尾空白"), ie = zod_14.z.string().regex(/^(?:[ -;=\?-~\xA0-\xAC\xAE-\u05FF\u0606-\u061B\u061D-\u06DC\u06DE-\u070E\u0710-\u088F\u0892-\u08E1\u08E3-\u180D\u180F-\u200A\u2010-\u2027\u202F-\u205F\u2065\u2070-\uD7FF\uE000-\uFEFE\uFF00-\uFFF8\uFFFC-\uFFFF]|[\uD800-\uD803\uD805-\uD80C\uD80E-\uD82E\uD830-\uD833\uD835-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD804[\uDC00-\uDCBC\uDCBE-\uDCCC\uDCCE-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC40-\uDFFF]|\uD82F[\uDC00-\uDC9F\uDCA4-\uDFFF]|\uD834[\uDC00-\uDD72\uDD7B-\uDFFF]|\uDB40[\uDC00\uDC02-\uDC1F\uDC80-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){1,60}$/, "器物描述须为60字以内的单行纯文本").refine((r) => r.trim() === r && r.length > 0, "描述不能留空或含首尾空白"), Je = zod_14.z.string().min(1).max(100), io = zod_14.z.object({ name: D0, desc: ie }).strict();
exports.Pd = R0;
const zod_15 = require("./zod.js");
var rd = zod_15.z.strictObject({ patternId: zod_15.z.string().min(1), level: zod_15.z.number().int().positive() }).nullable(), $0 = zod_15.z.tuple([rd, rd]), va = [{ equipmentLevel: 10, maxLevel: 3 }, { equipmentLevel: 30, maxLevel: 5 }, { equipmentLevel: 50, maxLevel: 7 }, { equipmentLevel: 70, maxLevel: 9 }, { equipmentLevel: 90, maxLevel: 11 }];
function Ir(r) { var _a, _f; return (_f = (_a = va.find((e) => e.equipmentLevel === r)) === null || _a === void 0 ? void 0 : _a.maxLevel) !== null && _f !== void 0 ? _f : 0; }
function We(r) {
    let e = $0.safeParse(r.formationInscriptions);
    if (!e.success)
        return e.error.issues.map((m) => ({ severity: "error", code: m.path[m.path.length - 1] === "level" ? "FORMATION_INSCRIPTION_LEVEL_INVALID" : "FORMATION_INSCRIPTION_SLOTS_INVALID", message: "阵纹须为固定双孔，空孔为 null，已烙印阵纹等级须为正整数", path: ["formationInscriptions", ...m.path].join(".") }));
    let n = [], d = Ir(r.equipmentLevel);
    return e.data.forEach((m, a) => {
        if (!m)
            return;
        let i = Or(m.patternId), t = `formationInscriptions.${a}`;
        if (!i)
            n.push({ severity: "error", code: "UNKNOWN_FORMATION_INSCRIPTION", message: "阵纹不存在", path: `${t}.patternId` });
        else if (!i.allowedSlots.includes(r.slot))
            n.push({ severity: "error", code: "FORMATION_INSCRIPTION_SLOT_MISMATCH", message: "阵纹不能烙印于该部位", path: `${t}.patternId` });
        if (m.level > d)
            n.push({ severity: "error", code: "FORMATION_INSCRIPTION_LEVEL_INVALID", message: `该装备每孔阵纹等级上限为 ${d}`, path: `${t}.level` });
    }), n;
}
function O0(r) {
    var _a, _f;
    let e = new Map;
    for (let n of (_a = r === null || r === void 0 ? void 0 : r.formationInscriptions) !== null && _a !== void 0 ? _a : []) {
        if (!n)
            continue;
        let d = Or(n.patternId);
        e.set(d.attr, ((_f = e.get(d.attr)) !== null && _f !== void 0 ? _f : 0) + d.valuePerLevel * n.level);
    }
    return [...e].map(([n, d]) => ({ attr: n, value: d }));
}
var xa = ["vitality", "strength", "spirit", "endurance", "speed", "willpower"], sa = new Set(["physicalAtk", "physicalDef", "magicAtk", "magicDef", "maxHp", "maxMp", "healPower", "speed", "hit", "dodge", "critRate", "spellCritRate", "physicalFuryRate", "sealHit", "sealResist"]), Ra = new Set(["quality", "rarity", "tierColor", "itemGrade", "powerScore", "equipmentRating", "battleProjection", "SkillDef", "tempering", "formationInscription"]);
function A(r, e, n) { return { severity: "error", code: r, message: e, ...n ? { path: n } : {} }; }
function ed(r, e, n) { return Number.isFinite(r) && Number.isInteger(r) && r >= e && r <= n; }
function Da(r, e) {
    var _a;
    let n = [], d = r, m = Ge(r);
    if (m)
        return [A("INVALID_EQUIPMENT_IDENTITY", m, "weaponType")];
    for (let i of Object.keys(d))
        if (Ra.has(i))
            n.push(A("FORBIDDEN_EQUIPMENT_FIELD", `道装禁止字段 ${i}`, i));
    if (d.schemaVersion !== 1 || r.numericVersion !== 2 || !Number.isFinite(r.baseQuality) || r.baseQuality < 0 || r.baseQuality > 1 || typeof r.id !== "string" || r.id.trim().length === 0 || typeof r.name !== "string" || r.name.trim().length === 0 || r.desc !== void 0 && !ie.safeParse(r.desc).success || r.crafterName !== void 0 && !Je.safeParse(r.crafterName).success || r.element !== void 0 && !official_chunk_wje6zqc2_js_1.hf.includes(r.element) || (r.generatorVersion === ee || r.generatorVersion === ne) && r.element === void 0 || typeof r.createdAt !== "string" || r.createdAt.trim().length === 0 || (!e ? r.generatorVersion !== br : r.generatorVersion !== br && r.generatorVersion !== Be && r.generatorVersion !== o0 && r.generatorVersion !== ee && r.generatorVersion !== ne) || r.appraisalState !== "appraised")
        n.push(A("INVALID_EQUIPMENT_IDENTITY", "道装身份、版本或鉴定状态无效"));
    let a = Qe(r.templateId);
    if (!a)
        n.push(A("UNKNOWN_EQUIPMENT_TEMPLATE", "道装模板不存在", "templateId"));
    if (!re(r.equipmentLevel) || r.requiredLevel !== Ve(r.equipmentLevel).requiredLevel)
        n.push(A("INVALID_EQUIPMENT_LEVEL", "道装仅开放至化神期，御使门槛须为对应境界初期"));
    if (a && (r.slot !== a.slot || (r.generatorVersion === o0 || r.generatorVersion === ee || r.generatorVersion === ne ? !D0.safeParse(r.name).success : r.name !== a.name)))
        n.push(A("EQUIPMENT_SLOT_MISMATCH", "道装部位或名称无效", "slot"));
    if (!Array.isArray(r.baseStats))
        n.push(A("INVALID_EQUIPMENT_BASE_STAT", "器胚属性必须是数组", "baseStats"));
    else if (a && re(r.equipmentLevel)) {
        let i = a.baseStats.map((o) => o.attr), t = r.baseStats.map((o) => o === null || o === void 0 ? void 0 : o.attr);
        if (t.length !== i.length || new Set(t).size !== t.length || t.some((o) => !i.includes(o)))
            n.push(A("INVALID_EQUIPMENT_BASE_STAT", "器胚字段必须与模板集合完全一致且不得重复", "baseStats"));
        for (let o = 0; o < a.baseStats.length; o += 1) {
            let h = a.baseStats[o], P = r.baseStats.find((s) => (s === null || s === void 0 ? void 0 : s.attr) === h.attr), { min: j, max: g } = g0(h, r.equipmentLevel, (_a = r.baseQuality) !== null && _a !== void 0 ? _a : 0, me(r));
            if (!P || P.attr !== h.attr || !ed(P.value, j, g))
                n.push(A("INVALID_EQUIPMENT_BASE_STAT", `${h.attr} 必须位于 ${j}～${g}`, `baseStats.${o}`));
        }
    }
    if (!Array.isArray(r.attributeBonuses) || r.attributeBonuses.length > 2 || r.slot !== "weapon" && r.slot !== "armor" && r.attributeBonuses.length > 0)
        n.push(A("INVALID_EQUIPMENT_ATTRIBUTE_BONUS", "仅法兵与法衣可附灵，最多2条", "attributeBonuses"));
    else if (re(r.equipmentLevel)) {
        let { min: i, max: t } = P0(r.equipmentLevel), o = new Set;
        for (let h = 0; h < r.attributeBonuses.length; h += 1) {
            let P = r.attributeBonuses[h];
            if (!P || !xa.includes(P.attr) || o.has(P.attr) || !ed(P.value, i, t))
                n.push(A("INVALID_EQUIPMENT_ATTRIBUTE_BONUS", `附灵必须使用不重复六维且数值位于 ${i}～${t}`, `attributeBonuses.${h}`));
            if (P)
                o.add(P.attr);
        }
    }
    if (!Array.isArray(r.essenceIds) || r.essenceIds.length > 2 || new Set(r.essenceIds).size !== r.essenceIds.length)
        n.push(A("UNSUPPORTED_EQUIPMENT_CONTENT", "器蕴最多2个且不得重复", "essenceIds"));
    else if (!e && r.essenceIds.length > 0)
        n.push(A("UNSUPPORTED_EQUIPMENT_CONTENT", "Phase 4A 不投影器蕴", "essenceIds"));
    if (r.artId !== void 0) {
        if (typeof r.artId !== "string" || r.artId.trim().length === 0)
            n.push(A("UNSUPPORTED_EQUIPMENT_CONTENT", "器诀 ID 无效", "artId"));
        else if (!e)
            n.push(A("UNSUPPORTED_EQUIPMENT_CONTENT", "Phase 4A 不投影器诀", "artId"));
    }
    if (e && r.generatorVersion === br && (r.essenceIds.length > 0 || r.artId !== void 0))
        n.push(A("EQUIPMENT_SPECIAL_GENERATOR_MISMATCH", "v1 生成实例不得携带器蕴或器诀"));
    return n.push(...We(r)), n;
}
function $a() { return { vitality: 0, strength: 0, spirit: 0, endurance: 0, speed: 0, willpower: 0 }; }
function A0(r, e) { var _a; r.set(e.attr, ((_a = r.get(e.attr)) !== null && _a !== void 0 ? _a : 0) + e.value); }
function nd(r, e, n) { return { severity: "warning", code: r, message: e, ...n ? { path: n } : {} }; }
function Oa(r, e, n = {}) {
    var _a, _f, _g, _h, _j, _k, _l, _o, _p;
    let d = (_a = n.essenceDefs) !== null && _a !== void 0 ? _a : Br, m = (_f = n.artDefs) !== null && _f !== void 0 ? _f : xr, a = new Map(d.map((l) => [l.id, l])), i = new Map(m.map((l) => [l.id, l])), t = [], o = $a(), h = new Map, P = new Set;
    for (let l of Object.keys(r))
        if (!F.includes(l))
            t.push(A("EQUIPMENT_SLOT_MISMATCH", `未知装配槽 ${l}`, l));
    let j = {}, g = [], s = [];
    for (let l of F) {
        let p = r[l];
        if (!p)
            continue;
        if (t.push(...Da(p, !0).map((E) => ({ ...E, path: E.path ? `${l}.${E.path}` : l }))), p.slot !== l)
            t.push(A("EQUIPMENT_SLOT_MISMATCH", "实例自身部位与装配槽不一致", l));
        if (P.has(p.id))
            t.push(A("DUPLICATE_EQUIPMENT_INSTANCE", "同一道装实例不能占据多个槽位", l));
        P.add(p.id);
        let W = B0(p, d);
        if (j[l] = W, !Number.isFinite(e) || e < W)
            t.push(A("EQUIPMENT_LEVEL_REQUIREMENT", `人物境界不足以御使 ${p.name}`, l));
        for (let E of p.essenceIds) {
            let De = a.get(E);
            if (!De)
                t.push(A("UNKNOWN_EQUIPMENT_ESSENCE", `未知器蕴 ${E}`, `${l}.essenceIds`));
            else if (De.allowedSlots && !De.allowedSlots.includes(l))
                t.push(A("EQUIPMENT_SPECIAL_SLOT_MISMATCH", `${De.name} 不能出现在该部位`, `${l}.essenceIds`));
            g.push({ id: E, slot: l });
        }
        if (p.artId) {
            let E = i.get(p.artId);
            if (!E)
                t.push(A("UNKNOWN_EQUIPMENT_ART", `未知器诀 ${p.artId}`, `${l}.artId`));
            else if (E.allowedSlots && !E.allowedSlots.includes(l))
                t.push(A("EQUIPMENT_SPECIAL_SLOT_MISMATCH", `${E.name} 不能出现在该部位`, `${l}.artId`));
            s.push({ id: p.artId, slot: l });
        }
    }
    let V = d.some((l) => { var _a, _f, _g, _h, _j; return !((_a = l.id) === null || _a === void 0 ? void 0 : _a.trim()) || !((_f = l.name) === null || _f === void 0 ? void 0 : _f.trim()) || !["stack", "unique", "highest"].includes(l.stackPolicy) || ((_g = l.panel) !== null && _g !== void 0 ? _g : []).some((p) => p.mode !== "add" || !sa.has(p.attr) || !Number.isFinite(p.value)) || Object.values((_h = l.resourceGainFactors) !== null && _h !== void 0 ? _h : {}).some((p) => !Number.isFinite(p) || p <= 0) || Object.values((_j = l.resourceCostFactors) !== null && _j !== void 0 ? _j : {}).some((p) => !Number.isFinite(p) || p <= 0); }), or = m.some((l) => { var _a, _f, _g, _h, _j, _k; return !((_a = l.id) === null || _a === void 0 ? void 0 : _a.trim()) || !((_f = l.name) === null || _f === void 0 ? void 0 : _f.trim()) || !Number.isFinite(l.rageCost) || l.rageCost < 0 || !((_g = l.skill) === null || _g === void 0 ? void 0 : _g.id) || ((_h = l.skill.resourceCosts) === null || _h === void 0 ? void 0 : _h.length) !== 1 || ((_j = l.skill.resourceCosts[0]) === null || _j === void 0 ? void 0 : _j.resourceId) !== k || ((_k = l.skill.resourceCosts[0]) === null || _k === void 0 ? void 0 : _k.amount) !== l.rageCost; });
    if (V || or)
        t.push(A("EQUIPMENT_SPECIAL_CONTENT_INVALID", "器蕴或器诀定义无效"));
    let v = [...d.map((l) => l.id), ...m.map((l) => l.id), ...m.map((l) => l.skill.id), ...m.flatMap((l) => { var _a; return ((_a = l.statusDefs) !== null && _a !== void 0 ? _a : []).map((p) => p.id); }), k];
    if (new Set(v).size !== v.length)
        t.push(A("CONTENT_ID_CONFLICT", "道装特殊内容存在重复 ID"));
    let O = new Map;
    for (let l of g) {
        let p = a.get(l.id);
        if (!(p === null || p === void 0 ? void 0 : p.conflictGroup))
            continue;
        let W = (_g = O.get(p.conflictGroup)) !== null && _g !== void 0 ? _g : new Set;
        W.add(p.id), O.set(p.conflictGroup, W);
    }
    for (let [l, p] of O)
        if (p.size > 1)
            t.push(A("EQUIPMENT_ESSENCE_CONFLICT", `器蕴冲突组 ${l} 同时生效`));
    if (t.some((l) => l.severity === "error"))
        return { ok: !1, diagnostics: t };
    for (let l of F) {
        let p = r[l];
        if (!p)
            continue;
        for (let W of p.attributeBonuses)
            o[W.attr] += W.value;
        for (let W of p.baseStats)
            A0(h, W);
        for (let W of O0(p))
            A0(h, W);
    }
    let H = [], N = new Set, b = [], K = 1, L = 1;
    for (let l of g) {
        let p = a.get(l.id);
        if (p.stackPolicy !== "stack" && N.has(p.id)) {
            t.push(nd("EQUIPMENT_ESSENCE_DUPLICATE_IGNORED", `${p.name} 重复，仅生效一次`, l.slot));
            continue;
        }
        if (p.stackPolicy !== "stack")
            N.add(p.id);
        if (!H.includes(p.id))
            H.push(p.id);
        for (let W of (_h = p.panel) !== null && _h !== void 0 ? _h : [])
            if (W.mode === "add")
                A0(h, { attr: W.attr, value: W.value });
            else
                t.push(A("EQUIPMENT_SPECIAL_CONTENT_INVALID", "器蕴首版只允许固定面板加值"));
        if (p.passive)
            b.push({ ...p.passive, id: `${p.passive.id}.${l.slot}` });
        K = Math.max(K, (_k = (_j = p.resourceGainFactors) === null || _j === void 0 ? void 0 : _j[k]) !== null && _k !== void 0 ? _k : 1), L = Math.min(L, (_o = (_l = p.resourceCostFactors) === null || _l === void 0 ? void 0 : _l[k]) !== null && _o !== void 0 ? _o : 1);
    }
    if (t.some((l) => l.severity === "error"))
        return { ok: !1, diagnostics: t };
    let lr = [], jr = [], _r = [];
    for (let l of s) {
        let p = i.get(l.id);
        if (lr.includes(p.id)) {
            t.push(nd("EQUIPMENT_ART_DUPLICATE_IGNORED", `${p.name} 重复，仅授予一次`, l.slot));
            continue;
        }
        lr.push(p.id), jr.push(p.skill);
        for (let W of (_p = p.statusDefs) !== null && _p !== void 0 ? _p : [])
            if (!_r.some((E) => E.id === W.id))
                _r.push(W);
    }
    let se = L === 1 ? [] : jr.map((l) => { var _a, _f; return ({ ...l, originalResourceCosts: (_a = l.resourceCosts) === null || _a === void 0 ? void 0 : _a.map((p) => ({ ...p })), resourceCosts: (_f = l.resourceCosts) === null || _f === void 0 ? void 0 : _f.map((p) => p.resourceId === k ? { ...p, amount: Math.floor(Number(p.amount) * L) } : p) }); }), Re = x0(K);
    return { ok: !0, projection: { attributeBonuses: o, panel: [...h].map(([l, p]) => ({ attr: l, value: p })), diagnostics: t, effectiveEssenceIds: H, grantedArtIds: lr, skills: [...jr, ...b, Re], statusDefs: _r, passiveSkillIds: [...b.map((l) => l.id), Re.id], skillOverrides: se, effectiveRequiredLevels: j, rageGainFactor: K, rageCostFactor: L } };
}
function B0(r, e = Br) { let n = Math.min(0, ...r.essenceIds.map((d) => { var _a, _f; return (_f = (_a = e.find((m) => m.id === d)) === null || _a === void 0 ? void 0 : _a.requiredStageOffset) !== null && _f !== void 0 ? _f : 0; })); return Math.max(official_chunk_wje6zqc2_js_1.uf, Ve(r.equipmentLevel).requiredLevel + n * official_chunk_wje6zqc2_js_1.uf); }
var T = { vitality: "体魄", strength: "力道", spirit: "灵力", endurance: "根骨", speed: "身法", willpower: "神识" };
exports.Nb = T;
var Ur = { ...T, physicalAtk: "物攻", physicalDef: "物防", magicAtk: "法攻", magicDef: "法防", maxHp: "气血", maxMp: "法力", healPower: "治疗", speed: "速度", hit: "命中", dodge: "闪避", critRate: "暴击", spellCritRate: "法暴", physicalFuryRate: "物理狂暴", sealHit: "封印命中", sealResist: "封印抵抗" }, dd = zod_11.z.object({ attr: zod_11.z.enum(Object.keys(Ur)), value: zod_11.z.number().finite() }).strict(), te = zod_11.z.object({ schemaVersion: zod_11.z.literal(1), numericVersion: zod_11.z.literal(2), baseQuality: zod_11.z.number().min(0).max(1), id: zod_11.z.string().min(1), templateId: zod_11.z.string().min(1), name: zod_11.z.string().min(1).max(100), desc: ie.optional(), crafterName: Je.optional(), element: zod_11.z.enum(official_chunk_wje6zqc2_js_1.hf).optional(), slot: zod_11.z.enum(F), weaponType: zod_11.z.enum(Xe).optional(), equipmentLevel: zod_11.z.number().int().nonnegative(), requiredLevel: zod_11.z.number().int().nonnegative(), baseStats: zod_11.z.array(dd).max(20), attributeBonuses: zod_11.z.array(dd).max(20), essenceIds: zod_11.z.array(zod_11.z.string()).max(20), artId: zod_11.z.string().optional(), formationInscriptions: $0, appraisalState: zod_11.z.literal("appraised"), generatorVersion: zod_11.z.enum(["dao_equipment_generator_v1", "dao_equipment_generator_v2", "dao_equipment_generator_v3", "dao_equipment_generator_v4", "dao_equipment_generator_v5"]), createdAt: zod_11.z.string() }).strict().refine((r) => !["dao_equipment_generator_v4", "dao_equipment_generator_v5"].includes(r.generatorVersion) || r.element !== void 0, { message: "新版锻造装备必须包含五行属性", path: ["element"] }).superRefine((r, e) => {
    var _a;
    let n = Ge(r);
    if (n)
        e.addIssue({ code: "custom", path: ["weaponType"], message: n });
    for (let d of We(r))
        e.addIssue({ code: "custom", path: (_a = d.path) === null || _a === void 0 ? void 0 : _a.split("."), message: d.message });
});
exports.Td = Ur;
exports.Ud = te;
var md = 40;
exports.Vd = md;
class ad extends Error {
}
exports.Wd = ad;
function H0(r) {
    let e = j0(r);
    if (e)
        return e;
    throw new ad("未知物品定义");
}
var rl = zod_1.z.object({ id: zod_1.z.string().min(1).max(160), location: zod_1.z.enum(["bag", "storage", "equipped"]), slotIndex: zod_1.z.number().int().min(0).max(md - 1).nullable(), definitionId: zod_1.z.string().min(1).max(160), quantity: zod_1.z.number().int().positive().max(2147483647), instanceData: zod_1.z.unknown().nullable(), stackKey: zod_1.z.string().nullable(), revision: zod_1.z.number().int().nonnegative() }).strict().superRefine((r, e) => {
    if (r.location === "bag" !== (r.slotIndex !== null))
        e.addIssue({ code: "custom", message: "格位与位置不一致" });
    if (!j0(r.definitionId)) {
        e.addIssue({ code: "custom", message: "未知物品定义" });
        return;
    }
    let n = H0(r.definitionId);
    if (r.location === "equipped" && n.kind !== "equipment")
        e.addIssue({ code: "custom", message: "仅道装可以处于穿戴位置" });
    if (r.quantity > n.stackLimit)
        e.addIssue({ code: "custom", message: "超过堆叠上限" });
    if (n.kind === "equipment") {
        let d = te.safeParse(r.instanceData);
        if (!d.success || d.data.id !== r.id)
            e.addIssue({ code: "custom", message: "道装个体事实无效" });
    }
    else if (r.definitionId === "seed.v1") {
        if (!Tr.safeParse(r.instanceData).success)
            e.addIssue({ code: "custom", message: "灵种事实无效" });
    }
    else if (r.definitionId === "material.v1") {
        if (!Sr.safeParse(r.instanceData).success)
            e.addIssue({ code: "custom", message: "材料事实无效" });
    }
    else if (r.definitionId === "consumable.v1") {
        if (!wr.safeParse(r.instanceData).success)
            e.addIssue({ code: "custom", message: "消耗品事实无效" });
    }
    else if (r.instanceData !== null)
        e.addIssue({ code: "custom", message: "固定物品不能附带个体属性" });
}), el = zod_1.z.object({ definitionId: zod_1.z.string(), quantity: zod_1.z.number().int().positive().max(99), instanceData: zod_1.z.union([te, Tr, Sr, wr]).optional() }).strict();
exports.Yd = rl;
exports.Zd = el;
function nl(r, e = []) {
    let n = new Set([...e, ...r.filter((d) => d.location === "bag").map((d) => d.slotIndex)]);
    for (let d = 0; d < md; d++)
        if (!n.has(d))
            return d;
    return null;
}
var rr = { 凡品: "text-tier-fan", 灵品: "text-tier-ling", 玄品: "text-tier-xuan", 真品: "text-tier-zhen", 地品: "text-tier-di", 天品: "text-tier-tian", 仙品: "text-tier-xian", 神品: "text-tier-shen", 天灵根: "text-tier-tian", 真灵根: "text-tier-zhen", 伪灵根: "text-tier-fan", 变异灵根: "text-tier-shen", 天阶上品: "text-tier-shen", 天阶中品: "text-tier-xian", 天阶下品: "text-tier-xian", 地阶上品: "text-tier-di", 地阶中品: "text-tier-di", 地阶下品: "text-tier-di", 玄阶上品: "text-tier-xuan", 玄阶中品: "text-tier-xuan", 玄阶下品: "text-tier-xuan", 黄阶上品: "text-tier-ling", 黄阶中品: "text-tier-ling", 黄阶下品: "text-tier-ling", 炼气: "text-tier-fan", 筑基: "text-tier-ling", 金丹: "text-tier-xuan", 元婴: "text-tier-zhen", 化神: "text-tier-shen", 炼虚: "text-tier-di", 合体: "text-tier-tian", 大乘: "text-tier-xian", 渡劫: "text-tier-shen" }, al = { easy: "text-tier-fan", normal: "text-tier-ling", hard: "text-tier-xuan", elite: "text-tier-zhen", boss: "text-tier-shen" };
exports.ac = rr;
exports.bc = al;
var id = new Map(xr.map((r) => [r.skill.id, r]));
function Aa(r) {
    var _a;
    let e = (_a = official_chunk_wje6zqc2_js_1.Af.find((d) => d.id === r.id)) === null || _a === void 0 ? void 0 : _a.effect;
    if (!e)
        return;
    let n = (d) => Math.round(d * 100);
    switch (e.type) {
        case "ghost": return `死亡后第 ${e.delay} 个回合开始复起，气血恢复至可恢复上限。无法接受普通气血恢复，免疫控制、减益和持续伤害；涅槃重生失效。被镇魂击杀后无法复起，等待期间不计存活。`;
        case "exorcism": return `对灵魂体目标的物理和法术伤害提高 ${n(e.factor - 1)}%，击杀后阻止其本次复起。`;
        case "denial": return `免疫控制、减益和持续伤害，无法获得增益；灵魂体、涅槃重生、定神（均含高级版）及解厄、高级避厄失效。受到灵魂体造成的物理与法术伤害增加 ${n(e.ghostDamageFactor - 1)}%。${e.spellFactor < 1 ? `所受法术伤害降低 ${n(1 - e.spellFactor)}%。` : ""}`;
        case "poison": return `普通攻击使目标实际损失气血且目标仍存活时，有 ${n(e.chance)}% 概率使其中毒 ${e.duration} 回合；中毒期间每回合损失其最大气血的 ${n(e.hpRatio)}% 和最大法力的 ${n(e.mpRatio)}%。${e.immune ? "自身免疫此毒。" : ""}`;
        case "miracle": return `${e.immune ? "免疫" : "回合末解除"}可驱散的控制、减益和持续伤害状态，不包含禁复活。`;
        case "concentration": return `免疫可驱散的控制状态（不含禁复活），自身造成的物理伤害降低 ${n(1 - e.physicalFactor)}%。${e.dodgeBonus ? `躲避增加 ${e.dodgeBonus} 点。` : ""}`;
        case "eternity": return `获得可延长增益时持续时间增加 ${n(e.factor - 1)}%，向下取整，最多额外 ${e.maxExtra} 回合；不延长隐身、控制与特殊入场效果。`;
        case "stealth": return `每场首次出战时隐身 ${e.minDuration}～${e.maxDuration} 回合（含入场回合），不能施法，自身造成的物理伤害降低 ${n(1 - e.physicalFactor)}%。灵觉可看破，群法仍可命中；召回后不重新触发。`;
        case "perception": return `能看破隐身，攻击隐身目标。${e.dodgeBonus ? `躲避增加 ${e.dodgeBonus} 点。` : ""}`;
        case "spellRepeat": return `施放直接造成伤害的法术后，有 ${n(e.chance)}% 概率对原目标追加同一法术；追加伤害为正常值的 ${n(e.factor)}%，不额外消耗法力，也不会再次触发追加。`;
        case "spellFluctuation": return `法术伤害在正常值的 ${n(e.min)}%～${n(e.max)}% 之间波动，取代通常的法伤波动范围。${e.suppressReflection ? "法术攻击不触发灵法反震。" : ""}`;
        case "groupSpell": return `消耗 ${e.costMp} 法力，初始攻击 1 个目标；每满 ${e.levelsPerTarget} 级多攻击 1 个，最多 ${e.maxTargets} 个。法术伤害系数为 ${e.coefficient}，附加威力为 ${e.powerBase} + ${e.powerPerLevel === 1 ? "自身等级" : `自身等级 × ${e.powerPerLevel}`}；没有元素克制。`;
        case "spellHit": return `消耗 ${e.costMp} 法力，攻击 1 个目标。法术伤害系数为 ${e.coefficient}，附加威力为 ${e.powerBase} + ${e.powerPerLevel === 1 ? "自身等级" : `自身等级 × ${e.powerPerLevel}`}；没有元素克制。`;
        case "parry": return `每回合首次被物理攻击命中时，伤害降低 ${n(1 - e.factor)}%。即使护盾挡下伤害，也会消耗本回合的招架机会；蛮力可无视招架，且不消耗这次机会。`;
        case "defenseTraining": return `物理防御提高自身等级 × ${e.perLevel}，向下取整；自身法术伤害降低 ${n(1 - e.spellFactor)}%。`;
        case "strengthTraining": return `物理攻击提高自身等级 × ${e.perLevel}，向下取整；忽略招架减伤，攻击拥有铁骨或高级铁骨的目标时物理伤害降低 ${n(1 - e.versusDefenseFactor)}%。`;
        case "wisdom": return `法术技能的法力消耗降低 ${n(1 - e.factor)}%，与其他减耗倍率相乘后向下取整；不影响物理技能和捕捉。`;
        case "sneakAttack": return `物理伤害提高 ${n(e.factor - 1)}%，物理攻击不触发目标的反击与反震。`;
        case "spellResistance": return `受到的法术伤害降低 ${n(1 - e.takenFactor)}%，自身造成的物理伤害降低 ${n(1 - e.physicalFactor)}%；不减免固定伤害。`;
        case "lifesteal": return `物理攻击使目标实际损失气血后，自身恢复本次损失气血的 ${n(e.ratio)}%，向下取整且不超过可恢复上限。连击追加攻击与反击不触发噬血，也无法从灵魂体目标噬血。`;
        case "reflection": return `受到${e.kind === "physical" ? "物理" : "法术"}攻击并实际损失气血时，有 ${n(e.chance)}% 概率对攻击者造成相当于本次气血损失 ${n(e.ratio)}% 的固定伤害，最低 1 点。追加攻击不触发反震。${e.kind === "physical" ? "阻止敌方连击，偷袭不解除此限制。" : "不阻止物理连击。"}`;
        case "divineRevival": return `受到致命伤害时，有 ${n(e.chance)}% 概率复生，恢复至最大气血的 ${n(e.hpRatio)}%，受可恢复上限和禁复活状态限制。每次致命伤害独立判定，成功不计死亡；持有灵魂体或绝灵时不生效。`;
        case "counter": return `受到物理攻击并损失气血时，有 ${n(e.chance)}% 概率反击，攻击系数为普攻的 ${n(e.coefficient)}%。反击与连击追加攻击不会再次触发反击。`;
        case "critical": return `${e.kind === "physical" ? "物理" : "法术"}暴击率提高 ${n(e.chance)}%，暴击伤害倍率不变。`;
        case "regeneration": return `每回合结束时恢复${e.resource === "hp" ? "气血" : "法力"}，数值为自身等级${e.levelDivisor === 1 ? "" : `的 1/${e.levelDivisor}`}，向下取整，不超过上限；死亡或未出战时不生效。`;
        case "spellBoost": return `造成的法术伤害提高 ${n(e.factor - 1)}%。`;
        case "speed": return `自身速度${e.factor >= 1 ? "提高" : "降低"} ${n(Math.abs(e.factor - 1))}%。与其他速度倍率相乘。`;
    }
}
function Va(r) {
    var _a, _f;
    if (!official_chunk_wje6zqc2_js_1.Hf.includes(r.id))
        return;
    let e = (_a = r.hooks) === null || _a === void 0 ? void 0 : _a.find((d) => d.on === official_chunk_wje6zqc2_js_1.Ve.AfterHit);
    if (typeof (e === null || e === void 0 ? void 0 : e.chance) !== "number")
        return;
    let n = (_f = official_chunk_wje6zqc2_js_1.Af.find((d) => d.id === r.id)) === null || _f === void 0 ? void 0 : _f.effect;
    if ((n === null || n === void 0 ? void 0 : n.type) !== "combo")
        return;
    return `普通攻击命中后，有 ${Math.round(e.chance * 100)}% 概率向原目标追加一次普攻；自身所有物理伤害降低 ${Math.round((1 - n.physicalFactor) * 100)}%。目标拥有反震或高级反震时不触发，偷袭不解除此限制。`;
}
var Ba = { repeat: "连续触发效果", modifyFact: "心念流转", modifyStatusDuration: "调整状态持续", modifyCooldown: "调整冷却", loseHp: "损失气血", physicalHit: "造成物理伤害", spellHit: "造成法术伤害", fixedHit: "造成固定伤害", heal: "治疗气血", restoreHp: "恢复气血", restoreMp: "恢复法力", revive: "复起目标", applyStatus: "施加状态", removeStatus: "移除状态", copyStatus: "复制状态", emitMechanic: "触发技能机制", dispel: "驱散状态", skipNextAction: "下一次行动休息", damageMp: "削减法力", wound: "造成伤势", removeWound: "恢复伤势", applyBarrier: "获得护盾", modifyStrike: "调整伤害", modifyDefenseIgnore: "调整忽视防御", modifyHeal: "调整治疗", modifyBarrier: "调整护盾", modifyWound: "调整伤势", setCrit: "必定暴击", modifyResource: "调整战斗资源", modifyChance: "调整触发概率", clearSkipNextAction: "取消休息", randomBranch: "随机触发效果" };
function X0(r, e, n = {}) {
    let d = new Map(e.map((i) => [i.id, i.name])), m = (i) => {
        var _a;
        let t = Ba[i.type];
        if (i.type === official_chunk_wje6zqc2_js_1._e.ApplyStatus) {
            if (t = `${i.self ? "自身" : ""}施加「${(_a = d.get(i.statusId)) !== null && _a !== void 0 ? _a : "状态"}」`, typeof i.duration === "number")
                t += `，持续 ${i.duration} 回合`;
        }
        else if (i.type === official_chunk_wje6zqc2_js_1._e.ApplyBarrier)
            t = `获得「${i.name}」护盾`;
        else if (i.type === official_chunk_wje6zqc2_js_1._e.RandomBranch)
            t = `随机效果：${i.successEffects.map(m).join("、")}；或${i.failureEffects.map(m).join("、") || "不产生效果"}`;
        else if (i.type === official_chunk_wje6zqc2_js_1._e.EmitMechanic)
            t = i.name;
        return `${i.when ? "满足条件时：" : ""}${t}`;
    }, a = (i) => {
        if (!i.description)
            return;
        let t = [i.description];
        if (i.requireHpAboveRatio !== void 0)
            t.push(`当前气血须高于${Math.round(i.requireHpAboveRatio * 100)}%。`);
        if (i.requireHpBelowRatio !== void 0)
            t.push(`当前气血须低于${Math.round(i.requireHpBelowRatio * 100)}%。`);
        if (typeof i.targeting.count === "number" && i.targeting.count > 1)
            t.push(`基础目标数：最多${i.targeting.count}个。`);
        for (let o of i.effects) {
            if (o.type === official_chunk_wje6zqc2_js_1._e.SkipNextAction)
                t.push(m(o));
            if (o.type === official_chunk_wje6zqc2_js_1._e.ApplyStatus) {
                let h = e.find((P) => P.id === o.statusId);
                if ((h === null || h === void 0 ? void 0 : h.category) === "buff" && !h.onExpire && !h.commandPolicy)
                    t.push(m(o));
            }
        }
        return t.join(`
`);
    };
    return Object.fromEntries(r.map((i) => {
        var _a, _f, _g, _h, _j, _k, _l;
        return [i.id, { category: id.has(i.id) ? "art" : "spell", description: (_g = (_a = a(i)) !== null && _a !== void 0 ? _a : (_f = id.get(i.id)) === null || _f === void 0 ? void 0 : _f.description) !== null && _g !== void 0 ? _g : (i.capture ? "尝试收服野生灵兽，气血越低越容易成功；执行时消耗法力，失败仍消耗。" : [n.includeBeastFlavor === !1 ? void 0 : (_h = official_chunk_wje6zqc2_js_1.Af.find((t) => t.id === i.id)) === null || _h === void 0 ? void 0 : _h.flavorText, (_k = (_j = Va(i)) !== null && _j !== void 0 ? _j : Aa(i)) !== null && _k !== void 0 ? _k : ([...new Set([...i.effects.map(m), ...((_l = i.successEffects) !== null && _l !== void 0 ? _l : []).map((t) => `施放成功后：${m(t)}`)])].join("；") || "被动能力，依技能条件触发。")].filter(Boolean).join(`
`)) }];
    }));
}
var Ha = X0(official_chunk_wje6zqc2_js_1.Cf, []), hd = X0(official_chunk_wje6zqc2_js_1.Cf, [], { includeBeastFlavor: !1 }), Xa = new Map([...official_chunk_wje6zqc2_js_1.Af.map((r) => { var _a, _f, _g, _h, _j; return [r.id, { name: r.name, icon: r.icon, style: official_chunk_wje6zqc2_js_1.Ff.has(r.id) ? "advanced" : "normal", summary: r.flavorText, details: ((_a = hd[r.id]) === null || _a === void 0 ? void 0 : _a.description) === r.flavorText ? "" : (_g = (_f = hd[r.id]) === null || _f === void 0 ? void 0 : _f.description) !== null && _g !== void 0 ? _g : "暂无技能效果。", description: (_j = (_h = Ha[r.id]) === null || _h === void 0 ? void 0 : _h.description) !== null && _j !== void 0 ? _j : "暂无技能说明。" }]; })]);
function Ga(r) { return Xa.get(r); }
function ld(r) { var _a; return (_a = Ga(r)) !== null && _a !== void 0 ? _a : { name: "未知技能", icon: "❔", style: "unavailable", summary: "技能信息暂不可用。", details: "", description: "技能信息暂不可用。" }; }
function _d(r, e) { return r.valueAt1 + r.valuePerLevel * (e - 1); }
function G0(r, e) { return Number((r.valueAt1 + (r.valueAt9 - r.valueAt1) * (e - 1) / 8).toFixed(8)); }
function Za(r) {
    switch (r) {
        case "always": return {};
        case "selfHpBelow50": return { sourceHpRatioBelow: 0.5 };
        case "selfHpBelow35": return { sourceHpRatioBelow: 0.35 };
        case "selfHpAbove70": return { sourceHpRatioAbove: 0.7 };
        case "targetHpBelow50": return { targetHpRatioBelow: 0.5 };
        case "targetHpBelow35": return { targetHpRatioBelow: 0.35 };
        case "targetHpAbove70": return { targetHpRatioAbove: 0.7 };
        case "selfMpBelow50": return { sourceMpRatioBelow: 0.5 };
        case "selfMpAbove50": return { sourceMpRatioAbove: 0.5 };
        case "selfMpAbove70": return { sourceMpRatioAbove: 0.7 };
        case "defending": return { sourceDefending: !0 };
        case "selfBarrier": return { sourceHasBarrier: !0 };
        case "targetBarrier": return { targetHasBarrier: !0 };
        case "targetDot": return { targetStatusCategories: [official_chunk_wje6zqc2_js_1.Ue.Dot] };
        case "selfControl": return { sourceRemovableControl: !0 };
        case "selfDebuff": return { sourceStatusCategories: [official_chunk_wje6zqc2_js_1.Ue.Debuff] };
    }
}
function gl(r, e) {
    let n = r.mechanism, d = G0(n, e), m = { ...Za(n.condition), sourceStanding: !0 }, a = { ...m, damageOrigins: [official_chunk_wje6zqc2_js_1.Oe.ActionDirect] }, i = { ...a, excludeSkillTags: [official_chunk_wje6zqc2_js_1.Qe.Art, official_chunk_wje6zqc2_js_1.Qe.Passive], targetSlot: "primary", excludePercentageDamage: !0 }, t = [];
    switch (n.type) {
        case "damage":
        case "mitigation":
            t = n.kinds.map((o) => ({ on: official_chunk_wje6zqc2_js_1.Ve.OnHitCalc, ...n.type === "damage" ? { sourceIsSelf: !0 } : { targetIsSelf: !0 }, requireKind: o, when: n.type === "damage" ? i : a, effects: [{ type: official_chunk_wje6zqc2_js_1._e.ModifyStrike, factor: n.type === "damage" ? 1 + d : 1 - d }] }));
            break;
        case "heal":
        case "barrier":
            t = [{ on: n.type === "heal" ? official_chunk_wje6zqc2_js_1.Ve.OnHealCalc : official_chunk_wje6zqc2_js_1.Ve.OnBarrierCalc, sourceIsSelf: !0, when: i, effects: [{ type: n.type === "heal" ? official_chunk_wje6zqc2_js_1._e.ModifyHeal : official_chunk_wje6zqc2_js_1._e.ModifyBarrier, factor: 1 + d }] }];
            break;
        case "evasion":
            t = [{ on: official_chunk_wje6zqc2_js_1.Ve.OnHitRoll, targetIsSelf: !0, requireKind: "physical", when: a, effects: [{ type: official_chunk_wje6zqc2_js_1._e.ModifyChance, add: -d }] }];
            break;
        case "restoreHp":
        case "restoreMp":
            t = [{ on: official_chunk_wje6zqc2_js_1.Ve.OnRoundEnd, aim: official_chunk_wje6zqc2_js_1.We.Self, when: m, effects: [{ type: n.type === "restoreHp" ? official_chunk_wje6zqc2_js_1._e.RestoreHp : official_chunk_wje6zqc2_js_1._e.RestoreMp, power: `floor(source.${n.type === "restoreHp" ? "maxHp" : "maxMp"} * ${d})` }] }];
            break;
        case "sealResist": break;
    }
    return { id: `${r.id}.passive`, name: r.name, tags: [official_chunk_wje6zqc2_js_1.Qe.Passive], targeting: { side: official_chunk_wje6zqc2_js_1.Re.Self }, effects: [], hooks: t };
}
var Qa = { always: "", selfHpBelow50: "自身气血低于50%时，", selfHpBelow35: "自身气血低于35%时，", selfHpAbove70: "自身气血高于70%时，", targetHpBelow50: "目标气血低于50%时，", targetHpBelow35: "目标气血低于35%时，", targetHpAbove70: "目标气血高于70%时，", selfMpBelow50: "自身法力低于50%时，", selfMpAbove50: "自身法力高于50%时，", selfMpAbove70: "自身法力高于70%时，", defending: "自身防御时，", selfBarrier: "自身有护盾时，", targetBarrier: "目标有护盾时，", targetDot: "目标带有持续伤害状态时，", selfControl: "自身处于可解除封印时，", selfDebuff: "自身带有减益状态时，" }, pd = { physical: "物理", spell: "法术", fixed: "普通固定" };
function ya(r, e) {
    let n = r.mechanism, d = Number((G0(n, e) * 100).toFixed(6)), m = Qa[n.condition];
    switch (n.type) {
        case "damage": return `${m}普攻、宗门主动技能对主目标的直接${n.kinds.map((a) => pd[a]).join("、")}伤害+${d}%`;
        case "mitigation": return `${m}受到的直接${n.kinds.map((a) => pd[a]).join("、")}伤害-${d}%`;
        case "heal": return `${m}宗门主动技能对主目标的治疗量+${d}%`;
        case "barrier": return `${m}宗门主动技能对主目标的护盾量+${d}%`;
        case "evasion": return `${m}直接物理攻击的命中概率-${d}%（概率差值）`;
        case "sealResist": return `受到封印时，对方封印成功概率-${d}%（概率差值，遵守封印上下限）`;
        case "restoreHp": return `回合结束时，${m}恢复最大气血的${d}%`;
        case "restoreMp": return `回合结束时，${m}恢复最大法力的${d}%`;
    }
}
function qd(r, e) { return [...r.effects.map((n) => `${T[n.attribute]} +${_d(n, e)}`), ya(r, e)]; }
function Pd(r) { return Sr.parse(r); }
var ir = (r) => r.split(`
`).filter(Boolean).map((e) => ({ kind: "line", value: e })), X = (r, e) => ({ kind: "field", label: r, value: e }), er = (r, e) => { var _a; return ({ kind: "quantity", label: (_a = e.quantityLabel) !== null && _a !== void 0 ? _a : "持有", value: r.quantity }); };
var jd = (r, e) => { let n = (0, official_chunk_wje6zqc2_js_1.wf)(e.level).realm; return { summary: { icon: "\uD83D\uDCDC", color: rr[n], tier: n, type: "道装图纸" }, preview: (d) => ({ header: [X("类型", "道装图纸"), er(r, d)], sections: [], description: `记载${$r[e.slot]}铸造之法的图纸，铸造时消耗1张。` }) }; }, vd = (r) => { let e = Pd(r.instanceData), n = jn[e.type]; return { summary: { icon: { herb: "\uD83C\uDF3F", ore: "\uD83E\uDEA8", tcdb: "\uD83D\uDC8E", aux: "\uD83E\uDDF5", monster: "\uD83E\uDDB4", gongfa_manual: "\uD83D\uDCDA", skill_manual: "\uD83D\uDCD6" }[e.type], color: rr[e.rank], tier: e.rank, type: n }, preview: (d) => ({ header: [X("类型", `${e.rank} · ${n}`), er(r, d)], sections: e.element ? [{ title: "道具资料", entries: [{ kind: "line", label: "五行", value: e.element }] }] : [], description: e.description || "可用于对应炼造玩法的灵材。" }) }; }, xd = (r) => {
    let e = Tr.safeParse(r.instanceData), n = e.success ? e.data.seedSpec.plant : Vn.parse(r.instanceData).seedPreview;
    return { summary: { icon: "\uD83C\uDF31", color: rr[n.quality], tier: n.quality, type: "灵种" }, preview: (d) => ({ header: [X("类型", `${n.quality} · 灵种`), X("功能", "灵田培育"), X("要求", `${n.minRealm}及以上`), er(r, d)], sections: [{ title: "道具资料", entries: [{ kind: "line", label: "五行", value: n.element }] }, ...n.clueTexts.length ? [{ title: "培育线索", entries: ir(n.clueTexts.join(`
`)) }] : []], description: n.seedDescription }) };
}, sd = (r, e) => {
    let n = He.find((d) => d.id === e.manualId);
    return { summary: { icon: "\uD83D\uDCD7", color: rr[n.realm], tier: "", type: "功法玉简" }, preview: (d) => ({ header: [X("类型", "功法玉简"), X("传承境界", n.realm), er(r, d)], sections: [{ title: "所载功法", entries: ir([...qd(n, 1), n.description].join(`
`)) }], description: "封存功法传承的玉简，可于悟道室参悟其中法门。" }) };
}, Rd = (r, e) => { let n = official_chunk_wje6zqc2_js_1.Af.some((i) => i.id === e.skillId), d = official_chunk_wje6zqc2_js_1.Gf.has(e.skillId), m = !n ? "已失效" : d ? "上品" : "普通", a = ld(e.skillId); return { summary: { icon: d ? "\uD83D\uDCD5" : "\uD83D\uDCD8", color: rr[d ? "神品" : "地品"], tier: m, type: "传承灵印" }, preview: (i) => ({ header: [X("类型", `${m} · 传承灵印`), er(r, i)], sections: [{ title: "所载传承", entries: [...ir(a.summary).map((t) => ({ ...t, tone: "muted" })), ...a.details ? [{ kind: "disclosure", title: "具体效果", tone: "positive", rows: ir(a.details) }] : []] }], description: d ? "封存着更为精深的妖灵传承，可助灵兽领悟其中的本领。" : "封存着妖灵传承的灵念，可助灵兽领悟其中的本领。" }) }; }, Dd = (r, e) => { let n = Oe.items.find((m) => m.id === e.id); return { summary: { icon: "\uD83D\uDCA7", color: n.color === "jade" ? "text-teal" : "text-tier-tian", tier: "", type: "归元灵露" }, preview: (m) => ({ header: [X("功能", "灵兽洗炼"), X("要求", n.allowedRealms.length === official_chunk_wje6zqc2_js_1.mf.length ? "不限境界" : `不高于${n.allowedRealms[n.allowedRealms.length - 1]}`), er(r, m)], sections: [{ title: "洗炼效果", entries: ir("重置等级，重新孕育资质、成长与技能，寿命恢复至原上限。") }], description: n.color === "gold" ? "元婴及以上灵兽须用此露。洗炼所得与普通归元灵露相同。" : "涤去后天积累。" }) }; }, $d = (r) => ({ summary: { icon: "\uD83C\uDF51", color: rr["天品"], tier: "", type: "灵果" }, preview: (e) => ({ header: [X("类型", "灵果"), X("功能", "灵兽洗点"), er(r, e)], sections: [{ title: "洗点效果", entries: ir("修为归零，野生灵兽原有的点数亏损保留。") }], description: Ae.description }) });
var Z0 = { 炼气: 6, 筑基: 8, 金丹: 10, 元婴: 12, 化神: 14, 炼虚: 16, 合体: 18, 大乘: 20, 渡劫: 24 }, Od = { 炼气: 10, 筑基: 20, 金丹: 30, 元婴: 40, 化神: 50, 炼虚: 60, 合体: 70, 大乘: 80, 渡劫: 90 }, Ad = { 炼气: "玄品", 筑基: "真品", 金丹: "地品", 元婴: "天品", 化神: "神品", 炼虚: "神品", 合体: "神品", 大乘: "神品", 渡劫: "神品" }, Ya = { 炼气: "凡品", 筑基: "凡品", 金丹: "灵品", 元婴: "玄品", 化神: "玄品", 炼虚: "玄品", 合体: "玄品", 大乘: "玄品", 渡劫: "玄品" };
function Vd(r) { var _a; return (_a = Ya[r]) !== null && _a !== void 0 ? _a : "凡品"; }
var Bd = 1000;
const zod_16 = require("./zod.js");
var Hd = { $schema: "./body-cultivation.schema.json", formatVersion: 1, contentRevision: 1, tracks: { skin: { name: "炼体·皮肤", layerName: "防御修炼", shortDesc: "减少受到的物理伤害", benefit: { kind: "training", attribute: "defenseCultivate", perLevel: 1 } }, sinew_bone: { name: "炼体·筋骨", layerName: "攻法修炼", shortDesc: "提高造成的物理伤害", benefit: { kind: "training", attribute: "attackCultivate", perLevel: 1 } }, organs: { name: "炼体·脏腑", layerName: "法术修炼", shortDesc: "提高法术伤害与封印命中率", benefit: { kind: "training", attribute: "spellCultivate", perLevel: 1 } }, qi_blood: { name: "炼体·气血", layerName: "生命根基", shortDesc: "提高气血上限与施放治疗的恢复量", benefit: { kind: "life", hpRatioPerLevel: 0.005, healLevelsPerPoint: 2 } }, primordial_spirit: { name: "炼体·元神", layerName: "抗法修炼", shortDesc: "减少受到的法术伤害，降低被封印的概率", benefit: { kind: "training", attribute: "resistSpellCultivate", perLevel: 1 } } }, realms: [{ realm: "mortal_body", label: "凡躯", minCultivationRealm: "炼气", totalLevel: 0, softTrackCap: 5 }, { realm: "bronze_skin", label: "铜皮", minCultivationRealm: "炼气", totalLevel: 12, softTrackCap: 10 }, { realm: "iron_bone", label: "铁骨", minCultivationRealm: "筑基", totalLevel: 30, softTrackCap: 15 }, { realm: "jade_marrow", label: "玉髓", minCultivationRealm: "金丹", totalLevel: 55, softTrackCap: 22 }, { realm: "golden_body", label: "金身", minCultivationRealm: "元婴", totalLevel: 90, softTrackCap: 30 }, { realm: "dharma_body", label: "法身", minCultivationRealm: "化神", totalLevel: 140, softTrackCap: 45 }, { realm: "dao_body", label: "道体", minCultivationRealm: "合体", totalLevel: 220, softTrackCap: 60 }], progress: { base: 100, perLevel: 70, milestoneInterval: 5 } };
var S = ["skin", "sinew_bone", "organs", "qi_blood", "primordial_spirit"], Q0 = ["mortal_body", "bronze_skin", "iron_bone", "jade_marrow", "golden_body", "dharma_body", "dao_body"], Gd = ["attackCultivate", "defenseCultivate", "spellCultivate", "resistSpellCultivate"], Ne = zod_16.z.string().min(1).max(100), yr = zod_16.z.number().int().min(0).max(1e6), we = zod_16.z.strictObject({ kind: zod_16.z.literal("training"), attribute: zod_16.z.enum(Gd), perLevel: zod_16.z.number().min(0).max(100) }), Ka = zod_16.z.strictObject({ kind: zod_16.z.literal("life"), hpRatioPerLevel: zod_16.z.number().min(0).max(1), healLevelsPerPoint: yr.min(1) }), he = { name: Ne, layerName: Ne, shortDesc: Ne }, Wa = zod_16.z.strictObject({ $schema: zod_16.z.string().optional(), formatVersion: zod_16.z.literal(1), contentRevision: yr.min(1), tracks: zod_16.z.strictObject({ skin: zod_16.z.strictObject({ ...he, benefit: we }), sinew_bone: zod_16.z.strictObject({ ...he, benefit: we }), organs: zod_16.z.strictObject({ ...he, benefit: we }), qi_blood: zod_16.z.strictObject({ ...he, benefit: Ka }), primordial_spirit: zod_16.z.strictObject({ ...he, benefit: we }) }), realms: zod_16.z.array(zod_16.z.strictObject({ realm: zod_16.z.enum(Q0), label: Ne, minCultivationRealm: zod_16.z.enum(Object.keys(official_chunk_wje6zqc2_js_1.rf)), totalLevel: yr, softTrackCap: yr.min(1).max(1000) })).length(Q0.length), progress: zod_16.z.strictObject({ base: yr.min(1), perLevel: yr, milestoneInterval: yr.min(1).max(1000) }) });
exports.Hc = S;
function wa(r) {
    let e = Wa.superRefine((n, d) => {
        let m = (t, o) => d.addIssue({ code: "custom", path: t, message: o }), a = S.flatMap((t) => n.tracks[t].benefit.kind === "training" ? [n.tracks[t].benefit.attribute] : []);
        if (new Set(a).size !== Gd.length)
            m(["tracks"], "四种修炼属性必须各映射一次");
        n.realms.forEach((t, o) => {
            if (t.realm !== Q0[o])
                m(["realms", o, t.realm], "肉身位阶顺序必须完整且与已有成长顺序一致");
            let h = n.realms[o - 1];
            if (!h) {
                if (t.totalLevel !== 0)
                    m(["realms", o, "totalLevel"], "初始位阶总等级门槛必须为零");
            }
            else {
                if (t.softTrackCap <= h.softTrackCap || t.totalLevel <= h.totalLevel || official_chunk_wje6zqc2_js_1.rf[t.minCultivationRealm] < official_chunk_wje6zqc2_js_1.rf[h.minCultivationRealm])
                    m(["realms", o, t.realm], "位阶门槛和上限必须递增，修为境界不能倒退");
                if (t.totalLevel > h.softTrackCap * S.length)
                    m(["realms", o, "totalLevel"], "前一位阶五轨上限无法达到此门槛");
            }
        });
        let i = n.realms[n.realms.length - 1].softTrackCap;
        if (!Number.isSafeInteger(n.progress.base + n.progress.perLevel * i))
            m(["progress"], "最高等级进度需求溢出");
    }).safeParse(r);
    if (!e.success)
        throw Error((0, official_chunk_wje6zqc2_js_1.Jf)("bodyCultivation/data/body-cultivation.json", r, e.error.issues));
    return e.data;
}
var tr = wa(Hd);
exports.Ic = tr;
function Ll(r = tr) { return r.realms[r.realms.length - 1].softTrackCap; }
function Zd(r, e = tr) { return e.progress.base + e.progress.perLevel * Math.max(0, Math.floor(r)); }
var Na = S.map((r) => `body.${r}`), oe = { vitality: "qi_blood", spirit: "organs", wisdom: "primordial_spirit", speed: "skin", willpower: "sinew_bone" }, le = Object.fromEntries(S.map((r) => { let { name: e, layerName: n, shortDesc: d } = tr.tracks[r]; return [r, { name: e, layerName: n, shortDesc: d }]; })), y0 = Object.fromEntries(tr.realms.map((r) => [r.realm, r.label])), Qd = tr.realms.map((r) => r.realm), _e = Object.fromEntries(tr.realms.map((r, e) => [r.realm, { ...r, unlockText: `五轨单轨上限${e === 0 ? " " : "提升至 "}Lv.${r.softTrackCap}` }]));
exports.Kc = y0;
exports.Lc = _e;
function Lr() { return { level: 0, progress: 0 }; }
function Hr(r) { return Zd(r); }
function yd(r) { var _a; let e = Qd.indexOf(r); return (_a = Qd[e + 1]) !== null && _a !== void 0 ? _a : null; }
function Yd(r, e) {
    if (!r)
        return !1;
    return official_chunk_wje6zqc2_js_1.rf[r] >= official_chunk_wje6zqc2_js_1.rf[e];
}
function Me(r) { return Na.includes(r); }
function be(r) { return r.startsWith("tempering."); }
function Ce(r) {
    if (Me(r))
        return r.replace("body.", "");
    let e = r.replace("tempering.", "");
    return oe[e];
}
function Jd(r) { var _a, _f; return { level: Math.max(0, Math.floor((_a = r === null || r === void 0 ? void 0 : r.level) !== null && _a !== void 0 ? _a : 0)), progress: Math.max(0, Math.floor((_f = r === null || r === void 0 ? void 0 : r.progress) !== null && _f !== void 0 ? _f : 0)) }; }
function Kd() { return { skin: Lr(), sinew_bone: Lr(), organs: Lr(), qi_blood: Lr(), primordial_spirit: Lr() }; }
function Y0() { return { version: 1, realm: "mortal_body", tracks: Kd(), milestones: {} }; }
function kr(r) {
    var _a, _f, _g, _h, _j, _k;
    let e = Y0(), n = (_a = r === null || r === void 0 ? void 0 : r.tracks) === null || _a === void 0 ? void 0 : _a.bodyCultivation, d = (_f = r === null || r === void 0 ? void 0 : r.tracks) === null || _f === void 0 ? void 0 : _f.tempering, m = Kd();
    for (let i of S)
        m[i] = Jd((_g = n === null || n === void 0 ? void 0 : n.tracks) === null || _g === void 0 ? void 0 : _g[i]);
    if (!n && d)
        for (let [i, t] of Object.entries(oe))
            m[t] = Jd(d[i]);
    return { version: 1, realm: (n === null || n === void 0 ? void 0 : n.realm) && n.realm in y0 ? n.realm : e.realm, tracks: m, milestones: (_h = n === null || n === void 0 ? void 0 : n.milestones) !== null && _h !== void 0 ? _h : {}, breakthrough: (n === null || n === void 0 ? void 0 : n.breakthrough) && n.breakthrough.targetRealm in y0 ? { targetRealm: n.breakthrough.targetRealm, progress: Math.max(0, Math.min(100, Math.floor((_j = n.breakthrough.progress) !== null && _j !== void 0 ? _j : 0))), failedAttempts: Math.max(0, Math.floor((_k = n.breakthrough.failedAttempts) !== null && _k !== void 0 ? _k : 0)) } : void 0 };
}
function n_(r, e, n = tr) {
    let d = { attackCultivate: 0, defenseCultivate: 0, spellCultivate: 0, resistSpellCultivate: 0 };
    for (let a of S) {
        let i = n.tracks[a].benefit;
        if (i.kind === "training")
            d[i.attribute] = r[a] * i.perLevel;
    }
    let m = n.tracks.qi_blood.benefit;
    return { ...d, lifeFoundationLevel: r.qi_blood, maxHpBonus: Math.floor(e * r.qi_blood * m.hpRatioPerLevel), healPowerBonus: Math.floor(r.qi_blood / m.healLevelsPerPoint) };
}
function J0(r, e, n = tr) {
    let d = Math.max(0, Math.floor(e)), m = n.tracks[r];
    if (m.benefit.kind === "training")
        return [`${m.layerName} Lv.${d * m.benefit.perLevel}`];
    return [`裸身气血 +${Number((d * (m.benefit.hpRatioPerLevel * 100)).toFixed(1))}%`, `固定治疗强度 +${Math.floor(d / m.benefit.healLevelsPerPoint)}`];
}
function Ma(r) { let e = tr.progress.milestoneInterval; return Math.max(e, Math.ceil((Math.max(0, r) + 1) / e) * e); }
function ba(r) {
    let e = yd(r.currentRealm);
    if (!e)
        return null;
    let n = _e[e], d = [{ label: `总炼体 Lv.${r.totalLevel}/${n.totalLevel}`, met: r.totalLevel >= n.totalLevel }, { label: `修为境界达到${n.minCultivationRealm}`, met: Yd(r.cultivatorRealm, n.minCultivationRealm) }];
    return { key: n.realm, label: n.label, softTrackCap: n.softTrackCap, unlockText: n.unlockText, canAttempt: d.every((m) => m.met), requirements: d };
}
function K0(r, e = {}) { let n = kr(r), d = _e[n.realm], m = S.map((i) => { let t = n.tracks[i], o = le[i], h = Ma(t.level); return { key: i, path: `body.${i}`, name: o.name, layerName: o.layerName, shortDesc: o.shortDesc, level: t.level, progress: t.progress, threshold: Hr(t.level), nextMilestoneLevel: h, levelsToNextMilestone: h - t.level, currentEffects: J0(i, t.level), nextLevelEffects: J0(i, t.level + 1) }; }), a = m.reduce((i, t) => i + t.level, 0); return { realm: { key: d.realm, label: d.label, softTrackCap: d.softTrackCap, unlockText: d.unlockText }, totalLevel: a, tracks: m, nextRealm: ba({ currentRealm: n.realm, totalLevel: a, cultivatorRealm: e.cultivatorRealm }) }; }
function l_(r) {
    let e = official_chunk_wje6zqc2_js_1.mf.indexOf(r);
    if (e < 0 || e >= official_chunk_wje6zqc2_js_1.mf.length - 1)
        return null;
    return official_chunk_wje6zqc2_js_1.mf[e + 1];
}
function Ca(r) {
    switch (r) {
        case "筑基": return "筑基丹";
        case "金丹": return "降尘丹";
        case "元婴": return "护婴丹";
        case "化神": return "叩神丹";
        case "炼虚": return "洞虚丹";
        case "合体": return "合真丹";
        case "大乘": return "证道丹";
        case "渡劫": return "应劫丹";
        default: return r ? `${r}破境丹` : "破境丹";
    }
}
function Fa(r) { return r.some((e) => e.type === "add_status" && e.status === "breakthrough_focus"); }
function Wd(r) {
    var _a;
    if (r.family !== "breakthrough" || !Fa(r.operations))
        return null;
    return (_a = r.alchemyMeta.breakthroughLabel) !== null && _a !== void 0 ? _a : (r.alchemyMeta.breakthroughTargetRealm ? Ca(r.alchemyMeta.breakthroughTargetRealm) : null);
}
var Ia = { hp: { label: "气血", icon: "❤️", description: "当前气血、气血条、恢复气血" }, mp: { label: "法力", icon: "\uD83D\uDCA7", description: "当前法力、法力条、法力消耗" }, maxHp: { label: "气血上限", icon: "❤️", description: "最大气血" }, maxMp: { label: "法力上限", icon: "\uD83D\uDCA7", description: "最大法力" }, hp_loss: { label: "气血损失", icon: "\uD83E\uDE78", description: "气血百分比损失" }, mp_loss: { label: "法力损失", icon: "\uD83D\uDCA7", description: "法力百分比损失" }, spirit_stones: { label: "灵石", icon: "\uD83D\uDCB0", description: "通用货币" }, reputation: { label: "声望", icon: "\uD83C\uDFF5️", description: "万界商行兑换所需的声望" }, contribution: { label: "宗门贡献", icon: "\uD83D\uDCDC", description: "宗门任务与建设所得的宗门内部凭证" }, cultivation_exp: { label: "修为", icon: "\uD83E\uDDD8", description: "修为进度" }, comprehension_insight: { label: "感悟", shortLabel: "感悟", icon: "\uD83D\uDCA1", description: "突破、推演功法与神通所需的感悟" }, world_qi: { label: "天地灵气", shortLabel: "灵气", icon: "\uD83C\uDF43", description: "玩法行动所消耗的天地灵气" }, lifespan: { label: "寿元", icon: "\uD83D\uDD6F️", description: "角色寿元" }, material: { label: "材料", icon: "\uD83D\uDCE6", description: "通用材料" }, artifact: { label: "法宝", icon: "\uD83D\uDDE1️", description: "法宝物品", aliases: { naming: "法宝灵器" } }, consumable: { label: "消耗品", icon: "\uD83C\uDF15", description: "丹药、符箓等消耗品" }, battle: { label: "战斗", icon: "⚔️", description: "战斗事件或代价" }, vitality: { label: T.vitality, icon: "\uD83D\uDCAA", shortLabel: "体", description: "气血与生命根基，提升最大气血、治疗强度，并提供少量法术防御与行动速度" }, strength: { label: T.strength, icon: "⚔️", shortLabel: "力", description: "筋力与兵刃威势，提升物理攻击，并提供少量法术防御与行动速度" }, spirit: { label: T.spirit, icon: "⚡", shortLabel: "灵", description: "灵力浑厚程度，提升法术攻击、法力和封印命中，并提供少量法术防御" }, endurance: { label: T.endurance, icon: "\uD83E\uDDB4", shortLabel: "骨", description: "筋骨坚韧程度，提升物理防御，并提供少量法术防御与行动速度" }, speed: { label: T.speed, icon: "\uD83E\uDDB6", shortLabel: "身", description: "身形腾挪与步法根基，影响闪避、命中与行动速度" }, willpower: { label: T.willpower, icon: "\uD83D\uDC41️", shortLabel: "识", description: "神魂与意志强度，提升法术防御、法力、治疗强度和封印抵抗" }, gongfa: { label: "功法", icon: "\uD83D\uDCD6", description: "功法产品", aliases: { naming: "功法典籍" } }, skill: { label: "神通", icon: "\uD83D\uDCDC", description: "神通产品", aliases: { naming: "神通招式" } }, consumable_pill: { label: "丹药", icon: "\uD83C\uDF15", description: "丹药消耗品" }, consumable_talisman: { label: "符箓", icon: "\uD83D\uDCDC", description: "符箓消耗品" }, material_herb: { label: "灵药", icon: "\uD83C\uDF3F" }, material_ore: { label: "矿石", icon: "\uD83E\uDEA8" }, material_monster: { label: "妖兽材料", icon: "\uD83D\uDC09" }, material_tcdb: { label: "天材地宝", icon: "\uD83D\uDC8E" }, material_aux: { label: "特殊辅料", icon: "\uD83D\uDCA7" }, material_gongfa_manual: { label: "功法典籍", icon: "\uD83D\uDCD6" }, material_skill_manual: { label: "神通秘术", icon: "\uD83D\uDCDC" }, element_metal: { label: "金", icon: "⚔️" }, element_wood: { label: "木", icon: "\uD83C\uDF3F" }, element_water: { label: "水", icon: "\uD83D\uDCA7" }, element_fire: { label: "火", icon: "\uD83D\uDD25" }, element_earth: { label: "土", icon: "⛰️" }, element_wind: { label: "风", icon: "\uD83C\uDF2A️" }, element_thunder: { label: "雷", icon: "⚡" }, element_ice: { label: "冰", icon: "❄️" }, equipment_weapon: { label: "攻击法宝", icon: "\uD83D\uDDE1️", aliases: { intent: "武器", naming: "战器", productNaming: "兵刃" } }, equipment_armor: { label: "护身法宝", icon: "\uD83D\uDEE1️", aliases: { intent: "护甲", naming: "护甲", productNaming: "护具" } }, equipment_accessory: { label: "辅助法宝", icon: "\uD83D\uDC8D", aliases: { intent: "配饰", naming: "玉佩", productNaming: "饰物" } }, attribute_atk: { label: "物理攻击", icon: "⚔️", shortLabel: "物攻" }, attribute_def: { label: "物理防御", icon: "\uD83D\uDEE1️", shortLabel: "物防" }, attribute_magic_atk: { label: "法术攻击", icon: "⚡", shortLabel: "法攻" }, attribute_magic_def: { label: "法术防御", icon: "\uD83D\uDEE1️", shortLabel: "法防" }, attribute_action_speed: { label: "速度", icon: "\uD83D\uDCA8", shortLabel: "速度", description: "决定战斗中的出手顺序" }, attribute_crit_rate: { label: "暴击率", icon: "\uD83C\uDFAF", shortLabel: "暴" }, attribute_crit_damage: { label: "暴击伤害", icon: "\uD83D\uDCA5", shortLabel: "暴伤" }, attribute_damage_reduction: { label: "伤害减免", icon: "\uD83D\uDEE1️", shortLabel: "减伤" }, attribute_hit_rate: { label: "命中率", icon: "\uD83C\uDFAF", shortLabel: "命" }, attribute_dodge_rate: { label: "闪避率", icon: "\uD83C\uDFC3‍♂️", shortLabel: "闪避" }, attribute_evasion_rate: { label: "闪避率", icon: "\uD83C\uDFC3‍♂️", shortLabel: "闪避" }, attribute_control_hit: { label: "控制命中", icon: "\uD83C\uDFAF", shortLabel: "控命" }, attribute_control_resistance: { label: "控制抗性", icon: "\uD83D\uDEE1️", shortLabel: "控抗" }, attribute_armor_penetration: { label: "破防", icon: "\uD83D\uDDE1️", shortLabel: "破防", aliases: { detailed: "破甲" } }, attribute_magic_penetration: { label: "法术穿透", icon: "⚡", shortLabel: "法穿", aliases: { compact: "法穿" } }, attribute_crit_resist: { label: "暴击抗性", icon: "\uD83D\uDEE1️", shortLabel: "暴抗", aliases: { detailed: "暴击韧性" } }, attribute_crit_damage_reduction: { label: "暴伤减免", icon: "\uD83D\uDEE1️", shortLabel: "暴减", aliases: { detailed: "暴击减伤" } }, attribute_accuracy: { label: "命中", icon: "\uD83C\uDFAF", shortLabel: "命中", aliases: { detailed: "精准" } }, attribute_heal_amplify: { label: "治疗加成", icon: "\uD83D\uDC9A", shortLabel: "治疗", aliases: { detailed: "治疗增强" } }, skill_type_attack: { label: "攻击", icon: "⚔️", description: "以伤害为主的直接输出神通" }, skill_type_heal: { label: "治疗", icon: "\uD83D\uDC9A", description: "恢复气血或护持自身的术法" }, skill_type_control: { label: "控制", icon: "\uD83C\uDF00", description: "封禁、禁锢、限制对手行动的术法" }, skill_type_debuff: { label: "削弱", icon: "\uD83D\uDE08", description: "削减对手战力或叠加负面状态的术法" }, skill_type_buff: { label: "增益", icon: "\uD83C\uDF1F", description: "临时强化自身或友方能力的神通" }, status_burn: { label: "灼烧", icon: "\uD83D\uDD25", description: "业火缠身，每回合损失气血" }, status_bleed: { label: "流血", icon: "\uD83E\uDE78", description: "伤口难愈，随时间流失气血" }, status_poison: { label: "中毒", icon: "☠️", description: "剧毒入骨，气血与法力缓慢流逝" }, status_stun: { label: "眩晕", icon: "\uD83C\uDF00", description: "元神震荡，暂时无法行动" }, status_silence: { label: "沉默", icon: "\uD83E\uDD10", description: "法咒受限，无法施展部分神通" }, status_root: { label: "定身", icon: "\uD83D\uDD12", description: "身形被禁锢，难以移动与闪避" }, status_armor_up: { label: "护体", icon: "\uD83D\uDEE1️", description: "护体罡气环绕，大幅减免伤害" }, status_speed_up: { label: "疾速", icon: "\uD83C\uDFC3‍♂️", description: "身形如电，出手与闪避皆获加成" }, status_crit_rate_up: { label: "会心", icon: "\uD83C\uDFAF", description: "战意如虹，暴击几率大幅提升" }, status_armor_down: { label: "破防", icon: "\uD83D\uDC94", description: "护体被破，所受伤害显著增加" }, status_crit_rate_down: { label: "暴击降低", icon: "\uD83D\uDC94", description: "暴击几率大幅降低" }, status_weakness: { label: "虚弱", icon: "\uD83D\uDE30", description: "元气大伤，尚待恢复" }, status_minor_wound: { label: "轻伤", icon: "\uD83E\uDE79", description: "身负轻伤，稍有影响" }, status_major_wound: { label: "重伤", icon: "\uD83D\uDCA5", description: "身负重伤，自然恢复减慢" }, status_near_death: { label: "濒死", icon: "☠️", description: "命悬一线，随时可能陨落" }, status_breakthrough_focus: { label: "破境凝神", icon: "\uD83D\uDD6F️", description: "心神收束，下一次破境成功率提升" }, status_protect_meridians: { label: "护脉", icon: "\uD83E\uDEA2", description: "药力护住经脉，突破失败时降低修为损失" }, status_clear_mind: { label: "清心", icon: "\uD83E\uDEB7", description: "心境澄明，突破失败不会滋生心魔" }, status_cultivation_boost: { label: "养元", icon: "\uD83C\uDF3F", description: "药力温养丹田，下一次闭关修为提升" }, status_artifact_damaged: { label: "法宝受损", icon: "\uD83D\uDC94", description: "法宝损坏，威力大减" }, status_mana_depleted: { label: "法力枯竭", icon: "\uD83D\uDCA7", description: "法力耗尽，难以施展术法" }, status_hp_deficit: { label: "气血不足", icon: "❤️", description: "气血亏虚，行动受限" }, status_scorching: { label: "酷热", icon: "\uD83C\uDF21️", description: "烈日当空，持续受到灼烧" }, status_freezing: { label: "严寒", icon: "❄️", description: "天寒地冻，行动迟缓" }, status_toxic_air: { label: "瘴气", icon: "☁️", description: "毒气弥漫，持续中毒" }, status_formation_suppressed: { label: "阵法压制", icon: "⛓️", description: "被阵法压制，实力受限" }, status_abundant_qi: { label: "灵气充沛", icon: "\uD83C\uDF43", description: "灵气浓郁，修炼速度提升" } };
function D(r) { let e = y(r); return { label: e.label, icon: e.icon }; }
function W0(r) { return Fe(r); }
function pe(r) { return W0(r); }
function p_(r) { return La(r) || "❔"; }
function q_(r) { return Fe(r); }
var Xr = { 金: "element_metal", 木: "element_wood", 水: "element_water", 火: "element_fire", 土: "element_earth", 风: "element_wind", 雷: "element_thunder", 冰: "element_ice" }, Ua = { 金: D(Xr.金), 木: D(Xr.木), 水: D(Xr.水), 火: D(Xr.火), 土: D(Xr.土), 风: D(Xr.风), 雷: D(Xr.雷), 冰: D(Xr.冰) };
function P_(r) { var _a; return (_a = Ua[r]) !== null && _a !== void 0 ? _a : { label: r, icon: "" }; }
function hr(r) { var _a, _f; let e = y(r); return { label: e.label, icon: e.icon, shortLabel: (_a = e.shortLabel) !== null && _a !== void 0 ? _a : e.label, description: (_f = e.description) !== null && _f !== void 0 ? _f : "" }; }
var ca = { vitality: hr("vitality"), strength: hr("strength"), spirit: hr("spirit"), endurance: hr("endurance"), speed: hr("speed"), willpower: hr("willpower"), critRate: hr("attribute_crit_rate"), critDamage: hr("attribute_crit_damage"), damageReduction: hr("attribute_damage_reduction"), flatDamageReduction: hr("attribute_damage_reduction"), hitRate: hr("attribute_hit_rate"), dodgeRate: hr("attribute_dodge_rate") };
function g_(r) { var _a; return (_a = ca[r]) !== null && _a !== void 0 ? _a : { label: r, icon: "", shortLabel: r, description: "" }; }
function ue(r) { var _a; let e = y(r); return { label: e.label, icon: e.icon, description: (_a = e.description) !== null && _a !== void 0 ? _a : "" }; }
var j_ = { attack: ue("skill_type_attack"), heal: ue("skill_type_heal"), control: ue("skill_type_control"), debuff: ue("skill_type_debuff"), buff: ue("skill_type_buff") };
function B(r) { var _a; let e = y(r); return { label: e.label, icon: e.icon, description: (_a = e.description) !== null && _a !== void 0 ? _a : "" }; }
var v_ = { burn: B("status_burn"), bleed: B("status_bleed"), poison: B("status_poison"), stun: B("status_stun"), silence: B("status_silence"), root: B("status_root"), armor_up: B("status_armor_up"), speed_up: B("status_speed_up"), crit_rate_up: B("status_crit_rate_up"), armor_down: B("status_armor_down"), crit_rate_down: B("status_crit_rate_down"), weakness: B("status_weakness"), minor_wound: B("status_minor_wound"), major_wound: B("status_major_wound"), near_death: B("status_near_death"), breakthrough_focus: B("status_breakthrough_focus"), protect_meridians: B("status_protect_meridians"), clear_mind: B("status_clear_mind"), cultivation_boost: B("status_cultivation_boost"), artifact_damaged: B("status_artifact_damaged"), mana_depleted: B("status_mana_depleted"), hp_deficit: B("status_hp_deficit"), scorching: B("status_scorching"), freezing: B("status_freezing"), toxic_air: B("status_toxic_air"), formation_suppressed: B("status_formation_suppressed"), abundant_qi: B("status_abundant_qi") };
var x_ = { weapon: D("equipment_weapon"), armor: D("equipment_armor"), accessory: D("equipment_accessory") };
var s_ = { 丹药: D("consumable_pill"), 符箓: D("consumable_talisman"), 灵果: { label: "灵果", icon: "\uD83C\uDF51" } };
exports.Ub = s_;
var wd = { seed: { label: "灵植种子", icon: "\uD83C\uDF31" }, herb: D("material_herb"), ore: D("material_ore"), monster: D("material_monster"), tcdb: D("material_tcdb"), aux: D("material_aux"), gongfa_manual: D("material_gongfa_manual"), skill_manual: D("material_skill_manual") };
function R_(r) { var _a, _f; return (_f = (_a = wd[r]) === null || _a === void 0 ? void 0 : _a.label) !== null && _f !== void 0 ? _f : r; }
function D_(r) { var _a; return (_a = wd[r]) !== null && _a !== void 0 ? _a : { label: r, icon: "" }; }
var Nd = { hp: D("hp"), mp: D("mp"), maxHp: D("maxHp"), maxMp: D("maxMp"), spirit_stones: D("spirit_stones"), reputation: D("reputation"), lifespan: D("lifespan"), cultivation_exp: D("cultivation_exp"), comprehension_insight: D("comprehension_insight"), world_qi: D("world_qi"), material: D("material"), artifact: D("artifact"), consumable: D("consumable"), hp_loss: D("hp_loss"), mp_loss: D("mp_loss"), battle: D("battle") };
function $_(r) { var _a, _f; return (_f = (_a = Nd[r]) === null || _a === void 0 ? void 0 : _a.label) !== null && _f !== void 0 ? _f : r; }
function O_(r) { var _a; return (_a = Nd[r]) !== null && _a !== void 0 ? _a : { label: r, icon: "" }; }
function y(r) { var _a; return (_a = Ia[r]) !== null && _a !== void 0 ? _a : { label: r, icon: "" }; }
function Fe(r) { return y(r).label; }
function La(r) { return y(r).icon; }
class Md {
    constructor() {
        this.templates = new Map;
    }
    register(r) { this.templates.set(r.key, r); }
    get(r) { return this.templates.get(r); }
    has(r) { return this.templates.has(r); }
    getAll() { return Array.from(this.templates.values()); }
}
function w0(r, e, n) { var _a; let d = y(`status_${r}`); return { key: r, name: d.label, description: (_a = d.description) !== null && _a !== void 0 ? _a : "", effectDetails: [`自然恢复速度降低至 ${Math.round(e * 100)}%。`], display: { icon: d.icon, shortDesc: n }, hooks: { onNaturalRecovery: () => e } }; }
var sr = new Md;
sr.register({ key: "weakness", name: y("status_weakness").label, description: (_a = y("status_weakness").description) !== null && _a !== void 0 ? _a : "元气大伤，尚待恢复。", effectDetails: ["保留虚弱状态记录，不改变人物战斗属性。"], display: { icon: y("status_weakness").icon, shortDesc: "元气大伤，尚待恢复" }, hooks: {} });
sr.register(w0("minor_wound", 0.88, "自然恢复速度降低至88%，需要疗伤"));
sr.register(w0("major_wound", 0.68, "自然恢复速度降低至68%，需要疗伤"));
sr.register(w0("near_death", 0.42, "命悬一线，需要紧急疗伤"));
sr.register({ key: "breakthrough_focus", name: y("status_breakthrough_focus").label, description: (_f = y("status_breakthrough_focus").description) !== null && _f !== void 0 ? _f : "", effectDetails: ["下一次突破按药力获得额外成功率。"], display: { icon: y("status_breakthrough_focus").icon, shortDesc: "突破前凝神蓄势" }, hooks: {} });
sr.register({ key: "protect_meridians", name: y("status_protect_meridians").label, description: (_g = y("status_protect_meridians").description) !== null && _g !== void 0 ? _g : "", effectDetails: ["突破失败时按药力降低修为损失。"], display: { icon: y("status_protect_meridians").icon, shortDesc: "护住经脉，降低反噬" }, hooks: {} });
sr.register({ key: "clear_mind", name: y("status_clear_mind").label, description: (_h = y("status_clear_mind").description) !== null && _h !== void 0 ? _h : "", effectDetails: ["突破失败不会滋生心魔，服用时清除既有心魔。"], display: { icon: y("status_clear_mind").icon, shortDesc: "清心定神，减少杂念" }, hooks: {} });
sr.register({ key: "cultivation_boost", name: y("status_cultivation_boost").label, description: (_j = y("status_cultivation_boost").description) !== null && _j !== void 0 ? _j : "", effectDetails: ["下一次闭关修炼获得的修为按药力百分比提升。"], display: { icon: y("status_cultivation_boost").icon, shortDesc: "下一次闭关修为提升" }, hooks: {} });
function Ie(r) { return sr.get(r); }
var N0 = { hpPerHour: 0.28, mpPerHour: 0.38, toxicityPenaltyDivisor: 180 };
function qe(r, e, n) { return Math.max(e, Math.min(n, r)); }
function M0(r) { return Number.isFinite(r) ? Math.max(0, Math.floor(r)) : 0; }
function bd(r, e) { let n = typeof (r === null || r === void 0 ? void 0 : r.current) === "number" && Number.isFinite(r.current) ? Math.floor(r.current) : e; return qe(n, 0, e); }
function ka(r) {
    if (r.kind !== "time")
        return null;
    let e = Date.parse(r.expiresAt);
    return Number.isFinite(e) ? e : null;
}
function b0(r, e = new Date) {
    if (typeof r.usesRemaining === "number" && r.usesRemaining <= 0)
        return !1;
    let n = ka(r.duration);
    if (n !== null && n <= e.getTime())
        return !1;
    return !0;
}
function Id(r, e = new Date) {
    var _a;
    let n = r;
    return ((_a = n === null || n === void 0 ? void 0 : n.statuses) !== null && _a !== void 0 ? _a : []).filter((m) => b0(m, e)).reduce((m, a) => {
        var _a, _f, _g;
        let i = (_g = (_a = Ie(a.key)) === null || _a === void 0 ? void 0 : (_f = _a.hooks).onNaturalRecovery) === null || _g === void 0 ? void 0 : _g.call(_f, a, n !== null && n !== void 0 ? n : { version: 1, resources: { hp: { current: 0 }, mp: { current: 0 } }, gauges: { pillToxicity: 0 }, tracks: { bodyCultivation: Y0(), tempering: { vitality: { level: 0, progress: 0 }, spirit: { level: 0, progress: 0 }, wisdom: { level: 0, progress: 0 }, speed: { level: 0, progress: 0 }, willpower: { level: 0, progress: 0 } }, marrowWash: { version: 1, level: 0, progress: 0, realm: 0, breakthroughs: 0 } }, counters: { longTermPillUsesByRealm: {}, cultivationPillUsesByRealm: {}, longevityPillUsesByRealm: {}, bodyCultivationPillUses: 0 }, statuses: [], timestamps: {} });
        if (typeof i !== "number" || !Number.isFinite(i))
            return m;
        return Math.min(m, i);
    }, 1);
}
function Cd(r) {
    let { resource: e, current: n, max: d, conditionInput: m, toxicityPenaltyMultiplier: a = 1, naturalRecoveryMultiplier: i = 1, now: t = new Date } = r, o = Math.max(0, n), h = M0(d);
    if (o >= h)
        return { perHour: 0, timeToFullMs: 0, isFull: !0 };
    let P = Ud(m, a), j = Id(m, t), g = e === "hp" ? N0.hpPerHour : N0.mpPerHour, s = h * g * P * j * Math.max(0, i);
    if (s <= 0)
        return { perHour: 0, timeToFullMs: null, isFull: !1 };
    let V = h - o;
    return { perHour: s, timeToFullMs: Math.ceil(V / s * 3600000), isFull: !1 };
}
function Fd(r) { let { resource: e, current: n, max: d, elapsedHours: m, conditionInput: a, toxicityPenaltyMultiplier: i, naturalRecoveryMultiplier: t, now: o } = r, h = Cd({ resource: e, current: n, max: d, conditionInput: a, toxicityPenaltyMultiplier: i, naturalRecoveryMultiplier: t, now: o }), P = Math.max(0, Math.min(d - n, Math.floor(h.perHour * m))), j = qe(n + P, 0, d); return { ...Cd({ resource: e, current: j, max: d, conditionInput: a, toxicityPenaltyMultiplier: i, naturalRecoveryMultiplier: t, now: o }), current: j, max: d, recovered: P }; }
function Q_(r) { var _a; let { conditionInput: e, toxicityPenaltyMultiplier: n = 1, naturalRecoveryMultiplier: d = 1, now: m } = r, a = M0(r.maxHp), i = M0(r.maxMp), t = bd(e === null || e === void 0 ? void 0 : e.resources.hp, a), o = bd(e === null || e === void 0 ? void 0 : e.resources.mp, i), h = Date.parse((_a = e === null || e === void 0 ? void 0 : e.timestamps.lastRecoveryAt) !== null && _a !== void 0 ? _a : ""), P = Number.isFinite(h), j = P ? Math.max(0, m.getTime() - h) : 0, g = j / 3600000, s = Ud(e, n), V = Id(e, m), or = s * V * Math.max(0, d), v = Fd({ resource: "hp", current: t, max: a, elapsedHours: g, conditionInput: e, toxicityPenaltyMultiplier: n, naturalRecoveryMultiplier: d, now: m }), O = Fd({ resource: "mp", current: o, max: i, elapsedHours: g, conditionInput: e, toxicityPenaltyMultiplier: n, naturalRecoveryMultiplier: d, now: m }); return { resources: { hp: { current: v.current, max: v.max }, mp: { current: O.current, max: O.max } }, recovery: { hp: v, mp: O }, elapsedMs: j, recoveryFactor: or, timestampValid: P }; }
function Ud(r, e = 1) { var _a; let n = kr(r).tracks.qi_blood.level, d = qe(1 - n * 0.003, 0.75, 1); return qe(1 - Math.max(0, (_a = r === null || r === void 0 ? void 0 : r.gauges.pillToxicity) !== null && _a !== void 0 ? _a : 0) / N0.toxicityPenaltyDivisor * Math.max(0, e) * d, 0.3, 1); }
function Ea(r, e = 1) { var _a; let n = Math.max(0, (_a = r === null || r === void 0 ? void 0 : r.gauges.pillToxicity) !== null && _a !== void 0 ? _a : 0); return qe(n / Bd * Math.max(0, e), 0, 0.18); }
function y_(r, e = 1) { return Number((Ea(r, e) * 100).toFixed(1)); }
function Y_(r) {
    var _a;
    let e = Math.max(0, (_a = r === null || r === void 0 ? void 0 : r.gauges.pillToxicity) !== null && _a !== void 0 ? _a : 0);
    if (e >= 700)
        return { key: "critical", label: "毒火攻心" };
    if (e >= 400)
        return { key: "heavy", label: "丹毒郁结" };
    if (e >= 200)
        return { key: "light", label: "丹毒轻染" };
    return { key: "none", label: "无明显丹毒" };
}
var Ue = "cultivation_boost", cd = 0, Sa = 100;
exports.Xc = Ue;
function Ta(r, e, n) { return Math.max(e, Math.min(n, r)); }
function za(r) {
    if (!Number.isFinite(r))
        return cd;
    return Number(Ta(r, cd, Sa).toFixed(4));
}
function C0(r) { var _a; let e = r.payload, n = typeof (e === null || e === void 0 ? void 0 : e.boostPercent) === "number" ? e.boostPercent : void 0, d = typeof (e === null || e === void 0 ? void 0 : e.retreatExpMultiplier) === "number" ? e.retreatExpMultiplier - 1 : void 0; return za((_a = n !== null && n !== void 0 ? n : d) !== null && _a !== void 0 ? _a : 0); }
function F0(r) { let e = Number((C0(r) * 100).toFixed(1)); return `下次闭关修为 +${Number.isInteger(e) ? e.toFixed(0) : e}%`; }
function w_(r, e = new Date) {
    var _a;
    let d = ((_a = r === null || r === void 0 ? void 0 : r.statuses) !== null && _a !== void 0 ? _a : []).filter((m) => { var _a; return m.key === Ue && b0(m, e) && ((_a = m.usesRemaining) !== null && _a !== void 0 ? _a : 1) > 0; });
    if (d.length === 0)
        return null;
    return d.reduce((m, a) => C0(a) > C0(m) ? a : m);
}
var ri = { low: 0.9, middle: 1, high: 1.1, perfect: 1.3 };
exports.$c = ri;
var ei = { low: { grade: "low", label: "下品", effectMultiplier: 0.9, toxicityMultiplier: 1.35, colorClass: "text-tier-fan" }, middle: { grade: "middle", label: "中品", effectMultiplier: 1, toxicityMultiplier: 1, colorClass: "text-tier-xuan" }, high: { grade: "high", label: "上品", effectMultiplier: 1.1, toxicityMultiplier: 0.65, colorClass: "text-tier-tian" }, perfect: { grade: "perfect", label: "完美", effectMultiplier: 1.3, toxicityMultiplier: 0, colorClass: "text-tier-shen" } };
function Ld(r) { return r ? ei[r].label : "旧制"; }
var kd = "breakthrough_focus", Ed = "protect_meridians", fd = "clear_mind", ni = 0.06, di = 0.4;
exports.bd = kd;
exports.cd = Ed;
exports.dd = fd;
function Sd(r, e, n) { return Math.max(e, Math.min(n, r)); }
function Td(r) {
    var _a;
    let e = (_a = r.payload) === null || _a === void 0 ? void 0 : _a.breakthroughChanceBonus;
    if (typeof e !== "number" || !Number.isFinite(e))
        return ni;
    return Sd(e, 0, 1);
}
function zd(r) {
    var _a;
    let e = (_a = r.payload) === null || _a === void 0 ? void 0 : _a.failureExpLossReductionPercent;
    if (typeof e !== "number" || !Number.isFinite(e))
        return di;
    return Sd(e, 0, 1);
}
function I0(r) { return Z0[r]; }
function mi(r) { return Od[r]; }
function U0(r) { return Z0[r]; }
function rm(r) {
    switch (r.family) {
        case "longevity": return "longevity";
        default: return "none";
    }
}
function em(r, e) { let n = r === "cultivation" ? mi(e) : r === "longevity" ? U0(e) : I0(e); return Number.isFinite(n) ? n : null; }
function nm(r, e) {
    if (r === "none")
        return null;
    if (!e)
        return r === "longevity" ? "寿元丹上限随境界变化" : "服用上限随境界变化";
    let n = em(r, e);
    if (n === null)
        return r === "longevity" ? "寿元丹上限随境界变化" : "服用上限随境界变化";
    if (r === "longevity")
        return `寿元丹上限 ${n} 次`;
    return `服用上限 ${n} 次`;
}
function dm(r, e) {
    if (r === "none")
        return null;
    if (!e)
        return r === "longevity" ? "寿元丹服用上限：随当前境界变化" : "服用上限：随当前境界变化";
    let n = em(r, e);
    if (n === null)
        return r === "longevity" ? "寿元丹服用上限：随当前境界变化" : "服用上限：随当前境界变化";
    if (r === "longevity")
        return `寿元丹服用上限：${n} 次`;
    return `服用上限：${n} 次`;
}
var f_ = 20;
exports.gd = f_;
var mm = { 炼气: 10, 筑基: 20, 金丹: 35, 元婴: 50, 化神: 70, 炼虚: 90, 合体: 120, 大乘: 120, 渡劫: 120 };
function c0(r) { return 120 + 60 * Math.max(0, Math.floor(r)); }
function ai(r) { return r ? mm[r] : mm.炼气; }
function ii(r) { var _a, _f, _g, _h, _j; let e = (_a = r === null || r === void 0 ? void 0 : r.tracks) === null || _a === void 0 ? void 0 : _a.marrowWash, n = Math.max(0, Math.floor((_f = e === null || e === void 0 ? void 0 : e.level) !== null && _f !== void 0 ? _f : 0)), d = Math.max(0, Math.floor((_g = e === null || e === void 0 ? void 0 : e.progress) !== null && _g !== void 0 ? _g : 0)), m = Math.max(0, Math.floor((_h = e === null || e === void 0 ? void 0 : e.breakthroughs) !== null && _h !== void 0 ? _h : 0)), a = Math.max(0, Math.floor((_j = e === null || e === void 0 ? void 0 : e.realm) !== null && _j !== void 0 ? _j : 0)), i = Math.max(m, a), t = i, o = am({ breakthroughs: i }), h = Math.min(n, o), P = n >= o ? 0 : d; return { version: 1, level: h, progress: P, realm: t, breakthroughs: i }; }
function ti(r) { return r <= 0 ? "未破限" : `第${r}重`; }
function am(r) { var _a; return (Math.max(0, Math.floor((_a = r.breakthroughs) !== null && _a !== void 0 ? _a : 0)) + 1) * 10; }
function S_(r, e = {}) { let n = ii(r), d = ai(e.cultivatorRealm), m = am(n), a = m <= d; return { level: n.level, progress: n.progress, threshold: c0(n.level), realm: n.realm, realmLabel: ti(n.realm), breakthroughs: n.breakthroughs, levelCap: d, nextBreakthroughLevel: a ? m : null, canBreakthrough: a && n.level >= m }; }
var im = { ...Object.fromEntries(S.map((r) => { let e = le[r]; return [`body.${r}`, { key: `body.${r}`, name: e.name, shortDesc: e.shortDesc, thresholdByLevel: Hr, reward: { kind: "body_modifier" } }]; })), ...Object.fromEntries(Object.entries(oe).map(([r, e]) => { let n = le[e]; return [`tempering.${r}`, { key: `tempering.${r}`, name: n.name, shortDesc: `${n.shortDesc}（旧炼体进度已重铸）`, thresholdByLevel: Hr, reward: { kind: "body_modifier" } }]; })), marrow_wash: { key: "marrow_wash", name: "洗髓", shortDesc: "升级后获得 1 点自由属性点，破限后强化后天灵根强度", thresholdByLevel: c0, reward: { kind: "none" } } };
function L0(r) {
    if (be(r)) {
        let e = Ce(r);
        return im[`body.${e}`];
    }
    return im[r];
}
function ce(r) { let e = Number((r * 100).toFixed(1)); return `${Number.isInteger(e) ? e.toFixed(0) : e}%`; }
function Pe(r) { var _a, _f; return (_f = (_a = Ie(r)) === null || _a === void 0 ? void 0 : _a.name) !== null && _f !== void 0 ? _f : r; }
function k0(r) {
    if (r.mode === "percent")
        return `恢复最大${pe(r.resource)} ${ce(r.value)}`;
    return `恢复${pe(r.resource)} ${r.value}`;
}
function hi(r) {
    if (r.mode === "percent")
        return `最大${pe(r.resource)} ${ce(r.value)}`;
    return `${pe(r.resource)} ${r.value}`;
}
function S0(r) { return `丹毒 ${r > 0 ? "+" : ""}${r}`; }
function oi(r) {
    let { appearance: e } = r.alchemyMeta;
    if (!e)
        return;
    return { grade: e, label: Ld(e) };
}
function E0(r) { return r === "cultivation_exp" ? W0("cultivation_exp") : "感悟"; }
function tm(r) { return `寿元 +${Math.max(0, Math.floor(r))} 年`; }
function T0(r) { return Wd(r); }
function li(r, e) {
    let n = (() => {
        switch (r) {
            case "long_term": return I0(e);
            case "longevity": return U0(e);
            case "cultivation":
            case "none": return null;
        }
    })();
    return Number.isFinite(n) ? n : null;
}
function _i(r, e, n) { var _a, _f, _g, _h; let d = (_a = r.counters) !== null && _a !== void 0 ? _a : {}, m = (_f = d.longTermPillUsesByRealm) !== null && _f !== void 0 ? _f : {}, a = (_g = d.cultivationPillUsesByRealm) !== null && _g !== void 0 ? _g : {}, i = (_h = d.longevityPillUsesByRealm) !== null && _h !== void 0 ? _h : {}, t = e === "long_term" ? m[n] : e === "cultivation" ? a[n] : e === "longevity" ? i[n] : 0; return Number.isFinite(t) ? Math.max(0, Math.floor(t !== null && t !== void 0 ? t : 0)) : 0; }
function hm(r, e) {
    if (r === "none" || !(e === null || e === void 0 ? void 0 : e.realm) || !e.condition)
        return null;
    let n = li(r, e.realm);
    if (n === null)
        return null;
    let d = _i(e.condition, r, e.realm), m = Math.max(0, n - d);
    return { keyword: r === "longevity" ? `寿元丹剩余 ${m}/${n}` : `剩余 ${m}/${n}`, rule: `本境界已服 ${d}/${n}，尚可服 ${m} 颗` };
}
function f0(r) { return rm(r); }
function Jr(r) {
    switch (r) {
        case "healing": return "疗伤";
        case "mana": return "回元";
        case "detox": return "解毒";
        case "beast_cultivation": return "灵兽修为";
        case "cultivation": return Fe("cultivation_exp");
        case "insight": return "感悟";
        case "breakthrough": return "破境";
        case "tempering": return "炼体";
        case "marrow_wash": return "洗髓";
        case "longevity": return "延寿";
        case "hybrid": return "复合";
    }
}
function Er(r) {
    var _a, _f, _g, _h;
    switch (r.type) {
        case "restore_resource": return k0(r);
        case "change_gauge": return S0(r.delta);
        case "gain_beast_cultivation": return `灵兽修为 +${r.value}`;
        case "gain_progress": return `${E0(r.target)} +${r.value}`;
        case "increase_lifespan": return tm(r.value);
        case "remove_status": return `化解「${Pe(r.status)}」`;
        case "add_status":
            if (r.status === Ue)
                return `${F0(r)}（可用 ${(_a = r.usesRemaining) !== null && _a !== void 0 ? _a : 1} 次）`;
            if (r.status === kd)
                return `${Pe(r.status)}：破境成功率 +${ce(Td(r))}（可用 ${(_f = r.usesRemaining) !== null && _f !== void 0 ? _f : 1} 次）`;
            if (r.status === Ed)
                return `${Pe(r.status)}：突破失败修为损失降低 ${ce(zd(r))}（可用 ${(_g = r.usesRemaining) !== null && _g !== void 0 ? _g : 1} 次）`;
            if (r.status === fd)
                return `${Pe(r.status)}：突破失败不会滋生心魔（可用 ${(_h = r.usesRemaining) !== null && _h !== void 0 ? _h : 1} 次）`;
            return `获得「${Pe(r.status)}」${typeof r.usesRemaining === "number" ? `（可用 ${r.usesRemaining} 次）` : ""}`;
        case "advance_track":
            if (r.track === "marrow_wash")
                return `推进洗髓进度 +${r.value}，升级可获得自由属性点`;
            return `推进${L0(r.track).name} +${r.value}`;
    }
}
function om(r) {
    switch (r.family) {
        case "healing":
        case "mana": {
            let e = r.operations.find((n) => n.type === "restore_resource");
            return e ? k0(e) : `${Jr(r.family)}药效`;
        }
        case "hybrid": {
            let e = r.operations.filter((n) => n.type === "restore_resource");
            if (e.length === 0)
                return "复合药效";
            return e.map((n, d) => d === 0 ? k0(n) : hi(n)).join(" / ");
        }
        case "detox": {
            let e = r.operations.find((n) => n.type === "change_gauge");
            return e ? S0(e.delta) : "调理丹毒";
        }
        case "insight": {
            let e = r.operations.find((n) => n.type === "gain_progress");
            return e ? `${E0(e.target)} +${e.value}` : `${Jr(r.family)}药效`;
        }
        case "beast_cultivation": return "灵兽修为";
        case "cultivation": {
            let e = r.operations.find((d) => d.type === "add_status" && d.status === Ue);
            if (e)
                return F0(e);
            let n = r.operations.find((d) => d.type === "gain_progress");
            return n ? `${E0(n.target)} +${n.value}` : `${Jr(r.family)}药效`;
        }
        case "breakthrough": {
            let e = r.operations.find((d) => d.type === "add_status"), n = T0(r);
            if (!e)
                return n ? `${n}，助力破境` : "助力破境";
            return n ? `${n}：${Er(e)}` : Er(e);
        }
        case "tempering":
        case "marrow_wash": {
            let e = r.operations.find((n) => n.type === "advance_track");
            return e ? Er(e) : "推进修炼进度";
        }
        case "longevity": {
            let e = r.operations.find((n) => n.type === "increase_lifespan");
            return e ? Er(e) : "延续寿元";
        }
    }
}
function ui(r, e) {
    var _a, _f;
    let n = r.operations.find((a) => a.type === "increase_lifespan"), d = [Jr(r.family), r.family === "longevity" && n ? tm(n.value) : null, r.family === "breakthrough" ? T0(r) : null, (_f = (_a = hm(f0(r), e)) === null || _a === void 0 ? void 0 : _a.keyword) !== null && _f !== void 0 ? _f : nm(f0(r), e === null || e === void 0 ? void 0 : e.realm)].filter((a) => Boolean(a)), m = r.operations.find((a) => a.type === "change_gauge");
    if (m)
        d.push(S0(m.delta));
    return d.slice(0, 3);
}
function z0(r) { return r.operations.filter((e) => e.type !== "change_gauge" || e.delta < 0).map(Er); }
function pi(r) { let e = z0(r); return e.length > 0 ? e.join(" / ") : om(r); }
function qi(r, e) {
    var _a, _f;
    let n = r.operations.filter((a) => a.type === "change_gauge" && a.delta >= 0).map((a) => Er(a));
    if (r.operations.some((a) => a.type === "gain_beast_cultivation"))
        return n;
    let d = f0(r), m = (_f = (_a = hm(d, e)) === null || _a === void 0 ? void 0 : _a.rule) !== null && _f !== void 0 ? _f : dm(d, e === null || e === void 0 ? void 0 : e.realm);
    if (m)
        n.push(m);
    return n;
}
function Pi(r) {
    let e = Math.max(0, Math.floor(r.level)), n = Math.max(0, Math.floor(r.progress)), d = Math.max(0, Math.floor(r.value));
    while (d > 0) {
        let a = Math.max(1, r.thresholdByLevel(e)) - n;
        if (d < a) {
            n += d;
            break;
        }
        d -= a, e += 1, n = 0;
    }
    return { level: e, progress: n, threshold: Math.max(1, r.thresholdByLevel(e)) };
}
function gi(r, e) {
    var _a;
    if (!Me(r.track) && !be(r.track))
        return [];
    let n = Ce(r.track), d = kr(e), m = d.tracks[n], a = _e[d.realm].softTrackCap, i = Pi({ level: m.level, progress: m.progress, value: r.value, thresholdByLevel: Hr }), t = K0(e).tracks.find((s) => s.key === n), o = { ...e, tracks: { ...e.tracks, bodyCultivation: { ...d, tracks: { ...d.tracks, [n]: { level: i.level, progress: i.progress } } } } }, h = K0(o).tracks.find((s) => s.key === n), P = (_a = t === null || t === void 0 ? void 0 : t.name) !== null && _a !== void 0 ? _a : L0(r.track).name, j = Hr(m.level), g = [`推进轨道：${P.replace("炼体·", "")} +${r.value}`, `当前肉身境界单轨上限：Lv.${a}`];
    if (m.level >= a)
        return g.push("已达上限，请先完成肉身破限"), g;
    if (i.level > a || i.level === a && i.progress > 0)
        return g.push(`预计超过上限：Lv.${m.level} ${m.progress}/${j} -> Lv.${i.level} ${i.progress}/${i.threshold}`, "请先完成肉身破限后再服用"), g;
    if (g.push(`预计进度：Lv.${m.level} ${m.progress}/${j} -> Lv.${i.level} ${i.progress}/${i.threshold}`), i.level > m.level && h)
        g.push(`升级后收益：${h.currentEffects.join("、")}`, `下个节点：Lv.${h.nextMilestoneLevel}`);
    else if (t)
        g.push(`当前收益：${t.currentEffects.join("、")}`);
    return g;
}
function lm(r, e) {
    if (!(e === null || e === void 0 ? void 0 : e.condition))
        return [];
    return r.operations.flatMap((n) => n.type === "advance_track" ? gi(n, e.condition) : []);
}
function ji(r) { let { alchemyMeta: e } = r.spec, n = T0(r.spec); return [n ? `破境用途：${n}` : void 0, e.breakthroughTargetRealm ? `目标大境界：${e.breakthroughTargetRealm}` : void 0].filter((d) => Boolean(d)); }
function _m(r, e) { let n = lm(r.spec, e), d = ji(r); return { familyLabel: Jr(r.spec.family), appearance: oi(r.spec), primaryEffect: om(r.spec), effectSummary: pi(r.spec), keywordLabels: ui(r.spec, e), detailGroups: [{ key: "core-effects", role: "effect", title: "核心药效", lines: z0(r.spec) }, ...n.length > 0 ? [{ key: "track-preview", role: "preview", title: "服用预览", lines: n }] : [], { key: "cost-and-rules", role: "restriction", title: "代价", lines: qi(r.spec, e) }, ...d.length ? [{ key: "alchemy-info", role: "source", collapsible: !0, title: "破境信息", lines: d }] : []], flavorText: void 0 }; }
function vi(r, e) {
    var _a;
    if (r.spec.operations.some((i) => i.type === "gain_beast_cultivation"))
        return [];
    if (!e)
        return [];
    let n = (_a = r.quality) !== null && _a !== void 0 ? _a : "凡品", d = Vd(e), m = Ad[e], a = official_chunk_wje6zqc2_js_1.qf[n];
    if (a > official_chunk_wje6zqc2_js_1.qf[m])
        return [`当前境界最多可承受${m}灵果，此果药力过盛`];
    if (a < official_chunk_wje6zqc2_js_1.qf[d])
        return [`当前境界至少需要${d}灵果，此果药力过于稀薄`];
    return [];
}
function um(r, e) { var _a; let n = z0(r.spec), d = lm(r.spec, e); return { familyLabel: Jr(r.spec.family), primaryEffect: (_a = n[0]) !== null && _a !== void 0 ? _a : "天地造化药效", effectSummary: n.join(" / ") || "天地造化药效", keywordLabels: [Jr(r.spec.family)], detailGroups: [{ key: "core-effects", role: "effect", title: "核心效用", lines: n }, ...d.length > 0 ? [{ key: "track-preview", role: "preview", title: "服用预览", lines: d }] : [], { key: "fruit-rules", role: "restriction", title: "服用规则", lines: [...vi(r, e === null || e === void 0 ? void 0 : e.realm)] }], flavorText: r.description }; }
var Le = "attribute_reset", pm = "归元洗髓符";
exports.fe = pm;
function rn(r) { return r === "attribute_reset"; }
var ge = "identity_reshape", ju = "改天换地符";
exports.cc = ju;
var vu = 2, xu = 200;
exports.dc = vu;
exports.ec = xu;
function c(...r) { return r.map((e, n) => ({ id: String.fromCharCode(97 + n), label: e })); }
var xi = [{ id: "dao-water", source: "《道德经》", quote: "上善若水，水善利万物而不争。", prompt: "身处争流，你愿如何自处？", options: c("润物不争", "顺势而行", "聚流破障") }, { id: "dao-self-knowing", source: "《道德经》", quote: "知人者智，自知者明。", prompt: "你更愿先照见什么？", options: c("自己的本心", "众人的所求", "世局的变化") }, { id: "dao-bend-whole", source: "《道德经》", quote: "曲则全，枉则直。", prompt: "遭逢逆境时，你会如何？", options: c("守柔待时", "迎难直进", "另辟蹊径") }, { id: "dao-stillness", source: "《道德经》", quote: "致虚极，守静笃。", prompt: "心念纷乱时，你从何处求解？", options: c("静中观变", "行中求证", "向人问道") }, { id: "dao-first-step", source: "《道德经》", quote: "千里之行，始于足下。", prompt: "面对遥远道途，你先做什么？", options: c("走好眼前一步", "先定最终归处", "等待真正契机") }, { id: "zhuangzi-deep-water", source: "《庄子·逍遥游》", quote: "水之积也不厚，则其负大舟也无力。", prompt: "远志与根基之间，你如何取舍？", options: c("厚积根基", "借势远行", "以险境磨砺自己") }, { id: "zhuangzi-right-wrong", source: "《庄子·齐物论》", quote: "彼亦一是非，此亦一是非。", prompt: "遇见相反立场时，你会如何？", options: c("求同存异", "坚守己见", "暂忘是非之分") }, { id: "zhuangzi-natural-pattern", source: "《庄子·养生主》", quote: "依乎天理……因其固然。", prompt: "困局横在眼前，你从哪里破局？", options: c("循理取隙", "以力破局", "退后重新谋划") }, { id: "zhuangzi-empty-room", source: "《庄子·人间世》", quote: "虚室生白，吉祥止止。", prompt: "怎样的心境最接近真实的你？", options: c("清空成见", "守住所信", "让喧嚣催我醒来") }, { id: "yi-heaven", source: "《周易·乾》", quote: "天行健，君子以自强不息。", prompt: "你相信力量主要来自哪里？", options: c("不息的修行", "同行者的扶持", "长期蓄势后的决断") }, { id: "yi-earth", source: "《周易·坤》", quote: "地势坤，君子以厚德载物。", prompt: "面对众生牵挂，你愿承担什么？", options: c("包容承载", "明辨取舍", "只守护最亲近之人") }, { id: "yi-humility", source: "《周易·谦》", quote: "谦谦君子，卑以自牧也。", prompt: "声名来到身前时，你会如何？", options: c("敛锋自省", "当仁不让", "功成身退") }, { id: "yi-change", source: "《周易·系辞下》", quote: "穷则变，变则通，通则久。", prompt: "道路已尽时，你会如何？", options: c("主动变通", "坚守到底", "暂退蓄势") }, { id: "yi-many-views", source: "《周易·系辞上》", quote: "仁者见之谓之仁，知者见之谓之知。", prompt: "面对同一件事的多种解释，你相信什么？", options: c("接纳多解", "追寻唯一真义", "让结果作答") }, { id: "clarity-stillness", source: "《太上老君说常清静经》", quote: "人能常清静，天地悉皆归。", prompt: "世事扰心时，你如何安顿自己？", options: c("守静澄心", "入世解纷", "随性而化") }, { id: "response-and-retribution", source: "《太上感应篇》", quote: "祸福无门，惟人自召。", prompt: "面对因果与取舍，你最看重什么？", options: c("慎独积善", "先问本心", "权衡远近得失") }], su = new Map(xi.map((r) => [r.id, r]));
var Du = 240, $u = 1, Ou = 360000, Au = 2400;
exports.ge = Du;
exports.he = $u;
exports.ie = Ou;
exports.je = Au;
var si = { dungeon_start: 50, wild_search: 2, retreat_10_years: 4, breakthrough_attempt: 20, alchemy_improvised: 1, alchemy_formula: 1, equipment_forge: 7, manual_enlightenment: 1, inscription_draw: 1, marrow_wash_breakthrough: 20, market_identify: 1, black_market_entry: 5, spirit_field_care: 5 }, ke = { qi_restore_small: { amount: 50, label: "小聚灵符" }, qi_restore_medium: { amount: 100, label: "中聚灵符" }, qi_restore_large: { amount: 200, label: "大聚灵符" }, qi_restore_fill_to_max: { amount: "fill_to_max", label: "天地引气符" } };
exports.ke = si;
function Ee(r) { return Object.prototype.hasOwnProperty.call(ke, r); }
function Vu(r) { return Math.ceil(Math.max(0, r) / 10) * si.retreat_10_years; }
var fe = "sect_meridian_reset", qm = "洗脉符";
function en(r) { return r === "sect_meridian_reset"; }
var je = "sect_transfer", Xu = "欺天符";
exports.me = Xu;
var ve = "friend_mail_send", xe = "auction_private_listing", Zu = 200;
exports.ne = Zu;
var Ri = { [Le]: "根基属性重洗", [je]: "欺天符·无损转宗", [fe]: "洗脉符·流派节点重置", fate_reshape: "命格重塑", [ge]: "改天换地·身份重塑", draw_gongfa: "旧版功法抽取（已停用）", draw_skill: "旧版神通抽取（已停用）", [ve]: "传音玉简·好友传音", [xe]: "拍卖行·专属交易" }, Di = { [je]: "/game/sect/transfer", fate_reshape: "/game/fate-reshape", [ge]: "/game/identity-reshape", [ve]: "/game/mail", [xe]: "/game/auction" }, $i = { [Le]: "使用", [fe]: "使用", [je]: "前往欺天台转宗", fate_reshape: "前往重塑", [ge]: "前往改命", [ve]: "去传音", [xe]: "去上架" }, bu = { [Le]: "【可在背包中直接使用，重置六维自由分配并返还属性点】", [fe]: "【战斗外使用，清空新版宗门两流派节点，保留共用深度】", [je]: "【前往欺天台查看转宗后的变化，确认成功后才会消耗】", fate_reshape: "【前往命格重塑功能页启封，开启时立即扣除】", [ge]: "【前往身份重塑文戏启封，开启时立即扣除】", draw_gongfa: "【旧版抽取已停用，符箓暂存，后续玩法另行设计】", draw_skill: "【旧版抽取已停用，符箓暂存，后续玩法另行设计】", [ve]: "【前往传音玉简，给好友发送传音时消耗；不足时可去万界商行购买】", [xe]: "【前往拍卖行，上架专属交易时消耗；不足时可去万界商行购买】" };
function Oi(r) {
    if (!Ee(r))
        return null;
    let e = ke[r].amount;
    return e === "fill_to_max" ? "将天地灵气补至基础上限" : `恢复 ${e} 点天地灵气`;
}
function Cu(r) { return Zr(r) && Ee(r.spec.scenario); }
function Fu(r) { return Zr(r) && rn(r.spec.scenario); }
function Iu(r) { return Zr(r) && en(r.spec.scenario); }
function Pm(r) {
    var _a;
    if (Ee(r))
        return ke[r].label;
    return (_a = Ri[r]) !== null && _a !== void 0 ? _a : "专属玩法符箓";
}
function Uu(r) {
    if (!Zr(r))
        return;
    return Di[r.spec.scenario];
}
function cu(r) {
    var _a;
    if (!Zr(r))
        return null;
    return (_a = $i[r.spec.scenario]) !== null && _a !== void 0 ? _a : null;
}
function gm(r) {
    var _a, _f;
    if (!Zr(r))
        return [];
    let e = r.spec.scenario;
    if (["draw_gongfa", "draw_skill"].includes(e))
        return [{ value: "旧版抽取已停用，符箓暂存；暂不转换、不补偿，后续玩法另行设计。" }];
    let n = Oi(e), d;
    if (rn(e))
        d = [{ label: "用途", value: "重置六维自由分配，返还已投入的可分配属性点" }, { label: "使用方式", value: "可在背包中直接使用，也可在根基属性页确认启封" }, { value: (_a = r.spec.notes) !== null && _a !== void 0 ? _a : `${pm}启封后，六维回到当前境界自然成长值。` }];
    else if (en(e))
        d = [{ label: "用途", value: "清空新版宗门两流派各一套节点方案" }, { label: "保留", value: "共用经脉深度、心法等级、当前流派、道印与装备" }, { label: "使用方式", value: "可在背包中直接使用；没有已选节点时不会消耗" }, { value: (_f = r.spec.notes) !== null && _f !== void 0 ? _f : `${qm}启封后，可按已解锁的共用深度重新参悟；平时也可免费逐层调整节点。` }];
    else
        d = [...n ? [{ label: "用途", value: n }] : [], { label: "使用方式", value: n ? "可在背包中直接使用" : "需在对应玩法入口使用" }, ...r.spec.notes ? [{ value: r.spec.notes }] : []];
    return d.filter((m) => Boolean(m.value));
}
var Ai = { effect: "positive", preview: "normal", restriction: "warning", source: "muted" }, jm = (r) => {
    let e = { ...wr.parse(r.instanceData), quantity: r.quantity };
    return { summary: { icon: e.type === "丹药" ? "\uD83C\uDF15" : e.type === "灵果" ? "\uD83C\uDF51" : "\uD83E\uDDE7", color: rr[e.spec.kind === "talisman" ? "仙品" : e.quality], tier: e.quality, type: e.type }, preview: (n) => {
            let d = X("类型", `${e.quality} · ${e.type}`);
            if (e.spec.kind === "talisman")
                return { header: [d, er(r, n)], sections: [{ title: "道具资料", entries: [{ kind: "line", label: "用途", value: Pm(e.spec.scenario) }] }, { title: "符箓效用", entries: gm(e).map((a) => ({ kind: "line", ...a })) }], description: e.description };
            let m = e.spec.kind === "pill" ? _m({ ...e, spec: e.spec }, n) : um({ ...e, spec: e.spec }, n);
            return { header: [d, ...m.appearance ? [X("丹相", m.appearance.label)] : [], X("功能", m.familyLabel), er(r, n)], sections: m.detailGroups.filter((a) => a.lines.length).map((a) => ({ title: a.title, entries: a.lines.flatMap((i) => ir(i)), tone: Ai[a.role], ...a.collapsible ? { collapsible: !0 } : {} })), description: e.spec.kind === "pill" ? void 0 : e.description };
        } };
};
var Vi = { weapon: "⚔️", head: "\uD83D\uDC51", armor: "\uD83E\uDD4B", necklace: "\uD83D\uDCFF", belt: "\uD83C\uDF97️", footwear: "\uD83D\uDC62" }, vm = (r) => `${r >= 0 ? "+" : ""}${r}`;
function Bi(r) {
    let e = [];
    for (let a of ["baseStats", "attributeBonuses"]) {
        let i = r[a].map((t) => ({ label: a === "attributeBonuses" ? T[t.attr] : Ur[t.attr], value: vm(t.value), numeric: !0, tone: a === "attributeBonuses" ? "positive" : "normal" }));
        if (i.length)
            e.push({ title: a === "baseStats" ? "器胚属性" : "附灵属性", entries: i.map((t) => ({ kind: "line", ...t })) });
    }
    let n = r.formationInscriptions.flatMap((a, i) => {
        if (!a)
            return [];
        let t = Or(a.patternId);
        return [{ label: `第${i + 1}孔`, value: `${t.name} · ${a.level}级` }, { label: Ur[t.attr], value: vm(t.valuePerLevel * a.level), numeric: !0, tone: "positive" }];
    });
    if (n.length)
        e.push({ title: "阵纹", entries: [{ kind: "line", label: "每孔上限", value: `${Ir(r.equipmentLevel)}级`, numeric: !0 }, ...n.map((a) => ({ kind: "line", ...a }))] });
    let d = r.essenceIds.map((a) => Br.find((i) => i.id === a)).filter((a) => a !== void 0);
    if (d.length)
        e.push({ title: "器蕴", entries: d.map((a) => { var _a; return ({ kind: "disclosure", title: a.name, tone: "accent", rows: ir((_a = a.description) !== null && _a !== void 0 ? _a : "") }); }) });
    let m = xr.find((a) => a.id === r.artId);
    if (m)
        e.push({ title: "器诀", entries: [{ kind: "disclosure", title: m.name, tone: "accent", rows: [...ir(m.description), { label: "战意消耗", value: m.rageCost, numeric: !0 }] }] });
    return e;
}
var xm = (r) => { let e = te.parse(r.instanceData), n = me(e), d = n ? `${$r[e.slot]} · ${de[n].name}` : $r[e.slot], m = (0, official_chunk_wje6zqc2_js_1.wf)(e.equipmentLevel).realm; return { summary: { icon: Vi[e.slot], color: rr[m], type: `${d} · 御使境界`, tier: m }, preview: () => ({ header: [X("类型", d), X("要求", (0, official_chunk_wje6zqc2_js_1.wf)(B0(e)).label), ...e.element ? [X("五行", e.element)] : [], ...e.crafterName ? [X("铸造者", e.crafterName)] : [], ...r.equipped ? [{ kind: "status", value: "已穿戴" }] : []], sections: Bi(e), description: e.desc }) }; };
var sm = (r, e) => { let n = Or(e.patternId), d = h0.find((a) => e.level <= Ir(a)), m = (0, official_chunk_wje6zqc2_js_1.wf)(d).realm; return { summary: { icon: "\uD83D\uDD36", color: rr[m], tier: `${e.level}级`, type: "阵纹" }, preview: (a) => ({ header: [X("等级", `${e.level}级`), er(r, a), X("适用部位", n.allowedSlots.map((i) => $r[i]).join("、"))], sections: [{ title: "烙印加成", entries: [{ kind: "line", label: Ur[n.attr], value: `+${n.valuePerLevel * e.level}`, numeric: !0, tone: "positive" }] }] }) }; };
var Hi = { equipment: xm, consumable: jm, blueprint: jd, material: vd, seed: xd, manual_jade: sd, inscription: sm, beast_book: Rd, beast_refinement: Dd, beast_rejuvenation: $d };
function Se(r) { let e = H0(r.definitionId); return Hi[e.kind](r, e); }
function Rm(r, e = {}) { let n = Se(r), d = n.preview(e); return { title: r.name, icon: n.summary.icon, titleColor: n.summary.color, ...d, header: e.hideQuantity ? d.header.filter((m) => m.kind !== "quantity") : d.header }; }
var Dm = { normal: official_chunk_wje6zqc2_js_1.Be.ink, accent: official_chunk_wje6zqc2_js_1.Be["tier-xuan"], positive: official_chunk_wje6zqc2_js_1.Be.teal, warning: official_chunk_wje6zqc2_js_1.Be.crimson, muted: official_chunk_wje6zqc2_js_1.Be["ink-secondary"] };
class Xi {
    get underlayScroll() { return this.item ? this.savedScroll : void 0; }
    constructor(r) {
        this.anchor = { x: 0, y: 0, w: 0, h: 0 };
        this.unfolded = new Set;
        this.savedScroll = 0;
        this.modal = !1;
        this.quantityLabel = "持有";
        this.viewerOptions = {};
        this.close = () => { this.item = void 0, this.u.modalScroll = this.savedScroll, this.u.invalidate(); };
        this.u = r;
    }
    open(r, e, n, d, m, a, i = "持有") { this.viewerOptions = {}, this.quantityLabel = i, this.modal = !1, this.context = void 0, this.item = r, this.anchor = e, this.action = n, this.notice = d, this.customActions = m, this.comparisonItem = a, this.unfolded.clear(), this.savedScroll = this.u.modalScroll, this.u.modalScroll = 0, this.u.invalidate(); }
    openModal(r, e, n = {}) { this.open(r, { x: 0, y: 0, w: 0, h: 0 }), this.modal = !0, this.context = e, this.viewerOptions = n; }
    paint() {
        var _a;
        if (!this.item)
            return;
        let r = this.u, e = Rm(this.item, { ...this.viewerOptions, quantityLabel: this.quantityLabel }), n = this.modal ? Math.min(448, r.width - 24) : Math.min(320, r.width - 16), d = n - 34, m = new official_chunk_wje6zqc2_js_1.Ce(r, d), a = ((_a = e.titleColor.split(" ").find((v) => v.startsWith("text-"))) !== null && _a !== void 0 ? _a : "text-ink").slice(5), i = d - 68 - 44, t = r.lines(e.title, i, 16), o = e.header.map((v) => ({ entry: v, lines: r.lines(v.kind === "field" ? `${v.label}：${v.value}` : v.kind === "quantity" ? `${v.label} ${v.value}` : String(v.value), i, 14) })), h = Math.max(56, t.length * 24 + 4 + o.reduce((v, O) => v + O.lines.length * 24 + 2, 0) - 2);
        if (m.block(h, (v, O) => {
            r.roundedRect(v, O, 56, 56, official_chunk_wje6zqc2_js_1.Be.paper), r.ctx.strokeStyle = "rgba(44,24,16,.2)", r.ctx.strokeRect(v + 0.5, O + 0.5, 55, 55), (0, official_chunk_wje6zqc2_js_1.Ie)(r, e.icon, v, O, 56, 56, 36), t.forEach((N, b) => { var _a; return r.text(N, v + 68, O + b * 24 + 12, 16, (_a = official_chunk_wje6zqc2_js_1.Be[a]) !== null && _a !== void 0 ? _a : official_chunk_wje6zqc2_js_1.Be.ink, r.bodyFont, !0); });
            let H = O + t.length * 24 + 4;
            o.forEach(({ entry: N, lines: b }) => {
                let K = 0;
                b.forEach((L, lr) => {
                    if (r.text(L, v + 68, H + lr * 24 + 12, 14, N.kind === "field" ? "#92400e" : official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), N.kind === "field") {
                        let _r = `${N.label}：`.slice(K, K + L.length);
                        if (_r)
                            r.text(_r, v + 68, H + lr * 24 + 12, 14, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
                    }
                    K += L.length;
                }), H += b.length * 24 + 2;
            }), r.text("×", v + d - 12 - r.measure("×", 14) / 2, O + 12, 14, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), r.hit(v + d - 28, O - 4, 32, 32, this.close);
        }), m.gap(12), m.rule(), m.gap(16), this.context)
            m.text(this.context, 14, 24, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), m.gap(16);
        let P = (v, O, H, N = 0) => m.block(24, (b, K) => { r.text(`${this.unfolded.has(O) ? "▾" : "▸"} ${v}`, b + N, K + 12, 14, H), r.hit(b + N, K, d - N, 24, () => { this.unfolded.has(O) ? this.unfolded.delete(O) : this.unfolded.add(O), r.invalidate(); }); }), j = (v, O = "normal", H = 12) => {
            let N = v.label ? 85 : 0, b = d - H - N, K = String(v.value), L = r.lines(K, b, 14), lr = Math.max(24, L.length * 24);
            m.block(lr, (jr, _r) => {
                var _a;
                let se = Dm[(_a = v.tone) !== null && _a !== void 0 ? _a : O];
                if (v.label)
                    r.paragraph(v.label, jr + H, _r, 77, 14, 24, se);
                L.forEach((Re, l) => r.text(Re, jr + H + N, _r + l * 24 + 12, 14, se, v.numeric ? "monospace" : r.bodyFont));
            });
        };
        if (((v, O) => v.filter((H) => H.entries.length).forEach((H, N) => {
            if (N)
                m.gap(16);
            let b = O + N;
            if (H.collapsible)
                P(H.title, b, "#92400e");
            else
                m.text(H.title, 14, 24, "#92400e");
            if (H.collapsible && !this.unfolded.has(b))
                return;
            m.gap(6), H.entries.forEach((K, L) => {
                var _a, _f;
                if (L)
                    m.gap(4);
                if (K.kind === "disclosure") {
                    let lr = b + ":" + L;
                    if (P(K.title, lr, Dm[(_f = (_a = K.tone) !== null && _a !== void 0 ? _a : H.tone) !== null && _f !== void 0 ? _f : "normal"], 12), this.unfolded.has(lr))
                        m.gap(4), K.rows.forEach((jr, _r) => {
                            if (_r)
                                m.gap(4);
                            j(jr, "normal", 24);
                        });
                }
                else
                    j(K, H.tone);
            });
        }))(e.sections, "s"), e.description) {
            if (e.sections.some((v) => v.entries.length) || this.context)
                m.gap(16), m.rule(), m.gap(12);
            m.text(e.description, 14, 24, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
        }
        if (this.action || this.notice || this.customActions) {
            if (m.gap(16), m.rule(), m.gap(12), this.customActions) {
                let v = this.customActions(d);
                m.block(v.height, v.paint);
            }
            else if (this.action) {
                let v = this.action;
                m.block(32.32, (O, H) => r.button("选择玉简", O, H, () => { this.close(), v(); }));
            }
            else if (this.notice)
                m.text(this.notice, 14, 24, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
        }
        let s = Math.min(this.modal ? Math.min(m.height, r.height * 0.6) + 34 : m.height + 34, r.height - r.top - r.bottom - 16), V = this.modal ? (r.width - n) / 2 : Math.max(8, Math.min(this.anchor.x + this.anchor.w + 8 + n <= r.width - 8 ? this.anchor.x + this.anchor.w + 8 : this.anchor.x - n - 8, r.width - 8 - n)), or = this.modal ? Math.max(r.top + 8, (r.height - s) / 2) : Math.max(r.top + 8, Math.min(this.anchor.y, r.height - r.bottom - 8 - s));
        r.beginModal(this.modal), r.hit(0, 0, r.width, r.height, this.close), r.ctx.save(), r.ctx.shadowColor = this.modal ? "transparent" : "rgba(0,0,0,.2)", r.ctx.shadowBlur = this.modal ? 0 : 20, r.rect(V, or, n, s, official_chunk_wje6zqc2_js_1.Be.paper), r.ctx.restore(), r.ctx.strokeStyle = this.modal ? "rgba(44,24,16,.2)" : "rgba(44,24,16,.3)", r.ctx.strokeRect(V + 0.5, or + 0.5, n - 1, s - 1), r.hit(V, or, n, s, () => { }), r.modalMax = Math.max(0, m.height - (s - 34)), r.modalScroll = Math.min(r.modalScroll, r.modalMax), r.clip(V + 17, or + 17, d, s - 34, () => m.paint(V + 17, or + 17 - r.modalScroll));
    }
}
exports.te = Xi;
var Gi = (...r) => GameGlobal.__officialBridge.request(...r), Yp = GameGlobal.__officialBridge.ApiError, Jp = GameGlobal.__officialBridge.getToken, Kp = GameGlobal.__officialBridge.saveToken, Wp = GameGlobal.__officialBridge.clearSession;
exports.Gb = Gi;
exports.Hb = Yp;
exports.Ib = Jp;
exports.Jb = Kp;
exports.Kb = Wp;
async function ze(...r) { let e = await Gi(...r); return e && Object.prototype.hasOwnProperty.call(e, "data") ? e.data : e; }
async function wp(r, e = {}, n = "POST") { return ze(r, n, e); }
class Zi {
    constructor(r) {
        this.source = "bag";
        this.filter = { kind: "all" };
        this.page = 0;
        this.bagLoading = !1;
        this.storageLoading = !1;
        this.bagError = "";
        this.storageError = "";
        this.bagGeneration = 0;
        this.storageGeneration = 0;
        this.active = !1;
        this.changed = r;
    }
    enter() { this.leave(), this.active = !0, this.bag = this.storage = void 0, this.bagError = this.storageError = "", this.source = "bag", this.filter = { kind: "all" }, this.page = 0, this.loadBag(); }
    leave() { this.active = !1, this.bagGeneration++, this.storageGeneration++, this.bagLoading = this.storageLoading = !1; }
    get view() { return this.source === "bag" ? this.bag : this.storage; }
    get loading() { return this.source === "bag" ? this.bagLoading : this.storageLoading; }
    get error() { return this.source === "bag" ? this.bagError : this.storageError; }
    async loadBag() {
        if (!this.active)
            return;
        let r = ++this.bagGeneration;
        this.bagLoading = !0, this.changed();
        try {
            let e = await ze("/api/combat-v6/inventory?location=bag");
            if (this.active && r === this.bagGeneration)
                this.bag = e, this.bagError = "";
        }
        catch (e) {
            if (this.active && r === this.bagGeneration)
                this.bagError = e instanceof Error ? e.message : "读取储物袋失败";
        }
        finally {
            if (this.active && r === this.bagGeneration)
                this.bagLoading = !1, this.changed();
        }
    }
    async loadStorage() {
        if (!this.active)
            return;
        let r = ++this.storageGeneration;
        this.storage = void 0, this.storageError = "", this.storageLoading = !0, this.changed();
        let e = new URLSearchParams({ location: "storage", kind: this.filter.kind, page: String(this.page) });
        if (this.filter.kind === "material") {
            for (let n of ["minRank", "maxRank", "materialType"])
                if (this.filter[n])
                    e.set(n, this.filter[n]);
        }
        try {
            let n = await ze(`/api/combat-v6/inventory?${e}`);
            if (this.active && r === this.storageGeneration)
                this.storage = n, this.page = n.page;
        }
        catch (n) {
            if (this.active && r === this.storageGeneration)
                this.storageError = n instanceof Error ? n.message : "读取储藏室失败";
        }
        finally {
            if (this.active && r === this.storageGeneration)
                this.storageLoading = !1, this.changed();
        }
    }
    setSource(r) {
        if (this.source = r, r === "storage")
            this.loadStorage();
        this.changed();
    }
    setFilter(r) {
        if (this.filter = r, this.source === "storage")
            this.loadStorage();
        this.changed();
    }
    setPage(r) { this.page = r, this.loadStorage(); }
    reload() { return this.source === "bag" ? this.loadBag() : this.loadStorage(); }
    invalidate() {
        if (this.bag = void 0, this.loadBag(), this.source === "storage")
            this.loadStorage();
    }
}
exports.we = Zi;
function Om(r) { return Se(r).summary; }
function Lp(r, e, n, d, m, a = {}) {
    var _a, _f, _g, _h, _j, _k, _l, _o, _p, _q, _s;
    let i = r.ctx.globalAlpha;
    if (r.ctx.globalAlpha = i * (a.disabled ? 0.6 : 1), r.paper(e, n, d, d), a.unused)
        r.rect(e, n, d, d, "rgba(44,24,16,.05)"), r.clip(e, n, d, d, () => {
            r.ctx.save(), r.ctx.strokeStyle = "rgba(70,60,45,.06)", r.ctx.lineWidth = 1;
            for (let h = -d; h < d * 2; h += 7 * Math.SQRT2)
                r.ctx.beginPath(), r.ctx.moveTo(e + h, n), r.ctx.lineTo(e + h - d, n + d), r.ctx.stroke();
            r.ctx.restore();
        });
    if (r.ctx.save(), r.ctx.strokeStyle = (_a = a.border) !== null && _a !== void 0 ? _a : "rgba(44,24,16,.2)", r.ctx.setLineDash(a.unused ? [3, 3] : []), r.ctx.strokeRect(e + 0.5, n + 0.5, d - 1, d - 1), r.ctx.restore(), a.selected)
        r.ctx.strokeStyle = "rgba(193,18,31,.5)", r.ctx.strokeRect(e - 1.5, n - 1.5, d + 3, d + 3);
    let t = m ? Om(m) : void 0;
    if (t || a.emptyLabel) {
        let h = !m && (!a.emptyIcon || a.emptyIcon === "·");
        if (!m && (!a.quick || h))
            r.ctx.globalAlpha *= 0.25;
        let P = h ? 20 : Math.min(44, Math.max(24, (d - 2) * 0.48));
        (0, official_chunk_wje6zqc2_js_1.Ie)(r, (_g = (_f = t === null || t === void 0 ? void 0 : t.icon) !== null && _f !== void 0 ? _f : a.emptyIcon) !== null && _g !== void 0 ? _g : "·", e, h ? n : n + d * 0.1, d, h ? d : d * 0.66, P), r.ctx.globalAlpha = i * (a.disabled ? 0.6 : 1);
        let j = (_h = a.labelSize) !== null && _h !== void 0 ? _h : Math.min(12, Math.max(10, (d - 2) * 0.17)), g = (_k = (_j = m === null || m === void 0 ? void 0 : m.name) !== null && _j !== void 0 ? _j : a.emptyLabel) !== null && _k !== void 0 ? _k : "";
        while (g.length && r.measure(g, j) > d - 8)
            g = g.slice(0, -1);
        if (g !== ((_o = (_l = m === null || m === void 0 ? void 0 : m.name) !== null && _l !== void 0 ? _l : a.emptyLabel) !== null && _o !== void 0 ? _o : ""))
            g = g.slice(0, -1) + "…";
        let s = (_p = t === null || t === void 0 ? void 0 : t.color.split(" ").find((V) => V.startsWith("text-"))) === null || _p === void 0 ? void 0 : _p.slice(5);
        r.text(g, e + (d - r.measure(g, j)) / 2, n + d * 0.92 - j * 0.625, j, s ? (_q = official_chunk_wje6zqc2_js_1.Be[s]) !== null && _q !== void 0 ? _q : official_chunk_wje6zqc2_js_1.Be.ink : official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
    }
    else
        r.text("·", e + d / 2 - 3, n + d / 2, 20, "rgba(44,24,16,.25)");
    if (m && m.quantity > 1)
        r.text(`×${m.quantity >= 1e4 ? Math.floor(m.quantity / 1000) + "k" : m.quantity}`, e + 4, n + 11, Math.min(16, Math.max(12, d * 0.2)), official_chunk_wje6zqc2_js_1.Be.ink, "monospace", !0);
    let o = (_s = a.badge) !== null && _s !== void 0 ? _s : ((m === null || m === void 0 ? void 0 : m.equipped) ? "已装备" : void 0);
    if (o) {
        let h = r.measure(o, 10);
        r.rect(e + d - 4 - h, n, h, 14, "rgba(248,243,230,.9)"), r.text(o, e + d - 4 - h, n + 6, 10, official_chunk_wje6zqc2_js_1.Be.crimson);
    }
    if (r.ctx.globalAlpha = i, m || a.quick)
        r.hit(e, n, d, d, () => {
            var _a;
            if (a.quick && !a.disabled)
                a.quick();
            else
                (_a = a.preview) === null || _a === void 0 ? void 0 : _a.call(a);
        }, { longPress: a.preview });
}
var Ep = 99, fp = 30;
exports.xe = Ep;
exports.ye = fp;
