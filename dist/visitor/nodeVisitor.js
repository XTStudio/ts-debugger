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
            node.statements = newStatements;
        }
        return undefined;
    }
}
exports.NodeVisitor = NodeVisitor;
