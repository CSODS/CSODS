export const BASE = "http://localhost:3001";

export const ENDPOINTS = {
    PROJECTS: '/projects'
};

export const PROJECT_ENDPOINTS = {
    ROOT: '/',
    BY_ID: '/:projectId'
};

export const ADDRESSES = {
    LANDING_PAGE: "/",
    HOME: "/home",
    STUDENT_PROJECTS: '/student_projects',
    PROJECT_DETAILS: '/student_projects/:id',
    SUBMIT_PROJECT: "/submit_project",
    ABOUT: "/about"
};

export const COLORS = {
    CELESTE: "#C5FFFD",
    NON_PHOTO_BLUE: "#88D9E6",
    FELDGRAU: "#5b6c5d",
    RAISIN_BLACK: "#3b2c35",
    DARK_PURPLE: "#2A1F2D"
};

export const DEVELOPMENT_TYPES = {
    GAME_DEV: "Game Development",
    WEB_DEV: "Web Development",
    SOFTWARE_DEV: "Software Development",
    API_DEV: "API Development"
};

export const ICONS = {
    [DEVELOPMENT_TYPES.GAME_DEV]: "bi bi-controller",
    [DEVELOPMENT_TYPES.WEB_DEV]: "bi bi-browser-chrome",
    [DEVELOPMENT_TYPES.SOFTWARE_DEV]: "bi bi-code-square",
    [DEVELOPMENT_TYPES.API_DEV]: "bi bi-gear-wide-connected"
};

/* <Route path="/home" element={<Home />} />
            <Route path="/student_projects" element={<StudentProjects />}/>
            <Route path='/student_projects/:id' element={<ProjectDetails />}/>
          </Route>
          <Route path="/submit_project" element={<SubmitProject />}/> */