import * as ts from "typescript";

export const isPropertyInvokingDeclaration = (node: ts.Node): boolean => {
    let current: ts.Node | undefined = node
    while (current !== undefined && current !== null) {
        if (ts.isPropertyDeclaration(current)) {
            if (current.initializer && ts.isCallExpression(current.initializer)) {
                return true
            }
            else {
                return false
            }
        }
        current = current.parent
    }
    return false
}

export const isConstructorDeclaration = (node: ts.Node): boolean => {
    let current: ts.Node | undefined = node
    while (current !== undefined && current !== null) {
        if (ts.isConstructorDeclaration(current)) {
            return true
        }
        current = current.parent
    }
    return false
}