import { Exhaustive } from "@/types";

/**
 * todo: add docs
 */
export class StatusCode {
  public static fromError<M extends Exhaustive<string>>({
    errorName,
    statusCodeMap,
  }: {
    errorName: keyof M;
    statusCodeMap: M;
  }): number {
    return statusCodeMap[errorName];
  }
}
