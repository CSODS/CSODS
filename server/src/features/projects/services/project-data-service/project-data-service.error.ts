import { ErrorBase } from "@/error";

export type ErrorName = "FETCH_ERROR" | "RETRIEVE_PROJECTS_ERROR";

export class ProjectError extends ErrorBase<ErrorName> {}
