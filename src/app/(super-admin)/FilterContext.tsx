// Fahim
"use client"
import { createContext, useContext, useState, ReactNode } from "react";

// Simplified interface - only businesses data
interface FilterContextType {
    businesses: any[];
    total: number;
    loading: boolean;
    setBusinesses: (data: any[]) => void;
    setTotal: (total: number) => void;
    setLoading: (loading: boolean) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
    // Only state for businesses data
    const [businesses, setBusinesses] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    return (
        <FilterContext.Provider
            value={{
                businesses,
                total,
                loading,
                setBusinesses,
                setTotal,
                setLoading,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}

export function useFilter() {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilter must be used within a FilterProvider");
    }
    return context;
}



