"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionConsignmentModel = exports.AuctionConsignmentView = exports.AuctionFilterView = exports.AuctionFormControls = exports.AuctionListingsView = exports.AuctionModel = exports.AuctionPage = void 0;
const official_chunk_jwqx9dg7_js_1 = require("./official-chunk-jwqx9dg7.js");
Object.defineProperty(exports, "AuctionFormControls", { enumerable: true, get: function () { return official_chunk_jwqx9dg7_js_1.Ab; } });
const official_chunk_h2eh160v_js_1 = require("./official-chunk-h2eh160v.js");
const official_chunk_wje6zqc2_js_1 = require("./official-chunk-wje6zqc2.js");
var Te = "玄品", M = 9999999, S = official_chunk_h2eh160v_js_1.xe, _ = 1e9, Ie = { 凡品: 5000, 灵品: 1e4, 玄品: 1e5, 真品: 200000, 地品: 400000, 天品: 800000, 仙品: 1600000 }, B = [{ upTo: 1e4, rateBps: 300 }, { upTo: 1e5, rateBps: 500 }, { upTo: 500000, rateBps: 800 }, { upTo: 2000000, rateBps: 1200 }, { upTo: Number.POSITIVE_INFINITY, rateBps: 1500 }];
function te(e) { return official_chunk_wje6zqc2_js_1.qf[e] >= official_chunk_wje6zqc2_js_1.qf[Te]; }
function ie(e) { var _a; return (_a = Ie[e]) !== null && _a !== void 0 ? _a : M; }
function Se(e) { var _a, _b; let i = Math.max(0, Math.floor(e)); return (_b = (_a = B.find((t) => i <= t.upTo)) === null || _a === void 0 ? void 0 : _a.rateBps) !== null && _b !== void 0 ? _b : B[B.length - 1].rateBps; }
function T(e, i) { let t = Math.max(0, Math.floor(e)), r = Math.max(0, Math.floor(i)), s = t * r, o = 0, n = t, h = 0; for (let c of B) {
    if (n <= 0)
        break;
    let a = Number.isFinite(c.upTo) ? c.upTo - o : n, u = Math.min(n, a);
    h += u * c.rateBps, n -= u, o = c.upTo;
} let l = Math.floor(h * r / 1e4); return { unitPrice: t, quantity: r, grossAmount: s, feeAmount: l, sellerAmount: s - l, marginalRatePercent: Se(t) / 100 }; }
const zod_1 = require("./zod.js");
var ce = ["material", "seed", "consumable", "equipment", "blueprint", "manual_jade", "inscription", "beast_book", "beast_refinement", "beast_rejuvenation", "beast"], he = { material: "材料", seed: "种子", consumable: "丹药／灵果", equipment: "道装", blueprint: "图纸", manual_jade: "玉简", inscription: "阵纹", beast_book: "传承灵印", beast_refinement: "灵露", beast_rejuvenation: "灵果", beast: "灵兽" }, ue = zod_1.z.object({ requestId: zod_1.z.uuid(), itemId: zod_1.z.uuid(), revision: zod_1.z.number().int().nonnegative(), price: zod_1.z.number().int().min(1).max(M), quantity: zod_1.z.number().int().min(1).max(99), visibility: zod_1.z.enum(["public", "private"]).default("public"), targetCultivatorId: zod_1.z.uuid().optional() }).strict().refine((e) => e.visibility === "private" ? !!e.targetCultivatorId : !e.targetCultivatorId, "专属寄售须指定好友，公开寄售不指定买家"), We = zod_1.z.object({ listingId: zod_1.z.uuid(), quantity: zod_1.z.number().int().min(1).max(S), requestId: zod_1.z.uuid() }).strict(), de = zod_1.z.strictObject({ requestId: zod_1.z.uuid(), beastId: zod_1.z.uuid(), expectedRevision: zod_1.z.number().int().nonnegative(), price: zod_1.z.number().int().min(1).max(M), visibility: zod_1.z.enum(["public", "private"]).default("public"), targetCultivatorId: zod_1.z.uuid().optional() }).refine((e) => e.visibility === "private" ? !!e.targetCultivatorId : !e.targetCultivatorId, "专属寄售须指定好友，公开寄售不指定买家"), Ee = zod_1.z.discriminatedUnion("version", [zod_1.z.strictObject({ version: zod_1.z.literal("inventory_v1"), item: official_chunk_h2eh160v_js_1.Zd }), zod_1.z.strictObject({ version: zod_1.z.literal("beast_v1"), beast: official_chunk_jwqx9dg7_js_1.Db })]);
function pe(e) { let i = (0, official_chunk_h2eh160v_js_1.Xd)(e.definitionId).kind; if (i === "material")
    return (0, official_chunk_h2eh160v_js_1.ee)(e.instanceData).rank; if (i === "consumable")
    return official_chunk_h2eh160v_js_1.nd.parse(e.instanceData).quality; if (i === "seed") {
    if (e.instanceData && typeof e.instanceData === "object" && "seedSpec" in e.instanceData)
        return official_chunk_h2eh160v_js_1.ud.parse(e.instanceData).seedSpec.plant.quality;
    return zod_1.z.object({ rank: zod_1.z.enum(official_chunk_wje6zqc2_js_1.pf) }).parse(e.instanceData).rank;
} return null; }
function C(e) { let i = pe(e); return i ? ie(i) : M; }
function P(e) { if (e.location !== "bag")
    return "只能寄售随身物品"; if (e.equipped)
    return "已装备道装不可寄售，请先卸下"; let i = (0, official_chunk_h2eh160v_js_1.Nd)(e.definitionId); if (!i)
    return "该物品不支持寄售"; if (i.kind === "consumable" && !["pill", "spirit_fruit"].includes(official_chunk_h2eh160v_js_1.nd.parse(e.instanceData).spec.kind))
    return "消耗品仅支持丹药与灵果寄售"; let t = pe(e); if (t && !te(t))
    return `仅玄品及以上物品可寄售，当前为${t}`; return null; }
var D = ce.filter((e) => e !== "beast");
function J(e) { if (e === "beast")
    return official_chunk_wje6zqc2_js_1.yf.map((t) => ({ value: t.id, label: t.name })); return Object.entries(e === "material" ? official_chunk_h2eh160v_js_1.qd : e === "equipment" || e === "blueprint" ? official_chunk_h2eh160v_js_1.zd : e === "consumable" ? { pill: "丹药", spirit_fruit: "灵果" } : {}).map(([t, r]) => ({ value: t, label: r })); }
function j(e) { return ["material", "seed", "consumable"].includes(e); }
function Z(e) { let i = e.get("assetType") === "beast" || !e.has("assetType") && e.get("itemType") === "beast" ? "beast" : "item", t = e.get("itemType"), r = i === "beast" ? "beast" : D.includes(t) ? t : "all", s = J(r).some((f) => f.value === e.get("itemCategory")) ? e.get("itemCategory") : "all", o = e.get("itemQuality"), n = j(r) && official_chunk_wje6zqc2_js_1.pf.includes(o) ? o : "all", h = e.get("sortBy"), l = h === "price_asc" || h === "price_desc" ? h : "latest", c = Number(e.get("page")), a = Number.isInteger(c) && c > 0 ? c : 1, u = e.get("searchMode") === "sellerName" ? "sellerName" : "itemName", p = e.get(u) || ""; return { assetType: i, mine: e.get("tab") === "my", page: a, itemType: r, category: s, quality: n, sortBy: l, searchMode: u, searchValue: p }; }
function be(e) { let i = Z(e), t = new URLSearchParams({ assetType: i.assetType, scope: i.mine ? "mine" : "all", page: String(i.page), limit: i.assetType === "item" ? "24" : "12", sortBy: i.sortBy }); if (i.itemType !== "all")
    t.set("itemType", i.itemType); if (i.category !== "all")
    t.set("itemCategory", i.category); if (i.quality !== "all")
    t.set("itemQuality", i.quality); if (i.searchValue.trim())
    t.set(i.searchMode, i.searchValue.trim()); return `/api/auction/listings?${t}`; }
class F {
    constructor(e, i, t, r) {
        this.query = new URLSearchParams;
        this.error = "";
        this.loading = !1;
        this.pendingId = null;
        this.now = Date.now();
        this.active = !1;
        this.owner = "";
        this.generation = 0;
        this.reader = 0;
        this.changed = e;
        this.account = i;
        this.refreshPlayer = t;
        this.inform = r;
    }
    get filters() { return Z(this.query); }
    get busy() { return this.pendingId !== null; }
    enter(e, i = "/game/auction") { var _a; this.leave(), this.active = !0, this.owner = e, this.query = new URLSearchParams((_a = i.split("?")[1]) !== null && _a !== void 0 ? _a : ""), this.data = void 0, this.error = "", this.confirm = void 0, this.attempt = void 0, this.now = Date.now(), this.timer = setInterval(() => { this.now = Date.now(), this.changed(); }, 60000), this.reload(); }
    leave() { if (this.active = !1, this.generation++, this.reader++, this.timer)
        clearInterval(this.timer); this.timer = void 0, this.pendingId = null, this.loading = !1, this.confirm = void 0; }
    update(e, i = !0) { for (let [t, r] of Object.entries(e))
        if (!r || r === "all")
            this.query.delete(t);
        else
            this.query.set(t, r); if (i)
        this.query.delete("page"); this.confirm = void 0, this.reload(); }
    setAsset(e) { this.update({ assetType: e, itemType: null, itemCategory: null, itemQuality: null, itemName: null, sellerName: null }); }
    applyFilters(e) { this.update({ itemType: e.itemType, itemCategory: e.category, itemQuality: e.quality, sortBy: e.sortBy, searchMode: e.searchMode, itemName: null, sellerName: null, [e.searchMode]: e.searchValue.trim() || null }); }
    listed() { let { assetType: e } = this.filters; this.update({ tab: "my", assetType: e, itemType: null, itemCategory: null, itemQuality: null, itemName: null, sellerName: null }); }
    async reload() { if (!this.active)
        return; let e = this.generation, i = ++this.reader; this.data = void 0, this.error = "", this.loading = !0, this.changed(); try {
        let t = await (0, official_chunk_h2eh160v_js_1.Gb)(be(this.query));
        if (!this.active || e !== this.generation || i !== this.reader)
            return;
        let r = Math.max(1, t.pagination.totalPages);
        if (this.filters.page > r) {
            this.query.set("page", String(r)), this.reload();
            return;
        }
        this.data = t;
    }
    catch (t) {
        if (this.active && e === this.generation && i === this.reader)
            this.error = t instanceof Error ? t.message : "获取拍卖列表失败";
    }
    finally {
        if (this.active && e === this.generation && i === this.reader)
            this.loading = !1, this.changed();
    } }
    maxQuantity(e) { return Math.min(e.remainingQuantity, S, Math.floor(_ / e.price)); }
    expired(e) { return Math.max(0, Math.ceil((new Date(e.expiresAt).getTime() - this.now) / 60000)) === 0; }
    async buy(e, i) { if (!this.active || this.busy || this.expired(e))
        return !1; let t = this.account(); if (!t || t.id !== this.owner)
        return this.inform("角色信息读取中，请稍后重试"), !1; if (!Number.isInteger(i) || i < 1 || i > Math.min(e.remainingQuantity, S))
        return !1; let r = T(e.price, i).grossAmount; if (r > _ || r > t.spiritStones)
        return this.inform(r > _ ? "超过单次交易总额上限" : "囊中羞涩，灵石不足"), !1; if (e.sellerId === t.id)
        return !1; if (e.itemType === "beast" || i > 1 || r > 1e5)
        return this.confirm = { listing: e, quantity: i, total: r }, this.changed(), !0; return this.executeBuy(e, i); }
    async confirmBuy() { if (!this.confirm || this.busy)
        return !1; let { listing: e, quantity: i } = this.confirm, t = this.generation, r = await this.executeBuy(e, i); if (this.active && t === this.generation)
        this.confirm = void 0, this.changed(); return r; }
    async executeBuy(e, i) { var _a; if (!this.active || this.busy)
        return !1; let t = this.generation, r = () => this.active && t === this.generation, s = JSON.stringify([e.id, i]); if (((_a = this.attempt) === null || _a === void 0 ? void 0 : _a.key) !== s)
        this.attempt = { key: s, id: (0, official_chunk_wje6zqc2_js_1.Ee)() }; this.pendingId = e.id, this.changed(); try {
        let o = await (0, official_chunk_h2eh160v_js_1.Mb)("/api/auction/buy", { listingId: e.id, quantity: i, requestId: this.attempt.id });
        if (!r())
            return !1;
        return this.attempt = void 0, this.inform(o.message), this.refreshPlayer().catch(() => { }), !0;
    }
    catch (o) {
        if (r())
            this.inform(o instanceof Error ? o.message : "购买失败");
        return !1;
    }
    finally {
        if (r())
            this.pendingId = null, this.reload(), this.changed();
    } }
    async cancel(e) { var _a; if (!this.active || this.busy || e.sellerId !== this.owner || this.expired(e))
        return !1; let i = this.generation, t = () => this.active && i === this.generation; this.pendingId = e.id, this.changed(); try {
        let r = await (0, official_chunk_h2eh160v_js_1.Gb)(`/api/auction/${e.id}`, "DELETE");
        if (!t())
            return !1;
        return this.inform(((_a = r.data) !== null && _a !== void 0 ? _a : r).message), this.refreshPlayer().catch(() => { }), !0;
    }
    catch (r) {
        if (t())
            this.inform(r instanceof Error ? r.message : "下架失败");
        return !1;
    }
    finally {
        if (t())
            this.pendingId = null, this.reload(), this.changed();
    } }
}
exports.AuctionModel = F;
function z(e, i, t, r, s, o = !1) { var _a; let n = new official_chunk_wje6zqc2_js_1.Ce(e, t), h = new official_chunk_wje6zqc2_js_1.Ce(e, t - 108), l = official_chunk_wje6zqc2_js_1.yf.find((a) => a.id === i.speciesId); if (h.text(`${(_a = l === null || l === void 0 ? void 0 : l.name) !== null && _a !== void 0 ? _a : ""}${i.isMutant ? "　变异" : ""}`, 16, 24, official_chunk_wje6zqc2_js_1.Be.ink, !0), h.gap(4), h.text(`${(0, official_chunk_h2eh160v_js_1.nc)(i)} · ${i.level}级 · ${i.skills.length}技能`, 14, 20, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), l)
    h.gap(4), h.text(`携带境界 ${(0, official_chunk_wje6zqc2_js_1.wf)(l.carryLevel).label}`, 14, 20, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]); if (s !== void 0)
    h.gap(8), h.text(`${s.toLocaleString()} 灵石`, 14, 20, "#92400e", !0); let c = Math.max(60, h.height) + 32; return n.block(c, (a, u) => { if (e.ctx.save(), o)
    e.ctx.globalAlpha *= 0.6; if (e.rect(a, u, t, c, official_chunk_wje6zqc2_js_1.Be.paper), e.ctx.strokeStyle = "rgba(44,24,16,.2)", e.ctx.strokeRect(a + 0.5, u + 0.5, t - 1, c - 1), (0, official_chunk_jwqx9dg7_js_1.Bb)(e, i, a + 16, u + (c - 60) / 2, 60), h.paint(a + 92, u + 16), e.ctx.restore(), !o)
    e.hit(a, u, t, c, r); }), n; }
class W {
    constructor(e, i, t) {
        this.quantity = "1";
        this.savedScroll = 0;
        this.close = () => { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.itemPreview.close(), this.beastPreview.close(), this.selected = void 0, this.u.modalScroll = this.savedScroll, this.u.invalidate(); };
        this.u = e;
        this.model = i;
        this.owner = t;
        this.itemPreview = new official_chunk_h2eh160v_js_1.te(e), this.beastPreview = new official_chunk_jwqx9dg7_js_1.Cb(e);
    }
    reset() { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.itemPreview.close(), this.beastPreview.close(), this.selected = void 0, this.quantity = "1"; }
    open(e, i) { if (this.close(), this.savedScroll = this.u.modalScroll, this.selected = e, this.quantity = "1", this.u.modalScroll = 0, e.itemType !== "beast")
        this.itemPreview.open({ ...e.item, instanceData: e.item.instanceData, quantity: e.remainingQuantity }, i, void 0, void 0, (t) => this.actions(e, t), void 0, "库存"); this.u.invalidate(); }
    edit() { var _a; if (this.model.busy)
        return; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); let e = (t) => { this.quantity = t.value, this.u.invalidate(); }, i = (t) => { var _a; e(t), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); }; this.stopKeyboard = () => { official_chunk_wje6zqc2_js_1.De.offKeyboardInput(e), official_chunk_wje6zqc2_js_1.De.offKeyboardComplete(i), official_chunk_wje6zqc2_js_1.De.hideKeyboard(), this.stopKeyboard = void 0; }, official_chunk_wje6zqc2_js_1.De.onKeyboardInput(e), official_chunk_wje6zqc2_js_1.De.onKeyboardComplete(i), official_chunk_wje6zqc2_js_1.De.showKeyboard({ defaultValue: this.quantity, maxLength: 12, multiple: !1, confirmHold: !1, confirmType: "done" }); }
    flow(e) { var _a, _b; let i = this.u, t = this.model, r = new official_chunk_wje6zqc2_js_1.Ce(i, e), s = (_b = (_a = t.data) === null || _a === void 0 ? void 0 : _a.listings) !== null && _b !== void 0 ? _b : []; if (t.filters.assetType === "beast")
        for (let o of s) {
            if (o.itemType !== "beast")
                continue;
            let n = z(i, o.beast, e, () => this.open(o, { x: 0, y: 0, w: 0, h: 0 }), o.price);
            r.block(n.height, (h, l) => n.paint(h, l)), r.gap(12);
        }
    else {
        let o = s.filter((l) => l.itemType !== "beast"), n = (e - 24) / 4, h = [];
        for (let l = 0; l < Math.ceil(o.length / 4); l++) {
            let c = o.slice(l * 4, l * 4 + 4);
            h.push(n + 4 + Math.max(...c.map((a) => i.measure(a.price.toLocaleString(), 12, "monospace") + 4 + 24 > n ? 32 : 16)));
        }
        for (let l = 0; l < h.length; l++)
            if (r.block(h[l], (c, a) => o.slice(l * 4, l * 4 + 4).forEach((u, p) => { var _a; let f = c + p * (n + 8); (0, official_chunk_h2eh160v_js_1.ve)(i, f, a, n, { ...u.item, instanceData: u.item.instanceData, quantity: u.remainingQuantity }, { badge: u.sellerId === ((_a = this.owner()) === null || _a === void 0 ? void 0 : _a.id) ? "我的" : u.visibility === "private" ? "专属" : void 0, preview: () => this.open(u, { x: f, y: a, w: n, h: n }) }); let b = u.price.toLocaleString(), g = i.measure(b, 12, "monospace"), m = g + 28 > n; i.text(b, f + (n - (m ? g : g + 28)) / 2, a + n + 12, 12, "#92400e", "monospace"), i.text("灵石", m ? f + (n - 24) / 2 : f + (n + g - 28) / 2 + 4, a + n + (m ? 28 : 12), 12, "#92400e"); })), l < h.length - 1)
                r.gap(16);
    } return r; }
    actions(e, i) { var _a, _b; let t = this.u, r = this.model, s = new official_chunk_wje6zqc2_js_1.Ce(t, i), o = this.owner(), n = e.sellerId === (o === null || o === void 0 ? void 0 : o.id), h = e.itemType === "beast", l = r.maxQuantity(e), c = Number(this.quantity), a = Number.isInteger(c) && c >= 1 && c <= l, u = a ? T(e.price, c).grossAmount : null, p = Math.max(0, Math.ceil((new Date(e.expiresAt).getTime() - r.now) / 60000)); if (s.text(`卖家：${e.sellerName}${n ? "（我）" : ""}`, 12, 16, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), s.gap(4), s.text(`剩余时间：${p === 0 ? "已过期" : `${Math.floor(p / 60)}时${p % 60}分`}`, 12, 16, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), e.visibility === "private")
        s.gap(4), s.text(`专属：${e.targetCultivatorId === (o === null || o === void 0 ? void 0 : o.id) ? "指定给我" : e.targetCultivatorName || "指定道友"}`, 12, 16, official_chunk_wje6zqc2_js_1.Be.crimson); if (s.gap(12), s.text(`单价 ${e.price.toLocaleString()} 灵石／${h ? "只" : "件"}`, 14, 24), !n && !h && l > 1)
        s.gap(12), s.text("购买数量", 14, 20), s.gap(4), s.block(40, (f, b) => { let g = i - t.buttonWidth("最多") - 8; if (t.rect(f, b, g, 40, "rgba(248,243,230,.7)"), t.ctx.strokeStyle = "rgba(44,24,16,.3)", t.ctx.strokeRect(f + 0.5, b + 0.5, g - 1, 39), t.text(this.quantity, f + 10, b + 20, 16, official_chunk_wje6zqc2_js_1.Be.ink, "monospace"), !r.busy)
            t.hit(f, b, g, 40, () => this.edit()); t.inert(r.busy, () => t.button("最多", f + g + 8, b + 4, () => { this.quantity = String(l), t.invalidate(); })); }); if (!n)
        s.gap(12), s.text(`合计 ${(_a = u === null || u === void 0 ? void 0 : u.toLocaleString()) !== null && _a !== void 0 ? _a : "—"} 灵石`, 14, 24, "#92400e", !0); if (h && !n && !(0, official_chunk_h2eh160v_js_1.md)(e.beast, (_b = o === null || o === void 0 ? void 0 : o.level) !== null && _b !== void 0 ? _b : 0))
        s.gap(12), s.text("当前境界或灵兽寿命不满足出战条件，领取后暂不能出战。", 14, 20, official_chunk_wje6zqc2_js_1.Be.crimson); return s.gap(12), s.text(n ? "下架后通过邮件领回。" : h ? "通过邮件领取，满仓时保留附件；领取后不自动携带或首发。" : "购入后通过邮件领取。", 12, 16, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), s.gap(12), s.block(32.32, (f, b) => { let g = r.busy || p === 0 || !n && !a; if (t.ctx.save(), g)
        t.ctx.globalAlpha *= 0.5; t.inert(g, () => t.button(r.pendingId === e.id ? "处理中……" : n ? "下架" : "购买", f, b, () => { (n ? r.cancel(e) : r.buy(e, c)).then((m) => { if (m && this.selected === e)
        this.close(); }); }, n ? official_chunk_wje6zqc2_js_1.Be.ink : official_chunk_wje6zqc2_js_1.Be.crimson)), t.ctx.restore(); }), s; }
    paintOverlay() { var _a, _b, _c, _d; if (((_a = this.selected) === null || _a === void 0 ? void 0 : _a.itemType) !== "beast" && this.itemPreview.underlayScroll === void 0)
        (_b = this.stopKeyboard) === null || _b === void 0 ? void 0 : _b.call(this), this.selected = void 0; let e = this.u, i = this.model, t = this.selected; if ((t === null || t === void 0 ? void 0 : t.itemType) === "beast") {
        let r = e.modalScroll;
        if (this.beastPreview.skillUnderlayScroll !== void 0)
            e.modalScroll = this.beastPreview.skillUnderlayScroll;
        let s = Math.min(448, e.width - 24) - 34, o = this.beastPreview.content(t.beast, s), n = this.actions(t, s);
        if (o.gap(16), o.rule(), o.gap(16), o.block(n.height, (h, l) => n.paint(h, l)), (0, official_chunk_wje6zqc2_js_1.He)(e, { title: "灵兽详情", style: "modal", rows: [], content: o, actions: [{ label: "关闭", run: this.close }] }, this.close), this.beastPreview.skillUnderlayScroll !== void 0)
            e.modalScroll = r, this.beastPreview.paintSkill();
    }
    else
        this.itemPreview.paint(); if (i.confirm) {
        let { listing: r, quantity: s, total: o } = i.confirm, n = new official_chunk_wje6zqc2_js_1.Ce(e, Math.min(448, e.width - 24) - 34);
        if (n.text(`购入「${r.itemName}」${s}${r.itemType === "beast" ? "只" : "件"}。`, 14, 24), n.gap(12), n.text(`单价 ${r.price.toLocaleString()} 灵石`, 14, 24), n.gap(12), n.text(`合计 ${o.toLocaleString()} 灵石`, 14, 24, "#92400e", !0), r.itemType === "beast" && !(0, official_chunk_h2eh160v_js_1.md)(r.beast, (_d = (_c = this.owner()) === null || _c === void 0 ? void 0 : _c.level) !== null && _d !== void 0 ? _d : 0))
            n.gap(12), n.text("当前境界或灵兽寿命不满足出战条件，领取后暂不能出战。", 14, 24, official_chunk_wje6zqc2_js_1.Be.crimson);
        n.gap(12), n.text(r.itemType === "beast" ? "通过邮件领取，满仓时保留附件；领取后不自动携带或首发。" : "购入后通过邮件领取。", 14, 24, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
        let h = () => { if (i.busy)
            return; i.confirm = void 0, e.modalScroll = 0, e.invalidate(); };
        (0, official_chunk_wje6zqc2_js_1.He)(e, { title: "确认购入", style: "modal", rows: [], content: n, actions: [{ label: "再看看", disabled: i.busy, run: h }, { label: "确认购入", disabled: i.busy, primary: !0, run: () => void i.confirmBuy() }] }, h);
    } }
}
exports.AuctionListingsView = W;
class E {
    constructor(e, i) { this.u = e; this.model = i; this.controls = new official_chunk_jwqx9dg7_js_1.Ab(e); }
    reset() { this.controls.reset(), this.draft = void 0; }
    open() { let e = this.model.filters; this.reset(), this.draft = { itemType: e.itemType, category: e.category, quality: e.quality, sortBy: e.sortBy, searchMode: e.searchMode, searchValue: e.searchValue }, this.u.modalScroll = 0, this.u.invalidate(); }
    paint() { var _a, _b; if (!this.draft)
        return; let e = this.u, i = this.model, t = this.draft, r = i.filters.assetType === "beast", s = r ? "灵兽" : "道具", o = e.width - 32, n = new official_chunk_wje6zqc2_js_1.Ce(e, o), h = this.controls, l = [], c = (o - 12) / 2; if (!r) {
        let m = new official_chunk_wje6zqc2_js_1.Ce(e, c);
        h.select(m, "道具分类", t.itemType, [{ value: "all", label: "全部道具" }, ...D.map((A) => ({ value: A, label: he[A] }))], (A) => { t.itemType = A, t.category = t.quality = "all"; }), l.push(m);
    } let a = J(t.itemType); if (a.length) {
        let m = new official_chunk_wje6zqc2_js_1.Ce(e, c);
        h.select(m, r ? "物种" : "子类", t.category, [{ value: "all", label: r ? "全部物种" : "全部子类" }, ...a], (A) => t.category = A), l.push(m);
    } if (j(t.itemType)) {
        let m = new official_chunk_wje6zqc2_js_1.Ce(e, c);
        h.select(m, "品级", t.quality, [{ value: "all", label: "全部品级" }, ...official_chunk_wje6zqc2_js_1.pf.map((A) => ({ value: A, label: A }))], (A) => t.quality = A), l.push(m);
    } let u = new official_chunk_wje6zqc2_js_1.Ce(e, c); h.select(u, "排序", t.sortBy, [{ value: "latest", label: "最新上架" }, { value: "price_asc", label: "价格从低到高" }, { value: "price_desc", label: "价格从高到低" }], (m) => t.sortBy = m), l.push(u); for (let m = 0; m < l.length; m += 2)
        if (n.block(Math.max(l[m].height, (_b = (_a = l[m + 1]) === null || _a === void 0 ? void 0 : _a.height) !== null && _b !== void 0 ? _b : 0), (A, N) => { var _a; l[m].paint(A, N), (_a = l[m + 1]) === null || _a === void 0 ? void 0 : _a.paint(A + c + 12, N); }), m + 2 < l.length)
            n.gap(12); n.gap(16); let p = new official_chunk_wje6zqc2_js_1.Ce(e, 96), f = new official_chunk_wje6zqc2_js_1.Ce(e, o - 108); h.select(p, "搜索方式", t.searchMode, [{ value: "itemName", label: s }, { value: "sellerName", label: "卖家" }], (m) => { t.searchMode = m, t.searchValue = ""; }), h.input(f, "完整名称", t.searchValue, (m) => t.searchValue = m, !1, t.searchMode === "sellerName" ? "完整卖家名" : r ? "灵兽自定义全名" : "完整道具名"), n.block(Math.max(p.height, f.height), (m, A) => { p.paint(m, A), f.paint(m + 108, A); }); let b = () => { this.reset(), e.modalScroll = 0, e.invalidate(); }, g = e.modalScroll; if (h.underlayScroll !== void 0)
        e.modalScroll = h.underlayScroll; if ((0, official_chunk_wje6zqc2_js_1.He)(e, { title: `筛选${s}`, closeLabel: "取消", rows: [], content: n, actions: [{ label: "重置", run: () => { this.draft = { itemType: r ? "beast" : "all", category: "all", quality: "all", sortBy: "latest", searchMode: "itemName", searchValue: "" }, h.reset(), e.invalidate(); } }, { label: "应用", primary: !0, run: () => { i.applyFilters(t), b(); } }] }, b), h.underlayScroll !== void 0)
        e.modalScroll = g; h.paintOverlay(); }
}
exports.AuctionFilterView = E;
class K {
    constructor(e, i, t, r) {
        this.assetType = "item";
        this.beastId = "";
        this.quantity = "1";
        this.price = "";
        this.visibility = "public";
        this.target = "";
        this.friends = [];
        this.error = "";
        this.busy = !1;
        this.loading = !1;
        this.active = !1;
        this.generation = 0;
        this.reader = 0;
        this.friendReader = 0;
        this.changed = e;
        this.success = i;
        this.inform = t;
        this.refreshPlayer = r;
        this.inventory = new official_chunk_h2eh160v_js_1.we(e);
    }
    enter(e) { if (this.leave(), this.active = !0, this.assetType = e, this.view = void 0, this.selectedRef = void 0, this.beastId = "", this.quantity = "1", this.price = "", this.visibility = "public", this.target = "", this.friends = [], this.error = "", this.attempt = void 0, e === "item")
        this.inventory.enter();
    else
        this.reloadBeasts(); }
    leave() { this.active = !1, this.generation++, this.reader++, this.friendReader++, this.inventory.leave(), this.busy = this.loading = !1; }
    get bagUnavailable() { return !this.inventory.bag || this.inventory.bagLoading || !!this.inventory.bagError; }
    get selected() { var _a; return (_a = this.inventory.bag) === null || _a === void 0 ? void 0 : _a.items.find((e) => { var _a; return e.id === ((_a = this.selectedRef) === null || _a === void 0 ? void 0 : _a.id) && e.revision === this.selectedRef.revision; }); }
    get beast() { var _a; return (_a = this.view) === null || _a === void 0 ? void 0 : _a.beasts.find((e) => e.id === this.beastId); }
    get blockReason() { let e = this.beast; return e && this.view ? (0, official_chunk_jwqx9dg7_js_1.Fb)(e, e.ownerCultivatorId, e.revision, this.view.lineup) : null; }
    get quote() { return T(Number(this.price) || 0, this.assetType === "beast" ? 1 : Number(this.quantity) || 0); }
    choose(e) { if (!this.active || this.busy || this.bagUnavailable)
        return !1; let i = P(e); if (i)
        return this.inform(i), !1; return this.selectedRef = e, this.quantity = "1", this.changed(), !0; }
    async reloadBeasts() { if (!this.active)
        return; let e = this.generation, i = ++this.reader; this.view = void 0, this.loading = !0, this.error = "", this.changed(); try {
        let t = await (0, official_chunk_h2eh160v_js_1.Lb)("/api/combat-v6/beasts");
        if (this.active && e === this.generation && i === this.reader)
            this.view = t;
    }
    catch (t) {
        if (this.active && e === this.generation && i === this.reader)
            this.error = t instanceof Error ? t.message : "灵兽读取失败";
    }
    finally {
        if (this.active && e === this.generation && i === this.reader)
            this.loading = !1, this.changed();
    } }
    async setVisibility(e) { var _a; if (!this.active || this.busy)
        return; this.visibility = e; let i = this.generation, t = ++this.friendReader; if (this.changed(), e !== "private")
        return; try {
        let r = await (0, official_chunk_h2eh160v_js_1.Gb)("/api/friends");
        if (this.active && i === this.generation && t === this.friendReader)
            this.friends = (_a = r.friends) !== null && _a !== void 0 ? _a : [];
    }
    catch (r) {
        if (this.active && i === this.generation && t === this.friendReader)
            this.error = r instanceof Error ? r.message : "好友读取失败";
    }
    finally {
        if (this.active && i === this.generation && t === this.friendReader)
            this.changed();
    } }
    async submit() { var _a; if (!this.active || this.busy)
        return !1; let e = this.selected, i = this.beast, t = this.assetType === "beast"; if (t ? !i || !this.view : !e || this.bagUnavailable)
        return !1; let r = t ? this.blockReason : P(e); if (r) {
        if (t)
            this.error = r;
        else
            this.inform(r);
        return this.changed(), !1;
    } let s = { price: Number(this.price), visibility: this.visibility, ...this.visibility === "private" ? { targetCultivatorId: this.target } : {} }, o = t ? { beastId: i.id, expectedRevision: i.revision, ...s } : { itemId: e.id, revision: e.revision, quantity: Number(this.quantity), ...s }, n = JSON.stringify(o); if (((_a = this.attempt) === null || _a === void 0 ? void 0 : _a.key) !== n)
        this.attempt = { key: n, id: (0, official_chunk_wje6zqc2_js_1.Ee)() }; let h = (t ? de : ue).safeParse({ ...o, requestId: this.attempt.id }); if (!h.success || !t && (Number(this.quantity) > e.quantity || Number(this.price) > C(e))) {
        let a = t ? "请检查单价与专属道友" : "请检查数量、单价与专属道友";
        if (t)
            this.error = a;
        else
            this.inform(a);
        return this.changed(), !1;
    } let l = this.generation, c = () => this.active && l === this.generation; this.busy = !0, this.error = "", this.changed(); try {
        let a = await (0, official_chunk_h2eh160v_js_1.Mb)(t ? "/api/auction/list-beast" : "/api/auction/list", h.data);
        if (!c())
            return !1;
        return this.inform(a.message), this.refreshPlayer().catch(() => { }), this.success(), !0;
    }
    catch (a) {
        if (c()) {
            let u = a instanceof Error ? a.message : "上架失败";
            if (t)
                this.error = u, await this.reloadBeastsPreservingError();
            else
                this.inform(u), await this.inventory.loadBag();
        }
        return !1;
    }
    finally {
        if (c())
            this.busy = !1, this.changed();
    } }
    async reloadBeastsPreservingError() { let e = this.error, i = this.generation; if (await this.reloadBeasts(), this.active && i === this.generation && !this.error)
        this.error = e; }
}
exports.AuctionConsignmentModel = K;
class Y {
    constructor(e, i, t, r, s) {
        this.open = !1;
        this.bagOpen = !1;
        this.bagScroll = 0;
        this.close = () => { if (this.model.busy)
            return; this.reset(), this.u.modalScroll = 0, this.u.invalidate(); };
        this.u = e;
        this.stones = s;
        this.model = new K(() => e.invalidate(), () => { this.reset(), t(); }, r, i), this.controls = new official_chunk_jwqx9dg7_js_1.Ab(e), this.preview = new official_chunk_h2eh160v_js_1.te(e), this.beastPreview = new official_chunk_jwqx9dg7_js_1.Cb(e);
    }
    enter(e) { this.reset(), this.open = !0, this.model.enter(e), this.u.modalScroll = 0, this.u.invalidate(); }
    reset() { this.model.leave(), this.controls.reset(), this.preview.close(), this.beastPreview.close(), this.open = this.bagOpen = !1; }
    button(e, i, t, r, s = !1, o = !1) { let n = this.u; if (n.ctx.save(), s)
        n.ctx.globalAlpha *= 0.5; n.inert(s, () => n.button(e, i, t, r, o ? official_chunk_wje6zqc2_js_1.Be.crimson : official_chunk_wje6zqc2_js_1.Be.ink)), n.ctx.restore(); }
    showBag() { this.bagScroll = this.u.modalScroll, this.bagOpen = !0, this.u.modalScroll = 0, this.u.invalidate(); }
    hideBag() { this.bagOpen = !1, this.u.modalScroll = this.bagScroll, this.u.invalidate(); }
    bag(e) { var _a; let i = this.u, t = this.model, r = t.inventory, s = new official_chunk_wje6zqc2_js_1.Ce(i, e); if (s.block(32.32, (h, l) => { var _a, _b, _c, _d; i.text(`\uD83D\uDCB0 ${(_b = (_a = this.stones()) === null || _a === void 0 ? void 0 : _a.toLocaleString()) !== null && _b !== void 0 ? _b : "—"} 灵石　${(_d = (_c = r.bag) === null || _c === void 0 ? void 0 : _c.used) !== null && _d !== void 0 ? _d : "—"} / 40`, h, l + 16, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), this.button("刷新", h + e - i.buttonWidth("刷新"), l, () => void r.loadBag(), t.busy || r.bagLoading); }), s.gap(12), t.error || r.bagError)
        s.text(t.error || r.bagError, 14, 20, official_chunk_wje6zqc2_js_1.Be.crimson), s.gap(12); let o = (e - 24) / 5, n = new Map((_a = r.bag) === null || _a === void 0 ? void 0 : _a.items.map((h) => [h.slotIndex, h])); return s.block(8 * (o + 6) - 6, (h, l) => { var _a; for (let c = 0; c < 40; c++) {
        let a = n.get(c), u = h + c % 5 * (o + 6), p = l + Math.floor(c / 5) * (o + 6), f = a ? P(a) : null, b = () => { if (a && t.choose(a))
            this.preview.close(), this.hideBag(); };
        (0, official_chunk_h2eh160v_js_1.ve)(i, u, p, o, a, { disabled: !a || t.busy || t.bagUnavailable, selected: !!a && a.id === ((_a = t.selected) === null || _a === void 0 ? void 0 : _a.id), badge: a && !f ? "可选" : void 0, quick: a && !f ? b : void 0, preview: a ? () => this.preview.open(a, { x: u, y: p, w: o, h: o }, void 0, void 0, (g) => { let m = new official_chunk_wje6zqc2_js_1.Ce(i, g); if (f)
                m.text(f, 14, 20, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), m.gap(8); return m.block(32.32, (A, N) => this.button("寄售", A, N, b, t.busy || t.bagUnavailable || !!f)), m; }) : void 0 });
    } }), s; }
    quoteText(e, i, t) { var _a; let r = this.u, s = [], o = 0, n = 0; for (let h of (_a = i.match(/\d[\d,]*|./gu)) !== null && _a !== void 0 ? _a : []) {
        let l = /^\d/.test(h) ? "monospace" : r.bodyFont, c = r.measure(h, 14, l);
        if (o && o + c > e.width)
            o = 0, n += 20;
        s.push({ text: h, font: l, x: o, y: n }), o += c;
    } e.block(n + 20, (h, l) => s.forEach((c) => r.text(c.text, h + c.x, l + c.y + 10, 14, t, c.font))); }
    form(e) { var _a, _b; let i = this.u, t = this.model, r = this.controls, s = new official_chunk_wje6zqc2_js_1.Ce(i, e), o = t.assetType === "beast", n = t.selected, h = t.beast, l = t.busy || !o && t.bagUnavailable; if (t.error)
        s.text(t.error, 14, 20, official_chunk_wje6zqc2_js_1.Be.crimson), s.gap(16); if (o) {
        if (!h) {
            s.block(32.32, (u, p) => { i.text(t.view ? "选择灵兽查看详情" : "正在读取灵兽……", u, p + 16, 14), this.button("刷新", u + e - i.buttonWidth("刷新"), p, () => void t.reloadBeasts(), t.busy); }), s.gap(16);
            for (let u of (_b = (_a = t.view) === null || _a === void 0 ? void 0 : _a.beasts) !== null && _b !== void 0 ? _b : []) {
                let p = z(i, u, e, () => { t.beastId = u.id, this.beastPreview.close(), i.modalScroll = 0, i.invalidate(); }, void 0, t.busy);
                s.block(p.height, (b, g) => p.paint(b, g));
                let f = (0, official_chunk_jwqx9dg7_js_1.Fb)(u, u.ownerCultivatorId, u.revision, t.view.lineup);
                if (f)
                    s.gap(4), s.text(f, 12, 16, official_chunk_wje6zqc2_js_1.Be.crimson);
                s.gap(12);
            }
            if (t.view && !t.view.beasts.length)
                s.text("当前没有灵兽", 14, 24);
            return s;
        }
        s.block(32.32, (u, p) => this.button("重选灵兽", u, p, () => { t.beastId = "", this.beastPreview.close(), i.modalScroll = 0, i.invalidate(); }, t.busy)), s.gap(16);
        let a = this.beastPreview.content(h, e);
        if (s.block(a.height, (u, p) => a.paint(u, p)), t.blockReason)
            s.gap(16), s.text(t.blockReason, 14, 24, official_chunk_wje6zqc2_js_1.Be.crimson);
        s.gap(16);
    }
    else {
        let a = new official_chunk_wje6zqc2_js_1.Ce(i, e - 96);
        if (n)
            r.input(a, "数量", t.quantity, (u) => t.quantity = u, l, "", 3);
        else
            a.text("从随身物品选择一叠寄售", 14, 20, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
        if (s.block(Math.max(80, a.height), (u, p) => { (0, official_chunk_h2eh160v_js_1.ve)(i, u, p, 80, n, { emptyLabel: "选择物品", disabled: t.busy, quick: () => this.showBag(), preview: n ? () => this.preview.open(n, { x: u, y: p, w: 80, h: 80 }, void 0, void 0, (f) => { let b = new official_chunk_wje6zqc2_js_1.Ce(i, f); return b.block(32.32, (g, m) => this.button("移出", g, m, () => { t.selectedRef = void 0, this.preview.close(); }, l)), b; }) : void 0 }), a.paint(u + 96, p + (80 - a.height) / 2); }), s.gap(16), t.selectedRef)
            s.block(32.32, (u, p) => this.button("移出物品", u, p, () => { t.selectedRef = void 0, i.invalidate(); }, l)), s.gap(16);
        if (t.selectedRef && !n)
            s.text("所选物品已变化，请重新选择。", 14, 20), s.gap(16);
    } if (r.input(s, o ? "单价（灵石／只）" : "单价（灵石／件）", t.price, (a) => t.price = a, l, "", 12), s.gap(16), o || n)
        s.text(`单价上限 ${(o ? M : C(n)).toLocaleString()} 灵石`, 12, 16, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), s.gap(16); if (r.select(s, "寄售范围", t.visibility, [{ value: "public", label: "公开寄售" }, { value: "private", label: "好友专属" }], (a) => void t.setVisibility(a), l), s.gap(16), t.visibility === "private")
        r.select(s, "专属道友", t.target, [{ value: "", label: "选择好友" }, ...t.friends.map((a) => ({ value: a.id, label: o ? a.name : `${a.name} · ${a.realm}${a.realmStage}` }))], (a) => t.target = a, l), s.gap(16), s.text("上架消耗一张随身拍卖行贵宾符", 12, 16, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), s.gap(16); let c = t.quote; return this.quoteText(s, o ? `预计税费 ${c.feeAmount.toLocaleString()}，实得 ${c.sellerAmount.toLocaleString()} 灵石。` : `按本次数量整批成交预计税费 ${c.feeAmount.toLocaleString()}，实得 ${c.sellerAmount.toLocaleString()} 灵石。分次成交按每次交易计税。`, o ? official_chunk_wje6zqc2_js_1.Be.ink : official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), s.gap(16), s.text(o ? "寄售48小时，每单一只。上架后暂离灵兽仓，成交款或退回灵兽通过邮件领取。" : "寄售48小时；成交款与未售物品通过邮件收取。", 12, 16, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), s; }
    paint() { var _a, _b, _c, _d; if (!this.open)
        return; let e = this.u, i = this.model, t = e.modalScroll, r = (_c = (_b = (_a = this.preview.underlayScroll) !== null && _a !== void 0 ? _a : this.controls.underlayScroll) !== null && _b !== void 0 ? _b : this.beastPreview.skillUnderlayScroll) !== null && _c !== void 0 ? _c : t; e.modalScroll = this.bagOpen ? this.bagScroll : r; let s = i.assetType === "beast", o = !s || !!i.beast; if ((0, official_chunk_wje6zqc2_js_1.He)(e, { title: s ? "寄售灵兽" : "寄售道具", style: "modal", rows: [], content: this.form(Math.min(448, e.width - 24) - 34), actions: o ? [{ label: "取消", disabled: i.busy, run: this.close }, { label: i.busy ? "处理中…" : "确认上架", primary: !0, disabled: i.busy || (s ? !!i.blockReason : !i.selected || i.bagUnavailable), run: () => void i.submit() }] : [{ label: "取消", run: this.close }] }, () => { if (i.busy)
        return; if (this.bagOpen)
        this.hideBag();
    else
        this.close(); }), this.bagOpen)
        e.modalScroll = (_d = this.preview.underlayScroll) !== null && _d !== void 0 ? _d : t, (0, official_chunk_wje6zqc2_js_1.He)(e, { title: "随身物品", rows: [], content: this.bag(e.width - 32) }, () => this.hideBag()); e.modalScroll = t, this.controls.paintOverlay(), this.preview.paint(), this.beastPreview.paintSkill(); }
}
exports.AuctionConsignmentView = Y;
class Me {
    constructor(e, i) {
        this.owner = "";
        this.href = "/game/auction";
        this.help = !1;
        this.listKey = "";
        this.u = e;
        this.home = i;
        let t = (r) => official_chunk_wje6zqc2_js_1.De.showToast({ title: r, icon: "none" });
        this.model = new F(() => e.invalidate(), () => { var _a; let r = (_a = i.view()) === null || _a === void 0 ? void 0 : _a.cultivator; return (r === null || r === void 0 ? void 0 : r.id) ? { id: r.id, spiritStones: r.spirit_stones } : void 0; }, () => i.load(), t), this.listings = new W(e, this.model, () => { var _a; let r = (_a = i.view()) === null || _a === void 0 ? void 0 : _a.cultivator; return (r === null || r === void 0 ? void 0 : r.id) ? { id: r.id, level: (0, official_chunk_wje6zqc2_js_1.vf)(r.realm, r.realm_stage) } : void 0; }), this.filters = new E(e, this.model), this.consignment = new Y(e, () => i.load(), () => this.model.listed(), t, () => { var _a, _b; return (_b = (_a = i.baseline) === null || _a === void 0 ? void 0 : _a.resources.currency) === null || _b === void 0 ? void 0 : _b.data.spiritStones; });
    }
    enter(e = "/game/auction") { this.leave(), this.href = e, this.sync(); }
    leave() { this.model.leave(), this.listings.reset(), this.filters.reset(), this.consignment.reset(), this.owner = "", this.help = !1, this.listKey = ""; }
    sync() { var _a, _b; let e = (_b = (_a = this.home.view()) === null || _a === void 0 ? void 0 : _a.cultivator.id) !== null && _b !== void 0 ? _b : ""; if (e && e !== this.owner) {
        let t = this.href;
        this.leave(), this.owner = e, this.model.enter(e, t);
    } let i = this.model.query.toString(); if (i !== this.listKey)
        this.listKey = i, this.listings.reset(), this.u.scroll = 0; }
    body(e) { var _a; let i = this.u, t = this.model, r = t.filters, s = new official_chunk_wje6zqc2_js_1.Ce(i, e), o = r.mine, n = i.buttonWidth(o ? "返回市场" : "我的寄售") + 4 + i.buttonWidth("上架") + 4 + 24, h = Math.max(80, e - n - 8); s.block(44, (c, a) => { for (let [p, f] of ["item", "beast"].entries()) {
        let b = h / 2, g = r.assetType === f, m = f === "item" ? "道具" : "灵兽";
        i.text(m, c + p * b + (b - 28) / 2, a + 22, 14, g ? official_chunk_wje6zqc2_js_1.Be.ink : official_chunk_wje6zqc2_js_1.Be["ink-secondary"], i.bodyFont, g), i.rect(c + p * b, a + 42, b, g ? 2 : 1, g ? official_chunk_wje6zqc2_js_1.Be.crimson : "rgba(44,24,16,.15)"), i.hit(c + p * b, a, b, 44, () => t.setAsset(f));
    } let u = c + e - n; i.button(o ? "返回市场" : "我的寄售", u, a + 6, () => t.update({ tab: o ? null : "my" })), u += i.buttonWidth(o ? "返回市场" : "我的寄售") + 4, i.button("上架", u, a + 6, () => this.consignment.enter(r.assetType), official_chunk_wje6zqc2_js_1.Be.crimson), i.text("?", c + e - 16, a + 22, 16, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), i.hit(c + e - 24, a, 24, 44, () => { this.help = !0, i.modalScroll = 0, i.invalidate(); }); }), s.gap(16); let l = Number(r.assetType === "item" && r.itemType !== "all") + Number(r.category !== "all") + Number(r.quality !== "all") + Number(!!r.searchValue.trim()) + Number(r.sortBy !== "latest"); if (s.block(44, (c, a) => { i.button(`筛选${l ? ` · ${l}` : ""}`, c, a + 6, () => this.filters.open(), l ? official_chunk_wje6zqc2_js_1.Be.crimson : official_chunk_wje6zqc2_js_1.Be.ink); let u = `${o ? "我的寄售" : "在售"}${t.data ? ` · ${t.data.pagination.total} 单` : ""}`, p = i.buttonWidth("刷新"); i.text(u, c + e - p - 8 - i.measure(u, 12), a + 22, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), i.button("刷新", c + e - p, a + 6, () => void t.reload()); }), s.gap(16), t.loading || !t.data && !t.error)
        s.text("正在获取拍卖列表……", 14, 24, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
    else if (t.error)
        s.text(t.error, 14, 24, official_chunk_wje6zqc2_js_1.Be.crimson), s.block(32.32, (c, a) => i.button("重试", c, a, () => void t.reload()));
    else if (!((_a = t.data) === null || _a === void 0 ? void 0 : _a.listings.length))
        s.text(o ? "当前没有符合条件的寄售" : "当前没有符合条件的货单", 14, 24);
    else {
        let c = this.listings.flow(e);
        if (s.block(c.height, (a, u) => c.paint(a, u)), t.data.pagination.totalPages > 1)
            s.gap(16), s.block(32.32, (a, u) => { let p = `${r.page} / ${t.data.pagination.totalPages}`, f = i.buttonWidth("上一页") + i.buttonWidth("下一页") + i.measure(p, 14, "monospace") + 32, b = a + (e - f) / 2; i.inert(r.page <= 1, () => i.button("上一页", b, u, () => t.update({ page: String(r.page - 1) }, !1))), i.text(p, b + i.buttonWidth("上一页") + 16, u + 16, 14, official_chunk_wje6zqc2_js_1.Be.ink, "monospace"), i.inert(r.page >= t.data.pagination.totalPages, () => i.button("下一页", b + f - i.buttonWidth("下一页"), u, () => t.update({ page: String(r.page + 1) }, !1))); });
    } return s; }
    paint(e, i) { this.sync(); let t = this.u, r = t.width - 56, s = this.body(r), o = t.lines("珍材、道装与灵兽在此寄售，成交后由传音送达。", r, 14), n = 84.2 + (o.length - 1) * 24, h = n + 32 + s.height, l = e + 12 - t.scroll; t.clip(0, e, t.width, i - e, () => { t.rect(12, l, t.width - 24, h, "rgba(248,243,230,.82)"), t.text("拍卖行", 28, l + 28, 23.2, official_chunk_wje6zqc2_js_1.Be.ink, t.headingFont); let c = 36 + t.measure("拍卖行", 23.2, t.headingFont); t.text("/", c, l + 31, 14, official_chunk_wje6zqc2_js_1.Be["battle-muted"]), t.tracked("交易", c + 14, l + 31, 12.48, 1.9968, official_chunk_wje6zqc2_js_1.Be["battle-muted"]), o.forEach((a, u) => t.text(a, 28, l + 60 + u * 24, 14, official_chunk_wje6zqc2_js_1.Be["ink-secondary"])), t.line(28, l + n - 1, r), s.paint(28, l + n + 16); }), t.scrollMax = Math.max(0, e + 24 + h - i); }
    paintOverlay() { if (this.listings.paintOverlay(), this.filters.paint(), this.consignment.paint(), this.help) {
        let e = new official_chunk_wje6zqc2_js_1.Ce(this.u, Math.min(448, this.u.width - 24) - 34);
        for (let i of ["道具与灵兽合计最多寄售5单，每单保留48小时。", "堆叠道具按件计价，可选择购买数量。灵兽每单1只。", "成交按单价适用3%～15%超额累进税率，成交款与退回物品通过邮件领取。", "好友专属寄售须消耗1张随身拍卖行贵宾符，仅卖家与指定道友可见。同账号不可回购。"])
            e.text(i, 14, 24), e.gap(8);
        (0, official_chunk_wje6zqc2_js_1.He)(this.u, { title: "拍卖行规则", style: "modal", rows: [], content: e }, () => { this.help = !1, this.u.modalScroll = 0, this.u.invalidate(); });
    } }
}
exports.AuctionPage = Me;
