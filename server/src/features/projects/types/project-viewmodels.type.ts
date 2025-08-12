import * as schema from "@models";

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
