"use client";

import { useState } from "react";

export default function PresenceSearch() {
  const [search, setSearch] = useState("");

  return (
    <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Search Presence
        </h2>

        <p className="text-sm text-gray-500">
          Search for an intern or trainer to check their attendance.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <button
          type="button"
          className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {search && (
        <p className="mt-4 text-sm text-gray-500">
          Searching for:{" "}
          <span className="font-medium text-gray-900">
            {search}
          </span>
        </p>
      )}
    </div>
  );
}