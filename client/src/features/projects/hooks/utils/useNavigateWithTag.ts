import { useNavigate } from "react-router-dom";
import { useTagCategoryMap } from "@/features/projects/hooks";
import { getProjectsPageLink } from "@/features/projects/utils";
import { IProjectSearchParameters } from "@/features/projects/types";

export function useNavigateWithTag(tag: string): () => void {
  const tagCategoryMap = useTagCategoryMap();
  const tagDetails = tagCategoryMap.get(tag);

  const navigate = useNavigate();
  const callBackfn = () => {
    if (tagDetails) {
      const tagCategory = tagDetails.tagCategory;
      const tagId = tagDetails.tagId;
      const searchParameters = { [tagCategory]: tagId };
      const link = getProjectsPageLink(
        1,
        searchParameters as IProjectSearchParameters
      );
      navigate(link);
    }
  };

  return callBackfn;
}
