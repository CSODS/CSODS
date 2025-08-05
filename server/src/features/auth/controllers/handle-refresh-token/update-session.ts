import { Request } from "express";

/**
 * @public
 * @async
 * @function updateSession
 * @description A helper for the `handleRefreshToken` controller. Asynchronously
 * updates the `UserSession` with a given `sessionData` object.
 * If the session update operation fails, responds with status code `500`.
 * @param req
 * ! sessionNumber and userId are only used for logging.
 * @param sessionData.sessionNumber - The `sessionNumber` that corresponds to the
 * `UserSession`.
 * @param sessionData.userId - The `userId` of the `User` that is running the
 * `UserSession`.
 * @param sessionData.oldToken - The old token that will be used to verify the
 * session and then rotated out.
 * @param sessionData.newToken - The new generated refresh token that will replace
 * the old token.
 * @returns
 */
export async function updateSession(
  req: Request,
  sessionData: {
    sessionNumber: string;
    userId: number;
    oldToken: string;
    newToken: string;
  }
) {
  const { requestLogContext: requestLogger } = req;

  const updatedSessionId = await req.userSessionService.tryUpdateSession({
    ...sessionData,
  });

  if (!updatedSessionId)
    requestLogger.logStatus(
      500,
      "Failed updating session. Please try again later."
    );

  return updatedSessionId;
}
