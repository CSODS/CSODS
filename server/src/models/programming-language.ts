import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const ProgrammingLanguage = sqliteTable("programming_languages", {
  LanguageId: integer("language_id")
    .unique()
    .primaryKey({ autoIncrement: true }),
  LanguageName: text("language_name").unique(),
});
