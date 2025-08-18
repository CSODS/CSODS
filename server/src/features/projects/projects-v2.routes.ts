import { Router } from "express";
import { AUTH } from "@/data";
import { validateRoles } from "@/middleware";
import { API } from "./constants";
import { attachProjectDataService } from "./middleware";
import * as controllers from "./controllers";
import { attachProjectTagsDataService } from "./middleware/project-tags-data-service.middleware";

export const projectsRouterV2 = Router();

projectsRouterV2.use(attachProjectDataService);
projectsRouterV2.use(attachProjectTagsDataService);
//  todo: add limiters for routes
const { ROUTES } = API;
const { Guest, Student, Moderator, Administrator } = AUTH.ROLES_MAP;
projectsRouterV2.get(
  ROUTES.LOAD_PROJECTS,
  validateRoles(Administrator.roleName),
  controllers.getProjectStore
);

projectsRouterV2.get(
  ROUTES.BY_PAGE,
  validateRoles(
    Guest.roleName,
    Student.roleName,
    Moderator.roleName,
    Administrator.roleName
  ),
  controllers.getProjectsPage
);

projectsRouterV2.get(
  ROUTES.BY_ID,
  validateRoles(
    Guest.roleName,
    Student.roleName,
    Moderator.roleName,
    Administrator.roleName
  ),
  controllers.getProject
);

//  todo: add project tags route
projectsRouterV2.get(
  ROUTES.ALL_TAGS,
  validateRoles(
    Guest.roleName,
    Student.roleName,
    Moderator.roleName,
    Administrator.roleName
  ),
  controllers.getProjectTags
);
