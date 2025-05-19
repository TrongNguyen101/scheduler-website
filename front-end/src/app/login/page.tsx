"use client";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SignIn } from "@/api/authAPI";
import { useAuth } from "@/context/authcontext"; // import context
import * as Validation from "@/helper/vadilationHelper";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // get login function from context
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Validate form
    if (!email && !password) {
      setEmailError("Vui lòng nhập email.");
      setPasswordError("Vui lòng nhập mật khẩu.");
      setLoading(false);

      return;
    } else if (!email) {
      setEmailError("Vui lòng nhập email.");
      setPasswordError("");
      setLoading(false);

      return;
    } else if (!password) {
      setEmailError("");
      setPasswordError("Vui lòng nhập mật khẩu.");
      setLoading(false);

      return;
    }
    const checkemail = Validation.isValidEmail(email);
    if (!checkemail) {
      setEmailError("Email không hợp lệ");
      setLoading(false);
      return;
    } else {
      setEmailError("");
      setPasswordError("");
    }
    try {
      const result = await SignIn("/auth/login", email, password);
      console.log(result);
      if (result.status === 200) {
        login(result.data.data);
        setLoading(false);
      } else if (result.status === 401) {
        console.log(result.response.data);
        setError(result.response.data.message);
        setLoading(false);
        return;
      } else {
        setError("Server đang bảo trì hoặc xảy ra lỗi vui lòng thử lại sau");
        console.log(result.data.message);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="University Logo"
                width={170}
                height={60}
              />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-roboto font-bold text-indigo-800">
            Hệ Thống Giáo Dục
          </h2>
          <p className="mt-2 text-md text-gray-600">
            Đăng nhập để truy cập hệ thống quản lý học tập
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    autoComplete="email"
                    className="appearance-none block w-full h-12 pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="email@university.edu.vn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {emailError && (
              <p className="mt-1 text-sm text-red-600">{emailError}</p>
            )}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="appearance-none block w-full h-12 pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            {passwordError && (
              <p className="mt-1 text-sm text-red-600">{passwordError}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Ghi nhớ mật khẩu
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="relative w-full flex justify-center items-center h-11 px-6 py-3 border border-transparent rounded-xl shadow-sm text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {loading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                "Đăng nhập"
              )}
            </button>
          </div>
        </form>
        {/* Footer */}
        <div className="pt-4 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Hệ Thống Giáo Dục Đại Học. Tất cả quyền
            được bảo lưu.
          </p>
        </div>
      </div>
    </div>
  );
}
