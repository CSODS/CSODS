import { Request, Response, NextFunction } from "express";

export function validateCookies(
  ...cookieNames: string[]
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const { requestLogContext: requestLogger } = req;

    const { cookies } = req;
    const nameList = [...cookieNames];

    requestLogger.log("debug", "Validating cookies...");
    requestLogger.log("debug", `Cookie list: ${nameList}.`);

    for (const cookieName of nameList) {
      if (!cookies[cookieName]) {
        return requestLogger.logStatus(401, {
          logMsg: `Required cookie is missing: ${cookieName}.`,
          resMsg: "A required cookie is missing.",
        });
      }
    }

    requestLogger.log("debug", "Cookies validated.");

    next();
  };
}
