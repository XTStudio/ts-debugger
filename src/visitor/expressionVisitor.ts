import * as ts from "typescript";

export class ExpressionVisitor {

    static visit(ctx: ts.TransformationContext, sourceFile: ts.SourceFile, node: ts.Node): ts.Node | undefined | boolean {
        if (ts.isPropertyDeclaration(node)) {
            if (node.initializer && ts.isCallExpression(node.initializer)) {
                return false
            }
            else if (node.initializer && ts.isParenthesizedExpression(node.initializer)) {
                node.initializer.expression
                return false
            }
            else if (node.initializer && ts.isArrowFunction(node.initializer)) {
                node.initializer = ts.createArrowFunction(ts.createNodeArray([ts.createModifier(ts.SyntaxKind.AsyncKeyword)]), undefined, node.initializer.parameters, undefined, undefined, node.initializer.body)
            }
        }
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

    static isPropertyDeclarationNode(node: ts.Node): boolean {
        let current = node
        while (current !== undefined && current !== null) {
            if (ts.isPropertyDeclaration(current)) {
                process.exit()
                return true
            }
            current = current.parent
        }
        return false
    }

}