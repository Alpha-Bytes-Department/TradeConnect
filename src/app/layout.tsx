// Fahim
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ViewProvider } from "./(super-admin)/ListGridContext";

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: "TradeConnect",
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
          {children}
        </ViewProvider>
      </body>
    </html>
  );
}
