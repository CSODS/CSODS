import * as schema from "@models";

export type RolesTable = typeof schema.Role;
export type UsersTable = typeof schema.User;
export type UserRolesTable = typeof schema.UserRole;

export type RoleViewModel = typeof schema.Role.$inferSelect;
export type UserViewModel = typeof schema.User.$inferSelect;
export type UserRoleViewModel = typeof schema.UserRole.$inferSelect;

export type NewUser = typeof schema.User.$inferInsert;
