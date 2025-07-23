import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const Role = sqliteTable("roles_", {
  RoleId: integer("role_id").unique().primaryKey({ autoIncrement: true }),
  RoleName: text("role_name").unique(),
});
