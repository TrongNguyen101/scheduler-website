"use client";
import { useState } from "react";
import { useAuth } from "@/context/authcontext"; // import context

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // lấy hàm login từ context

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Giả sử bạn gọi API để xác thực người dùng nhớ đổi api lại nha
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const user = await res.json(); // Giả sử API trả về thông tin người dùng
      // Lưu thông tin người dùng vào context và localStorage
      login(user.data.token);
    } else {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
