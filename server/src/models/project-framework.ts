import { integer, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { Project } from "./project.js";
import { Framework } from "./framework.js";
export const ProjectFramework = sqliteTable(
  "project_frameworks",
  {
    ProjectId: integer("project_id")
      .notNull()
      .references(() => Project.ProjectId, { onDelete: "restrict" }),
    FrameworkId: integer("framework_id")
      .notNull()
      .references(() => Framework.FrameworkId, { onDelete: "restrict" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.ProjectId, table.FrameworkId] }),
  })
);
