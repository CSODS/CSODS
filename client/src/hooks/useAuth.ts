import { useContext } from "react";
import { AuthContext } from "@/components";

export function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    const errMsg =
      "Function useAuth must be used inside an AuthProvider component.";
    throw new Error(errMsg);
  }

  return authContext;
}
