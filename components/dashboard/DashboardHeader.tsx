"use client";

import { useState } from "react";

export default function DashboardHeader() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          Welcome back! Here's today's attendance overview.
        </p>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-3 rounded-lg border bg-white px-4 py-2 shadow-sm hover:bg-gray-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            A
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-gray-900">
              Admin
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>

          <span className="text-gray-400">
            ▼
          </span>
        </button>

        {showMenu && (
          <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border bg-white p-2 shadow-lg">
            <button className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100">
              Profile
            </button>

            <button className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100">
              Settings
            </button>

            <button className="w-full rounded-md px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}