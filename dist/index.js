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
const debugger_1 = require("./debugger/debugger");
const sourceFileVisitor_1 = require("./visitor/sourceFileVisitor");
const debuggerStepVisitor_1 = require("./visitor/debuggerStepVisitor");
const callExpressionVisitor_1 = require("./visitor/callExpressionVisitor");
const asyncTokenVisitor_1 = require("./visitor/asyncTokenVisitor");
const visitors = [
    new sourceFileVisitor_1.SourceFileVisitor,
    new asyncTokenVisitor_1.AsyncFunctionDeclarationVisitor,
    new asyncTokenVisitor_1.AsyncFunctionExpressionVisitor,
    new asyncTokenVisitor_1.AsyncArrowFunctionVisitor,
    new asyncTokenVisitor_1.AsyncClassMethodVisitor,
    new debuggerStepVisitor_1.DebuggerStepVisitor,
    new callExpressionVisitor_1.CallExpressionVisitor,
];
exports.createTransformer = function () {
    function visitor(ctx, sourceFile) {
        const visitor = (node) => {
            let result = { node };
            for (let index = 0; index < visitors.length; index++) {
                const item = visitors[index];
                if (item.test(result.node)) {
                    result = item.visit(ctx, sourceFile, result.node);
                }
            }
            return ts.visitEachChild(result.node, visitor, ctx);
        };
        return visitor;
    }
    return (ctx) => {
        return (sourceFile) => ts.visitNode(sourceFile, visitor(ctx, sourceFile));
    };
};
exports.Debugger = debugger_1.Debugger.shared;
