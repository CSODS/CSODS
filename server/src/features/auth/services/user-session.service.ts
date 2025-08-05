import { randomUUID } from "crypto";
import { createContext } from "@/db/csods";
import { HashService } from "@/utils";
import { NewUserSession } from "../types";
import { UserSessionRepository } from "./repositories";

export async function createUserSessionService() {
  const dbContext = await createContext();
  const userSessionRepoInstance = new UserSessionRepository(dbContext);

  return new UserSessionService(userSessionRepoInstance);
}

/**
 * @class
 * @description Handles user session management from starting sessions, modifying
 * existing sessions, as well as ending sessions.
 */
export class UserSessionService {
  private readonly _userSessionRepository: UserSessionRepository;

  public constructor(userSessionRepository: UserSessionRepository) {
    this._userSessionRepository = userSessionRepository;
  }

  /**
   * @public
   * @function generateSessionNumber
   * @description Generates a session number for the provided `userId`.
   * Uses the `userId`, current date and a random generated `UUID`.
   * @param userId The `id` of the user.
   * @returns A string representing the generated session number.
   */
  public generateSessionNumber(userId: number): string {
    const sessionNumber = `${userId}-${Date.now()}-${randomUUID()}`;
    return sessionNumber;
  }

  /**
   * @public
   * @async
   * @function tryStartNewSession
   * @description Asynchronously attempts to start a new session for the user with
   * the provided `userId` and `refreshToken`. Optionally sets an expiry date for the
   * session with the `expiresAt` field.
   * Both the `sessionNumber` and `refreshToken` will be hashed before storing in the
   * database.
   * @param sessionData Contains the following fields:
   * - `sessionNumber` - The new session's unique session number identifier.
   * - `userId` - The user linked to the new session.
   * - `refreshToken` - The refresh token that will be hashed and stored to the database.
   * - `expiresAt` - An optional field specifying the expiry `Date` of the session.
   * Setting it will cause the session to be persistent.
   * @returns A `Promise` that resolves to the id of the new created session or `null`
   * if if the session creation fails.
   */
  public async tryStartNewSession(sessionData: {
    sessionNumber: string;
    userId: number;
    refreshToken: string;
    expiresAt?: Date | null;
  }): Promise<number | null> {
    const { sessionNumber, userId, refreshToken, expiresAt } = sessionData;

    const sessionNumberHash = HashService.cryptoHash(sessionNumber);
    const refreshTokenHash = HashService.cryptoHash(refreshToken);

    const now = new Date();
    const nowISO = now.toISOString();

    const newSession: NewUserSession = {
      sessionNumberHash,
      userId,
      refreshTokenHash,
      createdAt: nowISO,
      lastUsedAt: nowISO,
      expiresAt: expiresAt?.toISOString() ?? null,
    };

    const newSessionId = await this._userSessionRepository.tryInsertSession(
      newSession
    );

    return newSessionId;
  }

  /**
   * @public
   * @async
   * @function tryUpdateSession
   * @description Asynchronously attempts to update the session's refresh token.
   * Hashes the `sessionNumber`, `oldToken`, and `newToken` fields before proceeding to the repository
   * layer.
   * ! sessionNumber and userId are only used for logging, not validation.
   * @param data.sessionNumber The unique `sessionNumber` identifier of the `session` that will be updated.
   * @param data.userId The `id` of the `user` whose `session` will be updated.
   * @param data.oldToken The token that will be rotated out. Its hash will be the primary means
   * of validation.
   * @param data.newToken The token that will replace the old token.
   * @returns A `Promise` that resolves to the id of the updated session, or `null` if the
   * session update fails.
   */
  public async tryUpdateSession(data: {
    sessionNumber: string;
    userId: number;
    oldToken: string;
    newToken: string;
  }): Promise<number | null> {
    const { sessionNumber, userId, oldToken, newToken } = data;

    const updatedSessionId =
      await this._userSessionRepository.tryUpdateSessionToken({
        sessionNumberHash: HashService.cryptoHash(sessionNumber),
        userId,
        oldTokenHash: HashService.cryptoHash(oldToken),
        newTokenHash: HashService.cryptoHash(newToken),
      });

    return updatedSessionId;
  }

  /**
   * @public
   * @async
   * @function tryEndSession
   * @description Asynchronously attempts to end a session with the hash of a
   * specified `sessionNumber`.
   * @param sessionNumber The `sessionNumber` of the session that will be deleted.
   * @returns A `Promise` resolving to the `id` of the deleted session, or `null` if the
   * operation fails.
   */
  public async tryEndSession(sessionNumber: string): Promise<number | null> {
    const sessionNumberHash = HashService.cryptoHash(sessionNumber);

    const deletedSessionId =
      (
        await this._userSessionRepository.tryDeleteSession({
          scope: "user_session",
          sessionNumberHash,
        })
      )?.[0] ?? null;

    return deletedSessionId;
  }

  /**
   * @public
   * @async
   * @function endIdleSessions
   * @description Asynchronously ends/deletes idle sessions in the database.
   * @returns A `Promise` that resolves to an array of `number`s representing
   * the deleted session ids or `null` if the delete operation fails.
   */
  public async endIdleSessions(): Promise<number[] | null> {
    const deletedSessionIds =
      await this._userSessionRepository.tryDeleteSession({
        scope: "idle_session",
      });

    return deletedSessionIds;
  }

  /**
   * @public
   * @async
   * @function endExpiredSessions
   * @description Asynchronously ends/deletes all expired sessions in the
   * database.
   * @returns A `Promise` that resolves to an array of `number`s representing
   * the deleted session ids or `null` if the delete operation fails.
   */
  public async endExpiredSessions(): Promise<number[] | null> {
    const deletedSessionIds =
      await this._userSessionRepository.tryDeleteSession({
        scope: "expired_persistent",
      });

    return deletedSessionIds;
  }
}
