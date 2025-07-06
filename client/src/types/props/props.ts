import { ReactNode } from "react";
import { Color } from "../themes/styles";
import { marginSettings, paddingSettings } from "../themes/spacing";

type flex = 'row' | 'col';
type placement = 'start' | 'center' | 'end';

export interface CustomProps {
    children: ReactNode;
    txtColor?: Color;
    componentKey?: string;
    componentId?: string;
    flex?: flex;
    justify?: placement;
    align?: placement;
    margin?: marginSettings[];
    padding?: paddingSettings[];
}