import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import '../App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ADDRESSES } from './constants/constants.js';
import { PrimaryLayout } from './components/layouts/MainLayout.js';
import LandingPage from './components/pages/LandingPage.js';
import Home from "./components/pages/Home.js";
import { StudentProjects, ProjectDetails } from './components/pages/StudentProjects.js';
import SubmitProject from './components/pages/SubmitProject.js';
function App() {
    return (_jsx("div", Object.assign({ className: "App" }, { children: _jsx(Router, { children: _jsxs(Routes, { children: [_jsxs(Route, Object.assign({ path: ADDRESSES.LANDING_PAGE, element: _jsx(PrimaryLayout, {}) }, { children: [_jsx(Route, { index: true, element: _jsx(LandingPage, {}) }), _jsx(Route, { path: ADDRESSES.HOME, element: _jsx(Home, {}) }), _jsx(Route, { path: ADDRESSES.STUDENT_PROJECTS, element: _jsx(StudentProjects, {}) }), _jsx(Route, { path: ADDRESSES.PROJECT_DETAILS, element: _jsx(ProjectDetails, {}) }), _jsx(Route, { path: ADDRESSES.ABOUT })] })), _jsx(Route, { path: ADDRESSES.SUBMIT_PROJECT, element: _jsx(SubmitProject, {}) })] }) }) })));
}
export default App;
