import React, { useState } from "react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
// import { Calendar } from "@/shared/ui/calendar";
// import { format } from 'date-fns';

const BillReminders = () => {
  interface Bill {
    id: number;
    name: string;
    amount: string;
    dueDate: Date;
  }

  const [bills, setBills] = useState<Bill[]>([]);
  const [newBill, setNewBill] = useState({ name: "", amount: "", dueDate: new Date() });

  const addBill = () => {
    if (newBill.name && newBill.amount) {
      setBills([...bills, { ...newBill, id: Date.now() }]);
      setNewBill({ name: "", amount: "", dueDate: new Date() });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Bill Reminders</h2>
      <div className="flex space-x-2 mb-4">
        <Input
          placeholder="Bill name"
          type="text"
          value={newBill.name}
          onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
        />
        <Input
          placeholder="Amount"
          type="number"
          value={newBill.amount}
          onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
        />
        {/* <Calendar
          mode="single"
          selected={newBill.dueDate}
          onSelect={(date) => setNewBill({ ...newBill, dueDate: date })}
          className="rounded-md border"
        /> */}
        <Button onClick={addBill}>Add Bill</Button>
      </div>
      <ul className="space-y-2">
        {bills.map((bill) => (
          <li
            key={bill.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <span>{bill.name}</span>
            <span>${bill.amount}</span>
            {/* <span>Due: {format(bill.dueDate, 'PP')}</span> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BillReminders;
