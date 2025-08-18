import { CacheManager, DbAccess, ErrorBase } from "@/error";
import { isAnyError, isError } from "@/utils";

/**
 * @description Namespace containing the Error Class for `ProjectTags`.
 * Used in `ProjectTagsDataService` and Response Status Code Maps for robust
 * error-handling.
 * Also contains utility function {@link normalizeError} for flexible error
 * class generation based on similar/inherited/different error classes when catching.
 */
export namespace ProjectTag {
  export type ErrorName =
    // cache specific error
    | "RETRIEVE_TAGS_ERROR"
    | "RESOLVE_TAGS_ERROR"
    | CacheManager.ErrorName
    | DbAccess.ErrorName;

  export class ErrorClass extends ErrorBase<ErrorName> {}

  /**
   * @description Normalizes err objects in catch blocks specifically for
   * `ProjectTagsDataService`. If the `err` param provider is already an instance
   * of the `ProjectTag` {@link ErrorClass}, returns it directly. If it is an instance
   * of the {@link ErrorClass} of one of the inherited classes {@link CacheManager} or
   * {@link DbAccess}, creates a new instance of the `ProjectTag` {@link ErrorClass}
   * preserving the error name, message, and stack trace.
   * If it is neither, wraps it in a new instance of the {@link ErrorClass}.
   *
   * !DO NOT USE THIS FOR ANY OTHER ERROR CLASS.
   * @param name The error name. See {@link ErrorName} for possible values.
   * @param message A human readable error message.
   * @param err The err argument in a catch block.
   * @returns An instance of the {@link ErrorClass}.
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

    if (isAnyError([CacheManager.ErrorClass, DbAccess.ErrorClass], err))
      return new ErrorClass({ ...err });

    return new ErrorClass({ name, message, cause: err });
  }
}
