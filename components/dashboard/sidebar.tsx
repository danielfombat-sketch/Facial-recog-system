"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "📊",
  },
  {
    name: "Attendance",
    href: "/attendance",
    icon: "✓",
  },
  {
    name: "Reports",
    href: "/reports",
    icon: "📄",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white">
      <div className="flex h-full flex-col">

        <div className="flex h-20 items-center border-b px-6">
          <div>
            <h1 className="text-xl font-bold text-blue-600">
              Attendance
            </h1>

            <p className="text-xs text-gray-500">
              Management System
            </p>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase text-gray-400">
            Menu
          </p>

          <div className="space-y-2">
            {menuItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t p-4">
          <button className="w-full rounded-lg px-4 py-3 text-left text-sm text-gray-600 hover:bg-gray-100">
            ⚙️ Settings
          </button>

          <button className="mt-2 w-full rounded-lg px-4 py-3 text-left text-sm text-red-500 hover:bg-red-50">
            🚪 Logout
          </button>
        </div>

      </div>
    </aside>
  );
}