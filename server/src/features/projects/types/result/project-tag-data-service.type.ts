import { ResultFail, ResultSuccess } from "@/types";
import { ProjectTag } from "../../errors";
import { ProjectTagStoreModels } from "../store";
import { DataSource } from "../data-source.type";

export type ProjectTagsResult =
  | ResultSuccess<ProjectTagStoreModels.Store, DataSource>
  | ResultFail<ProjectTag.ErrorClass>;
