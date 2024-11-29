import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];

interface Expense {
  id: string;
  description: string;
  amount: number;
  category?: string;
}

interface ExpenseChartProps {
  expenses: Expense[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  const categoryTotals = expenses.reduce((acc: { [key: string]: number }, expense) => {
    const category = expense.category || "Uncategorized";

    acc[category] = (acc[category] || 0) + expense.amount;

    return acc;
  }, {});

  const data = Object.entries(categoryTotals).map(([category, total]) => ({
    name: category,
    value: total,
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer height="100%" width="100%">
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={data}
            dataKey="value"
            fill="#8884d8"
            labelLine={false}
            outerRadius={80}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
