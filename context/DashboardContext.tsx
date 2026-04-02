"use client";

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';
import { mockTransactions, type Transaction } from '../data/mockData';

interface DashboardContextType {
  transactions: Transaction[];
  userRole: 'viewer' | 'admin';
  toggleRole: () => void;
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [userRole, setUserRole] = useState<'viewer' | 'admin'>('viewer');
  const isFirstRender = useRef(true);



useEffect(() => {
    const initializeData = async () => {
      const saved = localStorage.getItem('zorvyn_transactions');
      if (saved) {
        setTransactions(JSON.parse(saved));
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('zorvyn_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const toggleRole = () => setUserRole((prev) => (prev === 'admin' ? 'viewer' : 'admin'));

  const addTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTx,
      id: `tx_${Math.random().toString(36).substr(2, 9)}`,
    };
    setTransactions([transaction, ...transactions]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  return (
    <DashboardContext.Provider value={{ transactions, userRole, toggleRole, addTransaction, deleteTransaction }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) throw new Error('useDashboard must be used within a DashboardProvider');
  return context;
};