import { ErrorBase } from "./error-base";

export type ErrorName = "CACHE";

export class EnvError extends ErrorBase<ErrorName> {}
