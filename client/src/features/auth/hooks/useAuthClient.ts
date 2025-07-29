import { AxiosInstance } from "axios";
import { useAuth } from "@/hooks";
import { useRefreshToken } from "./useRefreshToken";
import { useEffect } from "react";
import { authClient } from "../utils";

/**
 * @public
 * @function useAuthClient
 * @description Adds interceptors to the secured axios client.
 * @returns An {@link AxiosInstance} of the {@link authClient} with the
 * interceptors.
 */
export function useAuthClient(): AxiosInstance {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = authClient.interceptors.request.use(
      (config) => {
        // means the request not a retry, it's the first attempt.
        if (!config.headers["Authorization"]) {
          //  use the current accessToken to make the request.
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (err) => {
        Promise.reject(err);
      }
    );

    const responseIntercept = authClient.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;

        //  * sent is a custom property set to notify the interceptor that
        //  * a previous retry has been executed to avoid an infinite loop
        //  * of retrying to refresh an access token.
        if (err?.response?.status === 403 && !prevRequest?.sent) {
          // if a retry wasn't attempted yet, retry.
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return authClient(prevRequest);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      // clean up the interceptors so it doesn't pileup.
      authClient.interceptors.request.eject(requestIntercept);
      authClient.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return authClient;
}
