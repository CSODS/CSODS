import { Request, Response, NextFunction } from "express";

export function verifyRoles(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const roles = req.authPayload?.userInfo.roles ?? null;

    if (!roles) {
      res.status(401).json({ message: "Unauthorized. User has no roles." });
      return;
    }

    const rolesArray = [...allowedRoles];

    const hasAllowedRole = roles
      //  compare each role to verify if it is included in the allowed roles
      .map((role) => rolesArray.includes(role))
      //  find a true value (first value). if there is one, request is authorized
      //  since the request would have an allowed role.
      .find((value) => value === true);

    if (!hasAllowedRole) {
      res
        .status(401)
        .json({ message: "User is not authorized to access this route." });
      return;
    }

    next();
  };
}
