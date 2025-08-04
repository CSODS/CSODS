import { createContext } from "@/db/csods";
import { NewUserSession } from "../types";
import { UserSessionRepository } from "./repositories";
import { HashService } from "@/utils";

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
   * @async
   * @function tryStartNewSession
   * @description Asynchronously attempts to start a new session for the user with
   * the provided `userId` and `refreshToken`. Optionally sets an expiry date for the
   * session with the `expiresAt` field.
   * @param sessionData Contains the following fields:
   * - `userId` - The user linked to the new session.
   * - `refreshToken` - The refresh token that will be hashed and stored to the database.
   * - `expiresAt` - An optional field specifying the expiry `Date` of the session.
   * Setting it will cause the session to be persistent.
   * @returns A `Promise` that resolves to the id of the new created session or `null`
   * if if the session creation fails.
   */
  public async tryStartNewSession(sessionData: {
    userId: number;
    refreshToken: string;
    expiresAt?: Date;
  }): Promise<number | null> {
    const { userId, refreshToken, expiresAt } = sessionData;

    const refreshTokenHash = HashService.hashToken(refreshToken);

    const now = new Date();
    const nowISO = now.toISOString();

    const newSession: NewUserSession = {
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
   * @param data Contains the following fields:
   * - `sessionId` - The `id` of the `session` that will be updated. Only used for logging,
   * not validation.
   * - `userId` - The `id` of the `user` whose `session` will be updated. Only used for
   * logging, not validation.
   * - `oldToken` - The token that will be rotated out. Its hash will be the primary means
   * of validation.
   * - `newToken` - The token that will replace the old token.
   * @returns A `Promise` that resolves to the id of the updated session, or `null` if the
   * session update fails.
   */
  public async tryUpdateSession(data: {
    sessionId: number;
    userId: number;
    oldToken: string;
    newToken: string;
  }): Promise<number | null> {
    const { sessionId, userId, oldToken, newToken } = data;

    const updatedSessionId =
      await this._userSessionRepository.tryUpdateSessionToken({
        sessionId,
        userId,
        oldTokenHash: HashService.hashToken(oldToken),
        newTokenHash: HashService.hashToken(newToken),
      });

    return updatedSessionId;
  }

  /**
   * @public
   * @async
   * @function tryEndSession
   * @description Asynchronously attempts to end a session with the specified `sessionId`.
   * @param sessionId The `id` of the session that will be deleted.
   * @returns A `Promise` resolving to the `id` of the deleted session, or `null` if the
   * operation fails.
   */
  public async tryEndSession(sessionId: number): Promise<number | null> {
    const deletedSessionId =
      (
        await this._userSessionRepository.tryDeleteSession({
          scope: "user_session",
          sessionId,
        })
      )?.[0] ?? null;

    return deletedSessionId;
  }
}
