import { useState } from "react";
import { DEFAULT_USER } from "@constants/defaults";
import { useFetchProject, useFetchTagData } from "@/hooks";
import { IUser } from "@/types";
import { ProjectInformationProvider } from "./components";
import HeaderCard from "./components/HeaderCard";
import About from "./components/About";

export default function ProjectDetails() {
  const allTags = useFetchTagData();
  const project = useFetchProject();
  const [user] = useState<IUser>(DEFAULT_USER);

  if (allTags && project) { 
    return (
      <div className="container-fluid p-0">
        <ProjectInformationProvider allTags={allTags} project={project} user={user}>
          <div className="row m-0 p-0">
            <HeaderCard/>
          </div>
          <div className="row row-cols-sm-2 row-cols-1 m-0 mt-sm-3 mt-2 px-sm-2 p-0">
            <div className="col px-sm-3 px-2">
              <About/>
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