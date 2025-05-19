import React, {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { Bell, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function useIsMobile(breakpoint = 868) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}

export default function Header({ children }: { children?: ReactNode }) {
  const isMobile = useIsMobile();
  const [isUserSectionOpen, setIsUserSectionOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserSectionOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Header section */}
      <header className="bg-gradient-to-r from-blue-50 via-white to-indigo-50 shadow-md w-full z-40">
        <div className="px-8">
          <div className="relative flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo trường"
                width={120}
                height={1}
                className="mr-3"
                priority
              />
            </Link>

            {/* Navigation only visible on desktop */}
            {!isMobile && children}

            {/* User dropdown */}
            <div className="flex items-center space-x-4" ref={dropdownRef}>
              <button className="p-2 rounded-full text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition">
                <Bell size={20} />
              </button>
              <button
                onClick={() => setIsUserSectionOpen(!isUserSectionOpen)}
                className="flex items-center space-x-2 text-gray-800 hover:text-indigo-600"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 flex items-center justify-center text-indigo-800 font-semibold">
                  NT
                </div>
                <div className="flex-col items-start hidden md:flex">
                  <span className="text-sm font-medium leading-none">
                    Welcome,
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold">Nguyễn Văn A</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        isUserSectionOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className={`md:hidden transition-transform ${
                    isUserSectionOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown content */}
              {isUserSectionOpen && (
                <div className="absolute top-14 right-0 w-56 z-50 bg-white rounded-lg shadow-lg border border-indigo-100">
                  <div className="p-4 border-b">
                    <h3 className="font-medium text-gray-800">Nguyễn Văn A</h3>
                    <p className="text-gray-500 text-sm">Sinh viên</p>
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
            </div>
          </div>
        </div>
      </header>

      {/* Render navigation on bottom of header if mobile */}
      {isMobile && (
        <div className="px-4 pt-2">
          {children &&
            React.cloneElement(children as React.ReactElement, { isMobile })}
        </div>
      )}
    </>
  );
}
