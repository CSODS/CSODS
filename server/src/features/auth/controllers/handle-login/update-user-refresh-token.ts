import { Request, Response } from "express";
import { RequestLogContext } from "@utils";
import { UserViewModel } from "../../types";

/**
 * @public
 * @async
 * @function updateUserRefreshToken
 * @description A helper for the {@link handleLogin} controller. Asynchronously handles updating
 * the refresh token of a `User` in the database.
 * - Utilizes the {@link userDataService} middleware to update the refresh token.
 * - If the update fails, log it and respond with status code `500`.
 * - Otherwise, simply return the updatedUserId.
 * @param req
 * @param res
 * @param verifiedUser The {@link UserViewModel} containing the userId needed for updating
 * the refresh token.
 * @param refreshToken The new refresh token to be stored to the database.
 * @returns A `Promise` that resolves to the updated `User`'s `id` or `null` if the update fails.
 */
export async function updateUserRefreshToken(
  req: Request,
  res: Response,
  verifiedUser: UserViewModel,
  refreshToken: string
): Promise<number | null> {
  const logger = new RequestLogContext(req, res);

  const updatedUserId = await req.userDataService.updateRefreshToken(
    verifiedUser.userId,
    refreshToken
  );

  if (!updatedUserId)
    logger.logStatus(
      500,
      "Failed updating refresh token. Please try again later."
    );

  return updatedUserId;
}
