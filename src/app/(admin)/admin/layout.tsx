'use client'
import type { Metadata } from "next";
import "@/app/globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
// import { cookies } from "next/headers";
import AppSidebar from "./components/common/AppSidebar";
import Navbar from "./components/common/NavBar";
import { ViewProvider } from "./components/ListGridContext";
import { useRouter } from "next/navigation";



export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const cookieStore = await cookies();
    // const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

    const router = useRouter()

    const token = localStorage.getItem("accessToken");

    /*
    if (!token) {
        router.push('/login')
    }
    */

    return (
        
                <SidebarProvider>
                    <ViewProvider>
                    <AppSidebar />
                    <main className="w-full">
                        <Navbar />
                        <div className="px-4">
                            
                            {children}
                        </div>
                    </main>
                    </ViewProvider>
                </SidebarProvider>
            
    );
}

