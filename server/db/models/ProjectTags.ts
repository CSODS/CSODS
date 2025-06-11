import { integer, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { Projects } from "./Projects.js";
import { Tags } from "./Tags.js";
export const ProjectTags  = sqliteTable("ProjectTags", {
    ProjectId : integer('ProjectId')
        .notNull()
        .references(() => Projects.ProjectId , { onDelete :"cascade"}
    ),
    TagId : integer('TagId')
        .notNull()
        .references( () => Tags.TagId, { onDelete: 'cascade'}
    ),
}, (table) => ({
    pk: primaryKey({ columns: [table.ProjectId, table.TagId] })
}));