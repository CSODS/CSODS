import { ResultFail, ResultSuccess } from "@/types";
import { ProjectTag } from "../errors";
import { DataSource } from "./data-source.type";
import { ProjectTagStoreModels } from "./project-tag-store-models.type";

export type ProjectTagsResult =
  | ResultSuccess<ProjectTagStoreModels.Store, DataSource>
  | ResultFail<ProjectTag.ErrorClass>;
