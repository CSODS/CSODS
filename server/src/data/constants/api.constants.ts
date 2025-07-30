export const BASE = "http://localhost:3001";

export const ROUTES = {
  PROJECTS: "/projects",
  PROJECT_TAGS: "/project-tags",
  AUTH: "/auth",
} as const;

export const PROJECT_ROUTES = {
  ROOT: "/",
  BY_PAGE: "/:page_number",
  BY_ID: "/:page_number/:project_id",
  LOAD_PROJECTS: "/load-projects",
} as const;

export const PROJECT_TAG_ROUTES = {
  ROOT: "/",
  ALL_DATA: "/all-data",
} as const;

export const AUTH_ROUTES = {
  ROOT: "/",
  SIGN_IN: "/sign-in",
  REGISTER: "/register",
  REFRESH: "/refresh",
  SIGN_OUT: "/sign-out",
} as const;
