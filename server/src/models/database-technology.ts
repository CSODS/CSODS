import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const DatabaseTechnology = sqliteTable("database_technologies", {
  databaseId: integer("database_id")
    .unique()
    .primaryKey({ autoIncrement: true }),
  database: text("database").unique(),
});
