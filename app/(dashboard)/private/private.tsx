"use client";

import { useState } from "react";

import SubmitButton from "@/shared/submitButton";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import BillReminders from "../components/BillReminders";
import ExpenseChart from "../components/ExpenseCharts";
import SavingsGoal from "../components/SavingsGoal";
import CategoryBreakdown from "../components/CategoryBreakdown";
import FinancialGoals from "../components/FinancialGoals";

export default function PrivatePage() {
  interface Expense {
    id: string;
    description: string;
    amount: number;
    category?: string;
  }

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now().toString() }]);
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div>
      <ExpenseForm onAddExpense={addExpense} />
      <SavingsGoal totalExpenses={totalExpenses} />
      <ExpenseList expenses={expenses} totalExpenses={totalExpenses} />
      <ExpenseChart expenses={expenses} />
      <CategoryBreakdown expenses={expenses} />
      <BillReminders />
      <FinancialGoals />
      <form action="/auth/signout" method="post">
        <SubmitButton className="w-fit" text="Sign Out" />
      </form>
    </div>
  );
}
