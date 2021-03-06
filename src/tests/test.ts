import * as ts from "typescript";
import { Debugger } from "../debugger/debugger";
import { writeFileSync } from "fs";

const sampleFile = 'examples/index.ts'
Debugger.shared.setBreakpoint(sampleFile, 6)
Debugger.shared.setBreakpoint(sampleFile, 12)
Debugger.shared.on("breakpoint", (file, line, column) => {
    console.log(`> break on ${file}:${line},${column}`)
    console.log('> stack', Debugger.shared.stack)
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
    writeFileSync('examples/index.js', data)
    console.log(`-------- ${fileName} ---------`);
    eval(data)
}, undefined, undefined, {
        before: [require('../index').createTransformer()]
    })