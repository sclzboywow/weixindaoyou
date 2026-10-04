/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function e(N) { return N instanceof Uint8Array || ArrayBuffer.isView(N) && N.constructor.name === "Uint8Array"; }
function g(N) { if (!Number.isSafeInteger(N) || N < 0)
    throw Error("positive integer expected, got " + N); }
function D(N, ...Q) { if (!e(N))
    throw Error("Uint8Array expected"); if (Q.length > 0 && !Q.includes(N.length))
    throw Error("Uint8Array expected of length " + Q + ", got length=" + N.length); }
function W(N) { if (typeof N !== "function" || typeof N.create !== "function")
    throw Error("Hash should be wrapped by utils.createHasher"); g(N.outputLen), g(N.blockLen); }
function m(N, Q = !0) { if (N.destroyed)
    throw Error("Hash instance has been destroyed"); if (Q && N.finished)
    throw Error("Hash#digest() has already been called"); }
function S(N, Q) { D(N); let Y = Q.outputLen; if (N.length < Y)
    throw Error("digestInto() expects output buffer of length at least " + Y); }
function v(...N) { for (let Q = 0; Q < N.length; Q++)
    N[Q].fill(0); }
function B(N) { return new DataView(N.buffer, N.byteOffset, N.byteLength); }
function j(N, Q) { return N << 32 - Q | N >>> Q; }
var u = (() => typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function")(), h = Array.from({ length: 256 }, (N, Q) => Q.toString(16).padStart(2, "0"));
function c(N) { if (D(N), u)
    return N.toHex(); let Q = ""; for (let Y = 0; Y < N.length; Y++)
    Q += h[N[Y]]; return Q; }
var P = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function d(N) { if (N >= P._0 && N <= P._9)
    return N - P._0; if (N >= P.A && N <= P.F)
    return N - (P.A - 10); if (N >= P.a && N <= P.f)
    return N - (P.a - 10); return; }
function C(N) { if (typeof N !== "string")
    throw Error("hex string expected, got " + typeof N); if (u)
    return Uint8Array.fromHex(N); let Q = N.length, Y = Q / 2; if (Q % 2)
    throw Error("hex string expected, got unpadded hex of length " + Q); let Z = new Uint8Array(Y); for (let q = 0, $ = 0; q < Y; q++, $ += 2) {
    let X = d(N.charCodeAt($)), J = d(N.charCodeAt($ + 1));
    if (X === void 0 || J === void 0) {
        let U = N[$] + N[$ + 1];
        throw Error('hex string expected, got non-hex character "' + U + '" at index ' + $);
    }
    Z[q] = X * 16 + J;
} return Z; }
function p(N) { if (typeof N !== "string")
    throw Error("string expected"); return new Uint8Array(new TextEncoder().encode(N)); }
function w(N) { if (typeof N === "string")
    N = p(N); return D(N), N; }
function L(N) { if (typeof N === "string")
    N = p(N); return D(N), N; }
function _(N, Q) { if (Q !== void 0 && {}.toString.call(Q) !== "[object Object]")
    throw Error("options should be object or undefined"); return Object.assign(N, Q); }
class k {
}
function A(N) { let Q = (Z) => N().update(w(Z)).digest(), Y = N(); return Q.outputLen = Y.outputLen, Q.blockLen = Y.blockLen, Q.create = () => N(), Q; }
class y extends k {
    constructor(N, Q) { super(); this.finished = !1, this.destroyed = !1, W(N); let Y = w(Q); if (this.iHash = N.create(), typeof this.iHash.update !== "function")
        throw Error("Expected instance of class which extends utils.Hash"); this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen; let Z = this.blockLen, q = new Uint8Array(Z); q.set(Y.length > Z ? N.create().update(Y).digest() : Y); for (let $ = 0; $ < q.length; $++)
        q[$] ^= 54; this.iHash.update(q), this.oHash = N.create(); for (let $ = 0; $ < q.length; $++)
        q[$] ^= 106; this.oHash.update(q), v(q); }
    update(N) { return m(this), this.iHash.update(N), this; }
    digestInto(N) { m(this), D(N, this.outputLen), this.finished = !0, this.iHash.digestInto(N), this.oHash.update(N), this.oHash.digestInto(N), this.destroy(); }
    digest() { let N = new Uint8Array(this.oHash.outputLen); return this.digestInto(N), N; }
    _cloneInto(N) { N || (N = Object.create(Object.getPrototypeOf(this), {})); let { oHash: Q, iHash: Y, finished: Z, destroyed: q, blockLen: $, outputLen: X } = this; return N = N, N.finished = Z, N.destroyed = q, N.blockLen = $, N.outputLen = X, N.oHash = Q._cloneInto(N.oHash), N.iHash = Y._cloneInto(N.iHash), N; }
    clone() { return this._cloneInto(); }
    destroy() { this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy(); }
}
var V = (N, Q, Y) => new y(N, Q).update(Y).digest();
V.create = (N, Q) => new y(N, Q);
function t(N, Q, Y, Z) { W(N); let q = _({ dkLen: 32, asyncTick: 10 }, Z), { c: $, dkLen: X, asyncTick: J } = q; if (g($), g(X), g(J), $ < 1)
    throw Error("iterations (c) should be >= 1"); let U = L(Q), K = L(Y), z = new Uint8Array(X), O = V.create(N, U), M = O._cloneInto().update(K); return { c: $, dkLen: X, asyncTick: J, DK: z, PRF: O, PRFSalt: M }; }
function a(N, Q, Y, Z, q) { if (N.destroy(), Q.destroy(), Z)
    Z.destroy(); return v(q), Y; }
function H(N, Q, Y, Z) { let { c: q, dkLen: $, DK: X, PRF: J, PRFSalt: U } = t(N, Q, Y, Z), K, z = new Uint8Array(4), O = B(z), M = new Uint8Array(J.outputLen); for (let F = 1, R = 0; R < $; F++, R += J.outputLen) {
    let E = X.subarray(R, R + J.outputLen);
    O.setInt32(0, F, !1), (K = U._cloneInto(K)).update(z).digestInto(M), E.set(M.subarray(0, E.length));
    for (let f = 1; f < q; f++) {
        J._cloneInto(K).update(M).digestInto(M);
        for (let T = 0; T < E.length; T++)
            E[T] ^= M[T];
    }
} return a(J, U, X, K, M); }
function s(N, Q, Y, Z) { if (typeof N.setBigUint64 === "function")
    return N.setBigUint64(Q, Y, Z); let q = BigInt(32), $ = BigInt(4294967295), X = Number(Y >> q & $), J = Number(Y & $), U = Z ? 4 : 0, K = Z ? 0 : 4; N.setUint32(Q + U, X, Z), N.setUint32(Q + K, J, Z); }
function n(N, Q, Y) { return N & Q ^ ~N & Y; }
function r(N, Q, Y) { return N & Q ^ N & Y ^ Q & Y; }
class b extends k {
    constructor(N, Q, Y, Z) { super(); this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.blockLen = N, this.outputLen = Q, this.padOffset = Y, this.isLE = Z, this.buffer = new Uint8Array(N), this.view = B(this.buffer); }
    update(N) { m(this), N = w(N), D(N); let { view: Q, buffer: Y, blockLen: Z } = this, q = N.length; for (let $ = 0; $ < q;) {
        let X = Math.min(Z - this.pos, q - $);
        if (X === Z) {
            let J = B(N);
            for (; Z <= q - $; $ += Z)
                this.process(J, $);
            continue;
        }
        if (Y.set(N.subarray($, $ + X), this.pos), this.pos += X, $ += X, this.pos === Z)
            this.process(Q, 0), this.pos = 0;
    } return this.length += N.length, this.roundClean(), this; }
    digestInto(N) { m(this), S(N, this), this.finished = !0; let { buffer: Q, view: Y, blockLen: Z, isLE: q } = this, { pos: $ } = this; if (Q[$++] = 128, v(this.buffer.subarray($)), this.padOffset > Z - $)
        this.process(Y, 0), $ = 0; for (let z = $; z < Z; z++)
        Q[z] = 0; s(Y, Z - 8, BigInt(this.length * 8), q), this.process(Y, 0); let X = B(N), J = this.outputLen; if (J % 4)
        throw Error("_sha2: outputLen should be aligned to 32bit"); let U = J / 4, K = this.get(); if (U > K.length)
        throw Error("_sha2: outputLen bigger than state"); for (let z = 0; z < U; z++)
        X.setUint32(4 * z, K[z], q); }
    digest() { let { buffer: N, outputLen: Q } = this; this.digestInto(N); let Y = N.slice(0, Q); return this.destroy(), Y; }
    _cloneInto(N) { N || (N = new this.constructor), N.set(...this.get()); let { blockLen: Q, buffer: Y, length: Z, finished: q, destroyed: $, pos: X } = this; if (N.destroyed = $, N.finished = q, N.length = Z, N.pos = X, Z % Q)
        N.buffer.set(Y); return N; }
    clone() { return this._cloneInto(); }
}
var G = Uint32Array.from([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]);
var NN = Uint32Array.from([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), x = new Uint32Array(64);
class I extends b {
    constructor(N = 32) { super(64, N, 8, !1); this.A = G[0] | 0, this.B = G[1] | 0, this.C = G[2] | 0, this.D = G[3] | 0, this.E = G[4] | 0, this.F = G[5] | 0, this.G = G[6] | 0, this.H = G[7] | 0; }
    get() { let { A: N, B: Q, C: Y, D: Z, E: q, F: $, G: X, H: J } = this; return [N, Q, Y, Z, q, $, X, J]; }
    set(N, Q, Y, Z, q, $, X, J) { this.A = N | 0, this.B = Q | 0, this.C = Y | 0, this.D = Z | 0, this.E = q | 0, this.F = $ | 0, this.G = X | 0, this.H = J | 0; }
    process(N, Q) { for (let z = 0; z < 16; z++, Q += 4)
        x[z] = N.getUint32(Q, !1); for (let z = 16; z < 64; z++) {
        let O = x[z - 15], M = x[z - 2], F = j(O, 7) ^ j(O, 18) ^ O >>> 3, R = j(M, 17) ^ j(M, 19) ^ M >>> 10;
        x[z] = R + x[z - 7] + F + x[z - 16] | 0;
    } let { A: Y, B: Z, C: q, D: $, E: X, F: J, G: U, H: K } = this; for (let z = 0; z < 64; z++) {
        let O = j(X, 6) ^ j(X, 11) ^ j(X, 25), M = K + O + n(X, J, U) + NN[z] + x[z] | 0, R = (j(Y, 2) ^ j(Y, 13) ^ j(Y, 22)) + r(Y, Z, q) | 0;
        K = U, U = J, J = X, X = $ + M | 0, $ = q, q = Z, Z = Y, Y = M + R | 0;
    } Y = Y + this.A | 0, Z = Z + this.B | 0, q = q + this.C | 0, $ = $ + this.D | 0, X = X + this.E | 0, J = J + this.F | 0, U = U + this.G | 0, K = K + this.H | 0, this.set(Y, Z, q, $, X, J, U, K); }
    roundClean() { v(x); }
    destroy() { this.set(0, 0, 0, 0, 0, 0, 0, 0), v(this.buffer); }
}
var l = A(() => new I);
var o = l;
async function i(N, Q, Y) { let Z = N.parameters; if ((Z === null || Z === void 0 ? void 0 : Z.algorithm) !== "PBKDF2/SHA-256" || !Number.isInteger(Z.cost) || Z.cost < 1 || Z.cost > 20000 || Z.keyLength !== 32 || !/^[a-f0-9]{1,64}$/i.test(Z.keyPrefix))
    throw Error("当前验证算法不受支持"); let q = C(Z.nonce), $ = C(Z.salt), X = new Uint8Array(q.length + 4); X.set(q); let J = new DataView(X.buffer), U = Date.now(), K = U; for (let z = 0; z < 1e6; z++) {
    if (Y())
        throw Error("验证已取消");
    if (Date.now() - U > 240000 || Z.expiresAt && Date.now() >= Z.expiresAt * 1000)
        throw Error("验证超时，请重试");
    J.setUint32(q.length, z, !1);
    let O = c(H(o, X, $, { c: Z.cost, dkLen: Z.keyLength }));
    if (O.startsWith(Z.keyPrefix))
        return { challenge: N, solution: { counter: z, derivedKey: O, time: Date.now() - U } };
    if (Date.now() - K > 40)
        Q(z), await new Promise((M) => setTimeout(M, 0)), K = Date.now();
} throw Error("验证计算未完成，请重试"); }
worker.onMessage((N) => { i(N.challenge, (Q) => worker.postMessage({ counter: Q }), () => !1).then((Q) => worker.postMessage({ payload: Q })).catch((Q) => worker.postMessage({ error: Q.message })); });
