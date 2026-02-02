import jwt from "jsonwebtoken";
import { fetchRepos } from "../services/github.service.js";
import { filterRepos } from "../services/repoFilter.js";
import { fetchCommits } from "../services/commit.service.js";
import { calculateCommitScore } from "../services/commitScore.js";
import { downloadRepo } from "../services/repoDownload.service.js";
import { analyzeFile, getAllJSFiles } from "../services/codeAnalysis.service.js";
import { calculateEMS } from "../services/emsScore.service.js";

export async function analyzeUser(req, res) {
  try {
    const { username } = req.params;

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Missing auth token" });
    }

    const token = authHeader.replace("Bearer ", "");
    const { accessToken } = jwt.verify(token, process.env.JWT_SECRET);

    const repos = await fetchRepos(username, accessToken);
    const filteredRepos = filterRepos(repos);

    let allCommits = [];
    let allComplexityMetrics = [];
    let refactorCount = 0;

    for (const repo of filteredRepos) {
      const branch = repo.defaultBranchRef?.name || "main";

      const commits = await fetchCommits(
        username,
        repo.name,
        branch,
        accessToken
      );

      allCommits.push(...commits);

      refactorCount += commits.filter(c =>
        c.messageHeadline?.toLowerCase().includes("refactor")
      ).length;

      const repoPath = await downloadRepo(username, repo.name, accessToken);
      const jsFiles = getAllJSFiles(repoPath);

      for (const file of jsFiles) {
        const metrics = analyzeFile(file);
        allComplexityMetrics.push(...metrics);
      }
    }

    const commitScore = calculateCommitScore(allCommits);

    const commitHistory = allCommits.map(c => c.committedDate);

    const emsScore = calculateEMS({
      commitScore,
      complexityMetrics: allComplexityMetrics,
      refactorCount,
      commitHistory
    });

    res.json({
      username,
      reposAnalyzed: filteredRepos.length,
      totalCommits: allCommits.length,
      refactorCommits: refactorCount,
      commitScore,
      EMS: emsScore,
      functionsAnalyzed: allComplexityMetrics.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to analyze user" });
  }
}
