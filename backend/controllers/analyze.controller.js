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
import { filterRepos } from "../repoFilter.js";
import { fetchCommits } from "../services/commit.service.js";
import { calculateCommitScore } from "../services/commitScore.js";
import { downloadRepo } from "../services/repoDownload.service.js";
import {
  analyzeFile,
  getAllJSFiles
} from "../services/codeAnalysis.service.js";

export async function analyzeUser(req, res) {
  try {
    // 1️ Username from URL
    const { username } = req.params;

    // 2️ Extract GitHub access token from JWT
    const jwtToken = req.headers.authorization;
    const { accessToken } = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET
    );

    // 3️ Fetch & filter repositories
    const repos = await fetchRepos(username, accessToken);
    const filteredRepos = filterRepos(repos);

    // --- Aggregated containers ---
    let allCommits = [];
    let allComplexityMetrics = [];
    let refactorCount = 0;

    // 4️ Analyze each repository
    for (const repo of filteredRepos) {
      // ---- Commit analysis ----
      const commits = await fetchCommits(
        username,
        repo.name,
        repo.defaultBranchRef.name,
        accessToken
      );

      allCommits.push(...commits);

      // Count REAL refactors (message + actual change)
      refactorCount += commits.filter(c =>
        c.messageHeadline.toLowerCase().includes("refactor") &&
        (c.additions + c.deletions) > 20
      ).length;

      // ---- Download repo for static analysis ----
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

    // 5️ Final commit quality score (across ALL repos)
    const commitScore = calculateCommitScore(allCommits);

    // 6️ Final response (EMS-ready)
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
    res.status(500).json({
      error: err.message
    });
  }
}
