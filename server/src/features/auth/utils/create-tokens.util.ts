import { Request } from "express";
import { AccessTokenPayload, RefreshTokenPayload } from "../schemas";
import { UserViewModel } from "../types";
import { createJwt, createPayload } from ".";

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
 * @param verifiedUser A {@link UserViewModel} used for retrieving the `User`'s `role`s and
 * creating the token `payload`.
 * @param sessionNumber The `sessionNumber` corresponding to the current `UserSession`.
 * @param isPersistentAuth An optional boolean representing the persistence of the authentication state.
 * `true` if the auth is persistent. `false` otherwise.
 * @returns A `Promise` that resolves to a {@link Tokens} object containing the `accessToken`
 * and `refreshToken`.
 */
export async function createTokens(
  req: Request,
  verifiedUser: UserViewModel,
  sessionNumber: string,
  isPersistentAuth?: boolean
): Promise<Tokens> {
  const { requestLogContext: requestLogger } = req;

  requestLogger.log("debug", "Creating tokens.");

  const roles: string[] = await req.userDataService.getUserRoles(
    verifiedUser.userId
  );

  const accessTokenPayload: AccessTokenPayload = createPayload({
    tokenType: "access",
    user: verifiedUser,
    roles,
  });
  const refreshTokenPayload: RefreshTokenPayload = createPayload({
    tokenType: "refresh",
    sessionNumber,
    userId: verifiedUser.userId,
    isPersistentAuth,
  });

  const accessToken = createJwt({
    tokenType: "access",
    payload: accessTokenPayload,
  });
  const refreshToken = createJwt({
    tokenType: "refresh",
    payload: refreshTokenPayload,
  });

  return { accessToken, refreshToken };
}
