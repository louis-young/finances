import { useReducer } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { AddExpenseForm } from "./components/AddExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { initialExpenses, initialiser, reducer } from "./reducers/expenses";
import { ExpenseActionType } from "./reducers/expenses/types";
import type { Expense } from "./types/expense";
import { ExpenseChart } from "./components/ExpenseChart";
import { calculateTotalExpenses } from "./utilities/calculateTotalExpenses";

export const App = () => {
  const [expenses, dispatch] = useReducer(
    reducer,
    initialExpenses,
    initialiser
  );

  useLocalStorage(expenses);

  const addExpense = (expenseToAdd: Expense) => {
    dispatch({ type: ExpenseActionType.Add, expenseToAdd });
  };

  const editExpense = (expenseToEdit: Expense) => {
    dispatch({ type: ExpenseActionType.Edit, expenseToEdit });
  };

  const deleteExpense = (expenseToDeleteId: string) => {
    dispatch({ type: ExpenseActionType.Delete, expenseToDeleteId });
  };

  const totalExpenses = calculateTotalExpenses(expenses);

  return (
    <section className="container mx-auto p-6 md:p-12">
      <h1 className="font-bold text-5xl mb-6 md:mb-12">Finances</h1>

      <div className="flex flex-col-reverse gap-6 md:flex-row md:gap-12">
        <ExpenseList
          expenses={expenses}
          totalExpenses={totalExpenses}
          editExpense={editExpense}
          deleteExpense={deleteExpense}
        />

        <div className="w-full">
          <div className="sticky top-12">
            <AddExpenseForm addExpense={addExpense} />

            <ExpenseChart expenses={expenses} totalExpenses={totalExpenses} />
          </div>
        </div>
      </div>
    </section>
  );
};
