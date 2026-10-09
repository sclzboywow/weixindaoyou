"use strict";
var _a, _g, _h, _k, _l;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Md = exports.Ld = exports.Kd = exports.Gd = exports.Fd = exports.Ed = exports.Dd = exports.Cd = exports.Bd = exports.Ad = exports.yd = exports.rd = exports.od = exports.nd = exports.md = exports.kd = exports.gd = exports.Wc = exports.Vc = exports.Tc = exports.Sc = exports.Oc = exports.Nc = exports.Mc = exports.Lc = exports.Kc = exports.Jc = exports.Ic = exports.Dc = exports.Cc = exports.Bc = exports.Ac = exports.yc = exports.tc = exports.sc = exports.rc = exports.qc = exports.pc = exports.lc = exports.kc = exports.jc = exports.ic = exports.hc = exports.$b = exports.Ub = exports.Rb = exports.Qb = exports.Pb = exports.Ob = exports.Nb = void 0;
exports.Je = exports.Ie = exports.He = exports.Ee = exports.ye = exports.xe = exports.ve = exports.ue = exports.te = exports.se = exports.re = exports.qe = exports.ie = exports.he = exports.fe = exports.ee = exports.de = exports.ce = exports._d = exports.Zd = exports.Xd = exports.Wd = exports.Sd = exports.Rd = exports.Qd = exports.Pd = exports.Nd = void 0;
exports.Sb = $2;
exports.Tb = $O;
exports.Vb = X5;
exports.Wb = X_;
exports.Xb = rQ;
exports.Yb = wQ;
exports.Zb = yQ;
exports._b = EQ;
exports.ac = kQ;
exports.bc = oQ;
exports.cc = lQ;
exports.dc = xQ;
exports.ec = u;
exports.fc = a_;
exports.gc = y4;
exports.mc = d1;
exports.nc = I5;
exports.oc = L;
exports.uc = e2;
exports.vc = b4;
exports.wc = X9;
exports.xc = h6;
exports.zc = I6;
exports.Ec = q3;
exports.Fc = C$;
exports.Gc = F$;
exports.Hc = m$;
exports.Pc = XV;
exports.Qc = Y3;
exports.Rc = ZV;
exports.Uc = RQ;
exports.Xc = y1;
exports.Yc = DQ;
exports.Zc = V5;
exports._c = zQ;
exports.$c = i_;
exports.ad = Y5;
exports.bd = eQ;
exports.cd = p9;
exports.dd = d4;
exports.ed = tQ;
exports.fd = _Y;
exports.hd = J5;
exports.id = O5;
exports.jd = $Y;
exports.ld = o9;
exports.pd = n9;
exports.qd = a9;
exports.sd = MY;
exports.td = M1;
exports.ud = Xj;
exports.vd = bq;
exports.wd = Nq;
exports.xd = Hq;
exports.zd = OV;
exports.Hd = v_;
exports.Id = PX;
exports.Jd = n1;
exports.Od = UX;
exports.Td = d_;
exports.Ud = j1;
exports.Vd = p2;
exports.Yd = k2;
exports.$d = v1;
exports.ae = n2;
exports.be = O4;
exports.ge = c2;
exports.je = DW;
exports.ke = Z9;
exports.le = t2;
exports.me = EW;
exports.ne = h4;
exports.oe = Q9;
exports.pe = Y9;
exports.we = uY;
exports.ze = WJ;
exports.Ae = QJ;
exports.Be = YJ;
exports.Ce = JJ;
exports.De = OJ;
exports.Fe = Nj;
exports.Ge = RO;
const official_chunk_thhss9s9_js_1 = require("./official-chunk-thhss9s9.js");
const zod_1 = require("./zod.js");
var Dj = { baby: "宝宝", pseudo_baby: "假宝宝", wild: "纯野生" };
function h6(_) { return _.isMutant ? "变异宝宝" : Dj[_.originKind]; }
function A5(_) { return official_chunk_thhss9s9_js_1.dg.panel.naturalBase * (_.isMutant ? 2 : 1); }
function H1(_) { return _.level * official_chunk_thhss9s9_js_1.dg.pointsPerLevel + (_.originKind === "baby" ? 50 : 0) - (_.originKind === "wild" ? 2 * Math.min(_.level, _.initialLevel) : 0); }
const zod_2 = require("./zod.js");
var Z2 = "summoned_beast_v3", V0 = zod_2.z.number().int().min(0).max(1e5), i0 = zod_2.z.object({ id: zod_2.z.uuid(), ownerCultivatorId: zod_2.z.uuid(), speciesId: zod_2.z.string(), isMutant: zod_2.z.boolean().optional(), originKind: zod_2.z.enum(["baby", "pseudo_baby", "wild"]), initialLevel: zod_2.z.number().int().min(0).max(180), name: zod_2.z.string().min(1).max(40), level: zod_2.z.number().int().min(0).max(180), exp: V0, growth: zod_2.z.number().min(0.1).max(3), aptitudes: zod_2.z.object({ attack: V0, defense: V0, health: V0, mana: V0, speed: V0 }).strict(), allocatedAttributes: zod_2.z.object({ constitution: V0, strength: V0, magic: V0, endurance: V0, agility: V0 }).strict(), unallocatedPoints: V0, skillSlotCapacity: zod_2.z.number().int().min(0).max(official_chunk_thhss9s9_js_1.Zf.length), skills: zod_2.z.array(zod_2.z.string()).max(official_chunk_thhss9s9_js_1.Zf.length), currentLifespan: V0, maxLifespan: V0, generationVersion: zod_2.z.enum([Z2, "summoned_beast_fusion_v1"]), generationContentRevision: zod_2.z.number().int().positive().optional(), generationSeed: zod_2.z.number().int(), revision: V0 }).strict().superRefine((_, j) => {
    if (!official_chunk_thhss9s9_js_1.Uf.some((q) => q.id === _.speciesId) || _.skills.length !== _.skillSlotCapacity || new Set(_.skills).size !== _.skills.length || _.skills.some((q) => !official_chunk_thhss9s9_js_1.Zf.some((P) => P.id === q)) || _.currentLifespan > _.maxLifespan || _.originKind === "wild" && _.initialLevel < 1 || !!_.isMutant && _.originKind !== "baby")
        j.addIssue({ code: "custom", message: "召唤兽个体事实不完整" });
}), Lj = i0.refine((_) => Object.values(_.allocatedAttributes).reduce((j, q) => j + q, 0) + _.unallocatedPoints === H1(_), { path: ["unallocatedPoints"], message: "灵兽属性点总额不符合生成规则" }), C5 = zod_2.z.object({ carriedBeastIds: zod_2.z.array(zod_2.z.uuid()).max(6), leadBeastId: zod_2.z.uuid().optional(), revision: V0 }).strict().superRefine((_, j) => {
    if (new Set(_.carriedBeastIds).size !== _.carriedBeastIds.length || _.leadBeastId && !_.carriedBeastIds.includes(_.leadBeastId))
        j.addIssue({ code: "custom", message: "携带编组或首发无效" });
});
exports.yc = i0;
function I6(_) { return Math.round(_ * 105 / 100); }
const zod_3 = require("./zod.js");
function d1(_) {
    let j = new Map, q = (P) => {
        if (P === null || typeof P !== "object") {
            if (typeof P === "function" || typeof P === "symbol")
                throw TypeError("Content DTO contains a non-cloneable value");
            return P;
        }
        if (j.has(P))
            return j.get(P);
        let $ = Object.getPrototypeOf(P);
        if (!Array.isArray(P) && $ !== Object.prototype && $ !== null)
            throw TypeError("Content DTO must contain only plain records and arrays");
        let V = Array.isArray(P) ? Array(P.length) : {};
        j.set(P, V);
        for (let X of Object.keys(P))
            Object.defineProperty(V, X, { value: q(P[X]), writable: !0, enumerable: !0, configurable: !0 });
        return V;
    };
    return q(_);
}
function X0(_, j, q) { var _a; return (_a = j.skillOverrides[q]) !== null && _a !== void 0 ? _a : _.get(q); }
function F5(_) {
    if (!(_ === null || _ === void 0 ? void 0 : _.length))
        return {};
    let j = {};
    for (let q of _)
        j[q.id] = q;
    return j;
}
function Z0(_, j) { return j.passives.flatMap((q) => { var _a; let P = X0(_, j, q); return P && !((_a = P.conflicts) === null || _a === void 0 ? void 0 : _a.some(($) => j.passives.includes($) || j.skills.includes($))) ? [P] : []; }); }
function Aj(_, j, q) { return Math.min(j, Math.max(_, q)); }
function G_(_) {
    if (!Number.isFinite(_))
        return 0;
    return Aj(0, 1, _);
}
function Q0(_, j) { return Math.max(_, j); }
function B0(_, j) { return Math.max(_, Math.floor(j)); }
function s0(_, j) { return Number.isFinite(_) ? _ : j; }
var M_ = { hp: 0, maxHp: 0, mp: 0, maxMp: 0, physicalAtk: 0, physicalDef: 0, magicAtk: 0, magicDef: 0, healPower: 0, speed: 0, hit: official_chunk_thhss9s9_js_1.xf, dodge: 0, critRate: 0, spellCritRate: 0, physicalFuryRate: 0, sealHit: 0, sealResist: 0, attackCultivate: 0, defenseCultivate: 0, spellCultivate: 0, resistSpellCultivate: 0 };
function I5(_, j) { var _a, _g, _h, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w; let q = Math.max(official_chunk_thhss9s9_js_1.vf, Math.floor(s0(_.attrs.hp, official_chunk_thhss9s9_js_1.vf))), P = Math.max(0, Math.floor(s0((_a = _.attrs.mp) !== null && _a !== void 0 ? _a : 0, 0))), $ = { ...M_, ..._.attrs, hp: q, maxHp: Math.max(official_chunk_thhss9s9_js_1.wf, Math.floor(s0((_g = _.attrs.maxHp) !== null && _g !== void 0 ? _g : q, q))), mp: P, maxMp: Math.max(0, Math.floor(s0((_h = _.attrs.maxMp) !== null && _h !== void 0 ? _h : P, P))), critRate: G_((_k = _.attrs.critRate) !== null && _k !== void 0 ? _k : 0), spellCritRate: G_((_l = _.attrs.spellCritRate) !== null && _l !== void 0 ? _l : 0), physicalFuryRate: G_((_m = _.attrs.physicalFuryRate) !== null && _m !== void 0 ? _m : 0) }; return { id: (_o = _.id) !== null && _o !== void 0 ? _o : `u${_.side}_${(_p = _.slot) !== null && _p !== void 0 ? _p : j}`, name: _.name, side: _.side, kind: _.kind, slot: (_q = _.slot) !== null && _q !== void 0 ? _q : j, level: Math.max(0, Math.floor(s0((_r = _.level) !== null && _r !== void 0 ? _r : 0, 0))), ownerId: _.ownerId, attrs: $, wound: 0, skills: [...(_s = _.skills) !== null && _s !== void 0 ? _s : []], passives: [...(_t = _.passives) !== null && _t !== void 0 ? _t : []], skillLevels: { ...(_u = _.skillLevels) !== null && _u !== void 0 ? _u : {} }, skillOverrides: F5(_.skillOverrides), tags: [...(_v = _.tags) !== null && _v !== void 0 ? _v : []], combatFacts: { ..._.combatFacts }, skillUses: {}, cooldowns: {}, resources: Cj(_.resources), barriers: [], marks: [], statuses: [], flags: { defending: !1, auto: !1, skipNextAction: !1, downed: !1, dead: !1, escaped: !1, benched: (_w = _.benched) !== null && _w !== void 0 ? _w : !1 } }; }
function S(_) { return !_.flags.dead && !_.flags.downed && !_.flags.escaped && !_.flags.benched; }
function Cj(_) {
    let j = new Set, q = [];
    for (let P of _ !== null && _ !== void 0 ? _ : []) {
        if (!P.id || j.has(P.id))
            continue;
        j.add(P.id);
        let $ = P.max === null ? null : Math.max(0, Math.floor(s0(P.max, 0))), V = Math.min($ !== null && $ !== void 0 ? $ : Number.MAX_SAFE_INTEGER, Math.max(0, Math.floor(s0(P.current, 0))));
        q.push({ id: P.id, name: P.name, current: V, max: $ });
    }
    return q;
}
function l0(_, j) { return _.resources.find((q) => q.id === j); }
function r0(_) { return Math.max(official_chunk_thhss9s9_js_1.vf, _.attrs.maxHp - Math.max(0, Math.floor(_.wound))); }
function N0(_) {
    let j = { ..._.attrs };
    for (let q of _.statuses) {
        j.speed += q.speedMod;
        for (let [P, $] of Object.entries(q.attrMods))
            if (P !== "maxHp")
                j[P] += $;
    }
    return j;
}
function z5(_, j) {
    if (j === official_chunk_thhss9s9_js_1.Ye.Fixed)
        return official_chunk_thhss9s9_js_1.Af;
    let q = official_chunk_thhss9s9_js_1.Af;
    for (let P of _.statuses)
        q *= j === official_chunk_thhss9s9_js_1.Ye.Physical ? P.damageTakenPhysical : P.damageTakenSpell;
    return q;
}
function b_(_) {
    var _a;
    let j = official_chunk_thhss9s9_js_1.Af, q = new Map;
    for (let P of _.statuses)
        q.set(P.kind, Math.min((_a = q.get(P.kind)) !== null && _a !== void 0 ? _a : P.healTaken, P.healTaken));
    for (let P of q.values())
        j *= P;
    return j;
}
function v5(_) {
    let j = official_chunk_thhss9s9_js_1.Af;
    for (let q of _.statuses)
        j *= q.healDealt;
    return j;
}
function L(_, j) {
    if (_ === void 0)
        return 0;
    if (typeof _ === "number")
        return _;
    let q = Fj(_), P = new r5(q, j), $ = P.parseExpr();
    if (P.expectEnd(), !Number.isFinite($))
        return 0;
    return $;
}
function T1(_, j) { var _a; return (_a = _.skillLevels[j]) !== null && _a !== void 0 ? _a : _.level; }
function S5(_) {
    let j = { level: _.level };
    for (let q of official_chunk_thhss9s9_js_1.Cf)
        j[q] = _.attrs[q];
    return j;
}
function Fj(_) {
    let j = _.replace(/\s+/g, ""), q = [], P = 0;
    while (P < j.length) {
        let $ = j[P];
        if ($ >= "0" && $ <= "9") {
            let V = P;
            while (V < j.length && (j[V] >= "0" && j[V] <= "9" || j[V] === "."))
                V++;
            q.push({ kind: "num", value: Number(j.slice(P, V)) }), P = V;
            continue;
        }
        if ($ >= "a" && $ <= "z" || $ >= "A" && $ <= "Z" || $ === "_") {
            let V = P;
            while (V < j.length && /[A-Za-z0-9_.]/.test(j[V]))
                V++;
            q.push({ kind: "id", value: j.slice(P, V) }), P = V;
            continue;
        }
        if (j.startsWith(">=", P) || j.startsWith("<=", P) || j.startsWith("==", P)) {
            q.push({ kind: "op", value: j.slice(P, P + 2) }), P += 2;
            continue;
        }
        if ("+-*/(),><".includes($)) {
            q.push({ kind: "op", value: $ }), P++;
            continue;
        }
        throw Error(`bad expr token "${$}" in "${_}"`);
    }
    return q;
}
class r5 {
    constructor(_, j) {
        this.i = 0;
        this.tokens = _;
        this.env = j;
    }
    parseExpr() { return this.parseCompare(); }
    parseCompare() {
        let _ = this.parseAdd(), j = this.op();
        if (j === ">" || j === "<" || j === ">=" || j === "<=" || j === "==") {
            this.bumpOp();
            let q = this.parseAdd();
            if (j === ">")
                return _ > q ? 1 : 0;
            if (j === "<")
                return _ < q ? 1 : 0;
            if (j === ">=")
                return _ >= q ? 1 : 0;
            if (j === "<=")
                return _ <= q ? 1 : 0;
            return _ === q ? 1 : 0;
        }
        return _;
    }
    expectEnd() {
        if (this.i < this.tokens.length)
            throw Error("unexpected trailing tokens in expr");
    }
    parseAdd() {
        let _ = this.parseMul();
        while (this.op() === "+" || this.op() === "-") {
            let j = this.bumpOp(), q = this.parseMul();
            _ = j === "+" ? _ + q : _ - q;
        }
        return _;
    }
    parseMul() {
        let _ = this.parseUnary();
        while (this.op() === "*" || this.op() === "/") {
            let j = this.bumpOp(), q = this.parseUnary();
            _ = j === "*" ? _ * q : q === 0 ? 0 : _ / q;
        }
        return _;
    }
    parseUnary() {
        if (this.op() === "-")
            return this.bumpOp(), -this.parseUnary();
        if (this.op() === "+")
            return this.bumpOp(), this.parseUnary();
        return this.parsePrimary();
    }
    parsePrimary() {
        let _ = this.peek();
        if (!_)
            throw Error("unexpected end of expr");
        if (_.kind === "num")
            return this.i++, _.value;
        if (_.kind === "id") {
            if (this.i++, this.op() === "(")
                return this.callFn(_.value);
            return this.lookup(_.value);
        }
        if (_.kind === "op" && _.value === "(") {
            this.i++;
            let j = this.parseExpr();
            if (this.op() !== ")")
                throw Error("missing )");
            return this.i++, j;
        }
        throw Error(`unexpected token ${JSON.stringify(_)}`);
    }
    callFn(_) {
        var _a, _g, _h, _k;
        if (this.op() !== "(")
            throw Error(`expected ( after ${_}`);
        this.i++;
        let j = [];
        if (this.op() !== ")") {
            j.push(this.parseExpr());
            while (this.op() === ",")
                this.i++, j.push(this.parseExpr());
        }
        if (this.op() !== ")")
            throw Error(`missing ) after ${_}`);
        if (this.i++, _ === official_chunk_thhss9s9_js_1.rf.Floor)
            return Math.floor((_a = j[0]) !== null && _a !== void 0 ? _a : 0);
        if (_ === official_chunk_thhss9s9_js_1.rf.Min)
            return Math.min(...j);
        if (_ === official_chunk_thhss9s9_js_1.rf.Max)
            return Math.max(...j);
        if (_ === official_chunk_thhss9s9_js_1.rf.If)
            return ((_g = j[0]) !== null && _g !== void 0 ? _g : 0) !== 0 ? (_h = j[1]) !== null && _h !== void 0 ? _h : 0 : (_k = j[2]) !== null && _k !== void 0 ? _k : 0;
        throw Error(`unknown function ${_}`);
    }
    lookup(_) {
        var _a, _g, _h, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _3, _8, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39;
        if (_.startsWith("hasStatus."))
            return this.env.source.statuses.some((P) => P.id === _.slice(10)) ? 1 : 0;
        if (_ === "enemyCount")
            return (_g = (_a = this.env.state) === null || _a === void 0 ? void 0 : _a.units.filter((P) => P.side !== this.env.source.side && !P.flags.dead && !P.flags.downed && !P.flags.escaped && !P.flags.benched).length) !== null && _g !== void 0 ? _g : 0;
        if (_ === "actionKillsTarget")
            return this.env.target && ((_h = this.env.killedTargetIds) === null || _h === void 0 ? void 0 : _h.includes(this.env.target.id)) ? 1 : 0;
        if (_ === "normalTarget")
            return this.env.target && ((_k = this.env.normalTargetIds) === null || _k === void 0 ? void 0 : _k.includes(this.env.target.id)) ? 1 : 0;
        if (_ === "enemyPlayers")
            return (_m = (_l = this.env.state) === null || _l === void 0 ? void 0 : _l.units.filter((P) => P.side !== this.env.source.side && P.kind === "player").length) !== null && _m !== void 0 ? _m : 0;
        if (_ === "targetIsPet")
            return ((_o = this.env.target) === null || _o === void 0 ? void 0 : _o.kind) === "pet" ? 1 : 0;
        if (_ === "targetIsPlayer")
            return ((_p = this.env.target) === null || _p === void 0 ? void 0 : _p.kind) === "player" ? 1 : 0;
        if (_ === "targetDefending")
            return ((_q = this.env.target) === null || _q === void 0 ? void 0 : _q.flags.defending) ? 1 : 0;
        if (_.startsWith("targetFact."))
            return (_t = (_s = (_r = this.env.target) === null || _r === void 0 ? void 0 : _r.combatFacts) === null || _s === void 0 ? void 0 : _s[_.slice(11)]) !== null && _t !== void 0 ? _t : 0;
        if (_ === "allyPetSkillUnused")
            return this.env.allyPetSkillUnused ? 1 : 0;
        if (_.startsWith("targetKnown."))
            return this.env.target && [...this.env.target.skills, ...this.env.target.passives].includes(_.slice(12)) ? 1 : 0;
        if (_.startsWith("targetEffective."))
            return this.env.target ? (_u = N0(this.env.target)[_.slice(16)]) !== null && _u !== void 0 ? _u : 0 : 0;
        if (_.startsWith("effective."))
            return (_v = N0(this.env.source)[_.slice(10)]) !== null && _v !== void 0 ? _v : 0;
        if (_.startsWith("allyTagCount."))
            return (_x = (_w = this.env.state) === null || _w === void 0 ? void 0 : _w.units.filter((P) => P.side === this.env.source.side && P.kind === "player" && P.tags.includes(_.slice(13))).length) !== null && _x !== void 0 ? _x : 0;
        if (_.startsWith("known."))
            return [...this.env.source.skills, ...this.env.source.passives].includes(_.slice(6)) ? 1 : 0;
        if (_.startsWith("statusRounds."))
            return (_z = (_y = this.env.source.statuses.find((P) => P.kind === _.slice(13))) === null || _y === void 0 ? void 0 : _y.remainingRounds) !== null && _z !== void 0 ? _z : 0;
        if (_.startsWith("targetStatusRounds."))
            return (_10 = (_8 = (_3 = this.env.target) === null || _3 === void 0 ? void 0 : _3.statuses.find((P) => P.kind === _.slice(19))) === null || _8 === void 0 ? void 0 : _8.remainingRounds) !== null && _10 !== void 0 ? _10 : 0;
        if (_.startsWith("ownedTargetStatus."))
            return ((_11 = this.env.target) === null || _11 === void 0 ? void 0 : _11.statuses.some((P) => P.kind === _.slice(18) && P.sourceId === this.env.source.id)) ? 1 : 0;
        if (_ === "allyDownedPlayers")
            return (_13 = (_12 = this.env.state) === null || _12 === void 0 ? void 0 : _12.units.filter((P) => P.side === this.env.source.side && P.kind === "player" && P.flags.downed && !P.flags.escaped).length) !== null && _13 !== void 0 ? _13 : 0;
        if (_ === "allyMaxMagicAtk")
            return Math.max(0, ...(_15 = (_14 = this.env.state) === null || _14 === void 0 ? void 0 : _14.units.filter((P) => P.side === this.env.source.side && P.id !== this.env.source.id && P.kind === "player").map((P) => P.attrs.magicAtk)) !== null && _15 !== void 0 ? _15 : []);
        if (_ === "targetDeployedPets")
            return (_17 = (_16 = this.env.state) === null || _16 === void 0 ? void 0 : _16.units.filter((P) => { var _a; return P.kind === "pet" && P.ownerId === ((_a = this.env.target) === null || _a === void 0 ? void 0 : _a.id) && P.marks.includes("battle:deployed"); }).length) !== null && _17 !== void 0 ? _17 : 0;
        if (_ === "round")
            return (_19 = (_18 = this.env.state) === null || _18 === void 0 ? void 0 : _18.round) !== null && _19 !== void 0 ? _19 : 0;
        if (_ === "entryRound")
            return (_20 = this.env.source.entryRound) !== null && _20 !== void 0 ? _20 : 0;
        if (_ === "spellActionsSinceEntry")
            return (_21 = this.env.source.spellActionsSinceEntry) !== null && _21 !== void 0 ? _21 : 0;
        if (_ === "enemyDownedPlayers")
            return (_23 = (_22 = this.env.state) === null || _22 === void 0 ? void 0 : _22.units.filter((P) => P.side !== this.env.source.side && P.kind === "player" && P.flags.downed && !P.flags.escaped).length) !== null && _23 !== void 0 ? _23 : 0;
        if (_.startsWith("enemyStatus.") || _.startsWith("allyStatus.")) {
            let P = _.startsWith("enemyStatus."), $ = _.slice(P ? 12 : 11);
            return (_25 = (_24 = this.env.state) === null || _24 === void 0 ? void 0 : _24.units.filter((V) => V.side !== this.env.source.side === P && !V.flags.dead && !V.flags.escaped && !V.flags.benched && (!P || !V.flags.downed) && V.statuses.some((X) => X.kind === $)).length) !== null && _25 !== void 0 ? _25 : 0;
        }
        if (_ === "originalResourceCost")
            return (_26 = this.env.originalResourceCost) !== null && _26 !== void 0 ? _26 : 0;
        if (_.startsWith("resource."))
            return (_28 = (_27 = this.env.source.resources.find((P) => P.id === _.slice(9))) === null || _27 === void 0 ? void 0 : _27.current) !== null && _28 !== void 0 ? _28 : 0;
        if (_.startsWith("fact."))
            return (_30 = (_29 = this.env.source.combatFacts) === null || _29 === void 0 ? void 0 : _29[_.slice(5)]) !== null && _30 !== void 0 ? _30 : 0;
        if (_.startsWith("uses."))
            return (_32 = (_31 = this.env.source.skillUses) === null || _31 === void 0 ? void 0 : _31[_.slice(5)]) !== null && _32 !== void 0 ? _32 : 0;
        if (_ === official_chunk_thhss9s9_js_1.qf.SkillLevel)
            return this.env.skillLevel;
        if (_ === official_chunk_thhss9s9_js_1.qf.Targets)
            return this.env.targets;
        if (_ === official_chunk_thhss9s9_js_1.qf.Damage)
            return (_33 = this.env.damage) !== null && _33 !== void 0 ? _33 : 0;
        if (_ === official_chunk_thhss9s9_js_1.qf.HpDamage)
            return (_34 = this.env.hpDamage) !== null && _34 !== void 0 ? _34 : 0;
        if (_ === "roundHpDamage") {
            let P = this.env.source.hpDamageThisRound;
            return P && P.round === ((_35 = this.env.state) === null || _35 === void 0 ? void 0 : _35.round) ? P.amount : 0;
        }
        if (_ === official_chunk_thhss9s9_js_1.qf.ImpactDamage)
            return (_36 = this.env.impactDamage) !== null && _36 !== void 0 ? _36 : 0;
        if (_ === official_chunk_thhss9s9_js_1.qf.TargetStatusStacks)
            return (_37 = this.env.targetStatusStacks) !== null && _37 !== void 0 ? _37 : 0;
        if (_ === official_chunk_thhss9s9_js_1.qf.Level)
            return this.env.source.level;
        let j = _.split(".");
        if (j.length === 2) {
            let P = j[0] === official_chunk_thhss9s9_js_1.qf.Source ? this.env.source : j[0] === official_chunk_thhss9s9_js_1.qf.Target ? this.env.target : void 0;
            if (!P)
                return 0;
            return (_38 = S5(P)[j[1]]) !== null && _38 !== void 0 ? _38 : 0;
        }
        return (_39 = S5(this.env.source)[_]) !== null && _39 !== void 0 ? _39 : 0;
    }
    peek() { return this.tokens[this.i]; }
    op() { let _ = this.peek(); return (_ === null || _ === void 0 ? void 0 : _.kind) === "op" ? _.value : void 0; }
    bumpOp() {
        let _ = this.peek();
        if (!_ || _.kind !== "op")
            throw Error("expected operator");
        return this.i++, _.value;
    }
}
function g1(_) { return _.attrs.hp / Math.max(1, _.attrs.maxHp); }
function N_(_, j) { return j.some((q) => _.statuses.some((P) => P.id === q)); }
function H_(_, j) { return j.some((q) => _.statuses.some((P) => P.kind === q)); }
function Y2(_, j, q) { return j.statuses.some((P) => { var _a; let $ = (_a = _.statusDefs.get(P.id)) === null || _a === void 0 ? void 0 : _a.category; return $ !== void 0 && q.includes($); }); }
function p1(_, j, q) {
    let P = j === null || j === void 0 ? void 0 : j.targetStatusStack;
    if (!P || !q)
        return 0;
    return q.statuses.filter(($) => (P.statusId === void 0 || $.id === P.statusId) && (P.kind === void 0 || $.kind === P.kind)).reduce(($, V) => $ + V.stacks, 0);
}
function mj(_, j, q) {
    if (!_.markKey)
        return;
    if (q.oncePerBattle)
        return `battle:${_.markKey}`;
    if (q.oncePerRound)
        return `round:${j}:${_.markKey}`;
    return;
}
function Q1(_, j, q) {
    var _a, _g, _h, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _3, _8, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28;
    if (!j)
        return !0;
    if (j.expression !== void 0 && !L(j.expression, { allyPetSkillUnused: ((_a = _.currentAction) === null || _a === void 0 ? void 0 : _a.sourceId) === q.source.id ? _.currentAction.allyPetSkillUnused : !1, source: q.source, target: q.target, skillLevel: (_h = q.source.skillLevels[(_g = q.skillId) !== null && _g !== void 0 ? _g : ""]) !== null && _h !== void 0 ? _h : q.source.level, targets: 1, state: { ..._.state, units: (_k = _.state.units) !== null && _k !== void 0 ? _k : [] } }))
        return !1;
    let P = (_l = _.state.units) !== null && _l !== void 0 ? _l : [];
    if (j.removedStatusKind && q.removedStatusKind !== j.removedStatusKind)
        return !1;
    if (j.statusRemoveReason && q.statusRemoveReason !== j.statusRemoveReason)
        return !1;
    if (j.originalResourceCostMax !== void 0 && (q.originalResourceCost === void 0 || q.originalResourceCost > j.originalResourceCostMax))
        return !1;
    if (j.targetDowned !== void 0 && ((_m = q.target) === null || _m === void 0 ? void 0 : _m.flags.downed) !== j.targetDowned)
        return !1;
    if (j.targetDead !== void 0 && ((_o = q.target) === null || _o === void 0 ? void 0 : _o.flags.dead) !== j.targetDead)
        return !1;
    if (j.excludeFoeKinds && (!q.target || j.excludeFoeKinds.includes(q.target.kind)))
        return !1;
    if (j.targetOwnedStatus && !((_p = q.target) === null || _p === void 0 ? void 0 : _p.statuses.some((Y) => Y.kind === j.targetOwnedStatus.kind && Y.sourceId === q.source.id && (!j.targetOwnedStatus.appliedThisRound || Y.appliedRound === _.state.round))))
        return !1;
    if (j.enemyStatusCount && P.filter((Y) => Y.side !== q.source.side && S(Y) && Y.statuses.some((O) => O.kind === j.enemyStatusCount.kind)).length < j.enemyStatusCount.min)
        return !1;
    if (j.oncePerActionTarget && (!_.currentAction || ((_q = _.currentAction.triggeredTargets) === null || _q === void 0 ? void 0 : _q.includes(`${q.markKey}:${(_r = q.target) === null || _r === void 0 ? void 0 : _r.id}`))))
        return !1;
    if (j.pvp !== void 0 && P.some((Y) => Y.side !== q.source.side && Y.kind === "player") !== j.pvp)
        return !1;
    if (j.teamUniqueTag && P.filter((Y) => Y.side === q.source.side && Y.kind === "player" && Y.tags.includes(j.teamUniqueTag)).length !== 1)
        return !1;
    if (j.targetEnemy && (!q.target || q.target.side === q.source.side))
        return !1;
    if (j.targetHasStandingPet !== void 0 && (!q.target || P.some((Y) => Y.kind === "pet" && Y.ownerId === q.target.id && S(Y)) !== j.targetHasStandingPet))
        return !1;
    if (j.actionSucceeded && (!_.currentAction || _.currentAction.failed))
        return !1;
    if (j.actionKilledTarget !== void 0 && Boolean(q.target && ((_t = (_s = _.currentAction) === null || _s === void 0 ? void 0 : _s.killedTargetIds) === null || _t === void 0 ? void 0 : _t.includes(q.target.id))) !== j.actionKilledTarget)
        return !1;
    if (j.actionReducedTargetToZero !== void 0 && Boolean(q.target && ((_v = (_u = _.currentAction) === null || _u === void 0 ? void 0 : _u.hpZeroTargetIds) === null || _v === void 0 ? void 0 : _v.includes(q.target.id))) !== j.actionReducedTargetToZero)
        return !1;
    if (j.sourceInitialHpRatioMin !== void 0 && ((_x = (_w = _.currentAction) === null || _w === void 0 ? void 0 : _w.initialHpRatio) !== null && _x !== void 0 ? _x : g1(q.source)) < j.sourceInitialHpRatioMin)
        return !1;
    let $ = (_3 = (_y = q.skillId) !== null && _y !== void 0 ? _y : (_z = q.skill) === null || _z === void 0 ? void 0 : _z.id) !== null && _3 !== void 0 ? _3 : (_8 = _.currentAction) === null || _8 === void 0 ? void 0 : _8.skillId, V = q.skill;
    if ((_10 = j.excludeSkillTags) === null || _10 === void 0 ? void 0 : _10.some((Y) => V === null || V === void 0 ? void 0 : V.tags.includes(Y)))
        return !1;
    if (j.excludePercentageDamage && q.percentageDamage)
        return !1;
    let X = q.source.attrs.mp / Math.max(1, q.source.attrs.maxMp);
    if (j.sourceMpRatioBelow !== void 0 && X >= j.sourceMpRatioBelow)
        return !1;
    if (j.sourceMpRatioAbove !== void 0 && X <= j.sourceMpRatioAbove)
        return !1;
    if (j.sourceHasBarrier !== void 0 && q.source.barriers.some((Y) => Y.current > 0) !== j.sourceHasBarrier)
        return !1;
    if (j.targetHasBarrier !== void 0 && (!q.target || q.target.barriers.some((Y) => Y.current > 0) !== j.targetHasBarrier))
        return !1;
    if (j.sourceStatusCategories && !Y2(_, q.source, j.sourceStatusCategories))
        return !1;
    if (j.sourceRemovableControl && !q.source.statuses.some((Y) => { let O = _.statusDefs.get(Y.id); return (O === null || O === void 0 ? void 0 : O.category) === "control" && O.dispellable !== !1 && !O.blocksRevive; }))
        return !1;
    let Z = (_11 = q.isPrimary) !== null && _11 !== void 0 ? _11 : (q.target !== void 0 && q.target.id === ((_12 = _.currentAction) === null || _12 === void 0 ? void 0 : _12.primaryTargetId));
    if (j.skillIds && (!$ || !j.skillIds.includes($)))
        return !1;
    if ((_13 = j.skillTags) === null || _13 === void 0 ? void 0 : _13.length) {
        if (!V)
            return !1;
        if (!j.skillTags.some((Y) => V.tags.includes(Y)))
            return !1;
    }
    if (j.requireKind && j.requireKind !== q.kind)
        return !1;
    if (j.requireStatusIds && !N_(q.source, j.requireStatusIds))
        return !1;
    if (j.requireStatusKinds && !H_(q.source, j.requireStatusKinds))
        return !1;
    if (j.requireAbsentStatusIds && N_(q.source, j.requireAbsentStatusIds))
        return !1;
    if (j.requireAbsentStatusKinds && H_(q.source, j.requireAbsentStatusKinds))
        return !1;
    if (j.sourceHpRatioBelow !== void 0 && g1(q.source) >= j.sourceHpRatioBelow)
        return !1;
    if (j.sourceHpRatioAbove !== void 0 && g1(q.source) <= j.sourceHpRatioAbove)
        return !1;
    if (((_14 = j.sourceTags) === null || _14 === void 0 ? void 0 : _14.length) && !j.sourceTags.every((Y) => q.source.tags.includes(Y)))
        return !1;
    if (j.sourceDefending !== void 0 && q.source.flags.defending !== j.sourceDefending)
        return !1;
    if (j.sourceStanding !== void 0 && S(q.source) !== j.sourceStanding)
        return !1;
    if (((_15 = j.damageOrigins) === null || _15 === void 0 ? void 0 : _15.length) && (!q.origin || !j.damageOrigins.includes(q.origin)))
        return !1;
    if (j.sourceResource) {
        let Y = l0(q.source, j.sourceResource.id);
        if (!Y)
            return !1;
        if (j.sourceResource.min !== void 0 && Y.current < j.sourceResource.min)
            return !1;
        if (j.sourceResource.max !== void 0 && Y.current > j.sourceResource.max)
            return !1;
    }
    let W = q.target;
    if (j.targetWithoutDelayedRevival && W && _.skills && Z0(_.skills, W).some((Y) => { var _a; return (_a = Y.innate) === null || _a === void 0 ? void 0 : _a.delayedRevivalRounds; }))
        return !1;
    if (j.targetAbsentSkillIds && W && j.targetAbsentSkillIds.some((Y) => W.passives.includes(Y) || W.skills.includes(Y)))
        return !1;
    if (j.targetSkillIds && (!W || !j.targetSkillIds.some((Y) => W.passives.includes(Y) || W.skills.includes(Y))))
        return !1;
    if (j.targetSlot === "primary" && !Z)
        return !1;
    if (j.targetSlot === "secondary" && (Z || !q.target))
        return !1;
    if (j.targetSlot === "normal" && (!q.target || !((_17 = (_16 = _.currentAction) === null || _16 === void 0 ? void 0 : _16.normalTargetIds) === null || _17 === void 0 ? void 0 : _17.includes(q.target.id))))
        return !1;
    if (j.initialTargetOwnedStatus && (!q.target || !((_20 = (_19 = (_18 = _.currentAction) === null || _18 === void 0 ? void 0 : _18.initialOwnedStatusKindsByTarget) === null || _19 === void 0 ? void 0 : _19[q.target.id]) === null || _20 === void 0 ? void 0 : _20.includes(j.initialTargetOwnedStatus))))
        return !1;
    if (j.foeKind && (W === null || W === void 0 ? void 0 : W.kind) !== j.foeKind)
        return !1;
    if (j.targetStatusIds && (!W || !N_(W, j.targetStatusIds)))
        return !1;
    if (j.targetStatusKinds && (!W || !H_(W, j.targetStatusKinds)))
        return !1;
    if (j.targetAbsentStatusIds && W && N_(W, j.targetAbsentStatusIds))
        return !1;
    if (j.targetAbsentStatusKinds && W && H_(W, j.targetAbsentStatusKinds))
        return !1;
    if (j.targetStatusCategories && (!W || !Y2(_, W, j.targetStatusCategories)))
        return !1;
    if (j.targetAbsentStatusCategories && W && Y2(_, W, j.targetAbsentStatusCategories))
        return !1;
    if (j.targetStatusStack) {
        let Y = p1(_, j, W);
        if (j.targetStatusStack.min !== void 0 && Y < j.targetStatusStack.min)
            return !1;
        if (j.targetStatusStack.max !== void 0 && Y > j.targetStatusStack.max)
            return !1;
    }
    if (j.sourceInitialStatusIds && !j.sourceInitialStatusIds.some((Y) => { var _a, _g; return (_g = (_a = _.currentAction) === null || _a === void 0 ? void 0 : _a.initialSourceStatusIds) === null || _g === void 0 ? void 0 : _g.includes(Y); }))
        return !1;
    if (j.initialTargetStatusKinds && !j.initialTargetStatusKinds.some((Y) => { var _a, _g; return q.target && ((_g = (_a = _.currentAction) === null || _a === void 0 ? void 0 : _a.initialStatusKindsByTarget[q.target.id]) === null || _g === void 0 ? void 0 : _g.includes(Y)); }))
        return !1;
    let Q = (_21 = _.currentAction) === null || _21 === void 0 ? void 0 : _21.primaryTargetId;
    if ((_22 = j.primaryTargetStatusIds) === null || _22 === void 0 ? void 0 : _22.length) {
        let Y = Q ? (_24 = (_23 = _.currentAction) === null || _23 === void 0 ? void 0 : _23.initialStatusIdsByTarget[Q]) !== null && _24 !== void 0 ? _24 : [] : [];
        if (!j.primaryTargetStatusIds.some((O) => Y.includes(O)))
            return !1;
    }
    if ((_25 = j.primaryTargetStatusKinds) === null || _25 === void 0 ? void 0 : _25.length) {
        let Y = Q ? (_27 = (_26 = _.currentAction) === null || _26 === void 0 ? void 0 : _26.initialStatusKindsByTarget[Q]) !== null && _27 !== void 0 ? _27 : [] : [];
        if (!j.primaryTargetStatusKinds.some((O) => Y.includes(O)))
            return !1;
    }
    if ((_28 = j.foeTags) === null || _28 === void 0 ? void 0 : _28.length) {
        if (!W || !j.foeTags.every((Y) => W.tags.includes(Y)))
            return !1;
    }
    if (j.targetHpRatioBelow !== void 0) {
        if (!W || g1(W) >= j.targetHpRatioBelow)
            return !1;
    }
    if (j.targetHpRatioAbove !== void 0) {
        if (!W || g1(W) <= j.targetHpRatioAbove)
            return !1;
    }
    let J = mj(q, _.state.round, j);
    if (J && q.source.marks.includes(J))
        return !1;
    return !0;
}
function Y0(_, j, q = {}) {
    var _a, _g, _h, _k;
    let P = [], $ = new Set;
    for (let V of _.state.units) {
        if (V.side !== j.side)
            continue;
        for (let X of [...Z0(_.skills, V), ...V.skills.flatMap((Z) => { let W = X0(_.skills, V, Z); return W ? [W] : []; })])
            for (let Z of (_a = X.modifiers) !== null && _a !== void 0 ? _a : []) {
                if (V.id !== j.id && !Z.teamAura)
                    continue;
                if (Z.teamAura && (!S(V) || $.has(Z.teamAura)))
                    continue;
                if (!Q1(_, Z.when, { ...q, source: j }))
                    continue;
                if (Z.teamAura)
                    $.add(Z.teamAura);
                P.push(Z);
            }
    }
    for (let V of j.statuses)
        for (let X of (_k = (_g = V.snapshotModifiers) !== null && _g !== void 0 ? _g : (_h = _.statusDefs.get(V.id)) === null || _h === void 0 ? void 0 : _h.modifiers) !== null && _k !== void 0 ? _k : [])
            if (Q1(_, X.when, { ...q, source: j }))
                P.push(X);
    return P;
}
function a(_, j, q, P, $, V) { return _.reduce((X, Z) => { var _a, _g; let W = Z[j]; return X + (typeof W === "number" || typeof W === "string" ? L(W, { allyPetSkillUnused: ((_a = V === null || V === void 0 ? void 0 : V.currentAction) === null || _a === void 0 ? void 0 : _a.sourceId) === q.id ? V.currentAction.allyPetSkillUnused : !1, state: V === null || V === void 0 ? void 0 : V.state, source: q, target: P, skillLevel: $ ? (_g = q.skillLevels[$.id]) !== null && _g !== void 0 ? _g : q.level : q.level, targets: 1 }) : 0); }, 0); }
function k1(_, j) { return !Y0(_, j).some((q) => q.ignoreReviveBlock) && j.statuses.some((q) => { var _a; return (_a = _.statusDefs.get(q.id)) === null || _a === void 0 ? void 0 : _a.blocksRevive; }); }
function w5(_, j, q = []) { return [...Z0(_.skills, j).map(($) => { var _a, _g; return (_g = (_a = $.innate) === null || _a === void 0 ? void 0 : _a.sealHitTakenFactor) !== null && _g !== void 0 ? _g : 1; }), ...j.statuses.filter(($) => !q.includes($.kind)).map(($) => { var _a, _g; return (_g = (_a = _.statusDefs.get($.id)) === null || _a === void 0 ? void 0 : _a.sealHitTakenFactor) !== null && _g !== void 0 ? _g : 1; })].reduce(($, V) => $ * V, 1); }
function J2(_, j, q, P) {
    if (!S(q))
        return;
    let $ = P.maxAmount === void 0 ? 1 / 0 : Q0(0, Math.floor(P.maxAmount)), V = Math.min($, Q0(0, Math.floor(P.amount))), X = B0(1, P.duration);
    if (V <= 0)
        return;
    let Z = q.barriers.find((W) => W.kind === P.kind);
    if (Z) {
        let W = Z.current;
        Z.current = Math.min($, P.stack ? Z.current + V : Math.max(Z.current, V)), Z.remainingRounds = X, Z.untilBattleEnd = P.untilBattleEnd, Z.decayPerRound = P.decayPerRound, Z.sourceId = j.id, Z.appliedRound = _.state.round, _.emit({ type: official_chunk_thhss9s9_js_1.mf.BarrierChanged, sourceId: j.id, unitId: q.id, barrierId: Z.id, before: W, after: Z.current, reason: "refreshed" });
        return;
    }
    q.barriers.push({ id: P.id, kind: P.kind, name: P.name, current: V, remainingRounds: X, ...P.untilBattleEnd ? { untilBattleEnd: !0 } : {}, ...P.decayPerRound !== void 0 ? { decayPerRound: P.decayPerRound } : {}, sourceId: j.id, appliedRound: _.state.round }), _.emit({ type: official_chunk_thhss9s9_js_1.mf.BarrierChanged, sourceId: j.id, unitId: q.id, barrierId: P.id, before: 0, after: V, reason: "applied" });
}
function h_(_, j, q, P = 1) {
    let $ = Q0(0, Math.floor(q)), V = Math.max(1, P), X = j.barriers.filter((Z) => Z.current > 0).sort((Z, W) => Z.appliedRound - W.appliedRound || Z.id.localeCompare(W.id));
    for (let Z of X) {
        if ($ <= 0)
            break;
        let W = Z.current, Q = Math.min(W, Math.floor($ * V));
        Z.current -= Q, $ -= Q / V, _.emit({ type: official_chunk_thhss9s9_js_1.mf.BarrierChanged, sourceId: Z.sourceId, unitId: j.id, barrierId: Z.id, before: W, after: Z.current, reason: "absorbed" });
    }
    return j.barriers = j.barriers.filter((Z) => Z.current > 0), Math.max(0, Math.floor($));
}
function O2(_, j) { return _.units.find((q) => q.id === j); }
function D1(_, j) { return _.units.filter((q) => S(q) && (j === void 0 || q.side === j)); }
function Y1(_, j) { return D1(_, (0, official_chunk_thhss9s9_js_1.sf)(j.side)).sort((q, P) => q.slot - P.slot); }
function J1(_, j) { return D1(_, j.side).sort((q, P) => q.slot - P.slot); }
function y0(_, j, q, P, $) {
    let V = j.statuses.find((X) => X.id === q && (!$ || X.sourceId === $));
    if (!V)
        return;
    if (V.attrMods.maxHp) {
        if (j.attrs.maxHp = Math.max(official_chunk_thhss9s9_js_1.wf, j.attrs.maxHp - V.attrMods.maxHp), j.wound = Math.min(j.wound, j.attrs.maxHp - 1), j.attrs.hp > r0(j))
            j.attrs.hp = r0(j);
    }
    j.statuses = j.statuses.filter((X) => X.id !== q || $ !== void 0 && X.sourceId !== $), _.emit({ type: official_chunk_thhss9s9_js_1.mf.StatusRemoved, unitId: j.id, statusId: q, reason: P }), _.hooks.emit(official_chunk_thhss9s9_js_1.ef.OnStatusRemoved, { source: _.state.units.find((X) => X.id === V.sourceId), target: j, removedStatusKind: V.kind, statusRemoveReason: P });
}
function R2(_, j) {
    let q = j.statuses.filter((P) => { var _a; return (_a = _.statusDefs.get(P.id)) === null || _a === void 0 ? void 0 : _a.breakOnDamage; });
    for (let P of q)
        y0(_, j, P.id, official_chunk_thhss9s9_js_1.if.Damage);
}
function L_(_, j) {
    var _a;
    for (let q of [...j.statuses]) {
        if ((_a = _.statusDefs.get(q.id)) === null || _a === void 0 ? void 0 : _a.persistWhenDowned)
            continue;
        y0(_, j, q.id, official_chunk_thhss9s9_js_1.if.Downed);
    }
}
function K_(_, j, q) {
    if (Ij(_, j))
        return !1;
    return q.statuses.some((P) => { var _a; return (_a = _.statusDefs.get(P.id)) === null || _a === void 0 ? void 0 : _a.untargetable; });
}
function Ij(_, j) {
    var _a, _g;
    if (j.statuses.some((q) => { var _a; return (_a = _.statusDefs.get(q.id)) === null || _a === void 0 ? void 0 : _a.revealStealth; }))
        return !0;
    for (let q of j.passives)
        if ((_g = (_a = X0(_.skills, j, q)) === null || _a === void 0 ? void 0 : _a.innate) === null || _g === void 0 ? void 0 : _g.revealStealth)
            return !0;
    return !1;
}
function E5(_, j, q, P) {
    var _a, _g;
    if (P.targeting.excludeSelf && j.id === q.id)
        return !1;
    if (P.targeting.requireKind && q.kind !== P.targeting.requireKind)
        return !1;
    if (q.flags.capturedBy || q.flags.benched)
        return !1;
    if (P.targeting.requireRevivable && (k1(_, q) || Z0(_.skills, q).some((V) => { var _a; return (_a = V.innate) === null || _a === void 0 ? void 0 : _a.rejectHpRecovery; })))
        return !1;
    if (P.targeting.onlyDowned && !q.flags.downed && !q.flags.dead)
        return !1;
    if (P.capture && (P.capture.targetMpCosts[q.id] === void 0 || _.state.units.filter((V) => V.flags.capturedBy === j.id).length >= P.capture.capacity))
        return !1;
    if (q.flags.escaped)
        return !1;
    if (q.flags.dead && !P.targeting.includeDead)
        return !1;
    if (q.flags.downed && !P.targeting.includeDowned)
        return !1;
    if (!q.flags.downed && !q.flags.dead && !S(q) && !P.targeting.includeDowned)
        return !1;
    let $ = P.targeting.side;
    if ($ === official_chunk_thhss9s9_js_1.af.Self)
        return q.id === j.id;
    if ($ === official_chunk_thhss9s9_js_1.af.Enemy && q.side === j.side)
        return !1;
    if ($ === official_chunk_thhss9s9_js_1.af.Ally && q.side !== j.side)
        return !1;
    if (K_(_, j, q))
        return !1;
    if (((_a = P.targeting.requireStatusIds) === null || _a === void 0 ? void 0 : _a.length) && !P.targeting.requireStatusIds.some((V) => q.statuses.some((X) => X.id === V)))
        return !1;
    if (((_g = P.targeting.requireStatusKinds) === null || _g === void 0 ? void 0 : _g.length) && !P.targeting.requireStatusKinds.some((V) => q.statuses.some((X) => X.kind === V)))
        return !1;
    return !0;
}
function B2(_, j, q) {
    let P = q.targeting.side, $;
    if (P === official_chunk_thhss9s9_js_1.af.Self)
        $ = [j];
    else if (P === official_chunk_thhss9s9_js_1.af.Enemy)
        $ = Y1(_.state, j);
    else if (P === official_chunk_thhss9s9_js_1.af.Ally)
        $ = J1(_.state, j);
    else
        $ = _.state.units.filter((V) => !V.flags.escaped);
    if (q.targeting.includeDowned) {
        let V = _.state.units.filter((X) => {
            if (X.flags.escaped)
                return !1;
            if (P === official_chunk_thhss9s9_js_1.af.Enemy && X.side === j.side)
                return !1;
            if (P === official_chunk_thhss9s9_js_1.af.Ally && X.side !== j.side)
                return !1;
            if (P === official_chunk_thhss9s9_js_1.af.Self)
                return X.id === j.id;
            return X.flags.downed || X.flags.dead;
        });
        $ = [...$, ...V.filter((X) => !$.includes(X))];
    }
    return $.filter((V) => E5(_, j, V, q)).sort((V, X) => V.slot - X.slot);
}
function d5(_, j, q, P) { var _a, _g, _h; let $ = (_g = (_a = j.targeting.countByResource) === null || _a === void 0 ? void 0 : _a.filter((Z) => { var _a, _g; return ((_g = (_a = l0(_, Z.resourceId)) === null || _a === void 0 ? void 0 : _a.current) !== null && _g !== void 0 ? _g : 0) >= Z.min; }).slice(-1)[0]) === null || _g === void 0 ? void 0 : _g.count, V = L((_h = $ !== null && $ !== void 0 ? $ : j.targeting.count) !== null && _h !== void 0 ? _h : official_chunk_thhss9s9_js_1.yf, { state: P === null || P === void 0 ? void 0 : P.state, skillLevel: T1(_, j.id), targets: q, source: _ }), X = P ? a(Y0(P, _, { skill: j, skillId: j.id }), "targetCountAdd", _, void 0, j) : 0; return Math.max(1, Math.floor(V + X)); }
function A_(_, j, q, P, $, V) {
    var _a, _g;
    let X = (_a = q.targeting.mode) !== null && _a !== void 0 ? _a : official_chunk_thhss9s9_js_1.bf.Explicit;
    if (q.targeting.side === official_chunk_thhss9s9_js_1.af.Self)
        return [j];
    let Z = d5(j, q, P.length || 1, _), W = B2(_, j, q);
    if (X === official_chunk_thhss9s9_js_1.bf.All) {
        let Y = q.targeting.count === void 0 ? W : W.slice(0, Z);
        return L1(_, j, q, Y, W, V);
    }
    if (X === official_chunk_thhss9s9_js_1.bf.Random)
        return L1(_, j, q, zj(_, W, Z), W, V);
    if (X === official_chunk_thhss9s9_js_1.bf.LowestHp)
        return L1(_, j, q, W.slice().sort((Y, O) => Y.attrs.hp / Math.max(1, Y.attrs.maxHp) - O.attrs.hp / Math.max(1, O.attrs.maxHp) || Y.slot - O.slot).slice(0, Z), W, V);
    if (X === official_chunk_thhss9s9_js_1.bf.LowestDef)
        return L1(_, j, q, W.slice().sort((Y, O) => Y.attrs.physicalDef - O.attrs.physicalDef || Y.slot - O.slot).slice(0, Z), W, V);
    let Q = [], J = new Set;
    if ($) {
        let Y = _.state.units.find((O) => O.id === $);
        if (Y && Y.id !== j.id && S(Y) && (!q.targeting.requireKind || Y.kind === q.targeting.requireKind))
            Q.push(Y), J.add(Y.id);
    }
    for (let Y of P.slice(0, (_g = q.targeting.maxSelected) !== null && _g !== void 0 ? _g : P.length)) {
        if (Q.length >= Z)
            break;
        let O = _.state.units.find((G) => G.id === Y);
        if (!O || J.has(O.id))
            continue;
        if (!E5(_, j, O, q))
            continue;
        if (Q.push(O), J.add(O.id), Q.length >= Z)
            break;
    }
    if (X === official_chunk_thhss9s9_js_1.bf.Explicit)
        return L1(_, j, q, Q, W, V);
    for (let Y of W) {
        if (Q.length >= Z)
            break;
        if (J.has(Y.id))
            continue;
        if (Q.push(Y), J.add(Y.id), Q.length >= Z)
            break;
    }
    return L1(_, j, q, Q, W, V);
}
function L1(_, j, q, P, $, V) {
    V === null || V === void 0 ? void 0 : V.push(...P.map((O) => O.id));
    let X = q.targeting.extraCount;
    if (P.length && q.targeting.includeOwnedStatusKind)
        P = [...P, ...$.filter((O) => !P.includes(O) && O.statuses.some((G) => G.kind === q.targeting.includeOwnedStatusKind && G.sourceId === j.id))];
    let Z = q.targeting.extraChance;
    if (X === void 0 && Z === void 0)
        return P;
    let W = { skillLevel: T1(j, q.id), targets: P.length, source: j };
    if (Z !== void 0 && !_.rng.chance(L(Z, W)))
        return P;
    let Q = X === void 0 ? 0 : Math.max(0, Math.floor(L(X, W)));
    if (Q <= 0)
        return P;
    let J = new Set(P.map((O) => O.id)), Y = [];
    for (let O of $) {
        if (J.has(O.id))
            continue;
        if (Y.push(O), J.add(O.id), Y.length >= Q)
            break;
    }
    return [...P, ...Y];
}
function zj(_, j, q) {
    let P = j.slice();
    for (let $ = P.length - 1; $ > 0; $--) {
        let V = Math.floor(_.rng.next() * ($ + 1)), X = P[$];
        P[$] = P[V], P[V] = X;
    }
    return P.slice(0, q);
}
function G2(_, j) {
    var _a, _g, _h, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _3, _8, _10, _11;
    var _12;
    let { source: q, target: P } = j, $ = N0(q), V = N0(P), X = (_a = j.origin) !== null && _a !== void 0 ? _a : (_.suppressHooks > 0 ? official_chunk_thhss9s9_js_1.Ze.HookDerived : official_chunk_thhss9s9_js_1.Ze.ActionDirect), Z = X !== official_chunk_thhss9s9_js_1.Ze.ActionDirect || _.suppressHooks > 0, W = (_g = j.skillId) !== null && _g !== void 0 ? _g : (_h = _.currentAction) === null || _h === void 0 ? void 0 : _h.skillId, Q = W ? X0(_.skills, q, W) : void 0, J = Y0(_, q, { target: P, skill: Q, skillId: W, kind: j.kind, origin: X });
    $.hit += a(J, "hitAdd", q, P, Q, _), $.physicalAtk += a(J, "physicalAttackAdd", q, P, Q, _);
    let Y = j.kind === official_chunk_thhss9s9_js_1.Ye.Physical && !j.healInstead && !J.some((T) => T.ignoreProtection) ? vj(_, P) : void 0;
    if (Y)
        _.emit({ type: official_chunk_thhss9s9_js_1.mf.ProtectTrigger, protectorId: Y.id, originalTargetId: P.id });
    if (!j.cannotMiss && j.kind !== official_chunk_thhss9s9_js_1.Ye.Fixed && !Sj(_, q, P, $, V, j.kind))
        return;
    let O = j.kind === official_chunk_thhss9s9_js_1.Ye.Physical && _.rng.chance($.physicalFuryRate + a(J, "physicalFuryChanceAdd", q, P, Q, _)), G = (_k = j.isPrimary) !== null && _k !== void 0 ? _k : (((_l = _.currentAction) === null || _l === void 0 ? void 0 : _l.primaryTargetId) !== void 0 && P.id === _.currentAction.primaryTargetId), h = j.kind === official_chunk_thhss9s9_js_1.Ye.Fixed ? 0 : j.kind === official_chunk_thhss9s9_js_1.Ye.Physical ? $.critRate : $.spellCritRate, K = _.hooks.emit(official_chunk_thhss9s9_js_1.ef.OnCritRoll, { source: q, target: P, kind: j.kind, skillId: W, isPrimary: G, chance: h + a(J, "critChanceAdd", q, P, Q, _), origin: X }), B = j.kind === official_chunk_thhss9s9_js_1.Ye.Fixed ? !1 : (_m = K.crit) !== null && _m !== void 0 ? _m : _.rng.chance(Math.min(1, Math.max(0, (_o = K.chance) !== null && _o !== void 0 ? _o : h))), D = _.hooks.emit(official_chunk_thhss9s9_js_1.ef.OnDefenseIgnoreCalc, { source: q, target: P, kind: j.kind, skillId: W, isPrimary: G, defenseIgnore: ((_p = j.defenseIgnore) !== null && _p !== void 0 ? _p : 0) + a(J, "defenseIgnoreAdd", q, P, Q, _) + (j.kind === official_chunk_thhss9s9_js_1.Ye.Physical ? q.statuses.reduce((T, j0) => { var _a, _g; return T + ((_g = (_a = _.statusDefs.get(j0.id)) === null || _a === void 0 ? void 0 : _a.physicalDefenseIgnore) !== null && _g !== void 0 ? _g : 0); }, 0) : 0), origin: X }), A = { ...j, defenseIgnore: D.defenseIgnore }, v = wj(_, q, P, $, V, A, O), w = a(J, "critMultiplierAdd", q, P, Q, _), k = B && j.critMultiplier !== void 0 ? j.critMultiplier + w : 1;
    if (v = B && j.critMultiplier === void 0 ? Math.floor(v * (_.rules.formulas.critMultiplier + w)) : v, j.kind !== official_chunk_thhss9s9_js_1.Ye.Fixed)
        v = yj(_, v, j.kind, q);
    if (j.healInstead) {
        _.emit({ type: official_chunk_thhss9s9_js_1.mf.Hit, sourceId: q.id, targetId: P.id, kind: j.kind, crit: B, fury: O }), C_(_, q, P, v * ((_q = j.resultFactor) !== null && _q !== void 0 ? _q : 1) * k, !1, !0, !1);
        return;
    }
    v = Ej(_, P, j.kind, v, j.defendFactor), v = B0(official_chunk_thhss9s9_js_1.uf, v * z5(P, j.kind));
    let t = _.hooks.emit(official_chunk_thhss9s9_js_1.ef.OnHitCalc, { percentageDamage: j.percentageDamage, source: q, target: P, damage: v, kind: j.kind, skillId: W, isPrimary: G, origin: X }), M0 = j.kind === official_chunk_thhss9s9_js_1.Ye.Spell && ((_r = _.currentAction) === null || _r === void 0 ? void 0 : _r.sourceId) === q.id ? (_s = _.currentAction.spellRepeatFactor) !== null && _s !== void 0 ? _s : 1 : 1, b0 = 1;
    if (j.kind === official_chunk_thhss9s9_js_1.Ye.Physical || j.kind === official_chunk_thhss9s9_js_1.Ye.Spell) {
        let T = Z0(_.skills, q), j0 = Z0(_.skills, P);
        if (j0.some((R0) => { var _a; return (_a = R0.innate) === null || _a === void 0 ? void 0 : _a.delayedRevivalRounds; }))
            for (let R0 of T)
                b0 *= (_u = (_t = R0.innate) === null || _t === void 0 ? void 0 : _t.damageToDelayedRevival) !== null && _u !== void 0 ? _u : 1;
        if (T.some((R0) => { var _a; return (_a = R0.innate) === null || _a === void 0 ? void 0 : _a.delayedRevivalRounds; }))
            for (let R0 of j0)
                b0 *= (_w = (_v = R0.innate) === null || _v === void 0 ? void 0 : _v.damageFromDelayedRevival) !== null && _w !== void 0 ? _w : 1;
    }
    let O0 = 1;
    if (j.kind !== official_chunk_thhss9s9_js_1.Ye.Fixed)
        for (let T of q.statuses) {
            let j0 = _.statusDefs.get(T.id);
            O0 *= (_x = (j.kind === official_chunk_thhss9s9_js_1.Ye.Physical ? j0 === null || j0 === void 0 ? void 0 : j0.damageDealtPhysical : j0 === null || j0 === void 0 ? void 0 : j0.damageDealtSpell)) !== null && _x !== void 0 ? _x : 1;
        }
    let b1 = P.statuses.reduce((T, j0) => { var _a, _g; return T * (j0.sourceId === q.id ? (_g = (_a = _.statusDefs.get(j0.id)) === null || _a === void 0 ? void 0 : _a.damageTakenFromSource) !== null && _g !== void 0 ? _g : 1 : 1); }, 1), Z1 = Y0(_, P, { target: q, skill: Q, skillId: W, kind: j.kind, origin: X }), U = Math.max(0, 1 + a(Z1, "damageTakenBonus", P, q, Q, _)), b = a(Z1, "damageTakenAdd", P, q, Q, _), d = B0(official_chunk_thhss9s9_js_1.uf, (((_y = t.damage) !== null && _y !== void 0 ? _y : v) * (1 + a(J, "damageBonus", q, P, Q, _)) + a(J, "damageAdd", q, P, Q, _)) * M0 * b0 * O0 * b1 * ((_z = j.resultFactor) !== null && _z !== void 0 ? _z : 1) * k * U + b);
    _.emit({ type: official_chunk_thhss9s9_js_1.mf.Hit, sourceId: q.id, targetId: P.id, kind: j.kind, crit: B, fury: O });
    let _0 = d;
    if (Y) {
        let T = (_3 = _.rules.protectionTargetRatio) !== null && _3 !== void 0 ? _3 : 0;
        R1(_, q, Y, Math.floor(d * (1 - T)), j.kind, Z, X, j.cannotKill), _0 = Math.floor(d * T * (1 + a(J, "protectedDamageBonus", q, P, Q, _)));
    }
    let N1 = 1 + a(J, "barrierDamageBonus", q, P, Q, _), R_ = R1(_, q, P, _0, j.kind, Z, X, j.cannotKill, N1);
    if (!Z)
        for (let T of J) {
            if (T.splash) {
                let j0 = _.state.units.filter((a0) => a0.side !== q.side && a0.id !== P.id && S(a0)), R0 = Math.max(0, Math.floor(L(T.splash.count, { source: q, target: P, targets: j0.length, skillLevel: q.level }))), V2 = `${P.id}:${T.splash.factor}:${R0}`, B_ = ((_8 = _.currentAction) === null || _8 === void 0 ? void 0 : _8.sourceId) === q.id ? (_10 = (_12 = _.currentAction).splashTargetIds) !== null && _10 !== void 0 ? _10 : (_12.splashTargetIds = {}) : void 0, X2 = (_11 = B_ === null || B_ === void 0 ? void 0 : B_[V2]) !== null && _11 !== void 0 ? _11 : [];
                if (!(B_ === null || B_ === void 0 ? void 0 : B_[V2])) {
                    for (let a0 = 0; a0 < R0 && j0.length; a0++)
                        X2.push(j0.splice(Math.floor(_.rng.next() * j0.length), 1)[0].id);
                    if (B_)
                        B_[V2] = X2;
                }
                for (let a0 of X2) {
                    let Hj = _.state.units.find((hj) => hj.id === a0);
                    R1(_, q, Hj, Math.floor(d * T.splash.factor), j.kind, !0, official_chunk_thhss9s9_js_1.Ze.HookDerived);
                }
            }
            if (T.mirrorToTargetPet && P.kind === "player")
                for (let j0 of _.state.units.filter((R0) => R0.ownerId === P.id && R0.kind === "pet" && S(R0)))
                    R1(_, q, j0, d, j.kind, !0, official_chunk_thhss9s9_js_1.Ze.HookDerived);
        }
    if (j.mpDamageRatio !== void 0 && R_ > 0) {
        let T = Math.min(P.attrs.mp, Math.max(0, Math.floor(R_ * j.mpDamageRatio)));
        if (T > 0)
            P.attrs.mp -= T, _.emit({ type: official_chunk_thhss9s9_js_1.mf.MpDamage, sourceId: q.id, targetId: P.id, amount: T, mpAfter: P.attrs.mp });
    }
    if (!Z) {
        let T = { source: q, target: P, damage: d, hpDamage: R_, kind: j.kind, skillId: W, isPrimary: G, origin: X };
        if (_.hooks.emit(official_chunk_thhss9s9_js_1.ef.AfterStrike, { ...T }), R_ > 0)
            _.hooks.emit(official_chunk_thhss9s9_js_1.ef.AfterHit, T);
    }
}
function vj(_, j) {
    if (!S(j))
        return;
    return J1(_.state, j).find((q) => (q.flags.protecting === j.id || j.statuses.some((P) => { var _a; return P.sourceId === q.id && ((_a = _.statusDefs.get(P.id)) === null || _a === void 0 ? void 0 : _a.protectsTarget); })) && S(q) && q.id !== j.id);
}
function O1(_, j) { return { ..._, attrs: j }; }
function Sj(_, j, q, P, $, V) {
    var _a;
    let X = _.rules.formulas, Z = V === official_chunk_thhss9s9_js_1.Ye.Physical ? X.physicalHitChance(O1(j, P), O1(q, $)) : X.spellHitChance(O1(j, P), O1(q, $)), W = _.hooks.emit(official_chunk_thhss9s9_js_1.ef.OnHitRoll, { source: j, target: q, kind: V, skillId: rj(_), chance: Z, origin: _.suppressHooks > 0 ? official_chunk_thhss9s9_js_1.Ze.HookDerived : official_chunk_thhss9s9_js_1.Ze.ActionDirect });
    if (_.rng.chance(Math.min(1, Math.max(0, (_a = W.chance) !== null && _a !== void 0 ? _a : Z))))
        return !0;
    return _.emit({ type: official_chunk_thhss9s9_js_1.mf.Miss, sourceId: j.id, targetId: q.id, kind: V }), !1;
}
function rj(_) { var _a; return (_a = _.currentAction) === null || _a === void 0 ? void 0 : _a.skillId; }
function wj(_, j, q, P, $, V, X) { var _a, _g, _h, _k, _l; let Z = (_a = V.formula) !== null && _a !== void 0 ? _a : (V.trueDamage ? official_chunk_thhss9s9_js_1.kf.Fixed : V.kind === official_chunk_thhss9s9_js_1.Ye.Physical ? official_chunk_thhss9s9_js_1.kf.Physical : official_chunk_thhss9s9_js_1.kf.Spell), W = Math.min(1, Math.max(0, (_g = V.defenseIgnore) !== null && _g !== void 0 ? _g : 0)), Q = { ...$, physicalDef: V.kind === official_chunk_thhss9s9_js_1.Ye.Physical ? Math.max(0, $.physicalDef - Math.max(0, (_h = V.defenseSubtract) !== null && _h !== void 0 ? _h : 0)) : $.physicalDef }, J = (V.kind === official_chunk_thhss9s9_js_1.Ye.Physical || V.kind === official_chunk_thhss9s9_js_1.Ye.Spell) && W > 0 ? O1(q, { ...Q, physicalDef: V.kind === official_chunk_thhss9s9_js_1.Ye.Physical ? Math.floor(Q.physicalDef * (1 - W)) : Q.physicalDef, magicDef: V.kind === official_chunk_thhss9s9_js_1.Ye.Spell ? Math.floor($.magicDef * (1 - W)) : $.magicDef }) : O1(q, Q); return _.rules.formulas.baseDamage({ family: Z, kind: V.kind, source: O1(j, P), target: J, coeff: V.coeff, power: V.power, fury: X, furyMultiplier: _.rules.formulas.furyAtkMultiplier, skillLevel: (_k = V.skillLevel) !== null && _k !== void 0 ? _k : 0, targetCount: (_l = V.targetCount) !== null && _l !== void 0 ? _l : 1, schoolTerm: V.schoolTerm, splash: V.splash, defenseIgnore: W }); }
function yj(_, j, q, P) {
    var _a, _g;
    if (q === official_chunk_thhss9s9_js_1.Ye.Spell)
        for (let Z of P.passives) {
            let W = (_g = (_a = X0(_.skills, P, Z)) === null || _a === void 0 ? void 0 : _a.innate) === null || _g === void 0 ? void 0 : _g.spellFluctuation;
            if (W)
                return B0(official_chunk_thhss9s9_js_1.uf, j * _.rng.range(W.min, W.max));
        }
    let $ = _.rules.formulas, V = q === official_chunk_thhss9s9_js_1.Ye.Physical ? $.physicalFluctuationMin : $.fluctuationMin, X = q === official_chunk_thhss9s9_js_1.Ye.Physical ? $.physicalFluctuationMax : $.fluctuationMax;
    return B0(official_chunk_thhss9s9_js_1.uf, j * _.rng.range(V, X));
}
function Ej(_, j, q, P, $) {
    if (q !== official_chunk_thhss9s9_js_1.Ye.Physical || !j.flags.defending)
        return P;
    return B0(official_chunk_thhss9s9_js_1.uf, P * ($ !== null && $ !== void 0 ? $ : _.rules.formulas.defendPhysicalFactor));
}
function R1(_, j, q, P, $, V = !1, X = V ? official_chunk_thhss9s9_js_1.Ze.HookDerived : official_chunk_thhss9s9_js_1.Ze.ActionDirect, Z = !1, W = 1) {
    var _a, _g, _h, _k, _l, _m, _o, _p, _q, _r;
    if (!S(q) || q.flags.downed)
        return 0;
    let Q = ((_a = _.currentAction) === null || _a === void 0 ? void 0 : _a.skillId) ? X0(_.skills, j, _.currentAction.skillId) : void 0, J = Y0(_, q, { target: j, skill: Q, skillId: Q === null || Q === void 0 ? void 0 : Q.id, kind: $, origin: X }), Y = Math.max(0, Math.floor(P * Math.max(0, 1 + a(J, "allDamageTakenBonus", q, j, Q, _)))), O = dj(_, j, q, Y, $, X), G = X === official_chunk_thhss9s9_js_1.Ze.Status ? O : h_(_, q, O, W), h = O - G, K = Z ? Math.min(G, Math.max(0, q.attrs.hp - official_chunk_thhss9s9_js_1.vf)) : G;
    if (_.lastStrikeDamage = G, X === official_chunk_thhss9s9_js_1.Ze.ActionDirect && ((_g = _.currentAction) === null || _g === void 0 ? void 0 : _g.sourceId) === j.id && $ !== official_chunk_thhss9s9_js_1.Ye.Fixed && (h > 0 || K > 0))
        _.currentAction.hasPhysicalOrSpellImpact = !0;
    if (X === official_chunk_thhss9s9_js_1.Ze.ActionDirect && ((_h = _.currentAction) === null || _h === void 0 ? void 0 : _h.sourceId) === j.id && h > 0)
        _.currentAction.impactDamageByTarget[q.id] = ((_k = _.currentAction.impactDamageByTarget[q.id]) !== null && _k !== void 0 ? _k : 0) + h;
    if (K <= 0)
        return 0;
    let B = q.attrs.hp, D = Q0(0, q.attrs.hp - K), A = B - D;
    if (X === official_chunk_thhss9s9_js_1.Ze.ActionDirect && ((_l = _.currentAction) === null || _l === void 0 ? void 0 : _l.sourceId) === j.id)
        _.currentAction.impactDamageByTarget[q.id] = ((_m = _.currentAction.impactDamageByTarget[q.id]) !== null && _m !== void 0 ? _m : 0) + A;
    if (q.attrs.hp = D, T5(_, q, A), _.emit({ type: official_chunk_thhss9s9_js_1.mf.Damage, sourceId: j.id, targetId: q.id, amount: G, hpAfter: D, kind: $ }), !V)
        _.hooks.emit(official_chunk_thhss9s9_js_1.ef.OnBeHit, { source: j, target: q, damage: G, hpDamage: A, kind: $, skillId: (_o = _.currentAction) === null || _o === void 0 ? void 0 : _o.skillId, isPrimary: ((_p = _.currentAction) === null || _p === void 0 ? void 0 : _p.primaryTargetId) === q.id, origin: X });
    if (_.hooks.emit(official_chunk_thhss9s9_js_1.ef.AfterDamage, { source: j, target: q, damage: G, hpDamage: A, kind: $, skillId: (_q = _.currentAction) === null || _q === void 0 ? void 0 : _q.skillId, origin: X }), R2(_, q), D <= 0)
        _.applyHpZero(q, j, (_r = _.currentAction) === null || _r === void 0 ? void 0 : _r.skillId, $, X);
    return A;
}
function T5(_, j, q) { let P = j.hpDamageThisRound; j.hpDamageThisRound = { round: _.state.round, amount: ((P === null || P === void 0 ? void 0 : P.round) === _.state.round ? P.amount : 0) + q }; }
function dj(_, j, q, P, $, V) {
    var _a, _g, _h;
    let X = q.statuses.find((Y) => { var _a; return (_a = _.statusDefs.get(Y.id)) === null || _a === void 0 ? void 0 : _a.redirectTaken; }), Z = X ? (_a = _.statusDefs.get(X.id)) === null || _a === void 0 ? void 0 : _a.redirectTaken : void 0;
    if (!X || !Z)
        return P;
    let W = O2(_.state, X.sourceId), Q = Q0(0, Math.floor(P * Z.keep)), J = Q0(0, Math.floor(P * Z.toCaster));
    if (W && S(W) && W.id !== q.id && J > 0) {
        let Y = V === official_chunk_thhss9s9_js_1.Ze.Status ? J : h_(_, W, J);
        if (Y <= 0)
            return Q;
        let O = Q0(0, W.attrs.hp - Y), G = W.attrs.hp - O;
        if (T5(_, W, G), W.attrs.hp = O, _.emit({ type: official_chunk_thhss9s9_js_1.mf.Damage, sourceId: j.id, targetId: W.id, amount: Y, hpAfter: O, kind: $ }), _.hooks.emit(official_chunk_thhss9s9_js_1.ef.AfterDamage, { source: j, target: W, damage: Y, hpDamage: G, kind: $, origin: V, skillId: (_g = _.currentAction) === null || _g === void 0 ? void 0 : _g.skillId }), O <= 0)
            _.applyHpZero(W, j, (_h = _.currentAction) === null || _h === void 0 ? void 0 : _h.skillId);
    }
    return Q;
}
function C_(_, j, q, P, $ = !1, V = !1, X = !0) {
    var _a, _g, _h;
    if (q.flags.dead || q.flags.escaped || q.flags.downed)
        return;
    if (Z0(_.skills, q).some((h) => { var _a; return (_a = h.innate) === null || _a === void 0 ? void 0 : _a.rejectHpRecovery; }))
        return;
    if ($) {
        let h = B0(official_chunk_thhss9s9_js_1.uf, P + j.attrs.healPower);
        q.attrs.maxHp += h, _.emit({ type: official_chunk_thhss9s9_js_1.mf.Heal, sourceId: j.id, targetId: q.id, amount: h, hpAfter: q.attrs.hp });
        return;
    }
    let Z = B0(official_chunk_thhss9s9_js_1.uf, P + (V || !X ? 0 : N0(j).healPower)), W = ((_a = _.currentAction) === null || _a === void 0 ? void 0 : _a.primaryTargetId) !== void 0 && q.id === _.currentAction.primaryTargetId, Q = b_(q) * (V ? 1 : v5(j)), J = _.hooks.emit(official_chunk_thhss9s9_js_1.ef.OnHealCalc, { origin: _.suppressHooks > 0 ? official_chunk_thhss9s9_js_1.Ze.HookDerived : official_chunk_thhss9s9_js_1.Ze.ActionDirect, source: j, target: q, heal: Z * Q, skillId: (_g = _.currentAction) === null || _g === void 0 ? void 0 : _g.skillId, isPrimary: W }), Y = B0(0, V ? Z * Q : (_h = J.heal) !== null && _h !== void 0 ? _h : Z * Q), O = Math.min(r0(q), q.attrs.hp + Y), G = O - q.attrs.hp;
    if (q.attrs.hp = O, G > 0)
        _.emit({ type: official_chunk_thhss9s9_js_1.mf.Heal, sourceId: j.id, targetId: q.id, amount: G, hpAfter: O });
}
function U2(_, j, q, P, $ = !1) {
    if (q.flags.escaped)
        return !1;
    if (!$ && Z0(_.skills, q).some((Z) => { var _a; return (_a = Z.innate) === null || _a === void 0 ? void 0 : _a.rejectHpRecovery; }))
        return !1;
    if (!(q.flags.downed || q.flags.dead || q.attrs.hp <= 0))
        return !1;
    if (k1(_, q))
        return _.emit({ type: official_chunk_thhss9s9_js_1.mf.ActionFailed, unitId: j.id, reason: official_chunk_thhss9s9_js_1.hf.ReviveBlocked }), !1;
    let X = Math.max(official_chunk_thhss9s9_js_1.vf, Math.min(r0(q), Math.floor(P)));
    return q.attrs.hp = X, q.flags.downed = !1, q.flags.dead = !1, q.flags.revivedRound = _.state.round, _.emit({ type: official_chunk_thhss9s9_js_1.mf.UnitRevived, unitId: q.id, hp: X }), _.emit({ type: official_chunk_thhss9s9_js_1.mf.Heal, sourceId: j.id, targetId: q.id, amount: X, hpAfter: X }), !0;
}
function g5(_, j, q, P, $ = {}) {
    if (q.flags.escaped)
        return 0;
    if (Z0(_.skills, q).some((X) => { var _a; return (_a = X.innate) === null || _a === void 0 ? void 0 : _a.rejectHpRecovery; }))
        return 0;
    if ($.revive && q.attrs.hp <= 0) {
        if (k1(_, q))
            return _.emit({ type: official_chunk_thhss9s9_js_1.mf.ActionFailed, unitId: j.id, reason: official_chunk_thhss9s9_js_1.hf.ReviveBlocked }), 0;
        if ($.clearStatuses)
            L_(_, q);
        let X = Math.max(official_chunk_thhss9s9_js_1.vf, Math.min(r0(q), Math.floor(P)));
        return q.attrs.hp = X, q.flags.downed = !1, q.flags.dead = !1, q.flags.revivedRound = _.state.round, _.emit({ type: official_chunk_thhss9s9_js_1.mf.UnitRevived, unitId: q.id, hp: X }), _.emit({ type: official_chunk_thhss9s9_js_1.mf.Heal, sourceId: j.id, targetId: q.id, amount: X, hpAfter: X }), X;
    }
    if (!S(q) && !($.allowFatal && q.attrs.hp <= 0 && !q.flags.downed && !q.flags.dead && !q.flags.benched))
        return 0;
    let V = Math.max(0, Math.min(r0(q) - q.attrs.hp, Math.floor(P)));
    if (V <= 0)
        return 0;
    return q.attrs.hp += V, _.emit({ type: official_chunk_thhss9s9_js_1.mf.Heal, sourceId: j.id, targetId: q.id, amount: V, hpAfter: q.attrs.hp }), V;
}
function M2(_, j, q, P) {
    if (!S(q))
        return;
    let $ = Math.max(0, Math.min(q.attrs.mp, Math.floor(P)));
    if (q.attrs.mp -= $, $ > 0)
        _.emit({ type: official_chunk_thhss9s9_js_1.mf.MpDamage, sourceId: j.id, targetId: q.id, amount: $, mpAfter: q.attrs.mp });
}
function b2(_, j, q, P) { F_(_, j, q, P); }
function F_(_, j, q, P) {
    if (q.flags.dead || q.flags.escaped)
        return;
    let $ = q.wound;
    if (q.wound = Math.max(0, Math.min(q.attrs.maxHp - official_chunk_thhss9s9_js_1.vf, $ + Math.floor(P))), q.wound === $)
        return;
    q.attrs.hp = Math.min(q.attrs.hp, r0(q)), _.emit({ type: official_chunk_thhss9s9_js_1.mf.WoundChanged, sourceId: j.id, targetId: q.id, before: $, after: q.wound, hpAfter: q.attrs.hp, recoverableHpAfter: r0(q) });
}
function N2(_, j) { return _.statusDefs.get(j); }
function h2(_, j, q, P, $, V = {}) {
    var _a, _g, _h, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _3, _8, _10, _11, _12, _13, _14, _15, _16, _17;
    let X = N2(_, q);
    if (!X) {
        _.emit({ type: official_chunk_thhss9s9_js_1.mf.ActionFailed, unitId: $, reason: (0, official_chunk_thhss9s9_js_1.tf)(official_chunk_thhss9s9_js_1.hf.UnknownStatus, q) });
        return;
    }
    if (o5(_, j, X, (_g = (_a = V.env) === null || _a === void 0 ? void 0 : _a.source) !== null && _g !== void 0 ? _g : _.state.units.find((B) => B.id === $)))
        return;
    if (X.category === official_chunk_thhss9s9_js_1.df.Buff && X.extendable !== !1 && !X.untargetable && !X.blocksRevive && !X.ticks && !X.blocksAction && !X.blocksSpell && !X.blocksPhysical && !X.actFirst)
        for (let B of j.passives) {
            let D = (_k = (_h = X0(_.skills, j, B)) === null || _h === void 0 ? void 0 : _h.innate) === null || _k === void 0 ? void 0 : _k.buffDuration;
            if (D) {
                P += Math.min(D.maxExtra, Math.floor(P * (D.factor - 1)));
                break;
            }
        }
    let Z = (_l = V.env) !== null && _l !== void 0 ? _l : { skillLevel: 0, targets: 1, source: (_m = _.state.units.find((B) => B.id === $)) !== null && _m !== void 0 ? _m : j, target: j }, W = { ...j, statuses: j.statuses.filter((B) => B.kind !== X.kind) }, Q = { ...j, attrs: N0(W) }, J = { ...Z, state: _.state, normalTargetIds: (_o = _.currentAction) === null || _o === void 0 ? void 0 : _o.normalTargetIds, target: ((_p = Z.target) === null || _p === void 0 ? void 0 : _p.id) === j.id ? Q : Z.target, source: Z.source.id === j.id ? Q : Z.source }, Y = X.priority === void 0 ? void 0 : L(X.priority, J);
    if (Y !== void 0) {
        let B = j.statuses.find((w) => w.kind === X.kind), D = B && N2(_, B.id), A = (_q = B === null || B === void 0 ? void 0 : B.priority) !== null && _q !== void 0 ? _q : (typeof (D === null || D === void 0 ? void 0 : D.priority) === "number" ? D.priority : void 0), v = (D === null || D === void 0 ? void 0 : D.ticks) !== official_chunk_thhss9s9_js_1.nf.RoundStart || ((_r = B === null || B === void 0 ? void 0 : B.remainingRounds) !== null && _r !== void 0 ? _r : 0) > 1 || (B === null || B === void 0 ? void 0 : B.appliedRound) === _.state.round;
        if (B && v && A !== void 0 && (A > Y || A === Y && ((D === null || D === void 0 ? void 0 : D.untilBattleEnd) || !X.untilBattleEnd && B.remainingRounds >= P)))
            return;
    }
    let O = ((_s = X.onTick) === null || _s === void 0 ? void 0 : _s.snapshot) && X.onTick.mpPower !== void 0 ? L(X.onTick.mpPower, J) : void 0, G = {};
    for (let [B, D] of Object.entries((_t = X.attrMods) !== null && _t !== void 0 ? _t : {}))
        G[B] = L(D, J);
    let h = X.maxStacks && X.maxStacks > 1 ? X.maxStacks : 1, K = h > 1 ? j.statuses.find((B) => B.kind === X.kind) : void 0;
    if (K) {
        let B = Math.min(h, K.stacks + 1);
        if (K.stacks = B, K.remainingRounds = P, K.sourceId = $, K.appliedRound = _.state.round, K.priority = Y, K.tickMpPower = O, X.healingPerRound !== void 0 || ((_u = X.onTick) === null || _u === void 0 ? void 0 : _u.hpCap) !== void 0 || ((_v = X.onTick) === null || _v === void 0 ? void 0 : _v.mpCap) !== void 0 || ((_w = X.onTick) === null || _w === void 0 ? void 0 : _w.mpPower) !== void 0)
            K.tickSkillLevel = J.skillLevel;
        let D = (_x = X.healTaken) !== null && _x !== void 0 ? _x : official_chunk_thhss9s9_js_1.Af, A = (_y = X.healDealt) !== null && _y !== void 0 ? _y : official_chunk_thhss9s9_js_1.Af;
        K.healTaken = D ** B, K.healDealt = A ** B, K.damageTakenPhysical = ((_z = X.damageTakenPhysical) !== null && _z !== void 0 ? _z : official_chunk_thhss9s9_js_1.Af) ** B, K.damageTakenSpell = ((_3 = X.damageTakenSpell) !== null && _3 !== void 0 ? _3 : official_chunk_thhss9s9_js_1.Af) ** B, _.emit({ type: official_chunk_thhss9s9_js_1.mf.StatusApplied, unitId: j.id, statusId: X.id, duration: P });
        return;
    }
    for (let B of j.statuses.filter((D) => D.kind === X.kind && (!X.sourceBound || D.sourceId === $)))
        y0(_, j, B.id, official_chunk_thhss9s9_js_1.if.Replaced, X.sourceBound ? $ : void 0);
    if (j.statuses.push({ ...Y === void 0 ? {} : { priority: Y }, ...O === void 0 ? {} : { tickMpPower: O }, ...X.snapshotModifiers ? { snapshotModifiers: (_8 = X.modifiers) === null || _8 === void 0 ? void 0 : _8.map((B) => Object.fromEntries(Object.entries(B).map(([D, A]) => [D, typeof A === "string" && D !== "teamAura" || typeof A === "number" ? L(A, { ...J, state: _.state }) : d1(A)]))) } : {}, id: X.id, kind: X.kind, remainingRounds: P, sourceId: $, appliedRound: _.state.round, speedMod: L((_10 = X.speedMod) !== null && _10 !== void 0 ? _10 : 0, J), attrMods: G, storedTargetId: V.storedTargetId, ...X.onExpire ? { transitionSkillLevel: J.skillLevel } : {}, ...X.healingPerRound !== void 0 || ((_11 = X.onTick) === null || _11 === void 0 ? void 0 : _11.hpCap) !== void 0 || ((_12 = X.onTick) === null || _12 === void 0 ? void 0 : _12.mpCap) !== void 0 || ((_13 = X.onTick) === null || _13 === void 0 ? void 0 : _13.mpPower) !== void 0 ? { tickSkillLevel: J.skillLevel } : {}, damageTakenPhysical: (_14 = X.damageTakenPhysical) !== null && _14 !== void 0 ? _14 : official_chunk_thhss9s9_js_1.Af, damageTakenSpell: (_15 = X.damageTakenSpell) !== null && _15 !== void 0 ? _15 : official_chunk_thhss9s9_js_1.Af, healTaken: (_16 = X.healTaken) !== null && _16 !== void 0 ? _16 : official_chunk_thhss9s9_js_1.Af, healDealt: (_17 = X.healDealt) !== null && _17 !== void 0 ? _17 : official_chunk_thhss9s9_js_1.Af, stacks: 1 }), G.maxHp)
        j.attrs.maxHp += G.maxHp;
    _.emit({ type: official_chunk_thhss9s9_js_1.mf.StatusApplied, unitId: j.id, statusId: X.id, duration: P });
}
function k5(_, j, q, P, $ = 0) {
    let V = N2(_, P.id);
    if (!V || o5(_, q, V))
        return;
    for (let Z of [...q.statuses].filter((W) => W.kind === P.kind && (!V.sourceBound || W.sourceId === j.id)))
        y0(_, q, Z.id, official_chunk_thhss9s9_js_1.if.Replaced, V.sourceBound ? j.id : void 0);
    let X = { ...d1(P), sourceId: j.id, appliedRound: _.state.round, remainingRounds: Math.max(1, Math.floor(P.remainingRounds + $)) };
    if (q.statuses.push(X), X.attrMods.maxHp)
        q.attrs.maxHp += X.attrMods.maxHp;
    _.emit({ type: official_chunk_thhss9s9_js_1.mf.StatusApplied, unitId: q.id, statusId: X.id, duration: X.remainingRounds });
}
function o5(_, j, q, P) {
    var _a, _g;
    if (((_g = (_a = j.flags.statusImmunityThroughRound) === null || _a === void 0 ? void 0 : _a[q.kind]) !== null && _g !== void 0 ? _g : -1) >= _.state.round)
        return !0;
    let $ = Z0(_.skills, j);
    if (q.category === official_chunk_thhss9s9_js_1.df.Buff && $.some((V) => { var _a; return (_a = V.innate) === null || _a === void 0 ? void 0 : _a.rejectBuffs; }))
        return !0;
    return !q.blocksRevive && q.dispellable !== !1 && $.some((V) => {
        var _a, _g;
        if (P && Y0(_, P).some((Z) => { var _a; return ((_a = Z.bypassImmunity) === null || _a === void 0 ? void 0 : _a.statusKinds.includes(q.kind)) && Z.bypassImmunity.passiveIds.includes(V.id); }))
            return !1;
        let X = V.innate;
        return ((_a = X === null || X === void 0 ? void 0 : X.immuneStatusKinds) === null || _a === void 0 ? void 0 : _a.includes(q.kind)) || Boolean(q.category && ((_g = X === null || X === void 0 ? void 0 : X.immuneStatusCategories) === null || _g === void 0 ? void 0 : _g.includes(q.category)));
    });
}
var _7 = new Set([official_chunk_thhss9s9_js_1._e.Item, official_chunk_thhss9s9_js_1._e.Catch]);
var pj = { [official_chunk_thhss9s9_js_1.lf.InvokeAttackSkills]: (_, j, q, P, $) => { _.invokeAttackSkills(j, q, $); }, [official_chunk_thhss9s9_js_1.lf.Repeat]: (_, j, q, P, $, V) => {
        let X = P.min + Math.floor(_.rng.next() * (P.max - P.min + 1));
        for (let Z = 0; Z < X && S(j) && !_.state.result; Z++)
            x5(_, j, q, P.effects, $, V, !0);
    }, [official_chunk_thhss9s9_js_1.lf.ModifyFact]: (_, j, q, P, $, V) => { var _a; ((_a = j.combatFacts) !== null && _a !== void 0 ? _a : (j.combatFacts = {}))[P.key] = L(P.value, { ...V, state: _.state }); }, [official_chunk_thhss9s9_js_1.lf.ModifyStatusDuration]: (_, j, q, P, $, V) => {
        for (let X of $) {
            let Z = X.statuses.filter((W) => { var _a, _g; let Q = _.statusDefs.get(W.id); return (!P.ownedOnly || W.sourceId === j.id) && (((_a = P.kinds) === null || _a === void 0 ? void 0 : _a.includes(W.kind)) || (Q === null || Q === void 0 ? void 0 : Q.dispellable) !== !1 && (Q === null || Q === void 0 ? void 0 : Q.category) && ((_g = P.categories) === null || _g === void 0 ? void 0 : _g.includes(Q.category))); });
            if (P.random)
                for (let W = Z.length - 1; W > 0; W--) {
                    let Q = Math.floor(_.rng.next() * (W + 1));
                    [Z[W], Z[Q]] = [Z[Q], Z[W]];
                }
            for (let W of Z.slice(0, P.maxCount))
                if (W.remainingRounds += Math.floor(L(P.amount, { ...V, target: X, state: _.state })), W.remainingRounds <= 0)
                    y0(_, X, W.id, official_chunk_thhss9s9_js_1.if.Consumed, W.sourceId);
        }
    }, [official_chunk_thhss9s9_js_1.lf.ModifyCooldown]: (_, j, q, P, $, V) => {
        var _a;
        let X = (_a = j.cooldowns) === null || _a === void 0 ? void 0 : _a[P.skillId];
        if (X !== void 0 && X > _.state.round)
            j.cooldowns[P.skillId] = Math.max(_.state.round, X + Math.floor(L(P.amount, { ...V, state: _.state })));
    }, [official_chunk_thhss9s9_js_1.lf.LoseHp]: (_, j, q, P, $, V) => {
        for (let X of $)
            R1(_, j, X, Math.max(0, Math.floor(L(P.power, { ...V, target: X }))), official_chunk_thhss9s9_js_1.Ye.Fixed, !0, official_chunk_thhss9s9_js_1.Ze.Status);
    }, [official_chunk_thhss9s9_js_1.lf.RandomBranch]: kj, [official_chunk_thhss9s9_js_1.lf.SkipNextAction]: (_, j) => { j.flags.skipNextAction = !0; }, [official_chunk_thhss9s9_js_1.lf.ApplyStatus]: uj, [official_chunk_thhss9s9_js_1.lf.RemoveStatus]: lj, [official_chunk_thhss9s9_js_1.lf.CopyStatus]: xj, [official_chunk_thhss9s9_js_1.lf.EmitMechanic]: (_, j, q, P, $) => { var _a; _.emit({ type: official_chunk_thhss9s9_js_1.mf.MechanicTriggered, mechanicId: P.mechanicId, name: P.name, sourceId: j.id, targetId: (_a = $[0]) === null || _a === void 0 ? void 0 : _a.id }); }, [official_chunk_thhss9s9_js_1.lf.Dispel]: nj, [official_chunk_thhss9s9_js_1.lf.Heal]: (_, j, q, P, $, V) => {
        for (let X of $)
            C_(_, j, X, L(P.power, { ...V, target: X }), P.healMaxHp, P.fixedBase, P.includeHealPower);
    }, [official_chunk_thhss9s9_js_1.lf.RestoreHp]: oj, [official_chunk_thhss9s9_js_1.lf.RestoreMp]: aj, [official_chunk_thhss9s9_js_1.lf.Revive]: ij, [official_chunk_thhss9s9_js_1.lf.DamageMp]: (_, j, q, P, $, V) => {
        let X = L(P.power, V);
        for (let Z of $)
            M2(_, j, Z, X);
    }, [official_chunk_thhss9s9_js_1.lf.Wound]: (_, j, q, P, $, V) => {
        let X = L(P.power, V);
        for (let Z of $)
            b2(_, j, Z, X);
    }, [official_chunk_thhss9s9_js_1.lf.RemoveWound]: (_, j, q, P, $, V) => {
        var _a, _g;
        for (let X of $) {
            let Z = Math.max(0, L(P.power, { ...V, target: X })), W = _.hooks.emit("onWoundCalc", { source: j, target: X, wound: Z, skillId: (_a = _.currentAction) === null || _a === void 0 ? void 0 : _a.skillId });
            F_(_, j, X, -Math.max(0, Math.floor((_g = W.wound) !== null && _g !== void 0 ? _g : Z)));
        }
    }, [official_chunk_thhss9s9_js_1.lf.ApplyBarrier]: (_, j, q, P, $, V) => {
        var _a, _g;
        for (let X of $)
            J2(_, j, X, { id: P.id, kind: P.kind, name: P.name, amount: (_g = _.hooks.emit("onBarrierCalc", { origin: _.suppressHooks > 0 ? official_chunk_thhss9s9_js_1.Ze.HookDerived : official_chunk_thhss9s9_js_1.Ze.ActionDirect, source: j, target: X, barrier: L(P.power, { ...V, target: X }), skillId: (_a = _.currentAction) === null || _a === void 0 ? void 0 : _a.skillId }).barrier) !== null && _g !== void 0 ? _g : 0, duration: L(P.duration, { ...V, target: X }), untilBattleEnd: P.untilBattleEnd, stack: P.stack, maxAmount: P.maxPower === void 0 ? void 0 : L(P.maxPower, { ...V, target: X }), decayPerRound: P.decayPerRound });
    }, [official_chunk_thhss9s9_js_1.lf.PhysicalHit]: L2, [official_chunk_thhss9s9_js_1.lf.SpellHit]: L2, [official_chunk_thhss9s9_js_1.lf.FixedHit]: L2, [official_chunk_thhss9s9_js_1.lf.ModifyStrike]: () => { return; }, [official_chunk_thhss9s9_js_1.lf.ModifyDefenseIgnore]: () => { return; }, [official_chunk_thhss9s9_js_1.lf.ModifyHeal]: () => { return; }, [official_chunk_thhss9s9_js_1.lf.ModifyBarrier]: () => { return; }, [official_chunk_thhss9s9_js_1.lf.ModifyWound]: () => { return; }, [official_chunk_thhss9s9_js_1.lf.SetCrit]: () => { return; }, [official_chunk_thhss9s9_js_1.lf.ModifyResource]: fj, [official_chunk_thhss9s9_js_1.lf.ModifyChance]: () => { return; }, [official_chunk_thhss9s9_js_1.lf.ClearSkipNextAction]: (_, j) => { j.flags.skipNextAction = !1; } };
function kj(_, j, q, P, $, V) { var _a; let X = Math.min(1, Math.max(0, L(P.chance, V))), Z = _.rng.chance(X); _.emit({ type: official_chunk_thhss9s9_js_1.mf.ChanceResolved, branchId: P.branchId, sourceId: j.id, targetId: (_a = $[0]) === null || _a === void 0 ? void 0 : _a.id, chance: X, success: Z }); let W = Z ? P.successEffects : P.failureEffects; x5(_, j, q, W, $, V); }
function x5(_, j, q, P, $, V, X = !1) {
    var _a, _g;
    for (let Z of P) {
        if (X && (!S(j) || _.state.result))
            break;
        let W = Z.targeting ? A_(_, j, { ...q, targeting: Z.targeting }, $.map((Y) => Y.id)) : $, Q = Z.when ? W.filter((Y) => Q1(_, Z.when, { source: j, target: Y, skill: q, skillId: q.id })) : W;
        if (W.length > 0 && Q.length === 0)
            continue;
        let J = { ...V, target: (_a = Q[0]) !== null && _a !== void 0 ? _a : V.target, targetStatusStacks: p1(_, Z.when, (_g = Q[0]) !== null && _g !== void 0 ? _g : V.target) };
        K2(_, j, q, Z, Q, J);
    }
}
function oj(_, j, q, P, $, V) {
    var _a, _g;
    let X = Q0(0, Math.floor(L(P.power, V))), Z = _.currentAction, W = `${j.id}:${q.id}`;
    if (P.maxGainPerAction !== void 0 && Z) {
        let Q = Q0(0, Math.floor(L(P.maxGainPerAction, V)));
        X = Math.min(X, Math.max(0, Q - ((_a = Z.hpRestoreGains[W]) !== null && _a !== void 0 ? _a : 0)));
    }
    for (let Q of $) {
        let J = g5(_, j, Q, X, { revive: P.revive, allowFatal: P.allowFatal, clearStatuses: P.clearStatuses });
        if (Z && J > 0)
            Z.hpRestoreGains[W] = ((_g = Z.hpRestoreGains[W]) !== null && _g !== void 0 ? _g : 0) + J;
    }
}
function K2(_, j, q, P, $, V) {
    var _a, _g, _h;
    if (V = { ...V, state: _.state, allyPetSkillUnused: ((_a = _.currentAction) === null || _a === void 0 ? void 0 : _a.sourceId) === j.id ? _.currentAction.allyPetSkillUnused : !1, normalTargetIds: (_g = _.currentAction) === null || _g === void 0 ? void 0 : _g.normalTargetIds, killedTargetIds: (_h = _.currentAction) === null || _h === void 0 ? void 0 : _h.killedTargetIds }, P.type !== official_chunk_thhss9s9_js_1.lf.SkipNextAction && P.type !== official_chunk_thhss9s9_js_1.lf.RandomBranch && P.type !== official_chunk_thhss9s9_js_1.lf.Repeat && P.type !== official_chunk_thhss9s9_js_1.lf.InvokeAttackSkills && P.type !== official_chunk_thhss9s9_js_1.lf.ApplyStatus && P.type !== official_chunk_thhss9s9_js_1.lf.RemoveStatus && P.type !== official_chunk_thhss9s9_js_1.lf.CopyStatus && P.type !== official_chunk_thhss9s9_js_1.lf.EmitMechanic && P.type !== official_chunk_thhss9s9_js_1.lf.Dispel && P.type !== official_chunk_thhss9s9_js_1.lf.ModifyStrike && P.type !== official_chunk_thhss9s9_js_1.lf.ModifyDefenseIgnore && P.type !== official_chunk_thhss9s9_js_1.lf.ModifyHeal && P.type !== official_chunk_thhss9s9_js_1.lf.SetCrit && P.type !== official_chunk_thhss9s9_js_1.lf.ModifyResource && P.type !== official_chunk_thhss9s9_js_1.lf.ModifyFact && P.type !== official_chunk_thhss9s9_js_1.lf.ModifyChance && P.type !== official_chunk_thhss9s9_js_1.lf.ClearSkipNextAction) {
        if ($.length === 0) {
            _.emit({ type: official_chunk_thhss9s9_js_1.mf.ActionFailed, unitId: j.id, reason: official_chunk_thhss9s9_js_1.hf.NoTarget });
            return;
        }
    }
    let X = pj[P.type];
    X(_, j, q, P, $, V);
}
function f5(_, j) { return _.statuses.filter((q) => { var _a, _g; return ((_a = j.statusIds) === null || _a === void 0 ? void 0 : _a.includes(q.id)) || ((_g = j.kinds) === null || _g === void 0 ? void 0 : _g.includes(q.kind)); }).sort((q, P) => q.appliedRound - P.appliedRound || q.id.localeCompare(P.id)); }
function lj(_, j, q, P, $, V) {
    for (let X of $) {
        let Z = P.maxCount === void 0 ? Number.POSITIVE_INFINITY : Math.max(0, Math.floor(L(P.maxCount, { ...V, target: X })));
        for (let W of f5(X, P).filter((Q) => !P.ownedOnly || Q.sourceId === j.id).slice(0, Z))
            y0(_, X, W.id, official_chunk_thhss9s9_js_1.if.Consumed, P.ownedOnly ? j.id : void 0);
    }
}
function xj(_, j, q, P, $, V) {
    var _a, _g;
    let X = (_a = _.currentAction) === null || _a === void 0 ? void 0 : _a.primaryTargetId, Z = X ? _.state.units.find((Y) => Y.id === X) : void 0;
    if (!Z)
        return;
    let W = P.maxCount === void 0 ? Number.POSITIVE_INFINITY : Math.max(0, Math.floor(L(P.maxCount, V))), Q = f5(Z, P).slice(0, W), J = Math.floor(L((_g = P.durationAdd) !== null && _g !== void 0 ? _g : 0, V));
    for (let Y of $) {
        if (Y.id === Z.id)
            continue;
        for (let O of Q)
            k5(_, j, Y, O, J);
    }
}
function fj(_, j, q, P, $, V) {
    var _a, _g, _h;
    let X = P.affectTarget ? $[0] : j;
    if (!X)
        return;
    let Z = l0(X, P.resourceId);
    if (!Z)
        return;
    let W = Z.current, Q = Math.floor(L(P.amount, V)), J = _.currentAction, Y = `${X.id}:${Z.id}`;
    if (P.mode !== "set" && Q > 0 && P.maxGainPerAction !== void 0 && J) {
        let G = Math.max(0, Math.floor(L(P.maxGainPerAction, V)));
        Q = Math.min(Q, Math.max(0, G - ((_a = J.resourceGains[Y]) !== null && _a !== void 0 ? _a : 0)));
    }
    let O = P.mode === "set" ? Q : W + Q;
    if (Z.current = Math.min((_g = Z.max) !== null && _g !== void 0 ? _g : Number.MAX_SAFE_INTEGER, Math.max(0, O)), Z.current === W)
        return;
    if (P.mode !== "set" && Z.current > W && J)
        J.resourceGains[Y] = ((_h = J.resourceGains[Y]) !== null && _h !== void 0 ? _h : 0) + Z.current - W;
    _.emit({ type: official_chunk_thhss9s9_js_1.mf.ResourceChanged, sourceId: j.id, unitId: X.id, resourceId: Z.id, before: W, after: Z.current });
}
function uj(_, j, q, P, $, V) {
    var _a, _g, _h, _k, _l, _m, _o;
    let X = P.self ? [j] : $, Z = B0(1, L(P.duration, V));
    for (let W of X) {
        if ((W.flags.downed || W.flags.dead) && !((_g = (_a = P.targeting) === null || _a === void 0 ? void 0 : _a.includeDowned) !== null && _g !== void 0 ? _g : q.targeting.includeDowned))
            continue;
        let Q = Y0(_, j, { target: W, skill: q, skillId: q.id }), J = Q.reduce((h, K) => { var _a; return h + (((_a = K.statusDurationAdd) === null || _a === void 0 ? void 0 : _a.statusId) === P.statusId ? L(K.statusDurationAdd.amount, { ...V, target: W, state: _.state }) : 0); }, 0), Y = _.statusDefs.get(P.statusId), O = ((_h = _.currentAction) === null || _h === void 0 ? void 0 : _h.sourceId) === j.id ? (_k = j.skillOverrides[_.currentAction.skillId]) !== null && _k !== void 0 ? _k : _.skills.get(_.currentAction.skillId) : void 0;
        if (j.side !== W.side && (Y === null || Y === void 0 ? void 0 : Y.category) && Y.category !== official_chunk_thhss9s9_js_1.df.Buff && ((O !== null && O !== void 0 ? O : q).tags.includes("spell") || (O !== null && O !== void 0 ? O : q).tags.includes("seal"))) {
            let h = Math.min(0.25, W.passives.reduce((K, B) => { var _a, _g, _h, _k; return K + ((_k = (_h = (_g = ((_a = W.skillOverrides[B]) !== null && _a !== void 0 ? _a : _.skills.get(B))) === null || _g === void 0 ? void 0 : _g.innate) === null || _h === void 0 ? void 0 : _h.negativeSpellResistance) !== null && _k !== void 0 ? _k : 0); }, 0));
            if (h > 0 && _.rng.chance(h)) {
                _.emit({ type: official_chunk_thhss9s9_js_1.mf.Miss, sourceId: j.id, targetId: W.id, kind: official_chunk_thhss9s9_js_1.jf.Seal });
                continue;
            }
        }
        if (((_l = P.hit) !== null && _l !== void 0 ? _l : official_chunk_thhss9s9_js_1.jf.Always) === official_chunk_thhss9s9_js_1.jf.Seal) {
            let h = Y0(_, W, { target: j, skill: q, skillId: q.id }), K = a(Q, "sealChanceAdd", j, W, q, _) - a(h, "sealResistanceAdd", W, j, q, _), B = _.rules.formulas.sealHitChance({ ...j, attrs: N0(j) }, { ...W, attrs: N0(W) }, V.skillLevel, q.sealBase, K), D = Q.reduce((w, k) => { var _a; return w * L((_a = k.sealChanceFactor) !== null && _a !== void 0 ? _a : 1, V); }, 1), A = w5(_, W, Q.flatMap((w) => { var _a; return (_a = w.ignoreSealStatusKinds) !== null && _a !== void 0 ? _a : []; })), v = Math.min((_m = _.rules.formulas.sealChanceCeil) !== null && _m !== void 0 ? _m : 1, Math.max(0, B * D * A));
            if (W.statuses.some((w) => { var _a; return (_a = _.statusDefs.get(w.id)) === null || _a === void 0 ? void 0 : _a.immuneToSeal; }) || !_.rng.chance(v)) {
                _.emit({ type: official_chunk_thhss9s9_js_1.mf.Miss, sourceId: j.id, targetId: W.id, kind: official_chunk_thhss9s9_js_1.jf.Seal });
                continue;
            }
        }
        h2(_, W, P.statusId, Math.max(1, Math.floor(Z + J)), j.id, { storedTargetId: P.storeTarget ? W.id === j.id ? (_o = V.target) === null || _o === void 0 ? void 0 : _o.id : W.id : void 0, env: { ...V, target: W } });
    }
}
function nj(_, j, q, P, $) {
    var _a, _g, _h, _k, _l, _m;
    var _o;
    let V = $.length ? $ : [j];
    for (let X of V) {
        let Z = (_a = P.categoryPriority) !== null && _a !== void 0 ? _a : [official_chunk_thhss9s9_js_1.df.Control, official_chunk_thhss9s9_js_1.df.Debuff, official_chunk_thhss9s9_js_1.df.Dot, official_chunk_thhss9s9_js_1.df.Buff], W = P.maxCount === void 0 ? Number.POSITIVE_INFINITY : Math.max(0, Math.floor(L(P.maxCount, { skillLevel: 0, targets: 1, source: j, target: X }))), Q = X.statuses.filter((J) => {
            var _a, _g, _h, _k, _l;
            let Y = _.statusDefs.get(J.id);
            if ((Y === null || Y === void 0 ? void 0 : Y.dispellable) === !1)
                return !1;
            if (P.schoolOnly && !(Y === null || Y === void 0 ? void 0 : Y.school))
                return !1;
            if (((_a = P.includeStatusFlags) === null || _a === void 0 ? void 0 : _a.length) && !P.includeStatusFlags.some((O) => Boolean(Y === null || Y === void 0 ? void 0 : Y[O])))
                return !1;
            if ((_g = P.excludeStatusFlags) === null || _g === void 0 ? void 0 : _g.some((O) => Boolean(Y === null || Y === void 0 ? void 0 : Y[O])))
                return !1;
            return ((_h = P.statusIds) === null || _h === void 0 ? void 0 : _h.includes(J.id)) === !0 || ((_k = P.kinds) === null || _k === void 0 ? void 0 : _k.includes(J.kind)) === !0 || (Y === null || Y === void 0 ? void 0 : Y.category) !== void 0 && ((_l = P.categories) === null || _l === void 0 ? void 0 : _l.includes(Y.category)) === !0;
        }).sort((J, Y) => { var _a, _g; let O = (_a = _.statusDefs.get(J.id)) === null || _a === void 0 ? void 0 : _a.category, G = (_g = _.statusDefs.get(Y.id)) === null || _g === void 0 ? void 0 : _g.category, h = O === void 0 ? Z.length : Z.indexOf(O), K = G === void 0 ? Z.length : Z.indexOf(G); return h - K || J.appliedRound - Y.appliedRound || J.id.localeCompare(Y.id); });
        if (P.random)
            for (let J = Q.length - 1; J > 0; J--) {
                let Y = Math.floor(_.rng.next() * (J + 1));
                [Q[J], Q[Y]] = [Q[Y], Q[J]];
            }
        for (let J of Q.slice(0, W)) {
            let Y = (_g = _.statusDefs.get(J.id)) === null || _g === void 0 ? void 0 : _g.dispelClass, O = (_k = (Y ? (_h = P.chanceByClass) === null || _h === void 0 ? void 0 : _h[Y] : void 0)) !== null && _k !== void 0 ? _k : P.chance;
            if (O !== void 0) {
                let G = _.rng.chance(O);
                if (_.emit({ type: official_chunk_thhss9s9_js_1.mf.ChanceResolved, branchId: `${q.id}.dispel.${J.id}`, sourceId: j.id, targetId: X.id, chance: O, success: G }), !G)
                    continue;
            }
            if (y0(_, X, J.id, official_chunk_thhss9s9_js_1.if.Dispel), P.preventReapplyThisRound || P.immunityRounds)
                ((_l = (_o = X.flags).statusImmunityThroughRound) !== null && _l !== void 0 ? _l : (_o.statusImmunityThroughRound = {}))[J.kind] = _.state.round + ((_m = P.immunityRounds) !== null && _m !== void 0 ? _m : 0);
        }
    }
}
function aj(_, j, q, P, $, V) {
    for (let X of $) {
        let Z = Q0(0, Math.floor(L(P.power, { ...V, target: X }))), W = Math.min(X.attrs.maxMp, X.attrs.mp + Z), Q = W - X.attrs.mp;
        if (X.attrs.mp = W, Q > 0)
            _.emit({ type: official_chunk_thhss9s9_js_1.mf.MpRestore, unitId: X.id, amount: Q, mpAfter: X.attrs.mp });
    }
}
function ij(_, j, q, P, $, V) {
    for (let X of $) {
        let Z = P.hpRatio !== void 0 ? X.attrs.maxHp * L(P.hpRatio, { ...V, target: X }) : L(P.hp, { ...V, target: X });
        U2(_, j, X, P.respectHealTaken ? Math.floor(Z) * b_(X) : Z);
    }
}
function L2(_, j, q, P, $, V) {
    var _a, _g, _h, _k, _l, _m, _o, _p, _q;
    let X = Y0(_, j, { skill: q, skillId: q.id }), Z = B0(1, L((_a = P.hits) !== null && _a !== void 0 ? _a : official_chunk_thhss9s9_js_1.zf, V) + (P.type === official_chunk_thhss9s9_js_1.lf.PhysicalHit ? a(X, "physicalHitsAdd", j, $[0], q) : 0)), W = P.coeff, Q = Array.isArray(W) ? W : Array.from({ length: Z }, () => W !== null && W !== void 0 ? W : 1), J = (_g = P.formula) !== null && _g !== void 0 ? _g : q.formula, Y = P.type === official_chunk_thhss9s9_js_1.lf.FixedHit ? !0 : P.trueDamage, G = P.type === official_chunk_thhss9s9_js_1.lf.FixedHit || Y === !0 || J === official_chunk_thhss9s9_js_1.kf.Fixed || J === official_chunk_thhss9s9_js_1.kf.Judge ? official_chunk_thhss9s9_js_1.Ye.Fixed : P.type === official_chunk_thhss9s9_js_1.lf.PhysicalHit ? official_chunk_thhss9s9_js_1.Ye.Physical : official_chunk_thhss9s9_js_1.Ye.Spell;
    for (let h of $) {
        if (((_h = P.when) === null || _h === void 0 ? void 0 : _h.targetSlot) === "primary" && ((_k = _.currentAction) === null || _k === void 0 ? void 0 : _k.primaryTargetId) !== h.id)
            continue;
        for (let K = 0; K < Z; K++) {
            if (!S(j) || !S(h) || _.state.result)
                break;
            G2(_, { percentageDamage: P.type === official_chunk_thhss9s9_js_1.lf.FixedHit ? P.percentageDamage : void 0, source: j, target: h, kind: G, coeff: (_m = (_l = Q[K]) !== null && _l !== void 0 ? _l : Q[Q.length - 1]) !== null && _m !== void 0 ? _m : 1, resultFactor: (_o = P.resultFactors) === null || _o === void 0 ? void 0 : _o[K], critMultiplier: P.type === official_chunk_thhss9s9_js_1.lf.PhysicalHit ? P.critMultiplier : void 0, healInstead: P.type === official_chunk_thhss9s9_js_1.lf.PhysicalHit ? P.healInstead : void 0, mpDamageRatio: P.type === official_chunk_thhss9s9_js_1.lf.PhysicalHit ? P.mpDamageRatio : void 0, defenseSubtract: P.type === official_chunk_thhss9s9_js_1.lf.PhysicalHit ? L(P.defenseSubtract, { ...V, target: h }) : void 0, defendFactor: P.type === official_chunk_thhss9s9_js_1.lf.PhysicalHit ? P.defendFactor : void 0, power: L(P.power, { ...V, target: h }), trueDamage: Y, defenseIgnore: P.type === official_chunk_thhss9s9_js_1.lf.PhysicalHit || P.type === official_chunk_thhss9s9_js_1.lf.SpellHit ? L((_p = P.defenseIgnore) !== null && _p !== void 0 ? _p : 0, V) : 0, cannotMiss: P.type === official_chunk_thhss9s9_js_1.lf.PhysicalHit ? P.cannotMiss : G === official_chunk_thhss9s9_js_1.Ye.Fixed, cannotKill: P.cannotKill, formula: J, skillLevel: V.skillLevel, targetCount: V.targets, schoolTerm: q.schoolTerm, splash: q.splash, skillId: q.id, isPrimary: ((_q = _.currentAction) === null || _q === void 0 ? void 0 : _q.primaryTargetId) === h.id, origin: P.type === official_chunk_thhss9s9_js_1.lf.FixedHit ? P.origin : void 0 });
        }
    }
}
var L$ = 24, K$ = "beast.capture", A$ = { constitution: "体质", strength: "力量", magic: "魔力", endurance: "耐力", agility: "敏捷" }, Mq = zod_3.z.object({ constitution: zod_3.z.number().int().min(0).max(50 + 180 * official_chunk_thhss9s9_js_1.dg.pointsPerLevel), strength: zod_3.z.number().int().min(0).max(50 + 180 * official_chunk_thhss9s9_js_1.dg.pointsPerLevel), magic: zod_3.z.number().int().min(0).max(50 + 180 * official_chunk_thhss9s9_js_1.dg.pointsPerLevel), endurance: zod_3.z.number().int().min(0).max(50 + 180 * official_chunk_thhss9s9_js_1.dg.pointsPerLevel), agility: zod_3.z.number().int().min(0).max(50 + 180 * official_chunk_thhss9s9_js_1.dg.pointsPerLevel) }).strict();
exports.Ac = L$;
exports.Bc = K$;
exports.Cc = A$;
exports.Dc = Mq;
function q3(_) { return official_chunk_thhss9s9_js_1.dg.experience.base + official_chunk_thhss9s9_js_1.dg.experience.perLevel * _ + Math.floor(official_chunk_thhss9s9_js_1.dg.experience.perLevelSquared * _ ** 2); }
function C$(_) { return Math.ceil((_.maxLifespan - _.currentLifespan) / official_chunk_thhss9s9_js_1.dg.lifespan.restRecoveryPerStone); }
function F$(_, j, q) {
    if (!Number.isSafeInteger(j) || j < 0 || !Number.isInteger(q) || q < 0)
        throw Error("灵兽修为输入无效");
    let P = Math.min(180, q);
    if (!j || _.level >= P)
        return _;
    let $ = _.level, V = _.exp + j;
    while ($ < P && V >= q3($))
        V -= q3($), $++;
    return i0.parse({ ..._, level: $, exp: $ === P ? 0 : V, unallocatedPoints: _.unallocatedPoints + H1({ ..._, level: $ }) - H1(_), revision: _.revision + 1 });
}
function m$(_, j, q) {
    let P = Mq.parse(j), $ = Object.values(P).reduce((V, X) => V + X, 0);
    if (_.level > q || $ <= 0 || $ > _.unallocatedPoints)
        throw Error("等级或可分配点数不足");
    return i0.parse({ ..._, allocatedAttributes: Object.fromEntries(Object.entries(P).map(([V, X]) => [V, _.allocatedAttributes[V] + X])), unallocatedPoints: _.unallocatedPoints - $, revision: _.revision + 1 });
}
function C2(_) { return _.skills.filter((j) => { var _a, _g; return !((_g = (_a = official_chunk_thhss9s9_js_1.Zf.find((q) => q.id === j)) === null || _a === void 0 ? void 0 : _a.conflicts) === null || _g === void 0 ? void 0 : _g.some((q) => _.skills.includes(q))) && !official_chunk_thhss9s9_js_1._f.some((q) => j === q.normal && _.skills.includes(q.advanced)); }); }
function bq(_) { let j = official_chunk_thhss9s9_js_1.dg.panel, q = A5(_) + _.level * j.naturalPerLevel; return Object.fromEntries(Object.entries(_.allocatedAttributes).map(([P, $]) => [P, q + $])); }
function Nq(_) {
    let j = i0.parse(_), q = official_chunk_thhss9s9_js_1.dg.panel, P = bq(j), $ = (J, Y, O) => Math.floor(j.level * j.aptitudes[Y] * O.aptitudeCoefficient + J * j.growth * O.attributeCoefficient), V = $(P.constitution, "health", q.health), X = $(P.magic, "mana", q.mana), Z = Object.entries(q.magicDef.attributeCoefficients).reduce((J, [Y, O]) => J + P[Y] * O, 0), W = C2(j).reduce((J, Y) => { let O = official_chunk_thhss9s9_js_1.Xf.find((G) => G.id === Y).effect; return O.type === "speed" ? J * O.factor : J; }, 1), Q = { physicalAtk: 0, physicalDef: 0, magicAtk: 0, dodge: 0 };
    for (let J of C2(j)) {
        let Y = official_chunk_thhss9s9_js_1.Xf.find((O) => O.id === J).effect;
        if (Y.type === "perception" || Y.type === "concentration")
            Q.dodge += Y.dodgeBonus;
        if (Y.type === "strengthTraining")
            Q.physicalAtk += Math.floor(j.level * Y.perLevel);
        if (Y.type === "defenseTraining")
            Q.physicalDef += Math.floor(j.level * Y.perLevel);
        if (Y.type === "constitutionGrowthHp")
            V += Math.floor(P.constitution * j.growth * Y.multiplier);
        if (Y.type === "magicAttributeBoost")
            Q.magicAtk += Math.floor(P.magic * Y.multiplier);
        if (Y.type === "strengthGrowthTradeoff")
            Q.physicalAtk += Math.floor(P.strength * j.growth * Y.attackMultiplier), Q.physicalDef -= Math.floor(P.strength * Y.defenseMultiplier);
    }
    return { ...M_, hit: 80 + P.agility, dodge: Q.dodge, hp: V, maxHp: V, mp: X, maxMp: X, physicalAtk: $(P.strength, "attack", q.physicalAtk) + Q.physicalAtk, physicalDef: Math.max(0, $(P.endurance, "defense", q.physicalDef) + Q.physicalDef), magicAtk: $(P.magic, "mana", q.magicAtk) + Q.magicAtk, magicDef: Math.floor(j.level * j.aptitudes.mana * q.magicDef.aptitudeCoefficient + Z * j.growth), speed: Math.floor($(P.agility, "speed", q.speed) * W) };
}
function Hq(_, j) { return _.currentLifespan >= official_chunk_thhss9s9_js_1.dg.lifespan.deployMinimum && _.level <= j && official_chunk_thhss9s9_js_1.Uf.some((q) => q.id === _.speciesId && q.carryLevel <= j); }
const zod_4 = require("./zod.js");
const zod_5 = require("./zod.js");
var $3 = ["healing", "mana", "detox", "cultivation", "beast_cultivation", "insight", "breakthrough", "tempering", "marrow_wash", "longevity", "hybrid"], V3 = ["none", "long_term", "cultivation", "longevity"];
exports.Ic = $3;
exports.Jc = V3;
var c$ = ["low", "middle", "high", "perfect"], e$ = ["restore_hp", "heal_wounds", "restore_mp", "detox", "cultivation", "beast_cultivation", "insight", "clear_mind_support", "protect_meridians_support", "breakthrough_support", "extend_lifespan", "body_skin", "body_sinew_bone", "body_organs", "body_qi_blood", "body_primordial_spirit", "marrow_wash"];
exports.Kc = c$;
exports.Lc = e$;
var t$ = ["single", "balanced", "synergy", "conflict"];
exports.Mc = t$;
var _V = ["aligned", "degraded", "poor"];
exports.Nc = _V;
var X3 = ["lock_on_enter_settle_on_exit", "consume_on_action"];
exports.Oc = X3;
var l1 = zod_5.z.number().finite().nonnegative().max(2147483647), Z3 = zod_5.z.enum(["weakness", "minor_wound", "major_wound", "near_death", "breakthrough_focus", "protect_meridians", "clear_mind", "cultivation_boost"]), hq = zod_5.z.discriminatedUnion("type", [zod_5.z.object({ type: zod_5.z.literal("restore_resource"), resource: zod_5.z.enum(["hp", "mp"]), mode: zod_5.z.enum(["flat", "percent"]), value: l1 }).refine((_) => _.mode !== "percent" || _.value <= 1), zod_5.z.object({ type: zod_5.z.literal("change_gauge"), gauge: zod_5.z.literal("pillToxicity"), delta: zod_5.z.number().finite().min(-2147483647).max(2147483647) }), zod_5.z.object({ type: zod_5.z.literal("remove_status"), status: Z3, removeAll: zod_5.z.boolean().optional() }), zod_5.z.object({ type: zod_5.z.literal("add_status"), status: Z3, stacks: zod_5.z.number().int().positive().optional(), duration: zod_5.z.union([zod_5.z.object({ kind: zod_5.z.literal("until_removed") }), zod_5.z.object({ kind: zod_5.z.literal("time"), expiresAt: zod_5.z.iso.datetime({ offset: !0 }) })]).optional(), usesRemaining: zod_5.z.number().int().nonnegative().optional(), payload: zod_5.z.record(zod_5.z.string(), zod_5.z.union([zod_5.z.string(), zod_5.z.number().finite(), zod_5.z.boolean()])).optional() }), zod_5.z.object({ type: zod_5.z.literal("advance_track"), track: zod_5.z.enum(["body.skin", "body.sinew_bone", "body.organs", "body.qi_blood", "body.primordial_spirit", "tempering.vitality", "tempering.spirit", "tempering.wisdom", "tempering.speed", "tempering.willpower", "marrow_wash"]), value: l1 }), zod_5.z.object({ type: zod_5.z.literal("gain_progress"), target: zod_5.z.enum(["cultivation_exp", "comprehension_insight"]), value: l1 }), zod_5.z.object({ type: zod_5.z.literal("increase_lifespan"), value: l1 }), zod_5.z.object({ type: zod_5.z.literal("gain_beast_cultivation"), value: l1 })]), W3 = { family: zod_5.z.enum($3), operations: zod_5.z.array(hq).min(1).max(30), consumeRules: zod_5.z.object({ scene: zod_5.z.literal("out_of_battle_only"), quotaCategory: zod_5.z.enum(V3) }) }, Dq = zod_5.z.discriminatedUnion("kind", [zod_5.z.object({ kind: zod_5.z.literal("pill"), ...W3, alchemyMeta: zod_5.z.object({ source: zod_5.z.enum(["improvised", "formula"]), sourceMaterials: zod_5.z.array(zod_5.z.string()), stability: zod_5.z.number().finite(), toxicityRating: zod_5.z.number().finite(), tags: zod_5.z.array(zod_5.z.string()) }).passthrough() }), zod_5.z.object({ kind: zod_5.z.literal("spirit_fruit"), ...W3, source: zod_5.z.object({ kind: zod_5.z.literal("spirit_field"), version: zod_5.z.literal(1) }) }), zod_5.z.object({ kind: zod_5.z.literal("talisman"), scenario: zod_5.z.string().min(1), sessionMode: zod_5.z.enum(X3), notes: zod_5.z.string().optional() })]);
function Q3(_) { return Dq.parse(_); }
function Lq(_) { return !!_ && typeof _ === "object" && !Array.isArray(_); }
function XV(_) { return !!_ && _.kind === "pill"; }
function Kq(_) { return !!_ && _.kind === "talisman"; }
function B1(_) { return !!_ && Kq(_.spec); }
function Y3(_) { return Q3(_); }
function F2(_) {
    if (Array.isArray(_))
        return _.map(F2);
    if (Lq(_))
        return Object.keys(_).sort().reduce((j, q) => { return j[q] = F2(_[q]), j; }, {});
    return _;
}
function ZV(_) { return JSON.stringify(F2(_)); }
var O3 = { id: "consumable.v1", name: "消耗品", kind: "consumable", stackLimit: 999 }, C1 = zod_4.z.object({ name: zod_4.z.string().min(1), type: zod_4.z.enum(official_chunk_thhss9s9_js_1.Ff), quality: zod_4.z.enum(official_chunk_thhss9s9_js_1.Lf), description: zod_4.z.string().default(""), prompt: zod_4.z.string().default(""), score: zod_4.z.number().finite().default(0), spec: zod_4.z.unknown().transform((_, j) => {
        try {
            return Y3(_);
        }
        catch (_a) {
            return j.addIssue({ code: "custom", message: "消耗品药效协议无效" }), zod_4.z.NEVER;
        }
    }) }).strict();
exports.yd = C1;
function OV(_) { var _a, _g, _h, _k; return C1.parse({ name: _.name, type: _.type, quality: (_a = _.quality) !== null && _a !== void 0 ? _a : "凡品", description: (_g = _.description) !== null && _g !== void 0 ? _g : "", prompt: (_h = _.prompt) !== null && _h !== void 0 ? _h : "", score: (_k = _.score) !== null && _k !== void 0 ? _k : 0, spec: _.spec }); }
const zod_6 = require("./zod.js");
var Aq = ["ore", "tcdb", "aux", "monster"], R3 = { herb: "草药", ore: "矿石", tcdb: "天材地宝", aux: "辅助材料", monster: "妖兽材料", gongfa_manual: "功法典籍", skill_manual: "神通秘术" }, Cq = ["herb", ...Aq, "gongfa_manual", "skill_manual"], B3 = { id: "material.v1", name: "材料", kind: "material", stackLimit: 999 }, x1 = zod_6.z.object({ name: zod_6.z.string().trim().min(1).max(100), type: zod_6.z.enum(Cq), rank: zod_6.z.enum(official_chunk_thhss9s9_js_1.Lf), element: zod_6.z.enum(official_chunk_thhss9s9_js_1.Df).nullable().default(null), description: zod_6.z.string().max(4000).default("") }).strict();
exports.Ad = Aq;
exports.Bd = R3;
exports.Cd = Cq;
exports.Dd = B3;
exports.Ed = x1;
const zod_7 = require("./zod.js");
var H = { MATERIAL: { ROOT: "Material", TYPE: "Material.Type", TYPE_SEED: "Material.Type.Seed", TYPE_HERB: "Material.Type.Herb", TYPE_ORE: "Material.Type.Ore", TYPE_MONSTER: "Material.Type.Monster", TYPE_MANUAL: "Material.Type.Manual", TYPE_GONGFA_MANUAL: "Material.Type.Manual.GongFa", TYPE_SKILL_MANUAL: "Material.Type.Manual.Skill", TYPE_SPECIAL: "Material.Type.Special", TYPE_AUXILIARY: "Material.Type.Auxiliary", QUALITY: "Material.Quality", ELEMENT: "Material.Element", SEMANTIC: "Material.Semantic", SEMANTIC_FLAME: "Material.Semantic.Flame", SEMANTIC_FREEZE: "Material.Semantic.Freeze", SEMANTIC_THUNDER: "Material.Semantic.Thunder", SEMANTIC_WIND: "Material.Semantic.Wind", SEMANTIC_BLADE: "Material.Semantic.Blade", SEMANTIC_GUARD: "Material.Semantic.Guard", SEMANTIC_BURST: "Material.Semantic.Burst", SEMANTIC_SUSTAIN: "Material.Semantic.Sustain", SEMANTIC_MANUAL: "Material.Semantic.Manual", SEMANTIC_SPIRIT: "Material.Semantic.Spirit", SEMANTIC_EARTH: "Material.Semantic.Earth", SEMANTIC_METAL: "Material.Semantic.Metal", SEMANTIC_WATER: "Material.Semantic.Water", SEMANTIC_WOOD: "Material.Semantic.Wood", SEMANTIC_POISON: "Material.Semantic.Poison", SEMANTIC_DIVINE: "Material.Semantic.Divine", SEMANTIC_SPACE: "Material.Semantic.Space", SEMANTIC_TIME: "Material.Semantic.Time", SEMANTIC_LIFE: "Material.Semantic.Life", SEMANTIC_ALCHEMY: "Material.Semantic.Alchemy", SEMANTIC_REFINING: "Material.Semantic.Refining", SEMANTIC_BEAST: "Material.Semantic.Beast", SEMANTIC_BLOOD: "Material.Semantic.Blood", SEMANTIC_BONE: "Material.Semantic.Bone", SEMANTIC_FORMATION: "Material.Semantic.Formation", SEMANTIC_ILLUSION: "Material.Semantic.Illusion", SEMANTIC_QI: "Material.Semantic.Qi", RECIPE: "Material.Recipe" }, INTENT: { ROOT: "Intent", PRODUCT: "Intent.Product", PRODUCT_SKILL: "Intent.Product.Skill", PRODUCT_ARTIFACT: "Intent.Product.Artifact", PRODUCT_GONGFA: "Intent.Product.GongFa", OUTCOME: "Intent.Outcome", OUTCOME_ACTIVE: "Intent.Outcome.ActiveSkill", OUTCOME_PASSIVE: "Intent.Outcome.PassiveAbility" }, RECIPE: { ROOT: "Recipe", PRODUCT_BIAS: "Recipe.ProductBias", PRODUCT_BIAS_SKILL: "Recipe.ProductBias.Skill", PRODUCT_BIAS_ARTIFACT: "Recipe.ProductBias.Artifact", PRODUCT_BIAS_GONGFA: "Recipe.ProductBias.GongFa", PRODUCT_BIAS_UTILITY: "Recipe.ProductBias.Utility", INTENT: "Recipe.Intent", MATCHED: "Recipe.Matched", GATED: "Recipe.Gated", UNLOCKED: "Recipe.Unlocked" }, ENERGY: { ROOT: "Energy", BASE: "Energy.Base", BONUS: "Energy.Bonus", RESERVED: "Energy.Reserved" }, AFFIX: { ROOT: "Affix", PREFIX: "Affix.Prefix", SUFFIX: "Affix.Suffix", CORE: "Affix.Core", SIGNATURE: "Affix.Signature", RESONANCE: "Affix.Resonance", SYNERGY: "Affix.Synergy", MYTHIC: "Affix.Mythic" }, OUTCOME: { ROOT: "Outcome", ACTIVE_SKILL: "Outcome.ActiveSkill", PASSIVE_ABILITY: "Outcome.PassiveAbility", ARTIFACT: "Outcome.Artifact", GONGFA: "Outcome.GongFa" } }, m2 = [H.MATERIAL.SEMANTIC_FLAME, H.MATERIAL.SEMANTIC_FREEZE, H.MATERIAL.SEMANTIC_THUNDER, H.MATERIAL.SEMANTIC_WIND, H.MATERIAL.SEMANTIC_BLADE, H.MATERIAL.SEMANTIC_GUARD, H.MATERIAL.SEMANTIC_BURST, H.MATERIAL.SEMANTIC_SUSTAIN, H.MATERIAL.SEMANTIC_MANUAL, H.MATERIAL.SEMANTIC_SPIRIT, H.MATERIAL.SEMANTIC_EARTH, H.MATERIAL.SEMANTIC_METAL, H.MATERIAL.SEMANTIC_WATER, H.MATERIAL.SEMANTIC_WOOD, H.MATERIAL.SEMANTIC_POISON, H.MATERIAL.SEMANTIC_DIVINE, H.MATERIAL.SEMANTIC_SPACE, H.MATERIAL.SEMANTIC_TIME, H.MATERIAL.SEMANTIC_LIFE, H.MATERIAL.SEMANTIC_ALCHEMY, H.MATERIAL.SEMANTIC_REFINING, H.MATERIAL.SEMANTIC_BEAST, H.MATERIAL.SEMANTIC_BLOOD, H.MATERIAL.SEMANTIC_BONE, H.MATERIAL.SEMANTIC_FORMATION, H.MATERIAL.SEMANTIC_ILLUSION, H.MATERIAL.SEMANTIC_QI];
var C0 = { UNIT: { ROOT: "Unit", TYPE: { ROOT: "Unit.Type", PLAYER: "Unit.Type.Player", ENEMY: "Unit.Type.Enemy", COMBATANT: "Unit.Type.Combatant" } }, STATUS: { ROOT: "Status", IMMUNE: { ROOT: "Status.Immune", CONTROL: "Status.Immune.Control", DEBUFF: "Status.Immune.Debuff", FIRE: "Status.Immune.Fire" }, STATE: { POISONED: "Status.Poisoned", BURNED: "Status.Burned", FROZEN: "Status.Frozen", BLEEDING: "Status.Bleeding", CHILLED: "Status.Chilled", SHOCKED: "Status.Shocked", BODY_ORGANS_SKILL_REFUNDED: "Status.BodyCultivation.OrgansSkillRefunded" }, SECT: { ROOT: "Status.Sect", state: (_, j) => `Status.Sect.${_}.${j}` }, CATEGORY: { BUFF: "Status.Buff", DEBUFF: "Status.Debuff", DOT: "Status.DOT", DEF_DEBUFF: "Status.DefDebuff", MYTHIC: "Status.Mythic", COMBO: "Status.Combo", MANA_EFF: "Status.ManaEff" }, CONTROL: { ROOT: "Status.Control", STUNNED: "Status.Control.Stunned", NO_ACTION: "Status.Control.NoAction", NO_SKILL: "Status.Control.NoSkill", NO_BASIC: "Status.Control.NoBasic" } }, ABILITY: { ROOT: "Ability", FUNCTION: { ROOT: "Ability.Function", DAMAGE: "Ability.Function.Damage", CONTROL: "Ability.Function.Control", HEAL: "Ability.Function.Heal", BUFF: "Ability.Function.Buff", DEBUFF: "Ability.Function.Debuff" }, CHANNEL: { ROOT: "Ability.Channel", MAGIC: "Ability.Channel.Magic", PHYSICAL: "Ability.Channel.Physical", TRUE: "Ability.Channel.True" }, MECHANIC: { ROOT: "Ability.Mechanic", IGNORE_SPIRITUAL_ROOT_MISMATCH: "Ability.Mechanic.IgnoreSpiritualRootMismatch" }, KIND: { ROOT: "Ability.Kind", SKILL: "Ability.Kind.Skill", PASSIVE: "Ability.Kind.Passive", ARTIFACT: "Ability.Kind.Artifact", GONGFA: "Ability.Kind.GongFa", SECT: "Ability.Kind.Sect", BASIC: "Ability.Kind.Basic" }, SECT: { ROOT: "Ability.Sect", namespace: (_) => `Ability.Sect.${_}`, path: (_, j) => `Ability.Sect.${_}.Path.${j}`, ability: (_, j) => `Ability.Sect.${_}.Ability.${j}`, mechanic: (_, j) => `Ability.Sect.${_}.Mechanic.${j}`, GENERATOR: "Ability.Sect.Role.Generator", COMBO: "Ability.Sect.Role.Combo", FINISHER: "Ability.Sect.Role.Finisher", DEFENSIVE: "Ability.Sect.Role.Defensive", UTILITY: "Ability.Sect.Role.Utility" }, ELEMENT: { ROOT: "Ability.Element", FIRE: "Ability.Element.Fire", WATER: "Ability.Element.Water", WOOD: "Ability.Element.Wood", EARTH: "Ability.Element.Earth", METAL: "Ability.Element.Metal", WIND: "Ability.Element.Wind", ICE: "Ability.Element.Ice", THUNDER: "Ability.Element.Thunder" }, TARGET: { ROOT: "Ability.Target", SINGLE: "Ability.Target.Single", AOE: "Ability.Target.AoE" } }, BUFF: { ROOT: "Buff", TYPE: { ROOT: "Buff.Type", BUFF: "Buff.Type.Buff", DEBUFF: "Buff.Type.Debuff", CONTROL: "Buff.Type.Control" }, DOT: { ROOT: "Buff.Dot", POISON: "Buff.Dot.Poison", BURN: "Buff.Dot.Burn", FREEZE: "Buff.Dot.Freeze", BLEED: "Buff.Dot.Bleed" }, ELEMENT: { ROOT: "Buff.Element", FIRE: "Buff.Element.Fire", WATER: "Buff.Element.Water", WOOD: "Buff.Element.Wood", EARTH: "Buff.Element.Earth", METAL: "Buff.Element.Metal", WIND: "Buff.Element.Wind", ICE: "Buff.Element.Ice", THUNDER: "Buff.Element.Thunder", POISON: "Buff.Element.Poison" }, SECT: { ROOT: "Buff.Sect", namespace: (_, j) => `Buff.Sect.${_}.${j}` } }, TRAIT: { ROOT: "Trait", EXECUTE: "Trait.Execute", REFLECT: "Trait.Reflect", LIFESTEAL: "Trait.Lifesteal", MANA_THIEF: "Trait.ManaThief", SHIELD_MASTER: "Trait.Shield", BERSERKER: "Trait.Berserker", COOLDOWN: "Trait.Cooldown" }, CONDITION: { ROOT: "Condition", LOW_HP: "Condition.LowHP", HIGH_HP: "Condition.HighHP", CRIT_READY: "Condition.CritReady", TARGET: { ROOT: "Condition.Target", LOW_HP: "Condition.Target.LowHP" }, CASTER: { ROOT: "Condition.Caster", LOW_HP: "Condition.Caster.LowHP" } }, EVENT: { ACTION_PRE: "ActionPreEvent", ACTION_POST: "ActionPostEvent", DAMAGE_TAKEN: "DamageSegmentAppliedEvent", DAMAGE_REQUEST: "DamageSegmentRequestedEvent", DAMAGE: "DamageSegmentRequestedEvent", SHIELD_BREAK: "ShieldBreakEvent", ROUND_PRE: "RoundPreEvent", ROUND_POST: "RoundPostEvent", ROUND_START: "RoundStartEvent", SKILL_PRE_CAST: "SkillPreCastEvent", SKILL_CAST: "SkillCastEvent", HIT_CHECK: "HitCheckEvent", DODGE: "DodgeEvent", BUFF_ADD: "BuffAddEvent", BUFF_APPLIED: "BuffAppliedEvent", BUFF_REMOVED: "BuffRemovedEvent", BUFF_IMMUNE: "BuffImmuneEvent", BUFF_LAYER_CHANGED: "BuffLayerChangedEvent", CONTROL_RESIST: "ControlResistEvent", DEATH_PREVENT: "DeathPreventEvent", CONTROLLED_SKIP: "ControlledSkipEvent", COMBAT_RESOURCE_CHANGE: "CombatResourceChangeEvent", ABILITY_COST_PAID: "AbilityCostPaidEvent", HP_CHANGED: "HpChangedEvent" }, SCOPE: { OWNER_AS_TARGET: "owner_as_target", OWNER_AS_ACTOR: "owner_as_actor", OWNER_AS_CASTER: "owner_as_caster", GLOBAL: "global" } }, mq = { 金: C0.ABILITY.ELEMENT.METAL, 木: C0.ABILITY.ELEMENT.WOOD, 水: C0.ABILITY.ELEMENT.WATER, 火: C0.ABILITY.ELEMENT.FIRE, 土: C0.ABILITY.ELEMENT.EARTH, 风: C0.ABILITY.ELEMENT.WIND, 雷: C0.ABILITY.ELEMENT.THUNDER, 冰: C0.ABILITY.ELEMENT.ICE }, Iq = [C0.ABILITY.CHANNEL.MAGIC, C0.ABILITY.CHANNEL.PHYSICAL, C0.ABILITY.CHANNEL.TRUE];
var zq = { [H.MATERIAL.SEMANTIC_FLAME]: { name: "火焰", description: "与火、炎、灼烧、赤炎相关的材料", examples: "赤炎石、火蟒鳞、烈焰花、焚天晶" }, [H.MATERIAL.SEMANTIC_FREEZE]: { name: "冰寒", description: "与冰、寒、霜、冻结相关的材料", examples: "寒冰髓、霜纹铁、冰魄草、玄冰石" }, [H.MATERIAL.SEMANTIC_THUNDER]: { name: "雷霆", description: "与雷、电、霆、闪电相关的材料", examples: "雷灵珠、霆锤碎片、紫电石、引雷铁" }, [H.MATERIAL.SEMANTIC_WIND]: { name: "风行", description: "与风、气流、岚、轻灵敏捷相关的材料", examples: "风灵羽、岚石、旋风叶、飘渺纱" }, [H.MATERIAL.SEMANTIC_BLADE]: { name: "锋刃", description: "与锋利、刃器、攻伐、杀伤力相关的材料", examples: "锐金砂、蛟龙爪、破阵枪头、斩灵铁" }, [H.MATERIAL.SEMANTIC_GUARD]: { name: "防护", description: "与防御、护盾、坚壁、守护相关的材料", examples: "玄铁甲片、龟壳碎片、护心石、金刚木" }, [H.MATERIAL.SEMANTIC_BURST]: { name: "爆发", description: "与爆裂、暴烈、瞬间高威力、激发相关的材料", examples: "暴怒丹、爆裂矿、烈性精华、狂化血" }, [H.MATERIAL.SEMANTIC_SUSTAIN]: { name: "恢复", description: "与持续回复、疗愈、滋养、维持相关的材料", examples: "生息草、回春露、养元丹、疗伤药" }, [H.MATERIAL.SEMANTIC_MANUAL]: { name: "典籍", description: "与经书、秘卷、传承知识、功法心得相关的材料", examples: "破壁残卷、古法拓本、仙人手札、心法碎片" }, [H.MATERIAL.SEMANTIC_SPIRIT]: { name: "灵识", description: "与灵魂、神魂、灵力本源、法术能量相关的材料", examples: "灵魂碎片、魄石、灵力结晶、聚灵珠" }, [H.MATERIAL.SEMANTIC_EARTH]: { name: "土脉", description: "与土、石、山岩、大地、厚重相关的材料", examples: "厚土精、山岩石、岳灵砂、坤元土" }, [H.MATERIAL.SEMANTIC_METAL]: { name: "金铁", description: "与金属、铸炼、钢铁、锐利矿物相关的材料", examples: "寒铁锭、精钢、秘银矿、百炼金精" }, [H.MATERIAL.SEMANTIC_WATER]: { name: "水流", description: "与水、潮汐、泉源、流动柔和相关的材料", examples: "灵泉水、潮汐石、碧波珠、净水露" }, [H.MATERIAL.SEMANTIC_WOOD]: { name: "草木", description: "与木、林、植物生长、藤蔓、根系相关的材料", examples: "古木芯、灵藤、万年根须、青木精" }, [H.MATERIAL.SEMANTIC_POISON]: { name: "毒瘴", description: "与毒素、腐蚀、瘴气、蛊虫相关的材料", examples: "蝎尾毒腺、毒雾草、腐蚀液、瘴气精华" }, [H.MATERIAL.SEMANTIC_DIVINE]: { name: "神圣", description: "与神力、天授、圣光、纯净之力相关的材料", examples: "圣光石、天赐玉、神木枝、祈灵珠" }, [H.MATERIAL.SEMANTIC_SPACE]: { name: "空间", description: "与空间折叠、界域、虚空、位移相关的材料", examples: "虚空碎片、空间裂隙石、折界珠、次元晶" }, [H.MATERIAL.SEMANTIC_TIME]: { name: "时间", description: "与时光、岁月、轮转、瞬移加速相关的材料", examples: "岁月沙、时光碎片、刻痕石、轮回木" }, [H.MATERIAL.SEMANTIC_LIFE]: { name: "生机", description: "与生命力、复苏、萌芽、生生不息相关的材料", examples: "生命之种、复苏花、万灵草、不死根" }, [H.MATERIAL.SEMANTIC_ALCHEMY]: { name: "丹道", description: "与炼丹、药性、丹炉、药材调配相关的材料", examples: "炉中丹火、药引草、丹砂、灵药粉" }, [H.MATERIAL.SEMANTIC_REFINING]: { name: "器道", description: "与炼器、锻造、器胚、熔炼铸造相关的材料", examples: "器胚铁、熔炉碎片、锻造石、铸魂金" }, [H.MATERIAL.SEMANTIC_BEAST]: { name: "妖兽", description: "与妖、兽、蛟龙、野性力量相关的材料", examples: "蛟龙鳞、虎骨、妖兽内丹、凶兽角" }, [H.MATERIAL.SEMANTIC_BLOOD]: { name: "血煞", description: "与血液、气血、煞气、精血相关的材料", examples: "精血石、血煞珠、龙血精、血髓" }, [H.MATERIAL.SEMANTIC_BONE]: { name: "骨甲", description: "与骨骼、甲壳、角刺、坚硬骨质相关的材料", examples: "龙骨、妖兽甲壳、鹿角碎片、骨刺" }, [H.MATERIAL.SEMANTIC_FORMATION]: { name: "阵纹", description: "与阵法、禁制、符文、阵图相关的材料", examples: "阵图碎片、符文石、禁制令牌、刻纹玉" }, [H.MATERIAL.SEMANTIC_ILLUSION]: { name: "幻术", description: "与幻象、迷惑、蜃楼、精神干扰相关的材料", examples: "蜃气珠、幻灵花、迷神香、梦境沙" }, [H.MATERIAL.SEMANTIC_QI]: { name: "灵气", description: "与灵气浓度、元气、法力、灵压相关的材料", examples: "聚灵阵石、灵息草、元炁珠、灵压晶" }, [H.MATERIAL.TYPE_HERB]: { name: "药材", description: "草药、花果、灵植类材料", examples: "灵芝、千年参、回春草、朱果" }, [H.MATERIAL.TYPE_ORE]: { name: "矿石", description: "矿石、金属矿、晶石类材料", examples: "寒铁矿、灵晶石、精金矿、玄石" }, [H.MATERIAL.TYPE_MONSTER]: { name: "妖兽材料", description: "妖兽掉落物：鳞片、骨角、内丹等", examples: "蛟龙鳞、妖兽内丹、凤尾羽、虎骨" }, [H.MATERIAL.TYPE_MANUAL]: { name: "典籍", description: "功法秘籍、神通手札、经书残卷", examples: "太初经残卷、道德真经、秘术手札" }, [H.MATERIAL.TYPE_GONGFA_MANUAL]: { name: "功法典籍", description: "专门记载功法修炼之法的典籍", examples: "紫阳心经、玄天功法、太虚炼体诀" }, [H.MATERIAL.TYPE_SKILL_MANUAL]: { name: "神通典籍", description: "专门记载神通秘术的典籍", examples: "落雷诀残卷、火龙术心得、冰封千里秘录" }, [H.MATERIAL.TYPE_SPECIAL]: { name: "天材地宝", description: "罕见珍稀的天然宝物，通常用于高级造物", examples: "万年灵芝、天外陨铁、龙涎珠、凤血石" }, [H.MATERIAL.TYPE_AUXILIARY]: { name: "辅料", description: "辅助性材料，用于调和、催化或增益", examples: "灵泥、催化粉、调和液、增益符" } };
var I2 = ["seasonal_nurture", "qi_sprout", "stone_soil", "sun_wake", "shade_dew", "ore_soil", "aux_formation", "rest_nurture", "intrinsic_infusion", "qi_growth", "herb_companion", "monster_blood", "pill_nourish", "tcdb_return", "aux_gather", "leaf_medicine", "flower_fruit", "return_treasure", "natural_form"];
var G3 = ["herb", "flower", "vine", "shrub", "tree", "fungus", "aquatic", "root"], U3 = ["leaf", "flower", "fruit", "root", "rhizome", "whole", "spore", "seedpod"], z2 = ["mountain", "valley", "forest", "cave", "wetland", "waterside", "rocky", "volcanic", "cold", "warm", "shaded", "sunny"], M3 = ["slow-rooting", "quick-sprouting", "qi-sensitive", "stone-loving", "companion-loving", "blood-fed", "sun-seeking", "dew-seeking"], b3 = ["alchemy", "beast-nurturing", "healing", "qi-restoration", "spirit-nourishing", "body-tempering", "marrow-wash", "longevity", "breakthrough", "detox", "meridian", "formation"], N3 = ["herb", "tcdb", "spirit_fruit"];
function m_(_) { return Boolean(_ && typeof _ === "object" && !Array.isArray(_)); }
function m1(_, j) { return typeof _ === "string" && j.includes(_); }
function t0(_, j, q) {
    if (!Array.isArray(_) || _.some((P) => !m1(P, j)))
        return null;
    return [...new Set(_)].slice(0, q);
}
function vq(_) {
    let j = ($) => {
        if (Array.isArray($))
            return $.map(j);
        if ($ && typeof $ === "object")
            return Object.keys($).sort().reduce((V, X) => { return V[X] = j($[X]), V; }, {});
        return $;
    }, q = JSON.stringify(j(_)), P = 2166136261;
    for (let $ = 0; $ < q.length; $ += 1)
        P ^= q.charCodeAt($), P = Math.imul(P, 16777619);
    return `seed-v1-${(P >>> 0).toString(16).padStart(8, "0")}`;
}
function H3(_) {
    if (!m_(_) || !m_(_.seedSpec) || _.seedSpec.version !== 1 || !m_(_.seedSpec.plant))
        return null;
    let j = _.seedSpec, q = j.plant, P = q.stageDurationMs, $ = [P === null || P === void 0 ? void 0 : P.germination, P === null || P === void 0 ? void 0 : P.nourishing, P === null || P === void 0 ? void 0 : P.forming], V = t0(q.preferredMethods, I2, 6), X = t0(q.avoidedMethods, I2, 4), Z = t0(q.preferredHabitats, z2, 3), W = t0(q.avoidedHabitats, z2, 2), Q = t0(q.growthTraits, M3, 4), J = t0(q.useTags, b3, 4), Y = t0(q.outcomeBiases, N3, 3), O = t0(q.creationTags, m2, 5);
    if (typeof j.fingerprint !== "string" || typeof q.id !== "string" || typeof q.seedName !== "string" || typeof q.seedDescription !== "string" || !Array.isArray(q.clueTexts) || q.clueTexts.some((h) => typeof h !== "string") || !m1(q.quality, official_chunk_thhss9s9_js_1.Lf) || !m1(q.element, official_chunk_thhss9s9_js_1.Df) || !m1(q.minRealm, official_chunk_thhss9s9_js_1.If) || !m1(q.growthForm, G3) || !m1(q.harvestPart, U3) || !m_(q.stageDurationMs) || $.some((h) => typeof h !== "number" || !Number.isFinite(h) || h < 60000) || typeof q.baseYieldMin !== "number" || !Number.isFinite(q.baseYieldMin) || q.baseYieldMin < 1 || typeof q.baseYieldMax !== "number" || !Number.isFinite(q.baseYieldMax) || q.baseYieldMax < q.baseYieldMin || !V || !X || !Z || !W || !Q || !J || !Y || !O)
        return null;
    let G = { id: q.id, seedName: q.seedName, seedDescription: q.seedDescription, clueTexts: q.clueTexts.slice(0, 3), quality: q.quality, element: q.element, minRealm: q.minRealm, growthForm: q.growthForm, harvestPart: q.harvestPart, preferredMethods: V, avoidedMethods: X, preferredHabitats: Z, avoidedHabitats: W, growthTraits: Q, useTags: J, outcomeBiases: Y, creationTags: O, stageDurationMs: { germination: Math.max(60000, Math.floor(Number(P.germination))), nourishing: Math.max(60000, Math.floor(Number(P.nourishing))), forming: Math.max(60000, Math.floor(Number(P.forming))) }, baseYieldMin: Math.max(1, Math.floor(q.baseYieldMin)), baseYieldMax: Math.max(1, Math.floor(q.baseYieldMax)) };
    if (j.fingerprint !== vq(G))
        return null;
    return { version: 1, fingerprint: j.fingerprint, plant: G };
}
var h3 = { id: "seed.v1", name: "灵种", kind: "seed", stackLimit: 999 }, f1 = zod_7.z.object({ name: zod_7.z.string().optional(), seedSpec: zod_7.z.unknown().transform((_, j) => {
        let q = H3({ seedSpec: _ });
        if (!q)
            return j.addIssue({ code: "custom", message: "灵种生长事实无效，无法取出或播种" }), zod_7.z.NEVER;
        return q;
    }) }).strict().transform((_) => ({ ..._, name: _.seedSpec.plant.seedName })), D3 = zod_7.z.object({ seedPreview: zod_7.z.object({ quality: zod_7.z.enum(official_chunk_thhss9s9_js_1.Lf), element: zod_7.z.enum(official_chunk_thhss9s9_js_1.Df), minRealm: zod_7.z.enum(official_chunk_thhss9s9_js_1.If), seedDescription: zod_7.z.string(), clueTexts: zod_7.z.array(zod_7.z.string()) }).strict() }).strict();
exports.Fd = f1;
const zod_8 = require("./zod.js");
var L3 = { $schema: "./refinement.schema.json", formatVersion: 1, contentRevision: 2, resetLevel: 0, resetExperience: 0, restoreLifespan: !0, items: [{ id: "beast.refinement.origin-dew", name: "归元灵露", icon: "origin-dew", description: "涤去后天积累，使灵兽重归初生，重新孕育资质、成长与天生技能。适用于炼气、筑基、金丹物种。", allowedRealms: ["炼气", "筑基", "金丹"], consumeQuantity: 1, stackLimit: 99, color: "jade" }, { id: "beast.refinement.superior-origin-dew", name: "上品归元灵露", icon: "origin-dew", description: "灵息充沛的归元灵露，可使高阶灵兽重归初生。元婴及以上物种须用此露；不会提高资质、成长或多技能概率。", allowedRealms: ["炼气", "筑基", "金丹", "元婴", "化神", "炼虚", "合体", "大乘", "渡劫"], consumeQuantity: 1, stackLimit: 99, color: "gold" }] };
var rq = zod_8.z.strictObject({ $schema: zod_8.z.string().optional(), formatVersion: zod_8.z.literal(1), contentRevision: zod_8.z.number().int().positive(), resetLevel: zod_8.z.literal(0), resetExperience: zod_8.z.literal(0), restoreLifespan: zod_8.z.boolean(), items: zod_8.z.array(zod_8.z.strictObject({ id: zod_8.z.string().regex(/^beast\.refinement\.[a-z-]+$/), name: zod_8.z.string().min(1).max(40), icon: zod_8.z.literal("origin-dew"), color: zod_8.z.enum(["jade", "gold"]), description: zod_8.z.string().min(1).max(300), allowedRealms: zod_8.z.array(zod_8.z.enum(official_chunk_thhss9s9_js_1.If)).min(1), consumeQuantity: zod_8.z.number().int().min(1).max(99), stackLimit: zod_8.z.number().int().min(1).max(99) })).min(1) });
function wq(_) {
    let j = rq.parse(_);
    if (new Set(j.items.map((q) => q.id)).size !== j.items.length)
        throw Error("refinement.json：道具ID重复");
    for (let q of j.items)
        if (q.consumeQuantity > q.stackLimit || new Set(q.allowedRealms).size !== q.allowedRealms.length)
            throw Error(`refinement.json：${q.id} 消耗数量或适用境界配置无效`);
    return j;
}
var I_ = wq(L3);
exports.Gd = I_;
var v2 = official_chunk_thhss9s9_js_1.$f.map((_) => ({ id: `book.${_.id}`, name: _.name, kind: "beast_book", skillId: _.id, stackLimit: 99 }));
var z_ = { id: "beast.rejuvenation.huasheng-fruit", name: "化生果", kind: "beast_rejuvenation", stackLimit: 99, description: "使灵兽回到幼年，等级与属性点重新养成。" };
var A3 = { id: "equipment.v6", name: "道装", kind: "equipment", stackLimit: 1 };
function v_(_) { let { realm: j } = (0, official_chunk_thhss9s9_js_1.Sf)(_); return { realm: j, requiredLevel: (0, official_chunk_thhss9s9_js_1.Rf)(j, "初期") }; }
var u1 = [10, 30, 50, 70, 90, 110, 130, 150, 170];
function PX(_) { return u1.some((j) => j === _); }
var S2 = [10, 30, 50, 70, 90];
function n1(_) { return S2.some((j) => j === _); }
var I1 = "dao_equipment_generator_v1", S_ = "dao_equipment_generator_v2", r2 = "dao_equipment_generator_v3", a1 = "dao_equipment_generator_v4", i1 = "dao_equipment_generator_v5", $0 = ["weapon", "head", "armor", "necklace", "belt", "footwear"];
exports.rc = $0;
var _1 = { weapon: "法兵", head: "法冠", armor: "法衣", necklace: "灵佩", belt: "腰封", footwear: "云履" }, F3 = $0.flatMap((_) => u1.map((j) => { return { id: `blueprint.${_}.${j}`, name: `${(0, official_chunk_thhss9s9_js_1.Sf)(j).realm}期${_1[_]}`, kind: "blueprint", stackLimit: 99, slot: _, level: j }; }));
exports.Kd = _1;
exports.Ld = F3;
var m3 = { $schema: "./manual-pack.schema.json", version: 3, progressions: { standard: { maxLevel: 9, bottlenecks: [3, 6], costsByRealm: { 炼气: [{ experience: 40, insight: 4 }, { experience: 80, insight: 6 }, { experience: 120, insight: 8 }, { experience: 160, insight: 10 }, { experience: 200, insight: 12 }, { experience: 240, insight: 14 }, { experience: 280, insight: 16 }, { experience: 320, insight: 18 }], 筑基: [{ experience: 200, insight: 6 }, { experience: 400, insight: 9 }, { experience: 600, insight: 12 }, { experience: 800, insight: 15 }, { experience: 1000, insight: 18 }, { experience: 1200, insight: 21 }, { experience: 1400, insight: 24 }, { experience: 1600, insight: 27 }], 金丹: [{ experience: 1000, insight: 8 }, { experience: 2000, insight: 12 }, { experience: 3000, insight: 16 }, { experience: 4000, insight: 20 }, { experience: 5000, insight: 24 }, { experience: 6000, insight: 28 }, { experience: 7000, insight: 32 }, { experience: 8000, insight: 36 }], 元婴: [{ experience: 4000, insight: 10 }, { experience: 8000, insight: 15 }, { experience: 12000, insight: 20 }, { experience: 16000, insight: 25 }, { experience: 20000, insight: 30 }, { experience: 24000, insight: 35 }, { experience: 28000, insight: 40 }, { experience: 32000, insight: 45 }] } } }, manuals: [{ id: "character_manual.changchun", name: "长春功", realm: "炼气", description: "生机绵长，温养自身。", progressionId: "standard", effects: [{ attribute: "vitality", valuePerLevel: 2, valueAt1: 12 }], mechanism: { type: "restoreHp", condition: "selfHpBelow50", valueAt1: 0.0025, valueAt9: 0.0075 } }, { id: "character_manual.gengjin", name: "庚金诀", realm: "炼气", description: "金气锐利，先破敌锋。", progressionId: "standard", effects: [{ attribute: "strength", valuePerLevel: 2, valueAt1: 12 }], mechanism: { type: "damage", condition: "targetHpAbove70", valueAt1: 0.01, valueAt9: 0.03, kinds: ["physical"] } }, { id: "character_manual.qingmu", name: "青木养元诀", realm: "炼气", description: "木气滋生，扶伤续命。", progressionId: "standard", effects: [{ attribute: "willpower", valuePerLevel: 2, valueAt1: 12 }], mechanism: { type: "heal", condition: "targetHpBelow50", valueAt1: 0.03, valueAt9: 0.09 } }, { id: "character_manual.qingquan", name: "清泉诀", realm: "炼气", description: "涓流回补，法力不竭。", progressionId: "standard", effects: [{ attribute: "spirit", valuePerLevel: 2, valueAt1: 12 }], mechanism: { type: "restoreMp", condition: "selfMpBelow50", valueAt1: 0.0025, valueAt9: 0.0075 } }, { id: "character_manual.chiyan", name: "赤炎诀", realm: "炼气", description: "精气充盈，火势方盛。", progressionId: "standard", effects: [{ attribute: "spirit", valuePerLevel: 2, valueAt1: 12 }], mechanism: { type: "damage", condition: "selfHpAbove70", valueAt1: 0.01, valueAt9: 0.03, kinds: ["spell"] } }, { id: "character_manual.houtu_jue", name: "厚土诀", realm: "炼气", description: "厚土承压，守势稳固。", progressionId: "standard", effects: [{ attribute: "endurance", valuePerLevel: 2, valueAt1: 12 }], mechanism: { type: "mitigation", condition: "defending", valueAt1: 0.03, valueAt9: 0.09, kinds: ["physical"] } }, { id: "character_manual.guiyuan", name: "归元功", realm: "筑基", description: "真元归一，凝甲护身。", progressionId: "standard", effects: [{ attribute: "endurance", valuePerLevel: 2, valueAt1: 18 }], mechanism: { type: "mitigation", condition: "selfBarrier", valueAt1: 0.02, valueAt9: 0.06, kinds: ["physical", "spell"] } }, { id: "character_manual.huanling", name: "幻灵诀", realm: "筑基", description: "幻影扰目，难辨真身。", progressionId: "standard", effects: [{ attribute: "speed", valuePerLevel: 2, valueAt1: 18 }], mechanism: { type: "evasion", condition: "always", valueAt1: 0.01, valueAt9: 0.03 } }, { id: "character_manual.qingyuan", name: "青元剑诀", realm: "筑基", description: "真元养剑，气盛剑锐。", progressionId: "standard", effects: [{ attribute: "strength", valuePerLevel: 2, valueAt1: 18 }], mechanism: { type: "damage", condition: "selfHpAbove70", valueAt1: 0.02, valueAt9: 0.04, kinds: ["physical"] } }, { id: "character_manual.dayan", name: "大衍诀", realm: "筑基", description: "壮大神识，分神守心。", progressionId: "standard", effects: [{ attribute: "willpower", valuePerLevel: 2, valueAt1: 18 }], mechanism: { type: "sealResist", condition: "always", valueAt1: 0.01, valueAt9: 0.03 } }, { id: "character_manual.sanzhuan", name: "三转重元功", realm: "筑基", description: "真元重炼，压缩精纯。", progressionId: "standard", effects: [{ attribute: "spirit", valuePerLevel: 2, valueAt1: 18 }], mechanism: { type: "damage", condition: "selfMpAbove70", valueAt1: 0.02, valueAt9: 0.04, kinds: ["spell"] } }, { id: "character_manual.shayao", name: "煞妖诀", realm: "筑基", description: "血煞催身，险中争胜。", progressionId: "standard", effects: [{ attribute: "vitality", valuePerLevel: 2, valueAt1: 18 }], mechanism: { type: "damage", condition: "selfHpBelow35", valueAt1: 0.02, valueAt9: 0.04, kinds: ["physical", "spell", "fixed"] } }, { id: "character_manual.taibai", name: "太白剑诀", realm: "金丹", description: "剑气破障，锋芒穿护。", progressionId: "standard", effects: [{ attribute: "strength", valuePerLevel: 4, valueAt1: 24 }], mechanism: { type: "damage", condition: "targetBarrier", valueAt1: 0.03, valueAt9: 0.06, kinds: ["physical"] } }, { id: "character_manual.taiyang", name: "泰阳诀", realm: "金丹", description: "精纯火力，盛阳外放。", progressionId: "standard", effects: [{ attribute: "spirit", valuePerLevel: 4, valueAt1: 24 }], mechanism: { type: "damage", condition: "selfHpAbove70", valueAt1: 0.03, valueAt9: 0.06, kinds: ["spell"] } }, { id: "character_manual.xuanyin", name: "玄阴大法", realm: "金丹", description: "阴魂蚀体，阴气乘隙。", progressionId: "standard", effects: [{ attribute: "spirit", valuePerLevel: 4, valueAt1: 24 }], mechanism: { type: "damage", condition: "targetDot", valueAt1: 0.03, valueAt9: 0.06, kinds: ["spell", "fixed"] } }, { id: "character_manual.yudan", name: "玉丹功", realm: "金丹", description: "玉润丹养，扶危固本。", progressionId: "standard", effects: [{ attribute: "willpower", valuePerLevel: 4, valueAt1: 24 }], mechanism: { type: "heal", condition: "targetHpBelow50", valueAt1: 0.04, valueAt9: 0.12 } }, { id: "character_manual.tianluo", name: "天罗真功", realm: "金丹", description: "儒门正气，护佑危局。", progressionId: "standard", effects: [{ attribute: "willpower", valuePerLevel: 4, valueAt1: 24 }], mechanism: { type: "barrier", condition: "targetHpBelow50", valueAt1: 0.05, valueAt9: 0.15 } }, { id: "character_manual.liuji", name: "六极真魔功", realm: "金丹", description: "真魔法体，受压显威。", progressionId: "standard", effects: [{ attribute: "strength", valuePerLevel: 4, valueAt1: 24 }], mechanism: { type: "damage", condition: "selfHpBelow35", valueAt1: 0.03, valueAt9: 0.06, kinds: ["physical", "spell"] } }, { id: "character_manual.tuotian", name: "托天魔功", realm: "元婴", description: "肉身强横，重压不折。", progressionId: "standard", effects: [{ attribute: "endurance", valuePerLevel: 4, valueAt1: 36 }], mechanism: { type: "mitigation", condition: "selfHpBelow50", valueAt1: 0.03, valueAt9: 0.07, kinds: ["physical"] } }, { id: "character_manual.mingwang", name: "明王诀", realm: "元婴", description: "法体坚固，受制不溃。", progressionId: "standard", effects: [{ attribute: "vitality", valuePerLevel: 4, valueAt1: 36 }], mechanism: { type: "mitigation", condition: "selfControl", valueAt1: 0.04, valueAt9: 0.1, kinds: ["physical", "spell"] } }, { id: "character_manual.yuanci", name: "元磁神光", realm: "元婴", description: "元磁牵制，护持周身。", progressionId: "standard", effects: [{ attribute: "spirit", valuePerLevel: 4, valueAt1: 36 }], mechanism: { type: "mitigation", condition: "selfMpAbove50", valueAt1: 0.03, valueAt9: 0.07, kinds: ["spell"] } }, { id: "character_manual.haoran", name: "浩然正气诀", realm: "元婴", description: "邪扰不侵，正气护神。", progressionId: "standard", effects: [{ attribute: "willpower", valuePerLevel: 4, valueAt1: 36 }], mechanism: { type: "mitigation", condition: "selfDebuff", valueAt1: 0.04, valueAt9: 0.1, kinds: ["spell"] } }, { id: "character_manual.qianlang", name: "千浪诀", realm: "元婴", description: "身随浪走，危中脱身。", progressionId: "standard", effects: [{ attribute: "speed", valuePerLevel: 4, valueAt1: 36 }], mechanism: { type: "evasion", condition: "selfHpBelow50", valueAt1: 0.02, valueAt9: 0.06 } }, { id: "character_manual.yousha", name: "幽杀诀", realm: "元婴", description: "杀意逼迫，追索残敌。", progressionId: "standard", effects: [{ attribute: "strength", valuePerLevel: 4, valueAt1: 36 }], mechanism: { type: "damage", condition: "targetHpBelow35", valueAt1: 0.03, valueAt9: 0.06, kinds: ["physical", "spell", "fixed"] } }] };
const zod_9 = require("./zod.js");
var E2 = ["炼气", "筑基", "金丹", "元婴"], Eq = ["vitality", "strength", "spirit", "endurance", "speed", "willpower"], dq = zod_9.z.number().int().positive().max(1e9), Tq = zod_9.z.strictObject({ experience: dq, insight: zod_9.z.number().int().min(1).max(100) }), w2 = { valueAt1: zod_9.z.number().positive().max(0.2), valueAt9: zod_9.z.number().positive().max(0.2) }, y2 = zod_9.z.enum(["always", "selfHpBelow50", "selfHpBelow35", "selfHpAbove70", "targetHpBelow50", "targetHpBelow35", "targetHpAbove70", "selfMpBelow50", "selfMpAbove50", "selfMpAbove70", "defending", "selfBarrier", "targetBarrier", "targetDot", "selfControl", "selfDebuff"]), gq = zod_9.z.discriminatedUnion("type", [zod_9.z.strictObject({ type: zod_9.z.literal("damage"), condition: y2, kinds: zod_9.z.array(zod_9.z.enum(["physical", "spell", "fixed"])).min(1).max(3), ...w2 }), zod_9.z.strictObject({ type: zod_9.z.literal("mitigation"), condition: y2, kinds: zod_9.z.array(zod_9.z.enum(["physical", "spell"])).min(1).max(2), ...w2 }), zod_9.z.strictObject({ type: zod_9.z.enum(["heal", "barrier", "evasion", "sealResist", "restoreHp", "restoreMp"]), condition: y2, ...w2 })]), pq = zod_9.z.strictObject({ $schema: zod_9.z.string().optional(), version: zod_9.z.literal(3), progressions: zod_9.z.record(zod_9.z.string().min(1), zod_9.z.strictObject({ maxLevel: zod_9.z.number().int().min(2).max(99), bottlenecks: zod_9.z.array(zod_9.z.number().int().positive()), costsByRealm: zod_9.z.record(zod_9.z.enum(E2), zod_9.z.array(Tq)) })), manuals: zod_9.z.array(zod_9.z.strictObject({ id: zod_9.z.string().regex(/^character_manual\.[a-z][a-z0-9_-]*$/), name: zod_9.z.string().min(1), realm: zod_9.z.enum(E2), description: zod_9.z.string().min(1), progressionId: zod_9.z.string().min(1), effects: zod_9.z.array(zod_9.z.strictObject({ attribute: zod_9.z.enum(Eq), valueAt1: zod_9.z.number().int().min(1).max(1000), valuePerLevel: zod_9.z.number().int().min(1).max(100) })).min(1).max(1), mechanism: gq })).min(1) }), kq = pq.superRefine((_, j) => {
    let q = ($, V) => j.addIssue({ code: "custom", path: $, message: V }), P = new Set;
    _.manuals.forEach(($, V) => {
        if (P.has($.id))
            q(["manuals", V, "id"], "功法 ID 重复");
        P.add($.id);
        let X = $.mechanism;
        if (X.valueAt9 <= X.valueAt1)
            q(["manuals", V, "mechanism"], "机制必须随层数增强");
        if ("kinds" in X && new Set(X.kinds).size !== X.kinds.length)
            q(["manuals", V, "mechanism"], "伤害类型重复");
        if (["mitigation", "evasion", "restoreHp", "restoreMp"].includes(X.type) && X.condition.startsWith("target"))
            q(["manuals", V, "mechanism"], "防护与回合恢复仅支持自身条件");
        if (X.type === "sealResist" && X.condition !== "always")
            q(["manuals", V, "mechanism"], "封印抵抗为常驻能力");
        if (!_.progressions[$.progressionId])
            q(["manuals", V, "progressionId"], "培养规则不存在");
        if (new Set($.effects.map((Z) => Z.attribute)).size !== $.effects.length)
            q(["manuals", V, "effects"], "属性不能重复");
    });
    for (let [$, V] of Object.entries(_.progressions)) {
        if (V.bottlenecks.some((X, Z) => X >= V.maxLevel || Z > 0 && X <= V.bottlenecks[Z - 1]))
            q(["progressions", $, "bottlenecks"], "瓶颈必须递增且低于满层");
        for (let X of E2)
            if (V.costsByRealm[X].length !== V.maxLevel - 1)
                q(["progressions", $, "costsByRealm", X], "必须逐层配置二层至满层的费用");
    }
});
exports.Md = E2;
function I3(_) { return kq.parse(_); }
var z3 = I3(m3), r_ = z3.manuals.map((_) => ({ ..._, skill: { id: `${_.id}.passive`, name: _.name, tags: [official_chunk_thhss9s9_js_1.$e.Passive], targeting: { side: official_chunk_thhss9s9_js_1.af.Self }, effects: [] } }));
exports.Nd = r_;
function UX(_) { return z3.progressions[_.progressionId]; }
var v3 = r_.map((_) => ({ id: `jade.${_.id}`, name: _.name, kind: "manual_jade", manualId: _.id, stackLimit: 99 }));
var S3 = { $schema: "./equipment-base.schema.json", formatVersion: 1, contentRevision: 3, templates: [{ id: "dao_equipment.standard.weapon.v1", name: "法兵", slot: "weapon", baseStats: [{ attr: "physicalAtk", ranges: [{ level: 10, normal: [116, 149], enhanced: [127, 164] }, { level: 30, normal: [233, 299], enhanced: [256, 328] }, { level: 50, normal: [350, 450], enhanced: [385, 495] }, { level: 70, normal: [466, 599], enhanced: [512, 658] }, { level: 90, normal: [583, 749], enhanced: [641, 823] }] }, { attr: "magicAtk", ranges: [{ level: 10, normal: [25, 33], enhanced: [28, 36] }, { level: 30, normal: [52, 67], enhanced: [57, 73] }, { level: 50, normal: [78, 100], enhanced: [85, 110] }, { level: 70, normal: [105, 135], enhanced: [115, 148] }, { level: 90, normal: [130, 168], enhanced: [143, 184] }] }, { attr: "healPower", ranges: [{ level: 10, normal: [30, 54], enhanced: [33, 59] }, { level: 30, normal: [60, 108], enhanced: [66, 118] }, { level: 50, normal: [90, 162], enhanced: [99, 178] }, { level: 70, normal: [120, 216], enhanced: [132, 237] }, { level: 90, normal: [150, 270], enhanced: [165, 297] }] }] }, { id: "dao_equipment.standard.head.v1", name: "法冠", slot: "head", baseStats: [{ attr: "maxMp", ranges: [{ level: 10, normal: [116, 149], enhanced: [127, 164] }, { level: 30, normal: [233, 299], enhanced: [256, 328] }, { level: 50, normal: [350, 450], enhanced: [385, 495] }, { level: 70, normal: [466, 599], enhanced: [512, 658] }, { level: 90, normal: [583, 749], enhanced: [641, 823] }] }, { attr: "physicalDef", ranges: [{ level: 10, normal: [17, 22], enhanced: [19, 24] }, { level: 30, normal: [35, 45], enhanced: [38, 49] }, { level: 50, normal: [52, 67], enhanced: [57, 73] }, { level: 70, normal: [70, 90], enhanced: [77, 99] }, { level: 90, normal: [87, 112], enhanced: [95, 123] }] }] }, { id: "dao_equipment.standard.armor.v1", name: "法衣", slot: "armor", baseStats: [{ attr: "maxHp", ranges: [{ level: 10, normal: [93, 119], enhanced: [102, 131] }, { level: 30, normal: [186, 239], enhanced: [205, 263] }, { level: 50, normal: [280, 360], enhanced: [308, 396] }, { level: 70, normal: [373, 479], enhanced: [410, 526] }, { level: 90, normal: [466, 599], enhanced: [512, 658] }] }, { attr: "physicalDef", ranges: [{ level: 10, normal: [29, 37], enhanced: [31, 41] }, { level: 30, normal: [58, 74], enhanced: [63, 81] }, { level: 50, normal: [87, 112], enhanced: [95, 123] }, { level: 70, normal: [116, 149], enhanced: [127, 163] }, { level: 90, normal: [145, 187], enhanced: [159, 205] }] }] }, { id: "dao_equipment.standard.necklace.v1", name: "灵佩", slot: "necklace", baseStats: [{ attr: "magicAtk", ranges: [{ level: 10, normal: [32, 41], enhanced: [35, 45] }, { level: 30, normal: [64, 82], enhanced: [70, 90] }, { level: 50, normal: [95, 123], enhanced: [104, 135] }, { level: 70, normal: [128, 164], enhanced: [140, 180] }, { level: 90, normal: [160, 206], enhanced: [176, 226] }] }, { attr: "magicDef", ranges: [{ level: 10, normal: [17, 22], enhanced: [19, 24] }, { level: 30, normal: [35, 45], enhanced: [38, 49] }, { level: 50, normal: [52, 67], enhanced: [57, 73] }, { level: 70, normal: [70, 90], enhanced: [77, 99] }, { level: 90, normal: [87, 112], enhanced: [95, 123] }] }] }, { id: "dao_equipment.standard.belt.v1", name: "腰封", slot: "belt", baseStats: [{ attr: "maxHp", ranges: [{ level: 10, normal: [140, 180], enhanced: [154, 198] }, { level: 30, normal: [280, 360], enhanced: [308, 396] }, { level: 50, normal: [420, 540], enhanced: [462, 594] }, { level: 70, normal: [560, 720], enhanced: [616, 792] }, { level: 90, normal: [700, 900], enhanced: [770, 990] }] }, { attr: "physicalDef", ranges: [{ level: 10, normal: [11, 15], enhanced: [12, 16] }, { level: 30, normal: [23, 30], enhanced: [25, 33] }, { level: 50, normal: [35, 45], enhanced: [38, 49] }, { level: 70, normal: [46, 59], enhanced: [50, 64] }, { level: 90, normal: [58, 74], enhanced: [63, 81] }] }] }, { id: "dao_equipment.standard.footwear.v1", name: "云履", slot: "footwear", baseStats: [{ attr: "magicDef", ranges: [{ level: 10, normal: [17, 22], enhanced: [19, 24] }, { level: 30, normal: [35, 45], enhanced: [38, 49] }, { level: 50, normal: [52, 67], enhanced: [57, 73] }, { level: 70, normal: [70, 90], enhanced: [77, 99] }, { level: 90, normal: [87, 112], enhanced: [95, 123] }] }, { attr: "speed", ranges: [{ level: 10, normal: [13, 23], enhanced: [14, 25] }, { level: 30, normal: [26, 47], enhanced: [29, 52] }, { level: 50, normal: [40, 72], enhanced: [44, 79] }, { level: 70, normal: [53, 95], enhanced: [58, 104] }, { level: 90, normal: [66, 119], enhanced: [72, 130] }] }] }], inscriptions: [{ id: "dao_inscription.xuanfeng", name: "玄锋阵纹", attr: "physicalAtk", valuePerLevel: 6, allowedSlots: ["weapon", "head"] }, { id: "dao_inscription.lingyao", name: "灵曜阵纹", attr: "magicAtk", valuePerLevel: 4, allowedSlots: ["weapon", "necklace"] }, { id: "dao_inscription.jingang", name: "金刚阵纹", attr: "physicalDef", valuePerLevel: 8, allowedSlots: ["head", "armor"] }, { id: "dao_inscription.xuanjia", name: "玄甲阵纹", attr: "magicDef", valuePerLevel: 6, allowedSlots: ["armor", "necklace"] }, { id: "dao_inscription.changsheng", name: "长生阵纹", attr: "maxHp", valuePerLevel: 40, allowedSlots: ["armor", "belt"] }, { id: "dao_inscription.jifeng", name: "疾风阵纹", attr: "speed", valuePerLevel: 4, allowedSlots: ["belt", "footwear"] }, { id: "dao_inscription.dongming", name: "洞明阵纹", attr: "sealHit", valuePerLevel: 1, allowedSlots: ["weapon"] }, { id: "dao_inscription.liuyun", name: "定神阵纹", attr: "sealResist", valuePerLevel: 1, allowedSlots: ["belt", "footwear"] }, { id: "dao_inscription.huichun", name: "回春阵纹", attr: "healPower", valuePerLevel: 6, allowedSlots: ["weapon", "armor"] }], generation: { bonusCountProbabilities: [0.5, 0.4, 0.1], bonusRanges: [{ level: 10, min: 4, max: 7 }, { level: 30, min: 7, max: 14 }, { level: 50, min: 11, max: 22 }, { level: 70, min: 15, max: 29 }, { level: 90, min: 18, max: 36 }] } };
const zod_10 = require("./zod.js");
var r3 = zod_10.z.enum(["physicalAtk", "physicalDef", "magicAtk", "magicDef", "maxHp", "maxMp", "healPower", "speed", "hit", "dodge", "critRate", "spellCritRate", "physicalFuryRate", "sealHit", "sealResist"]), w3 = zod_10.z.tuple([zod_10.z.number().int().nonnegative().max(1e6), zod_10.z.number().int().nonnegative().max(1e6)]), y3 = zod_10.z.union([zod_10.z.literal(10), zod_10.z.literal(30), zod_10.z.literal(50), zod_10.z.literal(70), zod_10.z.literal(90)]), lq = zod_10.z.strictObject({ level: y3, normal: w3, enhanced: w3 }), d2 = zod_10.z.number().min(0).max(1), xq = zod_10.z.strictObject({ $schema: zod_10.z.string().optional(), formatVersion: zod_10.z.literal(1), contentRevision: zod_10.z.number().int().positive(), templates: zod_10.z.array(zod_10.z.strictObject({ id: zod_10.z.string().regex(/^dao_equipment\.standard\.[a-z]+\.v1$/), name: zod_10.z.string().trim().min(1), slot: zod_10.z.enum($0), baseStats: zod_10.z.array(zod_10.z.strictObject({ attr: r3, ranges: zod_10.z.array(lq).length(5) })).min(1) })).length($0.length), inscriptions: zod_10.z.array(zod_10.z.strictObject({ id: zod_10.z.string().regex(/^dao_inscription\.[a-z][a-z0-9_]*$/), name: zod_10.z.string().trim().min(1), attr: r3, valuePerLevel: zod_10.z.number().positive(), allowedSlots: zod_10.z.array(zod_10.z.enum($0)).min(1) })).min(1), generation: zod_10.z.strictObject({ bonusCountProbabilities: zod_10.z.tuple([d2, d2, d2]), bonusRanges: zod_10.z.array(zod_10.z.strictObject({ level: y3, min: zod_10.z.number().int().positive(), max: zod_10.z.number().int().positive() })).length(5) }) }), fq = xq.superRefine((_, j) => {
    let q = (V, X) => j.addIssue({ code: "custom", path: V, message: X }), P = (V, X) => {
        V.forEach((Z, W) => {
            if (V.indexOf(Z) !== W)
                q([...X, W], "不得重复");
        });
    };
    P(_.templates.map((V) => V.id), ["templates"]), P(_.templates.map((V) => V.slot), ["templates"]), _.templates.forEach((V, X) => {
        if (V.id !== `dao_equipment.standard.${V.slot}.v1`)
            q(["templates", X, "id"], "模板 ID 必须匹配标准部位 ID，供图纸和生成入口引用");
        P(V.baseStats.map((Z) => Z.attr), ["templates", X, "baseStats"]), V.baseStats.forEach((Z, W) => {
            let Q = ["templates", X, "baseStats", W, "ranges"];
            P(Z.ranges.map((J) => String(J.level)), Q), Z.ranges.forEach((J, Y) => {
                if (J.normal[0] > J.normal[1] || J.enhanced[0] > J.enhanced[1])
                    q([...Q, Y], "上界不得小于下界");
                if (J.enhanced.some((O, G) => O < J.normal[G]))
                    q([...Q, Y, "enhanced"], "高品阶范围不得低于普通范围");
            });
        });
    }), P(_.inscriptions.map((V) => V.id), ["inscriptions"]), _.inscriptions.forEach((V, X) => { P(V.allowedSlots, ["inscriptions", X, "allowedSlots"]); });
    let $ = _.generation.bonusCountProbabilities.reduce((V, X) => V + X, 0);
    if (Math.abs($ - 1) > 0.000000000001)
        q(["generation", "bonusCountProbabilities"], "0／1／2 条概率之和必须为 1");
    P(_.generation.bonusRanges.map((V) => String(V.level)), ["generation", "bonusRanges"]), _.generation.bonusRanges.forEach((V, X) => {
        if (V.min > V.max)
            q(["generation", "bonusRanges", X], "上界不得小于下界");
    });
});
function E3(_, j = "equipment-base.json") {
    let q = fq.safeParse(_);
    if (q.success)
        return q.data;
    let P = q.error.issues.map(($) => {
        let V = _;
        for (let Z of $.path.slice(0, 2))
            V = V && typeof V === "object" ? Reflect.get(V, Z) : void 0;
        let X = V && typeof V === "object" && "id" in V ? ` [${String(V.id)}]` : "";
        return `${j}${X} ${$.path.join(".")}: ${$.message}`;
    });
    throw Error(P.join(`
`));
}
var w_ = ["axe", "blade", "spear", "staff", "sword", "fan", "bell", "brush", "banner"], s1 = { axe: { name: "斧", physicalAtk: 1.15, magicAtk: 0.85 }, blade: { name: "刀", physicalAtk: 1.12, magicAtk: 0.88 }, spear: { name: "枪", physicalAtk: 1.09, magicAtk: 0.91 }, staff: { name: "棍", physicalAtk: 1.03, magicAtk: 0.97 }, sword: { name: "剑", physicalAtk: 1, magicAtk: 1 }, fan: { name: "扇", physicalAtk: 0.94, magicAtk: 1.06 }, bell: { name: "铃", physicalAtk: 0.91, magicAtk: 1.09 }, brush: { name: "笔", physicalAtk: 0.88, magicAtk: 1.12 }, banner: { name: "幡", physicalAtk: 0.85, magicAtk: 1.15 } };
exports.Pd = w_;
exports.Qd = s1;
function c1(_) { var _a; return _.slot === "weapon" ? (_a = _.weaponType) !== null && _a !== void 0 ? _a : "sword" : void 0; }
function y_(_) {
    let { slot: j, weaponType: q, generatorVersion: P } = _;
    if (j !== "weapon")
        return q === void 0 ? void 0 : "只有法兵可以指定器形";
    if (q !== void 0 && (typeof q !== "string" || !w_.includes(q)))
        return "法兵器形无效";
    if (P === "dao_equipment_generator_v5")
        return q === void 0 ? "新版法兵必须指定器形" : void 0;
    if (q !== void 0 && q !== "sword")
        return "旧版法兵仅兼容剑";
}
var T2 = E3(S3), d3 = T2.templates, T3 = T2.generation;
function g2(_) {
    let j = T3.bonusRanges.find((q) => q.level === _);
    if (!j)
        throw Error("该境界道装尚未开放");
    return { min: j.min, max: j.max };
}
var uq = { Xuanfeng: "dao_inscription.xuanfeng", Lingyao: "dao_inscription.lingyao", Jingang: "dao_inscription.jingang", Xuanjia: "dao_inscription.xuanjia", Changsheng: "dao_inscription.changsheng", Jifeng: "dao_inscription.jifeng", Dongming: "dao_inscription.dongming", Liuyun: "dao_inscription.liuyun", Huichun: "dao_inscription.huichun" }, E_ = T2.inscriptions;
exports.Rd = uq;
exports.Sd = E_;
function d_(_) { return d3.find((j) => j.id === _); }
function j1(_) { return E_.find((j) => j.id === _); }
function p2(_, j, q = 0, P) {
    let $ = _.ranges.find((W) => W.level === j);
    if (!$)
        throw Error("该境界道装尚未开放");
    let V = P && (_.attr === "physicalAtk" || _.attr === "magicAtk") ? s1[P][_.attr] : 1, X = Math.round($.normal[0] + q * ($.enhanced[0] - $.normal[0])), Z = Math.round($.normal[1] + q * ($.enhanced[1] - $.normal[1]));
    return { min: Math.round(X * V), max: Math.round(Z * V) };
}
var nq = 11, aq = (_, j) => `inscription.${_}.${j}`, g3 = E_.flatMap((_) => Array.from({ length: nq }, (j, q) => ({ id: aq(_.id, q + 1), name: _.name, kind: "inscription", patternId: _.id, level: q + 1, stackLimit: 99 })));
exports.Wd = nq;
exports.Xd = aq;
var iq = [...v2, ...I_.items.map((_) => ({ ..._, kind: "beast_refinement" })), z_, ...F3, A3, B3, h3, O3, ...v3, ...g3], sq = new Map(iq.map((_) => [_.id, _]));
function k2(_) { return sq.get(_); }
const zod_11 = require("./zod.js");
var p3 = { $schema: "./equipment-forging.schema.json", formatVersion: 1, contentRevision: 5, generation: { essenceCountProbabilities: [0.82, 0.16, 0.02], artChance: 0.08, essencePool: ["dao_equipment.essence.cangfeng", "dao_equipment.essence.ningshen", "dao_equipment.essence.pojin", "dao_equipment.essence.dinghun", "dao_equipment.essence.qingling", "dao_equipment.essence.jiangang", "dao_equipment.essence.guiyuan", "dao_equipment.essence.zhenyue", "dao_equipment.essence.shouxin", "dao_equipment.essence.pojia", "dao_equipment.essence.chuanxuan", "dao_equipment.essence.chengnian", "dao_equipment.essence.huichun", "dao_equipment.essence.huming"], artPool: ["dao_equipment.art.huiyuan", "dao_equipment.art.yangyuan", "dao_equipment.art.xuming", "dao_equipment.art.baoyuan", "dao_equipment.art.guizhen", "dao_equipment.art.huanhun", "dao_equipment.art.qingxin", "dao_equipment.art.dichen", "dao_equipment.art.taiqing", "dao_equipment.art.chengtian", "dao_equipment.art.cuozhi", "dao_equipment.art.hanyue", "dao_equipment.art.hanyueyin", "dao_equipment.art.huti", "dao_equipment.art.hutiyin", "dao_equipment.art.lianfeng", "dao_equipment.art.lianfengyin", "dao_equipment.art.liejia", "dao_equipment.art.liejiayin", "dao_equipment.art.xuanling", "dao_equipment.art.xuantian", "dao_equipment.art.fuying", "dao_equipment.art.fuyingyin", "dao_equipment.art.yufeng", "dao_equipment.art.yufengyin", "dao_equipment.art.lingyan", "dao_equipment.art.jifa", "dao_equipment.art.kurong", "dao_equipment.art.diefeng", "dao_equipment.art.sandie", "dao_equipment.art.juling", "dao_equipment.art.wanxiang", "dao_equipment.art.zebei", "dao_equipment.art.niming", "dao_equipment.art.due", "dao_equipment.art.dongxu", "dao_equipment.art.cuiling", "dao_equipment.art.dangchen"] }, forging: { boostPerMaterial: 0.018, costs: [{ level: 10, spiritStones: 100, qi: 7, quantity: 1, rank: "凡品" }, { level: 30, spiritStones: 900, qi: 11, quantity: 1, rank: "凡品" }, { level: 50, spiritStones: 2500, qi: 15, quantity: 2, rank: "灵品" }, { level: 70, spiritStones: 4900, qi: 19, quantity: 2, rank: "灵品" }, { level: 90, spiritStones: 8100, qi: 23, quantity: 3, rank: "玄品" }, { level: 110, spiritStones: 12100, qi: 27, quantity: 3, rank: "玄品" }, { level: 130, spiritStones: 16900, qi: 31, quantity: 4, rank: "真品" }, { level: 150, spiritStones: 22500, qi: 35, quantity: 4, rank: "真品" }, { level: 170, spiritStones: 28900, qi: 39, quantity: 5, rank: "地品" }] } };
const zod_12 = require("./zod.js");
var T_ = zod_12.z.number().min(0).max(1), eq = zod_12.z.strictObject({ $schema: zod_12.z.string().optional(), formatVersion: zod_12.z.literal(1), contentRevision: zod_12.z.number().int().positive(), generation: zod_12.z.strictObject({ essenceCountProbabilities: zod_12.z.tuple([T_, T_, T_]), artChance: T_, essencePool: zod_12.z.array(zod_12.z.string().min(1)).min(1), artPool: zod_12.z.array(zod_12.z.string().min(1)).min(1) }), forging: zod_12.z.strictObject({ boostPerMaterial: zod_12.z.number().min(0).max(0.2).multipleOf(0.000001), costs: zod_12.z.array(zod_12.z.strictObject({ level: zod_12.z.union(u1.map((_) => zod_12.z.literal(_))), spiritStones: zod_12.z.number().int().nonnegative().max(1e8), qi: zod_12.z.number().int().nonnegative().max(1e6), quantity: zod_12.z.number().int().min(1).max(5), rank: zod_12.z.enum(official_chunk_thhss9s9_js_1.Lf) })).length(9) }) });
function k3(_, j) {
    let P = eq.superRefine(($, V) => {
        let X = (Q, J) => V.addIssue({ code: "custom", path: Q, message: J }), Z = $.generation.essenceCountProbabilities.reduce((Q, J) => Q + J, 0);
        if (Math.abs(Z - 1) > 0.000000000001)
            X(["generation", "essenceCountProbabilities"], "概率之和必须为 1");
        for (let [Q, J] of [["essencePool", j.essences], ["artPool", j.arts]]) {
            let Y = $.generation[Q];
            Y.forEach((G, h) => {
                if (Y.indexOf(G) !== h)
                    X(["generation", Q, h], `ID 重复：${G}`);
                if (!J.some((K) => K.id === G))
                    X(["generation", Q, h], `引用不存在：${G}`);
            });
            let O = Q === "artPool" ? $.generation.artChance > 0 ? 1 : 0 : $.generation.essenceCountProbabilities[2] > 0 ? 2 : $.generation.essenceCountProbabilities[1] > 0 ? 1 : 0;
            for (let G of $0)
                if (J.filter((h) => Y.includes(h.id) && (!h.allowedSlots || h.allowedSlots.includes(G))).length < O)
                    X(["generation", Q], `${G} 可用内容不足 ${O} 个，无法满足配置概率`);
        }
        let W = new Set;
        $.forging.costs.forEach((Q, J) => {
            if (W.has(Q.level))
                X(["forging", "costs", J, "level"], `器阶重复：${Q.level}`);
            W.add(Q.level);
        });
    }).safeParse(_);
    if (P.success)
        return P.data;
    throw Error(P.error.issues.map(($) => `equipment-forging.json ${$.path.join(".")}: ${$.message}`).join(`
`));
}
var o3 = { $schema: "./equipment-special.schema.json", formatVersion: 1, contentRevision: 6, essences: [{ id: "dao_equipment.essence.cangfeng", name: "藏锋", stackPolicy: "stack", effect: { type: "panelAdd", attribute: "critRate", value: 0.01 }, description: "器中锋芒凝聚，物理暴击概率提高{valuePercent}%。" }, { id: "dao_equipment.essence.ningshen", name: "凝神", stackPolicy: "stack", effect: { type: "panelAdd", attribute: "spellCritRate", value: 0.01 }, description: "器中锋芒凝聚，法术暴击概率提高{valuePercent}%。" }, { id: "dao_equipment.essence.pojin", name: "破禁", stackPolicy: "stack", effect: { type: "sealChance", side: "hit", value: 0.01 }, description: "器蕴护持神识，封禁命中概率提高{valuePercent}%。" }, { id: "dao_equipment.essence.dinghun", name: "定魂", stackPolicy: "stack", effect: { type: "sealChance", side: "resist", value: 0.01 }, description: "器蕴护持神识，受到封禁时命中概率降低{valuePercent}%。" }, { id: "dao_equipment.essence.qingling", name: "轻灵", stackPolicy: "unique", effect: { type: "requiredStageOffset", value: -1 }, description: "法宝灵性通明，御使此宝可提前{valueAbs}个小境界，最低为炼气初期；不改变炼制门槛。" }, { id: "dao_equipment.essence.jiangang", name: "激昂", stackPolicy: "highest", effect: { type: "rageGain", factor: 1.25 }, allowedSlots: ["belt"], description: "受创时器灵激荡，所得战意提升至原来的{factorPercent}%。" }, { id: "dao_equipment.essence.guiyuan", name: "归元", stackPolicy: "highest", effect: { type: "rageCost", factor: 0.8 }, allowedSlots: ["belt"], description: "器中灵机归一，施展器诀仅需原本{factorPercent}%的战意。" }, { id: "dao_equipment.essence.zhenyue", name: "镇岳", description: "器蕴如山镇身，受到物理攻击时暴击概率降低{valuePercent}%。", stackPolicy: "stack", effect: { type: "antiCrit", kind: "physical", value: 0.01 } }, { id: "dao_equipment.essence.shouxin", name: "守心", description: "器灵守护心神，受到法术攻击时暴击概率降低{valuePercent}%。", stackPolicy: "stack", effect: { type: "antiCrit", kind: "spell", value: 0.01 } }, { id: "dao_equipment.essence.pojia", name: "破甲", description: "锋芒穿透护体之力，物理攻击忽视目标{valuePercent}%物防。", stackPolicy: "stack", effect: { type: "defenseIgnore", kind: "physical", value: 0.02 } }, { id: "dao_equipment.essence.chuanxuan", name: "穿玄", description: "灵机洞穿玄障，法术攻击忽视目标{valuePercent}%法防。", stackPolicy: "stack", effect: { type: "defenseIgnore", kind: "spell", value: 0.02 } }, { id: "dao_equipment.essence.chengnian", name: "澄念", description: "器灵澄澈念头，施法时有{chancePercent}%概率免耗本次法力；仍须满足施法所需法力。", stackPolicy: "unique", effect: { type: "mpWaiver", chance: 0.15 }, allowedSlots: ["necklace"] }, { id: "dao_equipment.essence.huichun", name: "回春", description: "器中生机温养道身，每回合结束恢复境界映射等级×{levelRatio}的气血，向下取整；倒地无效，同名不叠加。", stackPolicy: "unique", effect: { type: "regeneration", levelRatio: 0.5 } }, { id: "dao_equipment.essence.huming", name: "护命", description: "命火将熄时，器灵有{chancePercent}%概率护主复起，恢复气血上限的{hpRatioPercent}%；受禁复活之法压制时无效。", stackPolicy: "unique", effect: { type: "revival", chance: 0.2, hpRatio: 0.3 }, allowedSlots: ["weapon"] }], arts: [{ id: "dao_equipment.art.huiyuan", name: "回元诀", skillId: "dao_equipment.skill.huiyuan", rageCost: 30, target: "ally", effect: { type: "heal", ratio: 0.2 }, description: "法宝温养生机，为己方单体恢复最大气血的{ratioPercent}%；受减疗与伤势上限约束，不修复伤势。" }, { id: "dao_equipment.art.yangyuan", name: "养元诀", skillId: "dao_equipment.skill.yangyuan", rageCost: 60, target: "ally", effect: { type: "heal", ratio: 0.3 }, description: "法宝温养生机，为己方单体恢复最大气血的{ratioPercent}%；受减疗与伤势上限约束，不修复伤势。" }, { id: "dao_equipment.art.xuming", name: "续命诀", skillId: "dao_equipment.skill.xuming", rageCost: 90, target: "ally", effect: { type: "heal", ratio: 0.4 }, description: "法宝温养生机，为己方单体恢复最大气血的{ratioPercent}%；受减疗与伤势上限约束，不修复伤势。" }, { id: "dao_equipment.art.baoyuan", name: "抱元诀", skillId: "dao_equipment.skill.baoyuan", rageCost: 60, target: "self", effect: { type: "heal", ratio: 0.4 }, description: "法宝温养生机，为自身恢复最大气血的{ratioPercent}%；受减疗与伤势上限约束，不修复伤势。" }, { id: "dao_equipment.art.guizhen", name: "归真诀", skillId: "dao_equipment.skill.guizhen", rageCost: 130, target: "self", effect: { type: "heal", ratio: 0.6 }, description: "法宝温养生机，为自身恢复最大气血的{ratioPercent}%；受减疗与伤势上限约束，不修复伤势。" }, { id: "dao_equipment.art.huanhun", name: "还魂诀", skillId: "dao_equipment.skill.huanhun", rageCost: 80, target: "ally", effect: { type: "revive", hpRatio: 0.2 }, description: "引命火归身，复起己方单体并恢复最大气血的{hpRatioPercent}%；受禁复活、减疗与伤势上限约束。" }, { id: "dao_equipment.art.qingxin", name: "清心诀", skillId: "dao_equipment.skill.qingxin", rageCost: 50, target: "ally", effect: { type: "cleanse", kinds: ["lingxiao.confuse", "jiujie.control.suppress", "jiujie.control.confuse", "jiujie.control.million_weapons", "tianyan.status.seal", "combat.training.status.control"], healRatio: 0 }, description: "澄明灵台，解除己方单体的可解除控制，不解除反噬休息、毒、减益或禁复活。" }, { id: "dao_equipment.art.dichen", name: "涤尘诀", skillId: "dao_equipment.skill.dichen", rageCost: 100, target: "ally", effect: { type: "cleanse", kinds: ["lingxiao.confuse", "jiujie.control.suppress", "jiujie.control.confuse", "jiujie.control.million_weapons", "tianyan.status.seal", "combat.training.status.control"], healRatio: 0.25 }, description: "澄明灵台，解除己方单体的可解除控制，不解除反噬休息、毒、减益或禁复活。随后恢复最大气血的{healRatioPercent}%，受减疗与伤势上限约束。" }, { id: "dao_equipment.art.taiqing", name: "太清诀", skillId: "dao_equipment.skill.taiqing", rageCost: 125, target: "allies", effect: { type: "cleanse", kinds: ["lingxiao.confuse", "jiujie.control.suppress", "jiujie.control.confuse", "jiujie.control.million_weapons", "tianyan.status.seal", "combat.training.status.control"], healRatio: 0 }, description: "澄明灵台，解除己方全体在场单位的可解除控制，不解除反噬休息、毒、减益或禁复活。" }, { id: "dao_equipment.art.chengtian", name: "澄天诀", skillId: "dao_equipment.skill.chengtian", rageCost: 150, target: "allies", effect: { type: "cleanse", kinds: ["lingxiao.confuse", "jiujie.control.suppress", "jiujie.control.confuse", "jiujie.control.million_weapons", "tianyan.status.seal", "combat.training.status.control"], healRatio: 0.15 }, description: "澄明灵台，解除己方全体在场单位的可解除控制，不解除反噬休息、毒、减益或禁复活。随后恢复最大气血的{healRatioPercent}%，受减疗与伤势上限约束。" }, { id: "dao_equipment.art.cuozhi", name: "一念成空", skillId: "dao_equipment.skill.cuozhi", rageCost: 40, target: "enemy", effect: { type: "rageDamage", amount: 70 }, description: "器意摄心，削减敌方单体{amount}点战意，最低降至0。" }, { id: "dao_equipment.art.hanyue", name: "巨力术", skillId: "dao_equipment.skill.hanyue", rageCost: 40, target: "ally", effect: { type: "status", statusId: "dao_equipment.status.hanyue", group: "dao_equipment.art.physical_up", modifier: "physicalDealt", ratio: 0.15, duration: "battle" }, description: "法宝结印，使己方单体造成的物理伤害结果提高{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.hanyueyin", name: "天罡助威", skillId: "dao_equipment.skill.hanyueyin", rageCost: 60, target: "allies", effect: { type: "status", statusId: "dao_equipment.status.hanyueyin", group: "dao_equipment.art.physical_up", modifier: "physicalDealt", ratio: 0.1, duration: "battle" }, description: "法宝结印，使己方全体在场单位造成的物理伤害结果提高{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.huti", name: "金甲术", skillId: "dao_equipment.skill.huti", rageCost: 40, target: "ally", effect: { type: "status", statusId: "dao_equipment.status.huti", group: "dao_equipment.art.physical_guard", modifier: "physicalTaken", ratio: -0.12, duration: "battle" }, description: "法宝结印，使己方单体受到的物理伤害结果降低{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.hutiyin", name: "金鳞护阵", skillId: "dao_equipment.skill.hutiyin", rageCost: 60, target: "allies", effect: { type: "status", statusId: "dao_equipment.status.hutiyin", group: "dao_equipment.art.physical_guard", modifier: "physicalTaken", ratio: -0.08, duration: "battle" }, description: "法宝结印，使己方全体在场单位受到的物理伤害结果降低{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.lianfeng", name: "镇岳印", skillId: "dao_equipment.skill.lianfeng", rageCost: 30, target: "enemy", effect: { type: "status", statusId: "dao_equipment.status.lianfeng", group: "dao_equipment.art.physical_down", modifier: "physicalDealt", ratio: -0.15, duration: "battle" }, description: "法宝结印，使敌方单体造成的物理伤害结果降低{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.lianfengyin", name: "消兵化锋", skillId: "dao_equipment.skill.lianfengyin", rageCost: 60, target: "enemies", effect: { type: "status", statusId: "dao_equipment.status.lianfengyin", group: "dao_equipment.art.physical_down", modifier: "physicalDealt", ratio: -0.1, duration: "battle" }, description: "法宝结印，使敌方全体在场单位造成的物理伤害结果降低{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.liejia", name: "裂甲诀", skillId: "dao_equipment.skill.liejia", rageCost: 35, target: "enemy", effect: { type: "status", statusId: "dao_equipment.status.liejia", group: "dao_equipment.art.physical_vulnerable", modifier: "physicalTaken", ratio: 0.12, duration: "battle" }, description: "法宝结印，使敌方单体受到的物理伤害结果提高{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.liejiayin", name: "裂甲术", skillId: "dao_equipment.skill.liejiayin", rageCost: 60, target: "enemies", effect: { type: "status", statusId: "dao_equipment.status.liejiayin", group: "dao_equipment.art.physical_vulnerable", modifier: "physicalTaken", ratio: 0.08, duration: "battle" }, description: "法宝结印，使敌方全体在场单位受到的物理伤害结果提高{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.xuanling", name: "两仪化法", skillId: "dao_equipment.skill.xuanling", rageCost: 60, target: "ally", effect: { type: "status", statusId: "dao_equipment.status.xuanling", group: "dao_equipment.art.spell_guard", modifier: "spellTaken", ratio: -0.5, duration: 5 }, description: "法宝结印，使己方单体受到的法术伤害结果降低{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.xuantian", name: "青莲庇世", skillId: "dao_equipment.skill.xuantian", rageCost: 150, target: "allies", effect: { type: "status", statusId: "dao_equipment.status.xuantian", group: "dao_equipment.art.spell_guard", modifier: "spellTaken", ratio: -0.5, duration: 3 }, description: "法宝结印，使己方全体在场单位受到的法术伤害结果降低{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.fuying", name: "凝滞术", skillId: "dao_equipment.skill.fuying", rageCost: 40, target: "enemy", effect: { type: "status", statusId: "dao_equipment.status.fuying", group: "dao_equipment.art.speed_down", modifier: "speed", ratio: -0.1, duration: "battle" }, description: "法宝结印，使敌方单体速度降低{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.fuyingyin", name: "元磁重域", skillId: "dao_equipment.skill.fuyingyin", rageCost: 60, target: "enemies", effect: { type: "status", statusId: "dao_equipment.status.fuyingyin", group: "dao_equipment.art.speed_down", modifier: "speed", ratio: -0.05, duration: "battle" }, description: "法宝结印，使敌方全体在场单位速度降低{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.yufeng", name: "御风诀", skillId: "dao_equipment.skill.yufeng", rageCost: 40, target: "ally", effect: { type: "status", statusId: "dao_equipment.status.yufeng", group: "dao_equipment.art.speed_up", modifier: "speed", ratio: 0.1, duration: "battle" }, description: "法宝结印，使己方单体速度提高{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.yufengyin", name: "御风术", skillId: "dao_equipment.skill.yufengyin", rageCost: 60, target: "allies", effect: { type: "status", statusId: "dao_equipment.status.yufengyin", group: "dao_equipment.art.speed_up", modifier: "speed", ratio: 0.05, duration: "battle" }, description: "法宝结印，使己方全体在场单位速度提高{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.lingyan", name: "青冥一气", skillId: "dao_equipment.skill.lingyan", rageCost: 40, target: "ally", effect: { type: "status", statusId: "dao_equipment.status.lingyan", group: "dao_equipment.art.spell_up", modifier: "spellDealt", ratio: 0.1, duration: "battle" }, description: "法宝结印，使己方单体造成的法术伤害结果提高{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.jifa", name: "抑灵咒", skillId: "dao_equipment.skill.jifa", rageCost: 30, target: "enemy", effect: { type: "status", statusId: "dao_equipment.status.jifa", group: "dao_equipment.art.spell_down", modifier: "spellDealt", ratio: -0.1, duration: "battle" }, description: "法宝结印，使敌方单体造成的法术伤害结果降低{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.kurong", name: "蚀灵咒", skillId: "dao_equipment.skill.kurong", rageCost: 125, target: "enemies", effect: { type: "status", statusId: "dao_equipment.status.kurong", group: "dao_equipment.art.healing_down", modifier: "healTaken", ratio: -0.5, duration: 3 }, description: "法宝结印，使敌方全体在场单位受到的治疗降低{ratioPercent}%，{term}。同类取强，不叠加。" }, { id: "dao_equipment.art.diefeng", name: "双剑合璧", skillId: "dao_equipment.skill.diefeng", rageCost: 80, target: "enemy", effect: { type: "attack", kind: "physical", resultFactors: [1, 1] }, description: "器锋叠起，对敌方单体连续{hits}次物理攻击，每段伤害结果依次为{segments}；目标倒地则停止，不转移目标。" }, { id: "dao_equipment.art.sandie", name: "三叠仙音", skillId: "dao_equipment.skill.sandie", rageCost: 60, target: "enemy", effect: { type: "attack", kind: "spell", resultFactors: [0.3, 0.5, 1] }, description: "法宝鸣动三叠仙音，对敌方单体连续{hits}次法术攻击，每段伤害结果依次为{segments}；目标倒地则停止，不转移目标。" }, { id: "dao_equipment.art.juling", name: "聚灵诀", skillId: "dao_equipment.skill.juling", rageCost: 60, target: "self", effect: { type: "restoreMp", ratio: 0.1, casterLevelFactor: 3 }, description: "法宝聚拢灵息，为自身恢复最大法力的{ratioPercent}%加自身境界映射等级×{casterLevelFactor}点法力，不超过法力上限。" }, { id: "dao_equipment.art.wanxiang", name: "万象归灵", skillId: "dao_equipment.skill.wanxiang", rageCost: 150, target: "allies", effect: { type: "restoreMp", ratio: 0.1, casterLevelFactor: 1, capPerLevel: 10 }, description: "灵息遍照己方全体在场单位，每位恢复其最大法力的{ratioPercent}%加施法者境界映射等级×{casterLevelFactor}点法力；每位至多恢复其境界映射等级×{capPerLevel}点。" }, { id: "dao_equipment.art.zebei", name: "玉露回春", skillId: "dao_equipment.skill.zebei", rageCost: 135, target: "allies", effect: { type: "heal", ratio: 0.25, capPerLevel: 12 }, description: "生机泽被己方全体在场单位，每位恢复最大气血的{ratioPercent}%，基础回复不超过目标境界映射等级×{capPerLevel}；受减疗、禁止回复与伤势上限约束，不修复伤势。" }, { id: "dao_equipment.art.niming", name: "逆命诀", skillId: "dao_equipment.skill.niming", rageCost: 120, target: "ally", effect: { type: "revive", hpRatio: 0.5, capPerLevel: 20 }, description: "牵引命火，复起己方单体并恢复最大气血的{hpRatioPercent}%，基础回复不超过目标境界映射等级×{capPerLevel}；受禁复活、禁止回复、减疗与伤势上限约束。" }, { id: "dao_equipment.art.due", name: "渡厄归生", skillId: "dao_equipment.skill.due", rageCost: 150, target: "allies", effect: { type: "massRevive", hpRatio: 1, remainingHpRatio: 0.1, remainingMpRatio: 0 }, description: "复起己方全部在场倒地单位，按最大气血的{hpRatioPercent}%恢复，受减疗与伤势上限约束；跳过禁复活或禁止回复者，不治疗存活队友。自身气血须高于上限的{remainingHpRatioPercent}%，发动后降至该比例，法力降至上限的{remainingMpRatioPercent}%。无可复活目标时不发动，不扣战意或自损。" }, { id: "dao_equipment.art.dongxu", name: "洞金指", skillId: "dao_equipment.skill.dongxu", rageCost: 50, target: "enemy", effect: { type: "attack", kind: "physical", resultFactors: [1], defenseIgnore: 0.3 }, description: "洞穿护体，对敌方单体进行{hits}次物理攻击，忽视目标{defenseIgnorePercent}%物防。不附加重伤。" }, { id: "dao_equipment.art.cuiling", name: "摧灵斩", skillId: "dao_equipment.skill.cuiling", rageCost: 80, target: "enemy", effect: { type: "attack", kind: "physical", resultFactors: [1], mpDamageRatio: 1 }, description: "器锋摧灵，对敌方单体进行{hits}次物理攻击，并按本次实际气血损失的{mpDamageRatioPercent}%削减其法力；护盾吸收与溢出伤害不计，法力最低降至0。" }, { id: "dao_equipment.art.dangchen", name: "荡尘咒", skillId: "dao_equipment.skill.dangchen", rageCost: 125, target: "enemies", effect: { type: "dispelBuff", chance: 0.8, artChance: 0.2 }, description: "涤荡敌方全体在场单位的可驱散增益，每条独立判定：普通增益{chancePercent}%概率、器诀增益{artChancePercent}%概率移除。不影响被动与不可驱散状态。" }], rageResource: { name: "战意", initial: 0, maximum: 150 }, rageGain: { damagePercentScale: 100 } };
var l3 = { spellFluctuationMin: 0.95, spellFluctuationMax: 1.05, physicalFluctuationMin: 0.9, physicalFluctuationMax: 1.1, critMultiplier: 2, physicalFuryAtkMultiplier: 1.5, defendPhysicalFactor: 0.5, physicalCoefficient: 1.3, playerSpellAttackScale: 1.7, unbrokenDefRatio: 0.9, unbrokenAtkRatio: 0.1, cultivateRate: 0.02, cultivateFlat: 5, damageCultivateDiffMin: -20, damageCultivateDiffMax: 20, hitChanceFloor: 0.45, hitChanceCeil: 1, hitChanceBase: 0.5, hitChanceScale: 200, physicalHitBaselineGap: 80, physicalHitScalePerLevel: 4, sealChanceFloor: 0.2, sealChanceCeil: 0.95, sealChanceBase: 0.55, sealSoftFloorStart: 30, sealSoftCeilStart: 75, sealLevelWeight: 1, sealCultivateWeight: 18, sealCultivateScale: 15, sealPointScalePerLevel: 4, fleeChanceFloor: 0.1, fleeChanceCeil: 0.9, fleeChanceBase: 0.4, minDamage: 1, maxRounds: 150 };
exports.pc = l3;
var J0 = "combat.resource.rage";
exports.qc = J0;
var g_ = { Base: "dao_equipment.passive.rage_gain", Excited: "dao_equipment.passive.rage_gain_excited" };
function x3(_) {
    let { effect: j, ...q } = _, P = {};
    for (let [X, Z] of Object.entries(j)) {
        if (typeof Z !== "number")
            continue;
        P[X] = Z, P[`${X}Abs`] = Math.abs(Z), P[`${X}Percent`] = Number((Z * 100).toFixed(6));
    }
    let $ = { ...q, description: _.description.replace(/\{(\w+)\}/g, (X, Z) => {
            if (!(Z in P))
                throw Error(`${_.id}: 未知文案参数 ${Z}`);
            return String(P[Z]);
        }) }, V = { id: `${_.id}.passive`, name: _.name, tags: [official_chunk_thhss9s9_js_1.$e.Passive], targeting: { side: official_chunk_thhss9s9_js_1.af.Self }, effects: [] };
    switch (j.type) {
        case "panelAdd": return { ...$, panel: [{ attr: j.attribute, mode: "add", value: j.value }] };
        case "requiredStageOffset": return { ...$, requiredStageOffset: j.value };
        case "sealChance": return { ...$, panel: [{ attr: j.side === "hit" ? "sealHit" : "sealResist", mode: "add", value: j.value * l3.hitChanceScale }] };
        case "antiCrit":
        case "defenseIgnore": return { ...$, passive: { ...V, hooks: [{ on: j.type === "antiCrit" ? official_chunk_thhss9s9_js_1.ef.OnCritRoll : official_chunk_thhss9s9_js_1.ef.OnDefenseIgnoreCalc, ...j.type === "antiCrit" ? { targetIsSelf: !0 } : { sourceIsSelf: !0 }, requireKind: j.kind === "physical" ? official_chunk_thhss9s9_js_1.Ye.Physical : official_chunk_thhss9s9_js_1.Ye.Spell, effects: [{ type: j.type === "antiCrit" ? official_chunk_thhss9s9_js_1.lf.ModifyChance : official_chunk_thhss9s9_js_1.lf.ModifyDefenseIgnore, add: j.type === "antiCrit" ? -j.value : j.value }] }] } };
        case "mpWaiver": return { ...$, passive: { ...V, innate: { mpCostWaiverChance: j.chance } } };
        case "regeneration": return { ...$, passive: { ...V, hooks: [{ on: official_chunk_thhss9s9_js_1.ef.OnRoundEnd, aim: official_chunk_thhss9s9_js_1.ff.Self, when: { sourceStanding: !0 }, effects: [{ type: official_chunk_thhss9s9_js_1.lf.RestoreHp, power: `floor(source.level * ${j.levelRatio})` }] }] } };
        case "revival": return { ...$, passive: { ...V, hooks: [{ on: official_chunk_thhss9s9_js_1.ef.OnFatal, targetIsSelf: !0, aim: official_chunk_thhss9s9_js_1.ff.Self, when: { sourceHpRatioBelow: 0.000001 }, chance: j.chance, effects: [{ type: official_chunk_thhss9s9_js_1.lf.Revive, hpRatio: j.hpRatio }] }] } };
        case "rageGain": return { ...$, resourceGainFactors: { [J0]: j.factor } };
        case "rageCost": return { ...$, resourceCostFactors: { [J0]: j.factor } };
    }
}
function f3(_) {
    let { effect: j } = _, q = {};
    for (let [W, Q] of Object.entries(j))
        if (typeof Q === "number")
            q[W] = Q, q[`${W}Percent`] = Number((Math.abs(Q) * 100).toFixed(6));
    if (j.type === "attack")
        q.hits = j.resultFactors.length;
    if (j.type === "attack")
        q.segments = j.resultFactors.map((W) => `${Number((W * 100).toFixed(6))}%`).join("、");
    if (j.type === "status")
        q.term = j.duration === "battle" ? "持续至战斗结束，倒地清除" : `持续${j.duration}回合（含施放回合）`;
    let P = _.description.replace(/\{(\w+)\}/g, (W, Q) => {
        if (!(Q in q))
            throw Error(`${_.id}: 未知文案参数 ${Q}`);
        return String(q[Q]);
    }), $ = _.target === "self" ? official_chunk_thhss9s9_js_1.af.Self : ["ally", "allies"].includes(_.target) ? official_chunk_thhss9s9_js_1.af.Ally : official_chunk_thhss9s9_js_1.af.Enemy, V = { id: _.skillId, name: _.name, resourceCosts: [{ resourceId: J0, amount: _.rageCost }], tags: [official_chunk_thhss9s9_js_1.$e.Art, official_chunk_thhss9s9_js_1.$e.Support], targeting: { side: $, ...["allies", "enemies"].includes(_.target) ? { mode: official_chunk_thhss9s9_js_1.bf.All } : { count: 1 } }, effects: [] }, X, Z = (W, Q) => Q === void 0 ? W : `min(${W}, target.level * ${Q})`;
    switch (j.type) {
        case "heal":
            V.effects = [{ type: official_chunk_thhss9s9_js_1.lf.Heal, power: Z(`target.maxHp * ${j.ratio}`, j.capPerLevel), fixedBase: !0 }];
            break;
        case "revive":
            V.targeting.includeDowned = !0, V.targeting.includeDead = !0, V.targeting.onlyDowned = !0, V.effects = [{ type: official_chunk_thhss9s9_js_1.lf.Revive, ...j.capPerLevel === void 0 ? { hpRatio: j.hpRatio } : { hp: Z(`target.maxHp * ${j.hpRatio}`, j.capPerLevel) }, respectHealTaken: !0 }];
            break;
        case "restoreMp":
            V.effects = [{ type: official_chunk_thhss9s9_js_1.lf.RestoreMp, power: Z(`target.maxMp * ${j.ratio} + source.level * ${j.casterLevelFactor}`, j.capPerLevel) }];
            break;
        case "massRevive":
            V.targeting = { ...V.targeting, includeDowned: !0, includeDead: !0, onlyDowned: !0, requireRevivable: !0 }, V.requireHpAboveRatio = j.remainingHpRatio, V.effects = [{ type: official_chunk_thhss9s9_js_1.lf.Revive, hpRatio: j.hpRatio, respectHealTaken: !0 }], V.successCostHp = `source.hp - floor(source.maxHp * ${j.remainingHpRatio})`, V.successCostMp = `source.mp - floor(source.maxMp * ${j.remainingMpRatio})`;
            break;
        case "dispelBuff":
            V.effects = [{ type: official_chunk_thhss9s9_js_1.lf.Dispel, categories: [official_chunk_thhss9s9_js_1.df.Buff], chance: j.chance, chanceByClass: { art: j.artChance } }];
            break;
        case "cleanse":
            if (V.effects = [{ type: official_chunk_thhss9s9_js_1.lf.Dispel, kinds: j.kinds, excludeStatusFlags: ["blocksRevive"] }], j.healRatio > 0)
                V.effects.push({ type: official_chunk_thhss9s9_js_1.lf.Heal, power: `target.maxHp * ${j.healRatio}`, fixedBase: !0 });
            break;
        case "rageDamage":
            V.effects = [{ type: official_chunk_thhss9s9_js_1.lf.ModifyResource, resourceId: J0, amount: -j.amount, affectTarget: !0 }];
            break;
        case "status": {
            let W = {}, Q = Number((1 + j.ratio).toFixed(6));
            switch (j.modifier) {
                case "physicalDealt":
                    W.damageDealtPhysical = Q;
                    break;
                case "spellDealt":
                    W.damageDealtSpell = Q;
                    break;
                case "physicalTaken":
                    W.damageTakenPhysical = Q;
                    break;
                case "spellTaken":
                    W.damageTakenSpell = Q;
                    break;
                case "healTaken":
                    W.healTaken = Q;
                    break;
                case "speed":
                    W.speedMod = `floor(target.speed * ${j.ratio})`;
                    break;
            }
            X = [{ id: j.statusId, name: _.name, kind: j.group, category: $ === official_chunk_thhss9s9_js_1.af.Enemy ? official_chunk_thhss9s9_js_1.df.Debuff : official_chunk_thhss9s9_js_1.df.Buff, dispelClass: "art", priority: Math.abs(j.ratio), untilBattleEnd: j.duration === "battle", expireSameRound: !0, extendable: !1, ...W }], V.effects = [{ type: official_chunk_thhss9s9_js_1.lf.ApplyStatus, statusId: j.statusId, duration: j.duration === "battle" ? 1 : j.duration }];
            break;
        }
        case "attack":
            V.tags = [official_chunk_thhss9s9_js_1.$e.Art, j.kind === "physical" ? official_chunk_thhss9s9_js_1.$e.Physical : official_chunk_thhss9s9_js_1.$e.Spell], V.effects = [{ type: j.kind === "physical" ? official_chunk_thhss9s9_js_1.lf.PhysicalHit : official_chunk_thhss9s9_js_1.lf.SpellHit, hits: j.resultFactors.length, resultFactors: j.resultFactors, ...j.defenseIgnore === void 0 ? {} : { defenseIgnore: j.defenseIgnore }, ...j.kind === "physical" && j.mpDamageRatio !== void 0 ? { mpDamageRatio: j.mpDamageRatio } : {} }];
            break;
    }
    return { id: _.id, name: _.name, description: P, ..._.allowedSlots ? { allowedSlots: _.allowedSlots } : {}, rageCost: _.rageCost, skill: V, ...X ? { statusDefs: X } : {} };
}
function u3(_, j) { let q = _ > 1; return { id: q ? g_.Excited : g_.Base, name: q ? "激昂战意" : "战意积蓄", tags: [official_chunk_thhss9s9_js_1.$e.Passive], targeting: { side: official_chunk_thhss9s9_js_1.af.Self }, effects: [], hooks: [{ on: official_chunk_thhss9s9_js_1.ef.OnBeHit, targetIsSelf: !0, aim: official_chunk_thhss9s9_js_1.ff.Self, effects: [{ type: official_chunk_thhss9s9_js_1.lf.ModifyResource, resourceId: J0, amount: `min(100, floor(floor(hpDamage / target.maxHp * ${j.damagePercentScale}) * ${_}))` }] }] }; }
const zod_13 = require("./zod.js");
var c = zod_13.z.number().min(0).max(1).multipleOf(0.000001), q1 = zod_13.z.number().positive().max(1e6).multipleOf(0.000001), P1 = zod_13.z.string().trim().min(1), n3 = zod_13.z.array(zod_13.z.enum($0)).min(1).optional(), _4 = zod_13.z.discriminatedUnion("type", [zod_13.z.strictObject({ type: zod_13.z.literal("panelAdd"), attribute: zod_13.z.enum(["physicalAtk", "physicalDef", "magicAtk", "magicDef", "maxHp", "maxMp", "healPower", "speed", "hit", "dodge", "critRate", "spellCritRate", "physicalFuryRate", "sealHit", "sealResist"]), value: zod_13.z.number().min(-1e6).max(1e6) }), zod_13.z.strictObject({ type: zod_13.z.literal("requiredStageOffset"), value: zod_13.z.number().int().min(-1).max(0) }), zod_13.z.strictObject({ type: zod_13.z.literal("rageGain"), factor: zod_13.z.number().min(1).max(100).multipleOf(0.000001) }), zod_13.z.strictObject({ type: zod_13.z.literal("rageCost"), factor: c.positive() }), zod_13.z.strictObject({ type: zod_13.z.literal("sealChance"), side: zod_13.z.enum(["hit", "resist"]), value: c }), zod_13.z.strictObject({ type: zod_13.z.literal("antiCrit"), kind: zod_13.z.enum(["physical", "spell"]), value: c }), zod_13.z.strictObject({ type: zod_13.z.literal("defenseIgnore"), kind: zod_13.z.enum(["physical", "spell"]), value: c }), zod_13.z.strictObject({ type: zod_13.z.literal("mpWaiver"), chance: c }), zod_13.z.strictObject({ type: zod_13.z.literal("regeneration"), levelRatio: c }), zod_13.z.strictObject({ type: zod_13.z.literal("revival"), chance: c, hpRatio: c.positive() })]), j4 = zod_13.z.discriminatedUnion("type", [zod_13.z.strictObject({ type: zod_13.z.literal("heal"), ratio: c, capPerLevel: q1.optional() }), zod_13.z.strictObject({ type: zod_13.z.literal("revive"), hpRatio: c.positive(), capPerLevel: q1.optional() }), zod_13.z.strictObject({ type: zod_13.z.literal("cleanse"), kinds: zod_13.z.array(P1).min(1), healRatio: c }), zod_13.z.strictObject({ type: zod_13.z.literal("rageDamage"), amount: q1.int() }), zod_13.z.strictObject({ type: zod_13.z.literal("status"), statusId: zod_13.z.string().regex(/^dao_equipment\.status\.[a-z][a-z0-9_]*$/), group: P1, modifier: zod_13.z.enum(["physicalDealt", "spellDealt", "physicalTaken", "spellTaken", "speed", "healTaken"]), ratio: zod_13.z.number().min(-1).max(1).multipleOf(0.000001), duration: zod_13.z.union([zod_13.z.literal("battle"), zod_13.z.number().int().min(1).max(99)]) }), zod_13.z.strictObject({ type: zod_13.z.literal("restoreMp"), ratio: c, casterLevelFactor: q1, capPerLevel: q1.optional() }), zod_13.z.strictObject({ type: zod_13.z.literal("massRevive"), hpRatio: c.positive(), remainingHpRatio: c.positive(), remainingMpRatio: c }), zod_13.z.strictObject({ type: zod_13.z.literal("dispelBuff"), chance: c, artChance: c }), zod_13.z.strictObject({ type: zod_13.z.literal("attack"), kind: zod_13.z.enum(["physical", "spell"]), resultFactors: zod_13.z.array(c.positive()).min(1).max(10), defenseIgnore: c.optional(), mpDamageRatio: q1.optional() })]), q4 = zod_13.z.strictObject({ $schema: zod_13.z.string().optional(), formatVersion: zod_13.z.literal(1), contentRevision: zod_13.z.number().int().positive(), essences: zod_13.z.array(zod_13.z.strictObject({ id: zod_13.z.string().regex(/^dao_equipment\.essence\.[a-z][a-z0-9_]*$/), name: P1, description: P1, allowedSlots: n3, stackPolicy: zod_13.z.enum(["stack", "unique", "highest"]), conflictGroup: P1.optional(), effect: _4 })).min(1), arts: zod_13.z.array(zod_13.z.strictObject({ id: zod_13.z.string().regex(/^dao_equipment\.art\.[a-z][a-z0-9_]*$/), name: P1, allowedSlots: n3, skillId: zod_13.z.string().regex(/^dao_equipment\.skill\.[a-z][a-z0-9_]*$/), description: P1, target: zod_13.z.enum(["self", "ally", "allies", "enemy", "enemies"]), rageCost: zod_13.z.number().int().min(0).max(1e6), effect: j4 })).min(1), rageResource: zod_13.z.strictObject({ name: P1, initial: zod_13.z.number().int().nonnegative(), maximum: q1.int() }), rageGain: zod_13.z.strictObject({ damagePercentScale: q1 }) }), P4 = q4.superRefine((_, j) => {
    let q = new Set, P = ($, V) => {
        if (q.has($))
            j.addIssue({ code: "custom", path: V, message: `ID 重复：${$}` });
        q.add($);
    };
    for (let $ of ["essences", "arts"])
        _[$].forEach((V, X) => {
            if (P(V.id, [$, X, "id"]), V.allowedSlots && new Set(V.allowedSlots).size !== V.allowedSlots.length)
                j.addIssue({ code: "custom", path: [$, X, "allowedSlots"], message: "部位不得重复" });
        });
    if (_.arts.forEach(($, V) => {
        if (P($.skillId, ["arts", V, "skillId"]), $.effect.type === "status")
            P($.effect.statusId, ["arts", V, "effect", "statusId"]);
        if ($.effect.type === "cleanse" && new Set($.effect.kinds).size !== $.effect.kinds.length)
            j.addIssue({ code: "custom", path: ["arts", V, "effect", "kinds"], message: "解控类别不得重复" });
        let X = ["self", "ally", "allies"].includes($.target);
        if (["heal", "revive", "cleanse", "restoreMp", "massRevive"].includes($.effect.type) && !X || ["rageDamage", "attack"].includes($.effect.type) && $.target !== "enemy" || $.effect.type === "revive" && $.target !== "ally" || $.effect.type === "massRevive" && $.target !== "allies" || $.effect.type === "dispelBuff" && $.target !== "enemies" || $.effect.type === "attack" && $.effect.mpDamageRatio !== void 0 && $.effect.kind !== "physical")
            j.addIssue({ code: "custom", path: ["arts", V, "target"], message: "效果与目标范围不匹配" });
    }), _.rageResource.initial > _.rageResource.maximum)
        j.addIssue({ code: "custom", path: ["rageResource", "initial"], message: "初始战意不得超过上限" });
});
function a3(_) {
    let j = P4.safeParse(_);
    if (j.success)
        return j.data;
    throw Error(j.error.issues.map((q) => {
        let P = _;
        for (let V of q.path.slice(0, 2))
            P = P && typeof P === "object" ? Reflect.get(P, V) : void 0;
        return `equipment-special.json${P && typeof P === "object" && "id" in P ? ` [${String(P.id)}]` : ""} ${q.path.join(".")}: ${q.message}`;
    }).join(`
`));
}
var z1 = a3(o3), WZ = { id: J0, name: z1.rageResource.name, current: z1.rageResource.initial, max: z1.rageResource.maximum }, $1 = z1.essences.map(x3), u0 = z1.arts.map(f3);
exports.sc = WZ;
exports.tc = u0;
function o2(_) { return u3(_, z1.rageGain); }
var i3 = k3(p3, { essences: $1, arts: u0 }), l2 = i3.generation, BZ = i3.forging;
exports.Zd = BZ;
function $4(_) {
    let [j, q] = l2.essenceCountProbabilities;
    if (_ < j)
        return 0;
    if (_ < j + q)
        return 1;
    return 2;
}
var V4 = { essenceCount: $4, artChance: l2.artChance };
const zod_14 = require("./zod.js");
var x2 = 60, AZ = zod_14.z.string().trim().max(x2 * 2).refine((_) => Array.from(_).length <= x2, `铸器心念不能超过${x2}字`), f2 = zod_14.z.string().regex(/^(?:[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B[\uDFE2\uDFE3\uDFF0-\uDFF6]|[\uD840-\uD868\uD86A-\uD86D\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD88C][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86E[\uDC00-\uDC1E\uDC20-\uDFFF]|\uD873[\uDC00-\uDEAD\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD88D[\uDC00-\uDC79]){2,8}$/, "器名须为2至8个汉字").refine((_) => _.trim() === _, "器名不能含首尾空白"), t1 = zod_14.z.string().regex(/^(?:[ -;=\?-~\xA0-\xAC\xAE-\u05FF\u0606-\u061B\u061D-\u06DC\u06DE-\u070E\u0710-\u088F\u0892-\u08E1\u08E3-\u180D\u180F-\u200A\u2010-\u2027\u202F-\u205F\u2065\u2070-\uD7FF\uE000-\uFEFE\uFF00-\uFFF8\uFFFC-\uFFFF]|[\uD800-\uD803\uD805-\uD80C\uD80E-\uD82E\uD830-\uD833\uD835-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD804[\uDC00-\uDCBC\uDCBE-\uDCCC\uDCCE-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC40-\uDFFF]|\uD82F[\uDC00-\uDC9F\uDCA4-\uDFFF]|\uD834[\uDC00-\uDD72\uDD7B-\uDFFF]|\uDB40[\uDC00\uDC02-\uDC1F\uDC80-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){1,60}$/, "器物描述须为60字以内的单行纯文本").refine((_) => _.trim() === _ && _.length > 0, "描述不能留空或含首尾空白"), p_ = zod_14.z.string().min(1).max(100), CZ = zod_14.z.object({ name: f2, desc: t1 }).strict();
exports._d = x2;
const zod_15 = require("./zod.js");
var s3 = zod_15.z.strictObject({ patternId: zod_15.z.string().min(1), level: zod_15.z.number().int().positive() }).nullable(), u2 = zod_15.z.tuple([s3, s3]), X4 = [{ equipmentLevel: 10, maxLevel: 3 }, { equipmentLevel: 30, maxLevel: 5 }, { equipmentLevel: 50, maxLevel: 7 }, { equipmentLevel: 70, maxLevel: 9 }, { equipmentLevel: 90, maxLevel: 11 }];
function v1(_) { var _a, _g; return (_g = (_a = X4.find((j) => j.equipmentLevel === _)) === null || _a === void 0 ? void 0 : _a.maxLevel) !== null && _g !== void 0 ? _g : 0; }
function o_(_) {
    let j = u2.safeParse(_.formationInscriptions);
    if (!j.success)
        return j.error.issues.map(($) => ({ severity: "error", code: $.path[$.path.length - 1] === "level" ? "FORMATION_INSCRIPTION_LEVEL_INVALID" : "FORMATION_INSCRIPTION_SLOTS_INVALID", message: "阵纹须为固定双孔，空孔为 null，已烙印阵纹等级须为正整数", path: ["formationInscriptions", ...$.path].join(".") }));
    let q = [], P = v1(_.equipmentLevel);
    return j.data.forEach(($, V) => {
        if (!$)
            return;
        let X = j1($.patternId), Z = `formationInscriptions.${V}`;
        if (!X)
            q.push({ severity: "error", code: "UNKNOWN_FORMATION_INSCRIPTION", message: "阵纹不存在", path: `${Z}.patternId` });
        else if (!X.allowedSlots.includes(_.slot))
            q.push({ severity: "error", code: "FORMATION_INSCRIPTION_SLOT_MISMATCH", message: "阵纹不能烙印于该部位", path: `${Z}.patternId` });
        if ($.level > P)
            q.push({ severity: "error", code: "FORMATION_INSCRIPTION_LEVEL_INVALID", message: `该装备每孔阵纹等级上限为 ${P}`, path: `${Z}.level` });
    }), q;
}
function n2(_) {
    var _a, _g;
    let j = new Map;
    for (let q of (_a = _ === null || _ === void 0 ? void 0 : _.formationInscriptions) !== null && _a !== void 0 ? _a : []) {
        if (!q)
            continue;
        let P = j1(q.patternId);
        j.set(P.attr, ((_g = j.get(P.attr)) !== null && _g !== void 0 ? _g : 0) + P.valuePerLevel * q.level);
    }
    return [...j].map(([q, P]) => ({ attr: q, value: P }));
}
var Z4 = ["vitality", "strength", "spirit", "endurance", "speed", "willpower"], W4 = new Set(["physicalAtk", "physicalDef", "magicAtk", "magicDef", "maxHp", "maxMp", "healPower", "speed", "hit", "dodge", "critRate", "spellCritRate", "physicalFuryRate", "sealHit", "sealResist"]), Q4 = new Set(["quality", "rarity", "tierColor", "itemGrade", "powerScore", "equipmentRating", "battleProjection", "SkillDef", "tempering", "formationInscription"]);
function y(_, j, q) { return { severity: "error", code: _, message: j, ...q ? { path: q } : {} }; }
function c3(_, j, q) { return Number.isFinite(_) && Number.isInteger(_) && _ >= j && _ <= q; }
function Y4(_, j) {
    var _a;
    let q = [], P = _, $ = y_(_);
    if ($)
        return [y("INVALID_EQUIPMENT_IDENTITY", $, "weaponType")];
    for (let X of Object.keys(P))
        if (Q4.has(X))
            q.push(y("FORBIDDEN_EQUIPMENT_FIELD", `道装禁止字段 ${X}`, X));
    if (P.schemaVersion !== 1 || _.numericVersion !== 2 || !Number.isFinite(_.baseQuality) || _.baseQuality < 0 || _.baseQuality > 1 || typeof _.id !== "string" || _.id.trim().length === 0 || typeof _.name !== "string" || _.name.trim().length === 0 || _.desc !== void 0 && !t1.safeParse(_.desc).success || _.crafterName !== void 0 && !p_.safeParse(_.crafterName).success || _.element !== void 0 && !official_chunk_thhss9s9_js_1.Df.includes(_.element) || (_.generatorVersion === a1 || _.generatorVersion === i1) && _.element === void 0 || typeof _.createdAt !== "string" || _.createdAt.trim().length === 0 || (!j ? _.generatorVersion !== I1 : _.generatorVersion !== I1 && _.generatorVersion !== S_ && _.generatorVersion !== r2 && _.generatorVersion !== a1 && _.generatorVersion !== i1) || _.appraisalState !== "appraised")
        q.push(y("INVALID_EQUIPMENT_IDENTITY", "道装身份、版本或鉴定状态无效"));
    let V = d_(_.templateId);
    if (!V)
        q.push(y("UNKNOWN_EQUIPMENT_TEMPLATE", "道装模板不存在", "templateId"));
    if (!n1(_.equipmentLevel) || _.requiredLevel !== v_(_.equipmentLevel).requiredLevel)
        q.push(y("INVALID_EQUIPMENT_LEVEL", "道装仅开放至化神期，御使门槛须为对应境界初期"));
    if (V && (_.slot !== V.slot || (_.generatorVersion === r2 || _.generatorVersion === a1 || _.generatorVersion === i1 ? !f2.safeParse(_.name).success : _.name !== V.name)))
        q.push(y("EQUIPMENT_SLOT_MISMATCH", "道装部位或名称无效", "slot"));
    if (!Array.isArray(_.baseStats))
        q.push(y("INVALID_EQUIPMENT_BASE_STAT", "器胚属性必须是数组", "baseStats"));
    else if (V && n1(_.equipmentLevel)) {
        let X = V.baseStats.map((W) => W.attr), Z = _.baseStats.map((W) => W === null || W === void 0 ? void 0 : W.attr);
        if (Z.length !== X.length || new Set(Z).size !== Z.length || Z.some((W) => !X.includes(W)))
            q.push(y("INVALID_EQUIPMENT_BASE_STAT", "器胚字段必须与模板集合完全一致且不得重复", "baseStats"));
        for (let W = 0; W < V.baseStats.length; W += 1) {
            let Q = V.baseStats[W], J = _.baseStats.find((G) => (G === null || G === void 0 ? void 0 : G.attr) === Q.attr), { min: Y, max: O } = p2(Q, _.equipmentLevel, (_a = _.baseQuality) !== null && _a !== void 0 ? _a : 0, c1(_));
            if (!J || J.attr !== Q.attr || !c3(J.value, Y, O))
                q.push(y("INVALID_EQUIPMENT_BASE_STAT", `${Q.attr} 必须位于 ${Y}～${O}`, `baseStats.${W}`));
        }
    }
    if (!Array.isArray(_.attributeBonuses) || _.attributeBonuses.length > 2 || _.slot !== "weapon" && _.slot !== "armor" && _.attributeBonuses.length > 0)
        q.push(y("INVALID_EQUIPMENT_ATTRIBUTE_BONUS", "仅法兵与法衣可附灵，最多2条", "attributeBonuses"));
    else if (n1(_.equipmentLevel)) {
        let { min: X, max: Z } = g2(_.equipmentLevel), W = new Set;
        for (let Q = 0; Q < _.attributeBonuses.length; Q += 1) {
            let J = _.attributeBonuses[Q];
            if (!J || !Z4.includes(J.attr) || W.has(J.attr) || !c3(J.value, X, Z))
                q.push(y("INVALID_EQUIPMENT_ATTRIBUTE_BONUS", `附灵必须使用不重复六维且数值位于 ${X}～${Z}`, `attributeBonuses.${Q}`));
            if (J)
                W.add(J.attr);
        }
    }
    if (!Array.isArray(_.essenceIds) || _.essenceIds.length > 2 || new Set(_.essenceIds).size !== _.essenceIds.length)
        q.push(y("UNSUPPORTED_EQUIPMENT_CONTENT", "器蕴最多2个且不得重复", "essenceIds"));
    else if (!j && _.essenceIds.length > 0)
        q.push(y("UNSUPPORTED_EQUIPMENT_CONTENT", "Phase 4A 不投影器蕴", "essenceIds"));
    if (_.artId !== void 0) {
        if (typeof _.artId !== "string" || _.artId.trim().length === 0)
            q.push(y("UNSUPPORTED_EQUIPMENT_CONTENT", "器诀 ID 无效", "artId"));
        else if (!j)
            q.push(y("UNSUPPORTED_EQUIPMENT_CONTENT", "Phase 4A 不投影器诀", "artId"));
    }
    if (j && _.generatorVersion === I1 && (_.essenceIds.length > 0 || _.artId !== void 0))
        q.push(y("EQUIPMENT_SPECIAL_GENERATOR_MISMATCH", "v1 生成实例不得携带器蕴或器诀"));
    return q.push(...o_(_)), q;
}
function J4() { return { vitality: 0, strength: 0, spirit: 0, endurance: 0, speed: 0, willpower: 0 }; }
function a2(_, j) { var _a; _.set(j.attr, ((_a = _.get(j.attr)) !== null && _a !== void 0 ? _a : 0) + j.value); }
function e3(_, j, q) { return { severity: "warning", code: _, message: j, ...q ? { path: q } : {} }; }
function O4(_, j, q = {}) {
    var _a, _g, _h, _k, _l, _m, _o, _p, _q;
    let P = (_a = q.essenceDefs) !== null && _a !== void 0 ? _a : $1, $ = (_g = q.artDefs) !== null && _g !== void 0 ? _g : u0, V = new Map(P.map((U) => [U.id, U])), X = new Map($.map((U) => [U.id, U])), Z = [], W = J4(), Q = new Map, J = new Set;
    for (let U of Object.keys(_))
        if (!$0.includes(U))
            Z.push(y("EQUIPMENT_SLOT_MISMATCH", `未知装配槽 ${U}`, U));
    let Y = {}, O = [], G = [];
    for (let U of $0) {
        let b = _[U];
        if (!b)
            continue;
        if (Z.push(...Y4(b, !0).map((_0) => ({ ..._0, path: _0.path ? `${U}.${_0.path}` : U }))), b.slot !== U)
            Z.push(y("EQUIPMENT_SLOT_MISMATCH", "实例自身部位与装配槽不一致", U));
        if (J.has(b.id))
            Z.push(y("DUPLICATE_EQUIPMENT_INSTANCE", "同一道装实例不能占据多个槽位", U));
        J.add(b.id);
        let d = s2(b, P);
        if (Y[U] = d, !Number.isFinite(j) || j < d)
            Z.push(y("EQUIPMENT_LEVEL_REQUIREMENT", `人物境界不足以御使 ${b.name}`, U));
        for (let _0 of b.essenceIds) {
            let N1 = V.get(_0);
            if (!N1)
                Z.push(y("UNKNOWN_EQUIPMENT_ESSENCE", `未知器蕴 ${_0}`, `${U}.essenceIds`));
            else if (N1.allowedSlots && !N1.allowedSlots.includes(U))
                Z.push(y("EQUIPMENT_SPECIAL_SLOT_MISMATCH", `${N1.name} 不能出现在该部位`, `${U}.essenceIds`));
            O.push({ id: _0, slot: U });
        }
        if (b.artId) {
            let _0 = X.get(b.artId);
            if (!_0)
                Z.push(y("UNKNOWN_EQUIPMENT_ART", `未知器诀 ${b.artId}`, `${U}.artId`));
            else if (_0.allowedSlots && !_0.allowedSlots.includes(U))
                Z.push(y("EQUIPMENT_SPECIAL_SLOT_MISMATCH", `${_0.name} 不能出现在该部位`, `${U}.artId`));
            G.push({ id: b.artId, slot: U });
        }
    }
    let h = P.some((U) => { var _a, _g, _h, _k, _l; return !((_a = U.id) === null || _a === void 0 ? void 0 : _a.trim()) || !((_g = U.name) === null || _g === void 0 ? void 0 : _g.trim()) || !["stack", "unique", "highest"].includes(U.stackPolicy) || ((_h = U.panel) !== null && _h !== void 0 ? _h : []).some((b) => b.mode !== "add" || !W4.has(b.attr) || !Number.isFinite(b.value)) || Object.values((_k = U.resourceGainFactors) !== null && _k !== void 0 ? _k : {}).some((b) => !Number.isFinite(b) || b <= 0) || Object.values((_l = U.resourceCostFactors) !== null && _l !== void 0 ? _l : {}).some((b) => !Number.isFinite(b) || b <= 0); }), K = $.some((U) => { var _a, _g, _h, _k, _l, _m; return !((_a = U.id) === null || _a === void 0 ? void 0 : _a.trim()) || !((_g = U.name) === null || _g === void 0 ? void 0 : _g.trim()) || !Number.isFinite(U.rageCost) || U.rageCost < 0 || !((_h = U.skill) === null || _h === void 0 ? void 0 : _h.id) || ((_k = U.skill.resourceCosts) === null || _k === void 0 ? void 0 : _k.length) !== 1 || ((_l = U.skill.resourceCosts[0]) === null || _l === void 0 ? void 0 : _l.resourceId) !== J0 || ((_m = U.skill.resourceCosts[0]) === null || _m === void 0 ? void 0 : _m.amount) !== U.rageCost; });
    if (h || K)
        Z.push(y("EQUIPMENT_SPECIAL_CONTENT_INVALID", "器蕴或器诀定义无效"));
    let B = [...P.map((U) => U.id), ...$.map((U) => U.id), ...$.map((U) => U.skill.id), ...$.flatMap((U) => { var _a; return ((_a = U.statusDefs) !== null && _a !== void 0 ? _a : []).map((b) => b.id); }), J0];
    if (new Set(B).size !== B.length)
        Z.push(y("CONTENT_ID_CONFLICT", "道装特殊内容存在重复 ID"));
    let D = new Map;
    for (let U of O) {
        let b = V.get(U.id);
        if (!(b === null || b === void 0 ? void 0 : b.conflictGroup))
            continue;
        let d = (_h = D.get(b.conflictGroup)) !== null && _h !== void 0 ? _h : new Set;
        d.add(b.id), D.set(b.conflictGroup, d);
    }
    for (let [U, b] of D)
        if (b.size > 1)
            Z.push(y("EQUIPMENT_ESSENCE_CONFLICT", `器蕴冲突组 ${U} 同时生效`));
    if (Z.some((U) => U.severity === "error"))
        return { ok: !1, diagnostics: Z };
    for (let U of $0) {
        let b = _[U];
        if (!b)
            continue;
        for (let d of b.attributeBonuses)
            W[d.attr] += d.value;
        for (let d of b.baseStats)
            a2(Q, d);
        for (let d of n2(b))
            a2(Q, d);
    }
    let A = [], v = new Set, w = [], k = 1, t = 1;
    for (let U of O) {
        let b = V.get(U.id);
        if (b.stackPolicy !== "stack" && v.has(b.id)) {
            Z.push(e3("EQUIPMENT_ESSENCE_DUPLICATE_IGNORED", `${b.name} 重复，仅生效一次`, U.slot));
            continue;
        }
        if (b.stackPolicy !== "stack")
            v.add(b.id);
        if (!A.includes(b.id))
            A.push(b.id);
        for (let d of (_k = b.panel) !== null && _k !== void 0 ? _k : [])
            if (d.mode === "add")
                a2(Q, { attr: d.attr, value: d.value });
            else
                Z.push(y("EQUIPMENT_SPECIAL_CONTENT_INVALID", "器蕴首版只允许固定面板加值"));
        if (b.passive)
            w.push({ ...b.passive, id: `${b.passive.id}.${U.slot}` });
        k = Math.max(k, (_m = (_l = b.resourceGainFactors) === null || _l === void 0 ? void 0 : _l[J0]) !== null && _m !== void 0 ? _m : 1), t = Math.min(t, (_p = (_o = b.resourceCostFactors) === null || _o === void 0 ? void 0 : _o[J0]) !== null && _p !== void 0 ? _p : 1);
    }
    if (Z.some((U) => U.severity === "error"))
        return { ok: !1, diagnostics: Z };
    let M0 = [], b0 = [], O0 = [];
    for (let U of G) {
        let b = X.get(U.id);
        if (M0.includes(b.id)) {
            Z.push(e3("EQUIPMENT_ART_DUPLICATE_IGNORED", `${b.name} 重复，仅授予一次`, U.slot));
            continue;
        }
        M0.push(b.id), b0.push(b.skill);
        for (let d of (_q = b.statusDefs) !== null && _q !== void 0 ? _q : [])
            if (!O0.some((_0) => _0.id === d.id))
                O0.push(d);
    }
    let b1 = t === 1 ? [] : b0.map((U) => { var _a, _g; return ({ ...U, originalResourceCosts: (_a = U.resourceCosts) === null || _a === void 0 ? void 0 : _a.map((b) => ({ ...b })), resourceCosts: (_g = U.resourceCosts) === null || _g === void 0 ? void 0 : _g.map((b) => b.resourceId === J0 ? { ...b, amount: Math.floor(Number(b.amount) * t) } : b) }); }), Z1 = o2(k);
    return { ok: !0, projection: { attributeBonuses: W, panel: [...Q].map(([U, b]) => ({ attr: U, value: b })), diagnostics: Z, effectiveEssenceIds: A, grantedArtIds: M0, skills: [...b0, ...w, Z1], statusDefs: O0, passiveSkillIds: [...w.map((U) => U.id), Z1.id], skillOverrides: b1, effectiveRequiredLevels: Y, rageGainFactor: k, rageCostFactor: t } };
}
function s2(_, j = $1) { let q = Math.min(0, ..._.essenceIds.map((P) => { var _a, _g; return (_g = (_a = j.find(($) => $.id === P)) === null || _a === void 0 ? void 0 : _a.requiredStageOffset) !== null && _g !== void 0 ? _g : 0; })); return Math.max(official_chunk_thhss9s9_js_1.Qf, v_(_.equipmentLevel).requiredLevel + q * official_chunk_thhss9s9_js_1.Qf); }
var h0 = { vitality: "体魄", strength: "力道", spirit: "灵力", endurance: "根骨", speed: "身法", willpower: "神识" };
exports.Ub = h0;
var S1 = { ...h0, physicalAtk: "物攻", physicalDef: "物防", magicAtk: "法攻", magicDef: "法防", maxHp: "气血", maxMp: "法力", healPower: "治疗", speed: "速度", hit: "命中", dodge: "闪避", critRate: "暴击", spellCritRate: "法暴", physicalFuryRate: "物理狂暴", sealHit: "封印命中", sealResist: "封印抵抗" }, t3 = zod_11.z.object({ attr: zod_11.z.enum(Object.keys(S1)), value: zod_11.z.number().finite() }).strict(), __ = zod_11.z.object({ schemaVersion: zod_11.z.literal(1), numericVersion: zod_11.z.literal(2), baseQuality: zod_11.z.number().min(0).max(1), id: zod_11.z.string().min(1), templateId: zod_11.z.string().min(1), name: zod_11.z.string().min(1).max(100), desc: t1.optional(), crafterName: p_.optional(), element: zod_11.z.enum(official_chunk_thhss9s9_js_1.Df).optional(), slot: zod_11.z.enum($0), weaponType: zod_11.z.enum(w_).optional(), equipmentLevel: zod_11.z.number().int().nonnegative(), requiredLevel: zod_11.z.number().int().nonnegative(), baseStats: zod_11.z.array(t3).max(20), attributeBonuses: zod_11.z.array(t3).max(20), essenceIds: zod_11.z.array(zod_11.z.string()).max(20), artId: zod_11.z.string().optional(), formationInscriptions: u2, appraisalState: zod_11.z.literal("appraised"), generatorVersion: zod_11.z.enum(["dao_equipment_generator_v1", "dao_equipment_generator_v2", "dao_equipment_generator_v3", "dao_equipment_generator_v4", "dao_equipment_generator_v5"]), createdAt: zod_11.z.string() }).strict().refine((_) => !["dao_equipment_generator_v4", "dao_equipment_generator_v5"].includes(_.generatorVersion) || _.element !== void 0, { message: "新版锻造装备必须包含五行属性", path: ["element"] }).superRefine((_, j) => {
    var _a;
    let q = y_(_);
    if (q)
        j.addIssue({ code: "custom", path: ["weaponType"], message: q });
    for (let P of o_(_))
        j.addIssue({ code: "custom", path: (_a = P.path) === null || _a === void 0 ? void 0 : _a.split("."), message: P.message });
});
exports.ce = S1;
exports.de = __;
var _9 = 40;
exports.ee = _9;
class j9 extends Error {
}
exports.fe = j9;
function c2(_) {
    let j = k2(_);
    if (j)
        return j;
    throw new j9("未知物品定义");
}
var HW = zod_1.z.object({ id: zod_1.z.string().min(1).max(160), location: zod_1.z.enum(["bag", "storage", "equipped"]), slotIndex: zod_1.z.number().int().min(0).max(_9 - 1).nullable(), definitionId: zod_1.z.string().min(1).max(160), quantity: zod_1.z.number().int().positive().max(2147483647), instanceData: zod_1.z.unknown().nullable(), stackKey: zod_1.z.string().nullable(), revision: zod_1.z.number().int().nonnegative() }).strict().superRefine((_, j) => {
    if (_.location === "bag" !== (_.slotIndex !== null))
        j.addIssue({ code: "custom", message: "格位与位置不一致" });
    if (!k2(_.definitionId)) {
        j.addIssue({ code: "custom", message: "未知物品定义" });
        return;
    }
    let q = c2(_.definitionId);
    if (_.location === "equipped" && q.kind !== "equipment")
        j.addIssue({ code: "custom", message: "仅道装可以处于穿戴位置" });
    if (_.quantity > q.stackLimit)
        j.addIssue({ code: "custom", message: "超过堆叠上限" });
    if (q.kind === "equipment") {
        let P = __.safeParse(_.instanceData);
        if (!P.success || P.data.id !== _.id)
            j.addIssue({ code: "custom", message: "道装个体事实无效" });
    }
    else if (_.definitionId === "seed.v1") {
        if (!f1.safeParse(_.instanceData).success)
            j.addIssue({ code: "custom", message: "灵种事实无效" });
    }
    else if (_.definitionId === "material.v1") {
        if (!x1.safeParse(_.instanceData).success)
            j.addIssue({ code: "custom", message: "材料事实无效" });
    }
    else if (_.definitionId === "consumable.v1") {
        if (!C1.safeParse(_.instanceData).success)
            j.addIssue({ code: "custom", message: "消耗品事实无效" });
    }
    else if (_.instanceData !== null)
        j.addIssue({ code: "custom", message: "固定物品不能附带个体属性" });
}), hW = zod_1.z.object({ definitionId: zod_1.z.string(), quantity: zod_1.z.number().int().positive().max(99), instanceData: zod_1.z.union([__, f1, x1, C1]).optional() }).strict();
exports.he = HW;
exports.ie = hW;
function DW(_, j = []) {
    let q = new Set([...j, ..._.filter((P) => P.location === "bag").map((P) => P.slotIndex)]);
    for (let P = 0; P < _9; P++)
        if (!q.has(P))
            return P;
    return null;
}
var L0 = { 凡品: "text-tier-fan", 灵品: "text-tier-ling", 玄品: "text-tier-xuan", 真品: "text-tier-zhen", 地品: "text-tier-di", 天品: "text-tier-tian", 仙品: "text-tier-xian", 神品: "text-tier-shen", 天灵根: "text-tier-tian", 真灵根: "text-tier-zhen", 伪灵根: "text-tier-fan", 变异灵根: "text-tier-shen", 天阶上品: "text-tier-shen", 天阶中品: "text-tier-xian", 天阶下品: "text-tier-xian", 地阶上品: "text-tier-di", 地阶中品: "text-tier-di", 地阶下品: "text-tier-di", 玄阶上品: "text-tier-xuan", 玄阶中品: "text-tier-xuan", 玄阶下品: "text-tier-xuan", 黄阶上品: "text-tier-ling", 黄阶中品: "text-tier-ling", 黄阶下品: "text-tier-ling", 炼气: "text-tier-fan", 筑基: "text-tier-ling", 金丹: "text-tier-xuan", 元婴: "text-tier-zhen", 化神: "text-tier-shen", 炼虚: "text-tier-di", 合体: "text-tier-tian", 大乘: "text-tier-xian", 渡劫: "text-tier-shen" }, AW = { easy: "text-tier-fan", normal: "text-tier-ling", hard: "text-tier-xuan", elite: "text-tier-zhen", boss: "text-tier-shen" };
exports.hc = L0;
exports.ic = AW;
var q9 = new Map(u0.map((_) => [_.skill.id, _]));
function R4(_) {
    var _a;
    let j = (_a = official_chunk_thhss9s9_js_1.Xf.find((P) => P.id === _.id)) === null || _a === void 0 ? void 0 : _a.effect;
    if (!j)
        return;
    let q = (P) => Math.round(P * 100);
    switch (j.type) {
        case "allSeeing": return `依随机顺序施展自身已学会的主动攻击技能，不包含观照万象本身。观照万象本身不另耗法力，所调用技能各自按原规则选择目标、消耗法力并结算；法力不足时停止后续施展。冷却 ${j.cooldownRounds} 回合，无物种或战斗回合门槛。`;
        case "mountainBreaker": return `消耗自身等级 + ${j.costMpBase} 法力，攻击 1 个目标。本次命中临时增加自身等级 × 2 + 10；伤害按双方物理攻击之差计算，正差增益上限为自身等级 × 8。`;
        case "karmicRetribution": return `消耗自身等级 + ${j.costMpBase} 法力，攻击 1 个目标。${q(j.evilChance)}% 概率触发恶报，造成普通物理伤害的 ${q(j.evilFactor)}%；恶报暴击为普通物理伤害的 ${q(j.evilFactor * 1.5)}%。其余概率触发善报，为目标恢复普通物理伤害的 ${q(j.goodFactor)}%；善报暴击恢复 ${q(j.goodFactor * 2)}%。`;
        case "radiantBarrier": return `受到伤害并损失气血时，有 ${q(j.chance)}% 概率获得相当于本次损失气血 ${q(j.ratio)}% 的护盾；可叠加，最多为自身最大气血的 ${q(j.maxHpRatio)}%。护盾每回合末衰减 ${q(j.decayRatio)}%，不额外恢复气血。`;
        case "constitutionGrowthHp": return `气血上限额外增加体质 × 成长 × ${j.multiplier}，向下取整；不改变其他属性，也不提供气血恢复。`;
        case "bloodthirstyPursuit": return `普通攻击（含连击）使目标气血降为 0 后，向另一个存活敌人追加一次物理攻击；即使目标随后涅槃重生，也可触发。追击造成正常物理伤害的 ${q(j.factor)}%，可以暴击，每回合最多触发一次，不继续追击。`;
        case "surpriseSpell": return `第 2 回合或以后入场时，本次入场后首次主动法术伤害提高 ${q(j.factor - 1)}%；初始出战不触发，同一次群法与灵法连击均获得加成，后续法术不再加成。`;
        case "magicAttributeBoost": return `法术攻击额外增加完整魔力属性 × ${j.multiplier}，向下取整；不按法力上限或当前法力计算。`;
        case "strengthGrowthTradeoff": return `物理攻击额外增加完整力量属性 × 成长 × ${j.attackMultiplier}，物理防御降低完整力量属性 × ${j.defenseMultiplier}；两项分别向下取整，不改变永久属性。`;
        case "spellDefense": return `消耗向下取整的自身等级 ÷ ${j.costMpLevelDivisor} + ${j.costMpBase} 法力，施加自身护体灵罡，持续 ${j.duration} 回合。所受法术伤害降低 ${q(1 - j.takenFactor)}%，与御法等减伤倍率相乘；不减免物理或固定伤害。`;
        case "swiftStrike": return `消耗向下取整的自身等级 ÷ ${j.costMpLevelDivisor} + ${j.costMpBase} 法力，必中攻击 1 个目标。固定伤害为完整力量属性 × ${j.strengthMultiplier} + 当前有效速度 ÷ ${j.speedDivisor}，人物单位受到的伤害为 ${q(j.playerFactor)}%；不暴击。`;
        case "barrierBreaker": return `消耗自身等级 + ${j.costMpBase} 法力，必中攻击 1 个目标。忽略铁骨或高级铁骨增加的物理防御，仍计算目标基础防御；目标执行防御指令时，基础物理伤害提高至 ${q(j.defendFactor)}%，随后附加自身等级 × ${j.powerPerLevel} 威力。`;
        case "mindShatter": return `消耗向下取整的自身等级 ÷ ${j.costMpLevelDivisor} + ${j.costMpBase} 法力，必中攻击 1 个目标，造成普通物理伤害的 ${q(j.physicalFactor)}%。目标同时损失（本次实际气血损失 ÷ ${j.mpDamageDivisor} + 自身等级 ÷ ${j.mpLevelDivisor}）× ${j.mpDamageFactor} 法力，向下取整；下一回合再损失完整力量属性 ÷ ${j.periodicStrengthDivisor} + ${j.periodicBase} 法力，向下取整。持续损耗不叠加，保留较高值。`;
        case "unanticipated": return `使用本回合己方灵兽尚未施展过的技能时，伤害结果提高 ${q(j.factor - 1)}%；同一次群体攻击与灵法连击均获得加成，每回合重新判定。不限物种，不限入场回合。`;
        case "ghost": return `死亡后第 ${j.delay} 个回合开始复起，气血恢复至可恢复上限。无法接受普通气血恢复，免疫控制、减益和持续伤害；涅槃重生失效。被镇魂击杀后无法复起，等待期间不计存活。`;
        case "exorcism": return `对灵魂体目标的物理和法术伤害提高 ${q(j.factor - 1)}%，击杀后阻止其本次复起。`;
        case "denial": return `免疫控制、减益和持续伤害，无法获得增益；灵魂体、涅槃重生、定神（均含高级版）及解厄、高级避厄失效。受到灵魂体造成的物理与法术伤害增加 ${q(j.ghostDamageFactor - 1)}%。${j.spellFactor < 1 ? `所受法术伤害降低 ${q(1 - j.spellFactor)}%。` : ""}`;
        case "poison": return `普通攻击使目标实际损失气血且目标仍存活时，有 ${q(j.chance)}% 概率使其中毒 ${j.duration} 回合；中毒期间每回合损失其最大气血的 ${q(j.hpRatio)}% 和最大法力的 ${q(j.mpRatio)}%。${j.immune ? "自身免疫此毒。" : ""}`;
        case "miracle": return `${j.immune ? "免疫" : "回合末解除"}可驱散的控制、减益和持续伤害状态，不包含禁复活。`;
        case "concentration": return `免疫可驱散的控制状态（不含禁复活），自身造成的物理伤害降低 ${q(1 - j.physicalFactor)}%。${j.dodgeBonus ? `躲避增加 ${j.dodgeBonus} 点。` : ""}`;
        case "eternity": return `获得可延长增益时持续时间增加 ${q(j.factor - 1)}%，向下取整，最多额外 ${j.maxExtra} 回合；不延长隐身、控制与特殊入场效果。`;
        case "stealth": return `每场首次出战时隐身 ${j.minDuration}～${j.maxDuration} 回合（含入场回合），使没有灵觉或看破效果的敌人无法攻击自身。期间不能施法，自身造成的物理伤害降低 ${q(1 - j.physicalFactor)}%；召回后不重新触发。`;
        case "perception": return `能看破隐身，攻击隐身目标。${j.dodgeBonus ? `躲避增加 ${j.dodgeBonus} 点。` : ""}`;
        case "spellRepeat": return `施放直接造成伤害的法术后，有 ${q(j.chance)}% 概率对原目标追加同一法术；追加伤害为正常值的 ${q(j.factor)}%，不额外消耗法力，也不会再次触发追加。`;
        case "spellFluctuation": return `法术伤害在正常值的 ${q(j.min)}%～${q(j.max)}% 之间波动，取代通常的法伤波动范围。${j.suppressReflection ? "法术攻击不触发灵法反震。" : ""}`;
        case "groupSpell": return `消耗 ${j.costMp} 法力，初始攻击 1 个目标；每满 ${j.levelsPerTarget} 级多攻击 1 个，最多 ${j.maxTargets} 个。法术伤害系数为 ${j.coefficient}，附加威力为 ${j.powerBase} + ${j.powerPerLevel === 1 ? "自身等级" : `自身等级 × ${j.powerPerLevel}`}；没有元素克制。`;
        case "spellHit": return `消耗 ${j.costMp} 法力，攻击 1 个目标。法术伤害系数为 ${j.coefficient}，附加威力为 ${j.powerBase} + ${j.powerPerLevel === 1 ? "自身等级" : `自身等级 × ${j.powerPerLevel}`}；没有元素克制。`;
        case "parry": return `每回合首次被物理攻击命中时，伤害降低 ${q(1 - j.factor)}%。即使护盾挡下伤害，也会消耗本回合的招架机会；蛮力可无视招架，且不消耗这次机会。`;
        case "defenseTraining": return `物理防御提高自身等级 × ${j.perLevel}，向下取整；自身法术伤害降低 ${q(1 - j.spellFactor)}%。`;
        case "strengthTraining": return `物理攻击提高自身等级 × ${j.perLevel}，向下取整；忽略招架减伤，攻击拥有铁骨或高级铁骨的目标时物理伤害降低 ${q(1 - j.versusDefenseFactor)}%。`;
        case "wisdom": return `法术技能的法力消耗降低 ${q(1 - j.factor)}%，与其他减耗倍率相乘后向下取整；不影响物理技能和捕捉。`;
        case "sneakAttack": return `物理伤害提高 ${q(j.factor - 1)}%，物理攻击不触发目标的反击与反震。`;
        case "spellResistance": return `受到的法术伤害降低 ${q(1 - j.takenFactor)}%，自身造成的物理伤害降低 ${q(1 - j.physicalFactor)}%；不减免固定伤害。`;
        case "lifesteal": return `物理攻击使目标实际损失气血后，自身恢复本次损失气血的 ${q(j.ratio)}%，向下取整且不超过可恢复上限。连击追加攻击与反击不触发噬血，也无法从灵魂体目标噬血。`;
        case "reflection": return `受到${j.kind === "physical" ? "物理" : "法术"}攻击并实际损失气血时，有 ${q(j.chance)}% 概率对攻击者造成相当于本次气血损失 ${q(j.ratio)}% 的固定伤害，最低 1 点。追加攻击不触发反震。${j.kind === "physical" ? "阻止敌方连击，偷袭不解除此限制。" : "不阻止物理连击。"}`;
        case "divineRevival": return `受到致命伤害时，有 ${q(j.chance)}% 概率复生，恢复至最大气血的 ${q(j.hpRatio)}%，受可恢复上限和禁复活状态限制。每次致命伤害独立判定，成功不计死亡；持有灵魂体或绝灵时不生效。`;
        case "counter": return `受到物理攻击并损失气血时，有 ${q(j.chance)}% 概率反击，攻击系数为普攻的 ${q(j.coefficient)}%。反击与连击追加攻击不会再次触发反击。`;
        case "critical": return `${j.kind === "physical" ? "物理" : "法术"}暴击率提高 ${q(j.chance)}%，暴击伤害倍率不变。`;
        case "regeneration": return `每回合结束时恢复${j.resource === "hp" ? "气血" : "法力"}，数值为自身等级${j.levelDivisor === 1 ? "" : `的 1/${j.levelDivisor}`}，向下取整，不超过上限；死亡或未出战时不生效。`;
        case "spellBoost": return `造成的法术伤害提高 ${q(j.factor - 1)}%。`;
        case "speed": return `自身速度${j.factor >= 1 ? "提高" : "降低"} ${q(Math.abs(j.factor - 1))}%。与其他速度倍率相乘。`;
    }
}
function B4(_) {
    var _a, _g;
    if (!official_chunk_thhss9s9_js_1.cg.includes(_.id))
        return;
    let j = (_a = _.hooks) === null || _a === void 0 ? void 0 : _a.find((P) => P.on === official_chunk_thhss9s9_js_1.ef.AfterHit);
    if (typeof (j === null || j === void 0 ? void 0 : j.chance) !== "number")
        return;
    let q = (_g = official_chunk_thhss9s9_js_1.Xf.find((P) => P.id === _.id)) === null || _g === void 0 ? void 0 : _g.effect;
    if ((q === null || q === void 0 ? void 0 : q.type) !== "combo")
        return;
    return `普通攻击命中后，有 ${Math.round(j.chance * 100)}% 概率向原目标追加一次普攻；自身所有物理伤害降低 ${Math.round((1 - q.physicalFactor) * 100)}%。目标拥有反震或高级反震时不触发，偷袭不解除此限制。`;
}
var G4 = { invokeAttackSkills: "依次施展已学主动攻击技能", repeat: "连续触发效果", modifyFact: "心念流转", modifyStatusDuration: "调整状态持续", modifyCooldown: "调整冷却", loseHp: "损失气血", physicalHit: "造成物理伤害", spellHit: "造成法术伤害", fixedHit: "造成固定伤害", heal: "治疗气血", restoreHp: "恢复气血", restoreMp: "恢复法力", revive: "复起目标", applyStatus: "施加状态", removeStatus: "移除状态", copyStatus: "复制状态", emitMechanic: "触发技能机制", dispel: "驱散状态", skipNextAction: "下一次行动休息", damageMp: "削减法力", wound: "造成伤势", removeWound: "恢复伤势", applyBarrier: "获得护盾", modifyStrike: "调整伤害", modifyDefenseIgnore: "调整忽视防御", modifyHeal: "调整治疗", modifyBarrier: "调整护盾", modifyWound: "调整伤势", setCrit: "必定暴击", modifyResource: "调整战斗资源", modifyChance: "调整触发概率", clearSkipNextAction: "取消休息", randomBranch: "随机触发效果" };
function e2(_, j, q = {}) {
    let P = new Map(j.map((X) => [X.id, X.name])), $ = (X) => {
        var _a;
        let Z = G4[X.type];
        if (X.type === official_chunk_thhss9s9_js_1.lf.ApplyStatus) {
            if (Z = `${X.self ? "自身" : ""}施加「${(_a = P.get(X.statusId)) !== null && _a !== void 0 ? _a : "状态"}」`, typeof X.duration === "number")
                Z += `，持续 ${X.duration} 回合`;
        }
        else if (X.type === official_chunk_thhss9s9_js_1.lf.ApplyBarrier)
            Z = `获得「${X.name}」护盾`;
        else if (X.type === official_chunk_thhss9s9_js_1.lf.RandomBranch)
            Z = `随机效果：${X.successEffects.map($).join("、")}；或${X.failureEffects.map($).join("、") || "不产生效果"}`;
        else if (X.type === official_chunk_thhss9s9_js_1.lf.EmitMechanic)
            Z = X.name;
        return `${X.when ? "满足条件时：" : ""}${Z}`;
    }, V = (X) => {
        if (!X.description)
            return;
        let Z = [X.description];
        if (X.requireHpAboveRatio !== void 0)
            Z.push(`当前气血须高于${Math.round(X.requireHpAboveRatio * 100)}%。`);
        if (X.requireHpBelowRatio !== void 0)
            Z.push(`当前气血须低于${Math.round(X.requireHpBelowRatio * 100)}%。`);
        if (typeof X.targeting.count === "number" && X.targeting.count > 1)
            Z.push(`基础目标数：最多${X.targeting.count}个。`);
        for (let W of X.effects) {
            if (W.type === official_chunk_thhss9s9_js_1.lf.SkipNextAction)
                Z.push($(W));
            if (W.type === official_chunk_thhss9s9_js_1.lf.ApplyStatus) {
                let Q = j.find((J) => J.id === W.statusId);
                if ((Q === null || Q === void 0 ? void 0 : Q.category) === "buff" && !Q.onExpire && !Q.commandPolicy)
                    Z.push($(W));
            }
        }
        return Z.join(`
`);
    };
    return Object.fromEntries(_.map((X) => {
        var _a, _g, _h, _k, _l, _m, _o;
        return [X.id, { category: q9.has(X.id) ? "art" : "spell", description: (_h = (_a = V(X)) !== null && _a !== void 0 ? _a : (_g = q9.get(X.id)) === null || _g === void 0 ? void 0 : _g.description) !== null && _h !== void 0 ? _h : (X.capture ? "尝试收服野生灵兽，气血越低越容易成功；执行时消耗法力，失败仍消耗。" : [q.includeBeastFlavor === !1 ? void 0 : (_k = official_chunk_thhss9s9_js_1.Xf.find((Z) => Z.id === X.id)) === null || _k === void 0 ? void 0 : _k.flavorText, (_m = (_l = B4(X)) !== null && _l !== void 0 ? _l : R4(X)) !== null && _m !== void 0 ? _m : ([...new Set([...X.effects.map($), ...((_o = X.successEffects) !== null && _o !== void 0 ? _o : []).map((Z) => `施放成功后：${$(Z)}`)])].join("；") || "被动能力，依技能条件触发。")].filter(Boolean).join(`
`)) }];
    }));
}
var U4 = e2(official_chunk_thhss9s9_js_1.Zf, []), $9 = e2(official_chunk_thhss9s9_js_1.Zf, [], { includeBeastFlavor: !1 }), M4 = new Map([...official_chunk_thhss9s9_js_1.Xf.map((_) => { var _a, _g, _h, _k, _l; return [_.id, { name: _.name, icon: _.icon, style: official_chunk_thhss9s9_js_1.ag.has(_.id) ? "advanced" : "normal", summary: _.flavorText, details: ((_a = $9[_.id]) === null || _a === void 0 ? void 0 : _a.description) === _.flavorText ? "" : (_h = (_g = $9[_.id]) === null || _g === void 0 ? void 0 : _g.description) !== null && _h !== void 0 ? _h : "暂无技能效果。", description: (_l = (_k = U4[_.id]) === null || _k === void 0 ? void 0 : _k.description) !== null && _l !== void 0 ? _l : "暂无技能说明。" }]; })]);
function b4(_) { return M4.get(_); }
function X9(_) { var _a; return (_a = b4(_)) !== null && _a !== void 0 ? _a : { name: "未知技能", icon: "❔", style: "unavailable", summary: "技能信息暂不可用。", details: "", description: "技能信息暂不可用。" }; }
function Z9(_, j) { return _.valueAt1 + _.valuePerLevel * (j - 1); }
function t2(_, j) { return Number((_.valueAt1 + (_.valueAt9 - _.valueAt1) * (j - 1) / 8).toFixed(8)); }
function N4(_) {
    switch (_) {
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
        case "targetDot": return { targetStatusCategories: [official_chunk_thhss9s9_js_1.df.Dot] };
        case "selfControl": return { sourceRemovableControl: !0 };
        case "selfDebuff": return { sourceStatusCategories: [official_chunk_thhss9s9_js_1.df.Debuff] };
    }
}
function EW(_, j) {
    let q = _.mechanism, P = t2(q, j), $ = { ...N4(q.condition), sourceStanding: !0 }, V = { ...$, damageOrigins: [official_chunk_thhss9s9_js_1.Ze.ActionDirect] }, X = { ...V, excludeSkillTags: [official_chunk_thhss9s9_js_1.$e.Art, official_chunk_thhss9s9_js_1.$e.Passive], targetSlot: "primary", excludePercentageDamage: !0 }, Z = [];
    switch (q.type) {
        case "damage":
        case "mitigation":
            Z = q.kinds.map((W) => ({ on: official_chunk_thhss9s9_js_1.ef.OnHitCalc, ...q.type === "damage" ? { sourceIsSelf: !0 } : { targetIsSelf: !0 }, requireKind: W, when: q.type === "damage" ? X : V, effects: [{ type: official_chunk_thhss9s9_js_1.lf.ModifyStrike, factor: q.type === "damage" ? 1 + P : 1 - P }] }));
            break;
        case "heal":
        case "barrier":
            Z = [{ on: q.type === "heal" ? official_chunk_thhss9s9_js_1.ef.OnHealCalc : official_chunk_thhss9s9_js_1.ef.OnBarrierCalc, sourceIsSelf: !0, when: X, effects: [{ type: q.type === "heal" ? official_chunk_thhss9s9_js_1.lf.ModifyHeal : official_chunk_thhss9s9_js_1.lf.ModifyBarrier, factor: 1 + P }] }];
            break;
        case "evasion":
            Z = [{ on: official_chunk_thhss9s9_js_1.ef.OnHitRoll, targetIsSelf: !0, requireKind: "physical", when: V, effects: [{ type: official_chunk_thhss9s9_js_1.lf.ModifyChance, add: -P }] }];
            break;
        case "restoreHp":
        case "restoreMp":
            Z = [{ on: official_chunk_thhss9s9_js_1.ef.OnRoundEnd, aim: official_chunk_thhss9s9_js_1.ff.Self, when: $, effects: [{ type: q.type === "restoreHp" ? official_chunk_thhss9s9_js_1.lf.RestoreHp : official_chunk_thhss9s9_js_1.lf.RestoreMp, power: `floor(source.${q.type === "restoreHp" ? "maxHp" : "maxMp"} * ${P})` }] }];
            break;
        case "sealResist": break;
    }
    return { id: `${_.id}.passive`, name: _.name, tags: [official_chunk_thhss9s9_js_1.$e.Passive], targeting: { side: official_chunk_thhss9s9_js_1.af.Self }, effects: [], hooks: Z };
}
var H4 = { always: "", selfHpBelow50: "自身气血低于50%时，", selfHpBelow35: "自身气血低于35%时，", selfHpAbove70: "自身气血高于70%时，", targetHpBelow50: "目标气血低于50%时，", targetHpBelow35: "目标气血低于35%时，", targetHpAbove70: "目标气血高于70%时，", selfMpBelow50: "自身法力低于50%时，", selfMpAbove50: "自身法力高于50%时，", selfMpAbove70: "自身法力高于70%时，", defending: "自身防御时，", selfBarrier: "自身有护盾时，", targetBarrier: "目标有护盾时，", targetDot: "目标带有持续伤害状态时，", selfControl: "自身处于可解除封印时，", selfDebuff: "自身带有减益状态时，" }, W9 = { physical: "物理", spell: "法术", fixed: "普通固定" };
function h4(_, j) {
    let q = _.mechanism, P = Number((t2(q, j) * 100).toFixed(6)), $ = H4[q.condition];
    switch (q.type) {
        case "damage": return `${$}普攻、宗门主动技能对主目标的直接${q.kinds.map((V) => W9[V]).join("、")}伤害+${P}%`;
        case "mitigation": return `${$}受到的直接${q.kinds.map((V) => W9[V]).join("、")}伤害-${P}%`;
        case "heal": return `${$}宗门主动技能对主目标的治疗量+${P}%`;
        case "barrier": return `${$}宗门主动技能对主目标的护盾量+${P}%`;
        case "evasion": return `${$}直接物理攻击的命中概率-${P}%（概率差值）`;
        case "sealResist": return `受到封印时，对方封印成功概率-${P}%（概率差值，遵守封印上下限）`;
        case "restoreHp": return `回合结束时，${$}恢复最大气血的${P}%`;
        case "restoreMp": return `回合结束时，${$}恢复最大法力的${P}%`;
    }
}
function Q9(_, j) { return [..._.effects.map((q) => `${h0[q.attribute]} +${Z9(q, j)}`), h4(_, j)]; }
function Y9(_) { return x1.parse(_); }
var I0 = (_) => _.split(`
`).filter(Boolean).map((j) => ({ kind: "line", value: j })), p = (_, j) => ({ kind: "field", label: _, value: j }), K0 = (_, j) => { var _a; return ({ kind: "quantity", label: (_a = j.quantityLabel) !== null && _a !== void 0 ? _a : "持有", value: _.quantity }); };
var O9 = (_, j) => { let q = (0, official_chunk_thhss9s9_js_1.Sf)(j.level).realm; return { summary: { icon: "\uD83D\uDCDC", color: L0[q], tier: q, type: "道装图纸" }, preview: (P) => ({ header: [p("类型", "道装图纸"), K0(_, P)], sections: [], description: `记载${_1[j.slot]}铸造之法的图纸，铸造时消耗1张。` }) }; }, R9 = (_) => { let j = Y9(_.instanceData), q = R3[j.type]; return { summary: { icon: { herb: "\uD83C\uDF3F", ore: "\uD83E\uDEA8", tcdb: "\uD83D\uDC8E", aux: "\uD83E\uDDF5", monster: "\uD83E\uDDB4", gongfa_manual: "\uD83D\uDCDA", skill_manual: "\uD83D\uDCD6" }[j.type], color: L0[j.rank], tier: j.rank, type: q }, preview: (P) => ({ header: [p("类型", `${j.rank} · ${q}`), K0(_, P)], sections: j.element ? [{ title: "道具资料", entries: [{ kind: "line", label: "五行", value: j.element }] }] : [], description: j.description || "可用于对应炼造玩法的灵材。" }) }; }, B9 = (_) => {
    let j = f1.safeParse(_.instanceData), q = j.success ? j.data.seedSpec.plant : D3.parse(_.instanceData).seedPreview;
    return { summary: { icon: "\uD83C\uDF31", color: L0[q.quality], tier: q.quality, type: "灵种" }, preview: (P) => ({ header: [p("类型", `${q.quality} · 灵种`), p("功能", "灵田培育"), p("要求", `${q.minRealm}及以上`), K0(_, P)], sections: [{ title: "道具资料", entries: [{ kind: "line", label: "五行", value: q.element }] }, ...q.clueTexts.length ? [{ title: "培育线索", entries: I0(q.clueTexts.join(`
`)) }] : []], description: q.seedDescription }) };
}, G9 = (_, j) => {
    let q = r_.find((P) => P.id === j.manualId);
    return { summary: { icon: "\uD83D\uDCD7", color: L0[q.realm], tier: "", type: "功法玉简" }, preview: (P) => ({ header: [p("类型", "功法玉简"), p("传承境界", q.realm), K0(_, P)], sections: [{ title: "所载功法", entries: I0([...Q9(q, 1), q.description].join(`
`)) }], description: "封存功法传承的玉简，可于悟道室参悟其中法门。" }) };
}, U9 = (_, j) => { let q = official_chunk_thhss9s9_js_1.Xf.some((X) => X.id === j.skillId), P = official_chunk_thhss9s9_js_1.bg.has(j.skillId), $ = !q ? "已失效" : P ? "上品" : "普通", V = X9(j.skillId); return { summary: { icon: P ? "\uD83D\uDCD5" : "\uD83D\uDCD8", color: L0[P ? "神品" : "地品"], tier: $, type: "传承灵印" }, preview: (X) => ({ header: [p("类型", `${$} · 传承灵印`), K0(_, X)], sections: [{ title: "所载传承", entries: [...I0(V.summary).map((Z) => ({ ...Z, tone: "muted" })), ...V.details ? [{ kind: "disclosure", title: "具体效果", tone: "positive", rows: I0(V.details) }] : []] }], description: P ? "封存着更为精深的妖灵传承，可助灵兽领悟其中的本领。" : "封存着妖灵传承的灵念，可助灵兽领悟其中的本领。" }) }; }, M9 = (_, j) => { let q = I_.items.find(($) => $.id === j.id); return { summary: { icon: "\uD83D\uDCA7", color: q.color === "jade" ? "text-teal" : "text-tier-tian", tier: "", type: "归元灵露" }, preview: ($) => ({ header: [p("功能", "灵兽洗炼"), p("要求", q.allowedRealms.length === official_chunk_thhss9s9_js_1.If.length ? "不限境界" : `不高于${q.allowedRealms[q.allowedRealms.length - 1]}`), K0(_, $)], sections: [{ title: "洗炼效果", entries: I0("重置等级，重新孕育资质、成长与技能，寿命恢复至原上限。") }], description: q.color === "gold" ? "元婴及以上灵兽须用此露。洗炼所得与普通归元灵露相同。" : "涤去后天积累。" }) }; }, b9 = (_) => ({ summary: { icon: "\uD83C\uDF51", color: L0["天品"], tier: "", type: "灵果" }, preview: (j) => ({ header: [p("类型", "灵果"), p("功能", "灵兽洗点"), K0(_, j)], sections: [{ title: "洗点效果", entries: I0("修为归零，野生灵兽原有的点数亏损保留。") }], description: z_.description }) });
var _5 = { 炼气: 6, 筑基: 8, 金丹: 10, 元婴: 12, 化神: 14, 炼虚: 16, 合体: 18, 大乘: 20, 渡劫: 24 }, N9 = { 炼气: 10, 筑基: 20, 金丹: 30, 元婴: 40, 化神: 50, 炼虚: 60, 合体: 70, 大乘: 80, 渡劫: 90 }, H9 = { 炼气: "玄品", 筑基: "真品", 金丹: "地品", 元婴: "天品", 化神: "神品", 炼虚: "神品", 合体: "神品", 大乘: "神品", 渡劫: "神品" }, D4 = { 炼气: "凡品", 筑基: "凡品", 金丹: "灵品", 元婴: "玄品", 化神: "玄品", 炼虚: "玄品", 合体: "玄品", 大乘: "玄品", 渡劫: "玄品" };
function h9(_) { var _a; return (_a = D4[_]) !== null && _a !== void 0 ? _a : "凡品"; }
var D9 = 1000;
const zod_16 = require("./zod.js");
var L9 = { $schema: "./body-cultivation.schema.json", formatVersion: 1, contentRevision: 1, tracks: { skin: { name: "炼体·皮肤", layerName: "防御修炼", shortDesc: "减少受到的物理伤害", benefit: { kind: "training", attribute: "defenseCultivate", perLevel: 1 } }, sinew_bone: { name: "炼体·筋骨", layerName: "攻法修炼", shortDesc: "提高造成的物理伤害", benefit: { kind: "training", attribute: "attackCultivate", perLevel: 1 } }, organs: { name: "炼体·脏腑", layerName: "法术修炼", shortDesc: "提高法术伤害与封印命中率", benefit: { kind: "training", attribute: "spellCultivate", perLevel: 1 } }, qi_blood: { name: "炼体·气血", layerName: "生命根基", shortDesc: "提高气血上限与施放治疗的恢复量", benefit: { kind: "life", hpRatioPerLevel: 0.005, healLevelsPerPoint: 2 } }, primordial_spirit: { name: "炼体·元神", layerName: "抗法修炼", shortDesc: "减少受到的法术伤害，降低被封印的概率", benefit: { kind: "training", attribute: "resistSpellCultivate", perLevel: 1 } } }, realms: [{ realm: "mortal_body", label: "凡躯", minCultivationRealm: "炼气", totalLevel: 0, softTrackCap: 5 }, { realm: "bronze_skin", label: "铜皮", minCultivationRealm: "炼气", totalLevel: 12, softTrackCap: 10 }, { realm: "iron_bone", label: "铁骨", minCultivationRealm: "筑基", totalLevel: 30, softTrackCap: 15 }, { realm: "jade_marrow", label: "玉髓", minCultivationRealm: "金丹", totalLevel: 55, softTrackCap: 22 }, { realm: "golden_body", label: "金身", minCultivationRealm: "元婴", totalLevel: 90, softTrackCap: 30 }, { realm: "dharma_body", label: "法身", minCultivationRealm: "化神", totalLevel: 140, softTrackCap: 45 }, { realm: "dao_body", label: "道体", minCultivationRealm: "合体", totalLevel: 220, softTrackCap: 60 }], progress: { base: 100, perLevel: 70, milestoneInterval: 5 } };
var U0 = ["skin", "sinew_bone", "organs", "qi_blood", "primordial_spirit"], j5 = ["mortal_body", "bronze_skin", "iron_bone", "jade_marrow", "golden_body", "dharma_body", "dao_body"], A9 = ["attackCultivate", "defenseCultivate", "spellCultivate", "resistSpellCultivate"], x_ = zod_16.z.string().min(1).max(100), G1 = zod_16.z.number().int().min(0).max(1e6), l_ = zod_16.z.strictObject({ kind: zod_16.z.literal("training"), attribute: zod_16.z.enum(A9), perLevel: zod_16.z.number().min(0).max(100) }), K4 = zod_16.z.strictObject({ kind: zod_16.z.literal("life"), hpRatioPerLevel: zod_16.z.number().min(0).max(1), healLevelsPerPoint: G1.min(1) }), j_ = { name: x_, layerName: x_, shortDesc: x_ }, A4 = zod_16.z.strictObject({ $schema: zod_16.z.string().optional(), formatVersion: zod_16.z.literal(1), contentRevision: G1.min(1), tracks: zod_16.z.strictObject({ skin: zod_16.z.strictObject({ ...j_, benefit: l_ }), sinew_bone: zod_16.z.strictObject({ ...j_, benefit: l_ }), organs: zod_16.z.strictObject({ ...j_, benefit: l_ }), qi_blood: zod_16.z.strictObject({ ...j_, benefit: K4 }), primordial_spirit: zod_16.z.strictObject({ ...j_, benefit: l_ }) }), realms: zod_16.z.array(zod_16.z.strictObject({ realm: zod_16.z.enum(j5), label: x_, minCultivationRealm: zod_16.z.enum(Object.keys(official_chunk_thhss9s9_js_1.Nf)), totalLevel: G1, softTrackCap: G1.min(1).max(1000) })).length(j5.length), progress: zod_16.z.strictObject({ base: G1.min(1), perLevel: G1, milestoneInterval: G1.min(1).max(1000) }) });
exports.Sc = U0;
function C4(_) {
    let j = A4.superRefine((q, P) => {
        let $ = (Z, W) => P.addIssue({ code: "custom", path: Z, message: W }), V = U0.flatMap((Z) => q.tracks[Z].benefit.kind === "training" ? [q.tracks[Z].benefit.attribute] : []);
        if (new Set(V).size !== A9.length)
            $(["tracks"], "四种修炼属性必须各映射一次");
        q.realms.forEach((Z, W) => {
            if (Z.realm !== j5[W])
                $(["realms", W, Z.realm], "肉身位阶顺序必须完整且与已有成长顺序一致");
            let Q = q.realms[W - 1];
            if (!Q) {
                if (Z.totalLevel !== 0)
                    $(["realms", W, "totalLevel"], "初始位阶总等级门槛必须为零");
            }
            else {
                if (Z.softTrackCap <= Q.softTrackCap || Z.totalLevel <= Q.totalLevel || official_chunk_thhss9s9_js_1.Nf[Z.minCultivationRealm] < official_chunk_thhss9s9_js_1.Nf[Q.minCultivationRealm])
                    $(["realms", W, Z.realm], "位阶门槛和上限必须递增，修为境界不能倒退");
                if (Z.totalLevel > Q.softTrackCap * U0.length)
                    $(["realms", W, "totalLevel"], "前一位阶五轨上限无法达到此门槛");
            }
        });
        let X = q.realms[q.realms.length - 1].softTrackCap;
        if (!Number.isSafeInteger(q.progress.base + q.progress.perLevel * X))
            $(["progress"], "最高等级进度需求溢出");
    }).safeParse(_);
    if (!j.success)
        throw Error((0, official_chunk_thhss9s9_js_1.eg)("bodyCultivation/data/body-cultivation.json", _, j.error.issues));
    return j.data;
}
var z0 = C4(L9);
exports.Tc = z0;
function RQ(_ = z0) { return _.realms[_.realms.length - 1].softTrackCap; }
function C9(_, j = z0) { return j.progress.base + j.progress.perLevel * Math.max(0, Math.floor(_)); }
var F4 = U0.map((_) => `body.${_}`), q_ = { vitality: "qi_blood", spirit: "organs", wisdom: "primordial_spirit", speed: "skin", willpower: "sinew_bone" }, P_ = Object.fromEntries(U0.map((_) => { let { name: j, layerName: q, shortDesc: P } = z0.tracks[_]; return [_, { name: j, layerName: q, shortDesc: P }]; })), q5 = Object.fromEntries(z0.realms.map((_) => [_.realm, _.label])), F9 = z0.realms.map((_) => _.realm), $_ = Object.fromEntries(z0.realms.map((_, j) => [_.realm, { ..._, unlockText: `五轨单轨上限${j === 0 ? " " : "提升至 "}Lv.${_.softTrackCap}` }]));
exports.Vc = q5;
exports.Wc = $_;
function w1() { return { level: 0, progress: 0 }; }
function V1(_) { return C9(_); }
function m9(_) { var _a; let j = F9.indexOf(_); return (_a = F9[j + 1]) !== null && _a !== void 0 ? _a : null; }
function I9(_, j) {
    if (!_)
        return !1;
    return official_chunk_thhss9s9_js_1.Nf[_] >= official_chunk_thhss9s9_js_1.Nf[j];
}
function f_(_) { return F4.includes(_); }
function u_(_) { return _.startsWith("tempering."); }
function n_(_) {
    if (f_(_))
        return _.replace("body.", "");
    let j = _.replace("tempering.", "");
    return q_[j];
}
function z9(_) { var _a, _g; return { level: Math.max(0, Math.floor((_a = _ === null || _ === void 0 ? void 0 : _.level) !== null && _a !== void 0 ? _a : 0)), progress: Math.max(0, Math.floor((_g = _ === null || _ === void 0 ? void 0 : _.progress) !== null && _g !== void 0 ? _g : 0)) }; }
function v9() { return { skin: w1(), sinew_bone: w1(), organs: w1(), qi_blood: w1(), primordial_spirit: w1() }; }
function P5() { return { version: 1, realm: "mortal_body", tracks: v9(), milestones: {} }; }
function y1(_) {
    var _a, _g, _h, _k, _l, _m;
    let j = P5(), q = (_a = _ === null || _ === void 0 ? void 0 : _.tracks) === null || _a === void 0 ? void 0 : _a.bodyCultivation, P = (_g = _ === null || _ === void 0 ? void 0 : _.tracks) === null || _g === void 0 ? void 0 : _g.tempering, $ = v9();
    for (let X of U0)
        $[X] = z9((_h = q === null || q === void 0 ? void 0 : q.tracks) === null || _h === void 0 ? void 0 : _h[X]);
    if (!q && P)
        for (let [X, Z] of Object.entries(q_))
            $[Z] = z9(P[X]);
    return { version: 1, realm: (q === null || q === void 0 ? void 0 : q.realm) && q.realm in q5 ? q.realm : j.realm, tracks: $, milestones: (_k = q === null || q === void 0 ? void 0 : q.milestones) !== null && _k !== void 0 ? _k : {}, breakthrough: (q === null || q === void 0 ? void 0 : q.breakthrough) && q.breakthrough.targetRealm in q5 ? { targetRealm: q.breakthrough.targetRealm, progress: Math.max(0, Math.min(100, Math.floor((_l = q.breakthrough.progress) !== null && _l !== void 0 ? _l : 0))), failedAttempts: Math.max(0, Math.floor((_m = q.breakthrough.failedAttempts) !== null && _m !== void 0 ? _m : 0)) } : void 0 };
}
function DQ(_, j, q = z0) {
    let P = { attackCultivate: 0, defenseCultivate: 0, spellCultivate: 0, resistSpellCultivate: 0 };
    for (let V of U0) {
        let X = q.tracks[V].benefit;
        if (X.kind === "training")
            P[X.attribute] = _[V] * X.perLevel;
    }
    let $ = q.tracks.qi_blood.benefit;
    return { ...P, lifeFoundationLevel: _.qi_blood, maxHpBonus: Math.floor(j * _.qi_blood * $.hpRatioPerLevel), healPowerBonus: Math.floor(_.qi_blood / $.healLevelsPerPoint) };
}
function $5(_, j, q = z0) {
    let P = Math.max(0, Math.floor(j)), $ = q.tracks[_];
    if ($.benefit.kind === "training")
        return [`${$.layerName} Lv.${P * $.benefit.perLevel}`];
    return [`裸身气血 +${Number((P * ($.benefit.hpRatioPerLevel * 100)).toFixed(1))}%`, `固定治疗强度 +${Math.floor(P / $.benefit.healLevelsPerPoint)}`];
}
function m4(_) { let j = z0.progress.milestoneInterval; return Math.max(j, Math.ceil((Math.max(0, _) + 1) / j) * j); }
function I4(_) {
    let j = m9(_.currentRealm);
    if (!j)
        return null;
    let q = $_[j], P = [{ label: `总炼体 Lv.${_.totalLevel}/${q.totalLevel}`, met: _.totalLevel >= q.totalLevel }, { label: `修为境界达到${q.minCultivationRealm}`, met: I9(_.cultivatorRealm, q.minCultivationRealm) }];
    return { key: q.realm, label: q.label, softTrackCap: q.softTrackCap, unlockText: q.unlockText, canAttempt: P.every(($) => $.met), requirements: P };
}
function V5(_, j = {}) { let q = y1(_), P = $_[q.realm], $ = U0.map((X) => { let Z = q.tracks[X], W = P_[X], Q = m4(Z.level); return { key: X, path: `body.${X}`, name: W.name, layerName: W.layerName, shortDesc: W.shortDesc, level: Z.level, progress: Z.progress, threshold: V1(Z.level), nextMilestoneLevel: Q, levelsToNextMilestone: Q - Z.level, currentEffects: $5(X, Z.level), nextLevelEffects: $5(X, Z.level + 1) }; }), V = $.reduce((X, Z) => X + Z.level, 0); return { realm: { key: P.realm, label: P.label, softTrackCap: P.softTrackCap, unlockText: P.unlockText }, totalLevel: V, tracks: $, nextRealm: I4({ currentRealm: q.realm, totalLevel: V, cultivatorRealm: j.cultivatorRealm }) }; }
function zQ(_) {
    let j = official_chunk_thhss9s9_js_1.If.indexOf(_);
    if (j < 0 || j >= official_chunk_thhss9s9_js_1.If.length - 1)
        return null;
    return official_chunk_thhss9s9_js_1.If[j + 1];
}
function z4(_) {
    switch (_) {
        case "筑基": return "筑基丹";
        case "金丹": return "降尘丹";
        case "元婴": return "护婴丹";
        case "化神": return "叩神丹";
        case "炼虚": return "洞虚丹";
        case "合体": return "合真丹";
        case "大乘": return "证道丹";
        case "渡劫": return "应劫丹";
        default: return _ ? `${_}破境丹` : "破境丹";
    }
}
function v4(_) { return _.some((j) => j.type === "add_status" && j.status === "breakthrough_focus"); }
function S9(_) {
    var _a;
    if (_.family !== "breakthrough" || !v4(_.operations))
        return null;
    return (_a = _.alchemyMeta.breakthroughLabel) !== null && _a !== void 0 ? _a : (_.alchemyMeta.breakthroughTargetRealm ? z4(_.alchemyMeta.breakthroughTargetRealm) : null);
}
var S4 = { hp: { label: "气血", icon: "❤️", description: "当前气血、气血条、恢复气血" }, mp: { label: "法力", icon: "\uD83D\uDCA7", description: "当前法力、法力条、法力消耗" }, maxHp: { label: "气血上限", icon: "❤️", description: "最大气血" }, maxMp: { label: "法力上限", icon: "\uD83D\uDCA7", description: "最大法力" }, hp_loss: { label: "气血损失", icon: "\uD83E\uDE78", description: "气血百分比损失" }, mp_loss: { label: "法力损失", icon: "\uD83D\uDCA7", description: "法力百分比损失" }, spirit_stones: { label: "灵石", icon: "\uD83D\uDCB0", description: "通用货币" }, reputation: { label: "声望", icon: "\uD83C\uDFF5️", description: "万界商行兑换所需的声望" }, contribution: { label: "宗门贡献", icon: "\uD83D\uDCDC", description: "宗门任务与建设所得的宗门内部凭证" }, cultivation_exp: { label: "修为", icon: "\uD83E\uDDD8", description: "修为进度" }, comprehension_insight: { label: "感悟", shortLabel: "感悟", icon: "\uD83D\uDCA1", description: "突破、推演功法与神通所需的感悟" }, world_qi: { label: "天地灵气", shortLabel: "灵气", icon: "\uD83C\uDF43", description: "玩法行动所消耗的天地灵气" }, lifespan: { label: "寿元", icon: "\uD83D\uDD6F️", description: "角色寿元" }, material: { label: "材料", icon: "\uD83D\uDCE6", description: "通用材料" }, artifact: { label: "法宝", icon: "\uD83D\uDDE1️", description: "法宝物品", aliases: { naming: "法宝灵器" } }, consumable: { label: "消耗品", icon: "\uD83C\uDF15", description: "丹药、符箓等消耗品" }, battle: { label: "战斗", icon: "⚔️", description: "战斗事件或代价" }, vitality: { label: h0.vitality, icon: "\uD83D\uDCAA", shortLabel: "体", description: "气血与生命根基，提升最大气血、治疗强度，并提供少量法术防御与行动速度" }, strength: { label: h0.strength, icon: "⚔️", shortLabel: "力", description: "筋力与兵刃威势，提升物理攻击，并提供少量法术防御与行动速度" }, spirit: { label: h0.spirit, icon: "⚡", shortLabel: "灵", description: "灵力浑厚程度，提升法术攻击、法力和封印命中，并提供少量法术防御" }, endurance: { label: h0.endurance, icon: "\uD83E\uDDB4", shortLabel: "骨", description: "筋骨坚韧程度，提升物理防御，并提供少量法术防御与行动速度" }, speed: { label: h0.speed, icon: "\uD83E\uDDB6", shortLabel: "身", description: "身形腾挪与步法根基，影响闪避、命中与行动速度" }, willpower: { label: h0.willpower, icon: "\uD83D\uDC41️", shortLabel: "识", description: "神魂与意志强度，提升法术防御、法力、治疗强度和封印抵抗" }, gongfa: { label: "功法", icon: "\uD83D\uDCD6", description: "功法产品", aliases: { naming: "功法典籍" } }, skill: { label: "神通", icon: "\uD83D\uDCDC", description: "神通产品", aliases: { naming: "神通招式" } }, consumable_pill: { label: "丹药", icon: "\uD83C\uDF15", description: "丹药消耗品" }, consumable_talisman: { label: "符箓", icon: "\uD83D\uDCDC", description: "符箓消耗品" }, material_herb: { label: "灵药", icon: "\uD83C\uDF3F" }, material_ore: { label: "矿石", icon: "\uD83E\uDEA8" }, material_monster: { label: "妖兽材料", icon: "\uD83D\uDC09" }, material_tcdb: { label: "天材地宝", icon: "\uD83D\uDC8E" }, material_aux: { label: "特殊辅料", icon: "\uD83D\uDCA7" }, material_gongfa_manual: { label: "功法典籍", icon: "\uD83D\uDCD6" }, material_skill_manual: { label: "神通秘术", icon: "\uD83D\uDCDC" }, element_metal: { label: "金", icon: "⚔️" }, element_wood: { label: "木", icon: "\uD83C\uDF3F" }, element_water: { label: "水", icon: "\uD83D\uDCA7" }, element_fire: { label: "火", icon: "\uD83D\uDD25" }, element_earth: { label: "土", icon: "⛰️" }, element_wind: { label: "风", icon: "\uD83C\uDF2A️" }, element_thunder: { label: "雷", icon: "⚡" }, element_ice: { label: "冰", icon: "❄️" }, equipment_weapon: { label: "攻击法宝", icon: "\uD83D\uDDE1️", aliases: { intent: "武器", naming: "战器", productNaming: "兵刃" } }, equipment_armor: { label: "护身法宝", icon: "\uD83D\uDEE1️", aliases: { intent: "护甲", naming: "护甲", productNaming: "护具" } }, equipment_accessory: { label: "辅助法宝", icon: "\uD83D\uDC8D", aliases: { intent: "配饰", naming: "玉佩", productNaming: "饰物" } }, attribute_atk: { label: "物理攻击", icon: "⚔️", shortLabel: "物攻" }, attribute_def: { label: "物理防御", icon: "\uD83D\uDEE1️", shortLabel: "物防" }, attribute_magic_atk: { label: "法术攻击", icon: "⚡", shortLabel: "法攻" }, attribute_magic_def: { label: "法术防御", icon: "\uD83D\uDEE1️", shortLabel: "法防" }, attribute_action_speed: { label: "速度", icon: "\uD83D\uDCA8", shortLabel: "速度", description: "决定战斗中的出手顺序" }, attribute_crit_rate: { label: "暴击率", icon: "\uD83C\uDFAF", shortLabel: "暴" }, attribute_crit_damage: { label: "暴击伤害", icon: "\uD83D\uDCA5", shortLabel: "暴伤" }, attribute_damage_reduction: { label: "伤害减免", icon: "\uD83D\uDEE1️", shortLabel: "减伤" }, attribute_hit_rate: { label: "命中率", icon: "\uD83C\uDFAF", shortLabel: "命" }, attribute_dodge_rate: { label: "闪避率", icon: "\uD83C\uDFC3‍♂️", shortLabel: "闪避" }, attribute_evasion_rate: { label: "闪避率", icon: "\uD83C\uDFC3‍♂️", shortLabel: "闪避" }, attribute_control_hit: { label: "控制命中", icon: "\uD83C\uDFAF", shortLabel: "控命" }, attribute_control_resistance: { label: "控制抗性", icon: "\uD83D\uDEE1️", shortLabel: "控抗" }, attribute_armor_penetration: { label: "破防", icon: "\uD83D\uDDE1️", shortLabel: "破防", aliases: { detailed: "破甲" } }, attribute_magic_penetration: { label: "法术穿透", icon: "⚡", shortLabel: "法穿", aliases: { compact: "法穿" } }, attribute_crit_resist: { label: "暴击抗性", icon: "\uD83D\uDEE1️", shortLabel: "暴抗", aliases: { detailed: "暴击韧性" } }, attribute_crit_damage_reduction: { label: "暴伤减免", icon: "\uD83D\uDEE1️", shortLabel: "暴减", aliases: { detailed: "暴击减伤" } }, attribute_accuracy: { label: "命中", icon: "\uD83C\uDFAF", shortLabel: "命中", aliases: { detailed: "精准" } }, attribute_heal_amplify: { label: "治疗加成", icon: "\uD83D\uDC9A", shortLabel: "治疗", aliases: { detailed: "治疗增强" } }, skill_type_attack: { label: "攻击", icon: "⚔️", description: "以伤害为主的直接输出神通" }, skill_type_heal: { label: "治疗", icon: "\uD83D\uDC9A", description: "恢复气血或护持自身的术法" }, skill_type_control: { label: "控制", icon: "\uD83C\uDF00", description: "封禁、禁锢、限制对手行动的术法" }, skill_type_debuff: { label: "削弱", icon: "\uD83D\uDE08", description: "削减对手战力或叠加负面状态的术法" }, skill_type_buff: { label: "增益", icon: "\uD83C\uDF1F", description: "临时强化自身或友方能力的神通" }, status_burn: { label: "灼烧", icon: "\uD83D\uDD25", description: "业火缠身，每回合损失气血" }, status_bleed: { label: "流血", icon: "\uD83E\uDE78", description: "伤口难愈，随时间流失气血" }, status_poison: { label: "中毒", icon: "☠️", description: "剧毒入骨，气血与法力缓慢流逝" }, status_stun: { label: "眩晕", icon: "\uD83C\uDF00", description: "元神震荡，暂时无法行动" }, status_silence: { label: "沉默", icon: "\uD83E\uDD10", description: "法咒受限，无法施展部分神通" }, status_root: { label: "定身", icon: "\uD83D\uDD12", description: "身形被禁锢，难以移动与闪避" }, status_armor_up: { label: "护体", icon: "\uD83D\uDEE1️", description: "护体罡气环绕，大幅减免伤害" }, status_speed_up: { label: "疾速", icon: "\uD83C\uDFC3‍♂️", description: "身形如电，出手与闪避皆获加成" }, status_crit_rate_up: { label: "会心", icon: "\uD83C\uDFAF", description: "战意如虹，暴击几率大幅提升" }, status_armor_down: { label: "破防", icon: "\uD83D\uDC94", description: "护体被破，所受伤害显著增加" }, status_crit_rate_down: { label: "暴击降低", icon: "\uD83D\uDC94", description: "暴击几率大幅降低" }, status_weakness: { label: "虚弱", icon: "\uD83D\uDE30", description: "元气大伤，尚待恢复" }, status_minor_wound: { label: "轻伤", icon: "\uD83E\uDE79", description: "身负轻伤，稍有影响" }, status_major_wound: { label: "重伤", icon: "\uD83D\uDCA5", description: "身负重伤，自然恢复减慢" }, status_near_death: { label: "濒死", icon: "☠️", description: "命悬一线，随时可能陨落" }, status_breakthrough_focus: { label: "破境凝神", icon: "\uD83D\uDD6F️", description: "心神收束，下一次破境成功率提升" }, status_protect_meridians: { label: "护脉", icon: "\uD83E\uDEA2", description: "药力护住经脉，突破失败时降低修为损失" }, status_clear_mind: { label: "清心", icon: "\uD83E\uDEB7", description: "心境澄明，突破失败不会滋生心魔" }, status_cultivation_boost: { label: "养元", icon: "\uD83C\uDF3F", description: "药力温养丹田，下一次闭关修为提升" }, status_artifact_damaged: { label: "法宝受损", icon: "\uD83D\uDC94", description: "法宝损坏，威力大减" }, status_mana_depleted: { label: "法力枯竭", icon: "\uD83D\uDCA7", description: "法力耗尽，难以施展术法" }, status_hp_deficit: { label: "气血不足", icon: "❤️", description: "气血亏虚，行动受限" }, status_scorching: { label: "酷热", icon: "\uD83C\uDF21️", description: "烈日当空，持续受到灼烧" }, status_freezing: { label: "严寒", icon: "❄️", description: "天寒地冻，行动迟缓" }, status_toxic_air: { label: "瘴气", icon: "☁️", description: "毒气弥漫，持续中毒" }, status_formation_suppressed: { label: "阵法压制", icon: "⛓️", description: "被阵法压制，实力受限" }, status_abundant_qi: { label: "灵气充沛", icon: "\uD83C\uDF43", description: "灵气浓郁，修炼速度提升" } };
function z(_) { let j = u(_); return { label: j.label, icon: j.icon }; }
function X5(_) { return a_(_); }
function X_(_) { return X5(_); }
function rQ(_) { return y4(_) || "❔"; }
function wQ(_) { return a_(_); }
var X1 = { 金: "element_metal", 木: "element_wood", 水: "element_water", 火: "element_fire", 土: "element_earth", 风: "element_wind", 雷: "element_thunder", 冰: "element_ice" }, r4 = { 金: z(X1.金), 木: z(X1.木), 水: z(X1.水), 火: z(X1.火), 土: z(X1.土), 风: z(X1.风), 雷: z(X1.雷), 冰: z(X1.冰) };
function yQ(_) { var _a; return (_a = r4[_]) !== null && _a !== void 0 ? _a : { label: _, icon: "" }; }
function v0(_) { var _a, _g; let j = u(_); return { label: j.label, icon: j.icon, shortLabel: (_a = j.shortLabel) !== null && _a !== void 0 ? _a : j.label, description: (_g = j.description) !== null && _g !== void 0 ? _g : "" }; }
var w4 = { vitality: v0("vitality"), strength: v0("strength"), spirit: v0("spirit"), endurance: v0("endurance"), speed: v0("speed"), willpower: v0("willpower"), critRate: v0("attribute_crit_rate"), critDamage: v0("attribute_crit_damage"), damageReduction: v0("attribute_damage_reduction"), flatDamageReduction: v0("attribute_damage_reduction"), hitRate: v0("attribute_hit_rate"), dodgeRate: v0("attribute_dodge_rate") };
function EQ(_) { var _a; return (_a = w4[_]) !== null && _a !== void 0 ? _a : { label: _, icon: "", shortLabel: _, description: "" }; }
function V_(_) { var _a; let j = u(_); return { label: j.label, icon: j.icon, description: (_a = j.description) !== null && _a !== void 0 ? _a : "" }; }
var dQ = { attack: V_("skill_type_attack"), heal: V_("skill_type_heal"), control: V_("skill_type_control"), debuff: V_("skill_type_debuff"), buff: V_("skill_type_buff") };
function E(_) { var _a; let j = u(_); return { label: j.label, icon: j.icon, description: (_a = j.description) !== null && _a !== void 0 ? _a : "" }; }
var TQ = { burn: E("status_burn"), bleed: E("status_bleed"), poison: E("status_poison"), stun: E("status_stun"), silence: E("status_silence"), root: E("status_root"), armor_up: E("status_armor_up"), speed_up: E("status_speed_up"), crit_rate_up: E("status_crit_rate_up"), armor_down: E("status_armor_down"), crit_rate_down: E("status_crit_rate_down"), weakness: E("status_weakness"), minor_wound: E("status_minor_wound"), major_wound: E("status_major_wound"), near_death: E("status_near_death"), breakthrough_focus: E("status_breakthrough_focus"), protect_meridians: E("status_protect_meridians"), clear_mind: E("status_clear_mind"), cultivation_boost: E("status_cultivation_boost"), artifact_damaged: E("status_artifact_damaged"), mana_depleted: E("status_mana_depleted"), hp_deficit: E("status_hp_deficit"), scorching: E("status_scorching"), freezing: E("status_freezing"), toxic_air: E("status_toxic_air"), formation_suppressed: E("status_formation_suppressed"), abundant_qi: E("status_abundant_qi") };
var gQ = { weapon: z("equipment_weapon"), armor: z("equipment_armor"), accessory: z("equipment_accessory") };
var pQ = { 丹药: z("consumable_pill"), 符箓: z("consumable_talisman"), 灵果: { label: "灵果", icon: "\uD83C\uDF51" } };
exports.$b = pQ;
var r9 = { seed: { label: "灵植种子", icon: "\uD83C\uDF31" }, herb: z("material_herb"), ore: z("material_ore"), monster: z("material_monster"), tcdb: z("material_tcdb"), aux: z("material_aux"), gongfa_manual: z("material_gongfa_manual"), skill_manual: z("material_skill_manual") };
function kQ(_) { var _a, _g; return (_g = (_a = r9[_]) === null || _a === void 0 ? void 0 : _a.label) !== null && _g !== void 0 ? _g : _; }
function oQ(_) { var _a; return (_a = r9[_]) !== null && _a !== void 0 ? _a : { label: _, icon: "" }; }
var w9 = { hp: z("hp"), mp: z("mp"), maxHp: z("maxHp"), maxMp: z("maxMp"), spirit_stones: z("spirit_stones"), reputation: z("reputation"), lifespan: z("lifespan"), cultivation_exp: z("cultivation_exp"), comprehension_insight: z("comprehension_insight"), world_qi: z("world_qi"), material: z("material"), artifact: z("artifact"), consumable: z("consumable"), hp_loss: z("hp_loss"), mp_loss: z("mp_loss"), battle: z("battle") };
function lQ(_) { var _a, _g; return (_g = (_a = w9[_]) === null || _a === void 0 ? void 0 : _a.label) !== null && _g !== void 0 ? _g : _; }
function xQ(_) { var _a; return (_a = w9[_]) !== null && _a !== void 0 ? _a : { label: _, icon: "" }; }
function u(_) { var _a; return (_a = S4[_]) !== null && _a !== void 0 ? _a : { label: _, icon: "" }; }
function a_(_) { return u(_).label; }
function y4(_) { return u(_).icon; }
class y9 {
    constructor() {
        this.templates = new Map;
    }
    register(_) { this.templates.set(_.key, _); }
    get(_) { return this.templates.get(_); }
    has(_) { return this.templates.has(_); }
    getAll() { return Array.from(this.templates.values()); }
}
function Z5(_, j, q) { var _a; let P = u(`status_${_}`); return { key: _, name: P.label, description: (_a = P.description) !== null && _a !== void 0 ? _a : "", effectDetails: [`自然恢复速度降低至 ${Math.round(j * 100)}%。`], display: { icon: P.icon, shortDesc: q }, hooks: { onNaturalRecovery: () => j } }; }
var n0 = new y9;
n0.register({ key: "weakness", name: u("status_weakness").label, description: (_a = u("status_weakness").description) !== null && _a !== void 0 ? _a : "元气大伤，尚待恢复。", effectDetails: ["保留虚弱状态记录，不改变人物战斗属性。"], display: { icon: u("status_weakness").icon, shortDesc: "元气大伤，尚待恢复" }, hooks: {} });
n0.register(Z5("minor_wound", 0.88, "自然恢复速度降低至88%，需要疗伤"));
n0.register(Z5("major_wound", 0.68, "自然恢复速度降低至68%，需要疗伤"));
n0.register(Z5("near_death", 0.42, "命悬一线，需要紧急疗伤"));
n0.register({ key: "breakthrough_focus", name: u("status_breakthrough_focus").label, description: (_g = u("status_breakthrough_focus").description) !== null && _g !== void 0 ? _g : "", effectDetails: ["下一次突破按药力获得额外成功率。"], display: { icon: u("status_breakthrough_focus").icon, shortDesc: "突破前凝神蓄势" }, hooks: {} });
n0.register({ key: "protect_meridians", name: u("status_protect_meridians").label, description: (_h = u("status_protect_meridians").description) !== null && _h !== void 0 ? _h : "", effectDetails: ["突破失败时按药力降低修为损失。"], display: { icon: u("status_protect_meridians").icon, shortDesc: "护住经脉，降低反噬" }, hooks: {} });
n0.register({ key: "clear_mind", name: u("status_clear_mind").label, description: (_k = u("status_clear_mind").description) !== null && _k !== void 0 ? _k : "", effectDetails: ["突破失败不会滋生心魔，服用时清除既有心魔。"], display: { icon: u("status_clear_mind").icon, shortDesc: "清心定神，减少杂念" }, hooks: {} });
n0.register({ key: "cultivation_boost", name: u("status_cultivation_boost").label, description: (_l = u("status_cultivation_boost").description) !== null && _l !== void 0 ? _l : "", effectDetails: ["下一次闭关修炼获得的修为按药力百分比提升。"], display: { icon: u("status_cultivation_boost").icon, shortDesc: "下一次闭关修为提升" }, hooks: {} });
function i_(_) { return n0.get(_); }
var W5 = { hpPerHour: 0.28, mpPerHour: 0.38, toxicityPenaltyDivisor: 180 };
function Z_(_, j, q) { return Math.max(j, Math.min(q, _)); }
function Q5(_) { return Number.isFinite(_) ? Math.max(0, Math.floor(_)) : 0; }
function E9(_, j) { let q = typeof (_ === null || _ === void 0 ? void 0 : _.current) === "number" && Number.isFinite(_.current) ? Math.floor(_.current) : j; return Z_(q, 0, j); }
function E4(_) {
    if (_.kind !== "time")
        return null;
    let j = Date.parse(_.expiresAt);
    return Number.isFinite(j) ? j : null;
}
function Y5(_, j = new Date) {
    if (typeof _.usesRemaining === "number" && _.usesRemaining <= 0)
        return !1;
    let q = E4(_.duration);
    if (q !== null && q <= j.getTime())
        return !1;
    return !0;
}
function g9(_, j = new Date) {
    var _a;
    let q = _;
    return ((_a = q === null || q === void 0 ? void 0 : q.statuses) !== null && _a !== void 0 ? _a : []).filter(($) => Y5($, j)).reduce(($, V) => {
        var _a, _g, _h;
        let X = (_h = (_a = i_(V.key)) === null || _a === void 0 ? void 0 : (_g = _a.hooks).onNaturalRecovery) === null || _h === void 0 ? void 0 : _h.call(_g, V, q !== null && q !== void 0 ? q : { version: 1, resources: { hp: { current: 0 }, mp: { current: 0 } }, gauges: { pillToxicity: 0 }, tracks: { bodyCultivation: P5(), tempering: { vitality: { level: 0, progress: 0 }, spirit: { level: 0, progress: 0 }, wisdom: { level: 0, progress: 0 }, speed: { level: 0, progress: 0 }, willpower: { level: 0, progress: 0 } }, marrowWash: { version: 1, level: 0, progress: 0, realm: 0, breakthroughs: 0 } }, counters: { longTermPillUsesByRealm: {}, cultivationPillUsesByRealm: {}, longevityPillUsesByRealm: {}, bodyCultivationPillUses: 0 }, statuses: [], timestamps: {} });
        if (typeof X !== "number" || !Number.isFinite(X))
            return $;
        return Math.min($, X);
    }, 1);
}
function d9(_) {
    let { resource: j, current: q, max: P, conditionInput: $, toxicityPenaltyMultiplier: V = 1, naturalRecoveryMultiplier: X = 1, now: Z = new Date } = _, W = Math.max(0, q), Q = Q5(P);
    if (W >= Q)
        return { perHour: 0, timeToFullMs: 0, isFull: !0 };
    let J = p9($, V), Y = g9($, Z), O = j === "hp" ? W5.hpPerHour : W5.mpPerHour, G = Q * O * J * Y * Math.max(0, X);
    if (G <= 0)
        return { perHour: 0, timeToFullMs: null, isFull: !1 };
    let h = Q - W;
    return { perHour: G, timeToFullMs: Math.ceil(h / G * 3600000), isFull: !1 };
}
function T9(_) { let { resource: j, current: q, max: P, elapsedHours: $, conditionInput: V, toxicityPenaltyMultiplier: X, naturalRecoveryMultiplier: Z, now: W } = _, Q = d9({ resource: j, current: q, max: P, conditionInput: V, toxicityPenaltyMultiplier: X, naturalRecoveryMultiplier: Z, now: W }), J = Math.max(0, Math.min(P - q, Math.floor(Q.perHour * $))), Y = Z_(q + J, 0, P); return { ...d9({ resource: j, current: Y, max: P, conditionInput: V, toxicityPenaltyMultiplier: X, naturalRecoveryMultiplier: Z, now: W }), current: Y, max: P, recovered: J }; }
function eQ(_) { var _a; let { conditionInput: j, toxicityPenaltyMultiplier: q = 1, naturalRecoveryMultiplier: P = 1, now: $ } = _, V = Q5(_.maxHp), X = Q5(_.maxMp), Z = E9(j === null || j === void 0 ? void 0 : j.resources.hp, V), W = E9(j === null || j === void 0 ? void 0 : j.resources.mp, X), Q = Date.parse((_a = j === null || j === void 0 ? void 0 : j.timestamps.lastRecoveryAt) !== null && _a !== void 0 ? _a : ""), J = Number.isFinite(Q), Y = J ? Math.max(0, $.getTime() - Q) : 0, O = Y / 3600000, G = p9(j, q), h = g9(j, $), K = G * h * Math.max(0, P), B = T9({ resource: "hp", current: Z, max: V, elapsedHours: O, conditionInput: j, toxicityPenaltyMultiplier: q, naturalRecoveryMultiplier: P, now: $ }), D = T9({ resource: "mp", current: W, max: X, elapsedHours: O, conditionInput: j, toxicityPenaltyMultiplier: q, naturalRecoveryMultiplier: P, now: $ }); return { resources: { hp: { current: B.current, max: B.max }, mp: { current: D.current, max: D.max } }, recovery: { hp: B, mp: D }, elapsedMs: Y, recoveryFactor: K, timestampValid: J }; }
function p9(_, j = 1) { var _a; let q = y1(_).tracks.qi_blood.level, P = Z_(1 - q * 0.003, 0.75, 1); return Z_(1 - Math.max(0, (_a = _ === null || _ === void 0 ? void 0 : _.gauges.pillToxicity) !== null && _a !== void 0 ? _a : 0) / W5.toxicityPenaltyDivisor * Math.max(0, j) * P, 0.3, 1); }
function d4(_, j = 1) { var _a; let q = Math.max(0, (_a = _ === null || _ === void 0 ? void 0 : _.gauges.pillToxicity) !== null && _a !== void 0 ? _a : 0); return Z_(q / D9 * Math.max(0, j), 0, 0.18); }
function tQ(_, j = 1) { return Number((d4(_, j) * 100).toFixed(1)); }
function _Y(_) {
    var _a;
    let j = Math.max(0, (_a = _ === null || _ === void 0 ? void 0 : _.gauges.pillToxicity) !== null && _a !== void 0 ? _a : 0);
    if (j >= 700)
        return { key: "critical", label: "毒火攻心" };
    if (j >= 400)
        return { key: "heavy", label: "丹毒郁结" };
    if (j >= 200)
        return { key: "light", label: "丹毒轻染" };
    return { key: "none", label: "无明显丹毒" };
}
var s_ = "cultivation_boost", k9 = 0, g4 = 100;
exports.gd = s_;
function p4(_, j, q) { return Math.max(j, Math.min(q, _)); }
function k4(_) {
    if (!Number.isFinite(_))
        return k9;
    return Number(p4(_, k9, g4).toFixed(4));
}
function J5(_) { var _a; let j = _.payload, q = typeof (j === null || j === void 0 ? void 0 : j.boostPercent) === "number" ? j.boostPercent : void 0, P = typeof (j === null || j === void 0 ? void 0 : j.retreatExpMultiplier) === "number" ? j.retreatExpMultiplier - 1 : void 0; return k4((_a = q !== null && q !== void 0 ? q : P) !== null && _a !== void 0 ? _a : 0); }
function O5(_) { let j = Number((J5(_) * 100).toFixed(1)); return `下次闭关修为 +${Number.isInteger(j) ? j.toFixed(0) : j}%`; }
function $Y(_, j = new Date) {
    var _a;
    let P = ((_a = _ === null || _ === void 0 ? void 0 : _.statuses) !== null && _a !== void 0 ? _a : []).filter(($) => { var _a; return $.key === s_ && Y5($, j) && ((_a = $.usesRemaining) !== null && _a !== void 0 ? _a : 1) > 0; });
    if (P.length === 0)
        return null;
    return P.reduce(($, V) => J5(V) > J5($) ? V : $);
}
var o4 = { low: 0.9, middle: 1, high: 1.1, perfect: 1.3 };
exports.kd = o4;
var l4 = { low: { grade: "low", label: "下品", effectMultiplier: 0.9, toxicityMultiplier: 1.35, colorClass: "text-tier-fan" }, middle: { grade: "middle", label: "中品", effectMultiplier: 1, toxicityMultiplier: 1, colorClass: "text-tier-xuan" }, high: { grade: "high", label: "上品", effectMultiplier: 1.1, toxicityMultiplier: 0.65, colorClass: "text-tier-tian" }, perfect: { grade: "perfect", label: "完美", effectMultiplier: 1.3, toxicityMultiplier: 0, colorClass: "text-tier-shen" } };
function o9(_) { return _ ? l4[_].label : "旧制"; }
var l9 = "breakthrough_focus", x9 = "protect_meridians", f9 = "clear_mind", x4 = 0.06, f4 = 0.4;
exports.md = l9;
exports.nd = x9;
exports.od = f9;
function u9(_, j, q) { return Math.max(j, Math.min(q, _)); }
function n9(_) {
    var _a;
    let j = (_a = _.payload) === null || _a === void 0 ? void 0 : _a.breakthroughChanceBonus;
    if (typeof j !== "number" || !Number.isFinite(j))
        return x4;
    return u9(j, 0, 1);
}
function a9(_) {
    var _a;
    let j = (_a = _.payload) === null || _a === void 0 ? void 0 : _a.failureExpLossReductionPercent;
    if (typeof j !== "number" || !Number.isFinite(j))
        return f4;
    return u9(j, 0, 1);
}
function R5(_) { return _5[_]; }
function u4(_) { return N9[_]; }
function B5(_) { return _5[_]; }
function i9(_) {
    switch (_.family) {
        case "longevity": return "longevity";
        default: return "none";
    }
}
function s9(_, j) { let q = _ === "cultivation" ? u4(j) : _ === "longevity" ? B5(j) : R5(j); return Number.isFinite(q) ? q : null; }
function c9(_, j) {
    if (_ === "none")
        return null;
    if (!j)
        return _ === "longevity" ? "寿元丹上限随境界变化" : "服用上限随境界变化";
    let q = s9(_, j);
    if (q === null)
        return _ === "longevity" ? "寿元丹上限随境界变化" : "服用上限随境界变化";
    if (_ === "longevity")
        return `寿元丹上限 ${q} 次`;
    return `服用上限 ${q} 次`;
}
function e9(_, j) {
    if (_ === "none")
        return null;
    if (!j)
        return _ === "longevity" ? "寿元丹服用上限：随当前境界变化" : "服用上限：随当前境界变化";
    let q = s9(_, j);
    if (q === null)
        return _ === "longevity" ? "寿元丹服用上限：随当前境界变化" : "服用上限：随当前境界变化";
    if (_ === "longevity")
        return `寿元丹服用上限：${q} 次`;
    return `服用上限：${q} 次`;
}
var UY = 20;
exports.rd = UY;
var t9 = { 炼气: 10, 筑基: 20, 金丹: 35, 元婴: 50, 化神: 70, 炼虚: 90, 合体: 120, 大乘: 120, 渡劫: 120 };
function G5(_) { return 120 + 60 * Math.max(0, Math.floor(_)); }
function n4(_) { return _ ? t9[_] : t9.炼气; }
function a4(_) { var _a, _g, _h, _k, _l; let j = (_a = _ === null || _ === void 0 ? void 0 : _.tracks) === null || _a === void 0 ? void 0 : _a.marrowWash, q = Math.max(0, Math.floor((_g = j === null || j === void 0 ? void 0 : j.level) !== null && _g !== void 0 ? _g : 0)), P = Math.max(0, Math.floor((_h = j === null || j === void 0 ? void 0 : j.progress) !== null && _h !== void 0 ? _h : 0)), $ = Math.max(0, Math.floor((_k = j === null || j === void 0 ? void 0 : j.breakthroughs) !== null && _k !== void 0 ? _k : 0)), V = Math.max(0, Math.floor((_l = j === null || j === void 0 ? void 0 : j.realm) !== null && _l !== void 0 ? _l : 0)), X = Math.max($, V), Z = X, W = _j({ breakthroughs: X }), Q = Math.min(q, W), J = q >= W ? 0 : P; return { version: 1, level: Q, progress: J, realm: Z, breakthroughs: X }; }
function i4(_) { return _ <= 0 ? "未破限" : `第${_}重`; }
function _j(_) { var _a; return (Math.max(0, Math.floor((_a = _.breakthroughs) !== null && _a !== void 0 ? _a : 0)) + 1) * 10; }
function MY(_, j = {}) { let q = a4(_), P = n4(j.cultivatorRealm), $ = _j(q), V = $ <= P; return { level: q.level, progress: q.progress, threshold: G5(q.level), realm: q.realm, realmLabel: i4(q.realm), breakthroughs: q.breakthroughs, levelCap: P, nextBreakthroughLevel: V ? $ : null, canBreakthrough: V && q.level >= $ }; }
var jj = { ...Object.fromEntries(U0.map((_) => { let j = P_[_]; return [`body.${_}`, { key: `body.${_}`, name: j.name, shortDesc: j.shortDesc, thresholdByLevel: V1, reward: { kind: "body_modifier" } }]; })), ...Object.fromEntries(Object.entries(q_).map(([_, j]) => { let q = P_[j]; return [`tempering.${_}`, { key: `tempering.${_}`, name: q.name, shortDesc: `${q.shortDesc}（旧炼体进度已重铸）`, thresholdByLevel: V1, reward: { kind: "body_modifier" } }]; })), marrow_wash: { key: "marrow_wash", name: "洗髓", shortDesc: "升级后获得 1 点自由属性点，破限后强化后天灵根强度", thresholdByLevel: G5, reward: { kind: "none" } } };
function U5(_) {
    if (u_(_)) {
        let j = n_(_);
        return jj[`body.${j}`];
    }
    return jj[_];
}
function c_(_) { let j = Number((_ * 100).toFixed(1)); return `${Number.isInteger(j) ? j.toFixed(0) : j}%`; }
function W_(_) { var _a, _g; return (_g = (_a = i_(_)) === null || _a === void 0 ? void 0 : _a.name) !== null && _g !== void 0 ? _g : _; }
function M5(_) {
    if (_.mode === "percent")
        return `恢复最大${X_(_.resource)} ${c_(_.value)}`;
    return `恢复${X_(_.resource)} ${_.value}`;
}
function s4(_) {
    if (_.mode === "percent")
        return `最大${X_(_.resource)} ${c_(_.value)}`;
    return `${X_(_.resource)} ${_.value}`;
}
function H5(_) { return `丹毒 ${_ > 0 ? "+" : ""}${_}`; }
function c4(_) {
    let { appearance: j } = _.alchemyMeta;
    if (!j)
        return;
    return { grade: j, label: o9(j) };
}
function b5(_) { return _ === "cultivation_exp" ? X5("cultivation_exp") : "感悟"; }
function qj(_) { return `寿元 +${Math.max(0, Math.floor(_))} 年`; }
function h5(_) { return S9(_); }
function e4(_, j) {
    let q = (() => {
        switch (_) {
            case "long_term": return R5(j);
            case "longevity": return B5(j);
            case "cultivation":
            case "none": return null;
        }
    })();
    return Number.isFinite(q) ? q : null;
}
function t4(_, j, q) { var _a, _g, _h, _k; let P = (_a = _.counters) !== null && _a !== void 0 ? _a : {}, $ = (_g = P.longTermPillUsesByRealm) !== null && _g !== void 0 ? _g : {}, V = (_h = P.cultivationPillUsesByRealm) !== null && _h !== void 0 ? _h : {}, X = (_k = P.longevityPillUsesByRealm) !== null && _k !== void 0 ? _k : {}, Z = j === "long_term" ? $[q] : j === "cultivation" ? V[q] : j === "longevity" ? X[q] : 0; return Number.isFinite(Z) ? Math.max(0, Math.floor(Z !== null && Z !== void 0 ? Z : 0)) : 0; }
function Pj(_, j) {
    if (_ === "none" || !(j === null || j === void 0 ? void 0 : j.realm) || !j.condition)
        return null;
    let q = e4(_, j.realm);
    if (q === null)
        return null;
    let P = t4(j.condition, _, j.realm), $ = Math.max(0, q - P);
    return { keyword: _ === "longevity" ? `寿元丹剩余 ${$}/${q}` : `剩余 ${$}/${q}`, rule: `本境界已服 ${P}/${q}，尚可服 ${$} 颗` };
}
function N5(_) { return i9(_); }
function M1(_) {
    switch (_) {
        case "healing": return "疗伤";
        case "mana": return "回元";
        case "detox": return "解毒";
        case "beast_cultivation": return "灵兽修为";
        case "cultivation": return a_("cultivation_exp");
        case "insight": return "感悟";
        case "breakthrough": return "破境";
        case "tempering": return "炼体";
        case "marrow_wash": return "洗髓";
        case "longevity": return "延寿";
        case "hybrid": return "复合";
    }
}
function E1(_) {
    var _a, _g, _h, _k;
    switch (_.type) {
        case "restore_resource": return M5(_);
        case "change_gauge": return H5(_.delta);
        case "gain_beast_cultivation": return `灵兽修为 +${_.value}`;
        case "gain_progress": return `${b5(_.target)} +${_.value}`;
        case "increase_lifespan": return qj(_.value);
        case "remove_status": return `化解「${W_(_.status)}」`;
        case "add_status":
            if (_.status === s_)
                return `${O5(_)}（可用 ${(_a = _.usesRemaining) !== null && _a !== void 0 ? _a : 1} 次）`;
            if (_.status === l9)
                return `${W_(_.status)}：破境成功率 +${c_(n9(_))}（可用 ${(_g = _.usesRemaining) !== null && _g !== void 0 ? _g : 1} 次）`;
            if (_.status === x9)
                return `${W_(_.status)}：突破失败修为损失降低 ${c_(a9(_))}（可用 ${(_h = _.usesRemaining) !== null && _h !== void 0 ? _h : 1} 次）`;
            if (_.status === f9)
                return `${W_(_.status)}：突破失败不会滋生心魔（可用 ${(_k = _.usesRemaining) !== null && _k !== void 0 ? _k : 1} 次）`;
            return `获得「${W_(_.status)}」${typeof _.usesRemaining === "number" ? `（可用 ${_.usesRemaining} 次）` : ""}`;
        case "advance_track":
            if (_.track === "marrow_wash")
                return `推进洗髓进度 +${_.value}，升级可获得自由属性点`;
            return `推进${U5(_.track).name} +${_.value}`;
    }
}
function $j(_) {
    switch (_.family) {
        case "healing":
        case "mana": {
            let j = _.operations.find((q) => q.type === "restore_resource");
            return j ? M5(j) : `${M1(_.family)}药效`;
        }
        case "hybrid": {
            let j = _.operations.filter((q) => q.type === "restore_resource");
            if (j.length === 0)
                return "复合药效";
            return j.map((q, P) => P === 0 ? M5(q) : s4(q)).join(" / ");
        }
        case "detox": {
            let j = _.operations.find((q) => q.type === "change_gauge");
            return j ? H5(j.delta) : "调理丹毒";
        }
        case "insight": {
            let j = _.operations.find((q) => q.type === "gain_progress");
            return j ? `${b5(j.target)} +${j.value}` : `${M1(_.family)}药效`;
        }
        case "beast_cultivation": return "灵兽修为";
        case "cultivation": {
            let j = _.operations.find((P) => P.type === "add_status" && P.status === s_);
            if (j)
                return O5(j);
            let q = _.operations.find((P) => P.type === "gain_progress");
            return q ? `${b5(q.target)} +${q.value}` : `${M1(_.family)}药效`;
        }
        case "breakthrough": {
            let j = _.operations.find((P) => P.type === "add_status"), q = h5(_);
            if (!j)
                return q ? `${q}，助力破境` : "助力破境";
            return q ? `${q}：${E1(j)}` : E1(j);
        }
        case "tempering":
        case "marrow_wash": {
            let j = _.operations.find((q) => q.type === "advance_track");
            return j ? E1(j) : "推进修炼进度";
        }
        case "longevity": {
            let j = _.operations.find((q) => q.type === "increase_lifespan");
            return j ? E1(j) : "延续寿元";
        }
    }
}
function _6(_, j) {
    var _a, _g;
    let q = _.operations.find((V) => V.type === "increase_lifespan"), P = [M1(_.family), _.family === "longevity" && q ? qj(q.value) : null, _.family === "breakthrough" ? h5(_) : null, (_g = (_a = Pj(N5(_), j)) === null || _a === void 0 ? void 0 : _a.keyword) !== null && _g !== void 0 ? _g : c9(N5(_), j === null || j === void 0 ? void 0 : j.realm)].filter((V) => Boolean(V)), $ = _.operations.find((V) => V.type === "change_gauge");
    if ($)
        P.push(H5($.delta));
    return P.slice(0, 3);
}
function D5(_) { return _.operations.filter((j) => j.type !== "change_gauge" || j.delta < 0).map(E1); }
function j6(_) { let j = D5(_); return j.length > 0 ? j.join(" / ") : $j(_); }
function q6(_, j) {
    var _a, _g;
    let q = _.operations.filter((V) => V.type === "change_gauge" && V.delta >= 0).map((V) => E1(V));
    if (_.operations.some((V) => V.type === "gain_beast_cultivation"))
        return q;
    let P = N5(_), $ = (_g = (_a = Pj(P, j)) === null || _a === void 0 ? void 0 : _a.rule) !== null && _g !== void 0 ? _g : e9(P, j === null || j === void 0 ? void 0 : j.realm);
    if ($)
        q.push($);
    return q;
}
function P6(_) {
    let j = Math.max(0, Math.floor(_.level)), q = Math.max(0, Math.floor(_.progress)), P = Math.max(0, Math.floor(_.value));
    while (P > 0) {
        let V = Math.max(1, _.thresholdByLevel(j)) - q;
        if (P < V) {
            q += P;
            break;
        }
        P -= V, j += 1, q = 0;
    }
    return { level: j, progress: q, threshold: Math.max(1, _.thresholdByLevel(j)) };
}
function $6(_, j) {
    var _a;
    if (!f_(_.track) && !u_(_.track))
        return [];
    let q = n_(_.track), P = y1(j), $ = P.tracks[q], V = $_[P.realm].softTrackCap, X = P6({ level: $.level, progress: $.progress, value: _.value, thresholdByLevel: V1 }), Z = V5(j).tracks.find((G) => G.key === q), W = { ...j, tracks: { ...j.tracks, bodyCultivation: { ...P, tracks: { ...P.tracks, [q]: { level: X.level, progress: X.progress } } } } }, Q = V5(W).tracks.find((G) => G.key === q), J = (_a = Z === null || Z === void 0 ? void 0 : Z.name) !== null && _a !== void 0 ? _a : U5(_.track).name, Y = V1($.level), O = [`推进轨道：${J.replace("炼体·", "")} +${_.value}`, `当前肉身境界单轨上限：Lv.${V}`];
    if ($.level >= V)
        return O.push("已达上限，请先完成肉身破限"), O;
    if (X.level > V || X.level === V && X.progress > 0)
        return O.push(`预计超过上限：Lv.${$.level} ${$.progress}/${Y} -> Lv.${X.level} ${X.progress}/${X.threshold}`, "请先完成肉身破限后再服用"), O;
    if (O.push(`预计进度：Lv.${$.level} ${$.progress}/${Y} -> Lv.${X.level} ${X.progress}/${X.threshold}`), X.level > $.level && Q)
        O.push(`升级后收益：${Q.currentEffects.join("、")}`, `下个节点：Lv.${Q.nextMilestoneLevel}`);
    else if (Z)
        O.push(`当前收益：${Z.currentEffects.join("、")}`);
    return O;
}
function Vj(_, j) {
    if (!(j === null || j === void 0 ? void 0 : j.condition))
        return [];
    return _.operations.flatMap((q) => q.type === "advance_track" ? $6(q, j.condition) : []);
}
function V6(_) { let { alchemyMeta: j } = _.spec, q = h5(_.spec); return [q ? `破境用途：${q}` : void 0, j.breakthroughTargetRealm ? `目标大境界：${j.breakthroughTargetRealm}` : void 0].filter((P) => Boolean(P)); }
function Xj(_, j) { let q = Vj(_.spec, j), P = V6(_); return { familyLabel: M1(_.spec.family), appearance: c4(_.spec), primaryEffect: $j(_.spec), effectSummary: j6(_.spec), keywordLabels: _6(_.spec, j), detailGroups: [{ key: "core-effects", role: "effect", title: "核心药效", lines: D5(_.spec) }, ...q.length > 0 ? [{ key: "track-preview", role: "preview", title: "服用预览", lines: q }] : [], { key: "cost-and-rules", role: "restriction", title: "代价", lines: q6(_.spec, j) }, ...P.length ? [{ key: "alchemy-info", role: "source", collapsible: !0, title: "破境信息", lines: P }] : []], flavorText: void 0 }; }
function X6(_, j) {
    var _a;
    if (_.spec.operations.some((X) => X.type === "gain_beast_cultivation"))
        return [];
    if (!j)
        return [];
    let q = (_a = _.quality) !== null && _a !== void 0 ? _a : "凡品", P = h9(j), $ = H9[j], V = official_chunk_thhss9s9_js_1.Mf[q];
    if (V > official_chunk_thhss9s9_js_1.Mf[$])
        return [`当前境界最多可承受${$}灵果，此果药力过盛`];
    if (V < official_chunk_thhss9s9_js_1.Mf[P])
        return [`当前境界至少需要${P}灵果，此果药力过于稀薄`];
    return [];
}
function Zj(_, j) { var _a; let q = D5(_.spec), P = Vj(_.spec, j); return { familyLabel: M1(_.spec.family), primaryEffect: (_a = q[0]) !== null && _a !== void 0 ? _a : "天地造化药效", effectSummary: q.join(" / ") || "天地造化药效", keywordLabels: [M1(_.spec.family)], detailGroups: [{ key: "core-effects", role: "effect", title: "核心效用", lines: q }, ...P.length > 0 ? [{ key: "track-preview", role: "preview", title: "服用预览", lines: P }] : [], { key: "fruit-rules", role: "restriction", title: "服用规则", lines: [...X6(_, j === null || j === void 0 ? void 0 : j.realm)] }], flavorText: _.description }; }
var e_ = "attribute_reset", Wj = "归元洗髓符";
exports.qe = Wj;
function L5(_) { return _ === "attribute_reset"; }
var Q_ = "identity_reshape", dY = "改天换地符";
exports.jc = dY;
var TY = 2, gY = 200;
exports.kc = TY;
exports.lc = gY;
function W0(..._) { return _.map((j, q) => ({ id: String.fromCharCode(97 + q), label: j })); }
var Z6 = [{ id: "dao-water", source: "《道德经》", quote: "上善若水，水善利万物而不争。", prompt: "身处争流，你愿如何自处？", options: W0("润物不争", "顺势而行", "聚流破障") }, { id: "dao-self-knowing", source: "《道德经》", quote: "知人者智，自知者明。", prompt: "你更愿先照见什么？", options: W0("自己的本心", "众人的所求", "世局的变化") }, { id: "dao-bend-whole", source: "《道德经》", quote: "曲则全，枉则直。", prompt: "遭逢逆境时，你会如何？", options: W0("守柔待时", "迎难直进", "另辟蹊径") }, { id: "dao-stillness", source: "《道德经》", quote: "致虚极，守静笃。", prompt: "心念纷乱时，你从何处求解？", options: W0("静中观变", "行中求证", "向人问道") }, { id: "dao-first-step", source: "《道德经》", quote: "千里之行，始于足下。", prompt: "面对遥远道途，你先做什么？", options: W0("走好眼前一步", "先定最终归处", "等待真正契机") }, { id: "zhuangzi-deep-water", source: "《庄子·逍遥游》", quote: "水之积也不厚，则其负大舟也无力。", prompt: "远志与根基之间，你如何取舍？", options: W0("厚积根基", "借势远行", "以险境磨砺自己") }, { id: "zhuangzi-right-wrong", source: "《庄子·齐物论》", quote: "彼亦一是非，此亦一是非。", prompt: "遇见相反立场时，你会如何？", options: W0("求同存异", "坚守己见", "暂忘是非之分") }, { id: "zhuangzi-natural-pattern", source: "《庄子·养生主》", quote: "依乎天理……因其固然。", prompt: "困局横在眼前，你从哪里破局？", options: W0("循理取隙", "以力破局", "退后重新谋划") }, { id: "zhuangzi-empty-room", source: "《庄子·人间世》", quote: "虚室生白，吉祥止止。", prompt: "怎样的心境最接近真实的你？", options: W0("清空成见", "守住所信", "让喧嚣催我醒来") }, { id: "yi-heaven", source: "《周易·乾》", quote: "天行健，君子以自强不息。", prompt: "你相信力量主要来自哪里？", options: W0("不息的修行", "同行者的扶持", "长期蓄势后的决断") }, { id: "yi-earth", source: "《周易·坤》", quote: "地势坤，君子以厚德载物。", prompt: "面对众生牵挂，你愿承担什么？", options: W0("包容承载", "明辨取舍", "只守护最亲近之人") }, { id: "yi-humility", source: "《周易·谦》", quote: "谦谦君子，卑以自牧也。", prompt: "声名来到身前时，你会如何？", options: W0("敛锋自省", "当仁不让", "功成身退") }, { id: "yi-change", source: "《周易·系辞下》", quote: "穷则变，变则通，通则久。", prompt: "道路已尽时，你会如何？", options: W0("主动变通", "坚守到底", "暂退蓄势") }, { id: "yi-many-views", source: "《周易·系辞上》", quote: "仁者见之谓之仁，知者见之谓之知。", prompt: "面对同一件事的多种解释，你相信什么？", options: W0("接纳多解", "追寻唯一真义", "让结果作答") }, { id: "clarity-stillness", source: "《太上老君说常清静经》", quote: "人能常清静，天地悉皆归。", prompt: "世事扰心时，你如何安顿自己？", options: W0("守静澄心", "入世解纷", "随性而化") }, { id: "response-and-retribution", source: "《太上感应篇》", quote: "祸福无门，惟人自召。", prompt: "面对因果与取舍，你最看重什么？", options: W0("慎独积善", "先问本心", "权衡远近得失") }], pY = new Map(Z6.map((_) => [_.id, _]));
var oY = 240, lY = 1, xY = 360000, fY = 2400;
exports.re = oY;
exports.se = lY;
exports.te = xY;
exports.ue = fY;
var W6 = { dungeon_start: 50, wild_search: 2, retreat_10_years: 4, breakthrough_attempt: 20, alchemy_improvised: 1, alchemy_formula: 1, equipment_forge: 7, manual_enlightenment: 1, inscription_draw: 1, marrow_wash_breakthrough: 20, market_identify: 1, black_market_entry: 5, spirit_field_care: 5 }, t_ = { qi_restore_small: { amount: 50, label: "小聚灵符" }, qi_restore_medium: { amount: 100, label: "中聚灵符" }, qi_restore_large: { amount: 200, label: "大聚灵符" }, qi_restore_fill_to_max: { amount: "fill_to_max", label: "天地引气符" } };
exports.ve = W6;
function _2(_) { return Object.prototype.hasOwnProperty.call(t_, _); }
function uY(_) { return Math.ceil(Math.max(0, _) / 10) * W6.retreat_10_years; }
var j2 = "sect_meridian_reset", Qj = "洗脉符";
function K5(_) { return _ === "sect_meridian_reset"; }
var Y_ = "sect_transfer", iY = "欺天符";
exports.xe = iY;
var J_ = "friend_mail_send", O_ = "auction_private_listing", cY = 200;
exports.ye = cY;
var Q6 = { [e_]: "根基属性重洗", [Y_]: "欺天符·无损转宗", [j2]: "洗脉符·流派节点重置", fate_reshape: "命格重塑", [Q_]: "改天换地·身份重塑", draw_gongfa: "旧版功法抽取（已停用）", draw_skill: "旧版神通抽取（已停用）", [J_]: "传音玉简·好友传音", [O_]: "拍卖行·专属交易" }, Y6 = { [Y_]: "/game/sect/transfer", fate_reshape: "/game/fate-reshape", [Q_]: "/game/identity-reshape", [J_]: "/game/mail", [O_]: "/game/auction" }, J6 = { [e_]: "使用", [j2]: "使用", [Y_]: "前往欺天台转宗", fate_reshape: "前往重塑", [Q_]: "前往改命", [J_]: "去传音", [O_]: "去上架" }, ZJ = { [e_]: "【可在背包中直接使用，重置六维自由分配并返还属性点】", [j2]: "【战斗外使用，清空新版宗门两流派节点，保留共用深度】", [Y_]: "【前往欺天台查看转宗后的变化，确认成功后才会消耗】", fate_reshape: "【前往命格重塑功能页启封，开启时立即扣除】", [Q_]: "【前往身份重塑文戏启封，开启时立即扣除】", draw_gongfa: "【旧版抽取已停用，符箓暂存，后续玩法另行设计】", draw_skill: "【旧版抽取已停用，符箓暂存，后续玩法另行设计】", [J_]: "【前往传音玉简，给好友发送传音时消耗；不足时可去万界商行购买】", [O_]: "【前往拍卖行，上架专属交易时消耗；不足时可去万界商行购买】" };
function O6(_) {
    if (!_2(_))
        return null;
    let j = t_[_].amount;
    return j === "fill_to_max" ? "将天地灵气补至基础上限" : `恢复 ${j} 点天地灵气`;
}
function WJ(_) { return B1(_) && _2(_.spec.scenario); }
function QJ(_) { return B1(_) && L5(_.spec.scenario); }
function YJ(_) { return B1(_) && K5(_.spec.scenario); }
function Yj(_) {
    var _a;
    if (_2(_))
        return t_[_].label;
    return (_a = Q6[_]) !== null && _a !== void 0 ? _a : "专属玩法符箓";
}
function JJ(_) {
    if (!B1(_))
        return;
    return Y6[_.spec.scenario];
}
function OJ(_) {
    var _a;
    if (!B1(_))
        return null;
    return (_a = J6[_.spec.scenario]) !== null && _a !== void 0 ? _a : null;
}
function Jj(_) {
    var _a, _g;
    if (!B1(_))
        return [];
    let j = _.spec.scenario;
    if (["draw_gongfa", "draw_skill"].includes(j))
        return [{ value: "旧版抽取已停用，符箓暂存；暂不转换、不补偿，后续玩法另行设计。" }];
    let q = O6(j), P;
    if (L5(j))
        P = [{ label: "用途", value: "重置六维自由分配，返还已投入的可分配属性点" }, { label: "使用方式", value: "可在背包中直接使用，也可在根基属性页确认启封" }, { value: (_a = _.spec.notes) !== null && _a !== void 0 ? _a : `${Wj}启封后，六维回到当前境界自然成长值。` }];
    else if (K5(j))
        P = [{ label: "用途", value: "清空新版宗门两流派各一套节点方案" }, { label: "保留", value: "共用经脉深度、心法等级、当前流派、道印与装备" }, { label: "使用方式", value: "可在背包中直接使用；没有已选节点时不会消耗" }, { value: (_g = _.spec.notes) !== null && _g !== void 0 ? _g : `${Qj}启封后，可按已解锁的共用深度重新参悟；平时也可免费逐层调整节点。` }];
    else
        P = [...q ? [{ label: "用途", value: q }] : [], { label: "使用方式", value: q ? "可在背包中直接使用" : "需在对应玩法入口使用" }, ..._.spec.notes ? [{ value: _.spec.notes }] : []];
    return P.filter(($) => Boolean($.value));
}
var R6 = { effect: "positive", preview: "normal", restriction: "warning", source: "muted" }, Oj = (_) => {
    let j = { ...C1.parse(_.instanceData), quantity: _.quantity };
    return { summary: { icon: j.type === "丹药" ? "\uD83C\uDF15" : j.type === "灵果" ? "\uD83C\uDF51" : "\uD83E\uDDE7", color: L0[j.spec.kind === "talisman" ? "仙品" : j.quality], tier: j.quality, type: j.type }, preview: (q) => {
            let P = p("类型", `${j.quality} · ${j.type}`);
            if (j.spec.kind === "talisman")
                return { header: [P, K0(_, q)], sections: [{ title: "道具资料", entries: [{ kind: "line", label: "用途", value: Yj(j.spec.scenario) }] }, { title: "符箓效用", entries: Jj(j).map((V) => ({ kind: "line", ...V })) }], description: j.description };
            let $ = j.spec.kind === "pill" ? Xj({ ...j, spec: j.spec }, q) : Zj({ ...j, spec: j.spec }, q);
            return { header: [P, ...$.appearance ? [p("丹相", $.appearance.label)] : [], p("功能", $.familyLabel), K0(_, q)], sections: $.detailGroups.filter((V) => V.lines.length).map((V) => ({ title: V.title, entries: V.lines.flatMap((X) => I0(X)), tone: R6[V.role], ...V.collapsible ? { collapsible: !0 } : {} })), description: j.spec.kind === "pill" ? void 0 : j.description };
        } };
};
var B6 = { weapon: "⚔️", head: "\uD83D\uDC51", armor: "\uD83E\uDD4B", necklace: "\uD83D\uDCFF", belt: "\uD83C\uDF97️", footwear: "\uD83D\uDC62" }, Rj = (_) => `${_ >= 0 ? "+" : ""}${_}`;
function G6(_) {
    let j = [];
    for (let V of ["baseStats", "attributeBonuses"]) {
        let X = _[V].map((Z) => ({ label: V === "attributeBonuses" ? h0[Z.attr] : S1[Z.attr], value: Rj(Z.value), numeric: !0, tone: V === "attributeBonuses" ? "positive" : "normal" }));
        if (X.length)
            j.push({ title: V === "baseStats" ? "器胚属性" : "附灵属性", entries: X.map((Z) => ({ kind: "line", ...Z })) });
    }
    let q = _.formationInscriptions.flatMap((V, X) => {
        if (!V)
            return [];
        let Z = j1(V.patternId);
        return [{ label: `第${X + 1}孔`, value: `${Z.name} · ${V.level}级` }, { label: S1[Z.attr], value: Rj(Z.valuePerLevel * V.level), numeric: !0, tone: "positive" }];
    });
    if (q.length)
        j.push({ title: "阵纹", entries: [{ kind: "line", label: "每孔上限", value: `${v1(_.equipmentLevel)}级`, numeric: !0 }, ...q.map((V) => ({ kind: "line", ...V }))] });
    let P = _.essenceIds.map((V) => $1.find((X) => X.id === V)).filter((V) => V !== void 0);
    if (P.length)
        j.push({ title: "器蕴", entries: P.map((V) => { var _a; return ({ kind: "disclosure", title: V.name, tone: "accent", rows: I0((_a = V.description) !== null && _a !== void 0 ? _a : "") }); }) });
    let $ = u0.find((V) => V.id === _.artId);
    if ($)
        j.push({ title: "器诀", entries: [{ kind: "disclosure", title: $.name, tone: "accent", rows: [...I0($.description), { label: "战意消耗", value: $.rageCost, numeric: !0 }] }] });
    return j;
}
var Bj = (_) => { let j = __.parse(_.instanceData), q = c1(j), P = q ? `${_1[j.slot]} · ${s1[q].name}` : _1[j.slot], $ = (0, official_chunk_thhss9s9_js_1.Sf)(j.equipmentLevel).realm; return { summary: { icon: B6[j.slot], color: L0[$], type: `${P} · 御使境界`, tier: $ }, preview: () => ({ header: [p("类型", P), p("要求", (0, official_chunk_thhss9s9_js_1.Sf)(s2(j)).label), ...j.element ? [p("五行", j.element)] : [], ...j.crafterName ? [p("铸造者", j.crafterName)] : [], ..._.equipped ? [{ kind: "status", value: "已穿戴" }] : []], sections: G6(j), description: j.desc }) }; };
var Gj = (_, j) => { let q = j1(j.patternId), P = S2.find((V) => j.level <= v1(V)), $ = (0, official_chunk_thhss9s9_js_1.Sf)(P).realm; return { summary: { icon: "\uD83D\uDD36", color: L0[$], tier: `${j.level}级`, type: "阵纹" }, preview: (V) => ({ header: [p("等级", `${j.level}级`), K0(_, V), p("适用部位", q.allowedSlots.map((X) => _1[X]).join("、"))], sections: [{ title: "烙印加成", entries: [{ kind: "line", label: S1[q.attr], value: `+${q.valuePerLevel * j.level}`, numeric: !0, tone: "positive" }] }] }) }; };
var U6 = { equipment: Bj, consumable: Oj, blueprint: O9, material: R9, seed: B9, manual_jade: G9, inscription: Gj, beast_book: U9, beast_refinement: M9, beast_rejuvenation: b9 };
function q2(_) { let j = c2(_.definitionId); return U6[j.kind](_, j); }
function Uj(_, j = {}) { let q = q2(_), P = q.preview(j); return { title: _.name, icon: q.summary.icon, titleColor: q.summary.color, ...P, header: j.hideQuantity ? P.header.filter(($) => $.kind !== "quantity") : P.header }; }
var Mj = { normal: official_chunk_thhss9s9_js_1.Me.ink, accent: official_chunk_thhss9s9_js_1.Me["tier-xuan"], positive: official_chunk_thhss9s9_js_1.Me.teal, warning: official_chunk_thhss9s9_js_1.Me.crimson, muted: official_chunk_thhss9s9_js_1.Me["ink-secondary"] };
class M6 {
    get underlayScroll() { return this.item ? this.savedScroll : void 0; }
    constructor(_) {
        this.anchor = { x: 0, y: 0, w: 0, h: 0 };
        this.unfolded = new Set;
        this.savedScroll = 0;
        this.modal = !1;
        this.quantityLabel = "持有";
        this.viewerOptions = {};
        this.close = () => { this.item = void 0, this.u.modalScroll = this.savedScroll, this.u.invalidate(); };
        this.u = _;
    }
    open(_, j, q, P, $, V, X = "持有") { this.viewerOptions = {}, this.quantityLabel = X, this.modal = !1, this.context = void 0, this.item = _, this.anchor = j, this.action = q, this.notice = P, this.customActions = $, this.comparisonItem = V, this.unfolded.clear(), this.savedScroll = this.u.modalScroll, this.u.modalScroll = 0, this.u.invalidate(); }
    openModal(_, j, q = {}) { this.open(_, { x: 0, y: 0, w: 0, h: 0 }), this.modal = !0, this.context = j, this.viewerOptions = q; }
    paint() {
        var _a;
        if (!this.item)
            return;
        let _ = this.u, j = Uj(this.item, { ...this.viewerOptions, quantityLabel: this.quantityLabel }), q = this.modal ? Math.min(448, _.width - 24) : Math.min(320, _.width - 16), P = q - 34, $ = new official_chunk_thhss9s9_js_1.Ne(_, P), V = ((_a = j.titleColor.split(" ").find((B) => B.startsWith("text-"))) !== null && _a !== void 0 ? _a : "text-ink").slice(5), X = P - 68 - 44, Z = _.lines(j.title, X, 16), W = j.header.map((B) => ({ entry: B, lines: _.lines(B.kind === "field" ? `${B.label}：${B.value}` : B.kind === "quantity" ? `${B.label} ${B.value}` : String(B.value), X, 14) })), Q = Math.max(56, Z.length * 24 + 4 + W.reduce((B, D) => B + D.lines.length * 24 + 2, 0) - 2);
        if ($.block(Q, (B, D) => {
            _.roundedRect(B, D, 56, 56, official_chunk_thhss9s9_js_1.Me.paper), _.ctx.strokeStyle = "rgba(44,24,16,.2)", _.ctx.strokeRect(B + 0.5, D + 0.5, 55, 55), (0, official_chunk_thhss9s9_js_1.We)(_, j.icon, B, D, 56, 56, 36), Z.forEach((v, w) => { var _a; return _.text(v, B + 68, D + w * 24 + 12, 16, (_a = official_chunk_thhss9s9_js_1.Me[V]) !== null && _a !== void 0 ? _a : official_chunk_thhss9s9_js_1.Me.ink, _.bodyFont, !0); });
            let A = D + Z.length * 24 + 4;
            W.forEach(({ entry: v, lines: w }) => {
                let k = 0;
                w.forEach((t, M0) => {
                    if (_.text(t, B + 68, A + M0 * 24 + 12, 14, v.kind === "field" ? "#92400e" : official_chunk_thhss9s9_js_1.Me["ink-secondary"]), v.kind === "field") {
                        let O0 = `${v.label}：`.slice(k, k + t.length);
                        if (O0)
                            _.text(O0, B + 68, A + M0 * 24 + 12, 14, official_chunk_thhss9s9_js_1.Me["ink-secondary"]);
                    }
                    k += t.length;
                }), A += w.length * 24 + 2;
            }), _.text("×", B + P - 12 - _.measure("×", 14) / 2, D + 12, 14, official_chunk_thhss9s9_js_1.Me["ink-secondary"]), _.hit(B + P - 28, D - 4, 32, 32, this.close);
        }), $.gap(12), $.rule(), $.gap(16), this.context)
            $.text(this.context, 14, 24, official_chunk_thhss9s9_js_1.Me["ink-secondary"]), $.gap(16);
        let J = (B, D, A, v = 0) => $.block(24, (w, k) => { _.text(`${this.unfolded.has(D) ? "▾" : "▸"} ${B}`, w + v, k + 12, 14, A), _.hit(w + v, k, P - v, 24, () => { this.unfolded.has(D) ? this.unfolded.delete(D) : this.unfolded.add(D), _.invalidate(); }); }), Y = (B, D = "normal", A = 12) => {
            let v = B.label ? 85 : 0, w = P - A - v, k = String(B.value), t = _.lines(k, w, 14), M0 = Math.max(24, t.length * 24);
            $.block(M0, (b0, O0) => {
                var _a;
                let b1 = Mj[(_a = B.tone) !== null && _a !== void 0 ? _a : D];
                if (B.label)
                    _.paragraph(B.label, b0 + A, O0, 77, 14, 24, b1);
                t.forEach((Z1, U) => _.text(Z1, b0 + A + v, O0 + U * 24 + 12, 14, b1, B.numeric ? "monospace" : _.bodyFont));
            });
        };
        if (((B, D) => B.filter((A) => A.entries.length).forEach((A, v) => {
            if (v)
                $.gap(16);
            let w = D + v;
            if (A.collapsible)
                J(A.title, w, "#92400e");
            else
                $.text(A.title, 14, 24, "#92400e");
            if (A.collapsible && !this.unfolded.has(w))
                return;
            $.gap(6), A.entries.forEach((k, t) => {
                var _a, _g;
                if (t)
                    $.gap(4);
                if (k.kind === "disclosure") {
                    let M0 = w + ":" + t;
                    if (J(k.title, M0, Mj[(_g = (_a = k.tone) !== null && _a !== void 0 ? _a : A.tone) !== null && _g !== void 0 ? _g : "normal"], 12), this.unfolded.has(M0))
                        $.gap(4), k.rows.forEach((b0, O0) => {
                            if (O0)
                                $.gap(4);
                            Y(b0, "normal", 24);
                        });
                }
                else
                    Y(k, A.tone);
            });
        }))(j.sections, "s"), j.description) {
            if (j.sections.some((B) => B.entries.length) || this.context)
                $.gap(16), $.rule(), $.gap(12);
            $.text(j.description, 14, 24, official_chunk_thhss9s9_js_1.Me["ink-secondary"]);
        }
        if (this.action || this.notice || this.customActions) {
            if ($.gap(16), $.rule(), $.gap(12), this.customActions) {
                let B = this.customActions(P);
                $.block(B.height, B.paint);
            }
            else if (this.action) {
                let B = this.action;
                $.block(32.32, (D, A) => _.button("选择玉简", D, A, () => { this.close(), B(); }));
            }
            else if (this.notice)
                $.text(this.notice, 14, 24, official_chunk_thhss9s9_js_1.Me["ink-secondary"]);
        }
        let G = Math.min(this.modal ? Math.min($.height, _.height * 0.6) + 34 : $.height + 34, _.height - _.top - _.bottom - 16), h = this.modal ? (_.width - q) / 2 : Math.max(8, Math.min(this.anchor.x + this.anchor.w + 8 + q <= _.width - 8 ? this.anchor.x + this.anchor.w + 8 : this.anchor.x - q - 8, _.width - 8 - q)), K = this.modal ? Math.max(_.top + 8, (_.height - G) / 2) : Math.max(_.top + 8, Math.min(this.anchor.y, _.height - _.bottom - 8 - G));
        _.beginModal(this.modal), _.hit(0, 0, _.width, _.height, this.close), _.ctx.save(), _.ctx.shadowColor = this.modal ? "transparent" : "rgba(0,0,0,.2)", _.ctx.shadowBlur = this.modal ? 0 : 20, _.rect(h, K, q, G, official_chunk_thhss9s9_js_1.Me.paper), _.ctx.restore(), _.ctx.strokeStyle = this.modal ? "rgba(44,24,16,.2)" : "rgba(44,24,16,.3)", _.ctx.strokeRect(h + 0.5, K + 0.5, q - 1, G - 1), _.hit(h, K, q, G, () => { }), _.modalMax = Math.max(0, $.height - (G - 34)), _.modalScroll = Math.min(_.modalScroll, _.modalMax), _.clip(h + 17, K + 17, P, G - 34, () => $.paint(h + 17, K + 17 - _.modalScroll));
    }
}
exports.Ee = M6;
var b6 = (..._) => GameGlobal.__officialBridge.request(..._), _O = GameGlobal.__officialBridge.ApiError, jO = GameGlobal.__officialBridge.getToken, qO = GameGlobal.__officialBridge.saveToken, PO = GameGlobal.__officialBridge.clearSession;
exports.Nb = b6;
exports.Ob = _O;
exports.Pb = jO;
exports.Qb = qO;
exports.Rb = PO;
async function $2(..._) { let j = await b6(..._); return j && Object.prototype.hasOwnProperty.call(j, "data") ? j.data : j; }
async function $O(_, j = {}, q = "POST") { return $2(_, q, j); }
class N6 {
    constructor(_) {
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
        this.changed = _;
    }
    enter() { this.leave(), this.active = !0, this.bag = this.storage = void 0, this.bagError = this.storageError = "", this.source = "bag", this.filter = { kind: "all" }, this.page = 0, this.loadBag(); }
    leave() { this.active = !1, this.bagGeneration++, this.storageGeneration++, this.bagLoading = this.storageLoading = !1; }
    get view() { return this.source === "bag" ? this.bag : this.storage; }
    get loading() { return this.source === "bag" ? this.bagLoading : this.storageLoading; }
    get error() { return this.source === "bag" ? this.bagError : this.storageError; }
    async loadBag() {
        if (!this.active)
            return;
        let _ = ++this.bagGeneration;
        this.bagLoading = !0, this.changed();
        try {
            let j = await $2("/api/combat-v6/inventory?location=bag");
            if (this.active && _ === this.bagGeneration)
                this.bag = j, this.bagError = "";
        }
        catch (j) {
            if (this.active && _ === this.bagGeneration)
                this.bagError = j instanceof Error ? j.message : "读取储物袋失败";
        }
        finally {
            if (this.active && _ === this.bagGeneration)
                this.bagLoading = !1, this.changed();
        }
    }
    async loadStorage() {
        if (!this.active)
            return;
        let _ = ++this.storageGeneration;
        this.storage = void 0, this.storageError = "", this.storageLoading = !0, this.changed();
        let j = new URLSearchParams({ location: "storage", kind: this.filter.kind, page: String(this.page) });
        if (this.filter.kind === "material") {
            for (let q of ["minRank", "maxRank", "materialType"])
                if (this.filter[q])
                    j.set(q, this.filter[q]);
        }
        try {
            let q = await $2(`/api/combat-v6/inventory?${j}`);
            if (this.active && _ === this.storageGeneration)
                this.storage = q, this.page = q.page;
        }
        catch (q) {
            if (this.active && _ === this.storageGeneration)
                this.storageError = q instanceof Error ? q.message : "读取储藏室失败";
        }
        finally {
            if (this.active && _ === this.storageGeneration)
                this.storageLoading = !1, this.changed();
        }
    }
    setSource(_) {
        if (this.source = _, _ === "storage")
            this.loadStorage();
        this.changed();
    }
    setFilter(_) {
        if (this.filter = _, this.source === "storage")
            this.loadStorage();
        this.changed();
    }
    setPage(_) { this.page = _, this.loadStorage(); }
    reload() { return this.source === "bag" ? this.loadBag() : this.loadStorage(); }
    invalidate() {
        if (this.bag = void 0, this.loadBag(), this.source === "storage")
            this.loadStorage();
    }
}
exports.He = N6;
function Nj(_) { return q2(_).summary; }
function RO(_, j, q, P, $, V = {}) {
    var _a, _g, _h, _k, _l, _m, _o, _p, _q, _r, _s;
    let X = _.ctx.globalAlpha;
    if (_.ctx.globalAlpha = X * (V.disabled ? 0.6 : 1), _.paper(j, q, P, P), V.unused)
        _.rect(j, q, P, P, "rgba(44,24,16,.05)"), _.clip(j, q, P, P, () => {
            _.ctx.save(), _.ctx.strokeStyle = "rgba(70,60,45,.06)", _.ctx.lineWidth = 1;
            for (let Q = -P; Q < P * 2; Q += 7 * Math.SQRT2)
                _.ctx.beginPath(), _.ctx.moveTo(j + Q, q), _.ctx.lineTo(j + Q - P, q + P), _.ctx.stroke();
            _.ctx.restore();
        });
    if (_.ctx.save(), _.ctx.strokeStyle = (_a = V.border) !== null && _a !== void 0 ? _a : "rgba(44,24,16,.2)", _.ctx.setLineDash(V.unused ? [3, 3] : []), _.ctx.strokeRect(j + 0.5, q + 0.5, P - 1, P - 1), _.ctx.restore(), V.selected)
        _.ctx.strokeStyle = "rgba(193,18,31,.5)", _.ctx.strokeRect(j - 1.5, q - 1.5, P + 3, P + 3);
    let Z = $ ? Nj($) : void 0;
    if (Z || V.emptyLabel) {
        let Q = !$ && (!V.emptyIcon || V.emptyIcon === "·");
        if (!$ && (!V.quick || Q))
            _.ctx.globalAlpha *= 0.25;
        let J = Q ? 20 : Math.min(44, Math.max(24, (P - 2) * 0.48));
        (0, official_chunk_thhss9s9_js_1.We)(_, (_h = (_g = Z === null || Z === void 0 ? void 0 : Z.icon) !== null && _g !== void 0 ? _g : V.emptyIcon) !== null && _h !== void 0 ? _h : "·", j, Q ? q : q + P * 0.1, P, Q ? P : P * 0.66, J), _.ctx.globalAlpha = X * (V.disabled ? 0.6 : 1);
        let Y = (_k = V.labelSize) !== null && _k !== void 0 ? _k : Math.min(12, Math.max(10, (P - 2) * 0.17)), O = (_m = (_l = $ === null || $ === void 0 ? void 0 : $.name) !== null && _l !== void 0 ? _l : V.emptyLabel) !== null && _m !== void 0 ? _m : "";
        while (O.length && _.measure(O, Y) > P - 8)
            O = O.slice(0, -1);
        if (O !== ((_p = (_o = $ === null || $ === void 0 ? void 0 : $.name) !== null && _o !== void 0 ? _o : V.emptyLabel) !== null && _p !== void 0 ? _p : ""))
            O = O.slice(0, -1) + "…";
        let G = (_q = Z === null || Z === void 0 ? void 0 : Z.color.split(" ").find((h) => h.startsWith("text-"))) === null || _q === void 0 ? void 0 : _q.slice(5);
        _.text(O, j + (P - _.measure(O, Y)) / 2, q + P * 0.92 - Y * 0.625, Y, G ? (_r = official_chunk_thhss9s9_js_1.Me[G]) !== null && _r !== void 0 ? _r : official_chunk_thhss9s9_js_1.Me.ink : official_chunk_thhss9s9_js_1.Me["ink-secondary"]);
    }
    else
        _.text("·", j + P / 2 - 3, q + P / 2, 20, "rgba(44,24,16,.25)");
    if ($ && $.quantity > 1)
        _.text(`×${$.quantity >= 1e4 ? Math.floor($.quantity / 1000) + "k" : $.quantity}`, j + 4, q + 11, Math.min(16, Math.max(12, P * 0.2)), official_chunk_thhss9s9_js_1.Me.ink, "monospace", !0);
    let W = (_s = V.badge) !== null && _s !== void 0 ? _s : (($ === null || $ === void 0 ? void 0 : $.equipped) ? "已装备" : void 0);
    if (W) {
        let Q = _.measure(W, 10);
        _.rect(j + P - 4 - Q, q, Q, 14, "rgba(248,243,230,.9)"), _.text(W, j + P - 4 - Q, q + 6, 10, official_chunk_thhss9s9_js_1.Me.crimson);
    }
    if (_.ctx.globalAlpha = X, $ || V.quick)
        _.hit(j, q, P, P, () => {
            var _a;
            if (V.quick && !V.disabled)
                V.quick();
            else
                (_a = V.preview) === null || _a === void 0 ? void 0 : _a.call(V);
        }, { longPress: V.preview });
}
var GO = 99, UO = 30;
exports.Ie = GO;
exports.Je = UO;
