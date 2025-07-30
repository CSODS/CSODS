import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const Role = sqliteTable("roles_", {
  roleId: integer("role_id").unique().primaryKey({ autoIncrement: true }),
  roleName: text("role_name").unique(),
});
