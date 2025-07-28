import { NavigateFunction } from "react-router-dom";
import { authTypes } from "@/types";
import { SignInFormData } from "../types";
import { trySignIn } from "./try-sign-in";
import { jwtDecode } from "jwt-decode";

export async function handleSignIn(
  form: SignInFormData,
  setErrMsg: (msg: string) => void,
  setAuth: (payload: authTypes.TokenPayload) => void,
  navigate: NavigateFunction
) {
  const { accessToken, errDetails } = await trySignIn(form);

  if (errDetails) {
    const { message } = errDetails;

    setErrMsg(message);
  } else if (accessToken) {
    const payload: authTypes.TokenPayload = jwtDecode(accessToken);
    setAuth(payload);
    // navigate("/home");
  }
}
