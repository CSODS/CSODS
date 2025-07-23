import { UserViewModel } from "@/viewmodels";
import bcrypt from "bcryptjs";

/**
 * @public
 * @async
 * @function verifyPassword
 * @description Asynchronously compares the `passwordInput` to the hashed `password` of
 * a provided {@link UserViewModel}. Used for `login` operations.
 * @param user The {@link UserViewModel} of which the hashed `password` field will be
 * compared to the `passwordInput`.
 * @param passwordInput A `string` representing the password input.
 * @returns A `Promise` that resolves to a `boolean` which will be `true` if the
 * `passwordInput` passes the hash test, and `false` otherwise.
 */
export async function verifyPassword(
  user: UserViewModel,
  passwordInput: string
): Promise<boolean> {
  const match = await bcrypt.compare(passwordInput, user.password);

  return match;
}
