"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtlasAssets = exports.AtlasCamera = exports.AtlasModel = exports.AtlasPage = exports.AtlasRenderer = exports.AtlasTextMap = exports.AtlasToolbar = void 0;
const official_chunk_rz18xh6b_js_1 = require("./official-chunk-rz18xh6b.js");
const official_chunk_21q7yjsr_js_1 = require("./official-chunk-21q7yjsr.js");
const official_chunk_wje6zqc2_js_1 = require("./official-chunk-wje6zqc2.js");
var r = ["wild", "dungeon", "market", "sect", "landmark"];
function H(M) { var _a; if ("sect_id" in M)
    return "sect"; if (M.wild_encounter_id)
    return "wild"; if (M.dungeon_config && !("region" in M))
    return "dungeon"; if ("market_config" in M && ((_a = M.market_config) === null || _a === void 0 ? void 0 : _a.enabled))
    return "market"; return "landmark"; }
function n(M, N) { return !N.length || N.includes(H(M)); }
function y(M) { let N = new Set(M === null || M === void 0 ? void 0 : M.split(",")); return r.filter((K) => N.has(K)); }
var H2 = { SAT_TN_01: "无名古修士洞府", SAT_TN_02: "崩塌的上古宗门", SAT_LX_01: "无名荒岛", SAT_LX_02: "沉船遗迹", SAT_ZMG_01: "空间断层带", SAT_DJ_01: "无名古墓", SAT_ML_01: "法士秘密祭坛", SAT_TN_03: "废弃药园", SAT_TN_08: "青溪坡", SAT_LX_07: "礁洞妖影", SAT_DJ_02: "逆鳞祭坛", SAT_DJ_10: "碎鳞石林", SAT_DJ_03: "沉日神殿", SAT_DJ_11: "黑潮贝场", SAT_DJ_04: "劫火回廊", SAT_DJ_12: "残雷碑林", SAT_TN_04: "黄枫谷后山禁地", SAT_TN_05: "古传送阵核心井", SAT_TN_06: "古魔祭坛群", SAT_YW_01: "天星宗旧阵库", SAT_LX_03: "圣山地脉秘窟", SAT_LX_04: "六连殿地底回廊", SAT_LX_05: "内殿星辰阶", SAT_ML_02: "圣禽祭天台", SAT_DJ_05: "万年玄冰库", SAT_DJ_06: "镇魔古塔", SAT_DJ_13: "灵液暗河", SAT_DJ_07: "天机阁旧址", SAT_TN_07: "藏经阁地窖", SAT_LX_06: "偏殿玉简廊", SAT_DJ_09: "玄冰藏经窟", SAT_DJ_08: "碎空战场", WILD_TN_MINE: "废矿深处", WILD_YW_CROW: "地火旁的鸦巢", WILD_TN_MOONLAKE: "月照天池", WILD_ML_STONESEA: "长风石海", WILD_ZMG_BLACKPOOL: "黑水潭", WILD_ZMG_VINES: "幽藤密林", WILD_DJ_BANYAN: "独木成林", WILD_DJ_DARKCAVE: "不见天", WILD_KW_THUNDER: "雷云崖" };
function j2(M) { var _a; return (_a = H2[M.id]) !== null && _a !== void 0 ? _a : M.name; }
function i(M) { if (M === "market" || M === "sect" || M === "dungeon")
    return M; return "world"; }
function R2(M, N) { let K = (0, official_chunk_21q7yjsr_js_1.bb)(M.selectedNodeId), V = !!(K === null || K === void 0 ? void 0 : K.dungeon_config), $ = []; if (K === null || K === void 0 ? void 0 : K.wild_encounter_id)
    $.push({ key: "wild-explore", label: "进入野外", variant: "primary", onClick: () => N(`/game/wild?nodeId=${M.selectedNodeId}`) }); if (!M.isMainNode && V)
    $.push({ key: "enter-dungeon", label: "前往历练", variant: "secondary", onClick: () => N(`/game/dungeon?nodeId=${M.selectedNodeId}`) }); if (M.isMainNode && M.marketEnabled)
    $.unshift({ key: "enter-market", label: "进入坊市", variant: "primary", onClick: () => N(`/game/market?nodeId=${M.selectedNodeId}&layer=common`) }); return $; }
function X2(M, N, K) { if (M === N)
    return [{ key: "enter-sect", label: "进入宗门", variant: "primary", onClick: () => K("/game/sect") }]; return [{ key: "visit-sect-gate", label: "拜访山门", variant: "primary", onClick: () => K(`/game/sect/${encodeURIComponent(M)}/visit`) }]; }
var O2 = (0, official_chunk_rz18xh6b_js_1.d)();
function Y2() { var _a; try {
    let M = official_chunk_wje6zqc2_js_1.De.getStorageSync("game-setting");
    return (_a = (typeof M === "string" ? M ? JSON.parse(M) : null : M)) !== null && _a !== void 0 ? _a : {};
}
catch (_b) {
    return {};
} }
class t {
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
        let V = K.indexOf("="), $ = V < 0 ? K : K.slice(0, V), J = V < 0 ? "" : K.slice(V + 1);
        this.params[decodeURIComponent($.replace(/\+/g, " "))] = decodeURIComponent(J.replace(/\+/g, " "));
    } this.query = "", this.searchAll = !1, this.dismiss(), this.moreOpen = !1, this.overlapIds = [], this.focusId = (_b = this.params.nodeId) !== null && _b !== void 0 ? _b : null, this.focusRequest = 0, this.error = null; let N = Y2(); this.mode = N.version === 1 && N.mapMode === "text" ? "text" : "atlas", this.changed(); }
    get selected() { return this.params.nodeId ? (0, official_chunk_21q7yjsr_js_1.cb)(this.params.nodeId) : void 0; }
    get region() { var _a; return (_a = (this.selected ? (0, official_chunk_rz18xh6b_js_1.e)(this.selected) : void 0)) !== null && _a !== void 0 ? _a : official_chunk_rz18xh6b_js_1.c.find((M) => M.id === this.params.region); }
    get availableRegion() { let M = this.region; return M && (0, official_chunk_rz18xh6b_js_1.g)(M.id) ? M.id : null; }
    get unavailable() { return !!this.region && !this.availableRegion; }
    get invalid() { return !!(this.params.nodeId && !this.selected || Object.hasOwn(this.params, "region") && !official_chunk_rz18xh6b_js_1.c.some((M) => M.id === this.params.region) && !(this.selected && (0, official_chunk_rz18xh6b_js_1.e)(this.selected))); }
    get revealingFilteredNode() { var _a; let M = y(Object.hasOwn(this.params, "types") ? this.params.types : i((_a = this.params.intent) !== null && _a !== void 0 ? _a : null) === "world" ? null : this.params.intent); return !!this.selected && !n(this.selected, M); }
    get categories() { var _a; let M = y(Object.hasOwn(this.params, "types") ? this.params.types : i((_a = this.params.intent) !== null && _a !== void 0 ? _a : null) === "world" ? null : this.params.intent); return this.selected && !n(this.selected, M) ? [] : M; }
    get isAtlas() { return this.mode === "atlas" && this.params.guide !== "map-qingxi"; }
    get mapParams() { var _a; let M = { ...this.params }, N = y(Object.hasOwn(M, "types") ? M.types : i((_a = M.intent) !== null && _a !== void 0 ? _a : null) === "world" ? null : M.intent); if (this.selected && !n(this.selected, N))
        M.types = "all"; return M; }
    get href() { return "/game/map-v2?" + Object.entries(this.mapParams).map(([M, N]) => `${encodeURIComponent(M)}=${encodeURIComponent(N)}`).join("&"); }
    get regionLocations() { return O2.filter((M) => { var _a, _b; return ((_a = (0, official_chunk_rz18xh6b_js_1.e)(M)) === null || _a === void 0 ? void 0 : _a.id) === ((_b = this.region) === null || _b === void 0 ? void 0 : _b.id); }); }
    get visibleLocations() { return this.regionLocations.filter((M) => n(M, this.categories)); }
    get results() { return O2.filter((M) => { var _a; if (!this.searchAll && !n(M, this.categories))
        return !1; if (this.query.trim())
        return M.name.includes(this.query.trim()); if (this.searchAll)
        return !0; return !this.region || ((_a = (0, official_chunk_rz18xh6b_js_1.e)(M)) === null || _a === void 0 ? void 0 : _a.id) === this.region.id; }); }
    get actions() { var _a, _b, _c, _d, _e; let M = this.selected, N = (K) => this.navigate(K, this.href); return !M ? [] : ("sect_id" in M) ? X2(M.sect_id, (_d = (_c = (_b = (_a = this.player.baseline) === null || _a === void 0 ? void 0 : _a.resources.session) === null || _b === void 0 ? void 0 : _b.data.activeCultivator) === null || _c === void 0 ? void 0 : _c.sectId) !== null && _d !== void 0 ? _d : null, N) : R2({ selectedNodeId: M.id, isMainNode: "region" in M, marketEnabled: "market_config" in M && !!((_e = M.market_config) === null || _e === void 0 ? void 0 : _e.enabled) }, N); }
    dismiss() { this.searchOpen = this.filterOpen = !1, this.changed(); }
    changeRegion(M) { if (M && !official_chunk_rz18xh6b_js_1.c.some((K) => K.id === M && (0, official_chunk_rz18xh6b_js_1.g)(K.id)))
        return; let N = this.mapParams; if (delete N.nodeId, M)
        N.region = M;
    else
        delete N.region; this.params = N, this.searchOpen = this.filterOpen = !1, this.overlapIds = [], this.focusId = null, this.changed(); }
    select(M, N = !1) { let K = (0, official_chunk_21q7yjsr_js_1.cb)(M); if (!K)
        return; let V = (0, official_chunk_rz18xh6b_js_1.e)(K); if (!V || !(0, official_chunk_rz18xh6b_js_1.g)(V.id))
        return; let $ = this.mapParams; if (!n(K, this.categories))
        $.types = "all"; if ($.nodeId = M, $.region = V.id, this.params = $, this.searchOpen = this.filterOpen = !1, this.overlapIds = [], this.focusId = N ? M : null, N)
        this.focusRequest++; this.changed(); }
    closeNode() { let M = this.mapParams; if (delete M.nodeId, this.region)
        M.region = this.region.id; this.params = M, this.focusId = null, this.filterOpen = !1, this.changed(); }
    setCategories(M) { let N = this.mapParams; if (N.types = M.join(",") || "all", this.selected && !n(this.selected, M)) {
        if (delete N.nodeId, this.region)
            N.region = this.region.id;
        this.focusId = null;
    } this.params = N, this.changed(); }
    setMode(M) { this.mode = M, this.searchOpen = this.filterOpen = !1, this.moreOpen = !1, this.overlapIds = [], this.error = null; let N = Y2(); try {
        official_chunk_wje6zqc2_js_1.De.setStorageSync("game-setting", { version: 1, mapMode: M, imageOpacity: typeof N.imageOpacity === "number" ? Math.max(0, Math.min(1, N.imageOpacity)) : 1 });
    }
    catch (_a) { } this.changed(); }
}
exports.AtlasModel = t;
var z = 1536, G = 1024, B2 = new Map, _2 = { luanxinghai: official_chunk_rz18xh6b_js_1.f.luanxinghai.LX_INNER_01, dajin: official_chunk_rz18xh6b_js_1.f.dajin.DJ_CENTRAL_01, northland: official_chunk_rz18xh6b_js_1.f.northland.DJ_NORTH_01 }, w = (M, N, K) => Math.max(N, Math.min(K, M));
class o {
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
    setRegion(M, N, K) { this.remember(), this.cancel(), this.region = M, this.width = N, this.height = K, this.minZoom = Math.max(N / z, K / G), this.zoom = this.minZoom, this.x = z / 2, this.y = G / 2; let V = B2.get(M), $ = _2[M]; if (V)
        this.x = V.x, this.y = V.y, this.zoom = Math.max(this.minZoom, V.zoom);
    else if ($)
        this.x = $[0] * z, this.y = $[1] * G; this.clamp(); }
    hasMemory(M) { return B2.has(M); }
    remember() { if (this.region)
        B2.set(this.region, { x: this.x, y: this.y, zoom: this.zoom }); }
    resize(M, N) { let K = Math.abs(this.zoom - this.minZoom) < 0.001; this.width = M, this.height = N, this.minZoom = Math.max(M / z, N / G), this.zoom = K ? this.minZoom : Math.max(this.minZoom, this.zoom), this.clamp(); }
    clamp() { let M = this.width / this.zoom / 2, N = this.height / this.zoom / 2; this.x = M >= z / 2 ? z / 2 : w(this.x, M, z - M), this.y = N >= G / 2 ? G / 2 : w(this.y, N, G - N); }
    project(M) { return { x: (M.x - this.x) * this.zoom + this.width / 2, y: (M.y - this.y) * this.zoom + this.height / 2 }; }
    unproject(M) { return { x: (M.x - this.width / 2) / this.zoom + this.x, y: (M.y - this.height / 2) / this.zoom + this.y }; }
    center(M) { this.x = M.x, this.y = M.y, this.clamp(); }
    focus(M) { this.zoom = Math.max(this.zoom, this.minZoom * 2), this.center(M); }
    pan(M, N) { this.x -= M / this.zoom, this.y -= N / this.zoom, this.clamp(); }
    zoomAt(M, N) { let K = this.unproject(N); this.zoom = w(this.zoom * M, this.minZoom, Math.max(2.5, this.minZoom * 5)); let V = this.unproject(N); this.x += K.x - V.x, this.y += K.y - V.y, this.clamp(); }
    down(M, N) { if (!this.pointers.size)
        this.pressedAt = N, this.moved = !1;
    else
        this.moved = !0; this.pointers.set(M, N); }
    move(M, N) { let K = this.pointers.get(M); if (!K)
        return; let V = [...this.pointers.values()]; if (this.pointers.set(M, N), Math.hypot(N.x - this.pressedAt.x, N.y - this.pressedAt.y) > 6)
        this.moved = !0; if (this.pointers.size === 1 && this.moved)
        this.pan(N.x - K.x, N.y - K.y);
    else if (this.pointers.size === 2) {
        let $ = [...this.pointers.values()], J = Math.hypot(V[0].x - V[1].x, V[0].y - V[1].y), Q = { x: (V[0].x + V[1].x) / 2, y: (V[0].y + V[1].y) / 2 };
        if (J > 0)
            this.zoomAt(Math.hypot($[0].x - $[1].x, $[0].y - $[1].y) / J, Q);
        this.pan(($[0].x + $[1].x) / 2 - Q.x, ($[0].y + $[1].y) / 2 - Q.y);
    } }
    up(M, N = !1) { if (!this.pointers.delete(M))
        return !1; return !N && !this.moved; }
    cancel() { this.pointers.clear(), this.moved = !0; }
}
exports.AtlasCamera = o;
var P2 = { world: { package: "atlas-world", path: "atlas-world/map.jpg", original: "/assets/maps/world-overview-v1.webp" }, tiannan: { package: "atlas-tiannan", path: "atlas-tiannan/map.jpg", original: "/assets/maps/tiannan-region-v1.webp" }, luanxinghai: { package: "atlas-luanxinghai", path: "atlas-luanxinghai/map.jpg", original: "/assets/maps/luanxinghai-region-v1.webp" }, mulan: { package: "atlas-mulan", path: "atlas-mulan/map.jpg", original: "/assets/maps/mulan-region-v1.webp" }, dajin: { package: "atlas-dajin", path: "atlas-dajin/map.jpg", original: "/assets/maps/dajin-region-v1.webp" }, nanjiang: { package: "atlas-nanjiang", path: "atlas-nanjiang/map.jpg", original: "/assets/maps/nanjiang-region-v1.webp" }, northland: { package: "atlas-northland", path: "atlas-northland/map.jpg", original: "/assets/maps/northland-region-v1.webp" } };
var g = new Map;
class e {
    constructor() {
        this.images = new official_chunk_21q7yjsr_js_1.hb(2);
        this.pending = new Map;
        this.generation = 0;
        (0, official_chunk_21q7yjsr_js_1.fb)(() => this.images.trim(1));
    }
    resetPending() { this.images.clear(), this.generation++; for (let M of this.pending.keys())
        g.delete(P2[M].package); this.pending.clear(); }
    load(M) { let N = this.images.get(M); if (N)
        return Promise.resolve(N); let K = this.pending.get(M); if (K)
        return K; let V = P2[M], $ = g.get(V.package); if (!$)
        $ = new Promise((U, Z) => official_chunk_wje6zqc2_js_1.De.loadSubpackage({ name: V.package, success: () => U(), fail: Z })), g.set(V.package, $), $.catch(() => { if (g.get(V.package) === $)
            g.delete(V.package); }); let J = this.generation, Q = !1, X, B = $.then(() => new Promise((U, Z) => { if (Q || J !== this.generation) {
        Z(Error("舆图读取已取消"));
        return;
    } let F = official_chunk_wje6zqc2_js_1.De.createImage(); F.onload = () => { if (!Q && J === this.generation)
        this.images.set(M, F); U(F); }, F.onerror = () => Z(Error("舆图加载未成，请重试。")), F.src = GameGlobal.__remoteAssetPath(V.path); })), P = Promise.race([B, new Promise((U, Z) => { X = setTimeout(() => { if (Q = !0, g.get(V.package) === $)
            g.delete(V.package); Z(Error("画卷打开超时，请重试。")); }, 120000); })]); return this.pending.set(M, P), P.finally(() => { if (clearTimeout(X), this.pending.get(M) === P)
        this.pending.delete(M); }).catch(() => { }), P; }
    get(M) { return this.images.get(M); }
}
exports.AtlasAssets = e;
var L2 = (M, N) => !(M.x + M.width < N.x || M.y + M.height < N.y || M.x > N.x + N.width || M.y > N.y + N.height), v2 = (M, N) => N.x >= M.x && N.y >= M.y && N.x <= M.x + M.width && N.y <= M.y + M.height;
function I2(M) { if (M === "world")
    return official_chunk_rz18xh6b_js_1.c.map((N) => ({ id: N.id, x: N.x * z, y: N.y * G, name: (0, official_chunk_rz18xh6b_js_1.g)(N.id) ? `${N.name} ›` : `${N.name} · 未开放`, shortName: (0, official_chunk_rz18xh6b_js_1.g)(N.id) ? `${N.name} ›` : `${N.name} · 未开放`, primary: !0, enabled: (0, official_chunk_rz18xh6b_js_1.g)(N.id) })); return (0, official_chunk_rz18xh6b_js_1.d)().flatMap((N) => { let K = official_chunk_rz18xh6b_js_1.f[M][N.id]; return K ? [{ id: N.id, x: K[0] * z, y: K[1] * G, name: N.name, shortName: j2(N), category: H(N), primary: "region" in N || "sect_id" in N, enabled: !0 }] : []; }); }
function f2(M, N, K, V, $) {
    var _a, _b, _c, _d, _e, _f;
    let J = M.region === "world", Q = K.occlusions, X = [...Q], B = Math.max(4, ((_b = (_a = Q[0]) === null || _a === void 0 ? void 0 : _a.y) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = Q[0]) === null || _c === void 0 ? void 0 : _c.height) !== null && _d !== void 0 ? _d : 88) + 4), P = N.filter((R) => J || !K.categories.length || R.category && K.categories.includes(R.category)), U = new Map, Z = new Map;
    for (let R of P) {
        let q = M.project(R);
        if (q.x < -22 || q.y < -22 || q.x > M.width + 22 || q.y > M.height + 22)
            continue;
        U.set(R.id, q);
        let I = J ? 16 : 52, f = { x: q.x - I / 2, y: q.y - I / 2, width: I, height: I };
        Z.set(R.id, f), X.push(f);
    }
    let F = (R) => (R.id === K.selectedId ? 100 : 0) + (R.id === K.focusedId ? 10 : 0) + (R.primary ? 1 : 0), Y = [...P].sort((R, q) => F(q) - F(R)), j = [], O = (R, q) => !q.some((I) => L2(R, I)), W = (R, q, I, f) => ({ x: w(R, 4, Math.max(4, M.width - I - 4)), y: w(q, Math.min(B, Math.max(4, M.height - f - 4)), Math.max(4, M.height - f - 4)), width: I, height: f });
    for (let R of Y) {
        let q = U.get(R.id);
        if (!q)
            continue;
        let I = R.id === K.selectedId, f = R.id === K.focusedId, m = I || f ? R.name : R.shortName, $2 = J ? R.enabled ? 24 : 18 : R.primary ? 16 : 14, Z2 = $(m, $2, J ? Math.max(60, M.width - 40) : Math.max(40, Math.min(192, M.width - 104))), b = V(Z2.join(`
`), $2), k = { marker: R, screen: q, text: m, lines: Z2, fontSize: $2, lineHeight: b.lineHeight, textHeight: b.height, expanded: !1, selected: I, focused: f, depth: I ? 30 : f ? 20 : 10, hits: [] }, q2 = f && R.offset ? [{ x: q.x + R.offset.x, y: q.y + R.offset.y }] : [];
        if (!J) {
            let l = Z.get(R.id);
            X.splice(X.indexOf(l), 1);
            let T = Math.max(52, b.height + 28), a = T + b.width + 18, L = [...q2, ...[0, -26, 26].map((d) => ({ x: q.x - T / 2, y: q.y - T / 2 + d }))].map((d) => W(d.x, d.y, a, T)), E = L.find((d) => O(d, X));
            if (!E && (I || f))
                E = (_e = L.find((d) => O(d, Q))) !== null && _e !== void 0 ? _e : L[0];
            k.box = E !== null && E !== void 0 ? E : W(q.x - 26, q.y - 26, 52, 52), k.expanded = !!E, X.push(k.box), k.hits.push(k.box);
        }
        else {
            k.hits.push({ x: q.x - 24, y: q.y - 24, width: 48, height: 48 });
            let l = b.width + 24, T = b.height + 16, a = [...q2, { x: q.x + 12, y: q.y - T / 2 }, { x: q.x - l - 30, y: q.y - T / 2 }, { x: q.x - l / 2, y: q.y + 30 }, { x: q.x - l / 2, y: q.y - T - 30 }].map((E) => W(E.x, E.y, l, T)), L = a.find((E) => O(E, X));
            if (!L && (I || f))
                L = (_f = a.find((E) => O(E, Q))) !== null && _f !== void 0 ? _f : a[0];
            if (L)
                k.box = L, k.expanded = !0, X.push(L), k.hits.push(L);
        }
        if (k.box)
            R.offset = { x: k.box.x - q.x, y: k.box.y - q.y };
        j.push(k);
    }
    return j.sort((R, q) => N.indexOf(R.marker) - N.indexOf(q.marker));
}
function C2(M, N) { return M.filter((K) => K.hits.some((V) => v2(V, N))).map((K) => K.marker); }
var S = { wild: { name: "灵兽出没地", icon: "icon:map-wild", color: 5794122, paper: 15790821, badge: 14279366, shape: "round" }, dungeon: { name: "秘境", icon: "icon:map-dungeon", color: 6969462, paper: 15986165, badge: 14800104, shape: "diamond" }, market: { name: "坊市", icon: "icon:map-market", color: 9007161, paper: 16314589, badge: 15456428, shape: "square" }, sect: { name: "宗门", icon: "icon:map-sect", color: 4286054, paper: 15397869, badge: 13098707, shape: "hexagon" }, landmark: { name: "山川地标", icon: "icon:map-landmark", color: 5466231, paper: 15528179, badge: 13688036, shape: "arch" } };
var J2 = (M) => "#" + M.toString(16).padStart(6, "0");
class M2 {
    constructor(M, N) {
        this.camera = new o;
        this.assets = new e;
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
            for (let J = 0; J < V.length; J++) {
                let Q = V[J].trim();
                if (this.u.measure(Q, N) < K) {
                    $.push(Q);
                    continue;
                }
                let X = Q.split(" "), B = "", P = K;
                for (let U = 0; U < X.length; U++) {
                    let Z = X[U] + " ", F = this.u.measure(Z, N);
                    if (F <= P) {
                        B += Z, P -= F;
                        continue;
                    }
                    if (U === 0) {
                        let Y = Z;
                        do
                            Y = Y.slice(0, -1);
                        while (Y.length && this.u.measure(Y, N) > P);
                        if (!Y)
                            throw Error("wordWrapWidth < a single character");
                        X[U] = X[U].slice(Y.length), B += Y;
                    }
                    V.splice(J + 1, 0, X.slice(X[U].length ? U : U + 1).join(" ").trimEnd());
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
        return K; let V = this.u.ctx; V.save(), V.font = `${M}px ${this.u.bodyFont}`, V.textBaseline = "alphabetic"; let $ = V.measureText("|MÉqgy"); V.restore(); let { actualBoundingBoxAscent: J, actualBoundingBoxDescent: Q } = $; if (!Number.isFinite(J) || !Number.isFinite(Q)) {
        let B = official_chunk_wje6zqc2_js_1.De.createCanvas(), P = Math.ceil($.width * 1.2), U = P * 2, Z = Math.floor(P * 1.4);
        B.width = P, B.height = U;
        let F = B.getContext("2d");
        F.fillStyle = "#f00", F.fillRect(0, 0, P, U), F.font = `${M}px ${this.u.bodyFont}`, F.textBaseline = "alphabetic", F.fillStyle = "#000", F.fillText("|MÉqgy", 0, Z);
        let Y = F.getImageData(0, 0, P, U).data, j = Z, O = Z;
        for (let W = 0; W < Z; W++) {
            let R = !1;
            for (let q = 0; q < P; q++)
                if (Y[(W * P + q) * 4] !== 255) {
                    R = !0;
                    break;
                }
            if (R) {
                j = W;
                break;
            }
        }
        for (let W = U - 1; W >= Z; W--) {
            let R = !1;
            for (let q = 0; q < P; q++)
                if (Y[(W * P + q) * 4] !== 255) {
                    R = !0;
                    break;
                }
            if (R) {
                O = W + 1;
                break;
            }
        }
        J = Z - j, Q = O - Z;
    } let X = { ascent: J, height: J + Q }; return this.metrics.set(N, X), X; }
    paint() { let M = this.u, N = this.view, K = this.camera; if (!N)
        return; if (K.width !== M.width || K.height !== M.height)
        K.resize(M.width, M.height); M.rect(0, 0, M.width, M.height, "#eee7d8"); let V = this.assets.get(N.region); if (!V || this.loading || this.error)
        return; M.hit(0, 0, M.width, M.height, () => { }, { surface: this.surface }); let $ = K.project({ x: 0, y: 0 }); M.ctx.drawImage(V, $.x, $.y, z * K.zoom, G * K.zoom), this.placed = f2(K, this.markers, { ...N }, this.measure, this.wrap); for (let J of [...this.placed].sort((Q, X) => Q.depth - X.depth))
        this.paintMarker(J, N.region === "world"); }
    label(M, N, K, V) { let $ = this.u.ctx, J = this.fontMetrics(M.fontSize), Q = this.u.canvas.width / this.u.width; $.save(), $.font = `${M.fontSize}px ${this.u.bodyFont}`, $.textBaseline = "alphabetic", $.fillStyle = V, M.lines.forEach((X, B) => $.fillText(X, Math.round(N * Q) / Q, Math.round(K * Q) / Q + J.ascent + B * M.lineHeight)), $.restore(); }
    paintMarker(M, N) { let K = this.u, V = K.ctx, { box: $, screen: J, selected: Q, focused: X, marker: B } = M; if (N) {
        if (V.beginPath(), V.arc(J.x, J.y, 5, 0, Math.PI * 2), V.fillStyle = "#352f29", V.fill(), Q || X)
            V.strokeStyle = Q ? "#9d4033" : "#352f29", V.lineWidth = Q ? 2.5 : 1.5, V.stroke();
        if ($)
            K.rect($.x, $.y, $.width, $.height, X ? "#e9dfca" : "#f6efdf"), this.label(M, $.x + 12, $.y + 8, Q ? "#9d4033" : B.enabled ? "#352f29" : "#756e63");
        return;
    } if (!$ || !B.category)
        return; let P = S[B.category], U = $.height, Z = U / 2; V.save(), V.translate($.x, $.y), V.strokeStyle = Q ? "#9d4033" : J2(P.color), V.lineWidth = Q ? 2.5 : X ? 2 : 1.25; let F = (j) => { V.fillStyle = j, V.fill(), V.save(), V.globalAlpha = Q || X ? 1 : 0.8, V.stroke(), V.restore(); }; if (M.expanded)
        Q2(V, Z, 8, $.width - Z, U - 16, (U - 16) / 2), F(X ? "#fffbf2" : J2(P.paper)); if (V.beginPath(), P.shape === "round")
        V.arc(Z, Z, Z - 1.5, 0, Math.PI * 2);
    else if (P.shape === "square")
        Q2(V, 2, 2, U - 4, U - 4, 10);
    else if (P.shape === "arch")
        Q2(V, 2, 2, U - 4, U - 4, Z - 2, 7);
    else
        (P.shape === "diamond" ? [[0.5, 0.02], [0.98, 0.5], [0.5, 0.98], [0.02, 0.5]] : [[0.5, 0.02], [0.94, 0.24], [0.94, 0.76], [0.5, 0.98], [0.06, 0.76], [0.06, 0.24]]).forEach(([O, W], R) => R ? V.lineTo(O * U, W * U) : V.moveTo(O * U, W * U)), V.closePath(); F(J2(P.badge)); let Y = P.shape === "diamond" ? 32 : 40; if (K.image(`assets/icons/map-${B.category}.webp`, Z - Y / 2, Z - Y / 2, Y, Y), V.restore(), M.expanded)
        this.label(M, $.x + U + 2, $.y + (U - M.textHeight) / 2, Q ? "#9d4033" : "#352f29"); }
    down(M, N) { var _a; if (!((_a = this.view) === null || _a === void 0 ? void 0 : _a.blocked) && !this.loading && !this.error)
        this.camera.down(M, N); }
    move(M, N) { var _a; if (!((_a = this.view) === null || _a === void 0 ? void 0 : _a.blocked))
        this.camera.move(M, N), this.u.invalidate(); }
    up(M, N, K = !1) { var _a, _b; if (!this.camera.up(M, K) || ((_a = this.view) === null || _a === void 0 ? void 0 : _a.blocked))
        return; let V = C2(this.placed, N); if (!V.length)
        this.callbacks.clear();
    else if (((_b = this.view) === null || _b === void 0 ? void 0 : _b.region) === "world") {
        let $ = V.find((J) => J.enabled);
        if ($)
            this.callbacks.region($.id);
    }
    else if (V.length > 1)
        this.callbacks.overlap(V.map(($) => $.id));
    else
        this.callbacks.node(V[0].id); }
    cancel() { this.camera.cancel(); }
}
exports.AtlasRenderer = M2;
function Q2(M, N, K, V, $, J, Q = J) { M.beginPath(), M.moveTo(N + J, K), M.lineTo(N + V - J, K), M.arcTo(N + V, K, N + V, K + J, J), M.lineTo(N + V, K + $ - Q), M.arcTo(N + V, K + $, N + V - Q, K + $, Q), M.lineTo(N + Q, K + $), M.arcTo(N, K + $, N, K + $ - Q, Q), M.lineTo(N, K + J), M.arcTo(N, K, N + J, K, J), M.closePath(); }
class N2 {
    constructor(M, N, K, V) {
        this.resultsScroll = 0;
        this.dismiss = () => { this.leave(), this.m.dismiss(), this.u.modalScroll = 0; };
        this.edit = () => { var _a; (_a = this.keyboardCleanup) === null || _a === void 0 ? void 0 : _a.call(this); let M = ({ value: V }) => { this.m.query = V, this.resultsScroll = 0, this.u.invalidate(); }, N = (V) => { M(V), K(); }, K = () => { official_chunk_wje6zqc2_js_1.De.offKeyboardInput(M), official_chunk_wje6zqc2_js_1.De.offKeyboardComplete(N), this.keyboardCleanup = void 0; }; this.keyboardCleanup = K, official_chunk_wje6zqc2_js_1.De.onKeyboardInput(M), official_chunk_wje6zqc2_js_1.De.onKeyboardComplete(N), official_chunk_wje6zqc2_js_1.De.showKeyboard({ defaultValue: this.m.query, maxLength: -1, multiple: !1, confirmType: "search", fail: K }); };
        this.u = M;
        this.m = N;
        this.close = K;
        this.hunts = V;
    }
    leave() { var _a; (_a = this.keyboardCleanup) === null || _a === void 0 ? void 0 : _a.call(this), official_chunk_wje6zqc2_js_1.De.hideKeyboard({}), this.resultsScroll = 0; }
    paint() { var _a, _b; let M = this.u, N = this.m, K = M.top + 8, J = N.region ? 95 : 50, Q = (_b = (_a = N.region) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "人界总览", X = Math.min(112, M.measure(Q, 14)) + 16, B = X + 96, P = M.width - 12 - B, U = (F, Y) => { M.roundedRect(F, K, Y, 50, "rgba(248,243,230,.95)"), M.ctx.strokeStyle = "rgba(44,24,16,.15)", M.ctx.strokeRect(F + 0.5, K + 0.5, Y - 1, 49); }; if (U(12, J), U(P, B), M.text("×", 31, K + 25, 20, official_chunk_wje6zqc2_js_1.Be.ink), M.hit(15, K + 3, 44, 44, this.close), N.region)
        M.rect(59, K + 15, 1, 20, "rgba(44,24,16,.15)"), M.text("←", 73, K + 25, 16, official_chunk_wje6zqc2_js_1.Be.ink), M.hit(60, K + 3, 44, 44, () => N.changeRegion()); M.clip(P + 3, K + 3, X, 44, () => M.text(Q, P + 11, K + 25, 14, official_chunk_wje6zqc2_js_1.Be.ink, M.bodyFont, !0)); let Z = P + 3 + X; if (M.rect(Z, K + 15, 1, 20, "rgba(44,24,16,.15)"), M.text("查找", Z + 9, K + 25, 14, official_chunk_wje6zqc2_js_1.Be.ink), N.categories.length)
        M.ctx.beginPath(), M.ctx.arc(Z + 40, K + 13, 3, 0, Math.PI * 2), M.ctx.fillStyle = official_chunk_wje6zqc2_js_1.Be.crimson, M.ctx.fill(); return M.hit(Z + 1, K + 3, 44, 44, () => { N.moreOpen = !1, N.searchOpen = !0, N.filterOpen = !1, M.modalScroll = 0, M.invalidate(); }), M.rect(Z + 45, K + 15, 1, 20, "rgba(44,24,16,.15)"), M.text("⋯", Z + 59, K + 25, 20, official_chunk_wje6zqc2_js_1.Be.ink), M.hit(Z + 46, K + 3, 44, 44, () => { N.dismiss(), N.moreOpen = !N.moreOpen, M.invalidate(); }), { x: 0, y: M.top - 8, width: M.width, height: 66 }; }
    paintOverlay() { let M = this.u, N = this.m; if (N.moreOpen) {
        let B = M.width - 12 - 160, P = M.top + 63;
        M.beginModal(!1), M.hit(0, 0, M.width, M.height, () => { N.moreOpen = !1, M.invalidate(); }), M.rect(B, P, 160, this.hunts ? 174 : 130, official_chunk_wje6zqc2_js_1.Be.paper), M.ctx.strokeStyle = "rgba(44,24,16,.2)", M.ctx.strokeRect(B + 0.5, P + 0.5, 159, this.hunts ? 173 : 129), M.text("显示方式", B + 13, P + 21, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
        for (let [U, Z, F] of [[0, "atlas", "山河画卷"], [1, "text", "文字地图"]]) {
            let Y = P + 37 + U * 44;
            if (N.mode === Z)
                M.rect(B + 5, Y, 150, 44, "rgba(44,24,16,.08)");
            if (M.text(F, B + 13, Y + 22, 14, official_chunk_wje6zqc2_js_1.Be.ink, M.bodyFont, N.mode === Z), N.mode === Z)
                M.text("✓", B + 129, Y + 22, 14, official_chunk_wje6zqc2_js_1.Be.ink);
            M.hit(B + 5, Y, 150, 44, () => N.setMode(Z));
        }
        if (this.hunts)
            M.text("组队讨伐", B + 13, P + 147, 14, official_chunk_wje6zqc2_js_1.Be.crimson), M.hit(B + 5, P + 125, 150, 44, () => { var _a; N.dismiss(), (_a = this.hunts) === null || _a === void 0 ? void 0 : _a.call(this); });
        return;
    } if (!N.searchOpen && !N.filterOpen)
        return; let K = M.width - 32, V = new official_chunk_wje6zqc2_js_1.Ce(M, K); if (V.block(44, (B, P) => { M.roundedRect(B, P, K, 44, "rgba(255,255,255,.5)"), M.ctx.strokeStyle = "rgba(44,24,16,.25)", M.ctx.strokeRect(B + 0.5, P + 0.5, K - 1, 43), M.clip(B + 12, P, K - 24, 44, () => M.text(N.query || "输入地点名称", B + 12, P + 22, 16, N.query ? official_chunk_wje6zqc2_js_1.Be.ink : "rgba(44,24,16,.4)")), M.hit(B, P, K, 44, this.edit); }), N.availableRegion) {
        V.gap(12);
        let B = 0, P = 0, Z = [{ category: null, label: "全部", icon: void 0 }, ...r.map((F) => ({ category: F, label: S[F].name, icon: S[F].icon }))].map((F) => { let Y = F.category ? N.categories.includes(F.category) : !N.categories.length, j = F.label + (Y && F.category ? " ✓" : ""), O = Math.max(44, M.measure(j, 14) + 16 + (F.icon ? 28 : 0)); if (B && B + O > K)
            B = 0, P += 48; let W = { ...F, active: Y, label: j, x: B, y: P, w: O }; return B += O + 4, W; });
        V.block(P + 44, (F, Y) => Z.forEach((j) => { if (j.active)
            M.rect(F + j.x, Y + j.y, j.w, 44, "rgba(44,24,16,.1)"); if (j.icon)
            (0, official_chunk_wje6zqc2_js_1.Ie)(M, j.icon, F + j.x + 8, Y + j.y + 10, 24, 24, 24); M.text(j.label, F + j.x + 8 + (j.icon ? 28 : 0), Y + j.y + 22, 14, official_chunk_wje6zqc2_js_1.Be.ink, M.bodyFont, j.active), M.hit(F + j.x, Y + j.y, j.w, 44, () => { N.searchAll = !1, N.setCategories(j.category ? j.active ? N.categories.filter((O) => O !== j.category) : [...N.categories, j.category] : []); }); }));
    } V.block(44, (B, P) => { if (M.ctx.strokeStyle = official_chunk_wje6zqc2_js_1.Be["ink-secondary"], M.ctx.strokeRect(B + 0.5, P + 14.5, 15, 15), N.searchAll)
        M.text("✓", B + 1, P + 22, 14, official_chunk_wje6zqc2_js_1.Be.ink); M.text("搜索所有地点（忽略类型筛选）", B + 24, P + 22, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), M.hit(B, P, K, 44, () => { N.searchAll = !N.searchAll, M.invalidate(); }); }); let $ = N.results; V.block(33, (B, P) => { M.rect(B, P, K, 1, "rgba(44,24,16,.1)"); let U = `${N.query.trim() ? "查找结果" : N.searchAll || !N.region ? "全部地点" : N.region.name} · `; M.text(U, B, P + 17, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), M.text(String($.length), B + M.measure(U, 12), P + 17, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"], "monospace"); }); let J = $.map((B) => Math.max(44, M.lines(B.name, K - 66, 14).length * 20 + 16 + 16)), Q = J.reduce((B, P) => B + P, 0), X = Math.min(M.height * 0.3, Q); if (this.resultsScroll = Math.min(this.resultsScroll, Math.max(0, Q - X)), V.block(X, (B, P) => { M.clip(B, P, K, X, () => { let U = P - this.resultsScroll; $.forEach((Z, F) => { var _a; let Y = S[H(Z)], j = M.lines(Z.name, K - 66, 14), O = J[F]; (0, official_chunk_wje6zqc2_js_1.Ie)(M, Y.icon, B + 8, U + (O - 30) / 2, 30, 30, 30), j.forEach((W, R) => M.text(W, B + 42, U + 18 + R * 20, 14, official_chunk_wje6zqc2_js_1.Be.ink)), M.text(`${(_a = (0, official_chunk_rz18xh6b_js_1.e)(Z)) === null || _a === void 0 ? void 0 : _a.name} · ${Y.name}`, B + 42, U + 8 + j.length * 20 + 8, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), M.text("›", B + K - 16, U + O / 2, 14, official_chunk_wje6zqc2_js_1.Be.ink), M.hit(B, U, K, O, () => { this.leave(), M.modalScroll = 0, N.select(Z.id, !0); }), U += O; }); }), M.scrollRegion(B, P, K, X, (U) => { this.resultsScroll = Math.max(0, Math.min(Q - X, this.resultsScroll + U)), M.invalidate(); }); }), !$.length)
        V.gap(16), V.text("没有找到符合条件的地点，试试其他名称或类型。", 14, 20, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), V.gap(16); (0, official_chunk_wje6zqc2_js_1.He)(M, { title: "查找地点", closeLabel: "完成", maxHeight: M.height * 0.7, rows: [], content: V, style: "drawer" }, this.dismiss); }
}
exports.AtlasToolbar = N2;
function U2(M, N, K, V) { let $ = S[H(N)]; (0, official_chunk_wje6zqc2_js_1.Ie)(M, $.icon, K, V, 24, 24, 24), M.text($.name, K + 30, V + 12, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]); }
function K2(M, N, K, V, $) { let J = H(N), Q = J === "dungeon" && !("sect_id" in N) ? (0, official_chunk_21q7yjsr_js_1.db)(N) : null, X = new official_chunk_wje6zqc2_js_1.Ce(M, K), B = new official_chunk_wje6zqc2_js_1.Ce(M, K), P = new official_chunk_wje6zqc2_js_1.Ce(M, K), U = M.lines(N.name, K - M.buttonWidth("收起") - 12, 16); if (X.block(Math.max(44, U.length * 24 + 8), (j, O) => { U.forEach((W, R) => M.text(W, j, O + 20 + R * 24, 16, official_chunk_wje6zqc2_js_1.Be.crimson, M.bodyFont, !0)), M.button("收起", j + K - M.buttonWidth("收起"), O + 5.84, $, official_chunk_wje6zqc2_js_1.Be.ink); }), X.block(24, (j, O) => U2(M, N, j, O)), B.gap(8), B.text(N.description, 14, 24), "realm_requirement" in N && J !== "landmark")
    B.gap(8), B.text(`${J === "wild" ? "开放境界" : "推荐境界"}：${N.realm_requirement}${Q ? ` · ${Q.difficultyLabel} · 奖励加成 +${Math.max(0, Math.round((Q.rewardBonus - 1) * 100))}%` : ""}`, 12, 16, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]); if (J === "wild") {
    let j = (0, official_chunk_rz18xh6b_js_1.b)(N.id);
    if (j)
        B.gap(12), B.text("灵兽栖息地 · 偶有幼崽", 14, 20), B.gap(8), j.species.forEach((O, W) => { if (W)
            B.gap(4); B.block(20, (R, q) => { var _a, _b; let I = (_b = (_a = official_chunk_wje6zqc2_js_1.yf.find((m) => m.id === O.speciesId)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : ""; M.text(I, R, q + 10, 14, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]); let f = `${O.minLevel}～${O.maxLevel}级`; M.text(f, R + K - M.measure(f, 12, "monospace"), q + 8, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"], "monospace"); }); }), B.gap(12);
} B.gap(8); let Z = 0, F = 0, Y = N.tags.map((j) => { let O = M.measure(j, 12); if (Z && Z + O > K)
    Z = 0, F += 20; let W = { text: j, x: Z, y: F }; return Z += O + 12, W; }); if (B.block(Y.length ? F + 16 : 0, (j, O) => Y.forEach((W) => M.text(W.text, j + W.x, O + W.y + 8, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]))), V.length) {
    P.gap(12), P.block(1, (R, q) => M.rect(R, q, K, 1, "rgba(44,24,16,.1)")), P.gap(8);
    let j = 0, O = 0, W = V.map((R) => { let q = M.buttonWidth(R.label, !0); if (j && j + q > K)
        j = 0, O += 44; let I = { action: R, x: j, y: O }; return j += q, I; });
    P.block(O + 44, (R, q) => W.forEach((I) => M.button(I.action.label, R + I.x, q + I.y + 5.84, I.action.onClick, official_chunk_wje6zqc2_js_1.Be.crimson)));
} return { head: X, body: B, footer: P, height: X.height + B.height + P.height }; }
class V2 {
    constructor(M, N) {
        this.scroll = 0;
        this.collapsed = new Set;
        this.u = M;
        this.m = N;
    }
    reset() { this.scroll = 0, this.region = void 0, this.selected = void 0, this.collapsed.clear(); }
    paint(M) { var _a, _b, _c, _d, _e; let N = this.u, K = this.m, V = (_a = K.availableRegion) !== null && _a !== void 0 ? _a : void 0; if (V !== this.region)
        this.region = V, this.scroll = 0, this.collapsed.clear(); let $ = N.width - 40, J = new official_chunk_wje6zqc2_js_1.Ce(N, $), Q; if (J.block(32, (P, U) => N.text(V ? "选择类型下的地点，展开详情与操作" : "人界 · 选择区域", P + 12, U + 16, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"])), !V)
        for (let P of official_chunk_rz18xh6b_js_1.c)
            J.block(48, (U, Z) => { let F = (0, official_chunk_rz18xh6b_js_1.g)(P.id); N.ctx.globalAlpha = F ? 1 : 0.45, (0, official_chunk_wje6zqc2_js_1.Ie)(N, "icon:map-landmark", U + 12, Z + 9, 30, 30, 30), N.text(P.name, U + 50, Z + 24, 14, official_chunk_wje6zqc2_js_1.Be.ink); let Y = F ? "›" : "未开放"; if (N.text(Y, U + $ - 12 - N.measure(Y, 12), Z + 24, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), N.ctx.globalAlpha = 1, F)
                N.hit(U, Z, $, 48, () => K.changeRegion(P.id)); });
    else {
        if (!K.visibleLocations.length)
            J.gap(16), J.text("当前区域没有符合类型的地点，可在右上角调整筛选。", 14, 20), J.gap(16);
        let P = r.map((U) => ({ category: U, items: K.visibleLocations.filter((Z) => H(Z) === U) })).filter((U) => U.items.length);
        for (let [U, { category: Z, items: F }] of P.entries()) {
            let Y = S[Z];
            if (((_b = K.selected) === null || _b === void 0 ? void 0 : _b.id) !== this.selected && K.selected && H(K.selected) === Z)
                this.collapsed.delete(Z);
            if (J.block(48, (j, O) => { N.text(this.collapsed.has(Z) ? "▸" : "▾", j + 12, O + 24, 14, official_chunk_wje6zqc2_js_1.Be.ink), (0, official_chunk_wje6zqc2_js_1.Ie)(N, Y.icon, j + 28, O + 9, 30, 30, 30), N.text(Y.name, j + 66, O + 24, 14, "#" + Y.color.toString(16).padStart(6, "0")), N.text(String(F.length), j + 74 + N.measure(Y.name, 14), O + 24, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"], "monospace"), N.hit(j, O, $, 48, () => { this.collapsed.has(Z) ? this.collapsed.delete(Z) : this.collapsed.add(Z), N.invalidate(); }); }), !this.collapsed.has(Z)) {
                for (let j of F) {
                    let O = ((_c = K.selected) === null || _c === void 0 ? void 0 : _c.id) === j.id, W = N.lines(j.name, $ - 78, 14), R = Math.max(48, W.length * 20 + 16);
                    if (O)
                        Q = J.height;
                    if (J.block(R, (q, I) => { if (O)
                        N.rect(q + 12, I, $ - 12, R, "rgba(44,24,16,.08)"); (0, official_chunk_wje6zqc2_js_1.Ie)(N, Y.icon, q + 24, I + (R - 30) / 2, 30, 30, 30), W.forEach((f, m) => N.text(f, q + 62, I + 18 + m * 20, 14, O ? official_chunk_wje6zqc2_js_1.Be.crimson : official_chunk_wje6zqc2_js_1.Be.ink, N.bodyFont, O)), N.text(O ? "▾" : "›", q + $ - 18, I + R / 2, 14, official_chunk_wje6zqc2_js_1.Be.ink), N.hit(q + 12, I, $ - 12, R, () => O ? K.closeNode() : K.select(j.id)); }), O) {
                        let q = K2(N, j, $ - 62, K.actions, () => K.closeNode());
                        J.gap(8), J.block(q.height + 12, (I, f) => { N.rect(I + 28, f, 2, q.height + 12, "rgba(193,18,31,.4)"), q.head.paint(I + 46, f), q.body.paint(I + 46, f + q.head.height), q.footer.paint(I + 46, f + q.head.height + q.body.height); }), J.gap(8);
                    }
                }
                J.gap(8);
            }
            if (U < P.length - 1)
                J.block(1, (j, O) => N.rect(j, O, $, 1, "rgba(44,24,16,.1)"));
        }
    } let X = N.height - Math.max(N.bottom, 12), B = X - M - 16; if (this.selected !== ((_d = K.selected) === null || _d === void 0 ? void 0 : _d.id) && Q !== void 0) {
        if (Q < this.scroll)
            this.scroll = Q;
        else if (Q + 48 > this.scroll + B)
            this.scroll = Q + 48 - B;
    } this.selected = (_e = K.selected) === null || _e === void 0 ? void 0 : _e.id, this.scroll = Math.max(0, Math.min(this.scroll, Math.max(0, J.height - B))), N.rect(12, M, N.width - 24, X - M, "rgba(248,243,230,.9)"), N.clip(20, M + 8, $, B, () => J.paint(20, M + 8 - this.scroll)), N.scrollRegion(12, M, N.width - 24, X - M, (P) => { this.scroll = Math.max(0, Math.min(J.height - B, this.scroll + P)), N.invalidate(); }); }
}
exports.AtlasTextMap = V2;
class E2 {
    constructor(M, N, K) {
        this.viewKey = "";
        this.bottom = !0;
        this.panelScroll = 0;
        this.active = !1;
        this.u = M;
        this.model = new t(N, () => M.invalidate(), K);
        let V = this.model;
        this.renderer = new M2(M, { region: ($) => V.changeRegion($), node: ($) => V.select($), clear: () => V.closeNode(), overlap: ($) => { V.overlapIds = $, M.modalScroll = 0, M.invalidate(); }, position: ($, J) => { this.bottom = J, M.invalidate(); }, error: ($) => { V.error = $, M.invalidate(); } }), this.toolbar = new N2(M, V, () => K("/game"), () => K("/game/hunts")), this.textMap = new V2(M, V);
    }
    enter(M) { this.active = !0, this.renderingAtlas = void 0, this.viewKey = "", this.panelId = void 0, this.panelScroll = 0, this.textMap.reset(), this.model.enter(M), this.armTimeout(); }
    leave() { this.active = !1, clearTimeout(this.timer), this.toolbar.leave(), this.renderer.destroy(); }
    armTimeout() { clearTimeout(this.timer), this.timer = setTimeout(() => { if (this.active && this.model.isAtlas && this.renderer.loading)
        this.model.error = "画卷打开超时，请重试。", this.u.invalidate(); }, 120000); }
    paint() { var _a, _b, _c; let M = this.u, N = this.model; if (M.scrollMax = 0, M.scrollTopInset = 0, M.scrollBottomInset = 0, this.renderingAtlas !== N.isAtlas)
        if (this.renderer.destroy(), this.viewKey = "", this.renderingAtlas = N.isAtlas, N.isAtlas)
            this.armTimeout();
        else
            clearTimeout(this.timer); let K = M.top + 74, V = [{ x: -8, y: M.top - 8, width: M.width + 16, height: 74 }], J = N.isAtlas && N.selected && !N.unavailable && !N.searchOpen && !N.filterOpen && !N.error && !this.renderer.loading ? K2(M, N.selected, M.width - 48, N.actions, () => N.closeNode()) : void 0, Q, X = 0; if (J) {
        let B = Math.min(M.height * 0.4, J.height + 24);
        X = Math.max(0, B - 24 - J.head.height - J.footer.height), Q = { x: 12, y: this.bottom ? M.height - Math.max(M.bottom, 12) - B : K, width: M.width - 24, height: B }, V.push({ x: Q.x - 8, y: Q.y - 8, width: Q.width + 16, height: Q.height + 16 });
    } if (N.isAtlas) {
        let B = { region: (_a = N.availableRegion) !== null && _a !== void 0 ? _a : "world", selectedId: (_c = (_b = N.selected) === null || _b === void 0 ? void 0 : _b.id) !== null && _c !== void 0 ? _c : null, focusId: N.focusId, focusRequest: N.focusRequest, categories: N.categories, occlusions: V, blocked: N.unavailable || !!N.error || N.overlapIds.length > 0 }, P = JSON.stringify(B);
        if (P !== this.viewKey)
            this.viewKey = P, this.renderer.setView(B);
        this.renderer.paint();
    }
    else
        this.renderer.cancel(), M.rect(0, 0, M.width, M.height, "#eee7d8"), this.textMap.paint(K); if (N.isAtlas && this.renderer.loading && !N.error) {
        M.rect(0, 0, M.width, M.height, "rgba(248,243,230,.9)");
        let B = "正在展开山河画卷……";
        M.text(B, (M.width - M.measure(B, 14)) / 2, M.height / 2, 14, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
    } if (this.toolbar.paint(), J && Q) {
        let { x: B, y: P, width: U, height: Z } = Q;
        if (this.panelId !== N.selected.id)
            this.panelId = N.selected.id, this.panelScroll = 0;
        this.panelScroll = Math.max(0, Math.min(this.panelScroll, J.body.height - X)), M.rect(B, P, U, Z, "rgba(248,243,230,.95)"), M.hit(B, P, U, Z, () => { }), J.head.paint(B + 12, P + 12);
        let F = P + 12 + J.head.height;
        M.clip(B + 12, F, U - 24, X, () => J.body.paint(B + 12, F - this.panelScroll)), M.scrollRegion(B + 12, F, U - 24, X, (Y) => { this.panelScroll = Math.max(0, Math.min(J.body.height - X, this.panelScroll + Y)), M.invalidate(); }), J.footer.paint(B + 12, F + X);
    } if (N.isAtlas && N.availableRegion && !N.visibleLocations.length)
        this.notice("当前区域没有符合类型的地点。", "显示全部", () => N.setCategories([]), K); if (N.invalid)
        this.notice("未找到对应地点，已显示可用舆图。", "返回上层", () => N.changeRegion(), K); if (N.isAtlas && N.revealingFilteredNode) {
        let P = M.measure("已显示全部，以定位该地点。", 14) + 16;
        M.rect(12, K, P, 36, "rgba(248,243,230,.95)"), M.text("已显示全部，以定位该地点。", 20, K + 18, 14, official_chunk_wje6zqc2_js_1.Be.ink), M.hit(12, K, P, 36, () => { });
    } if (N.isAtlas && N.error) {
        M.rect(0, 0, M.width, M.height, "rgba(248,243,230,.95)"), M.hit(0, 0, M.width, M.height, () => { }), M.lines(N.error, M.width - 48, 16).forEach((F, Y) => M.text(F, (M.width - M.measure(F, 16)) / 2, M.height / 2 - 24 + Y * 24, 16, official_chunk_wje6zqc2_js_1.Be.ink));
        let P = ["重新展开", "使用文字地图"], U = P.reduce((F, Y) => F + M.buttonWidth(Y), 16), Z = (M.width - U) / 2;
        M.button(P[0], Z, M.height / 2 + 16, () => { N.error = null, this.renderer.destroy(), this.viewKey = "", this.armTimeout(), M.invalidate(); }), M.button(P[1], Z + M.buttonWidth(P[0]) + 16, M.height / 2 + 16, () => N.setMode("text"));
    } }
    notice(M, N, K, V) { let $ = this.u, J = $.lines(M, $.width - 48, 14), Q = 24 + J.length * 24 + 32.32; $.rect(12, V, $.width - 24, Q, "rgba(248,243,230,.95)"), $.hit(12, V, $.width - 24, Q, () => { }), J.forEach((X, B) => $.text(X, 24, V + 24 + B * 24, 14, official_chunk_wje6zqc2_js_1.Be.ink)), $.button(N, 24, V + 12 + J.length * 24, K); }
    paintOverlay() { let M = this.u, N = this.model; if (N.isAtlas && N.overlapIds.length) {
        let K = new official_chunk_wje6zqc2_js_1.Ce(M, M.width - 32);
        for (let V of N.overlapIds) {
            let $ = (0, official_chunk_21q7yjsr_js_1.cb)(V);
            if (!$)
                continue;
            K.block(69, (J, Q) => { M.text($.name, J, Q + 22, 14, official_chunk_wje6zqc2_js_1.Be.ink), U2(M, $, J, Q + 36), M.line(J, Q + 68, K.width, "rgba(44,24,16,.1)"), M.hit(J, Q, K.width, 69, () => { M.modalScroll = 0, N.select(V); }); });
        }
        (0, official_chunk_wje6zqc2_js_1.He)(M, { title: "选择地点", rows: [], content: K, style: "drawer" }, () => { N.overlapIds = [], M.invalidate(); });
    } if (N.unavailable && !N.searchOpen && (!N.isAtlas || !N.error)) {
        let K = new official_chunk_wje6zqc2_js_1.Ce(M, M.width - 32);
        K.text("此区域尚未开放。", 14, 28), (0, official_chunk_wje6zqc2_js_1.He)(M, { title: `${N.region.name}舆图`, rows: [], content: K, style: "drawer", footer: { height: 32.32 + Math.max(M.bottom, 12) - 17, paint: (V, $) => { M.line(0, $ - 13, M.width, "rgba(44,24,16,.15)"), M.button("返回上层", V - 1, $, () => N.changeRegion(), official_chunk_wje6zqc2_js_1.Be.ink); } } }, () => N.changeRegion());
    } this.toolbar.paintOverlay(); }
}
exports.AtlasPage = E2;
