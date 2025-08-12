import { ResultFail, ResultSuccess } from "@/types";
import { ProjectTagError } from "../errors";
import { DataSource } from "./data-source.type";
import { ProjectTags } from "./project-tags-store.type";

export type ProjectTagsResult =
  | ResultSuccess<ProjectTags.Store, DataSource>
  | ResultFail<ProjectTagError.ProjectTagError>;
