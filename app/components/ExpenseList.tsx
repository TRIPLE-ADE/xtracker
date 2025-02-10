import React from "react";

import useExpenseStore from "@/stores/expenseStore";

interface ExpenseListProps {
  totalExpenses: number;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ totalExpenses }) => {
  const { expenses } = useExpenseStore();

  // const filteredExpenses = useMemo(() => {
  //   return expenses.filter((expense) => {
  //     const matchesCategory = filters.category_id
  //       ? expense.category_id === filters.category_id
  //       : true;
  //     const matchesDateRange = filters.dateRange
  //       ? new Date(expense.date) >= new Date(filters.dateRange.split(" - ")[0]) &&
  //         new Date(expense.date) <= new Date(filters.dateRange.split(" - ")[1])
  //       : true;
  //     const matchesAmountRange = filters.amountRange
  //       ? expense.amount >= parseFloat(filters.amountRange.split(" - ")[0]) &&
  //         expense.amount <= parseFloat(filters.amountRange.split(" - ")[1])
  //       : true;

  //     return matchesCategory && matchesDateRange && matchesAmountRange;
  //   });
  // }, [filters, expenses]);
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
