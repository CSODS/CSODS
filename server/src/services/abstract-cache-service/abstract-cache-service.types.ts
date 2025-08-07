import { MethodNames } from "@/types";

export type LogParams<T> = {
  level: "info" | "debug" | "error";
  method: MethodNames<T>;
  message: string;
};
