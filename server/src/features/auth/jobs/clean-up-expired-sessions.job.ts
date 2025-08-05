import { JobsLogger } from "@/utils";
import { createUserSessionService } from "../services";

/**
 * @public
 * @async
 * @function cleanUpExpiredSessions
 * @description A job function for cleaning up expired sessions in the
 * database.
 */
export async function cleanUpExpiredSessions() {
  const userSessionService = await createUserSessionService();

  JobsLogger.info("[UserSession] Cleaning up expired sessions...");
  const deletedSessionIds = await userSessionService.endExpiredSessions();

  if (deletedSessionIds)
    JobsLogger.info(
      `[UserSession] Ended expired sessions: ${JSON.stringify(
        deletedSessionIds
      )}.`
    );
  else JobsLogger.error("[UserSession] Failed to end expired sessions.");
}
