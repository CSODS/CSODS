import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const User = sqliteTable("users_", {
  UserId: integer("user_id").unique().primaryKey({ autoIncrement: true }),

  Email: text("email").unique().notNull(),

  Username: text("username").unique().notNull(),

  StudentName: text("student_name"),

  Password: text("password").notNull(),

  StudentNumber: text("student_number").unique(),

  UserIconUrl: text("user_icon_url"),
});
