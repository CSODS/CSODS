PRAGMA foreign_keys=ON; --> statement-breakpoint
CREATE TABLE `DevTypes` (
	`DevTypeId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`DevTypeName` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `DevTypes_DevTypeId_unique` ON `DevTypes` (`DevTypeId`);--> statement-breakpoint
CREATE UNIQUE INDEX `DevTypes_DevTypeName_unique` ON `DevTypes` (`DevTypeName`);--> statement-breakpoint
CREATE TABLE `ProjectImages` (
	`ImageId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ProjectId` integer,
	`ImageUrl` text,
	FOREIGN KEY (`ProjectId`) REFERENCES `Projects`(`ProjectId`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ProjectImages_ImageId_unique` ON `ProjectImages` (`ImageId`);--> statement-breakpoint
CREATE TABLE `ProjectTags` (
	`ProjectId` integer NOT NULL,
	`TagId` integer NOT NULL,
	PRIMARY KEY(`ProjectId`, `TagId`),
	FOREIGN KEY (`ProjectId`) REFERENCES `Projects`(`ProjectId`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`TagId`) REFERENCES `Tags`(`TagId`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE TABLE `Projects` (
	`ProjectId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ProjectNumber` text,
	`UserId` integer NOT NULL,
	`ProjectTitle` text,
	`DevTypeId` integer,
	`GitHubUrl` text,
	FOREIGN KEY (`UserId`) REFERENCES `Users`(`UserId`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`DevTypeId`) REFERENCES `DevTypes`(`DevTypeId`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Projects_ProjectId_unique` ON `Projects` (`ProjectId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Projects_ProjectNumber_unique` ON `Projects` (`ProjectNumber`);--> statement-breakpoint
CREATE TABLE `Roles` (
	`RoleId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`RoleName` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Roles_RoleId_unique` ON `Roles` (`RoleId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Roles_RoleName_unique` ON `Roles` (`RoleName`);--> statement-breakpoint
CREATE TABLE `Tags` (
	`TagId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`TagName` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Tags_TagId_unique` ON `Tags` (`TagId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Tags_TagName_unique` ON `Tags` (`TagName`);--> statement-breakpoint
CREATE TABLE `Users` (
	`UserId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Email` text NOT NULL,
	`Username` text NOT NULL,
	`Name` text NOT NULL,
	`Password` text NOT NULL,
	`RoleId` integer NOT NULL,
	`StudentNumber` text NOT NULL,
	`UserIconImg` text NOT NULL,
	FOREIGN KEY (`RoleId`) REFERENCES `Roles`(`RoleId`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Users_UserId_unique` ON `Users` (`UserId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Users_Email_unique` ON `Users` (`Email`);--> statement-breakpoint
CREATE UNIQUE INDEX `Users_Username_unique` ON `Users` (`Username`);--> statement-breakpoint
CREATE UNIQUE INDEX `Users_StudentNumber_unique` ON `Users` (`StudentNumber`);