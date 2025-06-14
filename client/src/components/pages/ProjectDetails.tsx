import { useState } from "react";

export default function ProjectDetails() {
  const [sampleProject] = useState({
    ProjectId: 1,
    ProjectNumber: 2310227,
    ProjectName: "Nexus Banking",
    ProjectOwner: "Julius Trinidad",
    ProjectDescription: "A Banking App in C#",
    ProjectUrl: "https://github.com/zeraus00/E_Banking_System.git"
  });

  const [projectDetails] = useState({
    Contributors: [
      {Username: "steins0668", Role: "Contributor", Subrole: "Backend Dev"},
      {Username: "eounaria", Role: "Contributor", Subrole: "Frontend Dev"},
      {Username: "zeraus00", Role: "Owner", Subrole: "Fullstack Dev"}
    ],
    Tags: ["C#", "Blazor Web App", "Web Application", "Web Dev", "SQL"]
  });

  return (
    <div className='d-flex flex-column'>
      {/* header container */}
      <div className='p-0 mt-2 mb-5 d-flex flex-column align-items-center justify-content-center'>
        <h1 className='fs-1 bolder color-light-2 text-shadow-m'>{sampleProject.ProjectName}</h1>
        <div className='fs-5 fw-bold color-light-2'>
          {sampleProject.ProjectOwner}
        </div>
        <div className='col-md-11 mt-3 mx-2 px-3 py-4 rounded-4 bg-dark-1 border border-light-1 text-light text-start' style={{maxWidth:1400}}>
          {sampleProject.ProjectDescription}
          {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Cras a nisl eros. Nullam elit augue, vulputate at auctor id, interdum in nisi. 
          Vestibulum et purus pellentesque, efficitur sapien in, mattis sapien. 
          Proin blandit mattis mi nec lacinia. Nulla commodo, purus eu fringilla blandit, 
          eros ipsum laoreet risus, imperdiet sagittis ligula libero non lorem. 
          Donec volutpat, metus tincidunt laoreet volutpat, arcu nulla mollis magna, 
          ut tristique risus nibh id sem. Etiam porta interdum vehicula. 
          Morbi non arcu accumsan, auctor mi in, ornare sapien. Suspendisse ex nulla, 
          ultricies a auctor quis, interdum eget purus. */}
        </div>
      </div>
      {/* metrics */}
      <div className='col-6 align-self-center row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 d-flex align-items-center justify-content-center' style={{maxWidth:700}}>
        {/* stars */}
        <div className='col' style={{maxWidth:150}}>
          <div className='bg-dark-1 card project-card rounded-5 pb-1 border-light-1'>
            <div className='card-body pb-0 flex-column align-items-center'>
              <i className="bi bi-stars color-light-2 fs-1"></i>
              <p className='mt-1 mb-1 fw-bolder fs-5 color-light-2'>
                1024
              </p>
            </div>
          </div>
        </div>
        
        {/* forks */}
        <div className='col' style={{maxWidth:150}}>
          <div className='bg-dark-1 card project-card rounded-5 pb-1 border-light-1'>
            <div className='card-body pb-0 flex-column align-items-center'>
              <i className="bi bi-plugin color-light-2 fs-1"></i>
              <p className='mt-1 mb-1 fw-bolder fs-5 color-light-2'>
                512
              </p>
            </div>
          </div>
        </div>
        
        {/* issues */}
        <div className='col' style={{maxWidth:150}}>
          <div className='bg-dark-1 card project-card rounded-5 pb-1 border-light-1'>
            <div className='card-body pb-0 flex-column align-items-center'>
              <i className="bi bi-exclamation-octagon color-light-2 fs-1"></i>
              <p className='mt-1 mb-1 fw-bolder fs-5 color-light-2'>
                256
              </p>
            </div>
          </div>
        </div>
        
        {/* contributors */}
        <div className='col' style={{maxWidth:150}}>
          <div className='bg-dark-1 card project-card rounded-5 pb-1 border-light-1'>
            <div className='card-body pb-0 flex-column align-items-center'>
              <i className="bi bi-person-workspace color-light-2 fs-1"></i>
              <p className='mt-1 mb-1 fw-bolder fs-5 color-light-2'>
                3
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className='mt-5 d-flex flex-row justify-content-center'>
          <button type='button' className='px-3 py-1 py-md-3 mx-2 bg-dark-pruple btn-dark-1 rounded-pill border border-1 border-light-1'>Back to Projects</button>
          <button type='button' className='px-3 py-1 py-md-3 mx-2 bg-dark-pruple btn-dark-1 rounded-pill border border-1 border-light-1'>View On GitHub</button>
      </div>
      {/* Tags */}
      <div className='mt-5 d-flex flex-column  align-items-center'>
        <h1 className='fs-1 bolder color-light-2 text-shadow-m'>Tags</h1>
        <div className='mt-4'>
          {
            // projectList.map((value, key) =>  {
            //   //  display data
            //   return <div> {value.ProjectName} {value.ProjectOwner} </div>
            // })
            projectDetails.Tags.map((value, key) => {
              return <button type='button' className='project-card bg-dark-1 rounded-pill mx-2 mb-2 px-4 py-1 border border-1 border-light-1 color-light-2'>{value}</button>
            })
          }
          {/* <button type='button' className='project-card bg-dark-2 rounded-pill mx-2 px-4 py-1 border-light-1 color-light-2'>JavaScript</button>
          <button type='button' className='project-card bg-dark-2 rounded-pill mx-2 px-4 py-1 border-light-1 color-light-2'>FastAPI</button> */}
        </div>
      </div>
      {/* Core Contributors */}
      <div className='mt-5 d-flex flex-column align-items-center'>
        <h1 className='fs-1 bolder color-light-2 text-shadow-m'>Core Contributors</h1>
        <div className='mt-4 w-100 row row-cols-1 row-cols-md-3 row-cols-lg-4 row-gap-3 justify-content-center'>
          {
            projectDetails.Contributors.map((value, key) => {
              let styles = {bgColor: "", color: "", colorSecondary: ""};
              switch (value.Role) {
                case "Owner":
                  styles.bgColor = 'bg-light-1';
                  styles.color = 'color-dark-2';
                  styles.colorSecondary = 'color-dark-1';
                  break;
                case "Contributor":
                  styles.bgColor = 'bg-dark-1';
                  styles.color = 'color-light-1';
                  styles.colorSecondary = 'color-light-2';
                  break;
                default:
                  break;
              };
              return (
                <div className='col' style={{maxWidth:300}}>
                  <div className={`${styles.bgColor} project-card px-5 rounded-5 mx-2 px-4 py-1 border border-2 border-dark-2`}>
                    <p className={`mt-1 mb-0 fs-6 ${styles.color}`}>
                      {value.Role}
                    </p>
                    <i className={`mt-0 bi bi-person-workspace ${styles.color} fs-h1`}></i>
                    <p className={`mt-1 fw-bolder fs-5 ${styles.color}`}>
                      {value.Username}
                    </p>
                    <p className={`mt-1 mb-1 fs-6 ${styles.colorSecondary}`}>
                      {value.Subrole}
                    </p>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}