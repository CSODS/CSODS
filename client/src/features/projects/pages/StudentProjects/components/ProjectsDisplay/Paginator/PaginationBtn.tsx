import { Link } from "react-router-dom";
import {
  PaginationButtonProps,
  usePaginationBtnState,
} from "./usePaginationBtn";

export default function PaginationButton(props: PaginationButtonProps) {
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
