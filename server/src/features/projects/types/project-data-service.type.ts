import { ResultFail, ResultSuccess } from "@/types";
import { Project } from "../errors";
import { ProjectStoreModels } from ".";
import { DataSource } from "./data-source.type";

export type ProjectResult =
  | ResultSuccess<ProjectStoreModels.Store, DataSource>
  | ResultFail<Project.ErrorClass>;
export type ProjectPageResult =
  | ResultSuccess<ProjectStoreModels.Page, DataSource>
  | ResultFail<Project.ErrorClass>;
