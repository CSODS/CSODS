PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_Users` (
	`UserId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Email` text NOT NULL,
	`Username` text NOT NULL,
	`StudentName` text NOT NULL,
	`Password` text NOT NULL,
	`StudentNumber` text NOT NULL,
	`UserIconImg` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_Users`("UserId", "Email", "Username", "StudentName", "Password", "StudentNumber", "UserIconImg") SELECT "UserId", "Email", "Username", "StudentName", "Password", "StudentNumber", "UserIconImg" FROM `Users`;--> statement-breakpoint
DROP TABLE `Users`;--> statement-breakpoint
ALTER TABLE `__new_Users` RENAME TO `Users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `Users_UserId_unique` ON `Users` (`UserId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Users_Email_unique` ON `Users` (`Email`);--> statement-breakpoint
CREATE UNIQUE INDEX `Users_Username_unique` ON `Users` (`Username`);--> statement-breakpoint
CREATE UNIQUE INDEX `Users_StudentNumber_unique` ON `Users` (`StudentNumber`);