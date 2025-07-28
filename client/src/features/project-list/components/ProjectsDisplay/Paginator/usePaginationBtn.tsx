import { useEffect, useState } from "react";
import { usePageNumber } from "@/hooks";
import { getProjectsPageLink } from "@/utils";
import { useProjectsPage } from "../hooks";

interface NumberedBtn {
  page: number;
  isPrevious?: undefined;
  isNext?: undefined;
}

interface PreviousBtn {
  page?: undefined;
  isPrevious: true;
  isNext?: boolean;
}

interface NextBtn {
  page?: undefined;
  isPrevious?: undefined;
  isNext: true;
}

export type PaginationButtonProps = NumberedBtn | PreviousBtn | NextBtn;

export function usePaginationBtnState(props: PaginationButtonProps) {
  const { page, isPrevious, isNext } = props;
  const { TotalPages: totalPages } = useProjectsPage();
  const currentPage = usePageNumber();

  const [btnText, setBtnText] = useState<string>("");
  const [isActiveBtn, setActive] = useState<boolean>(false);
  const [isPreviousActive, setPreviousActive] = useState<boolean>(false);
  const [isNextActive, setNextActive] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    setActive(page === currentPage);

    if (page) {
      setBtnText(page.toString());
      setLink(getProjectsPageLink(page));
    }
  }, [totalPages, page, currentPage]);

  useEffect(() => {
    setPreviousActive(isPrevious ? isPrevious && currentPage === 1 : false);

    if (isPrevious) {
      setBtnText("Previous");
      setLink(getProjectsPageLink(currentPage - 1));
    }
  }, [currentPage, isPrevious]);

  useEffect(() => {
    setNextActive(isNext ? isNext && currentPage === totalPages : false);

    if (isNext) {
      setBtnText("Next");
      setLink(getProjectsPageLink(currentPage + 1));
    }
  }, [totalPages, currentPage, isNext]);

  return {
    btnText,
    isActiveBtn,
    isPreviousActive,
    isNextActive,
    link,
  };
}
