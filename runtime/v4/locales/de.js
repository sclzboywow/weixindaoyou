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
        string: { unit: "Zeichen", verb: "zu haben" },
        file: { unit: "Bytes", verb: "zu haben" },
        array: { unit: "Elemente", verb: "zu haben" },
        set: { unit: "Elemente", verb: "zu haben" },
        map: { unit: "Elemente", verb: "zu haben" },
    };
    function getSizing(origin) {
        var _a;
        return (_a = Sizable[origin]) !== null && _a !== void 0 ? _a : null;
    }
    const FormatDictionary = {
        regex: "Eingabe",
        email: "E-Mail-Adresse",
        url: "URL",
        emoji: "Emoji",
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
        datetime: "ISO-Datum und -Uhrzeit",
        date: "ISO-Datum",
        time: "ISO-Uhrzeit",
        duration: "ISO-Dauer",
        ipv4: "IPv4-Adresse",
        ipv6: "IPv6-Adresse",
        mac: "MAC-Adresse",
        cidrv4: "IPv4-Bereich",
        cidrv6: "IPv6-Bereich",
        base64: "Base64-codierter String",
        base64url: "Base64-URL-codierter String",
        json_string: "JSON-String",
        e164: "E.164-Nummer",
        credit_card: "Kreditkartennummer",
        currency_code: "Währungscode",
        iban: "IBAN",
        jwt: "JWT",
        template_literal: "Eingabe",
    };
    const TypeDictionary = {
        nan: "NaN",
        number: "Zahl",
        array: "Array",
    };
    return (issue) => {
        var _a, _b, _c, _d, _e, _f;
        switch (issue.code) {
            case "invalid_type": {
                const expected = (_a = TypeDictionary[issue.expected]) !== null && _a !== void 0 ? _a : issue.expected;
                const receivedType = util.parsedType(issue.input);
                const received = (_b = TypeDictionary[receivedType]) !== null && _b !== void 0 ? _b : receivedType;
                if (/^[A-Z]/.test(issue.expected)) {
                    return `Ungültige Eingabe: erwartet instanceof ${issue.expected}, erhalten ${received}`;
                }
                return `Ungültige Eingabe: erwartet ${expected}, erhalten ${received}`;
            }
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Ungültige Eingabe: erwartet ${util.stringifyPrimitive(issue.values[0])}`;
                return `Ungültige Option: erwartet eine von ${util.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Zu groß: erwartet, dass ${(_c = issue.origin) !== null && _c !== void 0 ? _c : "Wert"} ${adj}${issue.maximum.toString()} ${(_d = sizing.unit) !== null && _d !== void 0 ? _d : "Elemente"} hat`;
                return `Zu groß: erwartet, dass ${(_e = issue.origin) !== null && _e !== void 0 ? _e : "Wert"} ${adj}${issue.maximum.toString()} ist`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Zu klein: erwartet, dass ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} hat`;
                }
                return `Zu klein: erwartet, dass ${issue.origin} ${adj}${issue.minimum.toString()} ist`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Ungültiger String: muss mit "${_issue.prefix}" beginnen`;
                if (_issue.format === "ends_with")
                    return `Ungültiger String: muss mit "${_issue.suffix}" enden`;
                if (_issue.format === "includes")
                    return `Ungültiger String: muss "${_issue.includes}" enthalten`;
                if (_issue.format === "regex")
                    return `Ungültiger String: muss dem Muster ${_issue.pattern} entsprechen`;
                return `Ungültig: ${(_f = FormatDictionary[_issue.format]) !== null && _f !== void 0 ? _f : issue.format}`;
            }
            case "not_multiple_of":
                return `Ungültige Zahl: muss ein Vielfaches von ${issue.divisor} sein`;
            case "unrecognized_keys":
                return `${issue.keys.length > 1 ? "Unbekannte Schlüssel" : "Unbekannter Schlüssel"}: ${util.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Ungültiger Schlüssel in ${issue.origin}`;
            case "invalid_union":
                return "Ungültige Eingabe";
            case "invalid_element":
                return `Ungültiger Wert in ${issue.origin}`;
            default:
                return `Ungültige Eingabe`;
        }
    };
};
function default_1() {
    return {
        localeError: error(),
    };
}
module.exports = exports.default;
