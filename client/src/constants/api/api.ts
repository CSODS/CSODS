const CSODS_API_BASE =
  process.env.REACT_APP_ENV === "testing"
    ? process.env.REACT_APP_CSODS_LOCAL_API_BASE_URL
    : process.env.REACT_APP_ENV === "dev"
    ? process.env.REACT_APP_CSODS_DEV_API_BASE_URL
    : process.env.REACT_APP_CSODS_API_BASE_URL;

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
  AUTH: AUTH_PATHS,
} as const;
