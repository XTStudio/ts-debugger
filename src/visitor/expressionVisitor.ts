import * as ts from "typescript";

export class ExpressionVisitor {

    static visit(ctx: ts.TransformationContext, sourceFile: ts.SourceFile, node: ts.Node): ts.Node | undefined {
        if (ts.isCallExpression(node)) {
            return this.buildAwaitsExpression(node, sourceFile)
        }
        return undefined
    }

    static buildAwaitsExpression(expression: ts.Expression, sourceFile: ts.SourceFile): ts.Expression {
        if (ts.isCallExpression(expression)) {
            if ((expression.expression as any).escapedText === "___global__") {
                return expression
            }
            if ((expression.expression as any).escapedText === "require") {
                return expression
            }
            let newArguments = expression.arguments.slice()
            newArguments.forEach((it, idx) => {
                newArguments[idx] = this.buildAwaitsExpression(it, sourceFile)
            })
            return ts.createAwait(ts.createCall(expression.expression, expression.typeArguments, ts.createNodeArray(newArguments)))
        }
        return expression
    }

}