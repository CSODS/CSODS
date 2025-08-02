import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthTypes } from "./";

export const AuthContext = createContext<AuthTypes.AuthContextType | null>(
  null
);

export function AuthProvider() {
  const [auth, setAuth] = useState<AuthTypes.AuthSession | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <main>
        <Outlet />
      </main>
    </AuthContext.Provider>
  );
}
