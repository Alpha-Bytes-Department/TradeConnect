// Fahim
"use client"
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator
} from "@/components/ui/sidebar";
import { LuBriefcaseBusiness, LuLayoutDashboard, LuSettings } from "react-icons/lu";
import { FiPlusCircle } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { usePathname } from "next/navigation";

type SidebarItem = {
    title: string;
    url: string;
    icon: React.ReactNode;
};

const items: SidebarItem[] = [
    {
        title: "Dashboard",
        url: "/super-admin/dashboard",
        icon: <LuLayoutDashboard />,
    },
    {
        title: "All Businesses",
        url: "/super-admin/all-businesses",
        icon: <LuBriefcaseBusiness />,
    },
    {
        title: "Create Business",
        url: "/super-admin/create-business",
        icon: <FiPlusCircle />,
    },
    {
        title: "Settings",
        url: "/super-admin/settings",
        icon: <LuSettings />,
    },
];

export default function AppSidebar() {
    const pathname = usePathname();
    return (
        <Sidebar collapsible="icon" side="left" className="font-poppins text-base">
            <SidebarHeader className="py-4">
                <div className="flex flex-col pl-3 transition-all group-data-[collapsible=icon]:hidden">
                    <p className="font-poppins font-medium text-[#1C4589] text-xl">TradeConnect</p>
                    <p className="text-[#626262]">Super Admin</p>
                </div>
            </SidebarHeader>
            <SidebarSeparator />

            <SidebarContent>
                <SidebarGroup>
                    {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = pathname === item.url;
                                // console.log(pathname);
                                // console.log(isActive);
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild
                                            className={`${isActive ?
                                                "bg-[#BFD7FD] text-[#2459B1] hover:bg-[#BFD7FD] hover:text-[#2459B1]" : "text-black"}`}>
                                            <a href={item.url}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-red-600 hover:text-red-600 cursor-pointer">
                            <TbLogout />
                            Log Out
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
