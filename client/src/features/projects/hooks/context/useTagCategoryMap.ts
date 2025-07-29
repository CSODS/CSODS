import { useContext } from "react";
import { TagCategoryContext } from "@features/projects/providers";

export function useTagCategoryMap() {
  const tagCategoryMap = useContext(TagCategoryContext);
  if (!tagCategoryMap) {
    const errMsg =
      "Function useTagCategoryMap must be used inside a TagCategoryProvider component.";
    throw new Error(errMsg);
  }
  return tagCategoryMap;
}
