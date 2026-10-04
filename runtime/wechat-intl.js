var _a, _b;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
    return this[key];
}
var __toCommonJS = (from) => {
    var entry = (__moduleCache !== null && __moduleCache !== void 0 ? __moduleCache : (__moduleCache = new WeakMap)).get(from), desc;
    if (entry)
        return entry;
    entry = __defProp({}, "__esModule", { value: true });
    if (from && typeof from === "object" || typeof from === "function") {
        for (var key of __getOwnPropNames(from))
            if (!__hasOwnProp.call(entry, key))
                __defProp(entry, key, {
                    get: __accessProp.bind(from, key),
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
    }
    __moduleCache.set(from, entry);
    return entry;
};
var __moduleCache;
var __returnValue = (v) => v;
function __exportSetter(name, newValue) {
    this[name] = __returnValue.bind(null, newValue);
}
var __export = (target, all) => {
    for (var name in all)
        __defProp(target, name, {
            get: all[name],
            enumerable: true,
            configurable: true,
            set: __exportSetter.bind(all, name)
        });
};
// src/wechat-intl.ts
var exports_wechat_intl = {};
__export(exports_wechat_intl, {
    wechatIntl: () => wechatIntl,
    ChineseNumberFormat: () => ChineseNumberFormat,
    ChineseDateTimeFormat: () => ChineseDateTimeFormat
});
module.exports = __toCommonJS(exports_wechat_intl);
class ChineseNumberFormat {
    constructor(locale = "zh-CN", options = {}) {
        if (locale !== "zh-CN" || Object.keys(options).length)
            throw Error("Unsupported fallback number format");
    }
    format(value) {
        const n = Number(value);
        if (Number.isNaN(n))
            return "NaN";
        if (!Number.isFinite(n))
            return n < 0 ? "-∞" : "∞";
        const negative = n < 0 || Object.is(n, -0), absolute = Math.abs(n);
        let [integer, fraction = ""] = absolute.toFixed(3).split(".");
        if (integer.includes("e")) {
            const [mantissa, exponent] = integer.split("e");
            const digits = mantissa.replace(".", "");
            integer = digits + "0".repeat(Number(exponent) - (digits.length - 1));
        }
        fraction = fraction.replace(/0+$/, "");
        return (negative ? "-" : "") + integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (fraction ? "." + fraction : "");
    }
}
class ChineseDateTimeFormat {
    constructor(locale = "zh-CN", options = {}) {
        this.locale = locale;
        this.options = options;
        if (locale !== "zh-CN" || Object.keys(options).some((k) => !["year", "month", "day", "hour", "minute", "hour12"].includes(k)))
            throw Error("Unsupported fallback date format");
    }
    format(value = Date.now()) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime()))
            throw new RangeError("Invalid time value");
        const o = this.options, pad = (n) => String(n).padStart(2, "0");
        const part = (n, style) => style === "2-digit" ? pad(n) : String(n);
        const day = [];
        if (o.year)
            day.push(o.year === "2-digit" ? pad(date.getFullYear() % 100) : String(date.getFullYear()));
        if (o.month)
            day.push(part(date.getMonth() + 1, o.month));
        if (o.day)
            day.push(part(date.getDate(), o.day));
        const time = [];
        if (o.hour)
            time.push(part(date.getHours(), o.hour));
        if (o.minute)
            time.push(part(date.getMinutes(), o.minute));
        const dateText = o.year && o.month && !o.day ? `${day[0]}年${day[1]}月` : day.join("/");
        return [dateText, time.join(":")].filter(Boolean).join(" ");
    }
}
var native = globalThis.Intl;
var wechatIntl = {
    NumberFormat: (_a = native === null || native === void 0 ? void 0 : native.NumberFormat) !== null && _a !== void 0 ? _a : ChineseNumberFormat,
    DateTimeFormat: (_b = native === null || native === void 0 ? void 0 : native.DateTimeFormat) !== null && _b !== void 0 ? _b : ChineseDateTimeFormat,
    Segmenter: native === null || native === void 0 ? void 0 : native.Segmenter
};
