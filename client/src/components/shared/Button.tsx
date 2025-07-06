import { Color, CssSelector } from "@/types";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export interface ButtonProps {
    children: ReactNode;
    selectorList: (CssSelector | string)[];
    componentKey?: string,
    componentId?: string,
}

export default function Button({
    children,
    selectorList,
    componentKey,
    componentId,
}: ButtonProps) {
    const selectors = selectorList.join(' ');

    return (
        <button key={componentKey} id={componentId} className={`${selectors}`}>
            {children}
        </button>
    );
}

type flex = 'row' | 'col';
type placement = 'start' | 'center' | 'end';


export interface BtnBareProps {
    children: ReactNode;
    txtColor?: Color;
    componentKey?: string;
    componentId?: string;
    flex?: flex;
    justify?: placement;
    align?: placement;
}

export function BtnBare ({ 
    children, 
    componentKey, 
    componentId, 
    flex, 
    justify, 
    align 
}: BtnBareProps) {
    const margin = 'm-0';
    const padding = 'px-1 py-0';
    const bg = 'bg-transparent';
    const border = 'border border-0 rounded-pill';
    const btnFlex = flex ? `d-flex flex-${flex}` : '';
    const justifyContent = justify ? `justify-content-${justify}` : '';
    const alignItems = align ? `align-items -${align}` : '';

    const cssClassList = [margin, padding, bg, border, btnFlex, justifyContent, alignItems];

    const cssClass = cssClassList.join(' '); 

    return (
        <button key={componentKey} id={componentId} className={cssClass}>
            {children}
        </button>
    )
}

export interface LinkButtonProps {
    children: ReactNode;
    selectorList: (CssSelector | string)[];
    link: string;
    componentKey?: string;
    componentId?: string;
}

export function LinkButton({
    children,
    selectorList,
    link,
    componentKey,
    componentId
}: LinkButtonProps) {
    const selectors = selectorList.join(' ');

    return (
        <Link key={componentKey} id={componentId} className={`${selectors}`} to={link}>
            {children}
        </Link>
    )
}