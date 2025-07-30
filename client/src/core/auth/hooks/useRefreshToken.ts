import { jwtDecode } from "jwt-decode";
import { AuthConstants, AuthTypes, AuthUtils } from "..";
import { useAuth } from "./useAuth";

// todo: add handling for invalid access token
export function useRefreshToken() {
  const { PATH, REFRESH } = AuthConstants.AUTH_ENDPOINTS;
  const endpoint = PATH + REFRESH;
  const { setAuth } = useAuth();

  const refresh = async () => {
    const accessToken: string | null = await AuthUtils.securedAxios
      .post(endpoint, null, {
        withCredentials: true,
      })
      .then((response) => response.data.accessToken)
      .catch(() => null);

    let authSession: AuthTypes.AuthSession | null = null;
    if (accessToken) {
      const tokenPayload: AuthTypes.TokenPayload = jwtDecode(accessToken);
      authSession = {
        accessToken,
        tokenPayload,
      };
      setAuth(authSession);
    }
  };

  return refresh;
}
