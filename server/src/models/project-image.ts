import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { Project } from "./project.js";

export const ProjectImage = sqliteTable("ProjectImages", {
  ImageId: integer("ImageId").unique().primaryKey({ autoIncrement: true }),
  ProjectId: integer("ProjectId").references(() => Project.ProjectId, {
    onDelete: "cascade",
  }),
  ImageUrl: text("ImageUrl"),
});
