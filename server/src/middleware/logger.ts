import { RouteLogger } from "@/utils";
import { Request, Response, NextFunction } from "express";

export function routeLogger(req: Request, res: Response, next: NextFunction) {
    RouteLogger.info(`[${req.originalUrl}] Processing request...`);
    
    const profiler = RouteLogger.startTimer();

    res.on('finish', () => {
        profiler.done({ message: `[${req.method} ${req.originalUrl}] completed with status ${res.statusCode}.`});
    })

    next();
}