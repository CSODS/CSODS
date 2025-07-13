import { useState } from "react";
import { DEFAULT_USER } from "@constants/defaults";
import { useFetchProject, useFetchTagData } from "@/hooks";
import { IUser } from "@/types";
import { ProjectImages, ProjectInformationProvider } from "./components";
import HeaderCard from "./components/HeaderCard";
import About from "./components/About";
import GitHubStatistics from "./components/GitHubStatistics";
import Contributors from "./components/CoreContributors";

export default function ProjectDetails() {
  const allTags = useFetchTagData();
  const project = useFetchProject();
  const [user] = useState<IUser>(DEFAULT_USER);

  if (allTags && project) { 
    return (
      <div className="container-fluid p-0">
        <ProjectInformationProvider allTags={allTags} project={project} user={user}>
          
          <section className="row m-0 p-0">
            <HeaderCard/>
          </section>

          <section className="row m-0 mt-sm-3 mt-2 px-sm-4 p-0 row-cols-sm-2 row-cols-1 row-gap-2">
            <div className="col-sm-5 px-sm-2 px-1">
              <About/>
            </div>
            <div className="col-sm-7 px-sm-2 px-1">
              <ProjectImages/>
            </div>
          </section>

          <section className="row m-0 mt-sm-3 mt-2 p-0 px-sm-3 px-1">
            <GitHubStatistics/>
          </section>

          <section className="row m-0 mt-sm-3 mt-2 p-0 px-sm-3 px-1">
            <div className="col-md-6 m-0 p-0">
              <Contributors/>
            </div>
            <div className="col-md-6 m-0 p-0">

            </div>
          </section>
        </ProjectInformationProvider>
      </div>
    )
  }
  else {
    return <p>no data</p>
  }
}