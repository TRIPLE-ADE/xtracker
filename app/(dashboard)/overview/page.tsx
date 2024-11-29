"use client";

import React, { useState } from "react";
import { PlusCircle, Receipt, BarChart, DollarSign, Home, Settings } from "lucide-react";
import Link from "next/link";

import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseCharts";
import CategoryBreakdown from "../components/CategoryBreakdown";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category?: string;
}

const Page = () => {
  // const totalBalance = 4800.0;
  const income = 2500.0;

  const [expenses] = useState<Expense[]>([]);

  // const addExpense = (expense: Expense) => {
  //   setExpenses([...expenses, { ...expense, id: Date.now().toString() }]);
  // };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen text-white flex p-4 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
      {/* Sidebar */}
      <div className="hidden md:block w-64 bg-gray-800 text-white p-6 rounded-lg mr-6">
        <h2 className="text-2xl font-semibold text-indigo-400 mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <Link
              className="flex items-center gap-2 text-gray-300 hover:text-indigo-400"
              href="/dashboard"
            >
              <Home /> Home
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-2 text-gray-300 hover:text-indigo-400"
              href="/expenses"
            >
              <PlusCircle /> Expenses
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-2 text-gray-300 hover:text-indigo-400"
              href="/reports"
            >
              <Receipt /> Reports
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-2 text-gray-300 hover:text-indigo-400"
              href="/settings"
            >
              <Settings /> Settings
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <div className="max-w-7xl mx-auto">
          {/* Balance Card */}
          <Card className="bg-gradient-to-r from-blue-700 to-purple-700 p-6 rounded-2xl mb-8 shadow-lg">
            <div className="flex justify-between text-sm">
              <div>
                <h3 className="text-gray-200 mb-2">Total Income</h3>
                <p className="text-4xl font-bold mb-4 animate-pulse">${income.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="text-gray-200 mb-2">Total Expenses</h3>
                <p className="text-4xl font-bold mb-4 animate-pulse">${totalExpenses.toFixed(2)}</p>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: <PlusCircle />, label: "Add Expense", color: "bg-purple-600" },
              { icon: <Receipt />, label: "Add Expense with Receipt", color: "bg-blue-600" },
              { icon: <BarChart />, label: "Generate Summary", color: "bg-teal-600" },
              { icon: <DollarSign />, label: "Add Recurring Expense", color: "bg-pink-600" },
            ].map((action, index) => (
              <Button
                key={index}
                className={`${action.color} h-24 flex flex-col items-center justify-center gap-2 rounded-xl`}
                variant="ghost"
              >
                {action.icon}
                <span className="text-sm">{action.label}</span>
              </Button>
            ))}
          </div>

          {/* Overview Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Expense Chart */}
            <Card className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-white">Spending Distribution</h3>
              <ExpenseChart expenses={expenses} />
            </Card>

            {/* Category Breakdown */}
            <Card className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-white">Detailed Category Breakdown</h3>
              <CategoryBreakdown expenses={expenses} />
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 text-white">Recent Activity</h3>
            <ExpenseList expenses={expenses} totalExpenses={totalExpenses} />
          </Card>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 w-full bg-gray-800 p-4 flex justify-around items-center shadow-lg">
        <Link className="text-gray-300 hover:text-indigo-400" href="/dashboard">
          <Home />
          <span className="text-xs">Home</span>
        </Link>
        <Link className="text-gray-300 hover:text-indigo-400" href="/expenses">
          <PlusCircle />
          <span className="text-xs">Add Expense</span>
        </Link>
        <Link className="text-gray-300 hover:text-indigo-400" href="/reports">
          <Receipt />
          <span className="text-xs">Reports</span>
        </Link>
        <Link className="text-gray-300 hover:text-indigo-400" href="/settings">
          <Settings />
          <span className="text-xs">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Page;
