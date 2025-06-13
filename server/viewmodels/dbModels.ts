import * as schema from '../db/schema.js';
import { InferSelectModel } from 'drizzle-orm';
import { createContext } from '../db/csods.js';

export type DbContext = Awaited<ReturnType<typeof createContext>>;
export type User = InferSelectModel<typeof schema.Users>;
export type Project = InferSelectModel<typeof schema.Projects>;
export type DevType = InferSelectModel<typeof schema.DevTypes>;
export type ProgrammingLanguage = InferSelectModel<typeof schema.ProgrammingLanguages>;
export type DatabaseTechnology = InferSelectModel<typeof schema.DatabaseTechnologies>;
export type Framework = InferSelectModel<typeof schema.Frameworks>;
export type ApplicationIndustry = InferSelectModel<typeof schema.ApplicationIndustry>;
export type ProjectFramework = InferSelectModel<typeof schema.ProjectFrameworks>;
