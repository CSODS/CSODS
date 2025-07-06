import CarouselWrapper from "./carousel/CarouselWrapper";
import { ViewProjects } from "./carousel/slides/ViewProjects";
import { ViewProjectsV2 } from "./carousel/slides/ViewProjectsV2";
import { GeneralAssembly } from "./carousel/slides/GeneralAssembly";

export default function Home() {
  return (
    <CarouselWrapper>
      {[<GeneralAssembly />, <ViewProjectsV2/>]}
    </CarouselWrapper>
  );
}