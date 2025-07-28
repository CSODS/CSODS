export const DEVELOPMENT_TYPES = {
  GAME_DEV: "Game Development",
  WEB_DEV: "Web Development",
  SOFTWARE_DEV: "Software Development",
  API_DEV: "API Development",
} as const;

export const ICONS = {
  [DEVELOPMENT_TYPES.GAME_DEV]: "bi bi-controller",
  [DEVELOPMENT_TYPES.WEB_DEV]: "bi bi-browser-chrome",
  [DEVELOPMENT_TYPES.SOFTWARE_DEV]: "bi bi-code-square",
  [DEVELOPMENT_TYPES.API_DEV]: "bi bi-gear-wide-connected",
} as const;

//  TODO: ADD FRAMEWORKS TO THE QUERY PARAMETERS WHEN THE BACKEND SUPPORTS IT.
export const PROJECT_QUERY_PARAMETERS = {
  PROJECT_TITLE: "project_title",
  DEVELOPMENT_TYPE: "dev_type_id",
  PROGRAMMING_LANGUAGE: "language_id",
  DATABASE_TECHNOLOGY: "database_id",
  APPLICATION_INDUSTRY: "industry_id",
} as const;
