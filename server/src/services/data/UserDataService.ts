import bcrypt from 'bcryptjs';
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
            filterType: 'or',
            email: user.Email,
            username: user.Username,
            studentName: user.StudentName,
            studentNumber: user.StudentNumber
        }
        const existingUser = await this._userRepository.getUser(userFilter);

        return existingUser !== null;
    }

    /**
     * @public
     * @function validateUser
     * @description Validates a user and determines if there are any invalid fields.
     * Throws an error with a specified message if any field is invalid.
     * Fields `studentName` and `studentNumber` are validated automatically if not provided.
     * @param user - The {@link NewUser} object to be validated.
     */
    public validateUser(
        fields: {
            Email: any,
            Username: any,
            Password: any,
            StudentName: any,
            StudentNumber: any,
            UserIconUrl: any
        }
    ): asserts fields is NewUser {
        const { Email, Username, Password, StudentName, StudentNumber, UserIconUrl } = fields;

        const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
        const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
        const STUDENT_NAME_REGEX = /^[a-zA-Z]+(?:\s[a-zA-Z]+){0,9}$/;
        const STUDENT_NUMBER_REGEX = /^[0-9]{3}-[0-9]{4}$/;

        const isValidEmail = typeof Email === 'string' && EMAIL_REGEX.test(Email);
        const isValidUsername = typeof Email === 'string' && USERNAME_REGEX.test(Username);
        const isValidPassword = typeof Password === 'string' && PASSWORD_REGEX.test(Password);
        const isValidStudentName = typeof StudentName === 'string' 
            ? STUDENT_NAME_REGEX.test(StudentName) || StudentName.trim() === ''
            : true;
        const isValidStudentNumber = typeof StudentNumber === 'string' 
            ? STUDENT_NUMBER_REGEX.test(StudentNumber) || StudentNumber.trim() === ''
            : true;

        if (!isValidEmail) throw new Error('Invalid email.');
        if (!isValidUsername) throw new Error('Invalid username.');
        if (!isValidPassword) throw new Error('Invalid password.');
        if (!isValidStudentName) throw new Error('Invalid student name.');
        if (!isValidStudentNumber) throw new Error('Invalid student number.');
    }


}