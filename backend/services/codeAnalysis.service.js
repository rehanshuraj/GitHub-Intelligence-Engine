import fs from "fs";
import path from "path";
import parser from "@babel/parser";
import traverse from "@babel/traverse";

export function analyzeFile(filePath) {
  try {
    const code = fs.readFileSync(filePath, "utf-8");

    const ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["jsx"],
      errorRecovery: true
    });

    const metrics = [];

    traverse(ast, {
      Function(path) {
        const body = path.node.body;
        if (!body || !body.body) return;

        const complexity = body.body.length;

        metrics.push({
          cyclomaticComplexity: complexity,
          maxNestingDepth: path.getAncestry().length,
          isGodFunction: complexity > 50
        });
      }
    });

    return metrics;
  } catch (err) {
    console.warn("Skipping file (parse error):", filePath);
    return [];
  }
}

export function getAllJSFiles(dir, files = []) {
  const ignored = ["node_modules", ".git", "dist", "build"];

  if (!fs.existsSync(dir)) return files;

  for (const file of fs.readdirSync(dir)) {
    if (ignored.includes(file)) continue;

    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      getAllJSFiles(fullPath, files);
    } else if (file.endsWith(".js") || file.endsWith(".jsx")) {
      files.push(fullPath);
    }
  }

  return files;
}
