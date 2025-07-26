import { Request, Response, NextFunction } from "express";
import z, { ZodType } from "zod";
import { RequestLogContext } from "@utils";
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
    const logger = new RequestLogContext(req, res);

    logger.log("debug", "Validating request schema...");

    const validationResult = schema.safeParse(req.body);

    if (!validationResult.success)
      return logger.logStatus(404, z.prettifyError(validationResult.error));

    const validatedBody = validationResult.data;

    req.body = validatedBody;
    logger.log("debug", "Request schema validated.");
    next();
  };
}
