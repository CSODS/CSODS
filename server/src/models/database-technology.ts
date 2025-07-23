import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const DatabaseTechnology = sqliteTable("database_technologies", {
  DatabaseId: integer("database_id")
    .unique()
    .primaryKey({ autoIncrement: true }),
  Database: text("database").unique(),
});
