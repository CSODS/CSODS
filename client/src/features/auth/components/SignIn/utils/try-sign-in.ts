import axios from "axios";
import { CSODS_API_PATHS } from "@/constants";
import {
  SignInFormData,
  AuthAttemptResult,
  SignInResponse,
  SignInRequest,
} from "../types";

export async function trySignIn(
  form: SignInFormData
): Promise<AuthAttemptResult> {
  const { BASE, AUTH } = CSODS_API_PATHS;
  const { PATH, SIGN_IN } = AUTH;
  const endpoint = BASE + PATH + SIGN_IN;

  const SignInRequest: SignInRequest = {
    identifier: form.identifier,
    password: form.password,
  };

  const jsonRequest = JSON.stringify(SignInRequest);

  const authResponse: AuthAttemptResult = await axios
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

  return authResponse;
}
