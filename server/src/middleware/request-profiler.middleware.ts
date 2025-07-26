import { Request, Response, NextFunction } from "express";

/**
 * @middleware
 * @function requestProfiler
 * @description A middleware for logging the start and end of a request, including
 * status code and duration.
 * @param req
 * @param res
 * @param next
 */
export function requestProfiler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { requestLogContext: requestLogger } = req;

  requestLogger.startRequestProfiler();

  res.on("finish", () => {
    requestLogger.endRequestProfiler();
  });

  next();
}
