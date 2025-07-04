import ADDRESSES from "../../../constants/addresses/addresses";
import { Link } from "react-router-dom";

export interface IPaginationProps {
  totalPages: number,
  currentPage: number
};

export default function Paginator({
  totalPages,
  currentPage
}: IPaginationProps) {
  const getPageLink = (pageNumber: number) => {
    const root = ADDRESSES.STUDENT_PROJECTS.ROOT;
    const link = `${root}/${pageNumber}`;
    return link;
  };

  const assemblePageBtn = (pageNumber: number, props: IPaginationProps) => {
    const link = getPageLink(pageNumber);
    const currentPage = props.currentPage;

    if (pageNumber === currentPage) {
      return (
        <li className='mx-1'>
          <span className='page-link btn page-light-1 translucent-40 active border rounded-pill border-1 border-light-1'>
            {pageNumber}
          </span>
        </li>
      )
    }
    else {
      return (
        <li className="mx-1">
          <Link className="page-link btn page-light-1 translucent-40 border rounded-pill border-1 border-light-1" to={link}>
            {pageNumber}
          </Link>
        </li>
      )
    }
  };

  const assemblePreviousBtn = (props: IPaginationProps) => {
    const currentPage = props.currentPage;
    const link = getPageLink(currentPage - 1);

    // if (currentPage === 1) {
    //   return (
    //     <li className='mx-1'>
    //       <span className='page-link btn page-light-1 translucent-40 disabled border rounded-pill border-1 border-light-1'>
    //         Previous
    //       </span>
    //     </li>
    //   )
    // }
    if (currentPage !== 1) {
      return (
        <li className="mx-1">
          <Link className="page-link btn page-light-1 translucent-40 border rounded-pill border-1 border-light-1" to={link}>
            Previous
          </Link>
        </li>
      )
    }
  }

  const assembleNextBtn = (props: IPaginationProps) => {
    const currentPage = props.currentPage;
    const totalPages = props.totalPages;
    const link = getPageLink(currentPage + 1);

    // if (currentPage === totalPages) {
    //   return (
    //     <li className='mx-1'>
    //       <span className='page-link  btn page-light-1 translucent-40 disabled border rounded-pill border-1 border-light-1'>
    //         Next
    //       </span>
    //     </li>
    //   )
    // }
    if (currentPage !== totalPages) {
      return (
        <li className="mx-1">
          <Link className="page-link btn page-light-1 translucent-40 border rounded-pill border-1 border-light-1" to={link}>
            Next
          </Link>
        </li> 
      )
    }
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <nav aria-label="projects navigation v2" className='m-0 mt-3 d-flex flex-row justify-content-center'>
        <ul className="pagination">
          {assemblePreviousBtn({totalPages, currentPage})}
          {
            [...Array(totalPages)].map((_, i) => (
              assemblePageBtn(i + 1, {totalPages, currentPage})
            ))
          } 
          {assembleNextBtn({totalPages, currentPage})}
        </ul>
      </nav>
    </div>
  );
}