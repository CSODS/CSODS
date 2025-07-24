import { RouteLogger } from "@/utils";
import { Request, Response, NextFunction } from "express";

export function validateCookies(
  ...cookieNames: string[]
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const { method, originalUrl, cookies } = req;
    const logHeader = `[${method} ${originalUrl}]`;

    const log = (msg: string) => RouteLogger.debug(`${logHeader} ${msg}`);
    const missingCookie = (cookie: string) => {
      log(`Required cookie is missing: ${cookie}`);
      res.status(401).json({
        message: `Required cookie is missing.`,
      });
    };

    const nameList = [...cookieNames];
    log("Validating cookies...");
    log(`Cookie list: ${nameList}.`);

    for (const cookieName of nameList) {
      if (!cookies[cookieName]) {
        return missingCookie(cookieName);
      }
    }

    log("Cookies validated.");

    next();
  };
}
