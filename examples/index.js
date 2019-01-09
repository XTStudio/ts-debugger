
    class Debugger {
        constructor() {
            // internal methods
            this._eventListenners = {};
            this._breakpoints = {};
            this._breakpointResolver = undefined;
            this._preventBreakpoint = false;
        }
        on(event, listenner) {
            if (this._eventListenners[event] === undefined) {
                this._eventListenners[event] = [];
            }
            this._eventListenners[event].push(listenner);
        }
        resume() {
            if (this._breakpointResolver) {
                this._breakpointResolver();
            }
            this._breakpointResolver = undefined;
        }
        setBreakpoint(file, line) {
            if (this._breakpoints[file] === undefined) {
                this._breakpoints[file] = {};
            }
            this._breakpoints[file][line] = true;
        }
        activeBreakpoint(file, line) {
            if (this._breakpoints[file]) {
                this._breakpoints[file][line] = true;
            }
        }
        deactiveBreakpoint(file, line) {
            if (this._breakpoints[file]) {
                this._breakpoints[file][line] = false;
            }
        }
        _enter() {
        }
        _exit() {
        }
        _step(file, line, column) {
            if (!this._preventBreakpoint && this._breakpoints[file] && this._breakpoints[file][line] === true && this._eventListenners["breakpoint"]) {
                return new Promise((resolver) => {
                    this._preventBreakpoint = true;
                    if (this._breakpointResolver) {
                        this._breakpointResolver();
                    }
                    this._preventBreakpoint = false;
                    this._breakpointResolver = resolver;
                    this._eventListenners["breakpoint"].forEach(it => it(file, line, column));
                });
            }
        }
    }
    Debugger.shared = (() => {
        let globalObject = global || window;
        let instance = globalObject["__ts_debugger_instance"] || new Debugger;
        globalObject["__ts_debugger_instance"] = instance;
        return instance;
    })();

    var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __ts_debugger = {Debugger: Debugger.shared}
/// <reference path="../node_modules/xt-studio/types/index.d.ts" />
var MainViewController = /** @class */ (function (_super) {
    __extends(MainViewController, _super);
    function MainViewController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.redView = new UIView;
        _this.yellowView = new UIView;
        return _this;
    }
    MainViewController.prototype.viewDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __ts_debugger.Debugger._step("examples/index.ts", 9, 7)];
                    case 1: return [4 /*yield*/, _a.sent()];
                    case 2:
                        _a.sent()
                        return [4 /*yield*/, _super.prototype.viewDidLoad.call(this)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, __ts_debugger.Debugger._step("examples/index.ts", 10, 7)];
                    case 4: return [4 /*yield*/, _a.sent()];
                    case 5:
                        _a.sent()
                        this.redView.backgroundColor = UIColor.red;
                        return [4 /*yield*/, __ts_debugger.Debugger._step("examples/index.ts", 11, 7)];
                    case 6: return [4 /*yield*/, _a.sent()];
                    case 7:
                        _a.sent()
                        this.yellowView.backgroundColor = UIColor.yellow;
                        return [4 /*yield*/, __ts_debugger.Debugger._step("examples/index.ts", 12, 7)];
                    case 8: return [4 /*yield*/, _a.sent()];
                    case 9:
                        _a.sent()
                        return [4 /*yield*/, this.redView.addSubview(this.yellowView)];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, __ts_debugger.Debugger._step("examples/index.ts", 13, 7)];
                    case 11: return [4 /*yield*/, _a.sent()];
                    case 12:
                        _a.sent()
                        return [4 /*yield*/, this.view.addSubview(this.redView)];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, __ts_debugger.Debugger._step("examples/index.ts", 14, 7)];
                    case 14: return [4 /*yield*/, _a.sent()];
                    case 15:
                        _a.sent()
                        return [4 /*yield*/, this.sendRequest()];
                    case 16:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MainViewController.prototype.viewWillLayoutSubviews = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __ts_debugger.Debugger._step("examples/index.ts", 18, 7)];
                    case 1: return [4 /*yield*/, _a.sent()];
                    case 2:
                        _a.sent()
                        return [4 /*yield*/, _super.prototype.viewWillLayoutSubviews.call(this)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, __ts_debugger.Debugger._step("examples/index.ts", 19, 7)];
                    case 4: return [4 /*yield*/, _a.sent()];
                    case 5:
                        _a.sent()
                        this.redView.frame = { x: 22, y: 22, width: 88, height: 88 };
                        return [4 /*yield*/, __ts_debugger.Debugger._step("examples/index.ts", 20, 7)];
                    case 6: return [4 /*yield*/, _a.sent()];
                    case 7:
                        _a.sent()
                        this.yellowView.frame = { x: 22, y: 22, width: 22, height: 22 };
                        return [2 /*return*/];
                }
            });
        });
    };
    MainViewController.prototype.sendRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a, _b, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, __ts_debugger.Debugger._step("examples/index.ts", 24, 9)];
                    case 1: return [4 /*yield*/, _c.sent()];
                    case 2:
                        _c.sent()
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 12, , 16]);
                        return [4 /*yield*/, __ts_debugger.Debugger._step("examples/index.ts", 25, 13)];
                    case 4: return [4 /*yield*/, _c.sent()];
                    case 5:
                        _c.sent()
                        return [4 /*yield*/, URLSession.shared.fetch("https://api.github.com")];
                    case 6: return [4 /*yield*/, _c.sent()];
                    case 7:
                        data = _c.sent();
                        return [4 /*yield*/, __ts_debugger.Debugger._step("examples/index.ts", 26, 13)];
                    case 8: return [4 /*yield*/, _c.sent()];
                    case 9:
                        _c.sent()
                        _b = (_a = console).log;
                        return [4 /*yield*/, data.utf8String()];
                    case 10: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 11:
                        _c.sent();
                        return [3 /*break*/, 16];
                    case 12:
                        e_1 = _c.sent();
                        return [4 /*yield*/, __ts_debugger.Debugger._step("examples/index.ts", 28, 13)];
                    case 13: return [4 /*yield*/, _c.sent()];
                    case 14:
                        _c.sent()
                        return [4 /*yield*/, console.log(e_1)];
                    case 15:
                        _c.sent();
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    return MainViewController;
}(UIViewController));
function __global__() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, __ts_debugger.Debugger._step("examples/index.ts", 34, 3)];
                case 1: return [4 /*yield*/, _a.sent()];
                case 2:
                    _a.sent()
                    global.main = new MainViewController;
                    return [2 /*return*/];
            }
        });
    });
}
__global__()

    