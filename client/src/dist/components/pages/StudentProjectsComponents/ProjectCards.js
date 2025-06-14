import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as CONSTANTS from '../../../constants/constants.js';
import { useNavigate } from "react-router-dom";
;
export default function ProjectCard({ iconClass, projectDetails, projectTags, projectDescription }) {
    const redirectToUrl = (url) => {
        window.open(url);
        return;
    };
    const navigate = useNavigate();
    const handleClick = (projectId) => {
        navigate(`${CONSTANTS.ADDRESSES.STUDENT_PROJECTS_ROOT}/${projectId}`);
    };
    return (_jsx("div", Object.assign({ className: 'col', style: { maxWidth: 700 } }, { children: _jsx("div", Object.assign({ className: 'ps-lg-2 card project-card border-light-1 rounded-4 bg-dark-1 translucent' }, { children: _jsxs("div", Object.assign({ className: 'row g-0' }, { children: [_jsx("div", Object.assign({ className: 'pt-3 col-lg-1' }, { children: _jsx("i", { className: `${iconClass} color-light-2 fs-4` }) })), _jsx("div", Object.assign({ className: 'col-lg-11' }, { children: _jsxs("div", Object.assign({ className: 'px-3 pb-3 ps-lg-0 card-body d-flex flex-column align-items-start text-light', style: { minHeight: 290 } }, { children: [_jsx("h5", Object.assign({ className: 'card-title text-start fs-3 color-light-2 bolder' }, { children: projectDetails.Project.ProjectTitle })), _jsx("p", Object.assign({ className: 'card-text my-1 text-start' }, { children: projectDescription })), _jsxs("div", Object.assign({ className: 'mt-auto mx-0 row col-12' }, { children: [_jsx("div", Object.assign({ className: 'ps-0 d-flex flex-wrap align-items-start' }, { children: Tags(projectTags) })), _jsxs("div", Object.assign({ className: 'mt-3 mb-0 ps-0 pe-0 d-flex flex-row align-items-center' }, { children: [_jsx("button", Object.assign({ type: 'button', className: 'col-lg-3 px-4 py-2 ms-0 me-3 btn-light-1 rounded-4 border border-0', onClick: () => redirectToUrl(projectDetails.Project.GitHubUrl) }, { children: "GitHub" })), _jsx("button", Object.assign({ type: 'button', className: 'col-lg-3 px-4 py-2 ms-0 me-3 btn-light-1 rounded-4 border border-0', onClick: () => handleClick(1) }, { children: "View" }))] }))] }))] })) }))] })) })) }), projectDetails.Project.ProjectId));
}
function Tags(projectTags) {
    const tagValues = Object.values(projectTags);
    return (tagValues.map((tag, index) => {
        if (typeof tag === 'string') {
            return (_jsx("div", Object.assign({ className: 'mt-1 py-1 px-3 ms-0 me-2 bg-dark-1 btn-dark-1 rounded-pill border border-light-1 fs-xs' }, { children: tag }), `tag-${index}`));
        }
        else if (Array.isArray(tag)) {
            return (tag.map((subTag, subIndex) => subTag ? (_jsx("div", Object.assign({ className: 'mt-1 py-1 px-3 ms-0 me-2 bg-dark-1 btn-dark-1 rounded-pill border border-light-1 fs-xs' }, { children: subTag }), `tag-${subIndex}`)) : null));
        }
        else {
            return [];
        }
    }));
}
