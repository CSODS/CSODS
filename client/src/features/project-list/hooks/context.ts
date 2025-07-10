import { useContext } from "react";
import { TagColorContext, TotalPagesContext } from "../components/Provider";

export function useTotalPages() {
    const totalPages = useContext(TotalPagesContext);
    
    if (!totalPages) {
        const errMsg = 'Function useTotalPages must be used inside a TotalPagesProvider component.';
        throw new Error(errMsg);
    }

    return totalPages;
}

export function useTagColorMap() {
    const tagColorMap = useContext(TagColorContext);

    if (!tagColorMap) {
        const errMsg = 'Function useTagColorMap must be used inside a TagColorProvider component.';
        throw new Error(errMsg);
    }
    
    return tagColorMap;
}