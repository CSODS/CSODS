import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthConstants, AuthTypes, AuthUtils } from "..";
import { useAuth } from "./useAuth";

let refreshPromise: Promise<string | null> | null = null;

// todo: add handling for invalid access token
export function useRefreshToken() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const refresh = async () => {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        const { PATH, REFRESH } = AuthConstants.AUTH_ENDPOINTS;
        const endpoint = PATH + REFRESH;

        try {
          const response = await AuthUtils.securedAxios.post(endpoint);
          const accessToken = response.data.accessToken;

          const tokenPayload: AuthTypes.TokenPayload = jwtDecode(accessToken);
          const authSession = {
            accessToken,
            tokenPayload,
          };

          setAuth(authSession);
          return accessToken;
        } catch {
          return null;
        } finally {
          refreshPromise = null;
        }
      })();
    }

    return refreshPromise;
  };

  return refresh;
}
