// Fahim
"use client"
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, useSidebar
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LuBriefcaseBusiness, LuLayoutDashboard, LuSettings } from "react-icons/lu";
import { FiPlusCircle } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { useView } from "../../ListGridContext";
import LogOutModal from "./LogOutModal";
import Image from "next/image";
import Link from "next/link";

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
    // Get sidebar state to check if it's collapsed
    const { state } = useSidebar();

    return (
        // Added delay to prevent tooltip from showing immediately
        <TooltipProvider delayDuration={200} skipDelayDuration={0}>
            <Sidebar collapsible="icon" side="left" className="font-poppins text-base">
                <SidebarHeader className="h-20 flex items-center justify-center">
                    <Link href="/super-admin/dashboard" className="relative w-32 h-24 transition-all 
                    group-data-[collapsible=icon]:hidden">
                        <Image src="/logos/Primary_Logo.png" alt="main-logo" fill />
                    </Link>
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
                                            {/* Tooltip only shows when sidebar is collapsed and on hover */}
                                            <Tooltip delayDuration={200}>
                                                <TooltipTrigger asChild>
                                                    <SidebarMenuButton asChild
                                                        className={`${isActive ?
                                                            "bg-[#BFD7FD] text-[#2459B1] hover:bg-[#BFD7FD] hover:text-[#2459B1]" : "text-black"}`}>
                                                        <Link href={item.url}>
                                                            {item.icon}
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </TooltipTrigger>
                                                {/* Only render tooltip when sidebar is collapsed */}
                                                {state === "collapsed" && (
                                                    <TooltipContent side="right" className="font-poppins">
                                                        <p>{item.title}</p>
                                                    </TooltipContent>
                                                )}
                                            </Tooltip>
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
                            {/* Tooltip only shows when collapsed and on hover */}
                            <Tooltip delayDuration={200}>
                                <TooltipTrigger asChild>
                                    <SidebarMenuButton className="text-red-600 hover:text-red-600 
                                    cursor-pointer flex items-center justify-center"
                                        onClick={() => setIsLogoutOpen(true)}>
                                        <TbLogout />
                                        {/* Show "Log Out" text only when sidebar is expanded */}
                                        <span className="group-data-[collapsible=icon]:hidden">Log Out</span>
                                    </SidebarMenuButton>
                                </TooltipTrigger>
                                {/* Only render tooltip when sidebar is collapsed */}
                                {state === "collapsed" && (
                                    <TooltipContent side="right" className="font-poppins">
                                        <p>Log Out</p>
                                    </TooltipContent>
                                )}
                            </Tooltip>
                            {/* {isLogoutOpen && <LogOutModal />} */}
                        </SidebarMenuItem>
                    </SidebarMenu>
                    <LogOutModal />
                </SidebarFooter>
            </Sidebar>
        </TooltipProvider>
    );
}





// // Fahim
// "use client"
// import {
//     Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader,
//     SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator
// } from "@/components/ui/sidebar";
// import { LuBriefcaseBusiness, LuLayoutDashboard, LuSettings } from "react-icons/lu";
// import { FiPlusCircle } from "react-icons/fi";
// import { TbLogout } from "react-icons/tb";
// import { usePathname } from "next/navigation";
// import { useView } from "../../ListGridContext";
// import LogOutModal from "./LogOutModal";
// import Image from "next/image";
// import Link from "next/link";

// type SidebarItem = {
//     title: string;
//     url: string;
//     icon: React.ReactNode;
// };

// const items: SidebarItem[] = [
//     {
//         title: "Dashboard",
//         url: "/super-admin/dashboard",
//         icon: <LuLayoutDashboard />,
//     },
//     {
//         title: "All Businesses",
//         url: "/super-admin/all-businesses",
//         icon: <LuBriefcaseBusiness />,
//     },
//     {
//         title: "Create Business",
//         url: "/super-admin/create-business",
//         icon: <FiPlusCircle />,
//     },
//     {
//         title: "Settings",
//         url: "/super-admin/settings",
//         icon: <LuSettings />,
//     },
// ];

// export default function AppSidebar() {
//     // const [isLogoutOpen, setIsLogoutOpen] = useState(false);
//     const pathname = usePathname();
//     const { isLogoutOpen, setIsLogoutOpen } = useView();

//     return (
//         <Sidebar collapsible="icon" side="left" className="font-poppins text-base">
//             <SidebarHeader className="h-20 py-1 flex items-center justify-center">
//                 <Link href="/super-admin/dashboard" className="w-44 h-16 relative transition-all
//                 group-data-[collapsible=icon]:hidden">
//                     <Image src="/logos/Primary_Logo.png" alt="main-logo" fill />
//                 </Link>
//             </SidebarHeader>
//             <SidebarSeparator />

//             <SidebarContent className="mt-1">
//                 <SidebarGroup>
//                     {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
//                     <SidebarGroupContent>
//                         <SidebarMenu>
//                             {items.map((item) => {
//                                 const isActive = pathname === item.url;
//                                 // console.log(pathname);
//                                 // console.log(isActive);
//                                 return (
//                                     <SidebarMenuItem key={item.title}>
//                                         <SidebarMenuButton asChild
//                                             className={`${isActive ?
//                                                 "bg-[#BFD7FD] text-[#2459B1] hover:bg-[#BFD7FD] hover:text-[#2459B1]" : "text-black"}`}>
//                                             <Link href={item.url}>
//                                                 {item.icon}
//                                                 <span>{item.title}</span>
//                                             </Link>
//                                         </SidebarMenuButton>
//                                     </SidebarMenuItem>
//                                 )
//                             })
//                             }
//                         </SidebarMenu>
//                     </SidebarGroupContent>
//                 </SidebarGroup>
//             </SidebarContent>

//             <SidebarFooter>
//                 <SidebarMenu>
//                     <SidebarMenuItem>
//                         <SidebarMenuButton className="text-red-600 hover:text-red-600 cursor-pointer
//                         flex items-center justify-center" onClick={() => setIsLogoutOpen(true)}>
//                             <TbLogout />
//                             Log Out
//                         </SidebarMenuButton>
//                         {/* {isLogoutOpen && <LogOutModal />} */}
//                     </SidebarMenuItem>
//                 </SidebarMenu>
//                 <LogOutModal />
//             </SidebarFooter>
//         </Sidebar>
//     );
// }
