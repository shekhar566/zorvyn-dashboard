import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DashboardProvider } from "@/context/DashboardContext";
import { Sidebar } from "@/src/components/layout/Sidebar";
import { Header } from "@/src/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zorvyn Finance Dashboard",
  description: "Frontend Developer Intern Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 flex h-screen overflow-hidden`}>
        <DashboardProvider>
          <Sidebar />
          {/* Main Content Wrapper - offset by the 64w Sidebar */}
          <div className="flex-1 flex flex-col ml-64 overflow-hidden">
            <Header />
            {/* Scrollable Page Content */}
            <main className="flex-1 overflow-y-auto p-8">
              {children}
            </main>
          </div>
        </DashboardProvider>
      </body>
    </html>
  );
}