import { ReactNode } from "react";
import { Color } from "../themes/styles";
import { marginSettings, paddingSettings } from "../themes/spacing";

export interface CustomBtnProps extends CustomProps {
    callBackFn?: () => void;
}

export interface CustomProps {
    children: ReactNode;
    txtColor?: Color;
    componentKey?: string;
    componentId?: string;
    componentValue?: string;
    flex?: flex;
    justify?: placement;
    align?: placement;
    margin?: marginSettings[];
    padding?: paddingSettings[];
}

type flex = 'row' | 'col';
type placement = 'start' | 'center' | 'end';