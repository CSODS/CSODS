import { ErrorBase } from "@/error";

/**
 * @description Namespace containing the custom error class for
 * `ProjectPage`s. Inherited by the `Project` Error class and used in
 * `ProjectDataService` as well as Status Code Maps for robust
 * error-handling.
 */
export namespace ProjectPage {
  export type ErrorName =
    | "MISSING_PROJECT_IN_PAGE_ERROR"
    | "STORE_PAGE_ERROR"
    | "PAGE_OUT_OF_BOUNDS_ERROR"
    | "MISSING_PAGE_ERROR"
    | "PAGE_RETRIEVAL_ERROR";
  export class ErrorClass extends ErrorBase<ErrorName> {}
}
