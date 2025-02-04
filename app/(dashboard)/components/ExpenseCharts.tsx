import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

import useExpenseStore from "@/stores/expenseStore";

const COLORS = ["#60A5FA", "#F472B6", "#A78BFA", "#818CF8", "#2DD4BF"];

const ExpenseChart: React.FC = () => {
  const { expenses, categories } = useExpenseStore();
  const categoryTotals = expenses.reduce((acc: { [key: string]: number }, expense) => {
    const category = expense.category_id || "Uncategorized";

    acc[category] = (acc[category] || 0) + expense.amount;

    return acc;
  }, {});

  const data = Object.entries(categoryTotals).map(([category, total]) => ({
    name: category ? categories.find((c) => c.id === category)?.name : category,
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
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                strokeLinecap="round"
              />
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
