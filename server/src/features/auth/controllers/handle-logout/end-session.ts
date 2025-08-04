import { Request } from "express";

export async function endSession(
  req: Request,
  sessionNumber: string
): Promise<number | null> {
  const { requestLogContext: requestLogger, userSessionService } = req;
  console.log(sessionNumber);

  const deletedSessionId = await userSessionService.tryEndSession(
    sessionNumber
  );

  if (!deletedSessionId) requestLogger.logStatus(500, "Failed to end session.");

  return deletedSessionId;
}
