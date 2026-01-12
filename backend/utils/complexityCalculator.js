/**
 * Calculates engineering complexity of ONE function
 */

export function calculateComplexity(functionNode){
    let complexity =1; // base complexity
    let maxDepth =0;
    let currentDepth =0;
    let linesOfCode =0;

    function walk(node){
        if(!node) return;

        //increase complexity for control flow
        switch(node.type){
            case "IfStatement":
            case "ForStatement":
            case "WhileStatement":
            case "DoWhileStatement":
            case "ForInStatement":
            case "ForOfStatement":
            case "LogicalExpression":
            case "ConditionalExpression":
                complexity++;
                break;
        }
        //track nesting depth
        if(
            node.type === "IfStatement" ||
            node.type === "ForStatement" ||
            node.type === "WhileStatement"
        ){
            currentDepth++;
            maxDepth=Math.max(maxDepth,currentDepth);
        }

        //recursive traversal
        for(const key in node){
            const value= node[key];
            if(Array.isArray(value)){
                value.forEach(child => walk(child));
            }
            else if(typeof value === "object" && value !== null){
                walk(value);
            }
        }
        // Reduce depth after leaving block
        if (
            node.type === "IfStatement" ||
            node.type === "ForStatement" ||
            node.type === "WhileStatement"
        ) {
             currentDepth--;
        }
    }

  walk(functionNode.body);
  
  // Lines of code (approximate)
  linesOfCode =
    functionNode.loc.end.line - functionNode.loc.start.line;

  return {
    functionName: functionNode.id?.name || "anonymous",
    cyclomaticComplexity: complexity,
    maxNestingDepth: maxDepth,
    linesOfCode,
    isGodFunction:
      complexity > 10 || linesOfCode > 80 || maxDepth > 4
  };
}