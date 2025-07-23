import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { LoginSchema, TokenPayload } from "@viewmodels";
import { verifyPassword } from "@utils";

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
export async function handleLogin(
  req: Request<{}, {}, LoginSchema>,
  res: Response
) {
  const loginFields: LoginSchema = req.body;

  //  find the user in the database.
  const foundUser = await req.userDataService.getExistingUser({
    login: loginFields,
  });

  if (!foundUser) {
    res.sendStatus(401); // unauthorized
    return;
  }

  const match = await verifyPassword(foundUser, loginFields.password);

  if (match) {
    const roles = await req.userDataService.getUserRoles(foundUser.userId);

    const payload: TokenPayload = {
      userInfo: {
        email: foundUser.email,
        username: foundUser.username,
        studentName: foundUser.studentName,
        studentNumber: foundUser.studentNumber,
        userIconUrl: "",
        roles: roles,
      },
    };
    //  create JWT token
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "10m" } //  ideally 5-10 mins
    );
    const refreshToken = jwt.sign(
      payload,
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
  } else {
    res.sendStatus(401); // unauthorized.
    return;
  }
}
