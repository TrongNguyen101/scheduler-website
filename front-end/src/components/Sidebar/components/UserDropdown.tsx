"use client";

import { Box } from "@mui/material";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

// Props definition for the component
interface Props {
  isOpen: boolean; // Indicates whether the dropdown is open
  onToggle: () => void; // Callback to toggle dropdown visibility
  user: { name: string; role: string; initials?: string };
}

export default function UserDropdown({ isOpen, onToggle, user }: Props) {
  return (
    <Box sx={{ p: 2, position: "relative" }}>
      {/* Button displaying avatar and user name, toggles dropdown on click */}
      <button
        onClick={onToggle}
        aria-label="Toggle user dropdown"
        className="w-full flex items-center space-x-3 text-gray-800 hover:text-indigo-600"
      >
        {/* User avatar with initials inside a styled circle */}
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 flex items-center justify-center text-indigo-800 font-semibold">
          {user.initials}
        </div>

        {/* Display name and welcome text (hidden on small screens) */}
        <div className="flex-col items-start hidden md:flex">
          <span className="text-sm font-medium leading-none">Welcome,</span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold">{user.name}</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        {/* Chevron icon for mobile view */}
        <ChevronDown
          size={16}
          className={`md:hidden transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown content, displayed only when isOpen is true */}
      {isOpen && (
        <div className="absolute bottom-15 left-2 right-2 z-50 bg-white rounded-lg shadow-lg border border-indigo-100">
          <div className="p-4 border-b">
            <h3 className="font-medium text-gray-800">{user.name}</h3>
            <p className="text-gray-500 text-sm">{user.role}</p>
          </div>
          <ul className="py-2">
            <li>
              <Link
                href="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
              >
                Xem hồ sơ
              </Link>
            </li>
            <li>
              <Link
                href="/account-settings"
                className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
              >
                Cài đặt tài khoản
              </Link>
            </li>
            <li>
              <Link
                href="/notifications"
                className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
              >
                Thông báo
              </Link>
            </li>
            <li>
              <Link
                href="/security"
                className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
              >
                Bảo mật
              </Link>
            </li>
            <li>
              <Link
                href="/logout"
                className="block px-4 py-2 text-red-600 hover:bg-red-50"
              >
                Đăng xuất
              </Link>
            </li>
          </ul>
        </div>
      )}
    </Box>
  );
}
