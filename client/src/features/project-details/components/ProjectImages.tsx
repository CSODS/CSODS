import { useState } from "react";
import { DEFAULTS } from "@/constants";
import { useProjectDetails } from "@/hooks";

const DEFAULT_PROJECT_IMAGES = DEFAULTS.DEFAULT_PROJECT_IMAGES;

interface ProjectImagesProps {
  galleryRef?: React.RefObject<HTMLDivElement | null>;
}

export function ProjectImages({ galleryRef }: ProjectImagesProps) {
  const project = useProjectDetails();

  const [imageLinks] = useState<string[]>(DEFAULT_PROJECT_IMAGES);

  return (
    <div
      ref={galleryRef}
      className="px-3 p-2 card card-frost-gradient-2 hover-shadow border border-0 rounded-2"
    >
      <h2 className="m-0 pb-1 p-0 border-bottom border-2 border-frost-midnight fw-bold text-start color-frost-midnight">
        Gallery
      </h2>
      <section className="m-0 mt-2 ratio ratio-16x9">
        <ImageCarousel imageLinks={imageLinks} />
        {/* <Gallery imageLinks={imageLinks}/> */}
      </section>
    </div>
  );
}

interface GalleryProps {
  imageLinks: string[];
}

function Gallery({ imageLinks }: GalleryProps) {
  return (
    <div className="row m-0 p-0 w-100">
      <div className="col m-0 p-0 d-flex flex-wrap align-items-start">
        {imageLinks.map((link, index) => {
          return (
            <div
              key={`img-${index}`}
              className="me-2 mb-1 bg-frost-midnight rounded-3"
            >
              <img
                src={link}
                alt="..."
                style={{ width: "150px", height: "150px" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

//#region Carousel

interface ImageCarouselProps {
  imageLinks: string[];
}

export function ImageCarousel({ imageLinks }: ImageCarouselProps) {
  const imgCount = imageLinks.length;

  const carouselId = "projectImgCarousel";

  return (
    <div
      id={carouselId}
      className="m-0 p-0 carousel slide rounded-1 overflow-hidden"
    >
      <CarouselIndicators btnCount={imgCount} carouselId={carouselId} />
      <CarouselSlides imgLinks={imageLinks} />
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#${carouselId}`}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#${carouselId}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

interface CarouselIndicatorProps {
  btnCount: number;
  carouselId: string;
}

function CarouselIndicators({ btnCount, carouselId }: CarouselIndicatorProps) {
  const buttons = new Array(btnCount).fill(0);

  return (
    <div className="carousel-indicators">
      {buttons.map((_, index) => {
        const btnKey = `indicator-${index}`;
        const isActive = index === 0;

        return (
          <button
            type="button"
            key={btnKey}
            data-bs-target={`#${carouselId}`}
            data-bs-slide-to={index}
            className={isActive ? "active" : ""}
            aria-current={isActive ? "true" : undefined}
            aria-label={`img${index + 1}`}
          >
            {index}
          </button>
        );
      })}
    </div>
  );
}

interface CarouselSlidesProps {
  imgLinks: string[];
}

function CarouselSlides({ imgLinks }: CarouselSlidesProps) {
  return (
    <div className="carousel-inner">
      {imgLinks.map((link, index) => {
        const activeSelector = index === 0 ? "active" : "";
        return (
          <div key={index} className={`carousel-item ${activeSelector}`}>
            <div className="d-flex justify-content-center align-items-center">
              <img src={link} className="w-100" alt="..." />
            </div>
          </div>
        );
      })}
    </div>
  );
}

//#endregion Carousel

//#region ImageSet

interface ImageSetProps extends ImageCarouselProps {}

function ImageSet({ imageLinks }: ImageSetProps) {
  return (
    <div className="pt-2 row w-100 row-cols-1 row-gap-4">
      {imageLinks.map((value, index) => {
        const cardId = `img-${index + 1}`;
        return <ImageCard imageLink={value} cardId={cardId} />;
      })}
    </div>
  );
}

interface ImageCardProps {
  imageLink: string;
  cardId: string;
}

function ImageCard({ imageLink, cardId }: ImageCardProps) {
  return (
    <div
      id={cardId}
      className="p-0 col card project-card-dark-4 translucent-70 rounded-3 overflow-hidden"
    >
      <img src={imageLink} className="d-block w-100" alt={cardId} />
    </div>
  );
}

//#endregion ImageSet
