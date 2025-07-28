import { Link } from "react-router-dom";
import { useTotalPages } from "../../hooks/context";
import {
  PaginationButtonProps,
  usePaginationBtnState,
} from "../../hooks/pagination";

export default function Paginator() {
  const totalPages = useTotalPages();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <nav
        aria-label="projects navigation v2"
        className="m-0 mt-3 d-flex flex-row justify-content-center"
      >
        <ul className="pagination">
          <PaginationButton key={`pagination-previous-page`} isPrevious />
          {[...Array(totalPages)].map((_, i) => {
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
  );
}

function PaginationButton(props: PaginationButtonProps) {
  const { btnText, isActiveBtn, isPreviousActive, isNextActive, link } =
    usePaginationBtnState(props);
  const isActive = isActiveBtn || isPreviousActive || isNextActive;
  const activeSelector = isActive ? "active" : "";

  const selectorList = [
    "page-link btn btn-light-1 translucent-40 initial-transparent border rounded-pill border-1 border-light-1",
    activeSelector,
  ];

  const selectors = selectorList.join(" ");

  if (isActiveBtn) {
    return (
      <li className="mx-1">
        <span className={selectors}>{btnText}</span>
      </li>
    );
  } else if (isPreviousActive || isNextActive) {
    return <div></div>;
  } else {
    return (
      <li className="mx-1">
        <Link className={selectors} to={link}>
          {btnText}
        </Link>
      </li>
    );
  }
}
