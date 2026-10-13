"use client";
import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { setUser(JSON.parse(localStorage.getItem("ag_user") || "null")); } catch {}
    setReady(true);
  }, []);

  const login = (d) => {
    localStorage.setItem("ag_token", d.token);
    localStorage.setItem("ag_user", JSON.stringify(d.user));
    setUser(d.user);
  };
  const logout = () => {
    localStorage.removeItem("ag_token");
    localStorage.removeItem("ag_user");
    setUser(null);
  };

  return <Ctx.Provider value={{ user, ready, login, logout }}>{children}</Ctx.Provider>;
}
