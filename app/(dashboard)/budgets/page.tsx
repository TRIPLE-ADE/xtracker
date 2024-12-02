"use client";

import React, { useState } from "react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

// import { Progress } from "@/components/ui/progress";

const budgets = [
  {
    id: "1",
    title: "Monthly Groceries",
    amount: 500,
    totalExpenses: 450,
    startDate: "2024-11-01",
    endDate: "2024-11-30",
  },
  {
    id: "2",
    title: "Transportation Budget",
    amount: 200,
    totalExpenses: 190,
    startDate: "2024-11-01",
    endDate: "2024-11-15",
  },
  {
    id: "3",
    title: "Entertainment",
    amount: 150,
    totalExpenses: 50,
    startDate: "2024-12-01",
    endDate: "2024-12-31",
  },
  {
    id: "4",
    title: "Holiday Shopping",
    amount: 600,
    totalExpenses: 0,
    startDate: "2024-12-15",
    endDate: "2024-12-31",
  },
  {
    id: "5",
    title: "Utilities",
    amount: 300,
    totalExpenses: 275,
    startDate: "2024-10-01",
    endDate: "2024-10-31",
  },
  {
    id: "6",
    title: "Gym Membership",
    amount: 50,
    totalExpenses: 50,
    startDate: "2024-09-01",
    endDate: "2024-09-30",
  },
];

const formatDateHelper = (date: Date, dateFormat: string = "PP") => {
  const options: Intl.DateTimeFormatOptions = {};

  switch (dateFormat) {
    case "PP":
      options.year = "numeric";
      options.month = "short";
      options.day = "numeric";
      break;
    // Add more cases for different formats if needed
    default:
      options.year = "numeric";
      options.month = "short";
      options.day = "numeric";
  }

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const currentDate = new Date();

interface CategoryBudget {
  category: string;
  limit: number;
  spent: number;
}

const Page: React.FC = () => {
  const [overallBudget, setOverallBudget] = useState<string>("");
  const [currentOverallBudget, setCurrentOverallBudget] = useState<number | null>(null);
  const [totalExpenses] = useState<number>(0);
  const [categoryBudgets, setCategoryBudgets] = useState<CategoryBudget[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [newCategoryLimit, setNewCategoryLimit] = useState<string>("");

  const handleSetOverallBudget = () => {
    if (overallBudget && !isNaN(Number(overallBudget))) {
      setCurrentOverallBudget(parseFloat(overallBudget));
      setOverallBudget("");
    }
  };

  const handleAddCategory = () => {
    if (newCategory && newCategoryLimit && !isNaN(Number(newCategoryLimit))) {
      setCategoryBudgets([
        ...categoryBudgets,
        { category: newCategory, limit: parseFloat(newCategoryLimit), spent: 0 },
      ]);
      setNewCategory("");
      setNewCategoryLimit("");
    }
  };

  const calculateOverallProgress = () => {
    if (currentOverallBudget) {
      const progress = (totalExpenses / currentOverallBudget) * 100;

      return Math.min(progress, 100);
    }

    return 0;
  };

  const calculateCategoryProgress = (spent: number, limit: number) => {
    const progress = (spent / limit) * 100;

    return Math.min(progress, 100);
  };

  // const activeBudgets = budgets.filter(
  //   (budget) =>
  //     new Date(budget.startDate) <= currentDate && new Date(budget.endDate) >= currentDate,
  // );
  const upcomingBudgets = budgets.filter((budget) => new Date(budget.startDate) > currentDate);
  const recentlyEndedBudgets = budgets.filter(
    (budget) =>
      new Date(budget.endDate) < currentDate &&
      new Date(budget.endDate) >= new Date(currentDate.setDate(currentDate.getDate() - 30)),
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Budget Tracker</h1>
      <div className="space-y-8">
        {/* Upcoming Budgets */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Upcoming Budgets</h2>
          {upcomingBudgets.length > 0 ? (
            <ul className="space-y-4">
              {upcomingBudgets.map((budget) => (
                <li key={budget.id} className="p-4 bg-white shadow rounded-lg">
                  <h3 className="font-bold text-lg">{budget.title}</h3>
                  <p className="text-gray-500">
                    Starts: {formatDateHelper(new Date(budget.startDate), "PP")}
                  </p>
                  <p className="text-gray-500">Total Budget: ${budget.amount.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No upcoming budgets.</p>
          )}
        </section>

        {/* Recently Ended Budgets */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Recently Ended Budgets</h2>
          {recentlyEndedBudgets.length > 0 ? (
            <ul className="space-y-4">
              {recentlyEndedBudgets.map((budget) => (
                <li key={budget.id} className="p-4 bg-white shadow rounded-lg">
                  <h3 className="font-bold text-lg">{budget.title}</h3>
                  <p className="text-gray-500">Spent: ${budget.totalExpenses.toFixed(2)}</p>
                  <p className="text-gray-500">
                    Remaining: ${(budget.amount - budget.totalExpenses).toFixed(2)}
                  </p>
                  <p className="text-gray-500">
                    Utilization: {((budget.totalExpenses / budget.amount) * 100).toFixed(2)}%
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recently ended budgets.</p>
          )}
        </section>
      </div>
      {/* Overall Budget Section */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Overall Budget</h2>
        {currentOverallBudget ? (
          <div>
            <p className="text-lg">Budget: ${currentOverallBudget.toFixed(2)}</p>
            <p className="text-lg">Total Expenses: ${totalExpenses.toFixed(2)}</p>
            <div className="mt-4">
              <div className="h-4 w-full bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-4 bg-indigo-600 rounded-full"
                  style={{ width: `${calculateOverallProgress()}%` }}
                />
              </div>
              <p className="mt-2 text-sm">Progress: {calculateOverallProgress().toFixed(2)}%</p>
            </div>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Input
              className="w-full"
              placeholder="Set overall budget"
              type="number"
              value={overallBudget}
              onChange={(e) => setOverallBudget(e.target.value)}
            />
            <Button onClick={handleSetOverallBudget}>Set Budget</Button>
          </div>
        )}
      </div>

      {/* Category Budgets Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Category Budgets</h2>

        {/* New Category Input */}
        <div className="flex space-x-2 mb-4">
          <Input
            className="w-1/2"
            placeholder="Category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Input
            className="w-1/2"
            placeholder="Budget limit"
            type="number"
            value={newCategoryLimit}
            onChange={(e) => setNewCategoryLimit(e.target.value)}
          />
          <Button onClick={handleAddCategory}>Add Category</Button>
        </div>

        {/* Category Budgets List */}
        {categoryBudgets.map((budget, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-semibold">{budget.category}</h3>
            <p className="text-sm">Limit: ${budget.limit.toFixed(2)}</p>
            <p className="text-sm">Spent: ${budget.spent.toFixed(2)}</p>
            <div className="mt-2">
              <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-4 bg-green-500 rounded-full"
                  style={{
                    width: `${calculateCategoryProgress(budget.spent, budget.limit)}%`,
                  }}
                />
              </div>
              <p className="mt-2 text-sm">
                Progress: {calculateCategoryProgress(budget.spent, budget.limit).toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
