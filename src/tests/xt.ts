import * as ts from "typescript";
import { Debugger } from "../debugger/debugger";
import { writeFileSync } from "fs";

const sampleFile = 'examples/index.ts'
Debugger.shared.setBreakpoint(sampleFile, 11)
Debugger.shared.on("breakpoint", (file, line, column) => {
    console.log(`> break on ${file}:${line},${column}`)
    setTimeout(() => {
        Debugger.shared.resume()
    }, 2000)
})

const program = ts.createProgram([sampleFile], {
    noResolve: true,
})
const sourceFile = program.getSourceFile(sampleFile)
program.emit(sourceFile, (fileName: string, data: string) => { 
    if (process.argv.indexOf("--verbose") >= 0) {
        console.log(data);
    }
    writeFileSync('examples/index.js', `
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
    `)
}, undefined, undefined, {
        before: [require('../index').createTransformer()]
    })