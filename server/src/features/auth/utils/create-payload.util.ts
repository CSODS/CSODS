import { AUTH } from "@/data";
import { AccessTokenPayload, RefreshTokenPayload } from "../schemas";
import { UserViewModel } from "../types";

/**
 * @deprecated Please use createPayload
 * @public
 * @function createPayloadDeprecated
 * @description Creates a {@link AccessTokenPayload} object from a provided {@link UserViewModel}
 * and a list of `roles`.
 * @param user The {@link UserViewModel} containing user info details which will be used for
 * creating the payload.
 * @param roles A list of `string` containing the `User`'s `roles`.
 * @returns A {@link AccessTokenPayload} object which will be used for creating a `JwtToken`.
 */
export function createPayloadDeprecated(
  user: UserViewModel,
  roles: string[]
): AccessTokenPayload {
  const payload: AccessTokenPayload = {
    userInfo: {
      email: user.email,
      username: user.username,
      studentName: user.studentName,
      studentNumber: user.studentNumber,
      userIconUrl: "",
      roles: roles,
    },
  };

  return payload;
}

type AccessTokenRequirements = {
  tokenType: Extract<AUTH.TokenType, "access">;
  user: UserViewModel;
  roles: string[];
};
type RefreshTokenRequirements = {
  tokenType: Extract<AUTH.TokenType, "refresh">;
  userId: number;
};

type PayloadRequirements = AccessTokenRequirements | RefreshTokenRequirements;

/**
 * @public
 * @function createPayload
 * @description Creates a {@link AccessTokenPayload} or {@link RefreshTokenPayload} object
 * from a the provider {@link payloadRequirements}.
 * @param payloadRequirements The requirements to create the payload. Contains the following
 * fields:
 * - `tokenType` - The type of token that needs the payload. See {@link AUTH.TokenType} for
 * the allowed values.
 * - `user` - A {@link UserViewModel} object. Used for {@link AccessTokenPayload}.
 * - `roles` - A list of `string`s representing the user's roles. Used for {@link AccessTokenPayload}
 * - `userId` - The user's id in the database. Used for {@link RefreshTokenPayload}
 * @returns - An {@link AccessTokenPayload} or {@link RefreshTokenPayload} object.
 *
 * ! this change was done in favor of allowing the method to return different payload types
 * ! depending on the token type.
 */
export function createPayload(
  payloadRequirements: AccessTokenRequirements
): AccessTokenPayload;
export function createPayload(
  payloadRequirements: RefreshTokenRequirements
): RefreshTokenPayload;
export function createPayload(
  payloadRequirements: PayloadRequirements
): AccessTokenPayload | RefreshTokenPayload {
  switch (payloadRequirements.tokenType) {
    case "access": {
      return createAccessTokenPayload(payloadRequirements);
    }
    case "refresh": {
      return createRefreshTokenPayload(payloadRequirements);
    }
    default: {
      throw new Error("Invalid token type.");
    }
  }
}

/**
 * @function createAccessTokenPayload
 * @description Helper function for creating access token payload.
 * @param payloadRequirements
 * @returns
 */
function createAccessTokenPayload(
  payloadRequirements: AccessTokenRequirements
) {
  const { user, roles } = payloadRequirements;

  const payload: AccessTokenPayload = {
    userInfo: {
      email: user.email,
      username: user.username,
      studentName: user.studentName,
      studentNumber: user.studentNumber,
      userIconUrl: "",
      roles: roles,
    },
  };

  return payload;
}

/**
 * @function createRefreshTokenPayloazd
 * @description Helper function for creating refresh token payload.
 * @param payloadRequirements
 * @returns
 */
function createRefreshTokenPayload(
  payloadRequirements: RefreshTokenRequirements
) {
  const { userId } = payloadRequirements;
  const payload: RefreshTokenPayload = {
    userId,
  };

  return payload;
}
