import { Request, Response, NextFunction } from "express";
import { RequestLogContext } from "@utils";

export function validateCookies(
  ...cookieNames: string[]
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const logger = new RequestLogContext(req, res);

    const { cookies } = req;
    const nameList = [...cookieNames];

    logger.log("debug", "Validating cookies...");
    logger.log("debug", `Cookie list: ${nameList}.`);

    for (const cookieName of nameList) {
      if (!cookies[cookieName]) {
        return logger.logStatus(401, {
          logMsg: `Required cookie is missing: ${cookieName}.`,
          resMsg: "A required cookie is missing.",
        });
      }
    }

    logger.log("debug", "Cookies validated.");

    next();
  };
}
