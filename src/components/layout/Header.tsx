"use client";

import { useDashboard } from "@/context/DashboardContext";
import { Bell, User, ShieldAlert, Eye } from "lucide-react";

export function Header() {
  const { userRole, toggleRole } = useDashboard();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-gray-800">Financial Overview</h2>
      </div>

      <div className="flex items-center space-x-6">
        {/* The Role Toggle */}
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

        {/* Fake User Icons for Polish */}
        <div className="flex items-center space-x-4 border-l border-gray-200 pl-6 text-gray-500">
          <Bell className="w-5 h-5 cursor-pointer hover:text-gray-700" />
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}