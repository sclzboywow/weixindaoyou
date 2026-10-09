"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pb = exports.ob = exports.nb = exports.mb = exports.lb = exports.kb = exports.jb = exports.ib = void 0;
const official_chunk_nx6d9wvp_js_1 = require("./official-chunk-nx6d9wvp.js");
const official_chunk_h2eh160v_js_1 = require("./official-chunk-h2eh160v.js");
const official_chunk_wje6zqc2_js_1 = require("./official-chunk-wje6zqc2.js");
var y = { minMaterialKinds: 1, maxMaterialKinds: 6, minQuantityPerMaterial: 1, maxQuantityPerMaterial: official_chunk_h2eh160v_js_1.ye }, X = official_chunk_h2eh160v_js_1.ye;
var T = y.minQuantityPerMaterial, M = y.maxMaterialKinds;
var P = () => ({ ids: [], map: {}, doses: {} }), I = () => ({ key: null, estimatedSpiritStones: null, estimatedQi: null, validation: null, canAfford: !0, error: null, loading: !1 }), Y = () => ({ consumable: null, consumables: [], craftedConsumables: [], yieldProfile: null, formulaDiscovery: null, formulaProgress: null }), k = () => ({ value: null, loading: !1, error: null, cooldownRemaining: 0 });
class nn {
    constructor(t, h, n, c = 1800) {
        this.phase = "preparing";
        this.mode = "improvised";
        this.intent = "";
        this.formula = null;
        this.materials = P();
        this.readiness = I();
        this.analysis = k();
        this.result = Y();
        this.submitting = !1;
        this.status = "";
        this.discoveryPending = !1;
        this.active = !1;
        this.generation = 0;
        this.reader = 0;
        this.analyzer = 0;
        this.analysisKey = null;
        this.pulses = [];
        this.changed = t;
        this.refreshPlayer = h;
        this.inform = n;
        this.ceremonyMs = c;
    }
    enter(t) { this.leave(), this.active = !0, this.sectContext = t, this.mode = "improvised", this.phase = "preparing", this.intent = "", this.formula = null, this.materials = P(), this.readiness = I(), this.analysis = k(), this.result = Y(), this.status = "", this.changed(); }
    leave() { var _a; this.active = !1, this.generation++, this.reader++, this.analyzer++, clearTimeout(this.expiry), clearInterval(this.cooldown), this.pulses.forEach(clearTimeout), this.pulses = [], (_a = this.stopCeremony) === null || _a === void 0 ? void 0 : _a.call(this), this.stopCeremony = void 0, this.submitting = this.discoveryPending = !1; }
    get locked() { return this.submitting || this.phase === "firing" || this.phase === "result"; }
    get materialQuantities() { return Object.fromEntries(this.materials.ids.map((t) => { var _a; return [t, (_a = this.materials.doses[t]) !== null && _a !== void 0 ? _a : T]; })); }
    get materialVersions() { return Object.fromEntries(this.materials.ids.map((t) => { var _a; return [t, JSON.stringify((_a = this.materials.map[t].members) !== null && _a !== void 0 ? _a : [])]; })); }
    get selectionKey() { var _a, _c; return JSON.stringify({ mode: this.mode, formulaId: (_c = (_a = this.formula) === null || _a === void 0 ? void 0 : _a.id) !== null && _c !== void 0 ? _c : null, ids: this.materials.ids, materialQuantities: this.materialQuantities, materialVersions: this.materialVersions }); }
    get totalDose() { return Object.values(this.materialQuantities).reduce((t, h) => t + h, 0); }
    get qiCost() { var _a; return (_a = this.readiness.estimatedQi) !== null && _a !== void 0 ? _a : 1; }
    get readyForReadinessCheck() { return this.materials.ids.length > 0 && (this.mode === "improvised" || !!this.formula); }
    get readyForCostConfirmation() { var _a; return this.readyForReadinessCheck && this.readiness.key === this.selectionKey && this.readiness.estimatedSpiritStones !== null && !this.readiness.loading && ((_a = this.readiness.validation) === null || _a === void 0 ? void 0 : _a.valid) !== !1 && this.readiness.canAfford && !this.readiness.error; }
    get readyForFormulaAnalysis() { return this.mode === "formula" && !!this.formula && this.readyForCostConfirmation; }
    get readyForImprovisedFire() { return this.mode === "improvised" && this.phase === "preparing" && this.readyForCostConfirmation && !!this.intent.trim(); }
    get readyForFormulaFire() { var _a; return this.mode === "formula" && this.phase === "observing" && this.readyForCostConfirmation && !!((_a = this.analysis.value) === null || _a === void 0 ? void 0 : _a.analysisId) && this.analysisKey === this.selectionKey; }
    clearAnalysis() { clearTimeout(this.expiry), this.expiry = void 0, this.analyzer++, this.analysisKey = null, this.analysis = { ...k(), cooldownRemaining: this.analysis.cooldownRemaining }; }
    invalidateObservation() { this.phase = "preparing", this.readiness = I(), this.result = Y(), this.status = "", this.clearAnalysis(), this.checkReadiness(), this.changed(); }
    setMode(t) { if (this.locked || t === this.mode)
        return; this.mode = t, this.invalidateObservation(); }
    setIntent(t) { if (this.locked)
        return; this.intent = t, this.phase = "preparing", this.result = Y(), this.status = "", this.clearAnalysis(), this.changed(); }
    selectFormula(t) { if (this.submitting)
        return; if (this.phase === "result")
        this.materials = P(), this.intent = ""; this.formula = t, this.mode = "formula", this.invalidateObservation(); }
    addMaterial(t, h = T) { var _a; if (this.submitting || !t.id)
        return "limit-reached"; let n = Math.max(T, Math.min(X, (_a = t.quantity) !== null && _a !== void 0 ? _a : 1, Math.floor(h) || 1)); if (this.materials.ids.includes(t.id))
        return this.materials.doses = { ...this.materials.doses, [t.id]: n }, this.invalidateObservation(), "already-added"; if (this.phase !== "result" && this.materials.ids.length >= M)
        return "limit-reached"; if (this.phase === "result")
        this.materials = P(); return this.materials = { ids: [...this.materials.ids, t.id], map: { ...this.materials.map, [t.id]: t }, doses: { ...this.materials.doses, [t.id]: n } }, this.invalidateObservation(), "added"; }
    removeMaterial(t) { if (this.locked)
        return; let h = { ...this.materials.map }, n = { ...this.materials.doses }; delete h[t], delete n[t], this.materials = { ids: this.materials.ids.filter((c) => c !== t), map: h, doses: n }, this.invalidateObservation(); }
    setMaterialDose(t, h) { var _a; if (this.locked || !this.materials.map[t])
        return; this.materials.doses = { ...this.materials.doses, [t]: Math.max(T, Math.min(X, Math.max(T, (_a = this.materials.map[t].quantity) !== null && _a !== void 0 ? _a : X), Math.floor(h) || 1)) }, this.invalidateObservation(); }
    async checkReadiness() { var _a; let t = ++this.reader; if (!this.active)
        return; if (!this.readyForReadinessCheck) {
        this.readiness = I(), this.changed();
        return;
    } let h = this.selectionKey, n = new URLSearchParams({ craftType: "alchemy", alchemyMode: this.mode, materialIds: this.materials.ids.join(","), materialQuantities: JSON.stringify(this.materialQuantities), materialVersions: JSON.stringify(this.materialVersions) }); if (this.mode === "formula" && ((_a = this.formula) === null || _a === void 0 ? void 0 : _a.id))
        n.set("formulaId", this.formula.id); this.readiness = { ...this.readiness, key: h, loading: !0, error: null }, this.changed(); try {
        let c = await (0, official_chunk_h2eh160v_js_1.Lb)(`/api/craft?${n}`);
        if (this.active && t === this.reader && h === this.selectionKey)
            this.readiness = { key: h, estimatedSpiritStones: c.cost.spiritStones, estimatedQi: c.cost.qi, validation: c.validation, canAfford: c.canAfford, error: null, loading: !1 };
    }
    catch (c) {
        if (this.active && t === this.reader)
            this.readiness = { ...I(), key: h, error: c instanceof Error ? c.message : "材料检查失败" };
    }
    finally {
        if (this.active && t === this.reader)
            this.changed();
    } }
    startCooldown() { if (clearInterval(this.cooldown), this.analysis.cooldownRemaining > 0)
        this.cooldown = setInterval(() => { if (this.analysis.cooldownRemaining = Math.max(0, this.analysis.cooldownRemaining - 1), !this.analysis.cooldownRemaining)
            clearInterval(this.cooldown); this.changed(); }, 1000); }
    async analyzeFormula() { var _a; if (!this.active || this.submitting || this.analysis.loading || !this.readyForFormulaAnalysis || this.analysis.cooldownRemaining > 0)
        return !1; let t = ++this.analyzer, h = this.selectionKey; this.analysis = { ...this.analysis, loading: !0, error: null }, this.changed(); try {
        let n = await (0, official_chunk_h2eh160v_js_1.Mb)(`/api/alchemy/formulas/${this.formula.id}/analyze`, { materialIds: [...this.materials.ids], materialQuantities: this.materialQuantities, materialVersions: this.materialVersions });
        if (!this.active || t !== this.analyzer || h !== this.selectionKey)
            return !1;
        return this.analysisKey = h, this.analysis = { value: n, loading: !1, error: null, cooldownRemaining: n.cooldownRemainingSeconds }, clearTimeout(this.expiry), this.expiry = setTimeout(() => { if (!this.active || t !== this.analyzer)
            return; if (this.analysisKey = null, this.analysis = { ...k(), cooldownRemaining: this.analysis.cooldownRemaining, error: "本次丹方分析已过期，请重新查看炼制预览。" }, this.phase !== "firing" && this.phase !== "result")
            this.phase = "preparing"; this.changed(); }, n.expiresInSeconds * 1000), this.startCooldown(), this.phase = "observing", !0;
    }
    catch (n) {
        if (this.active && t === this.analyzer) {
            let c = (_a = n === null || n === void 0 ? void 0 : n.data) === null || _a === void 0 ? void 0 : _a.remainingSeconds;
            this.analysis = { ...this.analysis, value: null, loading: !1, error: n instanceof Error ? n.message : "丹方分析失败", ...typeof c === "number" ? { cooldownRemaining: c } : {} }, this.startCooldown();
        }
        return !1;
    }
    finally {
        if (this.active && t === this.analyzer)
            this.changed();
    } }
    returnToPreparation() { if (this.submitting)
        return; this.phase = "preparing", this.changed(); }
    get confirmation() { var _a, _c, _d; return [[this.mode === "improvised" ? "炼制目标" : "丹方", this.mode === "improvised" ? this.intent.trim() : (_c = (_a = this.formula) === null || _a === void 0 ? void 0 : _a.name) !== null && _c !== void 0 ? _c : "未选择"], ["材料投入", `${this.materials.ids.length} 味 · 共 ${this.totalDose} 份`], ["灵石消耗", `${(_d = this.readiness.estimatedSpiritStones) !== null && _d !== void 0 ? _d : 0} 枚`], ["天地灵气", `${this.qiCost} 点`], ...this.mode === "improvised" ? [["结果说明", "随心炼制无法预知丹药效果、品阶与数量，结果将在开鼎后揭晓。"]] : []]; }
    async submit(t) { var _a, _c, _d, _e, _f, _g, _h, _j; if (!this.active || this.submitting || this.mode !== t || !(t === "improvised" ? this.readyForImprovisedFire : this.readyForFormulaFire))
        return; let h = this.generation, n = () => this.active && h === this.generation, c = t === "improvised", r = { craftType: "alchemy", alchemyMode: this.mode, materialIds: [...this.materials.ids], materialQuantities: this.materialQuantities, materialVersions: this.materialVersions, ...c ? { userPrompt: this.intent.trim() } : { formulaId: (_a = this.formula) === null || _a === void 0 ? void 0 : _a.id, analysisId: (_c = this.analysis.value) === null || _c === void 0 ? void 0 : _c.analysisId } }; this.submitting = !0, this.phase = "firing", this.result = Y(), this.status = c ? "炉门闭合，陌生药气正在火中交汇……" : "炉门闭合，地火正沿丹方阵纹攀升……"; let a = Date.now(); for (let [g, V] of [[700, c ? "炉腹轰鸣，材料正在火中发生未知变化……" : "炉腹轰鸣，杂气正按既定火路逐层煅去……"], [1500, c ? "炉火渐稳，最终结果仍要等开鼎才能知晓……" : "药蕴回旋，丹药正在不同火层中凝形……"]])
        this.pulses.push(setTimeout(() => { if (n())
            this.status = V, this.changed(); }, g)); this.changed(); try {
        let g = await (0, official_chunk_h2eh160v_js_1.Mb)("/api/craft", r);
        if (!n())
            return;
        if (!g.consumable)
            throw Error("炉中未能凝丹");
        await this.refreshPlayer().catch(() => { });
        let V = this.ceremonyMs - (Date.now() - a);
        if (V > 0)
            await new Promise(($) => { let s = setTimeout($, V); this.stopCeremony = () => { clearTimeout(s), $(); }; });
        if (!n())
            return;
        this.result = { consumable: g.consumable, consumables: (_d = g.consumables) !== null && _d !== void 0 ? _d : [g.consumable], craftedConsumables: (_f = (_e = g.craftedConsumables) !== null && _e !== void 0 ? _e : g.consumables) !== null && _f !== void 0 ? _f : [g.consumable], yieldProfile: (_g = g.yieldProfile) !== null && _g !== void 0 ? _g : null, formulaDiscovery: (_h = g.formulaDiscovery) !== null && _h !== void 0 ? _h : null, formulaProgress: (_j = g.formulaProgress) !== null && _j !== void 0 ? _j : null }, this.status = "炉鸣三响，丹香已从炉隙逸出。", this.phase = "result";
    }
    catch (g) {
        if (n()) {
            let V = g instanceof Error ? g.message : "炼丹失败", $ = !c && (V.includes("请先推演药路") || V.includes("材料已发生变化"));
            if (this.status = V, $)
                this.clearAnalysis();
            this.phase = c || $ ? "preparing" : "observing", this.inform(V);
        }
    }
    finally {
        if (n())
            this.pulses.forEach(clearTimeout), this.pulses = [], this.stopCeremony = void 0, this.submitting = !1, this.changed();
    } }
    async resolveDiscovery(t) { let h = this.result.formulaDiscovery; if (!this.active || !h || this.discoveryPending)
        return; let n = this.generation; this.discoveryPending = !0, this.changed(); try {
        let c = await (0, official_chunk_h2eh160v_js_1.Mb)("/api/alchemy/formulas/discovery/confirm", { token: h.token, accept: t });
        if (this.active && n === this.generation) {
            if (this.result = { ...this.result, formulaDiscovery: null }, t)
                this.inform((c === null || c === void 0 ? void 0 : c.formula) ? `已将【${c.formula.name}】收入玉简。` : "新丹方已收入玉简。");
        }
    }
    catch (c) {
        if (this.active && n === this.generation)
            this.inform(c instanceof Error ? c.message : "丹方留存失败");
    }
    finally {
        if (this.active && n === this.generation)
            this.discoveryPending = !1, this.changed();
    } }
    startNextBatch() { if (this.submitting)
        return; this.intent = "", this.formula = null, this.materials = P(), this.invalidateObservation(); }
    resetDraft() { if (this.submitting)
        return; this.mode = "improvised", this.startNextBatch(); }
}
exports.ib = nn;
var $n = (t) => Array.from({ length: t }, (h, n) => { let c = n * 2 * Math.PI / t - Math.PI / 2; return [0.5 + 0.4 * Math.cos(c), 0.5 + 0.4 * Math.sin(c)]; });
function p(t, h) { let [n, c] = h === "in" ? [0.42, 1] : h === "out" ? [0, 0.58] : [0.42, 0.58], r = 0, a = 1; for (let V = 0; V < 14; V++) {
    let $ = (r + a) / 2;
    if (3 * (1 - $) ** 2 * $ * n + 3 * (1 - $) * $ * $ * c + $ * $ * $ < t)
        r = $;
    else
        a = $;
} let g = (r + a) / 2; return 3 * (1 - g) * g * g + g * g * g; }
class tn {
    constructor(t, h, n, c) {
        this.loaded = !1;
        this.loading = !1;
        this.error = "";
        this.generation = 0;
        this.revealed = !1;
        this.u = t;
        this.model = h;
        this.openBag = n;
        this.openFormula = c;
        this.preview = new official_chunk_h2eh160v_js_1.te(t);
    }
    enter() { this.reset(), this.load(); }
    reset() { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.generation++, clearTimeout(this.timer), this.timer = void 0, this.loading = !1, this.pendingAt = this.resultAt = void 0, this.result = void 0, this.revealed = !1, this.preview.close(); }
    load() { if (this.loaded || this.loading)
        return; this.loading = !0, this.error = ""; let t = this.generation; official_chunk_wje6zqc2_js_1.De.loadSubpackage({ name: "craft-alchemy", success: () => { if (t !== this.generation)
            return; this.loaded = !0, this.loading = !1, this.u.invalidate(); }, fail: () => { if (t !== this.generation)
            return; this.loading = !1, this.error = "炼丹炉素材加载失败", this.u.invalidate(); } }); }
    paint(t, h, n) { var _a, _c; let c = this.u, r = c.ctx, a = this.model, g = a.phase === "result" ? a.result.craftedConsumables[0] : void 0, V = a.mode === "formula" ? $n(7).slice(1) : $n(6), $ = (0, official_chunk_nx6d9wvp_js_1.zb)(); if (a.phase === "firing" && this.pendingAt === void 0)
        this.pendingAt = $; if (a.phase !== "firing")
        this.pendingAt = void 0; if (g !== this.result)
        this.result = g, this.resultAt = g ? $ : void 0, this.revealed = !1; let s = this.resultAt === void 0 ? 0 : $ - this.resultAt; if (g && !this.revealed && s >= 1100)
        this.revealed = !0; if (a.phase === "firing" || g && !this.revealed)
        clearTimeout(this.timer), this.timer = setTimeout(() => c.invalidate(), 33); if (r.save(), r.strokeStyle = "rgba(44,24,16,.1)", r.lineWidth = 1, r.beginPath(), r.arc(t + n / 2, h + n / 2, n * 0.4, 0, Math.PI * 2), r.stroke(), r.restore(), this.loaded) {
        if (r.save(), a.phase === "firing" || g) {
            if (r.shadowColor = a.phase === "firing" ? "rgba(178,80,30,.45)" : "rgba(178,80,30,.25)", r.shadowBlur = a.phase === "firing" ? 18 : 12, a.phase === "firing")
                r.globalAlpha = 0.75 + 0.25 * Math.cos(($ - this.pendingAt) / 2000 * Math.PI * 2);
        }
        (0, official_chunk_wje6zqc2_js_1.Ie)(c, "icon:xuanfire-furnace", t + n * 0.19, h + n * 0.16, n * 0.62, n * 0.7), r.restore();
    } if (a.mode === "formula") {
        let W = n * 0.19, Q = t + n * 0.5 - W / 2, v = h + n * 0.1 - W / 2;
        if (r.save(), a.locked)
            r.globalAlpha *= 0.6;
        c.rect(Q, v, W, W, "#f8f3e6"), r.strokeStyle = "rgba(44,24,16,.3)", r.strokeRect(Q + 0.5, v + 0.5, W - 1, W - 1);
        let J = (_c = (_a = a.formula) === null || _a === void 0 ? void 0 : _a.name) !== null && _c !== void 0 ? _c : "选择丹方";
        if (c.text(a.formula ? "\uD83D\uDCDC" : "＋", Q + (W - c.measure(a.formula ? "\uD83D\uDCDC" : "＋", a.formula ? Math.min(44, W * 0.48) : 20)) / 2, v + W * 0.4, a.formula ? Math.min(44, W * 0.48) : 20), c.clip(Q + 2, v + W * 0.72, W - 4, W * 0.25, () => c.text(J, Q + Math.max(2, (W - c.measure(J, Math.min(12, W * 0.17))) / 2), v + W * 0.84, Math.min(12, W * 0.17))), r.restore(), !a.locked)
            c.hit(Q, v, W, W, this.openFormula);
    } if (V.forEach(([W, Q], v) => { var _a, _c, _d; let J = a.materials.ids[v], B = a.materials.map[J], Z = n * 0.19, K = t + n * W - Z / 2, G = h + n * Q - Z / 2, F = B ? { definitionId: "material.v1", name: B.name, quantity: (_a = a.materials.doses[J]) !== null && _a !== void 0 ? _a : 1, instanceData: { name: B.name, type: B.type, rank: B.rank, element: (_c = B.element) !== null && _c !== void 0 ? _c : null, description: (_d = B.description) !== null && _d !== void 0 ? _d : "" } } : void 0; (0, official_chunk_h2eh160v_js_1.ve)(c, K, G, Z, F, { disabled: a.locked, border: !a.locked ? "rgba(193,18,31,.5)" : void 0, emptyLabel: "投入灵材", emptyIcon: "＋", quick: () => B ? a.removeMaterial(J) : this.openBag(), preview: F ? () => this.preview.open(F, { x: K, y: G, w: Z, h: Z }, void 0, void 0, (e) => { var _a, _c; let A = new official_chunk_wje6zqc2_js_1.Ce(c, e); A.block(40, (j, b) => { var _a; if (c.text("入炉份量", j, b + 20, 14), r.strokeStyle = "rgba(44,24,16,.2)", r.strokeRect(j + 68.5, b + 0.5, 79, 39), c.text(String((_a = a.materials.doses[J]) !== null && _a !== void 0 ? _a : 1), j + 77, b + 20, 14), !a.locked)
            c.hit(j + 68, b, 80, 40, () => { var _a; return this.editDose(J, Math.min((_a = B.quantity) !== null && _a !== void 0 ? _a : 1, X)); }); }), A.gap(12); for (let j of (_c = (_a = a.analysis.value) === null || _a === void 0 ? void 0 : _a.materialJudgments.filter((b) => b.materialId === J)) !== null && _c !== void 0 ? _c : [])
            A.text(j.reason, 14, 24), A.gap(12); return A.block(32.32, (j, b) => c.inert(a.locked, () => c.button("移出", j, b, () => { a.removeMaterial(J), this.preview.close(); }))), A; }) : void 0 }); }), a.phase === "firing") {
        let W = ($ - this.pendingAt) / 800, Q = { x: t + n * 0.5, y: h + n * 0.53 };
        if (W <= 1) {
            let K = W <= 0.2 ? 0 : p(Math.min(1, (W - 0.2) / 0.8), "in"), G = W <= 0.2 ? p(W / 0.2, "in") : 1 - K, F = 1 - 0.96 * K;
            r.save(), r.globalAlpha = G, V.forEach(([e, A], j) => { if (!a.materials.ids[j])
                return; r.shadowColor = "rgba(217,146,62,.65)", r.shadowBlur = 18, r.fillStyle = "#fde68a", r.beginPath(), r.arc(Q.x + (t + n * e - Q.x) * F, Q.y + (h + n * A - Q.y) * F, 8 * F, 0, Math.PI * 2), r.fill(); }), r.restore();
        }
        let v = ($ - this.pendingAt) / 1600 % 2, J = p(v <= 1 ? v : 2 - v, "both"), B = n * 0.15 * (0.65 + 0.6 * J);
        r.save(), r.globalAlpha = 0.25 + 0.75 * J;
        let Z = r.createRadialGradient(Q.x, Q.y, 0, Q.x, Q.y, B);
        Z.addColorStop(0, "rgba(255,210,120,.85)"), Z.addColorStop(0.4, "rgba(210,95,30,.4)"), Z.addColorStop(0.7, "transparent"), r.fillStyle = Z, r.fillRect(Q.x - B, Q.y - B, B * 2, B * 2), r.restore();
    } if (g) {
        let W = Math.min(1, s / 1100), Q = W < 0.45 ? p(W / 0.45, "out") : p(Math.min(1, (W - 0.45) / 0.3), "out"), v = W < 0.45 ? 0.45 + 0.67 * Q : W < 0.75 ? 1.12 - 0.12 * Q : 1, J = W < 0.45 ? Q : 1, B = n * 0.19, Z = t + n * 0.5 - B / 2, K = h + n * 0.53 - B / 2, G = { definitionId: "consumable.v1", name: g.name, quantity: g.quantity, instanceData: (0, official_chunk_h2eh160v_js_1.od)(g) };
        r.save(), r.translate(Z + B / 2, K + B / 2), r.scale(v, v), r.translate(-Z - B / 2, -K - B / 2), r.globalAlpha = J, r.shadowColor = "rgba(178,80,30,.3)", r.shadowBlur = 24, c.inert(!this.revealed, () => (0, official_chunk_h2eh160v_js_1.ve)(c, Z, K, B, G, { badge: "主丹", disabled: !this.revealed, preview: () => this.preview.open(G, { x: Z, y: K, w: B, h: B }) })), r.restore();
    } }
    editDose(t, h) { var _a, _c; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); let n = (r) => { let a = Number(r.value); if (Number.isFinite(a) && a > 0)
        this.model.setMaterialDose(t, Math.min(h, a)); }, c = (r) => { var _a; n(r), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); }; this.stopKeyboard = () => { official_chunk_wje6zqc2_js_1.De.offKeyboardInput(n), official_chunk_wje6zqc2_js_1.De.offKeyboardComplete(c), official_chunk_wje6zqc2_js_1.De.hideKeyboard(), this.stopKeyboard = void 0; }, official_chunk_wje6zqc2_js_1.De.onKeyboardInput(n), official_chunk_wje6zqc2_js_1.De.onKeyboardComplete(c), official_chunk_wje6zqc2_js_1.De.showKeyboard({ defaultValue: String((_c = this.model.materials.doses[t]) !== null && _c !== void 0 ? _c : 1), maxLength: 10, multiple: !1, confirmHold: !1, confirmType: "done" }); }
    paintOverlay() { this.preview.paint(); }
}
exports.jb = tn;
function en(t) { var _a, _c; let h = new Map; for (let n of [...t].sort((c, r) => c.id.localeCompare(r.id))) {
    if (n.location !== "bag" || ((_a = (0, official_chunk_h2eh160v_js_1.Nd)(n.definitionId)) === null || _a === void 0 ? void 0 : _a.kind) !== "material")
        continue;
    let c = (0, official_chunk_h2eh160v_js_1.ee)(n.instanceData);
    if (c.type === "gongfa_manual" || c.type === "skill_manual")
        continue;
    let r = (0, official_chunk_nx6d9wvp_js_1.yb)("material.v1", c), a = (_c = h.get(r)) !== null && _c !== void 0 ? _c : { ...c, id: n.id, quantity: 0, members: [] };
    a.quantity += n.quantity, a.members.push({ id: n.id, revision: n.revision, quantity: n.quantity, slotIndex: n.slotIndex }), h.set(r, a);
} return [...h.values()]; }
function sn(t) { return t.filter((h) => { var _a; return h.location === "storage" && ((_a = (0, official_chunk_h2eh160v_js_1.Nd)(h.definitionId)) === null || _a === void 0 ? void 0 : _a.kind) === "material"; }).flatMap((h) => { let n = (0, official_chunk_h2eh160v_js_1.ee)(h.instanceData); return n.type === "gongfa_manual" || n.type === "skill_manual" ? [] : [{ ...n, id: h.id, quantity: h.quantity, members: [{ id: h.id, revision: h.revision, quantity: h.quantity, slotIndex: h.slotIndex }] }]; }); }
class E {
    constructor(t, h, n) {
        this.dose = 1;
        this.u = t;
        this.model = h;
        this.onChoose = n;
        this.bag = new official_chunk_h2eh160v_js_1.we(() => t.invalidate()), this.preview = new official_chunk_h2eh160v_js_1.te(t), this.filters = new official_chunk_nx6d9wvp_js_1.xb(t, (c) => { this.bag.page = 0, this.bag.setFilter(c); });
    }
    enter() { this.reset(), this.bag.enter(); }
    reset() { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.bag.leave(), this.preview.close(), this.filters.closeFilter(); }
    editDose(t) { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); let h = (c) => { let r = Number(c.value); if (Number.isFinite(r) && r > 0)
        this.dose = Math.min(t, Math.max(1, Math.floor(r))); this.u.invalidate(); }, n = (c) => { var _a; h(c), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); }; this.stopKeyboard = () => { official_chunk_wje6zqc2_js_1.De.offKeyboardInput(h), official_chunk_wje6zqc2_js_1.De.offKeyboardComplete(n), official_chunk_wje6zqc2_js_1.De.hideKeyboard(), this.stopKeyboard = void 0; }, official_chunk_wje6zqc2_js_1.De.onKeyboardInput(h), official_chunk_wje6zqc2_js_1.De.onKeyboardComplete(n), official_chunk_wje6zqc2_js_1.De.showKeyboard({ defaultValue: String(this.dose), maxLength: 10, multiple: !1, confirmHold: !1, confirmType: "done" }); }
    flow(t) { var _a, _c; let h = this.u, n = this.model, c = this.bag, r = new official_chunk_wje6zqc2_js_1.Ce(h, t), a = c.view, g = c.filter, V = n.locked || !a || c.loading || !!c.error, $ = (c.source === "bag" ? en : sn)((_a = a === null || a === void 0 ? void 0 : a.items) !== null && _a !== void 0 ? _a : []); if (r.block(40, (B, Z) => { var _a, _c; let K = B; for (let [e, A] of [["bag", "储物袋"], ["storage", "储藏室"]]) {
        let j = h.measure(A, 14) + 8;
        if (h.text(A, K + 4, Z + 20, 14, c.source === e ? official_chunk_wje6zqc2_js_1.Be.crimson : official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), c.source === e)
            h.rect(K, Z + 39, j, 1, "rgba(193,18,31,.6)");
        h.hit(K, Z, j, 40, () => c.setSource(e)), K += j + 16;
    } let G = h.buttonWidth("刷新"); h.inert(c.loading, () => h.button("刷新", B + t - G, Z + 3.84, () => void c.reload())); let F = c.source === "bag" ? `${(_a = a === null || a === void 0 ? void 0 : a.used) !== null && _a !== void 0 ? _a : "—"} / 40` : `${(_c = a === null || a === void 0 ? void 0 : a.total) !== null && _c !== void 0 ? _c : "—"} 格`; h.text(F, B + t - G - 12 - h.measure(F, 12, "monospace"), Z + 20, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"], "monospace"); }), r.gap(12), r.block(32.32, (B, Z) => h.button(`筛选${(0, official_chunk_nx6d9wvp_js_1.vb)(g) ? " · 已启用" : ""}`, B, Z, () => this.filters.open(g))), r.gap(12), c.error)
        r.text(c.error, 14, 20, official_chunk_wje6zqc2_js_1.Be.crimson), r.gap(12);
    else if (!a)
        r.text(`正在读取${c.source === "bag" ? "储物袋" : "储藏室"}……`, 14, 20), r.gap(12); r.text("轻点操作，长按查看详情", 12, 16, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), r.gap(8); let s = ((_c = a === null || a === void 0 ? void 0 : a.items) !== null && _c !== void 0 ? _c : []).filter((B) => c.source === "storage" || !(0, official_chunk_nx6d9wvp_js_1.vb)(g) || (0, official_chunk_nx6d9wvp_js_1.wb)(B, g)), W = new Map(s.map((B) => [B.slotIndex, B])), Q = c.source === "bag" && !(0, official_chunk_nx6d9wvp_js_1.vb)(g) ? Array.from({ length: 40 }, (B, Z) => W.get(Z)) : s, v = (t - 24) / 5, J = Math.ceil(Q.length / 5); if (r.block(J * (v + 6) - Math.min(6, J * 6), (B, Z) => Q.forEach((K, G) => { var _a; let F = B + G % 5 * (v + 6), e = Z + Math.floor(G / 5) * (v + 6), A = K ? $.find((N) => N.members.some((O) => O.id === K.id)) : void 0, j = A ? { ...A, element: (_a = A.element) !== null && _a !== void 0 ? _a : void 0 } : void 0, b = j ? n.materials.doses[j.id] : void 0, C = n.materials.ids.length >= M && !b, f = (N) => { var _a; if (j && !V && !C)
        ((_a = this.onChoose) !== null && _a !== void 0 ? _a : ((O, S) => n.addMaterial(O, S)))(j, N); }; (0, official_chunk_h2eh160v_js_1.ve)(h, F, e, v, K, { disabled: V || !!j && C, badge: b ? `已投${b}` : j && !C ? "可选" : void 0, quick: j ? () => f(Math.min((b !== null && b !== void 0 ? b : 0) + 1, j.quantity, X)) : void 0, preview: K ? () => { this.dose = b !== null && b !== void 0 ? b : 1, this.preview.open(K, { x: F, y: e, w: v, h: v }, void 0, void 0, (N) => { let O = new official_chunk_wje6zqc2_js_1.Ce(h, N); if (!j)
            O.text("此物品不能用于炼丹。", 14, 24, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
        else
            O.block(40, (S, D) => { if (h.text("投入份量", S, D + 20, 14), h.ctx.strokeStyle = "rgba(44,24,16,.2)", h.ctx.strokeRect(S + 68.5, D + 0.5, 79, 39), h.text(String(this.dose), S + 77, D + 20, 14, official_chunk_wje6zqc2_js_1.Be.ink, "monospace"), !V && !C)
                h.hit(S + 68, D, 80, 40, () => this.editDose(Math.min(j.quantity, X))); }), O.gap(12), O.block(32.32, (S, D) => h.inert(V || C, () => h.button(C ? "材料格已满" : b ? "调整份量" : "投入丹炉", S, D, () => { var _a; f(this.dose), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.preview.close(); }))); return O; }); } : void 0 }); })), c.source === "storage" && a && a.total > 40)
        r.gap(12), r.block(32.32, (B, Z) => { h.inert(c.loading || a.page === 0, () => h.button("上一页", B, Z, () => c.setPage(a.page - 1))); let K = `${a.page + 1} / ${Math.ceil(a.total / 40)}`; h.text(K, B + (t - h.measure(K, 14, "monospace")) / 2, Z + 16.16, 14, official_chunk_wje6zqc2_js_1.Be.ink, "monospace"), h.inert(c.loading || (a.page + 1) * 40 >= a.total, () => h.button("下一页", B + t - h.buttonWidth("下一页"), Z, () => c.setPage(a.page + 1))); }); return r; }
    paintOverlay() { this.filters.paint(), this.preview.paint(); }
}
exports.kb = E;
class rn {
    constructor(t, h, n = 5) {
        this.formulas = [];
        this.search = "";
        this.family = "all";
        this.page = 1;
        this.pagination = { page: 1, pageSize: 6, total: 0, totalPages: 1, hasPreviousPage: !1, hasNextPage: !1 };
        this.loading = !1;
        this.error = null;
        this.deleting = !1;
        this.active = !1;
        this.generation = 0;
        this.reader = 0;
        this.debouncedSearch = "";
        this.changed = t;
        this.inform = h;
        this.pageSize = n;
    }
    enter() { this.active = !0, this.debouncedSearch = this.search.trim(), this.reload(); }
    leave() { this.active = !1, this.generation++, this.reader++, clearTimeout(this.debounce), this.loading = this.deleting = !1; }
    setSearch(t) { this.search = t, this.page = 1, clearTimeout(this.debounce), this.reader++, this.debounce = setTimeout(() => { this.debouncedSearch = this.search.trim(), this.reload(); }, 300), this.changed(); }
    setFamily(t) { this.family = t, this.page = 1, this.reload(); }
    setPage(t) { this.page = Math.max(1, t), this.reload(); }
    async reload() { if (!this.active)
        return; let t = ++this.reader, h = new URLSearchParams({ page: String(this.page), pageSize: String(this.pageSize) }); if (this.debouncedSearch)
        h.set("search", this.debouncedSearch); if (this.family !== "all")
        h.set("family", this.family); this.loading = !0, this.error = null, this.changed(); try {
        let n = await (0, official_chunk_h2eh160v_js_1.Lb)(`/api/alchemy/formulas?${h}`);
        if (this.active && t === this.reader)
            this.formulas = n.formulas, this.pagination = n.pagination;
    }
    catch (n) {
        if (this.active && t === this.reader)
            this.error = n instanceof Error ? n.message : "丹方玉简读取失败";
    }
    finally {
        if (this.active && t === this.reader)
            this.loading = !1, this.changed();
    } }
    async deleteFormula(t) { if (!this.active || this.deleting)
        return; let h = this.generation; this.deleting = !0, this.changed(); try {
        let n = await (0, official_chunk_h2eh160v_js_1.Gb)(`/api/alchemy/formulas/${encodeURIComponent(t.id)}`, "DELETE");
        if (this.active && h === this.generation) {
            if (this.inform(n.message || `已删除丹方【${t.name}】。`), this.formulas.length === 1 && this.page > 1)
                this.page--;
            await this.reload();
        }
    }
    catch (n) {
        if (this.active && h === this.generation)
            this.inform(n instanceof Error ? n.message : "丹方删除失败");
    }
    finally {
        if (this.active && h === this.generation)
            this.deleting = !1, this.changed();
    } }
}
exports.lb = rn;
var Nn = { restore_hp: `补充${(0, official_chunk_h2eh160v_js_1._b)("hp")}`, heal_wounds: "治愈伤势", restore_mp: `回补${(0, official_chunk_h2eh160v_js_1._b)("mp")}`, detox: "解毒祛浊", beast_cultivation: "滋养灵兽修为", cultivation: `积蓄${(0, official_chunk_h2eh160v_js_1._b)("cultivation_exp")}`, insight: `澄明${(0, official_chunk_h2eh160v_js_1._b)("comprehension_insight")}`, clear_mind_support: "清心定神", protect_meridians_support: "护脉稳络", breakthrough_support: "冲关蓄势", extend_lifespan: `延长${(0, official_chunk_h2eh160v_js_1._b)("lifespan")}`, body_skin: "炼体·皮肤", body_sinew_bone: "炼体·筋骨", body_organs: "炼体·脏腑", body_qi_blood: "炼体·气血", body_primordial_spirit: "炼体·元神", marrow_wash: "洗髓伐脉" }, Xn = { tempering_vitality: "炼体·气血", tempering_spirit: "炼体·脏腑", tempering_wisdom: "炼体·元神", tempering_speed: "炼体·皮肤", tempering_willpower: "炼体·筋骨" }, jn = { restore_hp: 0, heal_wounds: 1, restore_mp: 2, detox: 3, cultivation: 4, beast_cultivation: 21, insight: 5, clear_mind_support: 6, protect_meridians_support: 7, breakthrough_support: 8, extend_lifespan: 9, body_skin: 10, body_sinew_bone: 11, body_organs: 12, body_qi_blood: 13, body_primordial_spirit: 14, tempering_vitality: 15, tempering_spirit: 16, tempering_wisdom: 17, tempering_speed: 18, tempering_willpower: 19, marrow_wash: 20 };
function Hn(t) { var _a, _c; return (_c = (_a = Nn[t]) !== null && _a !== void 0 ? _a : Xn[t]) !== null && _c !== void 0 ? _c : t; }
function fn(t) { return [...t].sort((h, n) => { if (n.weight !== h.weight)
    return n.weight - h.weight; return jn[h.key] - jn[n.key]; }); }
function Rn(t) { let h = Number((t * 100).toFixed(1)); return `${Number.isInteger(h) ? h.toFixed(0) : h}%`; }
function An(t) { if (t.length === 0)
    return "无"; return fn(t).map((h) => `${Hn(h.key)} ${Rn(h.weight)}`).join("、"); }
class _ {
    constructor(t, h, n) {
        this.picker = !1;
        this.familyOpen = !1;
        this.savedScroll = 0;
        this.u = t;
        this.selected = h;
        this.choose = n;
        this.library = new rn(() => t.invalidate(), official_chunk_wje6zqc2_js_1.Ge);
    }
    enterArchive() { this.reset(), this.library.enter(); }
    openPicker() { this.picker = !0, this.library.enter(), this.u.modalScroll = 0, this.u.invalidate(); }
    closePicker() { var _a; this.picker = !1, this.library.leave(), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.u.modalScroll = 0, this.u.invalidate(); }
    reset() { var _a; this.library.leave(), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.picker = this.familyOpen = !1, this.detail = this.deletion = void 0; }
    button(t, h, n, c, r = !1, a = !1) { let g = this.u; if (g.ctx.save(), r)
        g.ctx.globalAlpha *= 0.5; g.inert(r, () => g.button(t, h, n, c, r ? official_chunk_wje6zqc2_js_1.Be["ink-secondary"] : a ? official_chunk_wje6zqc2_js_1.Be.crimson : official_chunk_wje6zqc2_js_1.Be["ink-secondary"])), g.ctx.restore(); }
    search() { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); let t = (n) => this.library.setSearch(n.value), h = (n) => { var _a; t(n), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); }; this.stopKeyboard = () => { official_chunk_wje6zqc2_js_1.De.offKeyboardInput(t), official_chunk_wje6zqc2_js_1.De.offKeyboardComplete(h), official_chunk_wje6zqc2_js_1.De.hideKeyboard(), this.stopKeyboard = void 0; }, official_chunk_wje6zqc2_js_1.De.onKeyboardInput(t), official_chunk_wje6zqc2_js_1.De.onKeyboardComplete(h), official_chunk_wje6zqc2_js_1.De.showKeyboard({ defaultValue: this.library.search, maxLength: 200, multiple: !1, confirmHold: !1, confirmType: "search" }); }
    facts(t, h) { var _a; let n = this.u, c = new official_chunk_wje6zqc2_js_1.Ce(n, h); c.gap(12), c.block(1, (a, g) => { n.ctx.save(), n.ctx.strokeStyle = "rgba(44,24,16,.1)", n.ctx.setLineDash([3, 3]), n.ctx.beginPath(), n.ctx.moveTo(a, g), n.ctx.lineTo(a + h, g), n.ctx.stroke(), n.ctx.restore(); }), c.gap(12); for (let [a, g] of [["材料数量", `${t.pattern.slotCount} 味`], ["最低品质", (_a = t.pattern.minQuality) !== null && _a !== void 0 ? _a : "不限"], ["熟练度", `Lv.${t.mastery.level}`]])
        c.block(16, (V, $) => { n.text(a, V, $ + 8, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), n.text(g, V + h - n.measure(g, 12), $ + 8, 12); }), c.gap(8); let r = An(t.pattern.targetPropertyVector) || "未记录"; return c.text(`药效方向：${r}${t.pattern.dominantElement ? ` · 主要属性：${t.pattern.dominantElement}` : ""}`, 12, 20), c; }
    use(t) { if (this.detail = void 0, this.choose(t), this.picker)
        this.closePicker(); }
    confirmDelete(t) { this.detail = void 0, this.deletion = t, this.savedScroll = this.u.modalScroll, this.u.modalScroll = 0, this.u.invalidate(); }
    flow(t, h = !1) { let n = this.u, c = this.library, r = new official_chunk_wje6zqc2_js_1.Ce(n, t), a = h ? 16 : 20; if (r.block(40, (g, V) => { n.ctx.strokeStyle = "rgba(44,24,16,.2)", n.ctx.strokeRect(g + 0.5, V + 0.5, t - 1, 39), n.clip(g + 12, V, t - 24, 40, () => n.text(c.search || (h ? "搜索丹方名称" : "以丹方名检索玉简"), g + 12, V + 20, 14, c.search ? official_chunk_wje6zqc2_js_1.Be.ink : official_chunk_wje6zqc2_js_1.Be["ink-secondary"])), n.hit(g, V, t, 40, () => this.search()); }), r.gap(h ? 8 : 12), r.block(40, (g, V) => { n.ctx.strokeStyle = "rgba(44,24,16,.2)", n.ctx.strokeRect(g + 0.5, V + 0.5, t - 1, 39), n.text(c.family === "all" ? h ? "全部用途" : "全部丹类" : (0, official_chunk_h2eh160v_js_1.id)(c.family), g + 12, V + 20, 14), n.text("⌄", g + t - 24, V + 20, 14), n.hit(g, V, t, 40, () => { this.savedScroll = n.modalScroll, this.familyOpen = !0, n.modalScroll = 0, n.invalidate(); }); }), !h)
        r.gap(12), r.block(32.32, (g, V) => this.button(c.loading ? "处理中……" : "刷新玉简", g, V, () => void c.reload(), c.loading)); if (r.gap(a), c.error)
        r.text(c.error, 14, 24, official_chunk_wje6zqc2_js_1.Be.crimson), r.gap(a); if (c.loading && !c.formulas.length)
        r.text("正在读取丹方……", 14, 24, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), r.gap(a); for (let g of c.formulas) {
        let V = h && this.selected() === g.id, $ = t - 34, s = new official_chunk_wje6zqc2_js_1.Ce(n, $), W = $ - (h ? 60 : 0), Q = Math.min(W, n.measure(g.name, 16)), v = `「${(0, official_chunk_h2eh160v_js_1.id)(g.family)}」`, J = n.measure(v, 12) + 8, B = Q + 8 + J <= W;
        s.block(B ? 24 : 44, (F, e) => { if (n.clip(F, e, W, 24, () => n.text(g.name, F, e + 12, 16, official_chunk_wje6zqc2_js_1.Be.ink, n.bodyFont, h)), n.text(v, B ? F + Q + 12 : F + 4, B ? e + 12 : e + 34, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), h) {
            let A = V ? "当前选择" : "选择";
            n.text(A, F + $ - n.measure(A, 12), e + 8, 12, V ? official_chunk_wje6zqc2_js_1.Be.crimson : official_chunk_wje6zqc2_js_1.Be["ink-secondary"], n.bodyFont, V);
        } }), s.gap(4);
        let Z = n.lines(g.description || "暂无丹方说明。", W, 12).slice(0, 2);
        s.block(Z.length * 20, (F, e) => Z.forEach((A, j) => n.text(A, F, e + 10 + j * 20, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"])));
        let K = this.facts(g, $);
        if (s.block(K.height, (F, e) => K.paint(F, e)), !h) {
            s.gap(12), s.rule(), s.gap(12);
            let F = [{ label: "查看详情", run: () => { this.detail = g, n.modalScroll = 0, n.invalidate(); } }, { label: "删除", run: () => this.confirmDelete(g) }, { label: "使用此丹方", run: () => this.use(g), primary: !0 }], e = [], A = 0, j = () => { let b = e, C = A; s.block(32.32, (f, N) => { let O = $ - C; for (let S of b)
                this.button(S.label, f + O, N, S.run, !1, S.primary), O += n.buttonWidth(S.label) + 8; }), e = [], A = 0; };
            for (let b of F) {
                let C = n.buttonWidth(b.label);
                if (e.length && A + 8 + C > $)
                    j(), s.gap(8);
                A += (e.length ? 8 : 0) + C, e.push(b);
            }
            if (e.length)
                j();
        }
        let G = h ? 12 : 16;
        r.block(s.height + G * 2 + 2, (F, e) => { if (n.rect(F, e, t, s.height + G * 2 + 2, V ? "rgba(193,18,31,.045)" : h ? "rgba(0,0,0,0)" : "rgba(44,24,16,.012)"), n.ctx.strokeStyle = V ? official_chunk_wje6zqc2_js_1.Be.crimson : "rgba(44,24,16,.15)", n.ctx.strokeRect(F + 0.5, e + 0.5, t - 1, s.height + G * 2 + 1), s.paint(F + 17, e + G + 1), h)
            n.hit(F, e, t, s.height + G * 2 + 2, () => this.use(g)); }), r.gap(h ? 8 : 12);
    } if (!c.loading && !c.formulas.length)
        r.text(h ? "暂无符合条件的丹方。" : "尚未留存丹方。可在丹炉选择随心炼丹，成功后有机会悟得新方。", 14, 24, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), r.gap(a); return r.gap(h ? 8 : 8), r.block(32.32, (g, V) => { this.button("上一页", g, V, () => { if (c.setPage(c.page - 1), h)
        n.modalScroll = 0;
    else
        n.scroll = 0; }, c.loading || !c.pagination.hasPreviousPage); let $ = h ? `第 ${c.pagination.page} / ${Math.max(1, c.pagination.totalPages)} 页` : `${c.pagination.page} / ${Math.max(1, c.pagination.totalPages)}`; n.text($, g + (t - n.measure($, 12)) / 2, V + 16.16, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), this.button("下一页", g + t - n.buttonWidth("下一页"), V, () => { if (c.setPage(c.page + 1), h)
        n.modalScroll = 0;
    else
        n.scroll = 0; }, c.loading || !c.pagination.hasNextPage); }), r; }
    paintOverlay() { let t = this.u; if (this.picker) {
        let h = t.modalScroll;
        if (this.familyOpen)
            t.modalScroll = this.savedScroll;
        if ((0, official_chunk_wje6zqc2_js_1.He)(t, { title: "选择本炉丹方", description: "查看丹药用途、材料要求和熟练度，点击一行即可选择。", rows: [], content: this.flow(t.width - 32, !0), footer: { height: 32.32, paint: (n, c) => { t.text(this.selected() ? "已为本炉选择丹方" : "尚未选择丹方", n, c + 16.16, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), this.button("关闭", t.width - 16 - t.buttonWidth("关闭"), c, () => this.closePicker()); } } }, () => this.closePicker()), this.familyOpen)
            t.modalScroll = h;
    } if (this.detail) {
        let h = this.detail, n = new official_chunk_wje6zqc2_js_1.Ce(t, t.width - 32);
        n.text(`「${(0, official_chunk_h2eh160v_js_1.id)(h.family)}」`, 14, 24, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), n.gap(20), n.text(h.description || "这份丹方暂未留下更多说明。", 14, 28, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), n.gap(8);
        let c = this.facts(h, t.width - 32);
        n.block(c.height, (r, a) => c.paint(r, a)), (0, official_chunk_wje6zqc2_js_1.He)(t, { title: h.name, description: "查看这份丹方的用途、材料要求和药效方向。", rows: [], content: n, actions: [{ label: "删除丹方", run: () => this.confirmDelete(h) }, { label: "使用此丹方", primary: !0, run: () => this.use(h) }] }, () => { this.detail = void 0, t.invalidate(); });
    } if (this.deletion) {
        let h = this.deletion, n = () => { if (this.library.deleting)
            return; this.deletion = void 0, t.modalScroll = this.savedScroll, t.invalidate(); };
        (0, official_chunk_wje6zqc2_js_1.He)(t, { title: "删除丹方", style: "modal", rows: [{ text: `确定要删除丹方【${h.name}】吗？` }, { text: "此操作不会影响已经炼成的丹药。" }], actions: [{ label: "保留", disabled: this.library.deleting, run: n }, { label: "确认删除", disabled: this.library.deleting, run: () => void this.library.deleteFormula(h).then(n) }] }, n);
    } if (this.familyOpen) {
        let h = () => { this.familyOpen = !1, t.modalScroll = this.savedScroll, t.invalidate(); }, n = new official_chunk_wje6zqc2_js_1.Ce(t, Math.min(448, t.width - 24) - 34);
        for (let c of ["all", ...official_chunk_h2eh160v_js_1.xc])
            n.block(40, (r, a) => { t.text(c === "all" ? this.picker ? "全部用途" : "全部丹类" : (0, official_chunk_h2eh160v_js_1.id)(c), r + 8, a + 20, 14, this.library.family === c ? official_chunk_wje6zqc2_js_1.Be.crimson : official_chunk_wje6zqc2_js_1.Be.ink), t.hit(r, a, n.width, 40, () => { this.library.setFamily(c), h(); }); });
        (0, official_chunk_wje6zqc2_js_1.He)(t, { title: "按丹药用途筛选", style: "modal", rows: [], content: n }, h);
    } }
}
exports.mb = _;
function Gn(t) { if (!t)
    return "丹纹尚未定形。"; let h = Object.entries(t).filter(([, n]) => (n !== null && n !== void 0 ? n : 0) > 0).sort(([, n], [, c]) => (c !== null && c !== void 0 ? c : 0) - (n !== null && n !== void 0 ? n : 0)).slice(0, 2).map(([n]) => (0, official_chunk_h2eh160v_js_1.ad)(n)); return h.length ? `${h.join("、")}的迹象最为明显。` : "丹纹尚未定形。"; }
function bn(t) { var _a; if (!t)
    return null; if ((_a = t.conclusion) === null || _a === void 0 ? void 0 : _a.trim())
    return t.conclusion.trim(); if (t.fitBand === "aligned")
    return "丹方火纹与炉中药气彼此咬合，药路已经完全显明。"; if (t.fitBand === "degraded")
    return "药路尚能循方而行，但有一部分药蕴会在收束时散失。"; return "当前材料与丹方差异较大，继续炼制仍可能成丹，但结果可能不理想。"; }
class gn {
    constructor(t, h) {
        this.expanded = !1;
        this.confirming = !1;
        this.u = t;
        this.model = h;
        this.preview = new official_chunk_h2eh160v_js_1.te(t);
    }
    reset() { var _a; this.preview.close(), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.confirming = this.expanded = !1; }
    button(t, h, n, c, r = !1, a = !1) { let g = this.u; if (g.ctx.save(), r)
        g.ctx.globalAlpha *= 0.5; g.inert(r, () => g.button(t, h, n, c, r ? official_chunk_wje6zqc2_js_1.Be["ink-secondary"] : a ? official_chunk_wje6zqc2_js_1.Be.crimson : official_chunk_wje6zqc2_js_1.Be.ink)), g.ctx.restore(); }
    edit() { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); let t = (n) => this.model.setIntent(n.value), h = (n) => { var _a; t(n), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); }; this.stopKeyboard = () => { official_chunk_wje6zqc2_js_1.De.offKeyboardInput(t), official_chunk_wje6zqc2_js_1.De.offKeyboardComplete(h), official_chunk_wje6zqc2_js_1.De.hideKeyboard(), this.stopKeyboard = void 0; }, official_chunk_wje6zqc2_js_1.De.onKeyboardInput(t), official_chunk_wje6zqc2_js_1.De.onKeyboardComplete(h), official_chunk_wje6zqc2_js_1.De.showKeyboard({ defaultValue: this.model.intent, maxLength: 300, multiple: !1, confirmHold: !1, confirmType: "done" }); }
    confirm() { this.confirming = !0, this.u.modalScroll = 0, this.u.invalidate(); }
    centered(t, h, n = 12, c = official_chunk_wje6zqc2_js_1.Be["ink-secondary"]) { let r = this.u.lines(h, t.width, n); t.block(r.length * 16, (a, g) => r.forEach((V, $) => this.u.text(V, a + (t.width - this.u.measure(V, n)) / 2, g + 8 + $ * 16, n, c))); }
    flow(t) { var _a, _c, _d, _e; let h = this.u, n = this.model, c = new official_chunk_wje6zqc2_js_1.Ce(h, t); if (n.phase === "firing")
        return c.gap(16), this.centered(c, n.status || "炉火正盛，静候丹成……"), c.gap(16), c; if (n.phase === "result") {
        let Q = n.result.craftedConsumables.slice(1), v = Math.max(1, Math.floor((t + 8) / 88));
        if (Q.length)
            c.block(Math.ceil(Q.length / v) * 88 - 8, (J, B) => Q.forEach((Z, K) => { let G = Math.floor(K / v), F = Math.min(v, Q.length - G * v), e = J + (t - (F * 88 - 8)) / 2 + K % v * 88, A = B + G * 88, j = { definitionId: "consumable.v1", name: Z.name, quantity: Z.quantity, instanceData: (0, official_chunk_h2eh160v_js_1.od)(Z) }; (0, official_chunk_h2eh160v_js_1.ve)(h, e, A, 80, j, { badge: "副丹", preview: () => this.preview.open(j, { x: e, y: A, w: 80, h: 80 }) }); }));
        if (c.gap(12), this.centered(c, `成丹 ${n.result.craftedConsumables.reduce((J, B) => J + B.quantity, 0)} 枚 · 已入物品栏，随身格位不足时存入储藏室`), n.result.formulaProgress)
            c.gap(12), this.centered(c, `丹方熟练 +${n.result.formulaProgress.gainedExp} · Lv.${n.result.formulaProgress.level}`, 12, official_chunk_wje6zqc2_js_1.Be.ink);
        if (n.result.formulaDiscovery)
            c.gap(12), c.rule(), c.gap(12), c.text(`发现丹方：${n.result.formulaDiscovery.name}`, 14, 20), c.gap(12), c.block(32.32, (J, B) => { this.button("不保存", J, B, () => void n.resolveDiscovery(!1), n.discoveryPending), this.button("保存丹方", J + h.buttonWidth("不保存") + 12, B, () => void n.resolveDiscovery(!0), n.discoveryPending); });
        return c.gap(12), c.block(32.32, (J, B) => this.button("再炼一炉", J + (t - h.buttonWidth("再炼一炉")) / 2, B, () => n.startNextBatch(), !1, !0)), c;
    } if (n.phase === "observing") {
        let Q = n.analysis.value, v = Q === null || Q === void 0 ? void 0 : Q.batchProfile, J = new official_chunk_wje6zqc2_js_1.Ce(h, t - 32);
        J.block(16, (F, e) => { h.text("✦", F, e + 8, 12, official_chunk_wje6zqc2_js_1.Be.wood), h.tracked("丹方预览", F + 20, e + 8, 12, 1.2, official_chunk_wje6zqc2_js_1.Be.wood), h.rect(F + 84, e + 8, J.width - 84, 1, "rgba(139,90,43,.15)"); }), J.gap(12);
        let B = new official_chunk_wje6zqc2_js_1.Ce(h, J.width - 14);
        if (B.text((_a = bn(Q)) !== null && _a !== void 0 ? _a : "", 14, 28, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), J.block(B.height, (F, e) => { h.rect(F, e, 2, B.height, "rgba(139,90,43,.3)"), B.paint(F + 14, e); }), v) {
            J.gap(16);
            let F = v.primaryQualityRange.min === v.primaryQualityRange.max ? v.primaryQualityRange.min : `${v.primaryQualityRange.min}—${v.primaryQualityRange.max}`, e = v.totalQuantityRange.min === v.totalQuantityRange.max ? `${v.totalQuantityRange.min}` : `${v.totalQuantityRange.min}—${v.totalQuantityRange.max}`, A = Math.max(h.measure("成丹品阶", 12), h.measure(F, 12)), j = A + 32 + Math.max(48, h.measure(e + " 枚", 12)) > J.width;
            J.block(j ? 84 : 36, (b, C) => { h.text("成丹品阶", b, C + 8, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), h.text(F, b, C + 28, 12, official_chunk_wje6zqc2_js_1.Be.wood); let f = j ? 0 : A + 32, N = j ? 48 : 0; h.text("预计成丹", b + f, C + N + 8, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), h.text(e + " 枚", b + f, C + N + 28, 12); });
        }
        if (c.block(J.height + 34, (F, e) => { let A = h.ctx.createLinearGradient(F, e, F + t, e); A.addColorStop(0, "rgba(254,243,199,.25)"), A.addColorStop(0.5, "transparent"), A.addColorStop(1, "rgba(254,243,199,.1)"), h.ctx.fillStyle = A, h.ctx.fillRect(F, e, t, J.height + 34), h.rect(F, e, t, 1, "rgba(139,90,43,.25)"), h.rect(F, e + J.height + 33, t, 1, "rgba(139,90,43,.25)"), J.paint(F + 16, e + 17); }), c.gap(12), c.block(32, (F, e) => { h.text(`${this.expanded ? "▾" : "▸"} 查看药性与品相`, F, e + 16, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), h.hit(F, e, t, 32, () => { this.expanded = !this.expanded, h.invalidate(); }); }), this.expanded) {
            c.gap(8), c.text(Gn(v === null || v === void 0 ? void 0 : v.appearanceHints), 12, 16, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), c.gap(8);
            for (let F of (_c = Q === null || Q === void 0 ? void 0 : Q.materialJudgments) !== null && _c !== void 0 ? _c : [])
                c.gap(4), c.text(`${F.materialName}：${F.reason}`, 12, 16, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), c.gap(4);
        }
        c.gap(12), c.rule(), c.gap(12);
        let Z = `${(_d = n.readiness.estimatedSpiritStones) === null || _d === void 0 ? void 0 : _d.toLocaleString()} 灵石 · ${n.qiCost} 天地灵气`, K = h.buttonWidth("重新备料") + 12 + h.buttonWidth("开炉炼丹"), G = h.measure(Z, 12) + 12 + K > t;
        return c.block(G ? 60.32 : 32.32, (F, e) => { h.text(Z, F, e + (G ? 8 : 16.16), 12); let A = G ? 0 : t - K, j = G ? 28 : 0; this.button("重新备料", F + A, e + j, () => n.returnToPreparation()), this.button("开炉炼丹", F + A + h.buttonWidth("重新备料") + 12, e + j, () => this.confirm(), !n.readyForFormulaFire, !0); }), c;
    } c.block(37, (Q, v) => { if (n.mode === "formula")
        return; h.text("炼制目标", Q, v + 18, 14), h.clip(Q + 68, v, t - 68, 36, () => h.text(n.intent || "如：温养经脉、恢复气血", Q + 68, v + 18, 14, n.intent ? official_chunk_wje6zqc2_js_1.Be.ink : official_chunk_wje6zqc2_js_1.Be["ink-secondary"])), h.rect(Q + 68, v + 36, t - 68, 1, "rgba(44,24,16,.2)"), h.hit(Q + 68, v, t - 68, 37, () => this.edit()); }); let r = n.readiness.error || ((_e = n.readiness.validation) === null || _e === void 0 ? void 0 : _e.blockingReason) || n.analysis.error || (n.readiness.estimatedSpiritStones !== null && !n.readiness.canAfford ? "灵石不足" : ""); if (r)
        c.gap(12), c.text(r, 12, 16, official_chunk_wje6zqc2_js_1.Be.crimson); c.gap(12), c.rule(), c.gap(12); let a = `${n.materials.ids.length} / ${M} 味 · ${n.totalDose} 份`, g = n.readiness.estimatedSpiritStones !== null ? `${n.readiness.estimatedSpiritStones.toLocaleString()} 灵石 · ${n.qiCost} 天地灵气` : "投入灵材后确定本次消耗", V = n.readiness.loading || n.analysis.loading, $ = V ? "正在核对……" : n.mode === "improvised" ? "开炉炼丹" : n.analysis.cooldownRemaining > 0 ? `${n.analysis.cooldownRemaining} 秒后可预览` : "预览丹方", s = V || (n.mode === "improvised" ? !n.readyForImprovisedFire : !n.readyForFormulaAnalysis || n.analysis.cooldownRemaining > 0), W = Math.max(h.measure(a, 12, "monospace"), h.measure(g, 12)) + 12 + h.buttonWidth($) > t; return c.block(W ? 80.32 : 36, (Q, v) => { h.text(a, Q, v + 8, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"], "monospace"), h.text(g, Q, v + 28, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), this.button($, W ? Q : Q + t - h.buttonWidth($), W ? v + 48 : v + 1.84, () => n.mode === "improvised" ? this.confirm() : void n.analyzeFormula(), s, !0); }), c; }
    paintOverlay() { let t = this.u, h = this.model; if (this.confirming) {
        let n = () => { this.confirming = !1, t.invalidate(); }, c = new official_chunk_wje6zqc2_js_1.Ce(t, Math.min(448, t.width - 24) - 34), r = h.mode;
        c.text(`本次${r === "formula" ? "依方炼制" : "随心炼制"}将消耗 ${h.qiCost} 天地灵气。`, 14, 28), c.gap(12), c.rule(), c.gap(12);
        for (let [a, g] of h.confirmation)
            c.text(a, 14, 28, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), c.gap(4), c.text(g, 14, 28), c.gap(8);
        (0, official_chunk_wje6zqc2_js_1.He)(t, { title: "天地灵气消耗", style: "modal", rows: [], content: c, actions: [{ label: "再想想", run: n }, { label: r === "improvised" ? "确认尝试" : "确认炼制", disabled: h.submitting || !(r === "improvised" ? h.readyForImprovisedFire : h.readyForFormulaFire), run: () => { n(), h.submit(r); } }] }, n);
    } this.preview.paint(); }
}
exports.nb = gn;
class an {
    constructor(t, h, n, c = n, r) {
        this.bagOpen = !1;
        this.u = t;
        this.model = h;
        this.onBack = n;
        this.onReturn = c;
        this.onModeChange = r;
        this.inventory = new E(t, h), this.formulas = new _(t, () => { var _a; return (_a = h.formula) === null || _a === void 0 ? void 0 : _a.id; }, (a) => h.selectFormula(a)), this.furnace = new tn(t, h, () => this.openBag(), () => this.formulas.openPicker()), this.stages = new gn(t, h);
    }
    enter() { this.leave(), this.furnace.enter(), this.inventory.enter(); }
    leave() { this.bagOpen = !1, this.lastResult = void 0, this.furnace.reset(), this.inventory.reset(), this.formulas.reset(), this.stages.reset(); }
    openBag() { this.bagOpen = !0, this.u.modalScroll = 0, this.u.invalidate(); }
    flow(t, h) { let n = this.u, c = this.model, r = new official_chunk_wje6zqc2_js_1.Ce(n, t); if (c.phase === "result" && c.result !== this.lastResult)
        this.lastResult = c.result, this.inventory.bag.invalidate(); if (r.block(45.32, (g, V) => { var _a, _c; n.text((_c = (_a = c.sectContext) === null || _a === void 0 ? void 0 : _a.facilityLabel) !== null && _c !== void 0 ? _c : "玄火丹炉", g, V + 16.16, 14), n.inert(c.submitting, () => n.button("返回炼丹房", g + t - n.buttonWidth("返回炼丹房"), V, c.phase === "result" ? this.onReturn : this.onBack)), n.rect(g, V + 44.32, t, 1, "rgba(44,24,16,.1)"); }), r.gap(16), r.block(32.32, (g, V) => n.inert(c.submitting, () => n.button("选择炼丹材料", g + t - n.buttonWidth("选择炼丹材料"), V, () => this.openBag()))), r.gap(16), r.block(24, (g, V) => { let $ = g + (t - 48 - 48 - 44 - 24) / 2, s = $ + 60; if (n.text("随心炼制", $, V + 12, 12, c.mode === "improvised" ? official_chunk_wje6zqc2_js_1.Be.ink : official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), n.ctx.save(), c.locked)
        n.ctx.globalAlpha *= 0.5; if (n.roundedRect(s + 0.5, V + 0.5, 43, 23, c.mode === "formula" ? "rgba(193,18,31,.1)" : "rgba(44,24,16,.05)", 12), n.ctx.strokeStyle = "rgba(44,24,16,.2)", n.ctx.stroke(), n.roundedRect(s + (c.mode === "formula" ? 24 : 4), V + 4, 14, 14, official_chunk_wje6zqc2_js_1.Be["ink-secondary"], 7), n.ctx.restore(), !c.locked)
        n.hit(s, V, 44, 24, () => { let W = c.mode === "formula" ? "improvised" : "formula"; if (this.onModeChange)
            this.onModeChange(W);
        else
            c.setMode(W); }); n.text("丹方炼制", s + 56, V + 12, 12, c.mode === "formula" ? official_chunk_wje6zqc2_js_1.Be.ink : official_chunk_wje6zqc2_js_1.Be["ink-secondary"]); }), r.gap(16), r.block(t, (g, V) => this.furnace.paint(g, V, t)), this.furnace.error)
        r.text(this.furnace.error, 14, 24, official_chunk_wje6zqc2_js_1.Be.crimson), r.block(32.32, (g, V) => n.button("重试", g, V, () => this.furnace.load())); if (h)
        r.gap(16), r.text(h, 14, 28, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]); r.gap(16); let a = this.stages.flow(t); return r.block(a.height, (g, V) => a.paint(g, V)), r; }
    paintOverlay() { var _a; let t = this.u; if (this.bagOpen) {
        let h = t.modalScroll;
        if (t.modalScroll = (_a = this.inventory.preview.underlayScroll) !== null && _a !== void 0 ? _a : h, (0, official_chunk_wje6zqc2_js_1.He)(t, { title: "炼丹材料", rows: [], content: this.inventory.flow(t.width - 32) }, () => { this.bagOpen = !1, t.modalScroll = 0, t.invalidate(); }), this.inventory.preview.underlayScroll !== void 0)
            t.modalScroll = h;
    } this.inventory.paintOverlay(), this.formulas.paintOverlay(), this.furnace.paintOverlay(), this.stages.paintOverlay(); }
}
exports.ob = an;
var Un = [{ title: "初识炼丹", body: "一炉炼丹只需在丹炉内完成材料准备、炼制预览和确认炼制。药柜、玉简和炉理碑都是可选的辅助设施。" }, { title: "随心炼丹", body: "投入材料并填写明确的炼制目标，丹炉会根据材料药性与目标生成丹药，也可能由此获得新丹方。" }, { title: "丹方炼制", body: "选择已保存的丹方后再添加材料。炼制预览会说明当前材料与丹方是否契合。" }, { title: "药蕴与批次", body: "材料数量与品质汇成药蕴。药蕴会分结成主丹和副丹，同一炉可能出现多个品质与品相批次。" }, { title: "品质与品相", body: "品质代表丹药层次，品相代表同品质下的成丹完整程度。预览只能显示大致倾向，炼制完成后才能看到最终结果。" }, { title: "丹毒与炉况", body: "燥烈、冲突或过杂的配伍会提高损耗与风险。炼制预览会列出无法继续的原因和需要留意的问题。" }, { title: "常见失败原因", body: "材料不足、灵石不足、炼制目标为空、未选择丹方、材料变化或分析过期，都会导致无法炼制；返回准备阶段修改即可。" }], Vn = { furnace: { id: "furnace", sigil: "\uD83D\uDD25", name: "玄火丹炉", identity: "炼丹设施", responsibility: "准备材料并完成炼制", appearance: "facility" }, cabinet: { id: "cabinet", sigil: "\uD83C\uDF3F", name: "百草药柜", identity: "材料设施", responsibility: "查看和辨认炼丹材料", appearance: "facility" }, formulas: { id: "formulas", sigil: "\uD83D\uDCDC", name: "丹方玉简", identity: "丹方设施", responsibility: "查阅和管理已有丹方", appearance: "facility" }, guide: { id: "guide", sigil: "\uD83E\uDEA8", name: "炉理碑", identity: "指引设施", responsibility: "阅读炼丹方法与常见问题", appearance: "facility" } };
var Cn = { furnace: ["improvised", "formula", "current"], cabinet: ["materials"], formulas: ["formula-library"], guide: ["guide-basics", "guide-reference"] };
class Dn {
    constructor(t, h, n) {
        this.sect = !1;
        this.owner = "";
        this.u = t;
        this.home = h;
        this.navigate = n;
        this.model = new nn(() => t.invalidate(), () => h.load(), official_chunk_wje6zqc2_js_1.Ge), this.workspace = new an(t, this.model, () => this.sect ? this.navigate("/game/sect/alchemy?npc=furnace") : this.setLocation(), () => this.sect ? this.navigate("/game/sect/alchemy") : this.setLocation(), (c) => { if (this.model.setMode(c), !this.sect)
            this.setLocation("furnace", c); }), this.cabinet = new E(t, this.model, (c, r) => { let a = this.model.addMaterial(c, r); if (a === "limit-reached") {
            (0, official_chunk_wje6zqc2_js_1.Ge)("本炉材料种类已满，请先到丹炉调整。");
            return;
        } (0, official_chunk_wje6zqc2_js_1.Ge)(a === "already-added" ? `【${c.name}】已在炉中，份量已更新。` : `已将【${c.name}】添加到丹炉。`), this.openFurnace(); }), this.archive = new _(t, () => { var _a; return (_a = this.model.formula) === null || _a === void 0 ? void 0 : _a.id; }, (c) => { this.model.selectFormula(c), this.openFurnace(); });
    }
    enter(t = "/game/craft/alchemy", h) { var _a, _c, _d; this.leave(), this.owner = (_c = (_a = this.home.view()) === null || _a === void 0 ? void 0 : _a.cultivator.id) !== null && _c !== void 0 ? _c : "", this.sect = !!h, this.model.enter(h); let n = new URLSearchParams((_d = t.split("?")[1]) !== null && _d !== void 0 ? _d : ""), c = n.get("facility"), r = n.get("action"); if (this.sect)
        this.setLocation("furnace", "current");
    else if (c in Cn) {
        if (this.setLocation(c, Cn[c].includes(r) ? r : void 0), this.facility === "furnace" && (this.action === "formula" || this.action === "improvised"))
            this.model.setMode(this.action);
    } }
    leave() { this.workspace.leave(), this.cabinet.reset(), this.archive.reset(), this.model.leave(), this.facility = this.action = void 0, this.owner = ""; }
    get pending() { return this.model.submitting; }
    setLocation(t, h) { if (this.pending)
        return; let n = this.facility, c = this.action; if (this.facility = t, this.action = h, n === "furnace" && c && !(t === "furnace" && h))
        this.workspace.leave(); if (n === "cabinet" && c && !(t === "cabinet" && h))
        this.cabinet.reset(); if (n === "formulas" && c && !(t === "formulas" && h))
        this.archive.reset(); if (t === "furnace" && h && !(n === "furnace" && c))
        this.workspace.enter(); if (t === "cabinet" && h && !(n === "cabinet" && c))
        this.cabinet.enter(); if (t === "formulas" && h && !(n === "formulas" && c))
        this.archive.enterArchive(); this.u.scroll = 0, this.u.invalidate(); }
    openFurnace() { this.setLocation("furnace", this.model.mode); }
    open(t) { if (t === "improvised" || t === "formula") {
        if (this.model.phase === "result")
            this.model.startNextBatch();
        this.model.setMode(t), this.setLocation("furnace", t);
    }
    else
        this.setLocation(this.facility, t); }
    status() { let t = this.model; return t.phase === "firing" ? "正在炼制" : t.phase === "result" ? "结果待查看" : t.phase === "observing" ? "预览待确认" : t.mode === "formula" && t.readyForFormulaAnalysis ? "可以查看推演" : t.mode === "improvised" && t.readyForImprovisedFire ? "可以尝试炼制" : t.materials.ids.length || t.formula || t.intent.trim() ? "已有一炉正在准备" : "可以开始炼制"; }
    flow(t) { var _a, _c, _d, _e; let h = this.u, n = this.model, c = new official_chunk_wje6zqc2_js_1.Ce(h, t), r = (_c = (_a = this.home.view()) === null || _a === void 0 ? void 0 : _a.cultivator.id) !== null && _c !== void 0 ? _c : ""; if (r && this.owner && r !== this.owner)
        return this.enter("/game/craft/alchemy", n.sectContext), this.flow(t); if (this.facility && this.action) {
        if (this.facility === "furnace")
            return this.workspace.flow(t, (_e = (_d = this.home.baseline) === null || _d === void 0 ? void 0 : _d.resources.session) === null || _e === void 0 ? void 0 : _e.data.note);
        let g = this.facility === "cabinet" ? "百草药柜" : this.facility === "formulas" ? "丹方玉简" : "炉理碑", V = this.facility === "cabinet" ? "查看炼丹材料" : this.facility === "formulas" ? "查看已有丹方" : this.action === "guide-basics" ? "第一炉建议" : "炼丹说明";
        if (c.block(45.32, ($, s) => { h.text(V, $, s + 16.16, 14), h.button(`返回${g}`, $ + t - h.buttonWidth(`返回${g}`), s, () => this.setLocation(this.facility)), h.rect($, s + 44.32, t, 1, "rgba(44,24,16,.1)"); }), c.gap(16), this.facility === "cabinet" || this.facility === "formulas") {
            let $ = this.facility === "cabinet" ? this.cabinet.flow(t) : this.archive.flow(t);
            return c.block($.height, (s, W) => $.paint(s, W)), c;
        }
        for (let $ of Un) {
            let s = new official_chunk_wje6zqc2_js_1.Ce(h, t - 42);
            s.text($.title, 16, 24), s.gap(8), s.text($.body, 14, 28, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), c.block(s.height + 42, (W, Q) => { h.ctx.strokeStyle = "rgba(44,24,16,.15)", h.ctx.strokeRect(W + 0.5, Q + 0.5, t - 1, s.height + 41), s.paint(W + 21, Q + 21); }), c.gap(12);
        }
        return c.gap(12), c.block(32.32, ($, s) => h.button("前往丹炉", $ + t - h.buttonWidth("前往丹炉"), s, () => this.openFurnace(), official_chunk_wje6zqc2_js_1.Be.crimson)), c;
    } if (this.facility) {
        let g = this.facility, V = Vn[g], $ = n.phase !== "preparing" || n.materials.ids.length > 0 || !!n.formula || !!n.intent.trim(), s = [], W = g === "furnace" ? n.phase === "result" ? "炉火已经平息，这一炉的炼制结果正等你查看。" : $ ? "炉中已有准备好的材料。你可以继续这一炉，也可以重新选择炼制方式。" : "炉火尚未点燃。你可以自由搭配材料，也可以按照已有丹方炼制。" : g === "cabinet" ? "药柜中存放着你已有的炼丹材料。可以在这里查看库存和材料药性。" : g === "formulas" ? "玉简中记录着你已经掌握的丹方。可以在这里查阅、使用或删除已有丹方。" : "石碑记载着炼丹的基本方法和常见问题。阅读碑文不会改变炉中的材料。";
        if (g === "furnace") {
            if ($)
                s.push({ id: "current", label: n.phase === "result" ? "查看炼制结果" : n.phase === "observing" ? "继续确认本炉" : "继续处理当前一炉", tone: "primary" });
            s.push({ id: "improvised", label: "随心炼丹" }, { id: "formula", label: "按照丹方炼制" });
        }
        else if (g === "cabinet")
            s.push({ id: "materials", label: "查看炼丹材料", tone: "primary" });
        else if (g === "formulas")
            s.push({ id: "formula-library", label: "查看已有丹方", tone: "primary" }, { id: "formula", label: "使用丹方炼制" });
        else
            s.push({ id: "guide-reference", label: "阅读炼丹说明", tone: "primary" });
        s.push({ id: "leave", label: "返回炼丹房", tone: "muted" });
        let Q = (0, official_chunk_nx6d9wvp_js_1.sb)(h, t - 2, V, [{ body: W }], s, (v) => v === "leave" ? this.setLocation() : this.open(v));
        return c.block(Q.height + 2, (v, J) => { h.ctx.strokeStyle = "rgba(44,24,16,.2)", h.ctx.strokeRect(v + 0.5, J + 0.5, t - 1, Q.height + 1), Q.paint(v + 1, J + 1); }), c;
    } let a = Object.values(Vn).map((g) => ({ ...g, status: g.id === "furnace" ? { label: this.status(), tone: n.phase === "result" ? "attention" : n.materials.ids.length || n.formula || n.intent ? "active" : "neutral" } : { label: g.id === "cabinet" ? "库存可查" : g.id === "formulas" ? "玉简可阅" : "碑文可阅", tone: "neutral" } })); return (0, official_chunk_nx6d9wvp_js_1.rb)(h, t, { description: "中央丹炉火光微动，药柜、丹方玉简与炉理碑分列四周。走近一处设施，看看它能为你做什么。", actors: a, select: (g) => this.setLocation(g, g === "furnace" ? n.mode : g === "cabinet" ? "materials" : g === "formulas" ? "formula-library" : "guide-basics"), prompt: "选择一处设施进行交互" }); }
    paint(t, h) { let n = this.u, c = n.width - 56, r = this.flow(c), V = 116.2 + r.height, $ = t + 12 - n.scroll; n.clip(0, t, n.width, h - t, () => { n.rect(12, $, n.width - 24, V, "rgba(248,243,230,.82)"), n.text("炼丹房", 28, $ + 28, 23.2, official_chunk_wje6zqc2_js_1.Be.ink, n.headingFont); let s = 36 + n.measure("炼丹房", 23.2, n.headingFont); n.text("/", s, $ + 31, 14, official_chunk_wje6zqc2_js_1.Be["battle-muted"]), n.tracked("修行", s + 14, $ + 31, 12.48, 1.9968, official_chunk_wje6zqc2_js_1.Be["battle-muted"]), n.text("看药材、控炉候、炼丹息身。", 28, $ + 60, 14, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), n.line(28, $ + 84.2 - 1, c), r.paint(28, $ + 84.2 + 16); }), n.scrollMax = Math.max(0, t + 24 + V - h); }
    paintOverlay() { if (!this.action)
        return; if (this.facility === "furnace")
        this.workspace.paintOverlay();
    else if (this.facility === "cabinet")
        this.cabinet.paintOverlay();
    else if (this.facility === "formulas")
        this.archive.paintOverlay(); }
}
exports.pb = Dn;
