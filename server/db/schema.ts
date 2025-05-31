import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const Projects = sqliteTable("Projects", {
  ProjectId: integer("ProjectId").primaryKey({autoIncrement: true}),
  ProjectNumber: text("ProjectNumber").notNull(),
  ProjectName: text("ProjectName").notNull(),
  ProjectOwner: text("ProjectOwner").notNull(),
  ProjectDescription: text("ProjectDescription").notNull(),
  ProjectUrl: text("ProjectUrl").notNull()
});