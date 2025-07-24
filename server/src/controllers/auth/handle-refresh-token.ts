import { createJwt } from "@/utils";
import { tokenPayload, TokenPayload } from "@/viewmodels";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function handleRefreshToken(req: Request, res: Response) {
  const refreshToken = req.cookies["jwt"];

  const foundUser = await req.userDataService.getExistingUser({
    refreshToken: refreshToken,
  });

  //  evaluate jwt
  try {
    const payload: TokenPayload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as TokenPayload;

    const verifiedPayload: TokenPayload = tokenPayload.parse(payload);

    if (foundUser?.username !== payload.userInfo.username) {
      res
        .status(403)
        .json({ message: "403 Forbidden. Refresh token invalid." });
      return;
    }

    const accessToken = createJwt(verifiedPayload, { tokenType: "access" });

    res.json({ accessToken });
    return;
  } catch (err) {
    // todo: ADD WINSTON LOGGING
    console.error("Failed access token refresh.", err);
    res.sendStatus(403);
    return;
  }
}
