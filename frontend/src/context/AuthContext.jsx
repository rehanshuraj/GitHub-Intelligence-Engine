import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(undefined); // 👈 undefined is IMPORTANT

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      localStorage.setItem("token", urlToken);
      setToken(urlToken);

      // clean URL
      window.history.replaceState({}, "", "/dashboard");
      return;
    }

    const storedToken = localStorage.getItem("token");
    setToken(storedToken || null);
  }, []);

  // ⛔ DO NOT render anything until token is resolved
  if (token === undefined) return null;

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
