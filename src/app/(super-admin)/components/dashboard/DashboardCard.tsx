// Fahim
import { cloneElement } from "react";
import { BsPlusSquare } from "react-icons/bs";
import { LuActivity, LuBriefcaseBusiness } from "react-icons/lu";
import { TbLockAccess } from "react-icons/tb";

const dashboardCardData = [
    {
        id: 1,
        iconName: <LuBriefcaseBusiness />,
        iconBackgroundColor: "#BFD7FD",
        iconColor: "#2459B1",
        number: 80,
        description: "Total Businesses"
    },
    {
        id: 2,
        iconName: <LuActivity />,
        iconBackgroundColor: "#BFFDBA",
        iconColor: "#279300",
        number: 10,
        description: "Active in Last 24h"
    },
    {
        id: 3,
        iconName: <BsPlusSquare />,
        iconBackgroundColor: "#DBBFFF",
        iconColor: "#8A38F5",
        number: 20,
        description: "New This Week"
    },
    {
        id: 4,
        iconName: <TbLockAccess />,
        iconBackgroundColor: "#FFBFBF",
        iconColor: "#B3261E",
        number: 2,
        description: "Locked Accounts"
    }
];

export default function DashboardCard() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-9">
            {
                dashboardCardData.map(item => (
                    <div key={item.id} className="bg-[#FFFFFF] h-[160px] rounded-lg p-4 border 
                    flex flex-col gap-2">
                        <div className="w-11 h-11 rounded-lg p-[10px] flex items-center justify-center"
                            style={{ backgroundColor: item.iconBackgroundColor }}>
                            {cloneElement(item.iconName, {
                                color: item.iconColor,
                                size: 20,
                            })}
                        </div>
                        <h1 className="font-poppins font-semibold text-[#000000] text-xl">{item.number}</h1>
                        <p className="font-poppins text-[#595959]">{item.description}</p>
                    </div>
                ))
            }
        </div>
    );
}
