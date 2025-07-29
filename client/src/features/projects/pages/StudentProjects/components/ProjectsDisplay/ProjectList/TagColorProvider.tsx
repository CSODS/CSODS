import { createContext, ReactNode, useMemo } from "react";
import { IAllProjectTags } from "@features/projects/types";

export const TagColorContext = createContext<Map<string, string> | undefined>(
  undefined
);

export interface TagColorProviderProps {
  children: ReactNode;
  allTags: IAllProjectTags;
}

export default function TagColorProvider({
  children,
  allTags,
}: TagColorProviderProps) {
  const tagColorMap = useMemo(() => {
    const map = new Map<string, string>();

    allTags.devTypes.forEach((dt) => {
      map.set(dt.devTypeName, "color-util-error");
    });
    allTags.programmingLanguages.forEach((pl) => {
      map.set(pl.languageName, "color-neutral-1");
    });
    allTags.frameworks.forEach((fw) => {
      map.set(fw.frameworkName, "color-util-alert");
    });
    allTags.databaseTechnologies.forEach((db) => {
      map.set(db.database, "color-util-notify");
    });
    allTags.applicationIndustries.forEach((ai) => {
      map.set(ai.industry, "color-neutral-2");
    });

    return map;
  }, [allTags]);

  return (
    <TagColorContext.Provider value={tagColorMap}>
      {children}
    </TagColorContext.Provider>
  );
}
