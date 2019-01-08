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
const path = __importStar(require("path"));
const lib = path.resolve(__filename).indexOf("node_modules") >= 0 ? "ts-debugger" : "../index";
class SourceFileVisitor {
    constructor() {
        this.test = (node) => ts.isSourceFile(node);
    }
    visit(ctx, sourceFile, node) {
        let statements = node.statements.slice();
        let declarationStatements = statements.filter(it => {
            return ts.isEnumDeclaration(it)
                || ts.isClassDeclaration(it)
                || ts.isImportDeclaration(it)
                || ts.isFunctionDeclaration(it)
                || ts.isInterfaceDeclaration(it)
                || ts.isTypeAliasDeclaration(it);
        });
        let undeclarationStatements = statements.filter(it => {
            return !(ts.isEnumDeclaration(it)
                || ts.isClassDeclaration(it)
                || ts.isImportDeclaration(it)
                || ts.isFunctionDeclaration(it)
                || ts.isInterfaceDeclaration(it)
                || ts.isTypeAliasDeclaration(it));
        });
        let newStatements = [];
        {
            let declarationVariables = [];
            undeclarationStatements.filter(it => ts.isVariableStatement(it)).forEach(_it => {
                const it = _it;
                it.declarationList.declarations.forEach(it => {
                    if (ts.isIdentifier(it.name)) {
                        declarationVariables.push(it.name.text);
                    }
                });
            });
            if (declarationVariables.length > 0) {
                const declarationList = ts.createVariableDeclarationList(ts.createNodeArray(declarationVariables.map(it => {
                    return ts.createVariableDeclaration(it, undefined);
                })));
                newStatements.push(declarationList);
            }
        }
        {
            declarationStatements.forEach(it => {
                newStatements.push(it);
            });
        }
        {
            const statements = [];
            undeclarationStatements.forEach(it => {
                if (ts.isVariableStatement(it)) {
                    it.declarationList.declarations.forEach(it => {
                        if (ts.isIdentifier(it.name) && it.initializer) {
                            statements.push(ts.createExpressionStatement(ts.createAssignment(it.name, it.initializer)));
                        }
                    });
                }
                else {
                    statements.push(it);
                }
            });
            newStatements.push(ts.createFunctionDeclaration(undefined, undefined, undefined, "__global__", undefined, ts.createNodeArray(), undefined, ts.createBlock(ts.createNodeArray(statements))));
            newStatements.push(ts.createCall(ts.createIdentifier("__global__"), undefined, undefined));
        }
        {
            const declareItem = ts.createVariableDeclaration("__ts_debugger", undefined, ts.createCall(ts.createIdentifier("require"), undefined, ts.createNodeArray([ts.createLiteral(lib)])));
            const declareList = ts.createVariableDeclarationList(ts.createNodeArray([declareItem]));
            newStatements.unshift(ts.createVariableStatement(undefined, declareList));
        }
        node.statements = ts.createNodeArray(newStatements);
        return { node };
    }
}
exports.SourceFileVisitor = SourceFileVisitor;
