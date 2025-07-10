import { ADDRESSES } from "@constants/index";

export function ViewProjects() {
  const projectsFirstPage = `${ADDRESSES.STUDENT_PROJECTS.ROOT}/1`;

  return (
    <section className="container-fluid d-flex py-md-4 p-lg-5 p-3">
      <div className="container-md">
        <div className="row align-items-center justify-content-center">
          
          {/* Text Content */}
          <div className="col-12 col-md-6 text-center text-md-start fs-responsive px-4">
            <div className="col-md-9 card-body mx-auto px-2 px-md-0">
              
              {/* Hashtag */}
              <div className="d-none d-lg-flex justify-content-center justify-content-md-start mb-3">
                <span className="small btn-light-1 rounded-pill p-1 m-0">
                  #DevelopersSpace
                </span>
              </div>

              {/* Title */}
              <span className="color-dark-2 bolder hs-responsive">
                Your Space to Learn, Build, and Grow.
              </span>

              {/* Description */}
              <p className="color-dark-1 my-2">
                <span className="text-emphasize">
                  Computer Science Organization: Developers’ Space
                </span>{" "}
                is a digital hub for students of the Computer Science Department where we foster innovation, 
                collaboration, and academic excellence in the field of computing.
              </p>

              {/* Subtext */}
              <small className="color-dark-3 fst-italic mb-3 d-block">
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
