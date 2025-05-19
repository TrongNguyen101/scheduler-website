import {
  CalendarDays,
  Users,
  UserCircle,
  BookOpen,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navigate() {
  const [activeItem, setActiveItem] = useState("Schedule");

  // Navigation menu items with icons
  const navItemsPDT = [
    { name: "Schedule", icon: <CalendarDays size={18} />, path: "/teacher" },
    { name: "Class", icon: <Users size={18} />, path: "/class" },
    { name: "Student", icon: <UserCircle size={18} />, path: "/student" },
    { name: "Lecture", icon: <BookOpen size={18} />, path: "/lecture" },
    { name: "Room", icon: <LayoutGrid size={18} />, path: "/room" },
  ];

  return (
    <>
      {/* Navigation Menu */}
      <nav className="hidden md:flex items-center">
        <ul className="flex space-x-1">
          {navItemsPDT.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeItem === item.name
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
                onClick={() => setActiveItem(item.name)}
              >
                <span className="mr-2">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navigation Menu (hidden by default) */}
      <div className="md:hidden border-t border-indigo-100">
        <div className="grid grid-cols-5 text-xs">
          {navItemsPDT.map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex flex-col items-center justify-center py-3 ${
                activeItem === item.name
                  ? "text-indigo-600 font-medium"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveItem(item.name)}
            >
              {item.icon}
              <span className="mt-1">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
