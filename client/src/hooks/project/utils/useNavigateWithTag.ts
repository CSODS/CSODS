import { useNavigate } from "react-router-dom";
import { useTagCategoryMap } from "@/hooks";
import { getProjectsPageLink } from "@/utils";
import { IProjectSearchParameters } from "@/types";

export function useNavigateWithTag(tag: string): () => void {
    const tagCategoryMap = useTagCategoryMap();
    const tagDetails = tagCategoryMap.get(tag);

    const navigate = useNavigate();
    const callBackfn = () => {
        if (tagDetails) {
            const tagCategory = tagDetails.tagCategory;
            const tagId = tagDetails.tagId;
            const searchParameters = { [tagCategory]: tagId };
            const link = getProjectsPageLink(1, searchParameters as IProjectSearchParameters);
            navigate(link);
        }
    }

    return callBackfn;
}