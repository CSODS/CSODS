CREATE TABLE `UserRoles` (
	`UserId` integer NOT NULL,
	`RoleId` integer NOT NULL,
	PRIMARY KEY(`UserId`, `RoleId`),
	FOREIGN KEY (`UserId`) REFERENCES `Users`(`UserId`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`RoleId`) REFERENCES `Roles`(`RoleId`) ON UPDATE no action ON DELETE restrict
);
