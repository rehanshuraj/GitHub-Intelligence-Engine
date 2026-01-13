/** 1
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

/**
 * 2️ Code Quality Score (0–25)
 * Penalizes complexity & god functions
 */

function scoreCodeQuality(metrics){
    if(!metrics.length()) return 0;
    let score = 25; //start with full marks
    metrics.forEach(fn =>{
        if (fn.cyclomaticComplexity > 10)  score -=2 ;
        if (fn.maxNestingDepth > 4) score -=2;
        if (fn.isGodFunction) score -=3;
    })

    return Math.max(0,score);
}

/**
 * 3️ Refactor Discipline (0–20)
 * Measures willingness to improve code
 */

function  scoreRefactors(refactorCount){
    if(refactorCount >= 10) return 20;
    if(refactorCount >= 5) return 15;
    if(refactorCount >= 1) return 10;
    return 0;
}

/**
 * 4️ Consistency Score (0–15)
 * Measures steady engineering work
 */

function scoreConsistency(commitHistory){
    if(!commitHistory.length) return 0;

    const gaps =[];
    for (let i=1; i<commitHistory.length; i++){
        const diff = 
           new Date(commitHistory[i-1]) - new Date(commitHistory[i]);
           gaps.push(diff/(1000*60*60*24)); //days
    }

    const avgGap = gaps.reduce((a,b) => a+b,0 )/gaps.length;

    if(avgGap < 3) return 15;
    if(avgGap < 7) return 10;
    if(avgGap < 14) return 5;

    return 0;
}


/**
 * 5️ Risk Profile (0–10)
 * Penalizes dangerous coding habits
 */

function scoreRisk(risks){
    if(!risks.length) return 10;
    if(risks.length <= 2) return 6;
    if(risks.length <= 5) return 3;

    return 0;
}

/**
 * 6️ Test Signals (0–10)
 * Detects testing culture
 */


function scoreTests(commits){
    const testCommits = commits.filter(c=>
        c.message.toLowerCase().includes("test")
    ).length;

    if (testCommits >= 5)  return 10;
    if (testCommits >= 2)  return 5;
    return 0;
}