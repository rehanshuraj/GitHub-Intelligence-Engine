/**
 * Main analysis controller
 * ------------------------
 * Orchestrates:
 * - Repo fetch
 * - Filtering
 * - Commit analysis
 * - Code analysis
 * - Aggregation (ready for EMS)
 */

import jwt from "jsonwebtoken";

import { fetchRepos } from "../services/github.service.js";
import { filterRepos } from "../services/repoFilter.js";
import { fetchCommits } from "../services/commit.service.js";
import { calculateCommitScore } from "../services/commitScore.js";
import { downloadRepo } from "../services/repoDownload.service.js";
import {
  analyzeFile,
  getAllJSFiles
} from "../services/codeAnalysis.service.js";

export async function analyzeUser(req, res) {
  try {
    // 1️⃣ Username from URL
    const { username } = req.params;

    // 2️⃣ Extract JWT safely
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Missing auth token" });
    }

    // Remove "Bearer "
    const token = authHeader.replace("Bearer ", "");
    const { accessToken } = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // 3️⃣ Fetch & filter repositories
    const repos = await fetchRepos(username, accessToken);
    const filteredRepos = filterRepos(repos);

    // --- Aggregated containers ---
    let allCommits = [];
    let allComplexityMetrics = [];
    let refactorCount = 0;

    // 4️⃣ Analyze each repository
    for (const repo of filteredRepos) {

      const branch =
        repo.defaultBranchRef?.name || "main";

      // ---- Commit analysis ----
      const commits = await fetchCommits(
        username,
        repo.name,
        branch,
        accessToken
      );

      allCommits.push(...commits);

      // Count REAL refactors
      refactorCount += commits.filter(c =>
        c.messageHeadline
          ?.toLowerCase()
          .includes("refactor") &&
        (c.additions + c.deletions) > 20
      ).length;

      // ---- Download repo ----
      const repoPath = await downloadRepo(
        username,
        repo.name,
        accessToken
      );

      // ---- Collect JS files ----
      const jsFiles = getAllJSFiles(repoPath);

      // ---- Analyze each JS file ----
      for (const file of jsFiles) {
        const metrics = analyzeFile(file);
        allComplexityMetrics.push(...metrics);
      }
    }

    // 5️⃣ Final commit quality score
    const commitScore = calculateCommitScore(allCommits);

    // 6️⃣ EMS-ready response
    res.json({
      username,
      reposAnalyzed: filteredRepos.length,
      totalCommits: allCommits.length,
      refactorCommits: refactorCount,
      commitScore,
      functionsAnalyzed: allComplexityMetrics.length,
      complexitySummary: allComplexityMetrics
    });

  } catch (err) {
    console.error("Analyze error:", err);
    res.status(500).json({
      error: "Failed to analyze user"
    });
  }
}
