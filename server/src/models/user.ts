import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const User = sqliteTable("users_", {
  userId: integer("user_id").unique().primaryKey({ autoIncrement: true }),

  email: text("email").unique().notNull(),

  username: text("username").unique().notNull(),

  studentName: text("student_name"),

  password: text("password").notNull(),

  studentNumber: text("student_number").unique(),

  userIconUrl: text("user_icon_url"),

  refreshToken: text("refresh_token"),
});
