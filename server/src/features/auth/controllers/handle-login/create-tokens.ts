import { Request } from "express";
import { authSchemas, authTypes, authUtils } from "../..";

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

/**
 * @public
 * @async
 * @function createTokens
 * @description A helper for the {@link handleLogin} controller. Asynchronously handles access
 * and refresh token creation.
 * - Retrieves a list of `role`s associated with the `User`.
 * - Creates a token payload containing the `verifiedUser` and the list of `role`s.
 * - Creates JWT `access` and `refresh` tokens containing the payload.
 * - Returns both tokens.
 * @param req
 * @param verifiedUser A {@link authSchemas.UserViewModel} used for retrieving the `User`'s `role`s and
 * creating the token `payload`.
 * @returns A `Promise` that resolves to a {@link Tokens} object containing the `accessToken`
 * and `refreshToken`.
 */
export async function createTokens(
  req: Request,
  verifiedUser: authTypes.UserViewModel
): Promise<Tokens> {
  const createJwt = authUtils.createJwt;
  const createPayload = authUtils.createPayload;
  // const { createJwt, createPayload } = authUtils;

  const { requestLogContext: requestLogger } = req;

  requestLogger.log("debug", "Creating tokens.");

  const roles: string[] = await req.userDataService.getUserRoles(
    verifiedUser.userId
  );
  const payload: authSchemas.AccessTokenPayload = createPayload(
    verifiedUser,
    roles
  );
  const accessToken = createJwt(payload, { tokenType: "access" });
  const refreshToken = createJwt(payload, { tokenType: "refresh" });

  return { accessToken, refreshToken };
}
