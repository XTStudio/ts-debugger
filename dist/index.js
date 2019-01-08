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
const nodeVisitor_1 = require("./visitor/nodeVisitor");
const blockVisitor_1 = require("./visitor/blockVisitor");
const debugger_1 = require("./debugger/debugger");
const sourceFileVisitor_1 = require("./visitor/sourceFileVisitor");
const expressionVisitor_1 = require("./visitor/expressionVisitor");
exports.createTransformer = function () {
    function visitor(ctx, sourceFile) {
        const visitor = (node) => {
            let newNode = sourceFileVisitor_1.SourceFileVisitor.visit(ctx, sourceFile, node, visitor) || node;
            newNode = nodeVisitor_1.NodeVisitor.visit(ctx, sourceFile, newNode) || newNode;
            newNode = blockVisitor_1.BlockVisitor.visit(ctx, sourceFile, newNode) || newNode;
            newNode = expressionVisitor_1.ExpressionVisitor.visit(ctx, sourceFile, newNode) || newNode;
            if (newNode !== node) {
                newNode.forEachChild(it => {
                    ts.visitEachChild(it, visitor, ctx);
                });
                return newNode;
            }
            else {
                return ts.visitEachChild(newNode, visitor, ctx);
            }
        };
        return visitor;
    }
    return (ctx) => {
        return (sourceFile) => ts.visitNode(sourceFile, visitor(ctx, sourceFile));
    };
};
exports.__debugger = debugger_1.Debugger.shared;
