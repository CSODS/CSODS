import { CSODS_API_PATHS } from "@/constants";
import axios, { AxiosResponse } from "axios";
import { SignInFormData } from "../types";

type ResponseData = {
  accessToken: string;
};

type AuthResponse = {
  accessToken: string | null;
  errDetails?: {
    message: string;
    statusCode: string | number;
  };
};

export async function trySignIn(form: SignInFormData): Promise<AuthResponse> {
  const { BASE, AUTH } = CSODS_API_PATHS;
  const { PATH, SIGN_IN } = AUTH;
  const endpoint = BASE + PATH + SIGN_IN;

  const authResponse: AuthResponse = await axios
    .post<ResponseData>(endpoint, JSON.stringify(form), {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((response) => {
      const { data } = response;
      const authResponse: AuthResponse = {
        accessToken: data.accessToken,
      };

      return authResponse;
    })
    .catch((err) => {
      console.log(err.response.data);
      const authResponse: AuthResponse = {
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
