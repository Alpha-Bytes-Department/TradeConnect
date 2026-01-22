// Fahim
"use client"
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator
} from "@/components/ui/sidebar";
import { LuBriefcaseBusiness, LuLayoutDashboard, LuSettings } from "react-icons/lu";
import { FiPlusCircle } from "react-icons/fi";
import { TbCategory, TbCategory2, TbCategoryFilled, TbCategoryPlus, TbLogout } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { useView } from "../ListGridContext";
import LogOutModal from "./LogOutModal";
import { DotSquareIcon, Grid3x3Icon } from "lucide-react";
import { BsGrid3X3Gap } from "react-icons/bs";
import Image from "next/image";

type SidebarItem = {
    title: string;
    url: string;
    icon: React.ReactNode;
};

const items: SidebarItem[] = [
    
    {
        title: "Directory",
        url: "/admin/directory",
        icon: <BsGrid3X3Gap/>
    },
    {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: <LuLayoutDashboard />,
    },
];

export default function AppSidebar() {
    // const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const pathname = usePathname();
    const { isLogoutOpen, setIsLogoutOpen } = useView();

    return (
        <Sidebar collapsible="icon" side="left" className="font-poppins text-base">
            <SidebarHeader className=" h-21">
                <div className="flex flex-col items-start pl-3 transition-all group-data-[collapsible=icon]:hidden">
                    <button className="relative fc pl-3 " >
                        <Image src={'/primaryLogo.png'} alt={'logo'} height={100} width={120} className="object-cover"/>
                    </button>
                    
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
                        {/* {isLogoutOpen && <LogOutModal />} */}
                    </SidebarMenuItem>
                </SidebarMenu>
                <LogOutModal />
            </SidebarFooter>
        </Sidebar>
    );
}
