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
    AS_JSON: '.json'
} as const;
