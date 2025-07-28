import { createContext, ReactNode, useMemo } from "react";
import { IAllProjectTags } from "@/types";

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

    allTags.DevTypes.forEach((dt) => {
      map.set(dt.DevTypeName, "color-util-error");
    });
    allTags.ProgrammingLanguages.forEach((pl) => {
      map.set(pl.LanguageName, "color-neutral-1");
    });
    allTags.Frameworks.forEach((fw) => {
      map.set(fw.FrameworkName, "color-util-alert");
    });
    allTags.DatabaseTechnologies.forEach((db) => {
      map.set(db.Database, "color-util-notify");
    });
    allTags.ApplicationIndustries.forEach((ai) => {
      map.set(ai.Industry, "color-neutral-2");
    });

    return map;
  }, [allTags]);

  return (
    <TagColorContext.Provider value={tagColorMap}>
      {children}
    </TagColorContext.Provider>
  );
}
