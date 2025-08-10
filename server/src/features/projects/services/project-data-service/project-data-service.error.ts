import { ErrorBase } from "@/error";
import { ProjectCacheError } from "../../errors";

export type ErrorName =
  | "EXCEEDED_MAX_FETCH_RETRIES_ERROR"
  | "EMPTY_PROJECTS_TABLE_ERROR"
  | "DB_FETCH_ERROR"
  | "RETRIEVE_PROJECTS_ERROR"
  | "RESOLVE_PROJECTS_ERROR"
  | "LOAD_FROM_CACHE_ERROR"
  | "LOAD_BACKUP_ERROR"
  | "CREATE_NEW_CACHE_ERROR"
  | "STORE_CACHE_PAGE_ERROR"
  | "BACKUP_CACHE_READONLY_MODIFICATION_ERROR"
  | "MISSING_PROJECT_IN_PAGE_ERROR"
  | ProjectCacheError.ErrorName;

export class ProjectError extends ErrorBase<ErrorName> {}

/**
 * @description Normalizes err objects in catch blocks specifically for
 * `ProjectDataService`. If the `err` param provider is already an instance
 * of the {@link ProjectError}, returns it directly. If not, wraps it in a new
 * instance of the {@link ProjectError}.
 * !DO NOT USE THIS FOR ANY OTHER CLASS.
 * @param name The error name. See {@link ErrorName} for possible values.
 * @param message A human readable error message.
 * @param err The err argument in a catch block.
 * @returns An instance of the {@link ProjectError} class.
 */
export function normalizeProjectError<E extends ErrorName>({
  name,
  message,
  err,
}: {
  name: E;
  message: string;
  err: unknown;
}): ProjectError {
  return err instanceof ProjectError
    ? err
    : new ProjectError({
        name,
        message,
        cause: err,
      });
}
