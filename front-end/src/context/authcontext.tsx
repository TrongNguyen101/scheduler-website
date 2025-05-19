"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface DecodedToken {
  id: string;
  email: string;
  role: string;
  exp: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  role: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  // Khi load lại trang, kiểm tra token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      setRole(decoded.role);
      setIsAuthenticated(true);
    }
    setIsInitializing(false); // Đã kiểm tra xong
  }, []);

  const login = (token: string) => {
    const decoded: DecodedToken = jwtDecode(token);
    // console.log(decoded);

    if (decoded.role == "Admin") {
      router.push("/admin/dashboard");
    } else if (decoded.role == "User") {
      router.push("/student");
    } else if (decoded.role == "teacher") {
      router.push("/teacher");
    }
    setRole(decoded.role);
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, role }}>
      {!isInitializing && children} {/* Chỉ render khi context sẵn sàng */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
