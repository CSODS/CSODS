import { AuthConstants, AuthUtils } from "@/core/auth";
import { AuthAttemptResult, SignInRequest, SignInResponse } from "../types";

export async function requestSignIn(
  signInRequest: SignInRequest
): Promise<AuthAttemptResult> {
  const { PATH, SIGN_IN } = AuthConstants.AUTH_ENDPOINTS;
  const endpoint = PATH + SIGN_IN;

  const jsonRequest = JSON.stringify(signInRequest);

  const result: AuthAttemptResult = await AuthUtils.securedAxios
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
      const authResponse: AuthAttemptResult = {
        accessToken: null,
        errDetails: {
          message: err.message,
          statusCode: err.status,
        },
      };

      return authResponse;
    });

  return result;
}
