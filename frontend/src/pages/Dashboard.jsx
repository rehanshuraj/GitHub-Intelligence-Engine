import { useEffect, useState } from "react";
import { analyzeUser } from "../api/githubApi";
import EMSMeter from "../components/EMSMeter";
import StatCard from "../components/StatCard";
import Loader from "../components/Loader";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!username) return alert("Enter GitHub username");

    setLoading(true);
    try {
      const res = await analyzeUser(username);
      setData(res);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("DATA:", data);
  }, [data]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Engineering Analysis</h1>

      {/* 🔹 INPUT */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <button onClick={handleAnalyze}>Analyze</button>
      </div>

      {loading && <Loader />}

      {data && (
        <>
          {/* 🔥 EMS */}
          <h2>Engineering Maturity Score</h2>
          <EMSMeter score={data.EMS} />

          {/* 🔹 STATS */}
          <div className="grid">
            <StatCard title="Repos Analyzed" value={data.reposAnalyzed} />
            <StatCard title="Total Commits" value={data.totalCommits} />
            <StatCard title="Refactor Commits" value={data.refactorCommits} />
            <StatCard title="Functions Analyzed" value={data.functionsAnalyzed} />
          </div>

          {/* 🔥 RL SECTION */}
          <div
            style={{
              marginTop: "40px",
              padding: "20px",
              borderRadius: "12px",
              background: "#1f2937",
              color: "white"
            }}
          >
            <h2>
              🧠 Reinforcement Learning Profile{" "}
              {!data.reinforcementLearning?.detected && "(Not Detected)"}
            </h2>

            <div className="grid">
              <StatCard
                title="RL Detected"
                value={data.reinforcementLearning?.detected ? "Yes" : "No"}
              />
              <StatCard
                title="RL Score"
                value={data.reinforcementLearning?.score}
              />
              <StatCard
                title="RL Level"
                value={data.reinforcementLearning?.level}
              />
            </div>

            {/* Progress Bar */}
            <div style={{ marginTop: "15px" }}>
              <div
                style={{
                  height: "10px",
                  background: "#374151",
                  borderRadius: "5px"
                }}
              >
                <div
                  style={{
                    width: `${Math.min(
                      data.reinforcementLearning?.score || 0,
                      100
                    )}%`,
                    height: "100%",
                    borderRadius: "5px",
                    background: "#3b82f6"
                  }}
                />
              </div>
            </div>

            {!data.reinforcementLearning?.detected && (
              <p style={{ marginTop: "10px", color: "#facc15" }}>
                💡 No RL projects detected. Try Gym, DQN, PPO.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}