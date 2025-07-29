import {
  AllTagsProvider,
  TagCategoryProvider,
} from "@features/projects/providers";
import { useFetchTagData } from "@features/projects/hooks";
import { useFetchProjectsPage } from "./hooks";
import Paginator from "./Paginator";
import ProjectList from "./ProjectList";
import ProjectsPageProvider from "./ProjectsPageProvider";
import SearchBar from "./SearchBar";

export function ProjectsDisplay() {
  const projectsPage = useFetchProjectsPage();
  const allTags = useFetchTagData();

  return projectsPage && allTags ? (
    <ProjectsPageProvider projectsPage={projectsPage}>
      <AllTagsProvider allTags={allTags}>
        <TagCategoryProvider allTags={allTags}>
          <SearchBar />
          <ProjectList />
          <Paginator />
        </TagCategoryProvider>
      </AllTagsProvider>
    </ProjectsPageProvider>
  ) : (
    <div>Under maintenance. Please try again later.</div>
  );
}
