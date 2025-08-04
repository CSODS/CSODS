import { NewUserSession } from "../types";
import { UserSessionRepository } from "./repositories";

export class UserSessionService {
  private readonly _userSessionRepository: UserSessionRepository;

  public constructor(userSessionRepository: UserSessionRepository) {
    this._userSessionRepository = userSessionRepository;
  }

  public async startNewSession(sessionRequirements: {
    userId: number;
    refreshTokenHash: string;
    expiresAt?: Date;
  }) {
    const { userId, refreshTokenHash, expiresAt } = sessionRequirements;

    const now = new Date();
    const nowISO = now.toISOString();

    const newSession: NewUserSession = {
      userId,
      refreshTokenHash,
      createdAt: nowISO,
      lastUsedAt: nowISO,
      expiresAt: expiresAt?.toISOString(),
    };

    const newSessionId = await this._userSessionRepository.tryInsertSession(
      newSession
    );

    return newSessionId;
  }
}
