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
class BlockVisitor {
    static visit(ctx, sourceFile, node) {
        if (ts.isBlock(node)) {
            const statements = node.statements.slice();
            let newStatements = [];
            statements.forEach(it => {
                if (it.pos >= 0) {
                    newStatements.push(ts.createAwait(ts.createCall(ts.createIdentifier("__ts_debugger.__debugger._step"), ts.createNodeArray(), ts.createNodeArray([ts.createLiteral(sourceFile.fileName), ts.createLiteral(ts.getLineAndCharacterOfPosition(sourceFile, it.getStart(sourceFile)).line + 1)]))));
                }
                newStatements.push(it);
            });
            node.statements = ts.createNodeArray(newStatements);
        }
        return undefined;
    }
}
exports.BlockVisitor = BlockVisitor;
