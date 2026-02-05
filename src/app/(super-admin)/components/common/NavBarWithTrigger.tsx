// Fahim
"use client";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { SidebarSeparator, SidebarTrigger } from '@/components/ui/sidebar';
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import LogOutModal from "./LogOutModal";
import { useView } from "../../ListGridContext";


export default function NavBarWithTrigger() {
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
                <SidebarTrigger />

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
                            <button className="font-poppins text-[#252525] cursor-pointer flex items-center
                            gap-3" onClick={() => router.push("/super-admin/settings")}>
                                <Settings className="w-5 h-5" />
                                Settings
                            </button>
                            <button className="font-poppins text-[#B3261E] cursor-pointer flex items-center
                            gap-3" onClick={() => setIsLogoutOpen(true)}>
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








// //Fahim
// "use client";
// import { ChevronDown, LogOut, Settings } from "lucide-react";
// import { SidebarSeparator, SidebarTrigger } from '@/components/ui/sidebar';
// import Image from "next/image";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { useRouter } from "next/navigation";
// import LogOutModal from "./LogOutModal";
// import { useView } from "../../ListGridContext";
// import { useState, useEffect } from "react";

// export default function NavBarWithTrigger() {
//     const { isLogoutOpen, setIsLogoutOpen } = useView();

//     // Initialize with empty/fallback values to match SSR
//     const [userPhoto, setUserPhoto] = useState<string | null>(null);
//     const [userName, setUserName] = useState<string>("");
//     const [userEmail, setUserEmail] = useState<string>("");

//     // Add loading state to prevent hydration mismatch
//     const [isClient, setIsClient] = useState(false);

//     const router = useRouter();

//     useEffect(() => {
//         // Mark as client-side
//         setIsClient(true);

//         // Load from localStorage only on client
//         const photo = localStorage.getItem('user_photo');
//         setUserPhoto((photo && photo !== 'null' && photo !== '') ? photo : null);

//         const name = localStorage.getItem('user_name');
//         setUserName((name && name !== 'null') ? name : '');

//         const email = localStorage.getItem('user_email');
//         setUserEmail((email && email !== 'null') ? email : '');
//     }, []);

//     // Don't render user info until client-side hydration is complete
//     if (!isClient) {
//         return (
//             <div>
//                 <nav className="p-4 flex items-center justify-between">
//                     <SidebarTrigger />
//                     <div className="flex justify-end items-center gap-3">
//                         <div className="relative w-12 h-12 bg-gray-200 rounded-full" />
//                         <div>
//                             <h1 className="font-poppins text-[#252525]">&nbsp;</h1>
//                             <p className="font-poppins text-[#595959]">&nbsp;</p>
//                         </div>
//                     </div>
//                 </nav>
//                 <SidebarSeparator />
//             </div>
//         );
//     }

//     return (
//         <div>
//             <nav className="p-4 flex items-center justify-between">
//                 {/*Left*/}
//                 <SidebarTrigger />

//                 {/*Right*/}
//                 <div className="flex justify-end items-center gap-3">
//                     <div className="relative w-12 h-12">
//                         {userPhoto ? (
//                             <Image src={userPhoto} alt="admin-photo" fill className="rounded-full
//                             object-cover" unoptimized />
//                         ) : (
//                             <div className="w-full h-full bg-gray-200 rounded-full" />
//                         )}
//                     </div>
//                     <div>
//                         <h1 className="font-poppins text-[#252525]">{userName}</h1>
//                         <p className="font-poppins text-[#595959]">{userEmail}</p>
//                     </div>
//                     <Popover>
//                         <PopoverTrigger asChild>
//                             <ChevronDown className="cursor-pointer" />
//                         </PopoverTrigger>
//                         <PopoverContent className="w-64 mr-4 flex flex-col gap-4 bg-white">
//                             <button className="font-poppins text-[#252525] cursor-pointer flex items-center
//                             gap-3" onClick={() => router.push("/super-admin/settings")}>
//                                 <Settings className="w-5 h-5" />
//                                 Settings
//                             </button>
//                             <button className="font-poppins text-[#B3261E] cursor-pointer flex items-center
//                             gap-3" onClick={() => setIsLogoutOpen(true)}>
//                                 <LogOut className="w-5 h-5" />
//                                 Log Out
//                             </button>
//                         </PopoverContent>
//                     </Popover>
//                     <LogOutModal />
//                 </div>
//             </nav>
//             <SidebarSeparator />
//         </div>
//     );
// }






