export function CarouselSlides({ children }:{ children: React.ReactNode[] }) {
  return (
    <div className="carousel-inner">
        {children.map((child, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                {child}
            </div>
        ))}
    </div>
  );
    
}

export default CarouselSlides;
