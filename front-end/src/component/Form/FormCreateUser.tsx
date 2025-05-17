"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Material UI Icons
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SchoolIcon from "@mui/icons-material/School";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import CircularProgress from "@mui/material/CircularProgress";

export default function FormCreateUser() {
  const router = useRouter();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
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

    if (!fullName) newErrors.fullName = "Vui lòng nhập họ tên.";
    if (!email) newErrors.email = "Vui lòng nhập email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Email không hợp lệ.";

    if (!studentId) newErrors.studentId = "Vui lòng nhập mã sinh viên.";
    else if (!/^[0-9]{8,10}$/.test(studentId)) newErrors.studentId = "Mã sinh viên không hợp lệ.";

    if (!phoneNumber) newErrors.phoneNumber = "Vui lòng nhập số điện thoại.";
    else if (!/^[0-9]{10}$/.test(phoneNumber)) newErrors.phoneNumber = "Số điện thoại không hợp lệ.";

    if (!address) newErrors.address = "Vui lòng nhập địa chỉ.";

    if (!password) newErrors.password = "Vui lòng nhập mật khẩu.";
    else if (password.length < 8) newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự.";

    if (!confirmPassword) newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
    else if (confirmPassword !== password) newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/login?registered=true");
    } catch (err: any) {
      setErrors({ general: err.message || "Đã xảy ra lỗi khi đăng ký." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full max-w-md bg-white p-8 rounded-xl shadow-lg">
      <div className="text-center">
        <Image src="/logo.png" alt="University Logo" width={150} height={1} />
        <h2 className="mt-6 text-3xl font-bold text-indigo-800">Tạo Tài Khoản</h2>
        <p className="mt-2 text-sm text-gray-600">Tạo tài khoản để truy cập hệ thống</p>
      </div>

      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4 flex items-center">
          <ErrorOutlineIcon className="mr-2" />
          <p className="text-sm">{errors.general}</p>
        </div>
      )}

      <form className="mt-8 space-y-4" onSubmit={handleRegister}>
        {/* Họ và tên */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Họ và tên</label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><PersonIcon fontSize="small" /></div>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className={`pl-10 pr-3 py-2 w-full h-12 border rounded-lg shadow-sm text-sm ${errors.fullName ? 'border-red-500 focus:ring-red-400' : 'focus:ring-indigo-500'}`}
              placeholder="Nguyễn Văn A"
            />
          </div>
          {errors.fullName && <p className="text-sm text-red-500 mt-1 pl-1">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><EmailIcon fontSize="small" /></div>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`pl-10 pr-3 py-2 w-full h-12 border rounded-lg shadow-sm text-sm ${errors.email ? 'border-red-500 focus:ring-red-400' : 'focus:ring-indigo-500'}`}
              placeholder="email@university.edu.vn"
            />
          </div>
          {errors.email && <p className="text-sm text-red-500 mt-1 pl-1">{errors.email}</p>}
        </div>

        {/* Mã sinh viên */}
        <div>
          <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Mã sinh viên</label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SchoolIcon fontSize="small" /></div>
            <input
              id="studentId"
              name="studentId"
              type="text"
              value={formData.studentId}
              onChange={handleChange}
              className={`pl-10 pr-3 py-2 w-full h-12 border rounded-lg shadow-sm text-sm ${errors.studentId ? 'border-red-500 focus:ring-red-400' : 'focus:ring-indigo-500'}`}
              placeholder="20210000"
            />
          </div>
          {errors.studentId && <p className="text-sm text-red-500 mt-1 pl-1">{errors.studentId}</p>}
        </div>

        {/* Số điện thoại */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><PhoneIcon fontSize="small" /></div>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`pl-10 pr-3 py-2 w-full h-12 border rounded-lg shadow-sm text-sm ${errors.phoneNumber ? 'border-red-500 focus:ring-red-400' : 'focus:ring-indigo-500'}`}
              placeholder="0901234567"
            />
          </div>
          {errors.phoneNumber && <p className="text-sm text-red-500 mt-1 pl-1">{errors.phoneNumber}</p>}
        </div>

        {/* Địa chỉ */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Địa chỉ</label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><HomeIcon fontSize="small" /></div>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className={`pl-10 pr-3 py-2 w-full h-12 border rounded-lg shadow-sm text-sm ${errors.address ? 'border-red-500 focus:ring-red-400' : 'focus:ring-indigo-500'}`}
              placeholder="123 Đường ABC, Quận 1"
            />
          </div>
          {errors.address && <p className="text-sm text-red-500 mt-1 pl-1">{errors.address}</p>}
        </div>

        {/* Mật khẩu */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={`mt-1 py-2 px-3 w-full h-12 border rounded-lg text-sm ${errors.password ? 'border-red-500 focus:ring-red-400' : 'focus:ring-indigo-500'}`}
            placeholder="••••••••"
          />
          {errors.password && <p className="text-sm text-red-500 mt-1 pl-1">{errors.password}</p>}
        </div>

        {/* Xác nhận mật khẩu */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`mt-1 py-2 px-3 w-full h-12 border rounded-lg text-sm ${errors.confirmPassword ? 'border-red-500 focus:ring-red-400' : 'focus:ring-indigo-500'}`}
            placeholder="••••••••"
          />
          {errors.confirmPassword && <p className="text-sm text-red-500 mt-1 pl-1">{errors.confirmPassword}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center h-12 px-6 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:bg-indigo-400"
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Tạo tài khoản"}
        </button>
      </form>
    </div>
  );
}
