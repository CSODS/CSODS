import { Request, Response } from "express";
import { LoginSchema, TokenPayload } from "@viewmodels";
import { createJwt, createPayload, verifyPassword } from "@utils";

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

  const foundUser = await req.userDataService.getExistingUser({
    login: loginFields,
  });

  if (!foundUser) {
    res.sendStatus(401); // unauthorized
    return;
  }

  const isUserVerified = await verifyPassword(foundUser, loginFields.password);

  if (isUserVerified) {
    const roles: string[] = await req.userDataService.getUserRoles(
      foundUser.userId
    );

    const payload: TokenPayload = createPayload(foundUser, roles);

    const accessToken = createJwt(payload, { tokenType: "access" });
    const refreshToken = createJwt(payload, { tokenType: "refresh" });

    const updatedUserId = await req.userDataService.updateRefreshToken(
      foundUser.userId,
      refreshToken
    );

    if (!updatedUserId) {
      res.status(500).json({
        message: "Failed updating refresh token. Please try again later.", //  database update operation failed.
      });
      return;
    }

    res.cookie(
      "jwt", //  cookie name (could be anything really)
      refreshToken,
      {
        httpOnly: true, // httpOnly is not available to js, much more secure
        secure: false, // * set to false when testing with thunderclient
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
