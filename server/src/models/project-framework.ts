import { integer, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { Project } from "./project.js";
import { Framework } from "./framework.js";
export const ProjectFramework = sqliteTable(
  "project_frameworks",
  {
    projectId: integer("project_id")
      .notNull()
      .references(() => Project.projectId, { onDelete: "restrict" }),
    frameworkId: integer("framework_id")
      .notNull()
      .references(() => Framework.frameworkId, { onDelete: "restrict" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.projectId, table.frameworkId] }),
  })
);
