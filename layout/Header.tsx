"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 w-full z-50">
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center relative w-16 h-12 py-5">
            <Image
              fill
              unoptimized
              alt="Xtracker Logo"
              loading="lazy"
              src="/assets/images/logo.svg"
              style={{}}
            />
            {/* <span className="text-2xl font-bold text-primary font-mono">Xtracker</span> */}
          </div>
          {/* Desktop Links */}
          <div className="hidden md:block">
            <ul className="ml-10 flex items-baseline space-x-4">
              <li>
                <a
                  className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                  href="#about"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                  href="#features"
                >
                  Features
                </a>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                  href="/auth/login"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Button asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
                {/* <Link
                  className="px-3 py-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-background hover:text-primary border border-primary"
                  href="/auth/signup"
                >
                  Sign Up
                </Link> */}
              </li>
            </ul>
          </div>
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
              aria-labelledby="mobile-menu"
              size={"icon"}
              type="button"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X aria-hidden="true" className="h-6 w-6" />
              ) : (
                <Menu aria-hidden="true" className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-500 text-center",
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
          )}
          id="mobile-menu"
        >
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <li>
              <a
                className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                href="#about"
              >
                About
              </a>
            </li>
            <li>
              <a
                className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                href="#features"
              >
                Features
              </a>
            </li>
            <li>
              <Link
                className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                href="/auth/login"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                className="w-full bg-primary text-white hover:bg-primary/80 mt-2 block px-3 py-2 rounded-md text-base font-medium"
                href="/auth/signup"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
