import { useParams } from "react-router-dom";

export function useProjectId() {
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) {
    const errMsg = "Missing route parameter: pageNumber";
    throw new Error(errMsg);
  }
  return Number(projectId);
}
