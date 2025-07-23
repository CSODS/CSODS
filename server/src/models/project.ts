import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { User } from "./user.js";
import { DevType } from "./devtype.js";
import { ProgrammingLanguage } from "./programming-language.js";
import { DatabaseTechnology } from "./database-technology.js";
import { ApplicationIndustry } from "./application-industry.js";

export const Project = sqliteTable("projects_", {
  projectId: integer("project_id").primaryKey({ autoIncrement: true }).unique(),
  projectNumber: text("project_number").unique(),
  userId: integer("user_id")
    .notNull()
    .references(() => User.userId, { onDelete: "restrict" }),
  projectTitle: text("project_title"),
  projectTitleLower: text("project_title_lower"),
  devTypeId: integer("dev_type_id")
    .notNull()
    .references(() => DevType.devTypeId, { onDelete: "restrict" }),
  primaryLanguageId: integer("primary_language_id")
    .notNull()
    .references(() => ProgrammingLanguage.languageId, {
      onDelete: "restrict",
    }),
  secondaryLanguageId: integer("secondary_language_id").references(
    () => ProgrammingLanguage.languageId,
    { onDelete: "restrict" }
  ),
  databaseTechnologyId: integer("database_technology_id").references(
    () => DatabaseTechnology.databaseId,
    { onDelete: "restrict" }
  ),
  applicationIndustryId: integer("application_industry_id").references(
    () => ApplicationIndustry.industryId,
    { onDelete: "restrict" }
  ),
  gitHubUrl: text("github_url"),
});
