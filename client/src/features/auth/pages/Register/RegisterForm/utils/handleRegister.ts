import { NavigateFunction } from "react-router-dom";
import { RegisterFormData } from "../types";
import { requestRegister } from "./requestRegister";

export async function handleRegister(
  form: RegisterFormData,
  setErrMsg: (msg: string) => void
) {
  const { passwordMatch, ...registerReq } = form;

  const { hasErr, statusCode, statusMsg } = await requestRegister(registerReq);

  // todo: add different components for success and error.
  setErrMsg(statusMsg);
}
