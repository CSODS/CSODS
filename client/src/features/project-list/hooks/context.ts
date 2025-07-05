import { useContext } from "react";
import { TotalPagesContext } from "../components/Provider";

export function useTotalPages() {
    const totalPages = useContext(TotalPagesContext);
    
    if (!totalPages) {
        const errMsg = 'Function useTotalPages must be used inside a TotalPagesProvider component.';
        throw new Error(errMsg);
    }

    return totalPages;
}