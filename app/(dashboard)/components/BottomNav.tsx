import React from "react";
import { PlusCircle, Receipt, Home, Settings } from "lucide-react";
import Link from "next/link";

const BottomNav = () => {
  return (
    <div className="md:hidden fixed bottom-0 w-full bg-white p-4 flex justify-around items-center shadow-lg">
      {[
        { href: "/dashboard", icon: <Home />, label: "Home" },
        { href: "/expenses", icon: <PlusCircle />, label: "Add" },
        { href: "/reports", icon: <Receipt />, label: "Reports" },
        { href: "/settings", icon: <Settings />, label: "Settings" },
      ].map((item, index) => (
        <Link
          key={index}
          className="flex flex-col items-center text-gray-700 hover:text-primary"
          href={item.href}
        >
          {item.icon}
          <span className="text-xs">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNav;
