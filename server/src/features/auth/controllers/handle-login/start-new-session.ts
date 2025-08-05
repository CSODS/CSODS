import { Request } from "express";
import { UserSessionService } from "../../services";
import { UserViewModel } from "../../types";

/**
 * @public
 * @async
 * @function startNewSession
 * @description A helper for the {@link handleLogin} controller. Asynchronously handles creating a
 * session for the user.
 * - Utilizes the {@link UserSessionService} middleware to create the session.
 * - If the session creation fails, log it and respond with status code `500`.
 * - Otherwise, simply return the `newSessionId`.
 * @param req
 * @param sessionNumber The `sessionNumber` of the new session being created.
 * @param verifiedUser The {@link UserViewModel} containing the `userId` needed for creating
 * the session
 * @param refreshToken The refresh token to be hashed and stored with the new session.
 * @param persistentAuthOptions.isPersistentAuth An optional boolean parameter specifying if the
 * auth will be persistent. If `true`, sets the `expiry` of the refresh token to `30` days. Otherwise
 * leaves the `expiry` `undefined` signifying a session token.
 * @returns A `Promise` that resolves to the created `userSession`'s `id` or `null` if the
 * update fails.
 */
export async function startNewSession(
  req: Request,
  sessionNumber: string,
  verifiedUser: UserViewModel,
  refreshToken: string,
  persistentAuthOptions?: {
    isPersistentAuth?: boolean;
  }
): Promise<number | null> {
  const { requestLogContext: requestLogger } = req;

  const persistentTokenExpiry = new Date();

  persistentTokenExpiry.setDate(persistentTokenExpiry.getDate() + 30);

  const newSessionId = await req.userSessionService.tryStartNewSession({
    sessionNumber,
    userId: verifiedUser.userId,
    refreshToken,
    expiresAt: persistentAuthOptions?.isPersistentAuth
      ? persistentTokenExpiry
      : null,
  });

  if (!newSessionId)
    requestLogger.logStatus(
      500,
      "Failed to start session. Please try again later."
    );

  return newSessionId;
}
