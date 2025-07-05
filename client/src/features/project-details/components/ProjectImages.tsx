import { useContext, useState } from "react";
import { ProjectDetailsContext } from "@components/shared/Providers";
import { DEFAULTS } from "@/constants";

const DEFAULT_PROJECT_IMAGES = DEFAULTS.DEFAULT_PROJECT_IMAGES;

export default function ProjectImages() {
    const project = useContext(ProjectDetailsContext);

    const [imageLinks] = useState<string[]>(DEFAULT_PROJECT_IMAGES);

    return(
        <div className="mt-4 p-0 col border border-light-1 rounded-3 ratio ratio-16x9">
            <ImageCarousel imageLinks={imageLinks}/>
            {/* <div className="m-0 p-0 mb-2 row fw-bold">
                <div className="fs-1 fw-bolder text-start">
                    Project Images
                </div>
            </div>
            <div className="m-0 p-0 row">
                <div className="col-lg-8">
                    <ImageCarousel imageLinks={imageLinks}/>
                </div>
                <div className="ms-5 col-lg-2">
                    <ImageSet imageLinks={imageLinks}/>
                </div>
            </div> */}
        </div>

    );
}

//#region Carousel

interface ImageCarouselProps {
    imageLinks: string[];
};

export function ImageCarousel({
    imageLinks
}: ImageCarouselProps) {
    const imgCount = imageLinks.length;

    const carouselId ="projectImgCarousel";

    return (
        <div id={carouselId} className="carousel slide rounded-3 overflow-hidden">
            <CarouselIndicators btnCount={imgCount} carouselId={carouselId}/>
            <CarouselSlides imgLinks={imageLinks}/>
            <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

interface CarouselIndicatorProps {
    btnCount: number
    carouselId: string
}

function CarouselIndicators({
    btnCount,
    carouselId
}: CarouselIndicatorProps) {
    const buttons = new Array(btnCount).fill(0);

    return (
        <div className="carousel-indicators">
            {
                buttons.map((_, index) => {
                    const isActive = index === 0;

                    return (
                        <button 
                            type="button" 
                            data-bs-target={`#${carouselId}`} 
                            data-bs-slide-to={index}
                            className={isActive ? "active": ""}
                            aria-current={isActive ? "true": undefined}
                            aria-label={`img${index+1}`}
                        >{index}</button>
                    )
                })
            }
        </div>
    )
}

interface CarouselSlidesProps {
    imgLinks: string[]
}

function CarouselSlides({
    imgLinks
}: CarouselSlidesProps) {
    return (
        <div className="carousel-inner">
            {
                imgLinks.map((link, index) => {
                    const activeSelector = index === 0 ? 'active' : '';
                    return(
                        <div key={index} className={`carousel-item ${activeSelector}`}>
                            <img src={link} className="d-block w-100" alt="..."/>
                        </div>
                    )
                })
            }
        </div>        
    )
}

//#endregion Carousel

//#region ImageSet

interface ImageSetProps extends ImageCarouselProps {};

function ImageSet({
    imageLinks
}: ImageSetProps) {
    return(
        <div className="pt-2 row w-100 row-cols-1 row-gap-4">
            {
                imageLinks.map((value, index) => {
                    const cardId = `img-${index + 1}`;
                    return <ImageCard imageLink={value} cardId={cardId}/>
                })
            }
        </div>
    );
}

interface ImageCardProps {
    imageLink: string,
    cardId: string
}

function ImageCard({
    imageLink,
    cardId
}: ImageCardProps) {
    return (
        <div id={cardId} className="p-0 col card project-card-dark-4 translucent-70 rounded-3 overflow-hidden">
            <img src={imageLink} className="d-block w-100" alt={cardId}/>
        </div>
    );
}

//#endregion ImageSet

