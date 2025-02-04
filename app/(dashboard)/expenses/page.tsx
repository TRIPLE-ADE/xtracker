import { Plus, Filter, SlidersHorizontal } from "lucide-react";

import { Button } from "@/shared/ui/button";

export default function Page() {
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
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New expense
          </Button>
        </div>
      </div>
    </div>
  );
}
