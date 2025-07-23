import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const DevType = sqliteTable("dev_types", {
  DevTypeId: integer("dev_type_id")
    .unique()
    .primaryKey({ autoIncrement: true }),
  DevTypeName: text("dev_type_name").unique(),
});
