"use client";

import { useEffect, useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

import { useExpenseStore } from "@/stores/useExpenseStore";

export function ExpensesTable() {
  const expenses = useExpenseStore((state) => state.expenses);
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);

  useEffect(() => {
    useExpenseStore.getState().fetchExpenses();
    useExpenseStore.getState().subscribeToRealTime();
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: "title", header: "Title", cell: (info) => info.getValue() },
      { accessorKey: "amount", header: "Amount", cell: (info) => `${info.getValue()}` },
      { accessorKey: "category", header: "Category" },
      {
        accessorKey: "created_at",
        header: "Date",
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <button
            className="px-3 py-1 bg-red-500 text-white rounded"
            onClick={() => deleteExpense(row.original.id)}
          >
            Delete
          </button>
        ),
      },
    ],
    [deleteExpense],
  );

  const table = useReactTable({
    data: expenses,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Expense List</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border border-gray-300 px-4 py-2">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border border-gray-300">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-300 px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
