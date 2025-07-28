import React, { createContext, useState } from "react";
import { authTypes } from "@/types";
import { Outlet } from "react-router-dom";

export type AuthSession = {
  tokenPayload: authTypes.TokenPayload;
  accessToken: string;
};

type AuthContextType = {
  auth: AuthSession | undefined;
  setAuth: React.Dispatch<React.SetStateAction<AuthSession | undefined>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider() {
  const [auth, setAuth] = useState<AuthSession>();

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <main>
        <Outlet />
      </main>
    </AuthContext.Provider>
  );
}
