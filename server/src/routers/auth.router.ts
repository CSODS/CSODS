import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { handleNewUser, handleLogin } from "@controllers";
import { API } from "@data";
import { validateRequest } from "@middleware";
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

authRouter.post(AUTH_ROUTES.REFRESH, async (req, res) => {
  //  controller logic here.
});

authRouter.post(AUTH_ROUTES.SIGN_OUT, async (req, res) => {
  //  controller logic here.
});

export default authRouter;

const handleRefreshToken = (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); //  unauthorized

  const refreshToken = cookies.jwt;
  console.log(refreshToken);

  //  TODO: replace this with querying the database/cache for the user with matching refresh token.
  const foundUser = { user: "someuser", password: "someHash" };

  //  evaluate jwt
  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);

    //  TODO: implement better typing. better yet, with an interface.
    if (foundUser.user !== (<any>payload).user) return res.sendStatus(403); //  forbidden

    const roles = ["someRole", "someRole2"]; // ideally add to accessToken payload. This should come from the userModel queried in the database.
    const accessToken = jwt.sign(
      { username: (<any>payload).user },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "10m" }
    );
    res.json({ accessToken });
  } catch (err) {
    return res.sendStatus(403); //  forbidden
  }
};

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
