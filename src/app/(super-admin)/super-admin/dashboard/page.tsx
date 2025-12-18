// Fahim
import DashboardCard from "../../components/dashboard/DashboardCard";

export default function Dashboard() {
    return (
        <div className="px-8 py-4">
            <h1 className="font-poppins font-medium text-3xl text-[#0B0B0B]">Dashboard Overview</h1>
            <p className="font-poppins text-[#626262] mt-1">Monitor and manage your business directory</p>
            <div className="mt-6">
                <DashboardCard/>
            </div>
        </div>
    );
}