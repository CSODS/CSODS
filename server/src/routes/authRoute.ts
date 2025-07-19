import { Router } from "express";
import { CONSTANTS } from "@data";
import { RouteLogger } from "@utils";

const AUTH_ROUTES = CONSTANTS.AUTH_ROUTES;

const authRouter = Router();

authRouter.get(AUTH_ROUTES.SIGN_IN, async (req, res) => {
    RouteLogger.info(`[${[AUTH_ROUTES.SIGN_IN]}] Processing request...`);
    const profiler = RouteLogger.startTimer();

    //  controller logic here

    profiler.done({ message: `[${AUTH_ROUTES.SIGN_IN}] Request processed.`} );
});

authRouter.get(AUTH_ROUTES.REGISTER, async (req, res) => {
    RouteLogger.info(`[${AUTH_ROUTES.REGISTER}] Processing request...`);
    const profiler = RouteLogger.startTimer();

    //  controller logic here

    profiler.done({ message: `[${AUTH_ROUTES.REGISTER}] Request processed.` });
})

export default authRouter;