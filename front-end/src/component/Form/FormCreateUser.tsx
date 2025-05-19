"use client";
import { useState } from "react";
// Material UI Icons
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SchoolIcon from "@mui/icons-material/School";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import CircularProgress from "@mui/material/CircularProgress";
import * as Validation from "@/helper/vadilationHelper";

export default function FormCreateUser() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentId: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const {
      fullName,
      email,
      studentId,
      phoneNumber,
      address,
      password,
      confirmPassword,
    } = formData;

    const newErrors: Record<string, string> = {};

    if (Validation.isEmpty(fullName))
      newErrors.fullName = "Vui lòng nhập họ tên.";

    if (Validation.isEmpty(email)) newErrors.email = "Vui lòng nhập email.";
    else if (!Validation.isValidEmail(email))
      newErrors.email = "Email không hợp lệ.";

    if (Validation.isEmpty(studentId))
      newErrors.studentId = "Vui lòng nhập mã sinh viên.";
    else if (!Validation.isValidStudentID(studentId))
      newErrors.studentId = "Mã sinh viên không hợp lệ.";

    if (Validation.isEmpty(phoneNumber))
      newErrors.phoneNumber = "Vui lòng nhập số điện thoại.";
    else if (!Validation.isValidPhone(phoneNumber))
      newErrors.phoneNumber = "Số điện thoại không hợp lệ.";

    if (Validation.isEmpty(address))
      newErrors.address = "Vui lòng nhập địa chỉ.";

    if (Validation.isEmpty(password))
      newErrors.password = "Vui lòng nhập mật khẩu.";
    else if (!Validation.isValidPasswordLength(password, 8))
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự.";

    if (Validation.isEmpty(confirmPassword))
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
    else if (!Validation.isPasswordMatch(confirmPassword, password))
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
  };

  return (
    <div className="w-full max-w-xl bg-white p-10 rounded-xl shadow-lg">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-800">Tạo Tài Khoản</h2>
        <p className="text-sm text-gray-600">
          Tạo tài khoản để truy cập hệ thống
        </p>
      </div>

      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-4 flex items-center">
          <ErrorOutlineIcon className="mr-2" />
          <p className="text-sm">{errors.general}</p>
        </div>
      )}

      <form onSubmit={handleRegister}>
        <div className="grid grid-cols-2 gap-4">
          {/* Họ và tên */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Họ và tên
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PersonIcon fontSize="small" />
              </div>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className={`pl-10 pr-3 py-2 w-full h-10 border rounded-lg shadow-sm text-sm ${
                  errors.fullName
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-indigo-500"
                }`}
                placeholder="Nguyễn Văn A"
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EmailIcon fontSize="small" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`pl-10 pr-3 py-2 w-full h-10 border rounded-lg shadow-sm text-sm ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-indigo-500"
                }`}
                placeholder="email@university.edu.vn"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Mã sinh viên */}
          <div>
            <label
              htmlFor="studentId"
              className="block text-sm font-medium text-gray-700"
            >
              Mã sinh viên
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SchoolIcon fontSize="small" />
              </div>
              <input
                id="studentId"
                name="studentId"
                type="text"
                value={formData.studentId}
                onChange={handleChange}
                className={`pl-10 pr-3 py-2 w-full h-10 border rounded-lg shadow-sm text-sm ${
                  errors.studentId
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-indigo-500"
                }`}
                placeholder="20210000"
              />
            </div>
            {errors.studentId && (
              <p className="text-xs text-red-500 mt-1">{errors.studentId}</p>
            )}
          </div>

          {/* Số điện thoại */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Số điện thoại
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PhoneIcon fontSize="small" />
              </div>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`pl-10 pr-3 py-2 w-full h-10 border rounded-lg shadow-sm text-sm ${
                  errors.phoneNumber
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-indigo-500"
                }`}
                placeholder="0901234567"
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        {/* Địa chỉ - Full Width */}
        <div className="mt-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Địa chỉ
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HomeIcon fontSize="small" />
            </div>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className={`pl-10 pr-3 py-2 w-full h-10 border rounded-lg shadow-sm text-sm ${
                errors.address
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-indigo-500"
              }`}
              placeholder="123 Đường ABC, Quận 1"
            />
          </div>
          {errors.address && (
            <p className="text-xs text-red-500 mt-1">{errors.address}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* Mật khẩu */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 py-2 px-3 w-full h-10 border rounded-lg text-sm ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-indigo-500"
              }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Xác nhận mật khẩu */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Xác nhận mật khẩu
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`mt-1 py-2 px-3 w-full h-10 border rounded-lg text-sm ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-indigo-500"
              }`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center h-10 px-6 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:bg-indigo-400"
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Tạo tài khoản"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
