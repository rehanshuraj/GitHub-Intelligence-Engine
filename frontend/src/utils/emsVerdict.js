export function getEMSVerdict(score) {
  if (score >= 85) {
    return {
      label: "Excellent Engineering Maturity",
      description:
        "Your GitHub profile reflects strong engineering discipline, consistent commits, clean refactors, and maintainable code. This level is comparable to experienced professionals."
    };
  }

  if (score >= 70) {
    return {
      label: "Strong Engineering Foundation",
      description:
        "You show good engineering habits with meaningful commits and reasonable code quality. With more consistency and refactoring, this can reach an advanced level."
    };
  }

  if (score >= 50) {
    return {
      label: "Developing Engineering Maturity",
      description:
        "Your account shows learning-stage engineering practices. You commit regularly, but code complexity, refactoring discipline, or consistency can be improved."
    };
  }

  if (score >= 30) {
    return {
      label: "Early-Stage Engineering Profile",
      description:
        "Your GitHub activity suggests early learning or experimental projects. Focus on smaller commits, clearer messages, and structured refactors."
    };
  }

  return {
    label: "Low Engineering Signal",
    description:
      "Your GitHub profile currently shows limited engineering maturity. Improving commit quality, consistency, and project depth will significantly raise your score."
  };
}
