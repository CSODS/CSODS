import { CssSelector } from "@/types";
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