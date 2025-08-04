import { Request } from "express";

export async function updateSession(
  req: Request,
  sessionData: {
    userId: number;
    oldToken: string;
    newToken: string;
  }
) {
  const { requestLogContext: requestLogger } = req;

  //  todo: add session number to be used for this purpose.
  const sessionId = 0;
  const updatedSessionId = await req.userSessionService.tryUpdateSession({
    sessionId,
    ...sessionData,
  });

  if (!updatedSessionId)
    requestLogger.logStatus(
      500,
      "Failed updating session. Please try again later."
    );

  return updatedSessionId;
}
