export default function Login() {
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
