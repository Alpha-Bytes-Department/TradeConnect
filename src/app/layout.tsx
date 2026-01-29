// Fahim
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ViewProvider } from "./(super-admin)/ListGridContext";
import { Toaster } from "@/components/ui/sonner";

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: "Coast to Coast Network",
  description: "Business Hub Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppinsFont.variable} antialiased`}
      >
        <ViewProvider>
          {children} {/* Pages render here */}
          <Toaster /> {/* Toast notifications render here - available on ALL pages */}
        </ViewProvider>
      </body>
    </html>
  );
}
