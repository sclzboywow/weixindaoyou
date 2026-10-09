"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.i = exports.f = exports.d = void 0;
exports.a = HL;
exports.b = ML;
exports.c = DL;
exports.e = uL;
exports.g = GL;
exports.h = ZL;
exports.j = SL;
const official_chunk_5t5dj3pd_js_1 = require("./official-chunk-5t5dj3pd.js");
const official_chunk_xc4q1y3j_js_1 = require("./official-chunk-xc4q1y3j.js");
var V = Uint8Array, D = Uint16Array, ne = Int32Array, we = new V([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]), Ke = new V([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]), re = new V([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), ve = function (L, e) {
    var I = new D(31);
    for (var E = 0; E < 31; ++E)
        I[E] = e += 1 << L[E - 1];
    var R = new ne(I[30]);
    for (var E = 1; E < 30; ++E)
        for (var q = I[E]; q < I[E + 1]; ++q)
            R[q] = q - I[E] << 5 | E;
    return { b: I, r: R };
}, Ne = ve(we, 2), Te = Ne.b, he = Ne.r;
Te[28] = 258, he[258] = 28;
var Ve = ve(Ke, 0), _e = Ve.b, $L = Ve.r, d = new D(32768);
for (W = 0; W < 32768; ++W)
    Q = (W & 43690) >> 1 | (W & 21845) << 1, Q = (Q & 52428) >> 2 | (Q & 13107) << 2, Q = (Q & 61680) >> 4 | (Q & 3855) << 4, d[W] = ((Q & 65280) >> 8 | (Q & 255) << 8) >> 1;
var Q, W, A = function (L, e, I) {
    var E = L.length, R = 0, q = new D(e);
    for (; R < E; ++R)
        if (L[R])
            ++q[L[R] - 1];
    var w = new D(e);
    for (R = 1; R < e; ++R)
        w[R] = w[R - 1] + q[R - 1] << 1;
    var m;
    if (I) {
        m = new D(1 << e);
        var v = 15 - e;
        for (R = 0; R < E; ++R)
            if (L[R]) {
                var J = R << 4 | L[R], N = e - L[R], x = w[L[R] - 1]++ << N;
                for (var C = x | (1 << N) - 1; x <= C; ++x)
                    m[d[x] >> v] = J;
            }
    }
    else {
        m = new D(E);
        for (R = 0; R < E; ++R)
            if (L[R])
                m[R] = d[w[L[R] - 1]++] >> 15 - L[R];
    }
    return m;
}, U = new V(288);
for (W = 0; W < 144; ++W)
    U[W] = 8;
var W;
for (W = 144; W < 256; ++W)
    U[W] = 9;
var W;
for (W = 256; W < 280; ++W)
    U[W] = 7;
var W;
for (W = 280; W < 288; ++W)
    U[W] = 8;
var W, Oe = new V(32);
for (W = 0; W < 32; ++W)
    Oe[W] = 5;
var W;
var ue = A(U, 9, 1);
var oe = A(Oe, 5, 1), l = function (L) {
    var e = L[0];
    for (var I = 1; I < L.length; ++I)
        if (L[I] > e)
            e = L[I];
    return e;
}, Y = function (L, e, I) { var E = e / 8 | 0; return (L[E] | L[E + 1] << 8) >> (e & 7) & I; }, b = function (L, e) { var I = e / 8 | 0; return (L[I] | L[I + 1] << 8 | L[I + 2] << 16) >> (e & 7); }, pe = function (L) { return (L + 7) / 8 | 0; }, $e = function (L, e, I) {
    if (e == null || e < 0)
        e = 0;
    if (I == null || I > L.length)
        I = L.length;
    return new V(L.subarray(e, I));
};
var ie = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data"], $ = function (L, e, I) {
    var E = Error(e || ie[L]);
    if (E.code = L, Error.captureStackTrace)
        Error.captureStackTrace(E, $);
    if (!I)
        throw E;
    return E;
}, ce = function (L, e, I, E) {
    var R = L.length, q = E ? E.length : 0;
    if (!R || e.f && !e.l)
        return I || new V(0);
    var w = !I, m = w || e.i != 2, v = e.i;
    if (w)
        I = new V(R * 3);
    var J = function (qe) {
        var me = I.length;
        if (qe > me) {
            var Ce = new V(Math.max(me * 2, qe));
            Ce.set(I), I = Ce;
        }
    }, N = e.f || 0, x = e.p || 0, C = e.b || 0, T = e.l, F = e.d, j = e.m, G = e.n, h = R * 8;
    do {
        if (!T) {
            N = Y(L, x, 1);
            var _ = Y(L, x + 1, 3);
            if (x += 3, !_) {
                var g = pe(x) + 4, u = L[g - 4] | L[g - 3] << 8, o = g + u;
                if (o > R) {
                    if (v)
                        $(0);
                    break;
                }
                if (m)
                    J(C + u);
                I.set(L.subarray(g, o), C), e.b = C += u, e.p = x = o * 8, e.f = N;
                continue;
            }
            else if (_ == 1)
                T = ue, F = oe, j = 9, G = 5;
            else if (_ == 2) {
                var p = Y(L, x, 31) + 257, t = Y(L, x + 10, 15) + 4, ee = p + Y(L, x + 5, 31) + 1;
                x += 14;
                var Z = new V(ee), i = new V(19);
                for (var O = 0; O < t; ++O)
                    i[re[O]] = Y(L, x + O * 3, 7);
                x += t * 3;
                var Le = l(i), Ae = (1 << Le) - 1, Ue = A(i, Le, 1);
                for (var O = 0; O < ee;) {
                    var Ie = Ue[Y(L, x, Ae)];
                    x += Ie & 15;
                    var g = Ie >> 4;
                    if (g < 16)
                        Z[O++] = g;
                    else {
                        var H = 0, k = 0;
                        if (g == 16)
                            k = 3 + Y(L, x, 3), x += 2, H = Z[O - 1];
                        else if (g == 17)
                            k = 3 + Y(L, x, 7), x += 3;
                        else if (g == 18)
                            k = 11 + Y(L, x, 127), x += 7;
                        while (k--)
                            Z[O++] = H;
                    }
                }
                var Re = Z.subarray(0, p), X = Z.subarray(p);
                j = l(Re), G = l(X), T = A(Re, j, 1), F = A(X, G, 1);
            }
            else
                $(1);
            if (x > h) {
                if (v)
                    $(0);
                break;
            }
        }
        if (m)
            J(C + 131072);
        var ye = (1 << j) - 1, ke = (1 << G) - 1, c = x;
        for (;; c = x) {
            var H = T[b(L, x) & ye], M = H >> 4;
            if (x += H & 15, x > h) {
                if (v)
                    $(0);
                break;
            }
            if (!H)
                $(2);
            if (M < 256)
                I[C++] = M;
            else if (M == 256) {
                c = x, T = null;
                break;
            }
            else {
                var Ee = M - 254;
                if (M > 264) {
                    var O = M - 257, S = we[O];
                    Ee = Y(L, x, (1 << S) - 1) + Te[O], x += S;
                }
                var a = F[b(L, x) & ke], s = a >> 4;
                if (!a)
                    $(3);
                x += a & 15;
                var X = _e[s];
                if (s > 3) {
                    var S = Ke[s];
                    X += b(L, x) & (1 << S) - 1, x += S;
                }
                if (x > h) {
                    if (v)
                        $(0);
                    break;
                }
                if (m)
                    J(C + 131072);
                var xe = C + Ee;
                if (C < X) {
                    var We = q - X, ze = Math.min(X, xe);
                    if (We + C < 0)
                        $(3);
                    for (; C < ze; ++C)
                        I[C] = E[We + C];
                }
                for (; C < xe; ++C)
                    I[C] = I[C - X];
            }
        }
        if (e.l = T, e.p = c, e.b = C, e.f = N, T)
            N = 1, e.m = j, e.d = F, e.n = G;
    } while (!N);
    return C != I.length && w ? $e(I, 0, C) : I.subarray(0, C);
};
var ae = new V(0);
var se = function (L) {
    if (L[0] != 31 || L[1] != 139 || L[2] != 8)
        $(6, "invalid gzip data");
    var e = L[3], I = 10;
    if (e & 4)
        I += (L[10] | L[11] << 8) + 2;
    for (var E = (e >> 3 & 1) + (e >> 4 & 1); E > 0; E -= !L[I++])
        ;
    return I + (e & 2);
}, le = function (L) { var e = L.length; return (L[e - 4] | L[e - 3] << 8 | L[e - 2] << 16 | L[e - 1] << 24) >>> 0; };
function Je(L, e) {
    var I = se(L);
    if (I + 8 > L.length)
        $(6, "invalid gzip data");
    return ce(L.subarray(I, -8), { i: 2 }, e && e.out || new V(le(L)), e && e.dictionary);
}
var f = typeof TextDecoder < "u" && new TextDecoder, be = 0;
try {
    f.decode(ae, { stream: !0 }), be = 1;
}
catch (L) { }
var de = function (L) {
    for (var e = "", I = 0;;) {
        var E = L[I++], R = (E > 127) + (E > 223) + (E > 239);
        if (I + R > L.length)
            return { s: e, r: $e(L, I - 1) };
        if (!R)
            e += String.fromCharCode(E);
        else if (R == 3)
            E = ((E & 15) << 18 | (L[I++] & 63) << 12 | (L[I++] & 63) << 6 | L[I++] & 63) - 65536, e += String.fromCharCode(55296 | E >> 10, 56320 | E & 1023);
        else if (R & 1)
            e += String.fromCharCode((E & 31) << 6 | L[I++] & 63);
        else
            e += String.fromCharCode((E & 15) << 12 | (L[I++] & 63) << 6 | L[I++] & 63);
    }
};
function Ye(L, e) {
    if (e) {
        var I = "";
        for (var E = 0; E < L.length; E += 16384)
            I += String.fromCharCode.apply(null, L.subarray(E, E + 16384));
        return I;
    }
    else if (f)
        return f.decode(L);
    else {
        var R = de(L), q = R.s, I = R.r;
        if (I.length)
            $(8);
        return q;
    }
}
var fe = /(?:[\0-\/:-@\[-`\{-\xA9\xAB-\xB1\xB4\xB6-\xB8\xBB\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u037E\u0384\u0385\u0387\u03F6\u0482\u055A-\u055F\u0589\u058A\u058D-\u058F\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0600-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070D\u070F\u07F6-\u07F9\u07FE\u07FF\u0830-\u083E\u085E\u0888\u0890\u0891\u08E2\u0964\u0965\u0970\u09F2\u09F3\u09FA\u09FB\u09FD\u0A76\u0AF0\u0AF1\u0B70\u0BF3-\u0BFA\u0C77\u0C7F\u0C84\u0D4F\u0D79\u0DF4\u0E3F\u0E4F\u0E5A\u0E5B\u0F01-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F85\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE-\u0FDA\u104A-\u104F\u109E\u109F\u10FB\u1360-\u1368\u1390-\u1399\u1400\u166D\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DB\u1800-\u180A\u180E\u1940\u1944\u1945\u19DE-\u19FF\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B4E\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2000-\u2064\u2066-\u206F\u207A-\u207E\u208A-\u208E\u20A0-\u20C4\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2429\u2440-\u244A\u249C-\u24E9\u2500-\u2775\u2794-\u2B73\u2B76-\u2BFF\u2CE5-\u2CEA\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E5D\u2E60-\u2E63\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u303F\u309B\u309C\u30A0\u30FB\u3190\u3191\u3196-\u319F\u31C0-\u31E5\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAA77-\uAA79\uAADE\uAADF\uAAF0\uAAF1\uAB5B\uAB6A\uAB6B\uABEB\uFB29\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDCF\uFDFC-\uFDFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFEFF\uFF01-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFF9-\uFFFD]|\uD800[\uDD00-\uDD02\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDC77\uDC78\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEC8\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDD6E\uDD8E\uDD8F\uDEAD\uDEC9\uDECA\uDED0-\uDED8\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB-\uDCC1\uDCCD\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9\uDFD4\uDFD5\uDFD7\uDFD8]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3F]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09\uDFE1]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFD5-\uDFF1\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD80D[\uDC30-\uDC3F]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3F\uDF44\uDF45]|\uD81B[\uDD6D-\uDD6F\uDE97-\uDE9A\uDFE2]|\uD82F[\uDC9C\uDC9F-\uDCA3]|\uD833[\uDC00-\uDCEF\uDCFA-\uDCFC\uDD00-\uDEB3\uDEBA-\uDED0\uDED2-\uDED4\uDEDD-\uDEFD\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45\uDE53-\uDE5A\uDE5D\uDE5E\uDE60-\uDE7F\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE8B\uDF00-\uDF1C]|\uD838[\uDD4F\uDEFF]|\uD839\uDDFF|\uD83A[\uDD5E\uDD5F]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAE\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED9\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDFDB\uDFE0-\uDFEB\uDFF0-\uDFFF]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0-\uDCBB\uDCC0\uDCC1\uDCD0-\uDCD8\uDD00-\uDE57\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDEC6\uDEC8\uDECC-\uDEDD\uDEDF-\uDEEB\uDEEF-\uDEFA\uDF00-\uDF92\uDF94-\uDFEF\uDFFA]|\uDB40[\uDC01\uDC20-\uDC7F])/g, te = new Set(["镇压", "触手", "父母双亡", "无父无母", "无父母", "真实身份", "天道盟", "杀戮", "杀神", "中枢系统", "叉叉"]);
function ge(L) { return L.normalize("NFKC").toLocaleLowerCase("zh-CN").replace(fe, ""); }
function eL(L) {
    let e = new Set(L.map(ge).filter((R) => R.length > 0 && !te.has(R))), I = new Set, E = new Map;
    for (let R of e) {
        let q = Array.from(R);
        if (q.length <= 2 || /^[a-z0-9]+$/u.test(R) && q.length <= 4) {
            I.add(R);
            continue;
        }
        let w = `${q[0]}${q[1]}`, m = E.get(w);
        if (m)
            m.push(R);
        else
            E.set(w, [R]);
    }
    for (let R of E.values())
        R.sort((q, w) => w.length - q.length);
    return { exactOnlyTerms: I, termsByPrefix: E, termCount: e.size };
}
function Qe(L) {
    let e = eL(L);
    function I(R) {
        let q = ge(R);
        if (!q)
            return null;
        if (e.exactOnlyTerms.has(q))
            return { normalizedContent: q, matchedTerm: q };
        let w = Array.from(q), m = 0;
        for (let v = 0; v < w.length - 1; v += 1) {
            let J = `${w[v]}${w[v + 1]}`, N = e.termsByPrefix.get(J);
            if (N) {
                let x = N.find((C) => q.startsWith(C, m));
                if (x)
                    return { normalizedContent: q, matchedTerm: x };
            }
            m += w[v].length;
        }
        return null;
    }
    function E() { return { termCount: e.termCount, prefixCount: e.termsByPrefix.size, exactOnlyTermCount: e.exactOnlyTerms.size }; }
    return { findLocalContentViolation: I, getLocalBlocklistStats: E };
}
function Xe(L, e, I) {
    if (!I || typeof I !== "object" || Array.isArray(I) || !["POST", "PATCH", "PUT"].includes(L))
        return [];
    let E = I;
    e = e.split("?")[0];
    let R = [];
    if (e === "/api/generate-character")
        R = ["userInput"];
    else if (e === "/api/world-chat/messages" || e === "/api/sects/current/chat/messages")
        R = ["textContent"];
    else if (e === "/api/cultivator/mail/send")
        R = ["content", "title"];
    else if (e === "/api/cultivator/title" || e === "/api/cultivator/profile/title")
        R = ["title"];
    else if (e === "/api/craft")
        R = ["userPrompt"];
    else if (e === "/api/identity-reshape/session" || e === "/api/identity-reshape/generate")
        R = ["description"];
    else if (e === "/api/bet-battles/create")
        R = ["taunt"];
    else if (/^\/api\/black-market\/[^/]+\/sessions\/[^/]+\/interact$/.test(e))
        R = ["message"];
    else if (e === "/api/feedback")
        R = ["content", "title"];
    else if (e === "/api/combat-v6/beasts/rename")
        R = ["name"];
    else if (e === "/api/auth/update-user")
        R = ["name"];
    else if (["/api/auth/sign-up/email", "/api/auth/sign-up/wechat-mini-game", "/api/auth/sign-in/email-otp", "/api/auth/email-otp/send-verification-otp"].includes(e))
        R = ["name", "displayName"];
    let q = R.flatMap((w) => typeof E[w] === "string" ? [E[w]] : []);
    if (e === "/api/world-chat/messages" || e === "/api/sects/current/chat/messages") {
        let w = E.payload;
        if (typeof (w === null || w === void 0 ? void 0 : w.text) === "string")
            q.push(w.text);
    }
    return [...new Set(q.map((w) => w.trim()).filter(Boolean))];
}
var B, y;
function Be(L) {
    let e = JSON.parse(Ye(Je(new Uint8Array(L))));
    if (!Array.isArray(e) || e.some((I) => typeof I !== "string"))
        throw Error("审核词库格式错误");
    B = Qe(e);
}
function LL() {
    if (B)
        return;
    try {
        let L = official_chunk_xc4q1y3j_js_1.Oe.getFileSystemManager();
        for (let e of ["runtime/content-safety/blocked-terms.json.gz", "content-safety/blocked-terms.json.gz"])
            try {
                Be(L.readFileSync(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(e))))))))));
                return;
            }
            catch (_a) { }
    }
    catch (_b) { }
}
LL();
function HL() {
    if (B)
        return Promise.resolve();
    if (y)
        return y;
    return y = new Promise((L, e) => {
        official_chunk_xc4q1y3j_js_1.Oe.loadSubpackage({ name: "content-safety", success: () => {
                try {
                    Be(official_chunk_xc4q1y3j_js_1.Oe.getFileSystemManager().readFileSync(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath(GameGlobal.__remoteAssetPath("content-safety/blocked-terms.json.gz")))))))))), L();
                }
                catch (_a) {
                    e(Error("审核词库加载失败，请重新入界"));
                }
            }, fail: () => e(Error("审核词库分包加载失败，请检查网络后重试")) });
    }).finally(() => { y = void 0; }), y;
}
var z = new Map;
function ML(L) {
    if (!B || !L || /^[\d\s.,/%+\-:]+$/.test(L))
        return L;
    let e = z.get(L);
    if (e !== void 0)
        return e;
    let I = B.findLocalContentViolation(L) ? "内容暂不展示" : L;
    if (z.size >= 2000)
        z.clear();
    return z.set(L, I), I;
}
function DL(L, e, I) {
    let E = Xe(e, L, I);
    if (!E.length)
        return;
    if (!B)
        throw Error("审核词库尚未加载，请重新入界");
    if (E.some((R) => B.findLocalContentViolation(R)))
        throw Error("内容不符合社区规范，请修改后重试");
}
var IL = [{ id: "tiannan", name: "天南", x: 0.855, y: 0.79 }, { id: "mulan", name: "慕兰草原", x: 0.88, y: 0.45 }, { id: "luanxinghai", name: "乱星海", x: 0.48, y: 0.73 }, { id: "dajin", name: "大晋皇朝", x: 0.48, y: 0.24 }, { id: "northland", name: "北境冰原", x: 0.45, y: 0.07 }, { id: "nanjiang", name: "南疆", x: 0.445, y: 0.395 }, { id: "tianlan", name: "天澜草原", x: 0.87, y: 0.29 }, { id: "tiansha", name: "天沙大陆", x: 0.075, y: 0.13 }, { id: "wulonghai", name: "五龙海", x: 0.18, y: 0.52 }, { id: "wubianhai", name: "无边海", x: 0.62, y: 0.5 }, { id: "farwest", name: "极西之地", x: 0.77, y: 0.925 }, { id: "hurricane-desert", name: "飓风沙漠", x: 0.825, y: 0.62 }], RL = { 天南: "tiannan", 慕兰: "mulan", 乱星海: "luanxinghai", 大晋: "dajin" }, EL = { DJ_NORTH_01: "northland", DJ_SOUTH_01: "nanjiang" };
exports.f = IL;
function GL() { return [...(0, official_chunk_5t5dj3pd_js_1.bb)(), ...(0, official_chunk_5t5dj3pd_js_1.cb)(), ...(0, official_chunk_5t5dj3pd_js_1.db)()]; }
function ZL(L) {
    var _a;
    let e = "region" in L ? L : (0, official_chunk_5t5dj3pd_js_1.gb)(L.parent_id);
    if (!e || !("region" in e))
        return;
    let I = (_a = EL[e.id]) !== null && _a !== void 0 ? _a : RL[e.region];
    return IL.find((E) => E.id === I);
}
var xL = { TN_YUE_01: [0.36, 0.61], TN_YUE_02: [0.175, 0.79], TN_YW_01: [0.69, 0.43], TN_XI_01: [0.32, 0.19], TN_BAICAO_01: [0.43, 0.405], TN_YULING_01: [0.53, 0.32], TN_BAIQI_01: [0.57, 0.565], TN_ZMG_01: [0.845, 0.17], TN_BORDER_01: [0.155, 0.385], SAT_TN_01: [0.345, 0.525], SAT_TN_02: [0.325, 0.145], SAT_ZMG_01: [0.795, 0.265], SAT_TN_03: [0.235, 0.745], SAT_TN_08: [0.425, 0.665], SAT_TN_04: [0.31, 0.655], SAT_TN_05: [0.12, 0.425], SAT_TN_06: [0.895, 0.14], SAT_YW_01: [0.615, 0.425], SAT_TN_07: [0.375, 0.735], WILD_TN_MINE: [0.175, 0.465], WILD_YW_CROW: [0.755, 0.365], WILD_TN_MOONLAKE: [0.27, 0.12], WILD_ZMG_BLACKPOOL: [0.87, 0.235], WILD_ZMG_VINES: [0.92, 0.31], SECT_LINGXIAO: [0.715, 0.285] }, WL = { LX_INNER_01: [0.68, 0.397], LX_INNER_02: [0.852, 0.703], LX_OUTER_01: [0.13, 0.68], LX_VOID_01: [0.165, 0.108], SAT_LX_01: [0.38, 0.775], SAT_LX_02: [0.6, 0.51], SAT_LX_07: [0.806, 0.8], SAT_LX_03: [0.625, 0.328], SAT_LX_04: [0.938, 0.69], SAT_LX_05: [0.17, 0.05], SAT_LX_06: [0.235, 0.11] }, qL = { ML_PLAINS_01: [0.5, 0.55], SAT_ML_01: [0.15, 0.75], SAT_ML_02: [0.195, 0.212], WILD_ML_STONESEA: [0.765, 0.318] }, mL = { DJ_CENTRAL_01: [0.65, 0.485], DJ_KW_01: [0.13, 0.145], DJ_RIFT_01: [0.268, 0.37], DJ_VOID_01: [0.12, 0.775], DJ_SKY_01: [0.79, 0.08], DJ_TRIB_01: [0.938, 0.285], SAT_DJ_02: [0.225, 0.435], SAT_DJ_10: [0.275, 0.49], SAT_DJ_03: [0.105, 0.81], SAT_DJ_11: [0.225, 0.787], SAT_DJ_04: [0.875, 0.28], SAT_DJ_12: [0.93, 0.335], SAT_DJ_06: [0.187, 0.095], SAT_DJ_13: [0.167, 0.278], SAT_DJ_07: [0.446, 0.552], SAT_DJ_08: [0.866, 0.106], WILD_KW_THUNDER: [0.107, 0.079], WILD_RIFT_WALLS: [0.245, 0.305], WILD_PEARL_BEND: [0.185, 0.37], WILD_RESIN_GROVE: [0.34, 0.335], WILD_BROKEN_UPLAND: [0.35, 0.425], WILD_MIST_LANTERN_WOOD: [0.065, 0.725], WILD_MOLTEN_TIDE_SHORE: [0.075, 0.89], WILD_SUNKEN_STAR_REEF: [0.175, 0.88], WILD_BROKEN_ARMS_FOREST: [0.275, 0.875], WILD_CINNABAR_NESTS: [0.68, 0.07], WILD_JADE_SPRING_GARDEN: [0.71, 0.17], WILD_WINDBREAK_CLIFF: [0.79, 0.225], WILD_BURIED_BONE_TERRACE: [0.605, 0.18], WILD_SKYFALL_CASCADE: [0.95, 0.205], WILD_ASHEN_SUN_PEAK: [0.94, 0.115], WILD_RENEWED_GREEN: [0.81, 0.35], WILD_SILENT_THUNDER_STELES: [0.96, 0.43], SECT_TIANYAN: [0.197, 0.19], SECT_YOUDU: [0.1, 0.655], SECT_JIUJIE: [0.902, 0.373] }, CL = { DJ_SOUTH_01: [0.5, 0.42], SAT_DJ_01: [0.153, 0.116], WILD_DJ_BANYAN: [0.235, 0.716], WILD_DJ_DARKCAVE: [0.854, 0.742], SECT_WUXIANG: [0.82, 0.27] }, wL = { DJ_NORTH_01: [0.65, 0.38], SAT_DJ_05: [0.747, 0.514], SAT_DJ_09: [0.579, 0.303] }, KL = { tiannan: xL, luanxinghai: WL, mulan: qL, dajin: mL, nanjiang: CL, northland: wL };
exports.i = KL;
function SL(L) { return L in KL; }
const zod_1 = require("./zod.js");
var Pe = { $schema: "./wild.schema.json", formatVersion: 4, contentRevision: 10, regions: [{ nodeId: "SAT_TN_08", id: "combat.wild.region.qingxi", name: "青溪坡", description: "溪水穿过草坡，灵泉旁草木丰茂，碎石土间留着新翻的兽迹，向阳石边偶见小巧猫爪印。", searchText: "你收敛气息，留意草木与向阳石边的动静……", realmRequirement: "炼气", scenery: "meadow", species: [{ speciesId: "combat.wild.species.spirit-fox", minLevel: 5, maxLevel: 15 }, { speciesId: "combat.wild.species.rock-boar", minLevel: 5, maxLevel: 15 }, { speciesId: "combat.wild.species.wind-wolf", minLevel: 5, maxLevel: 15 }, { speciesId: "combat.wild.species.mimi", minLevel: 5, maxLevel: 15 }] }, { nodeId: "WILD_TN_MINE", id: "combat.wild.region.old-mine", name: "废矿深处", description: "旧支架斜撑着干燥的矿道，碎石间藏着洞穴，含灵矿土上留有拱掘的痕迹。", searchText: "你放轻脚步，辨听碎石深处的窸窣声……", realmRequirement: "筑基", scenery: "mine", species: [{ speciesId: "combat.wild.species.stoneback-bear", minLevel: 25, maxLevel: 35 }, { speciesId: "combat.wild.species.red-tail-scorpion", minLevel: 25, maxLevel: 35 }, { speciesId: "combat.wild.species.rock-boar", minLevel: 15, maxLevel: 25 }] }, { nodeId: "WILD_YW_CROW", id: "combat.wild.region.fire-nests", name: "地火旁的鸦巢", description: "地火沿赤岩裂隙涌出，热岩上散布着鸦巢，外围阴凉石缝中偶有沙响。", searchText: "热风掠过岩壁，你留意着巢边散落的羽毛……", realmRequirement: "筑基", scenery: "volcanic", species: [{ speciesId: "combat.wild.species.fire-crow", minLevel: 25, maxLevel: 35 }, { speciesId: "combat.wild.species.red-tail-scorpion", minLevel: 25, maxLevel: 35 }] }, { nodeId: "WILD_TN_MOONLAKE", id: "combat.wild.region.moon-lake", name: "月照天池", description: "高山灵池映着天光，浅滩接向幽深潭水，岸边的林子挂满灵果。", searchText: "水面泛起细纹，你循着岸边的足迹望去……", realmRequirement: "金丹", scenery: "lake", species: [{ speciesId: "combat.wild.species.snow-crane", minLevel: 45, maxLevel: 55 }, { speciesId: "combat.wild.species.dark-shell-turtle", minLevel: 45, maxLevel: 55 }, { speciesId: "combat.wild.species.moon-marten", minLevel: 45, maxLevel: 55 }] }, { nodeId: "WILD_ML_STONESEA", id: "combat.wild.region.wind-stones", name: "长风石海", description: "长风掠过草原，裸露的灵脉岩层延向远处，石隙间留着深浅爪痕与扇状尾迹。", searchText: "你循着石原上的爪痕，辨认风中传来的兽鸣……", realmRequirement: "元婴", scenery: "stone", species: [{ speciesId: "combat.wild.species.rock-horn-rhino", minLevel: 65, maxLevel: 75 }] }, { nodeId: "WILD_ZMG_BLACKPOOL", id: "combat.wild.region.black-pool", name: "黑水潭", description: "暗河从山腹汇入黑潭，潭边苔石间泛起浊浪，岸侧地火泉眼蒸腾着灼热白汽。", searchText: "暗流撞上石壁，泉眼白汽翻涌，你屏息留意潭岸的动静……", realmRequirement: "元婴", scenery: "river", species: [{ speciesId: "combat.wild.species.ink-jiao", minLevel: 65, maxLevel: 75 }, { speciesId: "combat.wild.species.dark-shell-turtle", minLevel: 55, maxLevel: 65 }, { speciesId: "combat.wild.species.three-legged-golden-toad", minLevel: 65, maxLevel: 75 }] }, { nodeId: "WILD_ZMG_VINES", id: "combat.wild.region.hidden-vines", name: "幽藤密林", description: "层叠藤叶遮住林隙，灵果散落在湿土上，细枝偶尔无风轻颤。", searchText: "你拨开垂落的藤叶，辨认林间细微的响动……", realmRequirement: "元婴", scenery: "forest", species: [{ speciesId: "combat.wild.species.silverwing-mantis", minLevel: 65, maxLevel: 75 }, { speciesId: "combat.wild.species.moon-marten", minLevel: 55, maxLevel: 65 }] }, { nodeId: "WILD_DJ_BANYAN", id: "combat.wild.region.ancient-banyan", name: "独木成林", description: "一株古榕垂下无数气根，独自撑起大片林荫，树冠与枝叶间各藏兽踪。", searchText: "枝叶在高处轻晃，你循声望向交错的树冠……", realmRequirement: "化神", scenery: "forest", species: [{ speciesId: "combat.wild.species.six-eyed-ape", minLevel: 85, maxLevel: 95 }, { speciesId: "combat.wild.species.silverwing-mantis", minLevel: 75, maxLevel: 85 }] }, { nodeId: "WILD_DJ_DARKCAVE", id: "combat.wild.region.sunless-cave", name: "不见天", description: "古老地穴深不见光，阴灵气息沉在石隙间，幽绿蝶影时隐时现，深处偶有幽蓝鬼火映出厚重虎躯。", searchText: "幽绿与幽蓝在石隙间明灭，你凝神辨听地穴深处的低沉足音……", realmRequirement: "化神", scenery: "cave", species: [{ speciesId: "combat.wild.species.ghost-lantern-butterfly", minLevel: 85, maxLevel: 95 }, { speciesId: "combat.wild.species.nether-tiger", minLevel: 85, maxLevel: 95 }] }, { nodeId: "WILD_KW_THUNDER", id: "combat.wild.region.thunder-cliff", name: "雷云崖", description: "高崖伸入云海，积雷在峰间低鸣，宽阔岩台上散着苍青羽翎。", searchText: "雷声沿云海滚来，你凝神分辨崖外掠过的巨影……", realmRequirement: "化神", scenery: "storm", species: [{ speciesId: "combat.wild.species.thunder-peng", minLevel: 85, maxLevel: 95 }] }, { nodeId: "WILD_RIFT_WALLS", id: "combat.wild.region.rift-walls", name: "悬风石壁", description: "裂渊石壁间的罡风时急时缓，薄翼与巨羽掠过断岩，石缝中留着长躯攀行的细痕。", searchText: "你收敛气息，沿着灵息与兽迹细细寻觅……", realmRequirement: "炼虚", scenery: "stone", species: [{ speciesId: "combat.wild.species.mingshe", minLevel: 105, maxLevel: 115 }, { speciesId: "combat.wild.species.thunder-peng", minLevel: 105, maxLevel: 115 }] }, { nodeId: "WILD_PEARL_BEND", id: "combat.wild.region.pearl-bend", name: "珠露暗湾", description: "灵液沿岩壁凝珠滴落，暗湾水色幽青，沉水石边时见双壳微张，老龟伏在苔痕深处。", searchText: "你收敛气息，沿着灵息与兽迹细细寻觅……", realmRequirement: "炼虚", scenery: "river", species: [{ speciesId: "combat.wild.species.shen-clam", minLevel: 105, maxLevel: 115 }, { speciesId: "combat.wild.species.dark-shell-turtle", minLevel: 105, maxLevel: 115 }] }, { nodeId: "WILD_RESIN_GROVE", id: "combat.wild.region.resin-grove", name: "听泉古林", description: "古木根系攀住涧壁，泉声穿林，青鸾沿树冠掠过，银翅螳螂静伏枝叶间。", searchText: "你收敛气息，沿着灵息与兽迹细细寻觅……", realmRequirement: "炼虚", scenery: "forest", species: [{ speciesId: "combat.wild.species.qingluan", minLevel: 105, maxLevel: 115 }, { speciesId: "combat.wild.species.silverwing-mantis", minLevel: 105, maxLevel: 115 }] }, { nodeId: "WILD_BROKEN_UPLAND", id: "combat.wild.region.broken-upland", name: "断岩高甸", description: "碎裂石岭上生着低矮灵草，独角兽的蹄印绕开松动岩层，远处偶有赤褐尾影横过。", searchText: "你收敛气息，沿着灵息与兽迹细细寻觅……", realmRequirement: "炼虚", scenery: "meadow", species: [{ speciesId: "combat.wild.species.xiezhi", minLevel: 105, maxLevel: 115 }, { speciesId: "combat.wild.species.rock-horn-rhino", minLevel: 105, maxLevel: 115 }] }, { nodeId: "WILD_MIST_LANTERN_WOOD", id: "combat.wild.region.mist-lantern-wood", name: "雾灯林", description: "海雾漫过古林，狐貂踪迹在灵泉边交错；浓雾深处偶有九尾舒展，转瞬隐入树影。", searchText: "你收敛气息，沿着灵息与兽迹细细寻觅……", realmRequirement: "合体", scenery: "forest", rareChance: 0.008, species: [{ speciesId: "combat.wild.species.spirit-fox", minLevel: 125, maxLevel: 135 }, { speciesId: "combat.wild.species.moon-marten", minLevel: 125, maxLevel: 135 }, { speciesId: "combat.wild.species.qingluan", minLevel: 125, maxLevel: 135 }, { speciesId: "combat.wild.species.nine-tailed-fox", minLevel: 125, maxLevel: 135 }] }, { nodeId: "WILD_MOLTEN_TIDE_SHORE", id: "combat.wild.region.molten-tide-shore", name: "熔潮岸", description: "黑潮拍打地火裂隙，赤喉鸦与金蟾盘踞热岩，灰烬间偶尔留下深长犬足印。", searchText: "你收敛气息，沿着灵息与兽迹细细寻觅……", realmRequirement: "合体", scenery: "volcanic", rareChance: 0.008, species: [{ speciesId: "combat.wild.species.fire-crow", minLevel: 125, maxLevel: 135 }, { speciesId: "combat.wild.species.three-legged-golden-toad", minLevel: 125, maxLevel: 135 }, { speciesId: "combat.wild.species.nether-tiger", minLevel: 125, maxLevel: 135 }, { speciesId: "combat.wild.species.huodou", minLevel: 125, maxLevel: 135 }] }, { nodeId: "WILD_SUNKEN_STAR_REEF", id: "combat.wild.region.sunken-star-reef", name: "沉星礁", description: "幽深礁池中蛟影游走，老龟与巨蚌伏在水底；罕见的鸟首长尾从礁缝间探出。", searchText: "你收敛气息，沿着灵息与兽迹细细寻觅……", realmRequirement: "合体", scenery: "lake", rareChance: 0.008, species: [{ speciesId: "combat.wild.species.dark-shell-turtle", minLevel: 125, maxLevel: 135 }, { speciesId: "combat.wild.species.ink-jiao", minLevel: 125, maxLevel: 135 }, { speciesId: "combat.wild.species.shen-clam", minLevel: 125, maxLevel: 135 }, { speciesId: "combat.wild.species.xuangui", minLevel: 125, maxLevel: 135 }] }, { nodeId: "WILD_BROKEN_ARMS_FOREST", id: "combat.wild.region.broken-arms-forest", name: "断兵石林", description: "古战场的断石如林，灵猿与凶虫循石隙而行，深处偶传赤足踏石的沉响。", searchText: "你收敛气息，沿着灵息与兽迹细细寻觅……", realmRequirement: "合体", scenery: "stone", rareChance: 0.008, species: [{ speciesId: "combat.wild.species.six-eyed-ape", minLevel: 125, maxLevel: 135 }, { speciesId: "combat.wild.species.rock-horn-rhino", minLevel: 125, maxLevel: 135 }, { speciesId: "combat.wild.species.silverwing-mantis", minLevel: 125, maxLevel: 135 }, { speciesId: "combat.wild.species.zhuyan", minLevel: 125, maxLevel: 135 }] }, { nodeId: "WILD_CINNABAR_NESTS", id: "combat.wild.region.cinnabar-nests", name: "丹霞危巢", description: "炽热断壁高悬云上，灵禽在危巢间穿行；赤纹独足的长羽身影偶尔停在最高枯枝。", searchText: "你收敛气息，沿着灵息与兽迹细细寻觅……", realmRequirement: "大乘", scenery: "volcanic", rareChance: 0.008, species: [{ speciesId: "combat.wild.species.fire-crow", minLevel: 145, maxLevel: 155 }, { speciesId: "combat.wild.species.thunder-peng", minLevel: 145, maxLevel: 155 }, { speciesId: "combat.wild.species.snow-crane", minLevel: 145, maxLevel: 155 }, { speciesId: "combat.wild.species.bifang", minLevel: 145, maxLevel: 155 }] }, { nodeId: "WILD_JADE_SPRING_GARDEN", id: "combat.wild.region.jade-spring-garden", name: "玉泉旧苑", description: "荒废古苑仍有灵泉涌流，鹤与独角兽循水歇息，泉雾中偶现白毛长鬃的静立异兽。", searchText: "你收敛气息，沿着灵息与兽迹细细寻觅……", realmRequirement: "大乘", scenery: "lake", rareChance: 0.008, species: [{ speciesId: "combat.wild.species.snow-crane", minLevel: 145, maxLevel: 155 }, { speciesId: "combat.wild.species.xiezhi", minLevel: 145, maxLevel: 155 }, { speciesId: "combat.wild.species.qingluan", minLevel: 145, maxLevel: 155 }, { speciesId: "combat.wild.species.baize", minLevel: 145, maxLevel: 155 }] }, { nodeId: "WILD_WINDBREAK_CLIFF", id: "combat.wild.region.windbreak-cliff", name: "折翼崖", description: "罡风在折断山崖间回旋，狼虎伏于背风石隙；偶有带翼虎形自高处掠落。", searchText: "你收敛气息，沿着灵息与兽迹细细寻觅……", realmRequirement: "大乘", scenery: "storm", rareChance: 0.008, species: [{ speciesId: "combat.wild.species.wind-wolf", minLevel: 145, maxLevel: 155 }, { speciesId: "combat.wild.species.nether-tiger", minLevel: 145, maxLevel: 155 }, { speciesId: "combat.wild.species.mingshe", minLevel: 145, maxLevel: 155 }, { speciesId: "combat.wild.species.qiongqi", minLevel: 145, maxLevel: 155 }] }, { nodeId: "WILD_BURIED_BONE_TERRACE", id: "combat.wild.region.buried-bone-terrace", name: "埋骨荒台", description: "古战台上碎骨与残石深埋，猪熊循地脉翻寻灵物，偶有卷角巨口在尘灰后缓缓张开。", searchText: "你收敛气息，沿着灵息与兽迹细细寻觅……", realmRequirement: "大乘", scenery: "stone", rareChance: 0.008, species: [{ speciesId: "combat.wild.species.rock-boar", minLevel: 145, maxLevel: 155 }, { speciesId: "combat.wild.species.stoneback-bear", minLevel: 145, maxLevel: 155 }, { speciesId: "combat.wild.species.rock-horn-rhino", minLevel: 145, maxLevel: 155 }, { speciesId: "combat.wild.species.taotie", minLevel: 145, maxLevel: 155 }] }, { nodeId: "WILD_SKYFALL_CASCADE", id: "combat.wild.region.skyfall-cascade", name: "垂天水瀑", description: "天水悬落于雷云之间，蛟蛇逐流，巨蚌闭壳纳息；双翼龙影极偶尔穿过瀑顶。", searchText: "你收敛气息，沿着灵息与兽迹细细寻觅……", realmRequirement: "渡劫", scenery: "river", rareChance: 0.008, species: [{ speciesId: "combat.wild.species.ink-jiao", minLevel: 165, maxLevel: 175 }, { speciesId: "combat.wild.species.shen-clam", minLevel: 165, maxLevel: 175 }, { speciesId: "combat.wild.species.mingshe", minLevel: 165, maxLevel: 175 }, { speciesId: "combat.wild.species.yinglong", minLevel: 165, maxLevel: 175 }] }, { nodeId: "WILD_ASHEN_SUN_PEAK", id: "combat.wild.region.ashen-sun-peak", name: "烬日峰", description: "劫火余温烧灼峰顶，鸦鹏与金蟾各占热岩；偶有三足乌影展翼，羽缘泛起暗金火色。", searchText: "你收敛气息，沿着灵息与兽迹细细寻觅……", realmRequirement: "渡劫", scenery: "volcanic", rareChance: 0.008, species: [{ speciesId: "combat.wild.species.fire-crow", minLevel: 165, maxLevel: 175 }, { speciesId: "combat.wild.species.three-legged-golden-toad", minLevel: 165, maxLevel: 175 }, { speciesId: "combat.wild.species.thunder-peng", minLevel: 165, maxLevel: 175 }, { speciesId: "combat.wild.species.golden-crow", minLevel: 165, maxLevel: 175 }] }, { nodeId: "WILD_RENEWED_GREEN", id: "combat.wild.region.renewed-green", name: "劫后青原", description: "焦土间新草成片，熊鹤饮露，独角兽沿山岭行走；罕见的鳞甲长角身影踏过青原。", searchText: "你收敛气息，沿着灵息与兽迹细细寻觅……", realmRequirement: "渡劫", scenery: "meadow", rareChance: 0.008, species: [{ speciesId: "combat.wild.species.xiezhi", minLevel: 165, maxLevel: 175 }, { speciesId: "combat.wild.species.stoneback-bear", minLevel: 165, maxLevel: 175 }, { speciesId: "combat.wild.species.snow-crane", minLevel: 165, maxLevel: 175 }, { speciesId: "combat.wild.species.qilin", minLevel: 165, maxLevel: 175 }] }, { nodeId: "WILD_SILENT_THUNDER_STELES", id: "combat.wild.region.silent-thunder-steles", name: "寂雷碑谷", description: "古雷碑沉寂无声，虎蝶与灵狼出没幽隙；碑基深处偶有独角长耳异兽伏地听息。", searchText: "你收敛气息，沿着灵息与兽迹细细寻觅……", realmRequirement: "渡劫", scenery: "cave", rareChance: 0.008, species: [{ speciesId: "combat.wild.species.nether-tiger", minLevel: 165, maxLevel: 175 }, { speciesId: "combat.wild.species.ghost-lantern-butterfly", minLevel: 165, maxLevel: 175 }, { speciesId: "combat.wild.species.wind-wolf", minLevel: 165, maxLevel: 175 }, { speciesId: "combat.wild.species.diting", minLevel: 165, maxLevel: 175 }] }], encounter: { minCount: 1, maxCount: 3, cubChance: 0.05, mutantChance: 0.008, allocationSpread: 0.3 }, activity: { explorationCooldownMs: 1000 } };
var P = zod_1.z.string().min(1).max(200), NL = zod_1.z.strictObject({ nodeId: P, id: P, name: P, description: P, searchText: P, rareChance: zod_1.z.number().min(0).max(1).optional(), realmRequirement: zod_1.z.enum(Object.keys(official_chunk_xc4q1y3j_js_1.Lf)), scenery: zod_1.z.enum(["meadow", "mine", "volcanic", "lake", "stone", "river", "forest", "cave", "storm"]), species: zod_1.z.array(zod_1.z.strictObject({ speciesId: P, minLevel: zod_1.z.number().int().min(1).max(180), maxLevel: zod_1.z.number().int().min(1).max(180) })).min(1) }), TL = zod_1.z.strictObject({ $schema: zod_1.z.string().optional(), formatVersion: zod_1.z.literal(4), contentRevision: zod_1.z.number().int().positive(), regions: zod_1.z.array(NL).min(1), encounter: zod_1.z.strictObject({ minCount: zod_1.z.number().int().min(1).max(3), maxCount: zod_1.z.number().int().min(1).max(3), cubChance: zod_1.z.number().min(0).max(1), mutantChance: zod_1.z.number().min(0).max(1), allocationSpread: zod_1.z.number().min(0).max(0.5) }), activity: zod_1.z.strictObject({ explorationCooldownMs: zod_1.z.number().int().min(1).max(60000) }) });
function VL(L) {
    let e = TL.superRefine((I, E) => {
        let R = (m, v) => E.addIssue({ code: "custom", path: m, message: v });
        if (I.encounter.minCount > I.encounter.maxCount)
            R(["encounter"], "编组数量上下界颠倒");
        let q = new Set, w = new Set;
        I.regions.forEach((m, v) => {
            var _a;
            if (q.has(m.nodeId) || w.has(m.id))
                R(["regions", v], "区域重复");
            q.add(m.nodeId), w.add(m.id);
            let J = m.species.filter((N) => official_chunk_xc4q1y3j_js_1.Tf.has(N.speciesId)).length;
            if (J === m.species.length)
                R(["regions", v, "species"], "栖息地必须保留普通物种");
            if (J > 0 && m.rareChance === void 0)
                R(["regions", v, "rareChance"], "含稀有物种的栖息地必须配置稀有概率");
            if (J === 0 && ((_a = m.rareChance) !== null && _a !== void 0 ? _a : 0) > 0)
                R(["regions", v, "rareChance"], "未配置稀有物种，不能启用稀有概率");
            if (new Set(m.species.map((N) => N.speciesId)).size !== m.species.length)
                R(["regions", v, "species"], "物种重复");
            m.species.forEach((N, x) => {
                let C = ["regions", v, "species", x], T = official_chunk_xc4q1y3j_js_1.Sf.find((F) => F.id === N.speciesId);
                if (!T)
                    R(C, "引用未知物种");
                if (N.minLevel > N.maxLevel)
                    R(C, "等级上下界颠倒");
                if (T && N.minLevel < T.carryLevel)
                    R(C, "成年等级不得低于物种携带等级");
                if (T && official_chunk_xc4q1y3j_js_1.Lf[m.realmRequirement] < official_chunk_xc4q1y3j_js_1.Lf[T.realm])
                    R(C, "区域开放境界不得低于物种携带境界");
            });
        });
    }).safeParse(L);
    if (!e.success)
        throw Error((0, official_chunk_xc4q1y3j_js_1.cg)("wild/data/wild.json", L, e.error.issues));
    return e.data;
}
var Se = VL(Pe);
var OL = Se.regions;
exports.d = OL;
function uL(L) { return OL.find((e) => e.nodeId === L); }
