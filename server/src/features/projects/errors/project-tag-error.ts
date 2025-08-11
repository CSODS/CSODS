import { ErrorBase } from "@/error";

export type ErrorName =
  // db error
  | "EXCEEDED_MAX_FETCH_RETRIES_ERROR"
  | "EMPTY_TABLE_ERROR"
  | "DB_FETCH_ERROR"
  // cache specific error
  | "RETRIEVE_TAGS_ERROR"
  | "RESOLVE_TAGS_ERROR"
  // general cache error
  | "LOAD_FROM_CACHE_ERROR"
  | "LOAD_BACKUP_ERROR"
  | "CREATE_NEW_CACHE_ERROR"
  | "BACKUP_CACHE_READONLY_MODIFICATION_ERROR";

export class ProjectTagError extends ErrorBase<ErrorName> {}

export function normalizeProjectTagError<E extends ErrorName>({
  name,
  message,
  err,
}: {
  name: E;
  message: string;
  err: unknown;
}): ProjectTagError {
  return err instanceof ProjectTagError
    ? err
    : new ProjectTagError({
        name,
        message,
        cause: err,
      });
}
