import { useState } from "react";
import { IUser } from "@/types";
import { useFetchProject, useFetchTagData } from "@/hooks";
import { DEFAULT_USER } from "@constants/defaults";
import CoreContributors from "./components/CoreContributors";
import ProjectInformationProvider from "./components/ProjectDetailsProvider";
import ProjectInformationCard from "./components/ProjectInformation";
import ProjectImages from "./components/ProjectImages";

export default function ProjectDetails() {
  const allTags = useFetchTagData();
  const project = useFetchProject();
  const [user] = useState<IUser>(DEFAULT_USER);

  if (allTags && project) { 
    return (
      <div className="px-lg-5 px-0 d-flex flex-column justify-content-center align-items-center">
        <ProjectInformationProvider allTags={allTags} project={project} user={user}>
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