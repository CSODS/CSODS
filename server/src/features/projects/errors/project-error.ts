import { Cache, Db, ErrorBase } from "@/error";
import { isAnyError, isError } from "@/utils";
import { ProjectPage } from "./project-page.error";

export namespace Project {
  export type ErrorName =
    | "RETRIEVE_PROJECTS_ERROR"
    | "RESOLVE_PROJECTS_ERROR"
    | "STORE_CACHE_PAGE_ERROR"
    | "MISSING_PROJECT_IN_PAGE_ERROR"
    | ProjectPage.ErrorName
    | Cache.ErrorName
    | Db.ErrorName;

  export class ErrorClass extends ErrorBase<ErrorName> {}

  /**
   * @description Normalizes err objects in catch blocks specifically for
   * `ProjectDataService`. If the `err` param provider is already an instance
   * of the {@link ErrorClass}, returns it directly. If not, wraps it in a new
   * instance of the {@link ErrorClass}.
   * !DO NOT USE THIS FOR ANY OTHER CLASS.
   * @param name The error name. See {@link ErrorName} for possible values.
   * @param message A human readable error message.
   * @param err The err argument in a catch block.
   * @returns An instance of the {@link ErrorClass} class.
   * todo: update docs
   */
  export function normalizeError<E extends ErrorName>({
    name,
    message,
    err,
  }: {
    name: E;
    message: string;
    err: unknown;
  }): ErrorClass {
    if (isError(ErrorClass, err)) return err;

    const isInherited = isAnyError(
      [Cache.ErrorClass, Db.ErrorClass, ProjectPage.ErrorClass],
      err
    );
    if (isInherited) return new ErrorClass({ ...err });

    return new ErrorClass({ name, message, cause: err });
  }
}
