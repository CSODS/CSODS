import { PROJECT_QUERY_PARAMETERS } from "@/constants";
import { IProjectSearchParameters } from "@/types";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export function usePageNumber() {
    const { pageNumber } = useParams<{ pageNumber: string }>();
    if (!pageNumber) {
        const errMsg = 'Missing route parameter: pageNumber';
        throw new Error(errMsg);
    }
    return Number(pageNumber);
}

export function useProjectId() {
    const { projectId } = useParams<{ projectId: string }>();
    if (!projectId) {
        const errMsg = 'Missing route parameter: pageNumber';
        throw new Error(errMsg);
    }
    return Number(projectId);
}

export function useProjectSearchParams() {
    const [searchParameters] = useSearchParams();
    const [projectSearchParameters, setProjectSearchParameters] = useState<IProjectSearchParameters | undefined>(undefined);
    useEffect(() => {
        const projectSearchParameters: IProjectSearchParameters = {};
        Object.values(PROJECT_QUERY_PARAMETERS).forEach(
            (paramName) => {
                const paramValue = searchParameters.get(paramName);
                if (paramValue) {
                    projectSearchParameters[paramName] = paramValue;
                }
        });
        setProjectSearchParameters(projectSearchParameters);
    }, [searchParameters]);

    return projectSearchParameters;
}