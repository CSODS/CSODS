import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/hooks";
import { authTypes } from "@/types";
import { AUTH_ENDPOINTS } from "../constants";
import { authClient } from "../utils";

// todo: add handling for invalid access token
export function useRefreshToken() {
  const { REFRESH } = AUTH_ENDPOINTS;

  const { setAuth } = useAuth();

  const refresh = async () => {
    const accessToken: string | null = await authClient
      .post(REFRESH, null, {
        withCredentials: true,
      })
      .then((response) => response.data.accessToken)
      .catch(() => null);

    let authSession: authTypes.AuthSession | null = null;
    if (accessToken) {
      const tokenPayload: authTypes.TokenPayload = jwtDecode(accessToken);
      authSession = {
        accessToken,
        tokenPayload,
      };
    }
    setAuth(authSession);
  };

  return refresh;
}
