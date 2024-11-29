import React from "react";
// import { Badge } from "@/shared/ui/badge";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category?: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  totalExpenses: number;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, totalExpenses }) => {
  return (
    <ul className="space-y-2">
      {expenses.map((expense) => {
        const percentage = totalExpenses > 0 ? (expense.amount / totalExpenses) * 100 : 0;

        return (
          <li
            key={expense.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <span className="font-semibold">{expense.description}</span>
              {/* <Badge variant="secondary" className="ml-2">{expense.category}</Badge> */}
            </div>
            <div className="text-right">
              <span className="block">${expense.amount.toFixed(2)}</span>
              <span className="text-sm text-gray-500">{percentage.toFixed(1)}%</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ExpenseList;
