import { createContext, ReactNode } from "react";
import { IAllProjectTags } from "../types";

type AllTagsProviderProps = {
  children: ReactNode;
  allTags: IAllProjectTags;
};

export const AllTagsContext = createContext<IAllProjectTags | null>(null);

export function AllTagsProvider({ children, allTags }: AllTagsProviderProps) {
  return (
    <AllTagsContext.Provider value={allTags}>
      {" "}
      {children}{" "}
    </AllTagsContext.Provider>
  );
}
