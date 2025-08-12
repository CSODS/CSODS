import { ResultFail, ResultSuccess } from "@/types";
import { Project } from "../errors";
import { Projects } from ".";
import { DataSource } from "./data-source.type";

export type ProjectResult =
  | ResultSuccess<Projects.Store, DataSource>
  | ResultFail<Project.ErrorClass>;
export type ProjectPageResult =
  | ResultSuccess<Projects.Page, DataSource>
  | ResultFail<Project.ErrorClass>;
