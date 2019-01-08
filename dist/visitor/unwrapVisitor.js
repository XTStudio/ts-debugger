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
class UnwrapVisitor {
    constructor() {
        this.test = (node) => ts.isParenthesizedExpression(node);
    }
    visit(ctx, sourceFile, node) {
        const newNode = this.unwrap(node);
        console.log(newNode);
        process.exit();
        return {
            node: newNode
        };
    }
    unwrap(node) {
        if (ts.isParenthesizedExpression(node) && ts.isParenthesizedExpression(node.expression)) {
            return this.unwrap(node.expression);
        }
        else {
            return node;
        }
    }
}
exports.UnwrapVisitor = UnwrapVisitor;
