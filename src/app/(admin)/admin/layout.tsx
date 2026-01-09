'use client'
import "@/app/globals.css";
import { useState, useEffect } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./components/common/AppSidebar";
import Navbar from "./components/common/NavBar";
import { ViewProvider } from "./components/ListGridContext";
import { useRouter } from "next/navigation";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();

    // FIX 1: Default to false so content is hidden by default
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            router.push('/');
        } else {
            setIsAuthorized(true);
        }
        setIsLoading(false);
    }, [router]);

    // FIX 2: Show a loading state or nothing while checking
    if (isLoading) {
        return <div className="h-screen w-full bg-white" />; // Clean white screen while checking
    }

    // FIX 3: If not authorized, don't even show the Sidebar/Navbar structure
    if (!isAuthorized) {
        return null;
    }

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