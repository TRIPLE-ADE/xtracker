import React, { useEffect, useMemo, useState } from "react";

import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/select";
import useExpenseStore from "@/stores/expenseStore";

const SavingsGoals: React.FC = () => {
  const { goals } = useExpenseStore();
  const [selectedGoalId, setSelectedGoalId] = useState<string | undefined>(() =>
    goals.length > 0 ? goals[0].id : undefined,
  );
  // const [addAmount, setAddAmount] = useState<string>("");

  useEffect(() => {
    if (!selectedGoalId || !goals.some((goal) => goal.id === selectedGoalId)) {
      if (goals.length > 0) {
        setSelectedGoalId(goals[0].id);
      } else {
        setSelectedGoalId(undefined);
      }
    }
  }, [goals, selectedGoalId]);

  const selectedGoal = useMemo(() => {
    return goals.find((goal) => goal.id === selectedGoalId) || null;
  }, [goals, selectedGoalId]);

  const calculateProgress = useMemo(() => {
    if (!selectedGoal) return null;

    return ((selectedGoal.current_amount / selectedGoal.target_amount) * 100).toFixed(2);
  }, [selectedGoal]);

  const progress = calculateProgress !== null ? parseFloat(calculateProgress) : 0;
  const isOverGoal = progress > 100;

  // const handleAddAmount = () => {
  //   if (selectedGoal && addAmount) {
  //     const amountToAdd = parseFloat(addAmount);
  //     if (!isNaN(amountToAdd) && amountToAdd > 0) {
  //       updateGoalAmount(selectedGoal.id, selectedGoal.current_amount + amountToAdd);
  //       setAddAmount(""); // Reset the input field
  //     }
  //   }
  // };

  return (
    <Card className="bg-gradient-to-r from-primary to-purple-800 p-6 rounded-2xl shadow-lg">
      <div className="grid md:grid-cols-4">
        <h2 className="text-xl font-semibold mb-4 text-white col-span-3">Savings Goals</h2>
        {goals.length > 1 && (
          <Select defaultValue={goals[0].id} onValueChange={(value) => setSelectedGoalId(value)}>
            <SelectTrigger className="border rounded p-2 text-white bg-transparent focus:ring-0 mb-4">
              <SelectValue placeholder="Select a Goal" />
            </SelectTrigger>
            <SelectContent>
              {goals.map((goal) => (
                <SelectItem key={goal.id} value={goal.id}>
                  {goal.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      {selectedGoal ? (
        <>
          <div className="flex flex-col md:flex-row md:justify-between mb-4">
            <div>
              <p className="text-white text-lg font-bold mb-2">Goal Title: {selectedGoal.title}</p>
              <p className="text-white text-lg font-bold mb-2">
                Target Amount: ${selectedGoal.target_amount.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-white text-lg font-bold mb-2">
                Current Savings: ${selectedGoal.current_amount.toFixed(2)}
              </p>
              <p className="text-white text-lg font-bold mb-2">
                Remaining Amount: $
                {Math.max(selectedGoal.target_amount - selectedGoal.current_amount, 0).toFixed(2)}
              </p>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className={`h-2 ${isOverGoal ? "bg-green-500" : "bg-blue-500"} rounded-full`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="mt-2 text-white">
            {isOverGoal
              ? `Exceeded your savings goal by $${(selectedGoal.current_amount - selectedGoal.target_amount).toFixed(2)}`
              : `${progress}% of your savings goal achieved`}
          </p>
          {/* <div className="mt-6">
            <p className="text-white mb-2">Add an amount to this goal:</p>
            <div className="flex gap-4">
              <Input
                type="number"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                placeholder="Enter amount"
                className="p-2 rounded w-full"
              />
              <Button
                variant="outline"
                className="bg-green-500 text-white hover:bg-green-600"
                onClick={handleAddAmount}
              >
                Add
              </Button>
            </div>
          </div> */}
        </>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-white mb-4">No savings goals have been set!</p>
          <Button className="bg-primary text-white" variant="ghost">
            Add Goal
          </Button>
        </div>
      )}
    </Card>
  );
};

export default SavingsGoals;
