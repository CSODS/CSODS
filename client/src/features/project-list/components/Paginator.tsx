import { Link, useParams } from "react-router-dom";
import { ADDRESSES } from "@constants/index";
export interface IPaginationProps {
  totalPages: number
};

export default function Paginator({
  totalPages
}: IPaginationProps) {
  const getPageLink = (pageNumber: number) => {
    const root = ADDRESSES.STUDENT_PROJECTS.ROOT;
    const link = `${root}/${pageNumber}`;
    return link;
  };

  const assemblePageBtn = (pageNumber: number, totalPages: number, currentPage: number) => {
    const link = getPageLink(pageNumber);

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

  const assemblePreviousBtn = (currentPage: number) => {
    const link = getPageLink(currentPage - 1);

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

  const assembleNextBtn = (totalPages: number, currentPage: number) => {
    const link = getPageLink(currentPage + 1);

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

  const { pageNumber } = useParams();
  const currentPage = Number(pageNumber);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <nav aria-label="projects navigation v2" className='m-0 mt-3 d-flex flex-row justify-content-center'>
        <ul className="pagination">
          {assemblePreviousBtn(currentPage)}
          {
            [...Array(totalPages)].map((_, i) => (
              assemblePageBtn(i + 1, totalPages, currentPage)
            ))
          } 
          {assembleNextBtn(totalPages, currentPage)}
        </ul>
      </nav>
    </div>
  );
}