import { useEffect, useState } from "react";
import { AuthHooks } from "@/core/auth";
import { IAllProjectTags } from "@/features/projects/types";
import { requestAllTags } from "../utils";

export function useFetchTagData() {
  const [allTags, setAllTags] = useState<IAllProjectTags | null>(null);
  const securedAxios = AuthHooks.useSecuredAxios();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadTagData = async () => {
      const tagData = await requestAllTags(securedAxios, controller.signal);
      if (tagData) {
        setAllTags(tagData);
      }
    };
    loadTagData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return allTags;
}
