import { AUTH_ENDPOINTS } from "@/features/auth/constants";
import { authClient } from "@/features/auth/utils";
import { AuthAttemptResult, SignInRequest, SignInResponse } from "../types";

export async function requestSignIn(
  signInRequest: SignInRequest
): Promise<AuthAttemptResult> {
  const { SIGN_IN } = AUTH_ENDPOINTS;

  const jsonRequest = JSON.stringify(signInRequest);

  const result: AuthAttemptResult = await authClient
    .post<SignInResponse>(SIGN_IN, jsonRequest, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((response) => {
      const { data } = response;
      const authResponse: AuthAttemptResult = {
        accessToken: data.accessToken,
      };

      return authResponse;
    })
    .catch((err) => {
      console.log(err.response.data);
      const authResponse: AuthAttemptResult = {
        accessToken: null,
        errDetails: {
          message: err.response.message,
          statusCode: err.response.status,
        },
      };

      return authResponse;
    });

  return result;
}
