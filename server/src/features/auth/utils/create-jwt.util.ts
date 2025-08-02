import jwt from "jsonwebtoken";
import { AUTH } from "@data";
import { AccessTokenPayload } from "../schemas";

const TOKEN_CONFIG_RECORD = AUTH.TOKEN_CONFIG_RECORD;
type TokenType = AUTH.TokenType;

interface JwtOptions {
  tokenType: TokenType;
}

/**
 * @public
 * @function createJwt
 * @description A utility function that creates and returns a `JWT` from a provided `payload`
 * object and `options` parameter.
 * @param payload The payload. Follows the {@link AccessTokenPayload} type.
 * @param options.tokenType The token type. See {@link TokenType} for info on the allowed
 * values.
 * @returns The created `JWT`.
 */
export function createJwt(
  payload: AccessTokenPayload,
  options: JwtOptions
): string {
  const { tokenType } = options;
  const { secret, signOptions } = TOKEN_CONFIG_RECORD[tokenType];

  if (!secret) {
    throw new Error(
      `${tokenType.toUpperCase()}_TOKEN_SECRET is not defined in env.`
    );
  }

  const token: string = jwt.sign(payload, secret, signOptions);

  return token;
}
