/**
 * This file:
 * - Reads JS files
 * - Converts code into AST
 * - Sends AST to complexity calculator
 */

import fs from "fs";
import path from "path";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import { calculateComplexity } from "../utils/complexityCalculator.js";

/**
 * Analyze a single JavaScript file
 */

export function analyzeFile(filePath) {
    const code = fs.readFileSync(filePath,"utf-8");

    // convert js code into AST
    const ast = parser.parse(code,{
        sourceType: "module",
        plugins:["jsx"]
    });
    
    const metrics = [];

    //walk through AST nodes
    traverse(ast, {
        Function(path) {
        const complexity = calculateComplexity(path.node);
        metrics.push(complexity);
        }
    });
    return metrics;
}