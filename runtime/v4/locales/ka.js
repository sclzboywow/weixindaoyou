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
        string: { unit: "სიმბოლო", verb: "უნდა შეიცავდეს" },
        file: { unit: "ბაიტი", verb: "უნდა შეიცავდეს" },
        array: { unit: "ელემენტი", verb: "უნდა შეიცავდეს" },
        set: { unit: "ელემენტი", verb: "უნდა შეიცავდეს" },
        map: { unit: "ელემენტი", verb: "უნდა შეიცავდეს" },
    };
    function getSizing(origin) {
        var _a;
        return (_a = Sizable[origin]) !== null && _a !== void 0 ? _a : null;
    }
    const FormatDictionary = {
        regex: "შეყვანა",
        email: "ელ-ფოსტის მისამართი",
        url: "URL",
        emoji: "ემოჯი",
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
        datetime: "თარიღი-დრო",
        date: "თარიღი",
        time: "დრო",
        duration: "ხანგრძლივობა",
        ipv4: "IPv4 მისამართი",
        ipv6: "IPv6 მისამართი",
        mac: "MAC მისამართი",
        cidrv4: "IPv4 დიაპაზონი",
        cidrv6: "IPv6 დიაპაზონი",
        base64: "base64-კოდირებული ველი",
        base64url: "base64url-კოდირებული ველი",
        json_string: "JSON ველი",
        e164: "E.164 ნომერი",
        credit_card: "საკრედიტო ბარათის ნომერი",
        currency_code: "ვალუტის კოდი",
        iban: "IBAN",
        jwt: "JWT",
        template_literal: "შეყვანა",
    };
    const TypeDictionary = {
        nan: "NaN",
        number: "რიცხვი",
        string: "ველი",
        boolean: "ბულეანი",
        function: "ფუნქცია",
        array: "მასივი",
    };
    return (issue) => {
        var _a, _b, _c, _d, _e;
        switch (issue.code) {
            case "invalid_type": {
                const expected = (_a = TypeDictionary[issue.expected]) !== null && _a !== void 0 ? _a : issue.expected;
                const receivedType = util.parsedType(issue.input);
                const received = (_b = TypeDictionary[receivedType]) !== null && _b !== void 0 ? _b : receivedType;
                if (/^[A-Z]/.test(issue.expected)) {
                    return `არასწორი შეყვანა: მოსალოდნელი instanceof ${issue.expected}, მიღებული ${received}`;
                }
                return `არასწორი შეყვანა: მოსალოდნელი ${expected}, მიღებული ${received}`;
            }
            case "invalid_value":
                if (issue.values.length === 1)
                    return `არასწორი შეყვანა: მოსალოდნელი ${util.stringifyPrimitive(issue.values[0])}`;
                return `არასწორი ვარიანტი: მოსალოდნელია ერთ-ერთი ${util.joinValues(issue.values, "|")}-დან`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `ზედმეტად დიდი: მოსალოდნელი ${(_c = issue.origin) !== null && _c !== void 0 ? _c : "მნიშვნელობა"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit}`;
                return `ზედმეტად დიდი: მოსალოდნელი ${(_d = issue.origin) !== null && _d !== void 0 ? _d : "მნიშვნელობა"} იყოს ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `ზედმეტად პატარა: მოსალოდნელი ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `ზედმეტად პატარა: მოსალოდნელი ${issue.origin} იყოს ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with") {
                    return `არასწორი ველი: უნდა იწყებოდეს "${_issue.prefix}"-ით`;
                }
                if (_issue.format === "ends_with")
                    return `არასწორი ველი: უნდა მთავრდებოდეს "${_issue.suffix}"-ით`;
                if (_issue.format === "includes")
                    return `არასწორი ველი: უნდა შეიცავდეს "${_issue.includes}"-ს`;
                if (_issue.format === "regex")
                    return `არასწორი ველი: უნდა შეესაბამებოდეს შაბლონს ${_issue.pattern}`;
                return `არასწორი ${(_e = FormatDictionary[_issue.format]) !== null && _e !== void 0 ? _e : issue.format}`;
            }
            case "not_multiple_of":
                return `არასწორი რიცხვი: უნდა იყოს ${issue.divisor}-ის ჯერადი`;
            case "unrecognized_keys":
                return `უცნობი გასაღებ${issue.keys.length > 1 ? "ები" : "ი"}: ${util.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `არასწორი გასაღები ${issue.origin}-ში`;
            case "invalid_union":
                return "არასწორი შეყვანა";
            case "invalid_element":
                return `არასწორი მნიშვნელობა ${issue.origin}-ში`;
            default:
                return `არასწორი შეყვანა`;
        }
    };
};
function default_1() {
    return {
        localeError: error(),
    };
}
module.exports = exports.default;
