import { PROJECT_DESCRIPTION } from "@/constants/defaults";
import { useProjectDetails } from "@/hooks";
import "../styles/scrollableStyles.module.css";

interface AboutProps {
  aboutRef?: React.RefObject<HTMLDivElement | null>;
}

export function About({ aboutRef }: AboutProps) {
  const project = useProjectDetails();

  return (
    <div
      ref={aboutRef}
      className="h-100 px-3 p-2 card card-frost-gradient-2 hover-shadow border border-0 rounded-2"
    >
      <h2 className="m-0 pb-1 p-0 border-bottom border-2 border-frost-midnight fw-bold text-start color-frost-midnight">
        About
      </h2>
      <p className="m-0 pt-2 p-0 lh-sm text-start fs-p color-frost-midnight scrollbar-azure overflow-y-auto">
        {PROJECT_DESCRIPTION}
      </p>
    </div>
  );
}
