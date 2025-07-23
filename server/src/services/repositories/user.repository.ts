import { and, eq, or, SQL } from "drizzle-orm";
import { DbContext } from "@/db/csods";
import { User } from "@models";
import { DbLogger } from "@/utils";
import { NewUser, UsersTable, UserViewModel } from "@/viewmodels";
import { Repository } from "./abstract.repository";

export class UserRepository extends Repository<UsersTable> {
  public constructor(context: DbContext) {
    super(context, User);
  }

  /**
   * @public
   * @async
   * @function insertUser
   * @description Asynchronously inserts a {@link NewUser} object into the {@link UsersTable}.
   *
   * @param user - The {@link NewUser} object to be inserted.
   * @returns - The {@link User.userId} if the insert operation is successful, `null` otherwise.
   */
  public async insertUser(user: NewUser): Promise<number | null> {
    try {
      DbLogger.info(`[User] Attempting to insert new user...`);

      const inserted = await this.insertRow(user);

      if (inserted) {
        DbLogger.info(
          `[User] User successfully inserted with id: ${inserted.userId}`
        );
        return inserted.userId;
      } else {
        DbLogger.warn(`[User] Failed inserting user due to conflict.`);
        return null;
      }
    } catch (err) {
      DbLogger.error(`[User] Insert operation failed.`, err);
      return null;
    }
  }
  /**
   * @public
   * @async
   * @function getUser
   * @description Asynchronously retrieves a user from the Users table, optionally applying a filter
   * {@link IUserFilter}.
   *
   * @param filter - The filter to apply to the table.
   * @returns - A {@link Promise} resolving to the found {@link UserViewModel} or `null`.
   */
  public async getUser(filter?: IUserFilter): Promise<UserViewModel | null> {
    const filterInfo = filter ? JSON.stringify(filter) : "none";
    DbLogger.info(`[User] Fetching a user with filter: ${filterInfo}`);

    const whereClause = this.buildWhereClause(filter);

    const user = await this.GetFirst({ whereClause });

    if (user)
      DbLogger.info(
        `[User] Successfuly fetched a user with id: ${user.userId}`
      );
    else DbLogger.info(`[Users] No user was found for filter: ${filterInfo}`);

    return user;
  }

  /**
   * @protected
   * @function buildWhereClause
   * @description Constructs a dynamic SQL `WHERE` clause based on the provided filter options.
   *
   * The method builds a list of conditions using the fields in the {@link IUserFilter} object.
   * If no filters are provided or all are `undefined`, the resulting clause will be `undefined`.
   *
   * @param filter An optional {@link IUserFilter} object used to determine which conditions to include.
   * @returns The composed `WHERE` SQL statement, or `undefined` if no conditions are set.
   */
  protected buildWhereClause(filter?: IUserFilter): SQL | undefined {
    const conditions = [];

    if (filter) {
      const {
        filterType = "or",
        email,
        username,
        studentName,
        studentNumber,
      } = filter;
      if (email && email.trim()) {
        conditions.push(eq(User.email, email));
      }

      if (username && username.trim()) {
        conditions.push(eq(User.username, username));
      }

      if (studentName && studentName.trim()) {
        conditions.push(eq(User.studentName, studentName));
      }

      if (studentNumber && studentNumber.trim()) {
        conditions.push(eq(User.studentNumber, studentNumber));
      }

      if (conditions.length > 0) {
        const whereClause =
          filterType === "or" ? or(...conditions) : and(...conditions);

        return whereClause;
      }
    }

    return undefined;
  }
}

/**
 * @interface IUserFilter
 * @description An interface for the filter used for Db queries on the {@link User} table.
 * Contains the following fields:
 * ### Filters:
 * - {@link filterType}: Option to decide whether the filter is an `or` or an `and`.
 * - {@link email}: Matches the user's email.
 * - {@link username}: Matches the user's username.
 * - {@link studentName}: Matches the user's studentName.
 * - {@link studentNumber}: Matches the user's studentNumber.
 */
export interface IUserFilter {
  filterType?: "and" | "or";
  email?: string;
  username?: string;
  studentName?: string | null;
  studentNumber?: string | null;
}
