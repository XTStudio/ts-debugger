import * as ts from "typescript";

export interface BaseVisitor<T extends ts.Node> {

    test: (node: ts.Node) => boolean
    visit(ctx: ts.TransformationContext, sourceFile: ts.SourceFile, node: T): { node: ts.Node, forceReturn?: boolean }

}