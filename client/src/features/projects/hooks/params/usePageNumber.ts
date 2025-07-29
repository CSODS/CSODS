import { useParams } from "react-router-dom";

export function usePageNumber() {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  if (!pageNumber) {
    const errMsg = "Missing route parameter: pageNumber";
    throw new Error(errMsg);
  }
  return Number(pageNumber);
}
