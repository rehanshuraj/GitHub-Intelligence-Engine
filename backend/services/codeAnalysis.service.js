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

/**
 * Recursively collect all .js files
 */

export function getAllJSFiles(dir,files=[]){
    const entries = fs.readdirSync(dir);

    for(const entry of entries){
        const fullPath = path.join(dir,entry);

        if(fs.statSync(fullPath).isDirectory()){
            getAllJSFiles(fullPath,files);
        }else if (fullPath.endsWith(".js")){
            files.push(fullPath);
        }
    }
    return files;
}