import { ResultBase } from "@/types";
import { IProjectCache, IProjectCachePage } from "../../types";
import { ProjectError } from "./project-data-service.error";

export type ProjectResult = ResultBase<IProjectCache, ProjectError>;
export type ProjectPageResult = ResultBase<IProjectCachePage, ProjectError>;
