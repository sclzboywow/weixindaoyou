"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mb = exports.Lb = exports.Ib = exports.Hb = exports.Gb = exports.Eb = void 0;
exports.Fb = t;
exports.Jb = Do;
exports.Kb = Qo;
const official_chunk_kaf9byxz_js_1 = require("./official-chunk-kaf9byxz.js");
const official_chunk_thhss9s9_js_1 = require("./official-chunk-thhss9s9.js");
class P {
    constructor(o) { this.u = o; }
    get underlayScroll() { var _a; return (_a = this.picker) === null || _a === void 0 ? void 0 : _a.scroll; }
    reset() { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.picker = void 0; }
    input(o, d, r, n, K = !1, R = "", p = 200) { this.field(o, d, r || R, () => { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); let f = (g) => { n(g.value), this.u.invalidate(); }, F = (g) => { var _a; f(g), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); }; this.stopKeyboard = () => { official_chunk_thhss9s9_js_1.Oe.offKeyboardInput(f), official_chunk_thhss9s9_js_1.Oe.offKeyboardComplete(F), official_chunk_thhss9s9_js_1.Oe.hideKeyboard(), this.stopKeyboard = void 0; }, official_chunk_thhss9s9_js_1.Oe.onKeyboardInput(f), official_chunk_thhss9s9_js_1.Oe.onKeyboardComplete(F), official_chunk_thhss9s9_js_1.Oe.showKeyboard({ defaultValue: r, maxLength: p, multiple: !1, confirmHold: !1, confirmType: "done" }); }, K, !r); }
    inlineInput(o, d, r, n, K = !1, R = 200) { let p = this.u; o.block(42, (f, F) => { if (p.text(d, f, F + 21, 14), p.ctx.save(), K)
        p.ctx.globalAlpha *= 0.5; if (p.ctx.strokeStyle = "rgba(44,24,16,.2)", p.ctx.strokeRect(f + o.width - 80 + 0.5, F + 0.5, 79, 41), p.text(r, f + o.width - 72, F + 21, 14, official_chunk_thhss9s9_js_1.Me.ink, "monospace"), p.ctx.restore(), !K)
        p.hit(f + o.width - 80, F, 80, 42, () => { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); let g = (D) => { n(D.value), p.invalidate(); }, v = (D) => { var _a; g(D), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); }; this.stopKeyboard = () => { official_chunk_thhss9s9_js_1.Oe.offKeyboardInput(g), official_chunk_thhss9s9_js_1.Oe.offKeyboardComplete(v), official_chunk_thhss9s9_js_1.Oe.hideKeyboard(), this.stopKeyboard = void 0; }, official_chunk_thhss9s9_js_1.Oe.onKeyboardInput(g), official_chunk_thhss9s9_js_1.Oe.onKeyboardComplete(v), official_chunk_thhss9s9_js_1.Oe.showKeyboard({ defaultValue: r, maxLength: R, multiple: !1, confirmHold: !1, confirmType: "done" }); }); }); }
    select(o, d, r, n, K, R = !1) { var _a, _b; this.field(o, d, ((_b = (_a = n.find((p) => p.value === r)) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : r) + "　⌄", () => { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.picker = { title: d, options: n, value: r, choose: K, scroll: this.u.modalScroll }, this.u.modalScroll = 0, this.u.invalidate(); }, R); }
    field(o, d, r, n, K, R = !1) { let p = this.u; o.text(d, 14, 20), o.gap(4), o.block(42, (f, F) => { if (p.ctx.save(), K)
        p.ctx.globalAlpha *= 0.5; if (p.rect(f, F, o.width, 42, "rgba(248,243,230,.7)"), p.ctx.strokeStyle = "rgba(44,24,16,.25)", p.ctx.strokeRect(f + 0.5, F + 0.5, o.width - 1, 41), p.clip(f + 10, F, o.width - 20, 42, () => p.text(r, f + 10, F + 21, 14, R ? official_chunk_thhss9s9_js_1.Me["ink-secondary"] : official_chunk_thhss9s9_js_1.Me.ink)), p.ctx.restore(), !K)
        p.hit(f, F, o.width, 42, n); }); }
    paintOverlay() { let o = this.picker; if (!o)
        return; let d = this.u, r = new official_chunk_thhss9s9_js_1.Ne(d, Math.min(448, d.width - 24) - 34), n = () => { this.picker = void 0, d.modalScroll = o.scroll, d.invalidate(); }; for (let K of o.options)
        r.block(44, (R, p) => { d.text(`${K.value === o.value ? "●" : "○"} ${K.label}`, R, p + 22, 14, K.value === o.value ? official_chunk_thhss9s9_js_1.Me.crimson : official_chunk_thhss9s9_js_1.Me.ink), d.hit(R, p, r.width, 44, () => { o.choose(K.value), n(); }); }); (0, official_chunk_thhss9s9_js_1.Se)(d, { title: o.title, style: "modal", rows: [], content: r }, n); }
}
exports.Eb = P;
function t(o, d, r, n, K) { var _a, _b; let R = (_b = (_a = official_chunk_thhss9s9_js_1.Uf.find((F) => F.id === d.speciesId)) === null || _a === void 0 ? void 0 : _a.icon) !== null && _b !== void 0 ? _b : "\uD83D\uDC3E", p = R.startsWith("icon:") ? official_chunk_thhss9s9_js_1.Te.get(R.slice(5)) : void 0, f = d.isMutant ? (0, official_chunk_thhss9s9_js_1.Ue)(R) : void 0; if (p && f !== void 0)
    o.imageMutantContain(p.replace(/^\//, ""), f, r, n, K, K);
else
    (0, official_chunk_thhss9s9_js_1.We)(o, R, r, n, K, K, K); }
class h {
    constructor(o) {
        this.savedScroll = 0;
        this.close = () => { this.beast = void 0, this.skill = void 0, this.u.modalScroll = this.savedScroll, this.u.invalidate(); };
        this.u = o;
    }
    get underlayScroll() { return this.beast ? this.savedScroll : void 0; }
    get skillUnderlayScroll() { var _a; return (_a = this.skill) === null || _a === void 0 ? void 0 : _a.parentScroll; }
    open(o) { this.beast = o, this.savedScroll = this.u.modalScroll, this.u.modalScroll = 0, this.skill = void 0, this.u.invalidate(); }
    paint() { let o = this.beast; if (!o)
        return; let d = this.u, r = Math.min(448, d.width - 24) - 34, n = d.modalScroll; if (this.skill)
        d.modalScroll = this.skill.parentScroll; let K = this.content(o, r); if ((0, official_chunk_thhss9s9_js_1.Se)(d, { title: o.name, style: "modal", rows: [], content: K }, this.close), this.skill)
        d.modalScroll = n, this.paintSkill(); }
    content(o, d) { let r = this.u, n = new official_chunk_thhss9s9_js_1.Ne(r, d), K = official_chunk_thhss9s9_js_1.Uf.find((g) => g.id === o.speciesId), R = (0, official_chunk_kaf9byxz_js_1.vd)(o), p = (g, v, D, _ = official_chunk_thhss9s9_js_1.Me.ink) => { let L = g; for (let Q of D) {
        let V = typeof Q === "number" ? "monospace" : r.bodyFont, m = String(Q);
        r.text(m, L, v, 14, _, V), L += r.measure(m, 14, V);
    } }; if (n.block(64, (g, v) => { var _a, _b; if (t(r, o, g, v + 2, 60), r.text(o.name, g + 72, v + 12, 14, official_chunk_thhss9s9_js_1.Me.ink), o.isMutant) {
        let D = g + 76 + r.measure(o.name, 14);
        r.text("变异", D + 4, v + 12, 12, "#9333ea");
    } p(g + 72, v + 32, [`${(_a = K === null || K === void 0 ? void 0 : K.name) !== null && _a !== void 0 ? _a : ""} · ${(0, official_chunk_kaf9byxz_js_1.xc)(o)} · `, o.level, "级"], official_chunk_thhss9s9_js_1.Me["ink-secondary"]), p(g + 72, v + 52, ["参战等级 ", (_b = K === null || K === void 0 ? void 0 : K.carryLevel) !== null && _b !== void 0 ? _b : "", " · 经验 ", o.exp]); }), n.gap(16), o.originKind === "wild")
        n.text(`初始${o.initialLevel}级，较同级幼崽少${50 + 2 * o.initialLevel}属性点`, 14, 20, official_chunk_thhss9s9_js_1.Me["ink-secondary"]), n.gap(16); if (n.block(20, (g, v) => { r.text("成长 ", g, v + 10, 14, official_chunk_thhss9s9_js_1.Me.ink); let _ = g + r.measure("成长 ", 14); r.text(o.growth.toFixed(3), _, v + 10, 14, official_chunk_thhss9s9_js_1.Me.ink, "monospace"), _ += r.measure(o.growth.toFixed(3), 14, "monospace"), p(_, v + 10, [" · 寿命 ", o.currentLifespan, "/", o.maxLifespan]); }), o.currentLifespan < official_chunk_thhss9s9_js_1.dg.lifespan.deployMinimum)
        n.gap(16), n.text("寿命不足，须先休养才能出战。交易不恢复寿命。", 14, 20, official_chunk_thhss9s9_js_1.Me.crimson); let f = (g) => { n.block(Math.ceil(g.length / 2) * 28 - 8, (v, D) => { let _ = (d - 20) / 2; g.forEach(([L, Q], V) => { let m = v + V % 2 * (_ + 20), N = D + Math.floor(V / 2) * 28 + 10; r.text(L, m, N, 14, official_chunk_thhss9s9_js_1.Me.ink), r.text(String(Q), m + _ - r.measure(String(Q), 14, "monospace"), N, 14, official_chunk_thhss9s9_js_1.Me.ink, "monospace"); }); }); }; n.gap(16), f([["攻击资质", o.aptitudes.attack], ["防御资质", o.aptitudes.defense], ["体力资质", o.aptitudes.health], ["法力资质", o.aptitudes.mana], ["速度资质", o.aptitudes.speed]]), n.gap(16), n.block(20, (g, v) => p(g, v + 10, ["技能 ", o.skills.length, "/", o.skillSlotCapacity])), n.gap(8); let F = Math.max(1, Math.floor((d + 8) / 72)); return n.block(o.skills.length ? Math.ceil(o.skills.length / F) * 72 - 8 : 0, (g, v) => o.skills.forEach((D, _) => { let L = (0, official_chunk_kaf9byxz_js_1.wc)(D), Q = g + _ % F * 72, V = v + Math.floor(_ / F) * 72, m = L.style === "advanced" ? official_chunk_thhss9s9_js_1.Me.crimson : L.style === "unavailable" ? "rgba(90,74,66,.6)" : official_chunk_thhss9s9_js_1.Me.ink; r.rect(Q, V, 64, 64, L.style === "advanced" ? "rgba(193,18,31,.05)" : official_chunk_thhss9s9_js_1.Me.paper), r.ctx.strokeStyle = L.style === "advanced" ? "rgba(193,18,31,.45)" : "rgba(44,24,16,.2)", r.ctx.strokeRect(Q + 0.5, V + 0.5, 63, 63), (0, official_chunk_thhss9s9_js_1.We)(r, L.icon, Q + 13, V + 2, 38, 38); let N = L.name.length > 5 ? 10 : 12, T = r.lines(L.name, N === 10 ? 50 : 56, N); T.forEach((U, i) => r.text(U, Q + (64 - r.measure(U, N)) / 2, V + 45 + (i - (T.length - 1) / 2) * 11, N, m)), r.hit(Q, V, 64, 64, () => { this.skill = { id: D, x: Q, y: V, parentScroll: r.modalScroll }, r.modalScroll = 0, r.invalidate(); }); })), n.gap(16), n.block(20, (g, v) => p(g, v + 10, ["当前属性 · 可分配 ", o.unallocatedPoints, " 点"])), n.gap(8), f(Object.entries(official_chunk_kaf9byxz_js_1.Cc).map(([g, v]) => [v, R[g]])), n; }
    paintSkill() { if (!this.skill)
        return; let o = this.u, d = this.skill, r = (0, official_chunk_kaf9byxz_js_1.wc)(d.id), n = Math.min(288, o.width - 24), K = n - 26, R = o.lines(r.description.replace(/\s+/g, " "), K, 14), p = Math.min(24 + R.length * 24 + 22, o.height - o.top - o.bottom - 24), f = Math.max(12, Math.min(d.x + 32 - n / 2, o.width - 12 - n)), F = d.y - p - 8 >= o.top + 12 ? d.y - p - 8 : d.y + 72, g = Math.max(o.top + 12, Math.min(F, o.height - o.bottom - 12 - p)); o.beginModal(!1), o.hit(0, 0, o.width, o.height, () => { o.modalScroll = d.parentScroll, this.skill = void 0, o.invalidate(); }), o.ctx.save(), o.ctx.shadowColor = "rgba(0,0,0,.15)", o.ctx.shadowBlur = 15, o.ctx.shadowOffsetY = 8, o.roundedRect(f, g, n, p, official_chunk_thhss9s9_js_1.Me.paper, 6), o.ctx.restore(), o.ctx.strokeStyle = "rgba(44,24,16,.2)", o.ctx.stroke(), o.hit(f, g, n, p, () => { }), o.modalMax = Math.max(0, 24 + R.length * 24 - p + 22), o.modalScroll = Math.min(o.modalScroll, o.modalMax), o.clip(f + 13, g + 11, K, p - 22, () => { o.text(r.name + (r.style === "unavailable" ? "（已失效）" : ""), f + 13, g + 23 - o.modalScroll, 14, official_chunk_thhss9s9_js_1.Me.ink), R.forEach((v, D) => o.text(v, f + 13, g + 47 + D * 24 - o.modalScroll, 14, official_chunk_thhss9s9_js_1.Me.ink)); }); }
}
exports.Gb = h;
const zod_1 = require("./zod.js");
var y = "00000000-0000-4000-8000-000000000000", { id: Io, ownerCultivatorId: Ro, ...z } = official_chunk_kaf9byxz_js_1.yc.shape, Fo = zod_1.z.strictObject({ id: zod_1.z.uuid(), createdAt: zod_1.z.iso.datetime(), individual: zod_1.z.strictObject(z) }).superRefine((o, d) => { let r = official_chunk_kaf9byxz_js_1.yc.safeParse({ ...o.individual, id: o.id, ownerCultivatorId: y }); if (!r.success)
    for (let n of r.error.issues)
        d.addIssue({ code: "custom", message: n.message }); if (o.individual.revision >= 1e5)
    d.addIssue({ code: "custom", message: "灵兽版本已达上限" }); }), ko = zod_1.z.strictObject({ name: official_chunk_kaf9byxz_js_1.yc.shape.name, speciesId: official_chunk_kaf9byxz_js_1.yc.shape.speciesId, isMutant: official_chunk_kaf9byxz_js_1.yc.shape.isMutant, originKind: official_chunk_kaf9byxz_js_1.yc.shape.originKind, initialLevel: official_chunk_kaf9byxz_js_1.yc.shape.initialLevel, level: official_chunk_kaf9byxz_js_1.yc.shape.level, exp: official_chunk_kaf9byxz_js_1.yc.shape.exp, growth: official_chunk_kaf9byxz_js_1.yc.shape.growth, aptitudes: official_chunk_kaf9byxz_js_1.yc.shape.aptitudes, allocatedAttributes: official_chunk_kaf9byxz_js_1.yc.shape.allocatedAttributes, unallocatedPoints: official_chunk_kaf9byxz_js_1.yc.shape.unallocatedPoints, skillSlotCapacity: official_chunk_kaf9byxz_js_1.yc.shape.skillSlotCapacity, skills: official_chunk_kaf9byxz_js_1.yc.shape.skills, currentLifespan: official_chunk_kaf9byxz_js_1.yc.shape.currentLifespan, maxLifespan: official_chunk_kaf9byxz_js_1.yc.shape.maxLifespan });
exports.Hb = Fo;
exports.Ib = ko;
function Do(o, d, r, n) { if (o.ownerCultivatorId !== d)
    return "只能寄售自己的灵兽"; if (o.revision !== r)
    return "灵兽已有变化，请重新查看"; if (n.leadBeastId === o.id)
    return "请先取消灵兽首发"; if (n.carriedBeastIds.includes(o.id))
    return "请先将灵兽移出携带编组"; if (!official_chunk_kaf9byxz_js_1.yc.safeParse(o).success || o.revision >= 99999)
    return "灵兽个体事实或版本无效"; return null; }
var O = { realm: "炼气", stage: "后期" };
function Qo(o, d) { return (0, official_chunk_thhss9s9_js_1.Tf)(o, d) >= (0, official_chunk_thhss9s9_js_1.Tf)(O.realm, O.stage); }
var Vo = "达到炼气后期后方可兑换", _o = "达到炼气后期后方可使用拍卖行";
exports.Lb = Vo;
exports.Mb = _o;
