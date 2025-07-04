import { Color, Opacity, OnHover } from "@/types";
import { ReactNode } from "react";

export interface ButtonProps {
    children: ReactNode;
    bgColor: Color;
    txtColor: Color;
    opacity: Opacity;
    onHover: OnHover;
    key: string | undefined,
    btnId: string | undefined,
}

export default function Button({
    children,
    bgColor,
    txtColor,
    opacity,
    onHover,
    key,
    btnId,
}: ButtonProps) {
    const btnSelector = `btn-${bgColor}`;
    const hoverSelector = `hover-${onHover}`;
    const colorSelector = `color-${txtColor}`;
    const opacitySelector = `translucent-${opacity}`;
    
    const selectorList = [
        btnSelector,
        hoverSelector,
        colorSelector,
        opacitySelector
    ];

    const selectors = selectorList.join(' ');

    return (
        <button key={key} id={btnId} className={selectors}>
            {children}
        </button>
    );
}