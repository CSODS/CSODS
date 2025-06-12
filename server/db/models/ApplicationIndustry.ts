import { integer, text, sqliteTable} from "drizzle-orm/sqlite-core";

export const ApplicationIndustry = sqliteTable('ApplicationIndustry', {
    IndustryId : integer('IndustryId').unique().primaryKey({autoIncrement: true}),
    Industry: text('Industry').unique()
});