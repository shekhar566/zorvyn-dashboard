"use client";

import { useDashboard } from "@/context/DashboardContext";
import { Bell, ShieldAlert, Eye } from "lucide-react";

export function Header() {
  const { userRole, toggleRole } = useDashboard();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-gray-800">Financial Overview</h2>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
          <button
            onClick={() => userRole !== 'viewer' && toggleRole()}
            className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              userRole === 'viewer' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Eye className="w-4 h-4 mr-1.5" />
            Viewer
          </button>
          <button
            onClick={() => userRole !== 'admin' && toggleRole()}
            className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              userRole === 'admin' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <ShieldAlert className="w-4 h-4 mr-1.5" />
            Admin
          </button>
        </div>

        {/* Polished Icons */}
        <div className="flex items-center space-x-5 border-l border-gray-200 pl-6">
          <div className="relative cursor-pointer">
            <Bell className="w-5 h-5 text-gray-500 hover:text-gray-800 transition-colors" />
            {/* Red Notification Ping */}
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </div>
          
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs border border-blue-200 cursor-pointer hover:bg-blue-200 transition-colors">
            SA
          </div>
        </div>
      </div>
    </header>
  );
}