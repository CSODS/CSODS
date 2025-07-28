import { useContext } from "react";
import { TagColorContext } from "../TagColorProvider";

export function useTagColorMap() {
  const tagColorMap = useContext(TagColorContext);

  if (!tagColorMap) {
    const errMsg =
      "Function useTagColorMap must be used inside a TagColorProvider component.";
    throw new Error(errMsg);
  }

  return tagColorMap;
}
