export const CSODS_BASE = process.env.REACT_APP_ENV === 'testing'
    ? process.env.REACT_APP_CSODS_LOCAL_API_BASE_URL
    : process.env.REACT_APP_CSODS_API_BASE_URL;

export const API_PATHS = {
    PROJECTS: '/projects',
    PROJECT_TAGS: '/project_tags'
} as const;

export const PROJECT_PATHS = {
    ROOT: '/',
    BY_PAGE: '/:pageNumber',
    BY_ID: '/:pageNumber/:projectId',
    LOAD_PROJECTS: '/load_projects'
} as const;

export const PROJECT_TAG_PATHS = {
    ROOT: '/',
    ALL_DATA: '/all_data'
} as const;

export const ADDRESSES = {
    LANDING_PAGE: "/",
    HOME: "/home",
    STUDENT_PROJECTS: '/student_projects/:pageNumber',
    STUDENT_PROJECTS_ROOT: '/student_projects',
    PROJECT_DETAILS: '/student_projects/:pageNumber/:id',
    SUBMIT_PROJECT: "/submit_project",
    ABOUT: "/about"
} as const;

export const COLORS = {
    CELESTE: "#C5FFFD",
    NON_PHOTO_BLUE: "#88D9E6",
    FELDGRAU: "#5b6c5d",
    RAISIN_BLACK: "#3b2c35",
    DARK_PURPLE: "#2A1F2D"
} as const;

export const DEVELOPMENT_TYPES = {
    GAME_DEV: "Game Development",
    WEB_DEV: "Web Development",
    SOFTWARE_DEV: "Software Development",
    API_DEV: "API Development"
} as const;

export const ICONS = {
    [DEVELOPMENT_TYPES.GAME_DEV]: "bi bi-controller",
    [DEVELOPMENT_TYPES.WEB_DEV]: "bi bi-browser-chrome",
    [DEVELOPMENT_TYPES.SOFTWARE_DEV]: "bi bi-code-square",
    [DEVELOPMENT_TYPES.API_DEV]: "bi bi-gear-wide-connected"
} as const;