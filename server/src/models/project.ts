import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { User } from "./user.js";
import { DevType } from "./devtype.js";
import { ProgrammingLanguage } from "./programming-language.js";
import { DatabaseTechnology } from "./database-technology.js";
import { ApplicationIndustry } from "./application-industry.js";

export const Project = sqliteTable("projects_", {
  ProjectId: integer("project_id").primaryKey({ autoIncrement: true }).unique(),
  ProjectNumber: text("project_number").unique(),
  UserId: integer("user_id")
    .notNull()
    .references(() => User.UserId, { onDelete: "restrict" }),
  ProjectTitle: text("project_title"),
  ProjectTitleLower: text("project_title_lower"),
  DevTypeId: integer("dev_type_id")
    .notNull()
    .references(() => DevType.DevTypeId, { onDelete: "restrict" }),
  PrimaryLanguageId: integer("primary_language_id")
    .notNull()
    .references(() => ProgrammingLanguage.LanguageId, {
      onDelete: "restrict",
    }),
  SecondaryLanguageId: integer("secondary_language_id").references(
    () => ProgrammingLanguage.LanguageId,
    { onDelete: "restrict" }
  ),
  DatabaseTechnologyId: integer("database_technology_id").references(
    () => DatabaseTechnology.DatabaseId,
    { onDelete: "restrict" }
  ),
  ApplicationIndustryId: integer("application_industry_id").references(
    () => ApplicationIndustry.IndustryId,
    { onDelete: "restrict" }
  ),
  GitHubUrl: text("github_url"),
});
