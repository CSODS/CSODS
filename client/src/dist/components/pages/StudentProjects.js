import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as CONSTANTS from '../../constants/constants.js';
import * as DEFAULTS from '../../constants/defaults.js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectDataService } from '../../utils/data/ProjectDataService.js';
import ApiHandler from '../../utils/api/ApiHandler.js';
import ProjectCard from './StudentProjectsComponents/ProjectCards.js';
//#region Student Projects
export default function StudentProjects() {
    const [projectList, setProjectList] = useState(DEFAULTS.PROJECT_LIST);
    const [projectTags, setProjectTags] = useState(DEFAULTS.TAGS);
    const [projectDataService, setProjectDataService] = useState(new ProjectDataService(projectTags));
    const { pageNumber } = useParams();
    useEffect(() => {
        // const projectPageLink = `${CONSTANTS.CSODS_BASE}${CONSTANTS.API_PATHS.PROJECTS}/${pageNumber}`;
        // axios.get(projectPageLink)
        // .then((response) => {
        //   if(response.data != null) {
        //     setProjectList(response.data.Projects);
        //   }
        // })
        // .catch(function (error) {
        //   // handle error
        //   console.log(error);
        // })
        const apiHandler = new ApiHandler();
        const loadProjectList = async () => {
            if (pageNumber) {
                const projectList = await apiHandler.GetProjectList(pageNumber);
                if (projectList) {
                    setProjectList(projectList);
                }
            }
        };
        loadProjectList();
    }, [pageNumber]);
    useEffect(() => {
        // const projectTagsLink = `${CONSTANTS.CSODS_BASE}${CONSTANTS.API_PATHS.PROJECT_TAGS}${CONSTANTS.PROJECT_TAG_PATHS.ALL_DATA}`;
        // axios.get(projectTagsLink)
        // .then((response) => {
        //   if (response.data != null) {
        //     setProjectTags(response.data);
        //     setProjectDataService(new ProjectDataService(response.data));
        //   }
        // })
        // .catch(function (error) {
        //   // handle error
        //   console.log(error);
        // })
        const apiHandler = new ApiHandler();
        const loadTagData = async () => {
            const tagData = await apiHandler.GetAllTags();
            if (tagData) {
                setProjectTags(tagData);
                setProjectDataService(new ProjectDataService(tagData));
            }
        };
        loadTagData();
    }, []);
    return (_jsxs("div", { children: [_jsx(Header, {}), _jsx(SearchBar, {}), _jsx("div", Object.assign({ className: 'mx-0 px-3 mt-5 row row-cols-1 row-cols-md-2 row-gap-4 d-flex justify-content-center' }, { children: projectList.map((value) => {
                    const projectTags = projectDataService.getProjectTagValues(value);
                    const iconKey = projectTags.DevType;
                    const iconClass = CONSTANTS.ICONS[iconKey];
                    const projectDescription = projectDataService.omitProjectDescription(DEFAULTS.PROJECT_DESCRIPTION);
                    return (_jsx(ProjectCard, { iconClass: iconClass, projectDetails: value, projectTags: projectTags, projectDescription: projectDescription }, value.Project.ProjectId));
                }) })), _jsx(UpButton, {})] }));
}
//#endregion
function Header() {
    return (_jsxs("div", { children: [_jsx("div", Object.assign({ "data-bs-spy": 'scroll', "data-bs-target": '#nav-scroll', "data-bs-offset": '-100' }, { children: _jsx("div", { id: 'heading' }) })), _jsxs("div", Object.assign({ className: 'p-0 mt-3 mb-5 d-flex flex-column align-items-center justify-content-center' }, { children: [_jsxs("div", Object.assign({ className: 'row g-0 d-flex justify-content-center align-items-center', style: { maxWidth: 700 } }, { children: [_jsx("div", Object.assign({ className: 'col-md-auto p-0 m-0 d-flex justify-content-center align-items-center' }, { children: _jsx("img", { src: '/github_logo.png', alt: '...', className: 'header-logo shadow-lg' }) })), _jsx("div", Object.assign({ className: 'col-md p-0 ps-md-3 m-0 d-flex justify-content-center align-items-center' }, { children: _jsx("h1", Object.assign({ className: 'fs-h1 bolder color-light-2 text-shadow-m' }, { children: "GitHub Projects" })) }))] })), _jsx("div", Object.assign({ className: 'px-3 fs-5 color-light-2' }, { children: "Discover open source projects uploaded by our very own students." }))] }))] }));
}
function SearchBar() {
    return (_jsxs("div", { children: [_jsx("div", Object.assign({ className: 'mt-5 d-flex justify-content-center align-items-center' }, { children: _jsxs("div", Object.assign({ className: 'py-3 px-4 col-md-6 d-flex align-items-center justify-content-start border border-light-1 rounded-pill bg-dark-1 translucent' }, { children: [_jsx("i", { className: "bi bi-search color-light-2 me-3" }), _jsx("input", { type: 'text', className: 'm-0 fs-6 w-100 color-light-2', placeholder: 'Search projects...' })] })) })), _jsxs("div", Object.assign({ className: 'mt-4' }, { children: [_jsx("button", Object.assign({ type: 'button', className: 'btn-dark-1 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1' }, { children: "All" })), _jsx("button", Object.assign({ type: 'button', className: 'btn-dark-1 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1' }, { children: "JavaScript" })), _jsx("button", Object.assign({ type: 'button', className: 'btn-dark-1 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1' }, { children: "Python" })), _jsx("button", Object.assign({ type: 'button', className: 'btn-dark-1 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1' }, { children: "C#" })), _jsx("button", Object.assign({ type: 'button', className: 'btn-dark-1 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1' }, { children: "C" }))] }))] }));
}
function FilterButton() {
}
function UpButton() {
    return (_jsx("div", Object.assign({ className: 'm-0 mt-3 pb-2 px-2 d-flex d-lg-none sticky-bottom justify-content-end' }, { children: _jsx("a", Object.assign({ href: '#heading', className: 'px-2 bg-dark-2 project-card rounded-pill d-flex justify-content-center align-content-center' }, { children: _jsx("i", { className: "bi bi-arrow-bar-up fs-6 color-light-2" }) })) })));
}
