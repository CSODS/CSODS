import { ADDRESSES } from "@/constants";

export function getPageLink (pageNumber: number) {
    const root = ADDRESSES.STUDENT_PROJECTS.ROOT;
    const link = `${root}/${pageNumber}`;
    return link;
};

export function getProjectLink(pageNumber: number, projectId: number) {
    const pageLink = `${ADDRESSES.STUDENT_PROJECTS.ROOT}/${pageNumber}`;
    const detailsLink = `${ADDRESSES.PROJECT_DETAILS.ROOT}/${projectId}`;
    return `${pageLink}${detailsLink}`;
}