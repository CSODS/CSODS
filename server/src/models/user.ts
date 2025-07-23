import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const User = sqliteTable("Users", {
  UserId: integer("UserId").unique().primaryKey({ autoIncrement: true }),

  Email: text("Email").unique().notNull(),

  Username: text("Username").unique().notNull(),

  StudentName: text("StudentName"),

  Password: text("Password").notNull(),

  StudentNumber: text("StudentNumber").unique(),

  UserIconUrl: text("UserIconImg"),
});
