import { createContext, ReactNode, useMemo } from "react";
import { IAllProjectTags } from "@/types";

export const TotalPagesContext = createContext<number | undefined>(undefined);

export interface TotalPagesProviderProps {
    children: ReactNode;
    totalPages: number;
}

export function TotalPagesProvider({ children, totalPages }: TotalPagesProviderProps) {
    return (
        <TotalPagesContext.Provider value={totalPages}>
            {children}
        </TotalPagesContext.Provider>
    );
}

export const TagColorContext = createContext<Map<string, string> | undefined>(undefined);

export interface TagColorProviderProps {
    children: ReactNode;
    allTags: IAllProjectTags;
}

export function TagColorProvider({ children, allTags }: TagColorProviderProps) {
    const tagColorMap = useMemo(() => {
        const map = new Map<string, string>();

        allTags.DevTypes.forEach((dt) => { map.set(dt.DevTypeName, 'color-light-1')});
        allTags.ProgrammingLanguages.forEach((pl) => { map.set(pl.LanguageName, 'color-neutral-1')});
        allTags.Frameworks.forEach((fw) => { map.set(fw.FrameworkName, 'color-util-alert')});
        allTags.DatabaseTechnologies.forEach((db) => { map.set(db.Database, 'color-neutral-2')});
        allTags.ApplicationIndustries.forEach((ai) => { map.set(ai.Industry, 'color-dark-4')});
        
        return map;
    }, [allTags])
    
    return (
        <TagColorContext.Provider value={tagColorMap}>
            {children}
        </TagColorContext.Provider>
    )
}