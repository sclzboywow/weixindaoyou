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
// src/runtime-clock.ts
var exports_runtime_clock = {};
__export(exports_runtime_clock, {
    monotonicNow: () => monotonicNow,
    installPerformanceClock: () => installPerformanceClock,
    createMonotonicClock: () => createMonotonicClock
});
module.exports = __toCommonJS(exports_runtime_clock);
function createMonotonicClock(read) {
    let previous = read(), elapsed = 0;
    return () => {
        const current = read();
        if (Number.isFinite(current)) {
            elapsed += Math.max(0, current - previous);
            previous = current;
        }
        return elapsed;
    };
}
var native = globalThis.performance;
var monotonicNow = createMonotonicClock(typeof (native === null || native === void 0 ? void 0 : native.now) === "function" ? () => native.now() : () => Date.now());
function installPerformanceClock(scope, shared) {
    if (!scope.performance)
        scope.performance = { now: monotonicNow, timeOrigin: Date.now() - monotonicNow() };
    else if (typeof scope.performance.now !== "function")
        scope.performance.now = monotonicNow;
    if (!shared.performance)
        shared.performance = scope.performance;
}
