import { AUTH_ENDPOINTS } from "@/features/auth/constants";
import { AuthAttemptResult, SignInRequest, SignInResponse } from "../types";
import { csodsClient } from "@/utils";

export async function requestSignIn(
  signInRequest: SignInRequest
): Promise<AuthAttemptResult> {
  const { PATH, SIGN_IN } = AUTH_ENDPOINTS;
  const endpoint = PATH + SIGN_IN;

  const jsonRequest = JSON.stringify(signInRequest);

  const result: AuthAttemptResult = await csodsClient
    .post<SignInResponse>(endpoint, jsonRequest, {
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
