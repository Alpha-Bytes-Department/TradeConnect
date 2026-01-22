// Fahim
"use client"
import FilterBox from "@/app/(super-admin)/components/allBusiness/FilterBox";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import GridView from "@/app/(super-admin)/components/allBusiness/GridView";
import { useEffect, useState } from "react";
import { useFilter } from "@/app/(super-admin)/FilterContext";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function AllBusiness() {
    const { businesses, total, loading } = useFilter();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10));

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        const params = new URLSearchParams({
            page: newPage.toString()
        });
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    // Sync state when URL changes (needed for browser back/forward and refresh)
    useEffect(() => {
        const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
        if (pageFromUrl !== currentPage) {
            setCurrentPage(pageFromUrl);
        }
    }, [searchParams]);

    return (
        <div className="p-6 bg-[#F6F6F6]">
            <h1 className="font-medium font-poppins text-[#0B0B0B] text-3xl">All Businesses</h1>
            <p className="font-poppins text-[#626262]">Manage and monitor all registered businesses</p>

            <FilterBox currentPage={currentPage} />

            {loading ? (
                <div className="text-center py-8">Loading...</div>
            ) : (
                <>
                    <DataTable
                        columns={columns}
                        data={businesses}
                        total={total}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                    <GridView
                        total={total}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}


// parseInt('8', 10)   // 8  (decimal)
// parseInt('8', 8)    // 8  (octal)
// parseInt('1010', 2) // 10 (binary)
// parseInt('FF', 16)  // 255 (hexadecimal)