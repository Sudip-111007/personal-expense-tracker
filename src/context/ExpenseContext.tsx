import React, { createContext, useContext, ReactNode } from 'react';
import { useExpenses } from '@/hooks/useExpenses';
import { Expense, ExpenseCategory } from '@/types/expense';

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (id: string, expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  totalExpenses: number;
  highestCategory: { category: ExpenseCategory; amount: number } | null;
  transactionCount: number;
  categoryBreakdown: { category: ExpenseCategory; amount: number; percentage: number }[];
  monthlyData: { month: string; amount: number }[];
  recentExpenses: Expense[];
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const expenseData = useExpenses();

  return (
    <ExpenseContext.Provider value={expenseData}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenseContext() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenseContext must be used within an ExpenseProvider');
  }
  return context;
}
