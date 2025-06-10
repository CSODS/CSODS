import * as schema from '../db/schema.js';
import { InferSelectModel } from 'drizzle-orm';
import { createContext } from '../db/csods.js';

export type DbContext = Awaited<ReturnType<typeof createContext>>;
export type Project = InferSelectModel<typeof schema.Projects>;
