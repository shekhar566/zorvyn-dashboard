"use client";

import { useDashboard } from "@/context/DashboardContext";
import { ArrowUpRight, ArrowDownRight, DollarSign, Lightbulb } from "lucide-react";
import { useMemo } from "react";

export function SummaryCards() {
  const { transactions } = useDashboard();

  const { income, expense, balance, highestExpenseCategory } = useMemo(() => {
    let inc = 0;
    let exp = 0;
    const expenseCategories: Record<string, number> = {};

    transactions.forEach((tx) => {
      if (tx.type === "income") inc += tx.amount;
      if (tx.type === "expense") {
        exp += tx.amount;
        expenseCategories[tx.category] = (expenseCategories[tx.category] || 0) + tx.amount;
      }
    });

    let topCategory = "None";
    let maxAmount = 0;
    for (const [category, amount] of Object.entries(expenseCategories)) {
      if (amount > maxAmount) {
        maxAmount = amount;
        topCategory = category;
      }
    }

    return { income: inc, expense: exp, balance: inc - exp, highestExpenseCategory: topCategory };
  }, [transactions]);

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Balance</p>
            <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(balance)}</h3>
          </div>
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-700">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Income Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Income</p>
            <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(income)}</h3>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>

        {/* Expense Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Expenses</p>
            <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(expense)}</h3>
          </div>
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600">
            <ArrowDownRight className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center text-blue-800">
        <Lightbulb className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
        <p className="text-sm font-medium">
          <strong>Smart Insight:</strong> Your highest spending category is currently <span className="font-bold underline decoration-blue-300">{highestExpenseCategory}</span>. 
          Review your transaction table below to identify potential savings.
        </p>
      </div>
    </div>
  );
}