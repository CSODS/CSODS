import * as schema from "@models";

// table types
export type ApplicationIndustryTable = typeof schema.ApplicationIndustry;
export type DatabaseTechnologyTable = typeof schema.DatabaseTechnology;
export type DevTypeTable = typeof schema.DevType;
export type FrameworkTable = typeof schema.Framework;
export type ProgrammingLanguageTable = typeof schema.ProgrammingLanguage;
export type ProjectFrameworksTable = typeof schema.ProjectFramework;
export type ProjectImagesTable = typeof schema.ProjectImage;
export type ProjectsTable = typeof schema.Project;
export type RolesTable = typeof schema.Role;
export type UsersTable = typeof schema.User;
export type UserRolesTable = typeof schema.UserRole;

// infer select
export type ApplicationIndustryViewModel =
  typeof schema.ApplicationIndustry.$inferSelect;
export type DatabaseTechnologyViewModel =
  typeof schema.DatabaseTechnology.$inferSelect;
export type DevTypeViewModel = typeof schema.DevType.$inferSelect;
export type FrameworkViewModel = typeof schema.Framework.$inferSelect;
export type ProgrammingLanguageViewModel =
  typeof schema.ProgrammingLanguage.$inferSelect;
export type ProjectFrameworkViewModel =
  typeof schema.ProjectFramework.$inferSelect;
export type ProjectImageViewModel = typeof schema.ProjectImage.$inferSelect;
export type ProjectViewModel = typeof schema.Project.$inferSelect;
export type RoleViewModel = typeof schema.Role.$inferSelect;
export type UserViewModel = typeof schema.User.$inferSelect;
export type UserRoleViewModel = typeof schema.UserRole.$inferSelect;

// infer insert
export type NewUser = typeof schema.User.$inferInsert;
