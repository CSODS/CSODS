import jwt from "jsonwebtoken";
import { AUTH } from "@data";
import { AccessTokenPayload, RefreshTokenPayload } from "../schemas";

type AccessOptions = {
  tokenType: Extract<AUTH.TokenType, "access">;
  payload: AccessTokenPayload;
};

type RefreshOptions = {
  tokenType: Extract<AUTH.TokenType, "refresh">;
  payload: RefreshTokenPayload;
};

type JwtOptions = AccessOptions | RefreshOptions;

/**
 * @public
 * @function createJwt
 * @description A utility function that creates and returns a `JWT` from a provided
 * `options` parameter.
 * @param options.tokenType The token type. See {@link AUTH.TokenType} for info on the allowed
 * values.
 * @param options.payload The payload object. May either be {@link AccessTokenPayload} or
 * {@link RefreshTokenPayload} depending on the value of {@link tokenType}
 * @returns The created `JWT`.
 *
 * ! this change was done in favor of allowing the method to accept different payload types
 * ! depending on the token type.
 */
export function createJwt({ tokenType, payload }: JwtOptions): string {
  const { secret, signOptions } = AUTH.TOKEN_CONFIG_RECORD[tokenType];

  if (!secret) {
    throw new Error(
      `${tokenType.toUpperCase()}_TOKEN_SECRET is not defined in env.`
    );
  }

  const token: string = jwt.sign(payload, secret, signOptions);

  return token;
}
