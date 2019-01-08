import * as ts from "typescript";
import { NodeVisitor } from "./visitor/nodeVisitor";
import { BlockVisitor } from "./visitor/blockVisitor";
import { Debugger } from "./debugger/debugger";
import { SourceFileVisitor } from "./visitor/sourceFileVisitor";
import { ExpressionVisitor } from "./visitor/expressionVisitor";

export const createTransformer = function () {
    function visitor(ctx: ts.TransformationContext, sourceFile: ts.SourceFile) {
        const visitor: ts.Visitor = (node: ts.Node): ts.VisitResult<any> => {
            let newNode = SourceFileVisitor.visit(ctx, sourceFile, node, visitor) || node
            newNode = NodeVisitor.visit(ctx, sourceFile, newNode) || newNode
            newNode = BlockVisitor.visit(ctx, sourceFile, newNode) || newNode
            newNode = ExpressionVisitor.visit(ctx, sourceFile, newNode) || newNode
            if (newNode !== node) {
                newNode.forEachChild(it => {
                    ts.visitEachChild(it, visitor, ctx)
                })
                return newNode
            }
            else {
                return ts.visitEachChild(newNode, visitor, ctx)
            }
        }
        return visitor
    }
    return (ctx: ts.TransformationContext): ts.Transformer<any> => {
        return (sourceFile: ts.SourceFile) => ts.visitNode(sourceFile, visitor(ctx, sourceFile))
    }
}

export const __debugger: Debugger = Debugger.shared