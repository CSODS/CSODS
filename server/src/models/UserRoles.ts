import { integer, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { Users } from "./Users";
import { Roles } from "./Roles.js";

export const UserRoles = sqliteTable(
    'UserRoles',
    {
        UserId : integer('UserId')
            .notNull()
            .references(() => Users.UserId, { onDelete : 'restrict' }
        ),
        RoleId : integer('RoleId')
            .notNull()
            .references(() => Roles.RoleId, { onDelete : 'restrict'}
        )
    },
    (table) => [primaryKey({ columns: [table.UserId, table.RoleId] })]
);