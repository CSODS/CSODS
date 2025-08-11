export const ROOT = "/projects-v2";

export const ROUTES = {
  BY_PAGE: "/page/:page_number",
  BY_ID: "/page/:page_number/project/:project_id",
  LOAD_PROJECTS: "/load-projects",
  ALL_TAGS: "/all-tags",
} as const;
