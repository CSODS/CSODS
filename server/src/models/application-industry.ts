import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const ApplicationIndustry = sqliteTable("application_industries", {
  industryId: integer("industry_id")
    .unique()
    .primaryKey({ autoIncrement: true }),
  industry: text("industry").unique(),
});
