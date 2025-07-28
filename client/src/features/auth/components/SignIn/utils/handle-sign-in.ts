import { Location, NavigateFunction } from "react-router-dom";
import { authTypes } from "@/types";
import { SignInFormData } from "../types";
import { trySignIn } from "./try-sign-in";
import { jwtDecode } from "jwt-decode";

export async function handleSignIn(
  form: SignInFormData,
  setErrMsg: (msg: string) => void,
  setAuth: (payload: authTypes.TokenPayload) => void,
  navigate: NavigateFunction,
  location: Location
) {
  const { accessToken, errDetails } = await trySignIn(form);

  if (errDetails) {
    const { message } = errDetails;

    setErrMsg(message);
  } else if (accessToken) {
    const payload: authTypes.TokenPayload = jwtDecode(accessToken);
    setAuth(payload);

    // get the previous location if the user attempted to access a page
    // that required auth. Otherwise, set it to the home page.
    const from = location.state?.from?.pathname || "/home";
    navigate(from, { replace: true });
  }
}
