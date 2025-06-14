import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export default function ProjectDetails() {
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
