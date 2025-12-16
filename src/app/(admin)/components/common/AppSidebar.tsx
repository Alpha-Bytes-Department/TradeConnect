import { Calendar, ChevronDown, ChevronUp, Home, Inbox, Plus, Projector, Search, Settings, User2 } from "lucide-react";
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent,
    SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem,
    SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarSeparator
} from "@/components/ui/sidebar";
//import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
//import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
//import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";

const items = [
    {
        title: "Dashboard",
        url: "/admin",
        icon: Home,
    },
    {
        title: "All Businesses",
        url: "/admin/all-businesses",
        icon: Inbox,
    },
    {
        title: "Create Business",
        url: "/admin/create-business",
        icon: Calendar,
    },
    {
        title: "Directory",
        url: "/admin/directory",
        icon: Search,
    },
    {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
    },
];

export default function AppSidebar() {
    return (
        <Sidebar collapsible="icon" side="left">
            <SidebarHeader className="py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <div className="flex flex-col">
                                <p className="font-poppins font-medium text-[#1C4589] text-xl">TradeConnect</p>
                                {/* <p className="text-[#626262]">Super Admin</p> */}
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
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
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* <SidebarGroup>
                    <SidebarGroupLabel>Projects</SidebarGroupLabel>
                    <SidebarGroupAction>
                        <Plus /> <p className="sr-only">Add Project</p>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/">
                                        <Projector />
                                        See All Projects
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/">
                                        <Plus />
                                        Add New Project
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger>
                                Collapsible Group
                                <ChevronDown className="ml-auto transition-transform 
                                group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href="/">
                                                <Projector />
                                                See All Users
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href="/">
                                                <Plus />
                                                Add New User
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>

                <SidebarGroup>
                    <SidebarGroupLabel>Nested Items</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/">
                                        <Projector />
                                        See All
                                    </Link>
                                </SidebarMenuButton>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton asChild>
                                            <Link href="/">
                                                <Plus />
                                                Add Project 1
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton asChild>
                                            <Link href="/">
                                                <Plus />
                                                Add Project 2
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton asChild>
                                            <Link href="/">
                                                <Plus />
                                                Add Project 3
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>*/}
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        Log Out
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}