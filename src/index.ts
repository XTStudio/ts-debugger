import * as ts from "typescript";
import { NodeVisitor } from "./visitor/nodeVisitor";
import { BlockVisitor } from "./visitor/blockVisitor";
import { Debugger } from "./debugger/debugger";
import { SourceFileVisitor } from "./visitor/sourceFileVisitor";
import { ExpressionVisitor } from "./visitor/expressionVisitor";

export const createTransformer = function () {
    function visitor(ctx: ts.TransformationContext, sourceFile: ts.SourceFile) {
        const visitor: ts.Visitor = (node: ts.Node): ts.VisitResult<any> => {
            const newNode = SourceFileVisitor.visit(ctx, sourceFile, node, visitor)
                || NodeVisitor.visit(ctx, sourceFile, node)
                || BlockVisitor.visit(ctx, sourceFile, node)
                || ExpressionVisitor.visit(ctx, sourceFile, node)
            return newNode || ts.visitEachChild(node, visitor, ctx)
        }
        return visitor
    }
    return (ctx: ts.TransformationContext): ts.Transformer<any> => {
        return (sourceFile: ts.SourceFile) => ts.visitNode(sourceFile, visitor(ctx, sourceFile))
    }
}

export const __debugger: Debugger = Debugger.shared