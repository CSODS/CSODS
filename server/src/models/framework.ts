import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { DevType } from "./devtype.js";

export const Framework = sqliteTable("frameworks_", {
  frameworkId: integer("framework_id")
    .unique()
    .primaryKey({ autoIncrement: true }),
  frameworkName: text("framework_name").unique(),
  devTypeId: integer("dev_type_id").references(() => DevType.devTypeId, {
    onDelete: "restrict",
  }),
});
