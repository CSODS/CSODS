import { Request } from "express";
import { ProjectFilter } from "../types";

/**
 * Extracts and parses query parameters from the request object to construct an `IProjectFilter`.
 *
 * Converts query values to numbers and filters out invalid or undefined values.
 *
 * @param request - The Express request object containing the query parameters.
 * @returns A constructed filter object used to query or filter projects.
 *
 * @see parseNumberParam - Utility function used to safely parse numeric query parameters.
 */
export function assembleFilter(request: Request): ProjectFilter {
  const { project_title, dev_type_id, language_id, database_id, industry_id } =
    request.query;

  const filter: ProjectFilter = {
    ProjectTitle: parseStringParam(project_title),
    DevTypeId: parseNumberParam(dev_type_id),
    LanguageId: parseNumberParam(language_id),
    DatabaseId: parseNumberParam(database_id),
    IndustryId: parseNumberParam(industry_id),
  };
  return filter;
}
/**
 * A helper function for the @see assembleFilter function.
 * Safely parses a value into a string.
 *
 * If the input is a string, remove leading and trailing whitespaces, replace underscores
 * '_' with spaces ' ', and convert to lowercase. Otherwise, returns 'undefined'.
 *
 * @param value - The value to parse, a query string parameter.
 * @returns The parsed string, or `undefined` if the input is invalid.
 */
function parseStringParam(value: any): string | undefined {
  const str =
    typeof value === "string"
      ? value.trim().replace("_", " ").toLowerCase()
      : undefined;
  return str;
}
/**
 * A helper function for the @see assembleFilter function.
 * Safely parses a value into a number.
 *
 * If the input is a string that can be converted to a number, returns the parsed number.
 * Otherwise, returns `undefined`.
 *
 * @param value - The value to parse, a query string parameter.
 * @returns The parsed number, or `undefined` if the input is invalid.
 */
function parseNumberParam(value: any): number | undefined {
  const num = typeof value === "string" ? Number(value) : NaN;
  return isNaN(num) ? undefined : num;
}
