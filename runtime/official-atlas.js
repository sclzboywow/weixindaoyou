"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtlasAssets = exports.AtlasCamera = exports.AtlasModel = exports.AtlasPage = exports.AtlasRenderer = exports.AtlasTextMap = exports.AtlasToolbar = void 0;
const official_chunk_se36mgdc_js_1 = require("./official-chunk-se36mgdc.js");
const official_chunk_3zhjyktp_js_1 = require("./official-chunk-3zhjyktp.js");
const official_chunk_2mkgzpax_js_1 = require("./official-chunk-2mkgzpax.js");
var u = ["wild", "dungeon", "market", "sect", "landmark"];
function H(M) { var _a; if ("sect_id" in M)
    return "sect"; if (M.wild_encounter_id)
    return "wild"; if (M.dungeon_config && !("region" in M))
    return "dungeon"; if ("market_config" in M && ((_a = M.market_config) === null || _a === void 0 ? void 0 : _a.enabled))
    return "market"; return "landmark"; }
function h(M, N) { return !N.length || N.includes(H(M)); }
function c(M) { let N = new Set(M === null || M === void 0 ? void 0 : M.split(",")); return u.filter((K) => N.has(K)); }
var L2 = { SAT_TN_01: "无名古修士洞府", SAT_TN_02: "崩塌的上古宗门", SAT_LX_01: "无名荒岛", SAT_LX_02: "沉船遗迹", SAT_ZMG_01: "空间断层带", SAT_DJ_01: "无名古墓", SAT_ML_01: "法士秘密祭坛", SAT_TN_03: "废弃药园", SAT_TN_08: "青溪坡", SAT_LX_07: "礁洞妖影", SAT_DJ_02: "逆鳞祭坛", SAT_DJ_10: "碎鳞石林", SAT_DJ_03: "沉日神殿", SAT_DJ_11: "黑潮贝场", SAT_DJ_04: "劫火回廊", SAT_DJ_12: "残雷碑林", SAT_TN_04: "黄枫谷后山禁地", SAT_TN_05: "古传送阵核心井", SAT_TN_06: "古魔祭坛群", SAT_YW_01: "天星宗旧阵库", SAT_LX_03: "圣山地脉秘窟", SAT_LX_04: "六连殿地底回廊", SAT_LX_05: "内殿星辰阶", SAT_ML_02: "圣禽祭天台", SAT_DJ_05: "万年玄冰库", SAT_DJ_06: "镇魔古塔", SAT_DJ_13: "灵液暗河", SAT_DJ_07: "天机阁旧址", SAT_TN_07: "藏经阁地窖", SAT_LX_06: "偏殿玉简廊", SAT_DJ_09: "玄冰藏经窟", SAT_DJ_08: "碎空战场", WILD_TN_MINE: "废矿深处", WILD_YW_CROW: "地火旁的鸦巢", WILD_TN_MOONLAKE: "月照天池", WILD_ML_STONESEA: "长风石海", WILD_ZMG_BLACKPOOL: "黑水潭", WILD_ZMG_VINES: "幽藤密林", WILD_DJ_BANYAN: "独木成林", WILD_DJ_DARKCAVE: "不见天", WILD_KW_THUNDER: "雷云崖" };
function F2(M) { var _a; return (_a = L2[M.id]) !== null && _a !== void 0 ? _a : M.name; }
function t(M) { if (M === "market" || M === "sect" || M === "dungeon")
    return M; return "world"; }
function X2(M, N) { let K = (0, official_chunk_3zhjyktp_js_1.fb)(M.selectedNodeId), V = !!(K === null || K === void 0 ? void 0 : K.dungeon_config), $ = []; if (K === null || K === void 0 ? void 0 : K.wild_encounter_id)
    $.push({ key: "wild-explore", label: "进入野外", variant: "primary", onClick: () => N(`/game/wild?nodeId=${M.selectedNodeId}`) }); if (!M.isMainNode && V)
    $.push({ key: "enter-dungeon", label: "前往历练", variant: "secondary", onClick: () => N(`/game/dungeon?nodeId=${M.selectedNodeId}`) }); if (M.isMainNode && M.marketEnabled)
    $.unshift({ key: "enter-market", label: "进入坊市", variant: "primary", onClick: () => N(`/game/market?nodeId=${M.selectedNodeId}&layer=common`) }); return $; }
function R2(M, N, K) { if (M === N)
    return [{ key: "enter-sect", label: "进入宗门", variant: "primary", onClick: () => K("/game/sect") }]; return [{ key: "visit-sect-gate", label: "拜访山门", variant: "primary", onClick: () => K(`/game/sect/${encodeURIComponent(M)}/visit`) }]; }
var O2 = (0, official_chunk_se36mgdc_js_1.g)();
function Y2() { var _a; try {
    let M = official_chunk_2mkgzpax_js_1.Oe.getStorageSync("game-setting");
    return (_a = (typeof M === "string" ? M ? JSON.parse(M) : null : M)) !== null && _a !== void 0 ? _a : {};
}
catch (_b) {
    return {};
} }
class e {
    constructor(M, N, K) {
        this.params = {};
        this.query = "";
        this.searchAll = !1;
        this.searchOpen = !1;
        this.filterOpen = !1;
        this.moreOpen = !1;
        this.overlapIds = [];
        this.focusId = null;
        this.focusRequest = 0;
        this.mode = "atlas";
        this.error = null;
        this.player = M;
        this.changed = N;
        this.navigate = K;
    }
    enter(M) { var _a, _b; this.params = {}; for (let K of ((_a = M.split("?")[1]) !== null && _a !== void 0 ? _a : "").split("&")) {
        if (!K)
            continue;
        let V = K.indexOf("="), $ = V < 0 ? K : K.slice(0, V), P = V < 0 ? "" : K.slice(V + 1);
        this.params[decodeURIComponent($.replace(/\+/g, " "))] = decodeURIComponent(P.replace(/\+/g, " "));
    } this.query = "", this.searchAll = !1, this.dismiss(), this.moreOpen = !1, this.overlapIds = [], this.focusId = (_b = this.params.nodeId) !== null && _b !== void 0 ? _b : null, this.focusRequest = 0, this.error = null; let N = Y2(); this.mode = N.version === 1 && N.mapMode === "text" ? "text" : "atlas", this.changed(); }
    get selected() { return this.params.nodeId ? (0, official_chunk_3zhjyktp_js_1.gb)(this.params.nodeId) : void 0; }
    get region() { var _a; return (_a = (this.selected ? (0, official_chunk_se36mgdc_js_1.h)(this.selected) : void 0)) !== null && _a !== void 0 ? _a : official_chunk_se36mgdc_js_1.f.find((M) => M.id === this.params.region); }
    get availableRegion() { let M = this.region; return M && (0, official_chunk_se36mgdc_js_1.j)(M.id) ? M.id : null; }
    get unavailable() { return !!this.region && !this.availableRegion; }
    get invalid() { return !!(this.params.nodeId && !this.selected || Object.hasOwn(this.params, "region") && !official_chunk_se36mgdc_js_1.f.some((M) => M.id === this.params.region) && !(this.selected && (0, official_chunk_se36mgdc_js_1.h)(this.selected))); }
    get revealingFilteredNode() { var _a; let M = c(Object.hasOwn(this.params, "types") ? this.params.types : t((_a = this.params.intent) !== null && _a !== void 0 ? _a : null) === "world" ? null : this.params.intent); return !!this.selected && !h(this.selected, M); }
    get categories() { var _a; let M = c(Object.hasOwn(this.params, "types") ? this.params.types : t((_a = this.params.intent) !== null && _a !== void 0 ? _a : null) === "world" ? null : this.params.intent); return this.selected && !h(this.selected, M) ? [] : M; }
    get isAtlas() { return this.mode === "atlas" && this.params.guide !== "map-qingxi"; }
    get mapParams() { var _a; let M = { ...this.params }, N = c(Object.hasOwn(M, "types") ? M.types : t((_a = M.intent) !== null && _a !== void 0 ? _a : null) === "world" ? null : M.intent); if (this.selected && !h(this.selected, N))
        M.types = "all"; return M; }
    get href() { return "/game/map-v2?" + Object.entries(this.mapParams).map(([M, N]) => `${encodeURIComponent(M)}=${encodeURIComponent(N)}`).join("&"); }
    get regionLocations() { return O2.filter((M) => { var _a, _b; return ((_a = (0, official_chunk_se36mgdc_js_1.h)(M)) === null || _a === void 0 ? void 0 : _a.id) === ((_b = this.region) === null || _b === void 0 ? void 0 : _b.id); }); }
    get visibleLocations() { return this.regionLocations.filter((M) => h(M, this.categories)); }
    get results() { return O2.filter((M) => { var _a; if (!this.searchAll && !h(M, this.categories))
        return !1; if (this.query.trim())
        return M.name.includes(this.query.trim()); if (this.searchAll)
        return !0; return !this.region || ((_a = (0, official_chunk_se36mgdc_js_1.h)(M)) === null || _a === void 0 ? void 0 : _a.id) === this.region.id; }); }
    get actions() { var _a, _b, _c, _d, _e; let M = this.selected, N = (K) => this.navigate(K, this.href); return !M ? [] : ("sect_id" in M) ? R2(M.sect_id, (_d = (_c = (_b = (_a = this.player.baseline) === null || _a === void 0 ? void 0 : _a.resources.session) === null || _b === void 0 ? void 0 : _b.data.activeCultivator) === null || _c === void 0 ? void 0 : _c.sectId) !== null && _d !== void 0 ? _d : null, N) : X2({ selectedNodeId: M.id, isMainNode: "region" in M, marketEnabled: "market_config" in M && !!((_e = M.market_config) === null || _e === void 0 ? void 0 : _e.enabled) }, N); }
    dismiss() { this.searchOpen = this.filterOpen = !1, this.changed(); }
    changeRegion(M) { if (M && !official_chunk_se36mgdc_js_1.f.some((K) => K.id === M && (0, official_chunk_se36mgdc_js_1.j)(K.id)))
        return; let N = this.mapParams; if (delete N.nodeId, M)
        N.region = M;
    else
        delete N.region; this.params = N, this.searchOpen = this.filterOpen = !1, this.overlapIds = [], this.focusId = null, this.changed(); }
    select(M, N = !1) { let K = (0, official_chunk_3zhjyktp_js_1.gb)(M); if (!K)
        return; let V = (0, official_chunk_se36mgdc_js_1.h)(K); if (!V || !(0, official_chunk_se36mgdc_js_1.j)(V.id))
        return; let $ = this.mapParams; if (!h(K, this.categories))
        $.types = "all"; if ($.nodeId = M, $.region = V.id, this.params = $, this.searchOpen = this.filterOpen = !1, this.overlapIds = [], this.focusId = N ? M : null, N)
        this.focusRequest++; this.changed(); }
    closeNode() { let M = this.mapParams; if (delete M.nodeId, this.region)
        M.region = this.region.id; this.params = M, this.focusId = null, this.filterOpen = !1, this.changed(); }
    setCategories(M) { let N = this.mapParams; if (N.types = M.join(",") || "all", this.selected && !h(this.selected, M)) {
        if (delete N.nodeId, this.region)
            N.region = this.region.id;
        this.focusId = null;
    } this.params = N, this.changed(); }
    setMode(M) { this.mode = M, this.searchOpen = this.filterOpen = !1, this.moreOpen = !1, this.overlapIds = [], this.error = null; let N = Y2(); try {
        official_chunk_2mkgzpax_js_1.Oe.setStorageSync("game-setting", { version: 1, mapMode: M, imageOpacity: typeof N.imageOpacity === "number" ? Math.max(0, Math.min(1, N.imageOpacity)) : 1 });
    }
    catch (_a) { } this.changed(); }
}
exports.AtlasModel = e;
var z = 1536, G = 1024, J2 = new Map, v2 = { luanxinghai: official_chunk_se36mgdc_js_1.i.luanxinghai.LX_INNER_01, dajin: official_chunk_se36mgdc_js_1.i.dajin.DJ_CENTRAL_01, northland: official_chunk_se36mgdc_js_1.i.northland.DJ_NORTH_01 }, a = (M, N, K) => Math.max(N, Math.min(K, M));
class M2 {
    constructor() {
        this.x = z / 2;
        this.y = G / 2;
        this.zoom = 1;
        this.minZoom = 1;
        this.width = 1;
        this.height = 1;
        this.pointers = new Map;
        this.pressedAt = { x: 0, y: 0 };
        this.moved = !1;
    }
    setRegion(M, N, K) { this.remember(), this.cancel(), this.region = M, this.width = N, this.height = K, this.minZoom = Math.max(N / z, K / G), this.zoom = this.minZoom, this.x = z / 2, this.y = G / 2; let V = J2.get(M), $ = v2[M]; if (V)
        this.x = V.x, this.y = V.y, this.zoom = Math.max(this.minZoom, V.zoom);
    else if ($)
        this.x = $[0] * z, this.y = $[1] * G; this.clamp(); }
    hasMemory(M) { return J2.has(M); }
    remember() { if (this.region)
        J2.set(this.region, { x: this.x, y: this.y, zoom: this.zoom }); }
    resize(M, N) { let K = Math.abs(this.zoom - this.minZoom) < 0.001; this.width = M, this.height = N, this.minZoom = Math.max(M / z, N / G), this.zoom = K ? this.minZoom : Math.max(this.minZoom, this.zoom), this.clamp(); }
    clamp() { let M = this.width / this.zoom / 2, N = this.height / this.zoom / 2; this.x = M >= z / 2 ? z / 2 : a(this.x, M, z - M), this.y = N >= G / 2 ? G / 2 : a(this.y, N, G - N); }
    project(M) { return { x: (M.x - this.x) * this.zoom + this.width / 2, y: (M.y - this.y) * this.zoom + this.height / 2 }; }
    unproject(M) { return { x: (M.x - this.width / 2) / this.zoom + this.x, y: (M.y - this.height / 2) / this.zoom + this.y }; }
    center(M) { this.x = M.x, this.y = M.y, this.clamp(); }
    focus(M) { this.zoom = Math.max(this.zoom, this.minZoom * 2), this.center(M); }
    pan(M, N) { this.x -= M / this.zoom, this.y -= N / this.zoom, this.clamp(); }
    zoomAt(M, N) { let K = this.unproject(N); this.zoom = a(this.zoom * M, this.minZoom, Math.max(2.5, this.minZoom * 5)); let V = this.unproject(N); this.x += K.x - V.x, this.y += K.y - V.y, this.clamp(); }
    down(M, N) { if (!this.pointers.size)
        this.pressedAt = N, this.moved = !1;
    else
        this.moved = !0; this.pointers.set(M, N); }
    move(M, N) { let K = this.pointers.get(M); if (!K)
        return; let V = [...this.pointers.values()]; if (this.pointers.set(M, N), Math.hypot(N.x - this.pressedAt.x, N.y - this.pressedAt.y) > 6)
        this.moved = !0; if (this.pointers.size === 1 && this.moved)
        this.pan(N.x - K.x, N.y - K.y);
    else if (this.pointers.size === 2) {
        let $ = [...this.pointers.values()], P = Math.hypot(V[0].x - V[1].x, V[0].y - V[1].y), Z = { x: (V[0].x + V[1].x) / 2, y: (V[0].y + V[1].y) / 2 };
        if (P > 0)
            this.zoomAt(Math.hypot($[0].x - $[1].x, $[0].y - $[1].y) / P, Z);
        this.pan(($[0].x + $[1].x) / 2 - Z.x, ($[0].y + $[1].y) / 2 - Z.y);
    } }
    up(M, N = !1) { if (!this.pointers.delete(M))
        return !1; return !N && !this.moved; }
    cancel() { this.pointers.clear(), this.moved = !0; }
}
exports.AtlasCamera = M2;
var P2 = { world: { package: "atlas-world", path: "atlas-world/map.jpg", original: "/assets/maps/world-overview-v1.webp" }, tiannan: { package: "atlas-tiannan", path: "atlas-tiannan/map.jpg", original: "/assets/maps/tiannan-region-v1.webp" }, luanxinghai: { package: "atlas-luanxinghai", path: "atlas-luanxinghai/map.jpg", original: "/assets/maps/luanxinghai-region-v1.webp" }, mulan: { package: "atlas-mulan", path: "atlas-mulan/map.jpg", original: "/assets/maps/mulan-region-v1.webp" }, dajin: { package: "atlas-dajin", path: "atlas-dajin/map.jpg", original: "/assets/maps/dajin-region-v1.webp" }, nanjiang: { package: "atlas-nanjiang", path: "atlas-nanjiang/map.jpg", original: "/assets/maps/nanjiang-region-v1.webp" }, northland: { package: "atlas-northland", path: "atlas-northland/map.jpg", original: "/assets/maps/northland-region-v1.webp" } };
var s = new Map;
class N2 {
    constructor() {
        this.images = new official_chunk_3zhjyktp_js_1.lb(2);
        this.pending = new Map;
        this.generation = 0;
        (0, official_chunk_3zhjyktp_js_1.jb)(() => this.images.trim(1));
    }
    resetPending() { this.images.clear(), this.generation++; for (let M of this.pending.keys())
        s.delete(P2[M].package); this.pending.clear(); }
    load(M) { let N = this.images.get(M); if (N)
        return Promise.resolve(N); let K = this.pending.get(M); if (K)
        return K; let V = P2[M], $ = s.get(V.package); if (!$)
        $ = new Promise((Q, U) => official_chunk_2mkgzpax_js_1.Oe.loadSubpackage({ name: V.package, success: () => Q(), fail: U })), s.set(V.package, $), $.catch(() => { if (s.get(V.package) === $)
            s.delete(V.package); }); let P = this.generation, Z = !1, R, B = $.then(() => new Promise((Q, U) => { if (Z || P !== this.generation) {
        U(Error("舆图读取已取消"));
        return;
    } let j = official_chunk_2mkgzpax_js_1.Oe.createImage(); j.onload = () => { if (!Z && P === this.generation)
        this.images.set(M, j); Q(j); }, j.onerror = () => U(Error("舆图加载未成，请重试。")), j.src = GameGlobal.__remoteAssetPath(V.path); })), J = Promise.race([B, new Promise((Q, U) => { R = setTimeout(() => { if (Z = !0, s.get(V.package) === $)
            s.delete(V.package); U(Error("画卷打开超时，请重试。")); }, 120000); })]); return this.pending.set(M, J), J.finally(() => { if (clearTimeout(R), this.pending.get(M) === J)
        this.pending.delete(M); }).catch(() => { }), J; }
    get(M) { return this.images.get(M); }
}
exports.AtlasAssets = N2;
var T2 = (M, N) => !(M.x + M.width < N.x || M.y + M.height < N.y || M.x > N.x + N.width || M.y > N.y + N.height), S2 = (M, N) => N.x >= M.x && N.y >= M.y && N.x <= M.x + M.width && N.y <= M.y + M.height;
function I2(M) { if (M === "world")
    return official_chunk_se36mgdc_js_1.f.map((N) => ({ id: N.id, x: N.x * z, y: N.y * G, name: (0, official_chunk_se36mgdc_js_1.j)(N.id) ? `${N.name} ›` : `${N.name} · 未开放`, shortName: (0, official_chunk_se36mgdc_js_1.j)(N.id) ? `${N.name} ›` : `${N.name} · 未开放`, primary: !0, enabled: (0, official_chunk_se36mgdc_js_1.j)(N.id) })); return (0, official_chunk_se36mgdc_js_1.g)().flatMap((N) => { let K = official_chunk_se36mgdc_js_1.i[M][N.id]; return K ? [{ id: N.id, x: K[0] * z, y: K[1] * G, name: N.name, shortName: F2(N), category: H(N), primary: "region" in N || "sect_id" in N, enabled: !0 }] : []; }); }
function C2(M, N, K, V, $) {
    var _a, _b, _c, _d, _e, _f;
    let P = M.region === "world", Z = K.occlusions, R = [...Z], B = Math.max(4, ((_b = (_a = Z[0]) === null || _a === void 0 ? void 0 : _a.y) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = Z[0]) === null || _c === void 0 ? void 0 : _c.height) !== null && _d !== void 0 ? _d : 88) + 4), J = N.filter((X) => P || !K.categories.length || X.category && K.categories.includes(X.category)), Q = new Map, U = new Map;
    for (let X of J) {
        let F = M.project(X);
        if (F.x < -22 || F.y < -22 || F.x > M.width + 22 || F.y > M.height + 22)
            continue;
        Q.set(X.id, F);
        let W = P ? 16 : 52, C = { x: F.x - W / 2, y: F.y - W / 2, width: W, height: W };
        U.set(X.id, C), R.push(C);
    }
    let j = (X) => (X.id === K.selectedId ? 100 : 0) + (X.id === K.focusedId ? 10 : 0) + (X.primary ? 1 : 0), Y = [...J].sort((X, F) => j(F) - j(X)), q = [], O = (X, F) => !F.some((W) => T2(X, W)), I = (X, F, W, C) => ({ x: a(X, 4, Math.max(4, M.width - W - 4)), y: a(F, Math.min(B, Math.max(4, M.height - C - 4)), Math.max(4, M.height - C - 4)), width: W, height: C });
    for (let X of Y) {
        let F = Q.get(X.id);
        if (!F)
            continue;
        let W = X.id === K.selectedId, C = X.id === K.focusedId, S = W || C ? X.name : X.shortName, A = P ? X.enabled ? 24 : 18 : X.primary ? 16 : 14, i = $(S, A, P ? Math.max(60, M.width - 40) : Math.max(40, Math.min(192, M.width - 104))), n = V(i.join(`
`), A), k = { marker: X, screen: F, text: S, lines: i, fontSize: A, lineHeight: n.lineHeight, textHeight: n.height, expanded: !1, selected: W, focused: C, depth: W ? 30 : C ? 20 : 10, hits: [] }, q2 = C && X.offset ? [{ x: F.x + X.offset.x, y: F.y + X.offset.y }] : [];
        if (!P) {
            let w = U.get(X.id);
            R.splice(R.indexOf(w), 1);
            let p = Math.max(52, n.height + 28), r = p + n.width + 18, L = [...q2, ...[0, -26, 26].map((g) => ({ x: F.x - p / 2, y: F.y - p / 2 + g }))].map((g) => I(g.x, g.y, r, p)), E = L.find((g) => O(g, R));
            if (!E && (W || C))
                E = (_e = L.find((g) => O(g, Z))) !== null && _e !== void 0 ? _e : L[0];
            k.box = E !== null && E !== void 0 ? E : I(F.x - 26, F.y - 26, 52, 52), k.expanded = !!E, R.push(k.box), k.hits.push(k.box);
        }
        else {
            k.hits.push({ x: F.x - 24, y: F.y - 24, width: 48, height: 48 });
            let w = n.width + 24, p = n.height + 16, r = [...q2, { x: F.x + 12, y: F.y - p / 2 }, { x: F.x - w - 30, y: F.y - p / 2 }, { x: F.x - w / 2, y: F.y + 30 }, { x: F.x - w / 2, y: F.y - p - 30 }].map((E) => I(E.x, E.y, w, p)), L = r.find((E) => O(E, R));
            if (!L && (W || C))
                L = (_f = r.find((E) => O(E, Z))) !== null && _f !== void 0 ? _f : r[0];
            if (L)
                k.box = L, k.expanded = !0, R.push(L), k.hits.push(L);
        }
        if (k.box)
            X.offset = { x: k.box.x - F.x, y: k.box.y - F.y };
        q.push(k);
    }
    return q.sort((X, F) => N.indexOf(X.marker) - N.indexOf(F.marker));
}
function f2(M, N) { return M.filter((K) => K.hits.some((V) => S2(V, N))).map((K) => K.marker); }
var T = { wild: { name: "灵兽出没地", icon: "icon:map-wild", color: 5794122, paper: 15790821, badge: 14279366, shape: "round" }, dungeon: { name: "秘境", icon: "icon:map-dungeon", color: 6969462, paper: 15986165, badge: 14800104, shape: "diamond" }, market: { name: "坊市", icon: "icon:map-market", color: 9007161, paper: 16314589, badge: 15456428, shape: "square" }, sect: { name: "宗门", icon: "icon:map-sect", color: 4286054, paper: 15397869, badge: 13098707, shape: "hexagon" }, landmark: { name: "山川地标", icon: "icon:map-landmark", color: 5466231, paper: 15528179, badge: 13688036, shape: "arch" } };
var Q2 = (M) => "#" + M.toString(16).padStart(6, "0");
class K2 {
    constructor(M, N) {
        this.camera = new M2;
        this.assets = new N2;
        this.markers = [];
        this.placed = [];
        this.generation = 0;
        this.selectedId = null;
        this.focusId = null;
        this.focusRequest = -1;
        this.metrics = new Map;
        this.error = "";
        this.loading = !1;
        this.touchIds = new Set;
        this.surface = { start: (M) => { var _a, _b, _c; for (let N of (_b = (_a = M.changedTouches) !== null && _a !== void 0 ? _a : M.touches) !== null && _b !== void 0 ? _b : []) {
                let K = (_c = N.identifier) !== null && _c !== void 0 ? _c : 0;
                if (this.touchIds.has(K))
                    continue;
                this.touchIds.add(K), this.down(K, { x: N.clientX, y: N.clientY });
            } }, move: (M) => { var _a, _b, _c; for (let N of (_b = (_a = M.changedTouches) !== null && _a !== void 0 ? _a : M.touches) !== null && _b !== void 0 ? _b : [])
                this.move((_c = N.identifier) !== null && _c !== void 0 ? _c : 0, { x: N.clientX, y: N.clientY }); }, end: (M) => { var _a, _b; for (let N of (_a = M.changedTouches) !== null && _a !== void 0 ? _a : []) {
                let K = (_b = N.identifier) !== null && _b !== void 0 ? _b : 0;
                this.touchIds.delete(K), this.up(K, { x: N.clientX, y: N.clientY });
            } }, cancel: () => { this.touchIds.clear(), this.cancel(); } };
        this.measure = (M, N) => {
            let K = M.split(`
`), V = this.fontMetrics(N);
            return { lines: K, width: Math.max(...K.map(($) => Math.ceil(this.u.measure($, N)))), height: V.height * K.length, lineHeight: V.height };
        };
        this.wrap = (M, N, K) => {
            let V = M.replace(/ +/g, " ").split(/\r\n|\r|\n/), $ = [];
            for (let P = 0; P < V.length; P++) {
                let Z = V[P].trim();
                if (this.u.measure(Z, N) < K) {
                    $.push(Z);
                    continue;
                }
                let R = Z.split(" "), B = "", J = K;
                for (let Q = 0; Q < R.length; Q++) {
                    let U = R[Q] + " ", j = this.u.measure(U, N);
                    if (j <= J) {
                        B += U, J -= j;
                        continue;
                    }
                    if (Q === 0) {
                        let Y = U;
                        do
                            Y = Y.slice(0, -1);
                        while (Y.length && this.u.measure(Y, N) > J);
                        if (!Y)
                            throw Error("wordWrapWidth < a single character");
                        R[Q] = R[Q].slice(Y.length), B += Y;
                    }
                    V.splice(P + 1, 0, R.slice(R[Q].length ? Q : Q + 1).join(" ").trimEnd());
                    break;
                }
                $.push(B.trimEnd());
            }
            return $.join(`
`).replace(/[\s|\n]*$/g, "").split(`
`);
        };
        this.u = M;
        this.callbacks = N;
    }
    destroy() { this.generation++, this.assets.resetPending(), this.camera.remember(), this.camera.cancel(), this.touchIds.clear(), this.view = void 0, this.loading = !1, this.error = "", this.focusRequest = -1, this.selectedId = this.focusId = null; }
    async setView(M) { var _a, _b; if (this.view = M, M.blocked)
        this.camera.cancel(); if (this.error)
        return; if (this.camera.region !== M.region || !this.assets.get(M.region)) {
        let K = ++this.generation;
        this.loading = !0, this.error = "", this.u.invalidate();
        try {
            if (await this.assets.load(M.region), K !== this.generation)
                return;
            if (this.camera.region !== M.region)
                this.camera.setRegion(M.region, this.u.width, this.u.height), this.markers = I2(M.region), this.selectedId = null;
            this.loading = !1;
        }
        catch (V) {
            if (K === this.generation)
                this.loading = !1, this.error = V instanceof Error ? V.message : "舆图加载未成，请重试。", this.callbacks.error(this.error), this.u.invalidate();
            return;
        }
    } let N = this.markers.find((K) => K.id === M.selectedId); if (N && M.focusId === N.id && (this.focusId !== M.focusId || this.focusRequest !== M.focusRequest)) {
        if (this.focusRequest !== -1 || !this.camera.hasMemory(M.region))
            this.camera.focus(N);
    } if (N && (this.selectedId !== M.selectedId || M.focusId === N.id && this.focusRequest !== M.focusRequest)) {
        let K = this.camera.project(N), V = M.occlusions[0];
        if (K.x < 24 || K.y < ((_a = V === null || V === void 0 ? void 0 : V.y) !== null && _a !== void 0 ? _a : 0) + ((_b = V === null || V === void 0 ? void 0 : V.height) !== null && _b !== void 0 ? _b : 88) || K.x > this.camera.width - 24 || K.y > this.camera.height - 72)
            this.camera.center(N), K = this.camera.project(N);
        this.callbacks.position(K.x < this.camera.width / 2, K.y < this.camera.height * 0.55);
    } this.focusId = M.focusId, this.focusRequest = M.focusRequest, this.selectedId = M.selectedId, this.u.invalidate(); }
    fontMetrics(M) { let N = `${this.u.bodyFont}:${M}`, K = this.metrics.get(N); if (K)
        return K; let V = this.u.ctx; V.save(), V.font = `${M}px ${this.u.bodyFont}`, V.textBaseline = "alphabetic"; let $ = V.measureText("|MÉqgy"); V.restore(); let { actualBoundingBoxAscent: P, actualBoundingBoxDescent: Z } = $; if (!Number.isFinite(P) || !Number.isFinite(Z)) {
        let B = official_chunk_2mkgzpax_js_1.Oe.createCanvas(), J = Math.ceil($.width * 1.2), Q = J * 2, U = Math.floor(J * 1.4);
        B.width = J, B.height = Q;
        let j = B.getContext("2d");
        j.fillStyle = "#f00", j.fillRect(0, 0, J, Q), j.font = `${M}px ${this.u.bodyFont}`, j.textBaseline = "alphabetic", j.fillStyle = "#000", j.fillText("|MÉqgy", 0, U);
        let Y = j.getImageData(0, 0, J, Q).data, q = U, O = U;
        for (let I = 0; I < U; I++) {
            let X = !1;
            for (let F = 0; F < J; F++)
                if (Y[(I * J + F) * 4] !== 255) {
                    X = !0;
                    break;
                }
            if (X) {
                q = I;
                break;
            }
        }
        for (let I = Q - 1; I >= U; I--) {
            let X = !1;
            for (let F = 0; F < J; F++)
                if (Y[(I * J + F) * 4] !== 255) {
                    X = !0;
                    break;
                }
            if (X) {
                O = I + 1;
                break;
            }
        }
        P = U - q, Z = O - U;
    } let R = { ascent: P, height: P + Z }; return this.metrics.set(N, R), R; }
    paint() { let M = this.u, N = this.view, K = this.camera; if (!N)
        return; if (K.width !== M.width || K.height !== M.height)
        K.resize(M.width, M.height); M.rect(0, 0, M.width, M.height, "#eee7d8"); let V = this.assets.get(N.region); if (!V || this.loading || this.error)
        return; M.hit(0, 0, M.width, M.height, () => { }, { surface: this.surface }); let $ = K.project({ x: 0, y: 0 }); M.ctx.drawImage(V, $.x, $.y, z * K.zoom, G * K.zoom), this.placed = C2(K, this.markers, { ...N }, this.measure, this.wrap); for (let P of [...this.placed].sort((Z, R) => Z.depth - R.depth))
        this.paintMarker(P, N.region === "world"); }
    label(M, N, K, V) { let $ = this.u.ctx, P = this.fontMetrics(M.fontSize), Z = this.u.canvas.width / this.u.width; $.save(), $.font = `${M.fontSize}px ${this.u.bodyFont}`, $.textBaseline = "alphabetic", $.fillStyle = V, M.lines.forEach((R, B) => $.fillText((0, official_chunk_se36mgdc_js_1.b)(R), Math.round(N * Z) / Z, Math.round(K * Z) / Z + P.ascent + B * M.lineHeight)), $.restore(); }
    paintMarker(M, N) { let K = this.u, V = K.ctx, { box: $, screen: P, selected: Z, focused: R, marker: B } = M; if (N) {
        if (V.beginPath(), V.arc(P.x, P.y, 5, 0, Math.PI * 2), V.fillStyle = "#352f29", V.fill(), Z || R)
            V.strokeStyle = Z ? "#9d4033" : "#352f29", V.lineWidth = Z ? 2.5 : 1.5, V.stroke();
        if ($)
            K.rect($.x, $.y, $.width, $.height, R ? "#e9dfca" : "#f6efdf"), this.label(M, $.x + 12, $.y + 8, Z ? "#9d4033" : B.enabled ? "#352f29" : "#756e63");
        return;
    } if (!$ || !B.category)
        return; let J = T[B.category], Q = $.height, U = Q / 2; V.save(), V.translate($.x, $.y), V.strokeStyle = Z ? "#9d4033" : Q2(J.color), V.lineWidth = Z ? 2.5 : R ? 2 : 1.25; let j = (q) => { V.fillStyle = q, V.fill(), V.save(), V.globalAlpha = Z || R ? 1 : 0.8, V.stroke(), V.restore(); }; if (M.expanded)
        U2(V, U, 8, $.width - U, Q - 16, (Q - 16) / 2), j(R ? "#fffbf2" : Q2(J.paper)); if (V.beginPath(), J.shape === "round")
        V.arc(U, U, U - 1.5, 0, Math.PI * 2);
    else if (J.shape === "square")
        U2(V, 2, 2, Q - 4, Q - 4, 10);
    else if (J.shape === "arch")
        U2(V, 2, 2, Q - 4, Q - 4, U - 2, 7);
    else
        (J.shape === "diamond" ? [[0.5, 0.02], [0.98, 0.5], [0.5, 0.98], [0.02, 0.5]] : [[0.5, 0.02], [0.94, 0.24], [0.94, 0.76], [0.5, 0.98], [0.06, 0.76], [0.06, 0.24]]).forEach(([O, I], X) => X ? V.lineTo(O * Q, I * Q) : V.moveTo(O * Q, I * Q)), V.closePath(); j(Q2(J.badge)); let Y = J.shape === "diamond" ? 32 : 40; if (K.image(`assets/icons/map-${B.category}.webp`, U - Y / 2, U - Y / 2, Y, Y), V.restore(), M.expanded)
        this.label(M, $.x + Q + 2, $.y + (Q - M.textHeight) / 2, Z ? "#9d4033" : "#352f29"); }
    down(M, N) { var _a; if (!((_a = this.view) === null || _a === void 0 ? void 0 : _a.blocked) && !this.loading && !this.error)
        this.camera.down(M, N); }
    move(M, N) { var _a; if (!((_a = this.view) === null || _a === void 0 ? void 0 : _a.blocked))
        this.camera.move(M, N), this.u.invalidate(); }
    up(M, N, K = !1) { var _a, _b; if (!this.camera.up(M, K) || ((_a = this.view) === null || _a === void 0 ? void 0 : _a.blocked))
        return; let V = f2(this.placed, N); if (!V.length)
        this.callbacks.clear();
    else if (((_b = this.view) === null || _b === void 0 ? void 0 : _b.region) === "world") {
        let $ = V.find((P) => P.enabled);
        if ($)
            this.callbacks.region($.id);
    }
    else if (V.length > 1)
        this.callbacks.overlap(V.map(($) => $.id));
    else
        this.callbacks.node(V[0].id); }
    cancel() { this.camera.cancel(); }
}
exports.AtlasRenderer = K2;
function U2(M, N, K, V, $, P, Z = P) { M.beginPath(), M.moveTo(N + P, K), M.lineTo(N + V - P, K), M.arcTo(N + V, K, N + V, K + P, P), M.lineTo(N + V, K + $ - Z), M.arcTo(N + V, K + $, N + V - Z, K + $, Z), M.lineTo(N + Z, K + $), M.arcTo(N, K + $, N, K + $ - Z, Z), M.lineTo(N, K + P), M.arcTo(N, K, N + P, K, P), M.closePath(); }
class V2 {
    constructor(M, N, K, V) {
        this.resultsScroll = 0;
        this.dismiss = () => { this.leave(), this.m.dismiss(), this.u.modalScroll = 0; };
        this.edit = () => { var _a; (_a = this.keyboardCleanup) === null || _a === void 0 ? void 0 : _a.call(this); let M = ({ value: V }) => { this.m.query = V, this.resultsScroll = 0, this.u.invalidate(); }, N = (V) => { M(V), K(); }, K = () => { official_chunk_2mkgzpax_js_1.Oe.offKeyboardInput(M), official_chunk_2mkgzpax_js_1.Oe.offKeyboardComplete(N), this.keyboardCleanup = void 0; }; this.keyboardCleanup = K, official_chunk_2mkgzpax_js_1.Oe.onKeyboardInput(M), official_chunk_2mkgzpax_js_1.Oe.onKeyboardComplete(N), official_chunk_2mkgzpax_js_1.Oe.showKeyboard({ defaultValue: this.m.query, maxLength: -1, multiple: !1, confirmType: "search", fail: K }); };
        this.u = M;
        this.m = N;
        this.close = K;
        this.hunts = V;
    }
    leave() { var _a; (_a = this.keyboardCleanup) === null || _a === void 0 ? void 0 : _a.call(this), official_chunk_2mkgzpax_js_1.Oe.hideKeyboard({}), this.resultsScroll = 0; }
    paint() { var _a, _b; let M = this.u, N = this.m, K = M.top + 8, P = N.region ? 95 : 50, Z = (_b = (_a = N.region) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "人界总览", R = Math.min(112, M.measure(Z, 14)) + 16, B = R + 96, J = M.width - 12 - B, Q = (j, Y) => { M.roundedRect(j, K, Y, 50, "rgba(248,243,230,.95)"), M.ctx.strokeStyle = "rgba(44,24,16,.15)", M.ctx.strokeRect(j + 0.5, K + 0.5, Y - 1, 49); }; if (Q(12, P), Q(J, B), M.text("×", 31, K + 25, 20, official_chunk_2mkgzpax_js_1.Me.ink), M.hit(15, K + 3, 44, 44, this.close), N.region)
        M.rect(59, K + 15, 1, 20, "rgba(44,24,16,.15)"), M.text("←", 73, K + 25, 16, official_chunk_2mkgzpax_js_1.Me.ink), M.hit(60, K + 3, 44, 44, () => N.changeRegion()); M.clip(J + 3, K + 3, R, 44, () => M.text(Z, J + 11, K + 25, 14, official_chunk_2mkgzpax_js_1.Me.ink, M.bodyFont, !0)); let U = J + 3 + R; if (M.rect(U, K + 15, 1, 20, "rgba(44,24,16,.15)"), M.text("查找", U + 9, K + 25, 14, official_chunk_2mkgzpax_js_1.Me.ink), N.categories.length)
        M.ctx.beginPath(), M.ctx.arc(U + 40, K + 13, 3, 0, Math.PI * 2), M.ctx.fillStyle = official_chunk_2mkgzpax_js_1.Me.crimson, M.ctx.fill(); return M.hit(U + 1, K + 3, 44, 44, () => { N.moreOpen = !1, N.searchOpen = !0, N.filterOpen = !1, M.modalScroll = 0, M.invalidate(); }), M.rect(U + 45, K + 15, 1, 20, "rgba(44,24,16,.15)"), M.text("⋯", U + 59, K + 25, 20, official_chunk_2mkgzpax_js_1.Me.ink), M.hit(U + 46, K + 3, 44, 44, () => { N.dismiss(), N.moreOpen = !N.moreOpen, M.invalidate(); }), { x: 0, y: M.top - 8, width: M.width, height: 66 }; }
    paintOverlay() { let M = this.u, N = this.m; if (N.moreOpen) {
        let B = M.width - 12 - 160, J = M.top + 63;
        M.beginModal(!1), M.hit(0, 0, M.width, M.height, () => { N.moreOpen = !1, M.invalidate(); }), M.rect(B, J, 160, this.hunts ? 174 : 130, official_chunk_2mkgzpax_js_1.Me.paper), M.ctx.strokeStyle = "rgba(44,24,16,.2)", M.ctx.strokeRect(B + 0.5, J + 0.5, 159, this.hunts ? 173 : 129), M.text("显示方式", B + 13, J + 21, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]);
        for (let [Q, U, j] of [[0, "atlas", "山河画卷"], [1, "text", "文字地图"]]) {
            let Y = J + 37 + Q * 44;
            if (N.mode === U)
                M.rect(B + 5, Y, 150, 44, "rgba(44,24,16,.08)");
            if (M.text(j, B + 13, Y + 22, 14, official_chunk_2mkgzpax_js_1.Me.ink, M.bodyFont, N.mode === U), N.mode === U)
                M.text("✓", B + 129, Y + 22, 14, official_chunk_2mkgzpax_js_1.Me.ink);
            M.hit(B + 5, Y, 150, 44, () => N.setMode(U));
        }
        if (this.hunts)
            M.text("组队讨伐", B + 13, J + 147, 14, official_chunk_2mkgzpax_js_1.Me.crimson), M.hit(B + 5, J + 125, 150, 44, () => { var _a; N.dismiss(), (_a = this.hunts) === null || _a === void 0 ? void 0 : _a.call(this); });
        return;
    } if (!N.searchOpen && !N.filterOpen)
        return; let K = M.width - 32, V = new official_chunk_2mkgzpax_js_1.Ne(M, K); if (V.block(44, (B, J) => { M.roundedRect(B, J, K, 44, "rgba(255,255,255,.5)"), M.ctx.strokeStyle = "rgba(44,24,16,.25)", M.ctx.strokeRect(B + 0.5, J + 0.5, K - 1, 43), M.clip(B + 12, J, K - 24, 44, () => M.text(N.query || "输入地点名称", B + 12, J + 22, 16, N.query ? official_chunk_2mkgzpax_js_1.Me.ink : "rgba(44,24,16,.4)")), M.hit(B, J, K, 44, this.edit); }), N.availableRegion) {
        V.gap(12);
        let B = 0, J = 0, U = [{ category: null, label: "全部", icon: void 0 }, ...u.map((j) => ({ category: j, label: T[j].name, icon: T[j].icon }))].map((j) => { let Y = j.category ? N.categories.includes(j.category) : !N.categories.length, q = j.label + (Y && j.category ? " ✓" : ""), O = Math.max(44, M.measure(q, 14) + 16 + (j.icon ? 28 : 0)); if (B && B + O > K)
            B = 0, J += 48; let I = { ...j, active: Y, label: q, x: B, y: J, w: O }; return B += O + 4, I; });
        V.block(J + 44, (j, Y) => U.forEach((q) => { if (q.active)
            M.rect(j + q.x, Y + q.y, q.w, 44, "rgba(44,24,16,.1)"); if (q.icon)
            (0, official_chunk_2mkgzpax_js_1.Xe)(M, q.icon, j + q.x + 8, Y + q.y + 10, 24, 24, 24); M.text(q.label, j + q.x + 8 + (q.icon ? 28 : 0), Y + q.y + 22, 14, official_chunk_2mkgzpax_js_1.Me.ink, M.bodyFont, q.active), M.hit(j + q.x, Y + q.y, q.w, 44, () => { N.searchAll = !1, N.setCategories(q.category ? q.active ? N.categories.filter((O) => O !== q.category) : [...N.categories, q.category] : []); }); }));
    } V.block(44, (B, J) => { if (M.ctx.strokeStyle = official_chunk_2mkgzpax_js_1.Me["ink-secondary"], M.ctx.strokeRect(B + 0.5, J + 14.5, 15, 15), N.searchAll)
        M.text("✓", B + 1, J + 22, 14, official_chunk_2mkgzpax_js_1.Me.ink); M.text("搜索所有地点（忽略类型筛选）", B + 24, J + 22, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), M.hit(B, J, K, 44, () => { N.searchAll = !N.searchAll, M.invalidate(); }); }); let $ = N.results; V.block(33, (B, J) => { M.rect(B, J, K, 1, "rgba(44,24,16,.1)"); let Q = `${N.query.trim() ? "查找结果" : N.searchAll || !N.region ? "全部地点" : N.region.name} · `; M.text(Q, B, J + 17, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), M.text(String($.length), B + M.measure(Q, 12), J + 17, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"], "monospace"); }); let P = $.map((B) => Math.max(44, M.lines(B.name, K - 66, 14).length * 20 + 16 + 16)), Z = P.reduce((B, J) => B + J, 0), R = Math.min(M.height * 0.3, Z); if (this.resultsScroll = Math.min(this.resultsScroll, Math.max(0, Z - R)), V.block(R, (B, J) => { M.clip(B, J, K, R, () => { let Q = J - this.resultsScroll; $.forEach((U, j) => { var _a; let Y = T[H(U)], q = M.lines(U.name, K - 66, 14), O = P[j]; (0, official_chunk_2mkgzpax_js_1.Xe)(M, Y.icon, B + 8, Q + (O - 30) / 2, 30, 30, 30), q.forEach((I, X) => M.text(I, B + 42, Q + 18 + X * 20, 14, official_chunk_2mkgzpax_js_1.Me.ink)), M.text(`${(_a = (0, official_chunk_se36mgdc_js_1.h)(U)) === null || _a === void 0 ? void 0 : _a.name} · ${Y.name}`, B + 42, Q + 8 + q.length * 20 + 8, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), M.text("›", B + K - 16, Q + O / 2, 14, official_chunk_2mkgzpax_js_1.Me.ink), M.hit(B, Q, K, O, () => { this.leave(), M.modalScroll = 0, N.select(U.id, !0); }), Q += O; }); }), M.scrollRegion(B, J, K, R, (Q) => { this.resultsScroll = Math.max(0, Math.min(Z - R, this.resultsScroll + Q)), M.invalidate(); }); }), !$.length)
        V.gap(16), V.text("没有找到符合条件的地点，试试其他名称或类型。", 14, 20, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), V.gap(16); (0, official_chunk_2mkgzpax_js_1.Se)(M, { title: "查找地点", closeLabel: "完成", maxHeight: M.height * 0.7, rows: [], content: V, style: "drawer" }, this.dismiss); }
}
exports.AtlasToolbar = V2;
function Z2(M, N, K, V) { let $ = T[H(N)]; (0, official_chunk_2mkgzpax_js_1.Xe)(M, $.icon, K, V, 24, 24, 24), M.text($.name, K + 30, V + 12, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]); }
function $2(M, N, K, V, $) { let P = H(N), Z = P === "dungeon" && !("sect_id" in N) ? (0, official_chunk_3zhjyktp_js_1.hb)(N) : null, R = new official_chunk_2mkgzpax_js_1.Ne(M, K), B = new official_chunk_2mkgzpax_js_1.Ne(M, K), J = new official_chunk_2mkgzpax_js_1.Ne(M, K), Q = M.lines(N.name, K - M.buttonWidth("收起") - 12, 16); if (R.block(Math.max(44, Q.length * 24 + 8), (q, O) => { Q.forEach((I, X) => M.text(I, q, O + 20 + X * 24, 16, official_chunk_2mkgzpax_js_1.Me.crimson, M.bodyFont, !0)), M.button("收起", q + K - M.buttonWidth("收起"), O + 5.84, $, official_chunk_2mkgzpax_js_1.Me.ink); }), R.block(24, (q, O) => Z2(M, N, q, O)), B.gap(8), B.text(N.description, 14, 24), "realm_requirement" in N && P !== "landmark")
    B.gap(8), B.text(`${P === "wild" ? "开放境界" : "推荐境界"}：${N.realm_requirement}${Z ? ` · ${Z.difficultyLabel} · 奖励加成 +${Math.max(0, Math.round((Z.rewardBonus - 1) * 100))}%` : ""}`, 12, 16, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]); if (P === "wild") {
    let q = (0, official_chunk_se36mgdc_js_1.e)(N.id);
    if (q)
        B.gap(12), B.text("灵兽栖息地 · 偶有幼崽", 14, 20), B.gap(8), q.species.forEach((O, I) => { var _a, _b; if (I)
            B.gap(4); let X = ((_b = (_a = official_chunk_2mkgzpax_js_1.Vf.find((S) => S.id === O.speciesId)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "") + (official_chunk_2mkgzpax_js_1.Wf.has(O.speciesId) ? " · 稀有" : ""), F = `${O.minLevel}～${O.maxLevel}级`, W = M.measure(F, 12, "monospace"), C = M.lines(X, Math.max(40, K - W - 12), 14); B.block(Math.max(20, C.length * 20), (S, A) => { C.forEach((i, n) => M.text(i, S, A + 10 + n * 20, 14, official_chunk_2mkgzpax_js_1.Me["ink-secondary"])), M.text(F, S + K - W, A + 10, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"], "monospace"); }); }), B.gap(12);
} B.gap(8); let U = 0, j = 0, Y = N.tags.map((q) => { let O = M.measure(q, 12); if (U && U + O > K)
    U = 0, j += 20; let I = { text: q, x: U, y: j }; return U += O + 12, I; }); if (B.block(Y.length ? j + 16 : 0, (q, O) => Y.forEach((I) => M.text(I.text, q + I.x, O + I.y + 8, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]))), V.length) {
    J.gap(12), J.block(1, (X, F) => M.rect(X, F, K, 1, "rgba(44,24,16,.1)")), J.gap(8);
    let q = 0, O = 0, I = V.map((X) => { let F = M.buttonWidth(X.label, !0); if (q && q + F > K)
        q = 0, O += 44; let W = { action: X, x: q, y: O }; return q += F, W; });
    J.block(O + 44, (X, F) => I.forEach((W) => M.button(W.action.label, X + W.x, F + W.y + 5.84, W.action.onClick, official_chunk_2mkgzpax_js_1.Me.crimson)));
} return { head: R, body: B, footer: J, height: R.height + B.height + J.height }; }
class B2 {
    constructor(M, N) {
        this.scroll = 0;
        this.collapsed = new Set;
        this.u = M;
        this.m = N;
    }
    reset() { this.scroll = 0, this.region = void 0, this.selected = void 0, this.collapsed.clear(); }
    paint(M) { var _a, _b, _c, _d, _e; let N = this.u, K = this.m, V = (_a = K.availableRegion) !== null && _a !== void 0 ? _a : void 0; if (V !== this.region)
        this.region = V, this.scroll = 0, this.collapsed.clear(); let $ = N.width - 40, P = new official_chunk_2mkgzpax_js_1.Ne(N, $), Z; if (P.block(32, (J, Q) => { if (N.text(V ? "选择类型下的地点，展开详情与操作" : "人界 · 选择区域", J + 12, Q + 16, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), K.params.guide === "map-qingxi")
        N.markGuideAnchor("map.world", J, Q, $, 32); }), !V)
        for (let J of official_chunk_se36mgdc_js_1.f)
            P.block(48, (Q, U) => { let j = (0, official_chunk_se36mgdc_js_1.j)(J.id); N.ctx.globalAlpha = j ? 1 : 0.45, (0, official_chunk_2mkgzpax_js_1.Xe)(N, "icon:map-landmark", Q + 12, U + 9, 30, 30, 30), N.text(J.name, Q + 50, U + 24, 14, official_chunk_2mkgzpax_js_1.Me.ink); let Y = j ? "›" : "未开放"; if (N.text(Y, Q + $ - 12 - N.measure(Y, 12), U + 24, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), N.ctx.globalAlpha = 1, j) {
                let q = K.params.guide === "map-qingxi" && J.id === "tiannan" ? "map.tiannan" : void 0;
                if (N.hit(Q, U, $, 48, () => K.changeRegion(J.id), {}, q), q)
                    N.markGuideAnchor(q, Q, U, $, 48);
            } });
    else {
        if (!K.visibleLocations.length)
            P.gap(16), P.text("当前区域没有符合类型的地点，可在右上角调整筛选。", 14, 20), P.gap(16);
        let J = u.map((Q) => ({ category: Q, items: K.visibleLocations.filter((U) => H(U) === Q) })).filter((Q) => Q.items.length);
        for (let [Q, { category: U, items: j }] of J.entries()) {
            let Y = T[U];
            if (((_b = K.selected) === null || _b === void 0 ? void 0 : _b.id) !== this.selected && K.selected && H(K.selected) === U)
                this.collapsed.delete(U);
            if (P.block(48, (q, O) => { N.text(this.collapsed.has(U) ? "▸" : "▾", q + 12, O + 24, 14, official_chunk_2mkgzpax_js_1.Me.ink), (0, official_chunk_2mkgzpax_js_1.Xe)(N, Y.icon, q + 28, O + 9, 30, 30, 30), N.text(Y.name, q + 66, O + 24, 14, "#" + Y.color.toString(16).padStart(6, "0")), N.text(String(j.length), q + 74 + N.measure(Y.name, 14), O + 24, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"], "monospace"), N.hit(q, O, $, 48, () => { this.collapsed.has(U) ? this.collapsed.delete(U) : this.collapsed.add(U), N.invalidate(); }); }), !this.collapsed.has(U)) {
                for (let q of j) {
                    let O = ((_c = K.selected) === null || _c === void 0 ? void 0 : _c.id) === q.id, I = N.lines(q.name, $ - 78, 14), X = Math.max(48, I.length * 20 + 16);
                    if (O)
                        Z = P.height;
                    if (P.block(X, (F, W) => { if (O)
                        N.rect(F + 12, W, $ - 12, X, "rgba(44,24,16,.08)"); (0, official_chunk_2mkgzpax_js_1.Xe)(N, Y.icon, F + 24, W + (X - 30) / 2, 30, 30, 30), I.forEach((S, A) => N.text(S, F + 62, W + 18 + A * 20, 14, O ? official_chunk_2mkgzpax_js_1.Me.crimson : official_chunk_2mkgzpax_js_1.Me.ink, N.bodyFont, O)), N.text(O ? "▾" : "›", F + $ - 18, W + X / 2, 14, official_chunk_2mkgzpax_js_1.Me.ink); let C = K.params.guide === "map-qingxi" && q.id === "SAT_TN_08" ? "map.qingxi" : void 0; if (N.hit(F + 12, W, $ - 12, X, () => O ? K.closeNode() : K.select(q.id), {}, C), C)
                        N.markGuideAnchor(C, F + 12, W, $ - 12, X); }), O) {
                        let F = $2(N, q, $ - 62, K.actions, () => K.closeNode());
                        P.gap(8), P.block(F.height + 12, (W, C) => { N.rect(W + 28, C, 2, F.height + 12, "rgba(193,18,31,.4)"), F.head.paint(W + 46, C), F.body.paint(W + 46, C + F.head.height), F.footer.paint(W + 46, C + F.head.height + F.body.height); }), P.gap(8);
                    }
                }
                P.gap(8);
            }
            if (Q < J.length - 1)
                P.block(1, (q, O) => N.rect(q, O, $, 1, "rgba(44,24,16,.1)"));
        }
    } let R = N.height - Math.max(N.bottom, 12), B = R - M - 16; if (this.selected !== ((_d = K.selected) === null || _d === void 0 ? void 0 : _d.id) && Z !== void 0) {
        if (Z < this.scroll)
            this.scroll = Z;
        else if (Z + 48 > this.scroll + B)
            this.scroll = Z + 48 - B;
    } this.selected = (_e = K.selected) === null || _e === void 0 ? void 0 : _e.id, this.scroll = Math.max(0, Math.min(this.scroll, Math.max(0, P.height - B))), N.rect(12, M, N.width - 24, R - M, "rgba(248,243,230,.9)"), N.clip(20, M + 8, $, B, () => P.paint(20, M + 8 - this.scroll)), N.scrollRegion(12, M, N.width - 24, R - M, (J) => { this.scroll = Math.max(0, Math.min(P.height - B, this.scroll + J)), N.invalidate(); }); }
}
exports.AtlasTextMap = B2;
class _2 {
    constructor(M, N, K) {
        this.viewKey = "";
        this.bottom = !0;
        this.panelScroll = 0;
        this.active = !1;
        this.u = M;
        this.model = new e(N, () => M.invalidate(), K);
        let V = this.model;
        this.renderer = new K2(M, { region: ($) => V.changeRegion($), node: ($) => V.select($), clear: () => V.closeNode(), overlap: ($) => { V.overlapIds = $, M.modalScroll = 0, M.invalidate(); }, position: ($, P) => { this.bottom = P, M.invalidate(); }, error: ($) => { V.error = $, M.invalidate(); } }), this.toolbar = new V2(M, V, () => K("/game"), () => K("/game/hunts")), this.textMap = new B2(M, V);
    }
    enter(M) { this.active = !0, this.renderingAtlas = void 0, this.viewKey = "", this.panelId = void 0, this.panelScroll = 0, this.textMap.reset(), this.model.enter(M), this.armTimeout(); }
    leave() { this.active = !1, clearTimeout(this.timer), this.toolbar.leave(), this.renderer.destroy(); }
    armTimeout() { clearTimeout(this.timer), this.timer = setTimeout(() => { if (this.active && this.model.isAtlas && this.renderer.loading)
        this.model.error = "画卷打开超时，请重试。", this.u.invalidate(); }, 120000); }
    paint() { var _a, _b, _c; let M = this.u, N = this.model; if (M.scrollMax = 0, M.scrollTopInset = 0, M.scrollBottomInset = 0, this.renderingAtlas !== N.isAtlas)
        if (this.renderer.destroy(), this.viewKey = "", this.renderingAtlas = N.isAtlas, N.isAtlas)
            this.armTimeout();
        else
            clearTimeout(this.timer); let K = M.top + 74, V = [{ x: -8, y: M.top - 8, width: M.width + 16, height: 74 }], P = N.isAtlas && N.selected && !N.unavailable && !N.searchOpen && !N.filterOpen && !N.error && !this.renderer.loading ? $2(M, N.selected, M.width - 48, N.actions, () => N.closeNode()) : void 0, Z, R = 0; if (P) {
        let B = Math.min(M.height * 0.4, P.height + 24);
        R = Math.max(0, B - 24 - P.head.height - P.footer.height), Z = { x: 12, y: this.bottom ? M.height - Math.max(M.bottom, 12) - B : K, width: M.width - 24, height: B }, V.push({ x: Z.x - 8, y: Z.y - 8, width: Z.width + 16, height: Z.height + 16 });
    } if (N.isAtlas) {
        let B = { region: (_a = N.availableRegion) !== null && _a !== void 0 ? _a : "world", selectedId: (_c = (_b = N.selected) === null || _b === void 0 ? void 0 : _b.id) !== null && _c !== void 0 ? _c : null, focusId: N.focusId, focusRequest: N.focusRequest, categories: N.categories, occlusions: V, blocked: N.unavailable || !!N.error || N.overlapIds.length > 0 }, J = JSON.stringify(B);
        if (J !== this.viewKey)
            this.viewKey = J, this.renderer.setView(B);
        this.renderer.paint();
    }
    else
        this.renderer.cancel(), M.rect(0, 0, M.width, M.height, "#eee7d8"), this.textMap.paint(K); if (N.isAtlas && this.renderer.loading && !N.error) {
        M.rect(0, 0, M.width, M.height, "rgba(248,243,230,.9)");
        let B = "正在展开山河画卷……";
        M.text(B, (M.width - M.measure(B, 14)) / 2, M.height / 2, 14, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]);
    } if (this.toolbar.paint(), P && Z) {
        let { x: B, y: J, width: Q, height: U } = Z;
        if (this.panelId !== N.selected.id)
            this.panelId = N.selected.id, this.panelScroll = 0;
        this.panelScroll = Math.max(0, Math.min(this.panelScroll, P.body.height - R)), M.rect(B, J, Q, U, "rgba(248,243,230,.95)"), M.hit(B, J, Q, U, () => { }), P.head.paint(B + 12, J + 12);
        let j = J + 12 + P.head.height;
        M.clip(B + 12, j, Q - 24, R, () => P.body.paint(B + 12, j - this.panelScroll)), M.scrollRegion(B + 12, j, Q - 24, R, (Y) => { this.panelScroll = Math.max(0, Math.min(P.body.height - R, this.panelScroll + Y)), M.invalidate(); }), P.footer.paint(B + 12, j + R);
    } if (N.isAtlas && N.availableRegion && !N.visibleLocations.length)
        this.notice("当前区域没有符合类型的地点。", "显示全部", () => N.setCategories([]), K); if (N.invalid)
        this.notice("未找到对应地点，已显示可用舆图。", "返回上层", () => N.changeRegion(), K); if (N.isAtlas && N.revealingFilteredNode) {
        let J = M.measure("已显示全部，以定位该地点。", 14) + 16;
        M.rect(12, K, J, 36, "rgba(248,243,230,.95)"), M.text("已显示全部，以定位该地点。", 20, K + 18, 14, official_chunk_2mkgzpax_js_1.Me.ink), M.hit(12, K, J, 36, () => { });
    } if (N.isAtlas && N.error) {
        M.rect(0, 0, M.width, M.height, "rgba(248,243,230,.95)"), M.hit(0, 0, M.width, M.height, () => { }), M.lines(N.error, M.width - 48, 16).forEach((j, Y) => M.text(j, (M.width - M.measure(j, 16)) / 2, M.height / 2 - 24 + Y * 24, 16, official_chunk_2mkgzpax_js_1.Me.ink));
        let J = ["重新展开", "使用文字地图"], Q = J.reduce((j, Y) => j + M.buttonWidth(Y), 16), U = (M.width - Q) / 2;
        M.button(J[0], U, M.height / 2 + 16, () => { N.error = null, this.renderer.destroy(), this.viewKey = "", this.armTimeout(), M.invalidate(); }), M.button(J[1], U + M.buttonWidth(J[0]) + 16, M.height / 2 + 16, () => N.setMode("text"));
    } }
    notice(M, N, K, V) { let $ = this.u, P = $.lines(M, $.width - 48, 14), Z = 24 + P.length * 24 + 32.32; $.rect(12, V, $.width - 24, Z, "rgba(248,243,230,.95)"), $.hit(12, V, $.width - 24, Z, () => { }), P.forEach((R, B) => $.text(R, 24, V + 24 + B * 24, 14, official_chunk_2mkgzpax_js_1.Me.ink)), $.button(N, 24, V + 12 + P.length * 24, K); }
    paintOverlay() { let M = this.u, N = this.model; if (N.isAtlas && N.overlapIds.length) {
        let K = new official_chunk_2mkgzpax_js_1.Ne(M, M.width - 32);
        for (let V of N.overlapIds) {
            let $ = (0, official_chunk_3zhjyktp_js_1.gb)(V);
            if (!$)
                continue;
            K.block(69, (P, Z) => { M.text($.name, P, Z + 22, 14, official_chunk_2mkgzpax_js_1.Me.ink), Z2(M, $, P, Z + 36), M.line(P, Z + 68, K.width, "rgba(44,24,16,.1)"), M.hit(P, Z, K.width, 69, () => { M.modalScroll = 0, N.select(V); }); });
        }
        (0, official_chunk_2mkgzpax_js_1.Se)(M, { title: "选择地点", rows: [], content: K, style: "drawer" }, () => { N.overlapIds = [], M.invalidate(); });
    } if (N.unavailable && !N.searchOpen && (!N.isAtlas || !N.error)) {
        let K = new official_chunk_2mkgzpax_js_1.Ne(M, M.width - 32);
        K.text("此区域尚未开放。", 14, 28), (0, official_chunk_2mkgzpax_js_1.Se)(M, { title: `${N.region.name}舆图`, rows: [], content: K, style: "drawer", footer: { height: 32.32 + Math.max(M.bottom, 12) - 17, paint: (V, $) => { M.line(0, $ - 13, M.width, "rgba(44,24,16,.15)"), M.button("返回上层", V - 1, $, () => N.changeRegion(), official_chunk_2mkgzpax_js_1.Me.ink); } } }, () => N.changeRegion());
    } this.toolbar.paintOverlay(); }
}
exports.AtlasPage = _2;
