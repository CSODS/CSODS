import { Request, Response, NextFunction } from "express";
import { createRequestLogContext, RequestLogContext } from "@utils";

/**
 * @middleware
 * @function attachRequestLogContext
 * @description Attaches the {@link RequestLogContext} utility class as a middleware to the
 * {@link Request} object.
 * @param req
 * @param res
 * @param next
 */
export function attachRequestLogContext(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.requestLogContext = createRequestLogContext(req, res);
  next();
}

// * extending the Express.Request interface to include the logger context for this
// * middleware.
declare global {
  namespace Express {
    interface Request {
      requestLogContext: RequestLogContext;
    }
  }
}
