export const BASE = "http://localhost:3001";
export const ROUTES = {
    PROJECTS: '/projects'
};
export const PROJECT_ROUTES = {
    ROOT: '/',
    BY_PAGE: '/:pageNumber',
    BY_ID: '/:pageNumber/:projectId',
    LOAD_PROJECTS: '/load_projects'
};
export const CACHE = {
    BASE_NAME: 'cachedProjects',
    HARD_BACKUP: 'cachedProjectsHardBackup',
    AS_JSON: '.json',
    PAGE_SIZE: 8
};
export const DEVELOPMENT_TYPES = {
    GAME_DEV: "Game Development",
    WEB_DEV: "Web Development",
    SOFTWARE_DEV: "Software Development",
    API_DEV: "API Development"
};
export const PROGRAMMING_LANGUAGES = {
    C_SHARP: 'C#',
    C: 'C',
    CPP: 'C++',
    JAVA: 'Java',
    JAVASCRIPT: 'Javascript',
    PYTHON: 'Python',
    RUBY: 'Ruby'
};
