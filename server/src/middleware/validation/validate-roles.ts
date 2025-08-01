import { Request, Response, NextFunction } from "express";

export function validateRoles(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { requestLogContext: requestLogger } = req;

    requestLogger.log("debug", "Validating user role access.");
    const { authPayload } = req;
    const userInfo = authPayload?.userInfo ?? null;
    if (!userInfo) return requestLogger.logStatus(401, "Unauthenticated.");

    const { roles } = userInfo;
    const rolesArray = [...allowedRoles];

    const hasAllowedRole = roles
      //  compare each role to verify if it is included in the allowed roles
      .map((role) => rolesArray.includes(role))
      //  find a true value (first value). if there is one, request is authorized
      //  since the request would have an allowed role.
      .find((value) => value === true);

    if (!hasAllowedRole)
      return requestLogger.logStatus(
        401,
        "User is not authorized to access this route."
      );

    next();
  };
}
