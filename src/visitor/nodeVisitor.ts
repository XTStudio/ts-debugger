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
            node.statements = newStatements
        }
        return undefined
    }

}