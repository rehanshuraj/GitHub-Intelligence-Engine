export function calculateEMS({
  commitScore,
  complexityMetrics,
  refactorCount,
  commitHistory
}) {
  let totalScore = 0;

  totalScore += commitScore;
  totalScore += scoreCodeQuality(complexityMetrics);
  totalScore += scoreRefactors(refactorCount);
  totalScore += scoreConsistency(commitHistory);
  totalScore += 10; // placeholder risk
  totalScore += 5;  // placeholder tests

  return Math.min(100, totalScore);
}

function scoreCodeQuality(metrics) {
  if (!metrics.length) return 0;

  let penalty = 0;

  metrics.forEach(fn => {
    if (fn.cyclomaticComplexity > 10) penalty++;
    if (fn.maxNestingDepth > 4) penalty++;
    if (fn.isGodFunction) penalty += 2;
  });

  const normalized = penalty / metrics.length;
  return Math.max(0, Math.round(25 - normalized * 25));
}

function scoreRefactors(count) {
  if (count >= 10) return 20;
  if (count >= 5) return 15;
  if (count >= 1) return 10;
  return 0;
}

function scoreConsistency(history) {
  if (history.length < 2) return 0;

  const gaps = [];
  for (let i = 1; i < history.length; i++) {
    gaps.push(
      (new Date(history[i - 1]) - new Date(history[i])) /
        (1000 * 60 * 60 * 24)
    );
  }

  const avg = gaps.reduce((a, b) => a + b, 0) / gaps.length;
  if (avg < 3) return 15;
  if (avg < 7) return 10;
  if (avg < 14) return 5;
  return 0;
}
