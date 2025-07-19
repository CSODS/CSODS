export const BASE = "http://localhost:3001";

export const ROUTES = {
    PROJECTS: '/projects',
    PROJECT_TAGS: '/project_tags',
    AUTH: '/auth'
} as const;

export const PROJECT_ROUTES = {
    ROOT: '/',
    BY_PAGE: '/:pageNumber',
    BY_ID: '/:pageNumber/:projectId',
    TITLE_SEARCH: '/:title_search',
    LOAD_PROJECTS: '/load_projects'
} as const;

export const PROJECT_TAG_ROUTES = {
    ROOT: '/',
    ALL_DATA: '/all_data'
}

export const AUTH_ROUTES = {
    ROOT: '/',
    SIGN_IN: '/signIn'
}

export const CACHE = {
    BASE_NAME: 'PROJECT_CACHE',
    HARD_BACKUP: 'PROJECT_CACHE_HARD_BACKUP',
    AS_JSON: '.json',
    PAGE_SIZE: 8,
    TAGS_CACHE: 'TAG_CACHE'
} as const;

export const DEVELOPMENT_TYPES = {
    GAME_DEV: "Game Development",
    WEB_DEV: "Web Development",
    SOFTWARE_DEV: "Software Development",
    API_DEV: "API Development"  
} as const;

export const PROGRAMMING_LANGUAGES = {
    C_SHARP: 'C#',
    C: 'C',
    CPP: 'C++',
    JAVA: 'Java',
    JAVASCRIPT: 'Javascript',
    PYTHON: 'Python',
    RUBY: 'Ruby'
} as const;