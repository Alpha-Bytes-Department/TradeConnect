// Fahim
"use client"
import FilterBox from "@/app/(super-admin)/components/allBusiness/FilterBox";
import { allBusinessesTable, columns } from "./columns";
import { DataTable } from "./data-table";
import GridView from "@/app/(super-admin)/components/allBusiness/GridView";
import { useState } from "react";
import { useFilter } from "@/app/(super-admin)/FilterContext";

export default function AllBusiness() {
    const [currentPage, setCurrentPage] = useState(1);

    const { businesses, total, loading } = useFilter();

    return (
        <div className="p-6 bg-[#F6F6F6]">
            <h1 className="font-medium font-poppins text-[#0B0B0B] text-3xl">All Businesses</h1>
            <p className="font-poppins text-[#626262]">Manage and monitor all registered businesses</p>

            {/* Pass only currentPage to FilterBox */}
            <FilterBox currentPage={currentPage} />

            {/* Show loading state from context */}
            {loading ? (
                <div className="text-center py-8">Loading...</div>
            ) : (
                <>
                    <DataTable
                        columns={columns}
                        data={businesses}
                        total={total}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                    <GridView
                        total={total}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
}
