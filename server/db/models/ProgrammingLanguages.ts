import { integer, text, sqliteTable} from "drizzle-orm/sqlite-core";

export const ProgrammingLanguages = sqliteTable('ProgrammingLanguages', {
    LanguageId : integer('LanguageId').unique().primaryKey({autoIncrement: true}),
    LanguageName : text('LanguageName').unique()
});