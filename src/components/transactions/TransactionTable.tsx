"use client";

import { useDashboard } from "@/context/DashboardContext";
import { useState, useMemo } from "react";
import { Search, Plus, X, Filter } from "lucide-react";

export function TransactionTable() {
  const { transactions, userRole, addTransaction } = useDashboard();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    type: "expense" as "income" | "expense",
    date: new Date().toISOString().split('T')[0]
  });

  // 1. Filter Engine (Removed the strict date sort so new items stay at the top!)
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            tx.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || tx.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [transactions, searchTerm, filterType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.category) return;

    addTransaction({
      description: formData.description,
      amount: Number(formData.amount),
      category: formData.category,
      type: formData.type,
      // Add current time to the date so it processes correctly in charts
      date: `${formData.date}T${new Date().toISOString().split('T')[1]}` 
    });
    
    setIsModalOpen(false);
    setFormData({ description: "", amount: "", category: "", type: "expense", date: new Date().toISOString().split('T')[0] });
  };

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm mt-6 overflow-hidden">
      
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
          
          {userRole === 'admin' && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search description or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // Added explicit text-gray-900 and placeholder contrast
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              // Added explicit text-gray-900
              className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="all">All Types</option>
              <option value="income">Income Only</option>
              <option value="expense">Expense Only</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3 rounded-tr-lg">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{tx.description}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                      {tx.category}
                    </span>
                  </td>
                  <td className={`px-6 py-4 font-medium ${tx.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      tx.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No transactions found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Add New Transaction</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Description</label>
                {/* Added high contrast classes to inputs */}
                <input required type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-500 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g., Client Payment" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Amount ($)</label>
                  <input required type="number" min="0" step="0.01" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-500 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Date</label>
                  <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Category</label>
                  <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-500 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g., Software" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-gray-100 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}