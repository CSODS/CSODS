import { RouteLogger } from "@/utils";
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
  const reqMethod = req.method;
  const originalUrl = req.originalUrl;

  RouteLogger.info(`[${reqMethod} ${originalUrl}] Processing request...`);

  const profiler = RouteLogger.startTimer();

  res.on("finish", () => {
    profiler.done({
      message: `[${reqMethod} ${originalUrl}] completed with status ${res.statusCode}.`,
    });
  });

  next();
}
