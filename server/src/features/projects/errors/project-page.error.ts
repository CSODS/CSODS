import { ErrorBase } from "@/error";

export namespace ProjectPage {
  export type ErrorName =
    | "MISSING_PROJECT_IN_PAGE_ERROR"
    | "STORE_PAGE_ERROR"
    | "PAGE_OUT_OF_BOUNDS_ERROR"
    | "MISSING_PAGE_ERROR"
    | "PAGE_RETRIEVAL_ERROR";
  export class ErrorClass extends ErrorBase<ErrorName> {}
}
