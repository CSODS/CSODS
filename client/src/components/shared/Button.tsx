import { CssSelector, CustomBtnProps } from "@/types";
import { getBootstrapSpacing } from "@/utils";
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

export function Btn({
    children,
    callBackFn,
    btnColor,
    flex,
    justify,
    align,
    margin,
    padding,
    hoverBehavior,
    border,
    opacity
}: CustomBtnProps) {
    const btnVariant = btnColor ? `btn btn-${btnColor}` : `btn`;
    const btnMargin = margin?.map((margin) => getBootstrapSpacing({ marginSettings: margin }).join(' ')).join(' ') ?? '';
    const btnPadding = padding?.map((padding) => getBootstrapSpacing({ paddingSettings: padding}).join(' ')).join(' ') ?? '';
    const btnFlex = flex ? `d-flex flex-${flex}` : '';
    const justifyContent = justify ? `justify-content-${justify}` : '';
    const alignItems = align ? `align-items-${align}` : '';
    const onHover = hoverBehavior ? `hover-${hoverBehavior}` : '';
    
    const borderWidth = `border-${border?.width ?? 0}`;
    const borderColor = border?.color ? `border-${border.color}` : '';
    const borderStyle = `border ${borderWidth} ${borderColor} rounded-pill`;

    const btnOpacity = `translucent-${opacity ?? 100}`;

    const btnStyleList = [btnVariant, btnMargin, btnPadding, btnFlex, justifyContent, alignItems, onHover, borderStyle, btnOpacity];

    const btnStyle = btnStyleList.join(' ');

    return (
        <button type="button" className={btnStyle} onClick={callBackFn}>
            {children}
        </button>
    )
}

export function BtnBare ({ 
    children, 
    componentKey, 
    componentId,
    componentValue,
    callBackFn, 
    flex, 
    justify, 
    align,
    margin = [{ m: 0 }], 
    padding = [{ s:0, e: 1, y: 0 }]
}: CustomBtnProps) {
    const btnMargin = margin.map((margin) => getBootstrapSpacing({ marginSettings: margin }).join(' ')).join(' ');
    const btnPadding = padding.map((padding) => getBootstrapSpacing({ paddingSettings: padding}).join(' ')).join(' ');
    const bg = 'bg-transparent';
    const border = 'border border-0 rounded-pill';
    const btnFlex = flex ? `d-flex flex-${flex}` : '';
    const justifyContent = justify ? `justify-content-${justify}` : '';
    const alignItems = align ? `align-items-${align}` : '';

    const cssClassList = [btnMargin, btnPadding, bg, border, btnFlex, justifyContent, alignItems];

    const cssClass = cssClassList.join(' '); 

    return (
        <button key={componentKey} id={componentId} className={cssClass} value={componentValue} onClick={callBackFn}>
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