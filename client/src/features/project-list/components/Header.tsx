export default function Header() {
  return (
    <div>
      <div data-bs-spy='scroll' data-bs-target='#nav-scroll' data-bs-offset='-100'>
        <div id='heading'></div>
      </div> 
      <div className='p-0 mt-3 mb-5 d-md-flex d-none flex-column align-items-center justify-content-center'>
        <div className='row g-0 d-flex justify-content-center align-items-center' style={{maxWidth:700}}>
            <div className='col-md-auto p-0 m-0 d-flex justify-content-center align-items-center'>
              <img src='/github_logo.png' alt='...' className='header-logo shadow-lg'></img>
            </div>
            <div className='col-md p-0 ps-md-3 m-0 d-flex justify-content-center align-items-center'>
              <h1 className='fs-h1 bolder color-light-2 text-shadow-m'>GitHub Projects</h1>
            </div>
        </div>
        <div className='px-3 fs-5 color-light-2'>
          Discover open source projects uploaded by our very own students.
        </div>
      </div>
    </div>
  );
}