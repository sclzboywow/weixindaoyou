"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zb = exports.xb = exports.ub = void 0;
exports.qb = X0;
exports.rb = h0;
exports.sb = p0;
exports.tb = z0;
exports.vb = T0;
exports.wb = _0;
exports.yb = G1;
const official_chunk_h2eh160v_js_1 = require("./official-chunk-h2eh160v.js");
const official_chunk_wje6zqc2_js_1 = require("./official-chunk-wje6zqc2.js");
var f = [["all", "全部"], ["beast_book", "传承灵印"], ["beast_refinement", "归元灵露"], ["beast_rejuvenation", "化生果"], ["manual_jade", "功法玉简"], ["inscription", "阵纹"], ["equipment", "道装"], ["blueprint", "图纸"], ["material", "材料"], ["seed", "灵种"], ["consumable", "丹药与消耗品"]];
function z0($, G) { return [...$].sort((J, j) => { if (G === "quantity" && J.quantity !== j.quantity)
    return j.quantity - J.quantity; if (G === "kind") {
    let M = f.findIndex(([Z]) => Z === (0, official_chunk_h2eh160v_js_1.Xd)(J.definitionId).kind) - f.findIndex(([Z]) => Z === (0, official_chunk_h2eh160v_js_1.Xd)(j.definitionId).kind);
    if (M)
        return M;
} return Date.parse(j.updatedAt) - Date.parse(J.updatedAt) || (J.id < j.id ? 1 : J.id > j.id ? -1 : 0); }); }
var c = f;
exports.ub = c;
function T0($) { return $.kind !== "all" || !!$.minRank || !!$.maxRank || !!$.materialType || !!$.element; }
function _0($, G) { let J = (0, official_chunk_h2eh160v_js_1.Xd)($.definitionId).kind; if (G.kind !== "all" && J !== G.kind)
    return !1; if (G.kind !== "material")
    return !0; let j = official_chunk_h2eh160v_js_1.td.safeParse($.instanceData); if (!j.success)
    return !1; let M = official_chunk_wje6zqc2_js_1.pf.indexOf(j.data.rank); return (!G.minRank || M >= official_chunk_wje6zqc2_js_1.pf.indexOf(G.minRank)) && (!G.maxRank || M <= official_chunk_wje6zqc2_js_1.pf.indexOf(G.maxRank)) && (!G.materialType || j.data.type === G.materialType) && (!G.element || j.data.element === G.element); }
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
        return; let $ = this.u, G = new official_chunk_wje6zqc2_js_1.Ce($, Math.min(448, $.width - 24) - 34), J = G.width, j = (M, Z, B, K, N = !1) => { G.text(M, 14, 20), G.block(38, (X, P) => { var _a, _b; if ($.ctx.strokeStyle = "rgba(44,24,16,.2)", $.ctx.strokeRect(X + 0.5, P + 0.5, J - 1, 37), $.text((_b = (_a = B.find((Y) => Y[0] === Z)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : "", X + 8, P + 19, 14), $.text("⌄", X + J - 20, P + 19, 14), !N)
        $.hit(X, P, J, 38, () => { this.select = { value: Z, options: B, choose: K }, $.modalScroll = 0, $.invalidate(); }); }); }; if (j("物品类型", this.draft.kind, c, (M) => { this.draft = { kind: M }; }, this.kindDisabled), this.draft.kind === "material") {
        G.gap(20), j("材料元素", (_a = this.draft.element) !== null && _a !== void 0 ? _a : "", [["", "全部元素"], ...official_chunk_wje6zqc2_js_1.hf.map((K) => [K, K])], (K) => { this.draft.element = K || void 0; }), G.gap(20), G.text("品质范围", 14, 20), G.gap(8);
        let M = this.draft.minRank ? official_chunk_wje6zqc2_js_1.pf.indexOf(this.draft.minRank) : 0, Z = this.draft.maxRank ? official_chunk_wje6zqc2_js_1.pf.indexOf(this.draft.maxRank) : official_chunk_wje6zqc2_js_1.pf.length - 1, B = official_chunk_wje6zqc2_js_1.pf.length - 1;
        G.block(16, (K, N) => { $.text(`下限 ${official_chunk_wje6zqc2_js_1.pf[M]}`, K, N + 8, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]); let X = `上限 ${official_chunk_wje6zqc2_js_1.pf[Z]}`; $.text(X, K + J - $.measure(X, 12), N + 8, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]); }), G.gap(8), G.block(44, (K, N) => { let X = (P) => K + 12 + (J - 24) * P / B; $.rect(K + 12, N + 22, J - 24, 1, "rgba(44,24,16,.15)"), $.rect(X(M), N + 21.5, X(Z) - X(M), 2, "rgba(193,18,31,.7)"), official_chunk_wje6zqc2_js_1.pf.forEach((P, Y) => { $.ctx.save(), $.ctx.translate(X(Y), N + 22), $.ctx.rotate(Math.PI / 4), $.rect(-3, -3, 6, 6, official_chunk_wje6zqc2_js_1.Be.paper), $.ctx.strokeStyle = Y >= M && Y <= Z ? "rgba(193,18,31,.7)" : "rgba(44,24,16,.35)", $.ctx.strokeRect(-3, -3, 6, 6), $.ctx.restore(); }), ["max", "min"].forEach((P) => { let Y = P === "min" ? M : Z, A = X(Y) + (M === Z ? P === "min" ? -6 : 6 : 0); $.ctx.beginPath(), $.ctx.arc(A, N + 22, 11, 0, Math.PI * 2), $.ctx.fillStyle = official_chunk_wje6zqc2_js_1.Be.paper, $.ctx.fill(), $.ctx.strokeStyle = official_chunk_wje6zqc2_js_1.Be.crimson, $.ctx.lineWidth = 2, $.ctx.stroke(), $.ctx.lineWidth = 1, $.hit(A - 14, N + 8, 28, 28, () => { }, { drag: (v) => { let T = Math.max(0, Math.min(B, Math.round((v - K - 12) / (J - 24) * B))); if (P === "min")
                this.draft.minRank = Math.min(T, Z) ? official_chunk_wje6zqc2_js_1.pf[Math.min(T, Z)] : void 0;
            else
                this.draft.maxRank = Math.max(T, M) === B ? void 0 : official_chunk_wje6zqc2_js_1.pf[Math.max(T, M)]; $.invalidate(); } }); }); }), G.gap(8), G.block(16, (K, N) => { $.text(official_chunk_wje6zqc2_js_1.pf[0], K, N + 8, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), $.text(official_chunk_wje6zqc2_js_1.pf[B], K + J - $.measure(official_chunk_wje6zqc2_js_1.pf[B], 12), N + 8, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]); }), G.gap(20), j("材料类型", (_b = this.draft.materialType) !== null && _b !== void 0 ? _b : "", [["", "全部材料"], ...official_chunk_h2eh160v_js_1.rd.map((K) => [K, official_chunk_h2eh160v_js_1.qd[K]])], (K) => { this.draft.materialType = K || void 0; });
    } if ((0, official_chunk_wje6zqc2_js_1.He)($, { title: "筛选物品", style: "modal", rows: [], content: G, actions: [{ label: "重置", align: "start", run: () => { this.draft = { kind: this.kindDisabled ? this.filter.kind : "all" }, $.invalidate(); } }, { label: "取消", run: this.closeFilter }, { label: "应用筛选", primary: !0, run: () => { this.filter = this.draft.kind === "material" ? { ...this.draft } : { kind: this.draft.kind }, this.closeFilter(), this.onChange(this.filter); } }] }, this.closeFilter), this.select) {
        let M = this.select, Z = new official_chunk_wje6zqc2_js_1.Ce($, $.width - 32);
        M.options.forEach(([B, K]) => Z.block(44, (N, X) => { $.text(K, N + 12, X + 22, 14, B === M.value ? official_chunk_wje6zqc2_js_1.Be.crimson : official_chunk_wje6zqc2_js_1.Be.ink), $.hit(N, X, Z.width, 44, () => { M.choose(B), this.select = void 0, $.modalScroll = 0, $.invalidate(); }); })), (0, official_chunk_wje6zqc2_js_1.He)($, { title: "选择", rows: [], content: Z }, () => { this.select = void 0, $.modalScroll = 0, $.invalidate(); });
    } }
}
exports.xb = W0;
function X0($) { return `评分 ${typeof $ === "number" && Number.isFinite($) ? Math.max(1, Math.round($)) : 0}`; }
function h0($, G, J) { var _a; let j = new official_chunk_wje6zqc2_js_1.Ce($, G), M = G - 34, Z = (M - 12) / 2, B = $.lines(J.description, M, 14), K = $.lines((_a = J.prompt) !== null && _a !== void 0 ? _a : "选择一位人物，与其交谈", M, 14), N = J.promptDetail ? $.lines(J.promptDetail, M, 14) : [], X = J.actors.map((z) => { let Q = $.lines(z.name, Z - 26, 16), H = $.lines(z.identity, Z - 26, 12), O = $.lines(z.responsibility, Z - 26, 12), W = z.status ? $.lines(z.status.label, Z - 40, 12) : [], C = z.appearance === "facility" ? 44 : 52, R = C * 1.5 + 12 + Q.length * 24 + 4 + H.length * 16 + 8 + O.length * 20 + (W.length ? 12 + W.length * 16 : 0); return { actor: z, names: Q, identities: H, responsibilities: O, status: W, sigil: C, content: R, height: Math.max(160, R + 34) }; }), P = Array.from({ length: Math.ceil(X.length / 2) }, (z, Q) => Math.max(...X.slice(Q * 2, Q * 2 + 2).map((H) => H.height))), Y = P.reduce((z, Q) => z + Q, 0) + Math.max(0, P.length - 1) * 12, A = (J.eyebrow ? 16 : 0) + 16 + B.length * 28, v = K.length * 20 + (N.length ? 4 + N.length * 20 : 0), T = Math.max(546, 58 + A + 64 + Y + v), h = T - (58 + A + 64 + Y + v); return j.block(T, (z, Q) => { $.rect(z, Q, G, T, "rgba(248,243,230,.42)"), $.ctx.strokeStyle = "rgba(44,24,16,.2)", $.ctx.strokeRect(z + 0.5, Q + 0.5, G - 1, T - 1); let H = (W, C, R, U = official_chunk_wje6zqc2_js_1.Be["ink-secondary"]) => $.text(W, z + (G - $.measure(W, R)) / 2, C, R, U), O = Q + 29; if (J.eyebrow) {
    let W = J.eyebrow;
    $.tracked(W, z + (G - $.trackedWidth(W, 12, 3.6)) / 2, O + 8, 12, 3.6, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), O += 16;
} O += 16, B.forEach((W, C) => H(W, O + 14 + C * 28, 14)), O += B.length * 28 + 32 + h / 2, X.forEach((W, C) => { let R = z + 17 + C % 2 * (Z + 12), U = Math.floor(C / 2), k = O + P.slice(0, U).reduce((E, S) => E + S + 12, 0), _ = P[U], D = W.actor; $.ctx.globalAlpha = D.disabled ? 0.5 : 1, $.ctx.save(), $.ctx.setLineDash([3, 3]), $.ctx.strokeStyle = "rgba(44,24,16,.2)", $.ctx.strokeRect(R + 0.5, k + 0.5, Z - 1, _ - 1), $.ctx.restore(); let F = k + (_ - W.content) / 2; $.text(D.sigil, R + (Z - $.measure(D.sigil, W.sigil, D.appearance === "facility" ? $.bodyFont : $.headingFont)) / 2, F + W.sigil * 0.75, W.sigil, official_chunk_wje6zqc2_js_1.Be.ink, D.appearance === "facility" ? $.bodyFont : $.headingFont), F += W.sigil * 1.5 + 12; let L = (E, S, g, w) => { E.forEach((m, Z0) => $.text(m, R + (Z - $.measure(m, S)) / 2, F + g / 2 + Z0 * g, S, w)), F += E.length * g; }; if (L(W.names, 16, 24, official_chunk_wje6zqc2_js_1.Be.ink), F += 4, L(W.identities, 12, 16, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), F += 8, L(W.responsibilities, 12, 20, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), D.status) {
    F += 12;
    let E = D.status.tone === "active" ? official_chunk_wje6zqc2_js_1.Be.ink : D.status.tone === "attention" ? official_chunk_wje6zqc2_js_1.Be.crimson : D.status.tone === "muted" ? "rgba(90,74,66,.6)" : official_chunk_wje6zqc2_js_1.Be["ink-secondary"], S = Math.max(...W.status.map((w) => $.measure(w, 12))), g = R + (Z - S - 14) / 2;
    $.ctx.beginPath(), $.ctx.arc(g + 3, F + W.status.length * 8, 3, 0, Math.PI * 2), $.ctx.fillStyle = E, $.ctx.fill(), W.status.forEach((w, m) => $.text(w, g + 14, F + 8 + m * 16, 12, E));
} $.ctx.globalAlpha = 1, $.hit(R, k, Z, _, D.disabled ? () => { } : () => J.select(D.id)); }), O = Q + T - 29 - v, K.forEach((W, C) => H(W, O + 10 + C * 20, 14, official_chunk_wje6zqc2_js_1.Be.ink)), O += K.length * 20 + 4, N.forEach((W, C) => H(W, O + 10 + C * 20, 14)); }), j; }
function p0($, G, J, j, M, Z, B = !1, K = "", N) {
    let X = new official_chunk_wje6zqc2_js_1.Ce($, G), P = G - 40, Y = J.appearance === "facility", A = Y ? 48 : 60, v = $.lines(J.name, G - 120, 18), T = $.lines(J.identity, G - 120, 14), h = $.lines(J.responsibility, Math.min(144, G - 120), 12), z = v.length * 27 + 4 + T.length * 21 + 8 + h.length * 20, Q = 33 + Math.max(A * 1.5, z);
    if (X.block(Q, (H, O) => { $.rect(H, O, G, Q, "rgba(44,24,16,.025)"), $.rect(H, O + Q - 1, G, 1, "rgba(44,24,16,.1)"), $.text(J.sigil, H + 20 + (64 - $.measure(J.sigil, A, Y ? $.bodyFont : $.headingFont)) / 2, O + (Q - 1) / 2, A, official_chunk_wje6zqc2_js_1.Be.ink, Y ? $.bodyFont : $.headingFont); let W = O + 16 + (Q - 33 - z) / 2; v.forEach((C, R) => $.text(C, H + 100, W + 13.5 + R * 27, 18)), W += v.length * 27 + 4, T.forEach((C, R) => $.text(C, H + 100, W + 10.5 + R * 21, 14, official_chunk_wje6zqc2_js_1.Be["ink-secondary"])), W += T.length * 21 + 8, h.forEach((C, R) => $.text(C, H + 100, W + 10 + R * 20, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"])); }), X.gap(28), j.forEach((H, O) => {
        var _a, _b;
        if (O)
            X.gap(16);
        let W = H.tone === "attention" ? official_chunk_wje6zqc2_js_1.Be.crimson : H.tone === "muted" ? official_chunk_wje6zqc2_js_1.Be["ink-secondary"] : official_chunk_wje6zqc2_js_1.Be.ink, C = typeof H.body === "string" ? [{ text: H.body }] : H.body, R = !!H.speaker && !Y, U = [...R ? [{ text: "“" }] : [], ...C, ...R ? [{ text: "”" }] : []], k = [[]], _ = 0;
        for (let D of U)
            for (let F of D.text) {
                if (F === `
`) {
                    k.push([]), _ = 0;
                    continue;
                }
                let L = $.measure(F, 16);
                if (_ + L > P * 0.94 && _)
                    k.push([]), _ = 0;
                k[k.length - 1].push({ char: F, x: _, color: (_a = D.color) !== null && _a !== void 0 ? _a : W, bold: (_b = D.bold) !== null && _b !== void 0 ? _b : !1 }), _ += L;
            }
        X.block(k.length * 32, (D, F) => k.forEach((L, E) => L.forEach((S) => $.text(S.char, D + 20 + S.x, F + 16 + E * 32, 16, S.color, $.bodyFont, S.bold))));
    }), K) {
        if (j.length)
            X.gap(16);
        let H = $.lines(K, P, 14);
        X.block(H.length * 28, (O, W) => H.forEach((C, R) => $.text(C, O + 20, W + 14 + R * 28, 14, official_chunk_wje6zqc2_js_1.Be.crimson)));
    }
    if (N === null || N === void 0 ? void 0 : N.height)
        X.gap(20), X.block(N.height, (H, O) => N.paint(H + 20, O));
    if (M.length)
        X.gap(12);
    if (M.forEach((H, O) => { if (O)
        X.gap(8); let W = $.lines(H.label, P - 42, 16), C = 24 + W.length * 24, R = B || H.disabled; X.block(C, (U, k) => { let _ = $.ctx; if (_.save(), R)
        _.globalAlpha *= 0.5; $.rect(U + 20, k, P, C, "rgba(44,24,16,.025)"), $.rect(U + 20, k, 2, C, "rgba(44,24,16,.15)"); let D = H.tone === "primary" ? official_chunk_wje6zqc2_js_1.Be.crimson : H.tone === "muted" ? official_chunk_wje6zqc2_js_1.Be["ink-secondary"] : official_chunk_wje6zqc2_js_1.Be.ink; if (W.forEach((F, L) => $.text(F, U + 42, k + 24 + L * 24, 16, D)), _.restore(), !R)
        $.hit(U + 20, k, P, C, () => Z(H.id)); }); }), X.gap(28), X.height < 544)
        X.gap(544 - X.height);
    return X;
}
function M0($) { let G = $(), J = 0; return () => { let j = $(); if (Number.isFinite(j))
    J += Math.max(0, j - G), G = j; return J; }; }
var l = globalThis.performance, c0 = M0(typeof (l === null || l === void 0 ? void 0 : l.now) === "function" ? () => l.now() : () => Date.now());
exports.zb = c0;
var s = { 凡品: 58, 灵品: 130, 玄品: 259, 真品: 504, 地品: 936, 天品: 1728, 仙品: 3096, 神品: 5472 }, a = { 凡品: 14, 灵品: 22, 玄品: 34, 真品: 51, 地品: 76, 天品: 111, 仙品: 160, 神品: 228 }, j0 = { ...official_chunk_h2eh160v_js_1.$c };
function b($, G, J) { return Math.max(G, Math.min(J, $)); }
function H0($) { var _a; return ((_a = $ === null || $ === void 0 ? void 0 : $.spec) === null || _a === void 0 ? void 0 : _a.kind) === "pill"; }
function K0($, G) { var _a; let J = (_a = $.payload) === null || _a === void 0 ? void 0 : _a[G]; return typeof J === "number" && Number.isFinite(J) ? J : void 0; }
function q0($) { var _a, _b, _c, _d; switch ($.status) {
    case "cultivation_boost": return (0, official_chunk_h2eh160v_js_1.Yc)($) * 56;
    case "breakthrough_focus": return (0, official_chunk_h2eh160v_js_1.ed)($) * 420;
    case "protect_meridians": return (0, official_chunk_h2eh160v_js_1.fd)($) * 80;
    case "clear_mind": return Math.max(1, (_a = $.usesRemaining) !== null && _a !== void 0 ? _a : 1) * 18;
    default: {
        let G = Math.max(1, (_b = $.stacks) !== null && _b !== void 0 ? _b : 1), J = Math.max(1, (_c = $.usesRemaining) !== null && _c !== void 0 ? _c : 1), j = Object.keys((_d = $.payload) !== null && _d !== void 0 ? _d : {}).reduce((M, Z) => { var _a; return M + Math.abs((_a = K0($, Z)) !== null && _a !== void 0 ? _a : 0); }, 0);
        return Math.min(36, G * J * 8 + j * 10);
    }
} }
function B0($) { switch ($.type) {
    case "restore_resource": return $.mode === "percent" ? $.value * 100 : Math.min(80, $.value / 20);
    case "change_gauge": return $.delta < 0 ? Math.abs($.delta) * 1.2 : 0;
    case "advance_track": return $.value * 0.85;
    case "gain_beast_cultivation": return Math.sqrt($.value) * 1.8;
    case "gain_progress": return $.target === "comprehension_insight" ? $.value * 2.2 : Math.sqrt(Math.max(0, $.value)) * 1.8;
    case "increase_lifespan": return $.value * 0.45;
    case "add_status": return q0($);
    case "remove_status": return $.removeAll ? 36 : 24;
} }
function C0($) { return $.operations.reduce((G, J) => G + B0(J), 0); }
function O0($) { if ($.source !== "formula")
    return 1; switch ($.fitBand) {
    case "aligned": return 1 + b($.fitScore, 0, 1) * 0.03;
    case "degraded": return 0.92;
    case "poor": return 0.82;
} }
function R0($) { if (!$)
    return 1; let G = b($.synergyScore, 0, 1) * 0.1, J = b($.conflictScore, 0, 1) * 0.16; return 1 + G - J; }
function N0($) { let G = $.appearance ? j0[$.appearance] : 1, J = 1 + b(($.stability - 60) / 100, -0.12, 0.16), j = 1 - b(Math.max(0, $.toxicityRating) * 0.0018, 0, 0.18); return G * J * j * R0($.batch) * O0($); }
function $0($) { var _a, _b, _c; if (!H0($))
    return null; let G = (_a = $.quality) !== null && _a !== void 0 ? _a : "凡品", J = (_b = s[G]) !== null && _b !== void 0 ? _b : s.凡品, j = (_c = a[G]) !== null && _c !== void 0 ? _c : a.凡品, M = C0($.spec), Z = b(0.82 + M / j * 0.18, 0.75, 1.35), B = N0($.spec.alchemyMeta); return Math.round(b(J * Z * B, 1, 9999)); }
function G1($, G) { var _a, _b, _c, _d; if ($ === "seed.v1")
    return `seed.v1:${JSON.stringify(official_chunk_h2eh160v_js_1.ud.parse(G).seedSpec)}`; if ($ === "equipment.v6")
    return null; if ($ === "consumable.v1") {
    let Z = official_chunk_h2eh160v_js_1.nd.parse(G), B = Z.spec;
    if (B.kind !== "pill")
        return `consumable.v2:${JSON.stringify([Z.name, Z.type, Z.quality, (0, official_chunk_h2eh160v_js_1.Gc)(B)])}`;
    let K = { kind: B.kind, family: B.family, operations: B.operations, consumeRules: B.consumeRules, ...B.alchemyMeta.version === 4 ? { protocol: "pill:v4" } : {}, appearance: (_a = B.alchemyMeta.appearance) !== null && _a !== void 0 ? _a : null, breakthroughTargetRealm: (_b = B.alchemyMeta.breakthroughTargetRealm) !== null && _b !== void 0 ? _b : null, breakthroughLabel: (_c = B.alchemyMeta.breakthroughLabel) !== null && _c !== void 0 ? _c : null, recycleScore: $0(Z) };
    return `consumable.v3:${JSON.stringify([Z.name, Z.type, Z.quality, Z.score, (0, official_chunk_h2eh160v_js_1.Gc)(K)])}`;
} if ($ !== "material.v1")
    return `definition.v1:${$}`; let J = official_chunk_h2eh160v_js_1.td.parse(G), j = new TextEncoder; return [J.name, J.type, J.rank, (_d = J.element) !== null && _d !== void 0 ? _d : "", J.description].map((Z) => `${j.encode(Z).length}:${Z}`).join(""); }
