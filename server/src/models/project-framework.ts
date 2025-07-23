import { integer, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { Project } from "./project.js";
import { Framework } from "./framework.js";
export const ProjectFramework = sqliteTable(
  "ProjectFrameworks",
  {
    ProjectId: integer("ProjectId")
      .notNull()
      .references(() => Project.ProjectId, { onDelete: "restrict" }),
    FrameworkId: integer("FrameworkId")
      .notNull()
      .references(() => Framework.FrameworkId, { onDelete: "restrict" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.ProjectId, table.FrameworkId] }),
  })
);
