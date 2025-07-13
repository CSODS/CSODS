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

          <section className="row m-0 mt-2 p-0 row-cols-lg-2 row-cols-1 row-gap-2">
            <div className="col-lg-4 px-1">
              <About/>
            </div>
            <div className="col-lg-8 px-1">

              <section className="d-grid row-gap-2">

                <div className="row m-0 row-gap-2 column-gap-2">
                  <div className="col-md p-0">
                    <ProjectImages/>
                  </div>
                  <div className="col-md p-0">
                    <Contributors/>
                  </div>
                </div>

                <div className="row m-0">
                  <GitHubStatistics/>
                </div>

              </section>

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