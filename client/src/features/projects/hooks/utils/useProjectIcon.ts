import { useEffect, useState } from "react";
import { PROJECT } from "@features/projects/constants";
import { useProjectTags } from "../memo";

const { ICONS } = PROJECT;

export function useProjectIcon(devType?: keyof typeof ICONS) {
  const projectTags = useProjectTags();

  const [iconClass, setIconClass] = useState<string>("");

  useEffect(() => {
    const getIconClass = (devType: keyof typeof ICONS) => ICONS[devType];
    setIconClass(getIconClass(projectTags.devType as keyof typeof ICONS));
  }, [projectTags]);

  return iconClass;
}
