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
let awaited = new Map();
class CallExpressionVisitor {
    constructor() {
        this.test = (node) => ts.isCallExpression(node);
    }
    visit(ctx, sourceFile, node) {
        return { node: this.buildAwaitsExpression(node, sourceFile) };
    }
    buildAwaitsExpression(expression, sourceFile) {
        if (expression.expression.escapedText === "___global__") {
            return expression;
        }
        if (expression.expression.escapedText === "require") {
            return expression;
        }
        if (helper_1.isPropertyInvokingDeclaration(expression)) {
            return expression;
        }
        if (helper_1.isConstructorDeclaration(expression)) {
            return expression;
        }
        if (awaited.get(expression) === true) {
            return expression;
        }
        awaited.set(expression, true);
        return ts.createAwait(expression);
    }
}
exports.CallExpressionVisitor = CallExpressionVisitor;
