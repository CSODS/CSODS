import { Cache, Db, ErrorBase } from "@/error";
import { ProjectPage } from "./project-page.error";
import { isAnyError, isError } from "@/utils";

export type ErrorName =
  | "RETRIEVE_PROJECTS_ERROR"
  | "RESOLVE_PROJECTS_ERROR"
  | "STORE_CACHE_PAGE_ERROR"
  | "MISSING_PROJECT_IN_PAGE_ERROR"
  | ProjectPage.ErrorName
  | Cache.ErrorName
  | Db.ErrorName;

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
 * todo: update docs
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
  if (isError(ProjectError, err)) return err;

  const isInherited = isAnyError(
    [Cache.ErrorClass, Db.ErrorClass, ProjectPage.ErrorClass],
    err
  );
  if (isInherited) return new ProjectError({ ...err });

  return new ProjectError({ name, message, cause: err });
}
