import { MethodNames } from "@/types";
import winston from "winston";

export type MethodLogger<T> = (
  method: MethodNames<T>,
  message: string,
  err?: unknown
) => void;

export function getMethodLoggers<T>(
  logger: winston.Logger,
  level: "info" | "debug" | "error"
): MethodLogger<T> {
  const logCallback = (
    method: MethodNames<T>,
    message: string,
    err?: unknown
  ) => {
    const logMsg = `[${String(method)}] ${message}`;
    if (err) logger.log(level, logMsg, { error: err });
    else logger.log(level, logMsg);
  };

  return logCallback;
}
