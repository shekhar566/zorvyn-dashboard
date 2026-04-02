export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export const mockTransactions: Transaction[] = [
  { id: 'tx_01', date: '2026-04-01T10:00:00Z', amount: 5000, category: 'Salary', type: 'income', description: 'April Salary' },
  { id: 'tx_02', date: '2026-04-01T14:30:00Z', amount: 1200, category: 'Housing', type: 'expense', description: 'Monthly Rent' },
  { id: 'tx_03', date: '2026-04-02T09:15:00Z', amount: 45, category: 'Food', type: 'expense', description: 'Coffee Shop' },
  { id: 'tx_04', date: '2026-04-02T19:00:00Z', amount: 150, category: 'Utilities', type: 'expense', description: 'Electric Bill' },
  { id: 'tx_05', date: '2026-04-03T12:00:00Z', amount: 300, category: 'Freelance', type: 'income', description: 'Web Design Project' },
  { id: 'tx_06', date: '2026-04-03T18:45:00Z', amount: 85, category: 'Food', type: 'expense', description: 'Grocery Store' },
  { id: 'tx_07', date: '2026-04-04T08:30:00Z', amount: 60, category: 'Transport', type: 'expense', description: 'Gas Station' },
  { id: 'tx_08', date: '2026-04-04T20:00:00Z', amount: 120, category: 'Entertainment', type: 'expense', description: 'Concert Tickets' },
  { id: 'tx_09', date: '2026-04-05T10:00:00Z', amount: 400, category: 'Investments', type: 'expense', description: 'Stock Transfer' },
  { id: 'tx_10', date: '2026-04-05T15:20:00Z', amount: 250, category: 'Refund', type: 'income', description: 'Amazon Return' },
];