import { ResultFail, ResultSuccess } from "@/types";
import { ProjectError } from "../../errors";
import { IProjectCache, IProjectCachePage } from "../../types";

export type Source = "DATABASE" | "JSON_CACHE" | "BACKUP_CACHE";
export type ProjectResult =
  | ResultSuccess<IProjectCache, Source>
  | ResultFail<ProjectError.ProjectError>;
export type ProjectPageResult =
  | ResultSuccess<IProjectCachePage, Source>
  | ResultFail<ProjectError.ProjectError>;
