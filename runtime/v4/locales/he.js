"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule)
        return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const util = __importStar(require("../core/util.js"));
const error = () => {
    // Hebrew labels + grammatical gender
    const TypeNames = {
        string: { label: "מחרוזת", gender: "f" },
        number: { label: "מספר", gender: "m" },
        boolean: { label: "ערך בוליאני", gender: "m" },
        bigint: { label: "BigInt", gender: "m" },
        date: { label: "תאריך", gender: "m" },
        array: { label: "מערך", gender: "m" },
        object: { label: "אובייקט", gender: "m" },
        null: { label: "ערך ריק (null)", gender: "m" },
        undefined: { label: "ערך לא מוגדר (undefined)", gender: "m" },
        symbol: { label: "סימבול (Symbol)", gender: "m" },
        function: { label: "פונקציה", gender: "f" },
        map: { label: "מפה (Map)", gender: "f" },
        set: { label: "קבוצה (Set)", gender: "f" },
        file: { label: "קובץ", gender: "m" },
        promise: { label: "Promise", gender: "m" },
        NaN: { label: "NaN", gender: "m" },
        unknown: { label: "ערך לא ידוע", gender: "m" },
        value: { label: "ערך", gender: "m" },
    };
    // Sizing units for size-related messages + localized origin labels
    const Sizable = {
        string: { unit: "תווים", shortLabel: "קצר", longLabel: "ארוך" },
        file: { unit: "בייטים", shortLabel: "קטן", longLabel: "גדול" },
        array: { unit: "פריטים", shortLabel: "קטן", longLabel: "גדול" },
        set: { unit: "פריטים", shortLabel: "קטן", longLabel: "גדול" },
        number: { unit: "", shortLabel: "קטן", longLabel: "גדול" }, // no unit
    };
    // Helpers — labels, articles, and verbs
    const typeEntry = (t) => (t ? TypeNames[t] : undefined);
    const typeLabel = (t) => {
        const e = typeEntry(t);
        if (e)
            return e.label;
        // fallback: show raw string if unknown
        return t !== null && t !== void 0 ? t : TypeNames.unknown.label;
    };
    const withDefinite = (t) => `ה${typeLabel(t)}`;
    const verbFor = (t) => {
        var _a;
        const e = typeEntry(t);
        const gender = (_a = e === null || e === void 0 ? void 0 : e.gender) !== null && _a !== void 0 ? _a : "m";
        return gender === "f" ? "צריכה להיות" : "צריך להיות";
    };
    const getSizing = (origin) => {
        var _a;
        if (!origin)
            return null;
        return (_a = Sizable[origin]) !== null && _a !== void 0 ? _a : null;
    };
    const FormatDictionary = {
        regex: { label: "קלט", gender: "m" },
        email: { label: "כתובת אימייל", gender: "f" },
        url: { label: "כתובת רשת", gender: "f" },
        emoji: { label: "אימוג'י", gender: "m" },
        uuid: { label: "UUID", gender: "m" },
        uuidv4: { label: "UUIDv4", gender: "m" },
        uuidv6: { label: "UUIDv6", gender: "m" },
        nanoid: { label: "nanoid", gender: "m" },
        guid: { label: "GUID", gender: "m" },
        cuid: { label: "cuid", gender: "m" },
        cuid2: { label: "cuid2", gender: "m" },
        ulid: { label: "ULID", gender: "m" },
        xid: { label: "XID", gender: "m" },
        ksuid: { label: "KSUID", gender: "m" },
        datetime: { label: "תאריך וזמן ISO", gender: "m" },
        date: { label: "תאריך ISO", gender: "m" },
        time: { label: "זמן ISO", gender: "m" },
        duration: { label: "משך זמן ISO", gender: "m" },
        ipv4: { label: "כתובת IPv4", gender: "f" },
        ipv6: { label: "כתובת IPv6", gender: "f" },
        mac: { label: "כתובת MAC", gender: "f" },
        cidrv4: { label: "טווח IPv4", gender: "m" },
        cidrv6: { label: "טווח IPv6", gender: "m" },
        base64: { label: "מחרוזת בבסיס 64", gender: "f" },
        base64url: { label: "מחרוזת בבסיס 64 לכתובות רשת", gender: "f" },
        json_string: { label: "מחרוזת JSON", gender: "f" },
        e164: { label: "מספר E.164", gender: "m" },
        credit_card: { label: "מספר כרטיס אשראי", gender: "m" },
        currency_code: { label: "קוד מטבע", gender: "m" },
        iban: { label: "IBAN", gender: "m" },
        jwt: { label: "JWT", gender: "m" },
        template_literal: { label: "קלט", gender: "m" },
        ends_with: { label: "קלט", gender: "m" },
        includes: { label: "קלט", gender: "m" },
        lowercase: { label: "קלט", gender: "m" },
        starts_with: { label: "קלט", gender: "m" },
        uppercase: { label: "קלט", gender: "m" },
    };
    const TypeDictionary = {
        nan: "NaN",
    };
    return (issue) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        switch (issue.code) {
            case "invalid_type": {
                // Expected type: show without definite article for clearer Hebrew
                const expectedKey = issue.expected;
                const expected = (_a = TypeDictionary[expectedKey !== null && expectedKey !== void 0 ? expectedKey : ""]) !== null && _a !== void 0 ? _a : typeLabel(expectedKey);
                // Received: show localized label if known, otherwise constructor/raw
                const receivedType = util.parsedType(issue.input);
                const received = (_d = (_b = TypeDictionary[receivedType]) !== null && _b !== void 0 ? _b : (_c = TypeNames[receivedType]) === null || _c === void 0 ? void 0 : _c.label) !== null && _d !== void 0 ? _d : receivedType;
                if (/^[A-Z]/.test(issue.expected)) {
                    return `קלט לא תקין: צריך להיות instanceof ${issue.expected}, התקבל ${received}`;
                }
                return `קלט לא תקין: צריך להיות ${expected}, התקבל ${received}`;
            }
            case "invalid_value": {
                if (issue.values.length === 1) {
                    return `ערך לא תקין: הערך חייב להיות ${util.stringifyPrimitive(issue.values[0])}`;
                }
                // Join values with proper Hebrew formatting
                const stringified = issue.values.map((v) => util.stringifyPrimitive(v));
                if (issue.values.length === 2) {
                    return `ערך לא תקין: האפשרויות המתאימות הן ${stringified[0]} או ${stringified[1]}`;
                }
                // For 3+ values: "a", "b" או "c"
                const lastValue = stringified[stringified.length - 1];
                const restValues = stringified.slice(0, -1).join(", ");
                return `ערך לא תקין: האפשרויות המתאימות הן ${restValues} או ${lastValue}`;
            }
            case "too_big": {
                const sizing = getSizing(issue.origin);
                const subject = withDefinite((_e = issue.origin) !== null && _e !== void 0 ? _e : "value");
                if (issue.origin === "string") {
                    // Special handling for strings - more natural Hebrew
                    return `${(_f = sizing === null || sizing === void 0 ? void 0 : sizing.longLabel) !== null && _f !== void 0 ? _f : "ארוך"} מדי: ${subject} צריכה להכיל ${issue.maximum.toString()} ${(_g = sizing === null || sizing === void 0 ? void 0 : sizing.unit) !== null && _g !== void 0 ? _g : ""} ${issue.inclusive ? "או פחות" : "לכל היותר"}`.trim();
                }
                if (issue.origin === "number") {
                    // Natural Hebrew for numbers
                    const comparison = issue.inclusive ? `קטן או שווה ל-${issue.maximum}` : `קטן מ-${issue.maximum}`;
                    return `גדול מדי: ${subject} צריך להיות ${comparison}`;
                }
                if (issue.origin === "array" || issue.origin === "set") {
                    // Natural Hebrew for arrays and sets
                    const verb = issue.origin === "set" ? "צריכה" : "צריך";
                    const comparison = issue.inclusive
                        ? `${issue.maximum} ${(_h = sizing === null || sizing === void 0 ? void 0 : sizing.unit) !== null && _h !== void 0 ? _h : ""} או פחות`
                        : `פחות מ-${issue.maximum} ${(_j = sizing === null || sizing === void 0 ? void 0 : sizing.unit) !== null && _j !== void 0 ? _j : ""}`;
                    return `גדול מדי: ${subject} ${verb} להכיל ${comparison}`.trim();
                }
                const adj = issue.inclusive ? "<=" : "<";
                const be = verbFor((_k = issue.origin) !== null && _k !== void 0 ? _k : "value");
                if (sizing === null || sizing === void 0 ? void 0 : sizing.unit) {
                    return `${sizing.longLabel} מדי: ${subject} ${be} ${adj}${issue.maximum.toString()} ${sizing.unit}`;
                }
                return `${(_l = sizing === null || sizing === void 0 ? void 0 : sizing.longLabel) !== null && _l !== void 0 ? _l : "גדול"} מדי: ${subject} ${be} ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const sizing = getSizing(issue.origin);
                const subject = withDefinite((_m = issue.origin) !== null && _m !== void 0 ? _m : "value");
                if (issue.origin === "string") {
                    // Special handling for strings - more natural Hebrew
                    return `${(_o = sizing === null || sizing === void 0 ? void 0 : sizing.shortLabel) !== null && _o !== void 0 ? _o : "קצר"} מדי: ${subject} צריכה להכיל ${issue.minimum.toString()} ${(_p = sizing === null || sizing === void 0 ? void 0 : sizing.unit) !== null && _p !== void 0 ? _p : ""} ${issue.inclusive ? "או יותר" : "לפחות"}`.trim();
                }
                if (issue.origin === "number") {
                    // Natural Hebrew for numbers
                    const comparison = issue.inclusive ? `גדול או שווה ל-${issue.minimum}` : `גדול מ-${issue.minimum}`;
                    return `קטן מדי: ${subject} צריך להיות ${comparison}`;
                }
                if (issue.origin === "array" || issue.origin === "set") {
                    // Natural Hebrew for arrays and sets
                    const verb = issue.origin === "set" ? "צריכה" : "צריך";
                    // Special case for singular (minimum === 1)
                    if (issue.minimum === 1 && issue.inclusive) {
                        const singularPhrase = issue.origin === "set" ? "לפחות פריט אחד" : "לפחות פריט אחד";
                        return `קטן מדי: ${subject} ${verb} להכיל ${singularPhrase}`;
                    }
                    const comparison = issue.inclusive
                        ? `${issue.minimum} ${(_q = sizing === null || sizing === void 0 ? void 0 : sizing.unit) !== null && _q !== void 0 ? _q : ""} או יותר`
                        : `יותר מ-${issue.minimum} ${(_r = sizing === null || sizing === void 0 ? void 0 : sizing.unit) !== null && _r !== void 0 ? _r : ""}`;
                    return `קטן מדי: ${subject} ${verb} להכיל ${comparison}`.trim();
                }
                const adj = issue.inclusive ? ">=" : ">";
                const be = verbFor((_s = issue.origin) !== null && _s !== void 0 ? _s : "value");
                if (sizing === null || sizing === void 0 ? void 0 : sizing.unit) {
                    return `${sizing.shortLabel} מדי: ${subject} ${be} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `${(_t = sizing === null || sizing === void 0 ? void 0 : sizing.shortLabel) !== null && _t !== void 0 ? _t : "קטן"} מדי: ${subject} ${be} ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                // These apply to strings — use feminine grammar + ה׳ הידיעה
                if (_issue.format === "starts_with")
                    return `המחרוזת חייבת להתחיל ב "${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `המחרוזת חייבת להסתיים ב "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `המחרוזת חייבת לכלול "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `המחרוזת חייבת להתאים לתבנית ${_issue.pattern}`;
                // Handle gender agreement for formats
                const nounEntry = FormatDictionary[_issue.format];
                const noun = (_u = nounEntry === null || nounEntry === void 0 ? void 0 : nounEntry.label) !== null && _u !== void 0 ? _u : _issue.format;
                const gender = (_v = nounEntry === null || nounEntry === void 0 ? void 0 : nounEntry.gender) !== null && _v !== void 0 ? _v : "m";
                const adjective = gender === "f" ? "תקינה" : "תקין";
                return `${noun} לא ${adjective}`;
            }
            case "not_multiple_of":
                return `מספר לא תקין: חייב להיות מכפלה של ${issue.divisor}`;
            case "unrecognized_keys":
                return `מפתח${issue.keys.length > 1 ? "ות" : ""} לא מזוה${issue.keys.length > 1 ? "ים" : "ה"}: ${util.joinValues(issue.keys, ", ")}`;
            case "invalid_key": {
                return `שדה לא תקין באובייקט`;
            }
            case "invalid_union":
                return "קלט לא תקין";
            case "invalid_element": {
                const place = withDefinite((_w = issue.origin) !== null && _w !== void 0 ? _w : "array");
                return `ערך לא תקין ב${place}`;
            }
            default:
                return `קלט לא תקין`;
        }
    };
};
function default_1() {
    return {
        localeError: error(),
    };
}
module.exports = exports.default;
