import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { Roles } from "./Roles.js";

export const Users = sqliteTable("Users", {
  UserId: integer("UserId").unique().primaryKey({autoIncrement: true}),
  Email: text("Email").unique().notNull(),
  Username: text("Username").unique().notNull(),
  StudentName: text("StudentName").notNull(),
  Password: text("Password").notNull(),
  RoleId: integer("RoleId").references(()=> Roles.RoleId, {onDelete: 'restrict'} ).notNull(),   
  StudentNumber : text("StudentNumber").unique().notNull(),
  UserIconUrl : text('UserIconImg').notNull()
});

