import * as schema from '@models';

// table types
export type ApplicationIndustryTable = typeof schema.ApplicationIndustry;
export type DatabaseTechnologyTable = typeof schema.DatabaseTechnologies;
export type DevTypeTable = typeof schema.DevTypes;
export type FrameworkTable = typeof schema.Frameworks;
export type ProgrammingLanguageTable = typeof schema.ProgrammingLanguages;
export type ProjectFrameworksTable = typeof schema.ProjectFrameworks;
export type ProjectImagesTable = typeof schema.ProjectImages;
export type ProjectsTable = typeof schema.Projects;
export type RolesTable = typeof schema.Roles;
export type UsersTable = typeof schema.Users;
export type UserRolesTable = typeof schema.UserRoles;

// infer select
export type ApplicationIndustryViewModel = typeof schema.ApplicationIndustry.$inferSelect;
export type DatabaseTechnologyViewModel = typeof schema.DatabaseTechnologies.$inferSelect;
export type DevTypeViewModel = typeof schema.DevTypes.$inferSelect;
export type FrameworkViewModel = typeof schema.Frameworks.$inferSelect
export type ProgrammingLanguageViewModel = typeof schema.ProgrammingLanguages.$inferSelect;
export type ProjectFrameworkViewModel = typeof schema.ProjectFrameworks.$inferSelect;
export type ProjectImageViewModel = typeof schema.ProjectImages.$inferSelect;
export type ProjectViewModel = typeof schema.Projects.$inferSelect;
export type RoleViewModel = typeof schema.Roles.$inferSelect;
export type UserViewModel = typeof schema.Users.$inferSelect;
export type UserRoleViewModel = typeof schema.UserRoles.$inferSelect;