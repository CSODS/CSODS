export function LatestNews() {
  return (
    <section className="container-md p-2">
      <div className="row align-items-center px-md-5 px-3">

        {/* Mobile Title */}
        <h2 className="d-flex d-md-none hs-responsive justify-content-center bolder my-3">
          Latest News
        </h2>  

        {/* Image Column */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img 
            src="latest-news.jpg" 
            alt="latest-news" 
            className="img-fluid" 
            style={{ maxHeight: "300px" }}
          />
        </div>

        {/* Text Column */}
        <div className="col-md-6 text-md-start">
          
          {/* Desktop Title and Description */}
          <div className="d-none d-md-flex flex-column">
            <h2 className="hs-responsive bolder mb-3">Latest News</h2>
            <p className="mb-4">
              Stay updated with the latest news and events from the Laguna University - Computer Science Department.
            </p>
          </div>

          {/* Link */}
          <p className="text-md-start text-center mt-2 mt-md-0">
            <a 
              href="https://www.facebook.com/LUCSDepartment" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="color-light-1 text-decoration-underline"
            >
              Visit CS Department FB Page
              <i className="bi bi-arrow-right ms-2"></i>
            </a>
          </p>

        </div>

      </div>
    </section>
  );
}

export default LatestNews;
