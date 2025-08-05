import { JobsLogger } from "@/utils";
import { createUserSessionService } from "../services";

/**
 * @public
 * @async
 * @function cleanUpIdleSessions
 * @description A job function for cleaning up idle sessions in the
 * database.
 */
export async function cleanUpIdleSessions() {
  const userSessionService = await createUserSessionService();

  JobsLogger.info("[UserSession] Cleaning up idle sessions...");
  const deletedSessionIds = await userSessionService.endIdleSessions();

  if (deletedSessionIds)
    JobsLogger.info(
      `[UserSession] Ended idle sessions: ${JSON.stringify(deletedSessionIds)}.`
    );
  else JobsLogger.error("[UserSession] Failed to end idle sessions.");
}
