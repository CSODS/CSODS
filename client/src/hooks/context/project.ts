import { AllTagsContext, ProjectDetailsContext, ProjectListContext } from "@/components";
import { useContext } from "react";

export function useProjectList() {
    const projectListContext = useContext(ProjectListContext);
    if (!projectListContext) {
        const errMsg = 'Function useProjectList must be used inside a ProjectListProvider component.';
        throw new Error(errMsg);
    }
    return projectListContext;
}

export function useProjectDetails() {
    const projectDetailsContext = useContext(ProjectDetailsContext);
    if (!projectDetailsContext) {
        const errMsg = 'Function useProjectDetailsContext must be used inside a ProjectDetailsProvider component.';
        throw new Error(errMsg);
    }
    return projectDetailsContext;
}

export function useTags() {
    const tagsContext = useContext(AllTagsContext)
}