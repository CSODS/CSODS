import { Router } from "express";
import { API, AUTH } from "@data";
import { validateCookies, validateRequest } from "@middleware";
import * as controllers from "./controllers";
import { attachUserDataService, Limiters } from "./middleware";
import { loginOptions, registerSchema } from "./schemas";
import { attachUserSessionService } from "./middleware/user-session-service.middleware";

const { refresh } = AUTH.TOKEN_CONFIG_RECORD;
const { cookieName: REFRESH_TOKEN } = refresh.cookieConfig!;

const AUTH_ROUTES = API.AUTH_ROUTES;

export const authRouter = Router();

authRouter.use(attachUserDataService);
authRouter.use(attachUserSessionService);

authRouter.post(
  AUTH_ROUTES.SIGN_IN,
  Limiters.signInLimiter,
  validateRequest(loginOptions),
  controllers.handleLogin
);

authRouter.post(
  AUTH_ROUTES.REGISTER,
  Limiters.registerLimiter,
  validateRequest(registerSchema),
  controllers.handleNewUser
);

authRouter.post(
  AUTH_ROUTES.REFRESH,
  Limiters.refreshLimiter,
  validateCookies(REFRESH_TOKEN),
  controllers.handleRefreshToken
);

authRouter.post(
  AUTH_ROUTES.SIGN_OUT,
  Limiters.signOutLimiter,
  validateCookies(REFRESH_TOKEN),
  controllers.handleLogout
);
