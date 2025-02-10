import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category?: string;
}

interface CategoryBreakdownProps {
  expenses: Expense[];
}

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ expenses }) => {
  const categoryTotals = expenses.reduce((acc: { [key: string]: number }, expense) => {
    if (expense.category) {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    }

    return acc;
  }, {});

  const data = Object.entries(categoryTotals).map(([category, total]) => ({
    category,
    total,
  }));

  return (
    <div className="mt-8 w-full">
      <div className="h-64 w-full">
        <ResponsiveContainer height="100%" width="100%">
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryBreakdown;
