/**
 * Engineering Maturity Score (EMS)
 * Input: all analyzed metrics
 * Output: single maturity score (0–100)
 */

export function calculateEMS({
    commitScore, //0-20
    complexityMetrics, //array of detected risks
    refactorCount, //number
    commitHistory //timestamps
}) {
    let totalScore =0;

    /**
   * 1️ Commit Quality (20)
   * Already calculated earlier
   */
  totalScore+=commitScore;

  /**
   * 2️ Code Quality (25)
   * We reward LOW complexity
   */
  totalScore+= scoreCodeQuality(complexityMetrics);
  /**
   * 3️ Refactor Discipline (20)
   */
  totalScore+= scoreRefactors(refactorCount);
  /**
   * 4️ Consistency (15)
   */
  totalScore += scoreConsistency(commitHistory);

  /**
   * 5️ Risk Profile (10)
   */
   totalScore += scoreRisk(risks);

   /**
   * 6️ Test Signals (10)
   * Placeholder for now
   */
  totalScore += scoreTests(commitHistory);
  return Math.min(100, totalScore);
}
