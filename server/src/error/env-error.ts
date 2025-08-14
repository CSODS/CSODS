import { ErrorBase } from "./error-base";

export namespace Env {
  export type ErrorName = "CACHE";

  export class ErrorClass extends ErrorBase<ErrorName> {}
}
