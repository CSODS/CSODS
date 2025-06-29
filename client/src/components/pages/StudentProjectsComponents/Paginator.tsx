import * as CONSTANTS from "../../../constants/constants";
import { Link } from "react-router-dom";

export interface IPaginationProps {
  totalPages: number,
  currentPage: number
};

export default function Paginator({
  totalPages,
  currentPage
}: IPaginationProps) {
  const assemblePageItem = (pageNumber: number, props: IPaginationProps) => {
    const link = getPageLink(pageNumber);
    const currentPage = props.currentPage;

    if (pageNumber === currentPage) {
      return <li className='page-item active'><span className='page-link'>{pageNumber}</span></li>
    }
    else {
      return <li className="page-item"><Link className="page-link" to={link}>{pageNumber}</Link></li>
    }
  };

  const getPageLink = (pageNumber: number) => {
    const root = CONSTANTS.ADDRESSES.STUDENT_PROJECTS_ROOT;
    const link = `${root}/${pageNumber}`;
    return link;
  };

  const assemblePrevious = (props: IPaginationProps) => {
    const currentPage = props.currentPage;
    const link = getPageLink(currentPage - 1);

    if (currentPage === 1) {
      return <li className='page-item disabled'><span className='page-link'>Previous</span></li>
    }
    else {
      return <li className="page-item"><Link className="page-link" to={link}>Previous</Link></li>
    }
  }

  const assembleNext = (props: IPaginationProps) => {
    const currentPage = props.currentPage;
    const totalPages = props.totalPages;
    const link = getPageLink(currentPage + 1);

    if (currentPage === totalPages) {
      return <li className='page-item disabled'><span className='page-link'>Next</span></li>
    }
    else {
      return <li className="page-item"><Link className="page-link" to={link}>Next</Link></li> 
    }
  }

  return (
    <div>
      <nav aria-label="projects navigation" className='m-0 mt-3 d-flex justify-content-center'>
        <ul className="pagination">
          {assemblePrevious({totalPages, currentPage})}
          {
            [...Array(totalPages)].map((_, i) => (
              assemblePageItem(i + 1, {totalPages, currentPage})
            ))
          } 
          {assembleNext({totalPages, currentPage})}
        </ul>
      </nav>
    </div>
  );
}