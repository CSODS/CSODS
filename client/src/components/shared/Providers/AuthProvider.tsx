import React, { createContext, useState } from "react";
import { authTypes } from "@/types";
import { Outlet } from "react-router-dom";

type AuthContextType = {
  auth: authTypes.TokenPayload | undefined;
  setAuth: React.Dispatch<
    React.SetStateAction<authTypes.TokenPayload | undefined>
  >;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider() {
  const [auth, setAuth] = useState<authTypes.TokenPayload>();

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <main>
        <Outlet />
      </main>
    </AuthContext.Provider>
  );
}
