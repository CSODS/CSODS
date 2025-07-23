import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const DevType = sqliteTable("DevTypes", {
  DevTypeId: integer("DevTypeId").unique().primaryKey({ autoIncrement: true }),
  DevTypeName: text("DevTypeName").unique(),
});
