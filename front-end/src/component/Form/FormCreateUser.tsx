"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// ✅ Material UI Icons
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
  const [error, setError] = useState("");
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
    setError("");

    const {
      fullName,
      email,
      studentId,
      phoneNumber,
      address,
      password,
      confirmPassword,
    } = formData;
    if (
      !fullName ||
      !email ||
      !studentId ||
      !phoneNumber ||
      !address ||
      !password ||
      !confirmPassword
    ) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ.");
      return;
    }

    const studentIdRegex = /^[0-9]{8,10}$/;
    if (!studentIdRegex.test(studentId)) {
      setError("Mã sinh viên không hợp lệ (8-10 số).");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("Số điện thoại không hợp lệ (10 số).");
      return;
    }

    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi đăng ký.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="University Logo"
              width={150}
              height={1}
            />
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-roboto font-bold text-indigo-800">
          Tạo Tài Khoản
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Tạo tài khoản cho phép user truy cập vào hệ thống
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4 flex items-center">
          <ErrorOutlineIcon className="mr-2" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form className="mt-8 space-y-4" onSubmit={handleRegister}>
        {/* Fields */}
        {[
          {
            id: "fullName",
            label: "Họ và tên",
            icon: <PersonIcon fontSize="small" />,
            type: "text",
            placeholder: "Nguyễn Văn A",
          },
          {
            id: "email",
            label: "Email",
            icon: <EmailIcon fontSize="small" />,
            type: "email",
            placeholder: "email@university.edu.vn",
          },
          {
            id: "studentId",
            label: "Mã sinh viên",
            icon: <SchoolIcon fontSize="small" />,
            type: "text",
            placeholder: "20210000",
          },
          {
            id: "phoneNumber",
            label: "Số điện thoại",
            icon: <PhoneIcon fontSize="small" />,
            type: "tel",
            placeholder: "0901234567",
          },
          {
            id: "address",
            label: "Địa chỉ",
            icon: <HomeIcon fontSize="small" />,
            type: "text",
            placeholder: "123 Đường ABC, Quận 1",
          },
        ].map(({ id, label, icon, type, placeholder }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className="block text-sm font-medium text-gray-700"
            >
              {label}
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
              </div>
              <input
                id={id}
                name={id}
                type={type}
                required
                value={formData[id as keyof typeof formData]}
                onChange={handleChange}
                className="pl-10 pr-3 py-2 w-full h-12 border rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-indigo-500"
                placeholder={placeholder}
              />
            </div>
          </div>
        ))}
        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center h-12 px-6 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:bg-indigo-400"
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Tạo tài khoản"
          )}
        </button>
      </form>
    </div>
  );
}
