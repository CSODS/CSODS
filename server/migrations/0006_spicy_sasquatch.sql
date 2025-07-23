ALTER TABLE `ApplicationIndustry` RENAME TO `application_industries`;--> statement-breakpoint
ALTER TABLE `DatabaseTechnologies` RENAME TO `database_technologies`;--> statement-breakpoint
ALTER TABLE `DevTypes` RENAME TO `dev_types`;--> statement-breakpoint
ALTER TABLE `Frameworks` RENAME TO `frameworks_`;--> statement-breakpoint
ALTER TABLE `ProgrammingLanguages` RENAME TO `programming_languages`;--> statement-breakpoint
ALTER TABLE `Projects` RENAME TO `projects_`;--> statement-breakpoint
ALTER TABLE `ProjectFrameworks` RENAME TO `project_frameworks`;--> statement-breakpoint
ALTER TABLE `ProjectImages` RENAME TO `project_images`;--> statement-breakpoint
ALTER TABLE `Roles` RENAME TO `roles_`;--> statement-breakpoint
ALTER TABLE `Users` RENAME TO `users_`;--> statement-breakpoint
ALTER TABLE `UserRoles` RENAME TO `user_roles`;--> statement-breakpoint
ALTER TABLE `application_industries` RENAME COLUMN "IndustryId" TO "industry_id";--> statement-breakpoint
ALTER TABLE `application_industries` RENAME COLUMN "Industry" TO "industry";--> statement-breakpoint
ALTER TABLE `database_technologies` RENAME COLUMN "DatabaseId" TO "database_id";--> statement-breakpoint
ALTER TABLE `database_technologies` RENAME COLUMN "Database" TO "database";--> statement-breakpoint
ALTER TABLE `dev_types` RENAME COLUMN "DevTypeId" TO "dev_type_id";--> statement-breakpoint
ALTER TABLE `dev_types` RENAME COLUMN "DevTypeName" TO "dev_type_name";--> statement-breakpoint
ALTER TABLE `frameworks_` RENAME COLUMN "FrameworkId" TO "framework_id";--> statement-breakpoint
ALTER TABLE `frameworks_` RENAME COLUMN "FrameworkName" TO "framework_name";--> statement-breakpoint
ALTER TABLE `frameworks_` RENAME COLUMN "DevTypeId" TO "dev_type_id";--> statement-breakpoint
ALTER TABLE `programming_languages` RENAME COLUMN "LanguageId" TO "language_id";--> statement-breakpoint
ALTER TABLE `programming_languages` RENAME COLUMN "LanguageName" TO "language_name";--> statement-breakpoint
ALTER TABLE `projects_` RENAME COLUMN "ProjectId" TO "project_id";--> statement-breakpoint
ALTER TABLE `projects_` RENAME COLUMN "ProjectNumber" TO "project_number";--> statement-breakpoint
ALTER TABLE `projects_` RENAME COLUMN "UserId" TO "user_id";--> statement-breakpoint
ALTER TABLE `projects_` RENAME COLUMN "ProjectTitle" TO "project_title";--> statement-breakpoint
ALTER TABLE `projects_` RENAME COLUMN "ProjectTitleLower" TO "project_title_lower";--> statement-breakpoint
ALTER TABLE `projects_` RENAME COLUMN "DevTypeId" TO "dev_type_id";--> statement-breakpoint
ALTER TABLE `projects_` RENAME COLUMN "PrimaryLanguageId" TO "primary_language_id";--> statement-breakpoint
ALTER TABLE `projects_` RENAME COLUMN "SecondaryLanguageId" TO "secondary_language_id";--> statement-breakpoint
ALTER TABLE `projects_` RENAME COLUMN "DatabaseTechnologyId" TO "database_technology_id";--> statement-breakpoint
ALTER TABLE `projects_` RENAME COLUMN "ApplicationIndustryId" TO "application_industry_id";--> statement-breakpoint
ALTER TABLE `projects_` RENAME COLUMN "GitHubUrl" TO "github_url";--> statement-breakpoint
ALTER TABLE `project_frameworks` RENAME COLUMN "ProjectId" TO "project_id";--> statement-breakpoint
ALTER TABLE `project_frameworks` RENAME COLUMN "FrameworkId" TO "framework_id";--> statement-breakpoint
ALTER TABLE `project_images` RENAME COLUMN "ImageId" TO "image_id";--> statement-breakpoint
ALTER TABLE `project_images` RENAME COLUMN "ProjectId" TO "project_id";--> statement-breakpoint
ALTER TABLE `project_images` RENAME COLUMN "ImageUrl" TO "image_url";--> statement-breakpoint
ALTER TABLE `roles_` RENAME COLUMN "RoleId" TO "role_id";--> statement-breakpoint
ALTER TABLE `roles_` RENAME COLUMN "RoleName" TO "role_name";--> statement-breakpoint
ALTER TABLE `users_` RENAME COLUMN "UserId" TO "user_id";--> statement-breakpoint
ALTER TABLE `users_` RENAME COLUMN "Email" TO "email";--> statement-breakpoint
ALTER TABLE `users_` RENAME COLUMN "Username" TO "username";--> statement-breakpoint
ALTER TABLE `users_` RENAME COLUMN "StudentName" TO "student_name";--> statement-breakpoint
ALTER TABLE `users_` RENAME COLUMN "Password" TO "password";--> statement-breakpoint
ALTER TABLE `users_` RENAME COLUMN "StudentNumber" TO "student_number";--> statement-breakpoint
ALTER TABLE `users_` RENAME COLUMN "UserIconImg" TO "user_icon_url";--> statement-breakpoint
ALTER TABLE `user_roles` RENAME COLUMN "UserId" TO "user_id";--> statement-breakpoint
ALTER TABLE `user_roles` RENAME COLUMN "RoleId" TO "role_id";--> statement-breakpoint
DROP INDEX `ApplicationIndustry_IndustryId_unique`;--> statement-breakpoint
DROP INDEX `ApplicationIndustry_Industry_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `application_industries_industry_id_unique` ON `application_industries` (`industry_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `application_industries_industry_unique` ON `application_industries` (`industry`);--> statement-breakpoint
DROP INDEX `DatabaseTechnologies_DatabaseId_unique`;--> statement-breakpoint
DROP INDEX `DatabaseTechnologies_Database_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `database_technologies_database_id_unique` ON `database_technologies` (`database_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `database_technologies_database_unique` ON `database_technologies` (`database`);--> statement-breakpoint
DROP INDEX `DevTypes_DevTypeId_unique`;--> statement-breakpoint
DROP INDEX `DevTypes_DevTypeName_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `dev_types_dev_type_id_unique` ON `dev_types` (`dev_type_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `dev_types_dev_type_name_unique` ON `dev_types` (`dev_type_name`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_frameworks_` (
	`framework_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`framework_name` text,
	`dev_type_id` integer,
	FOREIGN KEY (`dev_type_id`) REFERENCES `dev_types`(`dev_type_id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
INSERT INTO `__new_frameworks_`("framework_id", "framework_name", "dev_type_id") SELECT "framework_id", "framework_name", "dev_type_id" FROM `frameworks_`;--> statement-breakpoint
DROP TABLE `frameworks_`;--> statement-breakpoint
ALTER TABLE `__new_frameworks_` RENAME TO `frameworks_`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `frameworks__framework_id_unique` ON `frameworks_` (`framework_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `frameworks__framework_name_unique` ON `frameworks_` (`framework_name`);--> statement-breakpoint
DROP INDEX `ProgrammingLanguages_LanguageId_unique`;--> statement-breakpoint
DROP INDEX `ProgrammingLanguages_LanguageName_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `programming_languages_language_id_unique` ON `programming_languages` (`language_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `programming_languages_language_name_unique` ON `programming_languages` (`language_name`);--> statement-breakpoint
CREATE TABLE `__new_projects_` (
	`project_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_number` text,
	`user_id` integer NOT NULL,
	`project_title` text,
	`project_title_lower` text,
	`dev_type_id` integer NOT NULL,
	`primary_language_id` integer NOT NULL,
	`secondary_language_id` integer,
	`database_technology_id` integer,
	`application_industry_id` integer,
	`github_url` text,
	FOREIGN KEY (`user_id`) REFERENCES `users_`(`user_id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`dev_type_id`) REFERENCES `dev_types`(`dev_type_id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`primary_language_id`) REFERENCES `programming_languages`(`language_id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`secondary_language_id`) REFERENCES `programming_languages`(`language_id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`database_technology_id`) REFERENCES `database_technologies`(`database_id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`application_industry_id`) REFERENCES `application_industries`(`industry_id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
INSERT INTO `__new_projects_`("project_id", "project_number", "user_id", "project_title", "project_title_lower", "dev_type_id", "primary_language_id", "secondary_language_id", "database_technology_id", "application_industry_id", "github_url") SELECT "project_id", "project_number", "user_id", "project_title", "project_title_lower", "dev_type_id", "primary_language_id", "secondary_language_id", "database_technology_id", "application_industry_id", "github_url" FROM `projects_`;--> statement-breakpoint
DROP TABLE `projects_`;--> statement-breakpoint
ALTER TABLE `__new_projects_` RENAME TO `projects_`;--> statement-breakpoint
CREATE UNIQUE INDEX `projects__project_id_unique` ON `projects_` (`project_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `projects__project_number_unique` ON `projects_` (`project_number`);--> statement-breakpoint
CREATE TABLE `__new_project_frameworks` (
	`project_id` integer NOT NULL,
	`framework_id` integer NOT NULL,
	PRIMARY KEY(`project_id`, `framework_id`),
	FOREIGN KEY (`project_id`) REFERENCES `projects_`(`project_id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`framework_id`) REFERENCES `frameworks_`(`framework_id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
INSERT INTO `__new_project_frameworks`("project_id", "framework_id") SELECT "project_id", "framework_id" FROM `project_frameworks`;--> statement-breakpoint
DROP TABLE `project_frameworks`;--> statement-breakpoint
ALTER TABLE `__new_project_frameworks` RENAME TO `project_frameworks`;--> statement-breakpoint
CREATE TABLE `__new_project_images` (
	`image_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer,
	`image_url` text,
	FOREIGN KEY (`project_id`) REFERENCES `projects_`(`project_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_project_images`("image_id", "project_id", "image_url") SELECT "image_id", "project_id", "image_url" FROM `project_images`;--> statement-breakpoint
DROP TABLE `project_images`;--> statement-breakpoint
ALTER TABLE `__new_project_images` RENAME TO `project_images`;--> statement-breakpoint
CREATE UNIQUE INDEX `project_images_image_id_unique` ON `project_images` (`image_id`);--> statement-breakpoint
DROP INDEX `Roles_RoleId_unique`;--> statement-breakpoint
DROP INDEX `Roles_RoleName_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `roles__role_id_unique` ON `roles_` (`role_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `roles__role_name_unique` ON `roles_` (`role_name`);--> statement-breakpoint
DROP INDEX `Users_UserId_unique`;--> statement-breakpoint
DROP INDEX `Users_Email_unique`;--> statement-breakpoint
DROP INDEX `Users_Username_unique`;--> statement-breakpoint
DROP INDEX `Users_StudentNumber_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `users__user_id_unique` ON `users_` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users__email_unique` ON `users_` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users__username_unique` ON `users_` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users__student_number_unique` ON `users_` (`student_number`);--> statement-breakpoint
CREATE TABLE `__new_user_roles` (
	`user_id` integer NOT NULL,
	`role_id` integer NOT NULL,
	PRIMARY KEY(`user_id`, `role_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users_`(`user_id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`role_id`) REFERENCES `roles_`(`role_id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
INSERT INTO `__new_user_roles`("user_id", "role_id") SELECT "user_id", "role_id" FROM `user_roles`;--> statement-breakpoint
DROP TABLE `user_roles`;--> statement-breakpoint
ALTER TABLE `__new_user_roles` RENAME TO `user_roles`;