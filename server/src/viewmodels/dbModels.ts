import * as schema from '@models';

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