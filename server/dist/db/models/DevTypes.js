import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
export const DevTypes = sqliteTable('DevTypes', {
    DevTypeId: integer('DevTypeId').unique().primaryKey({ autoIncrement: true }),
    DevTypeName: integer('DevTypeName').unique()
});
