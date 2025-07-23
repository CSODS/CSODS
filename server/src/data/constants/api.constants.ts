export const BASE = "http://localhost:3001";

export const ROUTES = {
  PROJECTS: "/projects",
  PROJECT_TAGS: "/project_tags",
  AUTH: "/auth",
} as const;

export const PROJECT_ROUTES = {
  ROOT: "/",
  BY_PAGE: "/:pageNumber",
  BY_ID: "/:pageNumber/:projectId",
  TITLE_SEARCH: "/:title_search",
  LOAD_PROJECTS: "/load_projects",
} as const;

export const PROJECT_TAG_ROUTES = {
  ROOT: "/",
  ALL_DATA: "/all_data",
} as const;

export const AUTH_ROUTES = {
  ROOT: "/",
  SIGN_IN: "/sign-in",
  REGISTER: "/register",
  REFRESH: "/refresh",
  SIGN_OUT: "/sign-out",
} as const;
