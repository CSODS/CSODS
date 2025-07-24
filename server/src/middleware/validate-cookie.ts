import { Request, Response, NextFunction } from "express";

export function validateCookies(
  ...cookieNames: string[]
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const nameList = [...cookieNames];

    const cookies = req.cookies;

    for (const cookieName of nameList) {
      if (!cookies[cookieName]) {
        res.status(401).json({
          message: `Required cookie is missing.`,
        });
        return;
      }
    }

    next();
  };
}
