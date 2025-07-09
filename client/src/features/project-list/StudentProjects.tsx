import { useFetchTagData } from "@/hooks";
import { AllTagsProvider, TagCategoryProvider } from "@/components";
import { Header, SearchBar, ProjectList, UpButton } from "./components";

export default function StudentProjects() {
  return (
    <div>
      <Header/>
      <ProjectsDisplay/>
      <UpButton/>
    </div>  
  );
}

function ProjectsDisplay() {
  const allTags = useFetchTagData();
  
  if (allTags) {
    return (
      <AllTagsProvider allTags={allTags}>
        <TagCategoryProvider allTags={allTags}>
          <SearchBar/>
          <ProjectList/>
        </TagCategoryProvider>
      </AllTagsProvider>
    )
  }
  else {
    return <div></div>
  }
}