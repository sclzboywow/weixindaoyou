var { defineProperty: W, getOwnPropertyNames: c0, getOwnPropertyDescriptor: f0 } = Object, g0 = Object.prototype.hasOwnProperty;
function z0(b) { return this[b]; }
var d0 = (b) => { var c = (I !== null && I !== void 0 ? I : (I = new WeakMap)).get(b), f; if (c)
    return c; if (c = W({}, "__esModule", { value: !0 }), b && typeof b === "object" || typeof b === "function") {
    for (var g of c0(b))
        if (!g0.call(c, g))
            W(c, g, { get: z0.bind(b, g), enumerable: !(f = f0(b, g)) || f.enumerable });
} return I.set(b, c), c; }, I;
var j0 = (b) => b;
function k0(b, c) { this[b] = j0.bind(null, c); }
var Q0 = (b, c) => { for (var f in c)
    W(b, f, { get: c[f], enumerable: !0, configurable: !0, set: k0.bind(c, f) }); };
var N0 = {};
Q0(N0, { startBootstrap: () => b0 });
module.exports = d0(N0); /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Z0(b) { return b instanceof Uint8Array || ArrayBuffer.isView(b) && b.constructor.name === "Uint8Array"; }
function M(b, ...c) { if (!Z0(b))
    throw Error("Uint8Array expected"); if (c.length > 0 && !c.includes(b.length))
    throw Error("Uint8Array expected of length " + c + ", got length=" + b.length); }
function L(b, c = !0) { if (b.destroyed)
    throw Error("Hash instance has been destroyed"); if (c && b.finished)
    throw Error("Hash#digest() has already been called"); }
function S(b, c) { M(b); let f = c.outputLen; if (b.length < f)
    throw Error("digestInto() expects output buffer of length at least " + f); }
function D(...b) { for (let c = 0; c < b.length; c++)
    b[c].fill(0); }
function F(b) { return new DataView(b.buffer, b.byteOffset, b.byteLength); }
function K(b, c) { return b << 32 - c | b >>> c; }
var $0 = (() => typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function")(), X0 = Array.from({ length: 256 }, (b, c) => c.toString(16).padStart(2, "0"));
function n(b) { if (M(b), $0)
    return b.toHex(); let c = ""; for (let f = 0; f < b.length; f++)
    c += X0[b[f]]; return c; }
function Y0(b) { if (typeof b !== "string")
    throw Error("string expected"); return new Uint8Array(new TextEncoder().encode(b)); }
function w(b) { if (typeof b === "string")
    b = Y0(b); return M(b), b; }
class y {
}
function _(b) { let c = (g) => b().update(w(g)).digest(), f = b(); return c.outputLen = f.outputLen, c.blockLen = f.blockLen, c.create = () => b(), c; }
function q0(b, c, f, g) { if (typeof b.setBigUint64 === "function")
    return b.setBigUint64(c, f, g); let j = BigInt(32), d = BigInt(4294967295), Q = Number(f >> j & d), z = Number(f & d), Y = g ? 4 : 0, X = g ? 0 : 4; b.setUint32(c + Y, Q, g), b.setUint32(c + X, z, g); }
function H(b, c, f) { return b & c ^ ~b & f; }
function A(b, c, f) { return b & c ^ b & f ^ c & f; }
class x extends y {
    constructor(b, c, f, g) { super(); this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.blockLen = b, this.outputLen = c, this.padOffset = f, this.isLE = g, this.buffer = new Uint8Array(b), this.view = F(this.buffer); }
    update(b) { L(this), b = w(b), M(b); let { view: c, buffer: f, blockLen: g } = this, j = b.length; for (let d = 0; d < j;) {
        let Q = Math.min(g - this.pos, j - d);
        if (Q === g) {
            let z = F(b);
            for (; g <= j - d; d += g)
                this.process(z, d);
            continue;
        }
        if (f.set(b.subarray(d, d + Q), this.pos), this.pos += Q, d += Q, this.pos === g)
            this.process(c, 0), this.pos = 0;
    } return this.length += b.length, this.roundClean(), this; }
    digestInto(b) { L(this), S(b, this), this.finished = !0; let { buffer: c, view: f, blockLen: g, isLE: j } = this, { pos: d } = this; if (c[d++] = 128, D(this.buffer.subarray(d)), this.padOffset > g - d)
        this.process(f, 0), d = 0; for (let $ = d; $ < g; $++)
        c[$] = 0; q0(f, g - 8, BigInt(this.length * 8), j), this.process(f, 0); let Q = F(b), z = this.outputLen; if (z % 4)
        throw Error("_sha2: outputLen should be aligned to 32bit"); let Y = z / 4, X = this.get(); if (Y > X.length)
        throw Error("_sha2: outputLen bigger than state"); for (let $ = 0; $ < Y; $++)
        Q.setUint32(4 * $, X[$], j); }
    digest() { let { buffer: b, outputLen: c } = this; this.digestInto(b); let f = b.slice(0, c); return this.destroy(), f; }
    _cloneInto(b) { b || (b = new this.constructor), b.set(...this.get()); let { blockLen: c, buffer: f, length: g, finished: j, destroyed: d, pos: Q } = this; if (b.destroyed = d, b.finished = j, b.length = g, b.pos = Q, g % c)
        b.buffer.set(f); return b; }
    clone() { return this._cloneInto(); }
}
var p = Uint32Array.from([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]);
var J0 = Uint32Array.from([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), O = new Uint32Array(64);
class C extends x {
    constructor(b = 32) { super(64, b, 8, !1); this.A = p[0] | 0, this.B = p[1] | 0, this.C = p[2] | 0, this.D = p[3] | 0, this.E = p[4] | 0, this.F = p[5] | 0, this.G = p[6] | 0, this.H = p[7] | 0; }
    get() { let { A: b, B: c, C: f, D: g, E: j, F: d, G: Q, H: z } = this; return [b, c, f, g, j, d, Q, z]; }
    set(b, c, f, g, j, d, Q, z) { this.A = b | 0, this.B = c | 0, this.C = f | 0, this.D = g | 0, this.E = j | 0, this.F = d | 0, this.G = Q | 0, this.H = z | 0; }
    process(b, c) { for (let $ = 0; $ < 16; $++, c += 4)
        O[$] = b.getUint32(c, !1); for (let $ = 16; $ < 64; $++) {
        let m = O[$ - 15], N = O[$ - 2], R = K(m, 7) ^ K(m, 18) ^ m >>> 3, P = K(N, 17) ^ K(N, 19) ^ N >>> 10;
        O[$] = P + O[$ - 7] + R + O[$ - 16] | 0;
    } let { A: f, B: g, C: j, D: d, E: Q, F: z, G: Y, H: X } = this; for (let $ = 0; $ < 64; $++) {
        let m = K(Q, 6) ^ K(Q, 11) ^ K(Q, 25), N = X + m + H(Q, z, Y) + J0[$] + O[$] | 0, P = (K(f, 2) ^ K(f, 13) ^ K(f, 22)) + A(f, g, j) | 0;
        X = Y, Y = z, z = Q, Q = d + N | 0, d = j, j = g, g = f, f = N + P | 0;
    } f = f + this.A | 0, g = g + this.B | 0, j = j + this.C | 0, d = d + this.D | 0, Q = Q + this.E | 0, z = z + this.F | 0, Y = Y + this.G | 0, X = X + this.H | 0, this.set(f, g, j, d, Q, z, Y, X); }
    roundClean() { D(O); }
    destroy() { this.set(0, 0, 0, 0, 0, 0, 0, 0), D(this.buffer); }
}
var a = _(() => new C);
var l = a;
function i(b, c, f) { let g = b.getFileSystemManager(), j = b.env.USER_DATA_PATH + "/remote-assets-v1"; try {
    g.mkdirSync(j, !0);
}
catch (k) { } let d = new Map, Q = new Map, z = 0, Y = []; async function X(k) { if (z >= 2)
    await new Promise((Z) => Y.push(Z));
else
    z++; try {
    return await k();
}
finally {
    let Z = Y.shift();
    if (Z)
        Z();
    else
        z--;
} } let $ = new Map; for (let k of f) {
    let Z = $.get(k.package) || [];
    Z.push(k), $.set(k.package, Z);
} let m = new Set(f.map((k) => k.file)); try {
    for (let k of g.readdirSync(j))
        if (/^[a-f0-9]{64}\.(png|jpg|jpeg|webp|gz)$/.test(k) && !m.has(k))
            g.unlinkSync(j + "/" + k);
}
catch (k) { } let N = async (k, Z) => { try {
    let q = new Uint8Array(g.readFileSync(k));
    return q.byteLength === Z.size && n(l(q)) === Z.file.split(".")[0];
}
catch (q) {
    return !1;
} }, R = (k) => { let Z = Q.get(k.path); if (Z)
    return Z; let q = (async () => { let J = j + "/" + k.file; if (!await N(J, k)) {
    let G;
    for (let u = 0; u < 2; u++)
        try {
            let U = await X(() => new Promise((B, V) => b.downloadFile({ url: "https://yzdoc.cn/assets/minigame-v1/" + k.file, timeout: 60000, success: (T) => T.statusCode === 200 ? B(T.tempFilePath) : V(Error("Asset HTTP " + T.statusCode)), fail: V })));
            if (!await N(U, k))
                throw Error("Asset integrity check failed: " + k.path);
            try {
                g.unlinkSync(J);
            }
            catch (B) { }
            g.copyFileSync(U, J);
            try {
                g.unlinkSync(U);
            }
            catch (B) { }
            G = void 0;
            break;
        }
        catch (U) {
            G = U;
        }
    if (G)
        throw G;
} d.set(k.path, J); })(); return Q.set(k.path, q), q.then(() => Q.delete(k.path), () => Q.delete(k.path)), q; }; c.__remoteAssetPath = (k) => d.get(k) || k; let P = b.loadSubpackage.bind(b); b.loadSubpackage = (k) => { let Z = $.get(k.name); if (!Z)
    return P(k); let q; return (async () => { for (let J = 0; J < Z.length; J++)
    if (await R(Z[J]), q)
        q({ progress: Math.round((J + 1) / Z.length * 100) }); P(k); })().catch((J) => { if (console.error("素材下载失败", k.name, J), k.fail)
    k.fail(J); if (k.complete)
    k.complete(J); }), { onProgressUpdate(J) { q = J; } }; }; }
var e = [{ path: "sect-sweep/cloud-stair-courtyard.jpg", file: "e84cd74fe6cc4d1db82caffb8b21d9d6ef34d76091f978e76a4c2baa11a4edbc.jpg", size: 390460, md5: "d75dc3b3d854575f23e78c9b34d21d7e", package: "sect-sweep" }, { path: "sect-sweep/sweep-atlas.png", file: "be73f2b82011af2401c4a728d5910cf36c0ab62d2b43aa901fec485b5c02b392.png", size: 537176, md5: "85448b1e572a03abad2daab3fd0a49b7", package: "sect-sweep" }, { path: "sect-sweep/sweep-obstacles.png", file: "f8000cb373894ee376155f358b0b4fb2c83a782233b2dfec923baedd624fb198.png", size: 134933, md5: "4a3433df38f33e15091c3b37cd8cee1d", package: "sect-sweep" }, { path: "sect-sweep/virtual-joystick-base.png", file: "cf2b13eba0647fbc2b8cf202c5ccb8464c137ed52e62bc61ae68b66e9bae25fd.png", size: 39466, md5: "d3f60d127adad2a1ea1806371d5042ab", package: "sect-sweep" }, { path: "sect-sweep/virtual-joystick-thumb.png", file: "0b45b56626f7694b3119168606d73a6f7d9bc56576fabe89506a3f4a96ec24cb.png", size: 12238, md5: "aa0c76b564635742e3351888d2e22288", package: "sect-sweep" }, { path: "sect-mining/copper-ore.png", file: "e1e2932d261a03d870c42a4c1f36f068ebc1fd0aa658efcab65ee04c8c682ea6.png", size: 514132, md5: "40da4af600e29ba80d1ef7a42626c724", package: "sect-mining" }, { path: "sect-mining/dark-iron.png", file: "2d10f4f3f8b2532b27208e41aea0ec8e92fc1d446dd60a076900a6aba6ed1e06.png", size: 416455, md5: "cff5d02d8891514ecfbb6b131ec4513e", package: "sect-mining" }, { path: "sect-mining/earth-essence.png", file: "2291302f21bd2362c996e89b07548d649de90b5bbe1dd2e474fb9ca30056f491.png", size: 404594, md5: "af5bfad46759dabbf649753534e2455a", package: "sect-mining" }, { path: "sect-mining/explosive-barrel.png", file: "2e41afa6fac88bcd12a34515f59863271c5758561eb0335b07bb794d6478ae60.png", size: 241229, md5: "1c2c351c3628603b41b4f0d58876c42e", package: "sect-mining" }, { path: "sect-mining/rope-cultivator.png", file: "fb243cc0b673e3b044d112849186584b43b8011d04c90840b54c2b6257a5b052.png", size: 656645, md5: "3e0b8bfb0f6c90dcd260ee928408ef26", package: "sect-mining" }, { path: "sect-mining/spirit-crystal.png", file: "a68e80903007b0676d7e6156c7607d1bc0653e2fd12cadc3f47fa6486f5985ce.png", size: 190630, md5: "f9cf1edc93a627323a8c80f9e434eeef", package: "sect-mining" }, { path: "sect-mining/spirit-hook.png", file: "57e5e5aae4f9f9f0a5a238ccb02ed4caf103c81362ad8ea8ecd3e8c093679c83.png", size: 213532, md5: "aef70c2a68df9671ef4acff0730a2761", package: "sect-mining" }, { path: "sect-mining/spirit-vein-cavern.jpg", file: "c9d60b573d8ae81768539fdb4cec198e7c9f0af7decba3bf802911eaf0c0cc6b.jpg", size: 398016, md5: "8c4a7ac4d530bf07f342193d653d45e0", package: "sect-mining" }, { path: "font-body/font.ttf.gz", file: "be2499fe0241f05643c78d3e808073f04737dd9c8010cf324feb01b10cbd9e7c.gz", size: 8312435, md5: "06b8aa078eaa87319f420e5ede8b89d6", package: "font-body" }, { path: "font-heading/font.ttf.gz", file: "21b2bfac8628ece82d7c0c5d2c23922d5a8e54ae60369ced6a1003937eb9a344.gz", size: 3857387, md5: "db4e177ba5f703d17d72c1dee757556d", package: "font-heading" }, { path: "atlas-world/map.jpg", file: "f6bf3b92492d2a90261a1817c1709dfc57e4406158f0e9d1c96081998cee1b13.jpg", size: 576370, md5: "4f0319ef5d8caf0ca243cdeed9c90801", package: "atlas-world" }, { path: "atlas-tiannan/map.jpg", file: "7aaf4758e4d6ab2bdf20394e1cf8250b7ce4ade118cb58bf7e7ee9a778e67944.jpg", size: 786931, md5: "1c072ec52b75a88f14379d52599fb49d", package: "atlas-tiannan" }, { path: "atlas-luanxinghai/map.jpg", file: "541887e700e8588ca300fcd9ce408e729d812ffe26c3edc6dcc7b8f16ea8cf62.jpg", size: 592408, md5: "37c0e2506959059d439649cef9454a95", package: "atlas-luanxinghai" }, { path: "atlas-mulan/map.jpg", file: "edf662e9cf3069ef64a66c4e10117975fd924ed7b679ebe3fe833bbc75366b47.jpg", size: 720061, md5: "a4c31a575b5d31978a079a8b903bb8fb", package: "atlas-mulan" }, { path: "atlas-dajin/map.jpg", file: "22c7820cf48073c18e7e4c84c40ed13cc5428e15510432b0720f9e62e322e951.jpg", size: 809656, md5: "f32430570c01891414d439e367ab0526", package: "atlas-dajin" }, { path: "atlas-nanjiang/map.jpg", file: "4f1e41b10f661c882f6f6ad904c866d0ad069a2bb9231cdd61d902cf01a649f4.jpg", size: 768501, md5: "884035b58460fc7da4f43acda8f3deac", package: "atlas-nanjiang" }, { path: "atlas-northland/map.jpg", file: "47d810ca45a13471325f88af19b919e8f074175f64c0b5853b5940cbe8646b9b.jpg", size: 664330, md5: "df73cb9aa411c0b4d515da98d77fc1eb", package: "atlas-northland" }, { path: "sect-map-lingxiao/map.jpg", file: "90ce5c3091ec35f776216264d136c20cf587783d82ad9b33990ddb28653b70e0.jpg", size: 705923, md5: "38af47d72f1c3393f8c1e181edf3eb5f", package: "sect-map-lingxiao" }, { path: "sect-map-wuxiang/map.jpg", file: "69c2faff6f185e7c81e7f435968c1af666b5264155179c6b3c25e81c4b2c66bf.jpg", size: 602027, md5: "bab9bdd9b3e754d88fd5ced9ee0d35c3", package: "sect-map-wuxiang" }, { path: "sect-map-tianyan/map.jpg", file: "25790b6d0271c6f9c44ebd5bd0cb4a5922ea43c35c40a0db8d3daf6fb42bf5fc.jpg", size: 487490, md5: "ea6dd4634f9c11dabd1d05de51a25005", package: "sect-map-tianyan" }, { path: "sect-map-youdu/map.jpg", file: "a1c13baabd90aec539c04c49d3854ad960526d81ab127268ecb0036d3659ac00.jpg", size: 474597, md5: "f0a3a83b22770670cfec8db80f68b1e7", package: "sect-map-youdu" }, { path: "sect-map-jiujie/map.jpg", file: "31bf0465cb50d13a4dd23667a00554bb1c7c708aea04fac82ba057357c21940f.jpg", size: 585145, md5: "df4fa7d42733bd4241a02fd7bba0ba58", package: "sect-map-jiujie" }];
function o(b, c) { let f = Date.now(), g = [], j = new Set; c.__bootEvents = g, c.__bootMark = (z) => { var _a; if (j.has(z))
    return; j.add(z); let Y = { stage: z, ms: Date.now() - f }; if (g.push(Y), console.info("[BOOT]", Y), z === "first-frame")
    (_a = c.__onFirstFrame) === null || _a === void 0 ? void 0 : _a.call(c); }, c.__bootMark("start"); let d = b.createCanvas; b.createCanvas = function (...z) { let Y = d.apply(this, z); return c.__bootMark("canvas-created"), Y; }; let Q = b.loadSubpackage; b.loadSubpackage = function (z) { return c.__bootMark("subpackage:" + z.name + ":start"), Q.call(this, { ...z, success: (Y) => { var _a; c.__bootMark("subpackage:" + z.name + ":complete"), (_a = z.success) === null || _a === void 0 ? void 0 : _a.call(z, Y); }, fail: (Y) => { var _a; console.warn("[BOOT] subpackage failed", z.name), (_a = z.fail) === null || _a === void 0 ? void 0 : _a.call(z, Y); } }); }; }
class v {
    constructor(b, c, f) {
        this.visible = !1;
        this.fallback = !1;
        this.closed = !1;
        this.failed = !1;
        this.progress = 0;
        this.renderedProgress = -1;
        this.renderedText = "正在进入万界……";
        this.host = b;
        this.plugin = c;
        this.mark = f;
    }
    create() { if (this.ready)
        return this.ready; return this.mark("loading-plugin-start"), this.ready = (async () => { var _a, _b; try {
        this.manager = this.plugin().default, await this.manager.create({ images: [{ src: "startup/cover.jpg", displayConfig: { autoSwitchNext: !1, hideDuration: 0 } }], showLoading: !1, contextType: "2d", contextAttributes: {}, useMainCanvas: !1, designWidth: 540, designHeight: 960, scaleMode: "NO_BORDER", loadingTextConfig: { text: "正在进入万界……", textStyle: { fontSize: 20, color: "#483e32", textAlign: "center", bottom: 180 } }, loadingProgressConfig: { progressType: "text", config: { autoStart: !1, appendToLoadingText: !0 } } }), this.visible = !0, this.mark("loading-visible"), this.render();
    }
    catch (b) {
        if (console.warn("启动封面插件不可用", b), this.mark("loading-plugin-unavailable"), !this.visible) {
            if (this.fallback = !0, !this.failed && !this.closed)
                (_b = (_a = this.host).showLoading) === null || _b === void 0 ? void 0 : _b.call(_a, { title: "正在入界…", mask: !0 });
        }
    } })(), this.ready; }
    render() { if (!this.visible || this.closed)
        return; let b = this.failed ? "入界未完成，请检查网络后重新进入" : "正在进入万界……"; if (b !== this.renderedText)
        this.manager.setLoadingText(b), this.renderedText = b; if (!this.failed && this.progress !== this.renderedProgress)
        this.manager.setProgress(this.progress), this.renderedProgress = this.progress; }
    updateProgress(b) { if (this.failed || this.closed || !Number.isFinite(b))
        return; this.progress = Math.max(this.progress, Math.min(95, Math.max(0, Math.floor(b)))); try {
        this.render();
    }
    catch (c) {
        console.warn("封面进度更新失败", c);
    } }
    showError(b) { var _a, _b, _c, _d; if (this.closed || this.failed)
        return; this.failed = !0; try {
        this.render();
    }
    catch (c) {
        console.warn("封面错误文案更新失败", c);
    } if (this.fallback)
        (_b = (_a = this.host).hideLoading) === null || _b === void 0 ? void 0 : _b.call(_a); (_d = (_c = this.host).showModal) === null || _d === void 0 ? void 0 : _d.call(_c, { title: "入界未完成", content: "请检查网络后重新进入", confirmText: "重新加载", showCancel: !1, success: (c) => { if (c.confirm)
            b(); } }); }
    destroy(b) { var _a; return (_a = this.closing) !== null && _a !== void 0 ? _a : (this.closing = (async () => { var _a, _b; if (await this.ready, this.failed)
        throw Error("Startup failed; retaining cover"); if (await (b === null || b === void 0 ? void 0 : b()), this.failed)
        throw Error("Startup failed; retaining cover"); if (this.manager && this.visible)
        await this.manager.destroy(); if (this.failed)
        throw Error("Startup failed while closing cover"); if (this.fallback)
        (_b = (_a = this.host).hideLoading) === null || _b === void 0 ? void 0 : _b.call(_a); this.closed = !0, this.mark("loading-destroy"); })()); }
}
function h(b, c) { var _a, _b, _c, _d, _e, _f; let f = (_a = c.canvas) !== null && _a !== void 0 ? _a : (c.canvas = b.createCanvas()), g = (_e = (_c = (_b = b.getWindowInfo) === null || _b === void 0 ? void 0 : _b.call(b)) !== null && _c !== void 0 ? _c : (_d = b.getSystemInfoSync) === null || _d === void 0 ? void 0 : _d.call(b)) !== null && _e !== void 0 ? _e : {}, j = g.windowWidth || 390, d = g.windowHeight || 844, Q = Math.min(g.pixelRatio || 1, 2); f.width = Math.round(j * Q), f.height = Math.round(d * Q); let z = f.getContext("2d"); z.save(), z.setTransform(Q, 0, 0, Q, 0, 0), z.fillStyle = "#eee7d8", z.fillRect(0, 0, j, d), z.fillStyle = "#483e32", z.textAlign = "center", z.font = "28px sans-serif", z.fillText("万界道友", j / 2, d * 0.54), z.font = "16px sans-serif", z.fillText("正在进入万界……", j / 2, d * 0.78), z.restore(), (_f = c.__bootMark) === null || _f === void 0 ? void 0 : _f.call(c, "startup-canvas-painted"); let Y = !0, X = b.createImage(); return c.__claimStartupCanvas = () => { Y = !1, X.onload = null, X.onerror = null; }, X.onload = () => { if (!Y)
    return; z.save(), z.setTransform(Q, 0, 0, Q, 0, 0); let $ = Math.max(j / X.width, d / X.height); z.drawImage(X, (j - X.width * $) / 2, (d - X.height * $) / 2, X.width * $, X.height * $), z.fillStyle = "#483e32", z.font = "16px sans-serif", z.textAlign = "center", z.fillText("正在进入万界……", j / 2, d * 0.78), z.restore(); }, X.onerror = () => { }, X.src = "startup/cover.jpg", f; }
function t(b, c) { let f = typeof requestAnimationFrame === "function" ? (g) => requestAnimationFrame(g) : (g) => setTimeout(g, 32); return new Promise((g, j) => { f(() => { if (c()) {
    j(Error("Startup failed before presentation"));
    return;
} try {
    let d = b.__officialApp;
    if (d) {
        if (d.mode === "loading")
            throw Error("Startup page is no longer ready");
        d.paint();
    }
    f(() => { var _a; if (c())
        j(Error("Startup failed before presentation"));
    else
        (_a = b.__bootMark) === null || _a === void 0 ? void 0 : _a.call(b, "first-frame-presentable"), g(); });
}
catch (d) {
    j(d);
} }); }); }
function m0(b) { let c = b(), f = 0; return () => { let g = b(); if (Number.isFinite(g))
    f += Math.max(0, g - c), c = g; return f; }; }
var r = globalThis.performance, E = m0(typeof (r === null || r === void 0 ? void 0 : r.now) === "function" ? () => r.now() : () => Date.now());
function s(b, c) { if (!b.performance)
    b.performance = { now: E, timeOrigin: Date.now() - E() };
else if (typeof b.performance.now !== "function")
    b.performance.now = E; if (!c.performance)
    c.performance = b.performance; }
function b0(b, c, f, g = 45000) { var _a, _b, _c, _d; o(b, c); let j = c.__bootMark; j("boot-start"), s(globalThis, c); let d = !1, Q = !1, z = !1, Y; c.__startupReady = new Promise((Z) => { Y = Z; }); let X = new v(b, () => { return f(h(b, c)); }, j), $ = () => { let Z = () => { var _a; return (_a = b.showModal) === null || _a === void 0 ? void 0 : _a.call(b, { title: "请重新进入", content: "请关闭小游戏后重新打开万界道友。", showCancel: !1 }); }; try {
    if (b.restartMiniProgram)
        b.restartMiniProgram({ fail: Z });
    else
        Z();
}
catch (_a) {
    Z();
} }, m = (Z) => { if (Q || d)
    return; d = !0, clearTimeout(P), j("startup-error"), console.error("游戏启动失败", Z), X.showError($); }, N = (Z) => m(Z), R = (Z) => { var _a; return m((_a = Z === null || Z === void 0 ? void 0 : Z.reason) !== null && _a !== void 0 ? _a : Z); }, P = setTimeout(() => m(Error("首帧等待超时")), g); (_a = b.onError) === null || _a === void 0 ? void 0 : _a.call(b, N), (_b = b.onUnhandledRejection) === null || _b === void 0 ? void 0 : _b.call(b, R), c.__onFirstFrame = () => { if (d || Q || z)
    return; z = !0, setTimeout(() => { if (d)
    return; X.destroy(() => t(c, () => d)).then(() => { var _a, _b, _c; if (d)
    return; Q = !0, clearTimeout(P), (_a = b.offError) === null || _a === void 0 ? void 0 : _a.call(b, N), (_b = b.offUnhandledRejection) === null || _b === void 0 ? void 0 : _b.call(b, R), (_c = c.__officialApp) === null || _c === void 0 ? void 0 : _c.ui.invalidate(), Y(); }).catch(m); }, 0); }; let k = new Map; c.__sharedArtworkReady = (Z) => { if (!["icons", "divination", "sponsors"].includes(Z))
    return Promise.reject(Error("Unknown artwork package")); if (!k.has(Z))
    k.set(Z, c.__startupReady.then(() => new Promise((q, J) => { j("shared-" + Z + "-start"), b.loadSubpackage({ name: "shared-" + Z, success: q, fail: J }); })).catch((q) => { throw k.delete(Z), q; })); return k.get(Z); }, c.__sharedIconsReady = () => c.__sharedArtworkReady("icons"), X.create(); try {
    i(b, c, e), j("runtime-load-start"), (_d = (_c = b.loadSubpackage({ name: "game-runtime", success() { j("runtime-load-complete"), X.updateProgress(95); }, fail: m })) === null || _c === void 0 ? void 0 : _c.onProgressUpdate) === null || _d === void 0 ? void 0 : _d.call(_c, ({ progress: q }) => X.updateProgress(q * 0.9));
}
catch (Z) {
    m(Z);
} }
b0(wx, GameGlobal, (b) => requirePlugin("MinigameLoading", { customEnv: { wx, canvas: b } }));
