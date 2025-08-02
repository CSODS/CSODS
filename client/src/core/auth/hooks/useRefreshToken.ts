import { jwtDecode } from "jwt-decode";
import { AuthConstants, AuthTypes, AuthUtils } from "..";
import { useAuth } from "./useAuth";

// todo: add handling for invalid access token
export function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const { PATH, REFRESH } = AuthConstants.AUTH_ENDPOINTS;
    const endpoint = PATH + REFRESH;

    const accessToken: string | null = await AuthUtils.securedAxios
      .post(endpoint, null, {
        withCredentials: true,
      })
      .then((response) => response.data.accessToken)
      .catch(() => null);

    if (accessToken) {
      const tokenPayload: AuthTypes.TokenPayload = jwtDecode(accessToken);
      const authSession = {
        accessToken,
        tokenPayload,
      };
      setAuth(authSession);
    }
  };

  return refresh;
}
