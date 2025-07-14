import { ADDRESSES } from "@/constants";
import { IProjectSearchParameters } from "@/types";

export function redirectToUrl(url: string) {
    window.open(url);
}

export function assembleQuery (searchParameters?: IProjectSearchParameters) {
    if (searchParameters) {
        const queryList = Object.entries(searchParameters).map(
            ([param, value]) => {
                const paramQuery = value !== undefined ? `${param}=${value}` : '';
                return paramQuery;
            }
        )

        const queryString = queryList.filter(query => query.trim() !== '').join('&');
        return queryString.trim() !== '' ? `?${queryString}` : '';
    }
    return '';
}

export function getProjectsPageLink (pageNumber: number, searchParameters?: IProjectSearchParameters) {
    const root = ADDRESSES.STUDENT_PROJECTS.ROOT;
    const query = assembleQuery(searchParameters);
    const link = `${root}/${pageNumber}${query}`;
    return link;
};

export function getProjectLink(pageNumber: number, projectId: number, searchParameters?: IProjectSearchParameters) {
    const pagePath = `${ADDRESSES.STUDENT_PROJECTS.ROOT}/${pageNumber}`;
    const detailsPath = `${ADDRESSES.PROJECT_DETAILS.ROOT}/${projectId}`;
    const query = assembleQuery(searchParameters);
    return `${pagePath}${detailsPath}${query}`;
}