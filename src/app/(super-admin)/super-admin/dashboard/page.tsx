// Fahim
import DashboardCard from "../../components/dashboard/DashboardCard";
import { Chart } from "../../components/dashboard/Chart";

export default function Dashboard() {
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
        </div>
    );
}
