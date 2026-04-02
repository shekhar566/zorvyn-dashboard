import { LayoutDashboard, ArrowLeftRight, PieChart, Wallet } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col h-screen fixed left-0 top-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <Wallet className="w-6 h-6 text-blue-500 mr-2" />
        <span className="text-white font-bold text-lg tracking-wide">ZORVYN<span className="text-blue-500">.</span></span>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2">
        {/* Active State applied here */}
        <a href="#" className="flex items-center px-4 py-3 bg-blue-600 text-white rounded-lg shadow-md transition-colors">
          <LayoutDashboard className="w-5 h-5 mr-3 text-white" />
          <span className="font-medium">Dashboard</span>
        </a>
        <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
          <ArrowLeftRight className="w-5 h-5 mr-3 text-gray-400" />
          <span className="font-medium">Transactions</span>
        </a>
        <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
          <PieChart className="w-5 h-5 mr-3 text-gray-400" />
          <span className="font-medium">Insights</span>
        </a>
      </nav>

      {/* Polished User Profile Block */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3 bg-gray-800 rounded-xl p-3 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-sm shadow-inner">
            SA
          </div>
          <div>
            <p className="text-white font-medium text-sm leading-tight">Shekhar Anand</p>
            <p className="text-gray-400 text-xs mt-0.5">Intern Assignment</p>
          </div>
        </div>
      </div>
    </aside>
  );
}