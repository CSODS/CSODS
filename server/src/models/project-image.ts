import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { Project } from "./project.js";

export const ProjectImage = sqliteTable("project_images", {
  ImageId: integer("image_id").unique().primaryKey({ autoIncrement: true }),
  ProjectId: integer("project_id").references(() => Project.ProjectId, {
    onDelete: "cascade",
  }),
  ImageUrl: text("image_url"),
});
