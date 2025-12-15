import React, { createContext } from 'react';
import { useExpenses } from '../hooks/useExpenses';

const ExpenseContext = createContext(undefined);

export { ExpenseContext };

export function ExpenseProvider({ children }) {
  const expenses = useExpenses();

  return (
    <ExpenseContext.Provider value={expenses}>
      {children}
    </ExpenseContext.Provider>
  );
}