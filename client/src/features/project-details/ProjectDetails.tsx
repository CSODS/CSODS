import { useState } from "react";
import { DEFAULT_USER } from "@constants/defaults";
import { useFetchProject, useFetchTagData } from "@/hooks";
import { IUser } from "@/types";
import { CoreContributors, ProjectImages, ProjectInformationCard, ProjectInformationProvider } from "./components";
import HeaderCard from "./components/HeaderCard";

export default function ProjectDetails() {
  const allTags = useFetchTagData();
  const project = useFetchProject();
  const [user] = useState<IUser>(DEFAULT_USER);

  if (allTags && project) { 
    return (
      <div className="px-0 d-flex flex-column justify-content-center align-items-center">
        <ProjectInformationProvider allTags={allTags} project={project} user={user}>
          <HeaderCard/>
          <div className="mt-3 m-0 row row-cols-lg-2 w-100">
            <div className="col-lg-4">
              <CoreContributors/>
            </div>
            <div className="col-lg-8">
              <ProjectInformationCard/>
              <ProjectImages/>
            </div>
          </div>
        </ProjectInformationProvider>
      </div>
    )
  }
  else {
    return <p>no data</p>
  }
}