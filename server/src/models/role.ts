import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const Role = sqliteTable("Roles", {
  RoleId: integer("RoleId").unique().primaryKey({ autoIncrement: true }),
  RoleName: text("RoleName").unique(),
});
