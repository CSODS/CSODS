import { useEffect, useState } from "react";
import { IAllProjectTags } from "@/types";
import { ApiHandler } from "@/utils";

export function useFetchTagData() {
  const [allTags, setAllTags] = useState<IAllProjectTags>();

  useEffect(() => {
    const apiHandler = new ApiHandler();
    const loadTagData = async () => {
      const tagData = await apiHandler.GetAllTags();
      if (tagData) {
        setAllTags(tagData);
      }
    };
    loadTagData();
  }, []);

  return allTags;
}
