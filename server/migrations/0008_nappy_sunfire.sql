CREATE TABLE `refresh_tokens` (
	`token_id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`refresh_token_hash` integer NOT NULL,
	`created_at` text,
	`expires_at` text,
	`last_used_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users_`(`user_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `token_hash_idx` ON `refresh_tokens` (`refresh_token_hash`);--> statement-breakpoint
CREATE INDEX `persistent_clean_up_idx` ON `refresh_tokens` (`expires_at`);--> statement-breakpoint
CREATE INDEX `session_clean_up_idx` ON `refresh_tokens` (`expires_at`,`last_used_at`) WHERE "refresh_tokens"."expires_at" is null;