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
import { useState } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

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
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const pathname = usePathname();

    const handleLogout = () => {
        alert("Logged out successfully!");
        setIsLogoutOpen(false);
    };

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
                        <SidebarMenuButton className="text-red-600 hover:text-red-600 cursor-pointer
                        flex items-center justify-center" onClick={() => setIsLogoutOpen(true)}>
                            <TbLogout />
                            Log Out
                        </SidebarMenuButton>
                        {isLogoutOpen &&
                            <Modal
                                isOpen={isLogoutOpen}
                                onClose={() => setIsLogoutOpen(false)}
                                title="Confirm Logout"
                                size="sm"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <svg
                                                className="h-10 w-10 text-orange-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 
                                            dark:text-gray-100">
                                                Logout Confirmation
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Are you sure you want to logout? You will need to sign in
                                                again to access your account.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-orange-50 dark:bg-orange-900/20 border 
                                    border-orange-200 dark:border-orange-800 rounded-md p-3">
                                        <p className="text-sm text-orange-700 dark:text-orange-300">
                                            Any unsaved changes will be lost. Make sure to save your work
                                            before logging out.
                                        </p>
                                    </div>

                                    <div className="flex justify-end space-x-3">
                                        <Button onClick={() => setIsLogoutOpen(false)} variant="secondary">
                                            Stay Logged In
                                        </Button>
                                        <Button
                                            onClick={handleLogout}
                                            variant="default"
                                            className="bg-orange-500 hover:bg-orange-600"
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </Modal>
                        }
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
