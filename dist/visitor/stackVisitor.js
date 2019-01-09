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
class StackVisitor {
    constructor() {
        this.test = (node) => ts.isBlock(node);
    }
    visit(ctx, sourceFile, node) {
        let statements = node.statements.slice();
        const createEnterStatement = () => {
            const info = ts.getLineAndCharacterOfPosition(sourceFile, statements[0].getStart(sourceFile));
            const enterExpression = ts.createCall(ts.createIdentifier("__ts_debugger.Debugger._enter"), undefined, ts.createNodeArray([
                ts.createStringLiteral(sourceFile.fileName),
                ts.createLiteral(info.line + 1),
                ts.createStringLiteral("block"),
                ts.createObjectLiteral(ts.createNodeArray())
            ]));
            return ts.createExpressionStatement(enterExpression);
        };
        const createExitStatement = (statement) => {
            if (statement && ts.isReturnStatement(statement) && statement.expression) {
                let returnLevel = 0;
                {
                    let current = statement;
                    while (current !== undefined && current !== null) {
                        if (ts.isBlock(current)) {
                            returnLevel++;
                        }
                        if (ts.isFunctionLike(current)) {
                            break;
                        }
                        current = current.parent;
                    }
                }
                return helper_1.applyPosition(statement, ts.createReturn(ts.createCall(ts.createIdentifier("__ts_debugger.Debugger._exit"), undefined, ts.createNodeArray([ts.createLiteral(returnLevel), statement.expression]))));
            }
            else {
                return ts.createCall(ts.createIdentifier("__ts_debugger.Debugger._exit"), undefined, ts.createNodeArray([]));
            }
        };
        if (statements.length > 0 && statements[0].pos >= 0) {
            let newStatements = [];
            newStatements.push(createEnterStatement());
            statements.forEach((it) => {
                if (ts.isReturnStatement(it)) {
                    newStatements.push(createExitStatement(it));
                }
                else {
                    newStatements.push(it);
                }
            });
            newStatements.push(createExitStatement(undefined));
            node.statements = ts.createNodeArray(newStatements);
        }
        return { node };
    }
}
exports.StackVisitor = StackVisitor;
