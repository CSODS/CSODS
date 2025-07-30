export const PROJECT_ENDPOINTS = {
  PATH: "/projects",
  ROOT: "/",
  BY_PAGE: "/:page-number",
  BY_ID: "/:page-number/:project-id",
} as const;

export const PROJECT_TAG_ENDPOINTS = {
  PATH: "/project-tags",
  ROOT: "/",
  ALL_DATA: "/all-data",
} as const;
