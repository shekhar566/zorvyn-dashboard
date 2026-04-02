"use client";

import { useDashboard } from "@/context/DashboardContext";
import { useMemo } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

// Expanded premium color palette so categories don't repeat colors quickly
const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', 
  '#ec4899', '#06b6d4', '#f97316', '#64748b', '#84cc16'
];

export function ChartsContainer() {
  const { transactions } = useDashboard();

  const lineChartData = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return sorted.reduce((acc, tx) => {
      const prevBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;
      const currentBalance = prevBalance + (tx.type === 'income' ? tx.amount : -tx.amount);
      
      acc.push({
        date: new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        balance: currentBalance
      });
      
      return acc;
    }, [] as { date: string; balance: number }[]);
  }, [transactions]);

  const pieChartData = useMemo(() => {
    const expenses = transactions.filter(tx => tx.type === 'expense');
    
    const categoryTotals = expenses.reduce((acc, tx) => {
      return {
        ...acc,
        [tx.category]: (acc[tx.category] || 0) + tx.amount
      };
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      
      {/* Line Chart: Balance Trend */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Balance Trend</h3>
        <div className="flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart: Spending Breakdown */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Spending Breakdown</h3>
        <div className="flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="42%" /* Shifted the donut up to give the legend breathing room */
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend 
                verticalAlign="bottom" 
                iconType="circle"
                wrapperStyle={{ fontSize: '12px', paddingTop: '15px' }} /* Removed strict height */
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}