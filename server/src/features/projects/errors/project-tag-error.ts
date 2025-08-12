import { Cache, Db, ErrorBase } from "@/error";
import { isAnyError, isError } from "@/utils";

export type ErrorName =
  // cache specific error
  "RETRIEVE_TAGS_ERROR" | "RESOLVE_TAGS_ERROR" | Cache.ErrorName | Db.ErrorName;

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
  if (isError(ProjectTagError, err)) return err;

  if (isAnyError([Cache.ErrorClass, Db.ErrorClass], err))
    return new ProjectTagError({ ...err });

  return new ProjectTagError({ name, message, cause: err });
}
