var { defineProperty: L, getOwnPropertyNames: r, getOwnPropertyDescriptor: s } = Object, c0 = Object.prototype.hasOwnProperty;
function f0(c) { return this[c]; }
var b0 = (c) => { var f = (C !== null && C !== void 0 ? C : (C = new WeakMap)).get(c), b; if (f)
    return f; if (f = L({}, "__esModule", { value: !0 }), c && typeof c === "object" || typeof c === "function") {
    for (var d of r(c))
        if (!c0.call(f, d))
            L(f, d, { get: f0.bind(c, d), enumerable: !(b = s(c, d)) || b.enumerable });
} return C.set(c, f), f; }, C;
var k0 = {};
module.exports = b0(k0); /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function d0(c) { return c instanceof Uint8Array || ArrayBuffer.isView(c) && c.constructor.name === "Uint8Array"; }
function U(c, ...f) { if (!d0(c))
    throw Error("Uint8Array expected"); if (f.length > 0 && !f.includes(c.length))
    throw Error("Uint8Array expected of length " + f + ", got length=" + c.length); }
function x(c, f = !0) { if (c.destroyed)
    throw Error("Hash instance has been destroyed"); if (f && c.finished)
    throw Error("Hash#digest() has already been called"); }
function E(c, f) { U(c); let b = f.outputLen; if (c.length < b)
    throw Error("digestInto() expects output buffer of length at least " + b); }
function a(...c) { for (let f = 0; f < c.length; f++)
    c[f].fill(0); }
function G(c) { return new DataView(c.buffer, c.byteOffset, c.byteLength); }
function P(c, f) { return c << 32 - f | c >>> f; }
var g0 = (() => typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function")(), p0 = Array.from({ length: 256 }, (c, f) => f.toString(16).padStart(2, "0"));
function I(c) { if (U(c), g0)
    return c.toHex(); let f = ""; for (let b = 0; b < c.length; b++)
    f += p0[c[b]]; return f; }
function z0(c) { if (typeof c !== "string")
    throw Error("string expected"); return new Uint8Array(new TextEncoder().encode(c)); }
function B(c) { if (typeof c === "string")
    c = z0(c); return U(c), c; }
class w {
}
function V(c) { let f = (d) => c().update(B(d)).digest(), b = c(); return f.outputLen = b.outputLen, f.blockLen = b.blockLen, f.create = () => c(), f; }
function m0(c, f, b, d) { if (typeof c.setBigUint64 === "function")
    return c.setBigUint64(f, b, d); let j = BigInt(32), p = BigInt(4294967295), m = Number(b >> j & p), z = Number(b & p), N = d ? 4 : 0, Z = d ? 0 : 4; c.setUint32(f + N, m, d), c.setUint32(f + Z, z, d); }
function S(c, f, b) { return c & f ^ ~c & b; }
function _(c, f, b) { return c & f ^ c & b ^ f & b; }
class T extends w {
    constructor(c, f, b, d) { super(); this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.blockLen = c, this.outputLen = f, this.padOffset = b, this.isLE = d, this.buffer = new Uint8Array(c), this.view = G(this.buffer); }
    update(c) { x(this), c = B(c), U(c); let { view: f, buffer: b, blockLen: d } = this, j = c.length; for (let p = 0; p < j;) {
        let m = Math.min(d - this.pos, j - p);
        if (m === d) {
            let z = G(c);
            for (; d <= j - p; p += d)
                this.process(z, p);
            continue;
        }
        if (b.set(c.subarray(p, p + m), this.pos), this.pos += m, p += m, this.pos === d)
            this.process(f, 0), this.pos = 0;
    } return this.length += c.length, this.roundClean(), this; }
    digestInto(c) { x(this), E(c, this), this.finished = !0; let { buffer: f, view: b, blockLen: d, isLE: j } = this, { pos: p } = this; if (f[p++] = 128, a(this.buffer.subarray(p)), this.padOffset > d - p)
        this.process(b, 0), p = 0; for (let k = p; k < d; k++)
        f[k] = 0; m0(b, d - 8, BigInt(this.length * 8), j), this.process(b, 0); let m = G(c), z = this.outputLen; if (z % 4)
        throw Error("_sha2: outputLen should be aligned to 32bit"); let N = z / 4, Z = this.get(); if (N > Z.length)
        throw Error("_sha2: outputLen bigger than state"); for (let k = 0; k < N; k++)
        m.setUint32(4 * k, Z[k], j); }
    digest() { let { buffer: c, outputLen: f } = this; this.digestInto(c); let b = c.slice(0, f); return this.destroy(), b; }
    _cloneInto(c) { c || (c = new this.constructor), c.set(...this.get()); let { blockLen: f, buffer: b, length: d, finished: j, destroyed: p, pos: m } = this; if (c.destroyed = p, c.finished = j, c.length = d, c.pos = m, d % f)
        c.buffer.set(b); return c; }
    clone() { return this._cloneInto(); }
}
var J = Uint32Array.from([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]);
var j0 = Uint32Array.from([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), q = new Uint32Array(64);
class n extends T {
    constructor(c = 32) { super(64, c, 8, !1); this.A = J[0] | 0, this.B = J[1] | 0, this.C = J[2] | 0, this.D = J[3] | 0, this.E = J[4] | 0, this.F = J[5] | 0, this.G = J[6] | 0, this.H = J[7] | 0; }
    get() { let { A: c, B: f, C: b, D: d, E: j, F: p, G: m, H: z } = this; return [c, f, b, d, j, p, m, z]; }
    set(c, f, b, d, j, p, m, z) { this.A = c | 0, this.B = f | 0, this.C = b | 0, this.D = d | 0, this.E = j | 0, this.F = p | 0, this.G = m | 0, this.H = z | 0; }
    process(c, f) { for (let k = 0; k < 16; k++, f += 4)
        q[k] = c.getUint32(f, !1); for (let k = 16; k < 64; k++) {
        let K = q[k - 15], X = q[k - 2], D = P(K, 7) ^ P(K, 18) ^ K >>> 3, O = P(X, 17) ^ P(X, 19) ^ X >>> 10;
        q[k] = O + q[k - 7] + D + q[k - 16] | 0;
    } let { A: b, B: d, C: j, D: p, E: m, F: z, G: N, H: Z } = this; for (let k = 0; k < 64; k++) {
        let K = P(m, 6) ^ P(m, 11) ^ P(m, 25), X = Z + K + S(m, z, N) + j0[k] + q[k] | 0, O = (P(b, 2) ^ P(b, 13) ^ P(b, 22)) + _(b, d, j) | 0;
        Z = N, N = z, z = m, m = p + X | 0, p = j, j = d, d = b, b = X + O | 0;
    } b = b + this.A | 0, d = d + this.B | 0, j = j + this.C | 0, p = p + this.D | 0, m = m + this.E | 0, z = z + this.F | 0, N = N + this.G | 0, Z = Z + this.H | 0, this.set(b, d, j, p, m, z, N, Z); }
    roundClean() { a(q); }
    destroy() { this.set(0, 0, 0, 0, 0, 0, 0, 0), a(this.buffer); }
}
var i = V(() => new n);
var H = i;
function A(c, f, b) { let d = c.getFileSystemManager(), j = c.env.USER_DATA_PATH + "/remote-assets-v1"; try {
    d.mkdirSync(j, !0);
}
catch (g) { } let p = new Map, m = new Map, z = 0, N = []; async function Z(g) { if (z >= 2)
    await new Promise((Q) => N.push(Q));
else
    z++; try {
    return await g();
}
finally {
    let Q = N.shift();
    if (Q)
        Q();
    else
        z--;
} } let k = new Map; for (let g of b) {
    let Q = k.get(g.package) || [];
    Q.push(g), k.set(g.package, Q);
} let K = new Set(b.map((g) => g.file)); try {
    for (let g of d.readdirSync(j))
        if (/^[a-f0-9]{64}\.(png|jpg|jpeg|webp|gz)$/.test(g) && !K.has(g))
            d.unlinkSync(j + "/" + g);
}
catch (g) { } let X = async (g, Q) => { try {
    let $ = new Uint8Array(d.readFileSync(g));
    return $.byteLength === Q.size && I(H($)) === Q.file.split(".")[0];
}
catch ($) {
    return !1;
} }, D = (g) => { let Q = m.get(g.path); if (Q)
    return Q; let $ = (async () => { let Y = j + "/" + g.file; if (!await X(Y, g)) {
    let v;
    for (let u = 0; u < 2; u++)
        try {
            let R = await Z(() => new Promise((F, y) => c.downloadFile({ url: "https://yzdoc.cn/assets/minigame-v1/" + g.file, timeout: 60000, success: (e) => e.statusCode === 200 ? F(e.tempFilePath) : y(Error("Asset HTTP " + e.statusCode)), fail: y })));
            if (!await X(R, g))
                throw Error("Asset integrity check failed: " + g.path);
            try {
                d.unlinkSync(Y);
            }
            catch (F) { }
            d.copyFileSync(R, Y);
            try {
                d.unlinkSync(R);
            }
            catch (F) { }
            v = void 0;
            break;
        }
        catch (R) {
            v = R;
        }
    if (v)
        throw v;
} p.set(g.path, Y); })(); return m.set(g.path, $), $.then(() => m.delete(g.path), () => m.delete(g.path)), $; }; f.__remoteAssetPath = (g) => p.get(g) || g; let O = c.loadSubpackage.bind(c); c.loadSubpackage = (g) => { let Q = k.get(g.name); if (!Q)
    return O(g); let $; return (async () => { for (let Y = 0; Y < Q.length; Y++)
    if (await D(Q[Y]), $)
        $({ progress: Math.round((Y + 1) / Q.length * 100) }); O(g); })().catch((Y) => { if (console.error("素材下载失败", g.name, Y), g.fail)
    g.fail(Y); if (g.complete)
    g.complete(Y); }), { onProgressUpdate(Y) { $ = Y; } }; }; }
var l = [{ path: "sect-sweep/cloud-stair-courtyard.jpg", file: "e84cd74fe6cc4d1db82caffb8b21d9d6ef34d76091f978e76a4c2baa11a4edbc.jpg", size: 390460, md5: "d75dc3b3d854575f23e78c9b34d21d7e", package: "sect-sweep" }, { path: "sect-sweep/sweep-atlas.png", file: "be73f2b82011af2401c4a728d5910cf36c0ab62d2b43aa901fec485b5c02b392.png", size: 537176, md5: "85448b1e572a03abad2daab3fd0a49b7", package: "sect-sweep" }, { path: "sect-sweep/sweep-obstacles.png", file: "f8000cb373894ee376155f358b0b4fb2c83a782233b2dfec923baedd624fb198.png", size: 134933, md5: "4a3433df38f33e15091c3b37cd8cee1d", package: "sect-sweep" }, { path: "sect-sweep/virtual-joystick-base.png", file: "cf2b13eba0647fbc2b8cf202c5ccb8464c137ed52e62bc61ae68b66e9bae25fd.png", size: 39466, md5: "d3f60d127adad2a1ea1806371d5042ab", package: "sect-sweep" }, { path: "sect-sweep/virtual-joystick-thumb.png", file: "0b45b56626f7694b3119168606d73a6f7d9bc56576fabe89506a3f4a96ec24cb.png", size: 12238, md5: "aa0c76b564635742e3351888d2e22288", package: "sect-sweep" }, { path: "sect-mining/copper-ore.png", file: "e1e2932d261a03d870c42a4c1f36f068ebc1fd0aa658efcab65ee04c8c682ea6.png", size: 514132, md5: "40da4af600e29ba80d1ef7a42626c724", package: "sect-mining" }, { path: "sect-mining/dark-iron.png", file: "2d10f4f3f8b2532b27208e41aea0ec8e92fc1d446dd60a076900a6aba6ed1e06.png", size: 416455, md5: "cff5d02d8891514ecfbb6b131ec4513e", package: "sect-mining" }, { path: "sect-mining/earth-essence.png", file: "2291302f21bd2362c996e89b07548d649de90b5bbe1dd2e474fb9ca30056f491.png", size: 404594, md5: "af5bfad46759dabbf649753534e2455a", package: "sect-mining" }, { path: "sect-mining/explosive-barrel.png", file: "2e41afa6fac88bcd12a34515f59863271c5758561eb0335b07bb794d6478ae60.png", size: 241229, md5: "1c2c351c3628603b41b4f0d58876c42e", package: "sect-mining" }, { path: "sect-mining/rope-cultivator.png", file: "fb243cc0b673e3b044d112849186584b43b8011d04c90840b54c2b6257a5b052.png", size: 656645, md5: "3e0b8bfb0f6c90dcd260ee928408ef26", package: "sect-mining" }, { path: "sect-mining/spirit-crystal.png", file: "a68e80903007b0676d7e6156c7607d1bc0653e2fd12cadc3f47fa6486f5985ce.png", size: 190630, md5: "f9cf1edc93a627323a8c80f9e434eeef", package: "sect-mining" }, { path: "sect-mining/spirit-hook.png", file: "57e5e5aae4f9f9f0a5a238ccb02ed4caf103c81362ad8ea8ecd3e8c093679c83.png", size: 213532, md5: "aef70c2a68df9671ef4acff0730a2761", package: "sect-mining" }, { path: "sect-mining/spirit-vein-cavern.jpg", file: "c9d60b573d8ae81768539fdb4cec198e7c9f0af7decba3bf802911eaf0c0cc6b.jpg", size: 398016, md5: "8c4a7ac4d530bf07f342193d653d45e0", package: "sect-mining" }, { path: "font-body/font.ttf.gz", file: "be2499fe0241f05643c78d3e808073f04737dd9c8010cf324feb01b10cbd9e7c.gz", size: 8312435, md5: "06b8aa078eaa87319f420e5ede8b89d6", package: "font-body" }, { path: "font-heading/font.ttf.gz", file: "21b2bfac8628ece82d7c0c5d2c23922d5a8e54ae60369ced6a1003937eb9a344.gz", size: 3857387, md5: "db4e177ba5f703d17d72c1dee757556d", package: "font-heading" }, { path: "atlas-world/map.jpg", file: "f6bf3b92492d2a90261a1817c1709dfc57e4406158f0e9d1c96081998cee1b13.jpg", size: 576370, md5: "4f0319ef5d8caf0ca243cdeed9c90801", package: "atlas-world" }, { path: "atlas-tiannan/map.jpg", file: "7aaf4758e4d6ab2bdf20394e1cf8250b7ce4ade118cb58bf7e7ee9a778e67944.jpg", size: 786931, md5: "1c072ec52b75a88f14379d52599fb49d", package: "atlas-tiannan" }, { path: "atlas-luanxinghai/map.jpg", file: "541887e700e8588ca300fcd9ce408e729d812ffe26c3edc6dcc7b8f16ea8cf62.jpg", size: 592408, md5: "37c0e2506959059d439649cef9454a95", package: "atlas-luanxinghai" }, { path: "atlas-mulan/map.jpg", file: "edf662e9cf3069ef64a66c4e10117975fd924ed7b679ebe3fe833bbc75366b47.jpg", size: 720061, md5: "a4c31a575b5d31978a079a8b903bb8fb", package: "atlas-mulan" }, { path: "atlas-dajin/map.jpg", file: "22c7820cf48073c18e7e4c84c40ed13cc5428e15510432b0720f9e62e322e951.jpg", size: 809656, md5: "f32430570c01891414d439e367ab0526", package: "atlas-dajin" }, { path: "atlas-nanjiang/map.jpg", file: "4f1e41b10f661c882f6f6ad904c866d0ad069a2bb9231cdd61d902cf01a649f4.jpg", size: 768501, md5: "884035b58460fc7da4f43acda8f3deac", package: "atlas-nanjiang" }, { path: "atlas-northland/map.jpg", file: "47d810ca45a13471325f88af19b919e8f074175f64c0b5853b5940cbe8646b9b.jpg", size: 664330, md5: "df73cb9aa411c0b4d515da98d77fc1eb", package: "atlas-northland" }, { path: "sect-map-lingxiao/map.jpg", file: "90ce5c3091ec35f776216264d136c20cf587783d82ad9b33990ddb28653b70e0.jpg", size: 705923, md5: "38af47d72f1c3393f8c1e181edf3eb5f", package: "sect-map-lingxiao" }, { path: "sect-map-wuxiang/map.jpg", file: "69c2faff6f185e7c81e7f435968c1af666b5264155179c6b3c25e81c4b2c66bf.jpg", size: 602027, md5: "bab9bdd9b3e754d88fd5ced9ee0d35c3", package: "sect-map-wuxiang" }, { path: "sect-map-tianyan/map.jpg", file: "25790b6d0271c6f9c44ebd5bd0cb4a5922ea43c35c40a0db8d3daf6fb42bf5fc.jpg", size: 487490, md5: "ea6dd4634f9c11dabd1d05de51a25005", package: "sect-map-tianyan" }, { path: "sect-map-youdu/map.jpg", file: "a1c13baabd90aec539c04c49d3854ad960526d81ab127268ecb0036d3659ac00.jpg", size: 474597, md5: "f0a3a83b22770670cfec8db80f68b1e7", package: "sect-map-youdu" }, { path: "sect-map-jiujie/map.jpg", file: "31bf0465cb50d13a4dd23667a00554bb1c7c708aea04fac82ba057357c21940f.jpg", size: 585145, md5: "df4fa7d42733bd4241a02fd7bba0ba58", package: "sect-map-jiujie" }];
function o(c, f) { let b = Date.now(), d = [], j = new Set; f.__bootEvents = d, f.__bootMark = (z) => { if (j.has(z))
    return; j.add(z); let N = { stage: z, ms: Date.now() - b }; d.push(N), console.info("[BOOT]", N); }, f.__bootMark("start"); let p = c.createCanvas; c.createCanvas = function (...z) { let N = p.apply(this, z); return f.__bootMark("canvas-created"), N; }; let m = c.loadSubpackage; c.loadSubpackage = function (z) { return f.__bootMark("subpackage:" + z.name + ":start"), m.call(this, { ...z, success: (N) => { var _a; f.__bootMark("subpackage:" + z.name + ":complete"), (_a = z.success) === null || _a === void 0 ? void 0 : _a.call(z, N); }, fail: (N) => { var _a; console.warn("[BOOT] subpackage failed", z.name), (_a = z.fail) === null || _a === void 0 ? void 0 : _a.call(z, N); } }); }; }
o(wx, GameGlobal);
A(wx, GameGlobal, l);
var W;
GameGlobal.__sharedIconsReady = () => W !== null && W !== void 0 ? W : (W = new Promise((c, f) => { wx.loadSubpackage({ name: "shared-icons", success: c, fail: f }); }).catch((c) => { throw W = void 0, c; }));
var M = !1, t = !1;
function h() { var _a, _b; if (M || t)
    return; M = !0, wx.showLoading({ title: "正在入界…", mask: !0 }); let c = (f) => { if (!M)
    return; M = !1, wx.hideLoading(), console.error("游戏资源加载失败", f), wx.showModal({ title: "入界未完成", content: "游戏资源加载失败，请检查网络后重试。", confirmText: "重新加载", showCancel: !1, success(b) { if (b.confirm)
        h(); } }); }; try {
    (_b = (_a = wx.loadSubpackage({ name: "game-runtime", success() { t = !0, M = !1, setTimeout(() => { GameGlobal.__sharedIconsReady().catch((b) => console.warn("图标后台加载失败", b)); }, 0); }, fail: c })).onProgressUpdate) === null || _b === void 0 ? void 0 : _b.call(_a, ({ progress: b }) => { if (M)
        wx.showLoading({ title: `正在入界 ${Math.max(0, Math.min(100, Math.round(b)))}%`, mask: !0 }); });
}
catch (f) {
    c(f);
} }
h();
