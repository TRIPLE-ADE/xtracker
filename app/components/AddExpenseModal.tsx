"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

import { Modal } from "@/shared/custom/custom-modal";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/select";
import useExpenseStore, { mockUserId } from "@/stores/expenseStore";
import useDisclosure from "@/hooks/useDisclosure";

interface AddBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddExpenseModal: React.FC<AddBudgetModalProps> = ({ isOpen, onClose }) => {
  const { addExpense, categories } = useExpenseStore();
  const { isOpen: isPopoverOpen, onClose: onPopoverClose, onOpen: onPopoverOpen } = useDisclosure();

  const [amount, setAmount] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const reset = () => {
    setDescription("");
    setAmount("");
    setCategoryId("");
    setDate(new Date());
  };
  const handleSubmit = () => {
    const currentDate = date || new Date();

    if (!amount || !description || !categoryId) {
      toast.warning("Please fill in all fields");

      return;
    }
    const newExpense = {
      user_id: mockUserId, // Replace with actual user ID if available
      amount: Number(amount),
      description,
      category_id: categoryId,
      date: currentDate.toISOString(),
      is_recurring: false,
    };

    addExpense(newExpense);
    toast.success("Expense added successfully");
    onClose();
    reset();
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
        <div className="space-y-4">
          <Input
            placeholder="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value ? parseFloat(e.target.value) : "")}
          />
          {/* Category Selection */}
          <Select value={categoryId || ""} onValueChange={(value) => setCategoryId(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category (Optional)" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div>
            <Popover open={isPopoverOpen} onOpenChange={onPopoverOpen}>
              <PopoverTrigger asChild>
                <Button className="w-full justify-start" variant="outline">
                  {date ? format(date, "yyyy-MM-dd") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  className="border rounded"
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date);
                    onPopoverClose();
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button className="mr-2" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddExpenseModal;
