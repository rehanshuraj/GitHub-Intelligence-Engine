const rlKeywords = [
  "reinforcement",
  "reinforcement-learning",
  "q-learning",
  "dqn",
  "policy-gradient",
  "actor-critic",
  "ppo",
  "a3c",
  "sarsa",
  "deep-rl"
];

const rlLibraries = [
  "gym",
  "gymnasium",
  "stable-baselines",
  "stable-baselines3",
  "ray[rllib]",
  "torchrl",
  "tensorflow-agents",
  "keras-rl"
];

function detectRLFromText(text) {
  const lower = text.toLowerCase();

  return rlKeywords.some(keyword => lower.includes(keyword));
}

function detectLibraries(text) {
  const lower = text.toLowerCase();
  let score = 0;

  rlLibraries.forEach(lib => {
    if (lower.includes(lib)) {
      score += 10;
    }
  });

  return score;
}

export function calculateRLScore(repos) {
  let score = 0;
  let rlRepos = 0;

  repos.forEach(repo => {
    const combinedText =
      (repo.name || "") +
      " " +
      (repo.description || "") +
      " " +
      (repo.readme || "");

    if (detectRLFromText(combinedText)) {
      rlRepos++;
      score += 20;
    }

    score += detectLibraries(combinedText);
  });

  if (rlRepos > 2) score += 10;
  if (rlRepos > 5) score += 20;

  return {
    detected: rlRepos > 0,
    score
  };
}

export function getRLLevel(score) {
  if (score < 20) return "Beginner";
  if (score < 40) return "Intermediate";
  if (score < 70) return "Advanced";
  return "Expert";
}