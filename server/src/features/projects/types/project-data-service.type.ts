import { ResultFail, ResultSuccess } from "@/types";
import { ProjectError } from "../errors";
import { IProjectCache, IProjectCachePage } from ".";
import { DataSource } from "./data-source.type";

export type ProjectResult =
  | ResultSuccess<IProjectCache, DataSource>
  | ResultFail<ProjectError.ProjectError>;
export type ProjectPageResult =
  | ResultSuccess<IProjectCachePage, DataSource>
  | ResultFail<ProjectError.ProjectError>;
