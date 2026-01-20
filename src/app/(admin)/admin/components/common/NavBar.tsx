"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/app/api";
import { SidebarSeparator, SidebarTrigger } from '@/components/ui/sidebar';
import AccountDropdown from "./dropdown";

/* ✅ ADD THIS */
interface BusinessProfile {
    logo?: string;
    user_email?: string;
    user_full_name: string;
}

export default function Navbar() {

    /* ✅ FIXED TYPE */
    const [data, setData] = useState<BusinessProfile | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("business/my/");
                setData({logo:response?.data?.business.logo,
                user_email : response?.data?.business.user_email,
                    user_full_name: response?.data?.business.user_full_name });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <nav className="flex items-center justify-between min-h-21 px-8">
                <SidebarTrigger />

                <div className="flex justify-end items-center gap-3">
                    <div className="relative w-12 h-12">
                        <Image
                            src={data?.logo || "/logo.png"}
                            alt="admin-photo"
                            fill
                            className="rounded-full object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="font-poppins text-[#252525] text-md">
                            {data?.user_full_name}
                            </h1>
                        <p className="font-poppins text-[#595959] text-sm">
                            {data?.user_email}
                        </p>
                    </div>
                    <AccountDropdown />
                </div>
            </nav>
            <SidebarSeparator />
        </div>
    );
}
