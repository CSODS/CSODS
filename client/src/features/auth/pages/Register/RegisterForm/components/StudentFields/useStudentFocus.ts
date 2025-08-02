import { useState } from "react";

export function useStudentFocus() {
  const [nameFocus, setNameFocus] = useState<boolean>(false);
  const [numberFocus, setNumberFocus] = useState<boolean>(false);

  return { nameFocus, setNameFocus, numberFocus, setNumberFocus };
}
