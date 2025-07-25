import * as schema from "@models";

export type ApplicationIndustryTable = typeof schema.ApplicationIndustry;
export type DatabaseTechnologyTable = typeof schema.DatabaseTechnology;
export type DevTypeTable = typeof schema.DevType;
export type FrameworkTable = typeof schema.Framework;
export type ProgrammingLanguageTable = typeof schema.ProgrammingLanguage;
export type ProjectFrameworksTable = typeof schema.ProjectFramework;
export type ProjectImagesTable = typeof schema.ProjectImage;
export type ProjectsTable = typeof schema.Project;

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
