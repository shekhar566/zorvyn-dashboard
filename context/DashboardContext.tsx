"use client";

import { createContext, useContext, useState, type ReactNode } from 'react';
import { mockTransactions, type Transaction } from '../data/mockData';

interface DashboardContextType {
  transactions: Transaction[];
  userRole: 'viewer' | 'admin';
  toggleRole: () => void;
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [userRole, setUserRole] = useState<'viewer' | 'admin'>('viewer');

  const toggleRole = () => {
    setUserRole((prev) => (prev === 'admin' ? 'viewer' : 'admin'));
  };

  const addTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTx,
      id: `tx_${Math.random().toString(36).substr(2, 9)}`,
    };
    setTransactions([transaction, ...transactions]);
  };

  return (
    <DashboardContext.Provider value={{ transactions, userRole, toggleRole, addTransaction }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};