import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DashboardProvider } from "../context/DashboardContext";

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
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <DashboardProvider>
          {children}
        </DashboardProvider>
      </body>
    </html>
  );
}