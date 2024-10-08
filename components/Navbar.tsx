"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Image
              priority
              alt="Xtracker logo"
              className="dark:invert"
              height={38}
              src="https://nextjs.org/icons/next.svg"
              width={80}
            />
            <span className="text-2xl font-bold text-indigo-600 font-mono">Xtracker</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                href="#features"
              >
                Features
              </a>
              <a
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                href="#about"
              >
                About
              </a>
              <Link
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                href="/signin"
              >
                Sign In
              </Link>
              <Link
                className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                href="/signup"
              >
                Sign Up
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 text-center ${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
              href="#features"
            >
              Features
            </a>
            <a
              className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
              href="#about"
            >
              About
            </a>
            <Link
              className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
              href="/signin"
            >
              Sign In
            </Link>
            <Link
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700 mt-2 block px-3 py-2 rounded-md text-base font-medium"
              href="/signup"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
