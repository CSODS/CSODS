import { CssSelector } from "@/types";
import { ReactNode } from "react";

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