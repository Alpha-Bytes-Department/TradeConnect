// Fahim
import DashboardCard from "../../components/dashboard/DashboardCard";
import { Chart } from "../../components/dashboard/Chart";
import Link from "next/link";
import { columns, dashboardLatestBusiness } from "./columns.tsx";
import { DataTable } from "./data-table";

export default async function Dashboard() {
    const data = await getData();
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
                <Link href="" className="text-[#327EF9] text-xl">View All</Link>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}


const getData = async (): Promise<dashboardLatestBusiness[]> => {
    return [
        {
            id: 1,
            business_name: "Daraz",
            country: "Bangladesh",
            last_login: "2024-12-05 09:30",
            status: "Active",
        },
        {
            id: 2,
            business_name: "Adidas",
            country: "USA",
            last_login: "2024-12-05 09:30",
            status: "Active",
        },
        {
            id: 3,
            business_name: "Amazon",
            country: "UK",
            last_login: "2024-12-05 09:30",
            status: "Locked",
        },
        {
            id: 4,
            business_name: "Rolex",
            country: "UK",
            last_login: "2024-12-05 09:30",
            status: "Active",
        },
        {
            id: 5,
            business_name: "Chilox",
            country: "Bangladesh",
            last_login: "2024-12-05 09:30",
            status: "Active",
        },
        {
            id: 6,
            business_name: "Unilever",
            country: "Germany",
            last_login: "2024-12-05 09:30",
            status: "Locked",
        },
        {
            id: 7,
            business_name: "Nivea Men",
            country: "France",
            last_login: "2024-12-05 09:30",
            status: "Locked",
        },
        {
            id: 8,
            business_name: "Laurial Paris",
            country: "France",
            last_login: "2024-12-05 09:30",
            status: "Active",
        },
        {
            id: 9,
            business_name: "Dell",
            country: "USA",
            last_login: "2024-12-05 09:30",
            status: "Active",
        },
        {
            id: 10,
            business_name: "HP",
            country: "USA",
            last_login: "2024-12-05 09:30",
            status: "Locked",
        },
        {
            id: 11,
            business_name: "ASUS",
            country: "Taiwan",
            last_login: "2024-12-05 09:30",
            status: "Locked",
        },
        {
            id: 12,
            business_name: "Oleves",
            country: "China",
            last_login: "2024-12-05 09:30",
            status: "Active",
        },
        {
            id: 13,
            business_name: "Transcend",
            country: "Taiwan",
            last_login: "2024-12-05 09:30",
            status: "Locked",
        },
        {
            id: 14,
            business_name: "Fantech",
            country: "Phillipines",
            last_login: "2024-12-05 09:30",
            status: "Active",
        },
        {
            id: 15,
            business_name: "Logitech",
            country: "Switzerland",
            last_login: "2024-12-05 09:30",
            status: "Active",
        },
        {
            id: 16,
            business_name: "BenQ",
            country: "Taiwan",
            last_login: "2024-12-05 09:30",
            status: "Active",
        },
    ];
}