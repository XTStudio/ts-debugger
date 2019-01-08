import * as ts from "typescript";

export class NodeVisitor {

    static visit(ctx: ts.TransformationContext, sourceFile: ts.SourceFile, node: ts.Node): ts.Node | undefined {
        if (ts.isSourceFile(node) || ts.isBlock(node)) {
            const statements = node.statements.slice()
            let newStatements: any = []
            statements.forEach(it => {
                if (ts.isFunctionDeclaration(it)) {
                    const newStatement = ts.createFunctionDeclaration(
                        it.decorators,
                        (() => {
                            let modifiers: any[] = it.modifiers ? it.modifiers.slice() : []
                            modifiers.push(ts.createModifier(ts.SyntaxKind.AsyncKeyword))
                            return modifiers
                        })(),
                        undefined,
                        it.name,
                        it.typeParameters,
                        it.parameters,
                        it.type,
                        it.body)
                    newStatements.push(newStatement)
                }
                else {
                    newStatements.push(it)
                }
            })
            node.statements = ts.createNodeArray(newStatements)
        }
        if (ts.isCallExpression(node) && ts.isParenthesizedExpression(node.expression)) {
            if (ts.isArrowFunction(node.expression.expression)) {
                const arrowFunction = node.expression.expression
                return ts.createCall(ts.createArrowFunction(ts.createNodeArray([ts.createModifier(ts.SyntaxKind.AsyncKeyword)]), undefined, arrowFunction.parameters, undefined, undefined, arrowFunction.body), undefined, undefined)
            }
            else if (ts.isFunctionExpression(node.expression.expression)) {
                const regularFunction = node.expression.expression
                return ts.createCall(ts.createFunctionExpression(ts.createNodeArray([ts.createModifier(ts.SyntaxKind.AsyncKeyword)]), regularFunction.asteriskToken, regularFunction.name, regularFunction.typeParameters, regularFunction.parameters, regularFunction.type, regularFunction.body), undefined, undefined)
            }
        }
        if (ts.isClassDeclaration(node)) {
            const members = node.members.slice()
            let newMembers: any[] = []
            members.forEach(it => {
                if (ts.isMethodDeclaration(it)) {
                    const newStatement = ts.createMethod(
                        it.decorators,
                        (() => {
                            let modifiers: any[] = it.modifiers ? it.modifiers.slice() : []
                            modifiers.push(ts.createModifier(ts.SyntaxKind.AsyncKeyword))
                            return modifiers
                        })(),
                        it.asteriskToken,
                        it.name,
                        it.questionToken,
                        it.typeParameters,
                        it.parameters,
                        it.type,
                        it.body
                    )
                    newMembers.push(newStatement)
                }
                else {
                    newMembers.push(it)
                }
            })
            node.members = ts.createNodeArray(newMembers)
        }
        return undefined
    }

}