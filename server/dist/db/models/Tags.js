import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
export const Tags = sqliteTable("Tags", {
    TagId: integer("TagId").unique().primaryKey({ autoIncrement: true }).unique(),
    TagName: text("TagName").unique()
});
