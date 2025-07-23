import { integer, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { User } from "./user.js";
import { Role } from "./role.js";

export const UserRole = sqliteTable(
  "user_roles",
  {
    UserId: integer("user_id")
      .notNull()
      .references(() => User.UserId, { onDelete: "restrict" }),
    RoleId: integer("role_id")
      .notNull()
      .references(() => Role.RoleId, { onDelete: "restrict" }),
  },
  (table) => [primaryKey({ columns: [table.UserId, table.RoleId] })]
);
