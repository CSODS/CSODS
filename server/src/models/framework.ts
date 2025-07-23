import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { DevType } from "./devtype.js";

export const Framework = sqliteTable("Frameworks", {
  FrameworkId: integer("FrameworkId")
    .unique()
    .primaryKey({ autoIncrement: true }),
  FrameworkName: text("FrameworkName").unique(),
  DevTypeId: integer("DevTypeId").references(() => DevType.DevTypeId, {
    onDelete: "restrict",
  }),
});
