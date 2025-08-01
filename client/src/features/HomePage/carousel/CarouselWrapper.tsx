import { useEffect } from "react";
import CarouselIndicators from "./CarouselIndicators";
import CarouselSlides from "./CarouselSlides";

export function CarouselWrapper({ children, carouselId = "mainCarousel" } : { children: React.ReactNode[]; carouselId?: string;}) {
  useEffect(() => {
    const setUniformCarouselHeight = () => {
      const items = document.querySelectorAll<HTMLElement>(".carousel-item");
      let maxHeight = 0;

      items.forEach((item) => {
        item.style.height = "auto"; // reset
        if (item.offsetHeight > maxHeight) {
          maxHeight = item.offsetHeight;
        }
      });

      items.forEach((item) => {
        item.style.height = `${maxHeight}px`;
      });
    };

    setUniformCarouselHeight();
    window.addEventListener("resize", setUniformCarouselHeight);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", setUniformCarouselHeight);
    };
  }, []);
  
  return (
    <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
        <CarouselIndicators count={children.length} carouselId={carouselId} />
        <CarouselSlides>{children}</CarouselSlides>

        <button className="carousel-control-prev" style={{filter:"invert(1)"}} type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" style={{filter:"invert(1)"}} type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>

    </div>
  );
}

export default CarouselWrapper;