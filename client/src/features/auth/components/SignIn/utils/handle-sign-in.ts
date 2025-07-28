import { Location, NavigateFunction } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { authTypes } from "@/types";
import { SignInFormData } from "../types";
import { requestSignIn } from "./request-sign-in";

export async function handleSignIn(
  form: SignInFormData,
  setErrMsg: (msg: string) => void,
  setAuth: (authSession: authTypes.AuthSession) => void,
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
    const payload: authTypes.TokenPayload = jwtDecode(accessToken);

    const authSession: authTypes.AuthSession = {
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
