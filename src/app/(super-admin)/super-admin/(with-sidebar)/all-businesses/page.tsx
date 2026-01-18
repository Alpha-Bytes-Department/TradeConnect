// Fahim
"use client"
import FilterBox from "@/app/(super-admin)/components/allBusiness/FilterBox";
import { allBusinessesTable, columns } from "./columns";
import { DataTable } from "./data-table";
// import { allBusinessData } from "@/app/(super-admin)/data";
import GridView from "@/app/(super-admin)/components/allBusiness/GridView";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFilter } from "@/app/(super-admin)/FilterContext";

export default function AllBusiness() {
    // const data = await getData();
    const [datas, setDatas] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('accessToken');
    if (!token) {
        console.error("No access token found");
        // alert("Please login first");
        return;
    }

    const { search, country, status, sortBy } = useFilter();

    useEffect(() => {
        const fetchBusinessDatas = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                console.error("No access token found");
                return;
            }

            setLoading(true);

            try {
                // Build query params from filter context
                const params = new URLSearchParams({
                    page: currentPage.toString(),
                    search: search || "",
                    country: country || "",
                    service: "", // Add service filter if needed
                    sort_by: sortBy || "",
                });

                // Add status to params if it exists (you may need to map it to your API's expected param name)
                if (status) {
                    params.append("status", status);
                }

                const response = await axios.get(
                    `https://squishiest-punctually-daxton.ngrok-free.dev/api/business/all/?${params.toString()}`,
                    {
                        headers: {
                            "ngrok-skip-browser-warning": "true",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setDatas(response?.data?.results?.businesses || []);
                setTotal(response?.data?.count || 0);
            } catch (error) {
                console.error("Error fetching business data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBusinessDatas();
    }, [currentPage, search, country, status, sortBy]); // Re-fetch when filters or page changes

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, country, status, sortBy]);

    return (
        <div className="p-6 bg-[#F6F6F6]">
            <h1 className="font-medium font-poppins text-[#0B0B0B] text-3xl">All Businesses</h1>
            <p className="font-poppins text-[#626262]">Manage and monitor all registered
                businesses</p>
            <FilterBox />
            <DataTable
                columns={columns}
                data={datas}
                total={total}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
            <GridView />
        </div>
    );
}

// const getData = async (): Promise<allBusinessesTable[]> => {
//     return allBusinessData;
// }






// // Fahim
// import FilterBox from "@/app/(super-admin)/components/allBusiness/FilterBox";
// import { allBusinessesTable, columns } from "./columns";
// import { DataTable } from "./data-table";
// import { allBusinessData } from "@/app/(super-admin)/data";
// import GridView from "@/app/(super-admin)/components/allBusiness/GridView";

// export default async function AllBusiness() {
//     const data = await getData();
//     return (
//         <div className="p-6 bg-[#F6F6F6]">
//             <h1 className="font-medium font-poppins text-[#0B0B0B] text-3xl">All Businesses</h1>
//             <p className="font-poppins text-[#626262]">Manage and monitor all registered
//                 businesses</p>
//             <FilterBox />
//             <DataTable columns={columns} data={data} />
//             <GridView />
//         </div>
//     );
// }

// const getData = async (): Promise<allBusinessesTable[]> => {
//     return allBusinessData;
// }
