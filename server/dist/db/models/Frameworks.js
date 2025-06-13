import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { DevTypes } from "./DevTypes.js";
export const Frameworks = sqliteTable('Frameworks', {
    FrameworkId: integer('FrameworkId').unique().primaryKey({ autoIncrement: true }),
    FrameworkName: text('FrameworkName').unique(),
    DevTypeId: integer('DevTypeId').references(() => DevTypes.DevTypeId, { onDelete: 'restrict' })
});
