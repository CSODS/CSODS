import React from "react";

export function CarouselIndicators({
  count,
  carouselId
}: {
  count: number;
  carouselId: string;
}) {
  return (
    <div className="carousel-indicators">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          data-bs-target={`#${carouselId}`}
          data-bs-slide-to={i}
          className={i === 0 ? "active" : ""}
          aria-current={i === 0 ? "true" : undefined}
          aria-label={`Slide ${i + 1}`}
        />
      ))}
    </div>
  );
}

export default CarouselIndicators;
