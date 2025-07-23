import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const ApplicationIndustry = sqliteTable("application_industries", {
  IndustryId: integer("industry_id")
    .unique()
    .primaryKey({ autoIncrement: true }),
  Industry: text("industry").unique(),
});
