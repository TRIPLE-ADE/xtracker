"use client";

import React, { useEffect, useMemo, useState } from "react";

import { Card, Button } from "@/shared/ui";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/select";
import useExpenseStore from "@/stores/expenseStore";
import useDisclosure from "@/hooks/useDisclosure";

import AddBudgetModal from "./AddBudgetModal";

const BudgetOverview: React.FC = () => {
  const { budgets, expenses } = useExpenseStore();
  const monthlyBudget = null;
  const { isOpen: isBudgetOpen, onClose: onBudgetClose, onOpen: onBudgetOpen } = useDisclosure();
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | undefined>(() => {
    if (monthlyBudget) return "monthly";

    return budgets.length > 0 ? budgets[0].id : undefined;
  });

  useEffect(() => {
    if (!selectedBudgetId || !budgets.some((b) => b.id === selectedBudgetId)) {
      if (monthlyBudget) {
        setSelectedBudgetId("monthly");
      } else if (!monthlyBudget && budgets.length > 0) {
        setSelectedBudgetId(budgets[0].id);
      } else {
        setSelectedBudgetId(undefined);
      }
    }
  }, [budgets, monthlyBudget, selectedBudgetId]);

  const selectedBudget = useMemo(() => {
    // Add a monthly budget if it exists from onboarding
    if (selectedBudgetId === "monthly") {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      return {
        id: "monthly",
        name: "Monthly Budget",
        start_date: startOfMonth.toISOString(),
        end_date: endOfMonth.toISOString(),
        amount: monthlyBudget || 0,
      };
    }

    if (selectedBudgetId) {
      return budgets.find((budget) => budget.id === selectedBudgetId) || null;
    }

    return null;
  }, [budgets, selectedBudgetId, monthlyBudget]);

  // Filter expenses based on the selected budget
  const filteredExpenses = useMemo(() => {
    if (!selectedBudget) return [];

    return expenses.filter((expense) => {
      const isCategoryMatch =
        "category_id" in selectedBudget && selectedBudget?.category_id
          ? expense.category_id === selectedBudget?.category_id
          : true;
      const isDateMatch =
        "start_date" in selectedBudget && "end_date" in selectedBudget
          ? new Date(expense.date) >= new Date(selectedBudget.start_date) &&
            new Date(expense.date) <= new Date(selectedBudget.end_date)
          : true;

      return isCategoryMatch && isDateMatch;
    });
  }, [expenses, selectedBudget]);

  const totalExpenses = useMemo(() => {
    if (selectedBudget) {
      return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    }

    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [filteredExpenses, expenses, selectedBudget]);

  const calculateProgress = () =>
    selectedBudget ? (totalExpenses / selectedBudget.amount) * 100 : 0;

  const progress = calculateProgress();
  const isOverBudget = progress > 100;

  return (
    <Card className="bg-gradient-to-r from-primary to-purple-800 p-6 rounded-2xl shadow-lg">
      {/* Budget Selector */}
      <div className="grid md:grid-cols-4">
        <h2 className="text-xl font-semibold mb-4 text-white col-span-3">Budget Overview</h2>
        {(monthlyBudget && budgets.length > 0) || (!monthlyBudget && budgets.length > 1) ? (
          <Select
            defaultValue="Select a Budget"
            value={selectedBudgetId}
            onValueChange={(value) => setSelectedBudgetId(value)}
          >
            <SelectTrigger className="border rounded p-2 text-white bg-transparent focus:ring-0">
              <SelectValue placeholder="Select a Budget" />
            </SelectTrigger>
            <SelectContent>
              {monthlyBudget && <SelectItem value="monthly">Monthly Budget</SelectItem>}
              {budgets.map((budget) => (
                <SelectItem key={budget.id} value={budget.id}>
                  {budget.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}
      </div>

      {/* Budget and Expenses Display */}
      {selectedBudget ? (
        <>
          <div className="flex justify-between items-center">
            <p className="text-white text-lg font-bold">
              Total Expenses: ${totalExpenses.toFixed(2)}
            </p>
            <p className="text-white text-lg font-bold">
              {selectedBudget.name}: ${selectedBudget.amount.toFixed(2)}
            </p>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className={`h-2 ${isOverBudget ? "bg-red-500" : "bg-blue-500"} rounded-full`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="mt-2 text-white">
              {isOverBudget
                ? `Over Budget by $${(totalExpenses - selectedBudget.amount).toFixed(2)}`
                : `${progress.toFixed(2)}% of your budget used`}
            </p>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-white text-lg font-bold">
            Total Expenses: ${totalExpenses.toFixed(2)}
          </p>
          <p className="text-white mb-4">No budget has been set yet!</p>
          <Button className="bg-primary text-white" variant="ghost" onClick={onBudgetOpen}>
            Add Budget
          </Button>
        </div>
      )}
      <AddBudgetModal isOpen={isBudgetOpen} onClose={onBudgetClose} />
    </Card>
  );
};

export default BudgetOverview;
