"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts = __importStar(require("typescript"));
const debugger_1 = require("../debugger/debugger");
const fs_1 = require("fs");
const sampleFile = 'examples/index.ts';
debugger_1.Debugger.shared.setBreakpoint(sampleFile, 11);
debugger_1.Debugger.shared.on("breakpoint", (file, line, column) => {
    console.log(`> break on ${file}:${line},${column}`);
    setTimeout(() => {
        debugger_1.Debugger.shared.resume();
    }, 2000);
});
const program = ts.createProgram([sampleFile], {
    noResolve: true,
});
const sourceFile = program.getSourceFile(sampleFile);
program.emit(sourceFile, (fileName, data) => {
    if (process.argv.indexOf("--verbose") >= 0) {
        console.log(data);
    }
    fs_1.writeFileSync('examples/index.js', `
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

    ${data.replace('var __ts_debugger = require("../index");', 'var __ts_debugger = {Debugger: Debugger.shared}')}
    `);
}, undefined, undefined, {
    before: [require('../index').createTransformer()]
});
