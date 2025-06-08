import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { Projects } from "./Projects";
import { Tags } from "./Tags";
export const ProjectTags  = sqliteTable("ProjectTags", {
    ProjectId : integer('ProjectId').references(() => Projects.ProjectId , {
        onDelete :"cascade"
    }),
    TagId : integer('TagId').unique().references( () => Tags.TagId, {
        onDelete: 'cascade'
    }),
});