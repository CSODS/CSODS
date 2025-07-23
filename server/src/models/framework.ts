import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { DevType } from "./devtype.js";

export const Framework = sqliteTable("frameworks_", {
  FrameworkId: integer("framework_id")
    .unique()
    .primaryKey({ autoIncrement: true }),
  FrameworkName: text("framework_name").unique(),
  DevTypeId: integer("dev_type_id").references(() => DevType.DevTypeId, {
    onDelete: "restrict",
  }),
});
