import { ADDRESSES } from "@/constants";

export function getProjectLink(pageNumber: number, projectId: number) {
    const pageLink = `${ADDRESSES.STUDENT_PROJECTS.ROOT}/${pageNumber}`;
    const detailsLink = `${ADDRESSES.PROJECT_DETAILS.ROOT}/${projectId}`;
    return `${pageLink}${detailsLink}`;
}