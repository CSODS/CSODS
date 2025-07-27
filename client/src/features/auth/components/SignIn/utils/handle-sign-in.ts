import { NavigateFunction } from "react-router-dom";
import { authTypes } from "../../../types";
import { SignInFormData } from "../types";
import { trySignIn } from "./try-sign-in";

export async function handleSignIn(
  form: SignInFormData,
  setErrMsg: (msg: string) => void,
  setAuth: (payload: authTypes.TokenPayload) => void,
  navigate: NavigateFunction
) {
  const { response, errDetails } = await trySignIn(form);

  if (errDetails) {
    const { message, statusCode } = errDetails;

    if (statusCode === 429)
      setErrMsg("Too many sign-in attempts. Please try again later.");
  } else {
    // todo: SET AUTH STATE
    // setAuth(response)
    // navigate("/home");
  }
}
