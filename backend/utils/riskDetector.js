/**
 * Detects risky coding patterns inside a function AST node
 * Input: functionNode (AST)
 * Output: list of risk flags
 */

export function detectRisks(functionNode) {
  const risks = [];

  /**
   * Helper function to walk AST recursively
   */
  function walk(node) {
    if (!node) return;

    /**
     * 1️⃣ Hardcoded secrets
     * Example:
     * const apiKey = "sk-123456"
     */
    if (
      node.type === "VariableDeclarator" &&
      node.init &&
      node.init.type === "StringLiteral"
    ) {
      const name = node.id.name?.toLowerCase();
      const value = node.init.value.toLowerCase();

      if (
        name?.includes("password") ||
        name?.includes("secret") ||
        name?.includes("apikey") ||
        value.includes("sk-") ||
        value.length > 20
      ) {
        risks.push("Hardcoded secret detected");
      }
    }

    /**
     * 2️⃣ Empty catch block
     * Example:
     * try { ... } catch (e) {}
     */
    if (
      node.type === "CatchClause" &&
      node.body.body.length === 0
    ) {
      risks.push("Empty catch block (errors ignored)");
    }

    /**
     * 3️⃣ Console logs in production code
     */
    if (
      node.type === "CallExpression" &&
      node.callee.object?.name === "console"
    ) {
      risks.push("Console log found");
    }

    /**
     * 4️⃣ Dangerous equality (== instead of ===)
     */
    if (
      node.type === "BinaryExpression" &&
      node.operator === "=="
    ) {
      risks.push("Loose equality (==) used");
    }

    /**
     * 5️⃣ Global mutation
     */
    if (
      node.type === "AssignmentExpression" &&
      node.left.type === "Identifier"
    ) {
      risks.push("Possible global state mutation");
    }

    // Walk child nodes
    for (const key in node) {
      const value = node[key];
      if (Array.isArray(value)) {
        value.forEach(child => walk(child));
      } else if (typeof value === "object" && value !== null) {
        walk(value);
      }
    }
  }

  walk(functionNode.body);

  return [...new Set(risks)]; // remove duplicates
}
