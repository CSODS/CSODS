import { Cache, Db, ErrorBase } from "@/error";
import { isAnyError, isError } from "@/utils";

export namespace ProjectTag {
  export type ErrorName =
    // cache specific error
    | "RETRIEVE_TAGS_ERROR"
    | "RESOLVE_TAGS_ERROR"
    | Cache.ErrorName
    | Db.ErrorName;

  export class ErrorClass extends ErrorBase<ErrorName> {}

  export function normalizeProjectTagError<E extends ErrorName>({
    name,
    message,
    err,
  }: {
    name: E;
    message: string;
    err: unknown;
  }): ErrorClass {
    if (isError(ErrorClass, err)) return err;

    if (isAnyError([Cache.ErrorClass, Db.ErrorClass], err))
      return new ErrorClass({ ...err });

    return new ErrorClass({ name, message, cause: err });
  }
}
