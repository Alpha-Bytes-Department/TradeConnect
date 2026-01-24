// Fahim
"use client"
import DashboardCard from "@/app/(super-admin)/components/dashboard/DashboardCard";
import Link from "next/link";
import { columns, dashboardLatestBusiness } from "./columns";
import { DataTable } from "./data-table";
import Chart from "@/app/(super-admin)/components/dashboard/Chart";
import { useEffect, useState } from "react";
import api from "@/lib/axiosInterceptor";

export default function Dashboard() {
    const [datas, setDatas] = useState<any[]>([]);

    useEffect(() => {
        const fetchDashboardDatas = async () => {
            const response = await api.get('/api/business/admin/dashboard/');
            setDatas(response?.data?.data?.latest_businesses);
            console.log(response?.data?.data?.latest_businesses);
            //setTotal(response?.data?.count);
        };
        fetchDashboardDatas();
    }, []);

    return (
        <div className="px-8 py-8 bg-[#F6F6F6]">
            <h1 className="font-poppins font-medium text-3xl text-[#0B0B0B]">Dashboard Overview</h1>
            <p className="font-poppins text-[#626262] mt-1">Monitor and manage your business directory</p>
            <div className="mt-6">
                <DashboardCard />
            </div>
            <div className="mt-11">
                <Chart />
            </div>
            <div className="flex justify-between items-center mt-16 mb-4">
                <h1 className="font-medium font-poppins text-xl text-[#141414]">Latest Business</h1>
                <Link href="/super-admin/all-businesses" className="font-medium text-[#327EF9] text-xl">
                    View All</Link>
            </div>
            <DataTable columns={columns} data={datas} />
        </div>
    );
}

