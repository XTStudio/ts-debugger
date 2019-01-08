import { BaseVisitor } from "./baseVisitor";
import * as ts from "typescript";
import { isPropertyInvokingDeclaration } from "./helper";

export class AsyncFunctionExpressionVisitor implements BaseVisitor<ts.FunctionExpression> {

    test = (node: ts.Node) => ts.isFunctionExpression(node);

    visit(ctx: ts.TransformationContext, sourceFile: ts.SourceFile, node: ts.FunctionExpression): { node: ts.Node; forceReturn?: boolean | undefined; } {
        if (isPropertyInvokingDeclaration(node)) { return { node } }
        return {
            node: ts.createFunctionExpression(
                (() => {
                    let modifiers: any[] = node.modifiers ? node.modifiers.slice() : []
                    modifiers.push(ts.createModifier(ts.SyntaxKind.AsyncKeyword))
                    return modifiers
                })(),
                node.asteriskToken,
                node.name,
                node.typeParameters,
                node.parameters,
                node.type,
                node.body
            )
        }
    }

}

export class AsyncFunctionDeclarationVisitor implements BaseVisitor<ts.FunctionDeclaration> {

    test = (node: ts.Node) => ts.isFunctionDeclaration(node);

    visit(ctx: ts.TransformationContext, sourceFile: ts.SourceFile, node: ts.FunctionDeclaration): { node: ts.Node; forceReturn?: boolean | undefined; } {
        if (isPropertyInvokingDeclaration(node)) { return { node } }
        return {
            node: ts.createFunctionDeclaration(
                node.decorators,
                (() => {
                    let modifiers: any[] = node.modifiers ? node.modifiers.slice() : []
                    modifiers.push(ts.createModifier(ts.SyntaxKind.AsyncKeyword))
                    return modifiers
                })(),
                node.asteriskToken,
                node.name,
                node.typeParameters,
                node.parameters,
                node.type,
                node.body
            )
        }
    }

}

export class AsyncArrowFunctionVisitor implements BaseVisitor<ts.ArrowFunction> {

    test = (node: ts.Node) => ts.isArrowFunction(node);

    visit(ctx: ts.TransformationContext, sourceFile: ts.SourceFile, node: ts.ArrowFunction): { node: ts.Node; forceReturn?: boolean | undefined; } {
        if (isPropertyInvokingDeclaration(node)) { return { node } }
        return {
            node: ts.createArrowFunction(
                (() => {
                    let modifiers: any[] = node.modifiers ? node.modifiers.slice() : []
                    modifiers.push(ts.createModifier(ts.SyntaxKind.AsyncKeyword))
                    return modifiers
                })(),
                node.typeParameters,
                node.parameters,
                node.type,
                node.equalsGreaterThanToken,
                node.body
            )
        }
    }

}

export class AsyncClassMethodVisitor implements BaseVisitor<ts.MethodDeclaration> {

    test = (node: ts.Node) => ts.isMethodDeclaration(node);

    visit(ctx: ts.TransformationContext, sourceFile: ts.SourceFile, node: ts.MethodDeclaration): { node: ts.Node; forceReturn?: boolean | undefined; } {
        return {
            node: ts.createMethod(
                node.decorators,
                (() => {
                    let modifiers: any[] = node.modifiers ? node.modifiers.slice() : []
                    modifiers.push(ts.createModifier(ts.SyntaxKind.AsyncKeyword))
                    return modifiers
                })(),
                node.asteriskToken,
                node.name,
                node.questionToken,
                node.typeParameters,
                node.parameters,
                node.type,
                node.body
            )
        }
    }

}