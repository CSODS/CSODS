import { eq } from "drizzle-orm";
import { UserRole } from "@models";
import { UserRolesTable, UserRoleViewModel } from "@viewmodels";
import { DbContext } from "@/db/csods";
import { Repository } from "./abstract.repository";

export class UserRoleRepository extends Repository<UserRolesTable> {
  public constructor(context: DbContext) {
    super(context, UserRole);
  }

  /**
   * @public
   * @async
   * @function getRolesByUserId
   * @description Asynchronously retrives a list of rows from the {@link UserRolesTable}
   * in the database of which the `UserId` field matches the given {@link userId}.
   * @param userId A `number` representing the {@link UserRole.UserId} of the returned list of
   * {@link UserRoleViewModel}
   * @returns A `Promise` that resolves to a list of {@link UserRoleViewModel}
   */
  public async getRolesByUserId(userId: number): Promise<UserRoleViewModel[]> {
    const userRoles = await this._dbContext.query.UserRole.findMany({
      where: eq(UserRole.userId, userId),
    });

    return userRoles;
  }
}
