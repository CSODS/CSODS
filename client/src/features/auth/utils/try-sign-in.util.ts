import { CSODS_API_PATHS } from "@/constants";
import axios, { AxiosResponse } from "axios";
import { SignInForm } from "../types/auth.types";

export async function trySignIn(form: SignInForm): Promise<string | null> {
  const { BASE, AUTH } = CSODS_API_PATHS;
  const { PATH, SIGN_IN } = AUTH;
  const endpoint = BASE + PATH + SIGN_IN;

  const accessToken: string | null = await axios
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
      console.log("status code:", response.status);
      console.log("status message:", response.statusText);
      console.log("access token", accessToken);
      return accessToken;
    })
    .catch((err) => {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        // The request was made but no response was received
        // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(err.request);
      } else {
        // Something happened in setting up the request that triggered an err
        console.log("Error:", err.message);
      }
      console.log(err.config);
      return null;
    });

  return accessToken;
}
