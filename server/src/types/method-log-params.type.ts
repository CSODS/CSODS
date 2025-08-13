import { MethodNames } from "./class-methods.type";

export type MethodLogParams<T> = {
  level: "info" | "debug" | "error";
  method: MethodNames<T>;
  message: string;
  err?: unknown;
};
