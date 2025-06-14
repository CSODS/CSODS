export const BASE = "http://localhost:3001";

export const ROUTES = {
    PROJECTS: '/projects',
    PROJECT_TAGS: '/project_tags'
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

export const CACHE = {
    BASE_NAME: 'cachedProjects',
    HARD_BACKUP: 'cachedProjectsHardBackup',
    AS_JSON: '.json',
    PAGE_SIZE: 8,
    TAGS_CACHE: 'cachedTags'
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