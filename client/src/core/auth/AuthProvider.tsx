import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthTypes } from "./";

export const AuthContext = createContext<AuthTypes.AuthContextType | null>(
  null
);

export function AuthProvider() {
  const [auth, setAuth] = useState<AuthTypes.AuthSession | null>(null);
  const [persist, setPersist] = useState<boolean>(() => {
    return localStorage.getItem("persist") === "true";
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      <main>
        <Outlet />
      </main>
    </AuthContext.Provider>
  );
}
