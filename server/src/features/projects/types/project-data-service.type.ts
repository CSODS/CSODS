import { ResultFail, ResultSuccess } from "@/types";
import { ProjectError } from "../errors";
import { Projects } from ".";
import { DataSource } from "./data-source.type";

export type ProjectResult =
  | ResultSuccess<Projects.Store, DataSource>
  | ResultFail<ProjectError.ProjectError>;
export type ProjectPageResult =
  | ResultSuccess<Projects.Page, DataSource>
  | ResultFail<ProjectError.ProjectError>;
