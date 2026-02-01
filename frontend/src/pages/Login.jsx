import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setToken(token);
      navigate("/dashboard", { replace: true });
    }
  }, []);

  const loginWithGitHub = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
  };

  return (
    <div className="center">
      <h1>GitHub Intelligence Engine</h1>
      <p>Measure real engineering quality</p>

      <button onClick={loginWithGitHub}>
        Login with GitHub
      </button>
    </div>
  );
}
