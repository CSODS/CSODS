import CarouselWrapper from "./carousel/CarouselWrapper";
import { ViewProjects } from "./carousel/slides/ViewProjects";
import { GeneralAssembly } from "./carousel/slides/GeneralAssembly";
import { LatestNews } from "./components/LatestNews";
import { WelcomeToCSODS } from "./components/WelcomeToCSODS";

export default function Home() {
  return (
    <main className="fs-responsive">
      <CarouselWrapper>
        {[<ViewProjects />, <GeneralAssembly />]}
      </CarouselWrapper>
      
      <div className="d-flex justify-content-center align-items-center mt-4 p-lg-5">
        <LatestNews />
      </div>

      <div className="d-flex justify-content-center align-items-center mt-4 px-2">
        <WelcomeToCSODS />
      </div>

    </main>
  );
}
