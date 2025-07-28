import { createContext, useState } from "react";
import { authTypes } from "@/types";
import { Outlet } from "react-router-dom";

export const AuthContext = createContext<authTypes.AuthContextType | null>(
  null
);

export function AuthProvider() {
  const [auth, setAuth] = useState<authTypes.AuthSession>();

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <main>
        <Outlet />
      </main>
    </AuthContext.Provider>
  );
}
