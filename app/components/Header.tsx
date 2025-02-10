"use client";
import React from "react";
import { Bell, ChevronDown } from "lucide-react";

import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/shared/ui/dropdown-menu";
import { useProfileStore } from "@/stores/profileStore";
import { ThemeToggle } from "@/shared/theme-toggle";

const Header = () => {
  const { profile } = useProfileStore();

  // Get initials from first and last name
  // const initials = `${profile?.first_name[0]}${profile?.last_name[0]}`;
  const initials = "SC";

  return (
    <header className="border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex justify-between h-16 items-center px-4 gap-4">
        {/* Left Section: Title */}
        <div>
          <p className="text-gray-400">Welcome!</p>
          <h2 className="text-xl font-bold text-primary">{profile?.first_name}</h2>
        </div>

        {/* Right Section: Notifications and Profile */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
          {/* Notifications Icon */}
          <button className="relative p-1.5 sm:p-2 rounded-full transition-colors">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              3
            </span>
          </button>

          <ThemeToggle />
          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 focus:outline-none">
                <Avatar>
                  <AvatarFallback>{initials}</AvatarFallback>
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
                <form action="/auth/signout" method="post">
                  <button type="submit">Logout</button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
