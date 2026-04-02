import { LayoutDashboard, ArrowLeftRight, PieChart, Wallet } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col h-screen fixed left-0 top-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <Wallet className="w-6 h-6 text-blue-500 mr-2" />
        <span className="text-white font-bold text-lg tracking-wide">ZORVYN<span className="text-blue-500">.</span></span>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2">
        <a href="#" className="flex items-center px-4 py-3 bg-gray-800 text-white rounded-lg transition-colors">
          <LayoutDashboard className="w-5 h-5 mr-3 text-blue-500" />
          <span className="font-medium">Dashboard</span>
        </a>
        <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
          <ArrowLeftRight className="w-5 h-5 mr-3" />
          <span className="font-medium">Transactions</span>
        </a>
        <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
          <PieChart className="w-5 h-5 mr-3" />
          <span className="font-medium">Insights</span>
        </a>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-800 rounded-lg p-4 text-sm">
          <p className="text-gray-400 mb-1">Intern Assignment</p>
          <p className="text-white font-medium">Shekhar Anand</p>
        </div>
      </div>
    </aside>
  );
}