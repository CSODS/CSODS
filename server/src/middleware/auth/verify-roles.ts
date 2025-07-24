import { RouteLogger } from "@/utils";
import { Request, Response, NextFunction } from "express";

export function verifyRoles(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { method, originalUrl, authPayload } = req;
    const logHeader = `[${method} ${originalUrl}]`;
    const userInfo = authPayload?.userInfo ?? null;

    const log = (msg: string) => RouteLogger.debug(`${logHeader} ${msg}`);
    const unauthorized = (msg: string) => {
      log(msg);
      res.status(401).json({ message: `Status 401. ${msg}` });
    };

    if (!userInfo) return unauthorized("Unauthenticated.");

    const { roles } = userInfo;
    const rolesArray = [...allowedRoles];

    const hasAllowedRole = roles
      //  compare each role to verify if it is included in the allowed roles
      .map((role) => rolesArray.includes(role))
      //  find a true value (first value). if there is one, request is authorized
      //  since the request would have an allowed role.
      .find((value) => value === true);

    if (!hasAllowedRole)
      return unauthorized("User is not authorized to access this route.");

    next();
  };
}
