"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Debugger {
    constructor() {
        this.stack = [];
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
    _enter(file, line, name, variables) {
        this.stack.push({ file, line, name, variables });
    }
    _exit(level, value) {
        for (let index = 0; index < level; index++) {
            this.stack.pop();
        }
        return value;
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
exports.Debugger = Debugger;
