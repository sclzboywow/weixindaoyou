"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mb = exports.Lb = exports.Ib = exports.Hb = exports.Gb = exports.Eb = void 0;
exports.Fb = w;
exports.Jb = Co;
exports.Kb = $o;
const official_chunk_n7gywv4p_js_1 = require("./official-chunk-n7gywv4p.js");
const official_chunk_xc4q1y3j_js_1 = require("./official-chunk-xc4q1y3j.js");
class z {
    constructor(o) { this.u = o; }
    get underlayScroll() { var _a; return (_a = this.picker) === null || _a === void 0 ? void 0 : _a.scroll; }
    reset() { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.picker = void 0; }
    input(o, n, d, r, p = !1, F = "", K = 200) { this.field(o, n, d || F, () => { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); let f = (g) => { r(g.value), this.u.invalidate(); }, v = (g) => { var _a; f(g), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); }; this.stopKeyboard = () => { official_chunk_xc4q1y3j_js_1.Oe.offKeyboardInput(f), official_chunk_xc4q1y3j_js_1.Oe.offKeyboardComplete(v), official_chunk_xc4q1y3j_js_1.Oe.hideKeyboard(), this.stopKeyboard = void 0; }, official_chunk_xc4q1y3j_js_1.Oe.onKeyboardInput(f), official_chunk_xc4q1y3j_js_1.Oe.onKeyboardComplete(v), official_chunk_xc4q1y3j_js_1.Oe.showKeyboard({ defaultValue: d, maxLength: K, multiple: !1, confirmHold: !1, confirmType: "done" }); }, p, !d); }
    inlineInput(o, n, d, r, p = !1, F = 200) { let K = this.u; o.block(42, (f, v) => { if (K.text(n, f, v + 21, 14), K.ctx.save(), p)
        K.ctx.globalAlpha *= 0.5; if (K.ctx.strokeStyle = "rgba(44,24,16,.2)", K.ctx.strokeRect(f + o.width - 80 + 0.5, v + 0.5, 79, 41), K.text(d, f + o.width - 72, v + 21, 14, official_chunk_xc4q1y3j_js_1.Me.ink, "monospace"), K.ctx.restore(), !p)
        K.hit(f + o.width - 80, v, 80, 42, () => { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); let g = (L) => { r(L.value), K.invalidate(); }, I = (L) => { var _a; g(L), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); }; this.stopKeyboard = () => { official_chunk_xc4q1y3j_js_1.Oe.offKeyboardInput(g), official_chunk_xc4q1y3j_js_1.Oe.offKeyboardComplete(I), official_chunk_xc4q1y3j_js_1.Oe.hideKeyboard(), this.stopKeyboard = void 0; }, official_chunk_xc4q1y3j_js_1.Oe.onKeyboardInput(g), official_chunk_xc4q1y3j_js_1.Oe.onKeyboardComplete(I), official_chunk_xc4q1y3j_js_1.Oe.showKeyboard({ defaultValue: d, maxLength: F, multiple: !1, confirmHold: !1, confirmType: "done" }); }); }); }
    select(o, n, d, r, p, F = !1) { var _a, _b; this.field(o, n, ((_b = (_a = r.find((K) => K.value === d)) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : d) + "　⌄", () => { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.picker = { title: n, options: r, value: d, choose: p, scroll: this.u.modalScroll }, this.u.modalScroll = 0, this.u.invalidate(); }, F); }
    field(o, n, d, r, p, F = !1) { let K = this.u; o.text(n, 14, 20), o.gap(4), o.block(42, (f, v) => { if (K.ctx.save(), p)
        K.ctx.globalAlpha *= 0.5; if (K.rect(f, v, o.width, 42, "rgba(248,243,230,.7)"), K.ctx.strokeStyle = "rgba(44,24,16,.25)", K.ctx.strokeRect(f + 0.5, v + 0.5, o.width - 1, 41), K.clip(f + 10, v, o.width - 20, 42, () => K.text(d, f + 10, v + 21, 14, F ? official_chunk_xc4q1y3j_js_1.Me["ink-secondary"] : official_chunk_xc4q1y3j_js_1.Me.ink)), K.ctx.restore(), !p)
        K.hit(f, v, o.width, 42, r); }); }
    paintOverlay() { let o = this.picker; if (!o)
        return; let n = this.u, d = new official_chunk_xc4q1y3j_js_1.Ne(n, Math.min(448, n.width - 24) - 34), r = () => { this.picker = void 0, n.modalScroll = o.scroll, n.invalidate(); }; for (let p of o.options)
        d.block(44, (F, K) => { n.text(`${p.value === o.value ? "●" : "○"} ${p.label}`, F, K + 22, 14, p.value === o.value ? official_chunk_xc4q1y3j_js_1.Me.crimson : official_chunk_xc4q1y3j_js_1.Me.ink), n.hit(F, K, d.width, 44, () => { o.choose(p.value), r(); }); }); (0, official_chunk_xc4q1y3j_js_1.Se)(n, { title: o.title, style: "modal", rows: [], content: d }, r); }
}
exports.Eb = z;
var t = { "beast-baize": 140, "beast-bifang": -80, "beast-diting": 93, "beast-fire-crow": -144, "beast-lantern-butterfly": -163, "beast-golden-crow": 163, "beast-huodou": -90, "beast-ink-jiao": 40, "beast-mimi": -110, "beast-mingshe": 126, "beast-moon-marten": 36, "beast-nether-tiger": 155, "beast-nine-tailed-fox": 45, "beast-qilin": -111, "beast-qingluan": 169, "beast-qiongqi": 144, "beast-red-tail-scorpion": 153, "beast-rock-boar": 24, "beast-shen-clam": -175, "beast-silverwing-mantis": 28, "beast-six-eyed-ape": 40, "beast-snake-neck-turtle": 120, "beast-snow-crane": 20, "beast-spirit-fox": -88, "beast-stoneback-bear": 127, "beast-taotie": 147, "beast-golden-toad": 123, "beast-thunder-peng": 133, "beast-wind-wolf": 36, "beast-xiezhi": 174, "beast-xuangui": -115, "beast-yinglong": -166, "beast-zheng": -91, "beast-zhuyan": -85 };
function j(o) { return o.startsWith("icon:") ? t[o.slice(5)] : void 0; }
function w(o, n, d, r, p) { var _a, _b; let F = (_b = (_a = official_chunk_xc4q1y3j_js_1.Sf.find((v) => v.id === n.speciesId)) === null || _a === void 0 ? void 0 : _a.icon) !== null && _b !== void 0 ? _b : "\uD83D\uDC3E", K = F.startsWith("icon:") ? official_chunk_xc4q1y3j_js_1.Te.get(F.slice(5)) : void 0, f = n.isMutant ? j(F) : void 0; if (K && f !== void 0)
    o.imageMutantContain(K.replace(/^\//, ""), f, d, r, p, p);
else
    (0, official_chunk_xc4q1y3j_js_1.Ue)(o, F, d, r, p, p, p); }
class y {
    constructor(o) {
        this.savedScroll = 0;
        this.close = () => { this.beast = void 0, this.skill = void 0, this.u.modalScroll = this.savedScroll, this.u.invalidate(); };
        this.u = o;
    }
    get underlayScroll() { return this.beast ? this.savedScroll : void 0; }
    get skillUnderlayScroll() { var _a; return (_a = this.skill) === null || _a === void 0 ? void 0 : _a.parentScroll; }
    open(o) { this.beast = o, this.savedScroll = this.u.modalScroll, this.u.modalScroll = 0, this.skill = void 0, this.u.invalidate(); }
    paint() { let o = this.beast; if (!o)
        return; let n = this.u, d = Math.min(448, n.width - 24) - 34, r = n.modalScroll; if (this.skill)
        n.modalScroll = this.skill.parentScroll; let p = this.content(o, d); if ((0, official_chunk_xc4q1y3j_js_1.Se)(n, { title: o.name, style: "modal", rows: [], content: p }, this.close), this.skill)
        n.modalScroll = r, this.paintSkill(); }
    content(o, n) { let d = this.u, r = new official_chunk_xc4q1y3j_js_1.Ne(d, n), p = official_chunk_xc4q1y3j_js_1.Sf.find((g) => g.id === o.speciesId), F = (0, official_chunk_n7gywv4p_js_1.vd)(o), K = (g, I, L, $ = official_chunk_xc4q1y3j_js_1.Me.ink) => { let C = g; for (let V of L) {
        let _ = typeof V === "number" ? "monospace" : d.bodyFont, N = String(V);
        d.text(N, C, I, 14, $, _), C += d.measure(N, 14, _);
    } }; if (r.block(64, (g, I) => { var _a, _b; if (w(d, o, g, I + 2, 60), d.text(o.name, g + 72, I + 12, 14, official_chunk_xc4q1y3j_js_1.Me.ink), o.isMutant) {
        let L = g + 76 + d.measure(o.name, 14);
        d.text("变异", L + 4, I + 12, 12, "#9333ea");
    } K(g + 72, I + 32, [`${(_a = p === null || p === void 0 ? void 0 : p.name) !== null && _a !== void 0 ? _a : ""} · ${(0, official_chunk_n7gywv4p_js_1.xc)(o)} · `, o.level, "级"], official_chunk_xc4q1y3j_js_1.Me["ink-secondary"]), K(g + 72, I + 52, ["参战等级 ", (_b = p === null || p === void 0 ? void 0 : p.carryLevel) !== null && _b !== void 0 ? _b : "", " · 经验 ", o.exp]); }), r.gap(16), o.originKind === "wild")
        r.text(`初始${o.initialLevel}级，较同级幼崽少${50 + 2 * o.initialLevel}属性点`, 14, 20, official_chunk_xc4q1y3j_js_1.Me["ink-secondary"]), r.gap(16); if (r.block(20, (g, I) => { d.text("成长 ", g, I + 10, 14, official_chunk_xc4q1y3j_js_1.Me.ink); let $ = g + d.measure("成长 ", 14); d.text(o.growth.toFixed(3), $, I + 10, 14, official_chunk_xc4q1y3j_js_1.Me.ink, "monospace"), $ += d.measure(o.growth.toFixed(3), 14, "monospace"), K($, I + 10, [" · 寿命 ", o.currentLifespan, "/", o.maxLifespan]); }), o.currentLifespan < official_chunk_xc4q1y3j_js_1.bg.lifespan.deployMinimum)
        r.gap(16), r.text("寿命不足，须先休养才能出战。交易不恢复寿命。", 14, 20, official_chunk_xc4q1y3j_js_1.Me.crimson); let f = (g) => { r.block(Math.ceil(g.length / 2) * 28 - 8, (I, L) => { let $ = (n - 20) / 2; g.forEach(([C, V], _) => { let N = I + _ % 2 * ($ + 20), H = L + Math.floor(_ / 2) * 28 + 10; d.text(C, N, H, 14, official_chunk_xc4q1y3j_js_1.Me.ink), d.text(String(V), N + $ - d.measure(String(V), 14, "monospace"), H, 14, official_chunk_xc4q1y3j_js_1.Me.ink, "monospace"); }); }); }; r.gap(16), f([["攻击资质", o.aptitudes.attack], ["防御资质", o.aptitudes.defense], ["体力资质", o.aptitudes.health], ["法力资质", o.aptitudes.mana], ["速度资质", o.aptitudes.speed]]), r.gap(16), r.block(20, (g, I) => K(g, I + 10, ["技能 ", o.skills.length, "/", o.skillSlotCapacity])), r.gap(8); let v = Math.max(1, Math.floor((n + 8) / 72)); return r.block(o.skills.length ? Math.ceil(o.skills.length / v) * 72 - 8 : 0, (g, I) => o.skills.forEach((L, $) => { let C = (0, official_chunk_n7gywv4p_js_1.wc)(L), V = g + $ % v * 72, _ = I + Math.floor($ / v) * 72, N = C.style === "advanced" ? official_chunk_xc4q1y3j_js_1.Me.crimson : C.style === "unavailable" ? "rgba(90,74,66,.6)" : official_chunk_xc4q1y3j_js_1.Me.ink; d.rect(V, _, 64, 64, C.style === "advanced" ? "rgba(193,18,31,.05)" : official_chunk_xc4q1y3j_js_1.Me.paper), d.ctx.strokeStyle = C.style === "advanced" ? "rgba(193,18,31,.45)" : "rgba(44,24,16,.2)", d.ctx.strokeRect(V + 0.5, _ + 0.5, 63, 63), (0, official_chunk_xc4q1y3j_js_1.Ue)(d, C.icon, V + 13, _ + 2, 38, 38); let H = C.name.length > 5 ? 10 : 12, A = d.lines(C.name, H === 10 ? 50 : 56, H); A.forEach((E, m) => d.text(E, V + (64 - d.measure(E, H)) / 2, _ + 45 + (m - (A.length - 1) / 2) * 11, H, N)), d.hit(V, _, 64, 64, () => { this.skill = { id: L, x: V, y: _, parentScroll: d.modalScroll }, d.modalScroll = 0, d.invalidate(); }); })), r.gap(16), r.block(20, (g, I) => K(g, I + 10, ["当前属性 · 可分配 ", o.unallocatedPoints, " 点"])), r.gap(8), f(Object.entries(official_chunk_n7gywv4p_js_1.Cc).map(([g, I]) => [I, F[g]])), r; }
    paintSkill() { if (!this.skill)
        return; let o = this.u, n = this.skill, d = (0, official_chunk_n7gywv4p_js_1.wc)(n.id), r = Math.min(288, o.width - 24), p = r - 26, F = o.lines(d.description.replace(/\s+/g, " "), p, 14), K = Math.min(24 + F.length * 24 + 22, o.height - o.top - o.bottom - 24), f = Math.max(12, Math.min(n.x + 32 - r / 2, o.width - 12 - r)), v = n.y - K - 8 >= o.top + 12 ? n.y - K - 8 : n.y + 72, g = Math.max(o.top + 12, Math.min(v, o.height - o.bottom - 12 - K)); o.beginModal(!1), o.hit(0, 0, o.width, o.height, () => { o.modalScroll = n.parentScroll, this.skill = void 0, o.invalidate(); }), o.ctx.save(), o.ctx.shadowColor = "rgba(0,0,0,.15)", o.ctx.shadowBlur = 15, o.ctx.shadowOffsetY = 8, o.roundedRect(f, g, r, K, official_chunk_xc4q1y3j_js_1.Me.paper, 6), o.ctx.restore(), o.ctx.strokeStyle = "rgba(44,24,16,.2)", o.ctx.stroke(), o.hit(f, g, r, K, () => { }), o.modalMax = Math.max(0, 24 + F.length * 24 - K + 22), o.modalScroll = Math.min(o.modalScroll, o.modalMax), o.clip(f + 13, g + 11, p, K - 22, () => { o.text(d.name + (d.style === "unavailable" ? "（已失效）" : ""), f + 13, g + 23 - o.modalScroll, 14, official_chunk_xc4q1y3j_js_1.Me.ink), F.forEach((I, L) => o.text(I, f + 13, g + 47 + L * 24 - o.modalScroll, 14, official_chunk_xc4q1y3j_js_1.Me.ink)); }); }
}
exports.Gb = y;
const zod_1 = require("./zod.js");
var h = "00000000-0000-4000-8000-000000000000", { id: vo, ownerCultivatorId: Do, ...B } = official_chunk_n7gywv4p_js_1.yc.shape, Lo = zod_1.z.strictObject({ id: zod_1.z.uuid(), createdAt: zod_1.z.iso.datetime(), individual: zod_1.z.strictObject(B) }).superRefine((o, n) => { let d = official_chunk_n7gywv4p_js_1.yc.safeParse({ ...o.individual, id: o.id, ownerCultivatorId: h }); if (!d.success)
    for (let r of d.error.issues)
        n.addIssue({ code: "custom", message: r.message }); if (o.individual.revision >= 1e5)
    n.addIssue({ code: "custom", message: "灵兽版本已达上限" }); }), Qo = zod_1.z.strictObject({ name: official_chunk_n7gywv4p_js_1.yc.shape.name, speciesId: official_chunk_n7gywv4p_js_1.yc.shape.speciesId, isMutant: official_chunk_n7gywv4p_js_1.yc.shape.isMutant, originKind: official_chunk_n7gywv4p_js_1.yc.shape.originKind, initialLevel: official_chunk_n7gywv4p_js_1.yc.shape.initialLevel, level: official_chunk_n7gywv4p_js_1.yc.shape.level, exp: official_chunk_n7gywv4p_js_1.yc.shape.exp, growth: official_chunk_n7gywv4p_js_1.yc.shape.growth, aptitudes: official_chunk_n7gywv4p_js_1.yc.shape.aptitudes, allocatedAttributes: official_chunk_n7gywv4p_js_1.yc.shape.allocatedAttributes, unallocatedPoints: official_chunk_n7gywv4p_js_1.yc.shape.unallocatedPoints, skillSlotCapacity: official_chunk_n7gywv4p_js_1.yc.shape.skillSlotCapacity, skills: official_chunk_n7gywv4p_js_1.yc.shape.skills, currentLifespan: official_chunk_n7gywv4p_js_1.yc.shape.currentLifespan, maxLifespan: official_chunk_n7gywv4p_js_1.yc.shape.maxLifespan });
exports.Hb = Lo;
exports.Ib = Qo;
function Co(o, n, d, r) { if (o.ownerCultivatorId !== n)
    return "只能寄售自己的灵兽"; if (o.revision !== d)
    return "灵兽已有变化，请重新查看"; if (r.leadBeastId === o.id)
    return "请先取消灵兽首发"; if (r.carriedBeastIds.includes(o.id))
    return "请先将灵兽移出携带编组"; if (!official_chunk_n7gywv4p_js_1.yc.safeParse(o).success || o.revision >= 99999)
    return "灵兽个体事实或版本无效"; return null; }
var P = { realm: "炼气", stage: "后期" };
function $o(o, n) { return (0, official_chunk_xc4q1y3j_js_1.Rf)(o, n) >= (0, official_chunk_xc4q1y3j_js_1.Rf)(P.realm, P.stage); }
var No = "达到炼气后期后方可兑换", Ho = "达到炼气后期后方可使用拍卖行";
exports.Lb = No;
exports.Mb = Ho;
