import { CSODS_API_PATHS } from "@/constants";
import axios, { AxiosResponse } from "axios";
import { SignInForm } from "../types/auth.types";

type ResponseObject = {
  accessToken: string;
};

type AuthResponse = {
  response: ResponseObject | null;
  errDetails?: {
    message: string;
    statusCode: string | number;
  };
};

export async function trySignIn(form: SignInForm): Promise<AuthResponse> {
  const { BASE, AUTH } = CSODS_API_PATHS;
  const { PATH, SIGN_IN } = AUTH;
  const endpoint = BASE + PATH + SIGN_IN;

  const authResponse: AuthResponse = await axios
    .post<string, AxiosResponse<string, string>, string>(
      endpoint,
      JSON.stringify(form),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then((response) => {
      const accessToken = response.data;

      const authResponse: AuthResponse = {
        response: {
          accessToken: accessToken,
        },
      };

      return authResponse;
    })
    .catch((err) => {
      const authResponse: AuthResponse = {
        response: null,
        errDetails: {
          message: err.message,
          statusCode: err.status,
        },
      };

      return authResponse;
    });

  return authResponse;
}
