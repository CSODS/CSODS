import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { Users } from "./users.js";
import { DevTypes } from "./DevTypes.js";
export const Projects = sqliteTable("Projects", {
    ProjectId: integer('ProjectId').primaryKey({ autoIncrement: true }).unique(),
    ProjectNumber: text('ProjectNumber').unique(),
    UserId: integer('UserId').references(() => Users.UserId, { onDelete: 'restrict' }).notNull(),
    ProjectTitle: text('ProjectTitle'),
    DevTypeId: integer('DevTypeId').references(() => DevTypes.DevTypeId, { onDelete: 'restrict' }),
    GitHubUrl: text('GitHubUrl')
});
