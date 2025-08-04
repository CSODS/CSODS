PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_sessions` (
	`session_id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`refresh_token_hash` text NOT NULL,
	`created_at` text,
	`expires_at` text,
	`last_used_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users_`(`user_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_user_sessions`("session_id", "user_id", "refresh_token_hash", "created_at", "expires_at", "last_used_at") SELECT "session_id", "user_id", "refresh_token_hash", "created_at", "expires_at", "last_used_at" FROM `user_sessions`;--> statement-breakpoint
DROP TABLE `user_sessions`;--> statement-breakpoint
ALTER TABLE `__new_user_sessions` RENAME TO `user_sessions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `token_hash_idx` ON `user_sessions` (`refresh_token_hash`);--> statement-breakpoint
CREATE INDEX `persistent_clean_up_idx` ON `user_sessions` (`expires_at`);--> statement-breakpoint
CREATE INDEX `session_clean_up_idx` ON `user_sessions` (`expires_at`,`last_used_at`) WHERE "user_sessions"."expires_at" is null;