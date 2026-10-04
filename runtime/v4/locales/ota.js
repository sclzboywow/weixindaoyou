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
    const Sizable = {
        string: { unit: "harf", verb: "olmalıdır" },
        file: { unit: "bayt", verb: "olmalıdır" },
        array: { unit: "unsur", verb: "olmalıdır" },
        set: { unit: "unsur", verb: "olmalıdır" },
        map: { unit: "unsur", verb: "olmalıdır" },
    };
    function getSizing(origin) {
        var _a;
        return (_a = Sizable[origin]) !== null && _a !== void 0 ? _a : null;
    }
    const FormatDictionary = {
        regex: "giren",
        email: "epostagâh",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO hengâmı",
        date: "ISO tarihi",
        time: "ISO zamanı",
        duration: "ISO müddeti",
        ipv4: "IPv4 nişânı",
        ipv6: "IPv6 nişânı",
        mac: "MAC nişânı",
        cidrv4: "IPv4 menzili",
        cidrv6: "IPv6 menzili",
        base64: "base64-şifreli metin",
        base64url: "base64url-şifreli metin",
        json_string: "JSON metin",
        e164: "E.164 sayısı",
        credit_card: "i'tibâr kartı numarası",
        currency_code: "para birimi kodu",
        iban: "IBAN",
        jwt: "JWT",
        template_literal: "giren",
    };
    const TypeDictionary = {
        nan: "NaN",
        number: "numara",
        array: "saf",
        null: "gayb",
    };
    return (issue) => {
        var _a, _b, _c, _d, _e, _f;
        switch (issue.code) {
            case "invalid_type": {
                const expected = (_a = TypeDictionary[issue.expected]) !== null && _a !== void 0 ? _a : issue.expected;
                const receivedType = util.parsedType(issue.input);
                const received = (_b = TypeDictionary[receivedType]) !== null && _b !== void 0 ? _b : receivedType;
                if (/^[A-Z]/.test(issue.expected)) {
                    return `Fâsit giren: umulan instanceof ${issue.expected}, alınan ${received}`;
                }
                return `Fâsit giren: umulan ${expected}, alınan ${received}`;
            }
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Fâsit giren: umulan ${util.stringifyPrimitive(issue.values[0])}`;
                return `Fâsit tercih: mûteberler ${util.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Fazla büyük: ${(_c = issue.origin) !== null && _c !== void 0 ? _c : "value"}, ${adj}${issue.maximum.toString()} ${(_d = sizing.unit) !== null && _d !== void 0 ? _d : "elements"} sahip olmalıydı.`;
                return `Fazla büyük: ${(_e = issue.origin) !== null && _e !== void 0 ? _e : "value"}, ${adj}${issue.maximum.toString()} olmalıydı.`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Fazla küçük: ${issue.origin}, ${adj}${issue.minimum.toString()} ${sizing.unit} sahip olmalıydı.`;
                }
                return `Fazla küçük: ${issue.origin}, ${adj}${issue.minimum.toString()} olmalıydı.`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Fâsit metin: "${_issue.prefix}" ile başlamalı.`;
                if (_issue.format === "ends_with")
                    return `Fâsit metin: "${_issue.suffix}" ile bitmeli.`;
                if (_issue.format === "includes")
                    return `Fâsit metin: "${_issue.includes}" ihtivâ etmeli.`;
                if (_issue.format === "regex")
                    return `Fâsit metin: ${_issue.pattern} nakşına uymalı.`;
                return `Fâsit ${(_f = FormatDictionary[_issue.format]) !== null && _f !== void 0 ? _f : issue.format}`;
            }
            case "not_multiple_of":
                return `Fâsit sayı: ${issue.divisor} katı olmalıydı.`;
            case "unrecognized_keys":
                return `Tanınmayan anahtar ${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `${issue.origin} için tanınmayan anahtar var.`;
            case "invalid_union":
                return "Giren tanınamadı.";
            case "invalid_element":
                return `${issue.origin} için tanınmayan kıymet var.`;
            default:
                return `Kıymet tanınamadı.`;
        }
    };
};
function default_1() {
    return {
        localeError: error(),
    };
}
module.exports = exports.default;
