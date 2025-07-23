import bcrypt from "bcryptjs";
import { createContext } from "@/db/csods";
import { UserRepository, IUserFilter } from "@services";
import { NewUser } from "@viewmodels";

export async function createUserDataService() {
  const dbContext = await createContext();
  const userRepoInstance = new UserRepository(dbContext);
  return new UserDataService(userRepoInstance);
}
/**
 * @public
 * @class
 * @description Handles user data manipulation, validation, and verification, as well as repository actions.
 */
export class UserDataService {
  private readonly _userRepository: UserRepository;

  public constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
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
    user.Password = await bcrypt.hash(user.Password, 10);
    const insertedId = await this._userRepository.insertUser(user);
    return insertedId;
  }

  /**
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
      email: user.Email,
      username: user.Username,
      studentName: user.StudentName,
      studentNumber: user.StudentNumber,
    };
    const existingUser = await this._userRepository.getUser(userFilter);

    return existingUser !== null;
  }
}
