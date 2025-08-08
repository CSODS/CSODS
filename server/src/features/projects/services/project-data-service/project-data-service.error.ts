import { ErrorBase } from "@/error";

export type ErrorName =
  | "DB_FETCH_ERROR"
  | "RETRIEVE_PROJECTS_ERROR"
  | "RESOLVE_PROJECTS_ERROR"
  | "LOAD_FROM_CACHE_ERROR"
  | "LOAD_BACKUP_ERROR"
  | "CREATE_NEW_CACHE_ERROR";

export class ProjectError extends ErrorBase<ErrorName> {}

/**
 * @description Normalizes err objects in catch blocks specifically for
 * `ProjectDataService`.
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
