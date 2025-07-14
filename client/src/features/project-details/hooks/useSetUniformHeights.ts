import { IAllProjectTags, IProjectDetails } from "@/types";
import { useEffect } from "react";

export default function useSetUniformHeights(
    allTags: IAllProjectTags | null | undefined,
    project: IProjectDetails | null | undefined,
    galleryRef: React.RefObject<HTMLDivElement | null>,
    contributorsRef: React.RefObject<HTMLDivElement | null>,
    aboutRef: React.RefObject<HTMLDivElement | null>,
    subContainerRef: React.RefObject<HTMLDivElement | null>,
) 
{
  useEffect(() => {
    if (!allTags || !project) return;

    const setUniformHeights = () => {
      const gallery = galleryRef.current;
      const contributors = contributorsRef.current;
      const about = aboutRef.current;
      const subContainer = subContainerRef.current;

      if (gallery && contributors) {
        contributors.style.height = `${gallery.clientHeight}px`;
      }
      if (about && subContainer) {
        about.style.maxHeight = `${subContainer.clientHeight}px`;
      }
    }

    setUniformHeights();
    window.addEventListener('resize', setUniformHeights);

    return () => {
      window.removeEventListener('resize', setUniformHeights);
    };
  }, [allTags, project, galleryRef, contributorsRef, aboutRef, subContainerRef]);
}