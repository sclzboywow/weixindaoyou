"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tb = exports.sb = exports.rb = exports.qb = exports.pb = exports.ob = exports.nb = exports.mb = void 0;
const official_chunk_wvev9bhe_js_1 = require("./official-chunk-wvev9bhe.js");
const official_chunk_sfhgdvjx_js_1 = require("./official-chunk-sfhgdvjx.js");
const official_chunk_2mkgzpax_js_1 = require("./official-chunk-2mkgzpax.js");
var y = { minMaterialKinds: 1, maxMaterialKinds: 6, minQuantityPerMaterial: 1, maxQuantityPerMaterial: official_chunk_sfhgdvjx_js_1.Je }, N = official_chunk_sfhgdvjx_js_1.Je;
var P = y.minQuantityPerMaterial, M = y.maxMaterialKinds;
var I = () => ({ ids: [], map: {}, doses: {} }), l = () => ({ key: null, estimatedSpiritStones: null, estimatedQi: null, validation: null, canAfford: !0, error: null, loading: !1 }), Y = () => ({ consumable: null, consumables: [], craftedConsumables: [], yieldProfile: null, formulaDiscovery: null, formulaProgress: null }), k = () => ({ value: null, loading: !1, error: null, cooldownRemaining: 0 });
class nn {
    constructor(t, c, n, h = 1800) {
        this.phase = "preparing";
        this.mode = "improvised";
        this.intent = "";
        this.formula = null;
        this.materials = I();
        this.readiness = l();
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
        this.refreshPlayer = c;
        this.inform = n;
        this.ceremonyMs = h;
    }
    enter(t) { this.leave(), this.active = !0, this.sectContext = t, this.mode = "improvised", this.phase = "preparing", this.intent = "", this.formula = null, this.materials = I(), this.readiness = l(), this.analysis = k(), this.result = Y(), this.status = "", this.changed(); }
    leave() { var _a; this.active = !1, this.generation++, this.reader++, this.analyzer++, clearTimeout(this.expiry), clearInterval(this.cooldown), this.pulses.forEach(clearTimeout), this.pulses = [], (_a = this.stopCeremony) === null || _a === void 0 ? void 0 : _a.call(this), this.stopCeremony = void 0, this.submitting = this.discoveryPending = !1; }
    get locked() { return this.submitting || this.phase === "firing" || this.phase === "result"; }
    get materialQuantities() { return Object.fromEntries(this.materials.ids.map((t) => { var _a; return [t, (_a = this.materials.doses[t]) !== null && _a !== void 0 ? _a : P]; })); }
    get materialVersions() { return Object.fromEntries(this.materials.ids.map((t) => { var _a; return [t, JSON.stringify((_a = this.materials.map[t].members) !== null && _a !== void 0 ? _a : [])]; })); }
    get selectionKey() { var _a, _b; return JSON.stringify({ mode: this.mode, formulaId: (_b = (_a = this.formula) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null, ids: this.materials.ids, materialQuantities: this.materialQuantities, materialVersions: this.materialVersions }); }
    get totalDose() { return Object.values(this.materialQuantities).reduce((t, c) => t + c, 0); }
    get qiCost() { var _a; return (_a = this.readiness.estimatedQi) !== null && _a !== void 0 ? _a : 1; }
    get readyForReadinessCheck() { return this.materials.ids.length > 0 && (this.mode === "improvised" || !!this.formula); }
    get readyForCostConfirmation() { var _a; return this.readyForReadinessCheck && this.readiness.key === this.selectionKey && this.readiness.estimatedSpiritStones !== null && !this.readiness.loading && ((_a = this.readiness.validation) === null || _a === void 0 ? void 0 : _a.valid) !== !1 && this.readiness.canAfford && !this.readiness.error; }
    get readyForFormulaAnalysis() { return this.mode === "formula" && !!this.formula && this.readyForCostConfirmation; }
    get readyForImprovisedFire() { return this.mode === "improvised" && this.phase === "preparing" && this.readyForCostConfirmation && !!this.intent.trim(); }
    get readyForFormulaFire() { var _a; return this.mode === "formula" && this.phase === "observing" && this.readyForCostConfirmation && !!((_a = this.analysis.value) === null || _a === void 0 ? void 0 : _a.analysisId) && this.analysisKey === this.selectionKey; }
    clearAnalysis() { clearTimeout(this.expiry), this.expiry = void 0, this.analyzer++, this.analysisKey = null, this.analysis = { ...k(), cooldownRemaining: this.analysis.cooldownRemaining }; }
    invalidateObservation() { this.phase = "preparing", this.readiness = l(), this.result = Y(), this.status = "", this.clearAnalysis(), this.checkReadiness(), this.changed(); }
    setMode(t) { if (this.locked || t === this.mode)
        return; this.mode = t, this.invalidateObservation(); }
    setIntent(t) { if (this.locked)
        return; this.intent = t, this.phase = "preparing", this.result = Y(), this.status = "", this.clearAnalysis(), this.changed(); }
    selectFormula(t) { if (this.submitting)
        return; if (this.phase === "result")
        this.materials = I(), this.intent = ""; this.formula = t, this.mode = "formula", this.invalidateObservation(); }
    addMaterial(t, c = P) { var _a; if (this.submitting || !t.id)
        return "limit-reached"; let n = Math.max(P, Math.min(N, (_a = t.quantity) !== null && _a !== void 0 ? _a : 1, Math.floor(c) || 1)); if (this.materials.ids.includes(t.id))
        return this.materials.doses = { ...this.materials.doses, [t.id]: n }, this.invalidateObservation(), "already-added"; if (this.phase !== "result" && this.materials.ids.length >= M)
        return "limit-reached"; if (this.phase === "result")
        this.materials = I(); return this.materials = { ids: [...this.materials.ids, t.id], map: { ...this.materials.map, [t.id]: t }, doses: { ...this.materials.doses, [t.id]: n } }, this.invalidateObservation(), "added"; }
    removeMaterial(t) { if (this.locked)
        return; let c = { ...this.materials.map }, n = { ...this.materials.doses }; delete c[t], delete n[t], this.materials = { ids: this.materials.ids.filter((h) => h !== t), map: c, doses: n }, this.invalidateObservation(); }
    setMaterialDose(t, c) { var _a; if (this.locked || !this.materials.map[t])
        return; this.materials.doses = { ...this.materials.doses, [t]: Math.max(P, Math.min(N, Math.max(P, (_a = this.materials.map[t].quantity) !== null && _a !== void 0 ? _a : N), Math.floor(c) || 1)) }, this.invalidateObservation(); }
    async checkReadiness() { var _a; let t = ++this.reader; if (!this.active)
        return; if (!this.readyForReadinessCheck) {
        this.readiness = l(), this.changed();
        return;
    } let c = this.selectionKey, n = new URLSearchParams({ craftType: "alchemy", alchemyMode: this.mode, materialIds: this.materials.ids.join(","), materialQuantities: JSON.stringify(this.materialQuantities), materialVersions: JSON.stringify(this.materialVersions) }); if (this.mode === "formula" && ((_a = this.formula) === null || _a === void 0 ? void 0 : _a.id))
        n.set("formulaId", this.formula.id); this.readiness = { ...this.readiness, key: c, loading: !0, error: null }, this.changed(); try {
        let h = await (0, official_chunk_sfhgdvjx_js_1.Sb)(`/api/craft?${n}`);
        if (this.active && t === this.reader && c === this.selectionKey)
            this.readiness = { key: c, estimatedSpiritStones: h.cost.spiritStones, estimatedQi: h.cost.qi, validation: h.validation, canAfford: h.canAfford, error: null, loading: !1 };
    }
    catch (h) {
        if (this.active && t === this.reader)
            this.readiness = { ...l(), key: c, error: h instanceof Error ? h.message : "材料检查失败" };
    }
    finally {
        if (this.active && t === this.reader)
            this.changed();
    } }
    startCooldown() { if (clearInterval(this.cooldown), this.analysis.cooldownRemaining > 0)
        this.cooldown = setInterval(() => { if (this.analysis.cooldownRemaining = Math.max(0, this.analysis.cooldownRemaining - 1), !this.analysis.cooldownRemaining)
            clearInterval(this.cooldown); this.changed(); }, 1000); }
    async analyzeFormula() { var _a; if (!this.active || this.submitting || this.analysis.loading || !this.readyForFormulaAnalysis || this.analysis.cooldownRemaining > 0)
        return !1; let t = ++this.analyzer, c = this.selectionKey; this.analysis = { ...this.analysis, loading: !0, error: null }, this.changed(); try {
        let n = await (0, official_chunk_sfhgdvjx_js_1.Tb)(`/api/alchemy/formulas/${this.formula.id}/analyze`, { materialIds: [...this.materials.ids], materialQuantities: this.materialQuantities, materialVersions: this.materialVersions });
        if (!this.active || t !== this.analyzer || c !== this.selectionKey)
            return !1;
        return this.analysisKey = c, this.analysis = { value: n, loading: !1, error: null, cooldownRemaining: n.cooldownRemainingSeconds }, clearTimeout(this.expiry), this.expiry = setTimeout(() => { if (!this.active || t !== this.analyzer)
            return; if (this.analysisKey = null, this.analysis = { ...k(), cooldownRemaining: this.analysis.cooldownRemaining, error: "本次丹方分析已过期，请重新查看炼制预览。" }, this.phase !== "firing" && this.phase !== "result")
            this.phase = "preparing"; this.changed(); }, n.expiresInSeconds * 1000), this.startCooldown(), this.phase = "observing", !0;
    }
    catch (n) {
        if (this.active && t === this.analyzer) {
            let h = (_a = n === null || n === void 0 ? void 0 : n.data) === null || _a === void 0 ? void 0 : _a.remainingSeconds;
            this.analysis = { ...this.analysis, value: null, loading: !1, error: n instanceof Error ? n.message : "丹方分析失败", ...typeof h === "number" ? { cooldownRemaining: h } : {} }, this.startCooldown();
        }
        return !1;
    }
    finally {
        if (this.active && t === this.analyzer)
            this.changed();
    } }
    returnToPreparation() { if (this.submitting)
        return; this.phase = "preparing", this.changed(); }
    get confirmation() { var _a, _b, _c; return [[this.mode === "improvised" ? "炼制目标" : "丹方", this.mode === "improvised" ? this.intent.trim() : (_b = (_a = this.formula) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "未选择"], ["材料投入", `${this.materials.ids.length} 味 · 共 ${this.totalDose} 份`], ["灵石消耗", `${(_c = this.readiness.estimatedSpiritStones) !== null && _c !== void 0 ? _c : 0} 枚`], ["天地灵气", `${this.qiCost} 点`], ...this.mode === "improvised" ? [["结果说明", "随心炼制无法预知丹药效果、品阶与数量，结果将在开鼎后揭晓。"]] : []]; }
    async submit(t) { var _a, _b, _c, _d, _e, _f, _g, _h; if (!this.active || this.submitting || this.mode !== t || !(t === "improvised" ? this.readyForImprovisedFire : this.readyForFormulaFire))
        return; let c = this.generation, n = () => this.active && c === this.generation, h = t === "improvised", r = { craftType: "alchemy", alchemyMode: this.mode, materialIds: [...this.materials.ids], materialQuantities: this.materialQuantities, materialVersions: this.materialVersions, ...h ? { userPrompt: this.intent.trim() } : { formulaId: (_a = this.formula) === null || _a === void 0 ? void 0 : _a.id, analysisId: (_b = this.analysis.value) === null || _b === void 0 ? void 0 : _b.analysisId } }; this.submitting = !0, this.phase = "firing", this.result = Y(), this.status = h ? "炉门闭合，陌生药气正在火中交汇……" : "炉门闭合，地火正沿丹方阵纹攀升……"; let g = Date.now(); for (let [a, V] of [[700, h ? "炉腹轰鸣，材料正在火中发生未知变化……" : "炉腹轰鸣，杂气正按既定火路逐层煅去……"], [1500, h ? "炉火渐稳，最终结果仍要等开鼎才能知晓……" : "药蕴回旋，丹药正在不同火层中凝形……"]])
        this.pulses.push(setTimeout(() => { if (n())
            this.status = V, this.changed(); }, a)); this.changed(); try {
        let a = await (0, official_chunk_sfhgdvjx_js_1.Tb)("/api/craft", r);
        if (!n())
            return;
        if (!a.consumable)
            throw Error("炉中未能凝丹");
        await this.refreshPlayer().catch(() => { });
        let V = this.ceremonyMs - (Date.now() - g);
        if (V > 0)
            await new Promise(($) => { let e = setTimeout($, V); this.stopCeremony = () => { clearTimeout(e), $(); }; });
        if (!n())
            return;
        this.result = { consumable: a.consumable, consumables: (_c = a.consumables) !== null && _c !== void 0 ? _c : [a.consumable], craftedConsumables: (_e = (_d = a.craftedConsumables) !== null && _d !== void 0 ? _d : a.consumables) !== null && _e !== void 0 ? _e : [a.consumable], yieldProfile: (_f = a.yieldProfile) !== null && _f !== void 0 ? _f : null, formulaDiscovery: (_g = a.formulaDiscovery) !== null && _g !== void 0 ? _g : null, formulaProgress: (_h = a.formulaProgress) !== null && _h !== void 0 ? _h : null }, this.status = "炉鸣三响，丹香已从炉隙逸出。", this.phase = "result";
    }
    catch (a) {
        if (n()) {
            let V = a instanceof Error ? a.message : "炼丹失败", $ = !h && (V.includes("请先推演药路") || V.includes("材料已发生变化"));
            if (this.status = V, $)
                this.clearAnalysis();
            this.phase = h || $ ? "preparing" : "observing", this.inform(V);
        }
    }
    finally {
        if (n())
            this.pulses.forEach(clearTimeout), this.pulses = [], this.stopCeremony = void 0, this.submitting = !1, this.changed();
    } }
    async resolveDiscovery(t) { let c = this.result.formulaDiscovery; if (!this.active || !c || this.discoveryPending)
        return; let n = this.generation; this.discoveryPending = !0, this.changed(); try {
        let h = await (0, official_chunk_sfhgdvjx_js_1.Tb)("/api/alchemy/formulas/discovery/confirm", { token: c.token, accept: t });
        if (this.active && n === this.generation) {
            if (this.result = { ...this.result, formulaDiscovery: null }, t)
                this.inform((h === null || h === void 0 ? void 0 : h.formula) ? `已将【${h.formula.name}】收入玉简。` : "新丹方已收入玉简。");
        }
    }
    catch (h) {
        if (this.active && n === this.generation)
            this.inform(h instanceof Error ? h.message : "丹方留存失败");
    }
    finally {
        if (this.active && n === this.generation)
            this.discoveryPending = !1, this.changed();
    } }
    startNextBatch() { if (this.submitting)
        return; this.intent = "", this.formula = null, this.materials = I(), this.invalidateObservation(); }
    resetDraft() { if (this.submitting)
        return; this.mode = "improvised", this.startNextBatch(); }
}
exports.mb = nn;
var $n = (t) => Array.from({ length: t }, (c, n) => { let h = n * 2 * Math.PI / t - Math.PI / 2; return [0.5 + 0.4 * Math.cos(h), 0.5 + 0.4 * Math.sin(h)]; });
function E(t, c) { let [n, h] = c === "in" ? [0.42, 1] : c === "out" ? [0, 0.58] : [0.42, 0.58], r = 0, g = 1; for (let V = 0; V < 14; V++) {
    let $ = (r + g) / 2;
    if (3 * (1 - $) ** 2 * $ * n + 3 * (1 - $) * $ * $ * h + $ * $ * $ < t)
        r = $;
    else
        g = $;
} let a = (r + g) / 2; return 3 * (1 - a) * a * a + a * a * a; }
class tn {
    constructor(t, c, n, h) {
        this.loaded = !1;
        this.loading = !1;
        this.error = "";
        this.generation = 0;
        this.revealed = !1;
        this.u = t;
        this.model = c;
        this.openBag = n;
        this.openFormula = h;
        this.preview = new official_chunk_sfhgdvjx_js_1.Ee(t);
    }
    enter() { this.reset(), this.load(); }
    reset() { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.generation++, clearTimeout(this.timer), this.timer = void 0, this.loading = !1, this.pendingAt = this.resultAt = void 0, this.result = void 0, this.revealed = !1, this.preview.close(); }
    load() { if (this.loaded || this.loading)
        return; this.loading = !0, this.error = ""; let t = this.generation; official_chunk_2mkgzpax_js_1.Oe.loadSubpackage({ name: "craft-alchemy", success: () => { if (t !== this.generation)
            return; this.loaded = !0, this.loading = !1, this.u.invalidate(); }, fail: () => { if (t !== this.generation)
            return; this.loading = !1, this.error = "炼丹炉素材加载失败", this.u.invalidate(); } }); }
    paint(t, c, n) { var _a, _b; let h = this.u, r = h.ctx, g = this.model, a = g.phase === "result" ? g.result.craftedConsumables[0] : void 0, V = g.mode === "formula" ? $n(7).slice(1) : $n(6), $ = (0, official_chunk_wvev9bhe_js_1.Db)(); if (g.phase === "firing" && this.pendingAt === void 0)
        this.pendingAt = $; if (g.phase !== "firing")
        this.pendingAt = void 0; if (a !== this.result)
        this.result = a, this.resultAt = a ? $ : void 0, this.revealed = !1; let e = this.resultAt === void 0 ? 0 : $ - this.resultAt; if (a && !this.revealed && e >= 1100)
        this.revealed = !0; if (g.phase === "firing" || a && !this.revealed)
        clearTimeout(this.timer), this.timer = setTimeout(() => h.invalidate(), 33); if (r.save(), r.strokeStyle = "rgba(44,24,16,.1)", r.lineWidth = 1, r.beginPath(), r.arc(t + n / 2, c + n / 2, n * 0.4, 0, Math.PI * 2), r.stroke(), r.restore(), this.loaded) {
        if (r.save(), g.phase === "firing" || a) {
            if (r.shadowColor = g.phase === "firing" ? "rgba(178,80,30,.45)" : "rgba(178,80,30,.25)", r.shadowBlur = g.phase === "firing" ? 18 : 12, g.phase === "firing")
                r.globalAlpha = 0.75 + 0.25 * Math.cos(($ - this.pendingAt) / 2000 * Math.PI * 2);
        }
        (0, official_chunk_2mkgzpax_js_1.Xe)(h, "icon:xuanfire-furnace", t + n * 0.19, c + n * 0.16, n * 0.62, n * 0.7), r.restore();
    } if (g.mode === "formula") {
        let i = n * 0.19, W = t + n * 0.5 - i / 2, B = c + n * 0.1 - i / 2;
        if (r.save(), g.locked)
            r.globalAlpha *= 0.6;
        h.rect(W, B, i, i, "#f8f3e6"), r.strokeStyle = "rgba(44,24,16,.3)", r.strokeRect(W + 0.5, B + 0.5, i - 1, i - 1);
        let J = (_b = (_a = g.formula) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "选择丹方";
        if (h.text(g.formula ? "\uD83D\uDCDC" : "＋", W + (i - h.measure(g.formula ? "\uD83D\uDCDC" : "＋", g.formula ? Math.min(44, i * 0.48) : 20)) / 2, B + i * 0.4, g.formula ? Math.min(44, i * 0.48) : 20), h.clip(W + 2, B + i * 0.72, i - 4, i * 0.25, () => h.text(J, W + Math.max(2, (i - h.measure(J, Math.min(12, i * 0.17))) / 2), B + i * 0.84, Math.min(12, i * 0.17))), r.restore(), !g.locked)
            h.hit(W, B, i, i, this.openFormula);
    } if (V.forEach(([i, W], B) => { var _a, _b, _c; let J = g.materials.ids[B], F = g.materials.map[J], Z = n * 0.19, K = t + n * i - Z / 2, U = c + n * W - Z / 2, s = F ? { definitionId: "material.v1", name: F.name, quantity: (_a = g.materials.doses[J]) !== null && _a !== void 0 ? _a : 1, instanceData: { name: F.name, type: F.type, rank: F.rank, element: (_b = F.element) !== null && _b !== void 0 ? _b : null, description: (_c = F.description) !== null && _c !== void 0 ? _c : "" } } : void 0; (0, official_chunk_sfhgdvjx_js_1.Ge)(h, K, U, Z, s, { disabled: g.locked, border: !g.locked ? "rgba(193,18,31,.5)" : void 0, emptyLabel: "投入灵材", emptyIcon: "＋", quick: () => F ? g.removeMaterial(J) : this.openBag(), preview: s ? () => this.preview.open(s, { x: K, y: U, w: Z, h: Z }, void 0, void 0, (Q) => { var _a, _b; let G = new official_chunk_2mkgzpax_js_1.Ne(h, Q); G.block(40, (j, b) => { var _a; if (h.text("入炉份量", j, b + 20, 14), r.strokeStyle = "rgba(44,24,16,.2)", r.strokeRect(j + 68.5, b + 0.5, 79, 39), h.text(String((_a = g.materials.doses[J]) !== null && _a !== void 0 ? _a : 1), j + 77, b + 20, 14), !g.locked)
            h.hit(j + 68, b, 80, 40, () => { var _a; return this.editDose(J, Math.min((_a = F.quantity) !== null && _a !== void 0 ? _a : 1, N)); }); }), G.gap(12); for (let j of (_b = (_a = g.analysis.value) === null || _a === void 0 ? void 0 : _a.materialJudgments.filter((b) => b.materialId === J)) !== null && _b !== void 0 ? _b : [])
            G.text(j.reason, 14, 24), G.gap(12); return G.block(32.32, (j, b) => h.inert(g.locked, () => h.button("移出", j, b, () => { g.removeMaterial(J), this.preview.close(); }))), G; }) : void 0 }); }), g.phase === "firing") {
        let i = ($ - this.pendingAt) / 800, W = { x: t + n * 0.5, y: c + n * 0.53 };
        if (i <= 1) {
            let K = i <= 0.2 ? 0 : E(Math.min(1, (i - 0.2) / 0.8), "in"), U = i <= 0.2 ? E(i / 0.2, "in") : 1 - K, s = 1 - 0.96 * K;
            r.save(), r.globalAlpha = U, V.forEach(([Q, G], j) => { if (!g.materials.ids[j])
                return; r.shadowColor = "rgba(217,146,62,.65)", r.shadowBlur = 18, r.fillStyle = "#fde68a", r.beginPath(), r.arc(W.x + (t + n * Q - W.x) * s, W.y + (c + n * G - W.y) * s, 8 * s, 0, Math.PI * 2), r.fill(); }), r.restore();
        }
        let B = ($ - this.pendingAt) / 1600 % 2, J = E(B <= 1 ? B : 2 - B, "both"), F = n * 0.15 * (0.65 + 0.6 * J);
        r.save(), r.globalAlpha = 0.25 + 0.75 * J;
        let Z = r.createRadialGradient(W.x, W.y, 0, W.x, W.y, F);
        Z.addColorStop(0, "rgba(255,210,120,.85)"), Z.addColorStop(0.4, "rgba(210,95,30,.4)"), Z.addColorStop(0.7, "transparent"), r.fillStyle = Z, r.fillRect(W.x - F, W.y - F, F * 2, F * 2), r.restore();
    } if (a) {
        let i = Math.min(1, e / 1100), W = i < 0.45 ? E(i / 0.45, "out") : E(Math.min(1, (i - 0.45) / 0.3), "out"), B = i < 0.45 ? 0.45 + 0.67 * W : i < 0.75 ? 1.12 - 0.12 * W : 1, J = i < 0.45 ? W : 1, F = n * 0.19, Z = t + n * 0.5 - F / 2, K = c + n * 0.53 - F / 2, U = { definitionId: "consumable.v1", name: a.name, quantity: a.quantity, instanceData: (0, official_chunk_sfhgdvjx_js_1.zd)(a) };
        r.save(), r.translate(Z + F / 2, K + F / 2), r.scale(B, B), r.translate(-Z - F / 2, -K - F / 2), r.globalAlpha = J, r.shadowColor = "rgba(178,80,30,.3)", r.shadowBlur = 24, h.inert(!this.revealed, () => (0, official_chunk_sfhgdvjx_js_1.Ge)(h, Z, K, F, U, { badge: "主丹", disabled: !this.revealed, preview: () => this.preview.open(U, { x: Z, y: K, w: F, h: F }) })), r.restore();
    } }
    editDose(t, c) { var _a, _b; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); let n = (r) => { let g = Number(r.value); if (Number.isFinite(g) && g > 0)
        this.model.setMaterialDose(t, Math.min(c, g)); }, h = (r) => { var _a; n(r), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); }; this.stopKeyboard = () => { official_chunk_2mkgzpax_js_1.Oe.offKeyboardInput(n), official_chunk_2mkgzpax_js_1.Oe.offKeyboardComplete(h), official_chunk_2mkgzpax_js_1.Oe.hideKeyboard(), this.stopKeyboard = void 0; }, official_chunk_2mkgzpax_js_1.Oe.onKeyboardInput(n), official_chunk_2mkgzpax_js_1.Oe.onKeyboardComplete(h), official_chunk_2mkgzpax_js_1.Oe.showKeyboard({ defaultValue: String((_b = this.model.materials.doses[t]) !== null && _b !== void 0 ? _b : 1), maxLength: 10, multiple: !1, confirmHold: !1, confirmType: "done" }); }
    paintOverlay() { this.preview.paint(); }
}
exports.nb = tn;
function en(t) { var _a, _b; let c = new Map; for (let n of [...t].sort((h, r) => h.id.localeCompare(r.id))) {
    if (n.location !== "bag" || ((_a = (0, official_chunk_sfhgdvjx_js_1.Yd)(n.definitionId)) === null || _a === void 0 ? void 0 : _a.kind) !== "material")
        continue;
    let h = (0, official_chunk_sfhgdvjx_js_1.pe)(n.instanceData);
    if (h.type === "gongfa_manual" || h.type === "skill_manual")
        continue;
    let r = (0, official_chunk_wvev9bhe_js_1.Cb)("material.v1", h), g = (_b = c.get(r)) !== null && _b !== void 0 ? _b : { ...h, id: n.id, quantity: 0, members: [] };
    g.quantity += n.quantity, g.members.push({ id: n.id, revision: n.revision, quantity: n.quantity, slotIndex: n.slotIndex }), c.set(r, g);
} return [...c.values()]; }
function sn(t) { return t.filter((c) => { var _a; return c.location === "storage" && ((_a = (0, official_chunk_sfhgdvjx_js_1.Yd)(c.definitionId)) === null || _a === void 0 ? void 0 : _a.kind) === "material"; }).flatMap((c) => { let n = (0, official_chunk_sfhgdvjx_js_1.pe)(c.instanceData); return n.type === "gongfa_manual" || n.type === "skill_manual" ? [] : [{ ...n, id: c.id, quantity: c.quantity, members: [{ id: c.id, revision: c.revision, quantity: c.quantity, slotIndex: c.slotIndex }] }]; }); }
class p {
    constructor(t, c, n) {
        this.dose = 1;
        this.u = t;
        this.model = c;
        this.onChoose = n;
        this.bag = new official_chunk_sfhgdvjx_js_1.He(() => t.invalidate()), this.preview = new official_chunk_sfhgdvjx_js_1.Ee(t), this.filters = new official_chunk_wvev9bhe_js_1.Bb(t, (h) => { this.bag.page = 0, this.bag.setFilter(h); });
    }
    enter() { this.reset(), this.bag.enter(); }
    reset() { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.bag.leave(), this.preview.close(), this.filters.closeFilter(); }
    editDose(t) { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); let c = (h) => { let r = Number(h.value); if (Number.isFinite(r) && r > 0)
        this.dose = Math.min(t, Math.max(1, Math.floor(r))); this.u.invalidate(); }, n = (h) => { var _a; c(h), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); }; this.stopKeyboard = () => { official_chunk_2mkgzpax_js_1.Oe.offKeyboardInput(c), official_chunk_2mkgzpax_js_1.Oe.offKeyboardComplete(n), official_chunk_2mkgzpax_js_1.Oe.hideKeyboard(), this.stopKeyboard = void 0; }, official_chunk_2mkgzpax_js_1.Oe.onKeyboardInput(c), official_chunk_2mkgzpax_js_1.Oe.onKeyboardComplete(n), official_chunk_2mkgzpax_js_1.Oe.showKeyboard({ defaultValue: String(this.dose), maxLength: 10, multiple: !1, confirmHold: !1, confirmType: "done" }); }
    flow(t) { var _a, _b; let c = this.u, n = this.model, h = this.bag, r = new official_chunk_2mkgzpax_js_1.Ne(c, t), g = h.view, a = h.filter, V = n.locked || !g || h.loading || !!h.error, $ = (h.source === "bag" ? en : sn)((_a = g === null || g === void 0 ? void 0 : g.items) !== null && _a !== void 0 ? _a : []); if (r.block(40, (F, Z) => { var _a, _b; let K = F; for (let [Q, G] of [["bag", "储物袋"], ["storage", "储藏室"]]) {
        let j = c.measure(G, 14) + 8;
        if (c.text(G, K + 4, Z + 20, 14, h.source === Q ? official_chunk_2mkgzpax_js_1.Me.crimson : official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), h.source === Q)
            c.rect(K, Z + 39, j, 1, "rgba(193,18,31,.6)");
        c.hit(K, Z, j, 40, () => h.setSource(Q)), K += j + 16;
    } let U = c.buttonWidth("刷新"); c.inert(h.loading, () => c.button("刷新", F + t - U, Z + 3.84, () => void h.reload())); let s = h.source === "bag" ? `${(_a = g === null || g === void 0 ? void 0 : g.used) !== null && _a !== void 0 ? _a : "—"} / 40` : `${(_b = g === null || g === void 0 ? void 0 : g.total) !== null && _b !== void 0 ? _b : "—"} 格`; c.text(s, F + t - U - 12 - c.measure(s, 12, "monospace"), Z + 20, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"], "monospace"); }), r.gap(12), r.block(32.32, (F, Z) => c.button(`筛选${(0, official_chunk_wvev9bhe_js_1.zb)(a) ? " · 已启用" : ""}`, F, Z, () => this.filters.open(a))), r.gap(12), h.error)
        r.text(h.error, 14, 20, official_chunk_2mkgzpax_js_1.Me.crimson), r.gap(12);
    else if (!g)
        r.text(`正在读取${h.source === "bag" ? "储物袋" : "储藏室"}……`, 14, 20), r.gap(12); r.text("轻点操作，长按查看详情", 12, 16, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), r.gap(8); let e = ((_b = g === null || g === void 0 ? void 0 : g.items) !== null && _b !== void 0 ? _b : []).filter((F) => h.source === "storage" || !(0, official_chunk_wvev9bhe_js_1.zb)(a) || (0, official_chunk_wvev9bhe_js_1.Ab)(F, a)), i = new Map(e.map((F) => [F.slotIndex, F])), W = h.source === "bag" && !(0, official_chunk_wvev9bhe_js_1.zb)(a) ? Array.from({ length: 40 }, (F, Z) => i.get(Z)) : e, B = (t - 24) / 5, J = Math.ceil(W.length / 5); if (r.block(J * (B + 6) - Math.min(6, J * 6), (F, Z) => W.forEach((K, U) => { var _a; let s = F + U % 5 * (B + 6), Q = Z + Math.floor(U / 5) * (B + 6), G = K ? $.find((f) => f.members.some((O) => O.id === K.id)) : void 0, j = G ? { ...G, element: (_a = G.element) !== null && _a !== void 0 ? _a : void 0 } : void 0, b = j ? n.materials.doses[j.id] : void 0, C = n.materials.ids.length >= M && !b, H = (f) => { var _a; if (j && !V && !C)
        ((_a = this.onChoose) !== null && _a !== void 0 ? _a : ((O, S) => n.addMaterial(O, S)))(j, f); }; (0, official_chunk_sfhgdvjx_js_1.Ge)(c, s, Q, B, K, { disabled: V || !!j && C, badge: b ? `已投${b}` : j && !C ? "可选" : void 0, quick: j ? () => H(Math.min((b !== null && b !== void 0 ? b : 0) + 1, j.quantity, N)) : void 0, preview: K ? () => { this.dose = b !== null && b !== void 0 ? b : 1, this.preview.open(K, { x: s, y: Q, w: B, h: B }, void 0, void 0, (f) => { let O = new official_chunk_2mkgzpax_js_1.Ne(c, f); if (!j)
            O.text("此物品不能用于炼丹。", 14, 24, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]);
        else
            O.block(40, (S, D) => { if (c.text("投入份量", S, D + 20, 14), c.ctx.strokeStyle = "rgba(44,24,16,.2)", c.ctx.strokeRect(S + 68.5, D + 0.5, 79, 39), c.text(String(this.dose), S + 77, D + 20, 14, official_chunk_2mkgzpax_js_1.Me.ink, "monospace"), !V && !C)
                c.hit(S + 68, D, 80, 40, () => this.editDose(Math.min(j.quantity, N))); }), O.gap(12), O.block(32.32, (S, D) => c.inert(V || C, () => c.button(C ? "材料格已满" : b ? "调整份量" : "投入丹炉", S, D, () => { var _a; H(this.dose), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.preview.close(); }))); return O; }); } : void 0 }); })), h.source === "storage" && g && g.total > 40)
        r.gap(12), r.block(32.32, (F, Z) => { c.inert(h.loading || g.page === 0, () => c.button("上一页", F, Z, () => h.setPage(g.page - 1))); let K = `${g.page + 1} / ${Math.ceil(g.total / 40)}`; c.text(K, F + (t - c.measure(K, 14, "monospace")) / 2, Z + 16.16, 14, official_chunk_2mkgzpax_js_1.Me.ink, "monospace"), c.inert(h.loading || (g.page + 1) * 40 >= g.total, () => c.button("下一页", F + t - c.buttonWidth("下一页"), Z, () => h.setPage(g.page + 1))); }); return r; }
    paintOverlay() { this.filters.paint(), this.preview.paint(); }
}
exports.ob = p;
class rn {
    constructor(t, c, n = 5) {
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
        this.inform = c;
        this.pageSize = n;
    }
    enter() { this.active = !0, this.debouncedSearch = this.search.trim(), this.reload(); }
    leave() { this.active = !1, this.generation++, this.reader++, clearTimeout(this.debounce), this.loading = this.deleting = !1; }
    setSearch(t) { this.search = t, this.page = 1, clearTimeout(this.debounce), this.reader++, this.debounce = setTimeout(() => { this.debouncedSearch = this.search.trim(), this.reload(); }, 300), this.changed(); }
    setFamily(t) { this.family = t, this.page = 1, this.reload(); }
    setPage(t) { this.page = Math.max(1, t), this.reload(); }
    async reload() { if (!this.active)
        return; let t = ++this.reader, c = new URLSearchParams({ page: String(this.page), pageSize: String(this.pageSize) }); if (this.debouncedSearch)
        c.set("search", this.debouncedSearch); if (this.family !== "all")
        c.set("family", this.family); this.loading = !0, this.error = null, this.changed(); try {
        let n = await (0, official_chunk_sfhgdvjx_js_1.Sb)(`/api/alchemy/formulas?${c}`);
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
        return; let c = this.generation; this.deleting = !0, this.changed(); try {
        let n = await (0, official_chunk_sfhgdvjx_js_1.Nb)(`/api/alchemy/formulas/${encodeURIComponent(t.id)}`, "DELETE");
        if (this.active && c === this.generation) {
            if (this.inform(n.message || `已删除丹方【${t.name}】。`), this.formulas.length === 1 && this.page > 1)
                this.page--;
            await this.reload();
        }
    }
    catch (n) {
        if (this.active && c === this.generation)
            this.inform(n instanceof Error ? n.message : "丹方删除失败");
    }
    finally {
        if (this.active && c === this.generation)
            this.deleting = !1, this.changed();
    } }
}
exports.pb = rn;
var fn = { restore_hp: `补充${(0, official_chunk_sfhgdvjx_js_1.fc)("hp")}`, heal_wounds: "治愈伤势", restore_mp: `回补${(0, official_chunk_sfhgdvjx_js_1.fc)("mp")}`, detox: "解毒祛浊", beast_cultivation: "滋养灵兽修为", cultivation: `积蓄${(0, official_chunk_sfhgdvjx_js_1.fc)("cultivation_exp")}`, insight: `澄明${(0, official_chunk_sfhgdvjx_js_1.fc)("comprehension_insight")}`, clear_mind_support: "清心定神", protect_meridians_support: "护脉稳络", breakthrough_support: "冲关蓄势", extend_lifespan: `延长${(0, official_chunk_sfhgdvjx_js_1.fc)("lifespan")}`, body_skin: "炼体·皮肤", body_sinew_bone: "炼体·筋骨", body_organs: "炼体·脏腑", body_qi_blood: "炼体·气血", body_primordial_spirit: "炼体·元神", marrow_wash: "洗髓伐脉" }, Nn = { tempering_vitality: "炼体·气血", tempering_spirit: "炼体·脏腑", tempering_wisdom: "炼体·元神", tempering_speed: "炼体·皮肤", tempering_willpower: "炼体·筋骨" }, jn = { restore_hp: 0, heal_wounds: 1, restore_mp: 2, detox: 3, cultivation: 4, beast_cultivation: 21, insight: 5, clear_mind_support: 6, protect_meridians_support: 7, breakthrough_support: 8, extend_lifespan: 9, body_skin: 10, body_sinew_bone: 11, body_organs: 12, body_qi_blood: 13, body_primordial_spirit: 14, tempering_vitality: 15, tempering_spirit: 16, tempering_wisdom: 17, tempering_speed: 18, tempering_willpower: 19, marrow_wash: 20 };
function Xn(t) { var _a, _b; return (_b = (_a = fn[t]) !== null && _a !== void 0 ? _a : Nn[t]) !== null && _b !== void 0 ? _b : t; }
function Hn(t) { return [...t].sort((c, n) => { if (n.weight !== c.weight)
    return n.weight - c.weight; return jn[c.key] - jn[n.key]; }); }
function Rn(t) { let c = Number((t * 100).toFixed(1)); return `${Number.isInteger(c) ? c.toFixed(0) : c}%`; }
function Gn(t) { if (t.length === 0)
    return "无"; return Hn(t).map((c) => `${Xn(c.key)} ${Rn(c.weight)}`).join("、"); }
class _ {
    constructor(t, c, n) {
        this.picker = !1;
        this.familyOpen = !1;
        this.savedScroll = 0;
        this.u = t;
        this.selected = c;
        this.choose = n;
        this.library = new rn(() => t.invalidate(), official_chunk_2mkgzpax_js_1.Re);
    }
    enterArchive() { this.reset(), this.library.enter(); }
    openPicker() { this.picker = !0, this.library.enter(), this.u.modalScroll = 0, this.u.invalidate(); }
    closePicker() { var _a; this.picker = !1, this.library.leave(), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.u.modalScroll = 0, this.u.invalidate(); }
    reset() { var _a; this.library.leave(), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.picker = this.familyOpen = !1, this.detail = this.deletion = void 0; }
    button(t, c, n, h, r = !1, g = !1) { let a = this.u; if (a.ctx.save(), r)
        a.ctx.globalAlpha *= 0.5; a.inert(r, () => a.button(t, c, n, h, r ? official_chunk_2mkgzpax_js_1.Me["ink-secondary"] : g ? official_chunk_2mkgzpax_js_1.Me.crimson : official_chunk_2mkgzpax_js_1.Me["ink-secondary"])), a.ctx.restore(); }
    search() { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); let t = (n) => this.library.setSearch(n.value), c = (n) => { var _a; t(n), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); }; this.stopKeyboard = () => { official_chunk_2mkgzpax_js_1.Oe.offKeyboardInput(t), official_chunk_2mkgzpax_js_1.Oe.offKeyboardComplete(c), official_chunk_2mkgzpax_js_1.Oe.hideKeyboard(), this.stopKeyboard = void 0; }, official_chunk_2mkgzpax_js_1.Oe.onKeyboardInput(t), official_chunk_2mkgzpax_js_1.Oe.onKeyboardComplete(c), official_chunk_2mkgzpax_js_1.Oe.showKeyboard({ defaultValue: this.library.search, maxLength: 200, multiple: !1, confirmHold: !1, confirmType: "search" }); }
    facts(t, c) { var _a; let n = this.u, h = new official_chunk_2mkgzpax_js_1.Ne(n, c); h.gap(12), h.block(1, (g, a) => { n.ctx.save(), n.ctx.strokeStyle = "rgba(44,24,16,.1)", n.ctx.setLineDash([3, 3]), n.ctx.beginPath(), n.ctx.moveTo(g, a), n.ctx.lineTo(g + c, a), n.ctx.stroke(), n.ctx.restore(); }), h.gap(12); for (let [g, a] of [["材料数量", `${t.pattern.slotCount} 味`], ["最低品质", (_a = t.pattern.minQuality) !== null && _a !== void 0 ? _a : "不限"], ["熟练度", `Lv.${t.mastery.level}`]])
        h.block(16, (V, $) => { n.text(g, V, $ + 8, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), n.text(a, V + c - n.measure(a, 12), $ + 8, 12); }), h.gap(8); let r = Gn(t.pattern.targetPropertyVector) || "未记录"; return h.text(`药效方向：${r}${t.pattern.dominantElement ? ` · 主要属性：${t.pattern.dominantElement}` : ""}`, 12, 20), h; }
    use(t) { if (this.detail = void 0, this.choose(t), this.picker)
        this.closePicker(); }
    confirmDelete(t) { this.detail = void 0, this.deletion = t, this.savedScroll = this.u.modalScroll, this.u.modalScroll = 0, this.u.invalidate(); }
    flow(t, c = !1) { let n = this.u, h = this.library, r = new official_chunk_2mkgzpax_js_1.Ne(n, t), g = c ? 16 : 20; if (r.block(40, (a, V) => { n.ctx.strokeStyle = "rgba(44,24,16,.2)", n.ctx.strokeRect(a + 0.5, V + 0.5, t - 1, 39), n.clip(a + 12, V, t - 24, 40, () => n.text(h.search || (c ? "搜索丹方名称" : "以丹方名检索玉简"), a + 12, V + 20, 14, h.search ? official_chunk_2mkgzpax_js_1.Me.ink : official_chunk_2mkgzpax_js_1.Me["ink-secondary"])), n.hit(a, V, t, 40, () => this.search()); }), r.gap(c ? 8 : 12), r.block(40, (a, V) => { n.ctx.strokeStyle = "rgba(44,24,16,.2)", n.ctx.strokeRect(a + 0.5, V + 0.5, t - 1, 39), n.text(h.family === "all" ? c ? "全部用途" : "全部丹类" : (0, official_chunk_sfhgdvjx_js_1.td)(h.family), a + 12, V + 20, 14), n.text("⌄", a + t - 24, V + 20, 14), n.hit(a, V, t, 40, () => { this.savedScroll = n.modalScroll, this.familyOpen = !0, n.modalScroll = 0, n.invalidate(); }); }), !c)
        r.gap(12), r.block(32.32, (a, V) => this.button(h.loading ? "处理中……" : "刷新玉简", a, V, () => void h.reload(), h.loading)); if (r.gap(g), h.error)
        r.text(h.error, 14, 24, official_chunk_2mkgzpax_js_1.Me.crimson), r.gap(g); if (h.loading && !h.formulas.length)
        r.text("正在读取丹方……", 14, 24, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), r.gap(g); for (let a of h.formulas) {
        let V = c && this.selected() === a.id, $ = t - 34, e = new official_chunk_2mkgzpax_js_1.Ne(n, $), i = $ - (c ? 60 : 0), W = Math.min(i, n.measure(a.name, 16)), B = `「${(0, official_chunk_sfhgdvjx_js_1.td)(a.family)}」`, J = n.measure(B, 12) + 8, F = W + 8 + J <= i;
        e.block(F ? 24 : 44, (s, Q) => { if (n.clip(s, Q, i, 24, () => n.text(a.name, s, Q + 12, 16, official_chunk_2mkgzpax_js_1.Me.ink, n.bodyFont, c)), n.text(B, F ? s + W + 12 : s + 4, F ? Q + 12 : Q + 34, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), c) {
            let G = V ? "当前选择" : "选择";
            n.text(G, s + $ - n.measure(G, 12), Q + 8, 12, V ? official_chunk_2mkgzpax_js_1.Me.crimson : official_chunk_2mkgzpax_js_1.Me["ink-secondary"], n.bodyFont, V);
        } }), e.gap(4);
        let Z = n.lines(a.description || "暂无丹方说明。", i, 12).slice(0, 2);
        e.block(Z.length * 20, (s, Q) => Z.forEach((G, j) => n.text(G, s, Q + 10 + j * 20, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"])));
        let K = this.facts(a, $);
        if (e.block(K.height, (s, Q) => K.paint(s, Q)), !c) {
            e.gap(12), e.rule(), e.gap(12);
            let s = [{ label: "查看详情", run: () => { this.detail = a, n.modalScroll = 0, n.invalidate(); } }, { label: "删除", run: () => this.confirmDelete(a) }, { label: "使用此丹方", run: () => this.use(a), primary: !0 }], Q = [], G = 0, j = () => { let b = Q, C = G; e.block(32.32, (H, f) => { let O = $ - C; for (let S of b)
                this.button(S.label, H + O, f, S.run, !1, S.primary), O += n.buttonWidth(S.label) + 8; }), Q = [], G = 0; };
            for (let b of s) {
                let C = n.buttonWidth(b.label);
                if (Q.length && G + 8 + C > $)
                    j(), e.gap(8);
                G += (Q.length ? 8 : 0) + C, Q.push(b);
            }
            if (Q.length)
                j();
        }
        let U = c ? 12 : 16;
        r.block(e.height + U * 2 + 2, (s, Q) => { if (n.rect(s, Q, t, e.height + U * 2 + 2, V ? "rgba(193,18,31,.045)" : c ? "rgba(0,0,0,0)" : "rgba(44,24,16,.012)"), n.ctx.strokeStyle = V ? official_chunk_2mkgzpax_js_1.Me.crimson : "rgba(44,24,16,.15)", n.ctx.strokeRect(s + 0.5, Q + 0.5, t - 1, e.height + U * 2 + 1), e.paint(s + 17, Q + U + 1), c)
            n.hit(s, Q, t, e.height + U * 2 + 2, () => this.use(a)); }), r.gap(c ? 8 : 12);
    } if (!h.loading && !h.formulas.length)
        r.text(c ? "暂无符合条件的丹方。" : "尚未留存丹方。可在丹炉选择随心炼丹，成功后有机会悟得新方。", 14, 24, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), r.gap(g); return r.gap(c ? 8 : 8), r.block(32.32, (a, V) => { this.button("上一页", a, V, () => { if (h.setPage(h.page - 1), c)
        n.modalScroll = 0;
    else
        n.scroll = 0; }, h.loading || !h.pagination.hasPreviousPage); let $ = c ? `第 ${h.pagination.page} / ${Math.max(1, h.pagination.totalPages)} 页` : `${h.pagination.page} / ${Math.max(1, h.pagination.totalPages)}`; n.text($, a + (t - n.measure($, 12)) / 2, V + 16.16, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), this.button("下一页", a + t - n.buttonWidth("下一页"), V, () => { if (h.setPage(h.page + 1), c)
        n.modalScroll = 0;
    else
        n.scroll = 0; }, h.loading || !h.pagination.hasNextPage); }), r; }
    paintOverlay() { let t = this.u; if (this.picker) {
        let c = t.modalScroll;
        if (this.familyOpen)
            t.modalScroll = this.savedScroll;
        if ((0, official_chunk_2mkgzpax_js_1.Se)(t, { title: "选择本炉丹方", description: "查看丹药用途、材料要求和熟练度，点击一行即可选择。", rows: [], content: this.flow(t.width - 32, !0), footer: { height: 32.32, paint: (n, h) => { t.text(this.selected() ? "已为本炉选择丹方" : "尚未选择丹方", n, h + 16.16, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), this.button("关闭", t.width - 16 - t.buttonWidth("关闭"), h, () => this.closePicker()); } } }, () => this.closePicker()), this.familyOpen)
            t.modalScroll = c;
    } if (this.detail) {
        let c = this.detail, n = new official_chunk_2mkgzpax_js_1.Ne(t, t.width - 32);
        n.text(`「${(0, official_chunk_sfhgdvjx_js_1.td)(c.family)}」`, 14, 24, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), n.gap(20), n.text(c.description || "这份丹方暂未留下更多说明。", 14, 28, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), n.gap(8);
        let h = this.facts(c, t.width - 32);
        n.block(h.height, (r, g) => h.paint(r, g)), (0, official_chunk_2mkgzpax_js_1.Se)(t, { title: c.name, description: "查看这份丹方的用途、材料要求和药效方向。", rows: [], content: n, actions: [{ label: "删除丹方", run: () => this.confirmDelete(c) }, { label: "使用此丹方", primary: !0, run: () => this.use(c) }] }, () => { this.detail = void 0, t.invalidate(); });
    } if (this.deletion) {
        let c = this.deletion, n = () => { if (this.library.deleting)
            return; this.deletion = void 0, t.modalScroll = this.savedScroll, t.invalidate(); };
        (0, official_chunk_2mkgzpax_js_1.Se)(t, { title: "删除丹方", style: "modal", rows: [{ text: `确定要删除丹方【${c.name}】吗？` }, { text: "此操作不会影响已经炼成的丹药。" }], actions: [{ label: "保留", disabled: this.library.deleting, run: n }, { label: "确认删除", disabled: this.library.deleting, run: () => void this.library.deleteFormula(c).then(n) }] }, n);
    } if (this.familyOpen) {
        let c = () => { this.familyOpen = !1, t.modalScroll = this.savedScroll, t.invalidate(); }, n = new official_chunk_2mkgzpax_js_1.Ne(t, Math.min(448, t.width - 24) - 34);
        for (let h of ["all", ...official_chunk_sfhgdvjx_js_1.Ic])
            n.block(40, (r, g) => { t.text(h === "all" ? this.picker ? "全部用途" : "全部丹类" : (0, official_chunk_sfhgdvjx_js_1.td)(h), r + 8, g + 20, 14, this.library.family === h ? official_chunk_2mkgzpax_js_1.Me.crimson : official_chunk_2mkgzpax_js_1.Me.ink), t.hit(r, g, n.width, 40, () => { this.library.setFamily(h), c(); }); });
        (0, official_chunk_2mkgzpax_js_1.Se)(t, { title: "按丹药用途筛选", style: "modal", rows: [], content: n }, c);
    } }
}
exports.qb = _;
function Un(t) { if (!t)
    return "丹纹尚未定形。"; let c = Object.entries(t).filter(([, n]) => (n !== null && n !== void 0 ? n : 0) > 0).sort(([, n], [, h]) => (h !== null && h !== void 0 ? h : 0) - (n !== null && n !== void 0 ? n : 0)).slice(0, 2).map(([n]) => (0, official_chunk_sfhgdvjx_js_1.ld)(n)); return c.length ? `${c.join("、")}的迹象最为明显。` : "丹纹尚未定形。"; }
function bn(t) { var _a; if (!t)
    return null; if ((_a = t.conclusion) === null || _a === void 0 ? void 0 : _a.trim())
    return t.conclusion.trim(); if (t.fitBand === "aligned")
    return "丹方火纹与炉中药气彼此咬合，药路已经完全显明。"; if (t.fitBand === "degraded")
    return "药路尚能循方而行，但有一部分药蕴会在收束时散失。"; return "当前材料与丹方差异较大，继续炼制仍可能成丹，但结果可能不理想。"; }
class an {
    constructor(t, c) {
        this.expanded = !1;
        this.confirming = !1;
        this.u = t;
        this.model = c;
        this.preview = new official_chunk_sfhgdvjx_js_1.Ee(t);
    }
    reset() { var _a; this.preview.close(), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.confirming = this.expanded = !1; }
    button(t, c, n, h, r = !1, g = !1, a) { let V = this.u, $ = r ? official_chunk_2mkgzpax_js_1.Me["ink-secondary"] : g ? official_chunk_2mkgzpax_js_1.Me.crimson : official_chunk_2mkgzpax_js_1.Me.ink, e = V.buttonWidth(t, g); if (V.ctx.save(), r)
        V.ctx.globalAlpha *= 0.5; if (V.inert(r, () => V.button(t, c, n, h, $)), V.ctx.restore(), a) {
        if (V.markGuideAnchor(a, c, n, e, 32.32), !r)
            V.hit(c, n, e, 32.32, h, {}, a);
    } }
    edit() { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); let t = (n) => this.model.setIntent(n.value), c = (n) => { var _a; t(n), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); }; this.stopKeyboard = () => { official_chunk_2mkgzpax_js_1.Oe.offKeyboardInput(t), official_chunk_2mkgzpax_js_1.Oe.offKeyboardComplete(c), official_chunk_2mkgzpax_js_1.Oe.hideKeyboard(), this.stopKeyboard = void 0; }, official_chunk_2mkgzpax_js_1.Oe.onKeyboardInput(t), official_chunk_2mkgzpax_js_1.Oe.onKeyboardComplete(c), official_chunk_2mkgzpax_js_1.Oe.showKeyboard({ defaultValue: this.model.intent, maxLength: 300, multiple: !1, confirmHold: !1, confirmType: "done" }); }
    confirm() { this.confirming = !0, this.u.modalScroll = 0, this.u.invalidate(); }
    centered(t, c, n = 12, h = official_chunk_2mkgzpax_js_1.Me["ink-secondary"]) { let r = this.u.lines(c, t.width, n); t.block(r.length * 16, (g, a) => r.forEach((V, $) => this.u.text(V, g + (t.width - this.u.measure(V, n)) / 2, a + 8 + $ * 16, n, h))); }
    flow(t) { var _a, _b, _c, _d; let c = this.u, n = this.model, h = new official_chunk_2mkgzpax_js_1.Ne(c, t); if (n.phase === "firing")
        return h.gap(16), this.centered(h, n.status || "炉火正盛，静候丹成……"), h.gap(16), h; if (n.phase === "result") {
        let W = n.result.craftedConsumables.slice(1), B = Math.max(1, Math.floor((t + 8) / 88));
        if (W.length)
            h.block(Math.ceil(W.length / B) * 88 - 8, (J, F) => W.forEach((Z, K) => { let U = Math.floor(K / B), s = Math.min(B, W.length - U * B), Q = J + (t - (s * 88 - 8)) / 2 + K % B * 88, G = F + U * 88, j = { definitionId: "consumable.v1", name: Z.name, quantity: Z.quantity, instanceData: (0, official_chunk_sfhgdvjx_js_1.zd)(Z) }; (0, official_chunk_sfhgdvjx_js_1.Ge)(c, Q, G, 80, j, { badge: "副丹", preview: () => this.preview.open(j, { x: Q, y: G, w: 80, h: 80 }) }); }));
        if (h.gap(12), this.centered(h, `成丹 ${n.result.craftedConsumables.reduce((J, F) => J + F.quantity, 0)} 枚 · 已入物品栏，随身格位不足时存入储藏室`), n.result.formulaProgress)
            h.gap(12), this.centered(h, `丹方熟练 +${n.result.formulaProgress.gainedExp} · Lv.${n.result.formulaProgress.level}`, 12, official_chunk_2mkgzpax_js_1.Me.ink);
        if (n.result.formulaDiscovery)
            h.gap(12), h.rule(), h.gap(12), h.text(`发现丹方：${n.result.formulaDiscovery.name}`, 14, 20), h.gap(12), h.block(32.32, (J, F) => { this.button("不保存", J, F, () => void n.resolveDiscovery(!1), n.discoveryPending), this.button("保存丹方", J + c.buttonWidth("不保存") + 12, F, () => void n.resolveDiscovery(!0), n.discoveryPending); });
        return h.gap(12), h.block(32.32, (J, F) => this.button("再炼一炉", J + (t - c.buttonWidth("再炼一炉")) / 2, F, () => n.startNextBatch(), !1, !0)), h;
    } if (n.phase === "observing") {
        let W = n.analysis.value, B = W === null || W === void 0 ? void 0 : W.batchProfile, J = new official_chunk_2mkgzpax_js_1.Ne(c, t - 32);
        J.block(16, (s, Q) => { c.text("✦", s, Q + 8, 12, official_chunk_2mkgzpax_js_1.Me.wood), c.tracked("丹方预览", s + 20, Q + 8, 12, 1.2, official_chunk_2mkgzpax_js_1.Me.wood), c.rect(s + 84, Q + 8, J.width - 84, 1, "rgba(139,90,43,.15)"); }), J.gap(12);
        let F = new official_chunk_2mkgzpax_js_1.Ne(c, J.width - 14);
        if (F.text((_a = bn(W)) !== null && _a !== void 0 ? _a : "", 14, 28, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), J.block(F.height, (s, Q) => { c.rect(s, Q, 2, F.height, "rgba(139,90,43,.3)"), F.paint(s + 14, Q); }), B) {
            J.gap(16);
            let s = B.primaryQualityRange.min === B.primaryQualityRange.max ? B.primaryQualityRange.min : `${B.primaryQualityRange.min}—${B.primaryQualityRange.max}`, Q = B.totalQuantityRange.min === B.totalQuantityRange.max ? `${B.totalQuantityRange.min}` : `${B.totalQuantityRange.min}—${B.totalQuantityRange.max}`, G = Math.max(c.measure("成丹品阶", 12), c.measure(s, 12)), j = G + 32 + Math.max(48, c.measure(Q + " 枚", 12)) > J.width;
            J.block(j ? 84 : 36, (b, C) => { c.text("成丹品阶", b, C + 8, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), c.text(s, b, C + 28, 12, official_chunk_2mkgzpax_js_1.Me.wood); let H = j ? 0 : G + 32, f = j ? 48 : 0; c.text("预计成丹", b + H, C + f + 8, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), c.text(Q + " 枚", b + H, C + f + 28, 12); });
        }
        if (h.block(J.height + 34, (s, Q) => { let G = c.ctx.createLinearGradient(s, Q, s + t, Q); G.addColorStop(0, "rgba(254,243,199,.25)"), G.addColorStop(0.5, "transparent"), G.addColorStop(1, "rgba(254,243,199,.1)"), c.ctx.fillStyle = G, c.ctx.fillRect(s, Q, t, J.height + 34), c.rect(s, Q, t, 1, "rgba(139,90,43,.25)"), c.rect(s, Q + J.height + 33, t, 1, "rgba(139,90,43,.25)"), J.paint(s + 16, Q + 17); }), h.gap(12), h.block(32, (s, Q) => { c.text(`${this.expanded ? "▾" : "▸"} 查看药性与品相`, s, Q + 16, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), c.hit(s, Q, t, 32, () => { this.expanded = !this.expanded, c.invalidate(); }); }), this.expanded) {
            h.gap(8), h.text(Un(B === null || B === void 0 ? void 0 : B.appearanceHints), 12, 16, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), h.gap(8);
            for (let s of (_b = W === null || W === void 0 ? void 0 : W.materialJudgments) !== null && _b !== void 0 ? _b : [])
                h.gap(4), h.text(`${s.materialName}：${s.reason}`, 12, 16, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), h.gap(4);
        }
        h.gap(12), h.rule(), h.gap(12);
        let Z = `${(_c = n.readiness.estimatedSpiritStones) === null || _c === void 0 ? void 0 : _c.toLocaleString()} 灵石 · ${n.qiCost} 天地灵气`, K = c.buttonWidth("重新备料") + 12 + c.buttonWidth("开炉炼丹"), U = c.measure(Z, 12) + 12 + K > t;
        return h.block(U ? 60.32 : 32.32, (s, Q) => { c.text(Z, s, Q + (U ? 8 : 16.16), 12); let G = U ? 0 : t - K, j = U ? 28 : 0; this.button("重新备料", s + G, Q + j, () => n.returnToPreparation()), this.button("开炉炼丹", s + G + c.buttonWidth("重新备料") + 12, Q + j, () => this.confirm(), !n.readyForFormulaFire, !0, "alchemy.fire"); }), h;
    } h.block(37, (W, B) => { if (n.mode === "formula")
        return; c.text("炼制目标", W, B + 18, 14), c.clip(W + 68, B, t - 68, 36, () => c.text(n.intent || "如：温养经脉、恢复气血", W + 68, B + 18, 14, n.intent ? official_chunk_2mkgzpax_js_1.Me.ink : official_chunk_2mkgzpax_js_1.Me["ink-secondary"])), c.rect(W + 68, B + 36, t - 68, 1, "rgba(44,24,16,.2)"), c.hit(W + 68, B, t - 68, 37, () => this.edit()); }); let r = n.readiness.error || ((_d = n.readiness.validation) === null || _d === void 0 ? void 0 : _d.blockingReason) || n.analysis.error || (n.readiness.estimatedSpiritStones !== null && !n.readiness.canAfford ? "灵石不足" : ""); if (r)
        h.gap(12), h.text(r, 12, 16, official_chunk_2mkgzpax_js_1.Me.crimson); h.gap(12), h.rule(), h.gap(12); let g = `${n.materials.ids.length} / ${M} 味 · ${n.totalDose} 份`, a = n.readiness.estimatedSpiritStones !== null ? `${n.readiness.estimatedSpiritStones.toLocaleString()} 灵石 · ${n.qiCost} 天地灵气` : "投入灵材后确定本次消耗", V = n.readiness.loading || n.analysis.loading, $ = V ? "正在核对……" : n.mode === "improvised" ? "开炉炼丹" : n.analysis.cooldownRemaining > 0 ? `${n.analysis.cooldownRemaining} 秒后可预览` : "预览丹方", e = V || (n.mode === "improvised" ? !n.readyForImprovisedFire : !n.readyForFormulaAnalysis || n.analysis.cooldownRemaining > 0), i = Math.max(c.measure(g, 12, "monospace"), c.measure(a, 12)) + 12 + c.buttonWidth($) > t; return h.block(i ? 80.32 : 36, (W, B) => { c.text(g, W, B + 8, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"], "monospace"), c.text(a, W, B + 28, 12, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), this.button($, i ? W : W + t - c.buttonWidth($), i ? B + 48 : B + 1.84, () => n.mode === "improvised" ? this.confirm() : void n.analyzeFormula(), e, !0, n.mode === "improvised" ? "alchemy.fire" : void 0); }), h; }
    paintOverlay() { let t = this.u, c = this.model; if (this.confirming) {
        let n = () => { this.confirming = !1, t.invalidate(); }, h = new official_chunk_2mkgzpax_js_1.Ne(t, Math.min(448, t.width - 24) - 34), r = c.mode;
        h.text(`本次${r === "formula" ? "依方炼制" : "随心炼制"}将消耗 ${c.qiCost} 天地灵气。`, 14, 28), h.gap(12), h.rule(), h.gap(12);
        for (let [g, a] of c.confirmation)
            h.text(g, 14, 28, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), h.gap(4), h.text(a, 14, 28), h.gap(8);
        (0, official_chunk_2mkgzpax_js_1.Se)(t, { title: "天地灵气消耗", style: "modal", rows: [], content: h, actions: [{ label: "再想想", run: n }, { label: r === "improvised" ? "确认尝试" : "确认炼制", disabled: c.submitting || !(r === "improvised" ? c.readyForImprovisedFire : c.readyForFormulaFire), run: () => { n(), c.submit(r); } }] }, n);
    } this.preview.paint(); }
}
exports.rb = an;
class gn {
    constructor(t, c, n, h = n, r) {
        this.bagOpen = !1;
        this.u = t;
        this.model = c;
        this.onBack = n;
        this.onReturn = h;
        this.onModeChange = r;
        this.inventory = new p(t, c), this.formulas = new _(t, () => { var _a; return (_a = c.formula) === null || _a === void 0 ? void 0 : _a.id; }, (g) => c.selectFormula(g)), this.furnace = new tn(t, c, () => this.openBag(), () => this.formulas.openPicker()), this.stages = new an(t, c);
    }
    enter() { this.leave(), this.furnace.enter(), this.inventory.enter(); }
    leave() { this.bagOpen = !1, this.lastResult = void 0, this.furnace.reset(), this.inventory.reset(), this.formulas.reset(), this.stages.reset(); }
    openBag() { this.bagOpen = !0, this.u.modalScroll = 0, this.u.invalidate(); }
    flow(t, c) { let n = this.u, h = this.model, r = new official_chunk_2mkgzpax_js_1.Ne(n, t); if (h.phase === "result" && h.result !== this.lastResult)
        this.lastResult = h.result, this.inventory.bag.invalidate(); if (r.block(45.32, (a, V) => { var _a, _b; n.text((_b = (_a = h.sectContext) === null || _a === void 0 ? void 0 : _a.facilityLabel) !== null && _b !== void 0 ? _b : "玄火丹炉", a, V + 16.16, 14), n.inert(h.submitting, () => n.button("返回炼丹房", a + t - n.buttonWidth("返回炼丹房"), V, h.phase === "result" ? this.onReturn : this.onBack)), n.rect(a, V + 44.32, t, 1, "rgba(44,24,16,.1)"); }), r.gap(16), r.block(32.32, (a, V) => n.inert(h.submitting, () => n.button("选择炼丹材料", a + t - n.buttonWidth("选择炼丹材料"), V, () => this.openBag()))), r.gap(16), r.block(24, (a, V) => { let $ = a + (t - 48 - 48 - 44 - 24) / 2, e = $ + 60; if (n.text("随心炼制", $, V + 12, 12, h.mode === "improvised" ? official_chunk_2mkgzpax_js_1.Me.ink : official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), n.ctx.save(), h.locked)
        n.ctx.globalAlpha *= 0.5; if (n.roundedRect(e + 0.5, V + 0.5, 43, 23, h.mode === "formula" ? "rgba(193,18,31,.1)" : "rgba(44,24,16,.05)", 12), n.ctx.strokeStyle = "rgba(44,24,16,.2)", n.ctx.stroke(), n.roundedRect(e + (h.mode === "formula" ? 24 : 4), V + 4, 14, 14, official_chunk_2mkgzpax_js_1.Me["ink-secondary"], 7), n.ctx.restore(), !h.locked)
        n.hit(e, V, 44, 24, () => { let i = h.mode === "formula" ? "improvised" : "formula"; if (this.onModeChange)
            this.onModeChange(i);
        else
            h.setMode(i); }); n.text("丹方炼制", e + 56, V + 12, 12, h.mode === "formula" ? official_chunk_2mkgzpax_js_1.Me.ink : official_chunk_2mkgzpax_js_1.Me["ink-secondary"]); }), r.gap(16), r.block(t, (a, V) => { this.furnace.paint(a, V, t), n.markGuideAnchor("alchemy.hearth", a, V, t, t); }), this.furnace.error)
        r.text(this.furnace.error, 14, 24, official_chunk_2mkgzpax_js_1.Me.crimson), r.block(32.32, (a, V) => n.button("重试", a, V, () => this.furnace.load())); if (c)
        r.gap(16), r.text(c, 14, 28, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]); r.gap(16); let g = this.stages.flow(t); return r.block(g.height, (a, V) => g.paint(a, V)), r; }
    paintOverlay() { var _a; let t = this.u; if (this.bagOpen) {
        let c = t.modalScroll;
        if (t.modalScroll = (_a = this.inventory.preview.underlayScroll) !== null && _a !== void 0 ? _a : c, (0, official_chunk_2mkgzpax_js_1.Se)(t, { title: "炼丹材料", rows: [], content: this.inventory.flow(t.width - 32) }, () => { this.bagOpen = !1, t.modalScroll = 0, t.invalidate(); }), this.inventory.preview.underlayScroll !== void 0)
            t.modalScroll = c;
    } this.inventory.paintOverlay(), this.formulas.paintOverlay(), this.furnace.paintOverlay(), this.stages.paintOverlay(); }
}
exports.sb = gn;
var on = [{ title: "初识炼丹", body: "一炉炼丹只需在丹炉内完成材料准备、炼制预览和确认炼制。药柜、玉简和炉理碑都是可选的辅助设施。" }, { title: "随心炼丹", body: "投入材料并选定明确的炼制目标，丹炉会根据材料药性与目标生成丹药，也可能由此获得新丹方。" }, { title: "丹方炼制", body: "选择已保存的丹方后再添加材料。炼制预览会说明当前材料与丹方是否契合。" }, { title: "药蕴与批次", body: "材料数量与品质汇成药蕴。药蕴会分结成主丹和副丹，同一炉可能出现多个品质与品相批次。" }, { title: "品质与品相", body: "品质代表丹药层次，品相代表同品质下的成丹完整程度。预览只能显示大致倾向，炼制完成后才能看到最终结果。" }, { title: "丹毒与炉况", body: "燥烈、冲突或过杂的配伍会提高损耗与风险。炼制预览会列出无法继续的原因和需要留意的问题。" }, { title: "常见失败原因", body: "材料不足、灵石不足、炼制目标为空、未选择丹方、材料变化或分析过期，都会导致无法炼制；返回准备阶段修改即可。" }], Vn = { furnace: { id: "furnace", sigil: "\uD83D\uDD25", name: "玄火丹炉", identity: "炼丹设施", responsibility: "准备材料并完成炼制", appearance: "facility" }, cabinet: { id: "cabinet", sigil: "\uD83C\uDF3F", name: "百草药柜", identity: "材料设施", responsibility: "查看和辨认炼丹材料", appearance: "facility" }, formulas: { id: "formulas", sigil: "\uD83D\uDCDC", name: "丹方玉简", identity: "丹方设施", responsibility: "查阅和管理已有丹方", appearance: "facility" }, guide: { id: "guide", sigil: "\uD83E\uDEA8", name: "炉理碑", identity: "指引设施", responsibility: "阅读炼丹方法与常见问题", appearance: "facility" } };
var Cn = { furnace: ["improvised", "formula", "current"], cabinet: ["materials"], formulas: ["formula-library"], guide: ["guide-basics", "guide-reference"] };
class Dn {
    constructor(t, c, n) {
        this.sect = !1;
        this.owner = "";
        this.u = t;
        this.home = c;
        this.navigate = n;
        this.model = new nn(() => t.invalidate(), () => c.load(), official_chunk_2mkgzpax_js_1.Re), this.workspace = new gn(t, this.model, () => this.sect ? this.navigate("/game/sect/alchemy?npc=furnace") : this.setLocation(), () => this.sect ? this.navigate("/game/sect/alchemy") : this.setLocation(), (h) => { if (this.model.setMode(h), !this.sect)
            this.setLocation("furnace", h); }), this.cabinet = new p(t, this.model, (h, r) => { let g = this.model.addMaterial(h, r); if (g === "limit-reached") {
            (0, official_chunk_2mkgzpax_js_1.Re)("本炉材料种类已满，请先到丹炉调整。");
            return;
        } (0, official_chunk_2mkgzpax_js_1.Re)(g === "already-added" ? `【${h.name}】已在炉中，份量已更新。` : `已将【${h.name}】添加到丹炉。`), this.openFurnace(); }), this.archive = new _(t, () => { var _a; return (_a = this.model.formula) === null || _a === void 0 ? void 0 : _a.id; }, (h) => { this.model.selectFormula(h), this.openFurnace(); });
    }
    enter(t = "/game/craft/alchemy", c) { var _a, _b, _c; this.leave(), this.owner = (_b = (_a = this.home.view()) === null || _a === void 0 ? void 0 : _a.cultivator.id) !== null && _b !== void 0 ? _b : "", this.sect = !!c, this.model.enter(c); let n = new URLSearchParams((_c = t.split("?")[1]) !== null && _c !== void 0 ? _c : ""), h = n.get("facility"), r = n.get("action"); if (this.sect)
        this.setLocation("furnace", "current");
    else if (h in Cn) {
        if (this.setLocation(h, Cn[h].includes(r) ? r : void 0), this.facility === "furnace" && (this.action === "formula" || this.action === "improvised"))
            this.model.setMode(this.action);
    } }
    leave() { this.workspace.leave(), this.cabinet.reset(), this.archive.reset(), this.model.leave(), this.facility = this.action = void 0, this.owner = ""; }
    get pending() { return this.model.submitting; }
    setLocation(t, c) { if (this.pending)
        return; let n = this.facility, h = this.action; if (this.facility = t, this.action = c, n === "furnace" && h && !(t === "furnace" && c))
        this.workspace.leave(); if (n === "cabinet" && h && !(t === "cabinet" && c))
        this.cabinet.reset(); if (n === "formulas" && h && !(t === "formulas" && c))
        this.archive.reset(); if (t === "furnace" && c && !(n === "furnace" && h))
        this.workspace.enter(); if (t === "cabinet" && c && !(n === "cabinet" && h))
        this.cabinet.enter(); if (t === "formulas" && c && !(n === "formulas" && h))
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
    flow(t) { var _a, _b, _c, _d; let c = this.u, n = this.model, h = new official_chunk_2mkgzpax_js_1.Ne(c, t), r = (_b = (_a = this.home.view()) === null || _a === void 0 ? void 0 : _a.cultivator.id) !== null && _b !== void 0 ? _b : ""; if (r && this.owner && r !== this.owner)
        return this.enter("/game/craft/alchemy", n.sectContext), this.flow(t); if (this.facility && this.action) {
        if (this.facility === "furnace")
            return this.workspace.flow(t, (_d = (_c = this.home.baseline) === null || _c === void 0 ? void 0 : _c.resources.session) === null || _d === void 0 ? void 0 : _d.data.note);
        let a = this.facility === "cabinet" ? "百草药柜" : this.facility === "formulas" ? "丹方玉简" : "炉理碑", V = this.facility === "cabinet" ? "查看炼丹材料" : this.facility === "formulas" ? "查看已有丹方" : this.action === "guide-basics" ? "第一炉建议" : "炼丹说明";
        if (h.block(45.32, ($, e) => { c.text(V, $, e + 16.16, 14), c.button(`返回${a}`, $ + t - c.buttonWidth(`返回${a}`), e, () => this.setLocation(this.facility)), c.rect($, e + 44.32, t, 1, "rgba(44,24,16,.1)"); }), h.gap(16), this.facility === "cabinet" || this.facility === "formulas") {
            let $ = this.facility === "cabinet" ? this.cabinet.flow(t) : this.archive.flow(t);
            return h.block($.height, (e, i) => $.paint(e, i)), h;
        }
        for (let $ of on) {
            let e = new official_chunk_2mkgzpax_js_1.Ne(c, t - 42);
            e.text($.title, 16, 24), e.gap(8), e.text($.body, 14, 28, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), h.block(e.height + 42, (i, W) => { c.ctx.strokeStyle = "rgba(44,24,16,.15)", c.ctx.strokeRect(i + 0.5, W + 0.5, t - 1, e.height + 41), e.paint(i + 21, W + 21); }), h.gap(12);
        }
        return h.gap(12), h.block(32.32, ($, e) => c.button("前往丹炉", $ + t - c.buttonWidth("前往丹炉"), e, () => this.openFurnace(), official_chunk_2mkgzpax_js_1.Me.crimson)), h;
    } if (this.facility) {
        let a = this.facility, V = Vn[a], $ = n.phase !== "preparing" || n.materials.ids.length > 0 || !!n.formula || !!n.intent.trim(), e = [], i = a === "furnace" ? n.phase === "result" ? "炉火已经平息，这一炉的炼制结果正等你查看。" : $ ? "炉中已有准备好的材料。你可以继续这一炉，也可以重新选择炼制方式。" : "炉火尚未点燃。你可以自由搭配材料，也可以按照已有丹方炼制。" : a === "cabinet" ? "药柜中存放着你已有的炼丹材料。可以在这里查看库存和材料药性。" : a === "formulas" ? "玉简中记录着你已经掌握的丹方。可以在这里查阅、使用或删除已有丹方。" : "石碑记载着炼丹的基本方法和常见问题。阅读碑文不会改变炉中的材料。";
        if (a === "furnace") {
            if ($)
                e.push({ id: "current", label: n.phase === "result" ? "查看炼制结果" : n.phase === "observing" ? "继续确认本炉" : "继续处理当前一炉", tone: "primary" });
            e.push({ id: "improvised", label: "随心炼丹" }, { id: "formula", label: "按照丹方炼制" });
        }
        else if (a === "cabinet")
            e.push({ id: "materials", label: "查看炼丹材料", tone: "primary" });
        else if (a === "formulas")
            e.push({ id: "formula-library", label: "查看已有丹方", tone: "primary" }, { id: "formula", label: "使用丹方炼制" });
        else
            e.push({ id: "guide-reference", label: "阅读炼丹说明", tone: "primary" });
        e.push({ id: "leave", label: "返回炼丹房", tone: "muted" });
        let W = (0, official_chunk_wvev9bhe_js_1.wb)(c, t - 2, V, [{ body: i }], e, (B) => B === "leave" ? this.setLocation() : this.open(B));
        return h.block(W.height + 2, (B, J) => { c.ctx.strokeStyle = "rgba(44,24,16,.2)", c.ctx.strokeRect(B + 0.5, J + 0.5, t - 1, W.height + 1), W.paint(B + 1, J + 1); }), h;
    } let g = Object.values(Vn).map((a) => ({ ...a, guideAnchor: a.id === "furnace" ? "alchemy.furnace" : void 0, status: a.id === "furnace" ? { label: this.status(), tone: n.phase === "result" ? "attention" : n.materials.ids.length || n.formula || n.intent ? "active" : "neutral" } : { label: a.id === "cabinet" ? "库存可查" : a.id === "formulas" ? "玉简可阅" : "碑文可阅", tone: "neutral" } })); return (0, official_chunk_wvev9bhe_js_1.vb)(c, t, { description: "中央丹炉火光微动，药柜、丹方玉简与炉理碑分列四周。走近一处设施，看看它能为你做什么。", actors: g, select: (a) => this.setLocation(a, a === "furnace" ? n.mode : a === "cabinet" ? "materials" : a === "formulas" ? "formula-library" : "guide-basics"), prompt: "选择一处设施进行交互" }); }
    paint(t, c) { let n = this.u, h = n.width - 56, r = this.flow(h), V = 116.2 + r.height, $ = t + 12 - n.scroll; n.clip(0, t, n.width, c - t, () => { n.rect(12, $, n.width - 24, V, "rgba(248,243,230,.82)"), n.text("炼丹房", 28, $ + 28, 23.2, official_chunk_2mkgzpax_js_1.Me.ink, n.headingFont); let e = 36 + n.measure("炼丹房", 23.2, n.headingFont); n.text("/", e, $ + 31, 14, official_chunk_2mkgzpax_js_1.Me["battle-muted"]), n.tracked("修行", e + 14, $ + 31, 12.48, 1.9968, official_chunk_2mkgzpax_js_1.Me["battle-muted"]), n.text("看药材、控炉候、炼丹息身。", 28, $ + 60, 14, official_chunk_2mkgzpax_js_1.Me["ink-secondary"]), n.line(28, $ + 84.2 - 1, h), r.paint(28, $ + 84.2 + 16); }), n.scrollMax = Math.max(0, t + 24 + V - c); }
    paintOverlay() { if (!this.action)
        return; if (this.facility === "furnace")
        this.workspace.paintOverlay();
    else if (this.facility === "cabinet")
        this.cabinet.paintOverlay();
    else if (this.facility === "formulas")
        this.archive.paintOverlay(); }
}
exports.tb = Dn;
