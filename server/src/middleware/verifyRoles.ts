import { Request, Response, NextFunction } from "express"

export function verifyRoles(...allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const roles = (<any>req)?.roles as string[] ?? null;
        //  ideally use an interface or extend the Request body for better typing.
        if (!roles) return res.sendStatus(401);    // unauthorized. no roles.
        const rolesArray = [...allowedRoles];
        //  logging. remove when development is done.
        console.log(rolesArray);    // roles from params
        console.log(roles); //  roles from jwt
        //  
        const result = roles
            //  compare each role to verify if it is included in the allowed roles
            .map(role => rolesArray.includes(role))
            //  find a true value (first value). if there is one, request is authorized
            //  since the request would have an allowed role.
            .find(value => value === true);

        if (!result) return res.sendStatus(401);    //  unauthorized. no allowed roles.

        next();
    }
}