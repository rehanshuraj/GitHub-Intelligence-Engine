export async function compareUsers(req, res) {
  const { userA, userB } = req.query;

  const scoreA = await analyzeUserInternal(userA);
  const scoreB = await analyzeUserInternal(userB);

  res.json({
    userA: scoreA,
    userB: scoreB,
    verdict:
      scoreA.EngineeringMaturityScore >
      scoreB.EngineeringMaturityScore
        ? `${userA} shows stronger engineering maturity`
        : `${userB} shows stronger engineering maturity`
  });
}
