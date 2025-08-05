DROP INDEX `token_hash_idx`;--> statement-breakpoint
DROP INDEX `persistent_clean_up_idx`;--> statement-breakpoint
DROP INDEX `session_clean_up_idx`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_sessions_refresh_token_hash_uidx` ON `user_sessions` (`refresh_token_hash`);--> statement-breakpoint
CREATE INDEX `user_sessions_persistent_clean_up_idx` ON `user_sessions` (`expires_at`);--> statement-breakpoint
CREATE INDEX `user_sessions_session_clean_up_idx` ON `user_sessions` (`expires_at`,`last_used_at`) WHERE "user_sessions"."expires_at" is null;