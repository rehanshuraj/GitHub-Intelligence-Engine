import { useEffect, useState } from "react";
import { analyzeUser } from "../api/githubApi";
import EMSMeter from "../components/EMSMeter";
import StatCard from "../components/StatCard";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { setToken } = useAuth();
  const [data, setData] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setToken(token); // 🔥 THIS WAS MISSING
      window.history.replaceState({}, "", "/dashboard");
    }
  }, [setToken]);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await analyzeUser(username);
      setData(res);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Engineering Analysis</h2>

      <div className="search">
        <input
          placeholder="GitHub username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button onClick={handleAnalyze}>Analyze</button>
      </div>

      {loading && <Loader />}

      {data && (
        <>
          <EMSMeter score={data.commitScore} />
          <div className="grid">
            <StatCard title="Repos Analyzed" value={data.reposAnalyzed} />
            <StatCard title="Total Commits" value={data.totalCommits} />
            <StatCard title="Refactor Commits" value={data.refactorCommits} />
            <StatCard title="Functions Analyzed" value={data.functionsAnalyzed} />
          </div>
        </>
      )}
    </div>
  );
}
