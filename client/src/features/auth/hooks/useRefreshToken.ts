import { useAuth } from "@/hooks";
import { AUTH_ENDPOINTS } from "../constants";
import { authClient } from "../utils";

export function useRefreshToken() {
  const { REFRESH } = AUTH_ENDPOINTS;

  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    console.log("Refreshing...");

    const accessToken: string = await authClient
      .post(REFRESH, null, {
        withCredentials: true,
        // headers: {
        //   "Content-Type": "application/json",
        // },
      })
      .then((response) => response.data.accessToken)
      .catch((err) => null);

    console.log("Previous: " + auth?.accessToken);
    console.log("Refresh: " + accessToken);
  };

  return refresh;
}
