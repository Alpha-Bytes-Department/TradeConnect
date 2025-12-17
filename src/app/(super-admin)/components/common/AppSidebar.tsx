// Fahim
"use client"
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu,
    SidebarMenuButton, SidebarMenuItem, SidebarSeparator
} from "@/components/ui/sidebar";
//import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
//import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LuBriefcaseBusiness, LuLayoutDashboard, LuLayoutGrid, LuSettings } from "react-icons/lu";
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
        title: "Directory",
        url: "/super-admin/directory",
        icon: <LuLayoutGrid />,
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
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-red-600">
                            <TbLogout />
                            Log Out
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
