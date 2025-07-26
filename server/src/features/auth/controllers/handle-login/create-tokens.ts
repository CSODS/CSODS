import { Request, Response } from "express";
import { RequestLogContext } from "@/utils";
import { authSchemas, authTypes, authUtils } from "../..";

type UserViewModel = authTypes.UserViewModel;
type TokenPayload = authSchemas.TokenPayload;
const { createJwt, createPayload } = authUtils;

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
 * @param res
 * @param verifiedUser A {@link UserViewModel} used for retrieving the `User`'s `role`s and
 * creating the token `payload`.
 * @returns A `Promise` that resolves to a {@link Tokens} object containing the `accessToken`
 * and `refreshToken`.
 */
export async function createTokens(
  req: Request,
  res: Response,
  verifiedUser: UserViewModel
): Promise<Tokens> {
  const logger = new RequestLogContext(req, res);

  logger.log("debug", "Creating tokens.");

  const roles: string[] = await req.userDataService.getUserRoles(
    verifiedUser.userId
  );
  const payload: TokenPayload = createPayload(verifiedUser, roles);
  const accessToken = createJwt(payload, { tokenType: "access" });
  const refreshToken = createJwt(payload, { tokenType: "refresh" });

  return { accessToken, refreshToken };
}
