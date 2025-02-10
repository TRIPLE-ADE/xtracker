"use client";
import { Plus, Filter, SlidersHorizontal } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/shared/ui/button";
import useDisclosure from "@/hooks/useDisclosure";
import AddExpenseModal from "@/app/components/AddExpenseModal";

export default function Page() {
  const { isOpen: isExpenseOpen, onClose: onExpenseClose, onOpen: onExpenseOpen } = useDisclosure();

  return (
    <div className="h-full p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline">
            <Filter className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline">
            <DotsHorizontalIcon />
          </Button>
          <Button onClick={onExpenseOpen}>
            <Plus className="h-4 w-4 mr-2" />
            New expense
          </Button>
        </div>
      </div>
      <AddExpenseModal isOpen={isExpenseOpen} onClose={onExpenseClose} />
    </div>
  );
}
