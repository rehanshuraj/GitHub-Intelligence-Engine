export async function fetchEMS(username, token) {
  const res = await fetch(
    `http://localhost:4000/analyze/${username}`,
    {
      headers: {
        Authorization: token
      }
    }
  );
  return res.json();
}
