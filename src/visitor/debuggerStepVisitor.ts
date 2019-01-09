import { BaseVisitor } from "./baseVisitor";
import * as ts from "typescript";
import { isPropertyInvokingDeclaration, isConstructorDeclaration } from "./helper";

export class DebuggerStepVisitor implements BaseVisitor<ts.Block> {

    test = (node: ts.Node) => ts.isBlock(node);

    visit(ctx: ts.TransformationContext, sourceFile: ts.SourceFile, node: ts.Block): { node: ts.Node; forceReturn?: boolean | undefined; } {
        if (isPropertyInvokingDeclaration(node)) { return { node } }
        if (isConstructorDeclaration(node)) { return { node } }
        const statements = node.statements.slice()
        let newStatements: any = []
        statements.forEach(it => {
            if (it.pos >= 0) {
                newStatements.push(
                    ts.createAwait(
                        ts.createCall(
                            ts.createIdentifier("__ts_debugger.Debugger._step"),
                            ts.createNodeArray(),
                            ts.createNodeArray([ts.createLiteral(sourceFile.fileName), ts.createLiteral(ts.getLineAndCharacterOfPosition(sourceFile, it.getStart(sourceFile)).line + 1), ts.createLiteral(ts.getLineAndCharacterOfPosition(sourceFile, it.getStart(sourceFile)).character + 1)])
                        )
                    )
                )
            }
            newStatements.push(it)
        })
        return { node: ts.createBlock(ts.createNodeArray(newStatements), true) }
    }

}