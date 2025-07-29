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
  const { PROJECT_QUERY_PARAMETERS } = PROJECT;

  const tagCategoryMap = useMemo(() => {
    const map: tagMap = new Map();

    allTags.DevTypes.forEach((dt) => {
      map.set(dt.DevTypeName, {
        tagCategory: PROJECT_QUERY_PARAMETERS.DEVELOPMENT_TYPE,
        tagId: dt.DevTypeId,
      });
    });
    allTags.ProgrammingLanguages.forEach((pl) => {
      map.set(pl.LanguageName, {
        tagCategory: PROJECT_QUERY_PARAMETERS.PROGRAMMING_LANGUAGE,
        tagId: pl.LanguageId,
      });
    });
    allTags.DatabaseTechnologies.forEach((db) => {
      map.set(db.Database, {
        tagCategory: PROJECT_QUERY_PARAMETERS.DATABASE_TECHNOLOGY,
        tagId: db.DatabaseId,
      });
    });
    allTags.ApplicationIndustries.forEach((ai) => {
      map.set(ai.Industry, {
        tagCategory: PROJECT_QUERY_PARAMETERS.APPLICATION_INDUSTRY,
        tagId: ai.IndustryId,
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
