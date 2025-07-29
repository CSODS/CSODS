import { useContext } from "react";
import { AllTagsContext } from "@features/projects/providers";

export function useAllTags() {
  const tagsContext = useContext(AllTagsContext);
  if (!tagsContext) {
    const errMsg =
      "Function useAllTags must be used inside an AllTagsProvider component.";
    throw new Error(errMsg);
  }
  return tagsContext;
}
