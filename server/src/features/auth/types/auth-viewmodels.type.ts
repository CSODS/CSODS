import * as schema from "@models";

export type UserSessionsTable = typeof schema.UserSession;
export type RolesTable = typeof schema.Role;
export type UsersTable = typeof schema.User;
export type UserRolesTable = typeof schema.UserRole;

export type UserSessionViewModel = typeof schema.UserSession.$inferSelect;
export type RoleViewModel = typeof schema.Role.$inferSelect;
export type UserViewModel = typeof schema.User.$inferSelect;
export type UserRoleViewModel = typeof schema.UserRole.$inferSelect;

export type NewUserSession = typeof schema.UserSession.$inferInsert;
export type NewUser = typeof schema.User.$inferInsert;
