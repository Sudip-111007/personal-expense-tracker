import { useState, useMemo } from 'react';
import { Expense, ExpenseCategory } from '@/types/expense';

// Sample data for demonstration
const sampleExpenses: Expense[] = [
  { id: '1', title: 'Grocery Shopping', amount: 85.50, category: 'Food', date: '2024-01-15', notes: 'Weekly groceries' },
  { id: '2', title: 'Monthly Rent', amount: 1200, category: 'Rent', date: '2024-01-01' },
  { id: '3', title: 'Uber Ride', amount: 25.00, category: 'Transport', date: '2024-01-14' },
  { id: '4', title: 'Electric Bill', amount: 120.00, category: 'Utilities', date: '2024-01-10' },
  { id: '5', title: 'New Headphones', amount: 199.99, category: 'Shopping', date: '2024-01-12' },
  { id: '6', title: 'Coffee Shop', amount: 15.00, category: 'Food', date: '2024-01-13' },
  { id: '7', title: 'Gas Station', amount: 45.00, category: 'Transport', date: '2024-01-08' },
  { id: '8', title: 'Internet Bill', amount: 65.00, category: 'Utilities', date: '2024-01-05' },
  { id: '9', title: 'Restaurant Dinner', amount: 78.50, category: 'Food', date: '2024-01-11' },
  { id: '10', title: 'Gym Subscription', amount: 50.00, category: 'Others', date: '2024-01-01' },
];

interface UseExpensesReturn {
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

export function useExpenses(): UseExpensesReturn {
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const updateExpense = (id: string, expense: Omit<Expense, 'id'>) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...expense, id } : e))
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  );

  const transactionCount = expenses.length;

  const categoryBreakdown = useMemo(() => {
    const breakdown: Record<ExpenseCategory, number> = {
      Food: 0,
      Rent: 0,
      Transport: 0,
      Utilities: 0,
      Shopping: 0,
      Others: 0,
    };

    expenses.forEach((e) => {
      breakdown[e.category] += e.amount;
    });

    return Object.entries(breakdown)
      .map(([category, amount]) => ({
        category: category as ExpenseCategory,
        amount,
        percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
      }))
      .filter((item) => item.amount > 0)
      .sort((a, b) => b.amount - a.amount);
  }, [expenses, totalExpenses]);

  const highestCategory = useMemo(() => {
    if (categoryBreakdown.length === 0) return null;
    return {
      category: categoryBreakdown[0].category,
      amount: categoryBreakdown[0].amount,
    };
  }, [categoryBreakdown]);

  const monthlyData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = months.map((month, index) => {
      const monthExpenses = expenses.filter((e) => {
        const expenseMonth = new Date(e.date).getMonth();
        return expenseMonth === index;
      });
      return {
        month,
        amount: monthExpenses.reduce((sum, e) => sum + e.amount, 0),
      };
    });
    return data;
  }, [expenses]);

  const recentExpenses = useMemo(
    () =>
      [...expenses]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5),
    [expenses]
  );

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    totalExpenses,
    highestCategory,
    transactionCount,
    categoryBreakdown,
    monthlyData,
    recentExpenses,
  };
}
