import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { Users } from "./users.js";
import { DevTypes } from "./DevTypes.js";
import { ProgrammingLanguages } from "./ProgrammingLanguages.js";
import { DatabaseTechnologies } from "./DatabaseTechnologies.js";
import { ApplicationIndustry } from "./ApplicationIndustry.js";

export const Projects  = sqliteTable("Projects", {
    ProjectId : integer('ProjectId').primaryKey({autoIncrement: true}).unique(),
    ProjectNumber : text('ProjectNumber').unique(),
    UserId : integer('UserId')
        .notNull()
        .references(() => Users.UserId, {onDelete: 'restrict'}
    ),
    ProjectTitle : text('ProjectTitle'),
    ProjectTitleLower : text('ProjectTitleLower'),
    DevTypeId : integer('DevTypeId')
        .notNull()
        .references(() => DevTypes.DevTypeId, {onDelete: 'restrict'}
    ),
    PrimaryLanguageId : integer('PrimaryLanguageId')
        .notNull()
        .references(() => ProgrammingLanguages.LanguageId, { onDelete :"restrict"}
    ),
    SecondaryLanguageId : integer('SecondaryLanguageId')
        .references(() => ProgrammingLanguages.LanguageId, { onDelete :"restrict"}
    ),
    DatabaseTechnologyId : integer('DatabaseTechnologyId')
        .references(() => DatabaseTechnologies.DatabaseId, { onDelete :"restrict"}
    ),
    ApplicationIndustryId : integer('ApplicationIndustryId')
        .references(() => ApplicationIndustry.IndustryId, { onDelete :"restrict"}
    ),
    GitHubUrl : text('GitHubUrl')
    
})