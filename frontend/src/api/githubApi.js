export async function analyzeUser(username) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `http://localhost:4000/analyze/${username}`,
    {
      headers: {
        Authorization: token
      }
    }
  );

  if (!res.ok) {
    throw new Error("Failed to analyze user");
  }

  return res.json();
}
