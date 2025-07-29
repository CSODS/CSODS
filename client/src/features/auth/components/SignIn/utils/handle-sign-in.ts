import { Location, NavigateFunction } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthTypes } from "@/core/auth";
import { SignInFormData } from "../types";
import { requestSignIn } from "./request-sign-in";

export async function handleSignIn(
  form: SignInFormData,
  setErrMsg: (msg: string) => void,
  setAuth: (authSession: AuthTypes.AuthSession) => void,
  navigate: NavigateFunction,
  location: Location
) {
  const { identifier, password } = form;

  const { accessToken, errDetails } = await requestSignIn({
    identifier,
    password,
  });

  if (errDetails) {
    const { message } = errDetails;

    setErrMsg(message);
  } else if (accessToken) {
    const payload: AuthTypes.TokenPayload = jwtDecode(accessToken);

    const authSession: AuthTypes.AuthSession = {
      tokenPayload: payload,
      accessToken: accessToken,
    };

    setAuth(authSession);

    // get the previous location if the user attempted to access a page
    // that required auth. Otherwise, set it to the home page.
    const from = location.state?.from?.pathname || "/home";
    navigate(from, { replace: true });
  }
}
