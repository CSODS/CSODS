import { AllTagsContext, ProjectDetailsContext, ProjectListContext, TagCategoryContext } from "@/components";
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
        const errMsg = 'Function useProjectDetails must be used inside a ProjectDetailsProvider component.';
        throw new Error(errMsg);
    }
    return projectDetailsContext;
}

export function useTagCategoryMap() {
    const tagCategoryMap = useContext(TagCategoryContext);
    if (!tagCategoryMap) {
        const errMsg = 'Function useTagCategoryMap must be used inside a TagCategoryProvider component.';
        throw new Error(errMsg);
    }
    return tagCategoryMap;
}

export function useAllTags() {
    const tagsContext = useContext(AllTagsContext);
    if (!tagsContext) {
        const errMsg = 'Function useAllTags must be used inside an AllTagsProvider component.';
        throw new Error(errMsg);
    }
    return tagsContext;
}