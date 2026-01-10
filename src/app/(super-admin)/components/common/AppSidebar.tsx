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
import { useView } from "../../ListGridContext";
import LogOutModal from "./LogOutModal";
import Image from "next/image";

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
    // const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const pathname = usePathname();
    const { isLogoutOpen, setIsLogoutOpen } = useView();

    return (
        <Sidebar collapsible="icon" side="left" className="font-poppins text-base">
            <SidebarHeader className="h-20 py-1 flex items-center justify-center">
                <div className="w-44 h-16 relative transition-all group-data-[collapsible=icon]:hidden">
                    <Image src="/logos/Primary_Logo.png" alt="main-logo" fill />
                </div>
            </SidebarHeader>
            <SidebarSeparator />

            <SidebarContent className="mt-1">
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
                        {/* {isLogoutOpen && <LogOutModal />} */}
                    </SidebarMenuItem>
                </SidebarMenu>
                <LogOutModal />
            </SidebarFooter>
        </Sidebar>
    );
}
