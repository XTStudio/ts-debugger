import { BaseVisitor } from "./baseVisitor";
import * as ts from "typescript";
import { isPropertyInvokingDeclaration, isConstructorDeclaration, applyPosition } from "./helper";

let awaited: Map<ts.Node, boolean> = new Map()

export class CallExpressionVisitor implements BaseVisitor<ts.CallExpression> {

    test = (node: ts.Node) => ts.isCallExpression(node);

    visit(ctx: ts.TransformationContext, sourceFile: ts.SourceFile, node: ts.CallExpression): { node: ts.Node; forceReturn?: boolean | undefined; } {
        return { node: this.buildAwaitsExpression(node, sourceFile) }
    }

    buildAwaitsExpression(expression: ts.CallExpression, sourceFile: ts.SourceFile): ts.Expression {
        if ((expression.expression as any).escapedText === "___global__") {
            return expression
        }
        if ((expression.expression as any).escapedText === "require") {
            return expression
        }
        if (isPropertyInvokingDeclaration(expression)) { return expression }
        if (isConstructorDeclaration(expression)) { return expression }
        if (awaited.get(expression) === true) { return expression }
        awaited.set(expression, true)
        return applyPosition(expression, ts.createAwait(expression)) as ts.CallExpression
    }

}