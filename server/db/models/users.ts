import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { Roles } from "./roles";

export const Users = sqliteTable("Users", {
  UserId: integer("UserId").unique().primaryKey({autoIncrement: true}),
  Email: text("Email").unique().notNull(),
  Username: text("Username").unique().notNull(),
  Name: text("Name").notNull(),
  Password: text("Password").notNull(),
  RoleId: text("RoleId").references(()=> Roles.RoleId, {onDelete: 'cascade'} ).notNull(),   
  StudentNumber : text("StudentNumber").unique().notNull(),
  UserIconUrl : text('UserIconImg').notNull()
});

