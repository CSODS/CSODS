import { ProjectDataServiceContext } from "@/components/shared/Providers";
import { useContext } from "react";

export function useProjectDataService() {
    const projectDataServiceContext = useContext(ProjectDataServiceContext);
    if (!projectDataServiceContext) {
        const errMsg = 'Function useProjectDataService must be used inside a ProjectDataServiceProvider component.';
        throw new Error(errMsg);
    }
    return projectDataServiceContext;
}