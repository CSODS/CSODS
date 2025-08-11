import { ResultFail, ResultSuccess } from "@/types";
import { IProjectCache, IProjectCachePage } from "../../types";
import { ProjectError } from "./project-error";

export type Source = "DATABASE" | "JSON_CACHE" | "BACKUP_CACHE";
export type ProjectResult =
  | ResultSuccess<IProjectCache, Source>
  | ResultFail<ProjectError>;
export type ProjectPageResult =
  | ResultSuccess<IProjectCachePage, Source>
  | ResultFail<ProjectError>;
