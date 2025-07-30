import { useContext } from "react";
import { ProjectOwnerContext } from "../../providers";

export function useProjectOwner() {
  const projectOwner = useContext(ProjectOwnerContext);

  if (!projectOwner) {
    const errMsg =
      "Function useProjectOwner must be used inside a ProjectOwnerProvider component.";
    throw new Error(errMsg);
  }

  return projectOwner;
}
