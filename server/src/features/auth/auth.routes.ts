import { Router } from "express";
import dotenv from "dotenv";
import { API, AUTH } from "@data";
import { validateCookies, validateRequest } from "@middleware";
import {
  handleNewUser,
  handleLogin,
  handleRefreshToken,
  handleLogout,
} from "./controllers";
import { attachUserDataService, authRouteLimiter } from "./middleware";
import { loginSchema, registerSchema } from "./schemas";

dotenv.config();

const { refresh } = AUTH.TOKEN_CONFIG_RECORD;
const { cookieName: REFRESH_TOKEN } = refresh.cookieConfig!;

const AUTH_ROUTES = API.AUTH_ROUTES;

export const authRouter = Router();

authRouter.use(authRouteLimiter);
authRouter.use(attachUserDataService);

authRouter.post(AUTH_ROUTES.SIGN_IN, validateRequest(loginSchema), handleLogin);

authRouter.post(
  AUTH_ROUTES.REGISTER,
  validateRequest(registerSchema),
  handleNewUser
);

authRouter.post(
  AUTH_ROUTES.REFRESH,
  validateCookies(REFRESH_TOKEN),
  handleRefreshToken
);

authRouter.post(
  AUTH_ROUTES.SIGN_OUT,
  validateCookies(REFRESH_TOKEN),
  handleLogout
);
