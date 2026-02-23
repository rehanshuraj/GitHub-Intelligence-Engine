import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();

  // ⛔ Wait until AuthProvider resolves token
  if (token === undefined) {
    return null; 
  }

  // 🚫 Not logged in
  if (token === null) {
    return <Navigate to="/" replace />;
  }

  // ✅ Logged in
  return children;
}