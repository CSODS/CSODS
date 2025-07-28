import { CSODS_API_PATHS } from "@/constants";
import { AuthAttemptResult, SignInRequest, SignInResponse } from "../types";
import axios from "axios";

export async function requestSignIn(
  signInRequest: SignInRequest
): Promise<AuthAttemptResult> {
  const { BASE, AUTH } = CSODS_API_PATHS;
  const { PATH, SIGN_IN } = AUTH;
  const endpoint = BASE + PATH + SIGN_IN;

  const jsonRequest = JSON.stringify(signInRequest);

  const result: AuthAttemptResult = await axios
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
