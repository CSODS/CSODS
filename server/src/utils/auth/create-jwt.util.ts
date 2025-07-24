import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { TokenPayload } from "@viewmodels";

dotenv.config();

type TokenType = "access" | "refresh";

interface JwtOptions {
  tokenType: TokenType;
}

/**
 * @public
 * @function createJwt
 * @description A utility function that creates and returns a `JWT` from a provided `payload`
 * object and `options` parameter.
 * @param payload The payload. Follows the {@link TokenPayload} type.
 * @param options.tokenType The token type. See {@link TokenType} for info on the allowed
 * values.
 * @returns The created `JWT`.
 */
export function createJwt(payload: TokenPayload, options: JwtOptions): string {
  const { tokenType } = options;
  const { secret, signOptions } = tokenConfigRecord[tokenType];

  if (!secret) {
    throw new Error(
      `${tokenType.toUpperCase()}_TOKEN_SECRET is not defined in env.`
    );
  }

  const token: string = jwt.sign(payload, secret, signOptions);

  return token;
}

type TokenConfigRecord = Record<TokenType, TokenConfig>;

interface TokenConfig {
  secret: string | undefined;
  signOptions: jwt.SignOptions;
}

/**
 * @constant tokenConfigRecord
 * @description A {@link TokenConfigRecord} object containing config details about different
 * token types. It's key is of type {@link TokenType}.
 */
const tokenConfigRecord: TokenConfigRecord = {
  access: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    signOptions: {
      expiresIn: "30s",
    } as jwt.SignOptions,
  },
  refresh: {
    secret: process.env.REFRESH_TOKEN_SECRET,
    signOptions: {
      expiresIn: "30d",
    } as jwt.SignOptions,
  },
};
