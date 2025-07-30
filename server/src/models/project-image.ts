import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { Project } from "./project.js";

export const ProjectImage = sqliteTable("project_images", {
  imageId: integer("image_id").unique().primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").references(() => Project.projectId, {
    onDelete: "cascade",
  }),
  imageUrl: text("image_url"),
});
