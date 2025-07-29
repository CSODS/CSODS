import { useEffect, useState } from "react";
import { IAllProjectTags } from "@/features/projects/types";
import { requestAllTags } from "../utils";

export function useFetchTagData() {
  const [allTags, setAllTags] = useState<IAllProjectTags | null>(null);

  useEffect(() => {
    const loadTagData = async () => {
      const tagData = await requestAllTags();
      if (tagData) {
        setAllTags(tagData);
      }
    };
    loadTagData();
  }, []);

  return allTags;
}
