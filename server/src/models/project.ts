import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { User } from "./user.js";
import { DevType } from "./devtype.js";
import { ProgrammingLanguage } from "./programming-language.js";
import { DatabaseTechnology } from "./database-technology.js";
import { ApplicationIndustry } from "./application-industry.js";

export const Project = sqliteTable("Projects", {
  ProjectId: integer("ProjectId").primaryKey({ autoIncrement: true }).unique(),
  ProjectNumber: text("ProjectNumber").unique(),
  UserId: integer("UserId")
    .notNull()
    .references(() => User.UserId, { onDelete: "restrict" }),
  ProjectTitle: text("ProjectTitle"),
  ProjectTitleLower: text("ProjectTitleLower"),
  DevTypeId: integer("DevTypeId")
    .notNull()
    .references(() => DevType.DevTypeId, { onDelete: "restrict" }),
  PrimaryLanguageId: integer("PrimaryLanguageId")
    .notNull()
    .references(() => ProgrammingLanguage.LanguageId, {
      onDelete: "restrict",
    }),
  SecondaryLanguageId: integer("SecondaryLanguageId").references(
    () => ProgrammingLanguage.LanguageId,
    { onDelete: "restrict" }
  ),
  DatabaseTechnologyId: integer("DatabaseTechnologyId").references(
    () => DatabaseTechnology.DatabaseId,
    { onDelete: "restrict" }
  ),
  ApplicationIndustryId: integer("ApplicationIndustryId").references(
    () => ApplicationIndustry.IndustryId,
    { onDelete: "restrict" }
  ),
  GitHubUrl: text("GitHubUrl"),
});
