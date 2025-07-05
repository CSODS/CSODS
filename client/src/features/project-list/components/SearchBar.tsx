export default function SearchBar() {
  return(
    <div>
      <div className='mt-5 d-flex justify-content-center align-items-center'>
        <div className='py-3 px-4 col-md-6 d-flex align-items-center justify-content-start border border-light-1 rounded-pill bg-light-3 translucent-20'>
          <i className="bi bi-search color-light-1 me-3"></i>
          <input type='text' className='m-0 fs-6 w-100 color-light-1' placeholder='Search projects...'/>
        </div>
      </div>
      <div className='mt-4'>
        <button type='button' className='btn btn-dark-3 translucent-60 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1'>All</button>
        <button type='button' className='btn btn-dark-3 translucent-60 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1'>JavaScript</button>
        <button type='button' className='btn btn-dark-3 translucent-60 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1'>Python</button>
        <button type='button' className='btn btn-dark-3 translucent-60 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1'>C#</button>
        <button type='button' className='btn btn-dark-3 translucent-60 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1'>C</button>
      </div>
    </div>
  );
}