import { ProjectDataService } from "../services";

declare global {
  namespace Express {
    interface Request {
      projectDataService: ProjectDataService;
    }
  }
}
