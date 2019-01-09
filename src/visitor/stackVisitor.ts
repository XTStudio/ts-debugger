import { BaseVisitor } from "./baseVisitor";
import * as ts from "typescript";
import { applyPosition } from "./helper";

export class StackVisitor implements BaseVisitor<ts.Block> {

    test = (node: ts.Node) => ts.isBlock(node)

    visit(ctx: ts.TransformationContext, sourceFile: ts.SourceFile, node: ts.Block): { node: ts.Node; forceReturn?: boolean | undefined; } {
        let statements = node.statements.slice()
        const createEnterStatement = () => {
            const info = ts.getLineAndCharacterOfPosition(sourceFile, statements[0].getStart(sourceFile))
            const enterExpression = ts.createCall(ts.createIdentifier("__ts_debugger.Debugger._enter"), undefined, ts.createNodeArray([
                ts.createStringLiteral(sourceFile.fileName),
                ts.createLiteral(info.line + 1),
                ts.createStringLiteral("block"),
                ts.createObjectLiteral(ts.createNodeArray())
            ]))
            return ts.createExpressionStatement(enterExpression)
        }
        const createExitStatement = (statement: ts.Statement | undefined) => {
            if (statement && ts.isReturnStatement(statement) && statement.expression) {
                let returnLevel = 0
                {
                    let current: ts.Node | undefined = statement
                    while (current !== undefined && current !== null) {
                        if (ts.isBlock(current)) {
                            returnLevel++
                        }
                        if (ts.isFunctionLike(current)) {
                            break
                        }
                        current = current.parent
                    }
                }
                return applyPosition(statement, ts.createReturn(ts.createCall(ts.createIdentifier("__ts_debugger.Debugger._exit"), undefined, ts.createNodeArray([ts.createLiteral(returnLevel), statement.expression]))))
            }
            else {
                return ts.createCall(ts.createIdentifier("__ts_debugger.Debugger._exit"), undefined, ts.createNodeArray([]))
            }
        }
        if (statements.length > 0 && statements[0].pos >= 0) {
            let newStatements: any[] = []
            newStatements.push(createEnterStatement())
            statements.forEach((it) => {
                if (ts.isReturnStatement(it)) {
                    newStatements.push(createExitStatement(it))
                }
                else {
                    newStatements.push(it)
                }
            })
            newStatements.push(createExitStatement(undefined))
            node.statements = ts.createNodeArray(newStatements)
        }
        return { node }
    }

}