import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/global.css";



// 🔥 OAUTH TOKEN BOOTSTRAP (RUNS BEFORE REACT)
(function () {
  console.log("🔥 OAuth bootstrap running");

  const hash = window.location.hash;
  console.log("HASH:", hash);

  if (!hash.includes("token=")) return;

  const query = hash.split("?")[1];
  if (!query) return;

  const params = new URLSearchParams(query);
  const token = params.get("token");

  if (token) {
    console.log("✅ Token found, saving to localStorage");
    localStorage.setItem("token", token);
    window.location.replace("#/dashboard");
  }
})();


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
