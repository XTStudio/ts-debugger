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
exports.isPropertyInvokingDeclaration = (node) => {
    let current = node;
    while (current !== undefined && current !== null) {
        if (ts.isPropertyDeclaration(current)) {
            if (current.initializer && ts.isCallExpression(current.initializer)) {
                return true;
            }
            else {
                return false;
            }
        }
        current = current.parent;
    }
    return false;
};
exports.isConstructorDeclaration = (node) => {
    let current = node;
    while (current !== undefined && current !== null) {
        if (ts.isConstructorDeclaration(current)) {
            return true;
        }
        current = current.parent;
    }
    return false;
};
