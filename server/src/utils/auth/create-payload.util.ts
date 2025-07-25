import { TokenPayload, UserViewModel } from "@viewmodels";

/**
 * @public
 * @function createPayload
 * @description Creates a {@link TokenPayload} object from a provided {@link UserViewModel}
 * and a list of `roles`.
 * @param user The {@link UserViewModel} containing user info details which will be used for
 * creating the payload.
 * @param roles A list of `string` containing the `User`'s `roles`.
 * @returns A {@link TokenPayload} object which will be used for creating a `JwtToken`.
 */
export function createPayload(
  user: UserViewModel,
  roles: string[]
): TokenPayload {
  const payload: TokenPayload = {
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
