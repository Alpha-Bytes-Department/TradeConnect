// Fahim
"use client"
import "@/app/globals.css";
import { useView, ViewProvider } from "@/app/(super-admin)/ListGridContext";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import LogOutModal from "../../components/common/LogOutModal";
import { SidebarSeparator } from "@/components/ui/sidebar";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppinsFont = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-poppins"
});


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section>
            <div className={`${poppinsFont.variable} antialiased`}>
                <ViewProvider>
                    <main className="w-full">
                        <NavbarWithoutTrigger />
                        {children}
                    </main>
                </ViewProvider>
            </div>
        </section>
    );
}


function NavbarWithoutTrigger() {
    const { isLogoutOpen, setIsLogoutOpen } = useView();
    const router = useRouter();

    const userPhoto = typeof window !== 'undefined'
        ? (localStorage.getItem('user_photo') &&
            localStorage.getItem('user_photo') !== 'null' &&
            localStorage.getItem('user_photo') !== ''
            ? localStorage.getItem('user_photo')
            : null)
        : null;

    const userName = typeof window !== 'undefined'
        ? (localStorage.getItem("user_name") &&
            localStorage.getItem("user_name") !== 'null'
            ? localStorage.getItem("user_name")
            : '')
        : '';

    const userEmail = typeof window !== 'undefined'
        ? (localStorage.getItem("user_email") &&
            localStorage.getItem("user_email") !== 'null'
            ? localStorage.getItem("user_email")
            : '')
        : '';


    return (
        <div>
            <nav className="p-4 flex items-center justify-between">
                {/*Left*/}
                <Link href="/super-admin/dashboard" className="w-32 h-16 relative transition-all">
                    <Image src="/logos/Primary_Logo.png" alt="main-logo" fill />
                </Link>

                {/*Right*/}
                <div className="flex justify-end items-center gap-3">
                    <div className="relative w-12 h-12">
                        {userPhoto ? (
                            <Image src={userPhoto} alt="admin-photo" fill className="rounded-full
                                object-cover" unoptimized />
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
                            <button className="font-poppins text-[#252525] cursor-pointer 
                            flex items-center gap-3" onClick={() => router.push("/super-admin/settings")}>
                                <Settings className="w-5 h-5" />
                                Settings
                            </button>
                            <button className="font-poppins text-[#B3261E] cursor-pointer
                            flex items-center gap-3" onClick={() => setIsLogoutOpen(true)}>
                                <LogOut className="w-5 h-5" />
                                Log Out
                            </button>
                        </PopoverContent>
                    </Popover>
                    <LogOutModal />
                    {/* {isLogoutOpen && <LogOutModal />} */}
                </div>
            </nav>
            <SidebarSeparator />
        </div>
    );
}