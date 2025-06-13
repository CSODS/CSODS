import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DEVELOPMENT_TYPES, ICONS } from '../../constants/constants.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADDRESSES } from '../../constants/constants.js';
function redirectToUrl(url) {
    window.open(url);
    return;
}
//#region Student Projects
export function StudentProjects() {
    //   const [projectList, setProjectList] = useState([]);
    //   useEffect(() => {
    //     axios.get(`${BASE+ENDPOINTS.PROJECTS}`).then((response) => {
    //       // do something
    //       setProjectList(response.data);
    //     })
    //   }, []);
    const [projectList, setProjectList] = useState([
        {
            ProjectId: 1,
            ProjectNumber: 2310227,
            ProjectName: "Nexus Banking",
            ProjectDevType: DEVELOPMENT_TYPES.WEB_DEV,
            ProjectOwner: "Julius Trinidad",
            ProjectDescription: "A Banking App in C#",
            ProjectUrl: "https://github.com/zeraus00/E_Banking_System.git"
        },
        {
            ProjectId: 2,
            ProjectNumber: 2310228,
            ProjectName: "Mon App",
            ProjectDevType: DEVELOPMENT_TYPES.SOFTWARE_DEV,
            ProjectOwner: "Bogart Dela Mon",
            ProjectDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Curabitur vel condimentum quam. Phasellus non augue cursus, porta turpis sed, 
        pellentesque dui. Donec dolor ante, euismod in laoreet nec, feugiat eget ipsum. 
        Donec feugiat tempor urna non scelerisque. Donec venenatis at magna id tincidunt. 
        Cras facilisis non lectus non interdum. Aliquam ut urna et nulla posuere interdum 
        sit amet sit amet justo.`,
            ProjectUrl: "https://github.com/zeraus00/E_Banking_System.git"
        }
    ]);
    const navigate = useNavigate();
    const handleClick = (projectId) => {
        navigate(`${ADDRESSES.STUDENT_PROJECTS}/${projectId}`);
    };
    return (_jsxs("div", { children: [_jsx("div", Object.assign({ "data-bs-spy": 'scroll', "data-bs-target": '#nav-scroll', "data-bs-offset": '-100' }, { children: _jsx("div", { id: 'heading' }) })), _jsxs("div", Object.assign({ className: 'p-0 mt-3 mb-5 d-flex flex-column align-items-center justify-content-center' }, { children: [_jsxs("div", Object.assign({ className: 'row g-0 d-flex justify-content-center align-items-center', style: { maxWidth: 700 } }, { children: [_jsx("div", Object.assign({ className: 'col-md-auto p-0 m-0 d-flex justify-content-center align-items-center' }, { children: _jsx("img", { src: '/github_logo.png', alt: '...', className: 'header-logo shadow-lg' }) })), _jsx("div", Object.assign({ className: 'col-md p-0 ps-md-3 m-0 d-flex justify-content-center align-items-center' }, { children: _jsx("h1", Object.assign({ className: 'fs-h1 bolder color-light-2 text-shadow-m' }, { children: "GitHub Projects" })) }))] })), _jsx("div", Object.assign({ className: 'px-3 fs-5 color-light-2' }, { children: "Discover open source projects uploaded by our very own students." }))] })), _jsx("div", Object.assign({ className: 'mt-5 d-flex justify-content-center align-items-center' }, { children: _jsxs("div", Object.assign({ className: 'py-3 px-4 col-md-6 d-flex align-items-center justify-content-start border border-light-1 rounded-pill bg-dark-1 translucent' }, { children: [_jsx("i", { className: "bi bi-search color-light-2 me-3" }), _jsx("input", { type: 'text', className: 'm-0 fs-6 w-100 color-light-2', placeholder: 'Search projects...' })] })) })), _jsxs("div", Object.assign({ className: 'mt-4' }, { children: [_jsx("button", Object.assign({ type: 'button', className: 'btn-dark-1 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1' }, { children: "All" })), _jsx("button", Object.assign({ type: 'button', className: 'btn-dark-1 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1' }, { children: "JavaScript" })), _jsx("button", Object.assign({ type: 'button', className: 'btn-dark-1 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1' }, { children: "Python" })), _jsx("button", Object.assign({ type: 'button', className: 'btn-dark-1 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1' }, { children: "C#" })), _jsx("button", Object.assign({ type: 'button', className: 'btn-dark-1 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1' }, { children: "C" }))] })), _jsx("div", Object.assign({ className: 'mx-0 px-3 mt-5 row row-cols-1 row-cols-md-2 row-gap-4 d-flex justify-content-center' }, { children: projectList.map((value, key) => {
                    return (_jsx("div", Object.assign({ className: 'col', style: { maxWidth: 700 } }, { children: _jsx("div", Object.assign({ className: 'ps-lg-2 card project-card border-light-1 rounded-4 bg-dark-1 translucent' }, { children: _jsxs("div", Object.assign({ className: 'row g-0' }, { children: [_jsx("div", Object.assign({ className: 'pt-3 col-lg-1' }, { children: _jsx("i", { className: `${ICONS[value.ProjectDevType]} color-light-2 fs-4` }) })), _jsx("div", Object.assign({ className: 'col-lg-11' }, { children: _jsxs("div", Object.assign({ className: 'px-3 pb-3 ps-lg-0 card-body d-flex flex-column align-items-start text-light', style: { minHeight: 290 } }, { children: [_jsx("h5", Object.assign({ className: 'card-title text-start fs-3 color-light-2 bolder' }, { children: value.ProjectName })), _jsx("p", Object.assign({ className: 'card-text my-1 text-start' }, { children: value.ProjectDescription.length > 190
                                                        ? value.ProjectDescription.slice(0, 190) + "..."
                                                        : value.ProjectDescription })), _jsxs("div", Object.assign({ className: 'mt-auto mx-0 row col-12' }, { children: [_jsxs("div", Object.assign({ className: 'ps-0 d-flex flex-row align-items-start' }, { children: [_jsx("div", Object.assign({ className: 'py-1 px-3 ms-0 me-2 bg-dark-1 btn-dark-1 rounded-pill border border-light-1 fs-xs' }, { children: "JavaScript" })), _jsx("div", Object.assign({ className: 'py-1 px-3 ms-0 me-2 bg-dark-1 btn-dark-1 rounded-pill border border-light-1 fs-xs' }, { children: "FastAPI" }))] })), _jsxs("div", Object.assign({ className: 'mt-3 mb-0 ps-0 pe-0 d-flex flex-row align-items-center' }, { children: [_jsx("button", Object.assign({ type: 'button', className: 'col-lg-3 px-4 py-2 ms-0 me-3 btn-light-1 rounded-4 border border-0', onClick: () => redirectToUrl(value.ProjectUrl) }, { children: "GitHub" })), _jsx("button", Object.assign({ type: 'button', className: 'col-lg-3 px-4 py-2 ms-0 me-3 btn-light-1 rounded-4 border border-0', onClick: () => handleClick(1) }, { children: "View" }))] }))] }))] })) }))] })) })) })));
                }) })), _jsx("div", Object.assign({ className: 'm-0 mt-3 pb-2 px-2 d-flex d-lg-none sticky-bottom justify-content-end' }, { children: _jsx("a", Object.assign({ href: '#heading', className: 'px-2 bg-dark-2 project-card rounded-pill d-flex justify-content-center align-content-center' }, { children: _jsx("i", { className: "bi bi-arrow-bar-up fs-6 color-light-2" }) })) }))] }));
}
//#endregion
export function ProjectDetails() {
    const [sampleProject] = useState({
        ProjectId: 1,
        ProjectNumber: 2310227,
        ProjectName: "Nexus Banking",
        ProjectOwner: "Julius Trinidad",
        ProjectDescription: "A Banking App in C#",
        ProjectUrl: "https://github.com/zeraus00/E_Banking_System.git"
    });
    const [projectDetails] = useState({
        Contributors: [
            { Username: "steins0668", Role: "Contributor", Subrole: "Backend Dev" },
            { Username: "eounaria", Role: "Contributor", Subrole: "Frontend Dev" },
            { Username: "zeraus00", Role: "Owner", Subrole: "Fullstack Dev" }
        ],
        Tags: ["C#", "Blazor Web App", "Web Application", "Web Dev", "SQL"]
    });
    return (_jsxs("div", Object.assign({ className: 'd-flex flex-column' }, { children: [_jsxs("div", Object.assign({ className: 'p-0 mt-2 mb-5 d-flex flex-column align-items-center justify-content-center' }, { children: [_jsx("h1", Object.assign({ className: 'fs-1 bolder color-light-2 text-shadow-m' }, { children: sampleProject.ProjectName })), _jsx("div", Object.assign({ className: 'fs-5 fw-bold color-light-2' }, { children: sampleProject.ProjectOwner })), _jsx("div", Object.assign({ className: 'col-md-11 mt-3 mx-2 px-3 py-4 rounded-4 bg-dark-1 border border-light-1 text-light text-start', style: { maxWidth: 1400 } }, { children: sampleProject.ProjectDescription }))] })), _jsxs("div", Object.assign({ className: 'col-6 align-self-center row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 d-flex align-items-center justify-content-center', style: { maxWidth: 700 } }, { children: [_jsx("div", Object.assign({ className: 'col', style: { maxWidth: 150 } }, { children: _jsx("div", Object.assign({ className: 'bg-dark-1 card project-card rounded-5 pb-1 border-light-1' }, { children: _jsxs("div", Object.assign({ className: 'card-body pb-0 flex-column align-items-center' }, { children: [_jsx("i", { className: "bi bi-stars color-light-2 fs-1" }), _jsx("p", Object.assign({ className: 'mt-1 mb-1 fw-bolder fs-5 color-light-2' }, { children: "1024" }))] })) })) })), _jsx("div", Object.assign({ className: 'col', style: { maxWidth: 150 } }, { children: _jsx("div", Object.assign({ className: 'bg-dark-1 card project-card rounded-5 pb-1 border-light-1' }, { children: _jsxs("div", Object.assign({ className: 'card-body pb-0 flex-column align-items-center' }, { children: [_jsx("i", { className: "bi bi-plugin color-light-2 fs-1" }), _jsx("p", Object.assign({ className: 'mt-1 mb-1 fw-bolder fs-5 color-light-2' }, { children: "512" }))] })) })) })), _jsx("div", Object.assign({ className: 'col', style: { maxWidth: 150 } }, { children: _jsx("div", Object.assign({ className: 'bg-dark-1 card project-card rounded-5 pb-1 border-light-1' }, { children: _jsxs("div", Object.assign({ className: 'card-body pb-0 flex-column align-items-center' }, { children: [_jsx("i", { className: "bi bi-exclamation-octagon color-light-2 fs-1" }), _jsx("p", Object.assign({ className: 'mt-1 mb-1 fw-bolder fs-5 color-light-2' }, { children: "256" }))] })) })) })), _jsx("div", Object.assign({ className: 'col', style: { maxWidth: 150 } }, { children: _jsx("div", Object.assign({ className: 'bg-dark-1 card project-card rounded-5 pb-1 border-light-1' }, { children: _jsxs("div", Object.assign({ className: 'card-body pb-0 flex-column align-items-center' }, { children: [_jsx("i", { className: "bi bi-person-workspace color-light-2 fs-1" }), _jsx("p", Object.assign({ className: 'mt-1 mb-1 fw-bolder fs-5 color-light-2' }, { children: "3" }))] })) })) }))] })), _jsxs("div", Object.assign({ className: 'mt-5 d-flex flex-row justify-content-center' }, { children: [_jsx("button", Object.assign({ type: 'button', className: 'px-3 py-1 py-md-3 mx-2 bg-dark-pruple btn-dark-1 rounded-pill border border-1 border-light-1' }, { children: "Back to Projects" })), _jsx("button", Object.assign({ type: 'button', className: 'px-3 py-1 py-md-3 mx-2 bg-dark-pruple btn-dark-1 rounded-pill border border-1 border-light-1' }, { children: "View On GitHub" }))] })), _jsxs("div", Object.assign({ className: 'mt-5 d-flex flex-column  align-items-center' }, { children: [_jsx("h1", Object.assign({ className: 'fs-1 bolder color-light-2 text-shadow-m' }, { children: "Tags" })), _jsx("div", Object.assign({ className: 'mt-4' }, { children: 
                        // projectList.map((value, key) =>  {
                        //   //  display data
                        //   return <div> {value.ProjectName} {value.ProjectOwner} </div>
                        // })
                        projectDetails.Tags.map((value, key) => {
                            return _jsx("button", Object.assign({ type: 'button', className: 'project-card bg-dark-1 rounded-pill mx-2 mb-2 px-4 py-1 border border-1 border-light-1 color-light-2' }, { children: value }));
                        }) }))] })), _jsxs("div", Object.assign({ className: 'mt-5 d-flex flex-column align-items-center' }, { children: [_jsx("h1", Object.assign({ className: 'fs-1 bolder color-light-2 text-shadow-m' }, { children: "Core Contributors" })), _jsx("div", Object.assign({ className: 'mt-4 w-100 row row-cols-1 row-cols-md-3 row-cols-lg-4 row-gap-3 justify-content-center' }, { children: projectDetails.Contributors.map((value, key) => {
                            let styles = { bgColor: "", color: "", colorSecondary: "" };
                            switch (value.Role) {
                                case "Owner":
                                    styles.bgColor = 'bg-light-1';
                                    styles.color = 'color-dark-2';
                                    styles.colorSecondary = 'color-dark-1';
                                    break;
                                case "Contributor":
                                    styles.bgColor = 'bg-dark-1';
                                    styles.color = 'color-light-1';
                                    styles.colorSecondary = 'color-light-2';
                                    break;
                                default:
                                    break;
                            }
                            ;
                            return (_jsx("div", Object.assign({ className: 'col', style: { maxWidth: 300 } }, { children: _jsxs("div", Object.assign({ className: `${styles.bgColor} project-card px-5 rounded-5 mx-2 px-4 py-1 border border-2 border-dark-2` }, { children: [_jsx("p", Object.assign({ className: `mt-1 mb-0 fs-6 ${styles.color}` }, { children: value.Role })), _jsx("i", { className: `mt-0 bi bi-person-workspace ${styles.color} fs-h1` }), _jsx("p", Object.assign({ className: `mt-1 fw-bolder fs-5 ${styles.color}` }, { children: value.Username })), _jsx("p", Object.assign({ className: `mt-1 mb-1 fs-6 ${styles.colorSecondary}` }, { children: value.Subrole }))] })) })));
                        }) }))] }))] })));
}
