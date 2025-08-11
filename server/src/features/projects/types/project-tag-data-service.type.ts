import { ResultFail, ResultSuccess } from "@/types";
import { ProjectTagError } from "../errors";
import { DataSource } from "./data-source.type";
import { IProjectTagsCache } from "./project-tags-cache.interface";

export type TagResult =
  | ResultSuccess<IProjectTagsCache, DataSource>
  | ResultFail<ProjectTagError.ProjectTagError>;
