import { useRef, useState } from "react";
import { PROJECT } from "@features/projects/constants";
import { useFetchTagData } from "@features/projects/hooks";
import { IProjectOwner } from "@features/projects/types";
import {
  About,
  Contributors,
  GitHubStatistics,
  HeaderCard,
  ProjectImages,
  ProjectInformationProvider,
} from "./components";
import { useFetchProject, useSetUniformHeights } from "./hooks";

export function ProjectDetails() {
  const { DEFAULT_USER } = PROJECT;

  const allTags = useFetchTagData();
  const project = useFetchProject();
  const [user] = useState<IProjectOwner>(DEFAULT_USER);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contributorsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const subContainerRef = useRef<HTMLDivElement>(null);

  useSetUniformHeights(
    allTags,
    project,
    galleryRef,
    contributorsRef,
    aboutRef,
    subContainerRef
  );

  return allTags && project ? (
    <div className="container-fluid p-0">
      <ProjectInformationProvider
        allTags={allTags}
        project={project}
        user={user}
      >
        <section className="row m-0 p-0">
          <HeaderCard />
        </section>

        <section className="row m-0 mt-1 p-0 row-cols-lg-2 row-cols-1 row-gap-1">
          <div className="col-lg-4 px-1">
            <About aboutRef={aboutRef} />
          </div>
          <div className="col-lg-8 px-1">
            <section ref={subContainerRef} className="d-grid row-gap-1">
              <div className="row m-0 row-gap-1 column-gap-2">
                <div className="col-md p-0">
                  <ProjectImages galleryRef={galleryRef} />
                </div>
                <div className="col-md p-0">
                  <Contributors contributorsRef={contributorsRef} />
                </div>
              </div>

              <div className="row m-0 order-md-last order-first">
                <GitHubStatistics />
              </div>
            </section>
          </div>
        </section>
      </ProjectInformationProvider>
    </div>
  ) : (
    <div>Under maintenance. Please try again later.</div>
  );
}
