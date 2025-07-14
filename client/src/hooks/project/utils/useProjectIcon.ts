import { useEffect, useState } from "react";
import { ICONS } from "@/constants";
import { useProjectTags } from "../data/projectTags";

export function useProjectIcon(devType?: keyof typeof ICONS) {
    const projectTags = useProjectTags();

    const [iconClass, setIconClass] = useState<string>("");

    useEffect(() => {
        const getIconClass = (devType: keyof typeof ICONS) => ICONS[devType];
        setIconClass(getIconClass(projectTags.DevType as keyof typeof ICONS));
    }, [projectTags]);

    return iconClass;
}