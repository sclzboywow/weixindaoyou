"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hb = exports.Gb = exports.Fb = exports.Db = void 0;
exports.Eb = P;
exports.Ib = vo;
const official_chunk_rz6awa1g_js_1 = require("./official-chunk-rz6awa1g.js");
const official_chunk_z00ve42p_js_1 = require("./official-chunk-z00ve42p.js");
class _ {
    constructor(o) { this.u = o; }
    get underlayScroll() { var _a; return (_a = this.picker) === null || _a === void 0 ? void 0 : _a.scroll; }
    reset() { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.picker = void 0; }
    input(o, K, d, n, g = !1, C = "", r = 200) { this.field(o, K, d || C, () => { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); let f = (p) => { n(p.value), this.u.invalidate(); }, V = (p) => { var _a; f(p), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); }; this.stopKeyboard = () => { official_chunk_z00ve42p_js_1.Ge.offKeyboardInput(f), official_chunk_z00ve42p_js_1.Ge.offKeyboardComplete(V), official_chunk_z00ve42p_js_1.Ge.hideKeyboard(), this.stopKeyboard = void 0; }, official_chunk_z00ve42p_js_1.Ge.onKeyboardInput(f), official_chunk_z00ve42p_js_1.Ge.onKeyboardComplete(V), official_chunk_z00ve42p_js_1.Ge.showKeyboard({ defaultValue: d, maxLength: r, multiple: !1, confirmHold: !1, confirmType: "done" }); }, g, !d); }
    inlineInput(o, K, d, n, g = !1, C = 200) { let r = this.u; o.block(42, (f, V) => { if (r.text(K, f, V + 21, 14), r.ctx.save(), g)
        r.ctx.globalAlpha *= 0.5; if (r.ctx.strokeStyle = "rgba(44,24,16,.2)", r.ctx.strokeRect(f + o.width - 80 + 0.5, V + 0.5, 79, 41), r.text(d, f + o.width - 72, V + 21, 14, official_chunk_z00ve42p_js_1.Ee.ink, "monospace"), r.ctx.restore(), !g)
        r.hit(f + o.width - 80, V, 80, 42, () => { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); let p = (H) => { n(H.value), r.invalidate(); }, v = (H) => { var _a; p(H), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); }; this.stopKeyboard = () => { official_chunk_z00ve42p_js_1.Ge.offKeyboardInput(p), official_chunk_z00ve42p_js_1.Ge.offKeyboardComplete(v), official_chunk_z00ve42p_js_1.Ge.hideKeyboard(), this.stopKeyboard = void 0; }, official_chunk_z00ve42p_js_1.Ge.onKeyboardInput(p), official_chunk_z00ve42p_js_1.Ge.onKeyboardComplete(v), official_chunk_z00ve42p_js_1.Ge.showKeyboard({ defaultValue: d, maxLength: C, multiple: !1, confirmHold: !1, confirmType: "done" }); }); }); }
    select(o, K, d, n, g, C = !1) { var _a, _b; this.field(o, K, ((_b = (_a = n.find((r) => r.value === d)) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : d) + "　⌄", () => { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.picker = { title: K, options: n, value: d, choose: g, scroll: this.u.modalScroll }, this.u.modalScroll = 0, this.u.invalidate(); }, C); }
    field(o, K, d, n, g, C = !1) { let r = this.u; o.text(K, 14, 20), o.gap(4), o.block(42, (f, V) => { if (r.ctx.save(), g)
        r.ctx.globalAlpha *= 0.5; if (r.rect(f, V, o.width, 42, "rgba(248,243,230,.7)"), r.ctx.strokeStyle = "rgba(44,24,16,.25)", r.ctx.strokeRect(f + 0.5, V + 0.5, o.width - 1, 41), r.clip(f + 10, V, o.width - 20, 42, () => r.text(d, f + 10, V + 21, 14, C ? official_chunk_z00ve42p_js_1.Ee["ink-secondary"] : official_chunk_z00ve42p_js_1.Ee.ink)), r.ctx.restore(), !g)
        r.hit(f, V, o.width, 42, n); }); }
    paintOverlay() { let o = this.picker; if (!o)
        return; let K = this.u, d = new official_chunk_z00ve42p_js_1.Fe(K, Math.min(448, K.width - 24) - 34), n = () => { this.picker = void 0, K.modalScroll = o.scroll, K.invalidate(); }; for (let g of o.options)
        d.block(44, (C, r) => { K.text(`${g.value === o.value ? "●" : "○"} ${g.label}`, C, r + 22, 14, g.value === o.value ? official_chunk_z00ve42p_js_1.Ee.crimson : official_chunk_z00ve42p_js_1.Ee.ink), K.hit(C, r, d.width, 44, () => { o.choose(g.value), n(); }); }); (0, official_chunk_z00ve42p_js_1.Ke)(K, { title: o.title, style: "modal", rows: [], content: d }, n); }
}
exports.Db = _;
function P(o, K, d, n, g) { var _a, _b; let C = (_b = (_a = official_chunk_z00ve42p_js_1.Bf.find((r) => r.id === K.speciesId)) === null || _a === void 0 ? void 0 : _a.icon) !== null && _b !== void 0 ? _b : "\uD83D\uDC3E"; if (o.ctx.save(), K.isMutant)
    o.ctx.filter = "sepia(0.65) saturate(2) hue-rotate(235deg)"; (0, official_chunk_z00ve42p_js_1.Le)(o, C, d, n, g, g, g), o.ctx.restore(); }
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
        return; let K = this.u, d = Math.min(448, K.width - 24) - 34, n = K.modalScroll; if (this.skill)
        K.modalScroll = this.skill.parentScroll; let g = this.content(o, d); if ((0, official_chunk_z00ve42p_js_1.Ke)(K, { title: o.name, style: "modal", rows: [], content: g }, this.close), this.skill)
        K.modalScroll = n, this.paintSkill(); }
    content(o, K) { let d = this.u, n = new official_chunk_z00ve42p_js_1.Fe(d, K), g = official_chunk_z00ve42p_js_1.Bf.find((p) => p.id === o.speciesId), C = (0, official_chunk_rz6awa1g_js_1.nd)(o), r = (p, v, H, J = official_chunk_z00ve42p_js_1.Ee.ink) => { let I = p; for (let q of H) {
        let D = typeof q === "number" ? "monospace" : d.bodyFont, L = String(q);
        d.text(L, I, v, 14, J, D), I += d.measure(L, 14, D);
    } }; if (n.block(64, (p, v) => { var _a, _b; if (P(d, o, p, v + 2, 60), d.text(o.name, p + 72, v + 12, 14, official_chunk_z00ve42p_js_1.Ee.ink), o.isMutant) {
        let H = p + 76 + d.measure(o.name, 14);
        d.text("变异", H + 4, v + 12, 12, "#9333ea");
    } r(p + 72, v + 32, [`${(_a = g === null || g === void 0 ? void 0 : g.name) !== null && _a !== void 0 ? _a : ""} · ${(0, official_chunk_rz6awa1g_js_1.qc)(o)} · `, o.level, "级"], official_chunk_z00ve42p_js_1.Ee["ink-secondary"]), r(p + 72, v + 52, ["参战等级 ", (_b = g === null || g === void 0 ? void 0 : g.carryLevel) !== null && _b !== void 0 ? _b : "", " · 经验 ", o.exp]); }), n.gap(16), o.originKind === "wild")
        n.text(`初始${o.initialLevel}级，较同级幼崽少${50 + 2 * o.initialLevel}属性点`, 14, 20, official_chunk_z00ve42p_js_1.Ee["ink-secondary"]), n.gap(16); if (n.block(20, (p, v) => { d.text("成长 ", p, v + 10, 14, official_chunk_z00ve42p_js_1.Ee.ink); let J = p + d.measure("成长 ", 14); d.text(o.growth.toFixed(3), J, v + 10, 14, official_chunk_z00ve42p_js_1.Ee.ink, "monospace"), J += d.measure(o.growth.toFixed(3), 14, "monospace"), r(J, v + 10, [" · 寿命 ", o.currentLifespan, "/", o.maxLifespan]); }), o.currentLifespan < official_chunk_z00ve42p_js_1.Lf.lifespan.deployMinimum)
        n.gap(16), n.text("寿命不足，须先休养才能出战。交易不恢复寿命。", 14, 20, official_chunk_z00ve42p_js_1.Ee.crimson); let f = (p) => { n.block(Math.ceil(p.length / 2) * 28 - 8, (v, H) => { let J = (K - 20) / 2; p.forEach(([I, q], D) => { let L = v + D % 2 * (J + 20), M = H + Math.floor(D / 2) * 28 + 10; d.text(I, L, M, 14, official_chunk_z00ve42p_js_1.Ee.ink), d.text(String(q), L + J - d.measure(String(q), 14, "monospace"), M, 14, official_chunk_z00ve42p_js_1.Ee.ink, "monospace"); }); }); }; n.gap(16), f([["攻击资质", o.aptitudes.attack], ["防御资质", o.aptitudes.defense], ["体力资质", o.aptitudes.health], ["法力资质", o.aptitudes.mana], ["速度资质", o.aptitudes.speed]]), n.gap(16), n.block(20, (p, v) => r(p, v + 10, ["技能 ", o.skills.length, "/", o.skillSlotCapacity])), n.gap(8); let V = Math.max(1, Math.floor((K + 8) / 72)); return n.block(o.skills.length ? Math.ceil(o.skills.length / V) * 72 - 8 : 0, (p, v) => o.skills.forEach((H, J) => { let I = (0, official_chunk_rz6awa1g_js_1.pc)(H), q = p + J % V * 72, D = v + Math.floor(J / V) * 72, L = I.style === "advanced" ? official_chunk_z00ve42p_js_1.Ee.crimson : I.style === "unavailable" ? "rgba(90,74,66,.6)" : official_chunk_z00ve42p_js_1.Ee.ink; d.rect(q, D, 64, 64, I.style === "advanced" ? "rgba(193,18,31,.05)" : official_chunk_z00ve42p_js_1.Ee.paper), d.ctx.strokeStyle = I.style === "advanced" ? "rgba(193,18,31,.45)" : "rgba(44,24,16,.2)", d.ctx.strokeRect(q + 0.5, D + 0.5, 63, 63), d.text(I.icon, q + (64 - d.measure(I.icon, 24)) / 2, D + 19, 24, L); let M = I.name.length > 5 ? 10 : 12, R = d.lines(I.name, M === 10 ? 50 : 56, M); R.forEach((U, A) => d.text(U, q + (64 - d.measure(U, M)) / 2, D + 45 + (A - (R.length - 1) / 2) * 11, M, L)), d.hit(q, D, 64, 64, () => { this.skill = { id: H, x: q, y: D, parentScroll: d.modalScroll }, d.modalScroll = 0, d.invalidate(); }); })), n.gap(16), n.block(20, (p, v) => r(p, v + 10, ["当前属性 · 可分配 ", o.unallocatedPoints, " 点"])), n.gap(8), f(Object.entries(official_chunk_rz6awa1g_js_1.uc).map(([p, v]) => [v, C[p]])), n; }
    paintSkill() { if (!this.skill)
        return; let o = this.u, K = this.skill, d = (0, official_chunk_rz6awa1g_js_1.pc)(K.id), n = Math.min(288, o.width - 24), g = n - 26, C = o.lines(d.description.replace(/\s+/g, " "), g, 14), r = Math.min(24 + C.length * 24 + 22, o.height - o.top - o.bottom - 24), f = Math.max(12, Math.min(K.x + 32 - n / 2, o.width - 12 - n)), V = K.y - r - 8 >= o.top + 12 ? K.y - r - 8 : K.y + 72, p = Math.max(o.top + 12, Math.min(V, o.height - o.bottom - 12 - r)); o.beginModal(!1), o.hit(0, 0, o.width, o.height, () => { o.modalScroll = K.parentScroll, this.skill = void 0, o.invalidate(); }), o.ctx.save(), o.ctx.shadowColor = "rgba(0,0,0,.15)", o.ctx.shadowBlur = 15, o.ctx.shadowOffsetY = 8, o.roundedRect(f, p, n, r, official_chunk_z00ve42p_js_1.Ee.paper, 6), o.ctx.restore(), o.ctx.strokeStyle = "rgba(44,24,16,.2)", o.ctx.stroke(), o.hit(f, p, n, r, () => { }), o.modalMax = Math.max(0, 24 + C.length * 24 - r + 22), o.modalScroll = Math.min(o.modalScroll, o.modalMax), o.clip(f + 13, p + 11, g, r - 22, () => { o.text(d.name + (d.style === "unavailable" ? "（已失效）" : ""), f + 13, p + 23 - o.modalScroll, 14, official_chunk_z00ve42p_js_1.Ee.ink), C.forEach((v, H) => o.text(v, f + 13, p + 47 + H * 24 - o.modalScroll, 14, official_chunk_z00ve42p_js_1.Ee.ink)); }); }
}
exports.Fb = T;
const zod_1 = require("./zod.js");
var m = "00000000-0000-4000-8000-000000000000", { id: ro, ownerCultivatorId: Ko, ...E } = official_chunk_rz6awa1g_js_1.rc.shape, po = zod_1.z.strictObject({ id: zod_1.z.uuid(), createdAt: zod_1.z.iso.datetime(), individual: zod_1.z.strictObject(E) }).superRefine((o, K) => { let d = official_chunk_rz6awa1g_js_1.rc.safeParse({ ...o.individual, id: o.id, ownerCultivatorId: m }); if (!d.success)
    for (let n of d.error.issues)
        K.addIssue({ code: "custom", message: n.message }); if (o.individual.revision >= 1e5)
    K.addIssue({ code: "custom", message: "灵兽版本已达上限" }); }), go = zod_1.z.strictObject({ name: official_chunk_rz6awa1g_js_1.rc.shape.name, speciesId: official_chunk_rz6awa1g_js_1.rc.shape.speciesId, isMutant: official_chunk_rz6awa1g_js_1.rc.shape.isMutant, originKind: official_chunk_rz6awa1g_js_1.rc.shape.originKind, initialLevel: official_chunk_rz6awa1g_js_1.rc.shape.initialLevel, level: official_chunk_rz6awa1g_js_1.rc.shape.level, exp: official_chunk_rz6awa1g_js_1.rc.shape.exp, growth: official_chunk_rz6awa1g_js_1.rc.shape.growth, aptitudes: official_chunk_rz6awa1g_js_1.rc.shape.aptitudes, allocatedAttributes: official_chunk_rz6awa1g_js_1.rc.shape.allocatedAttributes, unallocatedPoints: official_chunk_rz6awa1g_js_1.rc.shape.unallocatedPoints, skillSlotCapacity: official_chunk_rz6awa1g_js_1.rc.shape.skillSlotCapacity, skills: official_chunk_rz6awa1g_js_1.rc.shape.skills, currentLifespan: official_chunk_rz6awa1g_js_1.rc.shape.currentLifespan, maxLifespan: official_chunk_rz6awa1g_js_1.rc.shape.maxLifespan });
exports.Gb = po;
exports.Hb = go;
function vo(o, K, d, n) { if (o.ownerCultivatorId !== K)
    return "只能寄售自己的灵兽"; if (o.revision !== d)
    return "灵兽已有变化，请重新查看"; if (n.leadBeastId === o.id)
    return "请先取消灵兽首发"; if (n.carriedBeastIds.includes(o.id))
    return "请先将灵兽移出携带编组"; if (!official_chunk_rz6awa1g_js_1.rc.safeParse(o).success || o.revision >= 99999)
    return "灵兽个体事实或版本无效"; return null; }
