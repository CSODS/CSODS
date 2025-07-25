import { Request, Response, NextFunction } from "express";
import { RouteLogHelper } from "@utils";

export function validateCookies(
  ...cookieNames: string[]
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const logger = new RouteLogHelper(req, res);
    const missingCookie = (cookie: string) => {
      logger.log("debug", `Required cookie is missing: ${cookie}`);
      res.status(401).json({
        message: `A required cookie is missing.`,
      });
    };

    const { cookies } = req;
    const nameList = [...cookieNames];
    logger.log("debug", "Validating cookies...");
    logger.log("debug", `Cookie list: ${nameList}.`);

    for (const cookieName of nameList) {
      if (!cookies[cookieName]) {
        return missingCookie(cookieName);
      }
    }

    logger.log("debug", "Cookies validated.");

    next();
  };
}
