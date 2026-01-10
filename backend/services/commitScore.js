/**
 * Converts raw commit history into a quality score (0–20)
 * Measures HOW a developer commits, not how often
 */

import { classifyCommit } from "../utils/commitClassifier.js";

export function calculateCommitScore(commits) {
  let score = 0;

  // Commit size distribution
  const sizes = commits.map(c => c.additions + c.deletions);
  const avgSize = sizes.reduce((a, b) => a + b, 0) / sizes.length;

  // Semantic commit messages
  const semanticCount = commits.filter(
    c => classifyCommit(c.messageHeadline) !== "other"
  ).length;

  // Refactor behavior
  const refactorCount = commits.filter(
    c => classifyCommit(c.messageHeadline) === "refactor"
  ).length;

  // Massive commits are bad
  const hasHugeCommits = sizes.some(s => s > 2000);

  if (avgSize < 300) score += 5;
  if (semanticCount / commits.length > 0.6) score += 5;
  if (refactorCount > 0) score += 5;
  if (!hasHugeCommits) score += 5;

  return score;
}
