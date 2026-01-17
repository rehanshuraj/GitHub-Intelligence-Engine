const API_BASE = import.meta.env.VITE_API_URL;

export async function analyzeUser(username) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${API_BASE}/analyze/${username}`,
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
