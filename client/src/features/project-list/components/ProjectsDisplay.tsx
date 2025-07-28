import { AllTagsProvider, TagCategoryProvider } from "@/components";
import { useFetchTagData } from "@/hooks";
import { SearchBar } from "./SearchBar";
import { ProjectList } from "./ProjectList";
import { useFetchProjectsPage } from "../hooks";
import { ProjectsPageProvider } from "../ProjectsPageProvider";

export function ProjectsDisplay() {
  const projectsPage = useFetchProjectsPage();
  const allTags = useFetchTagData();

  return projectsPage && allTags ? (
    <ProjectsPageProvider projectsPage={projectsPage}>
      <AllTagsProvider allTags={allTags}>
        <TagCategoryProvider allTags={allTags}>
          <SearchBar />
          <ProjectList />
        </TagCategoryProvider>
      </AllTagsProvider>
    </ProjectsPageProvider>
  ) : (
    <div>Under maintenance. Please try again later.</div>
  );
}
