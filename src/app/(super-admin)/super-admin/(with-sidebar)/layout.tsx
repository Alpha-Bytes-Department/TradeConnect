// Fahim
"use client"
import "@/app/globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../../components/common/AppSidebar";
import { ViewProvider } from "../../ListGridContext";
import { Poppins } from "next/font/google";
import NavBarWithTrigger from "../../components/common/NavBarWithTrigger";
import { FilterProvider } from "../../FilterContext";

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
                <FilterProvider>
                    <ViewProvider>
                        <SidebarProvider>
                            <AppSidebar />
                            <main className="w-full">
                                <NavBarWithTrigger />
                                {children}
                            </main>
                        </SidebarProvider>
                    </ViewProvider>
                </FilterProvider>
            </div>
        </section>
    );
}

