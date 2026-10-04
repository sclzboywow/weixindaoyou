"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectAffairsConversation = exports.SectAffairsModel = exports.SectAffairsPage = exports.SectArchivePage = exports.SectBattleModel = exports.SectBattlePage = exports.SectHallModel = exports.SectHallPage = exports.SectHallTables = exports.SectIndustries = exports.SectMapAssets = exports.SectMapCamera = exports.SectMapTouch = exports.SectMapView = exports.SectMeridianModel = exports.SectModel = exports.SectOnboardingModel = exports.SectOnboardingPage = exports.SectPage = exports.SectShopModel = exports.SectShopView = exports.SectSubmissionDialog = exports.SectSubmissionModel = exports.SectTaskActions = exports.SectTaskLocation = exports.SectTransferModel = exports.SectTransferPage = exports.SectVisitModel = exports.SectVisitPage = exports.SectWorkspaceModel = void 0;
const official_chunk_89xwxnzm_js_1 = require("./official-chunk-89xwxnzm.js");
Object.defineProperty(exports, "SectTaskLocation", { enumerable: true, get: function () { return official_chunk_89xwxnzm_js_1.Ma; } });
Object.defineProperty(exports, "SectModel", { enumerable: true, get: function () { return official_chunk_89xwxnzm_js_1.Qa; } });
const official_chunk_21q7yjsr_js_1 = require("./official-chunk-21q7yjsr.js");
const official_chunk_zvyd0gzr_js_1 = require("./official-chunk-zvyd0gzr.js");
const official_chunk_nx6d9wvp_js_1 = require("./official-chunk-nx6d9wvp.js");
const official_chunk_h2eh160v_js_1 = require("./official-chunk-h2eh160v.js");
const official_chunk_wje6zqc2_js_1 = require("./official-chunk-wje6zqc2.js");
var br = "/api/combat-v6/sect-tasks", Ft = new Map;
function Ke(t, r) { let e = `${t}:${r}`, i = Ft.get(e); if (i)
    return i; let n = (0, official_chunk_h2eh160v_js_1.Gb)(`/api/sects/current/tasks/${encodeURIComponent(t)}/actions/execute`, "POST", { input: {} }, void 0, { "Idempotency-Key": r }).then((a) => a.data).finally(() => Ft.delete(e)); return Ft.set(e, n), n; }
class mt {
    constructor(t, r) {
        this.taskId = "";
        this.attemptId = "";
        this.startError = "";
        this.starting = !1;
        this.active = !1;
        this.entered = !1;
        this.started = !1;
        this.generation = 0;
        this.settled = "";
        this.owner = "";
        this.href = "";
        this.changed = t;
        this.refreshPlayer = r;
        this.context = new official_chunk_89xwxnzm_js_1.Qa(() => this.sync(), !1), this.tasks = new official_chunk_89xwxnzm_js_1.Ma(t), this.combat = new official_chunk_89xwxnzm_js_1.r(br, () => this.sync());
    }
    enter(t, r) { var _a, _b, _c, _d; this.leave(), this.active = !0, this.href = t, this.owner = r; let e = t.split("?")[0], i = new URLSearchParams((_a = t.split("?")[1]) !== null && _a !== void 0 ? _a : ""); try {
        this.taskId = decodeURIComponent((_c = (_b = e.match(/^\/game\/sect\/tasks\/([^/]+)\/battle$/)) === null || _b === void 0 ? void 0 : _b[1]) !== null && _c !== void 0 ? _c : "");
    }
    catch (_e) {
        this.taskId = "";
    } this.attemptId = (_d = i.get("attemptId")) !== null && _d !== void 0 ? _d : "", this.origin = (0, official_chunk_89xwxnzm_js_1.Ka)(i.get("origin")), this.context.enter(r); }
    leave() { this.active = !1, this.generation++, this.context.leave(), this.tasks.close(), this.combat.leave(), this.entered = this.started = this.starting = !1, this.startError = this.settled = ""; }
    sync() { var _a; if (!this.active)
        return; let t = (_a = this.context.context) === null || _a === void 0 ? void 0 : _a.permissions["sect.tasks.use"]; if (!this.entered && (t === null || t === void 0 ? void 0 : t.granted))
        this.entered = !0, this.tasks.open(this.owner), this.combat.enter(); let r = this.combat.session; if (this.entered && !this.combat.loading && !r && !this.started && this.taskId && this.attemptId)
        this.started = !0, this.start(); if ((r === null || r === void 0 ? void 0 : r.settlement) === "settled" && this.settled !== r.sessionId)
        this.settled = r.sessionId, this.tasks.open(this.owner), this.refreshPlayer().catch(() => { }); this.changed(); }
    async start() { var _a, _b; let t = this.generation; this.starting = !0, this.startError = "", this.changed(); try {
        let r = await Ke(this.taskId, this.attemptId);
        if (!this.active || t !== this.generation)
            return;
        let e = (_b = (_a = r === null || r === void 0 ? void 0 : r.outcome) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.battleId;
        if (typeof e !== "string")
            throw Error("旧版战斗入口已停止，请重新进入任务");
        let i = await (0, official_chunk_h2eh160v_js_1.Gb)(`${br}/sessions/${encodeURIComponent(e)}`);
        if (!this.active || t !== this.generation)
            return;
        if ((i === null || i === void 0 ? void 0 : i.success) !== !0)
            throw Error("战斗服务暂时不可用，请稍后刷新重试");
        this.combat.acceptSession(i.data), this.refreshPlayer().catch(() => { });
    }
    catch (r) {
        if (this.active && t === this.generation)
            this.startError = r instanceof Error ? r.message : "开战失败";
    }
    finally {
        if (this.active && t === this.generation)
            this.starting = !1, this.changed();
    } }
    get error() { return this.combat.error || this.startError || (!this.combat.session && !this.combat.loading && (!this.taskId || !this.attemptId) ? "缺少宗门挑战标识" : ""); }
    get back() { var _a; let t = (_a = this.tasks.data) === null || _a === void 0 ? void 0 : _a.items.find((r) => { var _a, _b; return r.definitionId === ((_b = (_a = this.combat.session) === null || _a === void 0 ? void 0 : _a.taskId) !== null && _b !== void 0 ? _b : this.taskId); }); return this.origin ? (0, official_chunk_89xwxnzm_js_1.Ja)(this.origin, t, "return").route : "/game/sect/affairs"; }
    retry() { if (this.starting || this.combat.pending)
        return; if (this.startError)
        this.enter(this.href, this.owner);
    else
        this.combat.refresh(!0); }
}
exports.SectBattleModel = mt;
class Pr {
    constructor(t, r, e) {
        this.commandScroll = 0;
        this.owner = "";
        this.href = "";
        this.u = t;
        this.player = r;
        this.navigate = e;
        this.model = new mt(() => { var _a; (_a = this.controller) === null || _a === void 0 ? void 0 : _a.syncAuto(), t.invalidate(); }, () => r.load()), this.combat = this.model.combat, this.controller = new official_chunk_89xwxnzm_js_1.t(this.combat, () => t.invalidate()), this.commands = new official_chunk_89xwxnzm_js_1.z(t, this.controller, () => this.finish(), !1), this.roster = new official_chunk_89xwxnzm_js_1.A(t), this.log = new official_chunk_89xwxnzm_js_1.v(t);
    }
    enter(t) { this.leave(), this.href = t; }
    leave() { this.model.leave(), this.controller.leave(), this.commands.reset(), this.roster.reset(), this.log.reset(), this.owner = "", this.commandScroll = 0; }
    finish() { var _a; if (((_a = this.combat.session) === null || _a === void 0 ? void 0 : _a.settlement) === "settled" && !this.combat.playing)
        this.navigate(this.model.back); }
    paint() { var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k; let t = (_b = (_a = this.player.view()) === null || _a === void 0 ? void 0 : _a.cultivator.id) !== null && _b !== void 0 ? _b : ""; if (t && t !== this.owner)
        this.owner = t, this.model.enter(this.href, t); let r = this.model.context, e = this.u; if (r.error || !r.context || !((_c = r.context.permissions["sect.tasks.use"]) === null || _c === void 0 ? void 0 : _c.granted)) {
        e.scrollMax = 0, e.scrollTopInset = 0, e.scrollBottomInset = 0;
        let k = r.error ? "宗门卷宗暂不可用" : r.presentation.scenes.taskBattle.title;
        if (e.text(k, 20, e.top + 28, 23.2, official_chunk_wje6zqc2_js_1.Be.ink, e.headingFont), e.paragraph(r.error || (!r.context ? r.presentation.scenes.taskBattle.loadingText : (_e = (_d = r.context.permissions["sect.tasks.use"]) === null || _d === void 0 ? void 0 : _d.reason) !== null && _e !== void 0 ? _e : "当前弟子身份尚未获得此设施权限。"), 20, e.top + 64, e.width - 40, 14, 28), r.error)
            e.button("重新读取", 20, e.top + 160, () => { r.reload(); });
        return;
    } let i = 0, n = this.u, a = this.combat, s = a.session, h = this.controller, o = 10.4, b = n.width - 20.8, p = n.height - Math.max(n.bottom, 10.4), f = Math.max(n.safeTop, 10.4) + i; if (n.scrollMax = 0, n.scrollTopInset = 0, n.scrollBottomInset = 0, this.model.error) {
        let k = n.lines(this.model.error, b, 16);
        k.forEach((c, Se) => n.text(c, o, f + 12 + Se * 24, 16, official_chunk_wje6zqc2_js_1.Be.ink)), f += k.length * 24, n.button("刷新战局", o, f, () => this.model.retry()), f += 32.32;
    } if ((s === null || s === void 0 ? void 0 : s.settlement) === "pending")
        n.inert(a.pending, () => n.button("重试结算", o, f, () => void a.resolve())), f += 32.32; if (!s) {
        n.text(this.model.error ? "尚未进入战斗。" : "正在准备战局…", o, f + 12, 16, official_chunk_wje6zqc2_js_1.Be.ink), n.button("返回任务地点", o, f + 32, () => this.navigate(this.model.back));
        return;
    } let m = (0, official_chunk_89xwxnzm_js_1.l)(a.shown.units), v = h.ended, M = s.outcome ? { victory: "胜利", defeat: "落败", draw: "平局", aborted: "已离场" }[s.outcome] : "", l = v ? M : a.playing ? "战斗中" : "下令中", $ = `第 ${a.shown.round} 回合`, S = n.measure($, 13.6) + 10.4 + 61.2 + 10.4 + 52.8, P = b / 2, K = P + 9.6 + S > b, D = (K ? Math.max(34.8, n.menuBottom + 4 - f) + 24 : 25.2) + 12 + 1; n.text("宗门挑战", o, f + 12.6, 16.8, official_chunk_wje6zqc2_js_1.Be.ink, n.headingFont); let j = f + (K ? Math.max(34.8, n.menuBottom + 4 - f) : 0), z = K ? o : o + b - S, H = "第 ", G = String(a.shown.round); n.text(H, z, j + 12, 13.6, official_chunk_wje6zqc2_js_1.Be.ink), n.text(G, z + n.measure(H, 13.6), j + 12, 13.6, official_chunk_wje6zqc2_js_1.Be.ink, "monospace"), n.text(" 回合", z + n.measure(H, 13.6) + n.measure(G, 13.6, "monospace"), j + 12, 13.6, official_chunk_wje6zqc2_js_1.Be.ink), n.text(l, z + n.measure($, 13.6) + 10.4, j + 12, 13.6, official_chunk_wje6zqc2_js_1.Be.ink); {
        let c = n.measure("返回任务地点", 12);
        n.text("返回任务地点", o + b - c, j + 12, 12, official_chunk_wje6zqc2_js_1.Be["battle-muted"]), n.hit(o + b - c - 4, j, c + 4, 24, () => this.navigate(this.model.back));
    } n.line(o, f + D - 1, b, official_chunk_wje6zqc2_js_1.Be["battle-faint"]), f += D; let Z = { units: a.shown.units, labels: m, appearances: (_f = s.display) === null || _f === void 0 ? void 0 : _f.unitAppearances, ownId: (_g = s.controlledUnitId) !== null && _g !== void 0 ? _g : (_h = h.commandOptions[0]) === null || _h === void 0 ? void 0 : _h.unitId, controlledId: a.playing ? void 0 : (_j = h.activeOptions) === null || _j === void 0 ? void 0 : _j.unitId, recalledOwnerIds: s.events.flatMap(({ seq: k, event: c }) => k <= a.shown.visibleSeq && c.type === "petRecalled" ? [c.unitId] : []), targetIds: h.disabled ? void 0 : (_k = h.choice) === null || _k === void 0 ? void 0 : _k.ids, selectedIds: h.targets, feedback: a.playing ? (0, official_chunk_89xwxnzm_js_1.n)(a.log.entries, a.shown.visibleSeq) : void 0, inspect: (k) => { h.inspected = k, n.modalScroll = 0, n.invalidate(); }, pick: (k) => h.pick(k) }, O = this.commands.flow(b, m), I = (0, official_chunk_89xwxnzm_js_1.B)(p - f, this.roster.height(1, Z), this.roster.height(0, Z)), q = p - I, F = this.roster.height(1, Z), E = this.roster.height(0, Z), ar = f + 8, sr = q - 8 - E, or = ar + F + 8, Pe = Math.max(0, sr - 8 - or); n.clip(o, f, b, Math.max(0, q - f), () => { this.roster.paint(1, o, ar, b, Z), this.log.paint(o, or, b, Pe, a.log.entries, a.shown.visibleSeq), this.roster.paint(0, o, sr, b, Z); }), this.commandScroll = Math.max(0, Math.min(this.commandScroll, O.height - I)), n.clip(o, q, b, I, () => O.paint(o, q - this.commandScroll)), n.scrollRegion(o, q, b, I, (k) => { this.commandScroll = Math.max(0, Math.min(O.height - I, this.commandScroll + k)), n.invalidate(); }); }
    paintOverlay() { var _a; let t = this.controller, r = this.combat.session; if (!r)
        return; this.commands.paintOverlay(); let e = this.combat.shown.units.find((i) => i.id === t.inspected); if (e)
        (0, official_chunk_89xwxnzm_js_1.C)(this.u, e, (_a = (0, official_chunk_89xwxnzm_js_1.l)(this.combat.shown.units).get(e.id)) !== null && _a !== void 0 ? _a : e.name, r.display, () => { t.inspected = void 0, this.u.modalScroll = 0, this.u.invalidate(); }); }
}
exports.SectBattlePage = Pr;
const zod_1 = require("./zod.js");
var Mt = { membershipId: zod_1.z.uuid(), expectedRevision: zod_1.z.number().int().nonnegative() }, Sr = zod_1.z.discriminatedUnion("action", [zod_1.z.object({ ...Mt, action: zod_1.z.literal("train"), methodId: zod_1.z.string().min(1).max(160), targetLevel: zod_1.z.number().int().min(1).max(180).optional() }).strict(), zod_1.z.object({ ...Mt, action: zod_1.z.literal("unlock") }).strict(), zod_1.z.object({ ...Mt, action: zod_1.z.literal("save"), pathId: zod_1.z.string().min(1).max(160), nodeIds: zod_1.z.array(zod_1.z.string().min(1).max(160)).max(7) }).strict(), zod_1.z.object({ ...Mt, action: zod_1.z.literal("activate"), pathId: zod_1.z.string().min(1).max(160) }).strict()]);
class Y extends Error {
}
var x = official_chunk_89xwxnzm_js_1.K.meridian.characterLevels;
function $t(t) { if (!Number.isInteger(t) || t < 1 || t > official_chunk_89xwxnzm_js_1.K.method.maxLevel)
    throw new Y("心法等级无效"); return (0, official_chunk_89xwxnzm_js_1.I)(official_chunk_89xwxnzm_js_1.K, t); }
function At(t) { if (!Number.isInteger(t) || t < 1 || t > 7)
    throw new Y("经脉层级无效"); return (0, official_chunk_89xwxnzm_js_1.J)(official_chunk_89xwxnzm_js_1.K, t); }
function Hr(t, r, e) { var _a; let i = official_chunk_89xwxnzm_js_1.M[t.sectId], n = (0, official_chunk_wje6zqc2_js_1.Je)(t), a = { cultivationExp: 0, spiritStones: 0, comprehensionInsight: 0 }; if (e.action === "train") {
    let h = i.methods.find((f) => f.id === e.methodId);
    if (!h)
        throw new Y("心法不属于当前宗门");
    let o = t.methods[h.id], b = (_a = e.targetLevel) !== null && _a !== void 0 ? _a : o + 1, p = i.methods.find((f) => f.isPrimary);
    if (!Number.isInteger(b) || b <= o)
        throw new Y("目标等级必须高于当前等级");
    if (b > (0, official_chunk_89xwxnzm_js_1.L)(r))
        throw new Y("已达当前人物境界允许的心法上限");
    if (!h.isPrimary && b > t.methods[p.id])
        throw new Y(`分支不可超过${p.name}`);
    for (let f = o + 1; f <= b; f++) {
        let m = $t(f);
        a.cultivationExp += m.cultivationExp, a.spiritStones += m.spiritStones, a.comprehensionInsight += m.comprehensionInsight;
    }
    n.methods[h.id] = b;
}
else if (e.action === "unlock") {
    let h = t.meridianDepth + 1;
    if (h > 7)
        throw new Y("经脉已全部解锁");
    if (r < x[h - 1])
        throw new Y(`人物达到${(0, official_chunk_wje6zqc2_js_1.wf)(x[h - 1]).label}后可解锁`);
    a = At(h), n.meridianDepth = h;
}
else {
    let h = i.paths.find((o) => o.id === e.pathId);
    if (!h)
        throw new Y("流派不属于当前宗门");
    if (e.action === "activate") {
        if (t.activePathId === h.id)
            throw new Y("已是当前流派");
        n.activePathId = h.id;
    }
    else {
        let o = n.meridianLoadouts.find((m) => m.pathId === h.id), b = new Set, p = (0, official_chunk_89xwxnzm_js_1.D)(h, e.nodeIds);
        for (let m of p) {
            let v = h.nodes.find((M) => M.id === m);
            if (!v)
                throw new Y("节点不属于所选流派");
            if (v.layer > t.meridianDepth)
                throw new Y("节点所在层尚未解锁");
            if (b.has(v.layer))
                throw new Y("每层只能选择一个节点");
            if (!(0, official_chunk_89xwxnzm_js_1.F)(h, p, v))
                throw new Y("节点必须与前一层已选经脉连通");
            b.add(v.layer);
        }
        o.nodeIds = (0, official_chunk_89xwxnzm_js_1.D)(h, e.nodeIds).sort((m, v) => h.nodes.find((M) => M.id === m).layer - h.nodes.find((M) => M.id === v).layer), o.revision++;
        let f = (0, official_chunk_89xwxnzm_js_1.N)({ progress: { ...n, activePathId: h.id }, characterLevel: r });
        if (!f.ok)
            throw new Y(f.diagnostics.map((m) => m.message).join("；"));
    }
} let s = (0, official_chunk_89xwxnzm_js_1.N)({ progress: n, characterLevel: r }); if (!s.ok)
    throw new Y(s.diagnostics.map((h) => h.message).join("；")); return { progress: n, cost: a }; }
function gt(t, r) { var _a, _b, _c, _d, _e; let e = official_chunk_89xwxnzm_js_1.M[t.sectId], i = e.paths.find((b) => b.id === t.activePathId), n = (0, official_chunk_89xwxnzm_js_1.N)({ progress: t, characterLevel: r }); if (!n.ok)
    throw Error(n.diagnostics.map((b) => b.message).join("；")); let a = n.projection, s = new Map([...a.skills, ...a.skillOverrides].map((b) => [b.id, b])), h = new Set(i ? (_b = (_a = t.meridianLoadouts.find((b) => b.pathId === i.id)) === null || _a === void 0 ? void 0 : _a.nodeIds) !== null && _b !== void 0 ? _b : [] : []); return [...e.skills.map((b) => ({ skill: b, requirement: "" })), ...((_c = i === null || i === void 0 ? void 0 : i.grantSkills) !== null && _c !== void 0 ? _c : []).map((b) => ({ skill: b, requirement: "" })), ...((_d = i === null || i === void 0 ? void 0 : i.foundationPassives) !== null && _d !== void 0 ? _d : []).map((b) => ({ skill: b, requirement: "" })), ...(_e = i === null || i === void 0 ? void 0 : i.nodes.flatMap((b) => { var _a, _b; return [...(_a = b.grantSkills) !== null && _a !== void 0 ? _a : [], ...(_b = b.passives) !== null && _b !== void 0 ? _b : []].map((p) => ({ skill: p, requirement: h.has(b.id) ? "" : `需选择第${b.layer}层「${b.name}」` })); })) !== null && _e !== void 0 ? _e : []].filter(({ skill: b }) => b.kind !== "internal").map(({ skill: b, requirement: p }) => { var _a; let f = (_a = s.get(b.definition.id)) !== null && _a !== void 0 ? _a : b.definition, m = a.activeSkillIds.includes(f.id) || a.passiveSkillIds.includes(f.id), v = e.methods.find((M) => M.id === b.sourceMethodId); return { id: f.id, name: f.name, methodId: v.id, methodName: v.name, level: t.methods[v.id], unlockLevel: b.unlockMethodLevel, available: m, passive: b.kind === "passive", requirement: m ? "" : p || (t.methods[v.id] < b.unlockMethodLevel ? `心法${b.unlockMethodLevel}级解锁` : "当前流派或节点替换了此技能"), description: (0, official_chunk_h2eh160v_js_1.kc)([f], e.statuses)[f.id].description }; }); }
var ot = { maxHp: "气血上限", maxMp: "法力上限", physicalAtk: "物理攻击", physicalDef: "物理防御", magicAtk: "法术攻击", magicDef: "法术防御", speed: "速度", sealHit: "封印命中", sealResist: "封印抵抗", hit: "命中", evasion: "躲避", healingPower: "治疗强度" };
function Lt(t) { return { membershipId: t.build.membershipId, expectedRevision: t.build.revision }; }
function lt(t, r) { if (t.blockedReason)
    return t.blockedReason; try {
    let { cost: e } = Hr(t.progress, t.characterLevel, r);
    if (e.cultivationExp > t.resources.cultivationExp)
        return "修为不足";
    if (e.spiritStones > t.resources.spiritStones)
        return "灵石不足";
    if (e.comprehensionInsight > t.resources.comprehensionInsight)
        return "感悟不足";
}
catch (e) {
    return e instanceof Error ? e.message : "无法操作";
} return null; }
class Pt {
    constructor(t, r) {
        this.mode = "methods";
        this.pending = !1;
        this.loading = !1;
        this.error = "";
        this.notice = "";
        this.refresh = 0;
        this.methodId = "";
        this.membership = "";
        this.active = !1;
        this.generation = 0;
        this.sequence = 0;
        this.changed = t;
        this.refreshPlayer = r;
    }
    enter(t) { this.leave(), this.active = !0, this.mode = t, this.view = void 0, this.error = this.notice = "", this.methodId = "", this.skillId = void 0, this.membership = "", this.refresh = 0, this.reload(); }
    leave() { var _a, _b; this.active = !1, this.generation++, this.sequence++, (_b = (_a = this.reader) === null || _a === void 0 ? void 0 : _a.abort) === null || _b === void 0 ? void 0 : _b.call(_a), this.reader = void 0, this.pending = this.loading = !1; }
    accept(t) { var _a; this.view = t; let r = (_a = t.build.membershipId) !== null && _a !== void 0 ? _a : ""; if (r !== this.membership || !this.methodId)
        this.membership = r, this.methodId = t.progress ? official_chunk_89xwxnzm_js_1.M[t.progress.sectId].methods[0].id : "", this.skillId = void 0; }
    async reload() { var _a, _b; if (!this.active || this.pending)
        return; let t = this.generation, r = ++this.sequence; (_b = (_a = this.reader) === null || _a === void 0 ? void 0 : _a.abort) === null || _b === void 0 ? void 0 : _b.call(_a), this.loading = !0, this.error = "", this.refresh++, this.changed(); let e = () => this.active && t === this.generation && r === this.sequence; try {
        let i = await (0, official_chunk_h2eh160v_js_1.Gb)("/api/combat-v6/sect", "GET", void 0, void 0, {}, { onTask: (n) => { var _a; if (e())
                this.reader = n;
            else
                (_a = n.abort) === null || _a === void 0 ? void 0 : _a.call(n); } });
        if (e())
            this.accept(i.data);
    }
    catch (i) {
        if (e())
            this.error = i instanceof Error ? i.message : "请求失败";
    }
    finally {
        if (e())
            this.loading = !1, this.reader = void 0, this.changed();
    } }
    async submit(t, r) { var _a, _b; if (!this.active || this.pending)
        return !1; let e = this.generation; this.pending = !0, this.error = this.notice = "", this.sequence++, (_b = (_a = this.reader) === null || _a === void 0 ? void 0 : _a.abort) === null || _b === void 0 ? void 0 : _b.call(_a), this.reader = void 0, this.loading = !1, this.changed(); try {
        if (await (0, official_chunk_h2eh160v_js_1.Gb)(t, "POST", r), !this.active || e !== this.generation)
            return !1;
        let i = await (0, official_chunk_h2eh160v_js_1.Gb)("/api/combat-v6/sect");
        if (!this.active || e !== this.generation)
            return !1;
        this.accept(i.data), this.notice = "传承已更新，下一场战斗生效。";
        try {
            await this.refreshPlayer();
        }
        catch (n) {
            if (this.active && e === this.generation)
                this.error = n instanceof Error ? n.message : "状态刷新失败";
        }
        return this.active && e === this.generation;
    }
    catch (i) {
        if (this.active && e === this.generation)
            this.error = `${i instanceof Error ? i.message : "请求失败"}；草稿仍保留。重新读取将放弃草稿并核对最新传承与资源。`;
        return !1;
    }
    finally {
        if (this.active && e === this.generation)
            this.pending = !1, this.changed();
    } }
    act(t) { return this.submit("/api/combat-v6/sect", Sr.parse(t)); }
    enablePath(t) { let r = this.view; if (!r || r.progress || r.blockedReason !== "请先选择流派，启用宗门传承" || !r.build.paths.some((e) => e.id === t))
        return Promise.resolve(!1); return this.submit("/api/combat-v6/sect/path", { activePathId: t, expectedRevision: r.build.revision }); }
    selectMethod(t) { var _a, _b; if (!((_b = (((_a = this.view) === null || _a === void 0 ? void 0 : _a.progress) ? official_chunk_89xwxnzm_js_1.M[this.view.progress.sectId] : void 0)) === null || _b === void 0 ? void 0 : _b.methods.some((e) => e.id === t)))
        return; this.methodId = t, this.skillId = void 0, this.changed(); }
    selectSkill(t) { this.skillId = t, this.changed(); }
    get methods() { var _a; let t = this.view, r = t === null || t === void 0 ? void 0 : t.progress; if (!t || !r)
        return; let e = official_chunk_89xwxnzm_js_1.M[r.sectId], i = e.methods.find((S) => S.id === this.methodId); if (!i)
        return; let n = r.methods[i.id], a = gt(r, t.characterLevel), s = a.filter((S) => S.methodId === i.id && (!S.passive || e.skills.some((P) => P.definition.id === S.id))), h = (_a = s.find((S) => S.id === this.skillId)) !== null && _a !== void 0 ? _a : s[0], o = { ...Lt(t), action: "train", methodId: i.id }, b = lt(t, o), p = (0, official_chunk_89xwxnzm_js_1.L)(t.characterLevel), f = i.isPrimary ? p : Math.min(p, r.methods[e.methods.find((S) => S.isPrimary).id]), m = n < f ? $t(n + 1) : void 0, v = 0, M = 0, l = 0, $ = 0; for (let S = n + 1; S <= Math.min(n + 10, f); S++) {
        let P = $t(S);
        if (M + P.cultivationExp > t.resources.cultivationExp || l + P.spiritStones > t.resources.spiritStones || $ + P.comprehensionInsight > t.resources.comprehensionInsight)
            break;
        M += P.cultivationExp, l += P.spiritStones, $ += P.comprehensionInsight, v++;
    } return { definition: e, method: i, level: n, skills: s, skill: h, singleAction: o, problem: b, allowedCap: f, singleCost: m, fastSteps: v, spentExp: M, spentStones: l, spentInsight: $, fastAction: { ...o, targetLevel: n + v } }; }
}
exports.SectWorkspaceModel = Pt;
class St {
    constructor(t, r) {
        this.pathId = "";
        this.draft = null;
        this.detailOpen = !1;
        this.unlockOpen = !1;
        this.key = "";
        this.workspace = t;
        this.changed = r;
    }
    reset() { this.key = "", this.pathId = "", this.draft = null, this.focusedId = void 0, this.detailOpen = this.unlockOpen = !1, this.leaving = void 0; }
    sync() { let t = this.workspace.view; if (!(t === null || t === void 0 ? void 0 : t.progress))
        return; let r = `${t.build.membershipId}:${this.workspace.refresh}`; if (r === this.key)
        return; this.reset(), this.key = r, this.pathId = t.progress.activePathId; }
    get state() { var _a, _b, _c, _d, _e, _f, _g, _h; this.sync(); let t = this.workspace.view, r = t === null || t === void 0 ? void 0 : t.progress; if (!t || !r)
        return; let e = official_chunk_89xwxnzm_js_1.M[r.sectId], i = e.paths.find(($) => $.id === this.pathId); if (!i)
        return; let n = (0, official_chunk_89xwxnzm_js_1.G)(i, r.meridianLoadouts.find(($) => $.pathId === i.id).nodeIds), a = (_a = this.draft) !== null && _a !== void 0 ? _a : n, s = a.length !== n.length || a.some(($) => !n.includes($)), h = (_c = (_b = i.nodes.find(($) => $.id === this.focusedId)) !== null && _b !== void 0 ? _b : i.nodes.find(($) => n.includes($.id))) !== null && _c !== void 0 ? _c : i.nodes[0], o = x.map(($, S) => i.nodes.find((P) => P.layer === S + 1 && a.includes(P.id))), b = o.slice(0, -1).flatMap(($, S) => { if (!$)
        return []; let P = o[S + 1]; if (P)
        return [{ from: $, to: P }]; return i.requiresConnectedNodes ? i.nodes.filter((K) => K.layer <= r.meridianDepth && (0, official_chunk_89xwxnzm_js_1.E)($, K)).map((K) => ({ from: $, to: K })) : []; }), p = new Map([...e.skills, ...(_d = i.grantSkills) !== null && _d !== void 0 ? _d : [], ...(_e = i.foundationPassives) !== null && _e !== void 0 ? _e : [], ...i.nodes.flatMap(($) => { var _a, _b; return [...(_a = $.grantSkills) !== null && _a !== void 0 ? _a : [], ...(_b = $.passives) !== null && _b !== void 0 ? _b : []]; })].map(($) => [$.definition.id, $.definition.name])), f = [...new Set([...((_f = h.patches) !== null && _f !== void 0 ? _f : []).map(($) => p.get($.skillId)).filter(($) => !!$), ...((_g = h.grantSkills) !== null && _g !== void 0 ? _g : []).map(($) => $.definition.name), ...((_h = h.revokeSkillIds) !== null && _h !== void 0 ? _h : []).map(($) => p.get($)).filter(($) => !!$)])], m = Lt(t), v = { ...m, action: "save", pathId: i.id, nodeIds: [...a] }, M = { ...m, action: "activate", pathId: i.id }, l = { ...m, action: "unlock" }; return { view: t, progress: r, definition: e, path: i, original: n, nodes: a, dirty: s, focused: h, selectedByLayer: o, connections: b, affected: f, save: v, activate: M, unlock: l, locked: this.workspace.pending || !!t.blockedReason, saveProblem: s ? lt(t, v) : null, unlockProblem: r.meridianDepth < 7 ? lt(t, l) : null, unlockCost: r.meridianDepth < 7 ? At(r.meridianDepth + 1) : void 0, reachable: (0, official_chunk_89xwxnzm_js_1.F)(i, a, h) }; }
    get confirmingLeave() { return !!this.leaving; }
    requestLeave(t) { let r = this.state; if (this.workspace.pending)
        return !1; if (r === null || r === void 0 ? void 0 : r.dirty)
        return this.leaving = t, this.changed(), !1; return t(), !0; }
    cancelLeave() { this.leaving = void 0, this.changed(); }
    discardAndLeave() { let t = this.leaving; this.leaving = void 0, this.draft = null, t === null || t === void 0 ? void 0 : t(), this.changed(); }
    selectPath(t) { let r = this.state; if (!r || t === r.path.id || !r.definition.paths.some((e) => e.id === t))
        return; this.requestLeave(() => { this.pathId = t, this.draft = null, this.focusedId = void 0, this.detailOpen = !1, this.changed(); }); }
    focus(t) { var _a; if (!((_a = this.state) === null || _a === void 0 ? void 0 : _a.path.nodes.some((r) => r.id === t)))
        return; this.focusedId = t, this.detailOpen = !0, this.changed(); }
    choose() { let t = this.state; if (!t || t.locked || t.focused.automatic || t.focused.layer > t.progress.meridianDepth || !t.reachable)
        return; this.draft = (0, official_chunk_89xwxnzm_js_1.H)(t.path, t.nodes, t.focused), this.detailOpen = !1, this.changed(); }
    discard() { if (this.workspace.pending)
        return; this.draft = null, this.changed(); }
    openUnlock() { let t = this.state; if (!t || t.locked || t.dirty || t.progress.meridianDepth >= 7)
        return; this.unlockOpen = !0, this.changed(); }
    closeDetail() { this.detailOpen = !1, this.changed(); }
    closeUnlock() { if (this.workspace.pending)
        return; this.unlockOpen = !1, this.changed(); }
    async save() { let t = this.state; if (!t || !t.dirty || t.locked || t.saveProblem)
        return !1; let r = this.key; if (await this.workspace.act(t.save)) {
        if (this.key === r)
            this.draft = null;
        return this.changed(), !0;
    } return !1; }
    async activate() { let t = this.state; if (!t || t.dirty || t.locked || t.path.id === t.progress.activePathId)
        return !1; return this.workspace.act(t.activate); }
    async unlock() { let t = this.state; if (!t || t.locked || t.dirty || !t.unlockCost || t.unlockProblem)
        return !1; let r = this.key; if (await this.workspace.act(t.unlock)) {
        if (this.key === r)
            this.unlockOpen = !1;
        return this.changed(), !0;
    } return !1; }
}
exports.SectMeridianModel = St;
var Nt = { all: "全部", equipment: "道装", consumable: "消耗品", material: "材料", seed: "灵种", beast_book: "传承灵印", beast_refinement: "归元灵露", manual_jade: "功法玉简", blueprint: "图纸", inscription: "阵纹" };
class Kt {
    constructor(t, r) {
        this.loading = !1;
        this.error = "";
        this.buyingId = null;
        this.catalogOpen = !1;
        this.kind = "all";
        this.query = "";
        this.active = !1;
        this.generation = 0;
        this.sequence = 0;
        this.owner = "";
        this.attempts = new Map;
        this.changed = t;
        this.refreshPlayer = r;
    }
    enter(t) { this.leave(), this.active = !0, this.owner = t, this.data = void 0, this.error = "", this.catalogOpen = !1, this.kind = "all", this.query = "", this.reload(); }
    leave() { var _a, _b; this.active = !1, this.generation++, this.sequence++, (_b = (_a = this.reader) === null || _a === void 0 ? void 0 : _a.abort) === null || _b === void 0 ? void 0 : _b.call(_a), this.reader = void 0, this.loading = !1, this.buyingId = null, this.confirmation = void 0, this.attempts.clear(); }
    get visible() { var _a, _b; return ((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.items) !== null && _b !== void 0 ? _b : []).filter((t) => { var _a; return t.item && t.item.name.includes(this.query) && (this.kind === "all" || ((_a = (0, official_chunk_h2eh160v_js_1.Nd)(t.item.definitionId)) === null || _a === void 0 ? void 0 : _a.kind) === this.kind); }); }
    closeCatalog() { this.catalogOpen = !1, this.kind = "all", this.query = "", this.changed(); }
    openCatalog() { this.catalogOpen = !0, this.changed(); }
    async reload() { var _a, _b, _c, _d, _e, _f, _g; if (!this.active)
        return; let t = this.generation, r = ++this.sequence; (_b = (_a = this.reader) === null || _a === void 0 ? void 0 : _a.abort) === null || _b === void 0 ? void 0 : _b.call(_a), this.loading = !0, this.error = "", this.changed(); let e = () => this.active && t === this.generation && r === this.sequence; try {
        let i = await (0, official_chunk_h2eh160v_js_1.Gb)("/api/sects/current/shop", "GET", void 0, void 0, {}, { onTask: (n) => { var _a; if (e())
                this.reader = n;
            else
                (_a = n.abort) === null || _a === void 0 ? void 0 : _a.call(n); } });
        if (!e())
            return;
        if (((_c = i.resource) === null || _c === void 0 ? void 0 : _c.topic) !== "sect.shop" || ((_e = (_d = i.resource) === null || _d === void 0 ? void 0 : _d.scope) === null || _e === void 0 ? void 0 : _e.kind) !== "cultivator" || ((_g = (_f = i.resource) === null || _f === void 0 ? void 0 : _f.scope) === null || _g === void 0 ? void 0 : _g.id) !== this.owner)
            throw Error("资源地址不匹配: sect.shop");
        this.data = official_chunk_89xwxnzm_js_1.Ga["sect.shop"].parse(i.data);
    }
    catch (i) {
        if (e())
            this.error = i instanceof Error ? i.message : "宗门卷宗读取失败";
    }
    finally {
        if (e())
            this.loading = !1, this.reader = void 0, this.changed();
    } }
    buy(t) { var _a; if (!this.active || this.buyingId)
        return; if (t.remainingPurchases === 0) {
        (0, official_chunk_wje6zqc2_js_1.Ge)("此物已达兑换上限");
        return;
    } if (((_a = this.data) === null || _a === void 0 ? void 0 : _a.contribution) === void 0 || this.data.contribution < t.price) {
        (0, official_chunk_wje6zqc2_js_1.Ge)("宗门贡献不足");
        return;
    } if (t.price > 100)
        this.confirmation = t, this.changed();
    else
        this.execute(t); }
    cancelConfirmation() { if (this.buyingId)
        return; this.confirmation = void 0, this.changed(); }
    confirm() { let t = this.confirmation; if (!t || this.buyingId)
        return; this.execute(t).finally(() => { if (this.confirmation === t)
        this.confirmation = void 0, this.changed(); }); }
    async execute(t) { var _a, _b, _c; if (!this.active || this.buyingId)
        return; let r = this.generation, e = (_a = this.attempts.get(t.id)) !== null && _a !== void 0 ? _a : (0, official_chunk_wje6zqc2_js_1.Ee)(); this.attempts.set(t.id, e), this.buyingId = t.id, this.changed(); try {
        let i = await (0, official_chunk_h2eh160v_js_1.Gb)(`/api/sects/current/shop/${encodeURIComponent(t.id)}/buy`, "POST", void 0, void 0, { "Idempotency-Key": e });
        if (!this.active || r !== this.generation)
            return;
        let n = i.data;
        if (this.attempts.delete(t.id), (0, official_chunk_wje6zqc2_js_1.Ge)(`已支取 ${(_c = (_b = n.purchasedItem.item) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : "道具"}，存入${n.destinations.map((a) => a === "bag" ? "背包" : "储藏室").join("／")}`), await this.reload(), this.active && r === this.generation)
            await this.refreshPlayer();
    }
    catch (i) {
        if (this.active && r === this.generation)
            (0, official_chunk_wje6zqc2_js_1.Ge)(i instanceof Error ? i.message : "支取失败");
    }
    finally {
        if (this.active && r === this.generation)
            this.buyingId = null, this.changed();
    } }
}
exports.SectShopModel = Kt;
class jt {
    constructor(t, r) {
        this.kindsOpen = !1;
        this.u = t;
        this.model = r;
        this.preview = new official_chunk_h2eh160v_js_1.te(t);
    }
    reset() { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this), this.stopKeyboard = void 0, this.kindsOpen = !1, this.preview.close(); }
    edit() { var _a; (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); let t = this.model, r = (i) => { t.query = i.value, this.u.invalidate(); }, e = (i) => { var _a; r(i), (_a = this.stopKeyboard) === null || _a === void 0 ? void 0 : _a.call(this); }; this.stopKeyboard = () => { official_chunk_wje6zqc2_js_1.De.offKeyboardInput(r), official_chunk_wje6zqc2_js_1.De.offKeyboardComplete(e), official_chunk_wje6zqc2_js_1.De.hideKeyboard(), this.stopKeyboard = void 0; }, official_chunk_wje6zqc2_js_1.De.onKeyboardInput(r), official_chunk_wje6zqc2_js_1.De.onKeyboardComplete(e), official_chunk_wje6zqc2_js_1.De.showKeyboard({ defaultValue: t.query, maxLength: 200, multiple: !1, confirmHold: !1, confirmType: "done" }); }
    actions(t, r) { var _a, _b, _c; let e = this.u, i = this.model, n = new official_chunk_wje6zqc2_js_1.Ce(e, t), a = (_b = (_a = i.data) === null || _a === void 0 ? void 0 : _a.items.find((b) => b.id === r.id)) !== null && _b !== void 0 ? _b : r, s = (_c = i.data) === null || _c === void 0 ? void 0 : _c.contribution; if (n.text(`${a.price} 宗门贡献`, 16, 24), a.remainingPurchases !== null)
        n.gap(12), n.text(`本周剩余 ${a.remainingPurchases} / ${a.perUserLimit} 次`, 16, 24); n.gap(12); let h = a.remainingPurchases === 0 ? "本周已罄" : s === void 0 ? "读取余额中" : s < a.price ? "宗门贡献不足" : "兑换", o = i.buyingId !== null || a.remainingPurchases === 0 || s === void 0 || s < a.price; return n.block(32.32, (b, p) => { if (e.ctx.save(), o)
        e.ctx.globalAlpha *= 0.5; e.inert(o, () => e.button(i.buyingId === r.id ? "处理中……" : h, b, p, () => i.buy(a))), e.ctx.restore(); }), n; }
    flow(t) { var _a, _b, _c, _d, _e; let r = this.u, e = this.model, i = new official_chunk_wje6zqc2_js_1.Ce(r, t), n = new official_chunk_wje6zqc2_js_1.Ce(r, t - 40), a = n.width; i.gap(28); let s = `宗门宝库 · 已陈列 ${(_b = (_a = e.data) === null || _a === void 0 ? void 0 : _a.items.length) !== null && _b !== void 0 ? _b : 0} 件`, h = `当前贡献：${((_c = e.data) === null || _c === void 0 ? void 0 : _c.contribution) === void 0 ? "读取中…" : e.data.contribution.toLocaleString("zh-CN")}`, o = r.buttonWidth("合上库单"), b = Math.max(r.measure(s, 14), r.measure(h, 14)) + 12 + o <= a; if (n.block(b ? 46 : 90.32, (p, f) => { r.text(s, p, f + 10.5, 14, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), r.text(h, p, f + 35.5, 14), r.button("合上库单", b ? p + a - o : p, f + (b ? 6.84 : 58), () => { this.reset(), e.closeCatalog(); }); }), n.gap(16), n.rule(), n.gap(20), e.loading)
        n.text("宝库执事正在核验封签……", 14, 24, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
    else if (!((_d = e.data) === null || _d === void 0 ? void 0 : _d.items.length))
        n.text("宝库暂未陈列可兑换之物。", 14, 28, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
    else {
        let p = (v, M, l, $, S = !1) => { n.block(78, (P, K) => { r.tracked(v, P, K + 12, 16, 1.28, official_chunk_wje6zqc2_js_1.Be.ink, !0), r.rect(P, K + 28, l, 50, "rgba(248,243,230,.7)"), r.ctx.save(), r.ctx.setLineDash([3, 3]), r.ctx.strokeStyle = "rgba(44,24,16,.2)", r.ctx.strokeRect(P + 0.5, K + 28.5, l - 1, 49), r.ctx.restore(); let D = M; while (D && r.measure(D, 16) > l - (S ? 38 : 24))
            D = D.slice(0, -1); if (r.text(D, P + 12, K + 53, 16), S)
            r.text("⌄", P + l - 16, K + 51, 16); r.hit(P, K + 28, l, 50, $); }); };
        p("搜索商品", e.query, Math.min(242, a), () => this.edit()), n.gap(12), p("物品分类", (_e = Nt[e.kind]) !== null && _e !== void 0 ? _e : "全部", Math.min(110, a), () => { this.kindsOpen = !0, r.modalScroll = 0, r.invalidate(); }, !0), n.gap(16);
        let f = e.visible;
        if (!f.length)
            n.text("没有匹配的商品", 14, 28, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), n.gap(16);
        let m = (a - 24) / 4;
        for (let v = 0; v < f.length; v += 4) {
            if (v)
                n.gap(8);
            let M = f.slice(v, v + 4), l = Math.max(...M.map(($) => r.lines(`${$.price} 宗门贡献`, m, 12).length * 16));
            n.block(m + 4 + l, ($, S) => M.forEach((P, K) => { let D = $ + K * (m + 8), j = () => this.preview.open(P.item, { x: D, y: S, w: m, h: m }, void 0, void 0, (z) => this.actions(z, P), void 0, "奖励"); (0, official_chunk_h2eh160v_js_1.ve)(r, D, S, m, P.item, { badge: P.remainingPurchases === 0 ? "已罄" : void 0, quick: j, preview: j }), r.lines(`${P.price} 宗门贡献`, m, 12).forEach((z, H) => r.text(z, D + (m - r.measure(z, 12, "monospace")) / 2, S + m + 12 + H * 16, 12, official_chunk_wje6zqc2_js_1.Be.ink, "monospace")); }));
        }
    } if (e.error)
        n.gap(16), n.text(e.error, 14, 28, official_chunk_wje6zqc2_js_1.Be.crimson); if (i.block(n.height, (p, f) => n.paint(p + 20, f)), i.gap(28), i.height < 544)
        i.gap(544 - i.height); return i; }
    paintOverlay() { var _a, _b; let t = this.u, r = this.model; if (this.kindsOpen) {
        let e = new official_chunk_wje6zqc2_js_1.Ce(t, t.width - 32);
        Object.entries(Nt).forEach(([i, n]) => e.block(40, (a, s) => { t.text(n, a + 12, s + 20, 16, r.kind === i ? official_chunk_wje6zqc2_js_1.Be.crimson : official_chunk_wje6zqc2_js_1.Be.ink), t.hit(a, s, e.width, 40, () => { r.kind = i, this.kindsOpen = !1, t.modalScroll = 0, t.invalidate(); }); })), (0, official_chunk_wje6zqc2_js_1.He)(t, { title: "物品分类", rows: [], content: e }, () => { this.kindsOpen = !1, t.invalidate(); });
        return;
    } if (r.confirmation) {
        t.inert(!0, () => this.preview.paint());
        let e = new official_chunk_wje6zqc2_js_1.Ce(t, Math.min(448, t.width - 24) - 34), i = r.confirmation;
        e.text(`确定兑换「${(_b = (_a = i.item) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "道具"}」吗？`, 14, 28), e.gap(8), e.text(`将消耗：${i.price} 宗门贡献`, 14, 28, official_chunk_wje6zqc2_js_1.Be.crimson, !0), (0, official_chunk_wje6zqc2_js_1.He)(t, { title: "高额兑换确认", style: "modal", rows: [], content: e, actions: [{ label: "再看看", disabled: !!r.buyingId, run: () => r.cancelConfirmation() }, { label: "确认兑换", primary: !0, disabled: !!r.buyingId, run: () => r.confirm() }] }, () => r.cancelConfirmation());
        return;
    } this.preview.paint(); }
}
exports.SectShopView = jt;
var De = (t) => { var _a; return (_a = t === null || t === void 0 ? void 0 : t.filter((r) => r.upgradeable && r.level < r.maxLevel)) !== null && _a !== void 0 ? _a : []; };
function Qr(t, r) { let e = t ? `${t}当前${r.level}级，` : ""; return r.target === null ? `${e}已经满级` : `${e}建设进度${r.progress}/${r.target}`; }
var dt = (t) => t % 1e4 === 0 ? `${t / 1e4}万` : t.toLocaleString("zh-CN");
class Ht {
    constructor(t, r) {
        this.loading = !1;
        this.busy = !1;
        this.error = "";
        this.result = "";
        this.active = !1;
        this.donation = !1;
        this.owner = "";
        this.sect = "";
        this.generation = 0;
        this.lifecycle = 0;
        this.reads = new Set;
        this.changed = t;
        this.refreshPlayer = r;
    }
    open(t, r, e) { this.close(), this.active = !0, this.owner = t, this.sect = r, this.donation = e, this.reload(); }
    close() { var _a; this.active = !1, this.lifecycle++, this.generation++; for (let t of this.reads)
        (_a = t.abort) === null || _a === void 0 ? void 0 : _a.call(t); this.reads.clear(), clearTimeout(this.timer), this.timer = void 0, this.infrastructure = void 0, this.member = void 0, this.facilityKey = void 0, this.amount = void 0, this.loading = this.busy = !1, this.error = this.result = ""; }
    get facilities() { var _a; return De((_a = this.infrastructure) === null || _a === void 0 ? void 0 : _a.facilities); }
    get facility() { return this.facilities.find((t) => t.key === this.facilityKey); }
    get quote() { return this.amount === void 0 ? void 0 : (0, official_chunk_89xwxnzm_js_1.ka)(this.amount); }
    midnight() { if (clearTimeout(this.timer), !this.active || !this.donation)
        return; let t = Date.now(), r = new Date(t + 28800000), e = Date.UTC(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate() + 1) - 28800000; this.timer = setTimeout(() => { this.reload(); }, Math.max(1000, e - t)); }
    async reload() { var _a; if (!this.active)
        return; let t = ++this.generation; for (let s of this.reads)
        (_a = s.abort) === null || _a === void 0 ? void 0 : _a.call(s); this.reads.clear(), this.loading = !0, this.changed(); let r = () => this.active && t === this.generation, e = async (s, h) => { var _a, _b; let o; try {
        let b = await (0, official_chunk_h2eh160v_js_1.Gb)(h, "GET", void 0, void 0, {}, { onTask: (v) => { var _a; if (o = v, r())
                this.reads.add(v);
            else
                (_a = v.abort) === null || _a === void 0 ? void 0 : _a.call(v); } }), p = b.resource, f = s === "sect.infrastructure" ? "sect" : "cultivator", m = s === "sect.infrastructure" ? this.sect : this.owner;
        if ((p === null || p === void 0 ? void 0 : p.topic) !== s || ((_a = p === null || p === void 0 ? void 0 : p.scope) === null || _a === void 0 ? void 0 : _a.kind) !== f || ((_b = p === null || p === void 0 ? void 0 : p.scope) === null || _b === void 0 ? void 0 : _b.id) !== m)
            throw Error(`资源地址不匹配: ${s}`);
        return official_chunk_89xwxnzm_js_1.Ga[s].parse(b.data);
    }
    finally {
        if (o)
            this.reads.delete(o);
    } }, [i, n] = await Promise.allSettled([e("sect.infrastructure", "/api/sects/current/infrastructure"), this.donation ? e("sect.construction-member", "/api/sects/current/construction-member") : Promise.resolve(void 0)]); if (!r())
        return; if (i.status === "fulfilled")
        this.infrastructure = i.value; if (n.status === "fulfilled")
        this.member = n.value; let a = i.status === "rejected" ? i.reason : n.status === "rejected" ? n.reason : void 0; this.error = a ? a instanceof Error ? a.message : "宗门卷宗读取失败" : "", this.loading = !1, this.midnight(), this.changed(); }
    select(t, r, e) { if (this.loading || this.busy)
        return; if (t === "leave")
        r();
    else if (t === "back-facility")
        this.facilityKey = void 0, this.amount = void 0;
    else if (t === "back-amount")
        this.amount = void 0;
    else if (t === "confirm")
        this.confirm(e);
    else if (t.startsWith("facility:")) {
        let i = t.slice(9);
        if (this.facilities.some((n) => n.key === i))
            this.facilityKey = i, this.amount = void 0;
    }
    else if (t.startsWith("amount:")) {
        let i = Number(t.slice(7));
        if (official_chunk_89xwxnzm_js_1.ja.some((n) => n.spiritStones === i))
            this.amount = i;
    } this.changed(); }
    async confirm(t) { var _a, _b; let r = this.facility, e = this.quote; if (!this.active || this.busy || this.loading || ((_a = this.member) === null || _a === void 0 ? void 0 : _a.constructedToday))
        return; if (!r || !e) {
        this.error = "请先选择设施和灵石档位。", this.changed();
        return;
    } let i = this.lifecycle, n = () => this.active && i === this.lifecycle; this.busy = !0, this.error = this.result = "", this.changed(); try {
        if (await (0, official_chunk_h2eh160v_js_1.Gb)("/api/sects/current/construction/donate", "POST", { facilityKey: r.key, spiritStones: e.spiritStones }, void 0, { "Idempotency-Key": (0, official_chunk_wje6zqc2_js_1.Ee)() }), !n())
            return;
        if (this.result = (_b = t[r.key]) !== null && _b !== void 0 ? _b : "所选设施", await this.reload(), n())
            await this.refreshPlayer();
    }
    catch (a) {
        if (n())
            this.error = a instanceof Error ? a.message : "交谈暂时中断，请稍后再试。";
    }
    finally {
        if (n())
            this.busy = !1, this.changed();
    } }
    flow(t, r, e, i, n) { var _a, _b, _c, _d, _e; let a = [{ speaker: e.name, body: e.greeting }], s = { id: "leave", label: "弟子告退", tone: "muted" }; if (!this.donation)
        return a.push({ speaker: e.name, body: this.facilities.length ? this.facilities.map((f) => { var _a; return Qr((_a = i[f.key]) !== null && _a !== void 0 ? _a : "未命名设施", f); }).join("；") + "。" : "宗门当前没有可继续建设的设施。" }), (0, official_chunk_nx6d9wvp_js_1.sb)(t, r, e, a, [s], n, this.loading, this.error); let h = this.facility, o = this.quote, b = this.member; if (b === null || b === void 0 ? void 0 : b.constructedToday)
        a.push({ speaker: e.name, body: `今日建设已经完成：向${(_b = i[(_a = b.facilityKey) !== null && _a !== void 0 ? _a : ""]) !== null && _b !== void 0 ? _b : "所选设施"}捐献${dt((_c = b.spiritStones) !== null && _c !== void 0 ? _c : 0)}灵石，获得${(_d = b.contribution) !== null && _d !== void 0 ? _d : 0}点宗门贡献。`, tone: "attention" });
    else if (h)
        a.push({ speaker: e.name, body: `今日准备建设${(_e = i[h.key]) !== null && _e !== void 0 ? _e : "所选设施"}。${Qr("", h)}` }); if (o)
        a.push({ speaker: e.name, body: `本次需要捐献${dt(o.spiritStones)}灵石，可增加${o.constructionPoints}点建设进度并获得${o.contribution}点宗门贡献。` }); if (this.result)
        a.push({ speaker: e.name, body: `${this.result}的建设已经登记，灵石与贡献均已结算。`, tone: "attention" }); let p = (b === null || b === void 0 ? void 0 : b.constructedToday) || !this.facilities.length ? [s] : !h ? [...this.facilities.map((f) => { var _a; return ({ id: `facility:${f.key}`, label: `建设${(_a = i[f.key]) !== null && _a !== void 0 ? _a : "这项设施"}` }); }), s] : this.amount === void 0 ? [...official_chunk_89xwxnzm_js_1.ja.map((f) => ({ id: `amount:${f.spiritStones}`, label: `捐献${dt(f.spiritStones)}灵石` })), { id: "back-facility", label: "改选设施" }, s] : [{ id: "confirm", label: "确认建设", tone: "primary" }, { id: "back-amount", label: "改选灵石档位" }, { id: "back-facility", label: "改选设施" }, s]; return (0, official_chunk_nx6d9wvp_js_1.sb)(t, r, e, a, p, (f) => this.select(f, n, i), this.loading || this.busy, this.error); }
}
exports.SectIndustries = Ht;
function je(t, r, e) { var _a, _b; let i = new official_chunk_wje6zqc2_js_1.Ce(t, r), n = e.methods; if (!n)
    return i; let a = official_chunk_wje6zqc2_js_1.Be["ink-secondary"], s = e.view.progress, h = (r - 8) / 3; i.gap(16); for (let $ = 0; $ < n.definition.methods.length; $ += 3) {
    let S = n.definition.methods.slice($, $ + 3), P = Math.max(...S.map((K) => t.lines(K.name.replace(/[《》]/g, ""), h - 16, 12).length * 19.5 + 47.5));
    if (i.block(P, (K, D) => S.forEach((j, z) => { let H = K + z * (h + 4), G = j.id === e.methodId; if (G)
        t.rect(H, D, h, P, "rgba(153,27,27,.08)"); let Z = t.lines(j.name.replace(/[《》]/g, ""), h - 16, 12); Z.forEach((I, q) => t.text(I, H + (h - t.measure(I, 12)) / 2, D + 21.75 + q * 19.5, 12, G ? official_chunk_wje6zqc2_js_1.Be.crimson : a)); let O = `${s.methods[j.id]}级${j.isPrimary ? " · 主心法" : ""}`; t.text(O, H + (h - t.measure(O, 12)) / 2, D + 25.75 + Z.length * 19.5, 12, a), t.hit(H, D, h, P, () => e.selectMethod(j.id)); })), $ + 3 < n.definition.methods.length)
        i.gap(4);
} i.gap(12), i.rule(), i.gap(20); let o = ($, S) => { let P = 0, K = 0, D = $.map((j) => { let z = t.measure(j.text, j.size, t.bodyFont, j.bold); if (P && P + z > r)
    K++, P = 0; let H = { ...j, left: P, row: K }; return P += z + 8, H; }); i.block((K + 1) * S, (j, z) => D.forEach((H) => t.text(H.text, j + H.left, z + H.row * S + S / 2, H.size, H.color, t.bodyFont, H.bold))); }, b = n.method.name.replace(/[《》]/g, ""); o([{ text: b, size: 16, color: official_chunk_wje6zqc2_js_1.Be.ink, bold: !0 }, ...n.method.isPrimary ? [{ text: "主心法", size: 12, color: a }] : []], 24); let p = n.method.panel; if (i.gap(8), i.text(p ? `研习提升${(_a = ot[p.attr]) !== null && _a !== void 0 ? _a : p.attr}，并精进关联神通。` : "研习精进此卷关联的宗门神通。", 14, 28, a), p)
    i.gap(16), i.block(87.5, ($, S) => { var _a; let P = `${(_a = ot[p.attr]) !== null && _a !== void 0 ? _a : p.attr} · 当前贡献`, K = $ + t.measure(P, 12) + 24; if (t.text(P, $, S + 25.75, 12, a), t.text(`+${Math.floor(p.value * n.level)}`, $, S + 55.5, 24), n.level < n.allowedCap)
        t.text("→", K, S + 43.75, 14, a), t.text(`研习至${n.level + 1}级`, K + 38, S + 25.75, 12, a), t.text(`+${Math.floor(p.value * (n.level + 1))}`, K + 38, S + 55.5, 24, official_chunk_wje6zqc2_js_1.Be.crimson);
    else
        t.text("已达当前上限", K, S + 43.75, 12, a); }); i.gap(20), i.text("关联神通", 12, 18, a), i.gap(12); let f = [], m = 0, v = () => { let $ = f; i.block(40, (S, P) => $.forEach((K) => { var _a; let D = K.id === ((_a = n.skill) === null || _a === void 0 ? void 0 : _a.id); if (t.text(K.name, S + K.left + 6, P + 20, 14, D ? official_chunk_wje6zqc2_js_1.Be.crimson : a), D)
    t.rect(S + K.left, P + 39, K.width, 1, "rgba(153,27,27,.6)"); t.hit(S + K.left, P, K.width, 40, () => e.selectSkill(K.id)); })), f = [], m = 0; }; for (let $ of n.skills) {
    let S = Math.min(r, t.measure($.name, 14) + 12);
    if (m && m + S > r)
        v(), i.gap(8);
    f.push({ id: $.id, name: $.name, left: m, width: S }), m += S + 8;
} if (f.length)
    v(); if (i.gap(16), n.skill) {
    if (o([{ text: n.skill.name, size: 14, color: official_chunk_wje6zqc2_js_1.Be.ink, bold: !0 }, { text: n.skill.passive ? "被动" : "神通", size: 12, color: a }, { text: `${n.skill.level}级`, size: 12, color: a }], 21), !n.skill.available)
        i.text(n.skill.requirement, 12, 19.5, a);
    i.gap(8), i.text(n.skill.description, 14, 28, a);
}
else
    i.text("此卷暂无关联神通。", 12, 19.5, a); if (i.gap(24), i.rule(), i.gap(16), n.singleCost)
    i.text(`研习1级：${n.singleCost.cultivationExp.toLocaleString()} 修为 · ${n.singleCost.spiritStones.toLocaleString()} 灵石`, 12, 19.5), i.gap(4); if (n.fastSteps > 1)
    i.text(`研习${n.fastSteps}级：${n.spentExp.toLocaleString()} 修为 · ${n.spentStones.toLocaleString()} 灵石`, 12, 19.5), i.gap(4); i.text((_b = n.problem) !== null && _b !== void 0 ? _b : `当前${n.level}级 · 上限${n.allowedCap}级`, 12, 19.5, n.problem ? official_chunk_wje6zqc2_js_1.Be.crimson : a), i.gap(12); let M = [{ label: "研习1级", action: n.singleAction }, ...n.fastSteps > 1 ? [{ label: `研习${n.fastSteps}级`, action: n.fastAction }] : []], l = 0; for (let $ of M) {
    let S = e.pending ? "研习中……" : $.label, P = t.buttonWidth(S, !0);
    if (l && l + P > r)
        i.gap(40), l = 0;
    let K = l;
    i.block(0, (D, j) => { let z = e.pending || !!n.problem; if (t.ctx.save(), z)
        t.ctx.globalAlpha *= 0.45; t.inert(z, () => t.button(S, D + K, j + 3.84, () => { e.act($.action); }, official_chunk_wje6zqc2_js_1.Be.crimson)), t.ctx.restore(); }), l += P + 12;
} return i.gap(40), i; }
function ct(t, r, e, i) { var _a; let n = new official_chunk_wje6zqc2_js_1.Ce(t, r), a = new official_chunk_wje6zqc2_js_1.Ce(t, r - 24), s = e.view, h = (o, b, p = e.pending) => a.block(32.32, (f, m) => t.inert(p, () => t.button(o, f, m, b))); if (e.error)
    a.text(e.error, 14, 21, official_chunk_wje6zqc2_js_1.Be.crimson), h("重新读取", () => { e.reload(); }), a.gap(16); if (!s)
    a.text("正在读取传承……", 14, 21), a.gap(16);
else if (!s.progress) {
    a.text((_a = s.blockedReason) !== null && _a !== void 0 ? _a : "", 14, 21), a.gap(16);
    for (let o of s.build.paths)
        h(`启用${o.name}`, () => { e.enablePath(o.id); }, e.pending || s.blockedReason !== "请先选择流派，启用宗门传承");
    h("返回", i);
}
else {
    if (s.blockedReason)
        a.text(s.blockedReason, 14, 21), a.gap(16);
    if (a.block(32.32, (o, b) => t.inert(e.pending, () => t.button("返回", o + a.width - t.buttonWidth("返回"), b, i))), e.mode === "skills")
        gt(s.progress, s.characterLevel).forEach((o, b) => { if (b)
            a.gap(12); a.text(`${o.name} · ${o.passive ? "被动" : "神通"} · ${o.level}级`, 14, 21, official_chunk_wje6zqc2_js_1.Be.ink, !0), a.gap(4), a.text(`${o.methodName} · ${o.available ? "已解锁" : o.requirement}`, 14, 21, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), a.gap(4), a.text(o.description, 14, 21), a.gap(12), a.rule(); });
    else {
        let o = je(t, a.width, e);
        a.block(o.height, o.paint);
    }
} return n.gap(12), n.block(a.height, (o, b) => a.paint(o + 12, b)), n.gap(12), n; }
function A(t, r, e, i = !1, n = !1, a = 40) { t.block(a, (s, h) => { let o = t.u; if (o.ctx.save(), i)
    o.ctx.globalAlpha *= 0.45; o.inert(i, () => o.button(r, s, h + (a - 32.32) / 2, e, n ? official_chunk_wje6zqc2_js_1.Be.crimson : official_chunk_wje6zqc2_js_1.Be.ink)), o.ctx.restore(); }); }
function Vr(t, r, e, i) { var _a, _b; let n = new official_chunk_wje6zqc2_js_1.Ce(t, r), a = new official_chunk_wje6zqc2_js_1.Ce(t, r - 24), s = e.workspace, h = s.view, o = e.state, b = official_chunk_wje6zqc2_js_1.Be["ink-secondary"]; if (s.error)
    a.text(s.error, 14, 21, official_chunk_wje6zqc2_js_1.Be.crimson), A(a, "重新读取", () => { s.reload(); }, s.pending), a.gap(16); if (!h)
    a.text("正在读取传承……", 14, 21), a.gap(16);
else if (!h.progress) {
    a.text((_a = h.blockedReason) !== null && _a !== void 0 ? _a : "", 14, 21), a.gap(16);
    for (let p of h.build.paths)
        A(a, `启用${p.name}`, () => { s.enablePath(p.id); }, s.pending || h.blockedReason !== "请先选择流派，启用宗门传承");
    A(a, "返回", i, s.pending);
}
else if (o) {
    if (h.blockedReason)
        a.text(h.blockedReason, 14, 21), a.gap(16);
    let p = 0;
    for (let v of o.definition.paths) {
        let M = v.id === o.progress.activePathId, l = t.measure(v.name, 14) + 8 + (M ? 30 : 0);
        if (p && p + l > a.width)
            a.gap(44), p = 0;
        let $ = p;
        a.block(0, (S, P) => { let K = v.id === o.path.id; if (t.ctx.save(), s.pending)
            t.ctx.globalAlpha *= 0.45; if (t.text(v.name, S + $ + 4, P + 22, 14, K ? official_chunk_wje6zqc2_js_1.Be.crimson : b), M)
            t.text("当前", S + $ + l - 24, P + 22, 12, official_chunk_wje6zqc2_js_1.Be.crimson); if (K)
            t.rect(S + $, P + 42, l, 2, "rgba(153,27,27,.6)"); if (t.ctx.restore(), !s.pending)
            t.hit(S + $, P, l, 44, () => e.selectPath(v.id)); }), p += l + 16;
    }
    let f = t.buttonWidth("返回");
    if (p - 16 + 12 + f <= a.width)
        a.block(44, (v, M) => t.inert(s.pending, () => t.button("返回", v + a.width - f, M + 5.84, () => e.requestLeave(i))));
    else
        a.gap(56), A(a, "返回", () => e.requestLeave(i), s.pending, !1, 32.32);
    a.gap(12), a.rule(), a.gap(16);
    let m = Math.min(360, a.width);
    if (a.block(616, (v, M) => { v += (a.width - m) / 2; let l = t.ctx; for (let $ of o.connections) {
        let S = o.nodes.includes($.from.id) && o.nodes.includes($.to.id), P = ($.from.slot - 0.5) * m / 3, K = ($.to.slot - 0.5) * m / 3, D = $.from.layer * 88;
        l.save(), l.strokeStyle = S ? "rgba(153,27,27,.7)" : "rgba(153,27,27,.3)", l.lineWidth = S ? 2 : 1.5, l.lineJoin = "round", l.beginPath(), l.moveTo(v + P, M + D - 12), l.lineTo(v + P, M + D), l.lineTo(v + K, M + D), l.lineTo(v + K, M + D + 12), l.stroke(), l.restore();
    } for (let $ = 1; $ <= 7; $++)
        for (let [S, P] of o.path.nodes.filter((K) => K.layer === $).sort((K, D) => K.slot - D.slot).entries()) {
            let K = v + (S + 0.5) * m / 3 - 32, D = M + ($ - 1) * 88 + 12, j = P.automatic ? $ <= o.progress.meridianDepth : o.nodes.includes(P.id), z = !P.automatic && j !== o.original.includes(P.id), H = P.automatic || (0, official_chunk_89xwxnzm_js_1.F)(o.path, o.nodes, P), G = !P.automatic && !j && H && $ <= o.progress.meridianDepth && !o.selectedByLayer[$ - 1], Z = !H || $ > o.progress.meridianDepth, O = (F) => { if (l.beginPath(), P.automatic)
                l.arc(K + 32, D + 32, 32 + F, 0, Math.PI * 2);
            else
                l.rect(K - F, D - F, 64 + 2 * F, 64 + 2 * F); };
            if (l.save(), j || G)
                O(1), l.strokeStyle = "rgba(153,27,27,.1)", l.lineWidth = 2, l.stroke();
            if (O(0), l.fillStyle = j ? official_chunk_wje6zqc2_js_1.Be["paper-2"] : official_chunk_wje6zqc2_js_1.Be.paper, l.fill(), l.lineWidth = 1, l.strokeStyle = j ? "rgba(153,27,27,.65)" : G ? "rgba(153,27,27,.35)" : Z ? "rgba(44,24,16,.1)" : "rgba(44,24,16,.25)", l.stroke(), P.id === o.focused.id)
                O(4), l.strokeStyle = "rgba(44,24,16,.25)", l.stroke();
            let I = t.lines(P.name, 60, 12), q = j ? official_chunk_wje6zqc2_js_1.Be.crimson : G ? official_chunk_wje6zqc2_js_1.Be.ink : Z ? "rgba(44,24,16,.35)" : b;
            if (I.forEach((F, E) => t.text(F, K + (64 - t.measure(F, 12)) / 2, D + 32 + (E - (I.length - 1) / 2) * 16, 12, q)), z)
                l.beginPath(), l.arc(K + 64, D, 4, 0, Math.PI * 2), l.fillStyle = official_chunk_wje6zqc2_js_1.Be.crimson, l.fill(), l.strokeStyle = official_chunk_wje6zqc2_js_1.Be.paper, l.stroke();
            l.restore(), t.hit(K, D, 64, 64, () => { t.modalScroll = 0, e.focus(P.id); });
        } }), a.gap(16), o.progress.meridianDepth < 7)
        a.text(`下一层 · 人物${(0, official_chunk_wje6zqc2_js_1.wf)(x[o.progress.meridianDepth]).label}`, 12, 18, b), a.gap(8), A(a, `解锁第${o.progress.meridianDepth + 1}层`, () => { t.modalScroll = 0, e.openUnlock(); }, o.locked || o.dirty);
    if (a.gap(20), a.rule(), a.gap(16), a.text((_b = o.saveProblem) !== null && _b !== void 0 ? _b : (o.dirty ? "有未保存修改" : o.nodes.length < o.progress.meridianDepth ? "已解锁层仍有空位，可继续选择节点。" : "方案已保存"), o.saveProblem ? 14 : 12, o.saveProblem ? 21 : 19.5, o.saveProblem ? official_chunk_wje6zqc2_js_1.Be.crimson : b), a.gap(12), o.dirty)
        A(a, "放弃修改", () => e.discard(), s.pending), A(a, s.pending ? "保存中……" : "保存方案", () => { e.save(); }, o.locked || !!o.saveProblem, !0);
    else if (o.path.id !== o.progress.activePathId)
        A(a, s.pending ? "启用中……" : "启用此流派", () => { e.activate(); }, o.locked, !0);
} return n.gap(12), n.block(a.height, (p, f) => a.paint(p + 12, f)), n.gap(12), n; }
function Ir(t, r) { var _a, _b; let e = r.state; if (!e)
    return; let i = new official_chunk_wje6zqc2_js_1.Ce(t, t.width - 32), n = official_chunk_wje6zqc2_js_1.Be["ink-secondary"]; if (r.confirmingLeave) {
    i.text("可先返回保存方案，或放弃修改后离开。", 14, 21), i.gap(16), A(i, "返回保存", () => r.cancelLeave()), A(i, "放弃修改", () => r.discardAndLeave()), (0, official_chunk_wje6zqc2_js_1.He)(t, { title: "有未保存的经脉修改", rows: [], content: i }, () => r.cancelLeave());
    return;
} if (r.unlockOpen && e.unlockCost) {
    let o = e.unlockCost;
    if (i.text("两流派共用，只支付一次。", 14, 21), i.gap(16), i.text(`${o.cultivationExp.toLocaleString()} 修为 · ${o.spiritStones.toLocaleString()} 灵石${o.comprehensionInsight ? ` · ${o.comprehensionInsight} 感悟` : ""}`, 14, 21), i.gap(16), e.unlockProblem)
        i.text(e.unlockProblem, 14, 21), i.gap(16);
    A(i, r.workspace.pending ? "处理中……" : "确认解锁", () => { r.unlock(); }, r.workspace.pending || !!e.unlockProblem), (0, official_chunk_wje6zqc2_js_1.He)(t, { title: `解锁第${e.progress.meridianDepth + 1}层`, rows: [], content: i }, () => r.closeUnlock());
    return;
} if (!r.detailOpen)
    return; let a = e.focused, s = a.layer > e.progress.meridianDepth, h = e.nodes.includes(a.id); if (i.text(`${e.path.name} · 第${["一", "二", "三", "四", "五", "六", "七"][a.layer - 1]}层`, 12, 18, n), i.gap(24), i.text(a.description, 14, 28, n), i.gap(20), i.rule(), i.gap(16), s)
    i.text("解锁条件", 12, 19.5, n), i.gap(8), i.text(`人物达到${(0, official_chunk_wje6zqc2_js_1.wf)(x[a.layer - 1]).label}，逐层解锁。`, 14, 21);
else {
    if (e.affected.length)
        i.text("关联神通", 12, 19.5, n), i.gap(8), i.text(e.affected.join("、"), 14, 21), i.gap(8);
    for (let o of (_a = a.panel) !== null && _a !== void 0 ? _a : [])
        i.text(`${(_b = ot[o.attr]) !== null && _b !== void 0 ? _b : o.attr} ${o.value >= 0 ? "+" : ""}${o.value}`, 14, 21), i.gap(8);
    i.text(a.automatic ? "贯通本层后自动获得，不占经脉选择。" : h ? "当前方案已选择此节点。" : "选择后替换本层原节点。", 12, 19.5, n);
} i.gap(20), A(i, s ? "尚未解锁" : a.automatic ? "已自动获得" : h ? "取消选择" : "选择此节点", () => r.choose(), e.locked || s || !!a.automatic || !e.reachable, !h), (0, official_chunk_wje6zqc2_js_1.He)(t, { title: a.name, rows: [], content: i }, () => r.closeDetail()); }
var Et = (t, r) => { let e = t[r]; return typeof e === "string" && e.trim() ? e : void 0; };
function Or(t, r, e, i, n) { var _a, _b, _c, _d; let a = (_a = e.conversation.parameters) !== null && _a !== void 0 ? _a : {}, s = Et(a, "facilityKey"), h = Et(a, "detail"), o = (_b = i.infrastructure) === null || _b === void 0 ? void 0 : _b.facilities.find((f) => f.key === s), b = e.conversation.renderer === "sect.herb-garden.caretaker", p = [{ ...b ? { speaker: e.name } : {}, body: e.greeting }]; if (b) {
    let f = Array.isArray(a.stages) ? a.stages.filter((m) => typeof m === "string" && !!m.trim()) : [];
    if (o && f.length)
        p.push({ speaker: e.name, body: `眼下正是“${f[Math.min(f.length - 1, Math.max(0, o.level - 1))]}”的长势。${h !== null && h !== void 0 ? h : ""}` });
    else if (!i.loading)
        p.push({ speaker: e.name, body: h !== null && h !== void 0 ? h : "今日田间值录尚未归档，请稍后再来。", tone: o ? "normal" : "attention" });
}
else if (o) {
    let { context: f, infrastructure: m } = i, v = (_c = Et(a, "effectKey")) !== null && _c !== void 0 ? _c : s, M = f && m ? (0, official_chunk_89xwxnzm_js_1.ma)(official_chunk_89xwxnzm_js_1.ua.registry.require(f.sectId).organization, f.discipleRank, new Map(m.facilities.map(($) => [$.key, $.level]))) : void 0, l = (0, official_chunk_89xwxnzm_js_1.na)({ facilityLabel: s ? (_d = i.presentation.facilityLabels[s]) !== null && _d !== void 0 ? _d : "此处设施" : "此处设施", facility: o, effect: v ? M === null || M === void 0 ? void 0 : M.facilityEffects[v] : void 0 });
    p.push({ body: [...l.map(($) => ({ text: $.text, ...$.emphasis ? { color: $.emphasis === "benefit" ? official_chunk_wje6zqc2_js_1.Be.teal : official_chunk_wje6zqc2_js_1.Be.crimson, bold: !0 } : {} })), ...h ? [{ text: h }] : []] });
}
else if (!i.loading)
    p.push({ body: "此处设施的值录暂未找到，请稍后再来。", tone: "attention" }); return (0, official_chunk_nx6d9wvp_js_1.sb)(t, r, e, p, [{ id: "leave", label: b ? "弟子告退" : "返回房间", tone: "muted" }], n, i.loading, i.error); }
function Wr(t, r) { let e = new official_chunk_wje6zqc2_js_1.Ce(t, r), i = r - 64, n = i - 26, s = t.lines("弟子居所 · 门禁已启", n, 12), h = t.lines("此处记录你的宗门居所资格，暂不提供额外数值收益。", n, 14), o = 24 + s.length * 18 + 16 + h.length * 28, b = Math.max(256, 80 + o + 12); return e.block(b, (p, f) => { let m = t.ctx, v = m.createLinearGradient(p, f, p + r, f); v.addColorStop(0, "rgba(63,67,59,.12)"), v.addColorStop(0.18, "transparent"), v.addColorStop(0.82, "transparent"), v.addColorStop(1, "rgba(63,67,59,.12)"), m.fillStyle = v, m.fillRect(p, f, r, b); let M = m.createRadialGradient(p + r * 0.5, f + b * 0.35, 0, p + r * 0.5, f + b * 0.35, Math.hypot(r * 0.5, b * 0.65) * 0.25); M.addColorStop(0, "rgba(255,255,255,.78)"), M.addColorStop(1, "transparent"), m.fillStyle = M, m.fillRect(p, f, r, b); let l = p + 32, $ = f + (b - o - 12) / 2; t.rect(l, $, 2, o, official_chunk_wje6zqc2_js_1.Be.crimson), s.forEach((P, K) => t.tracked(P, l + 14 + (n - t.trackedWidth(P, 12, 3.6)) / 2, $ + 21 + K * 18, 12, 3.6, official_chunk_wje6zqc2_js_1.Be["ink-secondary"])); let S = $ + 12 + s.length * 18 + 16; h.forEach((P, K) => t.text(P, l + 14 + (n - t.measure(P, 14)) / 2, S + 14 + K * 28, 14, official_chunk_wje6zqc2_js_1.Be["ink-secondary"])); }), e; }
class kr {
    get sceneKey() { return this.mode === "alchemy" ? "alchemy" : this.mode === "refinery" ? "refinery" : this.mode === "garden" ? "herbGarden" : this.mode === "gate" ? "gate" : this.mode === "cave" ? "cave" : this.mode === "vein" ? "spiritVein" : this.mode === "cultivation" ? "cultivation" : this.mode === "industries" ? "industries" : this.mode === "treasury" ? "treasury" : this.mode === "skills" ? "arena" : this.mode === "paths" ? "paths" : "archive"; }
    get permission() { return this.mode === "alchemy" ? "sect.facility.alchemy.use" : this.mode === "refinery" ? "sect.facility.refinery.use" : this.mode === "garden" ? "sect.herb_garden.view" : this.mode === "gate" ? "sect.gate.view" : this.mode === "cave" ? "sect.cave.view" : this.mode === "vein" ? "sect.spirit_vein.view" : this.mode === "cultivation" ? "sect.facility.cultivation.use" : this.mode === "industries" ? "sect.construction.view" : this.mode === "treasury" ? "sect.shop.use" : this.mode === "skills" ? "sect.arena.use" : this.mode === "paths" ? "sect.enlightenment.use" : "sect.archive.use"; }
    constructor(t, r, e, i = "methods") {
        this.workspace = !1;
        this.requestedWorkspace = !1;
        this.alchemyOpen = !1;
        this.forgingOpen = !1;
        this.retreatOpen = !1;
        this.showFacilityStatus = !1;
        this.owner = "";
        this.u = t;
        this.player = r;
        this.navigate = e;
        this.mode = i;
        this.context = new official_chunk_89xwxnzm_js_1.Qa(() => t.invalidate(), i === "cultivation" || i === "vein" || i === "gate" || i === "garden" || i === "refinery" || i === "alchemy"), this.model = new Pt(() => { if (this.model.notice)
            (0, official_chunk_wje6zqc2_js_1.Ge)(this.model.notice), this.model.notice = ""; t.invalidate(); }, () => r.load()), this.meridian = new St(this.model, () => t.invalidate()), this.taskLocation = new official_chunk_89xwxnzm_js_1.Ma(() => t.invalidate()), this.shop = new Kt(() => t.invalidate(), () => r.load()), this.shelf = new jt(t, this.shop), this.industries = new Ht(() => t.invalidate(), () => r.load()), this.retreat = new official_chunk_89xwxnzm_js_1.ya(t, r, e), this.forging = new official_chunk_89xwxnzm_js_1.Wa(t, r), this.alchemy = new official_chunk_zvyd0gzr_js_1.pb(t, r, e);
    }
    enter(t) { var _a, _b; this.leave(); let r = new URLSearchParams((_a = t.split("?")[1]) !== null && _a !== void 0 ? _a : ""); this.requested = (_b = r.get("npc")) !== null && _b !== void 0 ? _b : void 0, this.requestedWorkspace = (this.mode === "refinery" || this.mode === "alchemy") && r.get("workspace") === "craft" || this.mode === "skills" && r.get("workspace") === "loadout" || this.mode === "cultivation" && r.get("workspace") === "retreat", this.sync(); }
    leave() { if (this.alchemyOpen)
        this.alchemy.leave(); if (this.alchemyOpen = !1, this.forgingOpen)
        this.forging.leave(); if (this.forgingOpen = !1, this.retreatOpen)
        this.retreat.leave(); this.retreatOpen = !1, this.showFacilityStatus = !1, this.industries.close(), this.shelf.reset(), this.shop.leave(), this.taskLocation.close(), this.requestedWorkspace = !1, this.owner = "", this.role = void 0, this.requested = void 0, this.workspace = !1, this.meridian.reset(), this.model.leave(), this.context.leave(); }
    sync() { var _a, _b; let t = (_b = (_a = this.player.view()) === null || _a === void 0 ? void 0 : _a.cultivator.id) !== null && _b !== void 0 ? _b : ""; if (t && t !== this.owner) {
        if (this.owner = t, this.alchemyOpen)
            this.alchemy.leave();
        if (this.alchemyOpen = !1, this.forgingOpen)
            this.forging.leave();
        if (this.forgingOpen = !1, this.retreatOpen)
            this.retreat.leave();
        this.retreatOpen = !1, this.showFacilityStatus = !1, this.industries.close(), this.shelf.reset(), this.shop.leave(), this.taskLocation.close(), this.workspace = !1, this.meridian.reset(), this.model.leave(), this.role = void 0, this.context.enter(t);
    } }
    select(t) { var _a, _b, _c; this.showFacilityStatus = !1, this.industries.close(), this.shelf.reset(), this.shop.leave(), this.taskLocation.close(), this.model.leave(), this.meridian.reset(), this.workspace = !1, this.role = (_b = (_a = this.context.presentation.rooms[this.sceneKey]) === null || _a === void 0 ? void 0 : _a.actors.find((e) => e.id === t)) === null || _b === void 0 ? void 0 : _b.roleKey; let r = (_c = this.context.presentation.rooms[this.sceneKey]) === null || _c === void 0 ? void 0 : _c.actors.find((e) => e.roleKey === this.role); if (r && (r.conversation.renderer === "sect.industries.construction" || r.conversation.renderer === "sect.industries.donation"))
        this.industries.open(this.owner, this.context.context.sectId, r.conversation.renderer === "sect.industries.donation"); if ((r === null || r === void 0 ? void 0 : r.conversation.renderer) === "sect.treasury.shop")
        this.shop.enter(this.owner); if (r && (r.conversation.renderer === "sect.gate.sweep" || r.conversation.renderer === "sect.arena.tournament" || r.conversation.renderer === "sect.spirit-vein.patrol" || r.conversation.renderer === "sect.spirit-vein.mining"))
        this.taskLocation.open(this.owner); this.u.invalidate(); }
    room(t) { let r = this.u; if (this.alchemyOpen)
        return this.alchemy.flow(t); if (this.mode === "cave")
        return Wr(r, t); if (this.mode === "skills" && this.workspace)
        return ct(r, t, this.model, () => this.navigate("/game/sect/arena")); let e = this.context.presentation.rooms[this.sceneKey], i = e === null || e === void 0 ? void 0 : e.actors.find((s) => s.roleKey === this.role); if (!e)
        return (0, official_chunk_nx6d9wvp_js_1.sb)(r, t, { sigil: "候", name: "当值弟子", identity: "当值弟子", responsibility: "负责接待来客。" }, [{ speaker: "当值弟子", body: "此处的经办人尚未到值，请稍后再来。", tone: "attention" }], [], () => { }); if (!i)
        return (0, official_chunk_nx6d9wvp_js_1.rb)(r, t, { eyebrow: this.mode === "alchemy" ? "丹炉火候 · 药柜封签" : this.mode === "refinery" ? "地火炉道 · 锻台封签" : this.mode === "garden" ? "药畦晨露 · 草木值录" : this.mode === "gate" ? "山门值录 · 当日勤务" : this.mode === "vein" ? "矿场井口 · 脉息封签" : this.mode === "cultivation" ? "聚灵阵枢 · 闭关名册" : this.mode === "industries" ? "宗门设施 · 常态建设" : this.mode === "treasury" ? "贡献支取 · 库藏封签" : this.mode === "skills" ? "演武阵台 · 神通校验" : void 0, description: e.description, actors: e.actors, select: (s) => this.select(s), prompt: e.actors.some((s) => s.appearance === "facility") ? "点击人物或设施，查看详情" : "点击人物，与其交谈" }); let n = this.mode === "alchemy" || this.mode === "refinery" ? this.refineryConversation(t - 2, i) : this.mode === "garden" ? Or(r, t - 2, i, this.context, () => this.select()) : this.mode === "gate" ? this.gateConversation(t - 2, i) : this.mode === "vein" ? this.veinConversation(t - 2, i) : this.mode === "cultivation" ? this.cultivationConversation(t - 2, i) : this.mode === "industries" ? this.industries.flow(r, t - 2, i, this.context.presentation.facilityLabels, () => this.select()) : this.mode === "treasury" ? this.shop.catalogOpen ? this.shelf.flow(t - 2) : (0, official_chunk_nx6d9wvp_js_1.sb)(r, t - 2, i, [{ speaker: i.name, body: i.greeting }], [{ id: "catalog", label: "有劳执事取来本周库单", tone: "primary" }, { id: "leave", label: "弟子告退", tone: "muted" }], (s) => { if (s === "leave")
        this.select();
    else
        this.shop.openCatalog(); }, !1, this.shop.error) : this.mode === "skills" ? this.arenaConversation(t - 2, i) : this.workspace ? this.mode === "paths" ? Vr(r, t - 2, this.meridian, () => { this.model.leave(), this.meridian.reset(), this.workspace = !1, r.invalidate(); }) : ct(r, t - 2, this.model, () => { this.model.leave(), this.meridian.reset(), this.workspace = !1, r.invalidate(); }) : (0, official_chunk_nx6d9wvp_js_1.sb)(r, t - 2, i, [{ speaker: i.name, body: i.greeting }], [{ id: "workspace", label: this.mode === "paths" ? "入定参悟" : "展开经卷研习" }, { id: "leave", label: "弟子告退", tone: "muted" }], (s) => { if (s === "leave")
        this.select();
    else
        this.workspace = !0, this.model.enter(this.mode === "treasury" || this.mode === "industries" || this.mode === "cultivation" || this.mode === "cave" || this.mode === "vein" || this.mode === "gate" || this.mode === "garden" || this.mode === "refinery" || this.mode === "alchemy" ? "methods" : this.mode); r.invalidate(); }), a = new official_chunk_wje6zqc2_js_1.Ce(r, t); return a.block(n.height + 2, (s, h) => { r.rect(s, h, t, n.height + 2, "rgba(248,243,230,.42)"), r.ctx.save(), r.ctx.strokeStyle = "rgba(44,24,16,.2)", r.ctx.setLineDash([]), r.ctx.strokeRect(s + 0.5, h + 0.5, t - 1, n.height + 1), r.ctx.restore(), n.paint(s + 1, h + 1); }), a; }
    refineryConversation(t, r) { var _a, _b, _c, _d, _e, _f; let e = (_a = r.conversation.parameters) !== null && _a !== void 0 ? _a : {}, i = (f) => typeof e[f] === "string" && e[f].trim() ? e[f] : void 0, n = i("facilityKey"), a = (_b = i("effectKey")) !== null && _b !== void 0 ? _b : n, s = i("workspaceHref"), h = (_c = this.context.infrastructure) === null || _c === void 0 ? void 0 : _c.facilities.find((f) => f.key === n), o = this.context.context, b = this.context.infrastructure, p = [{ speaker: r.name, body: r.greeting }]; if (this.showFacilityStatus && h && n && o && b) {
        let f = (0, official_chunk_89xwxnzm_js_1.ma)(official_chunk_89xwxnzm_js_1.ua.registry.require(o.sectId).organization, o.discipleRank, new Map(b.facilities.map((m) => [m.key, m.level])));
        p.push({ speaker: r.name, body: (0, official_chunk_89xwxnzm_js_1.na)({ facilityLabel: (_d = this.context.presentation.facilityLabels[n]) !== null && _d !== void 0 ? _d : "此处设施", facility: h, effect: a ? f.facilityEffects[a] : void 0 }).map((m) => m.text).join("") });
    } if (!n || !s)
        p.push({ body: "此处炉室的封签尚未核准，暂时无法开炉。", tone: "attention" }); return (0, official_chunk_nx6d9wvp_js_1.sb)(this.u, t, r, p, [{ id: "status", label: (_e = i("statusReply")) !== null && _e !== void 0 ? _e : "请说说此地设施灵效" }, { id: "workspace", label: (_f = i("workspaceReply")) !== null && _f !== void 0 ? _f : "请为我开启工坊", disabled: !s }, { id: "leave", label: "弟子告退", tone: "muted" }], (f) => { if (f === "leave")
        this.select();
    else if (f === "status")
        this.showFacilityStatus = !0, this.u.invalidate();
    else if (s)
        this.navigate(`${s}${s.includes("?") ? "&" : "?"}npc=${encodeURIComponent(r.roleKey)}`); }, this.context.loading, this.context.error); }
    gateConversation(t, r) { if (r.conversation.renderer === "sect.gate.sweep") {
        let i = (0, official_chunk_89xwxnzm_js_1.Aa)(this.taskLocation.data);
        return (0, official_chunk_nx6d9wvp_js_1.sb)(this.u, t, r, [{ body: r.greeting }, { body: (0, official_chunk_89xwxnzm_js_1.Ba)(i) }], [{ id: "sweep", label: i.kind === "reward" ? "开始今日清扫" : "进入山门步道练习清扫", disabled: this.taskLocation.loading, tone: i.kind === "reward" ? "primary" : "normal" }, { id: "leave", label: "返回房间", tone: "muted" }], (n) => { if (n === "leave")
            this.select();
        else
            this.navigate("/game/sect/gate/sweep"); }, !1, this.taskLocation.error);
    } let e = [{ speaker: r.name, body: r.greeting }]; if (this.showFacilityStatus)
        e.push({ speaker: r.name, body: "今日山门内外无事，各处设施仍按常例修缮建设。" }); return (0, official_chunk_nx6d9wvp_js_1.sb)(this.u, t, r, e, [{ id: "news", label: "请执事说说今日山门动静" }, { id: "leave", label: "弟子告退", tone: "muted" }], (i) => { if (i === "leave")
        this.select();
    else
        this.showFacilityStatus = !0, this.u.invalidate(); }, this.context.loading, this.context.error); }
    veinConversation(t, r) { var _a, _b; if (r.conversation.renderer === "sect.spirit-vein.patrol")
        return this.taskLocation.flow(this.u, t, r, () => this.select(), this.navigate); let e = this.context.context, i = this.context.infrastructure, n = typeof ((_a = r.conversation.parameters) === null || _a === void 0 ? void 0 : _a.facilityKey) === "string" ? r.conversation.parameters.facilityKey : "spirit_vein", a = i === null || i === void 0 ? void 0 : i.facilities.find((o) => o.key === n), s = [{ body: r.greeting }], h = (0, official_chunk_89xwxnzm_js_1.Ra)(this.taskLocation.data); if (e && i && a) {
        let o = official_chunk_89xwxnzm_js_1.ua.registry.require(e.sectId), b = (0, official_chunk_89xwxnzm_js_1.ma)(o.organization, e.discipleRank, new Map(i.facilities.map((p) => [p.key, p.level])));
        s.push({ body: (0, official_chunk_89xwxnzm_js_1.na)({ facilityLabel: (_b = this.context.presentation.facilityLabels[n]) !== null && _b !== void 0 ? _b : r.name, facility: a, effect: b.facilityEffects.spirit_vein }).map((p) => p.text).join("") });
    } return s.push({ body: (0, official_chunk_89xwxnzm_js_1.Sa)(h) }), (0, official_chunk_nx6d9wvp_js_1.sb)(this.u, t, r, s, [{ id: "mining", label: h.kind === "reward" ? "开始今日灵矿采掘" : "进入矿脉自由练习", disabled: this.context.loading || this.taskLocation.loading, tone: h.kind === "reward" ? "primary" : "normal" }, { id: "leave", label: "返回房间", tone: "muted" }], (o) => { if (o === "leave")
        this.select();
    else
        this.navigate("/game/sect/spirit-vein/mining"); }, !1, this.context.error || this.taskLocation.error); }
    cultivationConversation(t, r) { let e = this.context.context, i = this.context.infrastructure, n = i === null || i === void 0 ? void 0 : i.facilities.find((s) => s.key === "cultivation_room"), a = [{ speaker: r.name, body: r.greeting }]; if (this.showFacilityStatus && e && i && n) {
        let s = official_chunk_89xwxnzm_js_1.ua.registry.require(e.sectId), h = (0, official_chunk_89xwxnzm_js_1.ma)(s.organization, e.discipleRank, new Map(i.facilities.map((o) => [o.key, o.level])));
        a.push({ speaker: r.name, body: (0, official_chunk_89xwxnzm_js_1.na)({ facilityLabel: this.context.presentation.facilityLabels.cultivation_room, facility: n, effect: h.facilityEffects.cultivation_room }).map((o) => o.text).join("") });
    } return (0, official_chunk_nx6d9wvp_js_1.sb)(this.u, t, r, a, [{ id: "status", label: "请执事说说此地阵效" }, { id: "workspace", label: "有劳执事为我启阵闭关" }, { id: "leave", label: "弟子告退", tone: "muted" }], (s) => { if (s === "leave")
        this.select();
    else if (s === "status")
        this.showFacilityStatus = !0, this.u.invalidate();
    else
        this.navigate(`/game/sect/cultivation-room?workspace=retreat&npc=${encodeURIComponent(r.roleKey)}`); }, !1, this.context.error); }
    arenaConversation(t, r) { let e = () => this.select(), i = this.u; if (r.conversation.renderer === "sect.arena.tournament")
        return this.taskLocation.flow(i, t, r, e, this.navigate); if (r.conversation.renderer === "sect.arena.marshal")
        return (0, official_chunk_nx6d9wvp_js_1.sb)(i, t, r, [{ speaker: r.name, body: r.greeting }, { speaker: r.name, body: "若已接下宗门小比，去场中的宗门擂台核对对手名录即可。" }], [{ id: "leave", label: "弟子告退", tone: "muted" }], e); return (0, official_chunk_nx6d9wvp_js_1.sb)(i, t, r, [{ speaker: r.name, body: "心法与经脉决定神通，已解锁的神通会自动用于战斗。可在此查阅当前效果。" }], [{ id: "workspace", label: "查阅宗门神通" }, { id: "leave", label: "弟子告退", tone: "muted" }], (n) => { if (n === "leave")
        e();
    else
        this.navigate(`/game/sect/arena?workspace=loadout&npc=${encodeURIComponent(r.roleKey)}`); }); }
    paint(t, r) { var _a, _b, _c, _d, _e; this.sync(); let e = this.u, i = this.context, n = e.width - 56, a = i.presentation.scenes[this.sceneKey], s = new official_chunk_wje6zqc2_js_1.Ce(e, n), h = a.title, o = a.description; if (this.requested && i.context) {
        let v = (_a = i.presentation.rooms[this.sceneKey]) === null || _a === void 0 ? void 0 : _a.actors.find((M) => M.roleKey === this.requested);
        if (this.requested = void 0, v && ((_b = i.context.permissions[this.permission]) === null || _b === void 0 ? void 0 : _b.granted))
            this.select(v.id);
    } if (this.requestedWorkspace && i.context && (!["cultivation", "refinery", "alchemy"].includes(this.mode) || i.infrastructure)) {
        if (this.requestedWorkspace = !1, (_c = i.context.permissions[this.permission]) === null || _c === void 0 ? void 0 : _c.granted)
            if (this.mode === "alchemy") {
                let v = (0, official_chunk_89xwxnzm_js_1.ma)(official_chunk_89xwxnzm_js_1.ua.registry.require(i.context.sectId).organization, i.context.discipleRank, new Map(i.infrastructure.facilities.map((M) => [M.key, M.level]))).facilityEffects.alchemy;
                this.alchemyOpen = !0, this.alchemy.enter("/game/sect/alchemy?workspace=craft", { facilityLevel: (0, official_chunk_89xwxnzm_js_1.Oa)(v, "level", 1), discountPercent: (0, official_chunk_89xwxnzm_js_1.Oa)(v, "discount") * 100, facilityLabel: (_d = i.presentation.facilityLabels.alchemy) !== null && _d !== void 0 ? _d : i.presentation.facilityLabels.workshop, scene: i.presentation.scenes.alchemy });
            }
            else if (this.mode === "refinery")
                this.forgingOpen = !0, this.forging.enter(i.presentation.scenes.refinery);
            else if (this.mode === "cultivation")
                this.retreatOpen = !0, this.retreat.enter({ scene: i.presentation.scenes.cultivation, onExit: () => this.navigate("/game/sect/cultivation-room?npc=keeper") });
            else
                this.workspace = !0, this.model.enter("skills");
    } if (this.forgingOpen) {
        this.forging.paint(t, r);
        return;
    } if (this.retreatOpen) {
        this.retreat.paint(t, r);
        return;
    } if (i.error)
        h = "宗门卷宗暂不可用", o = "传讯玉符未能接通宗门执事，可重新尝试读取。", s.text(i.error, 14, 28, official_chunk_wje6zqc2_js_1.Be.crimson), s.block(32.32, (v, M) => e.button("重新读取", v, M, () => { i.reload(); }));
    else if (!i.context || ["cultivation", "refinery", "alchemy"].includes(this.mode) && !i.infrastructure)
        s.block(32.32, (v, M) => e.button("返回宗门总视图", v, M, () => this.navigate("/game/sect"), official_chunk_wje6zqc2_js_1.Be["ink-secondary"])), s.gap(12), s.text(a.loadingText, 14, 28, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
    else {
        let v = i.context.permissions[this.permission];
        if (!(v === null || v === void 0 ? void 0 : v.granted))
            o = a.permissionDeniedDescription;
        let M = n - 34, l = (v === null || v === void 0 ? void 0 : v.granted) ? this.room(M) : new official_chunk_wje6zqc2_js_1.Ce(e, M);
        if (!(v === null || v === void 0 ? void 0 : v.granted)) {
            let S = new official_chunk_wje6zqc2_js_1.Ce(e, M - 34);
            S.text((_e = v === null || v === void 0 ? void 0 : v.reason) !== null && _e !== void 0 ? _e : "当前弟子身份尚未获得此设施权限。", 14, 28, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), l.block(S.height + 24, (P, K) => { e.rect(P, K, M, S.height + 24, "rgba(248,243,230,.7)"), e.rect(P, K, 2, S.height + 24, official_chunk_wje6zqc2_js_1.Be.crimson), S.paint(P + 18, K + 12); });
        }
        let $ = 107.32 + l.height;
        s.block($, (S, P) => { let K = e.ctx; K.save(), e.clip(S, P, n, $, () => { let j = (this.mode === "cultivation" ? 180 : this.mode === "industries" ? 120 : this.mode === "treasury" ? 135 : this.mode === "skills" ? 180 : this.mode === "paths" ? 155 : 135) * Math.PI / 180, z = Math.sin(j), H = -Math.cos(j), G = (n * Math.abs(z) + $ * Math.abs(H)) / 2, Z = K.createLinearGradient(S + n / 2 - z * G, P + $ / 2 - H * G, S + n / 2 + z * G, P + $ / 2 + H * G); Z.addColorStop(0, this.mode === "cultivation" ? "rgba(225,237,224,.9)" : this.mode === "industries" ? "rgba(73,84,83,.1)" : this.mode === "treasury" ? "rgba(147,104,30,.16)" : this.mode === "skills" ? "rgba(231,221,204,.9)" : this.mode === "paths" ? "rgba(218,233,226,.85)" : "rgba(248,240,215,.95)"), Z.addColorStop(this.mode === "industries" ? 0.45 : this.mode === "treasury" ? 0.42 : 1, this.mode === "cultivation" ? "rgba(226,216,192,.55)" : this.mode === "industries" ? "rgba(73,84,83,0)" : this.mode === "treasury" ? "rgba(147,104,30,0)" : this.mode === "skills" ? "rgba(210,197,177,.62)" : this.mode === "paths" ? "rgba(237,230,207,.65)" : "rgba(229,211,169,.55)"), K.fillStyle = Z, K.fillRect(S, P, n, $); let O = this.mode === "paths" ? Math.hypot(n * 0.72, $ * 0.92) * 0.28 : Math.hypot(n * 0.82, $ * 0.82) * 0.32, I = K.createRadialGradient(S + n * (this.mode === "paths" ? 0.72 : 0.18), P + $ * (this.mode === "paths" ? 0.08 : 0.18), 0, S + n * (this.mode === "paths" ? 0.72 : 0.18), P + $ * (this.mode === "paths" ? 0.08 : 0.18), O); if (I.addColorStop(0, this.mode === "paths" ? "rgba(255,255,255,.9)" : "rgba(173,126,50,.18)"), I.addColorStop(1, this.mode === "paths" ? "rgba(255,255,255,0)" : "rgba(173,126,50,0)"), this.mode === "industries") {
            K.save(), K.strokeStyle = "rgba(60,70,66,.045)", K.lineWidth = 1;
            for (let q = -$; q < n; q += 18 * Math.SQRT2)
                K.beginPath(), K.moveTo(S + q, P), K.lineTo(S + q + $, P + $), K.stroke();
            K.restore();
        }
        else if (this.mode === "treasury")
            for (let q = $ - 2; q >= 0; q -= 62)
                e.rect(S, P + q, n, 2, "rgba(93,63,25,.06)");
        else if (this.mode === "cultivation") {
            let q = K.createRadialGradient(S + n * 0.5, P + $ * 0.44, 0, S + n * 0.5, P + $ * 0.44, Math.hypot(n * 0.5, $ * 0.56));
            for (let [F, E] of [[0, "rgba(121,190,177,.2)"], [0.09, "rgba(121,190,177,.2)"], [0.1, "transparent"], [0.2, "transparent"], [0.21, "rgba(66,117,111,.09)"], [0.22, "rgba(66,117,111,.09)"], [0.23, "transparent"], [1, "transparent"]])
                q.addColorStop(F, E);
            K.fillStyle = q;
        }
        else if (this.mode === "skills") {
            let q = K.createRadialGradient(S + n * 0.5, P + $ * 0.45, 0, S + n * 0.5, P + $ * 0.45, Math.hypot(n * 0.5, $ * 0.55));
            for (let [F, E] of [[0, "transparent"], [0.19, "transparent"], [0.2, "rgba(113,31,31,.08)"], [0.21, "rgba(113,31,31,.08)"], [0.22, "transparent"], [0.34, "transparent"], [0.35, "rgba(113,31,31,.07)"], [0.36, "rgba(113,31,31,.07)"], [0.37, "transparent"], [1, "transparent"]])
                q.addColorStop(F, E);
            K.fillStyle = q;
        }
        else
            K.fillStyle = I; if (this.mode !== "treasury" && this.mode !== "industries")
            K.fillRect(S, P, n, $); if (this.mode === "cave" || this.mode === "vein")
            this.paintFacilitySurface(S, P, n, $); if (this.mode === "alchemy")
            this.paintAlchemySurface(S, P, n, $); if (this.mode === "refinery")
            this.paintRefinerySurface(S, P, n, $); if (this.mode === "garden")
            this.paintGardenSurface(S, P, n, $); if (this.mode === "gate")
            this.paintGateSurface(S, P, n, $); if (!(v === null || v === void 0 ? void 0 : v.granted))
            this.paintDeniedSurface(S, P, n, $); K.globalAlpha = 0.05, e.text(!(v === null || v === void 0 ? void 0 : v.granted) ? "殿" : this.mode === "alchemy" ? "丹" : this.mode === "refinery" ? "器" : this.mode === "garden" ? "药" : this.mode === "gate" ? "山" : this.mode === "cave" ? "隐" : this.mode === "vein" ? "脉" : this.mode === "cultivation" ? "静" : this.mode === "industries" ? "造" : this.mode === "treasury" ? "藏" : this.mode === "skills" ? "武" : this.mode === "paths" ? "悟" : "经", S + n - 160, P + 40, 144, official_chunk_wje6zqc2_js_1.Be.ink), K.globalAlpha = 1; }), K.strokeStyle = !(v === null || v === void 0 ? void 0 : v.granted) ? "rgba(120,53,15,.2)" : this.mode === "alchemy" ? "rgba(67,20,7,.2)" : this.mode === "refinery" ? "rgba(2,6,23,.25)" : this.mode === "garden" ? "rgba(2,44,34,.2)" : this.mode === "gate" ? "rgba(8,47,73,.15)" : this.mode === "cave" ? "rgba(41,37,36,.2)" : this.mode === "vein" ? "rgba(8,51,68,.2)" : this.mode === "cultivation" ? "rgba(19,78,74,.2)" : this.mode === "industries" ? "rgba(30,41,59,.2)" : this.mode === "treasury" ? "rgba(113,63,18,.2)" : this.mode === "skills" ? "rgba(127,29,29,.2)" : this.mode === "paths" ? "rgba(12,74,110,.15)" : "rgba(146,64,14,.2)", K.strokeRect(S + 0.5, P + 0.5, n - 1, $ - 1), K.restore(), e.button("返回宗门总视图", S + 17, P + 21, () => this.navigate("/game/sect"), official_chunk_wje6zqc2_js_1.Be["ink-secondary"]); let D = official_chunk_89xwxnzm_js_1.ua.registry.require(i.context.sectId).definition.name; K.save(), K.globalAlpha = 0.5, e.tracked(D, S + n - 17 - e.trackedWidth(D, 12, 4.2), P + 37.16, 12, 4.2, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), K.restore(), e.rect(S + 17, P + 65.32, M, 1, "rgba(44,24,16,.1)"), l.paint(S + 17, P + 86.32); });
    } let b = e.lines(o, n, 14), p = 84.2 + Math.max(0, b.length - 1) * 24, f = p + 20 + s.height + 16, m = t + 12 - e.scroll; e.clip(0, t, e.width, r - t, () => { e.rect(12, m, e.width - 24, f, "rgba(248,243,230,.82)"), e.text(h, 28, m + 28, 23.2, official_chunk_wje6zqc2_js_1.Be.ink, e.headingFont); let v = 36 + e.measure(h, 23.2, e.headingFont); e.text("/", v, m + 31, 14, official_chunk_wje6zqc2_js_1.Be["battle-muted"]), e.tracked("修行", v + 14, m + 31, 12.48, 1.9968, official_chunk_wje6zqc2_js_1.Be["battle-muted"]), b.forEach((M, l) => e.text(M, 28, m + 60 + l * 24, 14, official_chunk_wje6zqc2_js_1.Be["ink-secondary"])), e.line(28, m + p - 1, n), s.paint(28, m + p + 20); }), e.scrollMax = Math.max(0, t + 24 + f - r); }
    paintAlchemySurface(t, r, e, i) { let n = this.u, a = n.ctx; n.rect(t, r, e, i, "#f8f3e6"); let s = 145 * Math.PI / 180, h = Math.sin(s), o = -Math.cos(s), b = (e * Math.abs(h) + i * Math.abs(o)) / 2, p = a.createLinearGradient(t + e / 2 - h * b, r + i / 2 - o * b, t + e / 2 + h * b, r + i / 2 + o * b); p.addColorStop(0, "rgba(244,226,190,.92)"), p.addColorStop(1, "rgba(202,171,124,.48)"), a.fillStyle = p, a.fillRect(t, r, e, i); let f = Math.hypot(e * 0.5, i * 0.85) * 0.28, m = a.createRadialGradient(t + e * 0.5, r + i * 0.85, 0, t + e * 0.5, r + i * 0.85, f); m.addColorStop(0, "rgba(197,71,20,.22)"), m.addColorStop(1, "transparent"), a.fillStyle = m, a.fillRect(t, r, e, i); }
    paintRefinerySurface(t, r, e, i) { let n = this.u, a = n.ctx; n.rect(t, r, e, i, "#f8f3e6"); let s = Math.hypot(e * 0.78, i * 0.74) * 0.24, h = a.createRadialGradient(t + e * 0.78, r + i * 0.74, 0, t + e * 0.78, r + i * 0.74, s); h.addColorStop(0, "rgba(182,73,30,.16)"), h.addColorStop(1, "transparent"), a.fillStyle = h, a.fillRect(t, r, e, i); let o = (e + i) / 2, b = a.createLinearGradient(t + e / 2 - o / 2, r + i / 2 - o / 2, t + e / 2 + o / 2, r + i / 2 + o / 2); b.addColorStop(0, "rgba(56,63,66,.18)"), b.addColorStop(0.45, "transparent"), b.addColorStop(1, "transparent"), a.fillStyle = b, a.fillRect(t, r, e, i); }
    paintGardenSurface(t, r, e, i) { let n = this.u, a = n.ctx; n.rect(t, r, e, i, "#f8f3e6"); let s = 135 * Math.PI / 180, h = Math.sin(s), o = -Math.cos(s), b = (e * Math.abs(h) + i * Math.abs(o)) / 2, p = a.createLinearGradient(t + e / 2 - h * b, r + i / 2 - o * b, t + e / 2 + h * b, r + i / 2 + o * b); p.addColorStop(0, "rgba(218,232,201,.9)"), p.addColorStop(1, "rgba(235,220,179,.55)"), a.fillStyle = p, a.fillRect(t, r, e, i), n.clip(t, r, e, i, () => { a.save(), a.translate(t + e / 2, r + i / 2), a.rotate(-15 * Math.PI / 180), a.fillStyle = "rgba(53,111,70,.08)"; let f = Math.hypot(e, i); for (let m = -f; m < f; m += 34)
        a.fillRect(-f, m, f * 2, 2); a.restore(); }); }
    paintGateSurface(t, r, e, i) { let n = this.u, a = n.ctx; n.rect(t, r, e, i, "#f8f3e6"); for (let h = 80; h < e; h += 81)
        n.rect(t + h, r, 1, i, "rgba(48,72,70,.05)"); let s = a.createLinearGradient(0, r, 0, r + i); s.addColorStop(0, "rgba(214,229,226,.88)"), s.addColorStop(1, "rgba(239,227,198,.6)"), a.fillStyle = s, a.fillRect(t, r, e, i); }
    paintDeniedSurface(t, r, e, i) { let n = this.u.ctx; this.u.rect(t, r, e, i, "#f8f3e6"); let a = n.createLinearGradient(0, r, 0, r + i); a.addColorStop(0, "rgba(250,244,224,.92)"), a.addColorStop(1, "rgba(242,229,199,.5)"), n.fillStyle = a, n.fillRect(t, r, e, i); let s = n.createRadialGradient(t + e / 2, r, 0, t + e / 2, r, Math.hypot(e / 2, i) * 0.44); s.addColorStop(0, "rgba(146,83,37,.18)"), s.addColorStop(1, "transparent"), n.fillStyle = s, n.fillRect(t, r, e, i); }
    paintFacilitySurface(t, r, e, i) { let n = this.u, a = n.ctx; n.rect(t, r, e, i, "rgba(248,243,230,1)"); let s = (this.mode === "cave" ? 140 : 180) * Math.PI / 180, h = Math.sin(s), o = -Math.cos(s), b = (e * Math.abs(h) + i * Math.abs(o)) / 2, p = a.createLinearGradient(t + e / 2 - h * b, r + i / 2 - o * b, t + e / 2 + h * b, r + i / 2 + o * b); if (p.addColorStop(0, this.mode === "cave" ? "rgba(212,214,202,.9)" : "rgba(213,226,218,.86)"), p.addColorStop(1, this.mode === "cave" ? "rgba(181,176,161,.55)" : "rgba(191,199,185,.58)"), a.fillStyle = p, a.fillRect(t, r, e, i), this.mode === "cave") {
        a.save(), a.translate(t + e * 0.3, r + i * 0.25), a.scale(e * 0.7, i * 0.75);
        let f = a.createRadialGradient(0, 0, 0, 0, 0, Math.SQRT2 * 0.28);
        f.addColorStop(0, "rgba(255,255,255,.65)"), f.addColorStop(1, "transparent"), a.fillStyle = f, a.fillRect(-1, -1, 3, 3), a.restore();
    }
    else {
        let f = 125 * Math.PI / 180, m = Math.sin(f), v = -Math.cos(f), M = (e * Math.abs(m) + i * Math.abs(v)) / 2, l = a.createLinearGradient(t + e / 2 - m * M, r + i / 2 - v * M, t + e / 2 + m * M, r + i / 2 + v * M);
        for (let [$, S] of [[0, "transparent"], [0.28, "transparent"], [0.29, "rgba(79,176,184,.16)"], [0.31, "rgba(79,176,184,.16)"], [0.32, "transparent"], [0.54, "transparent"], [0.55, "rgba(61,144,153,.12)"], [0.57, "rgba(61,144,153,.12)"], [0.58, "transparent"], [1, "transparent"]])
            l.addColorStop($, S);
        a.fillStyle = l, a.fillRect(t, r, e, i);
    } }
    guardLeave(t) { var _a; if (this.alchemyOpen && this.alchemy.pending)
        return !1; if (this.forgingOpen && this.forging.pending)
        return !1; if (this.mode !== "paths" || !this.workspace)
        return !0; if (this.model.pending)
        return !1; if ((_a = this.meridian.state) === null || _a === void 0 ? void 0 : _a.dirty)
        return this.u.modalScroll = 0, this.meridian.requestLeave(t), !1; return !0; }
    paintOverlay() { if (this.alchemyOpen)
        this.alchemy.paintOverlay(); if (this.forgingOpen)
        this.forging.paintOverlay(); if (this.retreatOpen)
        this.retreat.paintOverlay(), this.retreat.celebration.paint(); if (this.mode === "treasury")
        this.shelf.paintOverlay(); if (this.mode === "paths" && this.workspace)
        Ir(this.u, this.meridian); }
}
exports.SectArchivePage = kr;
const zod_2 = require("./zod.js");
var Un = zod_2.z.object({ input: zod_2.z.record(zod_2.z.string(), zod_2.z.json()).default({}) }).strict(), zn = zod_2.z.object({ items: zod_2.z.array(zod_2.z.object({ itemId: zod_2.z.string().uuid(), revision: zod_2.z.number().int().nonnegative(), quantity: zod_2.z.number().int().positive().max(official_chunk_h2eh160v_js_1.xe) }).strict()).min(1).max(99).refine((t) => new Set(t.map((r) => r.itemId)).size === t.length, "同一份道具不能重复选择") }).strict(), Gn = zod_2.z.object({ facilityKey: zod_2.z.string().min(1).max(32), spiritStones: zod_2.z.union([zod_2.z.literal(1e4), zod_2.z.literal(50000), zod_2.z.literal(1e5), zod_2.z.literal(200000), zod_2.z.literal(400000)]) }).strict(), qn = zod_2.z.string().uuid(), Qn = zod_2.z.object({ page: zod_2.z.coerce.number().int().positive().default(1), pageSize: zod_2.z.coerce.number().int().min(1).max(50).default(20) }), Zn = zod_2.z.object({ targetSectId: zod_2.z.string().min(1).max(64), reversePaths: zod_2.z.enum(["true", "false"]).default("false").transform((t) => t === "true") }), Vn = zod_2.z.object({ targetSectId: zod_2.z.string().min(1).max(64), reversePaths: zod_2.z.boolean().default(!1), consumableId: zod_2.z.string().uuid().optional() }).strict(), In = zod_2.z.enum(["online", "active_today", "active_7d", "inactive"]), Ar = zod_2.z.object({ rank: zod_2.z.number().int().positive(), cultivatorId: zod_2.z.string().uuid(), name: zod_2.z.string(), discipleRank: zod_2.z.enum(["registered", "outer", "inner", "true"]), office: zod_2.z.enum(["none", "steward", "protector", "elder"]), contribution: zod_2.z.number().int().nonnegative() }).strict(), On = zod_2.z.object({ metric: zod_2.z.literal("lifetime_contribution"), generatedAt: zod_2.z.string(), entries: zod_2.z.array(Ar).max(20), currentMember: Ar }).strict(), Nr = zod_2.z.object({ weekKey: zod_2.z.string(), claimed: zod_2.z.boolean(), spiritStones: zod_2.z.number() }).strict(), dr = zod_2.z.object({ nextRank: zod_2.z.enum(["registered", "outer", "inner", "true"]).nullable(), missing: zod_2.z.array(zod_2.z.string()), allowed: zod_2.z.boolean(), contribution: zod_2.z.number().int().nonnegative(), lifetimeContribution: zod_2.z.number().int().nonnegative() }).strict();
var _r = { claimable: 0, active: 1, offered: 2, claimed: 3, locked: 4 }, ft = (t) => `${t.periodKey}:${t.definitionId}`;
class Jt {
    constructor(t, r, e) {
        this.loading = !1;
        this.busy = !1;
        this.error = "";
        this.promotionResult = "";
        this.notice = "";
        this.owner = "";
        this.generation = 0;
        this.sequence = 0;
        this.reads = new Set;
        this.changed = t;
        this.refreshPlayer = r;
        this.refreshContext = e;
    }
    get tasks() { var _a, _b; return ((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.items) !== null && _b !== void 0 ? _b : []).filter((t) => t.kind === this.kind).map((t, r) => ({ task: t, index: r })).sort((t, r) => _r[t.task.state] - _r[r.task.state] || t.index - r.index).map((t) => t.task); }
    get selected() { var _a; let t = this.tasks.find((r) => ft(r) === this.selectedKey); return t && ((_a = this.outcome) === null || _a === void 0 ? void 0 : _a.task.definitionId) === t.definitionId ? this.outcome.task : t; }
    get guidance() { return this.kind === "promotion" && this.promotion ? (0, official_chunk_89xwxnzm_js_1.la)({ nextRank: this.promotion.nextRank, missingRequirements: this.promotion.missing }) : void 0; }
    get nextRank() { var _a; return this.kind === "promotion" && ((_a = this.promotion) === null || _a === void 0 ? void 0 : _a.nextRank) && this.promotion.missing.length === 0 ? this.promotion.nextRank : void 0; }
    open(t, r) { this.close(), this.owner = t, this.kind = r, this.reload(); }
    close() { var _a; this.generation++, this.sequence++; for (let t of this.reads)
        (_a = t.abort) === null || _a === void 0 ? void 0 : _a.call(t); this.reads.clear(), this.kind = void 0, this.data = void 0, this.promotion = void 0, this.selectedKey = void 0, this.outcome = void 0, this.loading = this.busy = !1, this.error = this.notice = this.promotionResult = ""; }
    back() { if (this.busy)
        return; this.selectedKey = void 0, this.outcome = void 0, this.error = "", this.changed(); }
    async reload() { var _a, _b, _c, _d, _e; if (!this.kind)
        return; let t = this.generation, r = ++this.sequence, e = () => t === this.generation && r === this.sequence; this.loading = !0, this.error = "", this.changed(); let i = async (n) => { let a; try {
        return await (0, official_chunk_h2eh160v_js_1.Gb)(n, "GET", void 0, void 0, {}, { onTask: (s) => { var _a; if (a = s, e())
                this.reads.add(s);
            else
                (_a = s.abort) === null || _a === void 0 ? void 0 : _a.call(s); } });
    }
    finally {
        if (a)
            this.reads.delete(a);
    } }; try {
        let [n, a] = await Promise.all([i("/api/sects/current/tasks"), this.kind === "promotion" ? i("/api/sects/current/promotion-evaluation") : Promise.resolve(void 0)]);
        if (!e())
            return;
        if (((_a = n.resource) === null || _a === void 0 ? void 0 : _a.topic) !== "sect.tasks" || ((_c = (_b = n.resource) === null || _b === void 0 ? void 0 : _b.scope) === null || _c === void 0 ? void 0 : _c.kind) !== "cultivator" || ((_e = (_d = n.resource) === null || _d === void 0 ? void 0 : _d.scope) === null || _e === void 0 ? void 0 : _e.id) !== this.owner)
            throw Error("资源地址不匹配: sect.tasks");
        if (this.data = official_chunk_89xwxnzm_js_1.Ga["sect.tasks"].parse(n.data), a)
            this.promotion = dr.parse(a.data);
    }
    catch (n) {
        if (e())
            this.error = n instanceof Error ? n.message : "宗门事务读取失败";
    }
    finally {
        if (e())
            this.loading = !1, this.changed();
    } }
    async select(t) { if (this.busy || this.loading || !this.kind)
        return; this.outcome = void 0, this.error = ""; let r = t.state === "offered" ? "accept" : t.state === "claimable" ? "claim" : void 0; if (!r) {
        this.selectedKey = ft(t), this.changed();
        return;
    } let e = t.actions.find((n) => n.key === r); if (!(e === null || e === void 0 ? void 0 : e.enabled))
        return; let i = await this.execute(t, e, {}, r === "accept" ? `已接下「${t.presentation.title}」` : `「${t.presentation.title}」已结清`); if (i)
        this.selectedKey = ft(i.primaryTask), this.changed(); }
    async execute(t, r, e, i = "", n = (0, official_chunk_wje6zqc2_js_1.Ee)()) { if (!this.kind || this.busy || !r.enabled)
        return; let a = this.generation; this.busy = !0, this.error = "", this.notice = "", this.outcome = void 0, this.changed(); try {
        let s = await (0, official_chunk_h2eh160v_js_1.Gb)(`/api/sects/current/tasks/${encodeURIComponent(t.definitionId)}/actions/${encodeURIComponent(r.key)}`, "POST", { input: e }, void 0, { "Idempotency-Key": n });
        if (a !== this.generation)
            return;
        let h = s.data;
        if (!(h === null || h === void 0 ? void 0 : h.primaryTask) || !h.outcome)
            throw Error("宗门事务返回内容不完整，请刷新查看");
        if (this.outcome = { task: h.primaryTask, outcome: h.outcome }, this.notice = i, this.data) {
            let o = new Map([...h.changedTasks, h.primaryTask].map((b) => [ft(b), b]));
            this.data = { ...this.data, items: this.data.items.map((b) => { var _a; return (_a = o.get(ft(b))) !== null && _a !== void 0 ? _a : b; }) };
        }
        if (await this.reload(), a !== this.generation)
            return;
        try {
            await this.refreshPlayer();
        }
        catch (o) {
            if (a === this.generation)
                this.error = o instanceof Error ? o.message : "状态刷新失败";
        }
        if (a === this.generation)
            return h;
    }
    catch (s) {
        if (a === this.generation)
            this.error = s instanceof Error ? s.message : "宗门事务失败";
    }
    finally {
        if (a === this.generation)
            this.busy = !1, this.changed();
    } }
    async promote() { var _a; let t = this.nextRank; if (!this.kind || !t || this.busy)
        return; let r = this.generation; this.busy = !0, this.error = "", this.notice = "", this.changed(); try {
        let e = await (0, official_chunk_h2eh160v_js_1.Gb)("/api/sects/current/promotion", "POST", void 0, void 0, { "Idempotency-Key": (0, official_chunk_wje6zqc2_js_1.Ee)() });
        if (r !== this.generation)
            return;
        let i = e.data;
        if (this.promotionResult = `你的身份玉牒已经改录为${official_chunk_89xwxnzm_js_1.Y[(_a = i.discipleRank) !== null && _a !== void 0 ? _a : t]}。`, this.notice = `已晋升${official_chunk_89xwxnzm_js_1.Y[t]}`, await this.reload(), r !== this.generation)
            return;
        if (await this.refreshContext(), r !== this.generation)
            return;
        await this.refreshPlayer();
    }
    catch (e) {
        if (r === this.generation)
            this.error = e instanceof Error ? e.message : "宗门事务失败";
    }
    finally {
        if (r === this.generation)
            this.busy = !1, this.changed();
    } }
}
exports.SectAffairsModel = Jt;
var He = new Set(["accept", "claim", "abandon", "battle", "sweep-entry", "mining-entry", "item-delivery"].map((t) => `sect.action.${t}`));
function xt(t, r = Date.now()) { var _a, _b; let e = (_a = t.parameters) === null || _a === void 0 ? void 0 : _a.availableAt, i = typeof e === "string" ? Date.parse(e) : NaN, n = Number.isFinite(i) ? Math.max(0, i - r) : 0, a = ((_b = t.parameters) === null || _b === void 0 ? void 0 : _b.cooldownBlocked) === !0, s = t.enabled || a && n === 0, h = Math.max(0, Math.ceil(n / 1000)); return { remainingMs: n, enabled: s, label: n > 0 ? `领取满 15 分钟后可放弃（${Math.floor(h / 60)}:${String(h % 60).padStart(2, "0")}）` : "这份委托我不再办了" }; }
class zt {
    constructor(t, r, e, i) { this.u = t; this.model = r; this.navigate = e; this.submission = i; }
    close() { clearTimeout(this.ticker), this.ticker = void 0, this.confirmation = void 0; }
    flow(t, r) { let e = this.u, i = new official_chunk_wje6zqc2_js_1.Ce(e, t); clearTimeout(this.ticker), this.ticker = void 0; let n = 1 / 0; if ((r.state === "active" || r.state === "claimable" ? r.actions : []).forEach((s, h) => { var _a, _b, _c, _d, _e; if (h)
        i.gap(8); if (!He.has(s.renderer)) {
        i.text("这桩事务眼下无法办理，请稍后再试。", 14, 28, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
        return;
    } let { label: o, enabled: b } = s; switch (s.renderer) {
        case "sect.action.accept":
            o = r.presentation.dialogue.offeredReply;
            break;
        case "sect.action.claim":
            o = "请执事结清此事";
            break;
        case "sect.action.abandon": {
            let v = xt(s);
            if (b = v.enabled, o = v.label, v.remainingMs > 0 && ((_a = s.parameters) === null || _a === void 0 ? void 0 : _a.cooldownBlocked) === !0)
                n = Math.min(n, v.remainingMs);
            if (!b && v.remainingMs === 0)
                o = (_b = s.disabledReason) !== null && _b !== void 0 ? _b : "暂不可放弃";
            break;
        }
        case "sect.action.battle":
            o = (_d = (_c = (0, official_chunk_89xwxnzm_js_1.Ia)(s)) === null || _c === void 0 ? void 0 : _c.travelReply) !== null && _d !== void 0 ? _d : "我这就去应战";
            break;
        case "sect.action.sweep-entry":
            o = "我这就去办";
            break;
        case "sect.action.mining-entry":
            o = "我这就去灵脉采掘";
            break;
        case "sect.action.item-delivery":
            o = "东西已经备好，请替我查验";
            break;
    } if (!b && s.renderer !== "sect.action.abandon")
        o = (_e = s.disabledReason) !== null && _e !== void 0 ? _e : "尚未解锁"; let p = e.lines(`[${o}]`, t - 42, 16), f = 24 + p.length * 25.6, m = this.model.busy || !b; i.block(f, (v, M) => { if (e.ctx.save(), m)
        e.ctx.globalAlpha *= 0.5; if (e.rect(v, M, t, f, "rgba(139,0,0,.06)"), e.rect(v, M, 2, f, "rgba(139,0,0,.45)"), p.forEach((l, $) => e.text(l, v + 22, M + 24.8 + $ * 25.6, 16, s.renderer === "sect.action.abandon" ? official_chunk_wje6zqc2_js_1.Be["ink-secondary"] : official_chunk_wje6zqc2_js_1.Be.crimson)), e.ctx.restore(), !m)
        e.hit(v, M, t, f, () => this.run(r, s)); }); }), Number.isFinite(n))
        this.ticker = setTimeout(() => { this.ticker = void 0, e.invalidate(); }, Math.min(1000, n)); return i; }
    run(t, r) { if (this.model.busy)
        return; switch (r.renderer) {
        case "sect.action.accept":
            this.model.execute(t, r, {}, `已接下「${t.presentation.title}」`);
            break;
        case "sect.action.claim":
            this.model.execute(t, r, {}, `「${t.presentation.title}」已结清`);
            break;
        case "sect.action.abandon":
            if (xt(r).enabled)
                this.confirmation = { task: t, action: r }, this.u.modalScroll = 0, this.u.invalidate();
            break;
        case "sect.action.battle": {
            let e = (0, official_chunk_89xwxnzm_js_1.Ia)(r);
            this.navigate(e ? (0, official_chunk_89xwxnzm_js_1.Ja)(e.key, t).route : (0, official_chunk_89xwxnzm_js_1.La)(t.definitionId));
            break;
        }
        case "sect.action.sweep-entry":
            this.navigate((0, official_chunk_89xwxnzm_js_1.Ha)("/game/sect/gate", "facility"));
            break;
        case "sect.action.mining-entry":
            this.navigate((0, official_chunk_89xwxnzm_js_1.Ha)("/game/sect/spirit-vein", "facility"));
            break;
        case "sect.action.item-delivery":
            this.submission(t, r);
            break;
    } }
    paintOverlay() { let t = this.confirmation; if (!t)
        return; let r = this.u, e = new official_chunk_wje6zqc2_js_1.Ce(r, Math.min(448, r.width - 24) - 34); e.text(`放弃「${t.task.presentation.title}」后，当前进度与已锁定目标都会作废；你可以立即重新领取，并生成一份新的任务内容。`, 14, 28, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]); let i = () => { if (this.model.busy)
        return; this.confirmation = void 0, r.invalidate(); }; (0, official_chunk_wje6zqc2_js_1.He)(r, { title: "放弃宗门任务", style: "modal", rows: [], content: e, actions: [{ label: "继续办理", run: i, disabled: this.model.busy }, { label: this.model.busy ? "正在撤下委托……" : "确认放弃", primary: !0, disabled: this.model.busy, run: () => { if (!xt(t.action).enabled)
                    return; this.model.execute(t.task, { ...t.action, enabled: !0 }, {}, `已放弃「${t.task.presentation.title}」`).then(() => { if (this.confirmation === t)
                    this.confirmation = void 0, r.invalidate(); }); } }] }, i); }
}
exports.SectTaskActions = zt;
class Gt {
    constructor(t, r, e) {
        this.source = "bag";
        this.filter = { kind: "all" };
        this.page = 0;
        this.selections = [];
        this.loading = !1;
        this.inventoryLoading = !1;
        this.pending = !1;
        this.error = "";
        this.inventoryError = "";
        this.generation = 0;
        this.inventorySequence = 0;
        this.candidateSequence = 0;
        this.reads = new Set;
        this.interaction = t;
        this.changed = r;
        this.onSuccess = e;
    }
    get inventory() { return this.source === "bag" ? this.bag : this.storage; }
    get requirement() { var _a, _b, _c; return (_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.requirement) !== null && _b !== void 0 ? _b : (_c = this.task) === null || _c === void 0 ? void 0 : _c.requirement; }
    get total() { return this.selections.reduce((t, r) => t + Number(r.quantity), 0); }
    get items() { let t = this.inventory; return t ? this.source === "bag" && (0, official_chunk_nx6d9wvp_js_1.vb)(this.filter) ? t.items.filter((r) => (0, official_chunk_nx6d9wvp_js_1.wb)(r, this.filter)) : t.items : []; }
    get locked() { return this.pending || this.interaction.busy; }
    get valid() { let t = this.requirement; if (!t || this.loading || this.inventoryLoading || this.inventoryError || !this.data)
        return !1; return this.selections.length > 0 && this.total === t.quantity && this.selections.every((r) => { var _a; return (r.item.location === "storage" || !!((_a = this.bag) === null || _a === void 0 ? void 0 : _a.items.some((e) => e.id === r.item.id && e.revision === r.item.revision))) && Number.isInteger(Number(r.quantity)) && Number(r.quantity) > 0 && Number(r.quantity) <= r.item.quantity; }); }
    open(t, r) { var _a, _b, _c; this.close(), this.task = t, this.action = r, this.source = "bag", this.page = 0, this.filter = { kind: ((_a = t.requirement) === null || _a === void 0 ? void 0 : _a.kind) === "pill" ? "consumable" : (_c = (_b = t.requirement) === null || _b === void 0 ? void 0 : _b.kind) !== null && _c !== void 0 ? _c : "all" }, this.refreshCandidates(), this.reloadInventory(); }
    close() { var _a; this.generation++, this.inventorySequence++, this.candidateSequence++; for (let t of this.reads)
        (_a = t.abort) === null || _a === void 0 ? void 0 : _a.call(t); this.reads.clear(), this.task = void 0, this.action = void 0, this.bag = void 0, this.storage = void 0, this.data = void 0, this.selections = [], this.attempt = void 0, this.loading = this.inventoryLoading = this.pending = !1, this.error = this.inventoryError = ""; }
    async read(t, r) { var _a; let e; try {
        let i = await (0, official_chunk_h2eh160v_js_1.Gb)(t, "GET", void 0, void 0, {}, { onTask: (n) => { var _a; if (e = n, r === this.generation)
                this.reads.add(n);
            else
                (_a = n.abort) === null || _a === void 0 ? void 0 : _a.call(n); } });
        if (!i.success)
            throw Error((_a = i.error) !== null && _a !== void 0 ? _a : "读取失败");
        return i.data;
    }
    finally {
        if (e)
            this.reads.delete(e);
    } }
    async refreshCandidates() { let t = this.task; if (!t)
        return; let r = this.generation, e = ++this.candidateSequence; this.loading = !0, this.changed(); try {
        let i = await this.read(`/api/sects/current/tasks/${encodeURIComponent(t.definitionId)}/submission-candidates`, r);
        if (r !== this.generation || e !== this.candidateSequence)
            return;
        this.data = i, this.selections = [], this.error = "";
    }
    catch (i) {
        if (r === this.generation && e === this.candidateSequence)
            this.data = void 0, this.error = i instanceof Error ? i.message : "读取失败";
    }
    finally {
        if (r === this.generation && e === this.candidateSequence)
            this.loading = !1, this.changed();
    } }
    async reloadInventory() { if (!this.task)
        return; let t = this.generation, r = ++this.inventorySequence, e = this.source; this.inventoryLoading = !0, this.inventoryError = "", this.changed(); let i = { location: e }; if (e === "storage") {
        if (i.kind = this.filter.kind, i.page = String(this.page), this.filter.kind === "material") {
            for (let n of ["minRank", "maxRank", "materialType"])
                if (this.filter[n])
                    i[n] = this.filter[n];
        }
    } try {
        let n = await this.read("/api/combat-v6/inventory?" + Object.entries(i).map(([a, s]) => `${a}=${encodeURIComponent(s)}`).join("&"), t);
        if (t !== this.generation || r !== this.inventorySequence)
            return;
        if (e === "bag")
            this.bag = n;
        else
            this.storage = n, this.page = n.page;
    }
    catch (n) {
        if (t === this.generation && r === this.inventorySequence) {
            if (e === "bag")
                this.bag = void 0;
            else
                this.storage = void 0;
            this.inventoryError = n instanceof Error ? n.message : "读取失败";
        }
    }
    finally {
        if (t === this.generation && r === this.inventorySequence)
            this.inventoryLoading = !1, this.changed();
    } }
    setSource(t) { if (this.locked)
        return; this.source = t, this.page = 0, this.reloadInventory(); }
    setFilter(t) { if (this.locked)
        return; if (this.filter = t, this.page = 0, this.source === "storage")
        this.reloadInventory();
    else
        this.changed(); }
    setPage(t) { if (this.locked || this.source !== "storage")
        return; this.page = Math.max(0, Math.trunc(t)), this.reloadInventory(); }
    reason(t) { var _a, _b; let r = (_a = this.data) === null || _a === void 0 ? void 0 : _a.items.find((e) => e.item.id === t.id); return (r === null || r === void 0 ? void 0 : r.eligible) ? "" : (_b = r === null || r === void 0 ? void 0 : r.violations.map((e) => e.message).join("；")) !== null && _b !== void 0 ? _b : "此物不符合委托类型"; }
    choose(t) { var _a; if (this.locked || this.loading || this.inventoryLoading || this.inventoryError)
        return; let r = this.reason(t); if (r) {
        this.error = r, this.changed();
        return;
    } if (this.error = "", this.selections.some((e) => e.item.id === t.id))
        this.selections = this.selections.filter((e) => e.item.id !== t.id);
    else
        this.selections = ((_a = this.requirement) === null || _a === void 0 ? void 0 : _a.kind) === "material" ? [...this.selections, { item: t, quantity: "1" }] : [{ item: t, quantity: "1" }]; this.changed(); }
    setQuantity(t, r) { if (this.locked)
        return; this.selections = this.selections.map((e) => e.item.id === t ? { ...e, quantity: r } : e), this.changed(); }
    async submit() { var _a; if (!this.valid || this.locked || !this.task || !this.action)
        return; let t = this.generation, r = this.selections.map((i) => ({ itemId: i.item.id, revision: i.item.revision, quantity: Number(i.quantity) })), e = JSON.stringify(r); if (((_a = this.attempt) === null || _a === void 0 ? void 0 : _a.key) !== e)
        this.attempt = { key: e, id: (0, official_chunk_wje6zqc2_js_1.Ee)() }; this.pending = !0, this.changed(); try {
        let i = await this.interaction.execute(this.task, this.action, { items: r }, void 0, this.attempt.id);
        if (t !== this.generation)
            return;
        if (i)
            this.onSuccess();
        else
            this.bag = void 0, this.storage = void 0, await Promise.all([this.refreshCandidates(), this.reloadInventory()]);
    }
    finally {
        if (t === this.generation)
            this.pending = !1, this.changed();
    } }
}
exports.SectSubmissionModel = Gt;
class qt {
    constructor(t, r) {
        this.bagOpen = !1;
        this.formScroll = 0;
        this.bagScroll = 0;
        this.generation = 0;
        this.close = () => { if (this.model.locked)
            return; if (this.bagOpen)
            this.bagOpen = !1, this.u.modalScroll = this.formScroll;
        else
            this.reset(); this.u.invalidate(); };
        this.u = t;
        this.model = new Gt(r, () => t.invalidate(), () => this.reset()), this.filters = new official_chunk_nx6d9wvp_js_1.xb(t, (e) => this.model.setFilter(e)), this.preview = new official_chunk_h2eh160v_js_1.te(t);
    }
    get active() { return !!this.model.task; }
    open(t, r) { this.reset(), this.u.modalScroll = 0, this.model.open(t, r); }
    reset() { var _a; this.generation++, (_a = this.keyboardCleanup) === null || _a === void 0 ? void 0 : _a.call(this), this.keyboardCleanup = void 0, this.model.close(), this.bagOpen = !1, this.filters.closeFilter(), this.preview.close(), this.u.invalidate(); }
    edit(t) { var _a; let r = this.model, e = r.selections.find((h) => h.item.id === t); if (!e || r.locked)
        return; (_a = this.keyboardCleanup) === null || _a === void 0 ? void 0 : _a.call(this); let i = this.generation, n = ({ value: h }) => { if (i === this.generation)
        r.setQuantity(t, h); }, a = () => { if (official_chunk_wje6zqc2_js_1.De.offKeyboardInput(n), official_chunk_wje6zqc2_js_1.De.offKeyboardComplete(s), official_chunk_wje6zqc2_js_1.De.hideKeyboard(), this.keyboardCleanup === a)
        this.keyboardCleanup = void 0; }, s = (h) => { n(h), a(); }; this.keyboardCleanup = a, official_chunk_wje6zqc2_js_1.De.onKeyboardInput(n), official_chunk_wje6zqc2_js_1.De.onKeyboardComplete(s), official_chunk_wje6zqc2_js_1.De.showKeyboard({ defaultValue: e.quantity, maxLength: -1, multiple: !1, confirmType: "done", fail: a }); }
    button(t, r, e, i, n, a = !1) { let s = this.u; if (s.ctx.save(), i)
        s.ctx.globalAlpha *= 0.5; s.inert(i, () => s.button(t, r, e, n, a ? official_chunk_wje6zqc2_js_1.Be.crimson : official_chunk_wje6zqc2_js_1.Be.ink)), s.ctx.restore(); }
    paint() { let t = this.model, r = t.task, e = t.requirement; if (!r || !e)
        return; let i = this.u, n = Math.min(1024, i.width - 24) - 34, a = new official_chunk_wje6zqc2_js_1.Ce(i, n); if (a.text((0, official_chunk_89xwxnzm_js_1.ia)(e), 14, 28), a.gap(16), t.loading)
        a.text("正在查验物品…", 14, 21), a.gap(16); if (t.error || t.inventoryError)
        a.text(t.error || t.inventoryError, 14, 28, official_chunk_wje6zqc2_js_1.Be.crimson), a.gap(16); a.block(32.32, (o, b) => this.button("选择物品", o, b, t.locked || t.loading, () => { this.formScroll = i.modalScroll, this.bagOpen = !0, i.modalScroll = 0, i.invalidate(); })), a.gap(16); for (let o of t.selections) {
        let b = i.lines(o.item.name, n - 64 - 24 - i.buttonWidth("移出"), 14), p = Math.max(64, b.length * 21 + 8 + 24 + 8 + 51.6);
        a.block(p, (f, m) => { (0, official_chunk_h2eh160v_js_1.ve)(i, f, m + (p - 64) / 2, 64, o.item, { preview: () => this.preview.open(o.item, { x: f, y: m, w: 64, h: 64 }) }); let v = f + 76, M = n - 76 - 12 - i.buttonWidth("移出"); b.forEach(($, S) => i.text($, v, m + 10.5 + S * 21, 14)); let l = m + b.length * 21 + 8; if (i.tracked("交付数量", v, l + 12, 16, 1.28, official_chunk_wje6zqc2_js_1.Be.ink, !0), i.paper(v, l + 32, M, 51.6), i.ctx.save(), i.ctx.strokeStyle = "rgba(44,24,16,.2)", i.ctx.setLineDash([3, 3]), i.ctx.strokeRect(v + 0.5, l + 32.5, M - 1, 50.6), i.ctx.restore(), i.text(o.quantity, v + 12, l + 57.8, 16, official_chunk_wje6zqc2_js_1.Be.ink, "sans-serif"), !t.locked)
            i.hit(v, l + 32, M, 51.6, () => this.edit(o.item.id)); this.button("移出", f + n - i.buttonWidth("移出"), m + (p - 32.32) / 2, t.locked, () => t.choose(o.item)); }), a.gap(16);
    } a.text(`已选 ${t.total} / ${e.quantity}；超出最低要求不会增加奖励。`, 14, 21, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]); let s = this.bagOpen || this.preview.underlayScroll !== void 0, h = i.modalScroll; if (s)
        i.modalScroll = this.bagOpen ? this.formScroll : this.preview.underlayScroll; if (i.inert(s, () => (0, official_chunk_wje6zqc2_js_1.He)(i, { title: `移交 · ${r.presentation.title}`, style: "modal", maxWidth: 1024, rows: [], content: a, actions: [{ label: "取消", disabled: t.locked, run: () => this.reset() }, { label: t.locked ? "处理中……" : "确认交付", primary: !0, disabled: t.locked || t.loading || !t.valid, run: () => { var _a; (_a = this.keyboardCleanup) === null || _a === void 0 ? void 0 : _a.call(this), t.submit(); } }] }, this.close)), s)
        i.modalScroll = h; if (this.bagOpen)
        this.paintInventory(); this.filters.paint(), this.preview.paint(); }
    paintInventory() { var _a; let t = this.u, r = this.model, e = t.width - 32, i = new official_chunk_wje6zqc2_js_1.Ce(t, e), n = r.inventory; if (i.block(40, (h, o) => { var _a, _b; ["bag", "storage"].forEach((f, m) => { if (t.text(f === "bag" ? "储物袋" : "储藏室", h + 4 + m * 66, o + 20, 14, r.source === f ? official_chunk_wje6zqc2_js_1.Be.crimson : official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), r.source === f)
        t.rect(h + m * 66, o + 39, 50, 1, official_chunk_wje6zqc2_js_1.Be.crimson); if (!r.locked)
        t.hit(h + m * 66, o, 50, 40, () => { r.setSource(f), t.modalScroll = 0; }); }); let b = t.buttonWidth("刷新"), p = r.source === "bag" ? `${(_a = n === null || n === void 0 ? void 0 : n.used) !== null && _a !== void 0 ? _a : "—"} / 40` : `${(_b = n === null || n === void 0 ? void 0 : n.total) !== null && _b !== void 0 ? _b : "—"} 格`; t.text(p, h + e - b - 12 - t.measure(p, 12, "monospace"), o + 20, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"], "monospace"), this.button("刷新", h + e - b, o + 3.84, r.locked || r.inventoryLoading, () => { r.reloadInventory(), r.refreshCandidates(); }); }), i.gap(12), i.block(32.32, (h, o) => this.button(`筛选${(0, official_chunk_nx6d9wvp_js_1.vb)(r.filter) ? " · 已启用" : ""}`, h, o, r.locked, () => { this.bagScroll = t.modalScroll, this.filters.open(r.filter); })), i.gap(12), r.inventoryError)
        i.text(r.inventoryError, 14, 28, official_chunk_wje6zqc2_js_1.Be.crimson);
    else if (!n)
        i.text(`正在读取${r.source === "bag" ? "储物袋" : "储藏室"}……`, 14, 24, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]); if (n) {
        let h = r.items, o = r.source === "bag" && !(0, official_chunk_nx6d9wvp_js_1.vb)(r.filter) ? Array.from({ length: 40 }, (f, m) => h.find((v) => v.slotIndex === m)) : h, b = (e - 24) / 5, p = Math.ceil(o.length / 5);
        if (h.length)
            i.text("轻点操作，长按查看详情", 12, 16, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), i.gap(8);
        if (i.block(p ? p * (b + 6) - 6 : 0, (f, m) => o.forEach((v, M) => { let l = f + M % 5 * (b + 6), $ = m + Math.floor(M / 5) * (b + 6), S = r.locked || r.loading || r.inventoryLoading || !!r.inventoryError, P = v ? r.reason(v) : "", K = () => { if (!v || S || P)
            return; if (r.choose(v), this.preview.underlayScroll !== void 0)
            this.preview.close(); }; (0, official_chunk_h2eh160v_js_1.ve)(t, l, $, b, v, { disabled: S, badge: v && !P ? "可选" : void 0, selected: !!v && r.selections.some((D) => D.item.id === v.id), quick: v && !P ? K : void 0, preview: v ? () => this.preview.open(v, { x: l, y: $, w: b, h: b }, void 0, P || void 0, (D) => { let j = new official_chunk_wje6zqc2_js_1.Ce(t, D); return j.block(32.32, (z, H) => this.button("选择／移出", z, H, S || !!P, K)), j; }) : void 0 }); })), r.source === "storage" && n.total > 40)
            i.gap(12), i.block(32.32, (f, m) => { this.button("上一页", f, m, r.locked || r.inventoryLoading || n.page === 0, () => r.setPage(n.page - 1)); let v = `${n.page + 1} / ${Math.ceil(n.total / 40)}`; t.text(v, f + (e - t.measure(v, 14, "monospace")) / 2, m + 16.16, 14, official_chunk_wje6zqc2_js_1.Be.ink, "monospace"), this.button("下一页", f + e - t.buttonWidth("下一页"), m, r.locked || r.inventoryLoading || (n.page + 1) * 40 >= n.total, () => r.setPage(n.page + 1)); });
    } let a = t.modalScroll, s = (_a = this.preview.underlayScroll) !== null && _a !== void 0 ? _a : (this.filters.active ? this.bagScroll : void 0); if (s !== void 0)
        t.modalScroll = s; if (t.inert(s !== void 0, () => (0, official_chunk_wje6zqc2_js_1.He)(t, { title: "选择物品", rows: [], content: i }, this.close)), s !== void 0)
        t.modalScroll = a; }
}
exports.SectSubmissionDialog = qt;
function rr(t) { return `${t.periodKey}:${t.definitionId}`; }
function er(t) { return t.filter((r) => r.state !== "locked"); }
function tr(t) { return t.map((r) => `「${r.presentation.title}」`).join("、"); }
function wr(t, r, e) { let i = er(r), n = [i.some((s) => s.state === "offered") ? `眼下可接的有${tr(i.filter((s) => s.state === "offered"))}` : void 0, i.some((s) => s.state === "active") ? `${tr(i.filter((s) => s.state === "active"))}还在你名下` : void 0, i.some((s) => s.state === "claimable") ? `${tr(i.filter((s) => s.state === "claimable"))}已经可以交回` : void 0].filter((s) => Boolean(s)), a = n.length > 0 ? `${n.join("；")}。` : i.some((s) => s.state === "claimed") ? "本期差事都已结清，若要查账便问我。" : "眼下没有需要你经办的事务。"; return [t.greeting, a, e].filter(Boolean).join(" "); }
function yr(t) { let r = t.presentation.dialogue; if (t.state === "offered")
    return r.offeredReply; if (t.state === "active")
    return r.activeReply; if (t.state === "claimable")
    return r.claimableReply; return r.claimedReply; }
class Qt {
    constructor(t, r, e) { this.u = t; this.model = r; this.submission = new qt(t, r), this.actions = new zt(t, r, e, (i, n) => this.submission.open(i, n)); }
    close() { this.actions.close(), this.submission.reset(); }
    paintOverlay() { this.actions.paintOverlay(), this.submission.paint(); }
    flow(t, r, e) { var _a, _b; let i = this.model, n = this.u; if (!i.data && i.loading)
        return (0, official_chunk_nx6d9wvp_js_1.sb)(n, t, r, [{ speaker: r.name, body: "稍候，我查一查今日的功簿。" }], [], () => { }, !0); let a = i.selected; if (!a) {
        let f = er(i.tasks), m = f.map((M) => ({ id: rr(M), label: yr(M), tone: M.state === "claimable" ? "primary" : M.state === "claimed" ? "muted" : "normal" }));
        if (i.nextRank)
            m.push({ id: "promote-disciple", label: `请长老为弟子晋升${official_chunk_89xwxnzm_js_1.Y[i.nextRank]}`, tone: "primary" });
        m.push({ id: "leave-conversation", label: "弟子告退", tone: "muted" });
        let v = [{ speaker: r.name, body: wr(r, i.tasks, i.guidance) }];
        if (i.promotionResult)
            v.push({ speaker: r.name, body: i.promotionResult, tone: "attention" });
        return (0, official_chunk_nx6d9wvp_js_1.sb)(n, t, r, v, m, (M) => { if (M === "leave-conversation")
            e();
        else if (M === "promote-disciple")
            i.promote();
        else {
            let l = f.find(($) => rr($) === M);
            if (l)
                i.select(l);
        } }, i.busy || i.loading, i.error);
    } let s = ((_a = i.outcome) === null || _a === void 0 ? void 0 : _a.task.definitionId) === a.definitionId ? i.outcome.outcome : void 0, h, o = ""; if (s) {
        let f = official_chunk_89xwxnzm_js_1.Fa[s.renderer];
        if (!f)
            o = `暂不支持此任务结果：${s.renderer}`;
        else {
            let m = f.safeParse(s.data);
            if (m.success)
                h = m.data;
            else
                o = `宗门任务结果格式无效：${s.renderer}`;
        }
    } let b = h && (s === null || s === void 0 ? void 0 : s.renderer) === "sect.outcome.reward-claimed" ? h : void 0, p = []; if (b)
        p.push({ speaker: r.name, body: `此事已经结清。${b.lines.join("，")}，均已入账。`, tone: "attention" });
    else if (a.state === "claimed")
        p.push({ speaker: r.name, body: `此事本期已经结清。${((_b = a.reward) === null || _b === void 0 ? void 0 : _b.summary.length) ? `${a.reward.summary.join("，")}，都已记入功簿。` : "功簿上已经留有记录。"}` });
    else if (h && (s === null || s === void 0 ? void 0 : s.renderer) === "sect.outcome.fulfilled")
        p.push({ speaker: r.name, body: "带来的东西已经验明，回执也已写好，现在可以交回结清。", tone: "attention" });
    else if (h && (s === null || s === void 0 ? void 0 : s.renderer) === "sect.outcome.abandoned")
        p.push({ speaker: r.name, body: "这份委托已经从你名下撤下。若仍想经办，可以回到事务册重新领取。", tone: "attention" });
    else if (p.push({ speaker: r.name, body: a.presentation.dialogue.instruction.map((f) => ({ text: f.text, bold: !!f.emphasis, color: f.emphasis === "quality" ? official_chunk_wje6zqc2_js_1.Be["tier-xuan"] : f.emphasis === "effect" ? official_chunk_wje6zqc2_js_1.Be.teal : f.emphasis ? official_chunk_wje6zqc2_js_1.Be.crimson : void 0 })) }), a.battleTarget) {
        let f = a.battleTarget;
        p.push({ speaker: r.name, body: `目标：${f.name}，${f.sectName ? `${f.sectName}，` : ""}${f.realm}${f.realmStage}。${f.description}`, tone: "attention" });
    } if (o)
        p.push({ body: o, tone: "attention" }); return (0, official_chunk_nx6d9wvp_js_1.sb)(n, t, r, p, [{ id: "return-to-tasks", label: "我再问问别的" }, { id: "leave-conversation", label: "弟子告退", tone: "muted" }], (f) => { if (this.actions.close(), f === "return-to-tasks")
        i.back();
    else
        e(); }, i.busy, i.error, this.actions.flow(t - 40, a)); }
}
exports.SectAffairsConversation = Qt;
class re {
    constructor(t, r, e) {
        this.owner = "";
        this.u = t;
        this.player = r;
        this.navigate = e;
        this.context = new official_chunk_89xwxnzm_js_1.Qa(() => t.invalidate(), !1), this.model = new Jt(() => t.invalidate(), () => r.load(), () => this.context.reload()), this.conversation = new Qt(t, this.model, e);
    }
    enter(t) { var _a, _b; this.leave(), this.requested = (_b = new URLSearchParams((_a = t.split("?")[1]) !== null && _a !== void 0 ? _a : "").get("npc")) !== null && _b !== void 0 ? _b : void 0, this.sync(); }
    leave() { this.owner = "", this.role = void 0, this.requested = void 0, this.conversation.close(), this.model.close(), this.context.leave(); }
    sync() { var _a, _b; let t = (_b = (_a = this.player.view()) === null || _a === void 0 ? void 0 : _a.cultivator.id) !== null && _b !== void 0 ? _b : ""; if (t && t !== this.owner)
        this.owner = t, this.conversation.close(), this.model.close(), this.role = void 0, this.context.enter(t); }
    select(t) { var _a, _b; let r = (_a = this.context.presentation.rooms.affairs) === null || _a === void 0 ? void 0 : _a.actors.find((i) => i.id === t); this.role = r === null || r === void 0 ? void 0 : r.roleKey, this.conversation.close(), this.model.close(); let e = (_b = r === null || r === void 0 ? void 0 : r.conversation.parameters) === null || _b === void 0 ? void 0 : _b.kind; if ((r === null || r === void 0 ? void 0 : r.conversation.renderer) === "sect.affairs.tasks" && (e === "daily" || e === "weekly" || e === "promotion"))
        this.model.open(this.owner, e); this.u.invalidate(); }
    room(t) { let r = this.u, e = this.context.presentation.rooms.affairs, i = e === null || e === void 0 ? void 0 : e.actors.find((s) => s.roleKey === this.role); if (!e)
        return (0, official_chunk_nx6d9wvp_js_1.sb)(r, t, { sigil: "候", name: "当值弟子", identity: "当值弟子", responsibility: "负责接待来客。" }, [{ speaker: "当值弟子", body: "此处的经办人尚未到值，请稍后再来。", tone: "attention" }], [], () => { }); if (!i)
        return (0, official_chunk_nx6d9wvp_js_1.rb)(r, t, { eyebrow: "宗门公牍 · 当值录事", description: e.description, actors: e.actors, select: (s) => this.select(s), prompt: "点击人物，与其交谈" }); let n = this.model.kind ? this.conversation.flow(t - 2, i, () => this.select()) : (0, official_chunk_nx6d9wvp_js_1.sb)(r, t - 2, i, [{ speaker: i.name, body: "这册事务暂时无法查验，请稍后再来。", tone: "attention" }], [{ id: "leave", label: "弟子告退", tone: "muted" }], () => this.select()), a = new official_chunk_wje6zqc2_js_1.Ce(r, t); return a.block(n.height + 2, (s, h) => { r.rect(s, h, t, n.height + 2, "rgba(248,243,230,.42)"), r.ctx.save(), r.ctx.strokeStyle = "rgba(44,24,16,.2)", r.ctx.setLineDash([]), r.ctx.strokeRect(s + 0.5, h + 0.5, t - 1, n.height + 1), r.ctx.restore(), n.paint(s + 1, h + 1); }), a; }
    paint(t, r) { var _a, _b, _c; this.sync(); let e = this.u, i = this.context, n = e.width - 56, a = i.presentation.scenes.affairs, s = new official_chunk_wje6zqc2_js_1.Ce(e, n), h = a.title, o = a.description; if (this.requested && i.context) {
        let v = (_a = i.presentation.rooms.affairs) === null || _a === void 0 ? void 0 : _a.actors.find((M) => M.roleKey === this.requested);
        if (this.requested = void 0, v && ((_b = i.context.permissions["sect.tasks.use"]) === null || _b === void 0 ? void 0 : _b.granted))
            this.select(v.id);
    } if (i.error)
        h = "宗门卷宗暂不可用", o = "传讯玉符未能接通宗门执事，可重新尝试读取。", s.text(i.error, 14, 28, official_chunk_wje6zqc2_js_1.Be.crimson), s.block(32.32, (v, M) => e.button("重新读取", v, M, () => { i.reload(); }));
    else if (!i.context)
        s.text(a.loadingText, 14, 28, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
    else {
        let v = i.context.permissions["sect.tasks.use"];
        if (!(v === null || v === void 0 ? void 0 : v.granted))
            o = a.permissionDeniedDescription;
        let M = n - 34, l = (v === null || v === void 0 ? void 0 : v.granted) ? this.room(M) : new official_chunk_wje6zqc2_js_1.Ce(e, M);
        if (!(v === null || v === void 0 ? void 0 : v.granted))
            l.text((_c = v === null || v === void 0 ? void 0 : v.reason) !== null && _c !== void 0 ? _c : "当前弟子身份尚未获得此设施权限。", 14, 28, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
        let $ = 107.32 + l.height;
        s.block($, (S, P) => { let K = e.ctx; K.save(), e.clip(S, P, n, $, () => { let j = K.createLinearGradient(S, P, S + n, P + n * 0.364); j.addColorStop(0, "rgba(101,68,43,.12)"), j.addColorStop(0.35, "rgba(101,68,43,0)"), K.fillStyle = j, K.fillRect(S, P, n, $); for (let z = S; z < S + n; z += 72)
            e.rect(z, P, 1, $, "rgba(255,255,255,.3)"); K.globalAlpha = 0.05, e.text("令", S + n - 160, P + 40, 144, official_chunk_wje6zqc2_js_1.Be.ink), K.globalAlpha = 1; }), K.strokeStyle = "rgba(68,64,60,.2)", K.strokeRect(S + 0.5, P + 0.5, n - 1, $ - 1), K.restore(), e.button("返回宗门总视图", S + 17, P + 21, () => this.navigate("/game/sect"), official_chunk_wje6zqc2_js_1.Be["ink-secondary"]); let D = official_chunk_89xwxnzm_js_1.ua.registry.require(i.context.sectId).definition.name; K.save(), K.globalAlpha = 0.5, e.tracked(D, S + n - 17 - e.trackedWidth(D, 12, 4.2), P + 37.16, 12, 4.2, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), K.restore(), e.rect(S + 17, P + 65.32, M, 1, "rgba(44,24,16,.1)"), l.paint(S + 17, P + 86.32); });
    } let b = e.lines(o, n, 14), p = 84.2 + Math.max(0, b.length - 1) * 24, f = p + 20 + s.height + 16, m = t + 12 - e.scroll; e.clip(0, t, e.width, r - t, () => { e.rect(12, m, e.width - 24, f, "rgba(248,243,230,.82)"), e.text(h, 28, m + 28, 23.2, official_chunk_wje6zqc2_js_1.Be.ink, e.headingFont); let v = 36 + e.measure(h, 23.2, e.headingFont); e.text("/", v, m + 31, 14, official_chunk_wje6zqc2_js_1.Be["battle-muted"]), e.tracked("修行", v + 14, m + 31, 12.48, 1.9968, official_chunk_wje6zqc2_js_1.Be["battle-muted"]), b.forEach((M, l) => e.text(M, 28, m + 60 + l * 24, 14, official_chunk_wje6zqc2_js_1.Be["ink-secondary"])), e.line(28, m + p - 1, n), s.paint(28, m + p + 20); }), e.scrollMax = Math.max(0, t + 24 + f - r); }
    paintOverlay() { this.conversation.paintOverlay(); }
}
exports.SectAffairsPage = re;
class Zt {
    constructor(t, r) {
        this.page = 1;
        this.loading = !1;
        this.submitting = !1;
        this.claimed = !1;
        this.error = "";
        this.generation = 0;
        this.sequence = 0;
        this.sectId = "";
        this.changed = t;
        this.refreshPlayer = r;
    }
    open(t, r) { if (this.close(), this.actor = t, this.sectId = r, this.claimed = !1, this.error = "", t === "stipend")
        this.reload(); this.changed(); }
    close() { var _a, _b; this.generation++, this.sequence++, (_b = (_a = this.task) === null || _a === void 0 ? void 0 : _a.abort) === null || _b === void 0 ? void 0 : _b.call(_a), this.task = void 0, clearInterval(this.timer), this.timer = void 0, this.actor = void 0, this.topic = void 0, this.members = void 0, this.ranking = void 0, this.stipend = void 0, this.page = 1, this.loading = !1, this.submitting = !1, this.error = "", this.claimed = !1; }
    select(t) { var _a, _b; if (this.actor !== "registry" || this.submitting)
        return; if (this.sequence++, (_b = (_a = this.task) === null || _a === void 0 ? void 0 : _a.abort) === null || _b === void 0 ? void 0 : _b.call(_a), this.task = void 0, this.loading = !1, clearInterval(this.timer), this.timer = void 0, this.topic = t, this.error = "", this.page = 1, t === "members")
        this.reload(), this.timer = setInterval(() => { if (!this.loading)
            this.reload(); }, 30000);
    else if (t === "ranking")
        this.reload(); this.changed(); }
    setPage(t) { if (this.topic !== "members" || !this.members)
        return; let r = Math.max(1, Math.min(Math.ceil(this.members.total / this.members.pageSize) || 1, Math.trunc(t))); if (r === this.page)
        return; this.page = r, this.reload(); }
    async reload() { var _a, _b, _c, _d, _e, _f, _g, _h; if (!this.actor)
        return; let t = this.actor === "stipend" ? "stipend" : this.topic; if (t !== "stipend" && t !== "members" && t !== "ranking")
        return; let r = this.generation, e = ++this.sequence, i = () => r === this.generation && e === this.sequence; (_b = (_a = this.task) === null || _a === void 0 ? void 0 : _a.abort) === null || _b === void 0 ? void 0 : _b.call(_a), this.task = void 0, this.loading = !0, this.error = "", this.changed(); let n = t === "members" ? `/api/sects/current/members?page=${this.page}&pageSize=20` : t === "ranking" ? "/api/sects/current/contribution-ranking" : "/api/sects/current/stipend"; try {
        let a = await (0, official_chunk_h2eh160v_js_1.Gb)(n, "GET", void 0, void 0, {}, { onTask: (s) => { var _a; if (i())
                this.task = s;
            else
                (_a = s.abort) === null || _a === void 0 ? void 0 : _a.call(s); } });
        if (!i())
            return;
        if (!a.success)
            throw Error((_c = a.error) !== null && _c !== void 0 ? _c : "宗门信息读取失败");
        if (t === "stipend")
            this.stipend = Nr.parse(a.data);
        else {
            let s = t === "members" ? "sect.members" : "sect.contribution-ranking";
            if (((_d = a.resource) === null || _d === void 0 ? void 0 : _d.topic) !== s || ((_f = (_e = a.resource) === null || _e === void 0 ? void 0 : _e.scope) === null || _f === void 0 ? void 0 : _f.kind) !== "sect" || ((_h = (_g = a.resource) === null || _g === void 0 ? void 0 : _g.scope) === null || _h === void 0 ? void 0 : _h.id) !== this.sectId)
                throw Error(`资源地址不匹配: ${s}`);
            if (t === "members")
                this.members = official_chunk_89xwxnzm_js_1.Ga["sect.members"].parse(a.data);
            else
                this.ranking = official_chunk_89xwxnzm_js_1.Ga["sect.contribution-ranking"].parse(a.data);
        }
    }
    catch (a) {
        if (i())
            this.error = a instanceof Error ? a.message : "宗门信息读取失败";
    }
    finally {
        if (i())
            this.task = void 0, this.loading = !1, this.changed();
    } }
    async claim() { if (this.actor !== "stipend" || this.submitting || this.loading || !this.stipend || this.stipend.claimed)
        return; let t = this.generation; this.submitting = !0, this.error = "", this.claimed = !1, this.changed(); try {
        if (await (0, official_chunk_h2eh160v_js_1.Gb)("/api/sects/current/stipend/claim", "POST", void 0, void 0, { "Idempotency-Key": (0, official_chunk_wje6zqc2_js_1.Ee)() }), t !== this.generation)
            return;
        if (this.claimed = !0, await this.reload(), t !== this.generation)
            return;
        await this.refreshPlayer();
    }
    catch (r) {
        if (t === this.generation)
            this.error = r instanceof Error ? r.message : "交谈暂时中断，请稍后再试。";
    }
    finally {
        if (t === this.generation)
            this.submitting = !1, this.changed();
    } }
}
exports.SectHallModel = Zt;
var Je = { online: "在线", active_today: "今日活跃", active_7d: "近7日活跃", inactive: "较久未现身" };
class Vt {
    constructor(t) {
        this.offset = 0;
        this.max = 0;
        this.u = t;
        this.surface = { start: (r) => { var _a; let e = (_a = r.touches) === null || _a === void 0 ? void 0 : _a[0]; if (e)
                this.last = { x: e.clientX, y: e.clientY }; }, move: (r) => { var _a; let e = (_a = r.touches) === null || _a === void 0 ? void 0 : _a[0], i = this.last; if (!e || !i)
                return; let n = e.clientX - i.x, a = e.clientY - i.y; if (Math.abs(n) > Math.abs(a))
                this.offset = Math.max(0, Math.min(this.max, this.offset - n));
            else
                t.scroll = Math.max(0, Math.min(t.scrollMax, t.scroll - a)); this.last = { x: e.clientX, y: e.clientY }, t.invalidate(); }, end: () => { this.last = void 0; }, cancel: () => { this.last = void 0; } };
    }
    reset() { this.offset = 0, this.last = void 0; }
    flow(t, r) { let e = this.u, i = new official_chunk_wje6zqc2_js_1.Ce(e, t), n = t - 40, a = new official_chunk_wje6zqc2_js_1.Ce(e, n), s = r.topic === "members" ? r.members : void 0, h = r.topic === "ranking" ? r.ranking : void 0, o = () => { r.select(void 0), this.reset(), e.invalidate(); }; if (s) {
        let b = Math.max(1, Math.ceil(s.total / s.pageSize)), p = `同门名录 · 共 ${s.total} 人 · 第 ${s.page}/${b} 页${r.loading ? " · 正在更新" : ""}`, f = e.buttonWidth("合上名录"), m = e.lines(p, Math.max(20, n - f - 12), 14), v = Math.max(32.32, m.length * 21) + 17;
        a.block(v, (M, l) => { m.forEach(($, S) => e.text($, M, l + 10.5 + S * 21, 14, official_chunk_wje6zqc2_js_1.Be["ink-secondary"])), e.button("合上名录", M + n - f, l + (v - 17 - 32.32) / 2, o), e.rect(M, l + v - 1, n, 1, "rgba(44,24,16,.1)"); }), a.gap(20), this.table(a, ["名号", "境界", "身份", "职务", "近况"], s.items.map((M) => { var _a; return [M.name, `${M.realm}${M.realmStage}`, official_chunk_89xwxnzm_js_1.Y[M.discipleRank], M.office === "none" ? "无" : (_a = M.office) !== null && _a !== void 0 ? _a : "", Je[M.activityState]]; }), 0, 4, s.items.map((M) => M.activityState === "online")), a.gap(20), a.block(32.32, (M, l) => { let $ = e.buttonWidth("下一页"), S = e.buttonWidth("上一页"), P = (K, D, j, z) => { if (e.ctx.save(), j)
            e.ctx.globalAlpha *= 0.5; e.inert(j, () => e.button(K, D, l, () => { r.setPage(z), this.reset(); }, official_chunk_wje6zqc2_js_1.Be["ink-secondary"])), e.ctx.restore(); }; P("上一页", M + n - $ - 8 - S, s.page <= 1, s.page - 1), P("下一页", M + n - $, s.page >= b, s.page + 1); });
    }
    else if (h)
        if (a.text("宗门贡献榜 · 累积贡献", 14, 21, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), a.gap(4), a.text(`我的排名：第 ${h.currentMember.rank} 名 · ${h.currentMember.contribution.toLocaleString("zh-CN")} 点`, 14, 21), a.gap(12), a.block(32.32, (b, p) => { e.inert(r.loading, () => e.button(r.loading ? "更新中……" : "刷新", b, p, () => { r.reload(); }, official_chunk_wje6zqc2_js_1.Be["ink-secondary"])), e.button("收起榜单", b + e.buttonWidth(r.loading ? "更新中……" : "刷新") + 8, p, o); }), a.gap(16), a.rule(), a.gap(20), !h.entries.length)
            a.text("暂无贡献记录。", 14, 28, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
        else
            this.table(a, ["名次", "名号", "身份", "职务", "累积贡献"], h.entries.map((b) => { var _a, _b; return [`第 ${b.rank} 名`, b.name, (_a = official_chunk_89xwxnzm_js_1.Y[b.discipleRank]) !== null && _a !== void 0 ? _a : "", b.office === "none" ? "无" : (_b = b.office) !== null && _b !== void 0 ? _b : "", b.contribution.toLocaleString("zh-CN")]; }), 1); if (i.gap(28), i.block(a.height, (b, p) => a.paint(b + 20, p)), i.gap(28), i.height < 544)
        i.gap(544 - i.height); return i; }
    table(t, r, e, i, n = -1, a = []) { let s = this.u, h = Math.max(576, t.width), o = r.map((M, l) => Math.max(s.measure(M, 14) + 16, ...e.map(($) => s.measure($[l], 14) + 16 + (l === n ? 14 : 0)))), b = o.reduce((M, l) => M + l, 0); for (let M = 0; M < o.length; M++)
        o[M] += (Math.max(h, b) - b) / o.length; let p = o.reduce((M, l) => M + l, 0); this.max = Math.max(0, p - t.width), this.offset = Math.min(this.offset, this.max); let f = 38, m = 38, v = m + e.length * f; t.block(v, (M, l) => { s.clip(M, l, t.width, v, () => { let $ = (S, P, K, D) => { let j = M - this.offset; S.forEach((z, H) => { let G = n < 0 && H === 4; if (H === n && !K) {
        let Z = s.measure(z, 12) + 14;
        s.rect(j + 8, P + 9, Z, 20, a[D] ? "rgba(139,0,0,.08)" : "rgba(44,24,16,.05)"), s.text(z, j + 15, P + 19, 12, a[D] ? official_chunk_wje6zqc2_js_1.Be.crimson : official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
    }
    else
        s.text(z, G ? j + o[H] - 8 - s.measure(z, 14) : j + 8, P + 19, 14, official_chunk_wje6zqc2_js_1.Be.ink, s.bodyFont, K || H === i); j += o[H]; }), s.rect(M - this.offset, P + 37, p, 1, K ? "rgba(44,24,16,.2)" : "rgba(44,24,16,.1)"); }; $(r, l, !0, 0), e.forEach((S, P) => $(S, l + m + P * f, !1, P)), s.hit(M, l, t.width, v, () => { }, { surface: this.surface }); }); }); }
}
exports.SectHallTables = Vt;
class ee {
    constructor(t, r, e) {
        this.owner = "";
        this.u = t;
        this.player = r;
        this.navigate = e;
        this.context = new official_chunk_89xwxnzm_js_1.Qa(() => t.invalidate()), this.hall = new Zt(() => t.invalidate(), () => r.load()), this.tables = new Vt(t);
    }
    enter(t) { var _a, _b; this.leave(), this.requested = (_b = new URLSearchParams((_a = t.split("?")[1]) !== null && _a !== void 0 ? _a : "").get("npc")) !== null && _b !== void 0 ? _b : void 0, this.sync(); }
    leave() { this.owner = "", this.role = void 0, this.requested = void 0, this.context.leave(), this.hall.close(), this.tables.reset(); }
    sync() { var _a, _b; let t = (_b = (_a = this.player.view()) === null || _a === void 0 ? void 0 : _a.cultivator.id) !== null && _b !== void 0 ? _b : ""; if (t && t !== this.owner)
        this.owner = t, this.hall.close(), this.context.enter(t); }
    select(t) { var _a; let r = (_a = this.context.presentation.rooms.hall) === null || _a === void 0 ? void 0 : _a.actors.find((e) => e.id === t); if (this.role = r === null || r === void 0 ? void 0 : r.roleKey, this.hall.close(), this.tables.reset(), r && this.context.context) {
        let e = r.conversation.renderer;
        if (e === "sect.hall.registry" || e === "sect.hall.stipend")
            this.hall.open(e.endsWith("registry") ? "registry" : "stipend", this.context.context.sectId);
    } this.u.invalidate(); }
    room(t) { var _a; let r = this.u, e = this.context, i = this.hall, n = e.presentation.rooms.hall, a = n === null || n === void 0 ? void 0 : n.actors.find((o) => o.roleKey === this.role); if (!n) {
        let o = new official_chunk_wje6zqc2_js_1.Ce(r, t);
        return o.text("此处的经办人尚未到值，请稍后再来。"), o;
    } if (!a)
        return (0, official_chunk_nx6d9wvp_js_1.rb)(r, t, { eyebrow: "身份玉牒 · 俸册名录", description: n.description, actors: n.actors, select: (o) => this.select(o), prompt: n.actors.some((o) => o.appearance === "facility") ? "点击人物或设施，查看详情" : "点击人物，与其交谈" }); let s; if (i.topic === "members" && i.members || i.topic === "ranking" && i.ranking)
        s = this.tables.flow(t - 2, i);
    else {
        let o = [{ speaker: a.name, body: a.greeting }], b = [];
        if (i.actor === "registry") {
            if (i.topic === "identity" && e.context)
                o.push({ speaker: a.name, body: [{ text: "玉牒上记的是" }, { text: official_chunk_89xwxnzm_js_1.Y[(_a = e.context.discipleRank) !== null && _a !== void 0 ? _a : "registered"], color: official_chunk_wje6zqc2_js_1.Be.crimson, bold: !0 }, { text: "，功簿尚余" }, { text: `${e.context.contribution.toLocaleString("zh-CN")}点贡献`, color: official_chunk_wje6zqc2_js_1.Be.crimson, bold: !0 }, { text: "。若要问晋升条件或正式晋升，去事务堂请教传功长老即可。" }] });
            if (i.topic === "announcement")
                o.push({ speaker: a.name, body: e.presentation.announcement, tone: "attention" });
            b.push({ id: "identity", label: "请执事替我查验身份玉牒" }, { id: "members", label: "我想翻看同门名录" }, { id: "announcement", label: "请问宗门近来有何公告" }, { id: "ranking", label: "我想查看宗门贡献榜" });
        }
        else if (i.actor === "stipend") {
            let p = i.stipend;
            if (p)
                o.push({ speaker: a.name, tone: i.claimed ? "attention" : "normal", body: p.claimed ? i.claimed ? [{ text: "本周周俸已经入账，实际领取" }, { text: `${p.spiritStones.toLocaleString("zh-CN")}枚灵石`, color: official_chunk_wje6zqc2_js_1.Be.crimson, bold: !0 }, { text: "。" }] : "本周周俸已经入账，俸册上没有欠项。" : [{ text: "本周应发" }, { text: `${p.spiritStones.toLocaleString("zh-CN")}枚灵石`, color: official_chunk_wje6zqc2_js_1.Be.crimson, bold: !0 }, { text: "。核对无误便可领取。" }] });
            if (!(p === null || p === void 0 ? void 0 : p.claimed))
                b.push({ id: "claim", label: "有劳执事将本周俸禄入账" });
        }
        else
            o.push({ speaker: a.name, body: "这项事务眼下还无法办理，请稍后再来。", tone: "attention" });
        b.push({ id: "leave", label: "弟子告退", tone: "muted" }), s = (0, official_chunk_nx6d9wvp_js_1.sb)(r, t - 2, a, o, b, (p) => { if (p === "leave")
            this.select();
        else if (p === "claim")
            i.claim();
        else
            i.select(p); }, i.loading || i.submitting, i.error || e.error);
    } let h = new official_chunk_wje6zqc2_js_1.Ce(r, t); return h.block(s.height + 2, (o, b) => { r.rect(o, b, t, s.height + 2, "rgba(248,243,230,.42)"), r.ctx.save(), r.ctx.strokeStyle = "rgba(44,24,16,.2)", r.ctx.setLineDash([]), r.ctx.strokeRect(o + 0.5, b + 0.5, t - 1, s.height + 1), r.ctx.restore(), s.paint(o + 1, b + 1); }), h; }
    paint(t, r) { var _a, _b, _c; this.sync(); let e = this.u, i = this.context, n = e.width - 56, a = i.presentation.scenes.hall, s = new official_chunk_wje6zqc2_js_1.Ce(e, n), h = a.title, o = a.description; if (this.requested && i.context) {
        let v = (_a = i.presentation.rooms.hall) === null || _a === void 0 ? void 0 : _a.actors.find((M) => M.roleKey === this.requested);
        if (this.requested = void 0, v && ((_b = i.context.permissions["sect.hall.view"]) === null || _b === void 0 ? void 0 : _b.granted))
            this.select(v.id);
    } if (i.error)
        h = "宗门卷宗暂不可用", o = "传讯玉符未能接通宗门执事，可重新尝试读取。", s.text(i.error, 14, 28, official_chunk_wje6zqc2_js_1.Be.crimson), s.block(32.32, (v, M) => e.button("重新读取", v, M, () => { i.reload(); }));
    else if (!i.context)
        s.text(a.loadingText, 14, 28, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
    else {
        let v = i.context.permissions["sect.hall.view"];
        if (!(v === null || v === void 0 ? void 0 : v.granted))
            o = a.permissionDeniedDescription;
        let M = n - 34, l = (v === null || v === void 0 ? void 0 : v.granted) ? this.room(M) : new official_chunk_wje6zqc2_js_1.Ce(e, M);
        if (!(v === null || v === void 0 ? void 0 : v.granted))
            l.text((_c = v === null || v === void 0 ? void 0 : v.reason) !== null && _c !== void 0 ? _c : "当前弟子身份尚未获得此设施权限。", 14, 28, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
        let $ = 107.32 + l.height;
        s.block($, (S, P) => { let K = e.ctx; K.save(), e.clip(S, P, n, $, () => { let z = K.createLinearGradient(0, P, 0, P + $); z.addColorStop(0, "rgba(250,244,224,.92)"), z.addColorStop(1, "rgba(242,229,199,.5)"), K.fillStyle = z, K.fillRect(S, P, n, $); let H = K.createRadialGradient(S + n / 2, P, 0, S + n / 2, P, Math.max(n, $) * 0.44); H.addColorStop(0, "rgba(146,83,37,.18)"), H.addColorStop(1, "rgba(146,83,37,0)"), K.fillStyle = H, K.fillRect(S, P, n, $), K.globalAlpha = 0.05, e.text("殿", S + n - 160, P + 40, 144, official_chunk_wje6zqc2_js_1.Be.ink), K.globalAlpha = 1; }), K.strokeStyle = "rgba(120,53,15,.2)", K.strokeRect(S + 0.5, P + 0.5, n - 1, $ - 1), K.restore(), e.button("返回宗门总视图", S + 17, P + 21, () => this.navigate("/game/sect"), official_chunk_wje6zqc2_js_1.Be["ink-secondary"]); let D = official_chunk_89xwxnzm_js_1.ua.registry.require(i.context.sectId).definition.name, j = e.trackedWidth(D, 12, 4.2); K.save(), K.globalAlpha = 0.5, e.tracked(D, S + n - 17 - j, P + 37.16, 12, 4.2, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), K.restore(), e.rect(S + 17, P + 65.32, M, 1, "rgba(44,24,16,.1)"), l.paint(S + 17, P + 86.32); });
    } let b = e.lines(o, n, 14), p = 84.2 + Math.max(0, b.length - 1) * 24, f = p + 20 + s.height + 16, m = t + 12 - e.scroll; e.clip(0, t, e.width, r - t, () => { e.rect(12, m, e.width - 24, f, "rgba(248,243,230,.82)"), e.text(h, 28, m + 28, 23.2, official_chunk_wje6zqc2_js_1.Be.ink, e.headingFont); let v = 36 + e.measure(h, 23.2, e.headingFont); e.text("/", v, m + 31, 14, official_chunk_wje6zqc2_js_1.Be["battle-muted"]), e.tracked("修行", v + 14, m + 31, 12.48, 1.9968, official_chunk_wje6zqc2_js_1.Be["battle-muted"]), b.forEach((M, l) => e.text(M, 28, m + 60 + l * 24, 14, official_chunk_wje6zqc2_js_1.Be["ink-secondary"])), e.line(28, m + p - 1, n), s.paint(28, m + p + 20); }), e.scrollMax = Math.max(0, t + 24 + f - r); }
}
exports.SectHallPage = ee;
var ir = () => ({ inFlight: !1 });
function ie(t, r) { var _a; if (t.inFlight)
    return { state: t }; let e = (_a = t.key) !== null && _a !== void 0 ? _a : r(); return { state: { key: e, inFlight: !0 }, key: e }; }
function ne(t) { return { ...t, inFlight: !1 }; }
function ae(t, r) { if (!t)
    return { kind: "join" }; if (t === r)
    return { kind: "navigate", href: "/game/sect" }; return { kind: "navigate", href: `/game/sect/${encodeURIComponent(r)}/visit` }; }
var nr = () => ({ actIndex: 0, revealed: !1 });
function se(t, r) { if (!t.revealed)
    return { ...t, revealed: !0 }; if (t.actIndex >= r - 1)
    return t; return { actIndex: t.actIndex + 1, revealed: !1 }; }
function oe(t) { if (t.actIndex === 0)
    return t; return { actIndex: t.actIndex - 1, revealed: !0 }; }
class Wt {
    constructor(t, r, e, i = () => (0, official_chunk_nx6d9wvp_js_1.zb)()) {
        this.sectId = "";
        this.entry = "";
        this.busy = !1;
        this.error = "";
        this.state = nr();
        this.cueStart = 0;
        this.attempt = ir();
        this.generation = 0;
        this.home = t;
        this.changed = r;
        this.navigate = e;
        this.now = i;
    }
    enter(t) { var _a, _b, _c; this.leave(); let r = new URLSearchParams((_a = t.split("?")[1]) !== null && _a !== void 0 ? _a : ""); this.sectId = (_b = r.get("sectId")) !== null && _b !== void 0 ? _b : "", this.entry = (_c = r.get("entry")) !== null && _c !== void 0 ? _c : "", this.state = nr(), this.attempt = ir(), this.cueStart = this.now(), this.error = ""; }
    leave() { this.generation++, this.busy = !1; }
    get catalog() { var _a, _b; let t = (_b = (_a = this.home.baseline) === null || _a === void 0 ? void 0 : _a.resources.profile) === null || _b === void 0 ? void 0 : _b.data.cultivator; if (!t)
        return; return official_chunk_89xwxnzm_js_1.ua.registry.listDefinitions().filter((r) => { var _a; return official_chunk_89xwxnzm_js_1.ua.registry.require(r.id).checkAdmission({ playerRace: (_a = t.playerRace) !== null && _a !== void 0 ? _a : "human", realm: t.realm, stage: t.realm_stage }).allowed; }).map((r) => ({ id: r.id, name: r.name, onboarding: (0, official_chunk_89xwxnzm_js_1.Na)(r.id).onboarding, paths: official_chunk_89xwxnzm_js_1.M[r.id].paths.map((e) => e.name).join(" · ") })); }
    get selected() { var _a; return (_a = this.catalog) === null || _a === void 0 ? void 0 : _a.find((t) => t.id === this.sectId); }
    get activeSectId() { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = this.home.baseline) === null || _a === void 0 ? void 0 : _a.resources.session) === null || _b === void 0 ? void 0 : _b.data.activeCultivator) === null || _c === void 0 ? void 0 : _c.sectId) !== null && _d !== void 0 ? _d : null; }
    get transfer() { return this.entry === "transfer" && this.activeSectId === this.sectId; }
    get script() { var _a, _b; return (_b = (_a = this.selected) === null || _a === void 0 ? void 0 : _a.onboarding) === null || _b === void 0 ? void 0 : _b.script; }
    get act() { var _a; return (_a = this.script) === null || _a === void 0 ? void 0 : _a.acts[this.state.actIndex]; }
    get final() { var _a, _b; return this.state.actIndex === ((_b = (_a = this.script) === null || _a === void 0 ? void 0 : _a.acts.length) !== null && _b !== void 0 ? _b : 0) - 1; }
    get text() {
        var _a, _b;
        return [(_a = this.act) === null || _a === void 0 ? void 0 : _a.body, (_b = this.act) === null || _b === void 0 ? void 0 : _b.speaker].filter(Boolean).join(`

`);
    }
    get elapsed() { return Math.max(0, this.now() - this.cueStart); }
    get revealed() { return this.state.revealed || this.elapsed >= 260 + this.text.length * 34; }
    get shown() { return this.revealed ? this.text : this.text.slice(0, this.elapsed < 260 ? 0 : Math.floor((this.elapsed - 260) / 34) + 1); }
    get finalLabel() { var _a, _b; return this.transfer ? `进入${(_a = this.selected) === null || _a === void 0 ? void 0 : _a.name}` : !this.activeSectId ? `拜入${(_b = this.selected) === null || _b === void 0 ? void 0 : _b.name}` : this.activeSectId === this.sectId ? "返回宗门" : "返回宗门舆图"; }
    advance() { if (this.busy || !this.script)
        return; let t = this.state.actIndex; if (this.state = se({ ...this.state, revealed: this.revealed }, this.script.acts.length), t !== this.state.actIndex)
        this.cueStart = this.now(); this.changed(); }
    rewind() { if (this.busy)
        return; this.state = oe(this.state), this.cueStart = this.now(), this.changed(); }
    back() { if (this.busy)
        return; let t = (0, official_chunk_21q7yjsr_js_1.ab)(this.sectId); this.navigate(this.transfer ? "/game/sect" : this.activeSectId ? t ? `/game/map-v2?intent=sect&nodeId=${encodeURIComponent(t.id)}` : "/game/map-v2?intent=sect" : "/game/sect/onboarding"); }
    async finish() { if (this.busy || !this.selected || !this.final || !this.revealed)
        return; let t = ae(this.activeSectId, this.sectId); if (this.transfer || t.kind === "navigate") {
        this.navigate(this.transfer ? "/game/sect" : t.kind === "navigate" ? t.href : "/game/sect");
        return;
    } let r = ie(this.attempt, official_chunk_wje6zqc2_js_1.Ee); if (this.attempt = r.state, !r.key)
        return; let e = this.generation; this.busy = !0, this.error = "", this.changed(); try {
        if (await (0, official_chunk_h2eh160v_js_1.Gb)(`/api/sects/${encodeURIComponent(this.sectId)}/join`, "POST", void 0, void 0, { "Idempotency-Key": r.key }), e !== this.generation)
            return;
        if (await this.home.load(), e === this.generation)
            this.navigate("/game/sect");
    }
    catch (_a) {
        if (e === this.generation)
            this.error = "玉牒未能落印，请再试一次。";
    }
    finally {
        if (e === this.generation)
            this.attempt = ne(this.attempt), this.busy = !1, this.changed();
    } }
}
exports.SectOnboardingModel = Wt;
class he {
    constructor(t, r, e) {
        this.assets = new official_chunk_89xwxnzm_js_1.Xa;
        this.assetError = "";
        this.generation = 0;
        this.u = t;
        this.home = r;
        this.navigate = e;
        this.model = new Wt(r, () => t.invalidate(), e);
    }
    enter(t) { this.leave(), this.model.enter(t), this.load(), this.timer = setInterval(() => this.u.invalidate(), 34); }
    leave() { this.generation++, clearInterval(this.timer), this.timer = void 0, this.assets.resetPending(), this.model.leave(); }
    async load() { let t = this.generation; this.assetError = ""; try {
        let r = await this.assets.load();
        if (t === this.generation)
            this.images = r;
    }
    catch (r) {
        if (t === this.generation)
            this.assetError = r instanceof Error ? r.message : "入宗素材加载失败";
    }
    finally {
        if (t === this.generation)
            this.u.invalidate();
    } }
    backdrop(t, r, e, i, n, a = "50% 50%", s = 1) { var _a; let h = (_a = this.images) === null || _a === void 0 ? void 0 : _a.get(t); if (!h)
        return; let o = this.u, b = o.ctx, [p, f] = a.split(" ").map((l) => parseFloat(l) / 100), m = Math.max(i / h.width, n / h.height), v = h.width * m, M = h.height * m; o.clip(r, e, i, n, () => { b.save(), b.translate(r + i / 2, e + n / 2), b.scale(s, s), b.drawImage(h, -i / 2 + (i - v) * (Number.isFinite(p) ? p : 0.5), -n / 2 + (n - M) * (Number.isFinite(f) ? f : 0.5), v, M), b.restore(); }); }
    gradient(t, r, e, i, n) { let a = this.u.ctx, s = a.createLinearGradient(0, r, 0, r + i); for (let [h, o] of n)
        s.addColorStop(h, o); a.fillStyle = s, a.fillRect(t, r, e, i); }
    paint() { let t = this.u, r = this.model; if (t.scrollTopInset = t.scrollBottomInset = 0, this.assetError) {
        t.rect(0, 0, t.width, t.height, "#131713"), t.paragraph(this.assetError, 24, t.height / 2 - 50, t.width - 48, 14, 28, "#d7cbb3"), t.button("再候一阵", 24, t.height / 2 + 30, () => void this.load(), "#f0c77b");
        return;
    } let e = r.catalog; if (!e) {
        t.rect(0, 0, t.width, t.height, "#131713"), t.paragraph("诸宗山门正在云外显现……", 24, t.height / 2, t.width - 48, 14, 28, "#f3ecdc");
        return;
    } if (r.sectId) {
        if (!r.selected) {
            this.navigate("/game/sect/onboarding");
            return;
        }
        this.stage();
        return;
    } t.rect(0, 0, t.width, t.height, "#e8e1d1"); let i = t.width - 32, n = new official_chunk_wje6zqc2_js_1.Ce(t, i); n.block(16, (s, h) => t.tracked("尘世初行 · 山门在望", s, h + 8, 12, 3.6, "#765e49")), n.gap(12), n.block(36, (s, h) => t.tracked("诸宗候君", s, h + 18, 30, 4.8, "#241d17")), n.gap(20), n.text("你走出尘世第一步，前方云路分作不同方向。山门都没有催你，只把各自的钟声送到风里。先入山一观，再决定今后与谁同行。", 16, 32, "#5e5043"), n.gap(36); for (let s of e) {
        let h = s.onboarding;
        if (!h)
            continue;
        let o = new official_chunk_wje6zqc2_js_1.Ce(t, i - 48);
        o.block(32, (M, l) => t.tracked(s.name, M, l + 16, 24, 3.36, "#f4eddd")), o.gap(16), o.text(h.summary, 16, 32, "#e4dac5"), o.gap(16);
        let b = [], p = 0, f = [];
        for (let M of h.traits) {
            let l = `· ${M}`, $ = t.measure(l, 14);
            if (b.length && p + $ > o.width)
                f.push(b), b = [], p = 0;
            b.push(l), p += $ + 16;
        }
        if (b.length)
            f.push(b);
        o.block(f.length * 20 + Math.max(0, f.length - 1) * 8, (M, l) => f.forEach(($, S) => { let P = 0; for (let K of $)
            t.text(K, M + P, l + 10 + S * 28, 14, "#d4c19b"), P += t.measure(K, 14) + 16; })), o.gap(16);
        let m = new official_chunk_wje6zqc2_js_1.Ce(t, o.width - 17);
        m.block(16, (M, l) => t.tracked("宗门根基", M, l + 8, 12, 2.4, "#d4c19b")), m.gap(4), m.text(s.paths, 14, 20, "#f2d69c", !0), m.gap(4), m.text("入宗后可修习六心法，选择流派并参悟经脉。", 14, 24, "#ded2ba"), o.block(m.height, (M, l) => { t.rect(M, l, 1, m.height, "rgba(212,193,155,.5)"), m.paint(M + 17, l); }), o.gap(20), o.block(32.32, (M, l) => t.button("入山一观", M, l, () => this.navigate(`/game/sect/onboarding?sectId=${encodeURIComponent(s.id)}`), "#f2c977"));
        let v = Math.max(448, o.height + 48);
        n.block(v, (M, l) => { t.rect(M, l, i, v, "#1d211d"), this.backdrop(s.id, M, l, i, v), this.gradient(M, l, i, v, [[0, "rgba(9,13,12,.12)"], [0.72, "rgba(9,13,12,.88)"], [1, "rgba(9,13,12,.97)"]]), t.ctx.save(), t.ctx.strokeStyle = "rgba(44,36,29,.15)", t.ctx.strokeRect(M + 0.5, l + 0.5, i - 1, v - 1), t.ctx.restore(), o.paint(M + 24, l + v - 24 - o.height); }), n.gap(20);
    } let a = Math.max(t.safeTop + 32, t.menuBottom + 12); t.clip(0, a, t.width, t.height - a - t.bottom, () => n.paint(16, a - t.scroll)), t.scrollMax = Math.max(0, a + n.height + t.bottom + 12 - t.height); }
    stage() {
        var _a;
        let t = this.u, r = this.model, e = r.script, i = r.act, n = t.width - 40, a = new official_chunk_wje6zqc2_js_1.Ce(t, n);
        a.block(1, (H, G) => { let Z = 0; e.acts.forEach((O, I) => { let q = I === r.state.actIndex ? 40 : 20; t.rect(H + Z, G, q, 1, I === r.state.actIndex ? "#e8d6a9" : I < r.state.actIndex ? "rgba(232,214,169,.65)" : "rgba(255,255,255,.25)"), Z += q + 8; }); }), a.gap(20), a.block(20, (H, G) => t.tracked(i.title, H, G + 10, 14, 3.36, "#d8cba9")), a.gap(16);
        let s = r.shown.split(`
`).flatMap((H) => H ? t.lines(H, n, 16) : [""]), h = Math.max(160, s.length * 32);
        if (a.block(h, (H, G) => { if (s.forEach((Z, O) => t.text(Z, H, G + 16 + O * 32, 16, "#f6f0e2")), !r.revealed && s.length)
            t.text("▌", H + t.measure(s.at(-1), 16) + 4, G + 16 + (s.length - 1) * 32, 16, "#d8cba9"); }), r.error)
            a.gap(16), a.text(r.error, 14, 28, "#f0b7a7");
        a.gap(24), a.block(1, (H, G) => t.rect(H, G, n, 1, "rgba(255,255,255,.15)")), a.gap(16);
        let o = [];
        if (r.state.actIndex > 0)
            o.push({ label: "上一幕", run: () => { r.rewind(), t.scroll = 0; }, color: "#d9cfba" });
        if (!r.final || !r.revealed)
            o.push({ label: "继续", run: () => { r.advance(), t.scroll = 0; }, color: "#f0c77b" });
        else if (o.push({ label: r.busy ? r.transfer ? "正在进入宗门……" : "玉牒落印中……" : r.finalLabel, run: () => void r.finish(), color: "#f0c77b" }), !r.transfer)
            o.push({ label: "再看看其他宗门", run: () => r.back(), color: "#d9cfba" });
        let b = 0, p = 0;
        for (let H of o) {
            let G = t.buttonWidth(H.label);
            if (b && b + G > n)
                b = 0, p += 40.32;
            let Z = b, O = p;
            a.block(0, (I, q) => t.inert(r.busy, () => t.button(H.label, I + Z, q + O, H.run, H.color))), b += G + 20;
        }
        a.gap(Math.max(32.32, p + 32.32));
        let f = Math.max(t.safeTop + 20, t.menuBottom + 12), m = r.transfer ? n : Math.max(100, n - t.buttonWidth("返回诸宗") - 20), v = t.lines(e.title, m, 20), M = 24 + v.length * 28, l = Math.max(f + M + 96, t.height - t.bottom - 20 - a.height), $ = l + a.height + 20 + t.bottom, S = -t.scroll;
        t.rect(0, 0, t.width, t.height, "#111713");
        let P = Math.min(1, r.elapsed / 18000), K = 0, D = 1;
        for (let H = 0; H < 16; H++) {
            let G = (K + D) / 2;
            if (3 * (1 - G) * G * G * 0.58 + G * G * G < P)
                K = G;
            else
                D = G;
        }
        let j = (K + D) / 2, z = 3 * (1 - j) * j * j + j * j * j;
        if (this.backdrop(r.sectId, 0, S, t.width, $, i.backgroundPosition, 1.03 + 0.05 * z), t.rect(0, S, t.width, $, { mist: "rgba(8,51,68,.1)", steel: "rgba(2,6,23,.15)", ember: "rgba(69,10,10,.15)", stillness: "rgba(12,10,9,.2)" }[(_a = i.tone) !== null && _a !== void 0 ? _a : e.theme]), this.gradient(0, S, t.width, $, [[0, "rgba(7,12,11,.14)"], [0.44, "rgba(7,12,11,.36)"], [1, "rgba(7,12,11,.94)"]]), t.tracked(i.scene, 20, S + f + 8, 12, 3.36, "#d8cba9"), v.forEach((H, G) => t.tracked(H, 20, S + f + 24 + 14 + G * 28, 20, 3.6, "#f5efdf")), !r.transfer)
            t.inert(r.busy, () => t.button("返回诸宗", t.width - 20 - t.buttonWidth("返回诸宗"), S + f, () => r.back(), "#e7dcc3"));
        a.paint(20, S + l), t.scrollMax = Math.max(0, $ - t.height);
    }
}
exports.SectOnboardingPage = he;
class Yt {
    constructor(t) {
        this.mode = "visitor";
        this.sectId = "";
        this.tasks = new official_chunk_89xwxnzm_js_1.Ma(t);
    }
    enter(t, r) { this.leave(), this.sectId = t, this.tasks.open(r); }
    leave() { this.tasks.close(); }
    get definition() { var _a; return (_a = official_chunk_89xwxnzm_js_1.ua.registry.get(this.sectId)) === null || _a === void 0 ? void 0 : _a.definition; }
    get landmark() { return (0, official_chunk_21q7yjsr_js_1.ab)(this.sectId); }
    get presentation() { return (0, official_chunk_89xwxnzm_js_1.Na)(this.sectId); }
    get worldHref() { return this.landmark ? `/game/map-v2?intent=sect&nodeId=${encodeURIComponent(this.landmark.id)}` : "/game/map-v2?intent=sect"; }
    get visitHref() { return `/game/sect/${encodeURIComponent(this.sectId)}/visit`; }
    get bounty() { var _a; return (_a = this.tasks.data) === null || _a === void 0 ? void 0 : _a.items.find((t) => { var _a; return t.definitionId === "weekly_bounty_battle" && (t.state === "active" || t.state === "claimable") && ((_a = t.battleTarget) === null || _a === void 0 ? void 0 : _a.sectId) === this.sectId; }); }
    get visitorEntry() { var _a; return ((_a = this.bounty) === null || _a === void 0 ? void 0 : _a.state) === "active" ? { hotspotId: "gate", label: "前往山门查探悬赏目标", route: `/game/sect/${encodeURIComponent(this.sectId)}/gate` } : void 0; }
    state(t) { return (0, official_chunk_89xwxnzm_js_1.Pa)(t, "visitor", new Map); }
    description(t) { var _a; return (_a = this.state(t).reason) !== null && _a !== void 0 ? _a : t.note; }
}
exports.SectVisitModel = Yt;
class Xt {
    constructor() {
        this.scale = 1;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.contentWidth = 760;
        this.contentHeight = 427.7272727272727;
    }
    setViewport(t, r, e = 1.7768331562167907) { if (this.width === t && this.height === r && this.contentHeight === 760 / e)
        return; this.width = t, this.height = r, this.contentHeight = 760 / e, this.reset(); }
    reset() { this.scale = 1, this.x = (this.width - this.contentWidth) / 2, this.y = (this.height - this.contentHeight) / 2, this.constrain(); }
    constrain() { let t = this.contentWidth * this.scale, r = this.contentHeight * this.scale; this.x = t <= this.width ? (this.width - t) / 2 : Math.max(this.width - t, Math.min(0, this.x)), this.y = r <= this.height ? (this.height - r) / 2 : Math.max(this.height - r, Math.min(0, this.y)); }
    pan(t, r) { this.x += t, this.y += r, this.constrain(); }
    zoom(t, r = this.width / 2, e = this.height / 2) { let i = this.scale; this.scale = Math.max(1, Math.min(3, t)); let n = this.scale / i; this.x = r - (r - this.x) * n, this.y = e - (e - this.y) * n, this.constrain(); }
    locate(t, r) { this.scale = 1.35, this.x = this.width / 2 - parseFloat(t) / 100 * this.contentWidth * this.scale, this.y = this.height / 2 - parseFloat(r) / 100 * this.contentHeight * this.scale, this.constrain(); }
    point(t, r) { return { x: this.x + parseFloat(t) / 100 * this.contentWidth * this.scale, y: this.y + parseFloat(r) / 100 * this.contentHeight * this.scale }; }
}
exports.SectMapCamera = Xt;
var Ue = new Set(["lingxiao", "wuxiang", "tianyan", "youdu", "jiujie"]);
class Bt {
    constructor() {
        this.images = new official_chunk_21q7yjsr_js_1.hb(2);
        this.pending = new Map;
        this.cancellations = new Set;
        this.generation = 0;
        (0, official_chunk_21q7yjsr_js_1.fb)(() => this.images.trim(1));
    }
    get(t) { return this.images.get(t); }
    resetPending() { this.generation++; for (let t of this.cancellations)
        t(); this.cancellations.clear(), this.pending.clear(), this.images.clear(); }
    load(t) { var _a; let r = this.images.get(t); if (r)
        return Promise.resolve(r); let e = this.pending.get(t); if (e)
        return e; let i = (_a = /^\/assets\/sect\/([a-z]+)-map\.webp$/.exec(t)) === null || _a === void 0 ? void 0 : _a[1]; if (!i || !Ue.has(i))
        return Promise.reject(Error("宗门舆图资源未收录")); let n = this.generation, a = new Promise((s, h) => { let o = !1, b, p = (v) => { if (o)
        return; if (o = !0, clearTimeout(m), this.cancellations.delete(f), b)
        b.onload = null, b.onerror = null; if (v)
        h(v);
    else if (b && n === this.generation)
        this.images.set(t, b), s(b);
    else
        h(Error("宗门舆图读取已取消")); }, f = () => p(Error("宗门舆图读取已取消")), m = setTimeout(() => p(Error("宗门舆图加载超时，请重试。")), 120000); this.cancellations.add(f); try {
        official_chunk_wje6zqc2_js_1.De.loadSubpackage({ name: `sect-map-${i}`, success: () => { if (o || n !== this.generation)
                return; b = official_chunk_wje6zqc2_js_1.De.createImage(), b.onload = () => p(), b.onerror = () => p(Error("宗门舆图加载未成，请重试。")), b.src = GameGlobal.__remoteAssetPath(`sect-map-${i}/map.jpg`); }, fail: () => p(Error("宗门舆图加载未成，请重试。")) });
    }
    catch (_a) {
        p(Error("宗门舆图加载未成，请重试。"));
    } }); return this.pending.set(t, a), a.finally(() => { if (this.pending.get(t) === a)
        this.pending.delete(t); }).catch(() => { }), a; }
}
exports.SectMapAssets = Bt;
class Rt {
    constructor(t, r, e, i) {
        this.distance = 0;
        this.moved = !1;
        this.pinched = !1;
        this.left = 0;
        this.top = 0;
        this.start = (t) => { let r = this.points(t); if (!r.length)
            return; if (!this.last)
            this.origin = r[0], this.moved = !1, this.pinched = !1; if (this.last = this.center(r), this.distance = this.separation(r), r.length > 1)
            this.pinched = !0, this.gesture(); };
        this.move = (t) => { let r = this.points(t); if (!r.length || !this.last)
            return; let e = this.center(r), i = this.separation(r); if (r.length > 1) {
            if (this.pinched = !0, this.moved = !0, this.gesture(), this.distance > 0)
                this.camera.zoom(this.camera.scale * i / this.distance, this.last.x, this.last.y), this.camera.pan(e.x - this.last.x, e.y - this.last.y);
        }
        else if (this.distance === 0) {
            if (this.origin && Math.hypot(e.x - this.origin.x, e.y - this.origin.y) > 6)
                this.moved = !0;
            if (this.moved)
                this.gesture(), this.camera.pan(e.x - this.last.x, e.y - this.last.y);
        } this.last = e, this.distance = i, this.changed(); };
        this.end = (t) => { let r = this.points(t); if (r.length) {
            this.last = this.center(r), this.distance = this.separation(r);
            return;
        } let e = this.origin, i = !this.moved && !this.pinched; if (this.cancel(), i && e)
            this.tap(e); this.changed(); };
        this.cancel = () => { this.last = void 0, this.origin = void 0, this.distance = 0, this.moved = !1, this.pinched = !1; };
        this.camera = t;
        this.changed = r;
        this.tap = e;
        this.gesture = i;
    }
    points(t) { var _a; return Array.from((_a = t.touches) !== null && _a !== void 0 ? _a : [], (r) => ({ x: r.clientX - this.left, y: r.clientY - this.top })); }
    center(t) { return t.length > 1 ? { x: (t[0].x + t[1].x) / 2, y: (t[0].y + t[1].y) / 2 } : t[0]; }
    separation(t) { return t.length > 1 ? Math.hypot(t[0].x - t[1].x, t[0].y - t[1].y) : 0; }
}
exports.SectMapTouch = Rt;
class et {
    constructor(t, r, e) {
        this.camera = new Xt;
        this.assets = new Bt;
        this.directory = !1;
        this.hint = !0;
        this.source = "";
        this.error = "";
        this.generation = 0;
        this.u = t;
        this.model = r;
        this.navigate = e;
        this.touch = new Rt(this.camera, () => t.invalidate(), (i) => { let n = this.model.presentation.map.hotspots.map((a) => ({ spot: a, p: this.camera.point(a.left, a.top) })).filter(({ p: a }) => Math.abs(i.x - a.x) <= 14 && Math.abs(i.y - a.y) <= 14); if (n.sort((a, s) => Math.hypot(i.x - a.p.x, i.y - a.p.y) - Math.hypot(i.x - s.p.x, i.y - s.p.y)), n[0])
            this.select(n[0].spot); }, () => { this.hint = !1; });
    }
    reset() { this.generation++, this.assets.resetPending(), this.source = "", this.error = "", this.selected = void 0, this.directory = !1, this.hint = !0, this.touch.cancel(), this.camera.reset(); }
    load(t) { this.source = t, this.error = ""; let r = ++this.generation; this.assets.load(t).catch((e) => { if (r === this.generation)
        this.error = e instanceof Error ? e.message : "宗门舆图加载未成，请重试。"; }).finally(() => { if (r === this.generation)
        this.u.invalidate(); }); }
    select(t) { if (!this.model.state(t).selectable)
        return; this.selected = t.id, this.directory = !1, this.hint = !1, this.u.modalScroll = 0, this.u.invalidate(); }
    marker(t, r, e, i = !1) { let n = this.u.ctx; if (n.save(), i)
        n.beginPath(), n.arc(t, r, 13, 0, Math.PI * 2), n.fillStyle = "rgba(145,36,28,.3)", n.fill(), n.beginPath(), n.arc(t, r, 11, 0, Math.PI * 2), n.fillStyle = "rgba(250,245,230,.88)", n.fill(); let a = e ? n.createRadialGradient(t - 3, r - 4, 0, t, r, 9) : n.createLinearGradient(t - 7, r - 7, t + 7, r + 7); if (e)
        a.addColorStop(0, "#8c8177"), a.addColorStop(0.38, "#5f554d"), a.addColorStop(1, "#332b27");
    else
        a.addColorStop(0, "#d86b5c"), a.addColorStop(0.34, "#a93e34"), a.addColorStop(0.68, "#76221e"), a.addColorStop(1, "#4a110f"); if (n.shadowColor = "rgba(26,20,15,.42)", n.shadowBlur = 3, n.shadowOffsetY = 1, n.beginPath(), n.arc(t, r, 9, 0, Math.PI * 2), n.fillStyle = a, n.fill(), n.shadowBlur = 0, n.shadowOffsetY = 0, n.strokeStyle = e ? "rgba(248,243,230,.3)" : "rgba(248,243,230,.65)", n.lineWidth = 1, n.stroke(), !e) {
        let s = n.createRadialGradient(t - 3.6, r - 5, 0, t - 3.6, r - 5, 5);
        s.addColorStop(0, "rgba(255,235,229,.96)"), s.addColorStop(0.33, "rgba(255,210,198,.56)"), s.addColorStop(1, "rgba(255,210,198,0)"), n.beginPath(), n.arc(t, r, 8.5, 0, Math.PI * 2), n.fillStyle = s, n.fill();
    }
    else
        n.strokeStyle = "rgba(248,243,230,.75)", n.lineWidth = 0.8, n.strokeRect(t - 2.4, r - 0.8, 4.8, 3.6), n.beginPath(), n.moveTo(t - 1.35, r - 0.8), n.lineTo(t - 1.35, r - 1.75), n.arc(t, r - 1.75, 1.35, Math.PI, 0), n.lineTo(t + 1.35, r - 0.8), n.stroke(); n.restore(); }
    paint(t, r, e, i) { var _a; let n = this.u, a = n.ctx, s = this.model.presentation, h = s.map.image; if (!h)
        return; if (this.source !== h)
        this.load(h); this.camera.setViewport(e - 2, i - 2, (_a = s.map.aspectRatio) !== null && _a !== void 0 ? _a : 1.7768331562167907), this.touch.left = t + 1, this.touch.top = r + 1, n.rect(t, r, e, i, "#e9e1cf"); let o = this.assets.get(h), b = this.camera; n.clip(t + 1, r + 1, e - 2, i - 2, () => { if (o)
        a.drawImage(o, t + 1 + b.x, r + 1 + b.y, b.contentWidth * b.scale, b.contentHeight * b.scale); if (n.hit(t + 1, r + 1, e - 2, i - 2, () => { }, { surface: this.touch }), o)
        for (let m of s.map.hotspots) {
            let v = b.point(m.left, m.top), M = t + 1 + v.x, l = r + 1 + v.y, $ = this.model.state(m);
            if (a.save(), !$.selectable)
                a.globalAlpha *= 0.55;
            this.marker(M, l, $.locked, m.id === this.selected);
            let S = 0.88, P = n.trackedWidth(m.label, 11, S);
            a.save(), a.font = `600 11px ${n.bodyFont}`, a.textBaseline = "middle", a.lineWidth = 1.5, a.strokeStyle = "rgba(250,245,230,.96)", a.shadowColor = "rgba(26,20,15,.35)", a.shadowOffsetY = 1, a.shadowBlur = 3;
            let K = M - P / 2;
            for (let D of m.label)
                a.strokeText(D, K, l + 23), K += n.measure(D, 11) + S;
            a.restore(), n.tracked(m.label, M - P / 2, l + 23, 11, S, $.locked ? official_chunk_wje6zqc2_js_1.Be["ink-secondary"] : official_chunk_wje6zqc2_js_1.Be.crimson, !0), a.restore();
        } if (this.error)
        n.rect(t + 8, r + i / 2 - 42, e - 16, 84, "rgba(248,243,230,.95)"), n.paragraph(this.error, t + 20, r + i / 2 - 24, e - 40, 14, 24, official_chunk_wje6zqc2_js_1.Be.crimson), n.button("重试", t + 20, r + i / 2 + 8, () => this.load(h), official_chunk_wje6zqc2_js_1.Be.crimson); }), a.save(), a.strokeStyle = "rgba(44,24,16,.15)", a.setLineDash([]), a.strokeRect(t + 0.5, r + 0.5, e - 1, i - 1), a.restore(); let p = (m, v) => { n.rect(m, r + 10, v, 42, "rgba(248,243,230,.85)"), a.save(), a.strokeStyle = "rgba(44,24,16,.15)", a.strokeRect(m + 0.5, r + 10.5, v - 1, 41), a.restore(); }; p(t + 10, 82), n.text("设施名录", t + 23, r + 31, 14), n.hit(t + 10, r + 10, 82, 42, () => { this.directory = !0, n.modalScroll = 0, n.invalidate(); }); let f = t + e - 134; p(f, 124); for (let m = 0; m < 3; m++) {
        let v = f + 21 + m * 41, M = r + 31;
        if (a.save(), a.strokeStyle = official_chunk_wje6zqc2_js_1.Be["ink-secondary"], a.lineWidth = m === 2 ? 1.5 : 1.6, a.lineCap = "round", a.beginPath(), m < 2) {
            if (a.moveTo(v - 5, M), a.lineTo(v + 5, M), m === 1)
                a.moveTo(v, M - 5), a.lineTo(v, M + 5);
        }
        else
            a.arc(v, M, 6.3, 3.75, 8.9), a.moveTo(v - 6.5, M - 5.6), a.lineTo(v - 6.5, M - 3.4), a.lineTo(v - 4.3, M - 3.4);
        if (a.stroke(), a.restore(), m < 2)
            n.rect(f + 41 + m * 41, r + 18, 1, 26, "rgba(44,24,16,.1)");
        n.hit(f + 1 + m * 41, r + 11, 40, 40, () => { if (this.hint = !1, m === 2)
            b.reset();
        else
            b.zoom(b.scale + (m === 1 ? 0.3 : -0.3)); n.invalidate(); });
    } if (this.hint && !this.selected)
        n.rect(t + 10, r + i - 40, 158, 30, "rgba(248,243,230,.85)"), n.text("单指拖动 · 双指缩放", t + 20, r + i - 25, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]); }
    paintOverlay() { var _a; let t = this.u, r = this.model.presentation.map.hotspots; if (this.directory) {
        let a = new official_chunk_wje6zqc2_js_1.Ce(t, t.width - 32);
        r.forEach((s, h) => { if (h)
            a.block(1, (b, p) => t.line(b, p, a.width, "rgba(44,24,16,.1)")); let o = this.model.state(s); a.block(65, (b, p) => { var _a, _b; if (this.marker(b + 13, p + 32.5, o.locked), t.text(s.label, b + 38, p + 23, 14, official_chunk_wje6zqc2_js_1.Be.ink, t.bodyFont, !0), o.locked)
            t.text("未开放", b + 46 + t.measure(s.label, 14), p + 23, 12, official_chunk_wje6zqc2_js_1.Be.crimson); let f = (_b = (_a = o.reason) !== null && _a !== void 0 ? _a : s.note) !== null && _b !== void 0 ? _b : ""; while (f && t.measure(f, 12) > a.width - 70)
            f = f.slice(0, -2) + "…"; t.text(f, b + 38, p + 45, 12, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), t.text("→", b + a.width - 18, p + 32.5, 14, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), t.hit(b, p, a.width, 65, () => { if (!o.selectable)
            return; this.camera.locate(s.left, s.top), this.select(s); }); }); }), (0, official_chunk_wje6zqc2_js_1.He)(t, { title: "设施名录", rows: [], content: a }, () => { this.directory = !1, t.invalidate(); });
        return;
    } let e = r.find((a) => a.id === this.selected); if (!e)
        return; let i = this.model.state(e), n = new official_chunk_wje6zqc2_js_1.Ce(t, t.width - 32); n.text(i.locked ? "该设施当前尚未开放。" : "选择下方操作继续前往该设施。", 14, 28, i.locked ? official_chunk_wje6zqc2_js_1.Be.crimson : official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), (0, official_chunk_wje6zqc2_js_1.He)(t, { title: e.label, description: this.model.description(e), rows: [], content: n, actions: this.model.mode === "visitor" ? ((_a = this.model.visitorEntry) === null || _a === void 0 ? void 0 : _a.hotspotId) === e.id ? [{ label: this.model.visitorEntry.label, primary: !0, run: () => this.navigate(this.model.visitorEntry.route) }] : [] : !i.locked && e.route ? [{ label: `进入${e.label}`, primary: !0, run: () => this.navigate(e.route) }] : [] }, () => { this.selected = void 0, t.invalidate(); }); }
}
exports.SectMapView = et;
class Me {
    constructor(t, r, e) {
        this.owner = "";
        this.sectId = "";
        this.gate = !1;
        this.u = t;
        this.player = r;
        this.navigate = e;
        this.model = new Yt(() => t.invalidate()), this.map = new et(t, this.model, e);
    }
    enter(t) { var _a; this.leave(); let r = /^\/game\/sect\/([^/]+)\/(visit|gate)/.exec(t); try {
        this.sectId = decodeURIComponent((_a = r === null || r === void 0 ? void 0 : r[1]) !== null && _a !== void 0 ? _a : "");
    }
    catch (_b) {
        this.sectId = "";
    } this.gate = (r === null || r === void 0 ? void 0 : r[2]) === "gate"; }
    leave() { this.owner = "", this.model.leave(), this.map.reset(); }
    paint() { var _a, _b, _c, _d, _e; let t = this.u, r = this.model, e = (_a = this.player.view()) === null || _a === void 0 ? void 0 : _a.cultivator, i = (_b = e === null || e === void 0 ? void 0 : e.id) !== null && _b !== void 0 ? _b : ""; if (i && i !== this.owner)
        this.owner = i, r.enter(this.sectId, i); if (t.scrollTopInset = t.scrollBottomInset = 0, !this.gate && ((_e = (_d = (_c = this.player.baseline) === null || _c === void 0 ? void 0 : _c.resources.session) === null || _d === void 0 ? void 0 : _d.data.activeCultivator) === null || _e === void 0 ? void 0 : _e.sectId) === this.sectId) {
        this.navigate("/game/sect");
        return;
    } if (this.gate && !r.definition) {
        this.navigate("/game/map-v2?intent=sect");
        return;
    } let n = Math.max(t.safeTop + 88, this.gate ? 0 : t.menuBottom + 84), a = t.height - t.bottom - 24, s = n - t.scroll, h = t.width - 24, o = this.gate ? "返回访宗舆图" : "返回大世界", b = this.gate ? r.visitHref : r.worldHref; if (!this.gate)
        this.chrome(o, b); if (!r.definition || !r.landmark) {
        t.scrollMax = 0;
        let M = "山门不在此界", l = "舆图上没有找到这处宗门，或山门暂时隐入云外。";
        t.text(M, (t.width - t.measure(M, 20)) / 2, t.height / 2 - 44, 20), t.paragraph(l, 48, t.height / 2 - 12, t.width - 96, 14, 28, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), t.button("返回大世界", (t.width - t.trackedWidth("[返回大世界]", 15.2, 0)) / 2, t.height / 2 + 72, () => this.navigate(r.worldHref), official_chunk_wje6zqc2_js_1.Be.crimson);
        return;
    } if (this.gate) {
        if (!r.tasks.data) {
            t.scrollMax = 0, t.paragraph("正在核对悬赏令与山门来客……", 24, n, t.width - 48, 14, 28);
            return;
        }
        let M = r.bounty, l = M === null || M === void 0 ? void 0 : M.battleTarget;
        if (!M || !l) {
            this.navigate(r.visitHref);
            return;
        }
        let $ = M.state === "claimable", S = (0, official_chunk_nx6d9wvp_js_1.sb)(t, h - 2, { sigil: l.name.slice(0, 1), name: l.name, identity: `${r.definition.name}修士 · 悬赏目标`, responsibility: `${l.realm}${l.realmStage}` }, [{ body: $ ? "山门外的战局已经结束，悬赏回执也已写成。" : `山门禁制外，那名修士已经察觉你的来意。${l.description}`, tone: $ ? "attention" : "normal" }], [{ id: $ ? "affairs" : "battle", label: $ ? "返回本宗事务堂复命" : `向${l.name}发起挑战`, tone: "primary" }, { id: "leave", label: "返回访宗舆图", tone: "muted" }], (P) => this.navigate(P === "battle" ? (0, official_chunk_89xwxnzm_js_1.La)(M.definitionId, "sect.foreign-gate") : P === "affairs" ? "/game/sect/affairs" : r.visitHref));
        t.clip(0, n, t.width, a - n, () => { this.panel(12, s, h, S.height + 2), S.paint(13, s + 1); }), t.scrollMax = Math.max(0, S.height + 2 - (a - n));
        return;
    } let p = "外宗访客可远观诸院，只在山门与护山阵法外驻足，不得进入门内设施。", f = t.lines(p, h - 26, 14), m = Math.max(320, Math.min(t.height * 0.56, 427)) + 2, v = 26 + f.length * 28 + 12 + m; t.clip(0, n, t.width, a - n, () => { this.panel(12, s, h, v), f.forEach((M, l) => t.text(M, 25, s + 27 + l * 28, 14, official_chunk_wje6zqc2_js_1.Be["ink-secondary"])), this.map.paint(25, s + 13 + f.length * 28 + 12, h - 26, m); }), t.scrollMax = Math.max(0, v - (a - n)); }
    chrome(t, r) { let e = this.u, i = e.ctx, n = `[${t}]`, a = e.safeTop + 10.4, s = e.measure(n, 14) + 26, h = this.model.definition ? `${this.model.presentation.scenes.map.title} · 访宗` : "访宗舆图", o = Math.max(e.measure(h, 16), e.trackedWidth("人界 · 访宗舆图", 12, 1.44)) + 34, b = e.width - 12 - o, p = Math.max(a, e.menuBottom + 6), f = (m, v, M, l) => { e.rect(m, v, M, l, "rgba(248,243,230,.94)"), i.save(), i.strokeStyle = official_chunk_wje6zqc2_js_1.Be["battle-rule-strong"], i.setLineDash([2, 2]), i.strokeRect(m + 0.5, v + 0.5, M - 1, l - 1), i.restore(); }; f(12, a, s, 38), e.text(n, 25, a + 19, 14, official_chunk_wje6zqc2_js_1.Be["battle-muted"]), e.hit(12, a, s, 38, () => this.navigate(r)), f(b, p, o, 58), e.text(h, b + o - 17 - e.measure(h, 16), p + 21, 16, official_chunk_wje6zqc2_js_1.Be.ink, e.bodyFont, !0), e.tracked("人界 · 访宗舆图", b + o - 17 - e.trackedWidth("人界 · 访宗舆图", 12, 1.44), p + 41, 12, 1.44, official_chunk_wje6zqc2_js_1.Be["battle-muted"]); }
    panel(t, r, e, i) { let n = this.u; n.rect(t, r, e, i, "rgba(248,243,230,.92)"), n.ctx.save(), n.ctx.strokeStyle = "rgba(44,24,16,.15)", n.ctx.strokeRect(t + 0.5, r + 0.5, e - 1, i - 1), n.ctx.restore(); }
    paintOverlay() { if (!this.gate && this.model.definition && this.model.landmark)
        this.map.paintOverlay(); }
}
exports.SectVisitPage = Me;
class Ct {
    constructor(t, r, e, i) {
        this.targetSectId = "";
        this.reversePaths = !1;
        this.error = "";
        this.loading = !1;
        this.transferring = !1;
        this.active = !1;
        this.generation = 0;
        this.reader = 0;
        this.changed = t;
        this.refresh = r;
        this.navigate = e;
        this.inform = i;
    }
    enter() { this.leave(), this.active = !0, this.targetSectId = "", this.reversePaths = !1, this.preview = void 0, this.error = ""; }
    leave() { this.active = !1, this.generation++, this.reader++, this.loading = this.transferring = !1; }
    choose(t) { if (this.transferring)
        return; this.targetSectId = t, this.reversePaths = !1, this.loadPreview(); }
    reverse() { if (this.transferring || !this.targetSectId)
        return; this.reversePaths = !this.reversePaths, this.loadPreview(); }
    async loadPreview() { if (!this.active || !this.targetSectId)
        return; let t = ++this.reader, r = new URLSearchParams({ targetSectId: this.targetSectId, reversePaths: String(this.reversePaths) }); this.loading = !0, this.preview = void 0, this.error = "", this.changed(); try {
        let e = await (0, official_chunk_h2eh160v_js_1.Lb)(`/api/sects/current/transfer/preview?${r}`);
        if (this.active && t === this.reader)
            this.preview = e;
    }
    catch (e) {
        if (this.active && t === this.reader)
            this.error = e instanceof Error ? e.message : "转宗预览失败";
    }
    finally {
        if (this.active && t === this.reader)
            this.loading = !1, this.changed();
    } }
    get canTransfer() { var _a; return !!((_a = this.preview) === null || _a === void 0 ? void 0 : _a.talisman.id) && this.preview.talisman.available && !this.preview.hasClaimableTasks && !this.loading && !this.transferring; }
    async transfer() { if (!this.active || !this.canTransfer)
        return; let t = this.generation, r = this.preview; this.transferring = !0, this.changed(); try {
        if (await (0, official_chunk_h2eh160v_js_1.Gb)("/api/sects/current/transfer", "POST", { targetSectId: this.targetSectId, reversePaths: this.reversePaths, consumableId: r.talisman.id }, void 0, { "Idempotency-Key": (0, official_chunk_wje6zqc2_js_1.Ee)() }), !this.active || t !== this.generation)
            return;
        if (await this.refresh(), !this.active || t !== this.generation)
            return;
        this.inform(`转宗成功，你现在已加入${r.target.name}`), this.transferring = !1, this.navigate(`/game/sect/onboarding?sectId=${encodeURIComponent(r.target.sectId)}&entry=transfer`);
    }
    catch (e) {
        if (this.active && t === this.generation)
            this.inform(e instanceof Error ? e.message : "转宗失败");
    }
    finally {
        if (this.active && t === this.generation)
            this.transferring = !1, this.changed();
    } }
}
exports.SectTransferModel = Ct;
class ge {
    constructor(t, r, e) {
        this.confirming = !1;
        this.owner = "";
        this.u = t;
        this.home = r;
        this.navigate = e;
        this.model = new Ct(() => t.invalidate(), () => r.load(), e, official_chunk_wje6zqc2_js_1.Ge);
    }
    enter() { var _a, _b; this.owner = (_b = (_a = this.home.view()) === null || _a === void 0 ? void 0 : _a.cultivator.id) !== null && _b !== void 0 ? _b : "", this.confirming = !1, this.model.enter(); }
    leave() { this.confirming = !1, this.model.leave(); }
    card(t, r) { let e = this.u; t.block(r.height + 26, (i, n) => { e.rect(i, n, t.width, r.height + 26, "rgba(248,243,230,.5)"), e.ctx.save(), e.ctx.setLineDash([3, 3]), e.ctx.strokeStyle = "rgba(44,24,16,.2)", e.ctx.strokeRect(i + 0.5, n + 0.5, t.width - 1, r.height + 25), e.ctx.restore(), r.paint(i + 13, n + 13); }); }
    body(t) { var _a, _b, _c; let r = this.u, e = this.model, i = new official_chunk_wje6zqc2_js_1.Ce(r, t), n = (_c = (_b = (_a = this.home.baseline) === null || _a === void 0 ? void 0 : _a.resources.session) === null || _b === void 0 ? void 0 : _b.data.activeCultivator) === null || _c === void 0 ? void 0 : _c.sectId; if (!n)
        return i.block(32.32, (p, f) => r.button("前往诸宗山门", p, f, () => this.navigate("/game/sect/onboarding"))), i; let a = (p, f = !1) => { if (!f)
        i.gap(20), i.rule(), i.gap(16); i.text(`「${p}」`, 16, 28, official_chunk_wje6zqc2_js_1.Be.ink, !0), i.gap(12); }; a("选择目标宗门", !0); for (let p of Object.values(official_chunk_89xwxnzm_js_1.M).filter((f) => f.id !== n)) {
        let f = new official_chunk_wje6zqc2_js_1.Ce(r, t - 26);
        f.block(24, (m, v) => { if (r.text(p.name, m, v + 12, 16, official_chunk_wje6zqc2_js_1.Be.ink, r.bodyFont, !0), p.id === "jiujie")
            r.text("「新宗门」", m + f.width - r.measure("「新宗门」", 14), v + 12, 14, official_chunk_wje6zqc2_js_1.Be.crimson); }), f.gap(12), f.text(p.paths.map((m) => m.name).join(" · "), 14, 24, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), f.gap(12), f.block(32.32, (m, v) => r.inert(e.transferring, () => r.button(e.targetSectId === p.id ? "已选择" : "选择此宗", m, v, () => { this.confirming = !1, e.choose(p.id); }, e.targetSectId === p.id ? official_chunk_wje6zqc2_js_1.Be.crimson : official_chunk_wje6zqc2_js_1.Be["ink-secondary"]))), this.card(i, f), i.gap(24);
    } if (e.loading)
        i.text("正在计算转宗后的保留内容……", 14, 28, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]); if (e.error)
        i.text(e.error, 14, 28, official_chunk_wje6zqc2_js_1.Be.crimson); let s = e.preview; if (!s || e.loading)
        return i; a("转宗后的变化"); for (let [p, f] of [["弟子身份", official_chunk_89xwxnzm_js_1.Y[s.discipleRank]], ["当前贡献", s.contribution.toLocaleString("zh-CN")], ["历史总贡献", s.lifetimeContribution.toLocaleString("zh-CN")]]) {
        let m = new official_chunk_wje6zqc2_js_1.Ce(r, t - 26);
        m.text(p, 12, 16, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), m.gap(8), m.text(f, 16, 24, official_chunk_wje6zqc2_js_1.Be.ink, !0), this.card(i, m), i.gap(24);
    } a("心法等级保留"); for (let p of s.methodMappings) {
        let f = `Lv.${p.level} →`, m = r.measure(f, 14), v = (t - m - 24) / 2, M = r.lines(p.sourceMethodName, v, 14), l = r.lines(p.targetMethodName, v, 14), $ = Math.max(M.length, l.length) * 20 + 17;
        i.block($, (S, P) => { M.forEach((K, D) => r.text(K, S, P + 8 + ($ - 17 - M.length * 20) / 2 + 10 + D * 20, 14)), r.text(f, S + v + 12, P + ($ - 1) / 2, 14, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), l.forEach((K, D) => r.text(K, S + t - r.measure(K, 14), P + 8 + ($ - 17 - l.length * 20) / 2 + 10 + D * 20, 14)), r.rect(S, P + $ - 1, t, 1, "rgba(44,24,16,.1)"); }), i.gap(8);
    } i.gap(20), i.rule(), i.gap(16); let h = r.buttonWidth("交换两条流派对应"), o = r.lines("「流派进度保留」", t - h - 12, 16), b = Math.max(32.32, o.length * 28); i.block(b, (p, f) => { o.forEach((m, v) => r.text(m, p, f + (b - o.length * 28) / 2 + 14 + v * 28, 16, official_chunk_wje6zqc2_js_1.Be.ink, r.bodyFont, !0)), r.inert(e.transferring, () => r.button("交换两条流派对应", p + t - h, f + (b - 32.32) / 2, () => { this.confirming = !1, e.reverse(); }, official_chunk_wje6zqc2_js_1.Be["ink-secondary"])); }), i.gap(12), i.text("默认按顺序对应两条流派；如果想交换对应关系，可点击右上角按钮查看另一种结果。", 14, 24, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), i.gap(12); for (let p of s.pathMappings) {
        let f = new official_chunk_wje6zqc2_js_1.Ce(r, t - 26);
        f.text(`${p.sourcePathName} → ${p.targetPathName}`, 16, 24), f.gap(4), f.text(`转宗后保留已解锁${p.unlockedLayerCount}层${p.active ? " · 转宗后默认使用" : ""}`, 14, 20, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), this.card(i, f), i.gap(24);
    } a("落印前须知"); for (let p of s.warnings)
        i.text(`· ${p}`, 14, 24), i.gap(8); return i.gap(12), i.block(32.32, (p, f) => { let m = e.transferring ? "正在完成转宗……" : s.talisman.available ? s.hasClaimableTasks ? "请先领取任务奖励" : `使用${official_chunk_h2eh160v_js_1.me}` : `缺少${official_chunk_h2eh160v_js_1.me}`; if (r.ctx.save(), !e.canTransfer)
        r.ctx.globalAlpha *= 0.5; r.inert(!e.canTransfer, () => r.button(m, p + t - r.buttonWidth(m), f, () => { this.confirming = !0, r.modalScroll = 0, r.invalidate(); }, e.canTransfer ? official_chunk_wje6zqc2_js_1.Be.crimson : official_chunk_wje6zqc2_js_1.Be["ink-secondary"])), r.ctx.restore(); }), i; }
    paint(t, r) { var _a, _b, _c, _d, _e; if (((_b = (_a = this.home.view()) === null || _a === void 0 ? void 0 : _a.cultivator.id) !== null && _b !== void 0 ? _b : "") !== this.owner)
        this.enter(); let i = this.u, n = i.width - 56, a = this.body(n), s = ((_e = (_d = (_c = this.home.baseline) === null || _c === void 0 ? void 0 : _c.resources.session) === null || _d === void 0 ? void 0 : _d.data.activeCultivator) === null || _e === void 0 ? void 0 : _e.sectId) ? "欺天符可以让你无损转入另一个宗门。请先查看转宗后的变化，确认成功后才会消耗符箓。" : "尚未拜入宗门，暂时不能使用欺天符。", h = i.lines(s, n, 14), o = 84.2 + Math.max(0, h.length - 1) * 24, b = o + 32 + a.height, p = t + 12 - i.scroll; i.clip(0, t, i.width, r - t, () => { i.rect(12, p, i.width - 24, b, "rgba(248,243,230,.82)"), i.text("欺天台 · 转宗", 28, p + 28, 23.2, official_chunk_wje6zqc2_js_1.Be.ink, i.headingFont), h.forEach((f, m) => i.text(f, 28, p + 60 + m * 24, 14, official_chunk_wje6zqc2_js_1.Be["ink-secondary"])), i.line(28, p + o - 1, n), a.paint(28, p + o + 16); }), i.scrollMax = Math.max(0, t + 24 + b - r); }
    paintOverlay() { let t = this.u, r = this.model, e = r.preview; if (!this.confirming || !e)
        return; let i = () => { if (r.transferring)
        return; this.confirming = !1, t.invalidate(); }; (0, official_chunk_wje6zqc2_js_1.He)(t, { title: `启封${official_chunk_h2eh160v_js_1.me}`, style: "modal", rows: [{ text: `确认使用${official_chunk_h2eh160v_js_1.me}，从${e.source.name}转入${e.target.name}？` }, { text: "心法等级、经脉共用深度、弟子身份和贡献都会保留。转入新宗门后，需要重新选择流派节点，神通随心法与经脉自动解锁；原宗门职务不会保留。" }, ...e.activeTaskCount > 0 ? [{ text: `${e.activeTaskCount}项进行中的宗门任务将自动放弃，请确认没有遗漏。`, color: official_chunk_wje6zqc2_js_1.Be.crimson }] : []], actions: [{ label: "再想想", disabled: r.transferring, run: i }, { label: r.transferring ? "正在完成转宗……" : "确认转入新宗门", disabled: !r.canTransfer, run: () => void r.transfer() }] }, i); }
}
exports.SectTransferPage = ge;
class le {
    constructor(t, r, e) {
        this.owner = "";
        this.u = t;
        this.player = r;
        this.navigate = e;
        this.model = new official_chunk_89xwxnzm_js_1.Qa(() => t.invalidate()), this.map = new et(t, this.model, e);
    }
    enter() { this.leave(), this.sync(); }
    leave() { this.owner = "", this.model.leave(), this.map.reset(); }
    sync() { var _a, _b; let t = (_b = (_a = this.player.view()) === null || _a === void 0 ? void 0 : _a.cultivator.id) !== null && _b !== void 0 ? _b : ""; if (t && t !== this.owner)
        this.owner = t, this.map.reset(), this.model.enter(t); }
    paint(t, r) { this.sync(); let e = this.u, i = this.model, n = e.width - 56, a = new official_chunk_wje6zqc2_js_1.Ce(e, n), s = i.presentation.scenes.map, h = s.title, o = s.description; if (i.error === "尚未拜入宗门")
        h = "诸宗山门", o = "你还没有拜入山门，仍以散修身份行走。", a.text("山门没有拦你。想认一认诸宗，可以自己进去看看；眼下洞府里的路也走得通。", 14, 28, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]), a.gap(16), a.block(32.32, (v, M) => e.button("去看看山门", v, M, () => this.navigate("/game/sect/onboarding"), official_chunk_wje6zqc2_js_1.Be.crimson));
    else if (i.error)
        h = "宗门卷宗暂不可用", o = "传讯玉符未能接通宗门执事，可重新尝试读取。", a.text(i.error, 14, 28, official_chunk_wje6zqc2_js_1.Be.crimson), a.gap(12), a.block(32.32, (v, M) => e.button("重新读取", v, M, () => { i.reload(); }));
    else if (!i.context || !i.infrastructure)
        a.text(s.loadingText, 14, 28, official_chunk_wje6zqc2_js_1.Be["ink-secondary"]);
    else if (i.presentation.map.image) {
        let v = Math.max(320, Math.min(e.height * 0.56, 427)) + 2;
        a.block(v, (M, l) => this.map.paint(M, l, n, v));
    }
    else
        for (let v of i.presentation.map.hotspots) {
            let M = v.permission ? i.context.permissions[v.permission] : void 0, l = v.locked || !v.route || (M === null || M === void 0 ? void 0 : M.granted) === !1, $ = (M === null || M === void 0 ? void 0 : M.granted) === !1 ? M.reason : v.note, S = e.lines($ !== null && $ !== void 0 ? $ : "", n - 32, 14), P = Math.max(96, 64 + S.length * 20);
            a.block(P, (K, D) => { if (e.ctx.save(), l)
                e.ctx.globalAlpha *= 0.5; if (e.rect(K, D, n, P, "rgba(248,243,230,.9)"), e.text(v.label, K + 16, D + 28, 16, official_chunk_wje6zqc2_js_1.Be.ink, e.bodyFont, !0), S.forEach((j, z) => e.text(j, K + 16, D + 58 + z * 20, 14, official_chunk_wje6zqc2_js_1.Be["ink-secondary"])), e.ctx.restore(), !l)
                e.hit(K, D, n, P, () => this.navigate(v.route)); }), a.gap(1);
        } let b = e.lines(o, n, 14), p = 84.2 + Math.max(0, b.length - 1) * 24, f = p + 20 + a.height + 16, m = t + 12 - e.scroll; e.clip(0, t, e.width, r - t, () => { e.rect(12, m, e.width - 24, f, "rgba(248,243,230,.82)"); let v = e.ctx.createLinearGradient(0, m, 0, m + f); v.addColorStop(0, "rgba(255,252,245,.42)"), v.addColorStop(1, "rgba(248,243,230,0)"), e.ctx.fillStyle = v, e.ctx.fillRect(12, m, e.width - 24, f), e.text(h, 28, m + 28, 23.2, official_chunk_wje6zqc2_js_1.Be.ink, e.headingFont); let M = 28 + e.measure(h, 23.2, e.headingFont) + 8; e.text("/", M, m + 31, 14, official_chunk_wje6zqc2_js_1.Be["battle-muted"]), e.tracked("修行", M + 14, m + 31, 12.48, 1.9968, official_chunk_wje6zqc2_js_1.Be["battle-muted"]), b.forEach((l, $) => e.text(l, 28, m + 60 + $ * 24, 14, official_chunk_wje6zqc2_js_1.Be["ink-secondary"])), e.line(28, m + p - 1, n), a.paint(28, m + p + 20); }), e.scrollMax = Math.max(0, t + 24 + f - r); }
    paintOverlay() { if (this.model.context && this.model.infrastructure && !this.model.error)
        this.map.paintOverlay(); }
}
exports.SectPage = le;
