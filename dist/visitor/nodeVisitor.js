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
class NodeVisitor {
    static visit(ctx, sourceFile, node) {
        if (ts.isSourceFile(node) || ts.isBlock(node)) {
            const statements = node.statements.slice();
            let newStatements = [];
            statements.forEach(it => {
                if (ts.isFunctionDeclaration(it)) {
                    const newStatement = ts.createFunctionDeclaration(it.decorators, (() => {
                        let modifiers = it.modifiers ? it.modifiers.slice() : [];
                        modifiers.push(ts.createModifier(ts.SyntaxKind.AsyncKeyword));
                        return modifiers;
                    })(), undefined, it.name, it.typeParameters, it.parameters, it.type, it.body);
                    newStatements.push(newStatement);
                }
                else {
                    newStatements.push(it);
                }
            });
            node.statements = ts.createNodeArray(newStatements);
        }
        if (ts.isCallExpression(node) && ts.isParenthesizedExpression(node.expression)) {
            if (ts.isArrowFunction(node.expression.expression)) {
                const arrowFunction = node.expression.expression;
                return ts.createCall(ts.createArrowFunction(ts.createNodeArray([ts.createModifier(ts.SyntaxKind.AsyncKeyword)]), undefined, arrowFunction.parameters, undefined, undefined, arrowFunction.body), undefined, undefined);
            }
            else if (ts.isFunctionExpression(node.expression.expression)) {
                const regularFunction = node.expression.expression;
                return ts.createCall(ts.createFunctionExpression(ts.createNodeArray([ts.createModifier(ts.SyntaxKind.AsyncKeyword)]), regularFunction.asteriskToken, regularFunction.name, regularFunction.typeParameters, regularFunction.parameters, regularFunction.type, regularFunction.body), undefined, undefined);
            }
        }
        if (ts.isClassDeclaration(node)) {
            const members = node.members.slice();
            let newMembers = [];
            members.forEach(it => {
                if (ts.isMethodDeclaration(it)) {
                    const newStatement = ts.createMethod(it.decorators, (() => {
                        let modifiers = it.modifiers ? it.modifiers.slice() : [];
                        modifiers.push(ts.createModifier(ts.SyntaxKind.AsyncKeyword));
                        return modifiers;
                    })(), it.asteriskToken, it.name, it.questionToken, it.typeParameters, it.parameters, it.type, it.body);
                    newMembers.push(newStatement);
                }
                else if (ts.isPropertyDeclaration(it)) {
                    newMembers.push(it);
                }
                else {
                    newMembers.push(it);
                }
            });
            node.members = ts.createNodeArray(newMembers);
        }
        return undefined;
    }
}
exports.NodeVisitor = NodeVisitor;
