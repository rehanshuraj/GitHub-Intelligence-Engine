export async function analyzeUser(username) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `https://github-intelligence-engine.onrender.com/analyze/${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    throw new Error("Failed to analyze user");
  }

  return res.json();
}
