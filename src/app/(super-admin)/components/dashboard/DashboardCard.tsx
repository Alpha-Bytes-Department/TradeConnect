// Fahim
import axios from "axios";
import { useEffect, useState } from "react";
import { BsPlusSquare } from "react-icons/bs";
import { LuActivity, LuBriefcaseBusiness } from "react-icons/lu";
import { TbLockAccess } from "react-icons/tb";

const iconMap = {
    "LuBriefcaseBusiness": LuBriefcaseBusiness,
    "LuActivity": LuActivity,
    "BsPlusSquare": BsPlusSquare,
    "TbLockAccess": TbLockAccess,
};

export default function DashboardCard() {
    const [dashboardCardData, setDashboardCardData] = useState<any[]>([]);

    useEffect(() => {
        const fetchDashboardCards = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) return;

            const response = await axios.get(
                `https://particularistically-transelementary-owen.ngrok-free.dev/api/business/admin/dashboard/`,
                {
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setDashboardCardData(response?.data?.data?.metrics);
        };
        fetchDashboardCards();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-9">
            {
                dashboardCardData?.map(item => (
                    <div key={item?.id} className="bg-[#FFFFFF] h-[160px] rounded-lg p-4 border 
                    flex flex-col gap-2">
                        <div className="w-11 h-11 rounded-lg p-[10px] flex items-center justify-center"
                            style={{ backgroundColor: item?.iconBackgroundColor }}>
                            {(() => {
                                // "<LuBriefcaseBusiness />" → "LuBriefcaseBusiness"
                                const name = item?.iconName?.replace("<", "").replace("/>", "").trim();
                                // extracting real icon from map
                                const Icon = iconMap[name];
                                return Icon ? <Icon color={item?.iconColor} size={20} /> : "";
                            })()}
                        </div>
                        <h1 className="font-poppins font-semibold text-[#000000] text-xl">
                            {item?.number}</h1>
                        <p className="font-poppins text-[#595959]">{item?.description}</p>
                    </div>
                ))
            }
        </div>
    );
}



// {
//     "id": 1,
//     "key": "total_businesses",
//     "number": 21,
//     "description": "Total Businesses",
//     "iconName": "<LuBriefcaseBusiness />",
//     "iconBackgroundColor": "#BFD7FD",
//     "iconColor": "#2459B1"
// },