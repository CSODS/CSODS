import ApiHandler from "./api/ApiHandler";
import { ProjectDataService, IProjectTags } from "./data/ProjectDataService";
import { JsonHandler } from "./json/jsonHandler";
import {
  redirectToUrl,
  assembleQuery,
  getProjectsPageLink,
  getProjectLink,
} from "./navigation/navigation";
import { getBootstrapSpacing } from "./styles/spacing";

export {
  ApiHandler,
  ProjectDataService,
  JsonHandler,
  redirectToUrl,
  assembleQuery,
  getProjectsPageLink,
  getProjectLink,
  getBootstrapSpacing,
};

export type { IProjectTags };

export * from "./api";
