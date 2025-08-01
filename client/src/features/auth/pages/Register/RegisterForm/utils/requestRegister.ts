import { AuthConstants, AuthUtils } from "@/core/auth";
import { RegisterRequest, RegisterResponse } from "../types";

export async function requestRegister(
  registerRequest: RegisterRequest
): Promise<RegisterResponse> {
  const { PATH, REGISTER } = AuthConstants.AUTH_ENDPOINTS;
  const endpoint = PATH + REGISTER;

  const jsonRequest = JSON.stringify(registerRequest);

  const result: RegisterResponse = await AuthUtils.securedAxios
    .post(endpoint, jsonRequest, {
      headers: { "Content-Type": "application/json" },
    })
    .then<RegisterResponse>((response) => ({
      statusCode: response.status,
      statusMsg: response.statusText,
    }))
    .catch<RegisterResponse>((err) => ({
      hasErr: true,
      statusCode: err.status,
      statusMsg: err.message,
    }));

  return result;
}
