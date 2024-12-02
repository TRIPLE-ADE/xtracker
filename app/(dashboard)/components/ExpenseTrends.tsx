// components/SpendingTrends.tsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import useExpenseStore from "@/store/expenseStore";

const ExpenseTrends: React.FC = () => {
  const { expenses } = useExpenseStore();

  // Process expenses for chart data
  const monthlyExpenses = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).getMonth();

    acc[month] = (acc[month] || 0) + expense.amount;

    return acc;
  }, Array(12).fill(0));

  // Prepare data for Recharts
  const chartData = monthlyExpenses.map((amount, index) => ({
    month: new Date(0, index).toLocaleString("default", { month: "short" }),
    amount,
  }));

  return (
    <ResponsiveContainer height={300} width="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line dataKey="amount" stroke="#4C51BF" type="monotone" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExpenseTrends;
