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
class ExpressionVisitor {
    static visit(ctx, sourceFile, node) {
        if (ts.isPropertyDeclaration(node)) {
            if (node.initializer && ts.isCallExpression(node.initializer)) {
                return false;
            }
            else if (node.initializer && ts.isParenthesizedExpression(node.initializer)) {
                node.initializer.expression;
                return false;
            }
            else if (node.initializer && ts.isArrowFunction(node.initializer)) {
                node.initializer = ts.createArrowFunction(ts.createNodeArray([ts.createModifier(ts.SyntaxKind.AsyncKeyword)]), undefined, node.initializer.parameters, undefined, undefined, node.initializer.body);
            }
        }
        if (ts.isCallExpression(node)) {
            return this.buildAwaitsExpression(node, sourceFile);
        }
        return undefined;
    }
    static buildAwaitsExpression(expression, sourceFile) {
        if (ts.isCallExpression(expression)) {
            if (expression.expression.escapedText === "___global__") {
                return expression;
            }
            if (expression.expression.escapedText === "require") {
                return expression;
            }
            let newArguments = expression.arguments.slice();
            newArguments.forEach((it, idx) => {
                newArguments[idx] = this.buildAwaitsExpression(it, sourceFile);
            });
            return ts.createAwait(ts.createCall(expression.expression, expression.typeArguments, ts.createNodeArray(newArguments)));
        }
        return expression;
    }
    static isPropertyDeclarationNode(node) {
        let current = node;
        while (current !== undefined && current !== null) {
            if (ts.isPropertyDeclaration(current)) {
                process.exit();
                return true;
            }
            current = current.parent;
        }
        return false;
    }
}
exports.ExpressionVisitor = ExpressionVisitor;
