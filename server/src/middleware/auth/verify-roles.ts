import { Request, Response, NextFunction } from "express";
import { RouteLogHelper } from "@utils";

export function verifyRoles(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const logger = new RouteLogHelper(req, res);

    const { authPayload } = req;
    //  retrieving user info from authPayload.
    const userInfo = authPayload?.userInfo ?? null;
    if (!userInfo) return logger.logStatus(401, "Unauthenticated.");

    const { roles } = userInfo;
    const rolesArray = [...allowedRoles];

    const hasAllowedRole = roles
      //  compare each role to verify if it is included in the allowed roles
      .map((role) => rolesArray.includes(role))
      //  find a true value (first value). if there is one, request is authorized
      //  since the request would have an allowed role.
      .find((value) => value === true);

    if (!hasAllowedRole)
      return logger.logStatus(
        401,
        "User is not authorized to access this route."
      );

    next();
  };
}
