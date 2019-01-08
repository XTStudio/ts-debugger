"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts = __importStar(require("typescript"));
const helper_1 = require("./helper");
class AsyncFunctionExpressionVisitor {
    constructor() {
        this.test = (node) => ts.isFunctionExpression(node);
    }
    visit(ctx, sourceFile, node) {
        if (helper_1.isPropertyInvokingDeclaration(node)) {
            return { node };
        }
        return {
            node: ts.createFunctionExpression((() => {
                let modifiers = node.modifiers ? node.modifiers.slice() : [];
                modifiers.push(ts.createModifier(ts.SyntaxKind.AsyncKeyword));
                return modifiers;
            })(), node.asteriskToken, node.name, node.typeParameters, node.parameters, node.type, node.body)
        };
    }
}
exports.AsyncFunctionExpressionVisitor = AsyncFunctionExpressionVisitor;
class AsyncFunctionDeclarationVisitor {
    constructor() {
        this.test = (node) => ts.isFunctionDeclaration(node);
    }
    visit(ctx, sourceFile, node) {
        if (helper_1.isPropertyInvokingDeclaration(node)) {
            return { node };
        }
        return {
            node: ts.createFunctionDeclaration(node.decorators, (() => {
                let modifiers = node.modifiers ? node.modifiers.slice() : [];
                modifiers.push(ts.createModifier(ts.SyntaxKind.AsyncKeyword));
                return modifiers;
            })(), node.asteriskToken, node.name, node.typeParameters, node.parameters, node.type, node.body)
        };
    }
}
exports.AsyncFunctionDeclarationVisitor = AsyncFunctionDeclarationVisitor;
class AsyncArrowFunctionVisitor {
    constructor() {
        this.test = (node) => ts.isArrowFunction(node);
    }
    visit(ctx, sourceFile, node) {
        if (helper_1.isPropertyInvokingDeclaration(node)) {
            return { node };
        }
        return {
            node: ts.createArrowFunction((() => {
                let modifiers = node.modifiers ? node.modifiers.slice() : [];
                modifiers.push(ts.createModifier(ts.SyntaxKind.AsyncKeyword));
                return modifiers;
            })(), node.typeParameters, node.parameters, node.type, node.equalsGreaterThanToken, node.body)
        };
    }
}
exports.AsyncArrowFunctionVisitor = AsyncArrowFunctionVisitor;
class AsyncClassMethodVisitor {
    constructor() {
        this.test = (node) => ts.isMethodDeclaration(node);
    }
    visit(ctx, sourceFile, node) {
        return {
            node: ts.createMethod(node.decorators, (() => {
                let modifiers = node.modifiers ? node.modifiers.slice() : [];
                modifiers.push(ts.createModifier(ts.SyntaxKind.AsyncKeyword));
                return modifiers;
            })(), node.asteriskToken, node.name, node.questionToken, node.typeParameters, node.parameters, node.type, node.body)
        };
    }
}
exports.AsyncClassMethodVisitor = AsyncClassMethodVisitor;
