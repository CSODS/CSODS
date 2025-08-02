import { AccessTokenPayload } from "../schemas";
import { UserViewModel } from "../types";

/**
 * @public
 * @function createPayload
 * @description Creates a {@link AccessTokenPayload} object from a provided {@link UserViewModel}
 * and a list of `roles`.
 * @param user The {@link UserViewModel} containing user info details which will be used for
 * creating the payload.
 * @param roles A list of `string` containing the `User`'s `roles`.
 * @returns A {@link AccessTokenPayload} object which will be used for creating a `JwtToken`.
 */
export function createPayload(
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
