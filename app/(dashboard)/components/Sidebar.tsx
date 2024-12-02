"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Receipt, Home, Settings, PieChart, Target, CreditCard, Wallet } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="hidden fixed h-svh md:flex md:w-56 bg-white p-6 flex-col shadow-lg text-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-3xl font-bold font-mono">XTracker</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        {/* Dashboard Section */}
        <div className="mb-6">
          {[
            { label: "Dashboard", href: "/overview", icon: <Home /> },
            { label: "Expenses", href: "/expenses", icon: <PieChart /> },
            { label: "Goals", href: "/goals", icon: <Target /> },
            { label: "Budgets", href: "/budgets", icon: <Wallet /> },
            { label: "Cards", href: "/cards", icon: <CreditCard /> },
            { label: "Reports", href: "/reports", icon: <Receipt /> },
            { label: "Settings", href: "/settings", icon: <Settings /> },
          ].map((item, index) => (
            <Link
              key={index}
              className={`flex items-center p-3 mb-2 rounded-lg hover:bg-gray-100 ${
                pathname === item.href ? "bg-gray-200 font-bold" : ""
              }`}
              href={item.href}
            >
              {item.icon}
              <span className="ml-4">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="text-sm text-gray-300 mt-4 border-t border-gray-400/30 pt-4">
        <p>© 2024 XTracker</p>
        <p>Version 1.0.0</p>
      </div>
    </div>
  );
};

export default Sidebar;
