import { ADDRESSES } from "@constants/index";

export function ViewProjects() {
  const projectsFirstPage = `${ADDRESSES.STUDENT_PROJECTS.ROOT}/1`;

  return (
    <section className="container-fluid d-flex p-lg-5 py-4 px-3 pb-md-5">
      <div className="container-md">
        <div className="row g-4 align-items-center justify-content-center">
          
          {/* Text Content */}
          <div className="col-12 col-md-6 text-center text-md-start px-4">
            <div className="col-md-9 card-body mx-auto px-2 px-md-0">
              
              {/* Hashtag */}
              <div className="d-none d-md-flex justify-content-center justify-content-md-start mb-2">
                <p className="btn-light-1 rounded-pill p-1 p-md-2 m-0">
                  #DevelopersSpace
                </p>
              </div>

              {/* Title */}
              <h3 className="color-dark-2 bolder hs-responsive p-1">
                Your Space to Learn, Build, and Grow.
              </h3>

              {/* Description */}
              <p className="color-dark-1 m-2">
                <span className="text-emphasize">
                  Computer Science Organization: Developers’ Space
                </span>{" "}
                is a digital hub for students of the Computer Science Department where we foster innovation, 
                collaboration, and academic excellence in the field of computing. 
              </p>

              {/* Subtext */}
              <small className="color-dark-3 fst-italic mb-md-3 d-block">
                Explore. Learn. Contribute.
              </small>

              {/* View Projects Button */}
              <div className="mt-2">
                <a
                  href={projectsFirstPage}
                  className="btn btn-dark-1 rounded-pill px-4 d-inline-flex align-items-center"
                >
                  <span className="small me-2">View Projects</span>
                  <i className="bi bi-arrow-right-circle"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Desktop Image */}
          <div className="col-md-6 d-none d-md-flex justify-content-center">
            <img
              src="/homepage_img.png"
              alt="Developer's Space"
              className="img-fluid rounded-3"
              style={{ maxHeight: "300px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ViewProjects;
