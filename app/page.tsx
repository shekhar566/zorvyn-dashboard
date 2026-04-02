"use client";

import { useDashboard } from "../context/DashboardContext";

export default function Home() {
  const { userRole, toggleRole } = useDashboard();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Zorvyn Dashboard Engine Status: ONLINE</h1>
      <p className="mt-4 text-lg">Current Role: <span className={`font-semibold ${userRole === 'admin' ? 'text-red-600' : 'text-blue-600'}`}>{userRole.toUpperCase()}</span></p>
      <button 
        onClick={toggleRole}
        className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
      >
        Toggle User Role
      </button>
    </main>
  );
}