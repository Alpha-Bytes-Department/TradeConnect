// Fahim
"use client"
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { SidebarSeparator, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { redirect } from "next/navigation";

export default function Navbar() {
    return (
        <div>
            <nav className="p-4 flex items-center justify-between">
                {/*Left*/}
                <SidebarTrigger />

                {/*Right*/}
                <div className="flex justify-end items-center gap-3">
                    <div className="relative w-12 h-12">
                        <Image src={"/dashboard-images/AdminPhoto.jpg"} alt="admin-photo" fill
                            className="rounded-full" />
                    </div>
                    <div>
                        <h1 className="font-poppins text-[#252525]">Admin</h1>
                        <p className="font-poppins text-[#595959]">admin@business.com</p>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <ChevronDown className="cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent className="w-64 mr-4 flex flex-col gap-4 bg-white">
                            <button className="font-poppins text-[#252525] cursor-pointer 
                            flex items-center gap-3" onClick={() => redirect("/super-admin/settings")}>
                                <Settings className="w-5 h-5" />
                                Settings
                            </button>
                            <button className="font-poppins text-[#B3261E] cursor-pointer
                            flex items-center gap-3">
                                <LogOut className="w-5 h-5" />
                                Log Out
                            </button>
                        </PopoverContent>
                    </Popover>
                </div>
            </nav>
            <SidebarSeparator />
        </div>
    );
}