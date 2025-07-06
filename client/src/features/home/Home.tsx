import CarouselWrapper from "./carousel/CarouselWrapper";
import { ViewProjects } from "./carousel/slides/ViewProjects";
import { GeneralAssembly } from "./carousel/slides/GeneralAssembly";

export default function Home() {
  return (
    <CarouselWrapper>
      {[<ViewProjects />, <GeneralAssembly />]}
    </CarouselWrapper>
  );
}