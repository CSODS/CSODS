import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import {
  handleNewUser,
  handleLogin,
  handleRefreshToken,
  handleLogout,
} from "@controllers";
import { API, COOKIES } from "@data";
import { validateCookies, validateRequest } from "@middleware";
import { loginSchema, registerSchema } from "@viewmodels";

dotenv.config();

const COOKIE_NAMES = COOKIES.COOKIE_NAMES;

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
  validateCookies(COOKIE_NAMES.REFRESH_TOKEN),
  handleRefreshToken
);

authRouter.post(
  AUTH_ROUTES.SIGN_OUT,
  validateCookies(COOKIE_NAMES.REFRESH_TOKEN),
  handleLogout
);

export default authRouter;
