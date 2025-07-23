import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const DatabaseTechnologies = sqliteTable("DatabaseTechnologies", {
  DatabaseId: integer("DatabaseId")
    .unique()
    .primaryKey({ autoIncrement: true }),
  Database: text("Database").unique(),
});
