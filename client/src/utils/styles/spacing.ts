import { marginSettings, paddingSettings } from "@/types";

interface getMargin {
    marginSettings: marginSettings;
    paddingSettings?: undefined;
}

interface getPadding {
    marginSettings?: undefined;
    paddingSettings: paddingSettings;
}

export function getBootstrapSpacing({ marginSettings, paddingSettings}: getMargin | getPadding) {
    if (marginSettings) {
        const breakpoint = marginSettings.breakpoint ? `-${marginSettings.breakpoint}` : '';

        const margins = Object.entries(marginSettings).map(([side, value]) => {
            if (side !== 'breakpoint') {
                if (side === 'm') {
                    return `m${breakpoint}-${value}`;
                }
                const marginClass = `m${side}${breakpoint}-${value}`;
                return marginClass;
            }
            return '';
        })

        return margins;
    }
    else if (paddingSettings) {
        const breakpoint = paddingSettings.breakpoint ? `-${paddingSettings.breakpoint}` : '';

        const paddings = Object.entries(paddingSettings).map(([side, value]) => {
            if (side !== 'breakpoint') {
                if (side === 'p') {
                    return `p${breakpoint}-${value}`;
                }
                const paddingClass = `p${side}${breakpoint}-${value}`;
                return paddingClass;
            }
            return '';
        })

        return paddings;
    }
    return [] as string[];
}
