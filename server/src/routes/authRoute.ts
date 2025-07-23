import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { handleNewUser } from "@controllers";
import { CONSTANTS } from "@data";
import { validateRequest } from "@middleware";
import { registerSchema } from "@viewmodels";

dotenv.config();

const AUTH_ROUTES = CONSTANTS.AUTH_ROUTES;

const authRouter = Router();

authRouter.post(AUTH_ROUTES.SIGN_IN, async (req, res) => {
  //  controller logic here
});

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

/**
 * @public
 * @async
 * @function handleLogin
 * @description Controller for handling login.
 * - Receives username, email, and password from the request body.
 * - Validates if the username and/or email fields exist.
 * - If they don't, respond with status 404. If they exist, check if the username and/or email exists in the database.
 * - If they don't, respond with status 401. If they exist in the database, validate the password with bcrypt.
 * - If the password doesn't match, responsd with status 401. If they match, return a success message.
 * @param req
 * @param res
 */
const handleLogin = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res
      .status(404)
      .json({ message: "username, password, and email are required." });

  //  find the user in the database.
  const foundUser = { user: "someuser", password: "someHash" };

  if (!foundUser) return res.sendStatus(401); // unauthorized

  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    const roles = ["someRole", "someRole2"]; // ideally add to accessToken payload. This should come from the userModel queried in the database.
    //  create JWT token
    const accessToken = jwt.sign(
      { username: foundUser.user }, // ideally add roles too
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "10m" } //  ideally 5-10 mins
    );
    const refreshToken = jwt.sign(
      { username: foundUser.user },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "1d" } //  1 day
    );

    //  TODO: filter otherUsers that are not the found user
    //  set found user and refresh token to the current user.

    res.cookie(
      "jwt", //  cookie name (could be anything really)
      refreshToken,
      {
        httpOnly: true, // httpOnly is not available to js, much more secure
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      }
    );
    res.json({ accessToken });
  } else return res.sendStatus(401); // unauthorized.
};

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
