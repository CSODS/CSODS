import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import { handleNewUser, handleLogin, handleRefreshToken } from "@controllers";
import { API } from "@data";
import { validateCookies, validateRequest } from "@middleware";
import { loginSchema, registerSchema } from "@viewmodels";

dotenv.config();

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
  validateCookies("jwt"),
  handleRefreshToken
);

authRouter.post(AUTH_ROUTES.SIGN_OUT, async (req, res) => {
  //  controller logic here.
});

export default authRouter;

const handleLogout = (req: Request, res: Response) => {
  //  delete the access token in the client.
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //  no content/not logged-in anyway

  const refreshToken = cookies.jwt;
  console.log(refreshToken);

  //  TODO: replace this with querying the database/cache for the user with matching refresh token.
  const foundUser = { user: "someuser", password: "someHash" };
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204); // successfuly but no content.
  }

  //  Delete refresh token in db/cache.

  //  TODO: filter otherUsers that are not the found user
  //  set found user and refresh token to the current user.

  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true }); //  secure: true, only serves on https.
  res.sendStatus(204);
};
