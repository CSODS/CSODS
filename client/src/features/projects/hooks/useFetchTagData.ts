import { useEffect, useState } from "react";
import { AuthHooks } from "@/core/auth";
import { IAllProjectTags } from "@/features/projects/types";
import { requestAllTags } from "../utils";

export function useFetchTagData() {
  const [allTags, setAllTags] = useState<IAllProjectTags | null>(null);
  const securedAxios = AuthHooks.useSecuredAxios();

  useEffect(() => {
    const loadTagData = async () => {
      const tagData = await requestAllTags(securedAxios);
      if (tagData) {
        setAllTags(tagData);
      }
    };
    loadTagData();
  }, [securedAxios]);

  return allTags;
}
