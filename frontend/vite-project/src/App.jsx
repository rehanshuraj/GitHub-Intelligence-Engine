import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {

  // ✅ Extract OAuth token BEFORE routing
  useEffect(() => {
    const hash = window.location.hash;
    const queryString = hash.split("?")[1];
    if (!queryString) return;

    const params = new URLSearchParams(queryString);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, "", "#/dashboard");
    }
  }, []);

  const token = localStorage.getItem("token");

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" replace /> : <Login />}
        />

        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
