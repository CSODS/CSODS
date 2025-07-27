import bcrypt from "bcryptjs";
import { createContext } from "@/db/csods";
import { AUTH } from "@data";
import { HashService } from "@/utils";
import { LoginOptions } from "../schemas";
import { NewUser, UserRoleViewModel, UserViewModel } from "../types";
import {
  UserRoleRepository,
  UserRepository,
  IUserFilter,
} from "./repositories";
import { AUTH_REGEX } from "@/data/constants/regex.constants";

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
   * @public
   * @async
   * @function tryGetUser
   * @description Asynchronously attempts to retrieve a `User` from the database filtered using fields
   * provided by either a {@link NewUser}, a {@link LoginOptions} object, or a `refreshToken`.
   * If a `refreshToken` is provided, it will be hashed with {@link HashService.hashToken()}
   * before getting submitted to the `userFilter`.
   * @param options.user A {@link NewUser} object used for filtering the database query
   * during register operations.
   * @param options.login A {@link LoginOptions} object used for filtering the databse query
   * during login operations.
   * @param options.refreshToken A string representing the `refreshToken`.
   * @returns A `promise` resolving to a {@link UserViewModel} if a `User` is found, or
   * `null` if no `User` is found.
   */
  public async tryGetUser(
    options: TryGetUserOptions
  ): Promise<UserViewModel | null> {
    //  TODO: add lowercase columns for email, username, student name, and student number in and database to be indexed for faster lookups.
    //  TODO: use lowercase columns in buildWhereClause function.
    let userFilter: IUserFilter = {};

    switch (options.type) {
      case "user": {
        const { email, username, studentName, studentNumber } = options.user;

        userFilter = {
          filterType: "or",
          email: email,
          username: username,
          studentName: studentName,
          studentNumber: studentNumber,
        };
        break;
      }
      case "login": {
        const { identifier } = options.login;
        const isEmail = AUTH_REGEX.EMAIL.test(identifier);

        isEmail
          ? (userFilter.email = identifier)
          : (userFilter.username = identifier);
        break;
      }
      case "refresh": {
        const hashedToken = HashService.hashToken(options.refreshToken);

        userFilter.refreshToken = hashedToken;
        break;
      }
    }

    const user = await this._userRepository.getUser(userFilter);

    return user;
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

type TryGetUserOptions = WithUser | WithLogin | WithRefreshToken;

type WithUser = {
  type: "user";
  user: NewUser;
};

type WithLogin = {
  type: "login";
  login: LoginOptions;
};

type WithRefreshToken = {
  type: "refresh";
  refreshToken: string;
};
