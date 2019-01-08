var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __ts_debugger = require("../index");
var Foo = /** @class */ (function () {
    function Foo() {
        var _this = this;
        this.a = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __ts_debugger.__debugger._step("examples/index.ts", 4, 9)];
                    case 1: return [4 /*yield*/, _a.sent()];
                    case 2:
                        _a.sent()
                        return [2 /*return*/, 123];
                }
            });
        }); };
    }
    Foo.prototype.b = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, __ts_debugger.__debugger._step("examples/index.ts", 8, 9)];
                    case 1: return [4 /*yield*/, _d.sent()];
                    case 2:
                        _d.sent()
                        _b = (_a = console).log;
                        _c = ["123123123"];
                        return [4 /*yield*/, this.a()];
                    case 3: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent()]))];
                    case 4:
                        _d.sent();
                        return [4 /*yield*/, __ts_debugger.__debugger._step("examples/index.ts", 9, 9)];
                    case 5: return [4 /*yield*/, _d.sent()];
                    case 6:
                        _d.sent()
                        return [2 /*return*/, "asdfghjkl"];
                }
            });
        });
    };
    return Foo;
}());
function __global__() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, __ts_debugger.__debugger._step("examples/index.ts", 14, 1)];
                case 1: return [4 /*yield*/, _c.sent()];
                case 2:
                    _c.sent()
                    _b = (_a = console).log;
                    return [4 /*yield*/, new Foo().b()];
                case 3: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                case 4:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
__global__()
