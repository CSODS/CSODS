import { useEffect, useState } from "react";
import { ICONS } from "@/constants";

export function useProjectIcon(devType: keyof typeof ICONS) {
    const [iconClass, setIconClass] = useState<string>("");

    useEffect(() => {
        const getIconClass = (devType: keyof typeof ICONS) => ICONS[devType];
        setIconClass(getIconClass(devType));
    }, [devType]);

    return iconClass;
}