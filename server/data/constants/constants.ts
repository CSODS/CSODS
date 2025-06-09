export const BASE = "http://localhost:3001";

export const ROUTES = {
    PROJECTS: '/projects'
} as const;

export const PROJECT_ROUTES = {
    ROOT: '/',
    BY_ID: '/:projectId'
} as const;

export const CACHE = {
    BASE_NAME: 'cachedProjects',
    HARD_BACKUP: 'cachedProjectsHardBackup',
    AS_JSON: '.json',
    PAGE_SIZE: 8
} as const;

export const DEVELOPMENT_TYPES = {
    GAME_DEV: "Game Development",
    WEB_DEV: "Web Development",
    SOFTWARE_DEV: "Software Development",
    API_DEV: "API Development"  
} as const;