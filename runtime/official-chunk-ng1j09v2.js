"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ib = exports.Hb = exports.Gb = exports.Eb = void 0;
exports.Fb = P;
exports.Jb = vo;
const official_chunk_qa19w8gv_js_1 = require("./official-chunk-qa19w8gv.js");
const official_chunk_gaa6qyje_js_1 = require("./official-chunk-gaa6qyje.js");
class _ {
    constructor(o) { this.u = o; }
    get underlayScroll() { var _a; return (_a = this.picker) === null || _a === void 0 ? void 0 : _a.scroll; }
    reset() { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.picker = void 0; }
    input(o, K, d, r, g = !1, C = "", n = 200) { this.field(o, K, d || C, () => { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); let f = (p) => { r(p.value), this.u.invalidate(); }, k = (p) => { var _a; f(p), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); }; this.stopKeyboard = () => { official_chunk_gaa6qyje_js_1.Ke.offKeyboardInput(f), official_chunk_gaa6qyje_js_1.Ke.offKeyboardComplete(k), official_chunk_gaa6qyje_js_1.Ke.hideKeyboard(), this.stopKeyboard = void 0; }, official_chunk_gaa6qyje_js_1.Ke.onKeyboardInput(f), official_chunk_gaa6qyje_js_1.Ke.onKeyboardComplete(k), official_chunk_gaa6qyje_js_1.Ke.showKeyboard({ defaultValue: d, maxLength: n, multiple: !1, confirmHold: !1, confirmType: "done" }); }, g, !d); }
    inlineInput(o, K, d, r, g = !1, C = 200) { let n = this.u; o.block(42, (f, k) => { if (n.text(K, f, k + 21, 14), n.ctx.save(), g)
        n.ctx.globalAlpha *= 0.5; if (n.ctx.strokeStyle = "rgba(44,24,16,.2)", n.ctx.strokeRect(f + o.width - 80 + 0.5, k + 0.5, 79, 41), n.text(d, f + o.width - 72, k + 21, 14, official_chunk_gaa6qyje_js_1.Ie.ink, "monospace"), n.ctx.restore(), !g)
        n.hit(f + o.width - 80, k, 80, 42, () => { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); let p = (H) => { r(H.value), n.invalidate(); }, v = (H) => { var _a; p(H), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); }; this.stopKeyboard = () => { official_chunk_gaa6qyje_js_1.Ke.offKeyboardInput(p), official_chunk_gaa6qyje_js_1.Ke.offKeyboardComplete(v), official_chunk_gaa6qyje_js_1.Ke.hideKeyboard(), this.stopKeyboard = void 0; }, official_chunk_gaa6qyje_js_1.Ke.onKeyboardInput(p), official_chunk_gaa6qyje_js_1.Ke.onKeyboardComplete(v), official_chunk_gaa6qyje_js_1.Ke.showKeyboard({ defaultValue: d, maxLength: C, multiple: !1, confirmHold: !1, confirmType: "done" }); }); }); }
    select(o, K, d, r, g, C = !1) { var _a, _b; this.field(o, K, ((_b = (_a = r.find((n) => n.value === d)) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : d) + "　⌄", () => { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.picker = { title: K, options: r, value: d, choose: g, scroll: this.u.modalScroll }, this.u.modalScroll = 0, this.u.invalidate(); }, C); }
    field(o, K, d, r, g, C = !1) { let n = this.u; o.text(K, 14, 20), o.gap(4), o.block(42, (f, k) => { if (n.ctx.save(), g)
        n.ctx.globalAlpha *= 0.5; if (n.rect(f, k, o.width, 42, "rgba(248,243,230,.7)"), n.ctx.strokeStyle = "rgba(44,24,16,.25)", n.ctx.strokeRect(f + 0.5, k + 0.5, o.width - 1, 41), n.clip(f + 10, k, o.width - 20, 42, () => n.text(d, f + 10, k + 21, 14, C ? official_chunk_gaa6qyje_js_1.Ie["ink-secondary"] : official_chunk_gaa6qyje_js_1.Ie.ink)), n.ctx.restore(), !g)
        n.hit(f, k, o.width, 42, r); }); }
    paintOverlay() { let o = this.picker; if (!o)
        return; let K = this.u, d = new official_chunk_gaa6qyje_js_1.Je(K, Math.min(448, K.width - 24) - 34), r = () => { this.picker = void 0, K.modalScroll = o.scroll, K.invalidate(); }; for (let g of o.options)
        d.block(44, (C, n) => { K.text(`${g.value === o.value ? "●" : "○"} ${g.label}`, C, n + 22, 14, g.value === o.value ? official_chunk_gaa6qyje_js_1.Ie.crimson : official_chunk_gaa6qyje_js_1.Ie.ink), K.hit(C, n, d.width, 44, () => { o.choose(g.value), r(); }); }); (0, official_chunk_gaa6qyje_js_1.Oe)(K, { title: o.title, style: "modal", rows: [], content: d }, r); }
}
exports.Eb = _;
function P(o, K, d, r, g) { var _a, _b; let C = (_b = (_a = official_chunk_gaa6qyje_js_1.Nf.find((n) => n.id === K.speciesId)) === null || _a === void 0 ? void 0 : _a.icon) !== null && _b !== void 0 ? _b : "\uD83D\uDC3E"; if (o.ctx.save(), K.isMutant)
    o.ctx.filter = "sepia(0.65) saturate(2) hue-rotate(235deg)"; (0, official_chunk_gaa6qyje_js_1.Pe)(o, C, d, r, g, g, g), o.ctx.restore(); }
class T {
    constructor(o) {
        this.savedScroll = 0;
        this.close = () => { this.beast = void 0, this.skill = void 0, this.u.modalScroll = this.savedScroll, this.u.invalidate(); };
        this.u = o;
    }
    get underlayScroll() { return this.beast ? this.savedScroll : void 0; }
    get skillUnderlayScroll() { var _a; return (_a = this.skill) === null || _a === void 0 ? void 0 : _a.parentScroll; }
    open(o) { this.beast = o, this.savedScroll = this.u.modalScroll, this.u.modalScroll = 0, this.skill = void 0, this.u.invalidate(); }
    paint() { let o = this.beast; if (!o)
        return; let K = this.u, d = Math.min(448, K.width - 24) - 34, r = K.modalScroll; if (this.skill)
        K.modalScroll = this.skill.parentScroll; let g = this.content(o, d); if ((0, official_chunk_gaa6qyje_js_1.Oe)(K, { title: o.name, style: "modal", rows: [], content: g }, this.close), this.skill)
        K.modalScroll = r, this.paintSkill(); }
    content(o, K) { let d = this.u, r = new official_chunk_gaa6qyje_js_1.Je(d, K), g = official_chunk_gaa6qyje_js_1.Nf.find((p) => p.id === o.speciesId), C = (0, official_chunk_qa19w8gv_js_1.rd)(o), n = (p, v, H, J = official_chunk_gaa6qyje_js_1.Ie.ink) => { let I = p; for (let q of H) {
        let D = typeof q === "number" ? "monospace" : d.bodyFont, L = String(q);
        d.text(L, I, v, 14, J, D), I += d.measure(L, 14, D);
    } }; if (r.block(64, (p, v) => { var _a, _b; if (P(d, o, p, v + 2, 60), d.text(o.name, p + 72, v + 12, 14, official_chunk_gaa6qyje_js_1.Ie.ink), o.isMutant) {
        let H = p + 76 + d.measure(o.name, 14);
        d.text("变异", H + 4, v + 12, 12, "#9333ea");
    } n(p + 72, v + 32, [`${(_a = g === null || g === void 0 ? void 0 : g.name) !== null && _a !== void 0 ? _a : ""} · ${(0, official_chunk_qa19w8gv_js_1.uc)(o)} · `, o.level, "级"], official_chunk_gaa6qyje_js_1.Ie["ink-secondary"]), n(p + 72, v + 52, ["参战等级 ", (_b = g === null || g === void 0 ? void 0 : g.carryLevel) !== null && _b !== void 0 ? _b : "", " · 经验 ", o.exp]); }), r.gap(16), o.originKind === "wild")
        r.text(`初始${o.initialLevel}级，较同级幼崽少${50 + 2 * o.initialLevel}属性点`, 14, 20, official_chunk_gaa6qyje_js_1.Ie["ink-secondary"]), r.gap(16); if (r.block(20, (p, v) => { d.text("成长 ", p, v + 10, 14, official_chunk_gaa6qyje_js_1.Ie.ink); let J = p + d.measure("成长 ", 14); d.text(o.growth.toFixed(3), J, v + 10, 14, official_chunk_gaa6qyje_js_1.Ie.ink, "monospace"), J += d.measure(o.growth.toFixed(3), 14, "monospace"), n(J, v + 10, [" · 寿命 ", o.currentLifespan, "/", o.maxLifespan]); }), o.currentLifespan < official_chunk_gaa6qyje_js_1.Yf.lifespan.deployMinimum)
        r.gap(16), r.text("寿命不足，须先休养才能出战。交易不恢复寿命。", 14, 20, official_chunk_gaa6qyje_js_1.Ie.crimson); let f = (p) => { r.block(Math.ceil(p.length / 2) * 28 - 8, (v, H) => { let J = (K - 20) / 2; p.forEach(([I, q], D) => { let L = v + D % 2 * (J + 20), M = H + Math.floor(D / 2) * 28 + 10; d.text(I, L, M, 14, official_chunk_gaa6qyje_js_1.Ie.ink), d.text(String(q), L + J - d.measure(String(q), 14, "monospace"), M, 14, official_chunk_gaa6qyje_js_1.Ie.ink, "monospace"); }); }); }; r.gap(16), f([["攻击资质", o.aptitudes.attack], ["防御资质", o.aptitudes.defense], ["体力资质", o.aptitudes.health], ["法力资质", o.aptitudes.mana], ["速度资质", o.aptitudes.speed]]), r.gap(16), r.block(20, (p, v) => n(p, v + 10, ["技能 ", o.skills.length, "/", o.skillSlotCapacity])), r.gap(8); let k = Math.max(1, Math.floor((K + 8) / 72)); return r.block(o.skills.length ? Math.ceil(o.skills.length / k) * 72 - 8 : 0, (p, v) => o.skills.forEach((H, J) => { let I = (0, official_chunk_qa19w8gv_js_1.tc)(H), q = p + J % k * 72, D = v + Math.floor(J / k) * 72, L = I.style === "advanced" ? official_chunk_gaa6qyje_js_1.Ie.crimson : I.style === "unavailable" ? "rgba(90,74,66,.6)" : official_chunk_gaa6qyje_js_1.Ie.ink; d.rect(q, D, 64, 64, I.style === "advanced" ? "rgba(193,18,31,.05)" : official_chunk_gaa6qyje_js_1.Ie.paper), d.ctx.strokeStyle = I.style === "advanced" ? "rgba(193,18,31,.45)" : "rgba(44,24,16,.2)", d.ctx.strokeRect(q + 0.5, D + 0.5, 63, 63), (0, official_chunk_gaa6qyje_js_1.Pe)(d, I.icon, q + 13, D + 2, 38, 38); let M = I.name.length > 5 ? 10 : 12, U = d.lines(I.name, M === 10 ? 50 : 56, M); U.forEach((i, A) => d.text(i, q + (64 - d.measure(i, M)) / 2, D + 45 + (A - (U.length - 1) / 2) * 11, M, L)), d.hit(q, D, 64, 64, () => { this.skill = { id: H, x: q, y: D, parentScroll: d.modalScroll }, d.modalScroll = 0, d.invalidate(); }); })), r.gap(16), r.block(20, (p, v) => n(p, v + 10, ["当前属性 · 可分配 ", o.unallocatedPoints, " 点"])), r.gap(8), f(Object.entries(official_chunk_qa19w8gv_js_1.yc).map(([p, v]) => [v, C[p]])), r; }
    paintSkill() { if (!this.skill)
        return; let o = this.u, K = this.skill, d = (0, official_chunk_qa19w8gv_js_1.tc)(K.id), r = Math.min(288, o.width - 24), g = r - 26, C = o.lines(d.description.replace(/\s+/g, " "), g, 14), n = Math.min(24 + C.length * 24 + 22, o.height - o.top - o.bottom - 24), f = Math.max(12, Math.min(K.x + 32 - r / 2, o.width - 12 - r)), k = K.y - n - 8 >= o.top + 12 ? K.y - n - 8 : K.y + 72, p = Math.max(o.top + 12, Math.min(k, o.height - o.bottom - 12 - n)); o.beginModal(!1), o.hit(0, 0, o.width, o.height, () => { o.modalScroll = K.parentScroll, this.skill = void 0, o.invalidate(); }), o.ctx.save(), o.ctx.shadowColor = "rgba(0,0,0,.15)", o.ctx.shadowBlur = 15, o.ctx.shadowOffsetY = 8, o.roundedRect(f, p, r, n, official_chunk_gaa6qyje_js_1.Ie.paper, 6), o.ctx.restore(), o.ctx.strokeStyle = "rgba(44,24,16,.2)", o.ctx.stroke(), o.hit(f, p, r, n, () => { }), o.modalMax = Math.max(0, 24 + C.length * 24 - n + 22), o.modalScroll = Math.min(o.modalScroll, o.modalMax), o.clip(f + 13, p + 11, g, n - 22, () => { o.text(d.name + (d.style === "unavailable" ? "（已失效）" : ""), f + 13, p + 23 - o.modalScroll, 14, official_chunk_gaa6qyje_js_1.Ie.ink), C.forEach((v, H) => o.text(v, f + 13, p + 47 + H * 24 - o.modalScroll, 14, official_chunk_gaa6qyje_js_1.Ie.ink)); }); }
}
exports.Gb = T;
const zod_1 = require("./zod.js");
var m = "00000000-0000-4000-8000-000000000000", { id: no, ownerCultivatorId: Ko, ...E } = official_chunk_qa19w8gv_js_1.vc.shape, po = zod_1.z.strictObject({ id: zod_1.z.uuid(), createdAt: zod_1.z.iso.datetime(), individual: zod_1.z.strictObject(E) }).superRefine((o, K) => { let d = official_chunk_qa19w8gv_js_1.vc.safeParse({ ...o.individual, id: o.id, ownerCultivatorId: m }); if (!d.success)
    for (let r of d.error.issues)
        K.addIssue({ code: "custom", message: r.message }); if (o.individual.revision >= 1e5)
    K.addIssue({ code: "custom", message: "灵兽版本已达上限" }); }), go = zod_1.z.strictObject({ name: official_chunk_qa19w8gv_js_1.vc.shape.name, speciesId: official_chunk_qa19w8gv_js_1.vc.shape.speciesId, isMutant: official_chunk_qa19w8gv_js_1.vc.shape.isMutant, originKind: official_chunk_qa19w8gv_js_1.vc.shape.originKind, initialLevel: official_chunk_qa19w8gv_js_1.vc.shape.initialLevel, level: official_chunk_qa19w8gv_js_1.vc.shape.level, exp: official_chunk_qa19w8gv_js_1.vc.shape.exp, growth: official_chunk_qa19w8gv_js_1.vc.shape.growth, aptitudes: official_chunk_qa19w8gv_js_1.vc.shape.aptitudes, allocatedAttributes: official_chunk_qa19w8gv_js_1.vc.shape.allocatedAttributes, unallocatedPoints: official_chunk_qa19w8gv_js_1.vc.shape.unallocatedPoints, skillSlotCapacity: official_chunk_qa19w8gv_js_1.vc.shape.skillSlotCapacity, skills: official_chunk_qa19w8gv_js_1.vc.shape.skills, currentLifespan: official_chunk_qa19w8gv_js_1.vc.shape.currentLifespan, maxLifespan: official_chunk_qa19w8gv_js_1.vc.shape.maxLifespan });
exports.Hb = po;
exports.Ib = go;
function vo(o, K, d, r) { if (o.ownerCultivatorId !== K)
    return "只能寄售自己的灵兽"; if (o.revision !== d)
    return "灵兽已有变化，请重新查看"; if (r.leadBeastId === o.id)
    return "请先取消灵兽首发"; if (r.carriedBeastIds.includes(o.id))
    return "请先将灵兽移出携带编组"; if (!official_chunk_qa19w8gv_js_1.vc.safeParse(o).success || o.revision >= 99999)
    return "灵兽个体事实或版本无效"; return null; }
