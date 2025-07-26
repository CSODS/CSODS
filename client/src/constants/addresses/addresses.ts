const AUTH = {
  PATH: "/auth",
  SIGN_IN: "/sign-in",
  REGISTER: "/register",
  REFRESH: "/refresh",
  SIGN_OUT: "/sign-out",
} as const;

const STUDENT_PROJECTS = {
  PATH: "/student_projects/:pageNumber",
  ROOT: "/student_projects",
} as const;

const PROJECT_DETAILS = {
  PATH: `${STUDENT_PROJECTS.PATH}/project_details/:projectId`,
  ROOT: "/project_details",
} as const;

export const ADDRESSES = {
  AUTH: AUTH,
  LANDING_PAGE: "/",
  HOME: "/home",
  STUDENT_PROJECTS: STUDENT_PROJECTS,
  PROJECT_DETAILS: PROJECT_DETAILS,
  SUBMIT_PROJECT: "/submit_project",
  ABOUT: "/about",
} as const;
