import {
  BookOpen,
  CalendarDays,
  LayoutGrid,
  UserCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navigate({ isMobile }: { isMobile?: boolean }) {
  const [activeItem, setActiveItem] = useState("Schedule");

  const navItems = [
    { name: "Schedule", icon: <CalendarDays size={20} />, path: "/teacher" },
    { name: "Class", icon: <Users size={20} />, path: "/teacher/class" },
    {
      name: "Student",
      icon: <UserCircle size={20} />,
      path: "/teacher/student",
    },
    { name: "Lecture", icon: <BookOpen size={20} />, path: "/teacher/lecture" },
    { name: "Room", icon: <LayoutGrid size={20} />, path: "/teacher/room" },
  ];

  // Mobile version
  if (isMobile) {
    return (
      <div className="grid grid-cols-5 text-xs border-t border-indigo-100">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`flex flex-col items-center justify-center py-2 ${
              activeItem === item.name
                ? "text-indigo-600 font-semibold"
                : "text-gray-600"
            }`}
            onClick={() => setActiveItem(item.name)}
          >
            {item.icon}
          </Link>
        ))}
      </div>
    );
  }

  // Desktop version
  return (
    <nav className="flex items-center">
      <ul className="flex space-x-1">
        {navItems.map((item) => (
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
  );
}
