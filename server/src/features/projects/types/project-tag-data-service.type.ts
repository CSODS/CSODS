import { ResultFail, ResultSuccess } from "@/types";
import { ProjectTagError } from "../errors";
import { DataSource } from "./data-source.type";
import { IProjectCache } from "./projects-cache.interface";

export type TagResult =
  | ResultSuccess<IProjectCache, DataSource>
  | ResultFail<ProjectTagError.ProjectTagError>;
