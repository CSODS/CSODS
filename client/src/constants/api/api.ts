const CSODS_API_BASE =
  process.env.REACT_APP_ENV === "testing"
    ? process.env.REACT_APP_CSODS_LOCAL_API_BASE_URL
    : process.env.REACT_APP_CSODS_API_BASE_URL;

const PROJECT_PATHS = {
  PATH: "/projects",
  ROOT: "/",
  BY_PAGE: "/:pageNumber",
  BY_ID: "/:pageNumber/:projectId",
} as const;

const PROJECT_TAG_PATHS = {
  PATH: "/project-tags",
  ROOT: "/",
  ALL_DATA: "/all-data",
} as const;

const AUTH_PATHS = {
  PATH: "/auth",
  ROOT: "/",
  SIGN_IN: "/sign-in",
  REGISTER: "/register",
  REFRESH: "/refresh",
  SIGN_OUT: "/sign-out",
} as const;

export const CSODS_API_PATHS = {
  BASE: CSODS_API_BASE,
  PROJECTS: PROJECT_PATHS,
  PROJECT_TAGS: PROJECT_TAG_PATHS,
  AUTH: AUTH_PATHS,
} as const;
