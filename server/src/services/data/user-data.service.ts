import bcrypt from "bcryptjs";
import { createContext } from "@/db/csods";
import { AUTH } from "@data";
import { UserRepository, IUserFilter } from "@services";
import {
  LoginSchema,
  NewUser,
  UserRoleViewModel,
  UserViewModel,
} from "@viewmodels";
import { UserRoleRepository } from "../repositories/user-role.repository";

const ROLES = AUTH.ROLES;

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
   * provided by either a {@link NewUser} or {@link LoginSchema} object.
   * @param options.user - A {@link NewUser} object used for filtering the database query
   * during register operations.
   * @param options.login - A {@link LoginSchema} object used for filtering the databse query
   * during login operations.
   * @returns A `promise` resolving to a {@link UserViewModel} if a `User` is found, or
   * `null` if no `User` is found.
   */
  public async getExistingUser(
    options: GetExistingUserOptions
  ): Promise<UserViewModel | null> {
    const { user, login } = options;

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
   * the actual names of the role looked up from the {@link ROLES} constants.
   * TODO: Use a roles cache for look-up instead of the constants.
   * @param userId
   * @returns
   */
  public async getUserRoles(userId: number): Promise<string[]> {
    const userRoles = await this._userRoleRepository.getRolesByUserId(userId);

    const roleList = userRoles.map(
      (userRole) => ROLES[userRole.roleId as keyof typeof ROLES]
    );

    return roleList;
  }
}

type GetExistingUserOptions = withUser | withLogin;

type withUser = {
  user: NewUser;
  login?: undefined;
};

type withLogin = {
  user?: undefined;
  login: LoginSchema;
};
