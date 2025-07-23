import { integer, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { User } from "./user.js";
import { Role } from "./role.js";

export const UserRole = sqliteTable(
  "user_roles",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => User.userId, { onDelete: "restrict" }),
    roleId: integer("role_id")
      .notNull()
      .references(() => Role.roleId, { onDelete: "restrict" }),
  },
  (table) => [primaryKey({ columns: [table.userId, table.roleId] })]
);
