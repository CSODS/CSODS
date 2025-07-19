import { RouteLogger } from "@/utils";
import { Request, Response, NextFunction } from "express";

export function routeLogger(req: Request, res: Response, next: NextFunction) {
    const reqMethod = req.method;
    const originalUrl = req.originalUrl;

    RouteLogger.info(`[${reqMethod} ${originalUrl}] Processing request...`);
    
    const profiler = RouteLogger.startTimer();

    res.on('finish', () => {
        profiler.done({ message: `[${reqMethod} ${originalUrl}] completed with status ${res.statusCode}.`});
    })

    next();
}