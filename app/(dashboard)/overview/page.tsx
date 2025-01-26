"use client";

import React, { useMemo } from "react";
import { PlusCircle, Receipt, BarChart, DollarSign } from "lucide-react";

import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/select";
import useDisclosure from "@/hooks/useDisclosure";
import useExpenseStore from "@/store/expenseStore";

import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseCharts";
import ExpenseTrends from "../components/ExpenseTrends";
import BudgetOverview from "../components/BudgetOverview";
import SavingsGoals from "../components/SavingsGoals";
import AddExpenseModal from "../components/AddExpenseModal";

const categories = [
  { name: "Housing", percentage: 38, color: "bg-blue-400" },
  { name: "Food", percentage: 30, color: "bg-pink-400" },
  { name: "Transport", percentage: 13, color: "bg-purple-400" },
  { name: "Entertainment", percentage: 11, color: "bg-indigo-400" },
  { name: "Others", percentage: 8, color: "bg-teal-400" },
];

const Page = () => {
  const { isOpen: isExpenseOpen, onClose: onExpenseClose, onOpen: onExpenseOpen } = useDisclosure();
  const { expenses } = useExpenseStore();

  // const [filters, setFilters] = useState({ category_id: "", dateRange: "", amountRange: "" });

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.amount, 0),
    [expenses],
  );

  // const handleFilterChange = (filterType: string, value: string) => {
  //   setFilters((prev) => ({ ...prev, [filterType]: value }));
  // };

  return (
    <div className="p-4">
      {/* Balance Card */}
      <div className="grid gap-4 mb-8">
        <BudgetOverview />
        <SavingsGoals />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            icon: <PlusCircle />,
            label: "Add Expense",
            action: onExpenseOpen,
          },
          {
            icon: <Receipt />,
            label: "Add Receipt",
          },
          {
            icon: <BarChart />,
            label: "Summary",
          },
          {
            icon: <DollarSign />,
            label: "Recurring",
          },
        ].map((action, index) => (
          <Button
            key={index}
            className="bg-primary text-white h-24 flex flex-col items-center justify-center gap-2 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200"
            variant="ghost"
            onClick={action.action}
          >
            {action.icon}
            <span className="text-sm font-medium">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Expense Chart */}
        <Card className="bg-gray-100 p-6 rounded-xl shadow relative">
          <h3 className="text-xl font-semibold mb-4 text-primary">Spending Distribution</h3>
          <ExpenseChart />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-2xl font-bold">${totalExpenses.toLocaleString()}</p>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-4">
            {categories.map((category) => (
              <div key={category.name} className="text-center">
                <div className={`w-full h-1 ${category.color} rounded mb-1`} />
                <p className="text-xs text-gray-600">{category.percentage}%</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Spending Trends Chart */}
        <Card className="bg-gray-100 p-6 rounded-xl shadow relative">
          <h3 className="text-xl font-semibold mb-4 text-primary">Spending Trends</h3>
          <ExpenseTrends />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-2xl font-bold">${totalExpenses.toLocaleString()}</p>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gray-100 p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4 text-primary">Recent Activity</h3>
        <div className="flex gap-4 mb-4">
          <Select>
            <SelectTrigger className="border rounded p-2">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.name} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* <DatePicker
            selected={filters.dateRange ? new Date(filters.dateRange.split(" - ")[0]) : null}
            onChange={(dates) => {
              const [start, end] = dates;
              handleFilterChange(
                "dateRange",
                `${start.toISOString().split("T")[0]} - ${end.toISOString().split("T")[0]}`
              );
            }}
            startDate={filters.dateRange ? new Date(filters.dateRange.split(" - ")[0]) : null}
            endDate={filters.dateRange ? new Date(filters.dateRange.split(" - ")[1]) : null}
            selectsRange
            inline
          /> */}
        </div>
        <ExpenseList totalExpenses={totalExpenses} />
      </Card>
      <AddExpenseModal isOpen={isExpenseOpen} onClose={onExpenseClose} />
    </div>
  );
};

export default Page;
