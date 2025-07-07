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

export const PROJECT_QUERY_PARAMETERS = {
    PROJECT_TITLE: 'projectTitle',
    DEVELOPMENT_TYPE: 'devTypeId',
    PROGRAMMING_LANGUAGE: 'languageId',
    DATABASE_TECHNOLOGY: 'databaseId',
    APPLICATION_INDUSTRY: 'industryId'
} as const;