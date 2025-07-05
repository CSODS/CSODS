import { UserContext } from "@/components";
import { useContext } from "react";

export function useUser() {
    const userContext = useContext(UserContext);
    if (!userContext) {
        const errMsg = 'Function useUser must be used inside a UserContextProvider component.';
        throw new Error(errMsg);
    }
    return userContext;
}