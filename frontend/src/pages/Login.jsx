import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const loginWithGitHub = () => {
    window.location.href =
      `${import.meta.env.VITE_API_URL}/auth/github`;
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
