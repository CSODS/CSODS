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

export function useAllTags() {
    const tagsContext = useContext(AllTagsContext);
    if (!tagsContext) {
        const errMsg = 'Function useAllTags must be used inside an AllTagsProvider component.';
        throw new Error(errMsg);
    }
    return tagsContext;
}