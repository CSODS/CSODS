import { MethodNames } from "@/types";

export type MethodLogParams<T> = {
  level: "info" | "debug" | "error";
  method: MethodNames<T>;
  message: string;
};
