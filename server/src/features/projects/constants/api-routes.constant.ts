export const ROOT = "/projects-v2";

export const ROUTES = {
  BY_PAGE: "/:page_number",
  BY_ID: "/:page_number/:project_id",
  LOAD_PROJECTS: "/load-projects",
  ALL_TAGS: "/all-tags",
} as const;
