// Fahim
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ViewContextType = {
    grid: boolean;
    list: boolean;
    setGrid: (value: boolean) => void;
    setList: (value: boolean) => void;
};

const ViewContext = createContext<ViewContextType | null>(null);

export function ViewProvider({ children }: { children: ReactNode }) {
    const [list, setList] = useState(true);
    const [grid, setGrid] = useState(false);

    return (
        <ViewContext.Provider value={{ list, grid, setList, setGrid }}>
            {children}
        </ViewContext.Provider>
    );
};

export const useView = () => {
    const context = useContext(ViewContext);
    if (!context) {
        throw new Error("useView must be used inside ViewProvider");
    }
    return context;
};
