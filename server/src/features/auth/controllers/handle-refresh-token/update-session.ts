import { Request } from "express";

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
