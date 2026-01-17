import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ✅ HANDLE OAUTH TOKEN BEFORE REACT LOADS
(function handleOAuthToken() {
  const hash = window.location.hash; // "#/dashboard?token=XYZ"
  if (!hash.includes("token=")) return;

  const query = hash.split("?")[1];
  const params = new URLSearchParams(query);
  const token = params.get("token");

  if (token) {
    localStorage.setItem("token", token);
    window.location.replace("#/dashboard");
  }
})();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
