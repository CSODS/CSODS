import { ResultFail, ResultSuccess } from "@/types";
import { ProjectTagError } from "../errors";
import { DataSource } from "./data-source.type";
import { IProjectTagsCache } from "./legacy-project-tags-cache.interface";

export type ProjectTagsResult =
  | ResultSuccess<IProjectTagsCache, DataSource>
  | ResultFail<ProjectTagError.ProjectTagError>;
