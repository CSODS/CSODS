import { integer, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { Projects } from "./project.js";
import { Frameworks } from "./framework.js";
export const ProjectFrameworks = sqliteTable(
  "ProjectFrameworks",
  {
    ProjectId: integer("ProjectId")
      .notNull()
      .references(() => Projects.ProjectId, { onDelete: "restrict" }),
    FrameworkId: integer("FrameworkId")
      .notNull()
      .references(() => Frameworks.FrameworkId, { onDelete: "restrict" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.ProjectId, table.FrameworkId] }),
  })
);
