import React from "react";
import { Bell, ChevronDown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/shared/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex justify-between h-16 items-center px-4 gap-4">
        {/* Left Section: Title */}
        {/* <div className="flex flex-1 text-indigo-600">
          <h2 className="text-lg font-semibold">Penny Pinscher</h2>
        </div> */}
        <div>
          <p className="text-gray-400">Welcome!</p>
          <h2 className="text-xl font-bold text-indigo-600">John Doe</h2>
        </div>

        {/* Right Section: Notifications and Profile */}
        <div className="flex items-center gap-4">
          {/* Notifications Icon */}
          <button className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 focus:outline-none">
                <Avatar>
                  <AvatarImage alt="User" src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>
                <a href="/profile">Profile</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/settings">Settings</a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <a href="/logout">Logout</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
