"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.i = exports.f = exports.d = void 0;
exports.a = Z0;
exports.b = x0;
exports.c = D0;
exports.e = r0;
exports.g = S0;
exports.h = A0;
exports.j = w0;
const official_chunk_swfd31ss_js_1 = require("./official-chunk-swfd31ss.js");
const official_chunk_z00ve42p_js_1 = require("./official-chunk-z00ve42p.js");
var H = Uint8Array, D = Uint16Array, _L = Int32Array, QL = new H([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]), YL = new H([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]), hL = new H([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), XL = function (W, L) {
    var R = new D(31);
    for (var q = 0; q < 31; ++q)
        R[q] = L += 1 << W[q - 1];
    var E = new _L(R[30]);
    for (var q = 1; q < 30; ++q)
        for (var $ = R[q]; $ < R[q + 1]; ++$)
            E[$] = $ - R[q] << 5 | q;
    return { b: R, r: E };
}, IL = XL(QL, 2), OL = IL.b, uL = IL.r;
OL[28] = 258, uL[258] = 28;
var HL = XL(YL, 0), eL = HL.b, F0 = HL.r, d = new D(32768);
for (V = 0; V < 32768; ++V)
    P = (V & 43690) >> 1 | (V & 21845) << 1, P = (P & 52428) >> 2 | (P & 13107) << 2, P = (P & 61680) >> 4 | (P & 3855) << 4, d[V] = ((P & 65280) >> 8 | (P & 255) << 8) >> 1;
var P, V, v = function (W, L, R) {
    var q = W.length, E = 0, $ = new D(L);
    for (; E < q; ++E)
        if (W[E])
            ++$[W[E] - 1];
    var J = new D(L);
    for (E = 1; E < L; ++E)
        J[E] = J[E - 1] + $[E - 1] << 1;
    var Q;
    if (R) {
        Q = new D(1 << L);
        var X = 15 - L;
        for (E = 0; E < q; ++E)
            if (W[E]) {
                var I = E << 4 | W[E], O = L - W[E], K = J[W[E] - 1]++ << O;
                for (var C = K | (1 << O) - 1; K <= C; ++K)
                    Q[d[K] >> X] = I;
            }
    }
    else {
        Q = new D(q);
        for (E = 0; E < q; ++E)
            if (W[E])
                Q[E] = d[J[W[E] - 1]++] >> 15 - W[E];
    }
    return Q;
}, y = new H(288);
for (V = 0; V < 144; ++V)
    y[V] = 8;
var V;
for (V = 144; V < 256; ++V)
    y[V] = 9;
var V;
for (V = 256; V < 280; ++V)
    y[V] = 7;
var V;
for (V = 280; V < 288; ++V)
    y[V] = 8;
var V, FL = new H(32);
for (V = 0; V < 32; ++V)
    FL[V] = 5;
var V;
var rL = v(y, 9, 1);
var nL = v(FL, 5, 1), i = function (W) {
    var L = W[0];
    for (var R = 1; R < W.length; ++R)
        if (W[R] > L)
            L = W[R];
    return L;
}, B = function (W, L, R) { var q = L / 8 | 0; return (W[q] | W[q + 1] << 8) >> (L & 7) & R; }, l = function (W, L) { var R = L / 8 | 0; return (W[R] | W[R + 1] << 8 | W[R + 2] << 16) >> (L & 7); }, oL = function (W) { return (W + 7) / 8 | 0; }, ML = function (W, L, R) {
    if (L == null || L < 0)
        L = 0;
    if (R == null || R > W.length)
        R = W.length;
    return new H(W.subarray(L, R));
};
var pL = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data"], M = function (W, L, R) {
    var q = Error(L || pL[W]);
    if (q.code = W, Error.captureStackTrace)
        Error.captureStackTrace(q, M);
    if (!R)
        throw q;
    return q;
}, bL = function (W, L, R, q) {
    var E = W.length, $ = q ? q.length : 0;
    if (!E || L.f && !L.l)
        return R || new H(0);
    var J = !R, Q = J || L.i != 2, X = L.i;
    if (J)
        R = new H(E * 3);
    var I = function ($L) {
        var CL = R.length;
        if ($L > CL) {
            var JL = new H(Math.max(CL * 2, $L));
            JL.set(R), R = JL;
        }
    }, O = L.f || 0, K = L.p || 0, C = L.b || 0, j = L.l, k = L.d, g = L.m, S = L.n, e = E * 8;
    do {
        if (!j) {
            O = B(W, K, 1);
            var r = B(W, K + 1, 3);
            if (K += 3, !r) {
                var N = oL(K) + 4, n = W[N - 4] | W[N - 3] << 8, o = N + n;
                if (o > E) {
                    if (X)
                        M(0);
                    break;
                }
                if (Q)
                    I(C + n);
                R.set(W.subarray(N, o), C), L.b = C += n, L.p = K = o * 8, L.f = O;
                continue;
            }
            else if (r == 1)
                j = rL, k = nL, g = 9, S = 5;
            else if (r == 2) {
                var p = B(W, K, 31) + 257, t = B(W, K + 10, 15) + 4, LL = p + B(W, K + 5, 31) + 1;
                K += 14;
                var A = new H(LL), b = new H(19);
                for (var F = 0; F < t; ++F)
                    b[hL[F]] = B(W, K + F * 3, 7);
                K += t * 3;
                var WL = i(b), vL = (1 << WL) - 1, yL = v(b, WL, 1);
                for (var F = 0; F < LL;) {
                    var RL = yL[B(W, K, vL)];
                    K += RL & 15;
                    var N = RL >> 4;
                    if (N < 16)
                        A[F++] = N;
                    else {
                        var Z = 0, m = 0;
                        if (N == 16)
                            m = 3 + B(W, K, 3), K += 2, Z = A[F - 1];
                        else if (N == 17)
                            m = 3 + B(W, K, 7), K += 3;
                        else if (N == 18)
                            m = 11 + B(W, K, 127), K += 7;
                        while (m--)
                            A[F++] = Z;
                    }
                }
                var EL = A.subarray(0, p), G = A.subarray(p);
                g = i(EL), S = i(G), j = v(EL, g, 1), k = v(G, S, 1);
            }
            else
                M(1);
            if (K > e) {
                if (X)
                    M(0);
                break;
            }
        }
        if (Q)
            I(C + 131072);
        var zL = (1 << g) - 1, kL = (1 << S) - 1, c = K;
        for (;; c = K) {
            var Z = j[l(W, K) & zL], x = Z >> 4;
            if (K += Z & 15, K > e) {
                if (X)
                    M(0);
                break;
            }
            if (!Z)
                M(2);
            if (x < 256)
                R[C++] = x;
            else if (x == 256) {
                c = K, j = null;
                break;
            }
            else {
                var qL = x - 254;
                if (x > 264) {
                    var F = x - 257, w = QL[F];
                    qL = B(W, K, (1 << w) - 1) + OL[F], K += w;
                }
                var a = k[l(W, K) & kL], f = a >> 4;
                if (!a)
                    M(3);
                K += a & 15;
                var G = eL[f];
                if (f > 3) {
                    var w = YL[f];
                    G += l(W, K) & (1 << w) - 1, K += w;
                }
                if (K > e) {
                    if (X)
                        M(0);
                    break;
                }
                if (Q)
                    I(C + 131072);
                var KL = C + qL;
                if (C < G) {
                    var VL = $ - G, mL = Math.min(G, KL);
                    if (VL + C < 0)
                        M(3);
                    for (; C < mL; ++C)
                        R[C] = q[VL + C];
                }
                for (; C < KL; ++C)
                    R[C] = R[C - G];
            }
        }
        if (L.l = j, L.p = c, L.b = C, L.f = O, j)
            O = 1, L.m = g, L.d = k, L.n = S;
    } while (!O);
    return C != R.length && J ? ML(R, 0, C) : R.subarray(0, C);
};
var cL = new H(0);
var aL = function (W) {
    if (W[0] != 31 || W[1] != 139 || W[2] != 8)
        M(6, "invalid gzip data");
    var L = W[3], R = 10;
    if (L & 4)
        R += (W[10] | W[11] << 8) + 2;
    for (var q = (L >> 3 & 1) + (L >> 4 & 1); q > 0; q -= !W[R++])
        ;
    return R + (L & 2);
}, fL = function (W) { var L = W.length; return (W[L - 4] | W[L - 3] << 8 | W[L - 2] << 16 | W[L - 1] << 24) >>> 0; };
function BL(W, L) {
    var R = aL(W);
    if (R + 8 > W.length)
        M(6, "invalid gzip data");
    return bL(W.subarray(R, -8), { i: 2 }, L && L.out || new H(fL(W)), L && L.dictionary);
}
var s = typeof TextDecoder < "u" && new TextDecoder, iL = 0;
try {
    s.decode(cL, { stream: !0 }), iL = 1;
}
catch (W) { }
var lL = function (W) {
    for (var L = "", R = 0;;) {
        var q = W[R++], E = (q > 127) + (q > 223) + (q > 239);
        if (R + E > W.length)
            return { s: L, r: ML(W, R - 1) };
        if (!E)
            L += String.fromCharCode(q);
        else if (E == 3)
            q = ((q & 15) << 18 | (W[R++] & 63) << 12 | (W[R++] & 63) << 6 | W[R++] & 63) - 65536, L += String.fromCharCode(55296 | q >> 10, 56320 | q & 1023);
        else if (E & 1)
            L += String.fromCharCode((q & 31) << 6 | W[R++] & 63);
        else
            L += String.fromCharCode((q & 15) << 12 | (W[R++] & 63) << 6 | W[R++] & 63);
    }
};
function NL(W, L) {
    if (L) {
        var R = "";
        for (var q = 0; q < W.length; q += 16384)
            R += String.fromCharCode.apply(null, W.subarray(q, q + 16384));
        return R;
    }
    else if (s)
        return s.decode(W);
    else {
        var E = lL(W), $ = E.s, R = E.r;
        if (R.length)
            M(8);
        return $;
    }
}
var dL = /(?:[\0-\/:-@\[-`\{-\xA9\xAB-\xB1\xB4\xB6-\xB8\xBB\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u037E\u0384\u0385\u0387\u03F6\u0482\u055A-\u055F\u0589\u058A\u058D-\u058F\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0600-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070D\u070F\u07F6-\u07F9\u07FE\u07FF\u0830-\u083E\u085E\u0888\u0890\u0891\u08E2\u0964\u0965\u0970\u09F2\u09F3\u09FA\u09FB\u09FD\u0A76\u0AF0\u0AF1\u0B70\u0BF3-\u0BFA\u0C77\u0C7F\u0C84\u0D4F\u0D79\u0DF4\u0E3F\u0E4F\u0E5A\u0E5B\u0F01-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F85\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE-\u0FDA\u104A-\u104F\u109E\u109F\u10FB\u1360-\u1368\u1390-\u1399\u1400\u166D\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DB\u1800-\u180A\u180E\u1940\u1944\u1945\u19DE-\u19FF\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B4E\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2000-\u2064\u2066-\u206F\u207A-\u207E\u208A-\u208E\u20A0-\u20C4\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2429\u2440-\u244A\u249C-\u24E9\u2500-\u2775\u2794-\u2B73\u2B76-\u2BFF\u2CE5-\u2CEA\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E5D\u2E60-\u2E63\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u303F\u309B\u309C\u30A0\u30FB\u3190\u3191\u3196-\u319F\u31C0-\u31E5\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAA77-\uAA79\uAADE\uAADF\uAAF0\uAAF1\uAB5B\uAB6A\uAB6B\uABEB\uFB29\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDCF\uFDFC-\uFDFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFEFF\uFF01-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFF9-\uFFFD]|\uD800[\uDD00-\uDD02\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDC77\uDC78\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEC8\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDD6E\uDD8E\uDD8F\uDEAD\uDEC9\uDECA\uDED0-\uDED8\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB-\uDCC1\uDCCD\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9\uDFD4\uDFD5\uDFD7\uDFD8]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3F]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09\uDFE1]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFD5-\uDFF1\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD80D[\uDC30-\uDC3F]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3F\uDF44\uDF45]|\uD81B[\uDD6D-\uDD6F\uDE97-\uDE9A\uDFE2]|\uD82F[\uDC9C\uDC9F-\uDCA3]|\uD833[\uDC00-\uDCEF\uDCFA-\uDCFC\uDD00-\uDEB3\uDEBA-\uDED0\uDED2-\uDED4\uDEDD-\uDEFD\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45\uDE53-\uDE5A\uDE5D\uDE5E\uDE60-\uDE7F\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE8B\uDF00-\uDF1C]|\uD838[\uDD4F\uDEFF]|\uD839\uDDFF|\uD83A[\uDD5E\uDD5F]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAE\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED9\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDFDB\uDFE0-\uDFEB\uDFF0-\uDFFF]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0-\uDCBB\uDCC0\uDCC1\uDCD0-\uDCD8\uDD00-\uDE57\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDEC6\uDEC8\uDECC-\uDEDD\uDEDF-\uDEEB\uDEEF-\uDEFA\uDF00-\uDF92\uDF94-\uDFEF\uDFFA]|\uDB40[\uDC01\uDC20-\uDC7F])/g, sL = new Set(["镇压", "触手", "父母双亡", "无父无母", "无父母", "真实身份", "天道盟", "杀戮", "杀神", "中枢系统", "叉叉"]);
function PL(W) { return W.normalize("NFKC").toLocaleLowerCase("zh-CN").replace(dL, ""); }
function tL(W) {
    let L = new Set(W.map(PL).filter((E) => E.length > 0 && !sL.has(E))), R = new Set, q = new Map;
    for (let E of L) {
        let $ = Array.from(E);
        if ($.length <= 2 || /^[a-z0-9]+$/u.test(E) && $.length <= 4) {
            R.add(E);
            continue;
        }
        let J = `${$[0]}${$[1]}`, Q = q.get(J);
        if (Q)
            Q.push(E);
        else
            q.set(J, [E]);
    }
    for (let E of q.values())
        E.sort(($, J) => J.length - $.length);
    return { exactOnlyTerms: R, termsByPrefix: q, termCount: L.size };
}
function jL(W) {
    let L = tL(W);
    function R(E) {
        let $ = PL(E);
        if (!$)
            return null;
        if (L.exactOnlyTerms.has($))
            return { normalizedContent: $, matchedTerm: $ };
        let J = Array.from($), Q = 0;
        for (let X = 0; X < J.length - 1; X += 1) {
            let I = `${J[X]}${J[X + 1]}`, O = L.termsByPrefix.get(I);
            if (O) {
                let K = O.find((C) => $.startsWith(C, Q));
                if (K)
                    return { normalizedContent: $, matchedTerm: K };
            }
            Q += J[X].length;
        }
        return null;
    }
    function q() { return { termCount: L.termCount, prefixCount: L.termsByPrefix.size, exactOnlyTermCount: L.exactOnlyTerms.size }; }
    return { findLocalContentViolation: R, getLocalBlocklistStats: q };
}
function GL(W, L, R) {
    if (!R || typeof R !== "object" || Array.isArray(R) || !["POST", "PATCH", "PUT"].includes(W))
        return [];
    let q = R;
    L = L.split("?")[0];
    let E = [];
    if (L === "/api/generate-character")
        E = ["userInput"];
    else if (L === "/api/world-chat/messages" || L === "/api/sects/current/chat/messages")
        E = ["textContent"];
    else if (L === "/api/cultivator/mail/send")
        E = ["content", "title"];
    else if (L === "/api/cultivator/title" || L === "/api/cultivator/profile/title")
        E = ["title"];
    else if (L === "/api/craft")
        E = ["userPrompt"];
    else if (L === "/api/identity-reshape/session" || L === "/api/identity-reshape/generate")
        E = ["description"];
    else if (L === "/api/bet-battles/create")
        E = ["taunt"];
    else if (/^\/api\/black-market\/[^/]+\/sessions\/[^/]+\/interact$/.test(L))
        E = ["message"];
    else if (L === "/api/feedback")
        E = ["content", "title"];
    else if (L === "/api/combat-v6/beasts/rename")
        E = ["name"];
    else if (L === "/api/auth/update-user")
        E = ["name"];
    else if (["/api/auth/sign-up/email", "/api/auth/sign-up/wechat-mini-game", "/api/auth/sign-in/email-otp", "/api/auth/email-otp/send-verification-otp"].includes(L))
        E = ["name", "displayName"];
    let $ = E.flatMap((J) => typeof q[J] === "string" ? [q[J]] : []);
    if (L === "/api/world-chat/messages" || L === "/api/sects/current/chat/messages") {
        let J = q.payload;
        if (typeof (J === null || J === void 0 ? void 0 : J.text) === "string")
            $.push(J.text);
    }
    return [...new Set($.map((J) => J.trim()).filter(Boolean))];
}
var T, z;
function TL(W) {
    let L = JSON.parse(NL(BL(new Uint8Array(W))));
    if (!Array.isArray(L) || L.some((R) => typeof R !== "string"))
        throw Error("审核词库格式错误");
    T = jL(L);
}
function L0() {
    if (T)
        return;
    try {
        let W = official_chunk_z00ve42p_js_1.Ge.getFileSystemManager();
        for (let L of ["runtime/content-safety/blocked-terms.json.gz", "content-safety/blocked-terms.json.gz"])
            try {
                TL(W.readFileSync(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(L))))))))))))))))))))))))))))))))))))))))))));
                return;
            }
            catch (_a) { }
    }
    catch (_b) { }
}
L0();
function Z0() {
    if (T)
        return Promise.resolve();
    if (z)
        return z;
    return z = new Promise((W, L) => {
        official_chunk_z00ve42p_js_1.Ge.loadSubpackage({ name: "content-safety", success: () => {
                try {
                    TL(official_chunk_z00ve42p_js_1.Ge.getFileSystemManager().readFileSync(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath("content-safety/blocked-terms.json.gz")))))))))))))))))))))))))))))))))))))))))))), W();
                }
                catch (_a) {
                    L(Error("审核词库加载失败，请重新入界"));
                }
            }, fail: () => L(Error("审核词库分包加载失败，请检查网络后重试")) });
    }).finally(() => { z = void 0; }), z;
}
var _ = new Map;
function x0(W) {
    if (!T || !W || /^[\d\s.,/%+\-:]+$/.test(W))
        return W;
    let L = _.get(W);
    if (L !== void 0)
        return L;
    let R = T.findLocalContentViolation(W) ? "内容暂不展示" : W;
    if (_.size >= 2000)
        _.clear();
    return _.set(W, R), R;
}
function D0(W, L, R) {
    let q = GL(L, W, R);
    if (!q.length)
        return;
    if (!T)
        throw Error("审核词库尚未加载，请重新入界");
    if (q.some((E) => T.findLocalContentViolation(E)))
        throw Error("内容不符合社区规范，请修改后重试");
}
var W0 = [{ id: "tiannan", name: "天南", x: 0.855, y: 0.79 }, { id: "mulan", name: "慕兰草原", x: 0.88, y: 0.45 }, { id: "luanxinghai", name: "乱星海", x: 0.48, y: 0.73 }, { id: "dajin", name: "大晋皇朝", x: 0.48, y: 0.24 }, { id: "northland", name: "北境冰原", x: 0.45, y: 0.07 }, { id: "nanjiang", name: "南疆", x: 0.445, y: 0.395 }, { id: "tianlan", name: "天澜草原", x: 0.87, y: 0.29 }, { id: "tiansha", name: "天沙大陆", x: 0.075, y: 0.13 }, { id: "wulonghai", name: "五龙海", x: 0.18, y: 0.52 }, { id: "wubianhai", name: "无边海", x: 0.62, y: 0.5 }, { id: "farwest", name: "极西之地", x: 0.77, y: 0.925 }, { id: "hurricane-desert", name: "飓风沙漠", x: 0.825, y: 0.62 }], R0 = { 天南: "tiannan", 慕兰: "mulan", 乱星海: "luanxinghai", 大晋: "dajin" }, E0 = { DJ_NORTH_01: "northland", DJ_SOUTH_01: "nanjiang" };
exports.f = W0;
function S0() { return [...(0, official_chunk_swfd31ss_js_1.ab)(), ...(0, official_chunk_swfd31ss_js_1.bb)(), ...(0, official_chunk_swfd31ss_js_1.cb)()]; }
function A0(W) {
    var _a;
    let L = "region" in W ? W : (0, official_chunk_swfd31ss_js_1.fb)(W.parent_id);
    if (!L || !("region" in L))
        return;
    let R = (_a = E0[L.id]) !== null && _a !== void 0 ? _a : R0[L.region];
    return W0.find((q) => q.id === R);
}
var q0 = { TN_YUE_01: [0.36, 0.61], TN_YUE_02: [0.175, 0.79], TN_YW_01: [0.69, 0.43], TN_XI_01: [0.32, 0.19], TN_BAICAO_01: [0.43, 0.405], TN_YULING_01: [0.53, 0.32], TN_ZMG_01: [0.845, 0.17], TN_BORDER_01: [0.155, 0.385], SAT_TN_01: [0.345, 0.525], SAT_TN_02: [0.325, 0.145], SAT_ZMG_01: [0.795, 0.265], SAT_TN_03: [0.235, 0.745], SAT_TN_08: [0.425, 0.665], SAT_TN_04: [0.31, 0.655], SAT_TN_05: [0.12, 0.425], SAT_TN_06: [0.895, 0.14], SAT_YW_01: [0.615, 0.425], SAT_TN_07: [0.375, 0.735], WILD_TN_MINE: [0.175, 0.465], WILD_YW_CROW: [0.755, 0.365], WILD_TN_MOONLAKE: [0.27, 0.12], WILD_ZMG_BLACKPOOL: [0.87, 0.235], WILD_ZMG_VINES: [0.92, 0.31], SECT_LINGXIAO: [0.715, 0.285] }, K0 = { LX_INNER_01: [0.68, 0.397], LX_INNER_02: [0.852, 0.703], LX_OUTER_01: [0.13, 0.68], LX_VOID_01: [0.165, 0.108], SAT_LX_01: [0.38, 0.775], SAT_LX_02: [0.6, 0.51], SAT_LX_07: [0.806, 0.8], SAT_LX_03: [0.625, 0.328], SAT_LX_04: [0.938, 0.69], SAT_LX_05: [0.17, 0.05], SAT_LX_06: [0.235, 0.11] }, V0 = { ML_PLAINS_01: [0.5, 0.55], SAT_ML_01: [0.15, 0.75], SAT_ML_02: [0.195, 0.212], WILD_ML_STONESEA: [0.765, 0.318] }, $0 = { DJ_CENTRAL_01: [0.65, 0.485], DJ_KW_01: [0.13, 0.145], DJ_RIFT_01: [0.268, 0.37], DJ_VOID_01: [0.12, 0.775], DJ_SKY_01: [0.79, 0.08], DJ_TRIB_01: [0.938, 0.285], SAT_DJ_02: [0.225, 0.435], SAT_DJ_10: [0.275, 0.49], SAT_DJ_03: [0.105, 0.81], SAT_DJ_11: [0.225, 0.787], SAT_DJ_04: [0.875, 0.28], SAT_DJ_12: [0.93, 0.335], SAT_DJ_06: [0.187, 0.095], SAT_DJ_13: [0.167, 0.278], SAT_DJ_07: [0.446, 0.552], SAT_DJ_08: [0.866, 0.106], WILD_KW_THUNDER: [0.107, 0.079], SECT_TIANYAN: [0.197, 0.19], SECT_YOUDU: [0.1, 0.655], SECT_JIUJIE: [0.902, 0.373] }, C0 = { DJ_SOUTH_01: [0.5, 0.42], SAT_DJ_01: [0.153, 0.116], WILD_DJ_BANYAN: [0.235, 0.716], WILD_DJ_DARKCAVE: [0.854, 0.742], SECT_WUXIANG: [0.82, 0.27] }, J0 = { DJ_NORTH_01: [0.65, 0.38], SAT_DJ_05: [0.747, 0.514], SAT_DJ_09: [0.579, 0.303] }, Q0 = { tiannan: q0, luanxinghai: K0, mulan: V0, dajin: $0, nanjiang: C0, northland: J0 };
exports.i = Q0;
function w0(W) { return W in Q0; }
const zod_1 = require("./zod.js");
var gL = { $schema: "./wild.schema.json", formatVersion: 4, contentRevision: 8, regions: [{ nodeId: "SAT_TN_08", id: "combat.wild.region.qingxi", name: "青溪坡", description: "溪水穿过草坡，灵泉旁草木丰茂，碎石土间留着新翻的兽迹，向阳石边偶见小巧猫爪印。", searchText: "你收敛气息，留意草木与向阳石边的动静……", realmRequirement: "炼气", scenery: "meadow", species: [{ speciesId: "combat.wild.species.spirit-fox", minLevel: 5, maxLevel: 15 }, { speciesId: "combat.wild.species.rock-boar", minLevel: 5, maxLevel: 15 }, { speciesId: "combat.wild.species.wind-wolf", minLevel: 5, maxLevel: 15 }, { speciesId: "combat.wild.species.mimi", minLevel: 5, maxLevel: 15 }] }, { nodeId: "WILD_TN_MINE", id: "combat.wild.region.old-mine", name: "废矿深处", description: "旧支架斜撑着干燥的矿道，碎石间藏着洞穴，含灵矿土上留有拱掘的痕迹。", searchText: "你放轻脚步，辨听碎石深处的窸窣声……", realmRequirement: "筑基", scenery: "mine", species: [{ speciesId: "combat.wild.species.stoneback-bear", minLevel: 25, maxLevel: 35 }, { speciesId: "combat.wild.species.red-tail-scorpion", minLevel: 25, maxLevel: 35 }, { speciesId: "combat.wild.species.rock-boar", minLevel: 15, maxLevel: 25 }] }, { nodeId: "WILD_YW_CROW", id: "combat.wild.region.fire-nests", name: "地火旁的鸦巢", description: "地火沿赤岩裂隙涌出，热岩上散布着鸦巢，外围阴凉石缝中偶有沙响。", searchText: "热风掠过岩壁，你留意着巢边散落的羽毛……", realmRequirement: "筑基", scenery: "volcanic", species: [{ speciesId: "combat.wild.species.fire-crow", minLevel: 25, maxLevel: 35 }, { speciesId: "combat.wild.species.red-tail-scorpion", minLevel: 25, maxLevel: 35 }] }, { nodeId: "WILD_TN_MOONLAKE", id: "combat.wild.region.moon-lake", name: "月照天池", description: "高山灵池映着天光，浅滩接向幽深潭水，岸边的林子挂满灵果。", searchText: "水面泛起细纹，你循着岸边的足迹望去……", realmRequirement: "金丹", scenery: "lake", species: [{ speciesId: "combat.wild.species.snow-crane", minLevel: 45, maxLevel: 55 }, { speciesId: "combat.wild.species.dark-shell-turtle", minLevel: 45, maxLevel: 55 }, { speciesId: "combat.wild.species.moon-marten", minLevel: 45, maxLevel: 55 }] }, { nodeId: "WILD_ML_STONESEA", id: "combat.wild.region.wind-stones", name: "长风石海", description: "长风掠过草原，裸露的灵脉岩层延向远处，石隙间留着深浅爪痕与扇状尾迹。", searchText: "你循着石原上的爪痕，辨认风中传来的兽鸣……", realmRequirement: "元婴", scenery: "stone", species: [{ speciesId: "combat.wild.species.rock-horn-rhino", minLevel: 65, maxLevel: 75 }] }, { nodeId: "WILD_ZMG_BLACKPOOL", id: "combat.wild.region.black-pool", name: "黑水潭", description: "暗河从山腹汇入黑潭，潭边苔石间泛起浊浪，岸侧地火泉眼蒸腾着灼热白汽。", searchText: "暗流撞上石壁，泉眼白汽翻涌，你屏息留意潭岸的动静……", realmRequirement: "元婴", scenery: "river", species: [{ speciesId: "combat.wild.species.ink-jiao", minLevel: 65, maxLevel: 75 }, { speciesId: "combat.wild.species.dark-shell-turtle", minLevel: 55, maxLevel: 65 }, { speciesId: "combat.wild.species.three-legged-golden-toad", minLevel: 65, maxLevel: 75 }] }, { nodeId: "WILD_ZMG_VINES", id: "combat.wild.region.hidden-vines", name: "幽藤密林", description: "层叠藤叶遮住林隙，灵果散落在湿土上，细枝偶尔无风轻颤。", searchText: "你拨开垂落的藤叶，辨认林间细微的响动……", realmRequirement: "元婴", scenery: "forest", species: [{ speciesId: "combat.wild.species.silverwing-mantis", minLevel: 65, maxLevel: 75 }, { speciesId: "combat.wild.species.moon-marten", minLevel: 55, maxLevel: 65 }] }, { nodeId: "WILD_DJ_BANYAN", id: "combat.wild.region.ancient-banyan", name: "独木成林", description: "一株古榕垂下无数气根，独自撑起大片林荫，树冠与枝叶间各藏兽踪。", searchText: "枝叶在高处轻晃，你循声望向交错的树冠……", realmRequirement: "化神", scenery: "forest", species: [{ speciesId: "combat.wild.species.six-eyed-ape", minLevel: 85, maxLevel: 95 }, { speciesId: "combat.wild.species.silverwing-mantis", minLevel: 75, maxLevel: 85 }] }, { nodeId: "WILD_DJ_DARKCAVE", id: "combat.wild.region.sunless-cave", name: "不见天", description: "古老地穴深不见光，阴灵气息沉在石隙间，幽绿蝶影时隐时现，深处偶有幽蓝鬼火映出厚重虎躯。", searchText: "幽绿与幽蓝在石隙间明灭，你凝神辨听地穴深处的低沉足音……", realmRequirement: "化神", scenery: "cave", species: [{ speciesId: "combat.wild.species.ghost-lantern-butterfly", minLevel: 85, maxLevel: 95 }, { speciesId: "combat.wild.species.nether-tiger", minLevel: 85, maxLevel: 95 }] }, { nodeId: "WILD_KW_THUNDER", id: "combat.wild.region.thunder-cliff", name: "雷云崖", description: "高崖伸入云海，积雷在峰间低鸣，宽阔岩台上散着苍青羽翎。", searchText: "雷声沿云海滚来，你凝神分辨崖外掠过的巨影……", realmRequirement: "化神", scenery: "storm", species: [{ speciesId: "combat.wild.species.thunder-peng", minLevel: 85, maxLevel: 95 }] }], encounter: { minCount: 1, maxCount: 3, cubChance: 0.05, mutantChance: 0.008, allocationSpread: 0.3 }, activity: { explorationCooldownMs: 1000 } };
var U = zod_1.z.string().min(1).max(200), X0 = zod_1.z.strictObject({ nodeId: U, id: U, name: U, description: U, searchText: U, realmRequirement: zod_1.z.enum(Object.keys(official_chunk_z00ve42p_js_1.uf)), scenery: zod_1.z.enum(["meadow", "mine", "volcanic", "lake", "stone", "river", "forest", "cave", "storm"]), species: zod_1.z.array(zod_1.z.strictObject({ speciesId: U, minLevel: zod_1.z.number().int().min(1).max(180), maxLevel: zod_1.z.number().int().min(1).max(180) })).min(1) }), I0 = zod_1.z.strictObject({ $schema: zod_1.z.string().optional(), formatVersion: zod_1.z.literal(4), contentRevision: zod_1.z.number().int().positive(), regions: zod_1.z.array(X0).min(1), encounter: zod_1.z.strictObject({ minCount: zod_1.z.number().int().min(1).max(3), maxCount: zod_1.z.number().int().min(1).max(3), cubChance: zod_1.z.number().min(0).max(1), mutantChance: zod_1.z.number().min(0).max(1), allocationSpread: zod_1.z.number().min(0).max(0.5) }), activity: zod_1.z.strictObject({ explorationCooldownMs: zod_1.z.number().int().min(1).max(60000) }) });
function O0(W) {
    let L = I0.superRefine((R, q) => {
        let E = (Q, X) => q.addIssue({ code: "custom", path: Q, message: X });
        if (R.encounter.minCount > R.encounter.maxCount)
            E(["encounter"], "编组数量上下界颠倒");
        let $ = new Set, J = new Set;
        R.regions.forEach((Q, X) => {
            if ($.has(Q.nodeId) || J.has(Q.id))
                E(["regions", X], "区域重复");
            if ($.add(Q.nodeId), J.add(Q.id), new Set(Q.species.map((I) => I.speciesId)).size !== Q.species.length)
                E(["regions", X, "species"], "物种重复");
            Q.species.forEach((I, O) => {
                let K = ["regions", X, "species", O], C = official_chunk_z00ve42p_js_1.Bf.find((j) => j.id === I.speciesId);
                if (!C)
                    E(K, "引用未知物种");
                if (I.minLevel > I.maxLevel)
                    E(K, "等级上下界颠倒");
                if (C && I.minLevel < C.carryLevel)
                    E(K, "成年等级不得低于物种携带等级");
                if (C && official_chunk_z00ve42p_js_1.uf[Q.realmRequirement] < official_chunk_z00ve42p_js_1.uf[C.realm])
                    E(K, "区域开放境界不得低于物种携带境界");
            });
        });
    }).safeParse(W);
    if (!L.success)
        throw Error((0, official_chunk_z00ve42p_js_1.Mf)("wild/data/wild.json", W, L.error.issues));
    return L.data;
}
var wL = O0(gL);
var H0 = wL.regions;
exports.d = H0;
function r0(W) { return H0.find((L) => L.nodeId === W); }
