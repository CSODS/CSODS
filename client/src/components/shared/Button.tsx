import { CssSelector } from "@/types";
import { ReactNode } from "react";

export interface ButtonProps {
    children: ReactNode;
    selectorList: CssSelector[];
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
        <button key={componentKey} id={componentId} className={`mt-1 py-1 px-3 ms-0 me-2 btn rounded-pill fs-xs ${selectors}`}>
            {children}
        </button>
    );
}