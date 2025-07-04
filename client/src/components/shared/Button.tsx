import { CssSelector } from "@/types";
import { ReactNode } from "react";

export interface ButtonProps {
    children: ReactNode;
    selectorList: CssSelector[];
    key: string | undefined,
    btnId: string | undefined,
}

export default function Button({
    children,
    selectorList,
    key,
    btnId,
}: ButtonProps) {
    const selectors = selectorList.join(' ');

    return (
        <button key={key} id={btnId} className={`mt-1 py-1 px-3 ms-0 me-2 btn rounded-pill fs-xs ${selectors}`}>
            {children}
        </button>
    );
}