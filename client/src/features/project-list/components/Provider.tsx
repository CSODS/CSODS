import { createContext, ReactNode } from "react";

export const TotalPagesContext = createContext<number | undefined>(undefined);

export interface TotalPagesProviderProps {
    children: ReactNode;
    totalPages: number;
}

export function TotalPagesProvider({ children, totalPages }: TotalPagesProviderProps) {
    return (
        <TotalPagesContext.Provider value={totalPages}>
            {children}
        </TotalPagesContext.Provider>
    );
}