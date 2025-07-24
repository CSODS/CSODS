import { Router } from "express";
import dotenv from "dotenv";
import {
  handleNewUser,
  handleLogin,
  handleRefreshToken,
  handleLogout,
} from "@controllers";
import { API, AUTH } from "@data";
import { validateCookies, validateRequest } from "@middleware";
import { loginSchema, registerSchema } from "@viewmodels";

dotenv.config();

const { refresh } = AUTH.TOKEN_CONFIG_RECORD;
const { cookieName: REFRESH_TOKEN } = refresh.cookieConfig!;

const AUTH_ROUTES = API.AUTH_ROUTES;

const authRouter = Router();

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

export default authRouter;
