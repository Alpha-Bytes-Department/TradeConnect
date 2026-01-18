// Fahim
"use client"
import { createContext, useContext, useState, ReactNode } from "react";

interface FilterContextType {
    search: string;
    country: string;
    status: string;
    sortBy: string;
    setSearch: (value: string) => void;
    setCountry: (value: string) => void;
    setStatus: (value: string) => void;
    setSortBy: (value: string) => void;
    resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
    const [search, setSearch] = useState("");
    const [country, setCountry] = useState("");
    const [status, setStatus] = useState("");
    const [sortBy, setSortBy] = useState("a-z");

    const resetFilters = () => {
        setSearch("");
        setCountry("");
        setStatus("");
        setSortBy("a-z");
    };

    return (
        <FilterContext.Provider
            value={{
                search,
                country,
                status,
                sortBy,
                setSearch,
                setCountry,
                setStatus,
                setSortBy,
                resetFilters,
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