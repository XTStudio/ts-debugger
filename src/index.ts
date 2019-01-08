import * as ts from "typescript";
import { Debugger } from "./debugger/debugger";
import { SourceFileVisitor } from "./visitor/sourceFileVisitor";
import { BaseVisitor } from "./visitor/baseVisitor";
import { DebuggerStepVisitor } from "./visitor/debuggerStepVisitor";
import { CallExpressionVisitor } from "./visitor/callExpressionVisitor";
import { AsyncFunctionDeclarationVisitor, AsyncFunctionExpressionVisitor, AsyncArrowFunctionVisitor, AsyncClassMethodVisitor } from "./visitor/asyncTokenVisitor";

const visitors: BaseVisitor<ts.Node>[] = [
    new SourceFileVisitor,
    new AsyncFunctionDeclarationVisitor,
    new AsyncFunctionExpressionVisitor,
    new AsyncArrowFunctionVisitor,
    new AsyncClassMethodVisitor,
    new DebuggerStepVisitor,
    new CallExpressionVisitor,
]

export const createTransformer = function () {
    function visitor(ctx: ts.TransformationContext, sourceFile: ts.SourceFile) {
        const visitor: ts.Visitor = (node: ts.Node): ts.VisitResult<any> => {
            let result: { node: ts.Node, forceReturn?: boolean } = { node }
            for (let index = 0; index < visitors.length; index++) {
                const item = visitors[index];
                if (item.test(result.node)) {
                    result = item.visit(ctx, sourceFile, result.node)
                }
            }
            return ts.visitEachChild(result.node, visitor, ctx)
        }
        return visitor
    }
    return (ctx: ts.TransformationContext): ts.Transformer<any> => {
        return (sourceFile: ts.SourceFile) => ts.visitNode(sourceFile, visitor(ctx, sourceFile))
    }
}

export const __debugger: Debugger = Debugger.shared