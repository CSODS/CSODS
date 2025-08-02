export function CarouselSlides({ children }:{ children: React.ReactNode[] }) {
  return (
    <div className="carousel-inner">
        {children.map((child, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""} bg-light-1 translucent-70`}>
                {child}
            </div>
        ))}
    </div>
  );
    
}

export default CarouselSlides;
