import React, { useState } from "react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

const categories = ["Food", "Transportation", "Entertainment", "Utilities", "Other"];

interface ExpenseFormProps {
  onAddExpense: (expense: {
    id: string;
    description: string;
    amount: number;
    category?: string;
  }) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (description && amount && category) {
      onAddExpense({ id: crypto.randomUUID(), description, amount: parseFloat(amount), category });
      setDescription("");
      setAmount("");
      setCategory("");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        required
        placeholder="Expense description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        required
        min="0"
        placeholder="Amount"
        step="0.01"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Select required value={category} onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">Add Expense</Button>
    </form>
  );
};

export default ExpenseForm;
