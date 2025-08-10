import { ResultFail, ResultSuccess } from "@/types";
import { IProjectCache, IProjectCachePage } from "../../types";
import { ProjectError } from "./project-data-service.error";

export type Source = "DATABASE" | "JSON_CACHE";
export type ProjectResult =
  | ResultSuccess<IProjectCache, Source>
  | ResultFail<ProjectError>;
export type ProjectPageResult =
  | ResultSuccess<IProjectCachePage, Source>
  | ResultFail<ProjectError>;
