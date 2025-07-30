import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const ProgrammingLanguage = sqliteTable("programming_languages", {
  languageId: integer("language_id")
    .unique()
    .primaryKey({ autoIncrement: true }),
  languageName: text("language_name").unique(),
});
