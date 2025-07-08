import { ReactNode } from "react";
import { Color, Opacity } from "../themes/styles";
import { marginSettings, paddingSettings } from "../themes/spacing";

export interface CustomBtnProps extends CustomProps {
    callBackFn?: () => void;
    btnColor?: Color;
}
//  TO DO: RENAME
export interface CustomProps extends BaseCustomProps {
    children?: ReactNode;
}

export interface CustomVoidElementProps extends BaseCustomProps {}

export interface BaseCustomProps {
    bgColor?: Color;
    txtColor?: Color;
    componentKey?: string;
    componentId?: string;
    componentValue?: string;
    componentName?: string;
    flex?: flex;
    justify?: placement;
    align?: placement;
    margin?: marginSettings[];
    padding?: paddingSettings[];
    hoverBehavior?: hoverBehavior;
    border?: borderSettings;
    opacity?: Opacity;
}

type flex = 'row' | 'col';
type placement = 'start' | 'center' | 'end';
type hoverBehavior = 'invert' | 'lighten' | 'darken';

interface borderSettings {
    width?: width;
    color?: Color;
}

type width = 0 | 1 | 2 | 3 | 4 | 5;