import { ProjectDataService, ProjectTagsDataService } from "../services";

declare global {
  namespace Express {
    interface Request {
      projectDataService: ProjectDataService;
      projectTagsDataService: ProjectTagsDataService;
    }
  }
}
