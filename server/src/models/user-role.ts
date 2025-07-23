import { integer, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { User } from "./user.js";
import { Role } from "./role.js";

export const UserRole = sqliteTable(
  "UserRoles",
  {
    UserId: integer("UserId")
      .notNull()
      .references(() => User.UserId, { onDelete: "restrict" }),
    RoleId: integer("RoleId")
      .notNull()
      .references(() => Role.RoleId, { onDelete: "restrict" }),
  },
  (table) => [primaryKey({ columns: [table.UserId, table.RoleId] })]
);
