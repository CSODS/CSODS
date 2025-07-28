import { AllTagsProvider, TagCategoryProvider } from "@/components";
import { useFetchTagData } from "@/hooks";
import { SearchBar } from "./SearchBar";
import { ProjectList } from "./ProjectList";

export function ProjectsDisplay() {
  const allTags = useFetchTagData();

  if (allTags) {
    return (
      <AllTagsProvider allTags={allTags}>
        <TagCategoryProvider allTags={allTags}>
          <SearchBar />
          <ProjectList />
        </TagCategoryProvider>
      </AllTagsProvider>
    );
  } else {
    return <div></div>;
  }
}
