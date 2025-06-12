PRAGMA foreign_keys=ON; --> statement-breakpoint
CREATE TABLE `ApplicationIndustry` (
	`IndustryId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Industry` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ApplicationIndustry_IndustryId_unique` ON `ApplicationIndustry` (`IndustryId`);--> statement-breakpoint
CREATE UNIQUE INDEX `ApplicationIndustry_Industry_unique` ON `ApplicationIndustry` (`Industry`);--> statement-breakpoint
CREATE TABLE `DatabaseTechnologies` (
	`DatabaseId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Database` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `DatabaseTechnologies_DatabaseId_unique` ON `DatabaseTechnologies` (`DatabaseId`);--> statement-breakpoint
CREATE UNIQUE INDEX `DatabaseTechnologies_Database_unique` ON `DatabaseTechnologies` (`Database`);--> statement-breakpoint
CREATE TABLE `DevTypes` (
	`DevTypeId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`DevTypeName` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `DevTypes_DevTypeId_unique` ON `DevTypes` (`DevTypeId`);--> statement-breakpoint
CREATE UNIQUE INDEX `DevTypes_DevTypeName_unique` ON `DevTypes` (`DevTypeName`);--> statement-breakpoint
CREATE TABLE `Frameworks` (
	`FrameworkId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`FrameworkName` text,
	`DevTypeId` integer,
	FOREIGN KEY (`DevTypeId`) REFERENCES `DevTypes`(`DevTypeId`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Frameworks_FrameworkId_unique` ON `Frameworks` (`FrameworkId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Frameworks_FrameworkName_unique` ON `Frameworks` (`FrameworkName`);--> statement-breakpoint
CREATE TABLE `ProgrammingLanguages` (
	`LanguageId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`LanguageName` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ProgrammingLanguages_LanguageId_unique` ON `ProgrammingLanguages` (`LanguageId`);--> statement-breakpoint
CREATE UNIQUE INDEX `ProgrammingLanguages_LanguageName_unique` ON `ProgrammingLanguages` (`LanguageName`);--> statement-breakpoint
CREATE TABLE `ProjectFrameworks` (
	`ProjectId` integer NOT NULL,
	`FrameworkId` integer NOT NULL,
	PRIMARY KEY(`ProjectId`, `FrameworkId`),
	FOREIGN KEY (`ProjectId`) REFERENCES `Projects`(`ProjectId`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`FrameworkId`) REFERENCES `Frameworks`(`FrameworkId`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE TABLE `ProjectImages` (
	`ImageId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ProjectId` integer,
	`ImageUrl` text,
	FOREIGN KEY (`ProjectId`) REFERENCES `Projects`(`ProjectId`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ProjectImages_ImageId_unique` ON `ProjectImages` (`ImageId`);--> statement-breakpoint
CREATE TABLE `Projects` (
	`ProjectId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ProjectNumber` text,
	`UserId` integer NOT NULL,
	`ProjectTitle` text,
	`DevTypeId` integer NOT NULL,
	`PrimaryLanguageId` integer NOT NULL,
	`SecondaryLanguageId` integer,
	`DatabaseTechnologyId` integer,
	`ApplicationIndustryId` integer,
	`GitHubUrl` text,
	FOREIGN KEY (`UserId`) REFERENCES `Users`(`UserId`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`DevTypeId`) REFERENCES `DevTypes`(`DevTypeId`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`PrimaryLanguageId`) REFERENCES `ProgrammingLanguages`(`LanguageId`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`SecondaryLanguageId`) REFERENCES `ProgrammingLanguages`(`LanguageId`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`DatabaseTechnologyId`) REFERENCES `DatabaseTechnologies`(`DatabaseId`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`ApplicationIndustryId`) REFERENCES `ApplicationIndustry`(`IndustryId`) ON UPDATE no action ON DELETE restrict
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