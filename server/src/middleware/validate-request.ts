import { RouteLogger } from "@/utils";
import { Request, Response, NextFunction } from "express";
import z, { ZodType } from "zod";

/**
 * @function validateRequest
 * @description A `middleware factory` for validating request body schema.
 * Accepts a {@link ZodType} schema parameter that will be used for validating the
 * request body.
 * If the schema validation fails, sends a status response `404` and the validation
 * result error message.
 * If the schema validation succeeds, assigns the validated data into the request body.
 * @param schema - A {@link ZodType} schema that will be used to validate the request body.
 * @returns - A standard express middleware function.
 */
export function validateRequest(
  schema: ZodType
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const { method, originalUrl, body } = req;
    const logHeader = `[${method} ${originalUrl}]`;

    const log = (msg: string) => {
      RouteLogger.debug(`${logHeader} ${msg}`);
    };
    const validationFail = (msg: string) => {
      log(msg);
      res.status(404).json({ message: msg });
    };

    const fields: ZodType = body;

    log("Validating request schema...");
    const validationResult = schema.safeParse(fields);

    if (!validationResult.success)
      return validationFail(z.prettifyError(validationResult.error));

    const validatedData = validationResult.data;

    req.body = validatedData;
    log("Request schema validated.");
    next();
  };
}
