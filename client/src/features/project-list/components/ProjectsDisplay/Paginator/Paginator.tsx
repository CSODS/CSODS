import PaginationButton from "./PaginationBtn";
import { useProjectsPage } from "../../../hooks";

export default function Paginator() {
  const { TotalPages } = useProjectsPage();

  return (
    <div className="m-0 row">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <nav
          aria-label="projects navigation v2"
          className="m-0 mt-3 d-flex flex-row justify-content-center"
        >
          <ul className="pagination">
            <PaginationButton key={`pagination-previous-page`} isPrevious />
            {[...Array(TotalPages)].map((_, i) => {
              const pageNumber = i + 1;
              return (
                <PaginationButton
                  key={`pagination-page-${pageNumber}`}
                  page={pageNumber}
                />
              );
            })}
            <PaginationButton key={`pagination-next-page`} isNext />
          </ul>
        </nav>
      </div>
    </div>
  );
}
