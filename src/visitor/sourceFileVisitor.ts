import * as ts from "typescript";
import * as path from "path";

const lib = path.resolve(__filename).indexOf("node_modules") >= 0 ? "ts-debugger" : "../index"

export class SourceFileVisitor {

    static visit(ctx: ts.TransformationContext, sourceFile: ts.SourceFile, node: ts.Node, visitor: ts.Visitor): ts.Node | undefined {
        if (ts.isSourceFile(node)) {
            let statements = node.statements.slice()
            let declarationStatements = statements.filter(it => {
                return ts.isEnumDeclaration(it)
                    || ts.isClassDeclaration(it)
                    || ts.isImportDeclaration(it)
                    || ts.isFunctionDeclaration(it)
                    || ts.isInterfaceDeclaration(it)
                    || ts.isTypeAliasDeclaration(it)
            })
            let undeclarationStatements = statements.filter(it => {
                return !(ts.isEnumDeclaration(it)
                    || ts.isClassDeclaration(it)
                    || ts.isImportDeclaration(it)
                    || ts.isFunctionDeclaration(it)
                    || ts.isInterfaceDeclaration(it)
                    || ts.isTypeAliasDeclaration(it))
            })
            let newStatements: any[] = []
            {
                let declarationVariables: string[] = []
                undeclarationStatements.filter(it => ts.isVariableStatement(it)).forEach(_it => {
                    const it: ts.VariableStatement = _it as any
                    it.declarationList.declarations.forEach(it => {
                        if (ts.isIdentifier(it.name)) {
                            declarationVariables.push(it.name.text)
                        }
                    })
                })
                if (declarationVariables.length > 0) {
                    const declarationList = ts.createVariableDeclarationList(ts.createNodeArray(declarationVariables.map(it => {
                        return ts.createVariableDeclaration(it, undefined)
                    })))
                    newStatements.push(declarationList)
                }
            }
            {
                declarationStatements.forEach(it => {
                    newStatements.push(it)
                })
            }
            {
                const statements: any[] = []
                undeclarationStatements.forEach(it => {
                    if (ts.isVariableDeclarationList(it)) {
                        it.declarations.forEach(it => {
                            if (ts.isIdentifier(it.name) && it.initializer) {
                                statements.push(ts.createExpressionStatement(ts.createAssignment(it.name, it.initializer)))
                            }
                        })
                    }
                    else {
                        statements.push(it)
                    }
                })
                newStatements.push(ts.createFunctionDeclaration(undefined, undefined, undefined, "__global__", undefined, ts.createNodeArray(), undefined, ts.createBlock(ts.createNodeArray(statements), true)))
                newStatements.push(ts.createCall(ts.createIdentifier("__global__"), undefined, undefined))
            }
            {
                const declareItem = ts.createVariableDeclaration("__ts_debugger", undefined, ts.createCall(ts.createIdentifier("require"), undefined, ts.createNodeArray([ts.createLiteral(lib)])))
                const declareList = ts.createVariableDeclarationList(ts.createNodeArray([declareItem]))
                newStatements.unshift(ts.createVariableStatement(undefined, declareList))
            }
            node.statements = ts.createNodeArray(newStatements)
        }
        return undefined
    }

}