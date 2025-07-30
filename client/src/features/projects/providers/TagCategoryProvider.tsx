import { createContext, ReactNode, useMemo } from "react";
import { IAllProjectTags } from "../types";
import { PROJECT } from "../constants";

interface TagCategoryProviderProps {
  children: ReactNode;
  allTags: IAllProjectTags;
}

type tagMap = Map<string, tagDetails>;

interface tagDetails {
  tagCategory: string;
  tagId: number;
}

export const TagCategoryContext = createContext<tagMap | null>(null);

export function TagCategoryProvider({
  children,
  allTags,
}: TagCategoryProviderProps) {
  const tagCategoryMap = useMemo(() => {
    const { PROJECT_QUERY_PARAMETERS } = PROJECT;
    const map: tagMap = new Map();

    allTags.devTypes.forEach((dt) => {
      map.set(dt.devTypeName, {
        tagCategory: PROJECT_QUERY_PARAMETERS.DEVELOPMENT_TYPE,
        tagId: dt.devTypeId,
      });
    });
    allTags.programmingLanguages.forEach((pl) => {
      map.set(pl.languageName, {
        tagCategory: PROJECT_QUERY_PARAMETERS.PROGRAMMING_LANGUAGE,
        tagId: pl.languageId,
      });
    });
    allTags.databaseTechnologies.forEach((db) => {
      map.set(db.database, {
        tagCategory: PROJECT_QUERY_PARAMETERS.DATABASE_TECHNOLOGY,
        tagId: db.databaseId,
      });
    });
    allTags.applicationIndustries.forEach((ai) => {
      map.set(ai.industry, {
        tagCategory: PROJECT_QUERY_PARAMETERS.APPLICATION_INDUSTRY,
        tagId: ai.industryId,
      });
    });
    //  TODO: ADD FRAMEWORKS TO THE TAG CATEGORIES WHEN THE BACK-END SUPPORTS IT.

    return map;
  }, [allTags]);

  return (
    <TagCategoryContext.Provider value={tagCategoryMap}>
      {children}
    </TagCategoryContext.Provider>
  );
}
