export async function fetchEMS(username, token) {
  const res = await fetch(
    `https://github-intelligence-engine.onrender.com/analyze/${username}`,
    {
      headers: {
        Authorization: token
      }
    }
  );
  return res.json();
}
