"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Db = exports.Bb = exports.yb = void 0;
exports.ub = X0;
exports.vb = h0;
exports.wb = d0;
exports.xb = D0;
exports.zb = k0;
exports.Ab = _0;
exports.Cb = G1;
const official_chunk_qa19w8gv_js_1 = require("./official-chunk-qa19w8gv.js");
const official_chunk_gaa6qyje_js_1 = require("./official-chunk-gaa6qyje.js");
var m = [["all", "全部"], ["beast_book", "传承灵印"], ["beast_refinement", "归元灵露"], ["beast_rejuvenation", "化生果"], ["manual_jade", "功法玉简"], ["inscription", "阵纹"], ["equipment", "道装"], ["blueprint", "图纸"], ["material", "材料"], ["seed", "灵种"], ["consumable", "丹药与消耗品"]];
function D0($, G) { return [...$].sort((J, H) => { if (G === "quantity" && J.quantity !== H.quantity)
    return H.quantity - J.quantity; if (G === "kind") {
    let j = m.findIndex(([Z]) => Z === (0, official_chunk_qa19w8gv_js_1.ce)(J.definitionId).kind) - m.findIndex(([Z]) => Z === (0, official_chunk_qa19w8gv_js_1.ce)(H.definitionId).kind);
    if (j)
        return j;
} return Date.parse(H.updatedAt) - Date.parse(J.updatedAt) || (J.id < H.id ? 1 : J.id > H.id ? -1 : 0); }); }
var u = m;
exports.yb = u;
function k0($) { return $.kind !== "all" || !!$.minRank || !!$.maxRank || !!$.materialType || !!$.element; }
function _0($, G) { let J = (0, official_chunk_qa19w8gv_js_1.ce)($.definitionId).kind; if (G.kind !== "all" && J !== G.kind)
    return !1; if (G.kind !== "material")
    return !0; let H = official_chunk_qa19w8gv_js_1.Ad.safeParse($.instanceData); if (!H.success)
    return !1; let j = official_chunk_gaa6qyje_js_1.Ef.indexOf(H.data.rank); return (!G.minRank || j >= official_chunk_gaa6qyje_js_1.Ef.indexOf(G.minRank)) && (!G.maxRank || j <= official_chunk_gaa6qyje_js_1.Ef.indexOf(G.maxRank)) && (!G.materialType || H.data.type === G.materialType) && (!G.element || H.data.element === G.element); }
class W0 {
    get active() { return this.filtering; }
    constructor($, G) {
        this.filtering = !1;
        this.kindDisabled = !1;
        this.draft = { kind: "all" };
        this.filter = { kind: "all" };
        this.savedScroll = 0;
        this.closeFilter = () => { this.filtering = !1, this.select = void 0, this.u.modalScroll = this.savedScroll, this.u.invalidate(); };
        this.u = $;
        this.onChange = G;
    }
    open($, G = !1) { this.kindDisabled = G, this.select = void 0, this.filter = { ...$ }, this.draft = { ...$ }, this.filtering = !0, this.savedScroll = this.u.modalScroll, this.u.modalScroll = 0, this.u.invalidate(); }
    paint() { var _a, _b; if (!this.filtering)
        return; let $ = this.u, G = new official_chunk_gaa6qyje_js_1.Je($, Math.min(448, $.width - 24) - 34), J = G.width, H = (j, Z, M, q, P = !1) => { G.text(j, 14, 20), G.block(38, (X, z) => { var _a, _b; if ($.ctx.strokeStyle = "rgba(44,24,16,.2)", $.ctx.strokeRect(X + 0.5, z + 0.5, J - 1, 37), $.text((_b = (_a = M.find((Y) => Y[0] === Z)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : "", X + 8, z + 19, 14), $.text("⌄", X + J - 20, z + 19, 14), !P)
        $.hit(X, z, J, 38, () => { this.select = { value: Z, options: M, choose: q }, $.modalScroll = 0, $.invalidate(); }); }); }; if (H("物品类型", this.draft.kind, u, (j) => { this.draft = { kind: j }; }, this.kindDisabled), this.draft.kind === "material") {
        G.gap(20), H("材料元素", (_a = this.draft.element) !== null && _a !== void 0 ? _a : "", [["", "全部元素"], ...official_chunk_gaa6qyje_js_1.wf.map((q) => [q, q])], (q) => { this.draft.element = q || void 0; }), G.gap(20), G.text("品质范围", 14, 20), G.gap(8);
        let j = this.draft.minRank ? official_chunk_gaa6qyje_js_1.Ef.indexOf(this.draft.minRank) : 0, Z = this.draft.maxRank ? official_chunk_gaa6qyje_js_1.Ef.indexOf(this.draft.maxRank) : official_chunk_gaa6qyje_js_1.Ef.length - 1, M = official_chunk_gaa6qyje_js_1.Ef.length - 1;
        G.block(16, (q, P) => { $.text(`下限 ${official_chunk_gaa6qyje_js_1.Ef[j]}`, q, P + 8, 12, official_chunk_gaa6qyje_js_1.Ie["ink-secondary"]); let X = `上限 ${official_chunk_gaa6qyje_js_1.Ef[Z]}`; $.text(X, q + J - $.measure(X, 12), P + 8, 12, official_chunk_gaa6qyje_js_1.Ie["ink-secondary"]); }), G.gap(8), G.block(44, (q, P) => { let X = (z) => q + 12 + (J - 24) * z / M; $.rect(q + 12, P + 22, J - 24, 1, "rgba(44,24,16,.15)"), $.rect(X(j), P + 21.5, X(Z) - X(j), 2, "rgba(193,18,31,.7)"), official_chunk_gaa6qyje_js_1.Ef.forEach((z, Y) => { $.ctx.save(), $.ctx.translate(X(Y), P + 22), $.ctx.rotate(Math.PI / 4), $.rect(-3, -3, 6, 6, official_chunk_gaa6qyje_js_1.Ie.paper), $.ctx.strokeStyle = Y >= j && Y <= Z ? "rgba(193,18,31,.7)" : "rgba(44,24,16,.35)", $.ctx.strokeRect(-3, -3, 6, 6), $.ctx.restore(); }), ["max", "min"].forEach((z) => { let Y = z === "min" ? j : Z, A = X(Y) + (j === Z ? z === "min" ? -6 : 6 : 0); $.ctx.beginPath(), $.ctx.arc(A, P + 22, 11, 0, Math.PI * 2), $.ctx.fillStyle = official_chunk_gaa6qyje_js_1.Ie.paper, $.ctx.fill(), $.ctx.strokeStyle = official_chunk_gaa6qyje_js_1.Ie.crimson, $.ctx.lineWidth = 2, $.ctx.stroke(), $.ctx.lineWidth = 1, $.hit(A - 14, P + 8, 28, 28, () => { }, { drag: (E) => { let k = Math.max(0, Math.min(M, Math.round((E - q - 12) / (J - 24) * M))); if (z === "min")
                this.draft.minRank = Math.min(k, Z) ? official_chunk_gaa6qyje_js_1.Ef[Math.min(k, Z)] : void 0;
            else
                this.draft.maxRank = Math.max(k, j) === M ? void 0 : official_chunk_gaa6qyje_js_1.Ef[Math.max(k, j)]; $.invalidate(); } }); }); }), G.gap(8), G.block(16, (q, P) => { $.text(official_chunk_gaa6qyje_js_1.Ef[0], q, P + 8, 12, official_chunk_gaa6qyje_js_1.Ie["ink-secondary"]), $.text(official_chunk_gaa6qyje_js_1.Ef[M], q + J - $.measure(official_chunk_gaa6qyje_js_1.Ef[M], 12), P + 8, 12, official_chunk_gaa6qyje_js_1.Ie["ink-secondary"]); }), G.gap(20), H("材料类型", (_b = this.draft.materialType) !== null && _b !== void 0 ? _b : "", [["", "全部材料"], ...official_chunk_qa19w8gv_js_1.yd.map((q) => [q, official_chunk_qa19w8gv_js_1.xd[q]])], (q) => { this.draft.materialType = q || void 0; });
    } if ((0, official_chunk_gaa6qyje_js_1.Oe)($, { title: "筛选物品", style: "modal", rows: [], content: G, actions: [{ label: "重置", align: "start", run: () => { this.draft = { kind: this.kindDisabled ? this.filter.kind : "all" }, $.invalidate(); } }, { label: "取消", run: this.closeFilter }, { label: "应用筛选", primary: !0, run: () => { this.filter = this.draft.kind === "material" ? { ...this.draft } : { kind: this.draft.kind }, this.closeFilter(), this.onChange(this.filter); } }] }, this.closeFilter), this.select) {
        let j = this.select, Z = new official_chunk_gaa6qyje_js_1.Je($, $.width - 32);
        j.options.forEach(([M, q]) => Z.block(44, (P, X) => { $.text(q, P + 12, X + 22, 14, M === j.value ? official_chunk_gaa6qyje_js_1.Ie.crimson : official_chunk_gaa6qyje_js_1.Ie.ink), $.hit(P, X, Z.width, 44, () => { j.choose(M), this.select = void 0, $.modalScroll = 0, $.invalidate(); }); })), (0, official_chunk_gaa6qyje_js_1.Oe)($, { title: "选择", rows: [], content: Z }, () => { this.select = void 0, $.modalScroll = 0, $.invalidate(); });
    } }
}
exports.Bb = W0;
function X0($) { return `评分 ${typeof $ === "number" && Number.isFinite($) ? Math.max(1, Math.round($)) : 0}`; }
function h0($, G, J) { var _a; let H = new official_chunk_gaa6qyje_js_1.Je($, G), j = G - 34, Z = (j - 12) / 2, M = $.lines(J.description, j, 14), q = $.lines((_a = J.prompt) !== null && _a !== void 0 ? _a : "选择一位人物，与其交谈", j, 14), P = J.promptDetail ? $.lines(J.promptDetail, j, 14) : [], X = J.actors.map((D) => { let Q = $.lines(D.name, Z - 26, 16), K = $.lines(D.identity, Z - 26, 12), R = $.lines(D.responsibility, Z - 26, 12), W = D.status ? $.lines(D.status.label, Z - 40, 12) : [], O = D.appearance === "facility" ? 44 : 52, C = O * 1.5 + 12 + Q.length * 24 + 4 + K.length * 16 + 8 + R.length * 20 + (W.length ? 12 + W.length * 16 : 0); return { actor: D, names: Q, identities: K, responsibilities: R, status: W, sigil: O, content: C, height: Math.max(160, C + 34) }; }), z = Array.from({ length: Math.ceil(X.length / 2) }, (D, Q) => Math.max(...X.slice(Q * 2, Q * 2 + 2).map((K) => K.height))), Y = z.reduce((D, Q) => D + Q, 0) + Math.max(0, z.length - 1) * 12, A = (J.eyebrow ? 16 : 0) + 16 + M.length * 28, E = q.length * 20 + (P.length ? 4 + P.length * 20 : 0), k = Math.max(546, 58 + A + 64 + Y + E), h = k - (58 + A + 64 + Y + E); return H.block(k, (D, Q) => { $.rect(D, Q, G, k, "rgba(248,243,230,.42)"), $.ctx.strokeStyle = "rgba(44,24,16,.2)", $.ctx.strokeRect(D + 0.5, Q + 0.5, G - 1, k - 1); let K = (W, O, C, U = official_chunk_gaa6qyje_js_1.Ie["ink-secondary"]) => $.text(W, D + (G - $.measure(W, C)) / 2, O, C, U), R = Q + 29; if (J.eyebrow) {
    let W = J.eyebrow;
    $.tracked(W, D + (G - $.trackedWidth(W, 12, 3.6)) / 2, R + 8, 12, 3.6, official_chunk_gaa6qyje_js_1.Ie["ink-secondary"]), R += 16;
} R += 16, M.forEach((W, O) => K(W, R + 14 + O * 28, 14)), R += M.length * 28 + 32 + h / 2, X.forEach((W, O) => { let C = D + 17 + O % 2 * (Z + 12), U = Math.floor(O / 2), T = R + z.slice(0, U).reduce((I, L) => I + L + 12, 0), _ = z[U], N = W.actor; $.ctx.globalAlpha = N.disabled ? 0.5 : 1, $.ctx.save(), $.ctx.setLineDash([3, 3]), $.ctx.strokeStyle = "rgba(44,24,16,.2)", $.ctx.strokeRect(C + 0.5, T + 0.5, Z - 1, _ - 1), $.ctx.restore(); let F = T + (_ - W.content) / 2; $.text(N.sigil, C + (Z - $.measure(N.sigil, W.sigil, N.appearance === "facility" ? $.bodyFont : $.headingFont)) / 2, F + W.sigil * 0.75, W.sigil, official_chunk_gaa6qyje_js_1.Ie.ink, N.appearance === "facility" ? $.bodyFont : $.headingFont), F += W.sigil * 1.5 + 12; let S = (I, L, b, w) => { I.forEach((f, Z0) => $.text(f, C + (Z - $.measure(f, L)) / 2, F + b / 2 + Z0 * b, L, w)), F += I.length * b; }; if (S(W.names, 16, 24, official_chunk_gaa6qyje_js_1.Ie.ink), F += 4, S(W.identities, 12, 16, official_chunk_gaa6qyje_js_1.Ie["ink-secondary"]), F += 8, S(W.responsibilities, 12, 20, official_chunk_gaa6qyje_js_1.Ie["ink-secondary"]), N.status) {
    F += 12;
    let I = N.status.tone === "active" ? official_chunk_gaa6qyje_js_1.Ie.ink : N.status.tone === "attention" ? official_chunk_gaa6qyje_js_1.Ie.crimson : N.status.tone === "muted" ? "rgba(90,74,66,.6)" : official_chunk_gaa6qyje_js_1.Ie["ink-secondary"], L = Math.max(...W.status.map((w) => $.measure(w, 12))), b = C + (Z - L - 14) / 2;
    $.ctx.beginPath(), $.ctx.arc(b + 3, F + W.status.length * 8, 3, 0, Math.PI * 2), $.ctx.fillStyle = I, $.ctx.fill(), W.status.forEach((w, f) => $.text(w, b + 14, F + 8 + f * 16, 12, I));
} $.ctx.globalAlpha = 1, $.hit(C, T, Z, _, N.disabled ? () => { } : () => J.select(N.id)); }), R = Q + k - 29 - E, q.forEach((W, O) => K(W, R + 10 + O * 20, 14, official_chunk_gaa6qyje_js_1.Ie.ink)), R += q.length * 20 + 4, P.forEach((W, O) => K(W, R + 10 + O * 20, 14)); }), H; }
function d0($, G, J, H, j, Z, M = !1, q = "", P) {
    let X = new official_chunk_gaa6qyje_js_1.Je($, G), z = G - 40, Y = J.appearance === "facility", A = Y ? 48 : 60, E = $.lines(J.name, G - 120, 18), k = $.lines(J.identity, G - 120, 14), h = $.lines(J.responsibility, Math.min(144, G - 120), 12), D = E.length * 27 + 4 + k.length * 21 + 8 + h.length * 20, Q = 33 + Math.max(A * 1.5, D);
    if (X.block(Q, (K, R) => { $.rect(K, R, G, Q, "rgba(44,24,16,.025)"), $.rect(K, R + Q - 1, G, 1, "rgba(44,24,16,.1)"), $.text(J.sigil, K + 20 + (64 - $.measure(J.sigil, A, Y ? $.bodyFont : $.headingFont)) / 2, R + (Q - 1) / 2, A, official_chunk_gaa6qyje_js_1.Ie.ink, Y ? $.bodyFont : $.headingFont); let W = R + 16 + (Q - 33 - D) / 2; E.forEach((O, C) => $.text(O, K + 100, W + 13.5 + C * 27, 18)), W += E.length * 27 + 4, k.forEach((O, C) => $.text(O, K + 100, W + 10.5 + C * 21, 14, official_chunk_gaa6qyje_js_1.Ie["ink-secondary"])), W += k.length * 21 + 8, h.forEach((O, C) => $.text(O, K + 100, W + 10 + C * 20, 12, official_chunk_gaa6qyje_js_1.Ie["ink-secondary"])); }), X.gap(28), H.forEach((K, R) => {
        var _a, _b;
        if (R)
            X.gap(16);
        let W = K.tone === "attention" ? official_chunk_gaa6qyje_js_1.Ie.crimson : K.tone === "muted" ? official_chunk_gaa6qyje_js_1.Ie["ink-secondary"] : official_chunk_gaa6qyje_js_1.Ie.ink, O = typeof K.body === "string" ? [{ text: K.body }] : K.body, C = !!K.speaker && !Y, U = [...C ? [{ text: "“" }] : [], ...O, ...C ? [{ text: "”" }] : []], T = [[]], _ = 0;
        for (let N of U)
            for (let F of N.text) {
                if (F === `
`) {
                    T.push([]), _ = 0;
                    continue;
                }
                let S = $.measure(F, 16);
                if (_ + S > z * 0.94 && _)
                    T.push([]), _ = 0;
                T[T.length - 1].push({ char: F, x: _, color: (_a = N.color) !== null && _a !== void 0 ? _a : W, bold: (_b = N.bold) !== null && _b !== void 0 ? _b : !1 }), _ += S;
            }
        X.block(T.length * 32, (N, F) => T.forEach((S, I) => S.forEach((L) => $.text(L.char, N + 20 + L.x, F + 16 + I * 32, 16, L.color, $.bodyFont, L.bold))));
    }), q) {
        if (H.length)
            X.gap(16);
        let K = $.lines(q, z, 14);
        X.block(K.length * 28, (R, W) => K.forEach((O, C) => $.text(O, R + 20, W + 14 + C * 28, 14, official_chunk_gaa6qyje_js_1.Ie.crimson)));
    }
    if (P === null || P === void 0 ? void 0 : P.height)
        X.gap(20), X.block(P.height, (K, R) => P.paint(K + 20, R));
    if (j.length)
        X.gap(12);
    if (j.forEach((K, R) => { if (R)
        X.gap(8); let W = $.lines(K.label, z - 42, 16), O = 24 + W.length * 24, C = M || K.disabled; X.block(O, (U, T) => { let _ = $.ctx; if (_.save(), C)
        _.globalAlpha *= 0.5; $.rect(U + 20, T, z, O, "rgba(44,24,16,.025)"), $.rect(U + 20, T, 2, O, "rgba(44,24,16,.15)"); let N = K.tone === "primary" ? official_chunk_gaa6qyje_js_1.Ie.crimson : K.tone === "muted" ? official_chunk_gaa6qyje_js_1.Ie["ink-secondary"] : official_chunk_gaa6qyje_js_1.Ie.ink; if (W.forEach((F, S) => $.text(F, U + 42, T + 24 + S * 24, 16, N)), _.restore(), !C)
        $.hit(U + 20, T, z, O, () => Z(K.id)); }); }), X.gap(28), X.height < 544)
        X.gap(544 - X.height);
    return X;
}
function j0($) { let G = $(), J = 0; return () => { let H = $(); if (Number.isFinite(H))
    J += Math.max(0, H - G), G = H; return J; }; }
var n = globalThis.performance, u0 = j0(typeof (n === null || n === void 0 ? void 0 : n.now) === "function" ? () => n.now() : () => Date.now());
exports.Db = u0;
var s = { 凡品: 58, 灵品: 130, 玄品: 259, 真品: 504, 地品: 936, 天品: 1728, 仙品: 3096, 神品: 5472 }, a = { 凡品: 14, 灵品: 22, 玄品: 34, 真品: 51, 地品: 76, 天品: 111, 仙品: 160, 神品: 228 }, H0 = { ...official_chunk_qa19w8gv_js_1.gd };
function g($, G, J) { return Math.max(G, Math.min(J, $)); }
function K0($) { var _a; return ((_a = $ === null || $ === void 0 ? void 0 : $.spec) === null || _a === void 0 ? void 0 : _a.kind) === "pill"; }
function q0($, G) { var _a; let J = (_a = $.payload) === null || _a === void 0 ? void 0 : _a[G]; return typeof J === "number" && Number.isFinite(J) ? J : void 0; }
function B0($) { var _a, _b, _c, _d; switch ($.status) {
    case "cultivation_boost": return (0, official_chunk_qa19w8gv_js_1.dd)($) * 56;
    case "breakthrough_focus": return (0, official_chunk_qa19w8gv_js_1.ld)($) * 420;
    case "protect_meridians": return (0, official_chunk_qa19w8gv_js_1.md)($) * 80;
    case "clear_mind": return Math.max(1, (_a = $.usesRemaining) !== null && _a !== void 0 ? _a : 1) * 18;
    default: {
        let G = Math.max(1, (_b = $.stacks) !== null && _b !== void 0 ? _b : 1), J = Math.max(1, (_c = $.usesRemaining) !== null && _c !== void 0 ? _c : 1), H = Object.keys((_d = $.payload) !== null && _d !== void 0 ? _d : {}).reduce((j, Z) => { var _a; return j + Math.abs((_a = q0($, Z)) !== null && _a !== void 0 ? _a : 0); }, 0);
        return Math.min(36, G * J * 8 + H * 10);
    }
} }
function M0($) { switch ($.type) {
    case "restore_resource": return $.mode === "percent" ? $.value * 100 : Math.min(80, $.value / 20);
    case "change_gauge": return $.delta < 0 ? Math.abs($.delta) * 1.2 : 0;
    case "advance_track": return $.value * 0.85;
    case "gain_beast_cultivation": return Math.sqrt($.value) * 1.8;
    case "gain_progress": return $.target === "comprehension_insight" ? $.value * 2.2 : Math.sqrt(Math.max(0, $.value)) * 1.8;
    case "increase_lifespan": return $.value * 0.45;
    case "add_status": return B0($);
    case "remove_status": return $.removeAll ? 36 : 24;
} }
function O0($) { return $.operations.reduce((G, J) => G + M0(J), 0); }
function R0($) { if ($.source !== "formula")
    return 1; switch ($.fitBand) {
    case "aligned": return 1 + g($.fitScore, 0, 1) * 0.03;
    case "degraded": return 0.92;
    case "poor": return 0.82;
} }
function C0($) { if (!$)
    return 1; let G = g($.synergyScore, 0, 1) * 0.1, J = g($.conflictScore, 0, 1) * 0.16; return 1 + G - J; }
function P0($) { let G = $.appearance ? H0[$.appearance] : 1, J = 1 + g(($.stability - 60) / 100, -0.12, 0.16), H = 1 - g(Math.max(0, $.toxicityRating) * 0.0018, 0, 0.18); return G * J * H * C0($.batch) * R0($); }
function $0($) { var _a, _b, _c; if (!K0($))
    return null; let G = (_a = $.quality) !== null && _a !== void 0 ? _a : "凡品", J = (_b = s[G]) !== null && _b !== void 0 ? _b : s.凡品, H = (_c = a[G]) !== null && _c !== void 0 ? _c : a.凡品, j = O0($.spec), Z = g(0.82 + j / H * 0.18, 0.75, 1.35), M = P0($.spec.alchemyMeta); return Math.round(g(J * Z * M, 1, 9999)); }
function G1($, G) { var _a, _b, _c, _d; if ($ === "seed.v1")
    return `seed.v1:${JSON.stringify(official_chunk_qa19w8gv_js_1.Bd.parse(G).seedSpec)}`; if ($ === "equipment.v6")
    return null; if ($ === "consumable.v1") {
    let Z = official_chunk_qa19w8gv_js_1.ud.parse(G), M = Z.spec;
    if (M.kind !== "pill")
        return `consumable.v2:${JSON.stringify([Z.name, Z.type, Z.quality, (0, official_chunk_qa19w8gv_js_1.Nc)(M)])}`;
    let q = { kind: M.kind, family: M.family, operations: M.operations, consumeRules: M.consumeRules, ...M.alchemyMeta.version === 4 ? { protocol: "pill:v4" } : {}, appearance: (_a = M.alchemyMeta.appearance) !== null && _a !== void 0 ? _a : null, breakthroughTargetRealm: (_b = M.alchemyMeta.breakthroughTargetRealm) !== null && _b !== void 0 ? _b : null, breakthroughLabel: (_c = M.alchemyMeta.breakthroughLabel) !== null && _c !== void 0 ? _c : null, recycleScore: $0(Z) };
    return `consumable.v3:${JSON.stringify([Z.name, Z.type, Z.quality, Z.score, (0, official_chunk_qa19w8gv_js_1.Nc)(q)])}`;
} if ($ !== "material.v1")
    return `definition.v1:${$}`; let J = official_chunk_qa19w8gv_js_1.Ad.parse(G), H = new TextEncoder; return [J.name, J.type, J.rank, (_d = J.element) !== null && _d !== void 0 ? _d : "", J.description].map((Z) => `${H.encode(Z).length}:${Z}`).join(""); }
