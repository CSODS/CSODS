import { Request } from "express";

/**
 * @public
 * @async
 * @function endSession
 * @description A helper function for `handleLogout` controller.
 * Asynchronously ends an ongoing session with the given `sessionNumber`.
 * If the `UserSessionService` fails to end the session, responds with status
 * code `500`.
 * @param req
 * @param sessionNumber The session number of the session to be ended.
 * @returns A `Promise` that resolves to the `sessionId` of the deleted session
 * or `null` if the delete operation fails.
 */
export async function endSession(
  req: Request,
  sessionNumber: string
): Promise<number | null> {
  const { requestLogContext: requestLogger, userSessionService } = req;

  const deletedSessionId = await userSessionService.tryEndSession(
    sessionNumber
  );

  if (!deletedSessionId) requestLogger.logStatus(500, "Failed to end session.");

  return deletedSessionId;
}
