import { createContext, useEffect, useMemo, useState } from "react";
import { apiGet, apiPost } from "../lib/api";

export const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  /*FETCH EXPENSES*/
  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    try {
      const data = await apiGet("/expenses");
      setExpenses(data || []);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- CRUD ---------------- */
  async function addExpense(expense) {
    const newExpense = await apiPost("/expenses", expense);
    setExpenses((prev) => [newExpense, ...prev]);
  }

  async function updateExpense(id, updatedData) {
    const updated = await apiPost(`/expenses/${id}`, updatedData);
    setExpenses((prev) =>
      prev.map((e) => (e._id === id ? updated : e))
    );
  }

  const deleteExpense = async (id) => {
  await apiDelete(`/expenses/${id}`);
  setExpenses((prev) => prev.filter((e) => e._id !== id));
};

  // ✅ Category Breakdown (Pie Chart)
  const categoryBreakdown = useMemo(() => {
    if (!expenses.length) return [];

    const totals = {};
    let grandTotal = 0;

    expenses.forEach((e) => {
      totals[e.category] = (totals[e.category] || 0) + e.amount;
      grandTotal += e.amount;
    });

    return Object.entries(totals).map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / grandTotal) * 100,
    }));
  }, [expenses]);

  // Monthly Spending Trend (Line Chart)
  const monthlyData = useMemo(() => {
    if (!expenses.length) return [];

    const map = {};

    expenses.forEach((e) => {
      const date = new Date(e.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;

      if (!map[key]) {
        map[key] = {
          month: date.toLocaleString("default", {
            month: "short",
            year: "numeric",
          }),
          amount: 0,
        };
      }

      map[key].amount += e.amount;
    });

    return Object.values(map);
  }, [expenses]);

  // Recent Expenses
  const recentExpenses = useMemo(() => {
    return [...expenses]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [expenses]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        addExpense,
        updateExpense,
        deleteExpense,
        categoryBreakdown,
        monthlyData,
        recentExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}
