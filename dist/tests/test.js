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
    fs_1.writeFileSync('examples/index.js', data);
    console.log(`-------- ${fileName} ---------`);
    eval(data);
}, undefined, undefined, {
    before: [require('../index').createTransformer()]
});
