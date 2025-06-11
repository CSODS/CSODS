import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { Projects } from "./Projects.js";
export const ProjectImages = sqliteTable('ProjectImages', {
    ImageId: integer('ImageId').unique().primaryKey({ autoIncrement: true }),
    ProjectId: integer('ProjectId').references(() => Projects.ProjectId, { onDelete: 'cascade' }),
    ImageUrl: text('ImageUrl')
});
