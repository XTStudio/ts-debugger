import * as ts from "typescript";
import { Debugger } from "../debugger/debugger";

const sampleFile = 'examples/index.ts'
Debugger.shared.setBreakpoint(sampleFile, 19)
Debugger.shared.setBreakpoint(sampleFile, 6)
Debugger.shared.setBreakpoint(sampleFile, 8)
Debugger.shared.on("breakpoint", (file, line) => {
    console.log(`> break on ${file}:${line}`)
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
    console.log(`-------- ${fileName} ---------`);
    eval(data)
}, undefined, undefined, {
        before: [require('../index').createTransformer()]
    })