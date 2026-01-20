//fahim

"use client";

import { ChevronDown, LogOut, Settings } from "lucide-react";
import { SidebarSeparator, SidebarTrigger } from '@/components/ui/sidebar';
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { redirect } from "next/navigation";
import LogOutModal from "./LogOutModal";
import { useView } from "../../ListGridContext";
import { useState, useEffect } from "react";

export default function NavBarWithTrigger() {
    const { isLogoutOpen, setIsLogoutOpen } = useView();

    // Local state to store data from localStorage
    const [userPhoto, setUserPhoto] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");

    useEffect(() => {
        // This runs only on client side
        setUserPhoto(localStorage.getItem('user_photo') || '');
        setUserName(localStorage.getItem('user_name') || '');
        setUserEmail(localStorage.getItem('user_email') || '');
    }, []);

    return (
        <div>
            <nav className="p-4 flex items-center justify-between">
                {/*Left*/}
                <SidebarTrigger />

                {/*Right*/}
                <div className="flex justify-end items-center gap-3">
                    <div className="relative w-12 h-12">
                        {userPhoto ? (
                            <Image src={userPhoto} alt="admin-photo" fill className="rounded-full" />
                        ) : (
                            <div className="w-full h-full bg-gray-200 rounded-full" />
                        )}
                    </div>
                    <div>
                        <h1 className="font-poppins text-[#252525]">{userName}</h1>
                        <p className="font-poppins text-[#595959]">{userEmail}</p>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <ChevronDown className="cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent className="w-64 mr-4 flex flex-col gap-4 bg-white">
                            <button className="font-poppins text-[#252525] cursor-pointer flex items-center gap-3" onClick={() => redirect("/super-admin/settings")}>
                                <Settings className="w-5 h-5" />
                                Settings
                            </button>
                            <button className="font-poppins text-[#B3261E] cursor-pointer flex items-center gap-3" onClick={() => setIsLogoutOpen(true)}>
                                <LogOut className="w-5 h-5" />
                                Log Out
                            </button>
                        </PopoverContent>
                    </Popover>
                    <LogOutModal />
                </div>
            </nav>
            <SidebarSeparator />
        </div>
    );
}
