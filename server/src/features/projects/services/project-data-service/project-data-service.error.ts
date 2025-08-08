import { ErrorBase } from "@/error";

export type ErrorName =
  | "FETCH_ERROR"
  | "RETRIEVE_PROJECTS_ERROR"
  | "RESOLVE_PROJECTS_ERROR"
  | "LOAD_FROM_CACHE_ERROR"
  | "LOAD_BACKUP_ERROR"
  | "CREATE_NEW_CACHE_ERROR";

export class ProjectError extends ErrorBase<ErrorName> {}
