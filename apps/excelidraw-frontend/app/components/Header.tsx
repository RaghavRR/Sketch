"use client";
import React from "react";
import { Pencil } from "lucide-react";

export const Header = ({
  name,
  onLogout,
}: {
  name: string;
  onLogout: () => void;
}) => (
  <header className="flex flex-col sm:flex-row justify-between items-center bg-white border-b border-gray-200 text-gray-800 px-4 sm:px-6 py-4 shadow-sm sticky top-0 z-50">
    <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-0 w-full sm:w-auto justify-center sm:justify-start">
      <Pencil className="h-6 w-6 sm:h-7 sm:w-7 text-purple-600" />
      <span className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
        Sketch.io
      </span>
    </div>

    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end text-center sm:text-left">
      <span className="text-sm sm:text-base font-medium text-gray-700">
        Hello, <span className="font-semibold text-purple-700">{name}</span> 👋
      </span>
      <button
        onClick={onLogout}
        className="bg-purple-600 text-white font-medium px-4 py-2 rounded-md shadow-sm hover:bg-purple-700 transition text-sm sm:text-base"
        aria-label="Logout"
      >
        Logout
      </button>
    </div>
  </header>
);
