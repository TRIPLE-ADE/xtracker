"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

import { Button, Input, Calendar } from "@/shared/ui";
import { Modal } from "@/shared/custom/Modal";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/select";
import useExpenseStore, { mockUserId } from "@/store/expenseStore";
import useDisclosure from "@/hooks/useDisclosure";
interface AddBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBudgetModal: React.FC<AddBudgetModalProps> = ({ isOpen, onClose }) => {
  const { addBudget, categories } = useExpenseStore();
  const { isOpen: isPopoverOpen, onClose: onPopoverClose, onOpen: onPopoverOpen } = useDisclosure();
  const {
    isOpen: isEndPopoverOpen,
    onClose: onEndPopoverClose,
    onOpen: onEndPopoverOpen,
  } = useDisclosure();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate && startDate > endDate) {
      toast.warning("Start Date cannot be later than End Date.");

      return;
    }

    if (!name || !amount || !startDate || !endDate) {
      toast.warning("Please fill all required filled");

      return;
    }

    const newBudget = {
      user_id: mockUserId,
      name,
      category_id: categoryId || undefined,
      amount: Number(amount),
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    };

    addBudget(newBudget);
    toast.success("Budget Successfully Added");
    onClose();

    //clear all input
    setName("");
    setAmount("");
    setCategoryId(undefined);
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Add New Budget</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name Input */}
          <Input
            required
            placeholder="Budget Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Amount Input */}
          <Input
            required
            placeholder="Budget Amount"
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

          {/* Start Date Picker */}
          <div>
            <Popover open={isPopoverOpen} onOpenChange={onPopoverOpen}>
              <PopoverTrigger asChild>
                <Button className="w-full justify-start" variant="outline">
                  {startDate ? format(startDate, "yyyy-MM-dd") : "Select Start Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="p-0">
                <Calendar
                  className="rounded-md"
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => {
                    setStartDate(date);
                    onPopoverClose();
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* End Date Picker */}
          <div>
            <Popover open={isEndPopoverOpen} onOpenChange={onEndPopoverOpen}>
              <PopoverTrigger asChild>
                <Button className="w-full justify-start" variant="outline">
                  {endDate ? format(endDate, "yyyy-MM-dd") : "Select End Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="p-0">
                <Calendar
                  className="rounded-md"
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => {
                    setEndDate(date);
                    onEndPopoverClose();
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-4">
            <Button className="mr-2" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddBudgetModal;
