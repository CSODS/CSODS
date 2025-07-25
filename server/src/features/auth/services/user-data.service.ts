import bcrypt from "bcryptjs";
import { createContext } from "@/db/csods";
import { AUTH } from "@data";
import { HashService } from "@/utils";
import { LoginSchema } from "../schemas";
import { NewUser, UserRoleViewModel, UserViewModel } from "../types";
import {
  UserRoleRepository,
  UserRepository,
  IUserFilter,
} from "./repositories";

const ROLES_MAP = AUTH.ROLES_MAP;

export async function createUserDataService() {
  const dbContext = await createContext();
  const userRepoInstance = new UserRepository(dbContext);
  const userRoleRepoInstance = new UserRoleRepository(dbContext);
  return new UserDataService(userRepoInstance, userRoleRepoInstance);
}
/**
 * @public
 * @class
 * @description Handles user data manipulation, validation, and verification, as well as repository actions.
 */
export class UserDataService {
  private readonly _userRepository: UserRepository;
  private readonly _userRoleRepository: UserRoleRepository;

  public constructor(
    userRepository: UserRepository,
    userRoleRepository: UserRoleRepository
  ) {
    this._userRepository = userRepository;
    this._userRoleRepository = userRoleRepository;
  }

  /**
   * @public
   * @async
   * @function insertUser
   * @description Asynchronously inserts a new user into the database through the
   * {@link UserRepository} with the {@link UserRepository.insertUser()} method.
   * Hashes the `password` field first with {@link bcrypt} before inserting.
   * @param user - The {@link NewUser} entry to be inserted.
   * @returns The `id` of the {@link NewUser} inserted, or null if the insertion failed.
   */
  public async insertUser(user: NewUser): Promise<number | null> {
    user.password = await bcrypt.hash(user.password, 10);
    const insertedId = await this._userRepository.insertUser(user);
    return insertedId;
  }

  /**
   * @deprecated
   * @public
   * @async
   * @function isUserExists
   * @description Asynchronously verifies if a `user` exists in the database.
   * @param user - The `user` to be verified for duplicates.
   * @returns - A promise resolving to a boolean value being `true` if the user already exists,
   * and `false` otherwise.
   */
  public async isUserExists(user: NewUser): Promise<boolean> {
    //  TODO: add lowercase columns for email, username, student name, and student number in and database to be indexed for faster lookups.
    //  TODO: use lowercase columns in buildWhereClause function.
    const userFilter: IUserFilter = {
      filterType: "or",
      email: user.email,
      username: user.username,
      studentName: user.studentName,
      studentNumber: user.studentNumber,
    };
    const existingUser = await this._userRepository.getUser(userFilter);

    return existingUser !== null;
  }
  /**
   * @public
   * @async
   * @function getExistingUser
   * @description Asynchronously retrieves a `User` from the database filtered using fields
   * provided by either a {@link NewUser}, a {@link LoginSchema} object, or a `refreshToken`.
   * If a `refreshToken` is provided, it will be hashed with {@link HashService.hashToken()}
   * before getting submitted to the `userFilter`.
   * @param options.user A {@link NewUser} object used for filtering the database query
   * during register operations.
   * @param options.login A {@link LoginSchema} object used for filtering the databse query
   * during login operations.
   * @param options.refreshToken A string representing the `refreshToken`.
   * @returns A `promise` resolving to a {@link UserViewModel} if a `User` is found, or
   * `null` if no `User` is found.
   */
  public async getExistingUser(
    options: GetExistingUserOptions
  ): Promise<UserViewModel | null> {
    const { user, login, refreshToken } = options;

    const userFilter: IUserFilter = {};

    if (user) {
      const { email, username, studentName, studentNumber } = user;

      userFilter.filterType = "or";
      userFilter.email = email;
      userFilter.username = username;
      userFilter.studentName = studentName;
      userFilter.studentNumber = studentNumber;
    } else if (login) {
      const { email, username } = login;
      //  either email or username will always be undefined due to how `LoginSchema` is
      //  declared.
      userFilter.email = email;
      userFilter.username = username;
      //  filter type isn't really needed but is still defined for robustness.
      userFilter.filterType = "and";
    } else if (refreshToken) {
      const hashedToken = HashService.hashToken(refreshToken);

      userFilter.refreshToken = hashedToken;
    }

    const existingUser = await this._userRepository.getUser(userFilter);

    return existingUser;
  }

  /**
   * @public
   * @async
   * @function getUserRoles
   * @description Asynchronously retrieves a list of roles linked to the provided
   * {@link userId}. First, the function retrieves a list of {@link UserRoleViewModel}
   * queried from the database, then maps each row a new list containing strings representing
   * the actual names of the role looked up from the {@link ROLES_MAP} constants.
   * TODO: Use a roles cache for look-up instead of the constants.
   * @param userId
   * @returns
   */
  public async getUserRoles(userId: number): Promise<string[]> {
    const userRoles = await this._userRoleRepository.getRolesByUserId(userId);

    const rolesMapValues = Object.values(ROLES_MAP);

    const roleList = userRoles.map((userRole) => {
      const role = rolesMapValues.find(
        (roleDetails) => roleDetails.roleId === userRole.roleId
      );
      return role?.roleName;
    });

    return roleList.filter((role) => role !== undefined);
  }
  /**
   * @public
   * @async
   * @function updateRefreshToken
   * @description Asynchronously updates the `refreshToken` of a `User` in the database.
   * Hashes the refresh token first with the {@link HashService.hashToken()} method then
   * calls the {@link UserRepository.updateRefreshToken()} method to persist the changes
   * to the database. If the `refreshToken` is null, skip hashing and store null directly
   * to the database.
   * @param userId The `userId` of the `User` whose `refreshToken` needs to be updated.
   * @param refreshToken The `string` or `null` representing the `refreshToken` value
   * to be stored.
   * @returns A `Promise` that resolves to the `userId` of the updated `User` or `null`
   * if the update fails.
   */
  public async updateRefreshToken(
    userId: number,
    refreshToken: string | null
  ): Promise<number | null> {
    const tokenValue = refreshToken
      ? HashService.hashToken(refreshToken)
      : null;

    const updatedUserId = await this._userRepository.updateRefreshToken(
      userId,
      tokenValue
    );

    return updatedUserId;
  }
}

type GetExistingUserOptions = withUser | withLogin | withRefreshToken;

type withUser = {
  user: NewUser;
  login?: undefined;
  refreshToken?: undefined;
};

type withLogin = {
  user?: undefined;
  login: LoginSchema;
  refreshToken?: undefined;
};

type withRefreshToken = {
  user?: undefined;
  login?: undefined;
  refreshToken: string;
};
