PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_ProjectTags` (
	`ProjectId` integer NOT NULL,
	`TagId` integer NOT NULL,
	PRIMARY KEY(`ProjectId`, `TagId`),
	FOREIGN KEY (`ProjectId`) REFERENCES `Projects`(`ProjectId`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`TagId`) REFERENCES `Tags`(`TagId`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_ProjectTags`("ProjectId", "TagId") SELECT "ProjectId", "TagId" FROM `ProjectTags`;--> statement-breakpoint
DROP TABLE `ProjectTags`;--> statement-breakpoint
ALTER TABLE `__new_ProjectTags` RENAME TO `ProjectTags`;--> statement-breakpoint
PRAGMA foreign_keys=ON;