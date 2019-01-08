import * as ts from "typescript";

export class BlockVisitor {

    static visit(ctx: ts.TransformationContext, sourceFile: ts.SourceFile, node: ts.Node): ts.Node | undefined {
        if (ts.isBlock(node)) {
            const statements = node.statements.slice()
            let newStatements: any = []
            statements.forEach(it => {
                if (it.pos >= 0) {
                    newStatements.push(
                        ts.createAwait(
                            ts.createCall(
                                ts.createIdentifier("__ts_debugger.__debugger._step"),
                                ts.createNodeArray(),
                                ts.createNodeArray([ts.createLiteral(sourceFile.fileName), ts.createLiteral(ts.getLineAndCharacterOfPosition(sourceFile, it.getStart(sourceFile)).line + 1)])
                            )
                        )
                    )
                }
                newStatements.push(it)
            })
            node.statements = ts.createNodeArray(newStatements)
        }
        return undefined
    }



}